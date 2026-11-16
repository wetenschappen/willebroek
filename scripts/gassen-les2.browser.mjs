#!/usr/bin/env node
// Na npm run build; Node 22+ en Chrome of CHROME_PATH.
import assert from 'node:assert/strict'
import { runBrowser } from './lib/browser-harness.mjs'
import { lesson, steps, STORAGE_KEY } from '../src/gassen/lesson2.js'
import { lesson as first, steps as firstSteps, STORAGE_KEY as firstKey } from '../src/gassen/lesson.js'
import { lesson as pilot, steps as pilotSteps, STORAGE_KEY as pilotKey } from '../src/gassen/compression-pilot.js'
import { createProgressSystem } from '../src/guided/progress.js'
import { questionFeedback } from '../src/guided/feedback.js'
import { parseMathText } from '../src/guided/math.js'
import * as basic from '../src/energie-basis/progress.js'
import * as energy from '../src/energie/progress.js'
import * as biology from '../src/celmetabolisme/progress.js'

const progress=createProgressSystem(lesson,steps,STORAGE_KEY)
const firstProgress=createProgressSystem(first,firstSteps,firstKey)
const pilotProgress=createProgressSystem(pilot,pilotSteps,pilotKey)
const path='gassen/les2/'
await runBrowser('gassen-les2',async({command,evaluate,action,click,screenshot,waitFor,visit,exceptions})=>{
  const saved=()=>evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`)
  const title=()=>evaluate(`document.querySelector('h1').textContent`)
  const resize=width=>command('Emulation.setDeviceMetricsOverride',{width,height:width>600?768:844,deviceScaleFactor:1,mobile:width<=600})
  const next=()=>action(`(()=>{const e=document.querySelector('.guided-footer .btn-primary');if(!e||e.disabled)throw Error('Verder geblokkeerd');e.click()})()`)
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
  async function feedback(q,index){
    await action(`document.querySelectorAll('input[type=radio]')[${index}].click()`)
    await click('Controleer mijn antwoord')
    const text=questionFeedback(q,{last:index})
    const parts=parseMathText(text),count=parts.filter(p=>p.type==='math').length
    assert.equal(await evaluate(`document.querySelector('.guided-feedback').querySelectorAll('.katex').length`),count)
    assert.equal(await evaluate(`document.querySelector('.guided-feedback').querySelectorAll('.katex-mathml math').length`),count)
    for(const p of parts.filter(p=>p.type==='text'))assert.ok((await evaluate(`document.querySelector('.guided-feedback').textContent`)).includes(p.value))
    await mobile(`${q.id} feedback ${index}`)
  }
  await resize(1366);await visit(path)
  assert.equal(await evaluate('document.title'),'Gaswet en gemengde oefening — les 2 · 6ELTE / 6IICT')
  await layout('start');await screenshot('01-start-desktop')
  const originals=[
    [firstKey,firstProgress.advance(firstProgress.freshProgress())],
    [pilotKey,pilotProgress.advance(pilotProgress.freshProgress())],
    [basic.STORAGE_KEY,basic.advance(basic.freshProgress())],
    [energy.STORAGE_KEY,energy.advance(energy.freshProgress())],
    [biology.STORAGE_KEY,biology.advance(biology.freshProgress())],
  ]
  for(const[key,value]of originals)await action(`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(JSON.stringify(value))})`)
  await click('Start het leerpad')
  for(const [i,step] of steps.entries()){
    assert.equal(await title(),step.title)
    assert.equal(await evaluate(`document.activeElement===document.querySelector('h1')`),true)
    assert.equal(await evaluate(`document.querySelectorAll('.compression-lab,.heating-lab,.guided-checklist').length`),0)
    if(step.type==='quiz'){
      assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`),true)
      const wrong=step.options.map((_,n)=>n).filter(n=>n!==step.answer)
      for(const choice of [...wrong,step.answer])await feedback(step,choice)
      assert.equal((await saved()).responses[step.id].first,wrong[0])
      assert.equal(await evaluate(`document.querySelectorAll('.guided-question input:not(:disabled)').length`),0)
      await screenshot(`feedback-${i}-mobile-320`)
    }else{
      assert.equal((await saved())?.completed.includes(step.id)??false,false)
      if(step.support){
        await action(`document.querySelector('.guided-support').open=true`)
        await mobile(`hulp ${i}`)
        await action(`document.querySelector('.guided-support').scrollIntoView({block:'center'})`)
        if(i===4)await screenshot('02-volume-hulp-mobile-320')
      }
      await mobile(`stap ${i}`)
      if(i===2){
        await click('Pauzeren');await command('Page.reload')
        await waitFor(()=>evaluate(`!!document.querySelector('.guided-sheet h1')`),'hervatten papier')
        await click('Ga verder waar je gebleven was')
        assert.equal(await title(),step.title)
        assert.equal((await saved()).completed.includes(step.id),false)
      }
      if(i===9)await screenshot('03-koppelwerk-mobile-320')
    }
    await next()
  }
  assert.equal(await title(),lesson.completion.title)
  assert.equal((await saved()).completed.length,12)
  assert.match(await evaluate(`document.querySelector('main').textContent`),/Begripsvragen onderweg: 0 van 3/)
  assert.match(await evaluate(`document.querySelector('main').textContent`),/niet automatisch nagekeken/)
  assert.equal((await saved()).responses['les2-opdracht3-c'],undefined)
  await mobile('afronding');await screenshot('04-afronding-mobile-320')
  await click('Vorige');await next()
  assert.equal((await saved()).completed.length,12)
  for(const type of ['keyDown','keyUp'])await command('Input.dispatchKeyEvent',{type,key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
  await waitFor(()=>evaluate(`document.querySelector('h1').textContent===${JSON.stringify(lesson.finishedTitle)}`),'Escape afronding')
  await click('Opnieuw beginnen');await click('Annuleren')
  assert.equal((await saved()).completed.length,12)
  await click('Opnieuw beginnen');await click('Ja, opnieuw beginnen')
  assert.equal((await saved()).current,0)
  for(const[key,value]of originals)assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(key)}))`),value)

  // Twee fouten, herladen, expliciete hulp: geen opgepoetste eerste poging.
  let state=progress.freshProgress()
  for(const step of steps.slice(0,3))state=progress.advance(state)
  state=progress.answerQuestion(state,steps[3],1)
  state=progress.answerQuestion(state,steps[3],2)
  await action(`localStorage.setItem(${JSON.stringify(STORAGE_KEY)},${JSON.stringify(JSON.stringify(state))})`)
  await visit(path);await click('Ga verder waar je gebleven was')
  assert.equal((await saved()).responses[steps[3].id].first,1)
  await action(`document.querySelector('.guided-help input').click()`)
  await click('Verder met hulp mogelijk maken')
  assert.equal((await saved()).responses[steps[3].id].assisted,true)
  await next();assert.equal(await title(),steps[4].title)
  await action(`document.querySelector('.guided-support').open=true`)
  await mobile('hulp na twee fouten')
  const block=await command('Page.addScriptToEvaluateOnNewDocument',{source:`Object.defineProperty(window,'localStorage',{get(){throw Error('geweigerd')}})`})
  await visit(path)
  assert.match(await evaluate(`document.querySelector('main').textContent`),/kan je voortgang niet bewaren/)
  await click('Start het leerpad');await next()
  assert.equal(await title(),steps[1].title)
  await command('Page.removeScriptToEvaluateOnNewDocument',{identifier:block.identifier})
  assert.deepEqual(exceptions,[])
  console.log('✓ les 2: alle 12 schermen, opdracht 3a–c en M1/M2/M3, alle feedbackkeuzes/MathML en geopende hulp op 320/390px')
  console.log('✓ eigen lesopslag, eerste poging/hulp, papierbevestiging, herladen/Escape/reset en opslagweigering; les 1/proef/andere routes behouden')
})
