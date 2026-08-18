"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Linhas que se desenham ligando as duas colunas ao card central. */
function Connectors({ show }: { show: boolean }) {
  const paths = [
    "M2 30 C 120 30, 150 96, 300 96",
    "M598 30 C 480 30, 450 96, 300 96",
  ];
  return (
    <svg
      viewBox="0 0 600 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-full hidden h-11 w-full lg:block"
    >
      {paths.map((d, i) => (
        <m.path
          key={d}
          d={d}
          fill="none"
          stroke={i === 0 ? "var(--rim)" : "var(--fill)"}
          strokeWidth="1.4"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          animate={show ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        />
      ))}
    </svg>
  );
}

function Pillar({
  label,
  body,
  accent,
  from,
  show,
  delay,
}: {
  label: string;
  body: string;
  accent: "rim" | "fill";
  from: number;
  show: boolean;
  delay: number;
}) {
  return (
    <m.div
      initial={{ opacity: 0, x: from }}
      animate={show ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className="card-studio relative p-7"
      style={{ ["--spot" as string]: `var(--${accent})` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, var(--${accent}), transparent)`,
        }}
      />
      <p
        className="font-mono text-[11px] tracking-[0.2em] uppercase"
        style={{ color: accent === "fill" ? "var(--fill-hi)" : `var(--${accent})` }}
      >
        {label}
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--tx-md)]">{body}</p>
    </m.div>
  );
}

export default function Bridge() {
  const t = useTranslations("bridge");
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true, margin: "-90px" });

  return (
    <Section id="bridge" depth="100" spot="rim">
      <div ref={ref} className="flex flex-col items-center">
        <p className="eyebrow mx-auto">
          <span className="h-px w-7 bg-[var(--line-strong)]" aria-hidden="true" />
          {t("eyebrow")}
        </p>
        <h2 className="t-h2 mt-3 text-center">{t("title")}</h2>

        {/* duas colunas que convergem */}
        <div className="relative mt-12 grid w-full gap-5 md:grid-cols-2">
          <Pillar
            label={t("left.label")}
            body={t("left.body")}
            accent="rim"
            from={-60}
            show={show}
            delay={0}
          />
          <Pillar
            label={t("right.label")}
            body={t("right.body")}
            accent="fill"
            from={60}
            show={show}
            delay={0.1}
          />
          <Connectors show={show} />
        </div>

        {/* card central — o resultado da soma */}
        <m.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={show ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.65, ease: EASE, delay: 0.55 }}
          className="relative mt-6 w-full max-w-[720px] lg:mt-14"
        >
          <m.span
            aria-hidden="true"
            className="absolute -inset-2 rounded-[26px]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--key) 26%, transparent), transparent 70%)",
              filter: "blur(24px)",
            }}
            initial={{ opacity: 0 }}
            animate={show ? { opacity: [0, 1, 0.45] } : undefined}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.7, times: [0, 0.45, 1] }}
          />
          <div
            className="relative rounded-[22px] border p-8 text-center"
            style={{
              borderColor: "color-mix(in srgb, var(--key) 55%, transparent)",
              background: "linear-gradient(180deg, var(--bg-200), var(--bg-100))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.06), 0 30px 80px -40px #000",
            }}
          >
            <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--key)] uppercase">
              {t("center.label")}
            </p>
            <h3 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight text-[var(--tx-hi)]">
              {t("center.title")}
            </h3>
            <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--tx-md)]">
              {t("center.body")}
            </p>
          </div>
        </m.div>
      </div>
    </Section>
  );
}
