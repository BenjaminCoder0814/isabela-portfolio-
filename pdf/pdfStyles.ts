import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 32,
    backgroundColor: "#0B0D12",
    color: "#F5F6FA",
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    borderBottomStyle: "solid",
  },
  heading: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: 700,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.5,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  chip: {
    fontSize: 9,
    padding: "4 8",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  card: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 8,
  },
});
