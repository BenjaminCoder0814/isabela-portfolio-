"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { projects } from "@/lib/projects.data";
import Button from "@/components/ui/Button";

export default function Projects({ locale }: { locale: string }) {
  const t = useTranslations("projects");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const mapped = useMemo(
    () =>
      projects.map((p) => ({
        ...p,
        title: p.title[locale as "pt" | "en" | "es"],
        description: p.description[locale as "pt" | "en" | "es"],
        role: p.role[locale as "pt" | "en" | "es"],
      })),
    [locale]
  );

  return (
    <section id="projects" className="section-spacing dark-section">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              ref={ref}
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="stroke-heading"
            >
              {t("subtitle")}
            </motion.p>
            <motion.h2
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              className="mt-2 text-3xl font-semibold md:text-5xl"
            >
              {t("title")}
            </motion.h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {mapped.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.08 * idx, duration: 0.6, ease: "easeOut" }}
              className={`${idx % 3 === 0 ? "md:col-span-2" : ""} relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.35)]`}
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-(--glass) px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                  {project.role}
                </div>
              </div>
              <div className="flex flex-col gap-3 p-6 md:p-8">
                <div className="text-2xl font-semibold">{project.title}</div>
                <p className="text-base leading-relaxed text-white/80">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-white/60">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2">
                  <Button href="#" variant="ghost" size="sm">
                    {t("view")}
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
