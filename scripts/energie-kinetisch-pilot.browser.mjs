#!/usr/bin/env node
// Na npm run build. Node 22+ en Chrome (Windows-default of CHROME_PATH).
import assert from 'node:assert/strict'
import { lesson, steps, STORAGE_KEY } from '../src/energie-basis/kinetic-pilot.js'
import { createProgressSystem } from '../src/guided/progress.js'
import { questionFeedback } from '../src/guided/feedback.js'
import { parseMathText } from '../src/guided/math.js'
import * as basic from '../src/energie-basis/progress.js'
import * as energy from '../src/energie/progress.js'
import * as biology from '../src/celmetabolisme/progress.js'
import { runBrowser } from './lib/browser-harness.mjs'

const progress = createProgressSystem(lesson, steps, STORAGE_KEY)
const countMath = text => parseMathText(text).filter(part => part.type === 'math').length
const path = 'energie-basis/proefblok/'

await runBrowser('kinetisch-proefblok', async ({ command, evaluate, action, click, screenshot, waitFor, visit, exceptions }) => {
  const saved = () => evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`)
  const title = () => evaluate(`document.querySelector('h1').textContent`)
  const choose = index => action(`document.querySelectorAll('input[type=radio]')[${index}].click()`)
  const next = () => action(`(() => {const e=document.querySelector('.guided-footer .btn-primary');if(e.disabled)throw Error('Verder geblokkeerd');e.click()})()`)
  const resize = width => command('Emulation.setDeviceMetricsOverride', { width, height: width > 600 ? 900 : 844, deviceScaleFactor: 1, mobile: width <= 600 })
  async function mathIn(selector, text) {
    assert.equal(await evaluate(`document.querySelector(${JSON.stringify(selector)}).querySelectorAll('.katex').length`), countMath(text), selector)
    assert.equal(await evaluate(`document.querySelector(${JSON.stringify(selector)}).querySelectorAll('.katex-mathml math').length`), countMath(text))
  }
  async function layout(label) {
    await evaluate('document.fonts.ready')
    assert.deepEqual(await evaluate(`(() => {
      const errors=[];const main=document.querySelector('main');
      if(document.documentElement.scrollWidth>innerWidth+1||main.scrollWidth>main.clientWidth+1)errors.push('overloop');
      if(document.querySelector('.katex-error,.guided-math-error'))errors.push('formulefout');
      for(const e of document.querySelectorAll('.katex-html,button')){
        if(!e.getClientRects().length)continue;
        const r=e.getBoundingClientRect();if(r.left < -1 || r.right>innerWidth+1)errors.push(e.className);
      }
      const walk=document.createTreeWalker(main,NodeFilter.SHOW_TEXT);let node;
      while(node=walk.nextNode())if(!node.parentElement.closest('.katex')&&/\\\\[()[\\]]/.test(node.textContent))errors.push('platte LaTeX');
      return errors;
    })()`), [], label)
  }
  async function mobiles(label) { for (const width of [390, 320]) { await resize(width); await layout(`${label} @ ${width}`) } }
  async function submit(index, step) {
    await choose(index); await click('Controleer mijn antwoord')
    await mathIn('.guided-feedback p', questionFeedback(step, { last: index }))
    await mobiles(`${step.id} antwoord ${index}`)
  }

  await resize(1366)
  await visit(path)
  assert.equal(await evaluate('document.title'), 'Kinetische energie — proefblok 4LAT / 4ECWE')
  assert.match(await evaluate(`document.querySelector('main').textContent`), /niet de volledige route/)
  await layout('start')
  await screenshot('01-start-desktop')
  const originals = [[basic.STORAGE_KEY, basic.advance(basic.freshProgress())], [energy.STORAGE_KEY, energy.advance(energy.freshProgress())], [biology.STORAGE_KEY, biology.advance(biology.freshProgress())]]
  for (const [key, value] of originals) await action(`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(JSON.stringify(value))})`)
  await click('Start het leerpad')
  assert.equal(await title(), steps[0].title)
  assert.equal(await evaluate(`document.activeElement===document.querySelector('h1')`), true)
  assert.equal(await evaluate(`document.querySelectorAll('.guided-checklist,.guided-support').length`), 0, 'het boekonderzoek is kerninhoud, niet een verborgen hint')
  await screenshot('02-boekonderzoek-desktop')
  await mobiles('boekonderzoek')
  await next()

  const mass = steps[1]
  assert.equal(await title(), mass.title)
  assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
  await mathIn('.guided-question legend', mass.question)
  await submit(0, mass)
  assert.match(await evaluate(`document.querySelector('.guided-feedback p').textContent`), /alleen zijn kinetische energie/)
  await resize(1366)
  await action(`document.querySelector('.guided-feedback').scrollIntoView({block:'nearest'})`)
  await screenshot('03-feedback-renner-desktop')
  const before = await saved()
  await click('Pauzeren'); await command('Page.reload')
  await waitFor(() => evaluate(`!!document.querySelector('.guided-sheet h1')`), 'reload proefblok')
  await click('Ga verder waar je gebleven was')
  assert.equal(await title(), mass.title)
  assert.deepEqual(await saved(), before)
  // Ook de uitleg bij het eerdere antwoord blijft na herladen zichtbaar.
  await mathIn('.guided-feedback p', mass.feedbackByOption[0])
  await submit(1, mass)
  assert.match(await evaluate(`document.querySelector('.guided-feedback p').textContent`), /renner buiten beschouwing/)
  await action(`document.querySelector('.guided-feedback').scrollIntoView({block:'start'})`)
  await screenshot('04-feedback-fiets-mobile-320')
  assert.equal((await saved()).responses[mass.id].first, 0)
  assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
  // Native radiogroep: vanaf optie 1 met pijl omlaag naar het juiste antwoord.
  await action(`document.querySelectorAll('input[type=radio]')[1].focus()`)
  for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 })
  await waitFor(() => evaluate(`document.querySelectorAll('input[type=radio]')[2].checked`), 'radio toetsenbord')
  await click('Controleer mijn antwoord')
  await mathIn('.guided-feedback p', mass.correct)
  await mobiles('uitleg systeem')
  assert.equal(await evaluate(`document.querySelectorAll('.guided-question input:not(:disabled)').length`), 0)
  await resize(1366)
  await action(`document.querySelector('main').scrollTo({top:0})`)
  await screenshot('05-begrip-met-uitleg-desktop')
  await next()

  const work = steps[2]
  assert.equal(await title(), work.title)
  assert.equal((await saved()).completed.includes(work.id), false)
  assert.equal(await evaluate(`document.querySelectorAll('.guided-checklist').length`), 0)
  assert.equal(await evaluate(`document.querySelector('.guided-support').open`), false)
  await resize(1366)
  await screenshot('06-toepassing-desktop')
  await action(`document.querySelector('.guided-support summary').click()`)
  await mathIn('.guided-support', work.support.join(' '))
  await mobiles('optionele ondersteuning')
  await action(`document.querySelector('.guided-support').scrollIntoView({block:'start'})`)
  await screenshot('07-ondersteuning-mobile-320')
  for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
  await waitFor(() => evaluate(`document.querySelector('h1').textContent==='Stap voor stap aan de slag'`), 'Escape pauzeert')
  await click('Ga verder waar je gebleven was')
  assert.equal(await title(), work.title)
  assert.equal((await saved()).completed.includes(work.id), false)
  await next()

  const transfer = steps[3]
  assert.equal(await title(), transfer.title)
  for (const index of [0, 1, transfer.answer]) await submit(index, transfer)
  assert.equal((await saved()).responses[transfer.id].first, 0)
  await screenshot('08-transfer-feedback-mobile-320')
  await next()
  assert.equal(await title(), lesson.completion.title)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /alleen de eerste berekening/)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Begrip en toepassing: 0 van 2/)
  assert.equal((await saved()).completed.length, 4)
  await mobiles('afronding')
  await click('Vorige'); await next()
  assert.equal((await saved()).completed.length, 4)
  assert.equal(await evaluate(`[...document.fonts].some(f=>f.family.includes('KaTeX_Main')&&f.status==='loaded')`), true)
  await click('Afronding bewaren en stoppen')
  await click('Opnieuw beginnen'); await click('Annuleren')
  assert.equal((await saved()).completed.length, 4)
  await click('Opnieuw beginnen'); await click('Ja, opnieuw beginnen')
  assert.equal((await saved()).current, 0)
  for (const [key, value] of originals) assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(key)}))`), value)

  // Correcte eerste pogingen en een correcte eindstand blijven eveneens herstelbaar.
  for (const step of steps) {
    if (step.type === 'quiz') { await choose(step.answer); await click('Controleer mijn antwoord') }
    await next()
  }
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Begrip en toepassing: 2 van 2/)
  await screenshot('09-afronding-correct-mobile-320')

  // Afzonderlijk de expliciete hulproute, zonder een voltooid boekwerk te fingeren.
  let assisted = progress.advance(progress.freshProgress())
  assisted = progress.answerQuestion(assisted, mass, 0)
  assisted = progress.answerQuestion(assisted, mass, 1)
  await action(`localStorage.setItem(${JSON.stringify(STORAGE_KEY)},${JSON.stringify(JSON.stringify(assisted))})`)
  await visit(path); await click('Ga verder waar je gebleven was')
  await action(`document.querySelector('.guided-help input').click()`)
  await click('Verder met hulp mogelijk maken')
  assert.equal((await saved()).responses[mass.id].assisted, true)
  assert.equal((await saved()).responses[mass.id].first, 0)
  await next()
  assert.equal(await title(), work.title)
  assert.deepEqual(exceptions, [])
  console.log('✓ proefblok: boekonderzoek, beide misvattingen met eigen feedback, toepassing en transfer; geen boekwerkvinkjes')
  console.log('✓ 320/390px, KaTeX/MathML, toetsenbord, eerste poging, hulp, refresh/Escape, reset en aparte opslag; 5–10 blijft behouden')
})
