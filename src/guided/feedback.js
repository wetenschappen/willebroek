// Een inhoudelijke reactie op de gekozen misvatting, zonder nieuwe scorelogica.
// Bestaande lessen blijven hun algemene hint gebruiken.
export function questionFeedback(step, response) {
  if (!step || !response) return ''
  if (response.last === step.answer) return step.correct
  return step.feedbackByOption?.[response.last] || step.hint
}
