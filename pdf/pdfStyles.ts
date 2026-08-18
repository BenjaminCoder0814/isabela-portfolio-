import { StyleSheet } from "@react-pdf/renderer";

/** Mesma identidade do site: 100% dark, luz de set como acento. */
export const C = {
  bg000: "#05060A",
  bg100: "#0A0C12",
  bg200: "#10131B",
  line: "#232733",
  lineSoft: "#171B25",
  txHi: "#F2F4F8",
  txMd: "#A9B1C2",
  txLo: "#8D95A8",
  key: "#FF2E88",
  fill: "#7C5CFF",
  rim: "#22D3A6",
  tung: "#FFB25E",
};

export const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: C.bg000,
    color: C.txMd,
    paddingTop: 34,
    paddingBottom: 40,
    paddingHorizontal: 36,
    fontSize: 9.5,
    fontFamily: "Helvetica",
  },

  topRule: {
    height: 3,
    backgroundColor: C.key,
    marginBottom: 16,
  },

  hudRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.6,
    borderTopColor: C.lineSoft,
    borderBottomWidth: 0.6,
    borderBottomColor: C.lineSoft,
    paddingVertical: 6,
    marginBottom: 14,
  },
  hudText: {
    fontFamily: "Courier",
    fontSize: 7,
    letterSpacing: 1.2,
    color: C.txLo,
  },

  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 30,
    letterSpacing: 1.2,
    color: C.txHi,
    marginBottom: 4,
  },
  role: {
    fontFamily: "Courier",
    fontSize: 8,
    letterSpacing: 1.6,
    color: C.key,
    marginBottom: 12,
  },
  headline: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    lineHeight: 1.35,
    color: C.txHi,
    marginBottom: 12,
    maxWidth: 380,
  },

  intro: {
    fontSize: 9.5,
    lineHeight: 1.65,
    color: C.txMd,
    marginBottom: 18,
  },

  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    letterSpacing: 1.4,
    color: C.txHi,
    marginBottom: 3,
  },
  sectionEyebrow: {
    fontFamily: "Courier",
    fontSize: 7,
    letterSpacing: 1.6,
    color: C.txLo,
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },

  card: {
    backgroundColor: C.bg200,
    borderWidth: 0.6,
    borderColor: C.line,
    borderRadius: 6,
    padding: 10,
    marginBottom: 7,
  },
  cardTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: C.txHi,
    marginBottom: 3,
  },
  cardBody: {
    fontSize: 8.5,
    lineHeight: 1.55,
    color: C.txMd,
  },
  cardMeta: {
    fontFamily: "Courier",
    fontSize: 7,
    letterSpacing: 1.1,
    color: C.txLo,
    marginBottom: 4,
  },

  row: { flexDirection: "row", gap: 7 },
  col: { flex: 1 },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  chip: {
    borderWidth: 0.6,
    borderColor: C.line,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 7,
    fontFamily: "Courier",
    fontSize: 7,
    letterSpacing: 0.9,
    color: C.txMd,
  },

  bullet: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 2.5,
  },
  bulletDot: { color: C.rim, fontSize: 8.5 },
  bulletText: { flex: 1, fontSize: 8.5, lineHeight: 1.5, color: C.txMd },

  meterTrack: {
    height: 3,
    backgroundColor: C.lineSoft,
    borderRadius: 2,
    marginTop: 3,
  },
  meterFill: { height: 3, backgroundColor: C.key, borderRadius: 2 },

  footer: {
    position: "absolute",
    bottom: 18,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.6,
    borderTopColor: C.lineSoft,
    paddingTop: 7,
  },
});
