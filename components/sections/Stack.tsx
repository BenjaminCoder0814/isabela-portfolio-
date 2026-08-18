"use client";

import Reveal from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";
import Section, { SectionHead } from "@/components/ui/Section";

const ACCENTS = ["rim", "key", "warm"] as const;

type Group = { name: string; tools: string[] };

/** Ícone mono de 16px — um por grupo, desenhado à mão. */
const GROUP_ICON = [
  // gráfico de barras
  "M2 14h12 M4 11V6 M7.5 11V3 M11 11V8",
  // pena / criação
  "M3 13c0-5 4-9 10-10-1 6-5 10-10 10z M3 13l4-4",
  // grade de organização
  "M2 2h5v5H2z M9 2h5v5H9z M2 9h5v5H2z M9 9h5v5H9z",
] as const;

export default function Stack() {
  const t = useTranslations("stack");
  const groups = t.raw("groups") as Group[];

  return (
    <Section id="stack" depth="000" spot="fill">
      <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

      <div className="grid gap-8 md:grid-cols-3">
        {groups.map((group, gi) => (
          <div key={group.name}>
            <p className="mb-4 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: `var(--${ACCENTS[gi]})` }}>
              <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
                <path
                  d={GROUP_ICON[gi]}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {group.name}
            </p>

            <ul className="flex flex-wrap gap-2">
              {group.tools.map((tool, i) => (
                <Reveal as="li" key={tool} y={12} delay={i * 0.04}>
                  <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-200)] px-3.5 py-2 font-mono text-[11px] sm:text-[10.5px] tracking-[0.12em] text-[var(--tx-md)] uppercase transition-all duration-200 hover:scale-[1.04] hover:border-[var(--key)] hover:text-[var(--key)]">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true">
                      <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="8" cy="8" r="1.6" fill="currentColor" />
                    </svg>
                    {tool}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
