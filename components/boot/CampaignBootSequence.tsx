"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Abertura: simula uma campanha sendo montada ao vivo. 4,2s no desktop,
 * 3,2s no mobile, 0,6s com prefers-reduced-motion.
 *
 * Deliberadamente SEM framer-motion: é a primeira coisa que renderiza e não
 * pode esperar o chunk do LazyMotion carregar. Tudo aqui é CSS + estado.
 */

type Phase =
  | "idle"
  | "typing"
  | "audience"
  | "budget"
  | "creatives"
  | "result"
  | "collapse"
  | "phrase"
  | "wipe";

const ORDER: Phase[] = [
  "idle",
  "typing",
  "audience",
  "budget",
  "creatives",
  "result",
  "collapse",
  "phrase",
  "wipe",
];

/**
 * t em ms. Só a montagem da campanha encolhe no mobile; o tempo de leitura
 * da frase é FIXO, porque ler não fica mais rápido em tela menor.
 */
const MARKS: Record<Phase, number> = {
  idle: 0,
  typing: 150,
  audience: 600,
  budget: 1300,
  creatives: 2000,
  result: 2600,
  collapse: 3200,
  phrase: 3400,
  wipe: 3400, // + READ_HOLD, aplicado abaixo
};

/** quanto a frase-âncora fica parada na tela, para dar tempo de ler */
const READ_HOLD = 2300;

const at = (p: Phase) => ORDER.indexOf(p);

const BANDS = [
  { label: "18–24", pct: 34 },
  { label: "25–34", pct: 78 },
  { label: "35–44", pct: 52 },
  { label: "45+", pct: 26 },
];

const SLICES = [
  { pct: 55, color: "var(--key)" },
  { pct: 30, color: "var(--fill)" },
  { pct: 15, color: "var(--rim)" },
];

const R = 42;
const CIRC = 2 * Math.PI * R;

/** offsets pré-calculados: nada é mutado durante o render */
const ARCS = SLICES.reduce<{ color: string; len: number; start: number }[]>((acc, s) => {
  const len = (s.pct / 100) * CIRC;
  const start = acc.length ? acc[acc.length - 1].start + acc[acc.length - 1].len : 0;
  return [...acc, { color: s.color, len, start }];
}, []);

function Donut({ draw }: { draw: boolean }) {
  return (
    <svg viewBox="0 0 110 110" className="h-[104px] w-[104px] -rotate-90" aria-hidden="true">
      <circle cx="55" cy="55" r={R} fill="none" stroke="var(--line)" strokeWidth="9" />
      {ARCS.map((a, i) => {
        const dash = `${a.len} ${CIRC - a.len}`;
        return (
          <circle
            key={i}
            cx="55"
            cy="55"
            r={R}
            fill="none"
            stroke={a.color}
            strokeWidth="9"
            strokeLinecap="butt"
            strokeDasharray={dash}
            strokeDashoffset={draw ? -a.start : CIRC}
            style={{
              transition: `stroke-dashoffset .7s cubic-bezier(.16,1,.3,1) ${i * 0.09}s`,
            }}
          />
        );
      })}
    </svg>
  );
}

