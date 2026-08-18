"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Button from "@/components/ui/Button";


const BLUR_DATA =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjEwIj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzE0MTgyMiIvPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIzIiBmaWxsPSIjMmEyMzMwIi8+PC9zdmc+";

/** Marcas de enquadramento em L */
function CornerMarks() {
  const pos = [
    "left-3 top-3 border-l border-t",
    "right-3 top-3 border-r border-t",
    "left-3 bottom-3 border-l border-b",
    "right-3 bottom-3 border-r border-b",
  ];
  return (
    <>
      {pos.map((p) => (
        <span
          key={p}
          aria-hidden="true"
          className={`pointer-events-none absolute h-[18px] w-[18px] border-[var(--line-strong)] ${p}`}
        />
      ))}
    </>
  );
}

/** Fallback quando a imagem falha — nunca alt-text cru na tela. */
function PhotoFallback() {
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{ background: "linear-gradient(140deg, var(--key), var(--fill))" }}
      role="img"
      aria-label="Isabela Machado"
    >
      <span className="font-display text-[22vmin] leading-none text-white/90 lg:text-[9rem]">
        IM
      </span>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const headlineA = t("headlineA");
  const headlineB = t("headlineB");
  const stats = t.raw("stats") as string[];

  const [imgError, setImgError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  /* reflexo diagonal do vidro seguindo o mouse */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const frameY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const wordsA = headlineA.split(" ");
  const wordsB = headlineB.split(" ");
  const lineDelay = 0.2 + wordsA.length * 0.12;

  const Word = ({ word, delay }: { word: string; delay: number }) => (
    <span className="mr-[0.24em] inline-block overflow-hidden align-bottom">
      <span className="word-up" style={{ ["--d" as string]: `${delay}s` }}>
        {word}
      </span>
    </span>
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[720px] items-center overflow-hidden lg:min-h-[720px]"
    >
      <div className="shell relative z-[1] grid grid-cols-1 items-center gap-12 pt-28 pb-20 lg:grid-cols-12 lg:gap-16 lg:pt-20 lg:pb-12">
        {/* ── TEXTO ── */}
        <m.div
          style={{ y: textY, opacity: fade }}
          className="order-2 flex flex-col gap-6 lg:order-1 lg:col-span-7"
        >
          <p className="eyebrow rise items-start" style={{ ["--d" as string]: "0.1s" }}>
            <span
              className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--rim)] shadow-[0_0_8px_var(--rim)]"
              style={{ animation: "status-pulse 2.4s ease-in-out infinite" }}
              aria-hidden="true"
            />
            <span className="min-w-0">{t("eyebrow")}</span>
          </p>

          <h1 className="t-h1">
            {wordsA.map((w, i) => (
              <Word key={`a-${i}`} word={w} delay={0.2 + i * 0.12} />
            ))}
            {/* o gradiente cobre a frase inteira, não cada palavra */}
            <span className="text-gradient block w-fit">
              {wordsB.map((w, i) => (
                <Word key={`b-${i}`} word={w} delay={lineDelay + i * 0.12} />
              ))}
            </span>
          </h1>

          <div
            aria-hidden="true"
            className="light-bar h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, var(--key), transparent)",
              ["--d" as string]: `${lineDelay + wordsB.length * 0.12}s`,
            }}
          />

          <p className="t-body rise max-w-[46ch]" style={{ ["--d" as string]: "0.3s" }}>
            {t("sub")}
          </p>

          <div className="rise flex flex-wrap gap-3" style={{ ["--d" as string]: "0.4s" }}>
            <Button href="#deliver" variant="primary">
              {t("cta1")}
            </Button>
            <Button href={`/${locale}/pdf`} variant="outline">
              {t("cta2")}
            </Button>
          </div>

          <ul
            className="rise mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--line-soft)] pt-5"
            style={{ ["--d" as string]: "0.5s" }}
          >
            {stats.map((s) => (
              <li
                key={s}
                className="font-mono text-[10.5px] tracking-[0.16em] text-[var(--tx-lo)] uppercase"
              >
                {s}
              </li>
            ))}
          </ul>
        </m.div>

        {/* ── FOTO ── */}
        <m.div
          style={{ y: frameY, opacity: fade }}
          className="order-1 lg:order-2 lg:col-span-5"
        >
          <div
            ref={frameRef}
            className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[22px] border border-[var(--line-strong)] bg-[var(--bg-200)] shadow-[inset_0_1px_0_rgba(255,255,255,.07),0_40px_90px_-40px_#000]"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden">
              {!imgError ? (
                <Image
                  src="/hero-photo.webp"
                  alt="Isabela Machado"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 420px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA}
                  onError={() => setImgError(true)}
                  className="object-cover"
                  style={{ filter: "saturate(1.05) contrast(1.06)" }}
                />
              ) : (
                <PhotoFallback />
              )}

              {/* vinheta interna — casa a foto com o fundo escuro */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 78% 65% at 50% 42%, transparent 40%, rgba(5,6,10,.5) 100%), linear-gradient(180deg, rgba(5,6,10,.2) 0%, transparent 24%, transparent 64%, rgba(5,6,10,.62) 100%)",
                }}
              />

              <CornerMarks />
            </div>

            {/* reflexo diagonal do vidro */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[22px]"
              style={{
                background:
                  "linear-gradient(105deg, rgba(255,255,255,.06) 0%, rgba(255,255,255,0) 42%), radial-gradient(240px circle at var(--gx,60%) var(--gy,25%), rgba(255,255,255,.05), transparent 70%)",
              }}
            />
          </div>
        </m.div>
      </div>
    </section>
  );
}
