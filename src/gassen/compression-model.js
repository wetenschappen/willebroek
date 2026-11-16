// Gericht ideaal-gasmodel voor bundel 6. Animatiestippen zijn representatief.
export const MODEL = Object.freeze({
  temperatureK: 300,
  gasConstant: 8.31,
  referenceVolumeMl: 60,
  referencePressurePa: 100000,
  minVolumeMl: 20,
  maxVolumeMl: 80,
  particleCount: 12,
})
export const MOLES = MODEL.referencePressurePa * MODEL.referenceVolumeMl * 1e-6 / (MODEL.gasConstant * MODEL.temperatureK)
export const PRESETS = Object.freeze([60, 40, 30, 80])
export const CYLINDER = Object.freeze({ left: 60, top: 65, height: 120, maxWidth: 430, radius: 4 })

export function gasState(volumeMl) {
  if (!Number.isFinite(volumeMl) || volumeMl < MODEL.minVolumeMl || volumeMl > MODEL.maxVolumeMl) throw new RangeError('Volume buiten 20–80 mL')
  const volumeM3 = volumeMl * 1e-6
  const pressurePa = MOLES * MODEL.gasConstant * MODEL.temperatureK / volumeM3
  return { volumeMl, volumeM3, pressurePa, pressureBar: pressurePa / 100000, temperatureK: MODEL.temperatureK, moles: MOLES }
}

export function boundedVolume(value) {
  if (!Number.isFinite(value)) return MODEL.referenceVolumeMl
  return Math.max(MODEL.minVolumeMl, Math.min(MODEL.maxVolumeMl, Math.round(value)))
}
export function pistonX(volumeMl) {
  gasState(volumeMl)
  return CYLINDER.left + CYLINDER.maxWidth * volumeMl / MODEL.maxVolumeMl
}
export function volumeFromX(x) {
  return boundedVolume((x - CYLINDER.left) / CYLINDER.maxWidth * MODEL.maxVolumeMl)
}
export function formatNumber(value, digits = 2) {
  return new Intl.NumberFormat('nl-BE', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
}

export function makeParticles(volumeMl) {
  const width = pistonX(volumeMl) - CYLINDER.left
  return Array.from({ length: MODEL.particleCount }, (_, id) => {
    const angle = (id * 137.5 + 25) * Math.PI / 180
    return {
      id, x: CYLINDER.left + width * ((id % 4 + 0.5) / 4),
      y: CYLINDER.top + CYLINDER.height * ((Math.floor(id / 4) + 0.5) / 3),
      vx: 36 * Math.cos(angle), vy: 36 * Math.sin(angle), r: CYLINDER.radius,
    }
  })
}
// Vast T: geen extra snelheid door het bewegen van de modelzuiger.
// Dit is een schematische animatie, geen moleculaire drukmeting.
export function moveParticles(particles, volumeMl, seconds = 0) {
  const dt = Math.max(0, Math.min(0.05, seconds))
  const right = pistonX(volumeMl)
  return particles.map(p => {
    let { x, y, vx, vy } = p
    x += vx * dt; y += vy * dt
    if (x < CYLINDER.left + p.r) { x = CYLINDER.left + p.r; vx = Math.abs(vx) }
    if (x > right - p.r) { x = right - p.r; vx = -Math.abs(vx) }
    if (y < CYLINDER.top + p.r) { y = CYLINDER.top + p.r; vy = Math.abs(vy) }
    if (y > CYLINDER.top + CYLINDER.height - p.r) { y = CYLINDER.top + CYLINDER.height - p.r; vy = -Math.abs(vy) }
    return { ...p, x, y, vx, vy }
  })
}

export const GRAPH = Object.freeze({ left: 48, right: 328, top: 32, bottom: 208, maxVolume: 90, maxPressure: 3.5 })
export function graphPoint(volumeMl) {
  const state = gasState(volumeMl)
  return { x: GRAPH.left + volumeMl / GRAPH.maxVolume * (GRAPH.right - GRAPH.left), y: GRAPH.bottom - state.pressureBar / GRAPH.maxPressure * (GRAPH.bottom - GRAPH.top) }
}
export function curvePath() {
  return Array.from({ length: 121 }, (_, i) => {
    const p = graphPoint(MODEL.minVolumeMl + i * 0.5)
    return `${i ? 'L' : 'M'}${p.x.toFixed(3)},${p.y.toFixed(3)}`
  }).join(' ')
}
