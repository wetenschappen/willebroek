import test from 'node:test'
import assert from 'node:assert/strict'
import { curriculum, lesson, steps } from '../src/energie-basis/lesson.js'
import { advance, answerQuestion, canAdvance, confirmHelp, firstTrySummary, freshProgress, loadProgress, restoreProgress, saveProgress, setWorkChecks, STORAGE_KEY } from '../src/energie-basis/progress.js'
import { STORAGE_KEY as energyKey, freshProgress as freshEnergy, saveProgress as saveEnergy } from '../src/energie/progress.js'
import { STORAGE_KEY as biologyKey, freshProgress as freshBiology, saveProgress as saveBiology } from '../src/celmetabolisme/progress.js'

const at = id => ({ ...freshProgress(), current: steps.findIndex(step => step.id === id) })
const oldKey = 'willebroek:energie-basis:fys4-basis-t2-rekenen-v1'

test('energie basis v2: tien inhoudelijke schermen, acht boekopdrachten en twee controles', () => {
  assert.equal(new Set(steps.map(step => step.id)).size, steps.length)
  assert.equal(steps.length, 10)
  assert.equal(steps.filter(step => step.type === 'work').length, 8)
  assert.equal(steps.filter(step => step.type === 'quiz').length, 2)
  assert.equal(steps.filter(step => step.diagnostic).length, 0)
  for (const step of steps) {
    assert.ok(step.title && step.source && step.section)
    if (step.type === 'quiz') {
      assert.ok(Number.isInteger(step.answer) && step.answer >= 0 && step.answer < step.options.length)
      assert.ok(step.correct && step.hint && step.final)
      assert.equal(new Set(step.options).size, step.options.length)
    } else {
      assert.equal(step.type, 'work')
      assert.equal(step.completion, 'button')
      assert.equal(step.checks, undefined, 'geen afvinklijst achter de vervolgknop')
      assert.ok(step.instructions.length && step.strategy.length && step.support.length && step.next)
      assert.match(step.next, /gemaakt, verder/)
    }
  }
  assert.equal(steps[0].exercise, '5', 'rechtstreeks naar echt boekwerk, geen verplichte materiaalcheck')
})

test('energie basis v2: oefeningen 5–10 inclusief alle deelvragen en 6abc-eenhedencontrole', () => {
  assert.equal(curriculum.primaryGoal, 'BV2_06.45.01')
  assert.deepEqual(curriculum.completedBefore, ['1', '2', '3'])
  assert.deepEqual(curriculum.deferred, ['4'])
  assert.deepEqual(steps.filter(step => step.exercise).map(step => [step.exercise, step.page, step.parts]), [
    ['5', 77, ['kinetisch', 'gravitationeel', 'elastisch']],
    ['6', 77, ['a']], ['6', 77, ['b']], ['6', 77, ['c']],
    ['7', 78, ['lengteverandering']], ['8', 78, ['a', 'b']],
    ['9', 78, ['a', 'b']], ['10', 78, ['keuze', 'verklaring']],
  ])
  for (const id of ['oefening-6a', 'oefening-6b', 'oefening-6c']) {
    assert.match(steps.find(step => step.id === id).instructions.join(' '), /eenheid|eenheden/)
  }
  assert.match(steps.find(step => step.id === 'oefening-7').instructions.join(' '), /tekst als de tekening/)
  assert.doesNotMatch(JSON.stringify({ lesson, steps }), /p\. (?:79|85|86)|\\cos|\\arccos|W=|arbeid/i)
  assert.match(lesson.duration, /verder.*pauzeer/)
  assert.match(lesson.completion.next.join(' '), /vermogen en rendement/)
})

test('energie basis v2: hulp betreft oplossingsstrategie, niet elementaire wiskunde', () => {
  assert.match(steps.find(step => step.id === 'oefening-6b').strategy.join(' '), /vrij.*zonder getallen/)
  assert.match(steps.find(step => step.id === 'oefening-6c').support.join(' '), /\\sqrt/)
  assert.match(steps.find(step => step.id === 'oefening-7').strategy.join(' '), /6c/)
  assert.match(steps.find(step => step.id === 'oefening-8').strategy.join(' '), /gelijk blijven/)
  assert.match(steps.find(step => step.id === 'oefening-9').strategy.join(' '), /omzettingsketen/)
  assert.doesNotMatch(JSON.stringify(steps), /check-kwadraat|kwadrateren is|maal zichzelf|kleine cijfer 2/)
})

