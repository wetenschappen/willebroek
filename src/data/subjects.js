/**
 * SUBJECT REGISTRY — single source of truth for the subjects in this planner.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  SCHOOL CONFIGURATIE                                                     │
 * │  Deze repo hoort bij één school. Zet hieronder welke vakken actief zijn.  │
 * │  Vakken op `false` blijven volledig in de repo staan (lessen, modules,    │
 * │  activiteiten) maar zijn onzichtbaar in de navigatie. Opnieuw aanzetten   │
 * │  = één boolean omzetten naar `true`.                                      │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

import {
  PhLeaf, PhTree, PhDna,
  PhFlask, PhTestTube, PhAtom,
  PhLightning, PhWaves, PhMagnet,
  PhMicroscope, PhGlobe,
  PhPi
} from '@phosphor-icons/vue'

// ─── School & welke vakken staan aan ─────────────────────────────────────────
export const school = {
  name: 'Willebroek',
  tagline: 'Kies je vak om aan de slag te gaan.',

  // Wachtwoord voor de naamkiezer (N-toets tijdens een les).
  // LET OP: dit is een drempel, geen beveiliging. De namen zitten in de
  // publieke bundel; wie de broncode bekijkt, ziet ze ongeacht dit wachtwoord.
  // Het houdt leerlingen weg van de knop — meer niet.
  namePickerCode: 'willebroek'
}

export const subjectState = {
  physics:   true,
  biology:   true,
  chemistry: false,
  science:   false,
  math:      false
}

// ─── Vakdefinities ───────────────────────────────────────────────────────────
// id    : interne sleutel — moet overeenkomen met `subject:` in de lesbestanden
// slug  : stukje in de URL  (#/fysica/...)
// label : zichtbare naam
//
// De overige velden sturen de vormgeving. Eén bron, dus geen hardcoded kleuren
// meer in de views zelf.
export const subjects = {
  physics: {
    id: 'physics',
    slug: 'fysica',
    label: 'Fysica',
    title: 'Fysica Leerpad',
    description: 'Krachten, energie, elektriciteit en golven.',
    icon: PhLightning,
    accentColor: 'text-blue-600',
    hoverBorder: 'hover:border-blue-500/50',
    hoverBg: 'hover:bg-blue-50/60',
    hoverText: 'group-hover:text-blue-500',
    watermarkIcon: PhLightning,
    watermarkColor: 'text-blue-500',
    background: { color: '#eff6ff', dot: '#bfdbfe' }
  },

  biology: {
    id: 'biology',
    slug: 'biologie',
    label: 'Biologie',
    title: 'Biologie Leerpad',
    description: 'Cellen, planten, ecosystemen en erfelijkheid.',
    icon: PhLeaf,
    accentColor: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-500/50',
    hoverBg: 'hover:bg-emerald-50/60',
    hoverText: 'group-hover:text-emerald-500',
    watermarkIcon: PhLeaf,
    watermarkColor: 'text-emerald-500',
    background: { color: '#f0fdf4', dot: '#bbf7d0' }
  },

  chemistry: {
    id: 'chemistry',
    slug: 'chemie',
    label: 'Chemie',
    title: 'Chemie Leerpad',
    description: 'Stoffen, mengsels, reacties en bindingen.',
    icon: PhFlask,
    accentColor: 'text-orange-600',
    hoverBorder: 'hover:border-orange-500/50',
    hoverBg: 'hover:bg-orange-50/60',
    hoverText: 'group-hover:text-orange-500',
    watermarkIcon: PhFlask,
    watermarkColor: 'text-orange-500',
    background: { color: '#fff8f3', dot: '#fed7aa' }
  },

  science: {
    id: 'science',
    slug: 'natuurwetenschappen',
    label: 'Natuurwetenschappen',
    title: 'Natuurwetenschappen Leerpad',
    description: 'Onderzoek, waarnemen en de wereld rondom ons.',
    icon: PhMicroscope,
    accentColor: 'text-teal-600',
    hoverBorder: 'hover:border-teal-500/50',
    hoverBg: 'hover:bg-teal-50/60',
    hoverText: 'group-hover:text-teal-500',
    watermarkIcon: PhMicroscope,
    watermarkColor: 'text-teal-500',
    background: { color: '#f0fdfa', dot: '#99f6e4' }
  },

  math: {
    id: 'math',
    slug: 'wiskunde',
    label: 'Wiskunde',
    title: 'Wiskunde Leerpad',
    description: 'Algebra, meetkunde, functies en statistiek.',
    icon: PhPi,
    accentColor: 'text-amber-600',
    hoverBorder: 'hover:border-amber-500/50',
    hoverBg: 'hover:bg-amber-50/60',
    hoverText: 'group-hover:text-amber-500',
    watermarkIcon: PhPi,
    watermarkColor: 'text-amber-500',
    background: { color: '#f8fafc', dot: '#cbd5e1' }
  }
}

// Vaste volgorde waarin vakken verschijnen.
const SUBJECT_ORDER = ['physics', 'biology', 'chemistry', 'science', 'math']

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** De vakken die op deze school actief zijn, in vaste volgorde. */
export function enabledSubjects() {
  return SUBJECT_ORDER
    .filter(id => subjectState[id] && subjects[id])
    .map(id => subjects[id])
}

/** Zoek een vak op zijn URL-slug (bv. 'fysica').
 *  Geeft null als het niet bestaat of uitgeschakeld is — de router stuurt dan terug naar '/'. */
export function subjectBySlug(slug) {
  return enabledSubjects().find(s => s.slug === slug) || null
}

/** Zoek een vak op zijn interne id (bv. 'physics').
 *  Werkt óók voor uitgeschakelde vakken, zodat lessen die nog in de repo staan
 *  toch thema en icoon krijgen als ze ooit opnieuw aangezet worden. */
export function subjectById(id) {
  return subjects[id] || subjects.math
}

/** Eerste actieve vak — fallback voor /les/:id wanneer het vak onbekend is. */
export function defaultSubject() {
  return enabledSubjects()[0] || subjects.math
}
