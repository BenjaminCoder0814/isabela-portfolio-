"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide rounded transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent1)]";
  const variants = {
    primary: "bg-[var(--accent1)] text-white hover:bg-blue-700 shadow-md shadow-blue-500/20",
    outline: "border-2 border-[var(--text)] text-[var(--text)] hover:bg-[var(--text)] hover:text-white",
    ghost: "text-[var(--accent1)] hover:bg-[var(--accent1)]/10",
  };

  const content = (
    <motion.span
      className={cn(base, variants[variant], className)}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:translate-x-0.5"
      >
        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group"
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="group">
      {content}
    </button>
  );
}
