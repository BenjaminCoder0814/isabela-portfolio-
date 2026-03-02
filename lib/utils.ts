import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimecode(date: Date): string {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  const ff = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, "0");
  return `${hh}:${mm}:${ss}:${ff}`;
}

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
