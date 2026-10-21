import { cross } from '../biology/mendel.js'

const exercises = [
  { id: '1', number: '1', title: 'Monohybride kruising: kans op niet-tongrollen (boekmodel)', page: '73' },
  { id: '2', number: '2', title: 'Hoornloze en gehoornde runderen: genotypes afleiden', page: '73' },
  { id: '3', number: '3', title: 'Konijnen: een stamboom aanvullen', page: '73' },
  { id: '4', number: '4', title: 'Agoeti’s: dominantie en genotypes in een stamboom', page: '74' },
  { id: '5', number: '5', title: 'Bloedgroepen van ouders en kinderen', page: '74' },
  { id: '6', number: '6', title: 'Bloedgroepen in een stamboom', page: '74' },
  { id: '7', number: '7', title: 'Cavia’s: intermediaire vachtkleur', page: '74' },
  { id: '8', number: '8', title: 'Holstein-runderen: codominantie', page: '75' },
  { id: '9', number: '9', title: 'Muizen: dihybride kruising met lethale genotypes', page: '75' },
  { id: '10', number: '10', title: 'Klimop: intermediaire overerving en levensvatbaarheid', page: '75' },
  { id: '11', number: '11', title: 'Mucoviscidose: gen, eiwit en overervingswijze onderzoeken', page: '75' }
]

// Original schematics, generated from the same tested genetics model as the lab.
function square(model, a, b) {
  const result = cross(model, a, b)
  const cellStyle = 'border:2px solid var(--color-slide-line);padding:16px 24px;text-align:center;'
  const headStyle = cellStyle + 'background:var(--color-slide-soft);font-weight:700;'
  return `<table style="border-collapse:collapse;margin:24px auto;font-size:42px;min-width:70%;"><thead><tr><th style="${headStyle}">↓ / →</th>${result.columns.map(g => `<th style="${headStyle}">${g}</th>`).join('')}</tr></thead><tbody>${result.rows.map((g, r) => `<tr><th style="${headStyle}">${g}</th>${result.cells.filter(c => c.row === r).map(c => `<td style="${cellStyle}">${c.genotype}</td>`).join('')}</tr>`).join('')}</tbody></table>`
}

