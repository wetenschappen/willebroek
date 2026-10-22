import { archimedesLesson, math as m, list, mc, volumeFigure, pressureFigure } from '../physics/archimedes-lesson.js'
import { BOOK_EXERCISES, EXAMPLE_SLIDES } from '../physics/archimedes-book.js'

export default archimedesLesson({
  id: 'fys4-m01-l09-archimedeskracht-vloeistoffen',
  title: 'Archimedes: afleiding en parameteronderzoek',
  description: 'Uur 1 van 2 · WACO T1 H4. Herstel de volumenotatie, bouw de afleiding vanuit hydrostatische druk op en test de factoren één voor één in het Physics Lab.',
  phase: 'investigate',
  goals: [
    'Ik kan verklaren dat het volume verplaatste vloeistof gelijk is aan het ondergedompelde voorwerpvolume, en alleen bij volledige onderdompeling aan het totale voorwerpvolume.',
    'Ik kan de afleiding op WACO p. 51 stap voor stap verklaren: drukverschil, krachtenverschil, gemeenschappelijke factoren en volume.',
    'Ik kan de wet van Archimedes in woorden en formulevorm geven en de symbolen en SI-eenheden benoemen.',
    'Ik kan de invloed van vloeistofdichtheid, ondergedompeld volume en zwaarteveldsterkte voorspellen en onderzoeken.',
    'Ik kan verklaren waarom diepte en voorwerpmateriaal op zichzelf de archimedeskracht niet veranderen bij gelijk ondergedompeld volume in dezelfde uniforme vloeistof.',
    'Ik kan een eerste boekberekening structureren als Gegeven, Gevraagd, Oplossing en Antwoord.'
  ],
  exercises: BOOK_EXERCISES.filter(e => [1, 2, 3, 10, 17].includes(Number(e.number))),
  slidesA: [
    { layout: 'title', title: 'Archimedes: eerst het begrip herstellen', subtitle: 'Van verplaatste vloeistof naar een begrijpelijke formule.' },
    { layout: 'predict', title: 'Twee notaties: een tegenstelling?', question: 'In het boek staat ' + m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}` + '. Iemand schrijft ' + m`V_{\mathrm{ond}}` + ' in plaats van ' + m`V_{\mathrm{vl}}` + '. Kan dat allebei juist zijn?', hint: 'Welke ruimte neemt het deel onder water in? Welke vloeistof moet daar plaats voor maken?', revealText: 'Ja: ' + m`V_{\mathrm{vl}}=V_{\mathrm{ond}}` + '. Het zijn twee beschrijvingen van dezelfde hoeveelheid ruimte. ' + m`V_{\mathrm{vl}}` + ' is niet alle vloeistof in het vat.' },
    { layout: 'standard', title: 'Totaal, ondergedompeld en verplaatst', content: volumeFigure + list('Het totale blokvolume is telkens 1 000 cm³.', m`V_{\mathrm{vl}}=V_{\mathrm{ond}}` + ' bij gedeeltelijke én volledige onderdompeling.', 'Alleen bij volledige onderdompeling is ook ' + m`V_{\mathrm{vw}}=V_{\mathrm{ond}}` + '.') },
    { layout: 'standard', title: 'Gelijke volumes, niet dezelfde stof', content: list(m`V_{\mathrm{vl}}` + ': het volume <strong>verplaatste vloeistof</strong>.', m`V_{\mathrm{ond}}` + ': het volume van het <strong>ondergedompelde deel</strong>.', m`\rho_{\mathrm{vl}}` + ': de massadichtheid van de <strong>vloeistof</strong>, niet die van het voorwerp.', 'We behouden de boeknotatie en leggen telkens de verbinding met de tekening.') }
  ],
  slidesB: [
    { layout: 'standard', section: 'Afleiding · drukverschil', title: 'WACO p. 51: waar komt de kracht vandaan?', content: pressureFigure + '<p>De zijwaartse drukkrachten heffen elkaar op. Onder ligt dieper: ' + m`p_{\mathrm{hydr},2}>p_{\mathrm{hydr},1}` + ' en dus ' + m`F_2>F_1` + '.</p>' },
    { layout: 'book-example', title: 'Afleiding · van kracht naar druk', steps: [
      { label: 'Drukkrachten', content: m`F_2=p_{\mathrm{hydr},2}\cdot A=\rho_{\mathrm{vl}}\cdot g\cdot h_2\cdot A` + '<br>' + m`F_1=p_{\mathrm{hydr},1}\cdot A=\rho_{\mathrm{vl}}\cdot g\cdot h_1\cdot A` },
      { label: 'Verschil', content: m`F_A=F_2-F_1` + '<br>' + m`=\rho_{\mathrm{vl}}\cdot g\cdot h_2\cdot A-\rho_{\mathrm{vl}}\cdot g\cdot h_1\cdot A` }
    ] },
    { layout: 'book-example', title: 'Afleiding · waarom valt de diepte weg?', steps: [
      { label: 'Uitfactoren', content: m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot A\cdot(h_2-h_1)` },
      { label: 'Hoogte', content: m`h_2-h_1=z` + '<br>De hoogte van de kubus blijft gelijk als de hele kubus dieper gaat.' },
      { label: 'Volume', content: m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot A\cdot z` + '<br>' + m`A\cdot z=V_{\mathrm{vw}}=V_{\mathrm{vl}}` + ' bij deze volledig ondergedompelde kubus.' }
    ] },
    { layout: 'book-example', section: 'De wet en haar betekenis', title: 'De wet van Archimedes', steps: [
      { label: 'Formule', content: m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}` },
      { label: 'Massa', content: m`\rho_{\mathrm{vl}}\cdot V_{\mathrm{vl}}=m_{\mathrm{vl}}` + ': de massa van de verplaatste vloeistof.' },
      { label: 'Gewicht', content: m`F_A=m_{\mathrm{vl}}\cdot g=F_{G,\mathrm{vl}}` },
      { label: 'In woorden', content: 'De archimedeskracht is even groot als het gewicht van de verplaatste vloeistof.' }
    ] },
    { layout: 'standard', title: 'De symbolen houden hun betekenis', content: '<div class="slide-rows"><div class="slide-row"><strong class="slide-row-label">' + m`F_A` + '</strong><span class="slide-row-value">Archimedeskracht · N</span></div><div class="slide-row"><strong class="slide-row-label">' + m`\rho_{\mathrm{vl}}` + '</strong><span class="slide-row-value">Massadichtheid vloeistof · kg/m³</span></div><div class="slide-row"><strong class="slide-row-label">' + m`g` + '</strong><span class="slide-row-value">Zwaarteveldsterkte · N/kg</span></div><div class="slide-row"><strong class="slide-row-label">' + m`V_{\mathrm{vl}}` + '</strong><span class="slide-row-value">Verplaatst vloeistofvolume · m³</span></div></div><p>' + m`1\ \mathrm{dm^3}=10^{-3}\ \mathrm{m^3}\qquad1\ \mathrm{cm^3}=10^{-6}\ \mathrm{m^3}` + '</p>' },
    { layout: 'standard', section: 'Onderzoeken in het Physics Lab', title: 'Eén variabele tegelijk', content: list('Voorspel het effect vóór je de instelling verandert.', 'Leg meting A en B vast. Laat alle andere instellingen gelijk.', 'Test ' + m`\rho_{\mathrm{vl}}` + ', ' + m`V_{\mathrm{ond}}` + ' en ' + m`g` + '.', 'Controleer daarna diepte en voorwerpmateriaal. Verklaar wat gelijk blijft en wat wel verandert.') },
    ...EXAMPLE_SLIDES.filter(s => s.workId === 'example-whale')
  ],
  slidesC: [
    { layout: 'summary', title: 'Drie dingen om vast te houden', items: [
      m`V_{\mathrm{vl}}=V_{\mathrm{ond}}` + '. Alleen bij volledige onderdompeling ook gelijk aan het totale voorwerpvolume.',
      'De onderste drukkracht is groter: ' + m`F_A=F_2-F_1` + '. Bij een star blok valt de diepte weg.',
      m`F_A=\rho_{\mathrm{vl}}\cdot g\cdot V_{\mathrm{vl}}` + ': het gewicht van de verplaatste vloeistof.'
    ], keyTakeaway: 'Dichtheid van de vloeistof en dichtheid van het voorwerp zijn niet verwisselbaar.' },
    { layout: 'closing', title: 'Volgend uur: wat doet het voorwerp?', subtitle: 'De vloeistofkracht alleen is niet genoeg. We vergelijken haar met het gewicht.' }
  ],
  entry: [
    mc('a1', 'Welke twee grootheden heb je nodig om uit p = F/A de kracht te berekenen?', ['Druk en oppervlakte.', 'Druk en volume.', 'Massa en diepte.'], 0),
    mc('a2', 'Een star blok zit volledig onder water. Welk horizontaal vlak ondervindt de grootste hydrostatische druk?', ['Het bovenvlak.', 'Het ondervlak.', 'Beide altijd evenveel.'], 1),
    mc('a3', 'Een blok van 1 000 cm³ zit half onder water. Welk volume vloeistof verplaatst het?', ['500 cm³', '1 000 cm³', 'Alle vloeistof in het vat.'], 0),
    mc('a4', 'Hoeveel m³ is 1,0 dm³?', ['1,0 m³', '0,0010 m³', '0,0000010 m³'], 1)
  ],
  exit: [
    mc('x1', 'Wat betekent V_vl in de boekformule?', ['De totale vloeistofinhoud van het vat.', 'Het verplaatste vloeistofvolume, gelijk aan V_ond.', 'Altijd het totale volume van het voorwerp.'], 1),
    mc('x2', 'Je brengt hetzelfde volledig ondergedompelde starre blok dieper in dezelfde uniforme vloeistof. Wat gebeurt met F_A?', ['Wordt groter.', 'Blijft gelijk: het drukverschil blijft gelijk.', 'Wordt nul.'], 1),
    mc('x3', 'Een voorwerp verplaatst 500 cm³ water. Neem ρ = 1 000 kg/m³ en g = 9,81 N/kg. Hoe groot is F_A, afgerond?', ['4,91 N', '4 905 N', '0,00491 N'], 0),
    { id: 'x4', type: 'open', question: 'Leg in woorden uit waarom A · z in de afleiding vervangen mag worden door het verplaatste vloeistofvolume.' }
  ]
})
