/**
 * SUBJECT REGISTRY — single source of truth for the Willebroek planner.
 * Deze schoolrepo is bewust beperkt tot fysica en biologie.
 */

import { PhLeaf, PhLightning, PhWaves, PhMagnet, PhAtom } from '@phosphor-icons/vue'

export const school = {
  name: 'Willebroek',
  tagline: 'Kies je vak om aan de slag te gaan.',
  // Dit is een drempel voor de naamkiezer, geen beveiliging.
  namePickerCode: 'willebroek'
}

export const subjectState = {
  physics: true,
  biology: true
}

export const subjects = {
  physics: {
    id: 'physics', slug: 'fysica', label: 'Fysica',
    title: 'Fysica Leerpad',
    description: 'Krachten, energie, elektriciteit en golven.',
    icon: PhLightning, accentColor: 'text-blue-600',
    hoverBorder: 'hover:border-blue-500/50', hoverBg: 'hover:bg-blue-50/60',
    hoverText: 'group-hover:text-blue-500', watermarkIcon: PhLightning,
    watermarkColor: 'text-blue-500', background: { color: '#eff6ff', dot: '#bfdbfe' }
  },
  biology: {
    id: 'biology', slug: 'biologie', label: 'Biologie',
    title: 'Biologie Leerpad',
    description: 'Cellen, planten, ecosystemen en erfelijkheid.',
    icon: PhLeaf, accentColor: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-500/50', hoverBg: 'hover:bg-emerald-50/60',
    hoverText: 'group-hover:text-emerald-500', watermarkIcon: PhLeaf,
    watermarkColor: 'text-emerald-500', background: { color: '#f0fdf4', dot: '#bbf7d0' }
  }
}

const SUBJECT_ORDER = ['physics', 'biology']
export function enabledSubjects() {
  return SUBJECT_ORDER.filter(id => subjectState[id]).map(id => subjects[id])
}
export function subjectBySlug(slug) {
  return enabledSubjects().find(s => s.slug === slug) || null
}
export function subjectById(id) {
  return subjects[id] || subjects.physics
}
export function defaultSubject() {
  return enabledSubjects()[0] || subjects.physics
}
