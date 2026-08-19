/**
 * Resolve a URL pública do site.
 *
 * Cuidados que valem a pena aqui — o build já quebrou por causa deles:
 *
 * 1. `??` NÃO protege de string vazia. Uma variável criada na Vercel e
 *    deixada em branco vira "", passa pelo `??` e `new URL("")` lança
 *    `ERR_INVALID_URL`, derrubando o build inteiro.
 * 2. É comum digitar o domínio sem protocolo ("meusite.com.br"), o que
 *    também não é uma URL válida. Aqui o https:// é acrescentado.
 * 3. Se nada estiver configurado, a Vercel injeta o domínio sozinha em
 *    VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL. Melhor usar isso do que
 *    publicar com um domínio placeholder no og:image.
 *
 * Em último caso devolve localhost, que é o certo em desenvolvimento e
 * nunca derruba o build.
 */

const FALLBACK = "http://localhost:3000";

function normalize(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  return (
    normalize(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalize(process.env.VERCEL_URL) ??
    FALLBACK
  );
}
