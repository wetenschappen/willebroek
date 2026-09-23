/**
 * SUBJECT REGISTRY - single source of truth for the Willebroek planner.
 * Deze schoolrepo is bewust beperkt tot fysica en biologie.
 */

import { PhPlanet, PhMicroscope } from '@phosphor-icons/vue'

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
    icon: PhPlanet, accentColor: 'text-physics',
    hoverBorder: 'hover:border-physics/50', hoverBg: 'hover:bg-physics-soft/60',
    hoverText: 'group-hover:text-physics', watermarkIcon: PhPlanet,
    watermarkColor: 'text-physics', background: { color: '#f2f8fa' }
  },
  biology: {
    id: 'biology', slug: 'biologie', label: 'Biologie',
    title: 'Biologie Leerpad',
    description: 'Cellen, planten, ecosystemen en erfelijkheid.',
    icon: PhMicroscope, accentColor: 'text-biology',
    hoverBorder: 'hover:border-biology/50', hoverBg: 'hover:bg-biology-soft/60',
    hoverText: 'group-hover:text-biology', watermarkIcon: PhMicroscope,
    watermarkColor: 'text-biology', background: { color: '#f3f8f4' }
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
