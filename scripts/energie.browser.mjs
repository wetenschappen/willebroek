#!/usr/bin/env node
// Optionele echte browsertest, zonder extra dependency. Eerst npm run build.
// Node 22+ (WebSocket); Chrome op Windows of CHROME_PATH ingesteld.
import { spawn } from 'node:child_process'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { createServer } from 'node:net'
import { setTimeout as delay } from 'node:timers/promises'
import assert from 'node:assert/strict'
import { steps } from '../src/energie/lesson.js'
import { STORAGE_KEY } from '../src/energie/progress.js'

const artifacts = await mkdtemp(join(tmpdir(), 'energie-browser-'))
async function freePort() {
  const server = createServer()
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port
  await new Promise(resolve => server.close(resolve))
  return port
}
const port = await freePort(), chromePort = await freePort()
const origin = `http://127.0.0.1:${port}/willebroek/`
const url = origin + 'energie/'
const preview = spawn(process.execPath, [resolve('node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { stdio: 'pipe' })
const profile = join(artifacts, 'profile')
const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${chromePort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'pipe' })
let socket, nextId = 0
const pending = new Map(), exceptions = []
let launchError
chrome.on('error', error => { launchError = error })
preview.on('error', error => { launchError = error })
async function waitFor(fn, label) {
  for (let attempt = 0; attempt < 200; attempt++) {
    if (launchError) throw launchError
    try { const value = await fn(); if (value) return value } catch { /* Wacht op server/render. */ }
    await delay(75)
  }
  throw Error(`Timeout: ${label}`)
}
function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId
    const timer = setTimeout(() => { pending.delete(id); reject(Error(`CDP timeout: ${method}`)) }, 15000)
    pending.set(id, { resolve, reject, timer })
    socket.send(JSON.stringify({ id, method, params }))
  })
}
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text)
  return result.result.value
}
async function action(expression) { await evaluate(expression); await delay(60) }
async function click(text) {
  await action(`(() => { const e=[...document.querySelectorAll('button')].find(e=>e.getClientRects().length && e.textContent.trim()===${JSON.stringify(text)}); if(!e || e.disabled)throw Error('Button unavailable: '+${JSON.stringify(text)});e.click() })()`)
}
async function choose(index) { await action(`document.querySelectorAll('input[type=radio]')[${index}].click()`) }
async function screenshot(name) {
  const result = await command('Page.captureScreenshot', { format: 'png' })
  await writeFile(join(artifacts, `${name}.png`), Buffer.from(result.data, 'base64'))
}
const heading = () => evaluate(`document.querySelector('h1')?.textContent`)
const saved = () => evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)}))`)
async function reload() {
  await command('Page.reload')
  await waitFor(() => evaluate(`!!document.querySelector('.guided-sheet h1')`), 'reload')
}
async function noHorizontalOverflow() {
  assert.equal(await evaluate(`document.querySelector('main').scrollWidth <= document.querySelector('main').clientWidth`), true)
  assert.equal(await evaluate(`[...document.querySelectorAll('button')].filter(e=>e.getClientRects().length).every(e=>e.getBoundingClientRect().right<=innerWidth+1)`), true)
}
try {
  await waitFor(async () => (await fetch(url)).ok, 'preview')
  const target = await waitFor(async () => (await (await fetch(`http://127.0.0.1:${chromePort}/json`)).json()).find(item => item.type === 'page'), 'Chrome')
  socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data)
    if (message.id) {
      const entry = pending.get(message.id)
      if (!entry) return
      clearTimeout(entry.timer)
      pending.delete(message.id)
      if (message.error) entry.reject(Error(message.error.message))
      else entry.resolve(message.result)
    } else if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text)
  })
  await command('Runtime.enable')
  await command('Page.enable')
  await command('Emulation.setDeviceMetricsOverride', { width: 1366, height: 768, deviceScaleFactor: 1, mobile: false })
  await command('Page.navigate', { url })
  await waitFor(() => evaluate(`!!document.querySelector('.guided-sheet h1')`), 'home')
  await evaluate('document.fonts.ready')
  assert.equal(await heading(), 'Stap voor stap aan de slag')
  await screenshot('01-start-desktop')
  await click('Start het leerpad')
  await click('Mijn materiaal ligt klaar')
  await choose(0) // Fout diagnostisch antwoord moet doorgang geven en bewaard blijven.
  await click('Controleer mijn antwoord')
  assert.match(await evaluate(`document.querySelector('.guided-feedback').textContent`), /Even opfrissen/)
  await click('Verder')
  assert.equal((await saved()).responses[steps[1].id].first, 0)
  await reload()
  await click('Ga verder waar je gebleven was')
  assert.equal(await heading(), steps[2].title)

  // Doorloop elke stap; screenshots en overflowcontrole op klein mobiel scherm.
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  for (let index = 2; index < steps.length; index++) {
    const step = steps[index]
    assert.equal(await heading(), step.title)
    assert.equal(await evaluate(`document.activeElement === document.querySelector('h1')`), true, 'stapwissel focust titel')
    if (step.type === 'quiz') {
      if (step.id === 'systeem-check') {
        await choose(0); await click('Controleer mijn antwoord')
        assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
        await choose(1); await click('Controleer mijn antwoord')
        await action(`document.querySelector('.guided-help input').click()`)
        await click('Verder met hulp mogelijk maken')
        assert.equal((await saved()).responses[step.id].assisted, true)
      } else {
        await choose(step.answer)
        await click('Controleer mijn antwoord')
        assert.equal(await evaluate(`document.querySelector('fieldset').disabled`), true)
      }
    } else if (step.type === 'work') {
      assert.equal(await evaluate(`document.querySelector('.guided-footer .btn-primary').disabled`), true)
      for (let check = 0; check < step.checks.length; check++) {
        await action(`document.querySelectorAll('.guided-checklist input')[${check}].click()`)
      }
      if (step.id === 'oefening-4') await screenshot('02-boekwerk-mobile')
    }
    if (step.id === 'eenheid-check') await screenshot('03-check-mobile')
    await noHorizontalOverflow()
    await action(`document.querySelector('.guided-footer .btn-primary').click()`)
  }
  assert.equal(await heading(), 'Je bent klaar voor vandaag')
  assert.equal((await saved()).completed.length, steps.length)
  assert.match(await evaluate(`document.querySelector('main').textContent`), /Eindcheck: 3 van 3/)
  await click('Vorige')
  await click('Bekijk mijn afronding')
  assert.equal((await saved()).completed.length, steps.length)
  await screenshot('04-afronding-mobile')
  await click('Afronding bewaren en stoppen')
  await click('Opnieuw beginnen')
  await click('Annuleren')
  assert.equal((await saved()).completed.length, steps.length)
  await click('Opnieuw beginnen')
  await click('Ja, opnieuw beginnen')
  assert.equal((await saved()).completed.length, 0)
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' })
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' })
  await waitFor(() => evaluate(`document.querySelector('h1')?.textContent === 'Stap voor stap aan de slag'`), 'Escape pauzeert')

  // Opslagweigering: pagina blijft bruikbaar en meldt dat hervatten niet duurzaam is.
  await command('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(window,'localStorage',{get(){throw new Error('test: storage denied')}})` })
  await reload()
  assert.match(await evaluate(`document.querySelector('[role=status]').textContent`), /niet bewaren/)
  await click('Start het leerpad')
  await click('Mijn materiaal ligt klaar')
  assert.equal(await heading(), steps[1].title)

  // De planner moet nog zijn eigen app laden.
  await command('Page.navigate', { url: origin })
  await waitFor(() => evaluate(`!!document.querySelector('.subject-choice')`), 'planner blijft bereikbaar')
  assert.deepEqual(exceptions, [])
  console.log('✓ energie browser: volledige route, feedback/hulp, hervatten, reset, Escape, mobiel en opslagweigering')
  console.log('Screenshots:', artifacts)
} finally {
  socket?.close()
  for (const entry of pending.values()) clearTimeout(entry.timer)
  chrome.kill()
  preview.kill()
  await delay(500)
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 }).catch(() => {})
}