export default {
  id: 'bio6-m02-l01-mendel',
  subject: 'biology',
  className: '6de middelbaar',
  config: {
    title: 'Mendel: mono- en dihybride kruisingen',
    description: 'Thema 2 · hoofdstuk 1 · 2 × 50 minuten. Uur 1: theorie met slides en het kruisingslab onder begeleiding van de leerkracht. Uur 2: zelfstandig oefenen in het leerpad en alle boekopgaven 1–11 op p. 73–75 maken.',
    groenCode: 'B6T2H1', groenAntwoord: 'biologie', masterCode: 'wetenschappen',
    classId: '6MOWE+6SPOWE',
    textbook: 'WACO 6 Biologie · Thema 2: Chromosomale erfelijkheid · Hoofdstuk 1 · p. 59–75'
  },
  goals: [
    'Ik kan gen, allel, locus, genotype en fenotype van elkaar onderscheiden en homozygoot en heterozygoot herkennen.',
    'Ik kan vanuit oudergenotypes alle mogelijke gameten vormen en een mono- of dihybride kruisingsvierkant opbouwen.',
    'Ik kan de drie wetten van Mendel uitleggen en de voorwaarden voor 3 : 1 en 9 : 3 : 3 : 1 benoemen.',
    'Ik kan kansen op genotypes en fenotypes berekenen bij volledige dominantie, intermediaire overerving, codominantie en ABO-bloedgroepen.',
    'Ik kan genotypes uit een eenvoudige stamboom afleiden en aangeven wat onzeker blijft.',
    'Ik kan kansen voor alle zygoten onderscheiden van verhoudingen onder levensvatbare nakomelingen.'
  ],
  workbook: { title: 'Alle oefeningen: mono- en dihybride kruisingen', subtitle: 'Thema 2 · hoofdstuk 1 · oefeningen 1–11 · p. 73–75', exercises },
  timeline: {
    stepA: {
      step: 'A', title: 'Instap', time: '15 min',
      cards: [
        { id: 'card-entry', type: 'digital', title: 'Van meiose naar overerving', description: 'Haal allelen, gameten en bevruchting terug uit de vorige les.', action: 'entry-ticket', icon: 'PhQuestion' },
        { id: 'card-pres-a', type: 'class', title: 'Waarom kan groen terugkomen?', description: 'Instapvraag, leerdoelen en afspraken voor de twee lesuren.', action: 'presentation', slidesKey: 'slidesA' }
      ]
    },
    stepB: {
      step: 'B', title: 'Verwerken', time: '30 min',
      cards: [
        { id: 'card-activity', type: 'digital', title: 'Mendel: het kruisingslab', description: 'Uur 1: samen demonstreren. Uur 2: de kernroute oefenen en het vrije lab als hulp bij het boek gebruiken.', action: 'activity', activityId: 'activity', icon: 'PhFlask' },
        { id: 'card-pres-b', type: 'class', title: 'Theorie: van allel naar kans', description: 'Mendel, de taal van de genetica, overervingsmodellen, stambomen en dihybride kruisingen.', action: 'presentation', slidesKey: 'slidesB' },
        { id: 'card-workbook', type: 'paper', title: 'Uur 2: alle boekopgaven 1–11', description: 'Maak alle deelvragen op p. 73–75. Noteer steeds je redenering. Gebruik de passende labroute als je vastloopt.', action: 'workbook', icon: 'PhBookOpen', exercises }
      ]
    },
    stepC: {
      step: 'C', title: 'Afsluiting', time: '5 min',
      cards: [
        { id: 'card-pres-c', type: 'class', title: 'Van samen begrijpen naar zelf oplossen', description: 'Stappenplan voor het zelfstandige uur en een korte terugblik.', action: 'presentation', slidesKey: 'slidesC' },
        { id: 'card-exit', type: 'digital', title: 'Exitticket: verklaar je kruising', description: 'Controleer gameten, kansen en de voorwaarden van Mendels verhoudingen.', action: 'exit-ticket', icon: 'PhTarget' }
      ]
    }
  },
  activities: {
    activity: { type: 'mendelLab', title: 'Mendel: kruisingslab', storageKey: 'bio6-m02-l01-mendel' }
  },
  slidesA: [
    { layout: 'title', title: 'Mendel: van allel naar kans', subtitle: 'Thema 2 · hoofdstuk 1 · mono- en dihybride kruisingen' },
    { layout: 'predict', title: 'Twee gele ouders, een groen zaad?', question: 'Twee erwtenplanten met gele zaden krijgen nakomelingen met groene zaden. Kan dat?', hint: 'Een zichtbaar kenmerk vertelt niet altijd welke twee allelen aanwezig zijn.', revealText: 'Ja. Twee heterozygote ouders Gg kunnen elk een g doorgeven. Hun nakomeling gg heeft groene zaden.' },
    { layout: 'steps', title: 'Dezelfde aanpak, twee lesuren', steps: [
      { text: '<strong>Uur 1:</strong> de leerkracht bouwt de theorie op met slides en demonstraties in het kruisingslab.' },
      { text: '<strong>Uur 2:</strong> je oefent zelfstandig in het leerpad en maakt alle boekopgaven 1–11 op p. 73–75.' },
      { text: '<strong>Doel:</strong> niet alleen een verhouding onthouden, maar elke stap van oudergenotype naar kans kunnen verklaren.' }
    ] }
  ],
  slidesB: [
    { layout: 'standard', title: 'Mendel onderzocht één kenmerk tegelijk', content: '<ul class="slide-list"><li>Genetica bestudeert genen en hun overerving.</li><li>Mendel kruiste <strong>raszuivere erwtenplanten</strong>: eerst één kenmerk, later twee.</li><li><strong>P</strong> = oudergeneratie; <strong>F₁</strong> = hun nakomelingen; <strong>F₂</strong> = nakomelingen uit F₁ × F₁.</li><li>Een <strong>reciproque kruising</strong> wisselt de rol van beide ouders om.</li></ul>' },
    { layout: 'comparison', title: 'De taal van de genetica', left: { title: 'Gen · allel · locus', content: '<strong>Gen:</strong> een DNA-sequentie met informatie voor een functioneel product, vaak een eiwit.<br><br><strong>Allel:</strong> een variant van een gen, zoals G of g.<br><br><strong>Locus:</strong> de plaats van een gen op een chromosoom.' }, right: { title: 'Genotype · fenotype', content: '<strong>Genotype:</strong> de allelencombinatie, bijvoorbeeld Gg.<br><br><strong>Fenotype:</strong> het waarneembare kenmerk, bijvoorbeeld gele zaden.<br><br>Het fenotype wordt bepaald door genotype én omgeving.' } },
    { layout: 'comparison', title: 'Twee allelen of één?', left: { title: 'Ouder: diploïd', content: 'In dit model twee allelen per gen, op homologe chromosomen.<br><br><strong>GG of gg:</strong> homozygoot.<br><strong>Gg:</strong> heterozygoot.<br><br>Gg bevat het dominante én het recessieve allel.' }, right: { title: 'Gameet: haploïd', content: 'Door meiose één allel per gen.<br><br><strong>Gg → G óf g</strong>, elk met kans 1/2.<br><br>Bij bevruchting krijgt de zygote opnieuw twee allelen: één van elke ouder.' } },
    { layout: 'standard', title: 'Dominant betekent niet “sterker”', content: '<ul class="slide-list"><li>Bij <strong>volledige dominantie</strong> is Gg geel, net als GG.</li><li>Alleen <strong>gg</strong> heeft het recessieve groene fenotype.</li><li>Dominant betekent niet: vaker voorkomend, gezonder of beter.</li><li>Een gele plant kan <strong>GG of Gg</strong> zijn: het fenotype is niet altijd genoeg.</li></ul>' },
    { layout: 'worked-example', title: 'Eerste wet: uniformiteit', problem: 'Raszuiver geel × raszuiver groen.<br><br>G = geel, g = groen; volledige dominantie.', steps: [
      { label: 'Oudergenotypes', content: 'P: GG × gg' },
      { label: 'Gameten', content: 'GG geeft alleen G; gg geeft alleen g.' },
      { label: 'F₁', content: 'Alle nakomelingen zijn Gg en geel. Het g-allel is niet verdwenen.' }
    ], answer: 'Uniformiteitswet: de F₁ uit deze twee homozygote ouders is onderling gelijk.' },
    { layout: 'standard', title: 'F₁ × F₁: bouw F₂', content: '<p><strong>Gg × Gg</strong> · gameten van beide ouders: G en g</p>' + square('mono', 'Gg', 'Gg') },
    { layout: 'comparison', title: 'Tweede wet: splitsing', left: { title: 'Genotypes: 1 : 2 : 1', content: '1/4 GG<br>2/4 Gg<br>1/4 gg<br><br>De twee allelen worden bij gametenvorming gescheiden.' }, right: { title: 'Fenotypes: 3 : 1', content: '3/4 geel = 75%<br>1/4 groen = 25%<br><br>Dit geldt voor Gg × Gg bij volledige dominantie. Het is een <strong>verwachte verhouding</strong>.' } },
    { layout: 'predict', title: 'Een kans heeft geen geheugen', question: 'Bij Gg × Gg zijn de eerste drie nakomelingen geel. Moet de vierde groen zijn?', hint: 'Worden gameten na elke bevruchting uit een vaste voorraad van vier vakken verwijderd?', revealText: 'Nee. Elke bevruchting is onafhankelijk: de kans op groen blijft 1/4. Toon dit met “Test het toeval” in het vrije kruisingslab.' },
    { layout: 'comparison', title: 'Zelfde allelen, andere uiting', left: { title: 'Intermediaire overerving', content: 'RR = rood · WW = wit<br><strong>RW = roze mengvorm</strong><br><br>RW × RW geeft 1 rood : 2 roze : 1 wit.<br><br>De allelen blijven afzonderlijk: de gameten zijn R of W.' }, right: { title: 'Codominantie', content: 'RR = rood · WW = wit<br><strong>RW = rood én wit</strong><br><br>RW × RW geeft 1 rood : 2 tweekleurig : 1 wit.<br><br>Beide allelen komen naast elkaar tot uiting.' } },
    { layout: 'standard', title: 'ABO: meer allelen in de populatie', content: '<ul class="slide-list"><li>Drie mogelijke allelen: <strong>A, B en o</strong>. Eén persoon bezit er twee.</li><li>A en B zijn <strong>codominant</strong>; o is recessief tegenover beide.</li><li>Bloedgroep A: AA of Ao · B: BB of Bo · AB: AB · O: oo.</li><li>Een gameet bevat nog steeds maar <strong>één allel</strong> voor dit gen.</li></ul>' },
    { layout: 'worked-example', title: 'Kunnen A en B een kind met O krijgen?', problem: 'Een heterozygote ouder met bloedgroep A en een heterozygote ouder met bloedgroep B.', steps: [
      { label: 'Ouders en gameten', content: 'Ao × Bo → gameten A of o; B of o.' },
      { label: 'Combineer', content: 'AB, Ao, Bo en oo; elk met kans 1/4.' },
      { label: 'Fenotypes', content: 'A, B, AB en O zijn allemaal mogelijk.' }
    ], answer: 'Kans op bloedgroep O: 1/4 = 25%. Bloedgroep O ≠ allel o.' },
    { layout: 'steps', title: 'Stamboom: begin bij wat vaststaat', steps: [
      { text: 'Vierkant = mannelijk; cirkel = vrouwelijk. Een lijn verbindt partners en hun kinderen. Lees altijd de legenda voor de vulling.' },
      { text: 'Bij een <strong>autosomaal recessieve aandoening</strong> is een persoon met de aandoening aa.' },
      { text: 'Twee ouders zonder aandoening met een kind aa moeten allebei Aa zijn. Elk gaf een a door.' },
      { text: 'Een kind zonder aandoening kan AA of Aa zijn. Noteer <strong>A·</strong> als het tweede allel onzeker is.' }
    ] },
    { layout: 'standard', title: 'Screenen om vroeg te kunnen behandelen', content: '<ul class="slide-list"><li>Neonatale screening spoort bij pasgeborenen bepaalde zeldzame aandoeningen op, bijvoorbeeld mucoviscidose.</li><li>Vroege opsporing kan ernstige schade voorkomen als tijdige behandeling helpt.</li><li>Een afwijkende screening is <strong>nog geen definitieve diagnose</strong>: vervolgonderzoek is nodig.</li><li>Screening en stamboomonderzoek beantwoorden verschillende vragen.</li></ul>' },
    { layout: 'standard', title: 'Dihybride kruising: één allel per gen', content: '<ul class="slide-list"><li>Twee onderzochte kenmerken: zaadkleur <strong>G/g</strong> en zaadvorm <strong>R/r</strong>.</li><li>P: GGRR × ggrr → F₁: allemaal <strong>GgRr</strong>, geel en rond.</li><li>GgRr vormt <strong>GR, Gr, gR en gr</strong>, elk met kans 1/4 bij onafhankelijke overerving.</li><li>GR is haploïd: één allel voor kleur én één voor vorm.</li></ul>' },
    { layout: 'standard', title: 'GgRr × GgRr: zestien mogelijke combinaties', content: square('di', 'GgRr', 'GgRr') },
    { layout: 'standard', title: 'Derde wet: onafhankelijke overerving', content: '<ul class="slide-list"><li>De twee genen liggen in dit model op <strong>verschillende chromosomenparen</strong>.</li><li>Geel-rond : geel-hoekig : groen-rond : groen-hoekig = <strong>9 : 3 : 3 : 1</strong>.</li><li>Groen én hoekig: <strong>1/4 × 1/4 = 1/16 = 6,25%</strong>.</li><li>Dit vraagt GgRr × GgRr, onafhankelijke overerving en volledige dominantie bij beide genen.</li></ul>' },
    { layout: 'predict', title: 'Niet elke dihybride kruising geeft 9 : 3 : 3 : 1', question: 'Welke fenotypische verhouding geeft GgRr × ggrr bij onafhankelijke overerving?', hint: 'De eerste ouder maakt vier gametentypes; de tweede alleen gr.', revealText: '1 : 1 : 1 : 1. Bepaal altijd eerst de gameten. Controleer dit met de dihybride testkruising in het lab.' },
    { layout: 'worked-example', title: 'Lethaal: let op de noemer', problem: 'Klimop: GG = groen, GW = geel, WW = wit en niet levensvatbaar. Kruis GW × GW.', steps: [
      { label: 'Alle zygoten', content: '1/4 GG · 1/2 GW · 1/4 WW.' },
      { label: 'Niet levensvatbaar', content: 'WW heeft geen bladgroen: 1/4 van alle zygoten sterft af.' },
      { label: 'Alleen overlevenden', content: 'GG : GW = 1 : 2. Van de overlevenden is 2/3 geel.' }
    ], answer: '25% sterfte onder alle zygoten; 2/3 geel onder de overlevenden.' }
  ],
  slidesC: [
    { layout: 'summary', title: 'Elke kruising heeft hetzelfde stappenplan', items: [
      'Bepaal de overervingswijze, kies symbolen en noteer de oudergenotypes.',
      'Vorm alle mogelijke gameten: één allel per onderzocht gen.',
      'Combineer gameten en tel genotypes én fenotypes apart.',
      'Schrijf de kans met de juiste noemer en verklaar je antwoord.'
    ], keyTakeaway: 'Een kruisingsvierkant voorspelt kansen, geen verplichte reeks nakomelingen.' },
    { layout: 'steps', title: 'Uur 2: zelfstandig aan de slag', steps: [
      { text: '<strong>Start:</strong> oefen de 3 kernopdrachten in het lab: P → F₁, F₁ × F₁ en het 4 × 4-vierkant. Klassikaal gemaakt? Dan kun je ze als herhaling gebruiken.' },
      { text: '<strong>Boek:</strong> maak alle oefeningen 1–11 en alle deelvragen op p. 73–75. Gebruik de labroutes als hulp; sla geen boekopgaven over.' },
      { text: '<strong>Controle:</strong> los de begripsvragen en het exitticket op. Noteer bij een fout welke stap je moet hernemen.' }
    ] },
    { layout: 'closing', title: 'Van genotype naar kans', subtitle: 'Ouders → gameten → zygoten → genotypes en fenotypes → kans.' }
  ],
  entryTicket: { questions: [
    { id: 'en1', type: 'mc', question: 'Welke gametentypes kan een heterozygoot individu Gg voor dit gen vormen?', options: ['Alleen Gg', 'G of g', 'Alleen G'], correct: 1 },
    { id: 'en2', type: 'mc', question: 'Welk proces brengt bij een zygote opnieuw twee allelen per autosomaal gen samen?', options: ['DNA-replicatie', 'Meiose', 'Bevruchting'], correct: 2 },
    { id: 'en3', type: 'mc', question: 'Wat zijn allelen?', options: ['Varianten van hetzelfde gen', 'Altijd twee identieke chromosomen', 'Alle zichtbare kenmerken samen'], correct: 0 }
  ] },
  exitTicket: { questions: [
    { id: 'ex1', type: 'mc', question: 'Welke uitspraak over Gg × Gg bij volledige dominantie klopt?', options: ['Genotypes 1 : 2 : 1 en fenotypes 3 : 1', 'Genotypes en fenotypes allebei 3 : 1', 'Precies elk vierde kind is gg'], correct: 0 },
    { id: 'ex2', type: 'mc', question: 'Welke gameten maakt GgRr bij onafhankelijke overerving?', options: ['Gg en Rr', 'GR, Gr, gR en gr', 'Alleen GR en gr'], correct: 1 },
    { id: 'ex3', type: 'mc', question: 'Wat is bij GgRr × GgRr de kans op groen én hoekig (ggrr), bij onafhankelijke overerving?', options: ['1/4', '3/16', '1/16'], correct: 2 },
    { id: 'ex4', type: 'mc', question: 'RW is bij het ene bloemenmodel roze en bij het andere rood én wit. Welke begrippen horen daarbij?', options: ['Roze = codominant; rood én wit = intermediair', 'Roze = recessief; rood én wit = dominant', 'Roze = intermediair; rood én wit = codominant'], correct: 2 },
    { id: 'ex5', type: 'mc', question: 'Kunnen ouders met genotype Ao en Bo een kind met bloedgroep O krijgen?', options: ['Ja, kans 1/4 op oo', 'Nee, alleen A, B of AB', 'Ja, alle kinderen krijgen O'], correct: 0 }
  ] }
}
