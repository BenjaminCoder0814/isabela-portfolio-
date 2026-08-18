"use client";

import Reveal from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";
import Section, { SectionHead } from "@/components/ui/Section";
import StudioCard from "@/components/ui/StudioCard";

const ACCENTS = ["key", "fill", "rim"] as const;

type Card = { title: string; bullets: string[] };

/** Ícones de linha desenhados à mão — sem emoji, sem ícone colorido. */
const ICONS = [
  // funil de mídia + alvo
  "M4 6h32L25 20v12l-10 5V20z M30 30a6 6 0 1 0 0.01 0z M30 30h.01",
  // play + variações A/B
  "M5 8h20v15H5z M11 12l7 3.5-7 3.5z M29 9v22 M25 14h8 M25 20h8 M25 26h8",
  // calendário + linha de conteúdo
  "M5 8h30v27H5z M5 16h30 M12 4v8 M28 4v8 M11 23h8 M11 29h14 M23 23h6",
] as const;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="icon-draw"
      />
    </svg>
  );
}

export default function Deliver() {
  const t = useTranslations("deliver");
  const cards = t.raw("cards") as Card[];

  return (
    <Section id="deliver" depth="000" spot="fill">
      <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.title} y={24} delay={i * 0.08}>
            <StudioCard spot={ACCENTS[i]} className="group flex h-full flex-col p-7">
              <div className="flex items-start justify-between">
                <span style={{ color: `var(--${ACCENTS[i]})` }}>
                  <Icon d={ICONS[i]} />
                </span>
                <span className="font-mono text-[11px] sm:text-[10px] tracking-[0.2em] text-[var(--tx-lo)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[28px] leading-tight text-[var(--tx-hi)]">
                {card.title}
              </h3>

              <ul className="mt-5 flex flex-col gap-3 border-t border-[var(--line-soft)] pt-5">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--tx-md)]">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: `var(--${ACCENTS[i]})` }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </StudioCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
