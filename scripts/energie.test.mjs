import test from 'node:test'
import assert from 'node:assert/strict'
import { steps, lesson } from '../src/energie/lesson.js'
import { advance, answerQuestion, canAdvance, confirmHelp, firstTrySummary, freshProgress, loadProgress, restoreProgress, saveProgress, STORAGE_KEY } from '../src/energie/progress.js'

const at = id => ({ ...freshProgress(), current: steps.findIndex(step => step.id === id) })

test('energie: lesdata heeft unieke ids, geldige vragen en concrete boekopdrachten', () => {
  assert.equal(new Set(steps.map(step => step.id)).size, steps.length)
  for (const step of steps) {
    assert.ok(step.title && step.source && step.section)
    assert.ok(['read', 'work', 'quiz'].includes(step.type))
    if (step.type === 'quiz') {
      assert.ok(Number.isInteger(step.answer) && step.answer >= 0 && step.answer < step.options.length)
      assert.ok(step.correct && step.hint)
      assert.equal(new Set(step.options).size, step.options.length)
    } else {
      assert.ok(step.instructions.length && step.next)
      if (step.type === 'work') assert.ok(step.checks.length)
    }
  }
  assert.deepEqual(steps.filter(step => step.exercise).map(step => [step.exercise, step.page]), [['2', 85], ['4', 86], ['1', 85]])
  assert.equal(steps.filter(step => step.diagnostic).length, 3)
  assert.equal(steps.filter(step => step.final).length, 3)
})

test('energie: onbeantwoorde controle blokkeert, fout antwoord behoudt eerste poging', () => {
  const step = steps.find(step => step.id === 'systeem-check')
  let state = at(step.id)
  assert.equal(canAdvance(state, step), false)
  assert.equal(advance(state), state)
  assert.equal(answerQuestion(state, step, -1), state)
  assert.equal(answerQuestion(state, step, '2'), state)
  assert.equal(answerQuestion(state, steps[1], 0), state)
  state = answerQuestion(state, step, 0)
  assert.equal(canAdvance(state, step), false)
  assert.equal(confirmHelp(state), state)
  state = answerQuestion(state, step, step.answer)
  assert.equal(canAdvance(state, step), true)
  assert.equal(state.responses[step.id].first, 0)
  assert.equal(state.responses[step.id].count, 2)
  assert.equal(answerQuestion(state, step, 0), state, 'juist antwoord gaat op slot')
})

test('energie: diagnostische fout geeft doorgang maar geen herkansing-score', () => {
  const step = steps.find(step => step.diagnostic)
  let state = at(step.id)
  state = answerQuestion(state, step, 0)
  assert.equal(canAdvance(state, step), true)
  assert.equal(answerQuestion(state, step, step.answer), state)
  assert.equal(firstTrySummary(state, item => item.diagnostic).correct, 0)
})

test('energie: na twee foute pogingen is expliciete hulpbevestiging mogelijk', () => {
  const step = steps.find(step => step.id === 'systeem-check')
  let state = at(step.id)
  state = answerQuestion(state, step, 0)
  state = answerQuestion(state, step, 1)
  assert.equal(canAdvance(state, step), false)
  state = confirmHelp(state)
  assert.equal(canAdvance(state, step), true)
  assert.equal(state.responses[step.id].assisted, true)
})

test('energie: hele route afronden, herbekijken en herstellen zonder dubbele stappen', () => {
  let state = freshProgress()
  for (const step of steps) {
    if (step.type === 'quiz') state = answerQuestion(state, step, step.answer)
    state = advance(state)
  }
  assert.equal(state.current, steps.length)
  assert.equal(state.completed.length, steps.length)
  assert.equal(advance(state), state)
  assert.deepEqual(restoreProgress(JSON.parse(JSON.stringify(state))), state)
  state = { ...state, current: steps.length - 1 }
  state = advance(state)
  assert.equal(state.completed.length, steps.length)
  assert.deepEqual(firstTrySummary(state, item => item.final), { correct: 3, total: 3, assisted: 0 })
})

test('energie: corrupte, oude en onvolledige opslag kan de route niet overslaan', () => {
  for (const value of [null, {}, [], 'tekst', { version: 'oud', current: 99 }]) {
    assert.deepEqual(restoreProgress(value), freshProgress())
  }
  const state = restoreProgress({ version: lesson.id, current: 500, completed: steps.map(step => step.id), responses: {} })
  assert.equal(state.completed.length, 1, 'stopt voor onbeantwoorde quiz')
  assert.equal(state.current, 1)
  const invalid = restoreProgress({ version: lesson.id, current: -9, responses: { [steps[1].id]: { first: -1, last: 400, count: 2 } } })
  assert.deepEqual(invalid, freshProgress())
  const gap = restoreProgress({ version: lesson.id, completed: [steps[0].id, steps[2].id] })
  assert.deepEqual(gap.completed, [steps[0].id])
})

test('energie: lokale opslag en foutafhandeling zonder browser', () => {
  const values = new Map()
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  assert.deepEqual(loadProgress(storage), { state: freshProgress(), available: true })
  const state = advance(freshProgress())
  assert.equal(saveProgress(storage, state), true)
  assert.deepEqual(loadProgress(storage).state, state)
  values.set(STORAGE_KEY, 'geen json')
  assert.equal(loadProgress(storage).available, false)
  assert.equal(saveProgress(undefined, state), false)
  assert.equal(loadProgress(undefined).available, false)
  const denied = { getItem() { throw new Error('denied') }, setItem() { throw new Error('quota') } }
  assert.equal(loadProgress(denied).available, false)
  assert.equal(saveProgress(denied, state), false)
})
