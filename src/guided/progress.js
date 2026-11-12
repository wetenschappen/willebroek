// Onafhankelijke voortgang per les. Geen imports van concrete lesinhoud.
export function createProgressSystem(lesson, steps, storageKey) {
  const freshProgress = () => ({ version: lesson.id, current: 0, completed: [], responses: {}, workChecks: {} })

  function canAdvance(state, step) {
    if (step.type === 'work') return step.checks.every((_, index) => state.workChecks?.[step.id]?.includes(index))
    if (step.type !== 'quiz') return true
    const response = state.responses[step.id]
    return Boolean(response && (step.diagnostic || response.last === step.answer || response.assisted))
  }

  // Behandel lokale opslag als onbetrouwbare invoer; onbekende versies starten veilig opnieuw.
  function restoreProgress(value) {
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
    for (const step of steps.filter(item => item.type === 'work')) {
      const checks = value.workChecks?.[step.id]
      if (Array.isArray(checks)) clean.workChecks[step.id] = [...new Set(checks.filter(index => Number.isInteger(index) && index >= 0 && index < step.checks.length))]
      // Versie 1 van Energie bewaarde alleen afgeronde stappen, niet de deelvinkjes.
      else if (Array.isArray(value.completed) && value.completed.includes(step.id)) clean.workChecks[step.id] = step.checks.map((_, index) => index)
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

  function loadProgress(storage) {
    try {
      return { state: restoreProgress(JSON.parse(storage.getItem(storageKey))), available: true }
    } catch {
      return { state: freshProgress(), available: false }
    }
  }

  function saveProgress(storage, state) {
    try {
      storage.setItem(storageKey, JSON.stringify(state))
      return true
    } catch {
      return false
    }
  }

  function answerQuestion(state, step, choice) {
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

  function confirmHelp(state) {
    const step = steps[state.current]
    const response = state.responses[step?.id]
    if (!response || response.count < 2 || response.last === step.answer) return state
    return { ...state, responses: { ...state.responses, [step.id]: { ...response, assisted: true } } }
  }

  function setWorkChecks(state, checks) {
    const step = steps[state.current]
    if (step?.type !== 'work' || !Array.isArray(checks)) return state
    // Een afgeronde stap blijft afgerond bij terugkijken.
    if (state.completed.includes(step.id)) return state
    const valid = [...new Set(checks.filter(index => Number.isInteger(index) && index >= 0 && index < step.checks.length))]
    return { ...state, workChecks: { ...state.workChecks, [step.id]: valid } }
  }

  function advance(state) {
    const step = steps[state.current]
    if (!step || !canAdvance(state, step)) return state
    const completed = state.completed.includes(step.id) ? state.completed : [...state.completed, step.id]
    return { ...state, completed, current: Math.min(state.current + 1, steps.length) }
  }

  function firstTrySummary(state, predicate) {
    const questions = steps.filter(step => step.type === 'quiz' && predicate(step))
    return {
      correct: questions.filter(step => state.responses[step.id]?.first === step.answer).length,
      total: questions.length,
      assisted: questions.filter(step => state.responses[step.id]?.assisted).length,
    }
  }
  return { STORAGE_KEY: storageKey, freshProgress, canAdvance, restoreProgress, loadProgress, saveProgress, answerQuestion, confirmHelp, setWorkChecks, advance, firstTrySummary }
}
