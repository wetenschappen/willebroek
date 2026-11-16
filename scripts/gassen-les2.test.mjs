import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { lesson, steps, STORAGE_KEY } from '../src/gassen/lesson2.js'
import { lesson as firstLesson, steps as firstSteps, STORAGE_KEY as firstKey } from '../src/gassen/lesson.js'
import { lesson as pilot, steps as pilotSteps, STORAGE_KEY as pilotKey } from '../src/gassen/compression-pilot.js'
import { createProgressSystem } from '../src/guided/progress.js'
import { questionFeedback } from '../src/guided/feedback.js'
import { STORAGE_KEY as basicKey } from '../src/energie-basis/progress.js'
import { STORAGE_KEY as energyKey } from '../src/energie/progress.js'
import { STORAGE_KEY as bioKey } from '../src/celmetabolisme/progress.js'
const progress = createProgressSystem(lesson, steps, STORAGE_KEY)

test('les 2: eigen afbakening, heractivering en leerkrachtgestuurde overgang zonder klokclaim', () => {
  assert.equal(steps.length, 12)
  assert.equal(new Set(steps.map(s => s.id)).size, 12)
  assert.equal(steps[0].type, 'work')
  assert.match(steps[0].instructions.join(' '), /eigen slotantwoorden/)
  assert.match(steps[1].instructions.join(' '), /30 september/)
  assert.match(steps[5].instructions[0], /leerkracht.*opent/)
  assert.equal(steps[5].type, 'read')
  assert.match(steps[5].note, /bevestigt niet/)
  assert.match(lesson.duration, /geen examen of volledige examenrepetitie/)
  assert.doesNotMatch(lesson.duration, /50 minuten|75 minuten|90 minuten/)
  assert.match(lesson.completion.next.join(' '), /afzonderlijk.*bevestigd/)
})

test('les 2: opdracht 3a–c blijft basis, eigen poging vóór controle, geen overtypwerk', () => {
  const tasks = steps.filter(s => s.exercise === '3')
  assert.deepEqual(tasks.flatMap(s => s.parts), ['a', 'b', 'c'])
  assert.ok(tasks.every(s => s.page === 6 && s.type === 'work' && s.completion === 'button'))
  assert.ok(steps.indexOf(tasks[0]) < steps.findIndex(s => s.id === 'les2-si-check'))
  assert.ok(steps.indexOf(tasks[1]) > steps.findIndex(s => s.id === 'les2-si-check'))
  assert.match(tasks[1].instructions.join(' '), /m³ én in liter/)
  for (const s of steps) {
    assert.ok(s.title && s.source && s.section && s.next)
    if (s.type === 'work') { assert.equal(s.completion, 'button'); assert.equal(s.checks, undefined) }
    assert.equal(s.activity, undefined)
  }
  assert.equal(steps.some(s => s.exercise === '4'), false)
  assert.match(lesson.completion.next.join(' '), /Opdracht 4.*verdieping/)
})

test('les 2: apart oefenblad met volledige M1/M2/M3-dekking, geen numerieke koppelleer', () => {
  for (const [exercise, page, parts] of [['M1', 1, ['a', 'b']], ['M2', 2, ['a', 'b', 'c']], ['M3', 3, ['a', 'b', 'c']]]) {
    const s = steps.find(s => s.exercise === exercise)
    assert.equal(s.page, page); assert.deepEqual(s.parts, parts)
    assert.match(s.source, /oefenblad/)
  }
  assert.match(steps.find(s => s.exercise === 'M1').instructions.join(' '), /geen opdracht voor de zuigersimulator/)
  assert.match(steps.find(s => s.exercise === 'M2').instructions.join(' '), /resulterende radiale kracht.*niet.*afzonderlijke kracht/)
  assert.match(steps.find(s => s.exercise === 'M3').instructions.join(' '), /vooruit blijft draaien/)
  assert.match(steps.find(s => s.exercise === 'M3').instructions.join(' '), /geen numerieke koppelberekening/)
  assert.match(steps.at(-1).instructions.join(' '), /één echte fout.*Geen fout gevonden/s)
})

