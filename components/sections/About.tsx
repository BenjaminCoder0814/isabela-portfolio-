"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";
import Section, { SectionHead } from "@/components/ui/Section";

const BLUR_DATA =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjEwIj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzE0MTgyMiIvPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIzIiBmaWxsPSIjMmEyMzMwIi8+PC9zdmc+";

function PhotoFallback() {
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{ background: "linear-gradient(140deg, var(--fill), var(--key))" }}
      role="img"
      aria-label="Isabela Machado"
    >
      <span className="font-display text-7xl leading-none text-white/90">IM</span>
    </div>
  );
}

export default function About() {
  const t = useTranslations("about");
  const [imgError, setImgError] = useState(false);
  const paragraphs = t.raw("paragraphs") as string[];
  const languages = t.raw("languages") as string[];

  return (
    <Section id="about" depth="100" spot="warm">
      <SectionHead eyebrow={t("eyebrow")} title={t("title")} />

      <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
        {/* foto secundária */}
        <Reveal
          y={24}
          className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--bg-200)] lg:sticky lg:top-28 lg:self-start"
        >
          <div className="relative aspect-4/5 w-full overflow-hidden">
            {!imgError ? (
              <Image
                src="/about-photo.webp"
                alt="Isabela Machado"
                fill
                sizes="(max-width: 1024px) 90vw, 340px"
                placeholder="blur"
                blurDataURL={BLUR_DATA}
                onError={() => setImgError(true)}
                className="object-cover"
                style={{ filter: "saturate(.95) contrast(1.04)" }}
              />
            ) : (
              <PhotoFallback />
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,6,10,.25) 0%, transparent 30%, transparent 55%, rgba(5,6,10,.8) 100%)",
              }}
            />
            <p className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] sm:text-[10px] tracking-[0.18em] text-[var(--tx-hi)] uppercase">
              {t("photoCaption")}
            </p>
          </div>
        </Reveal>

        {/* texto */}
        <div className="flex flex-col gap-5">
          {paragraphs.map((p, i) => (
            <Reveal as="p" key={i} y={18} delay={i * 0.08} className="t-body">
              {p}
            </Reveal>
          ))}

          <div className="mt-2 flex flex-wrap gap-2">
            {languages.map((l) => (
              <span key={l} className="chip">
                {l}
              </span>
            ))}
          </div>

          <p className="mt-4 border-l-2 pl-5 text-[17px] leading-relaxed text-[var(--tx-hi)] italic" style={{ borderColor: "var(--key)" }}>
            {t("closing")}
          </p>
        </div>
      </div>
    </Section>
  );
}
