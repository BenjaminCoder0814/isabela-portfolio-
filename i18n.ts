export const locales = ["pt", "en", "es"] as const;
export const defaultLocale = "pt";
export const localePrefix = "always";

export type Locale = (typeof locales)[number];
