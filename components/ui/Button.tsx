"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[var(--key-deep)] text-[#ffffff] shadow-[0_18px_40px_-22px_var(--key)] hover:-translate-y-0.5",
  outline:
    "border border-[var(--line-strong)] text-[var(--tx-hi)] hover:border-[var(--key)] hover:bg-[var(--glass)] hover:-translate-y-0.5",
  ghost: "text-[var(--tx-md)] hover:text-[var(--tx-hi)]",
};

function Sheen() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-linear-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:[animation:sheen_.75s_ease-out]"
    />
  );
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  external,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  type?: "button" | "submit";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  const inner = (
    <>
      {variant === "primary" && <Sheen />}
      <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          className={cls}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={cls}>
      {inner}
    </button>
  );
}
