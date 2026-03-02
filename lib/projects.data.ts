export type ProjectTag = "Hosting" | "Editing" | "Script" | "Social" | "Production";

export interface Project {
  slug: string;
  title: { pt: string; en: string; es: string };
  role: { pt: string; en: string; es: string };
  year: string;
  tags: ProjectTag[];
  cover: string;
  links: {
    youtube?: string;
    drive?: string;
    instagram?: string;
  };
  description: {
    pt: string;
    en: string;
    es: string;
  };
}

export const projects: Project[] = [
  {
    slug: "programa-piloto",
    title: { pt: "Programa Piloto", en: "Pilot Show", es: "Programa Piloto" },
    role: { pt: "Apresentação + Roteiro", en: "Hosting + Script", es: "Presentación + Guion" },
    year: "2026",
    tags: ["Hosting", "Script"],
    cover: "/images/projects/programa-piloto.jpg",
    links: {
      youtube: "https://youtube.com",
    },
    description: {
      pt: "Programa piloto desenvolvido como projeto acadêmico. Apresentação, roteiro e produção completa de um formato de entrevista.",
      en: "Pilot show developed as an academic project. Full hosting, scripting, and production of an interview format.",
      es: "Programa piloto desarrollado como proyecto académico. Presentación, guion y producción completa de un formato de entrevista.",
    },
  },
  {
    slug: "mini-doc",
    title: { pt: "Mini Documentário", en: "Mini Documentary", es: "Mini Documental" },
    role: { pt: "Roteiro + Edição", en: "Script + Editing", es: "Guion + Edición" },
    year: "2025",
    tags: ["Script", "Editing"],
    cover: "/images/projects/mini-doc.jpg",
    links: {
      drive: "https://drive.google.com",
    },
    description: {
      pt: "Mini documentário de 5 min explorando periferia sonora urbana. Captação, roteiro e edição solo.",
      en: "5-min mini documentary exploring urban sonic periphery. Solo capture, script, and editing.",
      es: "Mini documental de 5 min explorando la periferia sonora urbana. Captación, guion y edición en solitario.",
    },
  },
  {
    slug: "reels-marca",
    title: { pt: "Reels para Marca", en: "Brand Reels", es: "Reels de Marca" },
    role: { pt: "Produção + Edição", en: "Production + Editing", es: "Producción + Edición" },
    year: "2025",
    tags: ["Social", "Editing", "Production"],
    cover: "/images/projects/reels-marca.jpg",
    links: {
      instagram: "https://instagram.com",
    },
    description: {
      pt: "Série de reels para marca local: conceito, captação e edição com identidade visual forte.",
      en: "Reels series for a local brand: concept, capture, and editing with strong visual identity.",
      es: "Serie de reels para marca local: concepto, captación y edición con fuerte identidad visual.",
    },
  },
  {
    slug: "cobertura-evento",
    title: { pt: "Cobertura de Evento", en: "Event Coverage", es: "Cobertura de Evento" },
    role: { pt: "Câmera + Edição", en: "Camera + Editing", es: "Cámara + Edición" },
    year: "2025",
    tags: ["Production", "Editing"],
    cover: "/images/projects/cobertura-evento.jpg",
    links: {
      youtube: "https://youtube.com",
    },
    description: {
      pt: "Cobertura audiovisual completa de evento cultural: captação, entrevistas e entrega em 24h.",
      en: "Full audiovisual coverage of a cultural event: capture, interviews, and delivery within 24h.",
      es: "Cobertura audiovisual completa de evento cultural: captación, entrevistas y entrega en 24h.",
    },
  },
];