test('energie basis v2: oefening 10 heeft gelijke hellinglengte, NIET gelijke hoogte', () => {
  const step = steps.find(step => step.id === 'oefening-10')
  assert.match(step.strategy[0], /lengte van de helling/)
  assert.match(step.strategy[0], /verticale hoogteverschil/)
  assert.match(step.support.join(' '), /E_\{\\mathrm\{k,beneden\}\}=mgh/)
  assert.match(step.instructions.join(' '), /p\. 90/)
  assert.match(step.support.join(' '), /niet noodzakelijk hetzelfde hoogteverschil/)
})

test('energie basis v2: eigen opslag en nieuwe versie, v1 en andere routes blijven onaangeroerd', () => {
  assert.equal(new Set([STORAGE_KEY, oldKey, energyKey, biologyKey]).size, 4)
  const values = new Map([[oldKey, JSON.stringify({ version: 'fys4-basis-t2-rekenen-v1', current: 16, completed: ['oud'] })]])
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  saveEnergy(storage, freshEnergy())
  saveBiology(storage, freshBiology())
  const previous = new Map(values)
  assert.deepEqual(loadProgress(storage).state, freshProgress())
  const state = advance(freshProgress())
  assert.equal(saveProgress(storage, state), true)
  assert.deepEqual(loadProgress(storage).state, state)
  for (const [key, value] of previous) assert.equal(values.get(key), value)
  assert.deepEqual(restoreProgress(JSON.parse(values.get(oldKey))), freshProgress())
  assert.deepEqual(restoreProgress(freshEnergy()), freshProgress())
  assert.deepEqual(restoreProgress(freshBiology()), freshProgress())
  assert.equal(loadProgress(undefined).available, false)
  assert.equal(saveProgress(undefined, state), false)
})

test('energie basis v2: Gemaakt-knop bevestigt boekwerk zonder vinkjes, herstel en terugkijken', () => {
  let state = freshProgress()
  for (const step of steps) {
    if (step.type === 'quiz') {
      assert.equal(canAdvance(state, step), false)
      assert.equal(advance(state), state)
      state = answerQuestion(state, step, step.answer)
    } else {
      assert.equal(canAdvance(state, step), true)
      assert.equal(state.completed.includes(step.id), false, 'openen is niet afronden')
      assert.equal(setWorkChecks(state, [0]), state, 'button-mode heeft geen schijnvinkjes')
      assert.deepEqual(restoreProgress(JSON.parse(JSON.stringify(state))), state)
    }
    state = advance(state)
    assert.equal(state.completed.includes(step.id), true)
  }
  assert.equal(state.completed.length, steps.length)
  assert.equal(state.current, steps.length)
  assert.deepEqual(state.workChecks, {})
  assert.deepEqual(restoreProgress(JSON.parse(JSON.stringify(state))), state)
  assert.deepEqual(firstTrySummary(state, step => step.final), { correct: 2, total: 2, assisted: 0 })
  const revisit = { ...state, current: 0 }
  assert.equal(advance(revisit).completed.length, steps.length)
})

test('energie basis v2: retry en expliciete hulp bewaren de eerste poging eerlijk', () => {
  const step = steps.find(step => step.id === 'check-strategie')
  let state = at(step.id)
  state = answerQuestion(state, step, 0)
  assert.equal(canAdvance(state, step), false)
  assert.equal(confirmHelp(state), state)
  state = answerQuestion(state, step, 0)
  state = confirmHelp(state)
  assert.equal(canAdvance(state, step), true)
  assert.equal(state.responses[step.id].first, 0)
  assert.equal(state.responses[step.id].assisted, true)
  assert.equal(answerQuestion(state, step, step.answer), state)
  assert.deepEqual(firstTrySummary(state, item => item.id === step.id), { correct: 0, total: 1, assisted: 1 })
})

test('energie basis v2: corrupte of vooruitspringende opslag slaat digitale controles niet over', () => {
  for (const value of [null, {}, [], { version: 'oud' }]) assert.deepEqual(restoreProgress(value), freshProgress())
  const state = restoreProgress({ version: lesson.id, current: 999, completed: steps.map(step => step.id) })
  const firstQuiz = steps.findIndex(step => step.type === 'quiz')
  assert.equal(state.current, firstQuiz)
  assert.deepEqual(state.completed, steps.slice(0, firstQuiz).map(step => step.id))
})
