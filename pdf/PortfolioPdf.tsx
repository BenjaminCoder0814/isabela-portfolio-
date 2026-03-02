"use client";

import { Document, Page, Text, View, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects.data";
import { pdfStyles } from "./pdfStyles";

export function PortfolioPdf({ locale, preview = false }: { locale: string; preview?: boolean }) {
  const t = useTranslations();
  const doc = (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 700 }}>Isabela Machado</Text>
          <Text style={{ fontSize: 12, color: "#A9B0C2" }}>{t("hero.tag")}</Text>
        </View>

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.heading}>{t("about.title")}</Text>
          <Text style={pdfStyles.text}>{t("about.body")}</Text>
        </View>

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.heading}>{t("highlights.title")}</Text>
          <View>
            {(t.raw("highlights.items") as { title: string; description: string }[]).map((item) => (
              <View key={item.title} style={pdfStyles.card}>
                <Text style={{ fontWeight: 700 }}>{item.title}</Text>
                <Text style={pdfStyles.text}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.heading}>{t("projects.title")}</Text>
          <View>
            {projects.map((p) => (
              <View key={p.id} style={pdfStyles.card}>
                <Text style={{ fontWeight: 700 }}>{p.title[locale as "pt" | "en" | "es"]}</Text>
                <Text style={{ fontSize: 10, color: "#A9B0C2", marginBottom: 4 }}>
                  {p.role[locale as "pt" | "en" | "es"]}
                </Text>
                <Text style={pdfStyles.text}>{p.description[locale as "pt" | "en" | "es"]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.heading}>{t("skills.title")}</Text>
          <View style={pdfStyles.chips}>
            {(t.raw("skills.tools") as string[]).map((tool) => (
              <Text key={tool} style={pdfStyles.chip}>
                {tool}
              </Text>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: 700 }}>{t("contact.title")}</Text>
          <Text style={pdfStyles.text}>{t("contact.availability")}</Text>
        </View>
      </Page>
    </Document>
  );

  if (preview) {
    return (
      <PDFViewer style={{ width: "100%", height: "90vh" }} showToolbar={false}>
        {doc}
      </PDFViewer>
    );
  }

  return doc;
}

export function PdfDownload({ locale, label }: { locale: string; label: string }) {
  return (
    <PDFDownloadLink
      document={<PortfolioPdf locale={locale} />}
      fileName={`isabela-portfolio-${locale}.pdf`}
      className="inline-flex items-center gap-2 rounded-full bg-(--magenta) px-4 py-2 text-sm font-semibold text-white shadow-lg"
    >
      {label}
    </PDFDownloadLink>
  );
}

export default PdfDownload;
