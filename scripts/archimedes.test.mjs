import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { buoyancy, hydrostaticPressure, heldBody, releasedBody, suspendedWeight, floatingVolume, gasLift } from '../src/physics/archimedes.js'
import { BOOK_EXERCISES, BOOK_SLIDES, EXAMPLE_SLIDES, EXERCISE_SLIDES } from '../src/physics/archimedes-book.js'
import { DERIVATION, EXPERIMENTS, VOLUME_CHECKS, BALANCE_CASES } from '../s-activities/archimedes/tasks.js'
import lesson1 from '../src/lessons/fys4-m01-l09-archimedeskracht-vloeistoffen.js'
import lesson2 from '../src/lessons/fys4-m01-l10-archimedeskracht-gassen.js'
const near = (actual, expected, tolerance = 1e-9) => assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`)

test('verplaatst volume = ondergedompeld volume, niet altijd totaalvolume', () => {
  for (const fraction of [0, 0.1, 0.25, 0.5, 0.8, 1]) {
    const model = heldBody({ fraction })
    near(model.displacedVolume, model.submergedVolume)
    near(model.displacedVolume, 0.001 * fraction)
    near(model.FA, 1000 * 9.81 * 0.001 * fraction)
    near(model.mass, 0.5)
    near(model.FG, 4.905)
    near(model.resultant + model.holdingForce, 0)
  }
  assert.ok(heldBody({ fraction: 0.5 }).displacedVolume < heldBody().volume)
})

test('de WACO-afleiding F₂ − F₁ = ρ_vl · g · V_vl geldt bij alle modelinstellingen', () => {
  for (const rhoFluid of [500, 998, 1000, 2000]) for (const g of [1.62, 9.81, 19.62]) for (const topDepth of [0, 0.2, 1, 20]) for (const fraction of [0, 0.5, 1]) {
    const model = heldBody({ rhoFluid, g, topDepth, fraction })
    near(model.F2 - model.F1, model.FA)
    near(model.FA, model.displacedMass * g)
    if (fraction === 1) near(model.h2 - model.h1, model.side)
  }
  near(hydrostaticPressure(1000, 9.81, 0.5), 4905)
})

test('vijf parameterproeven veranderen precies de bedoelde factor', () => {
  for (const e of EXPERIMENTS) {
    const model = v => heldBody({ [e.field]: e.field === 'fraction' ? v / 100 : v })
    const a = model(e.a), b = model(e.b)
    near(b.FA / a.FA, e.prediction === 1 ? 2 : 1)
    if (e.id === 'material') { near(b.FG / a.FG, 3); near(b.displacedVolume, a.displacedVolume) }
    if (e.id === 'depth') { assert.ok(b.p1 > a.p1); assert.ok(b.p2 > a.p2); near(b.p2 - b.p1, a.p2 - a.p1) }
    if (e.id === 'volume') { near(b.mass, a.mass); near(b.FG, a.FG) }
    if (e.id === 'gravity') near(b.FG / a.FG, 2)
  }
})

test('stijgen bij loslaten is niet hetzelfde als drijvend evenwicht', () => {
  const initial = heldBody({ rhoObject: 600 })
  const settled = releasedBody({ rhoObject: 600 })
  assert.ok(initial.FA > initial.FG)
  assert.equal(settled.behavior, 'drijft')
  near(settled.FA, settled.FG)
  near(settled.submergedVolume, 0.0006)
  near(settled.mass, initial.mass)
  assert.equal(releasedBody({ rhoObject: 1000 }).behavior, 'zweeft')
  assert.equal(releasedBody({ rhoObject: 7900 }).behavior, 'zinkt')
  for (const c of BALANCE_CASES) {
    const model = c.settled ? releasedBody(c.options) : heldBody(c.options)
    assert.equal(Math.abs(model.resultant) < 1e-8 ? '=' : model.resultant > 0 ? '>' : '<', c.relation)
  }
})

test('boekberekeningen volgen de afzonderlijke bronwaarden en afrondingen', () => {
  near(buoyancy(1025, 9.81, 25), 251381.25)
  near(70 / 0.065, 1076.923076923)
  near(gasLift({ density: 1.29, volume: 2000, totalMass: 2580 }).FA, 25309.8)
  near(buoyancy(998, 9.81, 2), 19580.76)
  const bootVolume = floatingVolume(400 + 30 * 60, 998)
  near(bootVolume / (5 * 3), 0.14696058784235136)
  const balloon = gasLift({ volume: 2000, totalMass: 2586 })
  near(balloon.FA, 25368.66); near(balloon.FG, balloon.FA)
  near(heldBody({ rhoFluid: 1030, volume: 0.072, rhoObject: 77 / 0.072 }).FA, 727.5096)
  near(suspendedWeight(5000, buoyancy(998, 9.81, 0.2)), 3041.924)
  near(floatingVolume(50, 1000) * 1000, 50)
  near((90 - 20) / (90 - 60) * 1000, 2333.3333333333335)
  near(gasLift({ volume: 200000, totalMass: 112000 + 7000 }).maxTotalMass - 112000 - 7000, 139600)
})

test('ongeldige grootheden en een fysisch onmogelijk negatief touwgewicht worden afgewezen', () => {
  for (const options of [{ fraction: -1 }, { fraction: 1.1 }, { g: 0 }, { rhoFluid: -1 }, { volume: 0 }, { rhoObject: NaN }, { topDepth: -0.1 }]) assert.throws(() => heldBody(options), RangeError)
  assert.throws(() => suspendedWeight(1, 2), RangeError)
  assert.throws(() => floatingVolume(-1, 1000), RangeError)
  assert.throws(() => gasLift({ volume: 1, totalMass: -1 }), RangeError)
})

test('alle 18 boekopgaven en de drie voorbeelden zijn volledig en navigeerbaar', () => {
  assert.deepEqual(BOOK_EXERCISES.map(e => e.number), Array.from({ length: 18 }, (_, i) => String(i + 1)))
  assert.deepEqual([...new Set(EXERCISE_SLIDES.map(s => s.workId))], BOOK_EXERCISES.map(e => e.id))
  assert.equal(new Set(EXAMPLE_SLIDES.map(s => s.workId)).size, 3)
  for (const id of new Set(BOOK_SLIDES.map(s => s.workId))) {
    const pages = BOOK_SLIDES.filter(s => s.workId === id)
    assert.equal(pages.filter(s => s.section).length, 1)
    assert.equal(pages.at(-1).steps.at(-1).label, 'Antwoord')
    assert.ok(pages.flatMap(s => s.steps).some(s => s.label === 'Oplossing'))
    if (pages.length > 1) assert.deepEqual(pages[0].steps.map(s => s.label), ['Gegeven', 'Gevraagd'])
  }
  assert.equal(lesson2.workbook.exercises.length, 18)
  assert.equal(lesson2.slidesB.length, BOOK_SLIDES.length + 1)
  assert.equal(lesson1.config.classId, '4NAWE+4SPOWE')
  assert.equal(lesson2.config.classId, '4NAWE+4SPOWE')
  assert.equal(lesson1.activities.activity.storageKey, lesson2.activities.activity.storageKey)
  assert.notEqual(lesson1.activities.activity.phase, lesson2.activities.activity.phase)
})

test('alle wiskundige notatie kan strikt door KaTeX worden weergegeven', () => {
  let count = 0
  function check(value) {
    if (typeof value === 'string') {
      for (const match of value.matchAll(/\\\((.*?)\\\)/gs)) { katex.renderToString(match[1], { throwOnError: true }); count++ }
    } else if (Array.isArray(value)) value.forEach(check)
    else if (value && typeof value === 'object') Object.values(value).forEach(check)
  }
  check([lesson1, lesson2])
  for (const step of DERIVATION) katex.renderToString(step.formula, { throwOnError: true })
  assert.ok(count > 100)
  for (const q of [...DERIVATION, ...EXPERIMENTS, ...VOLUME_CHECKS]) assert.ok(q.correct >= 0 && q.correct < q.options.length)
})
