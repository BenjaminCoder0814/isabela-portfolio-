import { Document, Page, Text, View } from "@react-pdf/renderer";
import { pdfStyles as S, C } from "./pdfStyles";
import type { Locale } from "@/lib/utils";

const EMAIL = "isam250500@gmail.com";
const LINKEDIN = "linkedin.com/in/isabelamachadomidia";
const LOCATION = "Engenheiro Coelho / Campinas, SP — Brasil";

type Copy = {
  role: string;
  headline: string;
  intro: string;
  bridgeTitle: string;
  bridgeLeftLabel: string;
  bridgeLeft: string;
  bridgeRightLabel: string;
  bridgeRight: string;
  bridgeCenter: string;
  deliverTitle: string;
  deliver: { title: string; bullets: string[] }[];
  processTitle: string;
  steps: { title: string; desc: string }[];
  stackTitle: string;
  groups: { name: string; tools: string[] }[];
  eduTitle: string;
  edu: { title: string; meta: string }[];
  expTitle: string;
  exp: { title: string; meta: string; desc: string }[];
  volTitle: string;
  vol: { title: string; meta: string; desc: string }[];
  langTitle: string;
  langs: string[];
  availability: string;
};

const COPY: Record<Locale, Copy> = {
  pt: {
    role: "MÍDIA PAGA · PERFORMANCE · CRIATIVO",
    headline: "Eu planejo a campanha, produzo o criativo e leio o resultado.",
    intro:
      "Estudante de Publicidade e Propaganda no UNASP. Junto disciplina com dado, vinda da rotina de faturamento em um centro médico, com linguagem audiovisual, vinda de um semestre em Rádio e TV. Disponível para estágio e vagas júnior, 100% remoto.",
    bridgeTitle: "POR QUE MÍDIA PAGA",
    bridgeLeftLabel: "Disciplina com dado",
    bridgeLeft:
      "Departamento pessoal e faturamento em um centro médico: conferência, prazo, planilha e responsabilidade sobre valores que não podem estar errados.",
    bridgeRightLabel: "Linguagem audiovisual",
    bridgeRight:
      "Rádio e TV, mais roteiro, atuação, figurino e cenário em um musical. Roteirizar, gravar, apresentar e editar um vídeo do início ao fim.",
    bridgeCenter:
      "A profissional que planeja a campanha, produz o criativo e lê o resultado — em vez de depender de três pessoas diferentes para isso.",
    deliverTitle: "O QUE EU ENTREGO",
    deliver: [
      {
        title: "Campanhas de mídia paga",
        bullets: [
          "Google Ads e Meta Ads",
          "Estrutura de campanha, públicos, orçamento e otimização",
          "Leitura de CTR, CPC, CPA e ROAS",
        ],
      },
      {
        title: "Criativo de performance",
        bullets: [
          "Roteiro, gravação e edição de vídeo curto",
          "Variações para teste A/B",
          "Legendas e formatos verticais",
        ],
      },
      {
        title: "Conteúdo & social",
        bullets: ["Calendário editorial", "Copy e adaptação de formatos", "Consistência de tom de voz"],
      },
    ],
    processTitle: "PROCESSO",
    steps: [
      { title: "Briefing & objetivo", desc: "O que precisa acontecer, para quem, com qual verba e prazo." },
      { title: "Criativo", desc: "Roteiro, gravação e edição, já com as variações de teste." },
      { title: "Campanha no ar", desc: "Estrutura, públicos, orçamento e acompanhamento diário." },
      { title: "Leitura e otimização", desc: "O que o número diz, o que corta, o que escala." },
    ],
    stackTitle: "STACK",
    groups: [
      { name: "MÍDIA & DADOS", tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Excel / Sheets"] },
      { name: "CRIAÇÃO", tools: ["Premiere Pro", "DaVinci Resolve", "CapCut", "Canva", "Figma"] },
      { name: "ORGANIZAÇÃO", tools: ["Notion", "Google Workspace"] },
    ],
    eduTitle: "FORMAÇÃO",
    edu: [
      { title: "Publicidade e Propaganda — UNASP, Engenheiro Coelho", meta: "ago/2026 – dez/2030 (em andamento)" },
      { title: "Rádio, TV e Internet — UNASP", meta: "jan – jul/2026 · 1º semestre cursado" },
      { title: "Ensino médio — UNASP-EC", meta: "2023 – 2025" },
    ],
    expTitle: "EXPERIÊNCIA",
    exp: [
      {
        title: "Assistente Administrativa — Clínica MedCenter",
        meta: "Artur Nogueira, SP · desde jan/2026 · meio período",
        desc: "Departamento pessoal e faturamento. Rotina de conferência, prazos e controle de valores.",
      },
    ],
    volTitle: "VOLUNTARIADO",
    vol: [
      {
        title: "Musical “Eis o Cordeiro”",
        meta: "UNASP-EC · mar–abr/2025",
        desc: "Roteiro, atuação, figurino, cenário e seleção musical.",
      },
      {
        title: "Missão Xerente 2025",
        meta: "Tocantins · jun/2025",
        desc: "15 dias de serviço voluntário em comunidade indígena Xerente.",
      },
    ],
    langTitle: "IDIOMAS",
    langs: ["Português nativo", "Inglês intermediário", "Espanhol básico"],
    availability: "Disponível para estágio e vagas júnior — 100% remoto ou presencial na região de Campinas.",
  },
  en: {
    role: "PAID MEDIA · PERFORMANCE · CREATIVE",
    headline: "I plan the campaign, produce the creative and read the results.",
    intro:
      "Advertising student at UNASP, Brazil. I combine discipline with data, from a billing routine at a medical centre, with audiovisual craft, from a semester in Radio & TV. Open to internship and junior roles, 100% remote.",
    bridgeTitle: "WHY PAID MEDIA",
    bridgeLeftLabel: "Discipline with data",
    bridgeLeft:
      "Payroll and billing at a medical centre: double-checking, deadlines, spreadsheets and responsibility over figures that cannot be wrong.",
    bridgeRightLabel: "Audiovisual language",
    bridgeRight:
      "Radio & TV, plus script, acting, costume and set for a musical. Scripting, shooting, hosting and editing a video end to end.",
    bridgeCenter:
      "The professional who plans the campaign, produces the creative and reads the results — instead of depending on three different people for it.",
    deliverTitle: "WHAT I DELIVER",
    deliver: [
      {
        title: "Paid media campaigns",
        bullets: [
          "Google Ads and Meta Ads",
          "Campaign structure, audiences, budget and optimisation",
          "Reading CTR, CPC, CPA and ROAS",
        ],
      },
      {
        title: "Performance creative",
        bullets: ["Script, shoot and edit for short video", "Variations built for A/B testing", "Captions and vertical formats"],
      },
      {
        title: "Content & social",
        bullets: ["Editorial calendar", "Copy and format adaptation", "Consistent tone of voice"],
      },
    ],
    processTitle: "PROCESS",
    steps: [
      { title: "Brief & objective", desc: "What needs to happen, for whom, on what budget and by when." },
      { title: "Creative", desc: "Script, shoot and edit, already with the test variations." },
      { title: "Campaign live", desc: "Structure, audiences, budget and daily monitoring." },
      { title: "Read and optimise", desc: "What the numbers say, what to cut, what to scale." },
    ],
    stackTitle: "STACK",
    groups: [
      { name: "MEDIA & DATA", tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Excel / Sheets"] },
      { name: "CREATION", tools: ["Premiere Pro", "DaVinci Resolve", "CapCut", "Canva", "Figma"] },
      { name: "ORGANISATION", tools: ["Notion", "Google Workspace"] },
    ],
    eduTitle: "EDUCATION",
    edu: [
      { title: "Advertising — UNASP, Engenheiro Coelho, Brazil", meta: "Aug 2026 – Dec 2030 (in progress)" },
      { title: "Radio, TV and Internet — UNASP", meta: "Jan – Jul 2026 · first semester completed" },
      { title: "High school — UNASP-EC", meta: "2023 – 2025" },
    ],
    expTitle: "EXPERIENCE",
    exp: [
      {
        title: "Administrative Assistant — MedCenter Clinic",
        meta: "Artur Nogueira, Brazil · since Jan 2026 · part time",
        desc: "Payroll and billing. Routine of double-checking, deadlines and control over figures.",
      },
    ],
    volTitle: "VOLUNTEERING",
    vol: [
      {
        title: "“Eis o Cordeiro” musical",
        meta: "UNASP-EC · Mar–Apr 2025",
        desc: "Script, acting, costume, set and music selection.",
      },
      {
        title: "Xerente Mission 2025",
        meta: "Tocantins · Jun 2025",
        desc: "15 days of volunteer service in a Xerente indigenous community.",
      },
    ],
    langTitle: "LANGUAGES",
    langs: ["Native Portuguese", "Intermediate English", "Basic Spanish"],
    availability: "Open to internship and junior roles — 100% remote, or on site in the Campinas region.",
  },
  es: {
    role: "MEDIOS PAGOS · PERFORMANCE · CREATIVO",
    headline: "Yo planifico la campaña, produzco el creativo y leo el resultado.",
    intro:
      "Estudiante de Publicidad en UNASP, Brasil. Uno disciplina con dato, de la rutina de facturación en un centro médico, con lenguaje audiovisual, de un semestre en Radio y TV. Disponible para prácticas y roles júnior, 100% remoto.",
    bridgeTitle: "POR QUÉ MEDIOS PAGOS",
    bridgeLeftLabel: "Disciplina con dato",
    bridgeLeft:
      "Departamento personal y facturación en un centro médico: verificación, plazos, planillas y responsabilidad sobre cifras que no pueden estar mal.",
    bridgeRightLabel: "Lenguaje audiovisual",
    bridgeRight:
      "Radio y TV, más guion, actuación, vestuario y escenografía en un musical. Guionizar, grabar, conducir y editar un video de principio a fin.",
    bridgeCenter:
      "La profesional que planifica la campaña, produce el creativo y lee el resultado — en vez de depender de tres personas distintas para eso.",
    deliverTitle: "QUÉ ENTREGO",
    deliver: [
      {
        title: "Campañas de medios pagos",
        bullets: [
          "Google Ads y Meta Ads",
          "Estructura de campaña, públicos, presupuesto y optimización",
          "Lectura de CTR, CPC, CPA y ROAS",
        ],
      },
      {
        title: "Creativo de performance",
        bullets: ["Guion, grabación y edición de video corto", "Variaciones para test A/B", "Subtítulos y formatos verticales"],
      },
      {
        title: "Contenido & social",
        bullets: ["Calendario editorial", "Copy y adaptación de formatos", "Consistencia de tono de voz"],
      },
    ],
    processTitle: "PROCESO",
    steps: [
      { title: "Brief y objetivo", desc: "Qué tiene que pasar, para quién, con qué presupuesto y plazo." },
      { title: "Creativo", desc: "Guion, grabación y edición, ya con las variaciones de test." },
      { title: "Campaña al aire", desc: "Estructura, públicos, presupuesto y seguimiento diario." },
      { title: "Lectura y optimización", desc: "Qué dice el número, qué se corta, qué se escala." },
    ],
    stackTitle: "STACK",
    groups: [
      { name: "MEDIOS & DATOS", tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Excel / Sheets"] },
      { name: "CREACIÓN", tools: ["Premiere Pro", "DaVinci Resolve", "CapCut", "Canva", "Figma"] },
      { name: "ORGANIZACIÓN", tools: ["Notion", "Google Workspace"] },
    ],
    eduTitle: "FORMACIÓN",
    edu: [
      { title: "Publicidad — UNASP, Engenheiro Coelho, Brasil", meta: "ago/2026 – dic/2030 (en curso)" },
      { title: "Radio, TV e Internet — UNASP", meta: "ene – jul/2026 · primer semestre cursado" },
      { title: "Secundaria — UNASP-EC", meta: "2023 – 2025" },
    ],
    expTitle: "EXPERIENCIA",
    exp: [
      {
        title: "Asistente Administrativa — Clínica MedCenter",
        meta: "Artur Nogueira, Brasil · desde ene/2026 · medio tiempo",
        desc: "Departamento personal y facturación. Rutina de verificación, plazos y control de cifras.",
      },
    ],
    volTitle: "VOLUNTARIADO",
    vol: [
      {
        title: "Musical “Eis o Cordeiro”",
        meta: "UNASP-EC · mar–abr/2025",
        desc: "Guion, actuación, vestuario, escenografía y selección musical.",
      },
      {
        title: "Misión Xerente 2025",
        meta: "Tocantins · jun/2025",
        desc: "15 días de servicio voluntario en comunidad indígena Xerente.",
      },
    ],
    langTitle: "IDIOMAS",
    langs: ["Portugués nativo", "Inglés intermedio", "Español básico"],
    availability: "Disponible para prácticas y roles júnior — 100% remoto o presencial en la región de Campinas.",
  },
};

function Head({ title }: { title: string }) {
  return <Text style={S.sectionTitle}>{title}</Text>;
}

function Bullets({ items, color }: { items: string[]; color: string }) {
  return (
    <View>
      {items.map((b) => (
        <View key={b} style={S.bullet}>
          <Text style={{ ...S.bulletDot, color }}>·</Text>
          <Text style={S.bulletText}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

export default function PortfolioPdf({ locale }: { locale: Locale }) {
  const c = COPY[locale] ?? COPY.pt;
  const accents = [C.key, C.fill, C.rim];

  return (
    <Document
      title={`Isabela Machado — ${c.role}`}
      author="Isabela Machado"
      subject="Mídia paga e performance"
    >
      {/* ── PÁGINA 1 ── */}
      <Page size="A4" style={S.page}>
        <View style={S.topRule} />

        <Text style={S.name}>ISABELA MACHADO</Text>
        <Text style={S.role}>{c.role}</Text>
        <Text style={S.headline}>{c.headline}</Text>

        <View style={S.hudRow}>
          <Text style={S.hudText}>{EMAIL}</Text>
          <Text style={S.hudText}>{LINKEDIN}</Text>
          <Text style={S.hudText}>{LOCATION}</Text>
        </View>

        <Text style={S.intro}>{c.intro}</Text>

        <View style={S.section}>
          <Head title={c.bridgeTitle} />
          <View style={S.row}>
            <View style={{ ...S.card, ...S.col }}>
              <Text style={{ ...S.cardMeta, color: C.rim }}>{c.bridgeLeftLabel}</Text>
              <Text style={S.cardBody}>{c.bridgeLeft}</Text>
            </View>
            <View style={{ ...S.card, ...S.col }}>
              <Text style={{ ...S.cardMeta, color: C.fill }}>{c.bridgeRightLabel}</Text>
              <Text style={S.cardBody}>{c.bridgeRight}</Text>
            </View>
          </View>
          <View style={{ ...S.card, borderColor: C.key }}>
            <Text style={S.cardBody}>{c.bridgeCenter}</Text>
          </View>
        </View>

        <View style={S.section}>
          <Head title={c.deliverTitle} />
          <View style={S.row}>
            {c.deliver.map((d, i) => (
              <View key={d.title} style={{ ...S.card, ...S.col }}>
                <Text style={{ ...S.cardMeta, color: accents[i] }}>
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Text style={S.cardTitle}>{d.title}</Text>
                <Bullets items={d.bullets} color={accents[i]} />
              </View>
            ))}
          </View>
        </View>

        <View style={S.section}>
          <Head title={c.processTitle} />
          <View style={S.row}>
            {c.steps.map((s, i) => (
              <View key={s.title} style={{ ...S.card, ...S.col }}>
                <Text style={{ ...S.cardMeta, color: C.key }}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={S.cardTitle}>{s.title}</Text>
                <Text style={S.cardBody}>{s.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={S.footer}>
          <Text style={S.hudText}>ISABELA MACHADO · {c.role}</Text>
          <Text style={S.hudText}>1 / 2</Text>
        </View>
      </Page>

      {/* ── PÁGINA 2 ── */}
      <Page size="A4" style={S.page}>
        <View style={S.topRule} />

        <View style={S.section}>
          <Head title={c.expTitle} />
          {c.exp.map((e) => (
            <View key={e.title} style={S.card}>
              <Text style={S.cardTitle}>{e.title}</Text>
              <Text style={S.cardMeta}>{e.meta}</Text>
              <Text style={S.cardBody}>{e.desc}</Text>
            </View>
          ))}
        </View>

        <View style={S.section}>
          <Head title={c.eduTitle} />
          {c.edu.map((e) => (
            <View key={e.title} style={S.card}>
              <Text style={S.cardTitle}>{e.title}</Text>
              <Text style={{ ...S.cardMeta, marginBottom: 0 }}>{e.meta}</Text>
            </View>
          ))}
        </View>

        <View style={S.section}>
          <Head title={c.volTitle} />
          <View style={S.row}>
            {c.vol.map((v) => (
              <View key={v.title} style={{ ...S.card, ...S.col }}>
                <Text style={S.cardTitle}>{v.title}</Text>
                <Text style={S.cardMeta}>{v.meta}</Text>
                <Text style={S.cardBody}>{v.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={S.section}>
          <Head title={c.stackTitle} />
          {c.groups.map((g) => (
            <View key={g.name} style={{ marginBottom: 8 }}>
              <Text style={S.cardMeta}>{g.name}</Text>
              <View style={S.chipRow}>
                {g.tools.map((tool) => (
                  <Text key={tool} style={S.chip}>
                    {tool}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={S.section}>
          <Head title={c.langTitle} />
          <View style={S.chipRow}>
            {c.langs.map((l) => (
              <Text key={l} style={S.chip}>
                {l}
              </Text>
            ))}
          </View>
          <View style={{ ...S.card, marginTop: 8, borderColor: C.rim }}>
            <Text style={S.cardBody}>{c.availability}</Text>
          </View>
        </View>

        <View style={S.footer}>
          <Text style={S.hudText}>© 2026 ISABELA MACHADO · {EMAIL}</Text>
          <Text style={S.hudText}>2 / 2</Text>
        </View>
      </Page>
    </Document>
  );
}
