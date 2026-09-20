#!/usr/bin/env node
/**
 * Design-language check voor de Willebroek-repo.
 *
 * Bron van waarheid: docs/DESIGN-SYSTEM.md (Deel II).
 *
 * Deze check werkt met een RATCHET. De bestaande designschool staat in
 * scripts/design-baseline.json. Nieuwe overtredingen laten de check zakken;
 * bestaande schuld wordt gerapporteerd maar blokkeert de build niet.
 * Ruim je schuld op, verlaag dan de baseline in dezelfde commit.
 *
 * Draai los:  node scripts/design-check.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const baselinePath = path.join(root, 'scripts/design-baseline.json')
const baselineFilesPath = path.join(root, 'scripts/design-baseline-files.json')

/** Eén regel per verboden patroon. `pattern` telt voorkomens. */
export const RULES = [
  { id: 'pale-400', label: 'text-slate-400 — 3.9:1, onleesbaar op een beamer', pattern: /text-slate-400/g },
  { id: 'pale-300', label: 'text-slate-300 — 1.7:1, onleesbaar op een beamer', pattern: /text-slate-300/g },
  { id: 'ink-muted', label: 'ink-muted — verwijderde token, gebruik --color-ink-soft', pattern: /ink-muted/g },
  { id: 'serif', label: 'font-serif — derde lettertype, het systeem heeft één fontpaar', pattern: /font-serif/g },
  { id: 'open-sans', label: "Open Sans — nooit geladen, valt terug op de browserdefault", pattern: /Open Sans/g },
  { id: 'blur', label: 'backdrop-blur — geen blur in de lesinterface', pattern: /backdrop-blur/g },
  { id: 'pulse', label: 'animate-pulse — actieve toestand hoort statisch te zijn', pattern: /animate-pulse/g },
  { id: 'bounce', label: 'bounce-animatie — geen bounce in de lesinterface', pattern: /animate-bounce|animate-\[bounce/g },
  { id: 'ping', label: 'ping-animatie — geen ping in de lesinterface', pattern: /animate-ping|animate-\[ping/g },
  { id: 'shadow-2xl', label: 'shadow-2xl — gebruik --shadow-dialog', pattern: /shadow-2xl/g },
  { id: 'emoji', label: 'emoji als UI-element', pattern: /[\u{1F000}-\u{1F0FF}\u{1F300}-\u{1FAFF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}\u{25A0}-\u{25FF}\u{2B00}-\u{2BFF}\u{FE0F}]/gu }
]

/**
 * Donkere leesvlakken. Een klein donker element (navigatiebalk, knop, marker)
 * is toegestaan en zelfs gewenst; een donker schermvullend vlak is onleesbaar
 * tegen een witte muur. We kijken daarom alleen naar de root van een
 * slide-component en naar schermvullende overlays.
 */
const DARK_SURFACE = /bg-(black|slate-900|slate-950)/

// Deze regels gelden uitsluitend voor het geschaalde 1920×1080-slidecanvas.
// App-controls in PresentationModal mogen schermmaten gebruiken; student-facing
// slide-inhoud niet.
const PRESENTATION_RULES = [
  {
    id: 'presentation-app-scale',
    label: 'app-schaal in een presentation slide — gebruik slide-*',
    pattern: /\btext-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/g
  },
  {
    id: 'presentation-badge',
    label: 'decoratieve badge in een presentatie',
    pattern: /\b(?:badge|fullscreen-label)\b/g
  },
  {
    id: 'presentation-legacy-palette',
    label: 'legacy amber/emerald-palet in een presentatie',
    pattern: /\b(?:amber|emerald)-(?:\d{2,3}|\d{2,3}\/\d{1,3})\b/g
  },
  {
    id: 'presentation-invalid-shade',
    label: 'ongeldige Tailwind-kleurshade in een presentatie',
    pattern: /\b(?:slate|amber|emerald)-(?:250|450|650|750|850)\b/g
  }
]

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const relative = path.posix.join(directory.split(path.sep).join('/'), entry.name)
    if (entry.isDirectory()) walk(relative, files)
    else if (/\.(vue|js)$/.test(entry.name)) files.push(relative)
  }
  return files
}

