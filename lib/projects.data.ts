export type Project = {
  id: string;
  cover: string;
  tags: string[];
  links?: { label: string; href: string }[];
  role: {
    pt: string;
    en: string;
    es: string;
  };
  title: {
    pt: string;
    en: string;
    es: string;
  };
  description: {
    pt: string;
    en: string;
    es: string;
  };
};

export const projects: Project[] = [
  {
    id: "studio-mag",
    cover: "/projects/studio-mag.jpg",
    tags: ["Premiere", "OBS", "DaVinci"],
    role: {
      pt: "Apresentação & Edição",
      en: "Hosting & Editing",
      es: "Presentación y Edición",
    },
    title: {
      pt: "Magazine de Estúdio",
      en: "Studio Magazine",
      es: "Magazine de Estudio",
    },
    description: {
      pt: "Programa piloto com entrevistas rápidas, VT e corte ao vivo integrado a gráficos leves.",
      en: "Pilot show mixing quick interviews, VTs and live cutting with light graphics.",
      es: "Piloto con entrevistas ágiles, VTs y corte en vivo con gráficos ligeros.",
    },
  },
  {
    id: "campus-doc",
    cover: "/projects/campus-doc.jpg",
    tags: ["Roteiro", "Captação", "Edição"],
    role: {
      pt: "Roteiro & Entrevistas",
      en: "Script & Interviews",
      es: "Guion y Entrevistas",
    },
    title: {
      pt: "Doc Campus 7am",
      en: "Campus Doc 7am",
      es: "Doc Campus 7am",
    },
    description: {
      pt: "Documentário curto sobre rotina matinal de curso, com captação leve e áudio limpo.",
      en: "Short doc on morning routines with nimble shooting and clean audio.",
      es: "Documental breve sobre rutinas matutinas con captura ligera y audio limpio.",
    },
  },
  {
    id: "vertical-promo",
    cover: "/projects/vertical-promo.jpg",
    tags: ["Vertical", "Social", "Motion"],
    role: {
      pt: "Produção & Finalização",
      en: "Production & Finishing",
      es: "Producción y Finalización",
    },
    title: {
      pt: "Promo Vertical",
      en: "Vertical Promo",
      es: "Promo Vertical",
    },
    description: {
      pt: "Série de chamadas curtas com ganchos rápidos, montagem ritmada e motion discreto.",
      en: "Short call-to-action series with fast hooks, rhythmic cuts and subtle motion.",
      es: "Serie de llamados cortos con ganchos rápidos, montaje rítmico y motion discreto.",
    },
  },
];
