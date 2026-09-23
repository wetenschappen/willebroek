/**
 * MODULE REGISTRY
 *
 * Elk item = één les. `subject` bepaalt onder welk vak de les verschijnt en
 * moet overeenkomen met `subject:` in het lesbestand zelf.
 * Zichtbaarheid per school staat in src/data/subjects.js - niet hier.
 */
export const modules = [

  // ══════════════════════════════════════════════════════════════════════════
  // FYSICA (Actief - Gouden standaard)
  // ══════════════════════════════════════════════════════════════════════════

  // ── 4de jaar (WACO 4 - Thema 1: Druk) ────────────────────────────────────────
  {
    id: 'fys4-m01-druk-vaste-stoffen',
    subject: 'physics',
    year: 4,
    module: 1,
    topic: 'Druk',
    title: 'Druk bij vaste stoffen',
    date: '24/09/2026'
  }

]

/**
 * Gearchiveerde lessen (ter referentie bewaard in src/lessons/_archive/)
 */
export const archivedModules = [
  // WACO 4 Thema 1 (Druk) lessen 2-10
  { id: 'fys4-m01-l02-toepassingen-druk-vaste-stoffen', subject: 'physics', year: 4, title: 'Druk: Toepassingen & Vraagstukken' },
  { id: 'fys4-m01-l03-gasdruk-atmosfeer', subject: 'physics', year: 4, title: 'Druk: Gasdruk & Atmosferische Druk' },
  { id: 'fys4-m01-l04-meten-gasdruk-manometer', subject: 'physics', year: 4, title: 'Druk: Meten van Druk, Over- & Onderdruk' },
  { id: 'fys4-m01-l05-hydrostatische-druk', subject: 'physics', year: 4, title: 'Druk: Hydrostatische Druk & Diepte' },
  { id: 'fys4-m01-l06-totale-vloeistofdruk-vaten', subject: 'physics', year: 4, title: 'Druk: Totale Druk & Communicerende Vaten' },
  { id: 'fys4-m01-l07-beginsel-van-pascal', subject: 'physics', year: 4, title: 'Druk: Beginsel van Pascal & Hydraulica' },
  { id: 'fys4-m01-l08-vraagstukken-vloeistofdruk', subject: 'physics', year: 4, title: 'Druk: Vloeistofdruk Vraagstukken & Synthese' },
  { id: 'fys4-m01-l09-archimedeskracht-vloeistoffen', subject: 'physics', year: 4, title: 'Druk: Archimedeskracht in Vloeistoffen' },
  { id: 'fys4-m01-l10-archimedeskracht-gassen', subject: 'physics', year: 4, title: 'Druk: Archimedeskracht in Gassen & Synthese' },

  // WACO 3 Thema 1 (Optica) lessen 1-13
  { id: 'fys3-m01-l01-lichtbronnen-en-voortplanting', subject: 'physics', year: 3, title: 'Optica: Lichtbronnen & Voortplanting' },
  { id: 'fys3-m01-l02-schaduwvorming', subject: 'physics', year: 3, title: 'Optica: Schaduwvorming & Eclipsen' },
  { id: 'fys3-m01-l03-lichamen-zien-terugkaatsing', subject: 'physics', year: 3, title: 'Optica: Lichamen Zien & Terugkaatsingswet' },
  { id: 'fys3-m01-l04-diffuse-weerkaatsing', subject: 'physics', year: 3, title: 'Optica: Regelmatige & Diffuse Weerkaatsing' },
  { id: 'fys3-m01-l05-vlakke-spiegel-beeld', subject: 'physics', year: 3, title: 'Optica: Beeldvorming Vlakke Spiegel' },
  { id: 'fys3-m01-l06-gezichtsveld-spiegel', subject: 'physics', year: 3, title: 'Optica: Gezichtsveld & Dode Hoek' },
  { id: 'fys3-m01-l07-lichtbreking-basis', subject: 'physics', year: 3, title: 'Optica: Lichtbreking & Middenstoffen' },
  { id: 'fys3-m01-l08-totale-weerkaatsing', subject: 'physics', year: 3, title: 'Optica: Grenshoek & Totale Weerkaatsing' },
  { id: 'fys3-m01-l09-bolle-lenzen-hoofdstralen', subject: 'physics', year: 3, title: 'Optica: Bolle Lenzen & 3 Hoofdstralen' },
  { id: 'fys3-m01-l10-bolle-lenzen-beeldvorming', subject: 'physics', year: 3, title: 'Optica: Beeldvorming bij Bolle Lenzen' },
  { id: 'fys3-m01-l11-vergrotingsfactor', subject: 'physics', year: 3, title: 'Optica: De Vergrotingsfactor (N)' },
  { id: 'fys3-m01-l12-kleuren-wit-licht', subject: 'physics', year: 3, title: 'Optica: Kleuren in Wit Licht & Dispersie' },
  { id: 'fys3-m01-l13-kleur-donkere-lichamen', subject: 'physics', year: 3, title: 'Optica: Kleur van Donkere Lichamen & Synthese' }
]

/**
 * Lessen van één vak in één jaar.
 * @param {string} subjectId  bv. 'physics'
 * @param {number} year       bv. 4
 */
export function modulesFor(subjectId, year) {
  return modules.filter(m => m.subject === subjectId && m.year === year)
}

/** Welke leerjaren hebben minstens één les voor dit vak? */
export function yearsFor(subjectId) {
  const years = new Set(modules.filter(m => m.subject === subjectId).map(m => m.year))
  return [...years].sort((a, b) => a - b)
}
