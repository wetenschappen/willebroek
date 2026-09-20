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
    year: 1
  },
  {
    id: 'fys1-m01-l02-meten',
    subject: 'physics',
    title: 'Krachten: Meten & Eenheden',
    year: 1
  },
  {
    id: 'fys1-m02-l01-beweging',
    subject: 'physics',
    title: 'Beweging: Snelheid',
    year: 1
  },
  {
    id: 'fys1-m02-l02-versnelling',
    subject: 'physics',
    title: 'Beweging: Versnelling',
    year: 1
  },

  // ── 2de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'fys2-m01-l01-energie',
    subject: 'physics',
    title: 'Energie: Vormen & Omzetting',
    year: 2
  },
  {
    id: 'fys2-m01-l02-warmte',
    subject: 'physics',
    title: 'Energie: Warmteleer',
    year: 2
  },
  {
    id: 'fys2-m02-l01-golven',
    subject: 'physics',
    title: 'Golven: Geluid',
    year: 2
  },

  // ── 3de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'fys3-m01-l01-elektriciteit',
    subject: 'physics',
    title: 'Elektriciteit: Lading & Spanning',
    year: 3
  },
  {
    id: 'fys3-m01-l02-stroomkringen',
    subject: 'physics',
    title: 'Elektriciteit: Stroomkringen',
    year: 3
  },
  {
    id: 'fys3-m02-l01-magnetisme',
    subject: 'physics',
    title: 'Magnetisme: Velden',
    year: 3
  },

  // ── 4de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'fys4-m01-l01-optica',
    subject: 'physics',
    title: 'Optica: Licht & Breking',
    year: 4
  },
  {
    id: 'fys4-m02-l01-kernfysica',
    subject: 'physics',
    title: 'Kernfysica: Radioactiviteit',
    year: 4
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BIOLOGIE
  // ══════════════════════════════════════════════════════════════════════════

  // ── 1ste jaar ──────────────────────────────────────────────────────────────
  {
    id: 'bio1-m01-l01-levend',
    subject: 'biology',
    title: 'Levende Wezens: Kenmerken',
    year: 1
  },
  {
    id: 'bio1-m01-l02-indeling',
    subject: 'biology',
    title: 'Levende Wezens: Indeling',
    year: 1
  },
  {
    id: 'bio1-m02-l01-cel',
    subject: 'biology',
    title: 'De Cel: Bouw',
    year: 1
  },
  {
    id: 'bio1-m02-l02-celfuncties',
    subject: 'biology',
    title: 'De Cel: Functies',
    year: 1
  },

  // ── 2de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'bio2-m01-l01-planten',
    subject: 'biology',
    title: 'Planten: Bouw & Functies',
    year: 2
  },
  {
    id: 'bio2-m01-l02-fotosynthese',
    subject: 'biology',
    title: 'Planten: Fotosynthese',
    year: 2
  },
  {
    id: 'bio2-m02-l01-ecosysteem',
    subject: 'biology',
    title: 'Ecosystemen: Voedselketens',
    year: 2
  },

  // ── 3de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'bio3-m01-l01-erfelijkheid',
    subject: 'biology',
    title: 'Erfelijkheid: DNA & Genen',
    year: 3
  },
  {
    id: 'bio3-m01-l02-overerving',
    subject: 'biology',
    title: 'Erfelijkheid: Mendel',
    year: 3
  },
  {
    id: 'bio3-m02-l01-evolutie',
    subject: 'biology',
    title: 'Evolutie: Basisprincipes',
    year: 3
  },

  // ── 4de jaar ──────────────────────────────────────────────────────────────
  {
    id: 'bio4-m01-l01-stofwisseling',
    subject: 'biology',
    title: 'Stofwisseling: Cellulaire Ademhaling',
    year: 4
  },
  {
    id: 'bio4-m02-l01-immunologie',
    subject: 'biology',
    title: 'Immunologie: Afweersysteem',
    year: 4
  },

  // ══════════════════════════════════════════════════════════════════════════
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
