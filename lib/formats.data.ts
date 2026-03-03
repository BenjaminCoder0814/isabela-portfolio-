import { Locale } from "@/i18n";

type Translated = Record<Locale, string>;

export type Format = {
  id: string;
  title: Translated;
  description: Translated;
  duration: string;
  deliverables: Record<Locale, string[]>;
  focus: string[];
  tone: "magenta" | "blue" | "green";
};

export const formats: Format[] = [
  {
    id: "studio-mag",
    title: {
      pt: "Magazine de Estúdio",
      en: "Studio Magazine",
      es: "Magazine de Estudio",
    },
    description: {
      pt: "Talk curto com abertura, vinheta leve, entrevistas ao vivo e VT com gráficos clean.",
      en: "Short talk show with opener, light stings, live interviews and clean VT graphics.",
      es: "Talk corto con apertura, cortinillas ligeras, entrevistas en vivo y VTs con gráficos limpios.",
    },
    duration: "12–18 min",
    deliverables: {
      pt: ["Roteiro + rundown", "Operação de estúdio e apresentação", "VTs curtos prontos", "Versão social em cortes"],
      en: ["Script + rundown", "Studio operation and hosting", "Short VT packages", "Social cutdowns"],
      es: ["Guion + rundown", "Operación de estudio y conducción", "VTs cortos listos", "Recortes sociales"],
    },
    focus: ["Studio", "Live cues", "Lower thirds"],
    tone: "magenta",
  },
  {
    id: "doc-short",
    title: {
      pt: "Doc curto campus",
      en: "Campus short doc",
      es: "Doc corto campus",
    },
    description: {
      pt: "Documentário ágil com captação leve, entrevistas objetivas e montagem ritmada.",
      en: "Agile doc with nimble shooting, concise interviews and rhythmic cutting.",
      es: "Doc ágil con captura ligera, entrevistas objetivas y montaje con ritmo.",
    },
    duration: "6–8 min",
    deliverables: {
      pt: ["Pesquisa e roteiro", "Captação enxuta", "Edição + sound design", "Legendagem e versão vertical"],
      en: ["Research and scripting", "Lean shooting", "Edit + sound design", "Captions and vertical version"],
      es: ["Investigación y guion", "Grabación ligera", "Edición + sound design", "Subtítulos y versión vertical"],
    },
    focus: ["Doc", "Field sound", "Color safe"],
    tone: "blue",
  },
  {
    id: "vertical-pack",
    title: {
      pt: "Pack vertical promo",
      en: "Vertical promo pack",
      es: "Pack vertical promo",
    },
    description: {
      pt: "Série de chamadas 9:16 com ganchos rápidos, motion leve e finalização pronta para social.",
      en: "9:16 promo series with fast hooks, light motion and social-ready finishing.",
      es: "Serie 9:16 con ganchos rápidos, motion ligero y final listo para social.",
    },
    duration: "3x 25–40s",
    deliverables: {
      pt: ["Roteiro e ganchos", "Captação ou curadoria de imagens", "Motion leve e gfx", "Master + versões com legendas"],
      en: ["Script and hooks", "Shooting or footage curation", "Light motion and gfx", "Master + captioned versions"],
      es: ["Guion y ganchos", "Grabación o curaduría de material", "Motion ligero y gráficos", "Master + versiones subtituladas"],
    },
    focus: ["Social", "Motion", "Captions"],
    tone: "green",
  },
];