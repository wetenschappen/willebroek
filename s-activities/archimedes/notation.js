import { processMathText } from '../../src/composables/useMathEngine.js'
// Only trusted, authored task text reaches v-html; no learner input is rendered.
export function renderNotation(text) {
  return processMathText(text.replace(/F_A|F_G|V_vl|V_ond|V_vw|ρ_vl|ρ_vw/g, token => {
    const [letter, sub] = token.split('_')
    return `\\( ${letter === 'ρ' ? '\\rho' : letter}_{\\mathrm{${sub}}} \\)`
  }))
}
