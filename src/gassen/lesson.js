// Bezoekles: bundel 6 p. 1–5. De compressieproef blijft apart en ongewijzigd.
import { steps as compressionSteps } from './compression-pilot.js'
const tex = String.raw

export const lesson = {
  id: 'fys6-gastoestanden-les1-v1',
  title: 'Hoe verandert de druk bij samendrukken en opwarmen?',
  subtitle: '6ELTE / 6IICT · bundel 6 · les 1',
  headerTitle: 'Samendrukken en opwarmen',
  headerContext: '6ELTE / 6IICT · les 1',
  finishedTitle: 'Je route van les 1 is doorlopen',
  homeDescription: 'Je voorspelt eerst, onderzoekt daarna een gasmodel en werkt in je bundel. Leg bundel 6, een pen en je rekenmachine klaar. Je leerkracht opent elk nieuw inhoudsblok en bepaalt de gezamenlijke overgangen.',
  reference: 'Geïllustreerde bundel 6 · p. 1–5 · onderzoeken A en B, opdrachten 1a–c en 2a–c, vergelijken en de individuele slotvraag',
  duration: 'Les 1 duurt 50 minuten en start met een voorspelling, niet met een toets. A+ en B+ zijn vervolg voor wie vroeg klaar is. De ideale gaswet en opdracht 3 op p. 6 horen bij les 2, niet bij deze route.',
  homeFinished: 'De route van les 1 is doorlopen. Laat je eigen papierwerk bekijken: de voortgangsbalk zegt niet dat je antwoorden juist zijn. Les 2 en opdracht 3 zijn hiermee nog niet gemaakt.',
  completion: {
    eyebrow: 'Einde van les 1 · p. 1–5',
    title: 'Eerst de voorwaarden, dan het verband',
    intro: tex`Bij dezelfde hoeveelheid gas kies je de relatie op basis van wat gelijk blijft: bij vaste temperatuur \(p_1V_1=p_2V_2\), bij vast volume \(p_1/T_1=p_2/T_2\). Temperaturen in verhoudingen staan in kelvin.`,
    work: 'Je hebt A0/A1 en het besluit, opdracht 1a–c, B0/B1 en het besluit, opdracht 2a–c, V1/V2 en de individuele slotvraag a–c als uitgewerkt bevestigd. Dit is zelfrapportage: je papierwerk is niet automatisch nagekeken. Het bekijken van A+ of B+ bewijst niet dat je die uitbreiding hebt gemaakt.',
    checksLabel: 'Begripsvragen onderweg',
    nextTitle: 'Laat je denken zien',
    next: [
      'Laat je eigen antwoorden op de slotvraag staan. Je leerkracht bekijkt je uitleg en berekeningen; er is geen automatisch oordeel over deze papieren antwoorden. Bespreek wat je nog lastig vindt.',
      'De volgende les activeren we de ideale gaswet die we eerder samen gebruikten. Opdracht 3 op p. 6 blijft verplichte basis; daarna volgt gerichte gemengde oefening. Dat vervolg staat nog niet in deze digitale route.',
    ],
  },
}

