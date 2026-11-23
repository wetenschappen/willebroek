import assert from 'node:assert/strict'
import { runBrowser } from './lib/browser-harness.mjs'

await runBrowser('laatste-les', async ({ origin, command, evaluate, action, click, screenshot, waitFor, exceptions }) => {
  const nav = async (suffix = '') => {
    await command('Page.navigate', { url: origin + '6df/' + suffix })
    await waitFor(() => evaluate('!!document.querySelector("main h1")'), 'lesbord')
  }
  const body = () => evaluate('document.body.innerText')
  const hit = sel => action(`document.querySelector(${JSON.stringify(sel)}).click()`)
  await command('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false })
  await nav(); assert.equal(await evaluate('document.querySelectorAll(".phase button").length'), 6)
  // CSS-viewports (geen aannames op basis van fysieke schermdiagonaal).
  for (const [width,height] of [[320,640],[680,768],[768,1024],[1024,768],[1280,800],[1366,768],[1920,1080],[2560,1440]]) {
    await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false})
    const layout = await evaluate(`(() => {
      const header=document.querySelector('.toolbar'), box=header.getBoundingClientRect();
      const rects=[...header.querySelectorAll('button')].map(b=>b.getBoundingClientRect());
      const title=document.querySelector('.surface h1').getBoundingClientRect();
      return {width:document.documentElement.clientWidth, band:box.width, aligned:Math.abs(title.left-rects[0].left)<2,
        fits:rects.every((r,i)=>r.width>=44 && r.height>=44 && r.left>=0 && r.right<=document.documentElement.clientWidth && (!i || r.left>=rects[i-1].right) && Math.abs(r.top-rects[0].top)<2),
        identity:!!document.querySelector('.identity').getClientRects().length}
    })()`)
    const phases = await evaluate(`[...document.querySelectorAll('.phase')].map(p =>
      [p,...p.querySelectorAll('button')].map(el=>el.getBoundingClientRect().toJSON()))`)
    phases.forEach(([phase,first,second],i)=>{
      assert.ok(second.top >= first.bottom && first.left === second.left, `Beide opdrachten onder elkaar bij ${width}`)
      if(i) assert.ok(width > 760 ? phase.left >= phases[i-1][0].right && phase.top === phases[i-1][0].top : phase.top >= phases[i-1][0].bottom, `Volgorde A-B-C bij ${width}`)
    })
    assert.ok(layout.fits,`Alle vier bedieningselementen op één rij bij ${width}`)
    assert.ok(Math.abs(layout.width-layout.band)<2,`Volledige lintbreedte bij ${width}`)
    if(width===1920) await screenshot('01-ABC-breed')
    if(width>=768) assert.ok(layout.aligned && layout.identity,`Klas zichtbaar en bediening uitgelijnd bij ${width}`)
  }
  await command('Emulation.setDeviceMetricsOverride',{width:1280,height:720,deviceScaleFactor:1,mobile:false})
  await screenshot('01-ABC'); await click('Doelen'); assert.match(await body(), /Ik kan voorspellen|Ik kan uitleggen/); await click('Sluit doelen')
  await hit('.phase button'); assert.match(await body(), /Wet van Boyle/); assert.match(await body(), /0:40/); assert.equal(await evaluate('!!document.querySelector(".sketch-svg")'), true)
  await click('Start denktijd'); await click('Pauzeer'); await click('Kies nu een naam'); assert.match(await body(), /Aan het woord/)
  await click('Toon richtantwoord'); assert.match(await body(), /Macroscopisch/); assert.match(await body(), /Microscopisch/)
  await hit('[aria-label="Voorbereiding"]'); await action(`const t=document.querySelector('textarea');t.value='Test A, Test B';t.dispatchEvent(new Event('input'))`); await click('Gebruik deze lijst')
  await click('Volgende vraag'); assert.match(await body(), /Gay-Lussac/); await click('Kies nu een naam'); const first=await evaluate('document.querySelector(".think-name").innerText'); await click('Volgende vraag'); assert.match(await body(), /Charles/); await click('Kies nu een naam'); assert.notEqual(first,await evaluate('document.querySelector(".think-name").innerText'))
  await click('Proef van Charles'); assert.equal(await evaluate('document.querySelector("a[target=_blank]").href'), 'https://wetenschappen.github.io/willebroek/gassen/simulatie/'); assert.match(await body(),/166,2 kPa/)
  await click('Volgende →'); assert.match(await body(), /De zuiger gaat omhoog/)
  await action('window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }))'); await action('window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }))')
  assert.match(await body(), /15,0/); assert.match(await body(), /30,0/)
  await click('Streep door wat gelijk blijft'); assert.equal(await evaluate('!!document.querySelector(".katex math")'),true); assert.match(await body(), /Geen vierde formule/); await click('2. Klascheck'); assert.match(await body(), /2 vingers/); await click('3. Sporen'); assert.match(await body(), /Samen starten/); await click('Volgende →'); await screenshot('02-B1')
  await click('Bereken de einddruk'); assert.doesNotMatch(await body(), /150 kPa|180 kPa/); assert.match(await body(), /15:00/); assert.match(await body(), /Bedek de kolom/); await click('Start werktijd'); await click('Pauzeer'); await screenshot('03-B2'); await click('2. Nakijken blz. 6'); assert.doesNotMatch(await body(), /180 kPa/); await click('Alles'); assert.match(await body(), /180 kPa/); await click('Doelen'); await click('Sluit doelen')
  await click('Exitticket'); await click('Kies leerling'); assert.match(await body(), /Aan het woord/); await click('Volgende vraag'); await click('Volgende vraag'); await click('Toon antwoord'); assert.equal(await evaluate('!!document.querySelector(".choice-correct")'), true); assert.match(await body(), /Minder deeltjes/); await screenshot('04-exit'); await click('Terug naar de doelen'); assert.match(await body(), /Duim omhoog/); await click('Vooruitblik: open ventiel'); assert.match(await body(), /nRT/); await click('Naar overzicht')
  await command('Emulation.setDeviceMetricsOverride',{width:360,height:740,deviceScaleFactor:1,mobile:false}); await hit('.phase:nth-child(2) button'); assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'))
  await nav('?print=werkbon'); assert.equal(await evaluate('document.querySelectorAll(".ll-bonnen article").length'),2); assert.match(await body(),/150 kPa/); assert.doesNotMatch(await body(),/180 kPa/); assert.deepEqual(exceptions,[])
})
