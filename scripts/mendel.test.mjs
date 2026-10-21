import test from 'node:test'
import assert from 'node:assert/strict'
import { MODELS, genotypeOptions, normalizeGenotype, gametes, combineGametes, cross, distribution, drawOffspring, percent } from '../src/biology/mendel.js'
import { MISSIONS, CHECKS } from '../s-activities/mendel/missions.js'
import lesson from '../src/lessons/bio6-m02-l01-mendel.js'

const counts = (result, key = 'phenotype') => Object.fromEntries(distribution(result.cells, key).map(r => [r.label, r.count]))

test('meiose geeft één allel per gen, met alle onafhankelijke combinaties', () => {
  assert.deepEqual(gametes('GG', 'mono'), ['G'])
  assert.deepEqual(gametes('Gg', 'mono'), ['G', 'g'])
  assert.deepEqual(gametes('GgRr', 'di'), ['GR', 'Gr', 'gR', 'gr'])
  assert.deepEqual(gametes('GGRr', 'di'), ['GR', 'Gr'])
  assert.deepEqual(gametes('Ao', 'abo'), ['A', 'o'])
  assert.throws(() => gametes('Gg', 'di'))
})

test('normaliseren bewaart loci, hoofdletters en codominante allelen', () => {
  assert.equal(normalizeGenotype('gG rR', 'di'), 'GgRr')
  assert.equal(normalizeGenotype('WR', 'intermediate'), 'RW')
  assert.equal(normalizeGenotype('oB', 'abo'), 'Bo')
  assert.equal(normalizeGenotype('ABo', 'abo'), null)
  assert.equal(normalizeGenotype('GRgr', 'di'), null)
  assert.equal(normalizeGenotype('GG', 'abo'), null)
  assert.equal(combineGametes('Gr', 'gR', 'di'), 'GgRr')
})

test('uniformiteit, splitsing en testkruising zijn verschillende kruisingen', () => {
  assert.deepEqual(counts(cross('mono', 'GG', 'gg'), 'genotype'), { Gg: 1 })
  const f2 = cross('mono', 'Gg', 'Gg')
  assert.deepEqual(counts(f2, 'genotype'), { GG: 1, Gg: 2, gg: 1 })
  assert.deepEqual(counts(f2), { Geel: 3, Groen: 1 })
  assert.deepEqual(counts(cross('mono', 'Gg', 'gg')), { Geel: 1, Groen: 1 })
})

test('intermediair en codominant hebben dezelfde genotypes maar andere fenotypes', () => {
  const a = cross('intermediate', 'RW', 'RW')
  const b = cross('codominant', 'RW', 'RW')
  assert.deepEqual(counts(a, 'genotype'), counts(b, 'genotype'))
  assert.deepEqual(counts(a), { Rood: 1, Roze: 2, Wit: 1 })
  assert.deepEqual(counts(b), { Rood: 1, 'Rood én wit': 2, Wit: 1 })
})

test('ABO: drie populatie-allelen, twee per persoon, één per gameet', () => {
  assert.equal(genotypeOptions('abo').length, 6)
  assert.deepEqual(counts(cross('abo', 'Ao', 'Bo')), { 'Bloedgroep AB': 1, 'Bloedgroep A': 1, 'Bloedgroep B': 1, 'Bloedgroep O': 1 })
  assert.deepEqual(counts(cross('abo', 'AA', 'BB')), { 'Bloedgroep AB': 1 })
  assert.deepEqual(counts(cross('abo', 'AB', 'oo')), { 'Bloedgroep A': 1, 'Bloedgroep B': 1 })
})

test('dihybride F₂ geeft 9:3:3:1 en dubbel heterozygoot heeft kans 4/16', () => {
  const f2 = cross('di', 'GgRr', 'GgRr')
  assert.equal(f2.cells.length, 16)
  assert.deepEqual(counts(f2), { 'Geel · rond': 9, 'Geel · hoekig': 3, 'Groen · rond': 3, 'Groen · hoekig': 1 })
  assert.equal(counts(f2, 'genotype').GgRr, 4)
  assert.deepEqual(counts(cross('di', 'GgRr', 'ggrr')), { 'Geel · rond': 1, 'Geel · hoekig': 1, 'Groen · rond': 1, 'Groen · hoekig': 1 })
})

test('lethale zygoten en overlevenden hebben andere noemers', () => {
  const result = cross('lethal', 'GW', 'GW')
  assert.equal(result.cells.filter(c => !c.viable).length, 1)
  const live = distribution(result.cells.filter(c => c.viable))
  assert.equal(live.find(r => r.label === 'Geel').probability, 2 / 3)
  assert.equal(distribution(result.cells).find(r => r.label === 'Geel').probability, 1 / 2)
  assert.deepEqual(distribution([]), [])
})

test('alle oudercombinaties in elk model: geldige nakomelingen, totale kans 1, reciproque gelijk', () => {
  for (const id of Object.keys(MODELS)) {
    const options = genotypeOptions(id)
    for (const a of options) for (const b of options) {
      const result = cross(id, a, b)
      assert.ok(result.cells.length >= 1 && result.cells.length <= 16)
      assert.ok(result.cells.every(c => options.includes(c.genotype)))
      assert.ok(Math.abs(distribution(result.cells).reduce((sum, r) => sum + r.probability, 0) - 1) < 1e-10)
      assert.deepEqual(new Map(Object.entries(counts(result))), new Map(Object.entries(counts(cross(id, b, a)))))
    }
  }
})

test('toeval is trekking met teruglegging; eerdere geboorten forceren geen 3:1', () => {
  const result = cross('mono', 'Gg', 'Gg')
  const sample = drawOffspring(result.cells, 4, () => 0)
  assert.ok(sample.every(c => c.genotype === 'GG'))
  assert.equal(drawOffspring(result.cells, 1, () => 0.999)[0].genotype, 'gg')
  assert.equal(percent(1 / 16), '6,25%')
})

test('elke labmissie is oplosbaar; vragen en boekdekking zijn volledig', () => {
  assert.equal(MISSIONS.length, 10)
  assert.equal(new Set(MISSIONS.map(m => m.id)).size, MISSIONS.length)
  assert.equal(MISSIONS.filter(m => m.core).length, 3)
  for (const m of MISSIONS) {
    const result = cross(m.model, ...m.parents)
    assert.ok(result.cells.some(c => c.phenotype === m.target))
    assert.ok(genotypeOptions(m.model).includes(m.genotypeTarget))
    assert.ok(m.correct >= 0 && m.correct < m.options.length)
  }
  assert.equal(CHECKS.length, 4)
  assert.equal(lesson.workbook.exercises.length, 11)
  assert.deepEqual(lesson.timeline.stepB.cards.find(c => c.action === 'workbook').exercises, lesson.workbook.exercises)
  assert.equal(lesson.timeline.stepB.cards.find(c => c.action === 'activity').activityId, 'activity')
  assert.deepEqual([...new Set(lesson.workbook.exercises.map(e => e.page))], ['73', '74', '75'])
})
