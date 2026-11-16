import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { MODEL, MOLES, PRESETS, CYLINDER, GRAPH, gasState, boundedVolume, pistonX, volumeFromX, formatNumber, makeParticles, moveParticles, graphPoint, curvePath } from '../src/gassen/compression-model.js'
import { lesson, steps, STORAGE_KEY } from '../src/gassen/compression-pilot.js'
import { createProgressSystem } from '../src/guided/progress.js'
import { questionFeedback } from '../src/guided/feedback.js'
import { STORAGE_KEY as basicKey } from '../src/energie-basis/progress.js'
import { STORAGE_KEY as energyKey } from '../src/energie/progress.js'
import { STORAGE_KEY as biologyKey } from '../src/celmetabolisme/progress.js'
import { STORAGE_KEY as kineticKey } from '../src/energie-basis/kinetic-pilot.js'

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-10, `${a} != ${b}`)
const progress = createProgressSystem(lesson, steps, STORAGE_KEY)

test('gasmodel: exacte bundelpresets met pV=nRT in SI, absolute bar en mL', () => {
  assert.deepEqual(PRESETS, [60, 40, 30, 80])
  close(MOLES, 100000 * 60e-6 / (8.31 * 300))
  for (const [v, p] of [[60, 1], [40, 1.5], [30, 2], [80, .75], [20, 3]]) {
    const state = gasState(v)
    close(state.pressureBar, p)
    close(state.pressurePa * state.volumeM3, MOLES * 8.31 * 300)
    close(state.pressureBar * v, 60)
    assert.equal(state.temperatureK, 300)
    assert.equal(state.moles, MOLES)
  }
  for (let v = 20; v <= 80; v++) {
    const current = gasState(v)
    assert.ok(current.pressureBar >= .75 - 1e-12 && current.pressureBar <= 3 + 1e-12)
    if (v < 80) assert.ok(current.pressureBar > gasState(v + 1).pressureBar)
  }
  assert.equal(formatNumber(1.5), '1,50')
  assert.equal(formatNumber(.75), '0,75')
})

test('gasmodel: bereik en zuigergeometrie zijn fysisch consistent', () => {
  for (const value of [0, -1, 19, 81, Infinity, NaN, '60', null]) assert.throws(() => gasState(value), RangeError)
  assert.equal(boundedVolume(NaN), 60)
  assert.equal(boundedVolume(-5), 20)
  assert.equal(boundedVolume(200), 80)
  assert.equal(boundedVolume(40.6), 41)
  for (const v of PRESETS) assert.equal(volumeFromX(pistonX(v)), v)
  close((pistonX(40) - CYLINDER.left) / (pistonX(60) - CYLINDER.left), 40 / 60)
  assert.equal(volumeFromX(-200), 20)
  assert.equal(volumeFromX(1000), 80)
})

test('gasmodel: dezelfde twaalf even grote deeltjes, snelheid niet afhankelijk van V', () => {
  let particles = makeParticles(80)
  assert.equal(particles.length, 12)
  assert.equal(new Set(particles.map(p => p.id)).size, 12)
  for (let i = 0; i < 200; i++) {
    const v = i % 2 ? 20 : 80
    particles = moveParticles(particles, v, i === 0 ? 100 : .02)
    assert.equal(particles.length, MODEL.particleCount)
    for (const p of particles) {
      assert.equal(p.r, CYLINDER.radius)
      close(Math.hypot(p.vx, p.vy), 36)
      assert.ok(p.x >= CYLINDER.left + p.r && p.x <= pistonX(v) - p.r)
      assert.ok(p.y >= CYLINDER.top + p.r && p.y <= CYLINDER.top + CYLINDER.height - p.r)
    }
  }
  const still = makeParticles(60)
  assert.deepEqual(moveParticles(still, 60, -1), still)
})

test('gasmodel: volledige kromme binnen bereik, live stip op dezelfde functie', () => {
  const path = curvePath()
  assert.equal((path.match(/L/g) || []).length, 120)
  assert.doesNotMatch(path, /NaN|Infinity/)
  for (let v = 20; v <= 80; v++) {
    const p = graphPoint(v)
    close((GRAPH.bottom - p.y) / (GRAPH.bottom - GRAPH.top) * GRAPH.maxPressure, gasState(v).pressureBar)
    assert.ok(p.x >= GRAPH.left && p.x <= GRAPH.right)
    assert.ok(p.y >= GRAPH.top && p.y <= GRAPH.bottom)
  }
  assert.notEqual(gasState(50).pressureBar, (gasState(20).pressureBar + gasState(80).pressureBar) / 2, 'geen rechte tussen eindpunten')
})

