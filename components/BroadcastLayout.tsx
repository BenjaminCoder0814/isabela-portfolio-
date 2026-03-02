"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import IntroBoot from "./IntroBoot";
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

      {/* Boot preloader — shown once per page load */}
      {!introDone && (
        <IntroBoot locale={locale} onDone={() => setIntroDone(true)} />
      )}

      {/* Main content */}
      {children}
    </>
  );
}
