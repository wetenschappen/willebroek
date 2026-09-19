import {
  // Physics
  PhLightning, PhWaves, PhMagnet, PhAtom,
  // Biology
  PhLeaf, PhTree, PhDna,
  // Chemistry
  PhFlask, PhTestTube,
  // Maths
  PhMathOperations, PhGraph, PhCalculator
} from '@phosphor-icons/vue'

/**
 * MODULE REGISTRY
 *
 * Elk item = één les. `subject` bepaalt onder welk vak de les verschijnt en
 * moet overeenkomen met `subject:` in het lesbestand zelf.
 * Zichtbaarheid per school staat in src/data/subjects.js — niet hier.
 */
export const modules = [

  // ══════════════════════════════════════════════════════════════════════════
  // FYSICA
  // ══════════════════════════════════════════════════════════════════════════

  // ── 1ste jaar ──────────────────────────────────────────────────────────────
  {
    id: 'fys1-m01-l01-krachten',
    subject: 'physics',
    title: 'Krachten: Introductie',
    year: 1,
    grade: '1ste Jaar Fysica',
    icon: PhLightning,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'fys1-m01-l02-meten',
    subject: 'physics',
    title: 'Krachten: Meten & Eenheden',
    year: 1,
    grade: '1ste Jaar Fysica',
    icon: PhLightning,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'fys1-m02-l01-beweging',
    subject: 'physics',
    title: 'Beweging: Snelheid',
    year: 1,
    grade: '1ste Jaar Fysica',
    icon: PhWaves,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'fys1-m02-l02-versnelling',
    subject: 'physics',
    title: 'Beweging: Versnelling',
    year: 1,
    grade: '1ste Jaar Fysica',
    icon: PhWaves,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },

  // ── 2de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'fys2-m01-l01-energie',
    subject: 'physics',
    title: 'Energie: Vormen & Omzetting',
    year: 2,
    grade: '2de Jaar Fysica',
    icon: PhLightning,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'fys2-m01-l02-warmte',
    subject: 'physics',
    title: 'Energie: Warmteleer',
    year: 2,
    grade: '2de Jaar Fysica',
    icon: PhLightning,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'fys2-m02-l01-golven',
    subject: 'physics',
    title: 'Golven: Geluid',
    year: 2,
    grade: '2de Jaar Fysica',
    icon: PhWaves,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },

  // ── 3de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'fys3-m01-l01-elektriciteit',
    subject: 'physics',
    title: 'Elektriciteit: Lading & Spanning',
    year: 3,
    grade: '3de Jaar Fysica',
    icon: PhLightning,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    id: 'fys3-m01-l02-stroomkringen',
    subject: 'physics',
    title: 'Elektriciteit: Stroomkringen',
    year: 3,
    grade: '3de Jaar Fysica',
    icon: PhLightning,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    id: 'fys3-m02-l01-magnetisme',
    subject: 'physics',
    title: 'Magnetisme: Velden',
    year: 3,
    grade: '3de Jaar Fysica',
    icon: PhMagnet,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },

  // ── 4de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'fys4-m01-l01-optica',
    subject: 'physics',
    title: 'Optica: Licht & Breking',
    year: 4,
    grade: '4de Jaar Fysica',
    icon: PhWaves,
    color: 'text-violet-600',
    bg: 'bg-violet-50'
  },
  {
    id: 'fys4-m02-l01-kernfysica',
    subject: 'physics',
    title: 'Kernfysica: Radioactiviteit',
    year: 4,
    grade: '4de Jaar Fysica',
    icon: PhAtom,
    color: 'text-violet-600',
    bg: 'bg-violet-50'
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BIOLOGIE
  // ══════════════════════════════════════════════════════════════════════════

  // ── 1ste jaar ──────────────────────────────────────────────────────────────
  {
    id: 'bio1-m01-l01-levend',
    subject: 'biology',
    title: 'Levende Wezens: Kenmerken',
    year: 1,
    grade: '1ste Jaar Biologie',
    icon: PhLeaf,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'bio1-m01-l02-indeling',
    subject: 'biology',
    title: 'Levende Wezens: Indeling',
    year: 1,
    grade: '1ste Jaar Biologie',
    icon: PhLeaf,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'bio1-m02-l01-cel',
    subject: 'biology',
    title: 'De Cel: Bouw',
    year: 1,
    grade: '1ste Jaar Biologie',
    icon: PhDna,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'bio1-m02-l02-celfuncties',
    subject: 'biology',
    title: 'De Cel: Functies',
    year: 1,
    grade: '1ste Jaar Biologie',
    icon: PhDna,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },

  // ── 2de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'bio2-m01-l01-planten',
    subject: 'biology',
    title: 'Planten: Bouw & Functies',
    year: 2,
    grade: '2de Jaar Biologie',
    icon: PhTree,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'bio2-m01-l02-fotosynthese',
    subject: 'biology',
    title: 'Planten: Fotosynthese',
    year: 2,
    grade: '2de Jaar Biologie',
    icon: PhTree,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'bio2-m02-l01-ecosysteem',
    subject: 'biology',
    title: 'Ecosystemen: Voedselketens',
    year: 2,
    grade: '2de Jaar Biologie',
    icon: PhLeaf,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },

  // ── 3de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'bio3-m01-l01-erfelijkheid',
    subject: 'biology',
    title: 'Erfelijkheid: DNA & Genen',
    year: 3,
    grade: '3de Jaar Biologie',
    icon: PhDna,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    id: 'bio3-m01-l02-overerving',
    subject: 'biology',
    title: 'Erfelijkheid: Mendel',
    year: 3,
    grade: '3de Jaar Biologie',
    icon: PhDna,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    id: 'bio3-m02-l01-evolutie',
    subject: 'biology',
    title: 'Evolutie: Basisprincipes',
    year: 3,
    grade: '3de Jaar Biologie',
    icon: PhLeaf,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },

  // ── 4de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'bio4-m01-l01-stofwisseling',
    subject: 'biology',
    title: 'Stofwisseling: Cellulaire Ademhaling',
    year: 4,
    grade: '4de Jaar Biologie',
    icon: PhDna,
    color: 'text-teal-600',
    bg: 'bg-teal-50'
  },
  {
    id: 'bio4-m02-l01-immunologie',
    subject: 'biology',
    title: 'Immunologie: Afweersysteem',
    year: 4,
    grade: '4de Jaar Biologie',
    icon: PhLeaf,
    color: 'text-teal-600',
    bg: 'bg-teal-50'
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CHEMIE  (staat uit — zie src/data/subjects.js)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'chem1-m01-l01-stoffen',
    subject: 'chemistry',
    title: 'Stoffen & Materialen: Introductie',
    year: 1,
    grade: '1ste Jaar Chemie',
    icon: PhFlask,
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  {
    id: 'chem1-m01-l02-eigenschappen',
    subject: 'chemistry',
    title: 'Stoffen & Materialen: Eigenschappen',
    year: 1,
    grade: '1ste Jaar Chemie',
    icon: PhFlask,
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  {
    id: 'chem1-m02-l01-mengsels',
    subject: 'chemistry',
    title: 'Mengsels: Soorten',
    year: 1,
    grade: '1ste Jaar Chemie',
    icon: PhTestTube,
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  {
    id: 'chem2-m01-l01-reacties',
    subject: 'chemistry',
    title: 'Chemische Reacties: Basis',
    year: 2,
    grade: '2de Jaar Chemie',
    icon: PhFlask,
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },

  // ══════════════════════════════════════════════════════════════════════════
  // WISKUNDE  (staat uit — zie src/data/subjects.js)
  // Alle 68 lessen blijven hier staan zodat het vak opnieuw aangezet kan worden
  // zonder iets te herschrijven. Bestanden in src/lessons/ zijn bewaard gebleven.
  // ══════════════════════════════════════════════════════════════════════════

  // ── 1ste jaar ─────────────────────────────────────────────────────────────
  {
    id: 'nando1-demo',
    subject: 'math',
    title: 'Demo: Basisbewerkingen',
    year: 1,
    grade: '1ste Jaar Wiskunde',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'lpd-functies-intro',
    subject: 'math',
    title: 'Introductie: Het Functiebegrip',
    year: 1,
    grade: '1ste Jaar Wiskunde',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },

  // ── 3de jaar ─────────────────────────────────────────────────────────────
  {
    id: 'nando3-m01-l01-symbolen',
    subject: 'math',
    title: 'Wiskundetaal: Symbolen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m01-l02-operatoren',
    subject: 'math',
    title: 'Wiskundetaal: Operatoren',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m01-l03-consolidatie',
    subject: 'math',
    title: 'Wiskundetaal: Consolidatie',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m02-l01-irrationaal',
    subject: 'math',
    title: 'Reële getallen: Irrationale Getallen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m02-l02-intervallen',
    subject: 'math',
    title: 'Reële getallen: Intervallen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m02-l03-wortels',
    subject: 'math',
    title: 'Reële getallen: Wortels & Schatten',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m02-l04-consolidatie',
    subject: 'math',
    title: 'Reële getallen: Consolidatie',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m03-l01-begrip',
    subject: 'math',
    title: 'Vectoren: Het Begrip',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m03-l02-rekenen',
    subject: 'math',
    title: 'Vectoren: Rekenen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m03-l03-coordinaten',
    subject: 'math',
    title: 'Vectoren: Coördinaten',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m03-l04-meetkunde',
    subject: 'math',
    title: 'Vectoren: Meetkunde & Consolidatie',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m04-l01-basis',
    subject: 'math',
    title: 'Consolidatie: Basis',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m04-l02-gevorderd',
    subject: 'math',
    title: 'Consolidatie: Gevorderd',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m04-l03-uitdaging',
    subject: 'math',
    title: 'Consolidatie: Uitdaging',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m05-l01-hoofdbewerkingen',
    subject: 'math',
    title: 'Rekenen: Hoofdbewerkingen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m05-l02-wetenschappelijk',
    subject: 'math',
    title: 'Rekenen: Wetenschappelijk',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m05-l03-wortels',
    subject: 'math',
    title: 'Rekenen: Wortels',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m05-l04-consolidatie',
    subject: 'math',
    title: 'Rekenen: Consolidatie',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m06-l01-vergelijkingen',
    subject: 'math',
    title: 'Vergelijkingen: Oplossen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m06-l02-problemen',
    subject: 'math',
    title: 'Vergelijkingen: Vraagstukken',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m06-l03-formules',
    subject: 'math',
    title: 'Vergelijkingen: Formules',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m07-l01-gelijkvormigheid',
    subject: 'math',
    title: 'Gelijkvormigheid: Basis',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m07-l02-kenmerken',
    subject: 'math',
    title: 'Gelijkvormigheid: Driehoeken',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m07-l03-thales',
    subject: 'math',
    title: 'Gelijkvormigheid: Thales',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m08-l01-functies',
    subject: 'math',
    title: 'Functies: Introductie',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m08-l02-ongelijkheden',
    subject: 'math',
    title: 'Functies: Ongelijkheden',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m09-l01-homothetie',
    subject: 'math',
    title: 'Thales: Homothetie',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m09-l02-thales',
    subject: 'math',
    title: 'Thales: De Stelling',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m09-l03-metrisch',
    subject: 'math',
    title: 'Thales: Metrische Betrekkingen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m10-l01-consolidatie',
    subject: 'math',
    title: 'Consolidatie 6-9',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m11-l01-pythagoras',
    subject: 'math',
    title: 'Pythagoras: Basis',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m11-l02-toepassingen',
    subject: 'math',
    title: 'Pythagoras: Toepassingen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m12-l01-eerstegraads',
    subject: 'math',
    title: 'Linaire Functies: Basis',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m12-l02-verloop',
    subject: 'math',
    title: 'Linaire Functies: Verloop',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m12-l03-opstellen',
    subject: 'math',
    title: 'Linaire Functies: Opstellen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m13-l01-goniometrie',
    subject: 'math',
    title: 'Goniometrie: SOH CAH TOA',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m13-l02-formules',
    subject: 'math',
    title: 'Goniometrie: Grondformule',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m13-l03-vraagstukken',
    subject: 'math',
    title: 'Goniometrie: Vraagstukken',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m14-l01-consolidatie',
    subject: 'math',
    title: 'Consolidatie 11-13',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m15-l01-cartesisch',
    subject: 'math',
    title: 'Analytische Meetkunde: Cartesisch',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m15-l02-parametrisch',
    subject: 'math',
    title: 'Analytische Meetkunde: Parametrisch',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m16-l01-centrummaten',
    subject: 'math',
    title: 'Statistiek: Centrummaten',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m16-l02-spreidingsmaten',
    subject: 'math',
    title: 'Statistiek: Spreiding',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m16-l03-gegroepeerd',
    subject: 'math',
    title: 'Statistiek: Groeperen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m17-l01-lijnen',
    subject: 'math',
    title: 'Cirkels: Lijnen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m17-l02-eigenschappen',
    subject: 'math',
    title: 'Cirkels: Eigenschappen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m17-l03-raaklijnen',
    subject: 'math',
    title: 'Cirkels: Raaklijnen',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'nando3-m18-l01-consolidatie',
    subject: 'math',
    title: 'Grote Consolidatie Finale',
    year: 3,
    grade: '3 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-brand-blue-500',
    bg: 'bg-blue-50'
  },

  // ── 4de jaar ─────────────────────────────────────────────────────────────
  {
    id: 'nando4-m01-l01',
    subject: 'math',
    title: 'Logica en waarheidstabellen',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m02-l01',
    subject: 'math',
    title: 'Stelsels van eerstegraadsvergelijkingen',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m03-l01',
    subject: 'math',
    title: 'Functies van de tweede graad',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m04-l01',
    subject: 'math',
    title: 'Consolidatie',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m05-l01',
    subject: 'math',
    title: 'Problemen oplossen met tweedegraadsfuncties',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m06-l01',
    subject: 'math',
    title: 'De goniometrische cirkel en verwante hoeken',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m07-l01',
    subject: 'math',
    title: 'Telproblemen',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m08-l01',
    subject: 'math',
    title: 'Grafen',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m09-l01',
    subject: 'math',
    title: 'Consolidatie',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m10-l01',
    subject: 'math',
    title: 'Tweedegraadsvergelijkingen en - ongelijkheden',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhCalculator,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m11-l01',
    subject: 'math',
    title: 'Spreidingsdiagrammen',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m12-l01',
    subject: 'math',
    title: 'Driehoeksmeting in willekeurige driehoeken',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m13-l01',
    subject: 'math',
    title: 'Functies met voorschrift f(x) = c/x',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m14-l01',
    subject: 'math',
    title: 'Consolidatie',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m15-l01',
    subject: 'math',
    title: 'Analytische meetkunde',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m16-l01',
    subject: 'math',
    title: 'Deelbaarheid van veeltermen',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m17-l01',
    subject: 'math',
    title: 'Ruimtemeetkunde',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhGraph,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'nando4-m18-l01',
    subject: 'math',
    title: 'Consolidatie',
    year: 4,
    grade: '4 Wiskunde (D5)',
    icon: PhMathOperations,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
]

/**
 * Lessen van één vak in één jaar.
 * @param {string} subjectId  bv. 'physics'
 * @param {number} year       bv. 3
 */
export function modulesFor(subjectId, year) {
  return modules.filter(m => m.subject === subjectId && m.year === year)
}

/** Welke leerjaren hebben minstens één les voor dit vak? */
export function yearsFor(subjectId) {
  const years = new Set(modules.filter(m => m.subject === subjectId).map(m => m.year))
  return [...years].sort((a, b) => a - b)
}
