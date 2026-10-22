#!/usr/bin/env node
// Optional real-browser regression check, no third-party browser dependency.
// First npm run build. Set CHROME_PATH if Chrome is not in its Windows default.
import { spawn } from 'node:child_process'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { createServer } from 'node:net'
import assert from 'node:assert/strict'
import { setTimeout as delay } from 'node:timers/promises'
import { DERIVATION, EXPERIMENTS, BALANCE_CASES, VOLUME_CHECKS } from '../s-activities/archimedes/tasks.js'
import lesson1 from '../src/lessons/fys4-m01-l09-archimedeskracht-vloeistoffen.js'
import lesson2 from '../src/lessons/fys4-m01-l10-archimedeskracht-gassen.js'
import mendel from '../src/lessons/bio6-m02-l01-mendel.js'
const artifacts = process.env.ARCHIMEDES_ARTIFACTS || await mkdtemp(join(tmpdir(), 'archimedes-browser-'))
await mkdir(artifacts, { recursive: true })
const profile = await mkdtemp(join(artifacts, 'chrome-profile-'))
async function freePort() { const server = createServer(); await new Promise(r => server.listen(0, '127.0.0.1', r)); const port = server.address().port; await new Promise(r => server.close(r)); return port }
const serverPort = await freePort(), chromePort = await freePort()
const origin = `http://127.0.0.1:${serverPort}/willebroek/`
const preview = spawn(process.execPath, [resolve('node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(serverPort), '--strictPort'], { stdio: 'pipe' })
const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${chromePort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'pipe' })
let socket, nextId = 0
const pending = new Map(), exceptions = [], deckProblems = []
console.log('Browser artifacts:', artifacts)
async function waitFor(fn, label, timeout = 15000) { const start = Date.now(); while (Date.now() - start < timeout) { try { const value = await fn(); if (value) return value } catch {} await delay(75) } throw Error(`Timeout: ${label}`) }
function command(method, params = {}) { return new Promise((resolve, reject) => { const id = ++nextId; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })) }) }
async function evaluate(expression) { const r = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result.value }
async function action(expression) { await evaluate(expression); await delay(45) }
async function clickText(text) { await action(`(() => { const scope=document.querySelector('.arch-lab') || document; const e=[...scope.querySelectorAll('button')].find(e=>e.getClientRects().length && e.textContent.includes(${JSON.stringify(text)})); if(!e || e.disabled) throw Error('Button unavailable: '+${JSON.stringify(text)}); e.click() })()`) }
async function screenshot(name) { const r = await command('Page.captureScreenshot', { format: 'png' }); await writeFile(join(artifacts, `${name}.png`), Buffer.from(r.data, 'base64')) }
async function visit(lesson) { await command('Page.navigate', { url: `${origin}#/les/${lesson.id}` }); await waitFor(() => evaluate(`!!document.querySelector('.lesson-board') && document.querySelector('h1')?.textContent.includes(${JSON.stringify(lesson.config.title)})`), lesson.id); await evaluate(`document.fonts.ready`); }
async function openLab() { await action(`(() => { const e=[...document.querySelectorAll('.lesson-activity')].find(e=>e.textContent.includes('Start') && (e.textContent.includes('Physics Lab') || e.textContent.includes('Krachtenbalansen:'))); if(!e) throw Error('Lab card missing'); window.testOpener=e; e.focus(); e.click() })()`); await waitFor(() => evaluate(`!!document.querySelector('.arch-lab')`), 'lab open') }
async function choose(name, value) { await action(`(() => { const e=document.querySelector('input[name="${name}"][value="${value}"]'); if(!e || e.disabled) throw Error('Choice unavailable: ${name}'); e.click() })()`) }
async function answerQuestion(name, correct) { await choose(name, correct); await action(`document.querySelector('input[name="${name}"]').closest('.arch-question-block').querySelector('button').click()`); }
async function escape() { await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' }); await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' }); await delay(100) }
async function inspectDeck(lesson, key) {
  await visit(lesson)
  const cardIndex = Object.values(lesson.timeline).flatMap(s => s.cards).findIndex(c => c.slidesKey === key)
  await action(`document.querySelectorAll('.lesson-activity')[${cardIndex}].click()`)
  await waitFor(() => evaluate(`!!document.querySelector('.ppt-stage')`), 'presentation')
  await delay(650)
  await evaluate(`document.head.insertAdjacentHTML('beforeend','<style id="browser-test-no-motion">*,*::before,*::after{transition:none!important;animation:none!important}</style>')`)
  const overflow = []
  for (let i = 0; i < lesson[key].length; i++) {
    const slide = lesson[key][i]
    const limit = slide.layout === 'predict' ? 1 : ['book-example', 'steps', 'worked-example'].includes(slide.layout) ? slide.steps.length : 0
    for (let n = 0; n < limit; n++) await action(`document.querySelector('[aria-label="Volgende slide"]').click()`)
    const metrics = await evaluate(`(() => { const e=document.querySelector('.slide-copy'); if(!e)return null; const r=e.getBoundingClientRect(); return {height:e.clientHeight, scroll:e.scrollHeight, width:e.clientWidth, scrollWidth:e.scrollWidth, mathOverflow:[...e.querySelectorAll('.katex-html')].some(k=>k.getBoundingClientRect().right>r.right+2)} })()`)
    if (metrics && (metrics.scroll > metrics.height + 2 || metrics.scrollWidth > metrics.width + 2 || metrics.mathOverflow)) overflow.push({ index: i, title: slide.title, ...metrics })
    if (key === 'slidesB' && slide.workId === '7' && slide.title.includes('2/2')) await screenshot('book-boot')
    if (key === 'slidesB' && slide.workId === '12') await screenshot('book-boeien')
    if (key === 'slidesB' && slide.workId === 'example-whale' && slide.title.includes('oplossing')) await screenshot(`book-whale-${lesson === lesson1 ? 'uur1' : 'uur2'}`)
    if (i < lesson[key].length - 1) await action(`document.querySelector('[aria-label="Volgende slide"]').click()`)
  }
  console.log(`Deck ${lesson.id} ${key}: ${lesson[key].length} slides, overflow:`, JSON.stringify(overflow))
  deckProblems.push(...overflow)
  if (key === 'slidesB' && lesson === lesson2) {
    assert.equal(await evaluate(`document.querySelector('[aria-label="Kies een onderdeel of boekopgave"]').options.length`), 22)
    await action(`(() => { const e=document.querySelector('select[aria-label="Kies een onderdeel of boekopgave"]'); const o=[...e.options].find(o=>o.textContent.startsWith('14 ·')); e.value=o.value; e.dispatchEvent(new Event('change',{bubbles:true})) })()`)
    assert.match(await evaluate(`document.querySelector('.slide-header-compact').textContent`), /14/)
    assert.equal(await evaluate(`document.querySelectorAll('.book-line').length`), 0, 'Jump must hide previous solutions')
  }
  await escape()
}
try {
  chrome.on('error', error => { console.error(error.message); process.exitCode = 1 })
  await waitFor(async () => (await fetch(origin)).ok, 'Vite preview')
  const targets = await waitFor(async () => { const r = await fetch(`http://127.0.0.1:${chromePort}/json`); const list = await r.json(); return list.find(t => t.type === 'page') }, 'Chrome')
  socket = new WebSocket(targets.webSocketDebuggerUrl)
  await new Promise(r => socket.addEventListener('open', r, { once: true }))
  socket.addEventListener('message', event => { const message = JSON.parse(event.data); if (message.id) { const p = pending.get(message.id); pending.delete(message.id); if(message.error)p?.reject(Error(message.error.message)); else p?.resolve(message.result) } else if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text) })
  await command('Page.enable'); await command('Runtime.enable')
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await visit(lesson1)
  await evaluate('localStorage.clear()')
  await openLab()
  assert.equal(await evaluate(`document.querySelector('.arch-footer .btn-primary').disabled`), true)
  await screenshot('lab-volumes')
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' })
  await delay(60)
  assert.equal(await evaluate(`document.activeElement.id`), 'arch-tab-derive')
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Home', code: 'Home' })
  await delay(60)
  assert.equal(await evaluate(`document.activeElement.id`), 'arch-tab-volume')
  await action(`document.querySelector('.arch-footer .btn-ghost').focus()`)
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
  assert.equal(await evaluate(`document.activeElement.getAttribute('aria-label')`), 'Archimedeslab sluiten', 'Tab must wrap inside the dialog')
  // A wrong answer must remain retryable but must not inflate first-attempt data.
  await answerQuestion('volume-partial', 0)
  await answerQuestion('volume-partial', 1)
  await answerQuestion('volume-rho', VOLUME_CHECKS[1].correct)
  await clickText('Naar de afleidingbouwer')
  for (let i = 0; i < DERIVATION.length; i++) { await answerQuestion(`derive-${i}`, DERIVATION[i].correct); if(i === 3)await screenshot('lab-afleiding'); if(i < DERIVATION.length - 1) await clickText('Volgende denkstap') }
  await clickText('Naar het Physics Lab')
  for (const e of EXPERIMENTS) {
    await clickText(`${EXPERIMENTS.indexOf(e) + 1} · ${e.label}`)
    await choose(`predict-${e.id}`, e.id === 'density' ? 0 : e.prediction)
    await clickText('Voorspelling vastleggen')
    await clickText('Meting vastleggen')
    assert.equal(await evaluate(`!!document.querySelector('input[name="reason-${e.id}"]')`), false, 'One measurement is not sufficient')
    await clickText('Zet op B:')
    await clickText('Meting vastleggen')
    await answerQuestion(`reason-${e.id}`, e.correct)
    if(e.id === 'depth')await screenshot('lab-diepte')
  }
  assert.equal(await evaluate(`document.querySelector('.arch-footer .btn-primary').disabled`), false)
  const saved = await evaluate(`JSON.parse(localStorage.getItem('willebroek:archimedes:v1:4NAWE-4SPOWE-t1-archimedes')).state`)
  assert.equal(saved.volume.partial.first, false)
  assert.equal(saved.experiments.density.prediction, 0)
  assert.equal(saved.experiments.density.done, true)
  await clickText('Onderzoek afronden')
  await waitFor(() => evaluate(`!document.querySelector('.arch-lab')`), 'completion close')
  await command('Page.reload')
  await waitFor(() => evaluate(`!!document.querySelector('.lesson-board')`), 'reload')
  await openLab()
  assert.equal(await evaluate(`document.querySelector('.arch-footer .btn-primary').disabled`), false, 'Progress must survive reload')
  await clickText('Voortgang wissen'); await clickText('Annuleren')
  assert.equal(await evaluate(`document.querySelector('.arch-footer .btn-primary').disabled`), false, 'Cancelling reset must preserve progress')
  await escape()
  assert.equal(await evaluate(`document.activeElement === window.testOpener`), true, 'Closing must restore focus')
  await visit(lesson2)
  await openLab()
  assert.equal(await evaluate(`document.querySelector('[role="tab"][aria-selected="true"]').textContent`), 'Drijven en gassen')
  assert.equal(await evaluate(`document.querySelector('.arch-footer .btn-primary').disabled`), true)
  for (const c of BALANCE_CASES) {
    await action(`([...document.querySelectorAll('.arch-subnav button')].find(e=>e.textContent.startsWith('${BALANCE_CASES.indexOf(c) + 1} ·'))).click()`)
    await answerQuestion(`relation-${c.id}`, ['<', '=', '>'].indexOf(c.relation))
    await answerQuestion(`behavior-${c.id}`, ['zinkt', 'zweeft', 'stijgt', 'drijft'].indexOf(c.behavior))
    if(c.id === 'float')await screenshot('lab-drijven')
  }
  assert.equal(await evaluate(`document.querySelector('.arch-footer .btn-primary').disabled`), false)
  await escape()
  await action(`([...document.querySelectorAll('.lesson-activity')].find(e=>e.textContent.includes('Boekopgaven 1–18:'))).click()`)
  await waitFor(() => evaluate(`document.querySelectorAll('.workbook-exercise-table tbody tr').length === 18`), '18 workbook exercises')
  await escape()
  for (const lesson of [lesson1, lesson2]) for (const key of ['slidesA', 'slidesB', 'slidesC']) {
    // slidesA receives an automatic discipline slide; include it in the count.
    if(key === 'slidesA') {
      // Count and inspect the automatically injected slide as part of the deck.
      const actual = { ...lesson, slidesA: [{ layout:'discipline', title:'Afspraken' }, ...lesson.slidesA] }
      await inspectDeck(actual, key)
    } else await inspectDeck(lesson, key)
  }
  await inspectDeck(mendel, 'slidesB')
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  await visit(lesson1); await openLab(); await clickText('Physics Lab')
  assert.equal(await evaluate(`document.querySelector('[role="tab"][aria-selected="true"]').textContent`), 'Physics Lab')
  const width = await evaluate(`({ shell:document.querySelector('.arch-lab').scrollWidth, viewport:document.documentElement.clientWidth, page:document.documentElement.scrollWidth, body:document.querySelector('.arch-body').clientHeight })`)
  assert.equal(width.viewport, 390)
  assert.ok(width.shell <= width.viewport + 1 && width.page <= width.viewport + 1, JSON.stringify(width))
  assert.ok(width.body > 180)
  await action(`(() => { const e=document.querySelector('#arch-experiment'); e.value='depth'; e.dispatchEvent(new Event('change',{bubbles:true})) })()`)
  assert.equal(await evaluate(`document.querySelector('.arch-workbench h4').textContent`), 'Diepte', 'Mobile parameter selector must update the investigation')
  await screenshot('lab-mobile')
  await clickText('Voortgang wissen'); await clickText('Ja, wissen')
  assert.equal(await evaluate(`document.querySelector('.arch-footer strong').textContent`), '0/15 onderdelen van dit lesuur afgerond')
  assert.equal(await evaluate(`JSON.parse(localStorage.getItem('willebroek:archimedes:v1:4NAWE-4SPOWE-t1-archimedes')).state.balances.float.behavior.done`), false, 'Confirmed reset covers both hours')
  await escape()
  // A blocked write must be reported without interrupting the activity.
  await evaluate(`window.originalStorageWrite=Storage.prototype.setItem; Storage.prototype.setItem=function(k,v){if(k.startsWith('willebroek:archimedes:'))throw new Error('Test: storage blocked');return window.originalStorageWrite.call(this,k,v)}`)
  await openLab(); await answerQuestion('volume-partial', 1)
  assert.equal(await evaluate(`document.querySelector('.arch-body').textContent.includes('niet laden of bewaren')`), true)
  await evaluate(`Storage.prototype.setItem=window.originalStorageWrite`)
  await escape()
  assert.equal(deckProblems.length, 0, JSON.stringify(deckProblems))
  assert.equal(exceptions.length, 0, JSON.stringify(exceptions))
  console.log('PASS: volumes, all derivation steps, five measured experiments, retry/first attempt, persistence, five force balances, workbook, six decks + Mendel regression, contents selector, mobile, keyboard/focus, confirmed reset, blocked storage, Escape. No runtime exceptions.')
  console.log('Screenshots:', artifacts)
} finally {
  try { if(socket?.readyState === WebSocket.OPEN) await command('Browser.close') } catch {}
  socket?.close(); chrome.kill(); preview.kill()
  await delay(700)
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }).catch(() => {})
}
