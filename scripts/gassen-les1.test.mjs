import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { HEATING, TEMPERATURE_PRESETS, HEAT_GRAPH, heatingState, boundedTemperature, representativeSpeed, makeHeatingParticles, moveHeatingParticles, heatingGraphPoint, heatingLine } from '../src/gassen/heating-model.js'
import { MODEL, MOLES, CYLINDER, pistonX } from '../src/gassen/compression-model.js'
import { lesson, steps, STORAGE_KEY } from '../src/gassen/lesson.js'
import { steps as pilotSteps, lesson as pilotLesson, STORAGE_KEY as pilotKey } from '../src/gassen/compression-pilot.js'
import { createProgressSystem } from '../src/guided/progress.js'
import { questionFeedback } from '../src/guided/feedback.js'
import { STORAGE_KEY as basicKey } from '../src/energie-basis/progress.js'
import { STORAGE_KEY as energyKey } from '../src/energie/progress.js'
import { STORAGE_KEY as bioKey } from '../src/celmetabolisme/progress.js'
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-10, `${a} != ${b}`)
const progress = createProgressSystem(lesson, steps, STORAGE_KEY)

test('opwarming: SI, p/T constant, exacte basis- en uitbreidingswaarden', () => {
  assert.deepEqual(TEMPERATURE_PRESETS, [300, 360, 450])
  for (const [t, p, c] of [[300, 1, 27], [360, 1.2, 87], [450, 1.5, 177], [600, 2, 327], [293, 293/300, 20], [313, 313/300, 40]]) {
    const state = heatingState(t)
    close(state.pressureBar, p)
    close(state.pressurePa * state.volumeM3, MOLES * MODEL.gasConstant * t)
    close(state.pressureBar / t, 1/300)
    assert.equal(state.celsius, c)
    assert.equal(state.moles, MOLES)
    assert.equal(state.volumeMl, 60)
  }
  close(heatingState(313).pressureBar / heatingState(293).pressureBar, 313/293)
  assert.notEqual(heatingState(313).pressureBar / heatingState(293).pressureBar, 2)
  close(2 * heatingState(360).pressureBar / heatingState(300).pressureBar, 2.4)
  close(heatingState(330).pressureBar / heatingState(300).pressureBar, 1.1)
})

test('opwarming: geen bedienbare 0 K; rechte, stip en SI-druk stemmen overeen', () => {
  for (const t of [0, -1, 272, 601, Infinity, NaN, '300', null]) assert.throws(() => heatingState(t), RangeError)
  assert.equal(boundedTemperature(NaN), 300)
  assert.equal(boundedTemperature(20), 273)
  assert.equal(boundedTemperature(1000), 600)
  assert.equal(boundedTemperature(313.6), 314)
  assert.deepEqual(heatingGraphPoint(0), { x: HEAT_GRAPH.left, y: HEAT_GRAPH.bottom })
  assert.throws(() => heatingGraphPoint(-1), RangeError)
  for (let t = HEATING.minK; t <= HEATING.maxK; t++) {
    const point = heatingGraphPoint(t)
    close((HEAT_GRAPH.bottom-point.y)/(HEAT_GRAPH.bottom-HEAT_GRAPH.top)*HEAT_GRAPH.maxBar, heatingState(t).pressureBar)
    assert.ok(point.x >= HEAT_GRAPH.left && point.x <= HEAT_GRAPH.right && point.y >= HEAT_GRAPH.top && point.y <= HEAT_GRAPH.bottom)
  }
  const a=heatingGraphPoint(300), b=heatingGraphPoint(450), c=heatingGraphPoint(600)
  close((a.x+c.x)/2,b.x);close((a.y+c.y)/2,b.y)
  assert.doesNotMatch(heatingLine(0,273)+heatingLine(273,600), /NaN|Infinity/)
})

test('opwarming: twaalf even grote deeltjes in dezelfde ruimte, snelheid schaalt met wortel T', () => {
  let particles=makeHeatingParticles()
  const ids=particles.map(p=>p.id)
  for (let i=0; i<300; i++) {
    const t=i%2?300:600
    particles=moveHeatingParticles(particles,t,.025)
    assert.deepEqual(particles.map(p=>p.id),ids)
    assert.equal(particles.length,12)
    for (const p of particles) {
      assert.equal(p.r,4)
      close(Math.hypot(p.vx,p.vy),representativeSpeed(t))
      assert.ok(p.x>=CYLINDER.left+p.r && p.x<=pistonX(60)-p.r)
      assert.ok(p.y>=CYLINDER.top+p.r && p.y<=CYLINDER.top+CYLINDER.height-p.r)
    }
  }
  close(representativeSpeed(600)/representativeSpeed(300),Math.sqrt(2))
})

