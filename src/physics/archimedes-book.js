// Checked against WACO 4 Fysica 2u, T1 H4, book p. 52,54,58,60–64.
// Solution routes: OSPLKITWACOF4DS2_01_oefeningen_met_oplossingen.pdf p.18–27.
// Keep the publisher's constants and rounding PER problem (998 / 1000;
// 1.29 / 1.293), rather than silently applying the lab's defaults.
const m = (s, ...args) => `\\( ${String.raw(s, ...args)} \\)`
const br = (...lines) => lines.join('<br>')

export const BOOK_EXERCISES = [
  ['De factoren bij een duiker', 60], ['De juiste formule', 60], ['Archimedeskracht op 2,00 m³', 60], ['De ballonvaarder zet de brander aan', 60],
  ['Een bal springt uit het water · beide deelvragen', 61], ['Archimedeskracht in lucht en water vergelijken', 61], ['Hoe diep zakt de geladen boot?', 61], ['Heteluchtballon: gewicht en massa', 61], ['Karim duikt in zee', 61],
  ['Even grote blokken van verschillende stoffen', 62], ['Schijnbaar gewicht', 62], ['De boei en het extra gewicht', 62], ['De waterbal met de jongen', 62],
  ['Dynamometer in twee vloeistoffen', 63], ['Extra vracht van de Hindenburg', 63], ['Een kilogram veren en een kilogram lood', 63],
  ['Een voorwerp in de maatbeker', 64], ['Een half drijvende bal onderduwen', 64]
].map(([title, page], i) => ({ id: String(i + 1), number: String(i + 1), title, page: String(page) }))

function calculation({ id, label, page, problem, given, asked, parts, answer, figure }) {
  const base = { layout: 'book-example', workId: id, bookPage: page }
  return [
    { ...base, section: label, title: `${label} · p. ${page}`, problem, figure, steps: [{ label: 'Gegeven', content: given }, { label: 'Gevraagd', content: asked }] },
    ...parts.map((content, i) => ({ ...base, title: `${label} · ${parts.length > 1 ? `oplossing ${i + 1}/${parts.length}` : 'oplossing'}`, steps: [{ label: 'Oplossing', content }, ...(i === parts.length - 1 ? [{ label: 'Antwoord', content: answer }] : [])] }))
  ]
}
function concept({ id, label, page, problem, reason, answer, figure }) {
  return [{ layout: 'book-example', workId: String(id), bookPage: page, section: label, title: `${label} · p. ${page}`, problem, figure, steps: [{ label: 'Oplossing', content: reason }, { label: 'Antwoord', content: answer }] }]
}

const buoyFigure = `<svg viewBox="0 0 500 290" role="img" aria-label="Drie boeien: A zonder extra gewicht, B met gewicht onder water, C met hetzelfde gewicht binnenin."><g fill="none" stroke="var(--color-slide-ink)" stroke-width="3"><path d="M5 90H495"/><path d="M35 45H135V160H35Z M200 65H300V180H200Z M365 77H465V192H365Z"/><path d="M250 180V230"/><rect x="230" y="230" width="40" height="30" fill="var(--color-slide-soft)"/><rect x="395" y="145" width="40" height="30" fill="var(--color-slide-soft)"/></g><g fill="var(--color-slide-ink)" font-size="28" text-anchor="middle"><text x="85" y="30">A</text><text x="250" y="30">B</text><text x="415" y="30">C</text></g></svg>`
const ballFigure = `<svg viewBox="0 0 500 280" role="img" aria-label="Eerst drijft de bal half onder water. Daarna houdt een kracht van 1,0 N hem net volledig onder water."><g fill="var(--color-slide-paper)" stroke="var(--color-slide-ink)" stroke-width="3"><circle cx="120" cy="100" r="60"/><circle cx="360" cy="164" r="60"/></g><path d="M15 100H485" stroke="var(--color-slide-ink)" stroke-width="3"/><path d="M360 5V95m-9 -12l9 12l9 -12" stroke="var(--color-slide-red)" fill="none" stroke-width="4"/><g font-size="24" fill="var(--color-slide-ink)"><text x="390" y="40">1,0 N</text><text x="120" y="260" text-anchor="middle">Drijven</text><text x="360" y="260" text-anchor="middle">Net ondergedompeld</text></g></svg>`

