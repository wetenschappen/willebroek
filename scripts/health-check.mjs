#!/usr/bin/env node
/**
 * Scope- en registrycheck voor de Willebroek-repo.
 * Deze schoolrepo bevat uitsluitend fysica en biologie.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = file => fs.readFileSync(path.join(root, file), 'utf8')
const fail = []
const ok = message => console.log(`✓ ${message}`)
const error = message => fail.push(message)

const expectedSubjects = new Set(['physics', 'biology'])
const subjectsSource = read('src/data/subjects.js')
const stateKeys = [...subjectsSource.matchAll(/^\s{2}(\w+):\s*true,?$/gm)].map(match => match[1])
if (new Set(stateKeys).size !== expectedSubjects.size || !stateKeys.every(key => expectedSubjects.has(key))) {
  error(`subjectState moet exact physics en biology bevatten; gevonden: ${stateKeys.join(', ')}`)
} else {
  ok('subjectState bevat alleen physics en biology')
}

const { modules } = await import(pathToFileURL(path.join(root, 'src/data/modules.js')).href)
const moduleIds = new Set(modules.map(module => module.id))
const moduleSubjects = new Set(modules.map(module => module.subject))
if ([...moduleSubjects].some(subject => !expectedSubjects.has(subject))) {
  error(`modules.js bevat een niet-actief vak: ${[...moduleSubjects].join(', ')}`)
} else {
  ok(`${modules.length} registry-items horen bij actieve vakken`)
}

const lessonDir = path.join(root, 'src/lessons')
const lessonFiles = fs.readdirSync(lessonDir)
  .filter(file => /^(fys|bio).*\.js$/.test(file))
  .sort()
const lessonIds = new Set()
const activityTypes = new Set()

// Vraagtypen die src/components/modals/TicketModal.vue kan renderen.
const TICKET_QUESTION_TYPES = new Set(['mc', 'matching', 'open', 'graph-point', 'column-sort'])

/**
 * De gouden ABC-standaard (docs/EVALUATION-DOSSIER-THEMA1.md).
 * Elke les in src/lessons/ moet deze vorm hebben; alleen _archive/ is vrij.
 * Dit is een harde regel: een les die hiervan afwijkt komt de build niet in.
 */
const ABC_SHAPE = {
  A: { title: 'Instap', time: '15 min', cards: ['card-entry', 'card-pres-a'] },
  B: { title: 'Verwerken', time: '30 min', cards: ['card-activity', 'card-pres-b', 'card-workbook'] },
  C: { title: 'Afsluiting', time: '5 min', cards: ['card-pres-c', 'card-exit'] }
}
const ABC_SLIDE_KEYS = { A: 'slidesA', B: 'slidesB', C: 'slidesC' }

function checkAbcStructure(file, lesson) {
  const timeline = lesson.timeline
  if (!timeline || typeof timeline !== 'object') {
    error(`${file}: geen timeline met stepA/stepB/stepC`)
    return
  }
  if (Object.keys(timeline).join(',') !== 'stepA,stepB,stepC') {
    error(`${file}: timeline moet exact stepA, stepB en stepC bevatten; gevonden ${Object.keys(timeline).join(', ') || 'niets'}`)
    return
  }

  for (const [key, expected] of Object.entries(ABC_SHAPE)) {
    const step = timeline[`step${key}`]
    const cards = step.cards || []
    const ids = cards.map(card => card.id)

    if (step.step !== key) error(`${file}: step${key}.step moet '${key}' zijn`)
    if (step.title !== expected.title) error(`${file}: step${key}.title moet '${expected.title}' zijn`)
    if (step.time !== expected.time) error(`${file}: step${key}.time moet '${expected.time}' zijn`)
    if (ids.join(',') !== expected.cards.join(',')) {
      error(`${file}: step${key} moet exact de kaarten ${expected.cards.join(', ')} hebben; gevonden ${ids.join(', ') || 'niets'}`)
    }

    for (const card of cards) {
      if (!card.title) error(`${file}: ${card.id} mist een titel`)
      if (!card.description) error(`${file}: ${card.id} mist een beschrijving`)
      if (card.action === 'presentation') {
        const slideKey = card.slidesKey
        if (slideKey !== ABC_SLIDE_KEYS[key]) {
          error(`${file}: ${card.id} moet slidesKey '${ABC_SLIDE_KEYS[key]}' hebben; gevonden '${slideKey}'`)
        }
        if (!Array.isArray(lesson[slideKey]) || lesson[slideKey].length === 0) {
          error(`${file}: ${slideKey} is leeg of ontbreekt`)
        }
      }
      if (card.action === 'workbook' && !card.exercises) error(`${file}: ${card.id} mist exercises`)
      if (card.action === 'activity' && !card.activityId) error(`${file}: ${card.id} mist activityId`)
      if (card.action === 'activity' && !(lesson.activities || {})[card.activityId]) {
        error(`${file}: ${card.id} verwijst naar activities.${card.activityId}, dat niet bestaat`)
      }
    }
  }

  if (!lesson.config?.title || !lesson.config?.description) {
    error(`${file}: config mist title of description (de lesheader leest die daar)`)
  }
  if (!(lesson.entryTicket?.questions || []).length) error(`${file}: entryTicket mist vragen`)
  if (!(lesson.exitTicket?.questions || []).length) error(`${file}: exitTicket mist vragen`)
}

