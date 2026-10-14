import assert from 'node:assert/strict'
import test from 'node:test'
import { metaphaseRotation, anaphaseRotation, recombinantSisterIndex } from '../s-activities/celldivision/spindleGeometry.js'

const radians = degrees => degrees * Math.PI / 180
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} should equal ${expected}`)

for (const [axis, spindle] of [['horizontal', [1, 0]], ['vertical', [0, 1]]]) {
  test(`Metaphase chromosomes are perpendicular to the ${axis} spindle`, () => {
    const angle = radians(metaphaseRotation(axis))
    // The glyph's longitudinal axis is local y.
    const longAxis = [-Math.sin(angle), Math.cos(angle)]
    near(longAxis[0] * spindle[0] + longAxis[1] * spindle[1], 0)
  })

  test(`Anaphase chromatids lead centromere-first towards both ${axis} poles`, () => {
    for (const pole of [0, 1]) {
      const angle = radians(anaphaseRotation(axis, pole))
      const lead = [Math.cos(angle), Math.sin(angle)]
      near(lead[0] * spindle[0] + lead[1] * spindle[1], pole === 0 ? -1 : 1)
    }
  })
}

test('One crossing-over affects one maternal and one paternal sister, retained in daughter cells', () => {
  assert.equal(recombinantSisterIndex('M'), 1)
  assert.equal(recombinantSisterIndex('P'), 0)
  const daughters = ['M', 'P'].flatMap(origin => [0, 1].map(pole => ({
    origin,
    recombinant: pole === recombinantSisterIndex(origin)
  })))
  assert.equal(daughters.filter(daughter => daughter.recombinant).length, 2)
  for (const origin of ['M', 'P']) {
    assert.equal(daughters.filter(daughter => daughter.origin === origin && daughter.recombinant).length, 1)
  }
})

test('Invalid spindle axes, poles and parental origins are rejected', () => {
  assert.throws(() => metaphaseRotation('diagonal'))
  assert.throws(() => anaphaseRotation('horizontal', 2))
  assert.throws(() => recombinantSisterIndex('unknown'))
})
