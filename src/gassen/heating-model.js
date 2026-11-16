// Gericht ideaal-gasmodel: star, afgesloten vat. SI-berekening, schoolafspraak +273.
import { MODEL, MOLES, makeParticles, moveParticles } from './compression-model.js'

export const HEATING = Object.freeze({ minK: 273, maxK: 600, initialK: 300, volumeMl: 60 })
export const TEMPERATURE_PRESETS = Object.freeze([300, 360, 450])
export const HEAT_GRAPH = Object.freeze({ left: 48, right: 328, top: 32, bottom: 208, maxK: 660, maxBar: 2.2 })

const pressurePaForK = temperatureK => MOLES * MODEL.gasConstant * temperatureK / (HEATING.volumeMl * 1e-6)

export function heatingState(temperatureK) {
  if (!Number.isFinite(temperatureK) || temperatureK < HEATING.minK || temperatureK > HEATING.maxK) throw new RangeError('Temperatuur buiten 273–600 K')
  const volumeM3 = HEATING.volumeMl * 1e-6
  const pressurePa = pressurePaForK(temperatureK)
  return { temperatureK, celsius: temperatureK - 273, pressurePa, pressureBar: pressurePa / 100000, volumeMl: HEATING.volumeMl, volumeM3, moles: MOLES }
}
export function boundedTemperature(value) {
  if (!Number.isFinite(value)) return HEATING.initialK
  return Math.max(HEATING.minK, Math.min(HEATING.maxK, Math.round(value)))
}
export function representativeSpeed(temperatureK) {
  heatingState(temperatureK)
  return 36 * Math.sqrt(temperatureK / HEATING.initialK)
}
export function moveHeatingParticles(particles, temperatureK, seconds = 0) {
  const target = representativeSpeed(temperatureK)
  const scaled = particles.map(p => {
    const factor = target / Math.hypot(p.vx, p.vy)
    return { ...p, vx: p.vx * factor, vy: p.vy * factor }
  })
  return moveParticles(scaled, HEATING.volumeMl, seconds)
}
export function makeHeatingParticles(temperatureK = HEATING.initialK) {
  return moveHeatingParticles(makeParticles(HEATING.volumeMl), temperatureK)
}
// Alleen de grafische modelverlenging mag onder het bedienbare bereik komen.
export function heatingGraphPoint(temperatureK) {
  if (!Number.isFinite(temperatureK) || temperatureK < 0 || temperatureK > HEATING.maxK) throw new RangeError('Ongeldig grafiekpunt')
  return {
    x: HEAT_GRAPH.left + temperatureK / HEAT_GRAPH.maxK * (HEAT_GRAPH.right - HEAT_GRAPH.left),
    y: HEAT_GRAPH.bottom - (pressurePaForK(temperatureK) / 100000) / HEAT_GRAPH.maxBar * (HEAT_GRAPH.bottom - HEAT_GRAPH.top),
  }
}
export function heatingLine(fromK, toK) {
  const a = heatingGraphPoint(fromK), b = heatingGraphPoint(toK)
  return `M${a.x},${a.y} L${b.x},${b.y}`
}
