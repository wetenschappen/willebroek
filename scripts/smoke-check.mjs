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
  if (!response.body.includes('<title>GO! Atheneum Willebroek</title>')) {
    throw new Error('preview serveert niet de verwachte Willebroek-index')
  }

  // Elke asset waarnaar de HTML of de meta verwijst moet echt bestaan.
  // Een ontbrekend og-image.png gaf eerder online een 404 zonder dat iemand
  // het merkte; deze check voorkomt dat.
  //
  // Let op: vite preview valt voor onbekende paden terug op index.html met
  // HTTP 200. Een statuscontrole alleen is dus zinloos — we controleren ook
  // dat het antwoord geen HTML is.
  const requiredAssets = ['planner-icon.svg', 'og-image.png']
  for (const asset of requiredAssets) {
    const assetResponse = await request(base + asset)
    const looksLikeHtml = /<html|<!doctype/i.test(assetResponse.body)
    if (assetResponse.status !== 200 || looksLikeHtml || assetResponse.body.length === 0) {
      throw new Error(`${asset} ontbreekt in de build (HTTP ${assetResponse.status}${looksLikeHtml ? ', kreeg index.html terug' : ''})`)
    }
  }

  const ogImage = /<meta property="og:image" content="([^"]+)">/.exec(response.body)
  if (!ogImage) throw new Error('og:image ontbreekt in index.html')
  if (!/^https:\/\//.test(ogImage[1])) {
    throw new Error(`og:image moet een absolute URL zijn; gevonden: ${ogImage[1]}`)
  }
  if (!response.body.includes('og:image:width')) {
    throw new Error('og:image mist afmetingen')
  }

  console.log(`✓ preview smoke test: ${base} → HTTP ${response.status}`)
  console.log(`✓ og-image.png, planner-icon.svg en og:image-metadata aanwezig`)
} catch (error) {
  console.error(error.message)
  if (output) console.error(output)
  process.exitCode = 1
} finally {
  server.kill()
}
