import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { lesson, steps } from '../src/celdeling/lesson.js'
import * as celdeling from '../src/celdeling/progress.js'
import * as bio from '../src/celmetabolisme/progress.js'
import * as energy from '../src/energie/progress.js'

const complete = (engine, routeSteps) => {
  let state = engine.freshProgress()
  for (const step of routeSteps) {
    if (step.type === 'quiz') state = engine.answerQuestion(state, step, step.answer)
    if (step.type === 'work') state = engine.setWorkChecks(state, step.checks.map((_, index) => index))
    state = engine.advance(state)
  }
  return state
}

test('celdeling: alle vijf vragen en deelopdrachten (1a–c, 2a–d, 3a–d, 4a–d, 5a–c) van de voorbeeldtoets zijn gedekt', () => {
  const expected = {
    '1': { page: 1, parts: ['a', 'b', 'c'] },
    '2': { page: 2, parts: ['a', 'b', 'c', 'd'] },
    '3': { page: 3, parts: ['a', 'b', 'c', 'd'] },
    '4': { page: 4, parts: ['a', 'b', 'c', 'd'] },
    '5': { page: 5, parts: ['a', 'b', 'c'] },
  }
  for (const [exercise, { page, parts }] of Object.entries(expected)) {
    const work = steps.filter(step => step.exercise === exercise)
    assert.equal(work.length, 1, `vraag ${exercise}`)
    assert.deepEqual(work[0].parts, parts)
    assert.equal(work[0].page, page)
    assert.equal(work[0].type, 'work')
    assert.equal(work[0].checks.length, parts.length)
    assert.ok(work[0].strategy?.length >= parts.length)
    assert.ok(work[0].support?.length >= 2)
  }
  assert.equal(new Set(steps.map(step => step.id)).size, steps.length)
  assert.equal(steps.filter(step => step.diagnostic).length, 1)
  assert.equal(steps.filter(step => step.final).length, 2)
  assert.equal(steps.filter(step => step.id.startsWith('boek-')).length, 5)
})

test('celdeling: elk inhoudsblok wijst eerst de weg in het leerboek, toont daarna de breedbeeld focus-simulatie en begeleidt de voorbeeldtoets', () => {
  assert.match(lesson.headerContext, /6SPOWE \/ 6MOWE/)
  assert.match(lesson.subtitle, /6SPOWE \/ 6MOWE/)
  assert.match(lesson.completion.nextTitle, /correctiesleutel/i)
  assert.match(lesson.completion.next.join(' '), /correctiesleutel/i)

  const activities = steps.filter(step => step.activity).map(step => step.activity)
  assert.deepEqual(activities, [
    'cycle-interphase',
    'mitosis-phases',
    'meiosis-divisions',
    'meiosis-variation',
    'cycle-damage',
  ])
  for (const simStep of steps.filter(step => step.activity)) {
    assert.equal(simStep.wide, true, `${simStep.id} gebruikt breedbeeld focus-modus`)
  }
  const bookIds = steps.filter(step => step.id.startsWith('boek-')).map(step => step.id)
  assert.deepEqual(bookIds, [
    'boek-celcyclus',
    'boek-mitose',
    'boek-meiose',
    'boek-variatie',
    'boek-controle',
  ])

  for (const step of steps) {
    assert.ok(step.title && step.section && step.source)
    if (step.type === 'quiz') {
      assert.ok(Number.isInteger(step.answer) && step.answer >= 0 && step.answer < step.options.length)
      assert.ok(step.correct && step.hint)
    } else {
      assert.ok(step.next && step.instructions.length)
    }
  }

  const wrapper = readFileSync(new URL('../src/celdeling/CeldelingLesson.vue', import.meta.url), 'utf8')
  assert.match(wrapper, /import GuidedPath/)
  assert.match(wrapper, /CycleSimulation/)
  assert.match(wrapper, /MitosisSimulation/)
  assert.match(wrapper, /MeiosisSimulation/)
  assert.match(wrapper, /focus-mode/)
  assert.doesNotMatch(wrapper, /celdeling-sim-embed/)
})

test('celdeling: voortgang is geïsoleerd van andere biologie- en fysicaleerpaden en vereist alle deelvinkjes per vraag', () => {
  assert.equal(celdeling.STORAGE_KEY, 'willebroek:celdeling:bio6-t4h2-oefentoets-v1')
  assert.notEqual(celdeling.STORAGE_KEY, bio.STORAGE_KEY)
  assert.notEqual(celdeling.STORAGE_KEY, energy.STORAGE_KEY)

  const workIndex = steps.findIndex(step => step.id === 'werk-vraag-3')
  let partial = { ...celdeling.freshProgress(), current: workIndex }
  assert.equal(celdeling.canAdvance(partial, steps[workIndex]), false)
  partial = celdeling.setWorkChecks(partial, [0, 1, 2])
  assert.equal(celdeling.canAdvance(partial, steps[workIndex]), false)
  partial = celdeling.setWorkChecks(partial, [0, 1, 2, 3])
  assert.equal(celdeling.canAdvance(partial, steps[workIndex]), true)

  const values = new Map()
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const fullState = complete(celdeling, steps)
  celdeling.saveProgress(storage, fullState)
  assert.equal(fullState.completed.length, steps.length)
  assert.deepEqual(celdeling.firstTrySummary(fullState, step => step.final), { correct: 2, total: 2, assisted: 0 })
  assert.deepEqual(celdeling.loadProgress(storage).state, fullState)
})
