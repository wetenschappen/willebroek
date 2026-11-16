#!/usr/bin/env node
// Eerst npm run build. Node 22+ en Chrome (of CHROME_PATH).
import assert from 'node:assert/strict'
import { setTimeout as delay } from 'node:timers/promises'
import { runBrowser } from './lib/browser-harness.mjs'
import { lesson, steps, STORAGE_KEY } from '../src/gassen/lesson.js'
import { lesson as pilot, steps as pilotSteps, STORAGE_KEY as pilotKey } from '../src/gassen/compression-pilot.js'
import { createProgressSystem } from '../src/guided/progress.js'
import { heatingState, heatingGraphPoint } from '../src/gassen/heating-model.js'
import { formatNumber } from '../src/gassen/compression-model.js'
import { parseMathText } from '../src/guided/math.js'
import { questionFeedback } from '../src/guided/feedback.js'
import * as basic from '../src/energie-basis/progress.js'
import * as energy from '../src/energie/progress.js'
import * as biology from '../src/celmetabolisme/progress.js'

const progress=createProgressSystem(lesson,steps,STORAGE_KEY)
const pilotProgress=createProgressSystem(pilot,pilotSteps,pilotKey)
const path='gassen/'
await runBrowser('gassen-les1',async({command,evaluate,action,click,screenshot,waitFor,visit,exceptions})=>{
  const saved=()=>evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`)
  const title=()=>evaluate(`document.querySelector('h1').textContent`)
  const resize=width=>command('Emulation.setDeviceMetricsOverride',{width,height:width>600?768:844,deviceScaleFactor:1,mobile:width<=600})
  const next=()=>action(`(()=>{const e=document.querySelector('.guided-footer .btn-primary');if(!e||e.disabled)throw Error('Geblokkeerd');e.click()})()`)
  async function layout(label){
    await evaluate('document.fonts.ready')
    assert.deepEqual(await evaluate(`(()=>{
      const errors=[],main=document.querySelector('main');
      if(document.documentElement.scrollWidth>innerWidth+1||main.scrollWidth>main.clientWidth+1)errors.push('horizontale overloop');
      if(document.querySelector('.katex-error,.guided-math-error'))errors.push('formulefout');
      for(const e of document.querySelectorAll('button,input,.katex-html')){
        if(!e.getClientRects().length)continue;const r=e.getBoundingClientRect();
        if(r.left< -1||r.right>innerWidth+1)errors.push(e.className||e.tagName);
      }
      return errors;
    })()`),[],label)
  }
  async function mobile(label){for(const width of [390,320]){await resize(width);await layout(`${label} ${width}`)}}
  async function heat(t){
    assert.equal(await evaluate(`document.querySelector('[data-testid=temperature]').textContent`),String(t))
    assert.equal(await evaluate(`document.querySelector('[data-testid=heat-pressure]').textContent`),formatNumber(heatingState(t).pressureBar))
    assert.equal(await evaluate(`document.querySelector('.heat-celsius').textContent`),`(${t-273} °C)`)
    assert.equal(await evaluate(`document.querySelectorAll('.heat-particle').length`),12)
    assert.deepEqual(await evaluate(`[...new Set([...document.querySelectorAll('.heat-particle')].map(e=>e.getAttribute('r')))]`),['4'])
    assert.deepEqual(await evaluate(`['x','y','width','height'].map(a=>document.querySelector('.heat-wall').getAttribute(a))`),['60','65','322.5','120'])
    const dot=heatingGraphPoint(t)
    const actual=await evaluate(`(()=>{const e=document.querySelector('[data-testid=heat-graph-dot]');return {x:+e.getAttribute('cx'),y:+e.getAttribute('cy')}})()`)
    assert.ok(Math.abs(actual.x-dot.x)<1e-8&&Math.abs(actual.y-dot.y)<1e-8)
  }
  async function exact(value){await action(`(()=>{const e=document.querySelector('#gas-temperature-exact');e.value=${JSON.stringify(String(value))};e.dispatchEvent(new Event('change',{bubbles:true}))})()`)}

  await resize(1366)
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]})
  await visit(path)
  assert.equal(await evaluate('document.title'),'Gastoestandsveranderingen — les 1 · 6ELTE / 6IICT')
  await screenshot('01-start-desktop')
  const originals=[
    [pilotKey,pilotProgress.advance(pilotProgress.freshProgress())],
    [basic.STORAGE_KEY,basic.advance(basic.freshProgress())],
    [energy.STORAGE_KEY,energy.advance(energy.freshProgress())],
    [biology.STORAGE_KEY,biology.advance(biology.freshProgress())],
  ]
  for(const[key,value]of originals)await action(`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(JSON.stringify(value))})`)
  await click('Start het leerpad')
  for(let i=0;i<6;i++){
    assert.equal(await title(),steps[i].title)
    assert.equal(await evaluate(`document.activeElement===document.querySelector('h1')`),true)
    if(steps[i].type==='quiz'){
      await action(`document.querySelectorAll('input[type=radio]')[${steps[i].answer}].click()`)
      await click('Controleer mijn antwoord')
    }
    await mobile(`compressie ${i}`)
    await next()
  }
  assert.equal(await title(),steps[6].title)
  assert.equal((await saved()).completed.includes(steps[6].id),false)
  assert.equal(await evaluate(`document.querySelectorAll('.heating-lab').length`),0,'voorspellen zonder model')
  await mobile('B0')
  await click('Pauzeren')
  await command('Page.reload')
  await waitFor(()=>evaluate(`!!document.querySelector('.guided-sheet h1')`),'herladen B0')
  await click('Ga verder waar je gebleven was')
  assert.equal(await title(),steps[6].title)
  await next()
  assert.equal(await title(),steps[7].title)
  await resize(1366)
  await heat(300)
  await action(`window.__heatFrames=0;const heatRAF=window.requestAnimationFrame;window.requestAnimationFrame=fn=>heatRAF(t=>{window.__heatFrames++;fn(t)})`)
  await action(`document.querySelector('.heating-lab').scrollIntoView({block:'start'})`)
  await screenshot('02-opwarming-desktop')
  for(const t of [360,450,300]){await click(`${t} K`);await heat(t)}
  for(const t of [293,313,600]){await exact(t);await heat(t)}
  for(const invalid of [0,601,300.5,'']){
    await exact(invalid);await heat(600)
    assert.equal(await evaluate(`document.querySelector('#gas-temperature-exact').getAttribute('aria-invalid')`),'true')
    assert.match(await evaluate(`document.querySelector('#heat-entry-error').textContent`),/vorige stand blijft behouden/)
    assert.equal(await evaluate(`document.querySelector('#gas-temperature-exact').value`),'600')
  }
  await click('Beginstand herstellen');await heat(300)
  assert.equal(await evaluate(`document.querySelectorAll('#heat-entry-error').length`),0)
  // Echte toetsaanslagen voor exact veld en native slider.
  await action(`document.querySelector('#gas-temperature-exact').focus();document.querySelector('#gas-temperature-exact').select()`)
  await command('Input.insertText',{text:'313'})
  for(const type of ['keyDown','keyUp'])await command('Input.dispatchKeyEvent',{type,key:'Enter',code:'Enter',windowsVirtualKeyCode:13})
  await heat(313)
  await action(`document.querySelector('#gas-temperature').focus()`)
  for(const type of ['keyDown','keyUp'])await command('Input.dispatchKeyEvent',{type,key:'End',code:'End',windowsVirtualKeyCode:35})
  await heat(600)
  for(const type of ['keyDown','keyUp'])await command('Input.dispatchKeyEvent',{type,key:'Home',code:'Home',windowsVirtualKeyCode:36})
  await heat(273)
  await click('Beginstand herstellen')
  await click('Animatie pauzeren')
  const still=await evaluate(`document.querySelector('.heat-vessel').innerHTML`)
  await delay(180)
  assert.equal(await evaluate(`document.querySelector('.heat-vessel').innerHTML`),still)
  await click('Deeltjes laten bewegen')
  const moving=await evaluate(`document.querySelector('.heat-vessel').innerHTML`)
  await delay(180)
  assert.notEqual(await evaluate(`document.querySelector('.heat-vessel').innerHTML`),moving)
  await mobile('opwarmmodel')
  await action(`document.querySelector('.heat-plot').scrollIntoView({block:'center'})`)
  await screenshot('03-pT-grafiek-mobile-320')
  await action(`document.querySelector('.heat-details').open=true`)
  await layout('modeldetails')
  await click('450 K')
  await click('Pauzeren')
  const paused=await evaluate('window.__heatFrames')
  await delay(180)
  assert.equal(await evaluate('window.__heatFrames'),paused)
  await command('Page.reload')
  await waitFor(()=>evaluate(`!!document.querySelector('.guided-sheet h1')`),'hervatten model')
  await click('Ga verder waar je gebleven was')
  assert.equal(await title(),steps[7].title)
  await heat(300)
  await next()
  assert.equal(await evaluate(`document.querySelectorAll('.heating-lab').length`),0)
  assert.equal(await title(),steps[8].title)
  assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`),true)
  for(const index of [0,1,3,2]){
    await action(`document.querySelectorAll('input[type=radio]')[${index}].click()`)
    await click('Controleer mijn antwoord')
    const text=questionFeedback(steps[8],{last:index})
    const count=parseMathText(text).filter(p=>p.type==='math').length
    assert.equal(await evaluate(`document.querySelector('.guided-feedback').querySelectorAll('.katex').length`),count)
    assert.equal(await evaluate(`document.querySelector('.guided-feedback').querySelectorAll('.katex-mathml math').length`),count)
    for(const p of parseMathText(text).filter(p=>p.type==='text'))assert.ok((await evaluate(`document.querySelector('.guided-feedback').textContent`)).includes(p.value))
    await mobile(`kelvinfeedback ${index}`)
    assert.equal((await saved()).responses[steps[8].id].first,0)
  }
  await screenshot('04-kelvinfeedback-mobile-320')
  await next()
  for(let i=9;i<14;i++){
    assert.equal(await title(),steps[i].title)
    assert.equal((await saved()).completed.includes(steps[i].id),false)
    if(steps[i].support){
      await action(`document.querySelector('.guided-support').open=true`)
      await mobile(`hulp ${i}`)
      await action(`document.querySelector('.guided-support').scrollIntoView({block:'center'})`)
      if(i===10)await screenshot('05-opdracht2-hulp-mobile-320')
    }
    await mobile(`papier ${i}`)
    if(i===13){
      assert.equal(await evaluate(`document.querySelectorAll('input[type=radio],.guided-feedback').length`),0)
      assert.match(await evaluate(`document.querySelector('main').textContent`),/individueel.*Formulehulp/s)
      for(const type of ['keyDown','keyUp'])await command('Input.dispatchKeyEvent',{type,key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
      await waitFor(()=>evaluate(`document.querySelector('h1').textContent==='Stap voor stap aan de slag'`),'Escape slotvraag')
      await click('Ga verder waar je gebleven was')
      assert.equal((await saved()).completed.includes(steps[i].id),false)
      await screenshot('06-slotvraag-mobile-320')
    }
    await next()
  }
  assert.equal(await title(),lesson.completion.title)
  assert.equal((await saved()).completed.length,14)
  assert.equal((await saved()).responses['gassen-slotvraag'],undefined)
  assert.match(await evaluate(`document.querySelector('main').textContent`),/Begripsvragen onderweg: 1 van 2/)
  await mobile('afronding')
  await screenshot('07-afronding-mobile-320')
  await click('Vorige');await next()
  assert.equal((await saved()).completed.length,14)
  await click('Afronding bewaren en stoppen')
  await click('Opnieuw beginnen');await click('Annuleren')
  assert.equal((await saved()).completed.length,14)
  await click('Opnieuw beginnen');await click('Ja, opnieuw beginnen')
  assert.equal((await saved()).current,0)
  for(const[key,value]of originals)assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(key)}))`),value)

  // Hulproute en reduced motion met een inhoudelijk geldige halverwege-payload.
  let state=progress.freshProgress()
  for(const s of steps.slice(0,8)){
    if(s.type==='quiz')state=progress.answerQuestion(state,s,s.answer)
    state=progress.advance(state)
  }
  state=progress.answerQuestion(state,steps[8],0)
  state=progress.answerQuestion(state,steps[8],1)
  await action(`localStorage.setItem(${JSON.stringify(STORAGE_KEY)},${JSON.stringify(JSON.stringify(state))})`)
  await visit(path);await click('Ga verder waar je gebleven was')
  await action(`document.querySelector('.guided-help input').click()`)
  await click('Verder met hulp mogelijk maken')
  assert.equal((await saved()).responses[steps[8].id].assisted,true)
  await next();assert.equal(await title(),steps[9].title)
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
  state={...state,current:7}
  await action(`localStorage.setItem(${JSON.stringify(STORAGE_KEY)},${JSON.stringify(JSON.stringify(state))})`)
  await visit(path);await click('Ga verder waar je gebleven was');await heat(300)
  assert.equal(await evaluate(`[...document.querySelectorAll('button')].some(e=>e.textContent.trim()==='Deeltjes laten bewegen')`),true)
  await click('360 K');await heat(360)
  const block=await command('Page.addScriptToEvaluateOnNewDocument',{source:`Object.defineProperty(window,'localStorage',{get(){throw Error('geweigerd')}})`})
  await visit(path)
  assert.match(await evaluate(`document.querySelector('main').textContent`),/kan je voortgang niet bewaren/)
  await click('Start het leerpad');await next()
  assert.equal(await title(),steps[1].title)
  await command('Page.removeScriptToEvaluateOnNewDocument',{identifier:block.identifier})
  assert.deepEqual(exceptions,[])
  console.log('✓ les 1: alle 14 schermen, oefeningen 1/2 a–c, vergelijking en individuele papieren slotvraag zonder nepbeoordeling')
  console.log('✓ opwarming: SI-druk, rechte/grafiekstip, vast vat, 12 deeltjes, 273–600 K, Celsius, invoerfouten, toetsenbord, motion en opruiming')
  console.log('✓ feedback/MathML, 320/390px, eerste poging/hulp, herladen/Escape, eigen reset/opslag; geen klas- of tijdstest')
})
