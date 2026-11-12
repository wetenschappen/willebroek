#!/usr/bin/env node
// Eerst npm run build. Node 22+, Chrome (Windows-default of CHROME_PATH).
import assert from 'node:assert/strict'
import { steps } from '../src/energie-basis/lesson.js'
import * as progress from '../src/energie-basis/progress.js'
import * as energy from '../src/energie/progress.js'
import * as biology from '../src/celmetabolisme/progress.js'
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
    assert.equal(await evaluate(`document.querySelector(${JSON.stringify(selector)}).querySelectorAll('.katex').length`), formulaCount(text), selector)
    assert.equal(await evaluate(`document.querySelector(${JSON.stringify(selector)}).querySelectorAll('.katex-mathml math').length`), formulaCount(text), 'MathML ontbreekt')
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
      const walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);
      let node; while(node=walker.nextNode()){
        if(!node.parentElement.closest('.katex') && /\\\\[()[\\]]/.test(node.textContent)) errors.push('platte LaTeX');
      }
      return errors;
    })()`), [], label)
  }
  const mobileLayouts = async label => {
    for (const width of [390, 320]) { await resize(width); await layout(`${label} @ ${width}`) }
  }

  await resize(1366)
  await visit('energie-basis/')
  await evaluate('document.fonts.ready')
  assert.match(await evaluate(`document.querySelector('main').textContent`), /4LAT \/ 4ECWE/)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Oefeningen 5–10 op p\. 77–78/)
  assert.doesNotMatch(await evaluate(`document.querySelector('main').textContent`), /Voor één lesuur/)
  await screenshot('01-start-desktop')
  const legacyKey = 'willebroek:energie-basis:fys4-basis-t2-rekenen-v1'
  const legacyState = { version: 'fys4-basis-t2-rekenen-v1', current: 16, completed: ['oud'], responses: {} }
  const originals = [[energy.STORAGE_KEY, energy.advance(energy.freshProgress())], [biology.STORAGE_KEY, biology.advance(biology.freshProgress())], [legacyKey, legacyState]]
  for (const [key, state] of originals) {
    await action(`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(JSON.stringify(state))})`)
  }

  await click('Start het leerpad')
  for (const [index, step] of steps.entries()) {
    assert.equal(await title(), step.title)
    assert.equal(await evaluate(`document.activeElement === document.querySelector('h1')`), true)
    assert.equal((await saved())?.completed.includes(step.id) ?? false, false, 'openen is geen afronden')
    await mobileLayouts(`${step.id} voor antwoord`)
    if (step.type === 'quiz') {
      assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
      await assertMath('.guided-question legend', step.question)
      for (const [optionIndex, option] of step.options.entries()) await assertMath(`.guided-option:nth-of-type(${optionIndex + 1})`, option)
      if (step.id === 'check-strategie') {
        await screenshot('04-strategievraag-mobile-320')
        await choose(0); await click('Controleer mijn antwoord')
        await assertMath('.guided-feedback p', step.hint)
        await mobileLayouts(`${step.id} foutfeedback`)
        await action(`document.querySelector('input[type=radio]').focus()`)
        for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 })
        await waitFor(() => evaluate(`document.querySelectorAll('input[type=radio]')[1].checked`), 'radio met toetsenbord')
      } else await choose(step.answer)
      await click('Controleer mijn antwoord')
      await assertMath('.guided-feedback p', step.correct)
      await mobileLayouts(`${step.id} feedback`)
      assert.equal(await evaluate(`document.querySelectorAll('.guided-question input:not(:disabled)').length`), 0)
    } else {
      assert.equal(await evaluate(`document.querySelectorAll('.guided-checklist').length`), 0, 'geen afvinklijst')
      assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), false, 'Gemaakt-knop is de bevestiging')
      assert.match(await evaluate(`document.querySelector('.guided-footer .btn-primary').textContent`), /gemaakt, verder/)
      assert.equal(await evaluate(`document.querySelectorAll('.guided-strategy li').length`), step.strategy.length)
      await assertMath('.guided-strategy', step.strategy.join(' '))
      const expectedMath = [...step.instructions, ...step.strategy, ...step.support].reduce((sum, text) => sum + formulaCount(text), 0)
      assert.equal(await evaluate(`document.querySelector('.guided-sheet').querySelectorAll('.katex').length`), expectedMath)
      assert.equal(await evaluate(`document.querySelector('.guided-support').open`), false)
      if (step.id === 'oefening-5') {
        await resize(1366); await screenshot('02-oefening-5-strategie-desktop')
      }
      await action(`document.querySelector('.guided-support summary').click()`)
      await assertMath('.guided-support', step.support.join(' '))
      await mobileLayouts(`${step.id} open hulp`)
      if (step.id === 'oefening-6b') {
        const before = await saved()
        await click('Pauzeren'); await command('Page.reload')
        await waitFor(() => evaluate(`!!document.querySelector('.guided-sheet h1')`), 'herladen boekwerk')
        await click('Ga verder waar je gebleven was')
        assert.equal(await title(), step.title)
        assert.deepEqual(await saved(), before)
        assert.equal(await evaluate(`document.querySelectorAll('.guided-checklist input').length`), 0)
        await action(`document.querySelector('.guided-support summary').click()`)
        await resize(320)
        await action(`document.querySelector('.guided-support').scrollIntoView({block:'start'})`)
        await screenshot('03-massa-vrijmaken-mobile-320')
      }
      if (step.id === 'oefening-9') {
        assert.equal((await saved()).current, index, 'na oefening 8 kunnen leerlingen gewoon verder')
        for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
        await waitFor(() => evaluate(`document.querySelector('h1').textContent === 'Stap voor stap aan de slag'`), 'Escape pauzeert')
        await click('Ga verder waar je gebleven was')
        assert.equal(await title(), step.title)
      }
      if (step.id === 'oefening-10') {
        assert.match(await evaluate(`document.querySelector('.guided-strategy').textContent`), /lengte van de helling/)
        assert.match(await evaluate(`document.querySelector('.guided-strategy').textContent`), /verticale hoogteverschil/)
        await resize(1366)
        await action(`document.querySelector('main').scrollTo({top:0})`)
        await screenshot('05-hellingen-strategie-desktop')
        await resize(320)
        await action(`document.querySelector('.guided-support').scrollIntoView({block:'start'})`)
        await screenshot('06-hellingen-hulp-mobile-320')
      }
    }
    await next()
  }

  assert.equal(await title(), 'Je berekeningen en redeneringen liggen klaar')
  assert.equal((await saved()).completed.length, steps.length)
  assert.deepEqual((await saved()).workChecks, {})
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Strategie en energiebehoud: 1 van 2/)
  assert.doesNotMatch(await evaluate(`document.querySelector('main').textContent`), /Opfrissing:|0 van 0/)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /9a–b en 10 met verklaring/)
  await mobileLayouts('afronding')
  await screenshot('07-afronding-mobile-320')
  await click('Vorige'); await click('Vorige')
  assert.equal(await title(), steps.at(-2).title)
  await next(); await next()
  assert.equal((await saved()).completed.length, steps.length)
  const fonts = await evaluate(`[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family)`)
  assert.ok(fonts.some(font => font.includes('KaTeX_Main')), 'KaTeX-fonts niet geladen')
  await click('Afronding bewaren en stoppen')
  await click('Opnieuw beginnen'); await click('Annuleren')
  assert.equal((await saved()).completed.length, steps.length)
  await click('Opnieuw beginnen'); await click('Ja, opnieuw beginnen')
  assert.equal((await saved()).current, 0)
  assert.deepEqual((await saved()).completed, [])
  for (const [key, state] of originals) {
    assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(key)}))`), state)
  }

  // Hulp na twee fouten blijft expliciet en bewaart de eerste poging.
  let assisted = progress.freshProgress()
  while (steps[assisted.current].type !== 'quiz') assisted = progress.advance(assisted)
  const quiz = steps[assisted.current]
  assisted = progress.answerQuestion(assisted, quiz, 0)
  assisted = progress.answerQuestion(assisted, quiz, 0)
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
  assert.equal(await title(), 'Oefening 8 · wat verandert er mee?')
  assert.deepEqual(exceptions, [])
  console.log('✓ energie basis v2: oefeningen 5–10 volledig, geen boekwerkvinkjes, strategieën en formulehulp, tien schermen met twee controles')
  console.log('✓ 320/390px, KaTeX/MathML en fonts, toetsenbord, hulp/retry, hervatten, Escape, terugkijken en eigen reset; v1 en andere routes behouden')
})
