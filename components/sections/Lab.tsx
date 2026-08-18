"use client";

import Reveal from "@/components/ui/Reveal";
import { useLocale, useTranslations } from "next-intl";
import Section, { SectionHead } from "@/components/ui/Section";
import StudioCard from "@/components/ui/StudioCard";
import { labItems, type Lang, type LabKind } from "@/data/lab";


const KIND_ACCENT: Record<LabKind, "key" | "fill" | "rim"> = {
  teardown: "rim",
  campaign: "fill",
  creative: "key",
};

const KIND_ICON: Record<LabKind, string> = {
  // lupa sobre bloco
  teardown: "M4 5h18v14H4z M8 10h10 M8 14h6 M22 18a5 5 0 1 0 .01 0z M25.5 21.5 30 26",
  // estrutura de campanha
  campaign: "M15 3v6 M6 15v-3h18v3 M6 15v6h6v-6z M12 21v-6 M21 15v6h6v-6z M9 3h12v6H9z",
  // clipe de vídeo vertical
  creative: "M9 3h12v24H9z M12 6h6 M13 13l6 3.5-6 3.5z",
};

function KindIcon({ kind }: { kind: LabKind }) {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <path
        d={KIND_ICON[kind]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Lab() {
  const t = useTranslations("lab");
  const locale = useLocale() as Lang;
  const pick = (text: Partial<Record<Lang, string>> & { pt: string }) => text[locale] ?? text.pt;

  const empty = labItems.length === 0;

  return (
    <Section id="lab" depth="100" spot="rim">
      <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

      {empty ? (
        <div className="grid gap-5 md:grid-cols-3">
          {(t.raw("placeholders") as { kind: LabKind; label: string }[]).map((p, i) => (
            <Reveal
              key={p.label}
              y={22}
              delay={i * 0.08}
              className="flex flex-col gap-4 rounded-[20px] border border-dashed border-[var(--line)] bg-[color-mix(in_srgb,var(--bg-200)_60%,transparent)] p-7"
            >
              <div className="flex items-center justify-between">
                <span style={{ color: `var(--${KIND_ACCENT[p.kind]})` }}>
                  <KindIcon kind={p.kind} />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--tx-lo)] uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="font-display text-[24px] leading-tight text-[var(--tx-hi)]">
                  {p.label}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--tx-md)]">{t("soon")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {labItems.map((item, i) => {
            const accent = KIND_ACCENT[item.kind];
            const Wrapper = item.href ? "a" : "div";
            return (
              <Reveal key={item.id} y={24} delay={i * 0.07}>
                <StudioCard spot={accent} className="h-full">
                  <Wrapper
                    {...(item.href
                      ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex h-full flex-col p-7"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span style={{ color: `var(--${accent})` }}>
                        <KindIcon kind={item.kind} />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--tx-lo)]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[24px] leading-tight text-[var(--tx-hi)]">
                      {pick(item.title)}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--tx-md)]">
                      {pick(item.summary)}
                    </p>

                    <ul className="mt-5 flex flex-col gap-2.5 border-t border-[var(--line-soft)] pt-5">
                      {item.takeaways.map((tk, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-3 text-sm leading-relaxed text-[var(--tx-md)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                            style={{ background: `var(--${accent})` }}
                          />
                          {pick(tk)}
                        </li>
                      ))}
                    </ul>

                    {item.date && (
                      <span className="mt-auto pt-5 font-mono text-[10px] tracking-[0.16em] text-[var(--tx-lo)]">
                        {item.date}
                      </span>
                    )}
                  </Wrapper>
                </StudioCard>
              </Reveal>
            );
          })}
        </div>
      )}
    </Section>
  );
}
