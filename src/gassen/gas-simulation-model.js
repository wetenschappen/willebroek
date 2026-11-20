// SI binnen het model; de bediening gebruikt K, L en mol, het scherm kPa.
export const GAS_CONSTANT = 8.31 // J/(mol·K), zoals op het formularium
export const REFERENCE = Object.freeze({ temperatureK: 300, volumeL: 15, moles: 1 })
export const VOLUME_LIMITS = Object.freeze([5, 30])
const toM3 = volumeL => volumeL * 1e-3
export const REFERENCE_PRESSURE_PA = REFERENCE.moles * GAS_CONSTANT * REFERENCE.temperatureK / toM3(REFERENCE.volumeL)

export const QUANTITIES = Object.freeze({
  pressureKpa: { symbol: 'p', name: 'Absolute druk', unit: 'kPa', digits: 1, inputDigits: 1 },
  volumeL: { symbol: 'V', name: 'Volume', unit: 'L', digits: 2, inputDigits: 1 },
  temperatureK: { symbol: 'T', name: 'Temperatuur', unit: 'K', digits: 0, inputDigits: 0 },
  moles: { symbol: 'n', name: 'Hoeveelheid gas', unit: 'mol', digits: 2, inputDigits: 2 },
})

export const GAS_MODES = Object.freeze({
  boyle: Object.freeze({
    name: 'Boyle', input: 'volumeL', output: 'pressureKpa', min: 5, max: 30, step: 0.1,
    xTicks: [5, 10, 15, 20, 25, 30], yTicks: [0, 100, 200, 300, 400, 500],
    fixed: 'T en n blijven gelijk', relation: 'pV is constant',
  }),
  gayLussac: Object.freeze({
    name: 'Gay-Lussac', input: 'temperatureK', output: 'pressureKpa', min: 120, max: 600, step: 1,
    xTicks: [120, 240, 360, 480, 600], yTicks: [0, 100, 200, 300, 400],
    fixed: 'V en n blijven gelijk', relation: 'p/T is constant',
  }),
  charles: Object.freeze({
    name: 'Charles', input: 'temperatureK', output: 'volumeL', min: 120, max: 600, step: 1,
    xTicks: [120, 240, 360, 480, 600], yTicks: [0, 6, 12, 18, 24, 30],
    fixed: 'p en n blijven gelijk', relation: 'V/T is constant',
  }),
  avogadro: Object.freeze({
    name: 'Avogadro', input: 'moles', output: 'volumeL', min: 0.4, max: 2, step: 0.01,
    xTicks: [0.4, 0.8, 1.2, 1.6, 2], yTicks: [0, 6, 12, 18, 24, 30],
    fixed: 'p en T blijven gelijk', relation: 'V/n is constant',
  }),
})

function configFor(mode) {
  if (!Object.hasOwn(GAS_MODES, mode)) throw new RangeError('Onbekende gasrelatie')
  return GAS_MODES[mode]
}
export function controlValue(mode, raw) {
  const config = configFor(mode)
  if (!Number.isFinite(raw)) return REFERENCE[config.input]
  const bounded = Math.max(config.min, Math.min(config.max, raw))
  return Number((Math.round(bounded / config.step) * config.step).toFixed(2))
}

// Begrens alleen de invoer. Nooit p of V achteraf afkappen om in de tekening te passen.
export function idealState(mode, input) {
  const config = configFor(mode)
  const value = input ?? REFERENCE[config.input]
  if (!Number.isFinite(value) || value < config.min || value > config.max) throw new RangeError('Buiten het modelbereik')
  const data = { ...REFERENCE, [config.input]: value }
  const { moles, temperatureK } = data
  const freePiston = config.output === 'volumeL'
  const volumeM3 = freePiston ? moles * GAS_CONSTANT * temperatureK / REFERENCE_PRESSURE_PA : toM3(data.volumeL)
  const volumeL = freePiston ? volumeM3 * 1000 : data.volumeL
  const pressurePa = freePiston ? REFERENCE_PRESSURE_PA : moles * GAS_CONSTANT * temperatureK / volumeM3
  return { moles, temperatureK, volumeM3, volumeL, pressurePa, pressureKpa: pressurePa / 1000 }
}

export const PISTON = Object.freeze({ left: 65, right: 325, floor: 315, maxHeight: 260, radius: 3.8 })
export const pistonY = volumeL => PISTON.floor - PISTON.maxHeight * volumeL / VOLUME_LIMITS[1]
export const volumeFromY = y => (PISTON.floor - y) / PISTON.maxHeight * VOLUME_LIMITS[1]
// Representatieve stippen, geen aftelling van de werkelijke moleculen.
export const particleCount = moles => Math.round(16 * moles)
export const speedScale = temperatureK => Math.sqrt(temperatureK / REFERENCE.temperatureK)

export const PLOT = Object.freeze({ left: 62, right: 530, top: 18, bottom: 248 })
export function plotPoint(mode, state) {
  const { input, output, min, max, yTicks } = configFor(mode)
  return {
    x: PLOT.left + (state[input] - min) / (max - min) * (PLOT.right - PLOT.left),
    y: PLOT.bottom - state[output] / yTicks.at(-1) * (PLOT.bottom - PLOT.top),
  }
}
export function plotCurve(mode) {
  const { min, max } = configFor(mode)
  return Array.from({ length: 91 }, (_, i) => plotPoint(mode, idealState(mode, min + i / 90 * (max - min))))
}
