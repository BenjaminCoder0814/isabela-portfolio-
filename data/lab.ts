/**
 * LABORATÓRIO — estudos e testes práticos da Isabela.
 *
 * Para publicar um item novo, basta adicionar um objeto neste array.
 * Nenhum componente precisa ser tocado. Array vazio => a seção mostra
 * o placeholder "em produção", que é intencional e não parece quebrado.
 *
 * kind:  "teardown"  análise de um anúncio real que ela desmontou
 *        "campaign"  estrutura de campanha montada como estudo
 *        "creative"  teste de criativo em vídeo
 *
 * Os textos ficam nos três idiomas. Se um idioma faltar, cai no pt.
 */

export type LabKind = "teardown" | "campaign" | "creative";
export type Lang = "pt" | "en" | "es";
type Text = Partial<Record<Lang, string>> & { pt: string };

export type LabItem = {
  id: string;
  kind: LabKind;
  /** rótulo mono no topo do card, ex.: "META ADS" */
  tag: string;
  title: Text;
  summary: Text;
  /** 2 a 4 conclusões — é isto que mostra raciocínio */
  takeaways: Text[];
  /** opcional: link externo (Notion, PDF, post) */
  href?: string;
  date?: string;
};

export const labItems: LabItem[] = [
  // Exemplo do formato — descomente e edite para publicar o primeiro item.
  //
  // {
  //   id: "teardown-clinica-01",
  //   kind: "teardown",
  //   tag: "META ADS",
  //   title: {
  //     pt: "Anúncio de clínica odontológica",
  //     en: "Dental clinic ad",
  //     es: "Anuncio de clínica dental",
  //   },
  //   summary: {
  //     pt: "Desmontei um anúncio que roda há meses na biblioteca de anúncios e reescrevi a oferta.",
  //   },
  //   takeaways: [
  //     { pt: "O gancho entrega o benefício antes do nome da clínica." },
  //     { pt: "A prova social aparece em vídeo, não em texto sobreposto." },
  //     { pt: "Testaria uma variação sem preço, medindo CPA em vez de CTR." },
  //   ],
  //   date: "2026-08",
  // },
];
