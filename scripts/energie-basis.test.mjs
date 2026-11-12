import test from 'node:test'
import assert from 'node:assert/strict'
import { curriculum, lesson, steps } from '../src/energie-basis/lesson.js'
import { steps as approved, STORAGE_KEY as pilotKey } from '../src/energie-basis/kinetic-pilot.js'
import { questionFeedback } from '../src/guided/feedback.js'
import { advance, answerQuestion, canAdvance, confirmHelp, firstTrySummary, freshProgress, loadProgress, restoreProgress, saveProgress, setWorkChecks, STORAGE_KEY } from '../src/energie-basis/progress.js'
import { STORAGE_KEY as energyKey, freshProgress as freshEnergy, saveProgress as saveEnergy } from '../src/energie/progress.js'
import { STORAGE_KEY as biologyKey, freshProgress as freshBiology, saveProgress as saveBiology } from '../src/celmetabolisme/progress.js'

const at = id => ({ ...freshProgress(), current: steps.findIndex(step => step.id === id) })
const oldKeys = ['willebroek:energie-basis:fys4-basis-t2-rekenen-v1', 'willebroek:energie-basis:fys4-basis-t2-oefenen-v2']

test('energie basis v3: goedgekeurd kinetisch proefblok vormt de start, geen nieuwe materiaalcheck', () => {
  assert.deepEqual(steps.slice(0, 3), approved.slice(0, 3))
  assert.deepEqual({ ...steps[3], next: approved[3].next }, approved[3])
  assert.match(steps[3].next, /hoogte/)
  assert.equal(steps[0].type, 'read')
  assert.equal(steps[0].id, 'kinetisch-boekonderzoek')
  assert.equal(new Set(steps.map(step => step.id)).size, steps.length)
  assert.equal(steps.length, 26)
  assert.equal(steps.filter(step => step.type === 'read').length, 7)
  assert.equal(steps.filter(step => step.type === 'work').length, 10)
  assert.equal(steps.filter(step => step.type === 'quiz').length, 9)
  assert.match(lesson.duration, /50 minuten/)
  assert.match(lesson.duration, /pauzeer en hervat/)
  assert.equal(steps.filter(step => step.diagnostic).length, 0)
})

test('energie basis v3: zichtbare kerninstructie en specifieke feedback, optionele aanvullende hulp', () => {
  for (const step of steps) {
    assert.ok(step.title && step.source && step.section && step.next)
    if (step.type === 'quiz') {
      assert.ok(Number.isInteger(step.answer) && step.answer >= 0 && step.answer < step.options.length)
      assert.equal(new Set(step.options).size, step.options.length)
      assert.ok(step.correct && step.hint && step.final)
      assert.equal(step.feedbackByOption.length, step.options.length)
      for (let index = 0; index < step.options.length; index++) {
        const explanation = index === step.answer ? step.correct : step.feedbackByOption[index]
        assert.ok(explanation && explanation.length > 80, `${step.id}: inhoudelijke uitleg bij ${index}`)
        assert.equal(questionFeedback(step, { last: index }), explanation)
      }
    } else {
      assert.ok(step.instructions.length >= 2, 'kernopdracht staat buiten optionele hulp')
      if (step.type === 'work') {
        assert.equal(step.completion, 'button')
        assert.equal(step.checks, undefined, 'geen afvinklijst achter de vervolgknop')
        assert.ok(step.support.length)
        assert.match(step.next, /gemaakt, verder/)
      } else assert.equal(step.type, 'read')
    }
  }
  // Nieuwe fysische modellen starten met brononderzoek en begripsfeedback vóór toepassing.
  for (const [read, quiz, work] of [
    ['hoogte-onderzoek', 'hoogte-check', 'oefening-5-appel'],
    ['veer-onderzoek', 'veer-check', 'oefening-5-veer'],
    ['onbekende-onderzoek', 'onbekende-check', 'oefening-6a'],
    ['verbanden-onderzoek', 'verbanden-check', 'oefening-8'],
    ['remmen-onderzoek', 'remmen-check', 'oefening-9'],
    ['behoud-onderzoek', 'behoud-check', 'oefening-10'],
  ]) {
    const index = steps.findIndex(step => step.id === read)
    assert.deepEqual(steps.slice(index, index + 3).map(step => step.id), [read, quiz, work])
    assert.deepEqual(steps.slice(index, index + 3).map(step => step.type), ['read', 'quiz', 'work'])
  }
})

