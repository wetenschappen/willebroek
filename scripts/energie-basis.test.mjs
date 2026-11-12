import test from 'node:test'
import assert from 'node:assert/strict'
import { curriculum, lesson, steps } from '../src/energie-basis/lesson.js'
import { advance, answerQuestion, canAdvance, confirmHelp, firstTrySummary, freshProgress, loadProgress, restoreProgress, saveProgress, setWorkChecks, STORAGE_KEY } from '../src/energie-basis/progress.js'
import { STORAGE_KEY as energyKey, freshProgress as freshEnergy, saveProgress as saveEnergy } from '../src/energie/progress.js'
import { STORAGE_KEY as biologyKey, freshProgress as freshBiology, saveProgress as saveBiology } from '../src/celmetabolisme/progress.js'

const at = id => ({ ...freshProgress(), current: steps.findIndex(step => step.id === id) })

test('energie basis: unieke ids, geldige vragen en concrete boekopdrachten', () => {
  assert.equal(new Set(steps.map(step => step.id)).size, steps.length)
  assert.equal(steps.length, 16)
  for (const step of steps) {
    assert.ok(step.title && step.source && step.section)
    assert.ok(['read', 'work', 'quiz'].includes(step.type))
    if (step.type === 'quiz') {
      assert.ok(Number.isInteger(step.answer) && step.answer >= 0 && step.answer < step.options.length)
      assert.ok(step.correct && step.hint)
      assert.equal(new Set(step.options).size, step.options.length)
    } else {
      assert.ok(step.instructions.length && step.next)
      if (step.type === 'work') assert.ok(step.checks.length && step.support.length)
    }
  }
  assert.equal(steps.filter(step => step.diagnostic).length, 2)
  assert.equal(steps.filter(step => step.final).length, 3)
  assert.equal(steps.filter(step => step.type === 'quiz' && !step.diagnostic && !step.final).length, 2)
})

test('energie basis: afgebakende dekking 5 en 6a, juiste 1u-paginering', () => {
  assert.equal(curriculum.primaryGoal, 'BV2_06.45.01')
  assert.deepEqual(curriculum.completedBefore, ['1', '2', '3'])
  assert.deepEqual(steps.filter(step => step.exercise).map(step => [step.exercise, step.page, step.parts]), [
    ['5', 77, ['kinetisch-voorbereiden']], ['5', 77, ['kinetisch-uitwerken']],
    ['5', 77, ['gravitationeel']], ['5', 77, ['elastisch']], ['6', 77, ['a']],
  ])
  assert.ok(steps.find(step => step.id === 'oefening-6a').checks.some(text => text.includes('eenhedencontrole')))
  assert.doesNotMatch(JSON.stringify({ lesson, steps }), /p\. (?:79|85|86)|\\cos|\\arccos|W=|arbeid/i)
  assert.ok(lesson.completion.next.some(text => text.includes('resterende oefeningen')))
})

test('energie basis: eerste berekening wordt voorbereid en steun neemt af richting 6a', () => {
  const plan = steps.findIndex(step => step.id === 'oefening-5-beweging-plan')
  const square = steps.findIndex(step => step.id === 'check-kwadraat')
  const solve = steps.findIndex(step => step.id === 'oefening-5-beweging-rekenen')
  assert.ok(plan < square && square < solve)
  const independent = steps.find(step => step.id === 'oefening-6a')
  assert.doesNotMatch(independent.instructions.join(' '), /E_|\\frac/)
  assert.ok(independent.support.length)
})

test('energie basis: eigen opslag, geen vermenging met de twee bestaande routes', () => {
  assert.equal(new Set([STORAGE_KEY, energyKey, biologyKey]).size, 3)
  const values = new Map()
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  saveEnergy(storage, freshEnergy())
  saveBiology(storage, freshBiology())
  const previous = new Map(values)
  assert.deepEqual(loadProgress(storage).state, freshProgress())
  const state = advance(freshProgress())
  assert.equal(saveProgress(storage, state), true)
  assert.deepEqual(loadProgress(storage).state, state)
  for (const [key, value] of previous) assert.equal(values.get(key), value)
  assert.deepEqual(restoreProgress(freshEnergy()), freshProgress())
  assert.deepEqual(restoreProgress(freshBiology()), freshProgress())
  assert.equal(loadProgress(undefined).available, false)
})

test('energie basis: hele route, gedeeltelijke vinkjes hervatten en voltooid werk op slot', () => {
  let state = freshProgress()
  for (const step of steps) {
    if (step.type === 'quiz') state = answerQuestion(state, step, step.answer)
    if (step.type === 'work') {
      assert.equal(canAdvance(state, step), false)
      assert.equal(advance(state), state)
      state = setWorkChecks(state, [0])
      assert.equal(canAdvance(state, step), false)
      const resumed = restoreProgress(JSON.parse(JSON.stringify(state)))
      assert.deepEqual(resumed, state)
      state = setWorkChecks(state, step.checks.map((_, index) => index))
    }
    assert.equal(canAdvance(state, step), true)
    state = advance(state)
  }
  assert.equal(state.completed.length, steps.length)
  assert.equal(state.current, steps.length)
  assert.deepEqual(restoreProgress(JSON.parse(JSON.stringify(state))), state)
  assert.deepEqual(firstTrySummary(state, step => step.final), { correct: 3, total: 3, assisted: 0 })
  const visited = { ...state, current: steps.findIndex(step => step.type === 'work') }
  assert.equal(setWorkChecks(visited, []), visited)
  assert.equal(advance({ ...state, current: steps.length - 1 }).completed.length, steps.length)
})

test('energie basis: retry en expliciete hulp bewaren de eerste poging eerlijk', () => {
  const step = steps.find(step => step.id === 'eindcheck-rekenen')
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

test('energie basis: corrupte of vooruitspringende opslag slaat controles niet over', () => {
  for (const value of [null, {}, [], { version: 'oud' }]) assert.deepEqual(restoreProgress(value), freshProgress())
  const state = restoreProgress({ version: lesson.id, current: 999, completed: steps.map(step => step.id) })
  assert.equal(state.current, 1)
  assert.deepEqual(state.completed, [steps[0].id])
})
