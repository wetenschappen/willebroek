import { lesson, steps } from './lesson.js'

export const STORAGE_KEY = `willebroek:energie:${lesson.id}`
export const freshProgress = () => ({ version: lesson.id, current: 0, completed: [], responses: {} })

export function canAdvance(state, step) {
  if (step.type !== 'quiz') return true
  const response = state.responses[step.id]
  return Boolean(response && (step.diagnostic || response.last === step.answer || response.assisted))
}

// Behandel lokale opslag als onbetrouwbare invoer; onbekende versies starten veilig opnieuw.
export function restoreProgress(value) {
  const clean = freshProgress()
  if (!value || value.version !== lesson.id) return clean
  for (const step of steps.filter(item => item.type === 'quiz')) {
    const response = value.responses?.[step.id]
    if (!response || !Number.isInteger(response.count) || response.count < 1 || response.count > 10000) continue
    const validChoice = choice => Number.isInteger(choice) && choice >= 0 && choice < step.options.length
    if (!validChoice(response.first) || !validChoice(response.last)) continue
    clean.responses[step.id] = {
      first: response.first, last: response.last, count: response.count,
      assisted: response.assisted === true && response.count >= 2,
    }
  }
  if (Array.isArray(value.completed)) {
    for (const [index, step] of steps.entries()) {
      if (value.completed[index] !== step.id || !canAdvance(clean, step)) break
      clean.completed.push(step.id)
    }
  }
  clean.current = Number.isInteger(value.current)
    ? Math.max(0, Math.min(value.current, clean.completed.length))
    : clean.completed.length
  return clean
}

export function loadProgress(storage) {
  try {
    return { state: restoreProgress(JSON.parse(storage.getItem(STORAGE_KEY))), available: true }
  } catch {
    return { state: freshProgress(), available: false }
  }
}

export function saveProgress(storage, state) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function answerQuestion(state, step, choice) {
  if (step.type !== 'quiz' || steps[state.current]?.id !== step.id) return state
  if (!Number.isInteger(choice) || choice < 0 || choice >= step.options.length) return state
  const old = state.responses[step.id]
  // Een juist antwoord en een diagnostische eerste poging blijven behouden.
  if (old && (old.last === step.answer || step.diagnostic || old.assisted)) return state
  return {
    ...state,
    responses: {
      ...state.responses,
      [step.id]: { first: old?.first ?? choice, last: choice, count: (old?.count ?? 0) + 1, assisted: false },
    },
  }
}

export function confirmHelp(state) {
  const step = steps[state.current]
  const response = state.responses[step?.id]
  if (!response || response.count < 2 || response.last === step.answer) return state
  return { ...state, responses: { ...state.responses, [step.id]: { ...response, assisted: true } } }
}

export function advance(state) {
  const step = steps[state.current]
  if (!step || !canAdvance(state, step)) return state
  const completed = state.completed.includes(step.id) ? state.completed : [...state.completed, step.id]
  return { ...state, completed, current: Math.min(state.current + 1, steps.length) }
}

export function firstTrySummary(state, predicate) {
  const questions = steps.filter(step => step.type === 'quiz' && predicate(step))
  return {
    correct: questions.filter(step => state.responses[step.id]?.first === step.answer).length,
    total: questions.length,
    assisted: questions.filter(step => state.responses[step.id]?.assisted).length,
  }
}
