"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";

export default function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" className="section-spacing dark-section">
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
            <motion.p
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
              className="mt-4 max-w-2xl text-base md:text-lg leading-[1.7] text-white/80"
            >
              {t("description")}
            </motion.p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              <Button href="https://wa.me/" variant="primary" className="w-full justify-center">
                {t("buttons.whatsapp")}
              </Button>
              <Button href="mailto:isabela@example.com" variant="ghost" className="w-full justify-center">
                {t("buttons.email")}
              </Button>
              <Button href="https://www.instagram.com" variant="ghost" className="w-full justify-center">
                {t("buttons.instagram")}
              </Button>
              <Button href="https://www.linkedin.com" variant="ghost" className="w-full justify-center">
                {t("buttons.linkedin")}
              </Button>
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              {t("availability")}
            </div>
          </div>
          <div className="glass rounded-2xl p-6 md:p-8">
            <form className="grid gap-4">
              <label className="text-sm font-semibold text-white/80">
                {t("form.name")}
                <input
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white focus:outline-none"
                  type="text"
                  name="name"
                  placeholder=""
                />
              </label>
              <label className="text-sm font-semibold text-white/80">
                {t("form.email")}
                <input
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white focus:outline-none"
                  type="email"
                  name="email"
                  placeholder=""
                />
              </label>
              <label className="text-sm font-semibold text-white/80">
                {t("form.message")}
                <textarea
                  className="mt-2 min-h-30 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white focus:outline-none"
                  name="message"
                  placeholder=""
                />
              </label>
              <Button type="submit" variant="primary" className="justify-center">
                {t("form.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
