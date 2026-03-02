import clsx from "clsx";
import { ReactNode } from "react";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}
