"use client";

import { useRef, ReactNode, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
  /** dark broadcast block — navy/charcoal bg for alternating contrast */
  dark?: boolean;
}

export default function SectionWrapper({ id, children, className, alt, dark }: SectionWrapperProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger wipe reveal
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !innerRef.current) return;

      // Wipe from bottom — clip-path reveal
      gsap.fromTo(
        innerRef.current,
        {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
          y: 32,
        },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Stagger direct children (cards / list items)
      const cards = innerRef.current.querySelectorAll<HTMLElement>(
        "[data-card], .card, article, li"
      );
      if (cards.length > 1) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.07,
            delay: 0.25,
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    },
    { scope: wrapRef }
  );

  const bgClass = dark
    ? "bg-[#0B0D12] text-white"
    : alt
    ? "bg-[var(--bg-2)]"
    : "bg-[var(--bg)]";

  return (
    <section
      id={id}
      ref={wrapRef}
      className={cn("py-20 lg:py-28 overflow-hidden", bgClass, className)}
    >
      <div ref={innerRef} className="max-w-7xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}

