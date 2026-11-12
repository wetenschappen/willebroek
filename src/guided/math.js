import katex from 'katex'

// Alleen expliciete delimiters. Gewone tekst blijft tekst (geen HTML-parser).
export function parseMathText(text) {
  const source = String(text ?? '')
  const parts = []
  const delimiter = /\\[()[\]]/g
  let offset = 0
  let match
  while ((match = delimiter.exec(source))) {
    if (match.index > offset) parts.push({ type: 'text', value: source.slice(offset, match.index) })
    if (match[0] !== '\\(' && match[0] !== '\\[') throw new Error('Wiskunde heeft een sluitteken zonder opening')
    const display = match[0] === '\\['
    const closing = display ? '\\]' : '\\)'
    const end = source.indexOf(closing, delimiter.lastIndex)
    if (end < 0) throw new Error('Wiskunde mist een sluitteken')
    const formula = source.slice(delimiter.lastIndex, end).trim()
    if (!formula || /\\[()[\]]/.test(formula)) throw new Error('Lege of geneste wiskundedelimiters')
    // Nederlandse decimalen blijven decimalen, zonder interpunctiespatie.
    const normalized = formula.replace(/(\d),(\d)/g, '$1{,}$2')
    const html = katex.renderToString(normalized, {
      displayMode: display,
      throwOnError: true,
      strict: 'error',
      trust: false,
      output: 'htmlAndMathml',
      maxExpand: 1000,
    })
    parts.push({ type: 'math', formula, display, html })
    offset = end + closing.length
    delimiter.lastIndex = offset
  }
  if (offset < source.length) parts.push({ type: 'text', value: source.slice(offset) })
  return parts
}
