import { useTranslations } from "next-intl";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  return (
    <footer className="section-spacing light-section">
      <div className="section-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-(--text)">
        <div className="text-sm text-(--muted-dark)">{t("rights")}</div>
        <a
          href={`/${locale}/pdf`}
          className="rounded-full bg-(--text) px-4 py-2 text-sm font-semibold text-(--bg-light) shadow-sm"
        >
          {t("pdf")}
        </a>
      </div>
    </footer>
  );
}
