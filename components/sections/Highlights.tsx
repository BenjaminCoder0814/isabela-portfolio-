"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";

export default function Highlights() {
  const t = useTranslations("highlights");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [tab, setTab] = useState<"set" | "edit">("set");
  const setItems = useMemo(() => t.raw("setItems") as { title: string; description: string; badge: string }[], [t]);
  const editItems = useMemo(() => t.raw("editItems") as { title: string; description: string; badge: string }[], [t]);
  const items = tab === "set" ? setItems : editItems;

  return (
    <section id="highlights" className="section-spacing light-section">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              ref={ref}
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="stroke-heading text-(--muted-dark)"
            >
              {t("subtitle")}
            </motion.p>
            <motion.h2
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              className="mt-2 text-3xl font-semibold text-(--text) md:text-5xl"
            >
              {t("title")}
            </motion.h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 p-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--text)">
            <button
              type="button"
              onClick={() => setTab("set")}
              className={`rounded-full px-3 py-1 transition ${tab === "set" ? "bg-(--text) text-white" : "text-(--muted-dark)"}`}
            >
              {t("tabs.set")}
            </button>
            <button
              type="button"
              onClick={() => setTab("edit")}
              className={`rounded-full px-3 py-1 transition ${tab === "edit" ? "bg-(--text) text-white" : "text-(--muted-dark)"}`}
            >
              {t("tabs.edit")}
            </button>
          </div>
        </div>
        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-[1px] -translate-x-1/2 bg-linear-to-b from-(--magenta)/25 via-(--blue)/15 to-transparent md:block" aria-hidden />
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.05 * idx, duration: 0.6, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-(--magenta)/0 via-(--blue)/0 to-(--blue)/10 opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-(--muted-dark)">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-(--text)">
                    <span className="h-2 w-2 rounded-full bg-(--magenta)" />
                    {item.badge}
                  </span>
                  <span className="text-(--muted-dark)">{tab === "set" ? "TAKE" : "CH"} {String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="text-xl font-semibold text-(--text)">{item.title}</div>
                <p className="text-base leading-relaxed text-(--muted-dark)">{item.description}</p>
              </div>
              <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:backdrop-blur-sm" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
