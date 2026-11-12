import test from 'node:test'
import assert from 'node:assert/strict'
import { parseMathText } from '../src/guided/math.js'
import { lesson as energy, steps as energySteps } from '../src/energie/lesson.js'
import { lesson as biology, steps as biologySteps } from '../src/celmetabolisme/lesson.js'
import { lesson as basic, steps as basicSteps } from '../src/energie-basis/lesson.js'

const tex = String.raw

function* strings(value) {
  if (typeof value === 'string') yield value
  else if (Array.isArray(value)) for (const item of value) yield* strings(item)
  else if (value && typeof value === 'object') for (const item of Object.values(value)) yield* strings(item)
}

test('begeleide wiskunde: inline en blokformules geven KaTeX én toegankelijke MathML', () => {
  const parts = parseMathText(tex`Gebruik \(g=9,81\,\mathrm{N/kg}\). Dan \[E=\frac{mv^2}{2}\] Klaar.`)
  assert.deepEqual(parts.filter(part => part.type === 'text').map(part => part.value), ['Gebruik ', '. Dan ', ' Klaar.'])
  const math = parts.filter(part => part.type === 'math')
  assert.deepEqual(math.map(part => part.display), [false, true])
  for (const part of math) {
    assert.match(part.html, /class="katex/)
    assert.match(part.html, /<math/)
    assert.match(part.html, /<annotation encoding="application\/x-tex">/)
    assert.doesNotMatch(part.html, /katex-error/)
  }
  assert.match(math[0].html, /9\{,\}81/)
})

test('begeleide wiskunde: ongeldige formules en delimiters worden niet stil plat weergegeven', () => {
  for (const source of [tex`\(x`, tex`x\)`, tex`\[x\)`, tex`\(\)`, tex`\(\nietbestaand{a}\)`, tex`\(\frac{a}\)`, tex`\(x\[y\]\)`]) {
    assert.throws(() => parseMathText(source), undefined, source)
  }
})

test('begeleide wiskunde: gewone tekst is geen HTML en valuta zijn geen formule', () => {
  const source = '<img src=x onerror=alert(1)> & € 5 / $ 5'
  assert.deepEqual(parseMathText(source), [{ type: 'text', value: source }])
  assert.deepEqual(parseMathText(''), [])
  assert.deepEqual(parseMathText(null), [])
  const untrusted = parseMathText(tex`\(\text{<script>alert(1)</script>}\)`)[0].html
  assert.doesNotMatch(untrusted, /<script>|onerror=/)
})

test('begeleide wiskunde: alle tekstvelden van alle routes compileren strikt', () => {
  let formulas = 0
  for (const content of [energy, energySteps, biology, biologySteps, basic, basicSteps]) {
    for (const source of strings(content)) {
      const parts = parseMathText(source)
      formulas += parts.filter(part => part.type === 'math').length
      for (const part of parts.filter(part => part.type === 'text')) assert.doesNotMatch(part.value, /\\[()[\]]/)
    }
  }
  assert.ok(formulas > 60, `${formulas} formules gecontroleerd`)
})
