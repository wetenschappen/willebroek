import test from 'node:test'
import assert from 'node:assert/strict'
import { lesson, steps, STORAGE_KEY } from '../src/energie-basis/kinetic-pilot.js'
import { createProgressSystem } from '../src/guided/progress.js'
import { questionFeedback } from '../src/guided/feedback.js'
import { lesson as basic, steps as basicSteps } from '../src/energie-basis/lesson.js'
import { STORAGE_KEY as basicKey } from '../src/energie-basis/progress.js'
import { steps as energySteps, lesson as energy } from '../src/energie/lesson.js'
import { STORAGE_KEY as energyKey } from '../src/energie/progress.js'
import { steps as biologySteps, lesson as biology } from '../src/celmetabolisme/lesson.js'
import { STORAGE_KEY as biologyKey } from '../src/celmetabolisme/progress.js'

const progress = createProgressSystem(lesson, steps, STORAGE_KEY)
const { freshProgress, canAdvance, advance, answerQuestion, confirmHelp, restoreProgress, firstTrySummary, loadProgress, saveProgress } = progress

test('kinetisch proefblok: onderzoeken → begrip met feedback → boekwerk → transfer', () => {
  assert.equal(new Set(steps.map(step => step.id)).size, 4)
  assert.deepEqual(steps.map(step => step.type), ['read', 'quiz', 'work', 'quiz'])
  for (const step of steps) {
    assert.ok(step.title && step.source && step.section && step.next)
    if (step.type === 'quiz') {
      assert.ok(step.correct && step.hint)
      assert.equal(step.feedbackByOption.length, step.options.length)
      assert.ok(step.answer >= 0 && step.answer < step.options.length)
      step.feedbackByOption.forEach((text, index) => {
        if (index !== step.answer) assert.ok(text)
      })
      assert.equal(step.diagnostic, undefined, 'onderwijsvragen, geen herinneringstoets')
    } else assert.ok(step.instructions.length)
  }
  assert.match(steps[0].instructions.join(' '), /systeem/)
  assert.match(steps[0].source, /p\. 72.*p\. 73/)
  assert.match(steps[1].correct, /totale massa/)
  assert.match(steps[1].correct, /dezelfde snelheid/)
  assert.match(steps[3].question, /massa.*even snel/)
  assert.match(steps[3].correct, /verklaren zonder/)
  assert.doesNotMatch(JSON.stringify(steps), /kwadrateren is|maal zichzelf|check-kwadraat/)
})

test('kinetisch proefblok: alleen eerste bullet van 5, geen volledige 5–10-dekking claimen', () => {
  assert.deepEqual(steps.filter(step => step.exercise).map(step => [step.exercise, step.page, step.parts]), [['5', 77, ['kinetisch']]])
  assert.equal(steps[2].completion, 'button')
  assert.equal(steps[2].checks, undefined)
  assert.match(lesson.duration, /niet de volledige route/)
  assert.match(lesson.completion.work, /alleen de eerste berekening/)
  assert.match(lesson.completion.next[0], /nog niet gemaakt/)
  assert.doesNotMatch(JSON.stringify(steps), /p\. (?:80|85|86)/)
})

test('feedback: elke gekozen misvatting krijgt eigen inhoud, niet alleen een verborgen hint', () => {
  const quiz = steps[1]
  const renner = questionFeedback(quiz, { last: 0 })
  const fiets = questionFeedback(quiz, { last: 1 })
  assert.notEqual(renner, fiets)
  assert.notEqual(renner, quiz.hint)
  assert.match(renner, /alleen zijn kinetische energie/)
  assert.match(fiets, /renner buiten beschouwing/)
  assert.equal(questionFeedback(quiz, { last: quiz.answer }), quiz.correct)
  assert.equal(questionFeedback(undefined, undefined), '')
  assert.equal(questionFeedback(quiz, undefined), '')
  assert.equal(questionFeedback({ ...quiz, feedbackByOption: [null, null, null] }, { last: 0 }), quiz.hint)
})

