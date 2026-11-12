import { lesson, steps } from './lesson.js'
import { createProgressSystem } from '../guided/progress.js'

// De bestaande sleutel en payloadversie blijven behouden voor de gebruikte klas.
export const STORAGE_KEY = `willebroek:energie:${lesson.id}`
export const { freshProgress, canAdvance, restoreProgress, loadProgress, saveProgress, answerQuestion, confirmHelp, setWorkChecks, advance, firstTrySummary } = createProgressSystem(lesson, steps, STORAGE_KEY)
