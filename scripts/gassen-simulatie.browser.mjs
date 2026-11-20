import assert from 'node:assert/strict'
import { runBrowser } from './lib/browser-harness.mjs'

await runBrowser('gassen-simulatie', async ({ origin, command, evaluate, action, click, waitFor, screenshot, exceptions }) => {
  const quantities = () => evaluate(`Array.from(document.querySelectorAll('[data-quantity]'), e => e.textContent.trim())`)
  const select = value => action(`(() => {
    const e = document.querySelector('#gas-parameter');
    e.value = ${JSON.stringify(value)};
    e.dispatchEvent(new InputEvent('input', { bubbles: true }));
  })()`)
  const clickAt = (type, x, y) => command('Input.dispatchMouseEvent', { type, x, y, button: type === 'mouseMoved' ? 'none' : 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: type === 'mouseMoved' ? 0 : 1 })
  const resize = (width, height) => command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 })
  await resize(1366, 768)
  await command('Page.navigate', { url: origin + 'gassen/simulatie/' })
  await waitFor(() => evaluate(`!!document.querySelector('.gas-cylinder circle')`), 'cilinder geladen')
  assert.equal(await evaluate('document.title'), 'Gaswetten — cilinder met zuiger')
  assert.equal(await evaluate('localStorage.length'), 0)
  assert.equal(await evaluate(`document.querySelectorAll('header, footer').length`), 1)
  assert.equal(await evaluate(`document.querySelector('header').getBoundingClientRect().height < 66`), true)
  assert.equal(await evaluate(`document.querySelector('.gas-demo').scrollHeight <= innerHeight + 1`), true)
  assert.equal(await evaluate(`!!document.querySelector('.guided-sheet')`), false)
  await screenshot('01-boyle-desktop')
  await select(7.5)
  assert.deepEqual(await quantities(), ['332,4 kPa', '7,50 L', '300 K', '1,00 mol'])
  await click('Herstel beginstand')
  const [x, y] = await evaluate(`(() => {
    const r = document.querySelector('.gas-piston-head').getBoundingClientRect();
    return [r.x + r.width / 4, r.y + r.height / 2];
  })()`)
  assert.ok(await evaluate(`document.elementFromPoint(${x}, ${y})?.classList.contains('gas-piston-head')`))
  await clickAt('mousePressed', x, y)
  await clickAt('mouseMoved', x, y + 55)
  await waitFor(async () => parseFloat((await quantities())[0]) > 166, 'versleep de zuiger')
  await clickAt('mouseReleased', x, y + 55)

  await click('Gay-Lussac')
  const fixedPiston = await evaluate(`document.querySelector('.gas-piston').getAttribute('transform')`)
  assert.equal(await evaluate(`document.querySelector('.gas-piston .gas-lock text').textContent`), 'Vast')
  assert.equal(await evaluate(`!!document.querySelector('.gas-piston.draggable')`), false)
  await select(600)
  assert.deepEqual(await quantities(), ['332,4 kPa', '15,00 L', '600 K', '1,00 mol'])
  assert.equal(await evaluate(`document.querySelector('.gas-piston').getAttribute('transform')`), fixedPiston)
  await screenshot('02-gay-lussac-slot')
  await click('Charles')
  assert.equal(await evaluate(`!!document.querySelector('.gas-lock,.gas-pump')`), false)
  await select(120)
  assert.deepEqual(await quantities(), ['166,2 kPa', '6,00 L', '120 K', '1,00 mol'])
  await select(600)
  assert.deepEqual(await quantities(), ['166,2 kPa', '30,00 L', '600 K', '1,00 mol'])
  await click('Avogadro')
  const pumpFlow = () => evaluate(`document.querySelector('.gas-pump')?.dataset.flow`)
  assert.equal(await evaluate(`!!document.querySelector('.gas-guides,.gas-lock')`), false)
  assert.equal(await pumpFlow(), 'idle')
  await select(2)
  assert.equal(await pumpFlow(), 'in')
  assert.deepEqual(await quantities(), ['166,2 kPa', '30,00 L', '300 K', '2,00 mol'])
  assert.equal(await evaluate(`document.querySelectorAll('.gas-particle').length`), 32)
  const end = await evaluate(`(() => {
    const p = document.querySelector('.gas-point');
    const last = document.querySelector('.gas-curve').points.getItem(90);
    return Math.hypot(last.x - p.cx.baseVal.value, last.y - p.cy.baseVal.value);
  })()`)
  assert.ok(end < 0.02, 'het live punt ligt ook op de grens op de lijn')
  await screenshot('03-avogadro-gas-in')
  await select(0.4)
  assert.equal(await pumpFlow(), 'out')
  assert.deepEqual(await quantities(), ['166,2 kPa', '6,00 L', '300 K', '0,40 mol'])
  await screenshot('04-avogadro-gas-uit')
  await waitFor(async () => (await pumpFlow()) === 'idle', 'pomp stopt na verandering')
  assert.equal(await evaluate(`!!document.querySelector('.gas-flow-arrow')`), false)
  await select(1.5)
  await click('Herstel beginstand')
  assert.equal(await pumpFlow(), 'idle')
  assert.deepEqual(await quantities(), ['166,2 kPa', '15,00 L', '300 K', '1,00 mol'])

  const particle = () => evaluate(`document.querySelector('.gas-particle').getAttribute('cx')`)
  await click('Animatie pauzeren')
  const still = await particle()
  await new Promise(resolve => setTimeout(resolve, 120))
  assert.equal(await particle(), still)
  await click('Animatie starten')
  await waitFor(async () => await particle() !== still, 'animatie hervat')

  // Headless Chrome kan native fullscreen weigeren; test de aanroep en fallback.
  await evaluate(`(() => {
    let element = null;
    Object.defineProperty(document, 'fullscreenElement', { get: () => element });
    document.documentElement.requestFullscreen = async () => {
      element = document.documentElement;
      document.dispatchEvent(new Event('fullscreenchange'));
    };
    document.exitFullscreen = async () => {
      element = null;
      document.dispatchEvent(new Event('fullscreenchange'));
    };
  })()`)
  await click('Volledig scherm')
  assert.equal(await evaluate('!!document.fullscreenElement'), true)
  await click('Volledig scherm verlaten')
  assert.equal(await evaluate('!!document.fullscreenElement'), false)
  await evaluate(`document.documentElement.requestFullscreen = () => Promise.reject(new Error('geweigerd'))`)
  await click('Volledig scherm')
  assert.match(await evaluate(`document.querySelector('[role=status]').textContent`), /F11/)
  await resize(390, 844)
  assert.ok(await evaluate(`document.querySelector('.gas-demo').scrollWidth <= innerWidth + 1`))
  await screenshot('05-smal-scherm')
  await resize(320, 800)
  assert.ok(await evaluate(`document.querySelector('.gas-demo').scrollWidth <= innerWidth + 1`))
  assert.deepEqual(exceptions, [])
  console.log('✓ compacte simulatie: vier wetten, grenswaarden, zuigerbediening, animatie, fullscreen-aanroep en F11-fallback')
})
