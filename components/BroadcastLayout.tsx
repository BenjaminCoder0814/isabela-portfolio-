"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import CinematicIntro from "./CinematicIntro";
import BroadcastHUD from "./BroadcastHUD";

const CanvasParticles = dynamic(() => import("./CanvasParticles"), {
  ssr: false,
  loading: () => null,
});

interface BroadcastLayoutProps {
  locale: string;
  children: React.ReactNode;
}

export default function BroadcastLayout({ locale, children }: BroadcastLayoutProps) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* Bokeh particle background */}
      <CanvasParticles />

      {/* Fixed broadcast HUD overlay */}
      <BroadcastHUD />

      {/* Cinematic intro — Luz • Câmera • Ação */}
      {!introDone && <CinematicIntro />}

      {/* Main content */}
      {children}
    </>
  );
}
