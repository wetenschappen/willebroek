import { archimedesLesson, math as m, list, mc } from '../physics/archimedes-lesson.js'
import { BOOK_EXERCISES, BOOK_SLIDES } from '../physics/archimedes-book.js'

export default archimedesLesson({
  id: 'fys4-m01-l10-archimedeskracht-gassen',
  title: 'Archimedes: drijven, gassen en boekvraagstukken',
  description: 'Uur 2 van 2 · WACO T1 H4. Vertrek van de krachtenbalans, verklaar drijven en zweven in gassen en oefen in het boek. Alle drie de boekvoorbeelden en opgaven 1–18 zijn volledig uitgewerkt in de presentatie.',
  phase: 'apply',
  goals: [
    'Ik kan bij een vanuit rust losgelaten voorwerp zinken, zweven of stijgen verklaren met de krachtenbalans.',
    'Ik kan drijven verklaren als evenwicht tussen het gewicht van het hele voorwerp en de archimedeskracht op het ondergedompelde deel.',
    'Ik kan Archimedes ook bij gassen toepassen, met de massadichtheid van het omringende gas en de totale massa van het systeem.',
    'Ik kan boekvraagstukken oplossen via de boekaanpak: Gegeven, Gevraagd, Oplossing en Antwoord.',
    'Ik kan het schijnbare gewicht uit een dynamometermeting verbinden met de archimedeskracht.',
    'Ik kan juiste eenheden, de bij de opgave horende massadichtheid en de afronding uit de boekuitwerking gebruiken.'
  ],
  exercises: BOOK_EXERCISES,
  slidesA: [
    { layout: 'title', title: 'Wat doet het voorwerp?', subtitle: 'Zinken, zweven, stijgen en drijven · daarna de stap naar gassen.' },
    { layout: 'standard', title: 'Vergelijk de twee krachten', content: list('Het voorwerp wordt vanuit <strong>rust</strong> vrijgelaten, los van de bodem. We verwaarlozen weerstand.', m`F_A<F_G` + ': de resultante wijst omlaag. Het voorwerp begint te <strong>zinken</strong>.', m`F_A=F_G` + ': geen versnelling. Volledig ondergedompeld kan het voorwerp blijven <strong>zweven</strong>.', m`F_A>F_G` + ': de resultante wijst omhoog. Het voorwerp begint te <strong>stijgen</strong>.') },
    { layout: 'steps', title: 'Van stijgen naar drijven · WACO p. 54', steps: [
      { text: 'Onder water kan ' + m`F_A>F_G` + ' zijn. Het voorwerp stijgt.' },
      { text: 'Aan het oppervlak wordt het ondergedompelde deel kleiner. Er wordt minder vloeistof verplaatst: ' + m`F_A` + ' neemt af.' },
      { text: 'In drijvend evenwicht geldt ' + m`F_A=F_G` + '. Het gewicht van het hele voorwerp blijft gelijk.' },
      { text: 'We stellen deze krachtenbalans op en vullen de bekende formules in. Geen extra drijfformule om uit het hoofd te leren.' }
    ] },
    { layout: 'predict', title: 'Drijven: gelijk of groter?', question: 'Een houten blok drijft in rust. Is de archimedeskracht groter dan het gewicht, omdat hout lichter is dan water?', hint: 'Wat zou een blijvende opwaartse resultante doen?', revealText: 'Nee. Bij drijven in rust is ' + m`F_A=F_G` + '. Een kleiner deel is ondergedompeld tot het gewicht van de verplaatste vloeistof gelijk is aan het gewicht van het hele blok.' },
    { layout: 'standard', title: 'Ook gassen oefenen archimedeskracht uit', content: list('WACO p. 56–58: een voorwerp in een gas verplaatst dat gas.', m`F_A=\rho_{\mathrm{gas}}\cdot g\cdot V_{\mathrm{gas}}=F_{G,\mathrm{gas}}` + '.', 'Gebruik de massadichtheid van het <strong>omringende gas</strong>.', 'Bij een ballon hoort bij ' + m`F_G` + ' de <strong>totale massa</strong>: ballon, inhoud, mand en lading.') },
    { layout: 'standard', title: 'Hoe gebruik je dit uur?', content: list('Controleer de vijf krachtenbalansen in het digitale lab.', 'Werk daarna in het boek op p. 60–64. Reeds gemaakte opgaven hoef je niet opnieuw te maken.', 'Gebruik de inhoudskeuze in de boekpresentatie om gericht een voorbeeld of opgave te controleren.', 'Spreek af hoe onafgewerkte opgaven verder worden afgewerkt; de volledige lijst blijft zichtbaar.') }
  ],
  slidesB: [
    { layout: 'standard', section: 'Overzicht en werkwijze', title: 'Boekuitwerkingen: kies je opgave', content: list('Drie uitgewerkte voorbeelden: p. 52, 54 en 58.', 'Alle achttien opgaven en hun deelvragen: p. 60–64.', '<strong>Gegeven → Gevraagd → Oplossing → Antwoord.</strong>', 'Kies bovenaan bij <strong>Ga naar</strong>. Elke nieuwe opgave begint zonder onthulde oplossing.', 'Langere oplossingen lopen over meerdere slides; de tekst wordt niet verkleind.') },
    ...BOOK_SLIDES
  ],
  slidesC: [
    { layout: 'summary', title: 'Welke aanpak hoort bij de situatie?', items: [
      'Volledig ondergedompeld: ' + m`V_{\mathrm{vl}}=V_{\mathrm{ond}}=V_{\mathrm{vw}}` + '. Gebruik de vloeistofdichtheid.',
      'Drijven of zweven: begin met ' + m`F_A=F_G` + '. Denk aan het juiste systeem en het juiste volume.',
      'Dynamometer: ' + m`F_{\mathrm{schijnbaar}}=F_G-F_A` + ' bij een stilhangend voorwerp.',
      'Gas: dezelfde wet, met de massadichtheid van het omringende gas en de totale massa.'
    ], keyTakeaway: 'De formule volgt uit de situatie. Kies niet alleen op basis van een sleutelwoord.' },
    { layout: 'closing', title: 'Controleer je antwoord', subtitle: 'Welke stof? Welk volume? Welk systeem? Welke eenheid? Past de uitkomst bij de krachtenbalans?' }
  ],
  entry: [
    mc('a1', 'Welke gelijkheid geldt ook bij gedeeltelijke onderdompeling?', ['V_vl = V_ond', 'V_vl = V_vw', 'ρ_vl = ρ_vw'], 0),
    mc('a2', 'Wat bepaalt F_A in dezelfde vloeistof bij dezelfde g?', ['Het ondergedompelde volume.', 'Het materiaal van het voorwerp op zichzelf.', 'De diepte op zichzelf.'], 0),
    mc('a3', 'Een voorwerp blijft vanuit rust volledig onder water zweven. Welke vergelijking geldt?', ['F_A > F_G', 'F_A = F_G', 'F_A = 0 N'], 1),
    mc('a4', 'Een voorwerp hangt stil aan een dynamometer in water. Waarom is de aflezing kleiner dan in lucht?', ['De massa verdwijnt gedeeltelijk.', 'Het water oefent een opwaartse kracht uit.', 'De zwaarteveldsterkte wordt in water nul.'], 1)
  ],
  exit: [
    mc('x1', 'Een blok drijft in rust, gedeeltelijk boven water. Welke uitspraak klopt?', ['F_A > F_G, want het blijft boven.', 'F_A = F_G; V_vl is alleen het ondergedompelde deel.', 'F_A = 0 N, want het blok versnelt niet.'], 1),
    mc('x2', 'Voor de archimedeskracht op een ballon gebruik je de dichtheid van …', ['de omringende lucht.', 'alleen het gas in de ballon.', 'de stof van het ballonweefsel.'], 0),
    mc('x3', 'Een stilhangend voorwerp heeft in lucht een gewicht van 90 N. In een vloeistof geeft de dynamometer 60 N aan. Hoe groot is F_A?', ['150 N', '60 N', '30 N'], 2),
    { id: 'x4', type: 'open', question: 'Leg uit waarom bij drijven ' + m`F_A=F_G` + ' geldt, terwijl de gemiddelde massadichtheid van het voorwerp kleiner kan zijn dan die van de vloeistof.' }
  ]
})
