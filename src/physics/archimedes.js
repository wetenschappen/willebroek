// SI throughout. Uniform, incompressible fluid; rigid body; air buoyancy and drag
// neglected in liquid models. A held body is NOT assumed to be in free fall.
export const G_EARTH = 9.81

function positive(value, name, allowZero = false) {
  if (!Number.isFinite(value) || (allowZero ? value < 0 : value <= 0)) throw new RangeError(`Ongeldige ${name}`)
  return value
}

export function buoyancy(rho, g, displacedVolume) {
  return positive(rho, 'massadichtheid') * positive(g, 'zwaarteveldsterkte') * positive(displacedVolume, 'volume', true)
}

export function hydrostaticPressure(rho, g, depth) {
  return positive(rho, 'massadichtheid') * positive(g, 'zwaarteveldsterkte') * positive(depth, 'diepte', true)
}

export function heldBody({ rhoFluid = 1000, rhoObject = 500, volume = 0.001, fraction = 1, topDepth = 0.2, g = G_EARTH } = {}) {
  positive(volume, 'voorwerpvolume')
  positive(rhoObject, 'voorwerpdichtheid')
  positive(topDepth, 'diepte', true)
  if (!Number.isFinite(fraction) || fraction < 0 || fraction > 1) throw new RangeError('Onderdompeling moet tussen 0 en 1 liggen')
  const side = Math.cbrt(volume)
  const area = side ** 2
  const submergedVolume = volume * fraction
  // For partial immersion the upper face is above the water: use gauge pressure
  // zero there, and the immersed height below the free surface at the bottom.
  const h1 = fraction < 1 ? 0 : topDepth
  const h2 = h1 + side * fraction
  const p1 = hydrostaticPressure(rhoFluid, g, h1)
  const p2 = hydrostaticPressure(rhoFluid, g, h2)
  const mass = rhoObject * volume
  const FG = mass * g
  const FA = buoyancy(rhoFluid, g, submergedVolume)
  // resultant = buoyancy + gravity: the force immediately AFTER releasing.
  // While held, the extra holdingForce cancels it; the actual total is zero.
  return { rhoFluid, rhoObject, volume, fraction, topDepth, g, side, area, h1, h2, p1, p2, F1: p1 * area, F2: p2 * area, submergedVolume, displacedVolume: submergedVolume, displacedMass: rhoFluid * submergedVolume, mass, FG, FA, resultant: FA - FG, holdingForce: FG - FA }
}

export function releasedBody(options = {}) {
  const full = heldBody({ ...options, fraction: 1 })
  const tolerance = Math.max(full.FG, full.FA) * 1e-10
  if (Math.abs(full.resultant) < tolerance) return { ...full, behavior: 'zweeft' }
  if (full.resultant < 0) return { ...full, behavior: 'zinkt' }
  // Final floating equilibrium, not the initial upward-accelerating state.
  return { ...heldBody({ ...options, fraction: full.rhoObject / full.rhoFluid }), behavior: 'drijft' }
}

export function suspendedWeight(weightInAir, FA) {
  positive(weightInAir, 'gewicht', true)
  positive(FA, 'archimedeskracht', true)
  if (FA > weightInAir) throw new RangeError('Een touw van boven kan niet naar beneden duwen')
  return weightInAir - FA
}

export function floatingVolume(mass, rhoFluid) {
  return positive(mass, 'massa') / positive(rhoFluid, 'vloeistofdichtheid')
}

export function gasLift({ density = 1.293, volume, totalMass, g = G_EARTH }) {
  const FA = buoyancy(density, g, volume)
  positive(totalMass, 'totale massa', true)
  const FG = totalMass * g
  return { FA, FG, resultant: FA - FG, maxTotalMass: density * volume }
}

export function format(value, decimals = 2) {
  return value.toLocaleString('nl-BE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}