export const steps = [
  ...compressionSteps.slice(0, 5).map(step => ({ ...step })),
  {
    ...compressionSteps[5],
    instructions: [
      'Blijf bij compressie tot je leerkracht het opwarmblok opent. Ben je vroeg klaar? Onderzoek A+; begin niet zelfstandig aan de nieuwe theorie.',
      ...compressionSteps[5].instructions,
    ],
    note: 'A+ is extra binnen hetzelfde onderwerp. De vervolgknop bevestigt niet dat A+ is gemaakt. Ga samen met je leerkracht naar opwarming.',
    next: 'Samen naar opwarming',
  },
  {
    id: 'opwarming-voorspellen', type: 'work', completion: 'button', section: 'Nieuw blok · eerst voorspellen',
    title: 'Wat verwacht je in een star, afgesloten vat?',
    source: 'Bundel 6 · p. 3 · B0, boven de vattekening', page: 3, exercise: 'B0', parts: ['voorspelling', 'verklaring'],
    instructions: [
      'Na de gezamenlijke start van dit blok: maak B0 op p. 3. Het vat kan niet groter worden en er komt geen gas bij. Wat verwacht je met de druk bij opwarming? Geef je eigen reden.',
      'Noteer eerst je voorspelling vóór je de temperatuur in het model verandert. Ditmaal blijft het volume vast, niet de temperatuur.',
    ],
    next: 'Voorspelling genoteerd, onderzoeken',
  },
  {
    id: 'opwarming-onderzoeken', type: 'work', completion: 'button', activity: 'gas-heating', section: 'Eén andere grootheid veranderen',
    title: 'Verander de temperatuur, niet het volume',
    source: 'Bundel 6 · p. 3 · B1 en de modeltabel', page: 3, exercise: 'B1', parts: ['300 K', '360 K', 'p/T'],
    instructions: [
      tex`Begin bij \(300\,\mathrm{K}\) en kies daarna \(360\,\mathrm{K}\). Noteer de absolute drukken bij B1. Volume en hoeveelheid gas blijven gelijk.`,
      tex`Bereken telkens \(p/T\); een breuk mag. Vergelijk de verhouding en bekijk de grafiek. \(450\,\mathrm{K}\) is een extra controlepunt als je klaar bent met de twee basisstanden.`,
    ],
    note: 'Dit model begint bij 1,00 bar op 300 K. Opdracht 2 heeft een andere begindruk: neem straks de eigen gegevens van de opdracht, niet zomaar deze modeldruk.',
    next: 'Tabel uitgewerkt, temperatuur vergelijken',
  },
  {
    id: 'opwarming-kelvin', type: 'quiz', final: true, section: 'De kelvinvalkuil',
    title: 'Is 40 °C tweemaal zo warm als 20 °C?',
    source: 'Bundel 6 · p. 3 · kader “Celsius is niet de absolute temperatuurschaal”',
    question: 'Een star, afgesloten vat gaat van 20 °C naar 40 °C, zonder gasverlies. Wat kun je besluiten over de druk?',
    options: [
      'De druk verdubbelt, want 40 gedeeld door 20 is 2.',
      'De druk blijft gelijk, want het volume blijft gelijk.',
      'De druk stijgt, maar verdubbelt niet: de temperatuur gaat van 293 K naar 313 K.',
      'De druk daalt, want het warme gas neemt vanzelf meer ruimte in.',
    ],
    answer: 2,
    correct: tex`Juist. Gebruik \(T=\theta+273\): \(293\) wordt \(313\,\mathrm{K}\), geen verdubbeling. Bij vast volume en dezelfde hoeveelheid gas verandert de druk met dezelfde factor \(313/293\). Celsius heeft een ander nulpunt; je mag de Celsiusgetallen hier niet delen.`,
    hint: 'Bekijk het kelvinkader op p. 3. Zet eerst beide temperaturen om en vergelijk pas daarna hun verhouding.',
    feedbackByOption: [
      tex`Je deelt Celsiusgetallen. Dat levert hier niet de drukverhouding: gebruik de absolute temperatuurschaal. Op p. 3 staat \(T=\theta+273\). Vergelijk \(293\) met \(313\,\mathrm{K}\), niet \(20\) met \(40\).`,
      'Een vast volume maakt de druk niet constant. In B1 bleef het vat even groot terwijl de druk steeg bij opwarming. De deeltjes bewegen gemiddeld sneller en dragen bij botsingen meer impuls over. Kijk welke temperatuurverhouding erbij hoort.',
      null,
      'Het vat is star: de gasruimte kan niet groter worden. Verwar deze situatie niet met een beweegbare zuiger. In B1 bleef het volume vast en steeg de druk bij opwarming. Vergelijk daarna de temperaturen in kelvin.',
    ],
    next: 'Verbind het onderzoek met het besluit',
  },
  {
    id: 'opwarming-besluit', type: 'work', completion: 'button', section: 'Van model naar verband',
    title: 'Welk verband past bij vast volume?',
    source: 'Bundel 6 · p. 3 · “Na het onderzoek: volume constant” en Besluit', page: 3, exercise: 'besluit-B', parts: ['verhouding', 'kelvin'],
    instructions: [
      'Vergelijk de vattekeningen en de modelwaarden. Het vat en het aantal deeltjes blijven gelijk; bij hogere temperatuur bewegen de deeltjes gemiddeld sneller. Dat verklaart de hogere druk bij vast volume.',
      tex`Bekijk het kader “Na het onderzoek: volume constant”. Noteer bij het besluit welke verhouding gelijk bleef en welke temperatuurschaal nodig is. Verbind \(p_1/T_1=p_2/T_2\) met de rechte in de grafiek.`,
    ],
    next: 'Besluit genoteerd, zelf toepassen',
  },
  {
    id: 'opwarming-opdracht-2', type: 'work', completion: 'button', section: 'Zelf rekenen en verklaren',
    title: 'Maak opdracht 2a, 2b en 2c',
    source: 'Bundel 6 · p. 4 · “2. Een star, afgesloten vat warmt op”', page: 4, exercise: '2', parts: ['a', 'b', 'c'],
    instructions: [
      'Maak alle drie deelvragen op p. 4. Zet eerst beide temperaturen om naar kelvin. Bereken daarna de einddruk met de eigen begindruk van deze opdracht.',
      'Leg bij 2c in woorden uit waarom de druk bij 20 → 40 °C niet verdubbelt. Verwijs naar de temperaturen in kelvin; alleen “dat mag niet” is nog geen verklaring.',
    ],
    strategy: [
      'Noteer gegeven en gevraagd. Benoem dat volume en hoeveelheid gas gelijk blijven.',
      tex`Zet beide temperaturen om met \(T=\theta+273\). Gebruik \(p_1/T_1=p_2/T_2\) en maak de einddruk vrij.`,
      'Vul in en geef een antwoord met eenheid. Past de richting van de verandering bij opwarming in een star vat?',
    ],
    support: [
      tex`Vermenigvuldig beide kanten met \(T_2\): \(p_2=p_1T_2/T_1\). Beide temperaturen moeten in kelvin staan; beide drukken mogen in bar blijven.`,
      'Je kunt de uitkomst controleren met de factor waarmee de absolute temperatuur verandert. Neem geen begindruk over uit het model: de papieren opdracht beschrijft een ander vat.',
    ],
    next: 'Opdracht 2a–c uitgewerkt, verder',
  },
  {
    id: 'opwarming-vervolg', type: 'read', section: 'Vervolg binnen hetzelfde onderwerp',
    title: 'Vroeg klaar? Denk verder met B+',
    source: 'Bundel 6 · p. 4 · B+ onderaan',
    instructions: [
      'Blijf bij opwarming tot je leerkracht de vergelijking opent. Ben je vroeg klaar? Maak de gedachtevraag B+: welke temperatuur geeft vanuit 300 K tweemaal de druk bij hetzelfde volume en dezelfde hoeveelheid gas?',
      'Voorspel en verklaar op papier. Geef je temperatuur zowel in kelvin als in graden Celsius. Controleer met de constante verhouding, niet door de Celsiusgetallen te verdubbelen.',
    ],
    note: 'B+ is extra; dit is een gedachtevraag, geen echte verwarmingsproef met een drukvat. De vervolgknop bevestigt niet dat B+ is gemaakt. Ga samen met je leerkracht naar de vergelijking.',
    next: 'Samen vergelijken',
  },
  {
    id: 'gassen-vergelijken', type: 'work', completion: 'button', section: 'Beide situaties verbinden',
    title: 'Kan de druk op twee manieren stijgen?',
    source: 'Bundel 6 · p. 5 · “Samen vergelijken”, V1 en V2', page: 5, exercise: 'V1-V2', parts: ['tabel V1', 'verklaring V2'],
    instructions: [
      'Na de gezamenlijke start: vul de twee rijen van V1 in. Benoem per situatie wat verandert, wat gelijk blijft en welke relatie past.',
      'Beantwoord daarna V2. Moet een hogere druk altijd betekenen dat het volume kleiner werd? Onderbouw je antwoord met de spuit én het starre vat. Bespreek je redenering op het afgesproken klassikale moment.',
    ],
    support: ['Vergelijk niet alleen de einddrukken. Vraag per situatie: veranderde de gasruimte of veranderde de temperatuur? Welke grootheden hielden we bewust gelijk?'],
    next: 'V1 en V2 uitgewerkt, naar de slotvraag',
  },
  {
    id: 'gassen-slotvraag', type: 'work', completion: 'button', section: 'Ieder afzonderlijk',
    title: 'Laat individueel zien hoe je redeneert',
    source: 'Bundel 6 · p. 5 · “Slotvraag les 1: ieder afzonderlijk”', page: 5, exercise: 'slotvraag', parts: ['a', 'b', 'c'],
    instructions: [
      'Maak bij het afgesproken slotmoment de drie deelvragen a, b en c individueel op papier. Geef je eigen uitleg, ook als je onzeker bent. Formulehulp uit je bundel mag; overleg nu niet met een klasgenoot.',
      'Laat je eigen antwoorden staan voor de controle door je leerkracht. Deze slotvraag helpt bepalen wat we de volgende les nog moeten bespreken; ze is geen onverwachte toets op punten.',
    ],
    note: 'De knop bevestigt alleen dat jij de drie deelvragen hebt uitgewerkt. De website kijkt deze antwoorden niet na en geeft geen automatische slotvraagscore.',
    next: 'Slotvraag a–c gemaakt',
  },
]

export const STORAGE_KEY = `willebroek:gassen:les1:${lesson.id}`
