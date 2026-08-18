"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Section, { SectionHead } from "@/components/ui/Section";
import StudioCard from "@/components/ui/StudioCard";

export const EMAIL = "isam250500@gmail.com";
export const LINKEDIN = "https://linkedin.com/in/isabelamachadomidia";
export const INSTAGRAM = "https://instagram.com/isabelamachado";
export const WHATSAPP = "https://wa.me/5519999999999";

const ICONS = {
  email: "M2 5h20v14H2z M2 6l10 7 10-7",
  whatsapp:
    "M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.6-2-1-.9 1a5 5 0 0 1-2.2-2.2l1-.9-1-2L9 9.5z",
  linkedin: "M4 9h4v11H4z M6 4.5h.01 M11 20V9h4v1.6A3.4 3.4 0 0 1 20 13v7h-4v-6a1.5 1.5 0 0 0-3 0v6z",
  instagram: "M4 4h16v16H4z M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M17.5 6.5h.01",
} as const;

export type Channel = keyof typeof ICONS;

export function ChannelIcon({ k, className = "h-4.5 w-4.5" }: { k: Channel; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} aria-hidden="true">
      <path
        d={ICONS[k]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  const channels: { k: Channel; label: string; href: string }[] = [
    { k: "email", label: t("email"), href: `mailto:${EMAIL}` },
    { k: "whatsapp", label: t("whatsapp"), href: WHATSAPP },
    { k: "linkedin", label: t("linkedin"), href: LINKEDIN },
    { k: "instagram", label: t("instagram"), href: INSTAGRAM },
  ];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Record<string, string> = {};
    if (name.length < 2) next.name = t("form.errName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = t("form.errEmail");
    if (message.length < 10) next.message = t("form.errMessage");
    setErrors(next);
    setNotice("");
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company: String(data.get("company") ?? ""),
        }),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      // Envio pelo servidor indisponível: abre o app de e-mail com tudo pronto.
      const subject = encodeURIComponent(`[Portfólio] ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus("idle");
      setNotice(t("form.fallback"));
    } catch {
      setStatus("error");
      setNotice(t("form.errNetwork"));
    }
  };

  const field =
    "peer w-full rounded-xl border border-[var(--line)] bg-[var(--bg-100)] px-4 pt-6 pb-2 text-[15px] text-[var(--tx-hi)] outline-none transition-colors placeholder-transparent focus:border-[var(--key)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--key)_45%,transparent)] aria-invalid:border-[var(--key)]";
  const label =
    "pointer-events-none absolute left-4 top-2 font-mono text-[10px] tracking-[0.16em] text-[var(--tx-lo)] uppercase transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-[13px] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-[0.16em] peer-focus:uppercase";
  const errCls =
    "mt-1.5 font-mono text-[10px] tracking-[0.12em] text-[var(--key)] uppercase";

  return (
    <Section id="contact" depth="000" spot="key">
      <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        {/* ── CANAIS ── */}
        <div className="flex flex-col gap-4">
          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
            {channels.map((c) => (
              <a
                key={c.k}
                href={c.href}
                target={c.k === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-200)] px-4 py-4 text-[var(--tx-hi)] transition-colors hover:border-[var(--key)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0 bg-[color-mix(in_srgb,var(--key)_16%,transparent)] transition-[width] duration-400 group-hover:w-full"
                />
                <span className="relative z-[1] text-[var(--key)]">
                  <ChannelIcon k={c.k} />
                </span>
                <span className="relative z-[1] font-mono text-[11px] tracking-[0.16em] uppercase">
                  {c.label}
                </span>
              </a>
            ))}
          </div>

          <StudioCard spot="rim" className="p-6">
            <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] text-[var(--rim)] uppercase">
              <span
                className="h-2 w-2 rounded-full bg-[var(--rim)] shadow-[0_0_8px_var(--rim)]"
                style={{ animation: "status-pulse 2.4s ease-in-out infinite" }}
                aria-hidden="true"
              />
              {t("availabilityLabel")}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--tx-md)]">
              {t("availability")}
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-[var(--tx-lo)]">
              {EMAIL}
            </p>
          </StudioCard>
        </div>

        {/* ── FORMULÁRIO ── */}
        <StudioCard spot="key" className="flex flex-col p-6 sm:p-7">
          <p className="eyebrow mb-5">{t("formLabel")}</p>

          <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-4" noValidate>
            {/* honeypot — invisível para humano */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 opacity-0"
            />

            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t("form.name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
                className={field}
              />
              <label htmlFor="name" className={label}>
                {t("form.name")}
              </label>
              {errors.name && (
                <p id="err-name" className={errCls}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("form.email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
                className={field}
              />
              <label htmlFor="email" className={label}>
                {t("form.email")}
              </label>
              {errors.email && (
                <p id="err-email" className={errCls}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative flex-1">
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder={t("form.message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "err-message" : undefined}
                className={`${field} h-full min-h-[150px] resize-y`}
              />
              <label htmlFor="message" className={label}>
                {t("form.message")}
              </label>
              {errors.message && (
                <p id="err-message" className={errCls}>
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--key-deep)] px-6 py-3.5 font-mono text-[11px] font-bold tracking-[0.18em] text-[#ffffff] uppercase transition-transform hover:scale-[1.02] disabled:scale-100 disabled:bg-[var(--bg-300)] disabled:text-[var(--tx-md)]"
            >
              {status === "sending" && (
                <span
                  className="h-2 w-2 rounded-full bg-current"
                  style={{ animation: "status-pulse 1s ease-in-out infinite" }}
                  aria-hidden="true"
                />
              )}
              {status === "sent" && <span aria-hidden="true">✓</span>}
              {status === "idle" && t("form.send")}
              {status === "error" && t("form.send")}
              {status === "sending" && t("form.sending")}
              {status === "sent" && t("form.sent")}
            </button>

            <p
              role="status"
              aria-live="polite"
              className="min-h-[1.4em] font-mono text-[10px] leading-relaxed tracking-[0.1em] text-[var(--tx-lo)] uppercase"
            >
              {notice || (status === "sent" ? t("form.sentNote") : t("form.note"))}
            </p>
          </form>
        </StudioCard>
      </div>
    </Section>
  );
}
