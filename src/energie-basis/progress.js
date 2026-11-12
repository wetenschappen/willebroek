import { lesson, steps } from './lesson.js'
import { createProgressSystem } from '../guided/progress.js'

export const STORAGE_KEY = `willebroek:energie-basis:${lesson.id}`
export const { freshProgress, canAdvance, restoreProgress, loadProgress, saveProgress, answerQuestion, confirmHelp, setWorkChecks, advance, firstTrySummary } = createProgressSystem(lesson, steps, STORAGE_KEY)