function Panel({
  label,
  show,
  from,
  children,
}: {
  label: string;
  show: boolean;
  from: "bottom" | "right";
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex h-full min-h-[210px] flex-col rounded-2xl border border-[var(--line)] bg-linear-to-b from-[var(--bg-200)] to-[var(--bg-100)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.05)]"
      style={{
        opacity: show ? 1 : 0,
        transform: show
          ? "translate3d(0,0,0)"
          : from === "bottom"
            ? "translate3d(0,24px,0)"
            : "translate3d(24px,0,0)",
        transition: "opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-[var(--tx-lo)] uppercase">
        {label}
      </p>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}

export default function CampaignBootSequence() {
  const t = useTranslations("boot");
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  const [flash, setFlash] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);
  const [kpi, setKpi] = useState([0, 0, 0]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const status = t.raw("status") as string[];
  const kpis = t.raw("kpis") as { label: string; value: number; suffix: string; prefix?: string; decimals: number }[];

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const finish = () => {
    clearAll();
    document.body.style.overflow = "";
    setActive(false);
  };

  useEffect(() => {
    setMounted(true);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (sessionStorage.getItem("boot_seen") === "1") return;
    sessionStorage.setItem("boot_seen", "1");

    setActive(true);
    document.body.style.overflow = "hidden";

    const push = (ms: number, fn: () => void) => {
      timers.current.push(setTimeout(fn, ms));
    };

    /* reduced motion: só o fade da frase-âncora */
    if (isReduced) {
      setPhase("phrase");
      push(600, finish);
      return clearAll;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const k = isMobile ? 0.82 : 1;
    /* a montagem encolhe no mobile; a leitura da frase, não */
    const scale = (ms: number) => Math.round(ms * k);
    const wipeAt = scale(MARKS.phrase) + READ_HOLD;

    for (const p of ORDER) {
      if (p === "idle") continue;
      push(p === "wipe" ? wipeAt : scale(MARKS[p]), () => setPhase(p));
    }

    push(scale(500), () => setSkipVisible(true));

    /* digitação caractere a caractere */
    push(scale(MARKS.typing), () => {
      const full = status[0];
      let i = 0;
      const step = () => {
        i += 1;
        setTyped(full.slice(0, i));
        if (i < full.length) timers.current.push(setTimeout(step, scale(28)));
      };
      step();
    });

    /* KPIs contando de zero */
    push(scale(MARKS.result), () => {
      const dur = scale(600);
      const t0 = performance.now();
      const tick = () => {
        const p = Math.min(1, (performance.now() - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setKpi(kpis.map((x) => x.value * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    push(scale(MARKS.collapse), () => setFlash(true));
    push(scale(MARKS.collapse) + 90, () => setFlash(false));
    push(wipeAt + 600, finish);

    return () => {
      clearAll();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted || !active) return null;

  const i = at(phase);
  const showAudience = i >= at("audience") && i < at("collapse");
  const showBudget = i >= at("budget") && i < at("collapse");
  const showCreatives = i >= at("creatives") && i < at("collapse");
  const showResult = i >= at("result") && i < at("collapse");
  const collapsing = i >= at("collapse");
  const showPhrase = i >= at("phrase");
  const wiping = i >= at("wipe");

  const statusIndex = Math.max(
    0,
    Math.min(status.length - 1, i - at("typing"))
  );

  return (
    <div
      className="fixed inset-0 z-9999 overflow-hidden bg-[var(--bg-000)]"
      role="presentation"
      style={{
        opacity: wiping ? 0 : 1,
        transition: "opacity .45s ease .25s",
      }}
    >
      {/* grade técnica */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: i >= at("typing") ? 1 : 0,
          transition: "opacity .5s ease",
        }}
      />

      {/* rótulo de honestidade: os KPIs são ilustrativos */}
      <span className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.22em] text-[var(--tx-lo)] uppercase">
        {t("sim")}
      </span>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
        {/* painéis */}
        <div
          className="grid w-full max-w-[1020px] grid-cols-2 items-stretch gap-3.5 md:grid-cols-4 md:gap-5"
          style={{
            opacity: collapsing ? 0 : 1,
            transform: collapsing ? "scale(.9)" : "scale(1)",
            transition: "opacity .35s ease, transform .35s cubic-bezier(.4,0,.2,1)",
            filter: collapsing ? "blur(6px)" : "none",
          }}
        >
          {/* 1 — PÚBLICO */}
          <Panel label={t("panels.audience")} show={showAudience} from="bottom">
            <ul className="flex flex-col gap-3">
              {BANDS.map((b, n) => (
                <li key={b.label} className="flex items-center gap-2">
                  <span className="w-[38px] shrink-0 font-mono text-[9px] text-[var(--tx-lo)]">
                    {b.label}
                  </span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                    <span
                      className="block h-full rounded-full bg-linear-to-r from-[var(--fill)] to-[var(--key)]"
                      style={{
                        width: showAudience ? `${b.pct}%` : "0%",
                        transition: `width .5s cubic-bezier(.16,1,.3,1) ${n * 0.1}s`,
                      }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          {/* 2 — ORÇAMENTO */}
          <Panel label={t("panels.budget")} show={showBudget} from="right">
            <div className="flex flex-col items-center gap-3">
              <Donut draw={showBudget} />
              <ul className="flex w-full flex-col gap-1">
                {(t.raw("slices") as string[]).map((s, n) => (
                  <li key={s} className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: SLICES[n].color }}
                    />
                    <span className="font-mono text-[8.5px] tracking-[0.12em] text-[var(--tx-lo)] uppercase">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>

          {/* 3 — CRIATIVOS */}
          <Panel label={t("panels.creatives")} show={showCreatives} from="bottom">
            <div className="flex gap-2">
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  className="relative aspect-9/16 flex-1 overflow-hidden rounded-md border border-[var(--line)] bg-[var(--bg-300)]"
                  style={{
                    opacity: showCreatives ? 1 : 0,
                    transform: showCreatives ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity .3s ease ${n * 0.12}s, transform .3s ease ${n * 0.12}s`,
                  }}
                >
                  <span
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,.16) 50%, transparent 70%)",
                      animation: showCreatives
                        ? `boot-shimmer 1.1s linear ${0.15 + n * 0.12}s infinite`
                        : "none",
                    }}
                  />
                </span>
              ))}
            </div>
          </Panel>

          {/* 4 — RESULTADO */}
          <Panel label={t("panels.result")} show={showResult} from="bottom">
            <ul className="flex flex-col gap-2.5">
              {kpis.map((x, n) => (
                <li key={x.label}>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-[var(--tx-lo)] uppercase">
                    {x.label}
                  </p>
                  <p
                    className="font-mono text-[17px] font-bold tabular-nums"
                    style={{
                      color: showResult ? "var(--rim)" : "var(--tx-lo)",
                      transition: "color .6s ease",
                    }}
                  >
                    {x.prefix ?? ""}
                    {kpi[n].toFixed(x.decimals).replace(".", ",")}
                    {x.suffix}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* linha de status */}
        <p
          /* caixa de largura fixa: o texto cresce para a direita sem
             reposicionar nada — senão cada troca de status vira layout shift */
          className="mt-8 flex w-full max-w-[1020px] items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-[var(--tx-md)] uppercase"
          style={{ opacity: collapsing ? 0 : 1, transition: "opacity .25s ease" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[var(--rim)] shadow-[0_0_8px_var(--rim)]"
            style={{ animation: "status-pulse 1.2s ease-in-out infinite" }}
            aria-hidden="true"
          />
          {/* largura reservada: sem isso, cada caractere digitado reposiciona a
              linha centralizada e isso vira layout shift */}
          <span className="inline-block text-left">
            {phase === "typing" ? typed : status[statusIndex]}
            <span className="boot-caret ml-1 align-[-1px]" aria-hidden="true" />
          </span>
        </p>

        {/* frase-âncora */}
        <p
          className="pointer-events-none absolute px-6 text-center font-display leading-[1.02] text-[var(--tx-hi)]"
          style={{
            fontSize: "clamp(1.9rem, 4.6vw, 3.9rem)",
            maxWidth: "24ch",
            textWrap: "balance",
            textShadow: "0 0 60px rgba(255,46,136,.35)",
            opacity: showPhrase ? 1 : 0,
            transform: showPhrase ? "scale(1)" : "scale(.96)",
            transition: "opacity .28s ease, transform .5s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {t("phrase")}
        </p>
      </div>

      {/* flash do colapso */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-white"
        style={{ opacity: flash ? 0.32 : 0, transition: "opacity .09s linear" }}
      />

      {/* wipe de luz */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-[45vw]"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--key), var(--fill), transparent)",
          filter: "blur(28px)",
          opacity: wiping ? 0.85 : 0,
          /* transform, nunca `left`: animar propriedade de layout gera um
             layout shift por quadro — foi o que quebrou o CLS */
          left: 0,
          transform: wiping ? "translateX(100vw)" : "translateX(-45vw)",
          transition: wiping
            ? "transform .55s cubic-bezier(.4,0,.2,1), opacity .2s ease"
            : "none",
          willChange: "transform",
        }}
      />

      {skipVisible && !wiping && (
        <button
          type="button"
          onClick={finish}
          className="absolute right-6 bottom-6 font-mono text-[11px] tracking-[0.22em] text-[var(--tx-lo)] uppercase transition-colors hover:text-[var(--tx-hi)]"
        >
          {t("skip")}
        </button>
      )}
    </div>
  );
}
