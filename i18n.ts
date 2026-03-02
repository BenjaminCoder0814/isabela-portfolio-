export const locales = ["pt", "en", "es"] as const;
export const defaultLocale = "pt";
export const localePrefix = "always";
export type Locale = (typeof locales)[number];

export async function getRequestConfig({ locale }: { locale?: string } = {}) {
	const resolved = locale && locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
	const messages = (await import(`./messages/${resolved}.json`)).default;

	return {
		locales,
		defaultLocale,
		localePrefix,
		locale: resolved,
		messages,
	};
}

export default getRequestConfig;
