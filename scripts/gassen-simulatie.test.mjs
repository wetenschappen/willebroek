import assert from 'node:assert/strict'
import test from 'node:test'
import {
  GAS_CONSTANT, GAS_MODES, PLOT, REFERENCE, VOLUME_LIMITS, controlValue, idealState,
  particleCount, pistonY, plotCurve, plotPoint, speedScale, volumeFromY,
} from '../src/gassen/gas-simulation-model.js'

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≠ ${b}`)

test('vier gasrelaties delen dezelfde referentietoestand en gebruiken absolute SI-druk', () => {
  for (const mode of Object.keys(GAS_MODES)) {
    assert.deepEqual(idealState(mode), { ...REFERENCE, volumeM3: 0.015, pressurePa: 166200, pressureKpa: 166.2 })
  }
  near(idealState('boyle', 7.5).pressureKpa, 332.4)
  near(idealState('gayLussac', 360).pressureKpa, 199.44)
  near(idealState('gayLussac', 600).pressureKpa, 332.4)
  near(idealState('charles', 600).volumeL, 30)
  near(idealState('avogadro', 0.4).volumeL, 6)
  near(idealState('avogadro', 2).volumeL, 30)
})

const invariants = {
  boyle: [s => s.temperatureK, s => s.moles, s => s.pressurePa * s.volumeM3],
  gayLussac: [s => s.volumeM3, s => s.moles, s => s.pressurePa / s.temperatureK],
  charles: [s => s.pressurePa, s => s.moles, s => s.volumeM3 / s.temperatureK],
  avogadro: [s => s.pressurePa, s => s.temperatureK, s => s.volumeM3 / s.moles],
}
for (const [mode, config] of Object.entries(GAS_MODES)) {
  test(`${config.name}: elke schuifstand houdt de wet, de twee constanten en de systeemgrenzen in stand`, () => {
    const reference = idealState(mode)
    const count = Math.round((config.max - config.min) / config.step)
    for (let i = 0; i <= count; i++) {
      const value = controlValue(mode, config.min + i * config.step)
      const s = idealState(mode, value)
      near(s.pressurePa * s.volumeM3, s.moles * GAS_CONSTANT * s.temperatureK)
      near(s.volumeL, s.volumeM3 * 1000)
      for (const invariant of invariants[mode]) near(invariant(s), invariant(reference))
      assert.ok(s.volumeL >= VOLUME_LIMITS[0] - 1e-9 && s.volumeL <= VOLUME_LIMITS[1] + 1e-9)
      near(volumeFromY(pistonY(s.volumeL)), s.volumeL)
      const p = plotPoint(mode, s)
      assert.ok(p.x >= PLOT.left && p.x <= PLOT.right && p.y >= PLOT.top - 1e-9 && p.y <= PLOT.bottom)
    }
    const curve = plotCurve(mode)
    assert.deepEqual(curve[0], plotPoint(mode, idealState(mode, config.min)))
    assert.deepEqual(curve.at(-1), plotPoint(mode, idealState(mode, config.max)))
    for (let i = 1; i < curve.length; i++) {
      assert.ok(curve[i].x > curve[i - 1].x)
      assert.ok(mode === 'boyle' ? curve[i].y > curve[i - 1].y : curve[i].y < curve[i - 1].y)
    }
    assert.equal(controlValue(mode, -1), config.min)
    assert.equal(controlValue(mode, 1e6), config.max)
    assert.equal(controlValue(mode, NaN), REFERENCE[config.input])
    assert.throws(() => idealState(mode, 0), RangeError)
  })
}

test('de animatiesnelheid volgt de wortel van K en de illustratieve deeltjes volgen de hoeveelheid', () => {
  near(speedScale(600) / speedScale(300), Math.SQRT2)
  assert.equal(particleCount(2), 2 * particleCount(1))
  assert.ok(particleCount(0.4) > 0)
})
