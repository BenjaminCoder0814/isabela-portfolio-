"use client";

import Reveal from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";
import Section, { SectionHead } from "@/components/ui/Section";
import StudioCard from "@/components/ui/StudioCard";

const ACCENTS = ["key", "fill", "rim", "warm"] as const;

type Item = {
  period: string;
  /** ISO para o <time datetime> — é o que sistema de triagem lê */
  start: string;
  end: string;
  role: string;
  org: string;
  bullets: string[];
};

export default function Journey() {
  const t = useTranslations("journey");
  const items = t.raw("items") as Item[];

  return (
    <Section id="journey" depth="000" spot="warm">
      <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

      <ol className="relative flex flex-col gap-5">
        {/* trilho vertical */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-3 bottom-3 left-[19px] hidden w-px md:block"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--line-strong) 8%, var(--line-strong) 92%, transparent)",
          }}
        />

        {items.map((item, i) => (
          <Reveal as="li" key={item.role} y={24} delay={i * 0.07} className="relative md:pl-14">
            {/* marcador no trilho */}
            <span
              aria-hidden="true"
              className="absolute top-7 left-[13px] hidden h-3 w-3 rounded-full border-2 md:block"
              style={{
                borderColor: `var(--${ACCENTS[i % 4]})`,
                background: "var(--bg-000)",
                boxShadow: `0 0 16px -2px var(--${ACCENTS[i % 4]})`,
              }}
            />

            <StudioCard spot={ACCENTS[i % 4]} className="p-6 sm:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--tx-lo)] uppercase">
                  <time dateTime={item.start}>{item.period.split("—")[0].trim()}</time>
                  {item.period.includes("—") && (
                    <>
                      {" — "}
                      <time dateTime={item.end}>{item.period.split("—")[1].trim()}</time>
                    </>
                  )}
                </p>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--tx-lo)] uppercase">
                  {item.org}
                </p>
              </div>

              <h3 className="mt-2.5 font-display text-[26px] leading-tight text-[var(--tx-hi)]">
                {item.role}
              </h3>

              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {item.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--tx-md)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: `var(--${ACCENTS[i % 4]})` }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </StudioCard>
          </Reveal>
        ))}
      </ol>

      <Reveal
        as="p"
        y={18}
        className="mt-8 border-l-2 pl-5 text-[17px] leading-relaxed text-[var(--tx-hi)] italic md:ml-14"
        style={{ borderColor: "var(--warm)" }}
      >
        {t("closing")}
      </Reveal>
    </Section>
  );
}