test('energie basis v3: oefeningen 5–10 volledig, alle deelvragen en 6abc-eenhedencontrole', () => {
  assert.equal(curriculum.primaryGoal, 'BV2_06.45.01')
  assert.deepEqual(curriculum.completedBefore, ['1', '2', '3'])
  assert.deepEqual(curriculum.deferred, ['4'])
  assert.deepEqual(steps.filter(step => step.exercise).map(step => [step.exercise, step.page, step.parts]), [
    ['5', 77, ['kinetisch']], ['5', 77, ['gravitationeel']], ['5', 77, ['elastisch']],
    ['6', 77, ['a']], ['6', 77, ['b']], ['6', 77, ['c']],
    ['7', 78, ['lengteverandering']], ['8', 78, ['a', 'b']],
    ['9', 78, ['a', 'b']], ['10', 78, ['keuze', 'verklaring']],
  ])
  assert.equal(steps.filter(step => step.exercise && Number(step.exercise) <= 7).length, 7, 'zeven berekeningen')
  for (const id of ['oefening-6a', 'oefening-6b', 'oefening-6c']) assert.match(steps.find(step => step.id === id).instructions.join(' '), /eenheid|eenheden/)
  assert.match(steps.find(step => step.id === 'oefening-7').instructions.join(' '), /tekst als de tekening/)
  assert.match(steps.find(step => step.id === 'oefening-8').instructions.join(' '), /verklaring/)
  assert.match(steps.find(step => step.id === 'oefening-9').instructions.join(' '), /9a en 9b.*omzettingsketen/)
  assert.match(lesson.completion.work, /6a–c met eenhedencontrole.*8a–b, 9a–b en 10 met verklaring/)
  assert.doesNotMatch(JSON.stringify({ lesson, steps }), /p\. (?:79|85|86)|\\cos|\\arccos|W=|arbeid/i)
  assert.match(lesson.completion.next.join(' '), /vermogen en rendement/)
})

test('energie basis v3: begeleiding leert fysische modelkeuzes en verbanden, geen elementaire rekenles', () => {
  const byId = id => steps.find(step => step.id === id)
  assert.match(byId('hoogte-check').correct, /afgelegde weg staat er niet/)
  assert.match(byId('veer-onderzoek').instructions.join(' '), /niet om de totale lengte/)
  assert.match(byId('veer-check').correct, /ook zonder beweging/)
  assert.match(byId('onbekende-check').correct, /ongeacht welke daarvan gevraagd/)
  assert.match(byId('oefening-6b').instructions.join(' '), /vrij zonder getallen/)
  assert.match(byId('oefening-6c').support.join(' '), /\\sqrt/)
  assert.match(byId('oefening-7').instructions.join(' '), /6c.*fysische model is anders/)
  assert.match(byId('oefening-8').instructions.join(' '), /gelijk blijft/)
  assert.match(byId('remmen-check').correct, /elektrisch overgedragen.*chemisch opgeslagen/)
  assert.match(byId('remmen-onderzoek').source, /p\. 70/)
  assert.match(byId('behoud-check').correct, /som gelijk/)
  assert.doesNotMatch(JSON.stringify(steps), /check-kwadraat|kwadrateren is|maal zichzelf|kleine cijfer 2/)
})

test('energie basis v3: oefening 10 vergelijkt verticale hoogte bij GELIJKE hellinglengte', () => {
  const step = steps.find(step => step.id === 'oefening-10')
  assert.match(step.instructions.join(' '), /lengte van de helling is telkens gelijk/)
  assert.match(step.instructions.join(' '), /verticale hoogteverschil/)
  assert.match(step.instructions.join(' '), /vanuit rust.*wrijving.*verwaarloosbaar/)
  assert.match(step.support.join(' '), /E_\{\\mathrm\{k,beneden\}\}=mgh/)
  assert.match(step.support.join(' '), /niet noodzakelijk hetzelfde hoogteverschil/)
  assert.match(steps.at(-1).correct, /thermische energie.*verdwijnt niet/)
})