for (const file of lessonFiles) {
  const lesson = (await import(pathToFileURL(path.join(lessonDir, file)).href)).default
  const expectedId = file.replace(/\.js$/, '')
  if (lesson.id !== expectedId) error(`${file}: id '${lesson.id}' wijkt af van bestandsnaam`)
  if (!expectedSubjects.has(lesson.subject)) error(`${file}: ongeldig subject '${lesson.subject}'`)
  if (!moduleIds.has(lesson.id)) error(`${file}: ontbreekt in modules.js`)
  lessonIds.add(lesson.id)

  const activities = lesson.activities || {}
  for (const activity of Object.values(activities)) {
    if (activity.type) activityTypes.add(activity.type)
  }

  checkAbcStructure(file, lesson)

  // Vraagtypen in de tickets moeten door TicketModal getekend kunnen worden.
  // Een onbekend type levert een leeg scherm op zonder foutmelding.
  for (const [ticketName, ticket] of [['entryTicket', lesson.entryTicket], ['exitTicket', lesson.exitTicket]]) {
    for (const question of (ticket?.questions || [])) {
      if (!TICKET_QUESTION_TYPES.has(question.type)) {
        error(`${file}: ${ticketName} vraag '${question.id}' heeft onbekend type '${question.type}'`)
      }
      if (question.type === 'column-sort') {
        const columns = question.columns || []
        const items = columns.flatMap(column => column.items || [])
        if (columns.length < 2) error(`${file}: ${question.id} heeft minder dan twee kolommen`)
        if (!items.length) error(`${file}: ${question.id} heeft geen kaarten`)
        for (const column of columns) {
          if (!(column.items || []).length) error(`${file}: ${question.id} kolom '${column.id}' is leeg`)
        }
        // Elke kaart moet naar een bestaande kolom verwijzen, anders is de
        // opdracht onmogelijk goed te maken.
        for (const item of items) {
          if (!columns.some(column => column.id === item.column)) {
            error(`${file}: ${question.id} kaart '${item.id}' verwijst naar onbekende kolom '${item.column}'`)
          }
        }
        const itemIds = items.map(item => item.id)
        if (new Set(itemIds).size !== itemIds.length) error(`${file}: ${question.id} heeft dubbele kaart-ids`)
      }
    }
  }
}

if (!fail.some(message => message.includes('step') || message.includes('slidesKey') || message.includes('mist'))) {
  ok(`${lessonFiles.length} lessen volgen de ABC-structuur (kaarten, tijden en slidesleutels)`)
}

const missingFiles = modules
  .filter(module => expectedSubjects.has(module.subject))
  .filter(module => !lessonIds.has(module.id))
if (missingFiles.length) error(`registry-items zonder lesbestand: ${missingFiles.map(module => module.id).join(', ')}`)
else ok(`${lessonFiles.length} fysica-/biologielessen hebben geldige ids en registry-items`)

const registrySource = read('src/composables/useActivitySystem.js')
const mapStart = registrySource.indexOf('const COMPONENT_MAP = {')
const mapEnd = registrySource.indexOf('\n}', mapStart)
const registryKeys = new Set(
  [...registrySource.slice(mapStart, mapEnd).matchAll(/^\s{2}(\w+):/gm)].map(match => match[1])
)
const missingActivities = [...activityTypes].filter(type => !registryKeys.has(type))
if (missingActivities.length) error(`activiteiten zonder registry-component: ${missingActivities.join(', ')}`)
else ok(`alle gebruikte activity-types zijn geregistreerd: ${[...activityTypes].sort().join(', ')}`)