export const EXAMPLE_SLIDES = [
  ...calculation({ id: 'example-whale', label: 'Voorbeeld · Bultrugwalvis', page: 52,
    problem: 'Hoe groot is de archimedeskracht die een bultrugwalvis ondervindt als zijn lichaam 25 m³ groot is en als hij in zeewater zwemt met een massadichtheid van 1 025 kg/m³?',
    given: br(m`V_{\mathrm{vl}}=25\ \mathrm{m^3}`, m`\rho_{\mathrm{vl}}=1\,025\ \mathrm{kg/m^3}`, m`g=9{,}81\ \mathrm{N/kg}`), asked: m`F_A=?`,
    parts: [br(m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}`, m`=1\,025\ \frac{\mathrm{kg}}{\mathrm{m^3}}\cdot9{,}81\ \frac{\mathrm{N}}{\mathrm{kg}}\cdot25\ \mathrm{m^3}`, m`=251\,381{,}25\ \mathrm{N}=2{,}5\cdot10^5\ \mathrm{N}`)],
    answer: 'De archimedeskracht op de bultrug is ' + m`2{,}5\cdot10^5\ \mathrm{N}` + '.' }),
  ...calculation({ id: 'example-person', label: 'Voorbeeld · Uitademen in zee', page: 54,
    problem: 'Wat zal een persoon met een massa van 70,00 kg en een lichaamsvolume van 65,00 dm³ doen in zeewater met een massadichtheid van 1 025 kg/m³ als hij volledig uitademt? Zal hij zinken, zweven of boven komen drijven?',
    given: br(m`m=70{,}00\ \mathrm{kg}`, m`V=65{,}00\ \mathrm{dm^3}=0{,}065\,00\ \mathrm{m^3}`, m`\rho_{\mathrm{vl}}=1\,025\ \mathrm{kg/m^3}`), asked: 'Zinken, zweven of drijven?',
    parts: [br(m`\rho_{\mathrm{lichaam}}=\frac{m}{V}=\frac{70{,}00\ \mathrm{kg}}{0{,}065\,00\ \mathrm{m^3}}`, m`=1\,076{,}923\ \mathrm{kg/m^3}=1\,077\ \mathrm{kg/m^3}`, m`\rho_{\mathrm{lichaam}}>\rho_{\mathrm{vl}}\quad\Rightarrow\quad\text{zinken}`)],
    answer: 'De persoon zal zinken in het zeewater als hij volledig uitademt.' }),
  ...calculation({ id: 'example-balloon', label: 'Voorbeeld · Zwevende ballon', page: 58,
    problem: 'Hoe groot mag het totale gewicht van een heteluchtballon zijn om juist te blijven zweven als de ballon een volume heeft van 2 000 m³ en als de lucht rondom de ballon een massadichtheid heeft van 1,29 kg/m³?',
    given: br(m`V_{\mathrm{vw}}=2\,000\ \mathrm{m^3}=V_{\mathrm{gas}}`, m`\rho_{\mathrm{lucht}}=1{,}29\ \mathrm{kg/m^3}`, m`g=9{,}81\ \mathrm{N/kg}`), asked: m`F_G=?`,
    parts: [br('Zweven betekent ' + m`F_G=F_A` + '.', m`F_G=\rho_{\mathrm{lucht}}\cdot g\cdot V_{\mathrm{gas}}`, m`=1{,}29\ \frac{\mathrm{kg}}{\mathrm{m^3}}\cdot9{,}81\ \frac{\mathrm{N}}{\mathrm{kg}}\cdot2\,000\ \mathrm{m^3}`, m`=25\,309{,}8\ \mathrm{N}=2{,}53\cdot10^4\ \mathrm{N}`)],
    answer: 'Het totale gewicht van de heteluchtballon mag ' + m`2{,}53\cdot10^4\ \mathrm{N}` + ' groot zijn.' })
]

export const EXERCISE_SLIDES = [
  ...concept({ id: 1, label: '1 · Factoren bij een duiker', page: 60,
    problem: 'Duid alle juiste stellingen aan. De archimedeskracht op een duiker onder water is afhankelijk van:<br>A de massadichtheid van het water; B de massadichtheid van zijn lichaam; C het gewicht van het verplaatste water; D het gewicht van zijn lichaam; E het volume van het verplaatste water.',
    reason: br(m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}=F_{G,\mathrm{vl}}`, 'De vloeistofdichtheid en het verplaatste volume bepalen het gewicht van de verplaatste vloeistof. De dichtheid of het gewicht van het lichaam zelf staat niet in deze formule.'), answer: 'A, C en E.' }),
  ...concept({ id: 2, label: '2 · De juiste formule', page: 60,
    problem: 'Duid de formule aan voor de archimedeskracht op een volledig in een vloeistof ondergedompeld voorwerp.<br>' + br('A ' + m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}`, 'B ' + m`F_A=\rho_{\mathrm{vw}}\cdot g\cdot V_{\mathrm{vl}}`, 'C ' + m`F_A=\rho_{\mathrm{vw}}\cdot g\cdot V_{\mathrm{vw}}`),
    reason: 'Gebruik de massadichtheid van de vloeistof en het volume verplaatste vloeistof. Bij volledige onderdompeling is dat volume gelijk aan het voorwerpvolume.', answer: 'A.' }),
  ...calculation({ id: '3', label: '3 · Volledig ondergedompeld', page: 60,
    problem: 'Bereken de archimedeskracht die water uitoefent op een volledig ondergedompeld voorwerp met een volume V = 2,00 m³.',
    given: br(m`\rho_{\mathrm{water}}=998\ \mathrm{kg/m^3}`, m`V_{\mathrm{vw}}=V_{\mathrm{vl}}=2{,}00\ \mathrm{m^3}`, m`g=9{,}81\ \mathrm{N/kg}`), asked: m`F_A=?`,
    parts: [br(m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}`, m`=998\ \frac{\mathrm{kg}}{\mathrm{m^3}}\cdot9{,}81\ \frac{\mathrm{N}}{\mathrm{kg}}\cdot2{,}00\ \mathrm{m^3}`, m`=19\,581\ \mathrm{N}=1{,}96\cdot10^4\ \mathrm{N}`)],
    answer: 'Het water oefent een archimedeskracht uit van ' + m`1{,}96\cdot10^4\ \mathrm{N}` + '.' }),
  ...concept({ id: 4, label: '4 · De gasbrander', page: 60,
    problem: 'Een ballonvaarder zet de gasbrander aan om de lucht in de ballon te verwarmen. Door het uitzetten van de lucht wordt het volume van de ballon groter. De luchtballon zal door de wet van Archimedes voor gassen:<br>A dalen; B op dezelfde hoogte blijven zweven; C stijgen.',
    reason: 'In de beschreven situatie wordt het ballonvolume groter. Er wordt meer buitenlucht verplaatst en de archimedeskracht neemt toe.', answer: 'C: stijgen.' }),
  ...concept({ id: 5, label: '5 · Bal uit het water', page: 61,
    problem: 'Je houdt een bal in het zwembad onder water. Wanneer je hem loslaat, springt hij boven het water uit.<br>• Verklaar hoe dat komt.<br>• Naargelang het gedeelte boven water groter wordt: A verkleint de archimedeskracht; B vergroot ze; C blijft ze gelijk; D wordt ze nul newton.',
    reason: 'Op de ondergedompelde bal is de archimedeskracht groter dan de zwaartekracht: hij versnelt omhoog. Wanneer de bal bovenkomt, neemt het verplaatste volume water af. Hij kan door zijn beweging nog verder omhoog gaan terwijl de opwaartse kracht afneemt.',
    answer: 'De bal wordt omhoog geduwd. Tweede deelvraag: A, de archimedeskracht verkleint.' }),
  ...concept({ id: 6, label: '6 · Lucht tegenover water', page: 61,
    problem: 'Noteer wat je kunt zeggen over de grootte van de archimedeskracht op een voorwerp in de lucht in vergelijking met de archimedeskracht op datzelfde voorwerp in het water.',
    reason: br('Bij een gelijk volledig verplaatst volume is ' + m`F_A` + ' recht evenredig met de massadichtheid van het fluïdum.', m`\rho_{\mathrm{water}}=998\ \mathrm{kg/m^3}\quad\text{en}\quad\rho_{\mathrm{lucht}}=1{,}293\ \mathrm{kg/m^3}`), answer: 'De archimedeskracht is in water bijna 800 keer groter dan in lucht.' }),
  ...calculation({ id: '7', label: '7 · De geladen boot', page: 61,
    problem: 'Een rechthoekige boot van 400 kg is 5,0 m lang en 3,0 m breed en biedt plaats aan 30 personen van 60 kg. Hoe diep zakt hij in een meer als hij volledig wordt geladen?',
    given: br(m`\ell=5{,}0\ \mathrm{m}\quad b=3{,}0\ \mathrm{m}\quad n=30`, m`m_{\mathrm{boot}}=400\ \mathrm{kg}\quad m_{\mathrm{persoon}}=60\ \mathrm{kg}`, m`\rho_{\mathrm{vl}}=998\ \mathrm{kg/m^3}\quad g=9{,}81\ \mathrm{N/kg}`), asked: m`h=?`,
    parts: [br('Drijven: ' + m`F_G=F_A` + '.', m`F_A=m_{\mathrm{tot}}\cdot g=(m_{\mathrm{boot}}+30\cdot m_{\mathrm{persoon}})\cdot g`, m`=(400\ \mathrm{kg}+30\cdot60\ \mathrm{kg})\cdot9{,}81\ \mathrm{N/kg}`, m`=2\,200\ \mathrm{kg}\cdot9{,}81\ \mathrm{N/kg}=21\,582\ \mathrm{N}`),
      br(m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}`, m`V_{\mathrm{vl}}=\frac{F_A}{\rho_{\mathrm{vl}}\cdot g}=\frac{21\,582\ \mathrm{N}}{998\ \mathrm{kg/m^3}\cdot9{,}81\ \mathrm{N/kg}}=2{,}2\ \mathrm{m^3}`, m`V_{\mathrm{vl}}=\ell\cdot b\cdot h`, m`h=\frac{V_{\mathrm{vl}}}{\ell\cdot b}=\frac{2{,}2\ \mathrm{m^3}}{5{,}0\ \mathrm{m}\cdot3{,}0\ \mathrm{m}}=0{,}15\ \mathrm{m}`)],
    answer: 'De boot zakt 0,15 m diep in het water van het meer.' }),
  ...calculation({ id: '8', label: '8 · Ballon: gewicht en massa', page: 61,
    problem: 'Als een heteluchtballon een volume inneemt van 2 000 m³ in de lucht, hoe groot mag dan zijn totale gewicht zijn om juist te blijven zweven? Met welke totale massa komt dit overeen?',
    given: br(m`V_{\mathrm{vw}}=V_{\mathrm{lucht}}=2\,000\ \mathrm{m^3}`, m`\rho_{\mathrm{lucht}}=1{,}293\ \mathrm{kg/m^3}\quad g=9{,}81\ \mathrm{N/kg}`), asked: br(m`F_G=?`, m`m_{\mathrm{totaal}}=?`),
    parts: [br('Zweven: ' + m`F_G=F_A` + '.', m`F_A=\rho_{\mathrm{lucht}}\cdot g\cdot V_{\mathrm{vw}}`, m`=1{,}293\ \mathrm{kg/m^3}\cdot9{,}81\ \mathrm{N/kg}\cdot2\,000\ \mathrm{m^3}`, m`=25\,368{,}66\ \mathrm{N}=2{,}537\cdot10^4\ \mathrm{N}`),
      br(m`F_G=m_{\mathrm{totaal}}\cdot g`, m`m_{\mathrm{totaal}}=\frac{F_G}{g}=\frac{2{,}537\cdot10^4\ \mathrm{N}}{9{,}81\ \mathrm{N/kg}}=2\,586\ \mathrm{kg}`)],
    answer: 'Het totale gewicht mag ' + m`2{,}537\cdot10^4\ \mathrm{N}` + ' zijn. De totale massa is 2 586 kg.' }),
  ...calculation({ id: '9', label: '9 · Karim in zee', page: 61,
    problem: 'Karim duikt op 10,0 m diepte in de zee. Met zijn volledige uitrusting aan is hij 77 kg zwaar en heeft hij een volume van 72 dm³. Het zeewater heeft een massadichtheid van 1,030 kg/dm³. Zal Karim zinken, zweven of stijgen?',
    given: br(m`m=77\ \mathrm{kg}\quad h=10{,}0\ \mathrm{m}`, m`V=72\ \mathrm{dm^3}=0{,}072\ \mathrm{m^3}`, m`\rho_{\mathrm{vl}}=1{,}030\ \mathrm{kg/dm^3}=1\,030\ \mathrm{kg/m^3}`, m`g=9{,}81\ \mathrm{N/kg}`), asked: 'Zinken, zweven of stijgen?',
    parts: [br(m`F_G=m\cdot g=77\ \mathrm{kg}\cdot9{,}81\ \mathrm{N/kg}`, m`=755{,}37\ \mathrm{N}=7{,}6\cdot10^2\ \mathrm{N}`, m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}`, m`=1\,030\ \mathrm{kg/m^3}\cdot9{,}81\ \mathrm{N/kg}\cdot0{,}072\ \mathrm{m^3}`, m`=727{,}5096\ \mathrm{N}=7{,}3\cdot10^2\ \mathrm{N}`, m`F_G>F_A\quad\Rightarrow\quad\text{zinken}`)], answer: 'Karim zal zinken in het zeewater.' }),
  ...concept({ id: 10, label: '10 · Twee even grote blokken', page: 62,
    problem: 'Een blok nikkel met massadichtheid 8 800 kg/m³ wordt volledig in water ondergedompeld. De archimedeskracht is 12 N. Welke archimedeskracht meet je op een even groot blok van een andere stof met massadichtheid 4 400 kg/m³ in hetzelfde water?<br>A 6 N; B 12 N; C 24 N. Verklaar.',
    reason: 'De massadichtheid van het voorwerp heeft geen invloed op de archimedeskracht bij gelijk ondergedompeld volume. Het ondergedompelde volume en de massadichtheid van de vloeistof zijn hier gelijk.', answer: 'B: 12 N.' }),
  ...calculation({ id: '11', label: '11 · Schijnbaar gewicht', page: 62,
    problem: 'Hoe groot is het schijnbare gewicht van een voorwerp met een volume van 0,20 m³ dat volledig is ondergedompeld in het water als het gewicht ervan in de lucht 5 000 N is?',
    given: br(m`V_{\mathrm{lichaam}}=V_{\mathrm{vl}}=0{,}20\ \mathrm{m^3}`, m`\rho_{\mathrm{water}}=998\ \mathrm{kg/m^3}\quad F_G=5\,000\ \mathrm{N}`, m`g=9{,}81\ \mathrm{N/kg}`), asked: m`F_{\mathrm{schijnbaar}}=?`,
    parts: [br(m`F_{\mathrm{schijnbaar}}=F_G-F_A=F_G-F_{G,\mathrm{vl}}`, m`=F_G-\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}`, m`=5\,000\ \mathrm{N}-(998\ \mathrm{kg/m^3}\cdot9{,}81\ \mathrm{N/kg}\cdot0{,}20\ \mathrm{m^3})`, m`=5\,000\ \mathrm{N}-1\,958{,}076\ \mathrm{N}`, m`=3\,041{,}924\ \mathrm{N}=3{,}0\cdot10^3\ \mathrm{N}`)], answer: 'Het schijnbare gewicht is ' + m`3{,}0\cdot10^3\ \mathrm{N}` + '.' }),
  ...concept({ id: 12, label: '12 · De boei en het gewicht', page: 62, figure: buoyFigure,
    problem: 'Een boei drijft in het water (A). De boei wordt verzwaard met een gewicht onderaan (B). Hetzelfde gewicht wordt daarna binnen in de boei aangebracht (C). Verklaar waarom boei B minder diep wegzakt dan boei C.',
    reason: 'In B en C is het totale gewicht gelijk. Omdat het systeem drijft, is de archimedeskracht daaraan gelijk. In B verplaatst het gewicht onderaan óók vloeistof. Een kleiner gedeelte van de boei zelf moet dus onder water zakken om dezelfde totale archimedeskracht te krijgen.', answer: 'Bij B verplaatst het onderhangende gewicht een deel van de benodigde vloeistof; bij C niet.' }),
  ...calculation({ id: '13', label: '13 · Waterbal met jongen', page: 62,
    problem: 'De massa van de bal en de jongen samen is 50 kg. Gebruik 1 kg/dm³ als massadichtheid van het water. Noteer hoeveel liter water door deze drijvende waterbal wordt verplaatst en verklaar.',
    given: br(m`m_{\mathrm{vw}}=50\ \mathrm{kg}`, m`\rho_{\mathrm{water}}=1\ \mathrm{kg/dm^3}`), asked: 'Het volume verplaatst water, in liter.',
    parts: [br('Bij drijven: ' + m`F_{A,\mathrm{ond}}=F_{Z,\mathrm{vw}}=F_{G,\mathrm{vw}}=F_{G,\mathrm{vl}}` + '.', m`m_{\mathrm{vw}}\cdot g=m_{\mathrm{vl}}\cdot g`, m`m_{\mathrm{vl}}=m_{\mathrm{vw}}=50\ \mathrm{kg}`, m`V_{\mathrm{vl}}=\frac{m_{\mathrm{vl}}}{\rho_{\mathrm{vl}}}=\frac{50\ \mathrm{kg}}{1\ \mathrm{kg/dm^3}}=50\ \mathrm{dm^3}=50\ \mathrm{l}`)], answer: 'De waterbal verplaatst 50 l water.' }),
  ...calculation({ id: '14', label: '14 · Twee vloeistoffen', page: 63,
    problem: 'Een dynamometer met een voorwerp geeft in lucht 90 N aan, volledig ondergedompeld in water 60 N en volledig ondergedompeld in een andere vloeistof 20 N. Gebruik 1 000 kg/m³ voor water. De dichtheid van de tweede vloeistof is:<br>A 1 333; B 1 500; C 2 333; D 3 000 kg/m³. Verklaar.',
    given: br(m`F_G=90\ \mathrm{N}\quad F_{\mathrm{sch,water}}=60\ \mathrm{N}`, m`F_{\mathrm{sch,vl}}=20\ \mathrm{N}\quad\rho_{\mathrm{water}}=1\,000\ \mathrm{kg/m^3}`), asked: m`\rho_{\mathrm{vl}}=?`,
    parts: [br(m`F_{A,\mathrm{water}}=90\ \mathrm{N}-60\ \mathrm{N}=30\ \mathrm{N}`, m`F_{A,\mathrm{vl}}=90\ \mathrm{N}-20\ \mathrm{N}=70\ \mathrm{N}`, m`F_{A,\mathrm{water}}=\rho_{\mathrm{water}}\cdot g\cdot V`, m`F_{A,\mathrm{vl}}=\rho_{\mathrm{vl}}\cdot g\cdot V`),
      br('Dezelfde g en hetzelfde ondergedompelde volume:', m`\frac{F_{A,\mathrm{vl}}}{F_{A,\mathrm{water}}}=\frac{\rho_{\mathrm{vl}}\cdot g\cdot V}{\rho_{\mathrm{water}}\cdot g\cdot V}=\frac{\rho_{\mathrm{vl}}}{\rho_{\mathrm{water}}}`, m`\frac{70\ \mathrm{N}}{30\ \mathrm{N}}=2{,}333`, m`\rho_{\mathrm{vl}}=2{,}333\cdot1\,000\ \mathrm{kg/m^3}=2\,333\ \mathrm{kg/m^3}`)], answer: 'C: de massadichtheid is 2 333 kg/m³.' }),
  ...calculation({ id: '15', label: '15 · Hindenburg', page: 63,
    problem: 'De oude zeppelin Hindenburg was 112 000 kg zwaar en had een volume van 200 000 m³. Hij had 100 personen van gemiddeld 70 kg aan boord. Hoe groot was de massa van de extra vracht die de Hindenburg kon vervoeren?',
    given: br(m`m_{\mathrm{zep}}=112\,000\ \mathrm{kg}\quad n=100\quad m_{\mathrm{pers}}=70\ \mathrm{kg}`, m`V_{\mathrm{zep}}=V_{\mathrm{lucht}}=200\,000\ \mathrm{m^3}`, m`\rho_{\mathrm{lucht}}=1{,}293\ \mathrm{kg/m^3}`), asked: m`m_{\mathrm{vracht}}=?`,
    parts: [br('Zweven: ' + m`F_G=F_A` + ' en ' + m`F_G=m_{\mathrm{tot}}\cdot g` + '.', m`m_{\mathrm{tot}}=\frac{F_G}{g}=\frac{F_A}{g}=\frac{\rho_{\mathrm{lucht}}\cdot g\cdot V_{\mathrm{lucht}}}{g}`, m`=\rho_{\mathrm{lucht}}\cdot V_{\mathrm{lucht}}`, m`=1{,}293\ \mathrm{kg/m^3}\cdot200\,000\ \mathrm{m^3}=258\,600\ \mathrm{kg}`),
      br(m`m_{\mathrm{vracht}}=m_{\mathrm{tot}}-m_{\mathrm{zep}}-100\cdot m_{\mathrm{pers}}`, m`=258\,600\ \mathrm{kg}-112\,000\ \mathrm{kg}-100\cdot70\ \mathrm{kg}`, m`=139\,600\ \mathrm{kg}=1{,}4\cdot10^5\ \mathrm{kg}`)], answer: 'De zeppelin kon een vracht van ' + m`1{,}4\cdot10^5\ \mathrm{kg}` + ' vervoeren.' }),
  ...concept({ id: 16, label: '16 · Veren en lood', page: 63,
    problem: 'Van veren (ρ = 100 kg/m³) en van lood (ρ = 11 344 kg/m³) neem je telkens een werkelijke massa van 1 kg. Op een balans blijkt de afgelezen massa voor de veren kleiner. Verklaar dit volgens het gegeven boekmodel.',
    reason: 'Door de veel kleinere massadichtheid heeft de kilogram veren in dit model een groter volume. Er wordt meer lucht verplaatst en de archimedeskracht is groter. Daardoor is de kracht op de balans kleiner.', answer: 'De grotere opwaartse kracht van de lucht veroorzaakt de kleinere aflezing bij de veren.' }),
  ...concept({ id: 17, label: '17 · Druk op de bodem', page: 64,
    problem: 'Je brengt een massief voorwerp met ongekende massadichtheid in een maatbeker met water. De hydrostatische druk op de bodem zal:<br>A stijgen; B dalen; C even groot blijven. Verklaar.',
    reason: 'Het ondergedompelde deel verplaatst vloeistof. Zolang er geen water overloopt, stijgt het waterniveau in de maatbeker. De vloeistofhoogte boven de bodem wordt groter: ' + m`p_{\mathrm{hydr}}=\rho_{\mathrm{vl}}\cdot g\cdot h` + '.', answer: 'A: de hydrostatische druk stijgt.' }),
  ...concept({ id: 18, label: '18 · Half drijvende bal', page: 64, figure: ballFigure,
    problem: 'Een bal drijft op het water. De helft steekt boven water uit. Om de bal net helemaal onder water te duwen, is een kracht van 1,0 N nodig. Het gewicht van de bal is:<br>A 0,5 N; B 1,0 N; C 2,0 N; D niet te berekenen. Verklaar.',
    reason: 'Bij drijven is het gewicht gelijk aan de archimedeskracht op het ondergedompelde deel. Om hetzelfde extra volume, de andere helft, onder te duwen is 1,0 N nodig. De archimedeskracht op de al ondergedompelde helft was dus ook 1,0 N.', answer: 'B: het gewicht van de bal is 1,0 N.' })
]

export const BOOK_SLIDES = [...EXAMPLE_SLIDES, ...EXERCISE_SLIDES]
