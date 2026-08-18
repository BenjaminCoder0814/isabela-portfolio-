"use client";

import { useRef, type ReactNode } from "react";

/**
 * Card padrão do site. O glow radial segue o cursor
 * (efeito "spot batendo no card") via CSS custom properties.
 */
export default function StudioCard({
  children,
  className = "",
  spot,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  spot?: "key" | "fill" | "rim" | "warm";
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      className={`card-studio ${className}`}
      style={spot ? ({ ["--spot" as string]: `var(--${spot})` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
