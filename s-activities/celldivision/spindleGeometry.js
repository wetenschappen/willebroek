// ChromosomeGlyph has its long axis along local y. At metaphase that
// axis is perpendicular to the spindle axis, not parallel to it.
const orientations = {
  horizontal: { metaphase: 0, anaphase: [180, 0] },
  vertical: { metaphase: 90, anaphase: [-90, 90] }
}

function forAxis(axis) {
  if (!Object.hasOwn(orientations, axis)) throw new Error(`Unknown spindle axis: ${axis}`)
  return orientations[axis]
}

export function metaphaseRotation(axis) {
  return forAxis(axis).metaphase
}

// The single-chromatid glyph leads with its centromere towards local +x.
// poleIndex 0 is left/top; poleIndex 1 is right/bottom.
export function anaphaseRotation(axis, poleIndex) {
  if (poleIndex !== 0 && poleIndex !== 1) throw new Error(`Unknown pole: ${poleIndex}`)
  return forAxis(axis).anaphase[poleIndex]
}

// In this one-crossing-over model, the exchanged segments are on the
// right maternal sister and the left paternal sister. Keep that identity
// unchanged from the tetrad through anaphase II to the daughter cells.
export function recombinantSisterIndex(origin) {
  if (origin !== 'M' && origin !== 'P') throw new Error(`Unknown chromosome origin: ${origin}`)
  return origin === 'M' ? 1 : 0
}