/** Vindt donkere schermvullende leesvlakken. */
function findDarkSurfaces(file, source) {
  const hits = []
  const isSlide = /^src\/components\/presentation\/Slide.*\.vue$/.test(file)

  if (isSlide) {
    // De root-div van een slide is het leesvlak.
    const rootTag = source.match(/<template>[\s\S]{0,400}?<div[^>]*class="([^"]*)"/)
    if (rootTag && DARK_SURFACE.test(rootTag[1])) {
      hits.push('donkere slide-root')
    }
  }

  // Schermvullende overlay met een donkere achtergrond.
  for (const match of source.matchAll(/class="([^"]*)"/g)) {
    const cls = match[1]
    if (/fixed inset-0|w-screen h-screen/.test(cls) && DARK_SURFACE.test(cls)) {
      hits.push('donker schermvullend vlak')
      break
    }
  }

  return hits
}

export function runDesignCheck(saveBaselineFiles = false) {
  const files = [...walk('src'), ...walk('s-activities')]
  const counts = {}
  const locations = {}
  for (const rule of RULES) {
    counts[rule.id] = 0
    locations[rule.id] = new Set()
  }

  for (const rule of PRESENTATION_RULES) {
    counts[rule.id] = 0
    locations[rule.id] = new Set()
  }

  for (const file of files) {
    const source = fs.readFileSync(path.join(root, file), 'utf8')
    for (const rule of RULES) {
      rule.pattern.lastIndex = 0
      const found = source.match(rule.pattern)
      if (found) {
        counts[rule.id] += found.length
        locations[rule.id].add(file)
      }
    }

    // Alleen classes in student-facing slidecomponents vallen onder deze
    // extra schaalregels; de bediening buiten het stage-canvas niet.
    if (file.startsWith('src/components/presentation/')) {
      const classSource = [...source.matchAll(/class="([^"]*)"/g)]
        .map(match => match[1])
        .join(' ')
      for (const rule of PRESENTATION_RULES) {
        rule.pattern.lastIndex = 0
        const found = classSource.match(rule.pattern)
        if (found) {
          counts[rule.id] += found.length
          locations[rule.id].add(file)
        }
      }
    }
    const dark = findDarkSurfaces(file, source)
    if (dark.length) {
      counts.dark = (counts.dark || 0) + dark.length
      locations.dark = locations.dark || new Set()
      locations.dark.add(file)
    }
  }

  const baseline = fs.existsSync(baselinePath)
    ? JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
    : {}
  const baselineFiles = fs.existsSync(baselineFilesPath)
    ? JSON.parse(fs.readFileSync(baselineFilesPath, 'utf8'))
    : {}
  const regressions = []
  const improvements = []

  const allRules = [
    ...RULES,
    ...PRESENTATION_RULES,
    { id: 'dark', label: 'donker schermvullend leesvlak op een projector' }
  ]
  for (const rule of allRules) {
    const current = counts[rule.id] || 0
    const base = baseline[rule.id] ?? 0
    if (current > base) {
      // Toon de bestanden die nieuw zijn t.o.v. de baseline, niet de alfabetische top.
      const known = new Set(baselineFiles[rule.id] || [])
      const files = [...(locations[rule.id] || [])].sort()
      const fresh = files.filter(file => !known.has(file))
      regressions.push({
        rule,
        current,
        baseline: base,
        files: fresh.length ? fresh : files
      })
    } else if (current < base) {
      improvements.push({ rule, current, baseline: base })
    }
  }

  if (saveBaselineFiles) {
    const snapshot = {}
    for (const rule of allRules) {
      snapshot[rule.id] = [...(locations[rule.id] || [])].sort()
    }
    fs.writeFileSync(baselineFilesPath, JSON.stringify(snapshot, null, 2) + '\n')
  }

  return { counts, locations, baseline, regressions, improvements, allRules, fileCount: files.length }
}
// ── Standalone rapport ──────────────────────────────────────────────────────
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, '/')}`).href) {
  const { counts, baseline, regressions, improvements, allRules, fileCount } = runDesignCheck()
  console.log(`Design-check over ${fileCount} runtimebestanden\n`)
  for (const rule of allRules) {
    const current = counts[rule.id] || 0
    const base = baseline[rule.id] ?? 0
    const mark = current > base ? '✗' : current < base ? '·' : ' '
    console.log(`${mark} ${String(current).padStart(4)} / ${String(base).padEnd(4)}  ${rule.label}`)
  }
  if (improvements.length) {
    console.log('\nVerbeterd — verlaag de baseline in scripts/design-baseline.json:')
    for (const i of improvements) console.log(`  ${i.rule.id}: ${i.baseline} → ${i.current}`)
  }
  if (regressions.length) {
    console.error('\nNieuwe overtredingen:')
    for (const r of regressions) {
      console.error(`  ✗ ${r.rule.label}: ${r.baseline} → ${r.current}`)
      for (const f of r.files.slice(0, 12)) console.error(`      ${f}`)
    }
    process.exitCode = 1
  }
}
