import test from 'node:test'
import assert from 'node:assert/strict'
import { lesson, steps } from '../src/celmetabolisme/lesson.js'
import * as bio from '../src/celmetabolisme/progress.js'
import * as energy from '../src/energie/progress.js'
import { lesson as energyLesson, steps as energySteps } from '../src/energie/lesson.js'

const complete = (engine, steps) => {
  let state = engine.freshProgress()
  for (const step of steps) {
    if (step.type === 'quiz') state = engine.answerQuestion(state, step, step.answer)
    if (step.type === 'work') state = engine.setWorkChecks(state, step.checks.map((_, index) => index))
    state = engine.advance(state)
  }
  return state
}

test('celmetabolisme: alle acht oefeningen, deelopdrachten en juist/fout krijgen een plek', () => {
  const expected = {
    '1': ['complex', 'reactietype-en-verklaring'],
    '2': ['optimum', 'lichaamstemperatuur', 'oververhitting'],
    '3': ['maag', 'mond'],
    '4': ['proefbuis', 'verklaring', 'reactieproduct'],
    '5': ['vlekken', 'wasprogramma'],
    '6': ['maagwand', 'pepsine-reactietype', 'amylase-maag'],
    '7': ['naam-ascorbinezuur'],
    '8': ['fruitsap-verklaring'],
    'juist-fout': ['a', 'b', 'c'],
  }
  for (const [exercise, parts] of Object.entries(expected)) {
    const work = steps.filter(step => step.exercise === exercise)
    assert.ok(work.length, `oefening ${exercise}`)
    assert.deepEqual(work.flatMap(step => step.parts), parts)
    assert.ok(work.every(step => step.page === (['1', '2', 'juist-fout'].includes(exercise) ? 77 : 78)))
    assert.ok(work.every(step => step.type === 'work' && step.checks.length && step.instructions.length))
  }
  assert.equal(new Set(steps.map(step => step.id)).size, steps.length)
  assert.equal(steps.filter(step => step.diagnostic).length, 2)
  assert.equal(steps.filter(step => step.final).length, 3)
})

test('celmetabolisme: opdrachten verwijzen naar het boek, quizzen zijn oplosbaar en links zijn veilige externe bron/zoeklinks', () => {
  assert.match(lesson.headerContext, /5SPOWE \/ 5MOWE/)
  assert.ok(lesson.completion.work && lesson.reference && lesson.homeDescription)
  for (const step of steps) {
    assert.ok(step.title && step.section && step.source)
    if (step.type === 'quiz') {
      assert.ok(Number.isInteger(step.answer) && step.answer >= 0 && step.answer < step.options.length)
      assert.ok(step.correct && step.hint)
      assert.match(step.source, /p\. 7[1-7]/)
    } else assert.ok(step.next && step.instructions.length)
    for (const link of step.links ?? []) {
      const url = new URL(link.url)
      assert.equal(url.protocol, 'https:')
      assert.ok(['www.google.com', 'www.voedingscentrum.nl'].includes(url.hostname))
      assert.ok(link.label)
    }
  }
  for (const id of ['oefening-6-onderzoek', 'oefening-8']) {
    const step = steps.find(step => step.id === id)
    assert.ok(step.links.length)
    assert.match(step.instructions.join(' '), /bron/)
  }
})

test('gedeelde route: deelvinkjes blokkeren onvolledig boekwerk en blijven na herladen bewaard', () => {
  const index = steps.findIndex(step => step.id === 'oefening-2')
  let state = { ...bio.freshProgress(), current: index }
  const step = steps[index]
  assert.equal(bio.canAdvance(state, step), false)
  assert.equal(bio.advance(state), state)
  state = bio.setWorkChecks(state, [0, 0, -1, 100, '2'])
  assert.deepEqual(state.workChecks[step.id], [0])
  assert.equal(bio.canAdvance(state, step), false)
  // Geldig herstelpunt uit een echte doorlopen route.
  let before = bio.freshProgress()
  while (before.current < index) {
    const previous = steps[before.current]
    if (previous.type === 'quiz') before = bio.answerQuestion(before, previous, previous.answer)
    if (previous.type === 'work') before = bio.setWorkChecks(before, previous.checks.map((_, i) => i))
    before = bio.advance(before)
  }
  before = bio.setWorkChecks(before, [0])
  const restored = bio.restoreProgress(JSON.parse(JSON.stringify(before)))
  assert.equal(restored.current, index)
  assert.deepEqual(restored.workChecks[step.id], [0])
  state = bio.setWorkChecks(restored, [0, 1, 2])
  state = bio.advance(state)
  assert.equal(state.current, index + 1)
  const revisited = { ...state, current: index }
  assert.equal(bio.setWorkChecks(revisited, []), revisited, 'afgerond boekwerk gaat op slot bij terugkijken')
})

test('gedeelde route: energievoortgang van de gebruikte eerste versie migreert zonder verlies', () => {
  const modern = complete(energy, energySteps)
  const legacy = JSON.parse(JSON.stringify(modern))
  delete legacy.workChecks
  assert.equal(legacy.version, energyLesson.id)
  assert.deepEqual(energy.restoreProgress(legacy), modern)
  assert.equal(energy.STORAGE_KEY, 'willebroek:energie:t2-energie-start-v1')
})

test('gedeelde route: twee lessen schrijven en herstellen hun eigen opslag, reset wist de andere niet', () => {
  assert.notEqual(bio.STORAGE_KEY, energy.STORAGE_KEY)
  const values = new Map()
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const energyState = complete(energy, energySteps)
  const bioState = complete(bio, steps)
  energy.saveProgress(storage, energyState)
  bio.saveProgress(storage, bioState)
  assert.deepEqual(energy.loadProgress(storage).state, energyState)
  assert.deepEqual(bio.loadProgress(storage).state, bioState)
  assert.equal(bioState.completed.length, steps.length)
  assert.deepEqual(bio.firstTrySummary(bioState, step => step.final), { correct: 3, total: 3, assisted: 0 })
  bio.saveProgress(storage, bio.freshProgress())
  assert.deepEqual(energy.loadProgress(storage).state, energyState)
  assert.deepEqual(bio.restoreProgress(energyState), bio.freshProgress())
})

test('gedeelde route: fout, herkansing en hulp poetsen de eerste-pogingsscore niet op', () => {
  const index = steps.findIndex(step => step.final)
  const step = steps[index]
  let state = { ...bio.freshProgress(), current: index }
  state = bio.answerQuestion(state, step, (step.answer + 1) % step.options.length)
  assert.equal(bio.advance(state), state)
  assert.equal(bio.confirmHelp(state), state)
  state = bio.answerQuestion(state, step, (step.answer + 2) % step.options.length)
  state = bio.confirmHelp(state)
  assert.equal(bio.canAdvance(state, step), true)
  const result = bio.firstTrySummary(state, question => question.final)
  assert.equal(result.correct, 0)
  assert.equal(result.assisted, 1)
})
