"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Section, { SectionHead } from "@/components/ui/Section";

const EASE = [0.16, 1, 0.3, 1] as const;
const ACCENTS = ["key", "fill", "rim", "warm"] as const;

type Step = { title: string; desc: string };

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });
  /* a linha se desenha conforme o scroll */
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotOffset = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="process" depth="100" spot="key">
      <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

      <div ref={ref} className="relative">
        {/* trilho horizontal — desktop */}
        <div className="pointer-events-none absolute inset-x-0 top-[26px] hidden xl:block">
          <svg viewBox="0 0 1000 4" preserveAspectRatio="none" className="h-1 w-full" aria-hidden="true">
            <line x1="0" y1="2" x2="1000" y2="2" stroke="var(--line)" strokeWidth="1.4" />
            <m.line
              x1="0"
              y1="2"
              x2="1000"
              y2="2"
              stroke="var(--key)"
              strokeWidth="1.6"
              strokeOpacity="0.75"
              style={{ pathLength: draw }}
            />
          </svg>
          {/* ponto de luz percorrendo o trilho */}
          <m.span
            aria-hidden="true"
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--key)]"
            style={{ left: dotOffset, boxShadow: "0 0 16px 3px var(--key)" }}
          />
        </div>

        {/* trilho vertical — mobile */}
        <div className="pointer-events-none absolute top-0 left-[26px] h-full w-px bg-[var(--line)] xl:hidden" aria-hidden="true">
          <m.span
            className="absolute inset-x-0 top-0 w-px origin-top bg-[var(--key)]"
            style={{ height: "100%", scaleY: draw }}
          />
        </div>

        <ol className="grid gap-9 pl-16 xl:grid-cols-4 xl:gap-6 xl:pl-0">
          {steps.map((step, i) => (
            <m.li
              key={step.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className="absolute top-[2px] -left-16 grid h-[52px] w-[52px] place-items-center rounded-full border font-mono text-[12px] font-bold xl:static xl:mb-6"
                style={{
                  borderColor: `color-mix(in srgb, var(--${ACCENTS[i]}) 55%, transparent)`,
                  background: "var(--bg-100)",
                  color: "var(--tx-hi)",
                  boxShadow: `0 0 28px -10px var(--${ACCENTS[i]})`,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="font-display text-[26px] leading-tight text-[var(--tx-hi)]">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[36ch] text-[15px] leading-relaxed text-[var(--tx-md)]">
                {step.desc}
              </p>
            </m.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
