#!/usr/bin/env node
// Na npm run build: echte Chrome/CDP-test, geen extra browserdependency.
import assert from 'node:assert/strict'
import { setTimeout as delay } from 'node:timers/promises'
import { runBrowser } from './lib/browser-harness.mjs'
import { lesson, steps, STORAGE_KEY } from '../src/gassen/compression-pilot.js'
import { createProgressSystem } from '../src/guided/progress.js'
import { gasState, formatNumber, pistonX, graphPoint } from '../src/gassen/compression-model.js'
import { questionFeedback } from '../src/guided/feedback.js'
import { parseMathText } from '../src/guided/math.js'
import * as basic from '../src/energie-basis/progress.js'
import * as energy from '../src/energie/progress.js'
import * as biology from '../src/celmetabolisme/progress.js'
import { lesson as kinetic, steps as kineticSteps, STORAGE_KEY as kineticKey } from '../src/energie-basis/kinetic-pilot.js'

const path = 'gassen/proefblok/'
const progress = createProgressSystem(lesson, steps, STORAGE_KEY)
const kineticProgress = createProgressSystem(kinetic, kineticSteps, kineticKey)
const countMath = text => parseMathText(text).filter(p => p.type === 'math').length

await runBrowser('gassen-compressie', async ({ origin, command, evaluate, action, click, screenshot, waitFor, visit, exceptions }) => {
  const saved = () => evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`)
  const title = () => evaluate(`document.querySelector('h1').textContent`)
  const next = () => action(`(() => { const e=document.querySelector('.guided-footer .btn-primary'); if(!e||e.disabled)throw Error('Verder geblokkeerd');e.click() })()`)
  const choose = index => action(`document.querySelectorAll('input[type=radio]')[${index}].click()`)
  const resize = width => command('Emulation.setDeviceMetricsOverride', { width, height: width > 600 ? 768 : 844, deviceScaleFactor: 1, mobile: width <= 600 })
  async function layout(label) {
    await evaluate('document.fonts.ready')
    assert.deepEqual(await evaluate(`(() => {
      const errors=[]; const main=document.querySelector('main');
      if(document.documentElement.scrollWidth>innerWidth+1||main.scrollWidth>main.clientWidth+1)errors.push('horizontale overloop');
      if(document.querySelector('.katex-error,.guided-math-error'))errors.push('formulefout');
      for(const e of document.querySelectorAll('button,input,.katex-html')){
        if(!e.getClientRects().length)continue;const r=e.getBoundingClientRect();
        if(r.left < -1 || r.right>innerWidth+1)errors.push(e.className||e.tagName);
      }
      const walker=document.createTreeWalker(main,NodeFilter.SHOW_TEXT);let node;
      while(node=walker.nextNode())if(!node.parentElement.closest('.katex')&&/\\\\[()[\\]]/.test(node.textContent))errors.push('platte LaTeX');
      return errors;
    })()`), [], label)
  }
  async function mobiles(label) { for (const width of [390, 320]) { await resize(width); await layout(`${label} @ ${width}`) } }
  async function checkState(volume) {
    assert.equal(await evaluate(`document.querySelector('[data-testid=volume]').textContent`), String(volume))
    assert.equal(await evaluate(`document.querySelector('[data-testid=pressure]').textContent`), formatNumber(gasState(volume).pressureBar))
    assert.equal(await evaluate(`document.querySelector('.lab-piston').getAttribute('aria-valuenow')`), String(volume))
    assert.equal(await evaluate(`document.querySelectorAll('.lab-particle').length`), 12)
    assert.deepEqual(await evaluate(`[...new Set([...document.querySelectorAll('.lab-particle')].map(e=>e.getAttribute('r')))]`), ['4'])
    const dot = graphPoint(volume)
    const actual = await evaluate(`(() => { const e=document.querySelector('[data-testid=graph-dot]');return {x:Number(e.getAttribute('cx')),y:Number(e.getAttribute('cy'))} })()`)
    assert.ok(Math.abs(actual.x-dot.x)<1e-8 && Math.abs(actual.y-dot.y)<1e-8)
    assert.equal(await evaluate(`document.querySelector('.lab-piston-face').getAttribute('x')`), String(pistonX(volume)-5))
  }
  async function submit(index) {
    await choose(index); await click('Controleer mijn antwoord')
    const expected = questionFeedback(steps[2], { last: index })
    assert.equal(await evaluate(`document.querySelector('.guided-feedback').querySelectorAll('.katex').length`), countMath(expected))
    assert.equal(await evaluate(`document.querySelector('.guided-feedback').querySelectorAll('.katex-mathml math').length`), countMath(expected))
    await mobiles(`feedback ${index}`)
  }

  await resize(1366)
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] })
  await command('Page.navigate', { url: origin })
  await waitFor(() => evaluate(`document.body.textContent.includes('Fysica')&&document.body.textContent.includes('Biologie')`), 'plannerstart')
  assert.equal(await evaluate('document.title'), 'GO! Atheneum Willebroek')
  await visit(path)
  assert.equal(await evaluate('document.title'), 'Gassen — compressieproefblok 6ELTE / 6IICT')
  assert.match(await evaluate(`document.querySelector('main').textContent`), /niet de volledige bezoekles/)
  await layout('start')
  await screenshot('01-start-desktop')
  const originals = [
    [basic.STORAGE_KEY, basic.advance(basic.freshProgress())],
    [energy.STORAGE_KEY, energy.advance(energy.freshProgress())],
    [biology.STORAGE_KEY, biology.advance(biology.freshProgress())],
    [kineticKey, kineticProgress.advance(kineticProgress.freshProgress())],
  ]
  for (const [key, value] of originals) await action(`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(JSON.stringify(value))})`)
  await click('Start het leerpad')
  assert.equal(await title(), steps[0].title)
  assert.equal(await evaluate(`document.activeElement===document.querySelector('h1')`), true)
  assert.equal(await evaluate(`document.querySelectorAll('.compression-lab,.guided-checklist').length`), 0)
  assert.equal((await saved())?.completed.length ?? 0, 0)
  await mobiles('voorspellen op papier')
  await next()

  assert.equal(await title(), steps[1].title)
  assert.equal(await evaluate(`document.querySelector('.badge').textContent`), 'Digitaal')
  await resize(1366)
  await checkState(60)
  await action(`window.__gasFrames=0;const raf=window.requestAnimationFrame;window.requestAnimationFrame=fn=>raf(t=>{window.__gasFrames++;fn(t)})`)
  await action(`document.querySelector('.compression-lab').scrollIntoView({block:'start'})`)
  await screenshot('02-zuiger-desktop')
  for (const volume of [40, 30, 80, 20, 60]) {
    if (volume === 20) await action(`const e=document.querySelector('#gas-volume');e.value=20;e.dispatchEvent(new Event('input',{bubbles:true}))`)
    else await click(`${volume} mL`)
    await checkState(volume)
  }
  // Werkelijke pointerdrag in de proportioneel geschaalde SVG.
  await action(`document.querySelector('.lab-cylinder').scrollIntoView({block:'center'})`)
  const from = await evaluate(`(() => {const r=document.querySelector('.lab-piston-face').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`)
  const target = await evaluate(`new DOMPoint(${pistonX(40)},125).matrixTransform(document.querySelector('.lab-cylinder').getScreenCTM()).toJSON()`)
  await command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: from.x, y: from.y })
  await command('Input.dispatchMouseEvent', { type: 'mousePressed', x: from.x, y: from.y, button: 'left', clickCount: 1 })
  await command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: target.x, y: target.y, buttons: 1 })
  await command('Input.dispatchMouseEvent', { type: 'mouseReleased', x: target.x, y: target.y, button: 'left', clickCount: 1 })
  await waitFor(() => evaluate(`document.querySelector('[data-testid=volume]').textContent==='40'`), 'zuigerdrag')
  await checkState(40)
  // Native range én de zuiger zijn per toetsenbord instelbaar.
  await action(`document.querySelector('#gas-volume').focus()`)
  for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 })
  await checkState(41)
  await action(`document.querySelector('.lab-piston').focus()`)
  for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'Home', code: 'Home', windowsVirtualKeyCode: 36 })
  await checkState(20)
  await click('Beginstand herstellen'); await checkState(60)
  await click('Animatie pauzeren')
  const still = await evaluate(`document.querySelector('.lab-cylinder').innerHTML`)
  await delay(180)
  assert.equal(await evaluate(`document.querySelector('.lab-cylinder').innerHTML`), still)
  await click('Deeltjes laten bewegen')
  const moving = await evaluate(`document.querySelector('.lab-cylinder').innerHTML`)
  await delay(180)
  assert.notEqual(await evaluate(`document.querySelector('.lab-cylinder').innerHTML`), moving)
  await mobiles('model en bediening')
  await action(`document.querySelector('.lab-plot').scrollIntoView({block:'center'})`)
  await screenshot('03-grafiek-mobile-320')
  await action(`document.querySelector('.lab-cylinder').scrollIntoView({block:'center'})`)
  const touchFrom = await evaluate(`(() => {const r=document.querySelector('.lab-piston-face').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`)
  const touchTo = await evaluate(`new DOMPoint(${pistonX(30)},125).matrixTransform(document.querySelector('.lab-cylinder').getScreenCTM()).toJSON()`)
  await command('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: touchFrom.x, y: touchFrom.y }] })
  await command('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: touchTo.x, y: touchTo.y }] })
  await command('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await waitFor(() => evaluate(`document.querySelector('[data-testid=volume]').textContent==='30'`), 'touch-zuigerdrag')
  await checkState(30)
  await action(`document.querySelector('.lab-details').open=true`)
  await layout('modeluitleg open')
  await click('30 mL')
  const before = await saved()
  await click('Pauzeren')
  const stopped = await evaluate('window.__gasFrames')
  await delay(180)
  assert.equal(await evaluate('window.__gasFrames'), stopped, 'animatie stopt bij pauzeren/unmount')
  await command('Page.reload')
  await waitFor(() => evaluate(`!!document.querySelector('.guided-sheet h1')`), 'hervatten')
  await click('Ga verder waar je gebleven was')
  assert.equal(await title(), steps[1].title)
  assert.deepEqual(await saved(), before)
  await checkState(60) // Toestelstand is bewust tijdelijk; papiernotities blijven de bron.
  await next()
  assert.equal(await evaluate(`document.querySelectorAll('.compression-lab').length`), 0)

  assert.equal(await title(), steps[2].title)
  assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
  for (const index of [0, 1, 2, 3]) {
    await submit(index)
    assert.equal((await saved()).responses[steps[2].id].first, 0)
  }
  assert.equal(await evaluate(`document.querySelectorAll('.guided-question input:not(:disabled)').length`), 0)
  await screenshot('04-begripsfeedback-mobile-320')
  await next()
  assert.equal(await title(), steps[3].title)
  await mobiles('besluit en voorbeeld')
  await next()
  assert.equal(await title(), steps[4].title)
  assert.equal(await evaluate(`document.querySelectorAll('.guided-checklist').length`), 0)
  assert.equal((await saved()).completed.includes(steps[4].id), false)
  await action(`document.querySelector('.guided-support summary').click()`)
  await mobiles('berekening en hulp')
  await screenshot('05-papierwerk-met-hulp-mobile-320')
  for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
  await waitFor(() => evaluate(`document.querySelector('h1').textContent==='Stap voor stap aan de slag'`), 'Escape pauzeert')
  await click('Ga verder waar je gebleven was')
  assert.equal(await title(), steps[4].title)
  assert.equal((await saved()).completed.includes(steps[4].id), false)
  await next()
  assert.equal(await title(), steps[5].title)
  await checkState(40)
  await click('80 mL'); await checkState(80)
  await click('Beginstand herstellen'); await checkState(40)
  await mobiles('A+ met eigen beginstand')
  await next()
  assert.equal(await title(), lesson.completion.title)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Begrip: 0 van 1/)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /niet automatisch nagekeken/)
  assert.equal((await saved()).completed.length, 6)
  await mobiles('afronding')
  await screenshot('06-afronding-mobile-320')
  await click('Vorige'); await checkState(40); await next()
  assert.equal((await saved()).completed.length, 6)
  await click('Afronding bewaren en stoppen')
  await click('Opnieuw beginnen'); await click('Annuleren')
  assert.equal((await saved()).completed.length, 6)
  await click('Opnieuw beginnen'); await click('Ja, opnieuw beginnen')
  assert.equal((await saved()).current, 0)
  for (const [key, value] of originals) assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(key)}))`), value)

  // Expliciete hulp na twee fouten wordt als hulp, niet als juist antwoord opgeslagen.
  let assisted = progress.advance(progress.advance(progress.freshProgress()))
  assisted = progress.answerQuestion(assisted, steps[2], 0)
  assisted = progress.answerQuestion(assisted, steps[2], 1)
  await action(`localStorage.setItem(${JSON.stringify(STORAGE_KEY)},${JSON.stringify(JSON.stringify(assisted))})`)
  await visit(path); await click('Ga verder waar je gebleven was')
  await action(`document.querySelector('.guided-help input').click()`)
  await click('Verder met hulp mogelijk maken')
  assert.equal((await saved()).responses[steps[2].id].assisted, true)
  assert.equal((await saved()).responses[steps[2].id].first, 0)
  await next()
  assert.equal(await title(), steps[3].title)

  // Reduced motion: wel alle controles en gegevens, geen automatische beweging.
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  await action(`localStorage.removeItem(${JSON.stringify(STORAGE_KEY)})`)
  await visit(path); await click('Start het leerpad'); await next()
  assert.equal(await evaluate(`[...document.querySelectorAll('button')].some(e=>e.textContent.trim()==='Deeltjes laten bewegen')`), true)
  await checkState(60)
  await click('40 mL'); await checkState(40)

  // Opslagweigering: de route en simulatie blijven in het huidige tabblad werken.
  const block = await command('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(window,'localStorage',{get(){throw Error('opslag geweigerd')}})` })
  await visit(path)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /kan je voortgang niet bewaren/)
  await click('Start het leerpad'); await next()
  await checkState(60); await click('30 mL'); await checkState(30)
  await layout('zonder opslag')
  await command('Page.removeScriptToEvaluateOnNewDocument', { identifier: block.identifier })
  assert.deepEqual(exceptions, [])
  console.log('✓ gasproefblok: zes stappen, exacte SI-modelwaarden, zuigerdrag, range/zuigertoetsenbord, twaalf vaste deeltjes en live kromme')
  console.log('✓ alle feedbackkeuzes, eerste poging, hulp, zelfrapportage, eigen opslag/reset, refresh/Escape, 320/390px, reduced motion en animatie-opruiming')
  console.log('✓ geen schoolwifi-, projector-, leerlingtijd- of leerwinstclaim')
})
