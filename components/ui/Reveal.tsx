"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Tag = "div" | "p" | "li" | "ul" | "ol" | "section" | "span";

/**
 * Revelação no scroll com IntersectionObserver NATIVO.
 *
 * Por que não usar `whileInView` do framer-motion: as features do LazyMotion
 * chegam num chunk separado, depois da hidratação. Se o elemento entra em
 * viewport antes disso, o observador ainda não existe e o `initial:{opacity:0}`
 * fica aplicado para sempre — texto no DOM, invisível na tela. Foi exatamente
 * o que aconteceu com os parágrafos da seção "Sobre".
 *
 * Aqui não há chunk extra: o observador sobe junto com a hidratação. E o
 * <noscript> no layout garante conteúdo visível se o JS não rodar.
 */
export default function Reveal({
  as: TagName = "div",
  delay = 0,
  y = 22,
  className = "",
  style,
  children,
}: {
  as?: Tag;
  /** atraso em segundos */
  delay?: number;
  /** deslocamento vertical inicial, em px */
  y?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      el.dataset.reveal = "in";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    /* já visível na carga: revela sem esperar o observador */
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);

    /* rede de segurança: se por algum motivo o observador não disparar,
       nada fica invisível */
    const failsafe = setTimeout(reveal, 2000);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  const Tag = TagName as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      data-reveal=""
      className={className}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
