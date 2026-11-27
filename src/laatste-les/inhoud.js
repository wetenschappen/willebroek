export const phases = [
  { id: 'A', title: 'Instap', time: '15 min', cue: 'Voorkennis en vrije zuiger.', items: ['entry', 'charles'] },
  { id: 'B', title: 'Verwerken', time: '30 min', cue: 'Vergelijk en bereken.', items: ['b1', 'b2'] },
  { id: 'C', title: 'Afsluiting', time: '5 min', cue: 'Verklaar de grens.', items: ['exit', 'slot'] },
]
export const screens = {
  entry: ['Wat weet je nog?', 'Drie open vragen over de gaswetten', 'digital'], charles: ['Proef van Charles', 'Vrije zuiger · bundel blz. 4', 'digital'],
  b1: ['Streep door wat gelijk blijft', 'Werkblad · bundel blz. 5', 'paper'], b2: ['Bereken de einddruk', 'Individueel · bundel blz. 6', 'paper'],
  exit: ['Exitticket', 'Van zuiger tot open ventiel', 'digital'], slot: ['Terug naar de doelen', 'Wijs je bewijs aan', 'paper'],
}
export const entryQuestions = [
  {
    kind: 'boyle',
    title: 'Wet van Boyle: samendrukken bij constante temperatuur',
    prompt: 'In een afgesloten cilinder drukken we een gas samen van 15 L naar 7,5 L, terwijl de temperatuur gelijk blijft op 300 K. Wat gebeurt er met de absolute druk, en waarom?',
    cue: 'Verklaar je antwoord zowel macroscopisch (met grootheden) als microscopisch (met de gasdeeltjes).',
    macro: 'Bij constante temperatuur T en dezelfde hoeveelheid gas blijft het product p · V constant (p₁V₁ = p₂V₂). Halveert het volume, dan verdubbelt de absolute druk (bv. van 166,2 kPa naar 332,4 kPa).',
    micro: 'Omdat de temperatuur gelijk blijft, bewegen de gasdeeltjes gemiddeld even snel. Er zitten evenveel deeltjes in half zoveel ruimte, zodat ze vaker per seconde tegen elk stukje wand botsen: de druk wordt dubbel zo groot.',
  },
  {
    kind: 'gaylussac',
    title: 'Wet van Gay-Lussac: opwarmen met een vaste zuiger',
    prompt: 'We warmen hetzelfde afgesloten gas op van 300 K naar 600 K, terwijl de zuiger vergrendeld zit (het volume blijft 15 L). Wat gebeurt er met de absolute druk, en waarom moeten we hier in kelvin rekenen?',
    cue: 'Verklaar je antwoord zowel macroscopisch (met grootheden en schaal) als microscopisch (met de gasdeeltjes).',
    macro: 'Bij constant volume V en evenveel gas blijft p / T constant (p₁ / T₁ = p₂ / T₂). Verdubbelt de temperatuur in kelvin (300 K → 600 K; in °C is 27 °C → 327 °C geen verdubbeling), dan verdubbelt de absolute druk.',
    micro: 'Door de hogere temperatuur bewegen de deeltjes gemiddeld sneller. In dezelfde ruimte botsen ze daardoor vaker per seconde én krachtiger (grotere stoot per botsing) tegen de wand: de druk stijgt.',
  },
  {
    kind: 'charles',
    title: 'Wet van Charles: opwarmen met een vrije zuiger (blz. 4)',
    prompt: 'Vorige les startten we met dezelfde opwarming (300 K → 600 K), maar nu met een vrije zuiger onder gelijke belasting. Wat voorspel je voor de beweging van de zuiger, het volume én de gasdruk in het nieuwe evenwicht?',
    cue: 'Verklaar je voorspelling zowel macroscopisch (zuiger, V en p) als microscopisch (wat de deeltjes doen).',
    macro: 'De zuiger schuift omhoog en het volume neemt toe (verdubbelt bij verdubbeling van T in kelvin, zodat V / T gelijk blijft). Omdat de buitenlucht en belasting op de zuiger gelijk blijven, blijft de evenwichtsdruk p gelijk (166,2 kPa).',
    micro: 'De snellere deeltjes botsen eerst vaker en krachtiger tegen de zuiger en duwen hem omhoog. In het grotere volume zitten de deeltjes verder uit elkaar en botsen ze minder vaak per seconde tegen de wand, tot de druk binnen weer gelijk is aan de druk erboven.',
  },
]
export const goals = [
  {
    title: 'Voorspellen en verklaren',
    page: 'blz. 4',
    goal: 'Ik kan voorspellen en uitleggen hoe druk, volume en temperatuur samenhangen als één van de drie gelijk blijft.',
    check: 'Bij elke proef benoem ik wat we veranderen, wat we gelijk houden en wat daardoor verandert. Ik leg het telkens uit met het deeltjesmodel.',
  },
  {
    title: 'Vergelijken',
    page: 'blz. 5',
    goal: 'Ik kan druk, volume en temperatuur vóór en na vergelijken en uitleggen wat ik mag doorstrepen.',
    check: 'Ik streep een factor alleen door als die links en rechts dezelfde waarde heeft. Blijft niets gelijk, dan streep ik niets door.',
  },
  {
    title: 'Berekenen en controleren',
    page: 'blz. 6',
    goal: 'Ik kan de vergelijking omvormen om de einddruk te berekenen en te controleren.',
    check: 'Ik noteer de einddruk met eenheid. Ik krijg links en rechts dezelfde waarde en mijn einddruk past bij mijn voorspelling.',
  },
]
export const exitQuestions = [
  {
    kind: 'zuiger',
    title: 'Vaste of vrije zuiger?',
    prompt: 'Je warmt hetzelfde afgesloten gas op. Bij welke zuiger kan het volume toenemen terwijl de druk gelijk blijft?',
    options: ['Vaste zuiger', 'Vrije zuiger bij gelijke belasting'],
    correct: 1,
    explanation: 'De vrije zuiger beweegt omhoog. De snellere deeltjes krijgen meer ruimte; in het nieuwe evenwicht is de gasdruk weer gelijk aan de uitwendige druk.',
  },
  {
    kind: 'factor',
    title: 'Volume én temperatuur × 1,2',
    prompt: 'Volume én kelvintemperatuur worden allebei 1,2 keer zo groot. Er komt geen gas bij en er ontsnapt niets. Wat doet de druk?',
    options: ['Ze daalt', 'Ze blijft gelijk', 'Ze stijgt'],
    correct: 1,
    explanation: String.raw`In \(\frac{p_1 V_1}{T_1} = \frac{p_2 V_2}{T_2}\) worden \(V\) en \(T\) met dezelfde factor \(1,2\) vermenigvuldigd. Die factor valt weg, dus blijft de druk gelijk.`,
  },
  {
    kind: 'ventiel',
    title: 'Het ventiel gaat open',
    prompt: 'Het ventiel gaat open en er ontsnapt gas. Hoeveel deeltjes teken je na afloop, en geldt onze vergelijking nog?',
    options: ['Minder · ja', 'Evenveel · ja', 'Minder · nee'],
    correct: 2,
    explanation: String.raw`Minder deeltjes: het is niet meer dezelfde hoeveelheid gas. Je mag \(\frac{p_1 V_1}{T_1}\) en \(\frac{p_2 V_2}{T_2}\) niet meer gelijkstellen.`,
  },
]
