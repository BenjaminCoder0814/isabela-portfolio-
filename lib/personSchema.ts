/**
 * JSON-LD do tipo Person. É o que faz um sistema de triagem por IA entender
 * o perfil em vez de só varrer texto solto.
 */

const KNOWS_ABOUT: Record<string, string[]> = {
  pt: [
    "Mídia paga",
    "Tráfego pago",
    "Google Ads",
    "Meta Ads",
    "Google Analytics 4",
    "Marketing de performance",
    "Criativo de performance",
    "Edição de vídeo",
    "Roteiro para vídeo",
    "Publicidade e propaganda",
  ],
  en: [
    "Paid media",
    "Paid traffic",
    "Google Ads",
    "Meta Ads",
    "Google Analytics 4",
    "Performance marketing",
    "Performance creative",
    "Video editing",
    "Video scriptwriting",
    "Advertising",
  ],
  es: [
    "Medios pagos",
    "Tráfico pago",
    "Google Ads",
    "Meta Ads",
    "Google Analytics 4",
    "Marketing de performance",
    "Creativo de performance",
    "Edición de video",
    "Guion para video",
    "Publicidad",
  ],
};

const JOB_TITLE: Record<string, string> = {
  pt: "Mídia Paga e Performance",
  en: "Paid Media & Performance Marketing",
  es: "Medios Pagos y Performance",
};

const DESCRIPTION: Record<string, string> = {
  pt: "Eu planejo a campanha, produzo o criativo e leio o resultado. Estudante de Publicidade e Propaganda no UNASP, disponível para estágio e vagas júnior, 100% remoto.",
  en: "I plan the campaign, produce the creative and read the results. Advertising student at UNASP, Brazil, open to internship and junior roles, 100% remote.",
  es: "Yo planifico la campaña, produzco el creativo y leo el resultado. Estudiante de Publicidad en UNASP, Brasil, abierta a prácticas y roles júnior, 100% remoto.",
};

const LANGUAGES: Record<string, string[]> = {
  pt: ["Português", "Inglês", "Espanhol"],
  en: ["Portuguese", "English", "Spanish"],
  es: ["Portugués", "Inglés", "Español"],
};

const SEEKS: Record<string, string> = {
  pt: "Estágio ou vaga júnior em mídia paga e performance — 100% remoto ou presencial na região de Campinas.",
  en: "Internship or junior role in paid media and performance marketing — 100% remote or on site in the Campinas region of Brazil.",
  es: "Prácticas o rol júnior en medios pagos y performance — 100% remoto o presencial en la región de Campinas, Brasil.",
};

export function personSchema(locale: string, siteUrl: string) {
  const l = locale in JOB_TITLE ? locale : "pt";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Isabela Machado",
    givenName: "Isabela",
    familyName: "Machado",
    jobTitle: JOB_TITLE[l],
    description: DESCRIPTION[l],
    email: "mailto:isam250500@gmail.com",
    telephone: "+55-19-98989-9317",
    url: `${siteUrl}/${l}`,
    image: `${siteUrl}/hero-photo.webp`,
    knowsAbout: KNOWS_ABOUT[l],
    knowsLanguage: LANGUAGES[l].map((name) => ({ "@type": "Language", name })),
    seeks: {
      "@type": "Demand",
      name: SEEKS[l],
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "UNASP — Centro Universitário Adventista de São Paulo",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Engenheiro Coelho",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Clínica MedCenter",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Artur Nogueira",
        addressRegion: "SP",
        addressCountry: "BR",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Engenheiro Coelho",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    sameAs: [
      "https://www.linkedin.com/in/isabelamachadomidia",
      "https://wa.me/5519989899317",
    ],
  };
}
