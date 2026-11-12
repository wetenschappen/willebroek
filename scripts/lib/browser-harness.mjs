// Optionele Chrome/CDP-testhulp zonder extra npm-dependency. Node 22+.
import { spawn } from 'node:child_process'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { createServer } from 'node:net'
import { setTimeout as delay } from 'node:timers/promises'

async function freePort() {
  const server = createServer()
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port
  await new Promise(resolve => server.close(resolve))
  return port
}

export async function runBrowser(name, test) {
  const artifacts = await mkdtemp(join(tmpdir(), `${name}-browser-`))
  const profile = join(artifacts, 'profile')
  const port = await freePort(), chromePort = await freePort()
  const origin = `http://127.0.0.1:${port}/willebroek/`
  const preview = spawn(process.execPath, [resolve('node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { stdio: 'pipe' })
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${chromePort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'pipe' })
  let socket, nextId = 0, launchError
  const pending = new Map(), exceptions = []
  chrome.on('error', error => { launchError = error })
  preview.on('error', error => { launchError = error })
  async function waitFor(fn, label) {
    for (let attempt = 0; attempt < 200; attempt++) {
      if (launchError) throw launchError
      try { const value = await fn(); if (value) return value } catch { /* Wacht op render/server. */ }
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
  async function screenshot(filename) {
    const result = await command('Page.captureScreenshot', { format: 'png' })
    await writeFile(join(artifacts, `${filename}.png`), Buffer.from(result.data, 'base64'))
  }
  async function click(text) {
    await action(`(() => { const e=[...document.querySelectorAll('button')].find(e=>e.getClientRects().length && e.textContent.trim()===${JSON.stringify(text)}); if(!e || e.disabled)throw Error('Button unavailable: '+${JSON.stringify(text)});e.click() })()`)
  }
  async function visit(path) {
    await command('Page.navigate', { url: origin + path })
    await waitFor(() => evaluate(`!!document.querySelector('.guided-sheet h1')`), path)
  }
  try {
    await waitFor(async () => (await fetch(origin)).ok, 'preview')
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
    await test({ origin, command, evaluate, action, click, screenshot, waitFor, visit, exceptions })
    console.log('Screenshots:', artifacts)
  } finally {
    socket?.close()
    for (const entry of pending.values()) clearTimeout(entry.timer)
    chrome.kill()
    preview.kill()
    await delay(500)
    await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 }).catch(() => {})
  }
}