test('feedback: alle bestaande vragen behouden hun algemene hint en juiste uitleg', () => {
  for (const step of [...basicSteps, ...energySteps, ...biologySteps].filter(step => step.type === 'quiz')) {
    for (let last = 0; last < step.options.length; last++) {
      assert.equal(questionFeedback(step, { last }), last === step.answer ? step.correct : step.hint)
    }
  }
})

test('kinetisch proefblok: retry, feedback en slot gebruiken eerlijke eerste pogingen', () => {
  const quiz = steps[1]
  let state = advance(freshProgress())
  assert.equal(canAdvance(state, quiz), false)
  assert.equal(advance(state), state)
  state = answerQuestion(state, quiz, 0)
  assert.equal(canAdvance(state, quiz), false)
  assert.equal(questionFeedback(quiz, state.responses[quiz.id]), quiz.feedbackByOption[0])
  state = answerQuestion(state, quiz, 1)
  assert.equal(questionFeedback(quiz, state.responses[quiz.id]), quiz.feedbackByOption[1])
  state = answerQuestion(state, quiz, quiz.answer)
  assert.equal(state.responses[quiz.id].first, 0)
  assert.equal(state.responses[quiz.id].count, 3)
  assert.equal(answerQuestion(state, quiz, 0), state)
  state = advance(state)
  assert.equal(state.completed.includes(steps[2].id), false, 'open boekwerk niet automatisch klaar')
  state = advance(state)
  state = answerQuestion(state, steps[3], steps[3].answer)
  state = advance(state)
  assert.equal(state.current, steps.length)
  assert.deepEqual(state.workChecks, {})
  assert.deepEqual(firstTrySummary(state, item => item.final), { correct: 1, total: 2, assisted: 0 })
  assert.deepEqual(restoreProgress(JSON.parse(JSON.stringify(state))), state)
  assert.equal(advance({ ...state, current: 2 }).completed.length, 4)
})

test('kinetisch proefblok: de expliciete hulproute blijft mogelijk na twee fouten', () => {
  const quiz = steps[1]
  let state = advance(freshProgress())
  state = answerQuestion(state, quiz, 0)
  assert.equal(confirmHelp(state), state)
  state = answerQuestion(state, quiz, 1)
  state = confirmHelp(state)
  assert.equal(canAdvance(state, quiz), true)
  assert.equal(state.responses[quiz.id].assisted, true)
  assert.equal(state.responses[quiz.id].first, 0)
  assert.equal(questionFeedback(quiz, state.responses[quiz.id]), quiz.feedbackByOption[1])
})

test('kinetisch proefblok: opslag, hervatten en reset zijn volledig los van 5–10 en de andere routes', () => {
  assert.equal(new Set([STORAGE_KEY, basicKey, energyKey, biologyKey]).size, 4)
  const values = new Map()
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  for (const [key, config] of [[basicKey, basic], [energyKey, energy], [biologyKey, biology]]) values.set(key, JSON.stringify({ version: config.id, current: 1 }))
  const originals = new Map(values)
  assert.deepEqual(loadProgress(storage).state, freshProgress())
  const state = advance(freshProgress())
  saveProgress(storage, state)
  assert.deepEqual(loadProgress(storage).state, state)
  saveProgress(storage, freshProgress())
  for (const [key, value] of originals) assert.equal(values.get(key), value)
  for (const value of [null, {}, { version: basic.id }, { version: energy.id }]) assert.deepEqual(restoreProgress(value), freshProgress())
  const tampered = restoreProgress({ version: lesson.id, current: 99, completed: steps.map(step => step.id) })
  assert.equal(tampered.current, 1, 'onbeantwoorde begripsvraag niet overslaan')
  assert.equal(loadProgress(undefined).available, false)
  assert.equal(saveProgress(undefined, state), false)
})