test('les 2: SI-keuzes en fysische feedback stemmen overeen met de oefengegevens', () => {
  const q = steps.find(s => s.id === 'les2-si-check')
  assert.equal(q.answer, 0)
  const p = 1.5 * 100000, t = 27 + 273
  assert.equal(p, 150000); assert.equal(t, 300)
  assert.match(q.options[q.answer], /150\\,000.*Pa.*300.*K/)
  assert.match(q.correct, /m³/)
  assert.match(questionFeedback(q, { last: 1 }), /druk.*bar.*Pa/)
  assert.match(questionFeedback(q, { last: 2 }), /geen absolute temperatuur/)
  assert.match(questionFeedback(q, { last: 3 }), /duizendmaal.*150 kPa.*niet 150 Pa/)
  const volume = 3 * 8.31 * t / p
  assert.ok(Math.abs(volume - .04986) < 1e-12)
  assert.ok(Math.abs(volume * 1000 - 49.86) < 1e-10)
})

test('les 2: factor vier en koppelbalans, afzonderlijke specifieke feedback', () => {
  const force = steps.find(s => s.id === 'les2-kracht-check')
  assert.equal(force.answer, 1)
  assert.match(force.options[1], /viermaal/)
  const torque = steps.find(s => s.id === 'les2-koppel-check')
  assert.equal(torque.answer, 2)
  assert.match(torque.options[2], /even groot.*tegengesteld.*niet nul/)
  for (const q of steps.filter(s => s.type === 'quiz')) {
    assert.equal(q.options.length, 4)
    assert.equal(q.feedbackByOption.length, 4)
    const wrong = q.options.map((_, i) => i).filter(i => i !== q.answer).map(last => questionFeedback(q, { last }))
    assert.equal(new Set(wrong).size, 3)
    assert.ok(wrong.every(s => s.length > 80))
    assert.equal(questionFeedback(q, { last: q.answer }), q.correct)
  }
})

test('les 2: eerste pogingen en hulp blijven eerlijk; papierbevestiging is geen juistheid', () => {
  let state = progress.freshProgress()
  for (const step of steps) {
    if (step.type === 'quiz') {
      assert.equal(progress.canAdvance(state, step), false)
      state = progress.answerQuestion(state, step, (step.answer + 1) % 4)
      assert.equal(progress.advance(state), state)
      if (step.id === 'les2-koppel-check') {
        state = progress.answerQuestion(state, step, (step.answer + 2) % 4)
        state = progress.confirmHelp(state)
      } else state = progress.answerQuestion(state, step, step.answer)
    }
    state = progress.advance(state)
  }
  assert.equal(state.completed.length, 12)
  assert.deepEqual(progress.firstTrySummary(state, s => s.final), { correct: 0, total: 3, assisted: 1 })
  assert.equal(state.responses['les2-opdracht3-c'], undefined)
  assert.deepEqual(state.workChecks, {})
  assert.deepEqual(progress.restoreProgress(JSON.parse(JSON.stringify(state))), state)
  assert.match(lesson.completion.work, /niet automatisch nagekeken/)
})

test('les 2: eigen opslag, les 1 en compressieproef worden niet gemigreerd of gewist', () => {
  const keys = [firstKey, pilotKey, basicKey, energyKey, bioKey]
  assert.equal(new Set([STORAGE_KEY, ...keys]).size, 6)
  const values = new Map(keys.map(key => [key, `bewaard:${key}`]))
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const state = progress.advance(progress.freshProgress())
  progress.saveProgress(storage, state)
  assert.deepEqual(progress.loadProgress(storage).state, state)
  progress.saveProgress(storage, progress.freshProgress())
  for (const key of keys) assert.equal(values.get(key), `bewaard:${key}`)
  for (const old of [firstLesson, pilot]) assert.deepEqual(progress.restoreProgress({ version: old.id, completed: steps.map(s => s.id) }), progress.freshProgress())
  assert.equal(firstSteps.length, 14); assert.equal(pilotSteps.length, 6)
  assert.equal(progress.loadProgress(undefined).available, false)
})

test('les 2: dunne ingang op gedeelde renderer, geen app-kopie of openbare sleutelasset', () => {
  const entry = readFileSync(new URL('../src/gassen/lesson2-main.js', import.meta.url), 'utf8')
  assert.match(entry, /import GuidedPath/)
  assert.doesNotMatch(entry, /createProgressSystem|localStorage/)
  assert.doesNotMatch(JSON.stringify(lesson) + JSON.stringify(steps), /Correctiesleutel\.pdf|Examen_Mechanica|58[.,]8 bar/)
})
