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
  assert.match(await evaluate(`document.querySelector('main').textContent`), /6a op p\. 77/)
  await screenshot('01-start-desktop')
  const originalEnergy = energy.advance(energy.freshProgress())
  const originalBiology = biology.advance(biology.freshProgress())
  for (const [key, state] of [[energy.STORAGE_KEY, originalEnergy], [biology.STORAGE_KEY, originalBiology]]) {
    await action(`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(JSON.stringify(state))})`)
  }

  await click('Start het leerpad')
  for (const step of steps) {
    assert.equal(await title(), step.title)
    assert.equal(await evaluate(`document.activeElement === document.querySelector('h1')`), true)
    await mobileLayouts(`${step.id} voor antwoord`)
    if (step.type === 'quiz') {
      assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
      await assertMath('.guided-question legend', step.question)
      for (const [index, option] of step.options.entries()) await assertMath(`.guided-option:nth-of-type(${index + 1})`, option)
      if (step.id === 'eindcheck-formulekeuze') await screenshot('05a-formulevraag-mobile-320')
      if (step.id === 'opfrissing-beweging') {
        await choose(1) // Diagnostisch: ook na een fout antwoord doorgang.
        await click('Controleer mijn antwoord')
        await assertMath('.guided-feedback p', step.hint)
      } else if (step.id === 'opfrissing-eenheid') {
        await action(`document.querySelector('input[type=radio]').focus()`)
        for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 })
        await waitFor(() => evaluate(`document.querySelectorAll('input[type=radio]')[1].checked`), 'radio met toetsenbord')
        await click('Controleer mijn antwoord')
        await assertMath('.guided-feedback p', step.correct)
      } else if (step.id === 'check-kwadraat') {
        for (let attempt = 0; attempt < 2; attempt++) {
          await choose(0); await click('Controleer mijn antwoord')
          assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
          await assertMath('.guided-feedback p', step.hint)
        }
        await action(`document.querySelector('.guided-help input').click()`)
        await click('Verder met hulp mogelijk maken')
        assert.equal((await saved()).responses[step.id].assisted, true)
        await screenshot('02-kwadraat-hulp-mobile')
      } else {
        if (['check-lengteverandering', 'eindcheck-massa'].includes(step.id)) {
          await choose(0 === step.answer ? 1 : 0); await click('Controleer mijn antwoord')
          await assertMath('.guided-feedback p', step.hint)
          await mobileLayouts(`${step.id} foutfeedback`)
        }
        await choose(step.answer); await click('Controleer mijn antwoord')
        await assertMath('.guided-feedback p', step.correct)
      }
      await mobileLayouts(`${step.id} feedback`)
      if (step.id === 'eindcheck-formulekeuze') {
        await screenshot('05-formulekeuze-mobile-320')
        await resize(1366); await screenshot('06-formulekeuze-desktop')
      }
      if (step.id === 'eindcheck-rekenen') await screenshot('07-eindberekening-mobile-320')
    } else {
      const expectedMath = [...step.instructions, step.note || '', ...(step.support ?? [])].reduce((sum, text) => sum + formulaCount(text), 0)
      assert.equal(await evaluate(`document.querySelector('.guided-sheet').querySelectorAll('.katex').length`), expectedMath)
      if (step.type === 'work') {
        assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
        assert.equal(await evaluate(`document.querySelector('.guided-support').open`), false)
        await action(`document.querySelector('.guided-support summary').click()`)
        await assertMath('.guided-support', step.support.join(' '))
        await mobileLayouts(`${step.id} open aanwijzing`)
        if (step.id === 'oefening-5-beweging-plan') {
          await resize(1366); await screenshot('03-boekwerk-hulp-desktop')
          await resize(320)
          await action(`document.querySelector('.guided-support').scrollIntoView({block:'start'})`)
          await screenshot('04-boekwerk-hulp-mobile-320')
        }
        for (let index = 0; index < step.checks.length; index++) {
          await action(`document.querySelectorAll('.guided-checklist input')[${index}].click()`)
          if (step.id === 'oefening-5-beweging-plan' && index === 0) {
            await click('Pauzeren'); await command('Page.reload')
            await waitFor(() => evaluate(`!!document.querySelector('.guided-sheet h1')`), 'herladen boekwerk')
            await click('Ga verder waar je gebleven was')
            assert.equal(await title(), step.title)
            assert.deepEqual(await evaluate(`[...document.querySelectorAll('.guided-checklist input')].map(e=>e.checked)`), [true, false])
            assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
          }
        }
        if (step.id === 'oefening-6a') {
          for (const type of ['keyDown', 'keyUp']) await command('Input.dispatchKeyEvent', { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
          await waitFor(() => evaluate(`document.querySelector('h1').textContent === 'Stap voor stap aan de slag'`), 'Escape pauzeert')
          await click('Ga verder waar je gebleven was')
          assert.equal(await title(), step.title)
          assert.equal(await evaluate(`[...document.querySelectorAll('.guided-checklist input')].every(e=>e.checked)`), true)
        }
      }
    }
    await next()
  }

  assert.equal(await title(), 'Je vier berekeningen zijn klaar')
  assert.equal((await saved()).completed.length, steps.length)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Eindcheck: 2 van 3/)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Opfrissing: 1 van 2/)
  await mobileLayouts('afronding')
  await screenshot('08-afronding-mobile-320')
  // Terugkijken verandert de score en de telling niet.
  await click('Vorige'); await next()
  assert.equal((await saved()).completed.length, steps.length)
  assert.equal(await evaluate(`document.querySelectorAll('.guided-math-error').length`), 0)
  const fonts = await evaluate(`[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family)`)
  assert.ok(fonts.some(font => font.includes('KaTeX_Main')), 'KaTeX-fonts niet geladen')
  await click('Afronding bewaren en stoppen')
  await click('Opnieuw beginnen'); await click('Annuleren')
  assert.equal((await saved()).completed.length, steps.length)
  await click('Opnieuw beginnen'); await click('Ja, opnieuw beginnen')
  assert.equal((await saved()).current, 0)
  assert.deepEqual((await saved()).completed, [])
  for (const [key, state] of [[energy.STORAGE_KEY, originalEnergy], [biology.STORAGE_KEY, originalBiology]]) {
    assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(key)}))`), state)
  }
  assert.deepEqual(exceptions, [])
  console.log('✓ energie basis browser: alle 16 schermen, formulevelden en MathML, hints, hulp/retry, deelvinkjes na refresh, toetsenbord en Escape')
  console.log('✓ mobiel 320/390px zonder horizontale overloop; KaTeX-font geladen; aparte opslag en reset zonder de andere routes te wissen')
})
