"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { projects, ProjectTag } from "@/lib/projects.data";
import type { Locale } from "@/lib/utils";

const FILTERS: Array<{ key: string; tag: string }> = [
  { key: "all", tag: "all" },
  { key: "Hosting", tag: "Hosting" },
  { key: "Editing", tag: "Editing" },
  { key: "Script", tag: "Script" },
  { key: "Social", tag: "Social" },
  { key: "Production", tag: "Production" },
];

export default function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? projects
    : projects.filter((p) => p.tags.includes(active as ProjectTag));

  return (
    <SectionWrapper id="projects" alt>
      <div ref={ref} className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label-tag w-fit"
          >
            {t("label")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            {t("title")}
          </motion.h2>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map(({ key, tag }) => (
            <button
              key={key}
              onClick={() => setActive(tag)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 ${
                active === tag
                  ? "bg-[var(--accent1)] text-white"
                  : "bg-white border border-[var(--bg-2)] text-[var(--muted)] hover:border-[var(--accent1)] hover:text-[var(--accent1)]"
              }`}
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl border border-[var(--bg-2)] overflow-hidden cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Cover */}
                <div className="relative h-48 overflow-hidden bg-[var(--bg-2)]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ["#dde8ff,#f5d6ee", "#d6f5e6,#dde8ff", "#f5d6ee,#d6f5e6", "#ffe8d6,#dde8ff"][i % 4]
                      })`,
                    }}
                  />
                  {/* uncomment when real images are added */}
                  {/* <Image src={project.cover} alt={project.title[locale]} fill className="object-cover group-hover:scale-105 transition-transform duration-700" /> */}

                  {/* Overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-[var(--text)]/60 flex items-center justify-center"
                  >
                    <div className="flex gap-3">
                      {project.links.youtube && (
                        <a
                          href={project.links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-white rounded text-xs font-mono font-bold text-[var(--accent1)] hover:bg-[var(--accent1)] hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t("watch")}
                        </a>
                      )}
                      {project.links.drive && (
                        <a
                          href={project.links.drive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-white rounded text-xs font-mono font-bold text-[var(--accent1)] hover:bg-[var(--accent1)] hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t("view")}
                        </a>
                      )}
                    </div>
                  </motion.div>

                  {/* Tags */}
                  <div className="absolute top-3 right-3 flex gap-1 flex-wrap justify-end">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] font-bold tracking-widest uppercase bg-white/85 text-[var(--text)] px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="font-bold text-base text-[var(--text)] group-hover:text-[var(--accent1)] transition-colors">
                    {project.title[locale]}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-2">
                    {project.description[locale]}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {t("role")}: {project.role[locale]}
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
