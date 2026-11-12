#!/usr/bin/env node
// Eerst npm run build. Node 22+, Chrome (Windows-default of CHROME_PATH).
import assert from 'node:assert/strict'
import { lesson, steps } from '../src/energie-basis/lesson.js'
import * as progress from '../src/energie-basis/progress.js'
import * as energy from '../src/energie/progress.js'
import * as biology from '../src/celmetabolisme/progress.js'
import { lesson as pilotLesson, steps as pilotSteps, STORAGE_KEY as pilotKey } from '../src/energie-basis/kinetic-pilot.js'
import { createProgressSystem } from '../src/guided/progress.js'
import { questionFeedback } from '../src/guided/feedback.js'
import { parseMathText } from '../src/guided/math.js'
import { runBrowser } from './lib/browser-harness.mjs'

const formulaCount = text => parseMathText(text).filter(part => part.type === 'math').length

await runBrowser('energie-basis', async ({ command, evaluate, action, click, screenshot, waitFor, visit, exceptions }) => {
  const saved = () => evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(progress.STORAGE_KEY)}))`)
  const title = () => evaluate(`document.querySelector('h1')?.textContent`)
  const choose = index => action(`document.querySelectorAll('input[type=radio]')[${index}].click()`)
  const resize = width => command('Emulation.setDeviceMetricsOverride', { width, height: width > 600 ? 900 : 844, deviceScaleFactor: 1, mobile: width <= 600 })
  const next = async () => {
    assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), false)
    await action(`document.querySelector('.guided-footer .btn-primary').click()`)
  }
  const assertMath = async (selector, text) => {
    const fields = Array.isArray(text) ? text : [text]
    const count = fields.reduce((sum, field) => sum + formulaCount(field), 0)
    assert.equal(await evaluate(`document.querySelector(${JSON.stringify(selector)}).querySelectorAll('.katex').length`), count, selector)
    assert.equal(await evaluate(`document.querySelector(${JSON.stringify(selector)}).querySelectorAll('.katex-mathml math').length`), count, 'MathML ontbreekt')
    const rendered = await evaluate(`document.querySelector(${JSON.stringify(selector)}).textContent`)
    for (const field of fields) for (const part of parseMathText(field).filter(part => part.type === 'text')) assert.ok(rendered.includes(part.value), `${selector}: gekozen tekst ontbreekt`)
  }
  const layout = async label => {
    await evaluate('document.fonts.ready')
    assert.deepEqual(await evaluate(`(() => {
      const errors=[];
      if(document.documentElement.scrollWidth>innerWidth+1)errors.push('pagina');
      const main=document.querySelector('main');
      if(main.scrollWidth>main.clientWidth+1)errors.push('boekwerk/quiz');
      for(const e of document.querySelectorAll('.katex-html, button')){
        if(!e.getClientRects().length)continue;
        const r=e.getBoundingClientRect();
        if(r.right>innerWidth+1 || r.left < -1)errors.push(e.className);
      }
      if(document.querySelector('.katex-error,.guided-math-error'))errors.push('formulefout');
      const walker=document.createTreeWalker(main,NodeFilter.SHOW_TEXT);
      let node; while(node=walker.nextNode()){
        if(!node.parentElement.closest('.katex') && /\\\\[()[\\]]/.test(node.textContent))errors.push('platte LaTeX');
      }
      return errors;
    })()`), [], label)
  }
  const mobileLayouts = async label => {
    for (const width of [390, 320]) { await resize(width); await layout(`${label} @ ${width}`) }
  }
  const feedbackShot = async name => {
    await action(`document.querySelector('.guided-feedback').scrollIntoView({block:'start'})`)
    await screenshot(name)
  }

  await resize(1366)
  await visit('energie-basis/')
  const pilot = createProgressSystem(pilotLesson, pilotSteps, pilotKey)
  const originals = [
    [energy.STORAGE_KEY, energy.advance(energy.freshProgress())],
    [biology.STORAGE_KEY, biology.advance(biology.freshProgress())],
    [pilotKey, pilot.advance(pilot.freshProgress())],
    ['willebroek:energie-basis:fys4-basis-t2-rekenen-v1', { version: 'fys4-basis-t2-rekenen-v1', current: 16, completed: ['oud'], responses: {} }],
    ['willebroek:energie-basis:fys4-basis-t2-oefenen-v2', { version: 'fys4-basis-t2-oefenen-v2', current: 1, completed: ['oefening-5'], responses: {}, workChecks: {} }],
  ]
  for (const [key, state] of originals) await action(`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(JSON.stringify(state))})`)
  await visit('energie-basis/')
  assert.equal(await evaluate(`document.title`), 'Energie basis — leerpad 4LAT / 4ECWE')
  assert.match(await evaluate(`document.querySelector('main').textContent`), /4LAT \/ 4ECWE/)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /les van 50 minuten/)
  assert.equal(await saved(), null, 'geen impliciete migratie van v1/v2 of het proefblok')
  await layout('start')
  await screenshot('01-start-desktop')
  await click('Start het leerpad')
  for (const [index, step] of steps.entries()) {
    assert.equal(await title(), step.title)
    assert.equal(await evaluate(`document.activeElement === document.querySelector('h1')`), true)
    assert.equal((await saved())?.completed.includes(step.id) ?? false, false, 'openen is geen afronden')
    await mobileLayouts(`${step.id} voor antwoord`)
    assert.equal(await evaluate(`document.querySelectorAll('.guided-checklist').length`), 0, 'geen afvinklijst')
    if (step.type === 'quiz') {
      assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
      await assertMath('.guided-question legend', step.question)
      for (const [optionIndex, option] of step.options.entries()) await assertMath(`.guided-option:nth-of-type(${optionIndex + 1})`, option)
      const wrongs = step.options.map((_, i) => i).filter(i => i !== step.answer)
      for (const wrong of wrongs) {
        await choose(wrong); await click('Controleer mijn antwoord')
        await assertMath('.guided-feedback p', questionFeedback(step, { last: wrong }))
        await mobileLayouts(`${step.id} misvatting ${wrong}`)
        assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
      }
      if (step.id === 'kinetisch-systeemcheck') {
        await action(`document.querySelectorAll('input[type=radio]')[1].focus()`)
        for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 })
        await waitFor(() => evaluate(`document.querySelectorAll('input[type=radio]')[2].checked`), 'radio met toetsenbord')
      } else await choose(step.answer)
      await click('Controleer mijn antwoord')
      await assertMath('.guided-feedback p', step.correct)
      await mobileLayouts(`${step.id} juiste uitleg`)
      assert.equal((await saved()).responses[step.id].first, wrongs[0])
      assert.equal(await evaluate(`document.querySelectorAll('.guided-question input:not(:disabled)').length`), 0)
      if (step.id === 'veer-check') await feedbackShot('03-veer-uitleg-mobile-320')
      if (step.id === 'verbanden-check') await feedbackShot('06-verbanden-uitleg-mobile-320')
      if (step.id === 'remmen-check') {
        await resize(1366); await feedbackShot('07-overdracht-en-opslag-desktop')
      }
    } else {
      assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), false)
      const text = [...step.instructions, ...(step.support ?? [])]
      await assertMath('.guided-sheet', text)
      if (step.type === 'read') {
        assert.equal(await evaluate(`document.querySelectorAll('.guided-support').length`), 0, 'boekonderzoek is zichtbare kerninhoud')
        if (step.id === 'hoogte-onderzoek') { await resize(1366); await screenshot('02-boekonderzoek-hoogte-desktop') }
        if (step.id === 'behoud-onderzoek') { await resize(1366); await screenshot('08-boekonderzoek-behoud-desktop') }
      } else {
        assert.match(await evaluate(`document.querySelector('.guided-footer .btn-primary').textContent`), /gemaakt, verder/)
        assert.equal(await evaluate(`document.querySelector('.guided-support').open`), false)
        if (step.id === 'oefening-6b') { await resize(1366); await screenshot('04-massa-aanpak-desktop') }
        await action(`document.querySelector('.guided-support summary').click()`)
        await assertMath('.guided-support', step.support)
        await mobileLayouts(`${step.id} open hulp`)
        if (step.id === 'oefening-6b') {
          const before = await saved()
          await click('Pauzeren'); await command('Page.reload')
          await waitFor(() => evaluate(`!!document.querySelector('.guided-sheet h1')`), 'herladen boekwerk')
          await click('Ga verder waar je gebleven was')
          assert.equal(await title(), step.title)
          assert.deepEqual(await saved(), before)
          await action(`document.querySelector('.guided-support summary').click()`)
          await resize(320)
          await action(`document.querySelector('.guided-support').scrollIntoView({block:'start'})`)
          await screenshot('05-massa-formulehulp-mobile-320')
        }
        if (step.id === 'oefening-9') {
          assert.equal((await saved()).current, index, 'na oefening 8 gewoon verder')
          for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
          await waitFor(() => evaluate(`document.querySelector('h1').textContent === 'Stap voor stap aan de slag'`), 'Escape pauzeert')
          await click('Ga verder waar je gebleven was')
          assert.equal(await title(), step.title)
        }
        if (step.id === 'oefening-10') {
          assert.match(await evaluate(`document.querySelector('main').textContent`), /lengte van de helling is telkens gelijk/)
          assert.match(await evaluate(`document.querySelector('main').textContent`), /verticale hoogteverschil/)
          await resize(1366)
          await action(`document.querySelector('main').scrollTo({top:0})`)
          await screenshot('09-hellingen-toepassing-desktop')
          await resize(320)
          await action(`document.querySelector('.guided-support').scrollIntoView({block:'start'})`)
          await screenshot('10-hellingen-hulp-mobile-320')
        }
      }
    }
    await next()
  }

  assert.equal(await title(), lesson.completion.title)
  assert.equal((await saved()).completed.length, steps.length)
  assert.deepEqual((await saved()).workChecks, {})
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Begrip en toepassing: 0 van 9/)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /6a–c met eenhedencontrole.*9a–b en 10 met verklaring/)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /geen automatische correctie/)
  await mobileLayouts('afronding')
  await screenshot('11-afronding-mobile-320')
  await click('Vorige'); await click('Vorige')
  assert.equal(await title(), steps.at(-2).title)
  await next(); await next()
  assert.equal((await saved()).completed.length, steps.length)
  assert.equal(await evaluate(`[...document.fonts].some(f=>f.family.includes('KaTeX_Main')&&f.status==='loaded')`), true)
  await click('Afronding bewaren en stoppen')
  await click('Opnieuw beginnen'); await click('Annuleren')
  assert.equal((await saved()).completed.length, steps.length)
  await click('Opnieuw beginnen'); await click('Ja, opnieuw beginnen')
  assert.equal((await saved()).current, 0)
  assert.deepEqual((await saved()).completed, [])
  for (const [key, state] of originals) assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(key)}))`), state)

  // Hulp na twee fouten blijft expliciet en bewaart de eerste poging.
  const quiz = steps[1]
  let assisted = progress.advance(progress.freshProgress())
  assisted = progress.answerQuestion(assisted, quiz, 0)
  assisted = progress.answerQuestion(assisted, quiz, 1)
  await action(`localStorage.setItem(${JSON.stringify(progress.STORAGE_KEY)},${JSON.stringify(JSON.stringify(assisted))})`)
  await visit('energie-basis/'); await click('Ga verder waar je gebleven was')
  assert.equal(await title(), quiz.title)
  assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
  assert.equal(await evaluate(`[...document.querySelectorAll('button')].find(e=>e.textContent.trim()==='Verder met hulp mogelijk maken').disabled`), true)
  await action(`document.querySelector('.guided-help input').click()`)
  await click('Verder met hulp mogelijk maken')
  assert.equal((await saved()).responses[quiz.id].first, 0)
  assert.equal((await saved()).responses[quiz.id].assisted, true)
  await next()
  assert.equal(await title(), steps[2].title)
  assert.deepEqual(exceptions, [])
  console.log('✓ energie basis v3: 26 schermen, alle 5–10-deelvragen, zeven berekeningen, negen begripsvragen met alle gekozen feedbackvarianten')
  console.log('✓ boekonderzoek en kernuitleg zichtbaar; optionele hulp, 320/390px, KaTeX/MathML/fonts, toetsenbord, refresh/Escape, eerste poging, hulp en reset')
  console.log('✓ eigen v3-opslag; v1/v2, proefblok, twee-uursenergie en biologie blijven bewaard')
})
