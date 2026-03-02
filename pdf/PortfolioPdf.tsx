import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { pdfStyles as S } from "./pdfStyles";
import { projects } from "@/lib/projects.data";
import type { Locale } from "@/lib/utils";

// i18n data for PDF (flat, no next-intl needed server-side in PDF)
const messages: Record<Locale, {
  eyebrow: string;
  about: string;
  highlights: string[];
  skills: string[];
  tools: string[];
  degree: string;
  semester: string;
  institution: string;
  languages: string[];
  contactLabel: string;
}> = {
  pt: {
    eyebrow: "Rádio & TV · Conteúdo · Apresentação · Edição",
    about: "Sou Isabela Machado, estudante de Rádio e TV (1º semestre), com atuação em criação de conteúdo, comunicação e audiovisual. Transformo ideias em narrativas curtas, bonitas e claras — prontas para público e marca.",
    highlights: ["Apresentação & Locução", "Roteiro & Pauta", "Edição de Vídeo", "Captação & Fotografia", "Direção de Conteúdo", "Social Media Video"],
    skills: ["Apresentação & Locução", "Roteiro & Pauta", "Edição de Vídeo", "Captação", "Direção de Conteúdo", "Social Video"],
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects", "CapCut", "Photoshop", "Canva", "OBS Studio", "Lightroom"],
    degree: "Rádio e Televisão",
    semester: "1º Semestre — Em andamento",
    institution: "Universidade",
    languages: ["Português Nativo", "Inglês Intermediário", "Espanhol Básico"],
    contactLabel: "Contato",
  },
  en: {
    eyebrow: "Broadcast · Content · Hosting · Editing",
    about: "I'm Isabela Machado, a Radio & TV student (1st semester), focused on content creation, communication, and audiovisual production. I turn ideas into short, beautiful, and clear narratives — ready for audiences and brands.",
    highlights: ["Hosting & Voice-over", "Scriptwriting & Brief", "Video Editing", "Capturing & Photography", "Content Direction", "Social Media Video"],
    skills: ["Hosting & Voice-over", "Scriptwriting & Brief", "Video Editing", "Capturing", "Content Direction", "Social Video"],
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects", "CapCut", "Photoshop", "Canva", "OBS Studio", "Lightroom"],
    degree: "Radio and Television",
    semester: "1st Semester — In progress",
    institution: "University",
    languages: ["Native Portuguese", "Intermediate English", "Basic Spanish"],
    contactLabel: "Contact",
  },
  es: {
    eyebrow: "Radio y TV · Contenido · Presentación · Edición",
    about: "Soy Isabela Machado, estudiante de Radio y TV (1º semestre), con experiencia en creación de contenido, comunicación y producción audiovisual. Transformo ideas en narrativas cortas, bellas y claras — listas para público y marca.",
    highlights: ["Presentación & Locución", "Guion & Pauta", "Edición de Video", "Captación & Fotografía", "Dirección de Contenido", "Social Media Video"],
    skills: ["Presentación & Locución", "Guion & Pauta", "Edición de Video", "Captación", "Dirección de Contenido", "Social Video"],
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects", "CapCut", "Photoshop", "Canva", "OBS Studio", "Lightroom"],
    degree: "Radio y Televisión",
    semester: "1er Semestre — En progreso",
    institution: "Universidad",
    languages: ["Portugués Nativo", "Inglés Intermediario", "Español Básico"],
    contactLabel: "Contacto",
  },
};

interface PortfolioPdfProps {
  locale: Locale;
}

export default function PortfolioPdf({ locale }: PortfolioPdfProps) {
  const m = messages[locale];
  const localProjects = projects.slice(0, 4);

  return (
    <Document
      title={`Isabela Machado — Portfolio`}
      author="Isabela Machado"
      subject={m.eyebrow}
    >
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={S.header}>
          <View>
            <Text style={S.name}>Isabela Machado</Text>
            <Text style={S.title}>{m.eyebrow}</Text>
          </View>
          <View style={S.contactBlock}>
            <Text style={S.contactItem}>isabela@email.com</Text>
            <Text style={S.contactItem}>+55 (11) 99999-9999</Text>
            <Text style={S.contactItem}>instagram.com/isabelamachado</Text>
            <Text style={S.contactItem}>linkedin.com/in/isabelamachado</Text>
            <Text style={S.contactItem}>São Paulo, SP — Brasil</Text>
          </View>
        </View>

        {/* About */}
        <Text style={S.sectionLabel}>
          {locale === "pt" ? "Sobre" : locale === "en" ? "About" : "Sobre mí"}
        </Text>
        <Text style={S.bodyText}>{m.about}</Text>
        <View style={S.divider} />

        {/* Highlights */}
        <Text style={S.sectionLabel}>
          {locale === "pt" ? "Destaques" : locale === "en" ? "Highlights" : "Destacados"}
        </Text>
        <View style={S.highlightsRow}>
          {m.highlights.map((h) => (
            <Text key={h} style={S.chip}>{h}</Text>
          ))}
        </View>
        <View style={S.divider} />

        {/* Skills */}
        <Text style={S.sectionLabel}>
          {locale === "pt" ? "Skills & Tools" : locale === "en" ? "Skills & Tools" : "Skills & Tools"}
        </Text>
        <View style={S.highlightsRow}>
          {m.skills.map((s) => (
            <Text key={s} style={S.chip}>{s}</Text>
          ))}
        </View>
        <View style={{ ...S.highlightsRow, marginTop: 4 }}>
          {m.tools.map((tool) => (
            <Text key={tool} style={S.toolChip}>{tool}</Text>
          ))}
        </View>
        <View style={S.divider} />

        {/* Education */}
        <Text style={S.sectionLabel}>
          {locale === "pt" ? "Formação" : locale === "en" ? "Education" : "Formación"}
        </Text>
        <Text style={{ ...S.bodyText, fontFamily: "Helvetica-Bold" }}>{m.degree}</Text>
        <Text style={{ ...S.bodyText, marginTop: -8, color: "#6b6b6b" }}>{m.institution} — {m.semester}</Text>
        <Text style={{ ...S.bodyText, marginTop: -4, color: "#6b6b6b" }}>
          {locale === "pt" ? "Idiomas: " : locale === "en" ? "Languages: " : "Idiomas: "}
          {m.languages.join(" · ")}
        </Text>
        <View style={S.divider} />

        {/* Projects */}
        <Text style={S.sectionLabel}>
          {locale === "pt" ? "Projetos Selecionados" : locale === "en" ? "Selected Projects" : "Proyectos Seleccionados"}
        </Text>
        {localProjects.map((p) => (
          <View key={p.slug} style={S.projectCard}>
            <Text style={S.projectTitle}>{p.title[locale]}</Text>
            <Text style={S.projectRole}>{p.role[locale]} · {p.year}</Text>
            <Text style={S.projectDesc}>{p.description[locale]}</Text>
          </View>
        ))}

        {/* Footer */}
        <View style={S.footer} fixed>
          <Text style={S.footerText}>Isabela Machado — Portfolio {new Date().getFullYear()}</Text>
          <Text style={S.footerText}>isabela@email.com · +55 (11) 99999-9999</Text>
        </View>
      </Page>
    </Document>
  );
}
