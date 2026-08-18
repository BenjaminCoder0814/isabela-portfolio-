"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Carrega as features do framer-motion em um chunk separado, depois da
 * hidratação. O bundle inicial leva só o componente `m`, que é mínimo.
 *
 * domMax (e não domAnimation) porque a navbar usa animação de layout
 * (`layoutId`) no indicador de seção ativa.
 */
const loadFeatures = () => import("framer-motion").then((mod) => mod.domMax);

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
