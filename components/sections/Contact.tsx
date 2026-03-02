"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const socialLinks = [
  {
    key: "whatsapp" as const,
    href: "https://wa.me/5511999999999",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    key: "email" as const,
    href: "mailto:isabela@email.com",
    color: "var(--accent1)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    key: "instagram" as const,
    href: "https://instagram.com/isabelamachado",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    key: "linkedin" as const,
    href: "https://linkedin.com/in/isabelamachado",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const t = useTranslations("contact");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Replace with EmailJS or Resend integration
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <SectionWrapper id="contact" alt>
      <div ref={ref} className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-xl">
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-[var(--muted)]"
          >
            {t("sub")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Social / contact buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-4"
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-4 bg-white rounded-xl border border-[var(--bg-2)] p-4 hover:shadow-md hover:border-transparent transition-all duration-200"
                style={{ "--hover-color": link.color } as React.CSSProperties}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: link.color }}
                >
                  {link.icon}
                </div>
                <div>
                  <p className="font-bold text-sm text-[var(--text)] group-hover:text-[var(--accent1)] transition-colors">
                    {t(link.key)}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {link.key === "whatsapp" ? "+55 (11) 99999-9999" :
                     link.key === "email" ? "isabela@email.com" :
                     link.key === "instagram" ? "@isabelamachado" :
                     "Isabela Machado"}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-auto text-[var(--muted)] group-hover:text-[var(--accent1)] transition-colors">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            ))}

            <p className="text-xs text-[var(--muted)] font-mono mt-2">
              📍 {t("location")}
            </p>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white rounded-xl border border-[var(--bg-2)] p-6"
          >
            <input
              required
              type="text"
              placeholder={t("form.name")}
              className="w-full px-4 py-3 rounded-lg border border-[var(--bg-2)] bg-[var(--bg)] text-sm placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent1)] transition-colors"
            />
            <input
              required
              type="email"
              placeholder={t("form.email")}
              className="w-full px-4 py-3 rounded-lg border border-[var(--bg-2)] bg-[var(--bg)] text-sm placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent1)] transition-colors"
            />
            <textarea
              required
              rows={4}
              placeholder={t("form.message")}
              className="w-full px-4 py-3 rounded-lg border border-[var(--bg-2)] bg-[var(--bg)] text-sm placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent1)] transition-colors resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 ${
                sent
                  ? "bg-[var(--accent3)] text-[var(--text)]"
                  : "bg-[var(--accent1)] text-white hover:bg-blue-700"
              }`}
            >
              {sent ? "✓ Enviado!" : t("form.send")}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
}
