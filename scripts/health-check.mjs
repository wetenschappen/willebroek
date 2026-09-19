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

if (fail.length) {
  console.error('\nHealth check mislukt:')
  for (const message of fail) console.error(`✗ ${message}`)
  process.exitCode = 1
} else {
  console.log('\nHealth check geslaagd.')
}
