#!/usr/bin/env node
/**
 * Kleine productie-smoketest zonder browserdependency.
 * Verwacht dat `npm run build` al uitgevoerd is.
 */

import { spawn } from 'node:child_process'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js')
const port = 4177
const base = `http://127.0.0.1:${port}/willebroek/`

const request = url => new Promise((resolve, reject) => {
  const req = http.get(url, response => {
    let body = ''
    response.setEncoding('utf8')
    response.on('data', chunk => { body += chunk })
    response.on('end', () => resolve({ status: response.statusCode, body }))
  })
  req.setTimeout(5000, () => req.destroy(new Error('timeout')))
  req.on('error', reject)
})

const server = spawn(process.execPath, [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe']
})

let output = ''
server.stdout.on('data', chunk => { output += chunk.toString() })
server.stderr.on('data', chunk => { output += chunk.toString() })

try {
  let response
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      response = await request(base)
      break
    } catch {
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  }

  if (!response || response.status !== 200) {
    throw new Error(`preview gaf geen HTTP 200 voor ${base}`)
  }
  if (!response.body.includes('<title>Fysica &amp; Biologie')) {
    throw new Error('preview serveert niet de verwachte Willebroek-index')
  }

  console.log(`✓ preview smoke test: ${base} → HTTP ${response.status}`)
} catch (error) {
  console.error(error.message)
  if (output) console.error(output)
  process.exitCode = 1
} finally {
  server.kill()
}