test('energie basis v3: eigen versie, v1/v2/proefblok en andere routes blijven bewaard bij hervatten en reset', () => {
  assert.equal(STORAGE_KEY, 'willebroek:energie-basis:fys4-basis-t2-begeleid-v3')
  assert.equal(new Set([STORAGE_KEY, ...oldKeys, pilotKey, energyKey, biologyKey]).size, 6)
  const values = new Map(oldKeys.map((key, index) => [key, JSON.stringify({ version: index === 0 ? 'fys4-basis-t2-rekenen-v1' : 'fys4-basis-t2-oefenen-v2', current: 16, completed: ['oud'] })]))
  values.set(pilotKey, JSON.stringify({ version: 'fys4-basis-kinetisch-proefblok-v1', current: 4 }))
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  saveEnergy(storage, freshEnergy()); saveBiology(storage, freshBiology())
  const previous = new Map(values)
  assert.deepEqual(loadProgress(storage).state, freshProgress())
  let state = advance(freshProgress())
  state = answerQuestion(state, steps[1], 0)
  assert.equal(saveProgress(storage, state), true)
  assert.deepEqual(loadProgress(storage).state, state)
  saveProgress(storage, freshProgress())
  for (const [key, value] of previous) {
    assert.equal(values.get(key), value)
    assert.deepEqual(restoreProgress(JSON.parse(value)), freshProgress())
  }
  assert.equal(loadProgress(undefined).available, false)
  assert.equal(saveProgress(undefined, state), false)
})

test('energie basis v3: volledige route, boekknop is zelfrapportage, herstel en terugkijken zonder dubbele stappen', () => {
  let state = freshProgress()
  for (const step of steps) {
    if (step.type === 'quiz') {
      assert.equal(canAdvance(state, step), false)
      assert.equal(advance(state), state)
      state = answerQuestion(state, step, step.answer)
    } else {
      assert.equal(canAdvance(state, step), true)
      assert.equal(state.completed.includes(step.id), false, 'openen is niet afronden')
      assert.equal(setWorkChecks(state, [0]), state)
    }
    assert.deepEqual(restoreProgress(JSON.parse(JSON.stringify(state))), state)
    state = advance(state)
    assert.equal(state.completed.includes(step.id), true)
  }
  assert.equal(state.completed.length, steps.length)
  assert.equal(state.current, steps.length)
  assert.deepEqual(state.workChecks, {})
  assert.deepEqual(restoreProgress(JSON.parse(JSON.stringify(state))), state)
  assert.deepEqual(firstTrySummary(state, step => step.final), { correct: 9, total: 9, assisted: 0 })
  assert.equal(advance({ ...state, current: 0 }).completed.length, steps.length)
})

test('energie basis v3: alle negen begripsvragen blokkeren bij fouten en behouden de eerste poging', () => {
  for (const step of steps.filter(step => step.type === 'quiz')) {
    const wrong = (step.answer + 1) % step.options.length
    let state = at(step.id)
    assert.equal(answerQuestion(state, step, -1), state)
    state = answerQuestion(state, step, wrong)
    assert.equal(canAdvance(state, step), false)
    assert.equal(confirmHelp(state), state)
    state = answerQuestion(state, step, step.answer)
    assert.equal(state.responses[step.id].first, wrong)
    assert.equal(canAdvance(state, step), true)
    assert.equal(answerQuestion(state, step, wrong), state)
  }
})

test('energie basis v3: expliciete hulp na twee fouten en corrupte opslag slaan begrip niet zomaar over', () => {
  const step = steps[1]
  let state = at(step.id)
  state = answerQuestion(state, step, 0)
  assert.equal(confirmHelp(state), state)
  state = answerQuestion(state, step, 1)
  state = confirmHelp(state)
  assert.equal(canAdvance(state, step), true)
  assert.equal(state.responses[step.id].first, 0)
  assert.equal(state.responses[step.id].assisted, true)
  assert.equal(answerQuestion(state, step, step.answer), state)
  assert.deepEqual(firstTrySummary(state, item => item.id === step.id), { correct: 0, total: 1, assisted: 1 })
  for (const value of [null, {}, [], { version: 'oud' }]) assert.deepEqual(restoreProgress(value), freshProgress())
  const tampered = restoreProgress({ version: lesson.id, current: 999, completed: steps.map(step => step.id) })
  assert.equal(tampered.current, 1)
  assert.deepEqual(tampered.completed, [steps[0].id])
})