test('les 1: hergebruikt compressie zonder proefdata te veranderen; geen nieuwe theorie vóór overgang', () => {
  assert.equal(steps.length,14)
  assert.equal(pilotSteps.length,6)
  assert.deepEqual(steps.slice(0,5),pilotSteps.slice(0,5))
  assert.notEqual(steps[0],pilotSteps[0])
  assert.equal(pilotSteps[5].next,'Bekijk de afronding van het proefblok')
  for (const i of [5,11]) {
    assert.equal(steps[i].type,'read')
    assert.match(steps[i].instructions[0],/leerkracht/)
    assert.match(steps[i].note,/bevestigt niet/)
    assert.match(steps[i].next,/Samen|samen/)
  }
  assert.match(steps[6].instructions[0],/gezamenlijke start/)
  assert.match(steps[12].instructions[0],/gezamenlijke start/)
})

test('les 1: alle verplichte delen p. 1–5, slot individueel zonder automatische antwoorden', () => {
  assert.equal(new Set(steps.map(s=>s.id)).size,14)
  for (const s of steps) {
    assert.ok(s.source && s.section && s.title && s.next)
    if (s.type==='work') { assert.equal(s.completion,'button');assert.equal(s.checks,undefined) }
  }
  for (const [exercise,page,parts] of [['1',2,['a','b','c']],['2',4,['a','b','c']],['slotvraag',5,['a','b','c']]]) {
    const s=steps.find(s=>s.exercise===exercise)
    assert.equal(s.page,page);assert.deepEqual(s.parts,parts)
  }
  for (const exercise of ['A0','A1','besluit-A','B0','B1','besluit-B','V1-V2']) assert.ok(steps.some(s=>s.exercise===exercise))
  const exit=steps.at(-1)
  assert.equal(exit.type,'work')
  assert.equal(exit.answer,undefined)
  assert.match(exit.instructions[0],/individueel.*Formulehulp.*mag/)
  assert.match(exit.note,/geen automatische slotvraagscore/)
  assert.match(lesson.duration,/les 2/)
  assert.match(lesson.completion.work,/niet automatisch nagekeken/)
  assert.equal(steps.some(s=>s.exercise==='3'),false)
})

test('kelvinvraag: elk fout antwoord krijgt eigen inhoudelijke feedback met bron', () => {
  const q=steps[8]
  assert.equal(q.type,'quiz');assert.equal(q.answer,2)
  assert.equal(q.options.length,4);assert.equal(q.feedbackByOption.length,4)
  const wrong=[0,1,3].map(last=>questionFeedback(q,{last}))
  assert.equal(new Set(wrong).size,3)
  assert.match(wrong[0],/Celsiusgetallen/)
  assert.match(wrong[1],/B1.*druk steeg/)
  assert.match(wrong[2],/star.*B1/)
  assert.match(questionFeedback(q,{last:2}),/313\/293/)
})

test('les 1: volledige route, twee eerste pogingen, papier niet automatisch juist, herstel', () => {
  let state=progress.freshProgress()
  for (const step of steps) {
    if (step.type==='quiz') {
      assert.equal(progress.canAdvance(state,step),false)
      state=progress.answerQuestion(state,step,(step.answer+1)%4)
      state=progress.answerQuestion(state,step,step.answer)
    }
    const before=state.completed.length
    state=progress.advance(state)
    assert.equal(state.completed.length,before+1)
  }
  assert.equal(state.completed.length,14)
  assert.deepEqual(progress.firstTrySummary(state,s=>s.final),{correct:0,total:2,assisted:0})
  assert.equal(state.responses['gassen-slotvraag'],undefined)
  assert.deepEqual(state.workChecks,{})
  assert.deepEqual(progress.restoreProgress(JSON.parse(JSON.stringify(state))),state)
  assert.deepEqual(progress.restoreProgress({version:pilotLesson.id,completed:pilotSteps.map(s=>s.id)}),progress.freshProgress())
})

test('les 1: opslag/reset blijven los van proefblok, energie en biologie', () => {
  const otherKeys=[pilotKey,basicKey,energyKey,bioKey]
  assert.equal(new Set([STORAGE_KEY,...otherKeys]).size,5)
  const values=new Map(otherKeys.map(key=>[key,`bewaard:${key}`]))
  const store={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)}
  const state=progress.advance(progress.freshProgress())
  progress.saveProgress(store,state)
  assert.deepEqual(progress.loadProgress(store).state,state)
  progress.saveProgress(store,progress.freshProgress())
  for(const key of otherKeys)assert.equal(values.get(key),`bewaard:${key}`)
  assert.equal(progress.loadProgress(undefined).available,false)
})

test('opwarming: modelgrenzen zichtbaar, voorkeuren/animatieopruiming en eigen ingang', () => {
  const component=readFileSync(new URL('../src/gassen/HeatingLab.vue',import.meta.url),'utf8')
  assert.match(component,/onUnmounted/)
  assert.match(component,/visibilitychange/)
  assert.match(component,/prefers-reduced-motion/)
  assert.match(component,/geen proef bij 0 K/)
  assert.match(component,/niet uit getelde botsingen/)
  assert.match(component,/opnieuw op 300 K/)
  assert.match(component,/geen echte verwarmingsproef/)
  const wrapper=readFileSync(new URL('../src/gassen/GasLesson.vue',import.meta.url),'utf8')
  assert.match(wrapper,/import GuidedPath/)
  assert.doesNotMatch(wrapper,/createProgressSystem|localStorage/)
})
