import type { Locale } from "./translations"

type ExportStrings = {
  docTitle: string
  docSubtitle: string
  generated: string
  language: string
  downloadPdf: string
  preparing: string
  backToHome: string
  tableOfContents: string
  formulaReference: string
  formulaReferenceDesc: string
  formula: string
  variables: string
  notes: string
  disclaimer: string
  disclaimerText: string
}

export const exportStrings: Record<Locale, ExportStrings> = {
  en: {
    docTitle: "Dive Theory — Formulas & Physics Reference",
    docSubtitle: "A complete reference of the formulas and theory used throughout the app",
    generated: "Generated",
    language: "Language",
    downloadPdf: "Download PDF",
    preparing: "Preparing…",
    backToHome: "Back to Home",
    tableOfContents: "Contents",
    formulaReference: "Formula Quick Reference",
    formulaReferenceDesc: "All key equations used across the calculators, grouped by topic.",
    formula: "Formula",
    variables: "Variables",
    notes: "Notes",
    disclaimer: "Disclaimer",
    disclaimerText:
      "These formulas and calculations are provided for educational reference only. Always verify independently and follow safe diving practices established by recognized diving organizations.",
  },
  it: {
    docTitle: "Teoria Subacquea — Formule e Riferimento di Fisica",
    docSubtitle: "Un riferimento completo delle formule e della teoria usate nell'app",
    generated: "Generato",
    language: "Lingua",
    downloadPdf: "Scarica PDF",
    preparing: "Preparazione…",
    backToHome: "Torna alla Home",
    tableOfContents: "Indice",
    formulaReference: "Riferimento Rapido Formule",
    formulaReferenceDesc: "Tutte le equazioni chiave usate nei calcolatori, raggruppate per argomento.",
    formula: "Formula",
    variables: "Variabili",
    notes: "Note",
    disclaimer: "Avvertenza",
    disclaimerText:
      "Queste formule e calcoli sono forniti solo come riferimento didattico. Verifica sempre in modo indipendente e segui le pratiche di immersione sicura stabilite dalle organizzazioni subacquee riconosciute.",
  },
  de: {
    docTitle: "Tauchtheorie — Formeln & Physik-Referenz",
    docSubtitle: "Eine vollständige Referenz der in der App verwendeten Formeln und Theorie",
    generated: "Erstellt",
    language: "Sprache",
    downloadPdf: "PDF herunterladen",
    preparing: "Wird vorbereitet…",
    backToHome: "Zurück zur Startseite",
    tableOfContents: "Inhalt",
    formulaReference: "Formel-Schnellreferenz",
    formulaReferenceDesc: "Alle wichtigen Gleichungen der Rechner, nach Thema gruppiert.",
    formula: "Formel",
    variables: "Variablen",
    notes: "Hinweise",
    disclaimer: "Haftungsausschluss",
    disclaimerText:
      "Diese Formeln und Berechnungen dienen nur als Bildungsreferenz. Überprüfen Sie immer unabhängig und befolgen Sie die sicheren Tauchpraktiken anerkannter Tauchorganisationen.",
  },
  fr: {
    docTitle: "Théorie de la Plongée — Formules & Référence de Physique",
    docSubtitle: "Une référence complète des formules et de la théorie utilisées dans l'application",
    generated: "Généré",
    language: "Langue",
    downloadPdf: "Télécharger le PDF",
    preparing: "Préparation…",
    backToHome: "Retour à l'accueil",
    tableOfContents: "Sommaire",
    formulaReference: "Référence Rapide des Formules",
    formulaReferenceDesc: "Toutes les équations clés utilisées dans les calculateurs, regroupées par thème.",
    formula: "Formule",
    variables: "Variables",
    notes: "Notes",
    disclaimer: "Avertissement",
    disclaimerText:
      "Ces formules et calculs sont fournis uniquement à titre de référence pédagogique. Vérifiez toujours de manière indépendante et suivez les pratiques de plongée sûres établies par les organisations de plongée reconnues.",
  },
  es: {
    docTitle: "Teoría del Buceo — Fórmulas y Referencia de Física",
    docSubtitle: "Una referencia completa de las fórmulas y la teoría usadas en la aplicación",
    generated: "Generado",
    language: "Idioma",
    downloadPdf: "Descargar PDF",
    preparing: "Preparando…",
    backToHome: "Volver al inicio",
    tableOfContents: "Contenido",
    formulaReference: "Referencia Rápida de Fórmulas",
    formulaReferenceDesc: "Todas las ecuaciones clave usadas en las calculadoras, agrupadas por tema.",
    formula: "Fórmula",
    variables: "Variables",
    notes: "Notas",
    disclaimer: "Aviso legal",
    disclaimerText:
      "Estas fórmulas y cálculos se proporcionan solo como referencia educativa. Verifique siempre de forma independiente y siga las prácticas de buceo seguro establecidas por las organizaciones de buceo reconocidas.",
  },
}