const importedActivityPaths = [...registrySource.matchAll(/import\('\.\.\/\.\.\/([^']+)'\)/g)]
  .map(match => match[1])
  .concat([...registrySource.matchAll(/import\('\.\.\/([^']+)'\)/g)].map(match => `src/${match[1]}`))
for (const activityPath of importedActivityPaths) {
  if (!fs.existsSync(path.join(root, activityPath))) error(`activity-import bestaat niet: ${activityPath}`)
}
if (!fail.some(message => message.startsWith('activity-import'))) ok('alle activity-imports verwijzen naar bestaande bestanden')

const forbiddenRuntimeMarkers = [
  'test-activities',
  'ActivityTester',
  'w-activities',
  "subject: 'math'",
  "subject: 'chemistry'",
  "subject: 'science'"
]
const runtimeFiles = []
function collect(directory) {
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const relative = path.join(directory, entry.name)
    if (entry.isDirectory()) collect(relative)
    else if (/\.(js|vue)$/.test(entry.name)) runtimeFiles.push(relative)
  }
}
collect('src')
for (const file of runtimeFiles) {
  const source = read(file)
  for (const marker of forbiddenRuntimeMarkers) {
    if (source.includes(marker)) error(`${file}: runtime bevat scope-marker '${marker}'`)
  }
}
if (!fail.some(message => message.includes('runtime bevat scope-marker'))) ok('geen wiskunde/chemie/test-playground in actieve runtimecode')

// ── Klasroutes ─────────────────────────────────────────────────────────────
// Elke klas in classesBySubject moet via yearByClass een leerjaar vinden.
// Anders toont die route een lege modulelijst zonder dat iemand het merkt.
const studentsSource = read('src/data/students.js')
const classBlock = studentsSource.match(/classesBySubject = \{([\s\S]*?)\n\}/)
const yearBlock = studentsSource.match(/yearByClass = \{([\s\S]*?)\n\}/)
if (!classBlock || !yearBlock) {
  error('students.js: classesBySubject of yearByClass niet gevonden')
} else {
  const yearsFor = new Map(
    [...yearBlock[1].matchAll(/'([^']+)':\s*(\d+)/g)].map(match => [match[1], Number(match[2])])
  )
  const mappedClasses = []
  for (const match of classBlock[1].matchAll(/(\w+):\s*\[([^\]]*)\]/g)) {
    for (const idMatch of match[2].matchAll(/'([^']+)'/g)) mappedClasses.push(idMatch[1])
  }
  const unmapped = mappedClasses.filter(id => !yearsFor.has(id))
  if (unmapped.length) {
    error(`klas zonder leerjaar in yearByClass: ${unmapped.join(', ')}`)
  } else {
    ok(`${new Set(mappedClasses).size} klassen hebben een leerjaar in yearByClass`)
  }

  // Rapporteer klassen die nog geen lessen hebben. Dat is toegestaan, maar het
  // moet zichtbaar zijn: zo'n klas toont een lege modulelijst.
  const yearsWithLessons = new Set(modules.map(module => `${module.subject}:${module.year}`))
  const subjectOfClass = {}
  for (const match of classBlock[1].matchAll(/(\w+):\s*\[([^\]]*)\]/g)) {
    for (const idMatch of match[2].matchAll(/'([^']+)'/g)) subjectOfClass[idMatch[1]] = match[1]
  }
  const emptyClasses = [...new Set(mappedClasses)].filter(
    id => !yearsWithLessons.has(`${subjectOfClass[id]}:${yearsFor.get(id)}`)
  )
  if (emptyClasses.length) {
    console.log(`  · klassen zonder lessen (tonen de lege staat): ${emptyClasses.join(', ')}`)
  }
}

// ── Design language (docs/DESIGN-SYSTEM.md, Deel II) ──────────────────────
// Ratchet: nieuwe overtredingen blokkeren, bestaande schuld staat in
// scripts/design-baseline.json en mag alleen naar beneden.
const { runDesignCheck } = await import(pathToFileURL(path.join(root, 'scripts/design-check.mjs')).href)
const design = runDesignCheck()
if (design.regressions.length) {
  for (const r of design.regressions) {
    error(`design: ${r.rule.label} — ${r.baseline} → ${r.current} (${r.files.slice(0, 4).join(', ')}${r.files.length > 4 ? ', …' : ''})`)
  }
} else {
  const total = design.allRules.reduce((sum, rule) => sum + (design.counts[rule.id] || 0), 0)
  ok(`geen nieuwe design-overtredingen; ${total} bestaande gevallen in de baseline`)
}
if (design.improvements.length) {
  for (const i of design.improvements) {
    console.log(`  · design ${i.rule.id}: ${i.baseline} → ${i.current} — verlaag de baseline`)
  }
}

if (fail.length) {
  console.error('\nHealth check mislukt:')
  for (const message of fail) console.error(`✗ ${message}`)
  process.exitCode = 1
} else {
  console.log('\nHealth check geslaagd.')
}
