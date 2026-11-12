#!/usr/bin/env node
// Eerst npm run build. Node 22+, Chrome (of CHROME_PATH).
import assert from 'node:assert/strict'
import { steps } from '../src/celmetabolisme/lesson.js'
import { STORAGE_KEY } from '../src/celmetabolisme/progress.js'
import { steps as energySteps } from '../src/energie/lesson.js'
import * as energy from '../src/energie/progress.js'
import { runBrowser } from './lib/browser-harness.mjs'

await runBrowser('celmetabolisme', async ({ command, evaluate, action, click, screenshot, waitFor, visit, exceptions }) => {
  const saved = () => evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`)
  const title = () => evaluate(`document.querySelector('h1')?.textContent`)
  const choose = async index => action(`document.querySelectorAll('input[type=radio]')[${index}].click()`)
  const next = async () => {
    assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), false)
    await action(`document.querySelector('.guided-footer .btn-primary').click()`)
  }
  await command('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false })
  await visit('celmetabolisme/')
  await evaluate('document.fonts.ready')
  assert.match(await evaluate(`document.querySelector('main').textContent`), /5SPOWE \/ 5MOWE/)
  assert.doesNotMatch(await evaluate(`document.querySelector('main').textContent`), /energieformules/)
  await screenshot('01-start-desktop')

  // Zet echte oude energievoortgang klaar om de scheiding en migratie te testen.
  let oldEnergy = energy.freshProgress()
  for (const step of energySteps) {
    if (step.type === 'quiz') oldEnergy = energy.answerQuestion(oldEnergy, step, step.answer)
    if (step.type === 'work') oldEnergy = energy.setWorkChecks(oldEnergy, step.checks.map((_, index) => index))
    oldEnergy = energy.advance(oldEnergy)
  }
  delete oldEnergy.workChecks
  await action(`localStorage.setItem(${JSON.stringify(energy.STORAGE_KEY)},${JSON.stringify(JSON.stringify(oldEnergy))})`)
  await click('Start het leerpad')
  for (let index = 0; index < steps.length; index++) {
    const step = steps[index]
    assert.equal(await title(), step.title)
    assert.equal(await evaluate(`document.activeElement === document.querySelector('h1')`), true)
    if (step.id === 'ophalen-enzym') {
      // Native radiogroep moet met het toetsenbord werken.
      await action(`document.querySelector('input[type=radio]').focus()`)
      await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 })
      await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 })
      await waitFor(() => evaluate(`document.querySelectorAll('input[type=radio]')[1].checked`), 'radio met toetsenbord')
      await click('Controleer mijn antwoord')
    } else if (step.type === 'quiz') {
      if (step.id === 'check-koude') {
        await choose(0); await click('Controleer mijn antwoord')
        assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
        await choose(1); await click('Controleer mijn antwoord')
        await action(`document.querySelector('.guided-help input').click()`)
        await click('Verder met hulp mogelijk maken')
      } else {
        if (step.id === 'eindcheck-pH') { await choose(1); await click('Controleer mijn antwoord') }
        await choose(step.answer); await click('Controleer mijn antwoord')
      }
    } else if (step.type === 'work') {
      assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
      for (let check = 0; check < step.checks.length; check++) {
        await action(`document.querySelectorAll('.guided-checklist input')[${check}].click()`)
        if (step.id === 'oefening-2' && check === 0) {
          await click('Pauzeren')
          await command('Page.reload')
          await waitFor(() => evaluate(`!!document.querySelector('.guided-sheet h1')`), 'refresh boekwerk')
          await click('Ga verder waar je gebleven was')
          assert.equal(await title(), step.title)
          assert.deepEqual(await evaluate(`[...document.querySelectorAll('.guided-checklist input')].map(input=>input.checked)`), [true, false, false])
          assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
        }
      }
      if (step.support) {
        assert.equal(await evaluate(`document.querySelector('.guided-support').open`), false, 'hint begint gesloten bij elke nieuwe opdracht')
        await action(`document.querySelector('.guided-support summary').click()`)
        assert.equal(await evaluate(`document.querySelector('.guided-support').open`), true)
      }
      for (const [linkIndex, link] of (step.links ?? []).entries()) {
        assert.equal(await evaluate(`document.querySelectorAll('.guided-links a')[${linkIndex}].href`), link.url)
        assert.equal(await evaluate(`document.querySelectorAll('.guided-links a')[${linkIndex}].target`), '_blank')
      }
      if (step.id === 'oefening-4') {
        await screenshot('02-boekwerk-desktop')
        await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
        await screenshot('03-boekwerk-mobile')
      }
    }
    assert.equal(await evaluate(`document.querySelector('main').scrollWidth <= document.querySelector('main').clientWidth`), true)
    assert.equal(await evaluate(`[...document.querySelectorAll('button')].filter(e=>e.getClientRects().length).every(e=>e.getBoundingClientRect().right<=innerWidth+1)`), true)
    await next()
  }
  assert.equal(await title(), 'Je boekwerk is klaar')
  assert.equal((await saved()).completed.length, steps.length)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Eindcheck: 2 van 3/)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /1–8/)
  assert.doesNotMatch(await evaluate(`document.querySelector('main').textContent`), /energieformules/)
  await screenshot('04-afronding-mobile')
  await click('Afronding bewaren en stoppen')
  await click('Opnieuw beginnen'); await click('Annuleren')
  assert.equal((await saved()).completed.length, steps.length)
  await click('Opnieuw beginnen'); await click('Ja, opnieuw beginnen')
  assert.equal((await saved()).completed.length, 0)
  assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(energy.STORAGE_KEY)}))`), oldEnergy)

  await visit('energie/')
  await click('Bekijk mijn afronding')
  assert.equal(await title(), 'Je bent klaar voor vandaag')
  assert.equal(await evaluate(`document.querySelector('[role=progressbar]').getAttribute('aria-valuenow')`), String(energySteps.length))
  assert.deepEqual(exceptions, [])
  console.log('✓ celmetabolisme browser: alle schermen, boekwerk, deelvinkjes na refresh, hints, bronlinks, toetsenbord, hulp en mobiele eindcheck')
  console.log('✓ energie: oude klasvoortgang behouden; reset van celmetabolisme raakt energie niet')
})
