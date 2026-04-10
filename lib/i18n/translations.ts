export type Locale = "en" | "it" | "de" | "fr" | "es"

export type Translations = typeof translations.en

export const translations = {
  en: {
    // Navigation
    nav: {
      about: "About",
      topics: "Topics",
      calculators: "Calculators",
    },
    // Hero
    hero: {
      title: "Scuba Diving Physics",
      description: "Learn essential diving calculations with interactive tools. Calculate pressure at depth, air consumption, gas laws, and lift requirements for safe diving.",
      startLearning: "Start Learning",
    },
    // Calculator Grid
    calculatorGrid: {
      title: "Diving Physics Topics",
      subtitle: "Interactive tools to help you understand and apply diving physics principles",
      learnTheory: "Learn Theory",
      openCalculator: "Open Calculator",
    },
    // Calculators
    calculators: {
      pressure: {
        title: "Water & Pressure",
        description: "Understand water properties (heat, light, sound) and calculate pressures at different depths",
        features: ["Water Properties", "Absolute Pressure", "Partial Pressure"],
      },
      airConsumption: {
        title: "Air Consumption",
        description: "Calculate air consumption rates at various depths and plan your dive accordingly",
        features: ["SAC Rate", "RMV Calculation", "Tank Planning"],
      },
      henrysLaw: {
        title: "Decompression",
        description: "Understand gas dissolution, tissue saturation, and decompression theory (Henry's Law)",
        features: ["Gas Dissolution", "Tissue Saturation", "Dive Planning"],
      },
      gasLaws: {
        title: "Gas Laws",
        description: "Explore Boyle's, Charles's, and Gay-Lussac's laws and their applications in diving",
        features: ["Boyle's Law", "Charles's Law", "Combined Gas Law"],
      },
      liftDisplacement: {
        title: "Buoyancy & Displacement",
        description: "Calculate buoyancy, lift requirements, and water displacement for diving operations",
        features: ["Buoyancy Force", "Lift Bags", "Water Displacement"],
      },
      weight: {
        title: "Lifting Operations",
        description: "Calculate buoyancy requirements to lift submerged objects using lift bags or flotation devices",
        features: ["Negative Buoyancy", "Lift Requirements", "Safety Margins"],
      },
    },
    // About Page
    about: {
      backToHome: "Back to Home",
      title: "About Dive Theory",
      subtitle: "Your comprehensive companion for scuba diving physics and calculations",
      whatIsTitle: "What is Dive Theory?",
      whatIsContent: [
        "Dive Theory is an educational application designed to help scuba diving students and professionals understand and apply the fundamental physics principles that govern underwater diving. Whether you're preparing for your certification exams or need a quick reference tool in the field, our app provides accurate calculations and clear explanations of essential diving concepts.",
        "The app covers four critical areas of dive theory:",
      ],
      areas: {
        pressure: {
          title: "Pressure Calculations:",
          description: "Calculate absolute pressure, gauge pressure, and partial pressures at various depths, with built-in safety warnings for oxygen toxicity.",
        },
        airConsumption: {
          title: "Air Consumption:",
          description: "Determine your Surface Air Consumption (SAC) rate, Respiratory Minute Volume (RMV), and plan your dives with accurate air supply calculations.",
        },
        gasLaws: {
          title: "Gas Laws:",
          description: "Explore and apply Charles's Law, Dalton's Law, and Gay-Lussac's Law with interactive calculators that demonstrate how these principles affect diving operations.",
        },
        buoyancy: {
          title: "Buoyancy & Displacement:",
          description: "Calculate buoyancy forces, lifting capacity, and water displacement for underwater operations and object recovery.",
        },
      },
      dualApproach: "Each calculator includes both practical calculation tools and comprehensive theory sections to help you understand the underlying physics. This dual approach ensures you not only get the right numbers but also comprehend why they matter for safe diving practices.",
      disclaimer: {
        title: "Important Disclaimer",
        warning: "Warning:",
        warningText: "These calculations should only be used carefully and as educational references. Always verify calculations independently and follow safe diving practices established by recognized diving organizations.",
        asIs: 'This application is provided "as is" without warranty of any kind, either expressed or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose. We do not accept any responsibility for inaccuracies, errors, or any consequences that may result from the use of this application.',
        risk: "Scuba diving is an inherently risky activity. Always dive within your training and certification limits, follow proper dive planning procedures, and consult with certified dive professionals before making any diving decisions.",
      },
      footer: "Dive Theory is designed for educational purposes to support scuba diving training and certification programs.",
    },
    // Common
    common: {
      backToHome: "Back to Home",
    },
  },
  it: {
    // Navigation
    nav: {
      about: "Info",
      topics: "Argomenti",
      calculators: "Calcolatori",
    },
    // Hero
    hero: {
      title: "Fisica delle Immersioni",
      description: "Impara i calcoli essenziali per le immersioni con strumenti interattivi. Calcola la pressione in profondità, il consumo d'aria, le leggi dei gas e i requisiti di sollevamento per immersioni sicure.",
      startLearning: "Inizia ad Imparare",
    },
    // Calculator Grid
    calculatorGrid: {
      title: "Argomenti di Fisica Subacquea",
      subtitle: "Strumenti interattivi per comprendere e applicare i principi della fisica subacquea",
      learnTheory: "Impara la Teoria",
      openCalculator: "Apri Calcolatore",
    },
    // Calculators
    calculators: {
      pressure: {
        title: "Acqua e Pressione",
        description: "Comprendi le proprietà dell'acqua (calore, luce, suono) e calcola le pressioni a diverse profondità",
        features: ["Proprietà dell'Acqua", "Pressione Assoluta", "Pressione Parziale"],
      },
      airConsumption: {
        title: "Consumo d'Aria",
        description: "Calcola i tassi di consumo d'aria a varie profondità e pianifica le tue immersioni di conseguenza",
        features: ["Tasso SAC", "Calcolo RMV", "Pianificazione Bombole"],
      },
      henrysLaw: {
        title: "Decompressione",
        description: "Comprendi la dissoluzione dei gas, la saturazione dei tessuti e la teoria della decompressione (Legge di Henry)",
        features: ["Dissoluzione Gas", "Saturazione Tessuti", "Pianificazione Immersione"],
      },
      gasLaws: {
        title: "Leggi dei Gas",
        description: "Esplora le leggi di Boyle, Charles e Gay-Lussac e le loro applicazioni nelle immersioni",
        features: ["Legge di Boyle", "Legge di Charles", "Legge dei Gas Combinata"],
      },
      liftDisplacement: {
        title: "Galleggiabilità e Spostamento",
        description: "Calcola galleggiabilità, requisiti di sollevamento e spostamento d'acqua per operazioni subacquee",
        features: ["Forza di Galleggiamento", "Palloni di Sollevamento", "Spostamento d'Acqua"],
      },
      weight: {
        title: "Operazioni di Sollevamento",
        description: "Calcola i requisiti di galleggiabilità per sollevare oggetti sommersi usando palloni di sollevamento",
        features: ["Galleggiabilità Negativa", "Requisiti di Sollevamento", "Margini di Sicurezza"],
      },
    },
    // About Page
    about: {
      backToHome: "Torna alla Home",
      title: "Informazioni su Dive Theory",
      subtitle: "Il tuo compagno completo per la fisica e i calcoli delle immersioni subacquee",
      whatIsTitle: "Cos'è Dive Theory?",
      whatIsContent: [
        "Dive Theory è un'applicazione educativa progettata per aiutare studenti e professionisti delle immersioni subacquee a comprendere e applicare i principi fisici fondamentali che governano le immersioni subacquee. Che tu stia preparando gli esami di certificazione o abbia bisogno di uno strumento di riferimento rapido sul campo, la nostra app fornisce calcoli accurati e spiegazioni chiare dei concetti essenziali delle immersioni.",
        "L'app copre quattro aree critiche della teoria delle immersioni:",
      ],
      areas: {
        pressure: {
          title: "Calcoli della Pressione:",
          description: "Calcola la pressione assoluta, la pressione relativa e le pressioni parziali a varie profondità, con avvisi di sicurezza integrati per la tossicità dell'ossigeno.",
        },
        airConsumption: {
          title: "Consumo d'Aria:",
          description: "Determina il tuo tasso di Consumo d'Aria in Superficie (SAC), il Volume Respiratorio Minuto (RMV) e pianifica le tue immersioni con calcoli accurati della riserva d'aria.",
        },
        gasLaws: {
          title: "Leggi dei Gas:",
          description: "Esplora e applica la Legge di Charles, la Legge di Dalton e la Legge di Gay-Lussac con calcolatori interattivi che dimostrano come questi principi influenzano le operazioni subacquee.",
        },
        buoyancy: {
          title: "Galleggiabilità e Spostamento:",
          description: "Calcola le forze di galleggiamento, la capacità di sollevamento e lo spostamento d'acqua per operazioni subacquee e recupero oggetti.",
        },
      },
      dualApproach: "Ogni calcolatore include sia strumenti di calcolo pratici che sezioni teoriche complete per aiutarti a comprendere la fisica sottostante. Questo duplice approccio assicura che tu non solo ottenga i numeri giusti ma comprenda anche perché sono importanti per pratiche di immersione sicure.",
      disclaimer: {
        title: "Avviso Importante",
        warning: "Attenzione:",
        warningText: "Questi calcoli devono essere utilizzati con cautela e solo come riferimenti educativi. Verifica sempre i calcoli in modo indipendente e segui le pratiche di immersione sicure stabilite dalle organizzazioni subacquee riconosciute.",
        asIs: 'Questa applicazione è fornita "così com\'è" senza garanzia di alcun tipo, espressa o implicita, incluse ma non limitate alle garanzie implicite di commerciabilità e idoneità per uno scopo particolare. Non accettiamo alcuna responsabilità per imprecisioni, errori o conseguenze che possano derivare dall\'uso di questa applicazione.',
        risk: "L'immersione subacquea è un'attività intrinsecamente rischiosa. Immergiti sempre entro i limiti della tua formazione e certificazione, segui le procedure di pianificazione delle immersioni appropriate e consulta professionisti subacquei certificati prima di prendere qualsiasi decisione relativa alle immersioni.",
      },
      footer: "Dive Theory è progettato per scopi educativi a supporto dei programmi di formazione e certificazione per le immersioni subacquee.",
    },
    // Common
    common: {
      backToHome: "Torna alla Home",
    },
  },
  de: {
    // Navigation
    nav: {
      about: "Über uns",
      topics: "Themen",
      calculators: "Rechner",
    },
    // Hero
    hero: {
      title: "Tauchphysik",
      description: "Lerne wichtige Tauchberechnungen mit interaktiven Werkzeugen. Berechne Druck in der Tiefe, Luftverbrauch, Gasgesetze und Hebevoraussetzungen für sicheres Tauchen.",
      startLearning: "Jetzt Lernen",
    },
    // Calculator Grid
    calculatorGrid: {
      title: "Themen der Tauchphysik",
      subtitle: "Interaktive Werkzeuge zum Verstehen und Anwenden der Prinzipien der Tauchphysik",
      learnTheory: "Theorie Lernen",
      openCalculator: "Rechner Öffnen",
    },
    // Calculators
    calculators: {
      pressure: {
        title: "Wasser & Druck",
        description: "Verstehe Wassereigenschaften (Wärme, Licht, Schall) und berechne Drücke in verschiedenen Tiefen",
        features: ["Wassereigenschaften", "Absoluter Druck", "Partialdruck"],
      },
      airConsumption: {
        title: "Luftverbrauch",
        description: "Berechne Luftverbrauchsraten in verschiedenen Tiefen und plane deine Tauchgänge entsprechend",
        features: ["SAC-Rate", "AMV-Berechnung", "Flaschenplanung"],
      },
      henrysLaw: {
        title: "Dekompression",
        description: "Verstehe Gaslösung, Gewebesättigung und Dekompressionstheorie (Henrysches Gesetz)",
        features: ["Gaslösung", "Gewebesättigung", "Tauchgangsplanung"],
      },
      gasLaws: {
        title: "Gasgesetze",
        description: "Erkunde Boyles, Charles' und Gay-Lussacs Gesetze und ihre Anwendungen beim Tauchen",
        features: ["Boyles Gesetz", "Charles' Gesetz", "Kombiniertes Gasgesetz"],
      },
      liftDisplacement: {
        title: "Auftrieb & Verdrängung",
        description: "Berechne Auftrieb, Hebeanforderungen und Wasserverdrängung für Tauchoperationen",
        features: ["Auftriebskraft", "Hebesäcke", "Wasserverdrängung"],
      },
      weight: {
        title: "Hebeoperationen",
        description: "Berechne Auftriebsanforderungen zum Heben von versunkenen Objekten mit Hebesäcken oder Auftriebskörpern",
        features: ["Negativer Auftrieb", "Hebeanforderungen", "Sicherheitsmargen"],
      },
    },
    // About Page
    about: {
      backToHome: "Zurück zur Startseite",
      title: "Über Dive Theory",
      subtitle: "Dein umfassender Begleiter für Tauchphysik und Berechnungen",
      whatIsTitle: "Was ist Dive Theory?",
      whatIsContent: [
        "Dive Theory ist eine Bildungsanwendung, die Tauchschülern und Profis hilft, die grundlegenden physikalischen Prinzipien des Unterwassertauchens zu verstehen und anzuwenden. Ob du dich auf deine Zertifizierungsprüfungen vorbereitest oder ein schnelles Nachschlagewerk im Feld benötigst, unsere App bietet genaue Berechnungen und klare Erklärungen der wesentlichen Tauchkonzepte.",
        "Die App deckt vier kritische Bereiche der Tauchtheorie ab:",
      ],
      areas: {
        pressure: {
          title: "Druckberechnungen:",
          description: "Berechne absoluten Druck, Überdruck und Partialdrücke in verschiedenen Tiefen, mit integrierten Sicherheitswarnungen für Sauerstofftoxizität.",
        },
        airConsumption: {
          title: "Luftverbrauch:",
          description: "Bestimme deinen Oberflächenluftverbrauch (SAC), das Atemminutenvolumen (AMV) und plane deine Tauchgänge mit genauen Luftversorgungsberechnungen.",
        },
        gasLaws: {
          title: "Gasgesetze:",
          description: "Erkunde und wende das Gesetz von Charles, das Gesetz von Dalton und das Gesetz von Gay-Lussac mit interaktiven Rechnern an, die zeigen, wie diese Prinzipien Tauchoperationen beeinflussen.",
        },
        buoyancy: {
          title: "Auftrieb & Verdrängung:",
          description: "Berechne Auftriebskräfte, Hebekapazität und Wasserverdrängung für Unterwasseroperationen und Objektbergung.",
        },
      },
      dualApproach: "Jeder Rechner enthält sowohl praktische Berechnungswerkzeuge als auch umfassende Theorieabschnitte, um dir zu helfen, die zugrunde liegende Physik zu verstehen. Dieser duale Ansatz stellt sicher, dass du nicht nur die richtigen Zahlen erhältst, sondern auch verstehst, warum sie für sichere Tauchpraktiken wichtig sind.",
      disclaimer: {
        title: "Wichtiger Haftungsausschluss",
        warning: "Warnung:",
        warningText: "Diese Berechnungen sollten nur sorgfältig und als Bildungsreferenzen verwendet werden. Überprüfe Berechnungen immer unabhängig und befolge sichere Tauchpraktiken, die von anerkannten Tauchorganisationen etabliert wurden.",
        asIs: 'Diese Anwendung wird "wie besehen" ohne jegliche Garantie bereitgestellt, weder ausdrücklich noch stillschweigend, einschließlich, aber nicht beschränkt auf die stillschweigenden Garantien der Marktgängigkeit und Eignung für einen bestimmten Zweck. Wir übernehmen keine Verantwortung für Ungenauigkeiten, Fehler oder Konsequenzen, die sich aus der Nutzung dieser Anwendung ergeben können.',
        risk: "Sporttauchen ist eine von Natur aus riskante Aktivität. Tauche immer innerhalb deiner Ausbildungs- und Zertifizierungsgrenzen, befolge ordnungsgemäße Tauchplanungsverfahren und konsultiere zertifizierte Tauchprofis, bevor du Tauchentscheidungen triffst.",
      },
      footer: "Dive Theory ist für Bildungszwecke konzipiert, um Tauchausbildungs- und Zertifizierungsprogramme zu unterstützen.",
    },
    // Common
    common: {
      backToHome: "Zurück zur Startseite",
    },
  },
  fr: {
    // Navigation
    nav: {
      about: "À propos",
      topics: "Sujets",
      calculators: "Calculateurs",
    },
    // Hero
    hero: {
      title: "Physique de la Plongée",
      description: "Apprenez les calculs essentiels de plongée avec des outils interactifs. Calculez la pression en profondeur, la consommation d'air, les lois des gaz et les exigences de levage pour une plongée sûre.",
      startLearning: "Commencer",
    },
    // Calculator Grid
    calculatorGrid: {
      title: "Sujets de Physique de Plongée",
      subtitle: "Outils interactifs pour comprendre et appliquer les principes de physique de plongée",
      learnTheory: "Apprendre la Théorie",
      openCalculator: "Ouvrir le Calculateur",
    },
    // Calculators
    calculators: {
      pressure: {
        title: "Eau & Pression",
        description: "Comprenez les propriétés de l'eau (chaleur, lumière, son) et calculez les pressions à différentes profondeurs",
        features: ["Propriétés de l'Eau", "Pression Absolue", "Pression Partielle"],
      },
      airConsumption: {
        title: "Consommation d'Air",
        description: "Calculez les taux de consommation d'air à différentes profondeurs et planifiez vos plongées en conséquence",
        features: ["Taux SAC", "Calcul RMV", "Planification des Bouteilles"],
      },
      henrysLaw: {
        title: "Décompression",
        description: "Comprenez la dissolution des gaz, la saturation des tissus et la théorie de la décompression (Loi de Henry)",
        features: ["Dissolution des Gaz", "Saturation des Tissus", "Planification de Plongée"],
      },
      gasLaws: {
        title: "Lois des Gaz",
        description: "Explorez les lois de Boyle, Charles et Gay-Lussac et leurs applications en plongée",
        features: ["Loi de Boyle", "Loi de Charles", "Loi des Gaz Combinée"],
      },
      liftDisplacement: {
        title: "Flottabilité & Déplacement",
        description: "Calculez la flottabilité, les exigences de levage et le déplacement d'eau pour les opérations de plongée",
        features: ["Force de Flottabilité", "Parachutes de Levage", "Déplacement d'Eau"],
      },
      weight: {
        title: "Opérations de Levage",
        description: "Calculez les exigences de flottabilité pour lever des objets immergés à l'aide de parachutes de levage",
        features: ["Flottabilité Négative", "Exigences de Levage", "Marges de Sécurité"],
      },
    },
    // About Page
    about: {
      backToHome: "Retour à l'Accueil",
      title: "À propos de Dive Theory",
      subtitle: "Votre compagnon complet pour la physique et les calculs de plongée sous-marine",
      whatIsTitle: "Qu'est-ce que Dive Theory ?",
      whatIsContent: [
        "Dive Theory est une application éducative conçue pour aider les étudiants et les professionnels de la plongée sous-marine à comprendre et appliquer les principes physiques fondamentaux qui régissent la plongée sous-marine. Que vous prépariez vos examens de certification ou que vous ayez besoin d'un outil de référence rapide sur le terrain, notre application fournit des calculs précis et des explications claires des concepts essentiels de la plongée.",
        "L'application couvre quatre domaines critiques de la théorie de la plongée :",
      ],
      areas: {
        pressure: {
          title: "Calculs de Pression :",
          description: "Calculez la pression absolue, la pression relative et les pressions partielles à différentes profondeurs, avec des avertissements de sécurité intégrés pour la toxicité de l'oxygène.",
        },
        airConsumption: {
          title: "Consommation d'Air :",
          description: "Déterminez votre taux de Consommation d'Air en Surface (SAC), le Volume Respiratoire Minute (RMV), et planifiez vos plongées avec des calculs précis de l'approvisionnement en air.",
        },
        gasLaws: {
          title: "Lois des Gaz :",
          description: "Explorez et appliquez la Loi de Charles, la Loi de Dalton et la Loi de Gay-Lussac avec des calculateurs interactifs qui démontrent comment ces principes affectent les opérations de plongée.",
        },
        buoyancy: {
          title: "Flottabilité & Déplacement :",
          description: "Calculez les forces de flottabilité, la capacité de levage et le déplacement d'eau pour les opérations sous-marines et la récupération d'objets.",
        },
      },
      dualApproach: "Chaque calculateur comprend à la fois des outils de calcul pratiques et des sections théoriques complètes pour vous aider à comprendre la physique sous-jacente. Cette double approche garantit que vous obtenez non seulement les bons chiffres mais comprenez aussi pourquoi ils sont importants pour des pratiques de plongée sûres.",
      disclaimer: {
        title: "Avertissement Important",
        warning: "Attention :",
        warningText: "Ces calculs ne doivent être utilisés qu'avec précaution et comme références éducatives. Vérifiez toujours les calculs de manière indépendante et suivez les pratiques de plongée sûres établies par les organisations de plongée reconnues.",
        asIs: "Cette application est fournie « en l'état » sans garantie d'aucune sorte, expresse ou implicite, y compris mais sans s'y limiter les garanties implicites de qualité marchande et d'adéquation à un usage particulier. Nous n'acceptons aucune responsabilité pour les inexactitudes, erreurs ou conséquences pouvant résulter de l'utilisation de cette application.",
        risk: "La plongée sous-marine est une activité intrinsèquement risquée. Plongez toujours dans les limites de votre formation et certification, suivez les procédures de planification de plongée appropriées et consultez des professionnels de la plongée certifiés avant de prendre toute décision de plongée.",
      },
      footer: "Dive Theory est conçu à des fins éducatives pour soutenir les programmes de formation et de certification en plongée sous-marine.",
    },
    // Common
    common: {
      backToHome: "Retour à l'Accueil",
    },
  },
  es: {
    // Navigation
    nav: {
      about: "Acerca de",
      topics: "Temas",
      calculators: "Calculadoras",
    },
    // Hero
    hero: {
      title: "Física del Buceo",
      description: "Aprende los cálculos esenciales de buceo con herramientas interactivas. Calcula la presión en profundidad, el consumo de aire, las leyes de los gases y los requisitos de elevación para un buceo seguro.",
      startLearning: "Comenzar a Aprender",
    },
    // Calculator Grid
    calculatorGrid: {
      title: "Temas de Física del Buceo",
      subtitle: "Herramientas interactivas para comprender y aplicar los principios de física del buceo",
      learnTheory: "Aprender Teoría",
      openCalculator: "Abrir Calculadora",
    },
    // Calculators
    calculators: {
      pressure: {
        title: "Agua y Presión",
        description: "Comprende las propiedades del agua (calor, luz, sonido) y calcula presiones a diferentes profundidades",
        features: ["Propiedades del Agua", "Presión Absoluta", "Presión Parcial"],
      },
      airConsumption: {
        title: "Consumo de Aire",
        description: "Calcula las tasas de consumo de aire a varias profundidades y planifica tus inmersiones en consecuencia",
        features: ["Tasa SAC", "Cálculo RMV", "Planificación de Tanques"],
      },
      henrysLaw: {
        title: "Descompresión",
        description: "Comprende la disolución de gases, la saturación de tejidos y la teoría de descompresión (Ley de Henry)",
        features: ["Disolución de Gases", "Saturación de Tejidos", "Planificación de Inmersión"],
      },
      gasLaws: {
        title: "Leyes de los Gases",
        description: "Explora las leyes de Boyle, Charles y Gay-Lussac y sus aplicaciones en el buceo",
        features: ["Ley de Boyle", "Ley de Charles", "Ley de Gases Combinada"],
      },
      liftDisplacement: {
        title: "Flotabilidad y Desplazamiento",
        description: "Calcula flotabilidad, requisitos de elevación y desplazamiento de agua para operaciones de buceo",
        features: ["Fuerza de Flotación", "Bolsas de Elevación", "Desplazamiento de Agua"],
      },
      weight: {
        title: "Operaciones de Elevación",
        description: "Calcula los requisitos de flotabilidad para elevar objetos sumergidos usando bolsas de elevación",
        features: ["Flotabilidad Negativa", "Requisitos de Elevación", "Márgenes de Seguridad"],
      },
    },
    // About Page
    about: {
      backToHome: "Volver al Inicio",
      title: "Acerca de Dive Theory",
      subtitle: "Tu compañero integral para la física y los cálculos de buceo",
      whatIsTitle: "¿Qué es Dive Theory?",
      whatIsContent: [
        "Dive Theory es una aplicación educativa diseñada para ayudar a estudiantes y profesionales del buceo a comprender y aplicar los principios físicos fundamentales que rigen el buceo submarino. Ya sea que estés preparándote para tus exámenes de certificación o necesites una herramienta de referencia rápida en el campo, nuestra aplicación proporciona cálculos precisos y explicaciones claras de los conceptos esenciales del buceo.",
        "La aplicación cubre cuatro áreas críticas de la teoría del buceo:",
      ],
      areas: {
        pressure: {
          title: "Cálculos de Presión:",
          description: "Calcula la presión absoluta, la presión manométrica y las presiones parciales a varias profundidades, con advertencias de seguridad integradas para la toxicidad del oxígeno.",
        },
        airConsumption: {
          title: "Consumo de Aire:",
          description: "Determina tu tasa de Consumo de Aire en Superficie (SAC), el Volumen Respiratorio por Minuto (RMV), y planifica tus inmersiones con cálculos precisos de suministro de aire.",
        },
        gasLaws: {
          title: "Leyes de los Gases:",
          description: "Explora y aplica la Ley de Charles, la Ley de Dalton y la Ley de Gay-Lussac con calculadoras interactivas que demuestran cómo estos principios afectan las operaciones de buceo.",
        },
        buoyancy: {
          title: "Flotabilidad y Desplazamiento:",
          description: "Calcula las fuerzas de flotación, la capacidad de elevación y el desplazamiento de agua para operaciones submarinas y recuperación de objetos.",
        },
      },
      dualApproach: "Cada calculadora incluye tanto herramientas de cálculo prácticas como secciones teóricas completas para ayudarte a comprender la física subyacente. Este enfoque dual asegura que no solo obtengas los números correctos sino que también comprendas por qué son importantes para prácticas de buceo seguras.",
      disclaimer: {
        title: "Aviso Importante",
        warning: "Advertencia:",
        warningText: "Estos cálculos solo deben usarse con cuidado y como referencias educativas. Siempre verifica los cálculos de forma independiente y sigue las prácticas de buceo seguras establecidas por organizaciones de buceo reconocidas.",
        asIs: 'Esta aplicación se proporciona "tal cual" sin garantía de ningún tipo, ya sea expresa o implícita, incluyendo pero no limitado a las garantías implícitas de comerciabilidad e idoneidad para un propósito particular. No aceptamos ninguna responsabilidad por inexactitudes, errores o consecuencias que puedan resultar del uso de esta aplicación.',
        risk: "El buceo es una actividad inherentemente riesgosa. Siempre bucea dentro de los límites de tu entrenamiento y certificación, sigue los procedimientos adecuados de planificación de inmersiones y consulta con profesionales de buceo certificados antes de tomar cualquier decisión de buceo.",
      },
      footer: "Dive Theory está diseñado con fines educativos para apoyar los programas de entrenamiento y certificación de buceo.",
    },
    // Common
    common: {
      backToHome: "Volver al Inicio",
    },
  },
} as const
