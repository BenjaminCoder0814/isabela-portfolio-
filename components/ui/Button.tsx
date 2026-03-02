"use client";

import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  href?: string;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  className?: string;
}

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base = clsx(
    "inline-flex items-center gap-2 rounded-full font-semibold transition focus:outline-none",
    size === "md" ? "px-5 py-3 text-sm uppercase tracking-[0.2em]" : "px-4 py-2 text-xs uppercase tracking-[0.18em]",
    variant === "primary"
      ? "bg-(--magenta) text-white shadow-lg shadow-(--magenta)/30 hover:brightness-110"
      : "border border-white/20 bg-white/5 text-white hover:bg-white/10",
    className
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }
  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