test('gasproefblok: afgebakende cyclus en volledige papierdekking p. 1–2', () => {
  assert.equal(steps.length, 6)
  assert.equal(new Set(steps.map(s => s.id)).size, steps.length)
  assert.deepEqual(steps.map(s => s.type), ['work', 'work', 'quiz', 'work', 'work', 'read'])
  for (const s of steps) {
    assert.ok(s.id && s.title && s.source && s.section && s.next)
    if (s.type !== 'quiz') assert.ok(s.instructions.length)
    if (s.type === 'work') { assert.equal(s.completion, 'button'); assert.equal(s.checks, undefined) }
  }
  assert.deepEqual(steps.filter(s => s.activity).map(s => [s.activity, s.initialVolume]), [['gas-compression', 60], ['gas-compression', 40]])
  assert.deepEqual(steps.find(s => s.exercise === '1').parts, ['a', 'b', 'c'])
  assert.equal(steps.find(s => s.exercise === '1').page, 2)
  assert.ok(steps.some(s => s.exercise === 'A0') && steps.some(s => s.exercise === 'A1') && steps.some(s => s.exercise === 'besluit-A'))
  assert.match(lesson.duration, /niet de volledige/)
  assert.match(lesson.completion.work, /niet automatisch nagekeken/)
  assert.match(steps.at(-1).note, /bevestigt niet dat A\+ is gemaakt/)
  assert.doesNotMatch(JSON.stringify(steps), /opdracht 3a|Charles|Avogadro|overdruk omrekenen/)
})

test('gasproefblok: alle misvattingen krijgen zichtbare, verschillende inhoudelijke feedback', () => {
  const quiz = steps[2]
  assert.equal(quiz.options.length, 4)
  assert.equal(quiz.answer, 3)
  assert.equal(quiz.feedbackByOption.length, 4)
  const wrong = [0, 1, 2].map(last => questionFeedback(quiz, { last }))
  assert.equal(new Set(wrong).size, 3)
  assert.match(wrong[0], /geen gas ontsnapt/)
  assert.match(wrong[1], /krimpen niet/)
  assert.match(wrong[2], /300/)
  assert.equal(questionFeedback(quiz, { last: 3 }), quiz.correct)
  assert.match(quiz.correct, /modeldruk.*gaswet/)
})

test('gasproefblok: eerste poging, hulp, pauzeren/herstellen en zes stappen zonder nepcorrectie', () => {
  let state = progress.advance(progress.advance(progress.freshProgress()))
  const quiz = steps[2]
  assert.equal(progress.canAdvance(state, quiz), false)
  state = progress.answerQuestion(state, quiz, 0)
  state = progress.answerQuestion(state, quiz, 1)
  state = progress.confirmHelp(state)
  assert.equal(state.responses[quiz.id].first, 0)
  assert.equal(state.responses[quiz.id].assisted, true)
  state = progress.advance(state)
  assert.equal(state.completed.includes(steps[4].id), false)
  while (state.current < steps.length) state = progress.advance(state)
  assert.equal(state.completed.length, 6)
  assert.deepEqual(progress.restoreProgress(JSON.parse(JSON.stringify(state))), state)
  assert.deepEqual(progress.firstTrySummary(state, s => s.final), { correct: 0, total: 1, assisted: 1 })
  assert.deepEqual(state.workChecks, {})
})

test('gasproefblok: eigen opslag, andere leerpaden worden niet geraakt', () => {
  const otherKeys = [basicKey, energyKey, biologyKey, kineticKey]
  assert.equal(new Set([STORAGE_KEY, ...otherKeys]).size, 5)
  const originals = otherKeys.map(key => [key, `bewaard:${key}`])
  const values = new Map(originals)
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const state = progress.advance(progress.freshProgress())
  assert.equal(progress.saveProgress(storage, state), true)
  assert.deepEqual(progress.loadProgress(storage).state, state)
  progress.saveProgress(storage, progress.freshProgress())
  for (const [key, value] of originals) assert.equal(values.get(key), value)
  assert.equal(progress.loadProgress(undefined).available, false)
  assert.equal(progress.saveProgress(undefined, state), false)
  assert.deepEqual(progress.restoreProgress({ version: 'andere-les', completed: steps.map(s => s.id) }), progress.freshProgress())
})

test('gasproefblok: kleine slothaak in gedeelde renderer, geen gekopieerde app of drukvatmenu', () => {
  const renderer = readFileSync(new URL('../src/guided/GuidedPath.vue', import.meta.url), 'utf8')
  const app = readFileSync(new URL('../src/gassen/CompressionPilot.vue', import.meta.url), 'utf8')
  const component = readFileSync(new URL('../src/gassen/CompressionLab.vue', import.meta.url), 'utf8')
  assert.match(renderer, /<slot name="activity" :step="step"/)
  assert.match(app, /import GuidedPath/)
  assert.doesNotMatch(app, /createProgressSystem|localStorage/)
  assert.match(component, /onUnmounted/)
  assert.match(component, /visibilitychange/)
  assert.match(component, /prefers-reduced-motion/)
  assert.match(component, /niet uit getelde botsingen/)
  assert.match(component, /start dit model opnieuw/)
  assert.doesNotMatch(component, /setInterval|heatingPower|activeLaw|glow|backdrop-blur/)
})
