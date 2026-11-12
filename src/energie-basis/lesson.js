// WACO Fysica 4, 1u-versie. Boekpagina's, geen PDF-pagina's.
// Herwerking: oplossingsstrategie voor wiskundig vaardige leerlingen;
// oefeningen 5–10 volledig, geen afvinkprocedure of harde lesuurgrens.
const tex = String.raw
const bookWork = { type: 'work', completion: 'button' }

export const curriculum = {
  primaryGoal: 'BV2_06.45.01',
  supportingGoals: ['BV2_06.40', 'BV2_06.44.01', 'BV2_06.44.02'],
  documentPages: [48, 50, 51],
  scope: 'Energieformules gebruiken, een onbekende vrijmaken, verbanden verklaren en energieomzettingen en behoud toepassen. Geen volledige kwantitatieve energiebalansenroute.',
  completedBefore: ['1', '2', '3'],
  deferred: ['4'],
  later: ['kwantitatieve energiebalansen', 'vermogen', 'rendement'],
}

export const lesson = {
  id: 'fys4-basis-t2-oefenen-v2',
  title: 'Energie: rekenen en redeneren',
  subtitle: 'T2 · oefeningen 5–10 · 4LAT / 4ECWE',
  headerTitle: 'Energie · basis',
  headerContext: '4LAT / 4ECWE · oefenen',
  finishedTitle: 'Je oefenroute is afgerond',
  homeDescription: 'Oefeningen 1–3 heb je al klassikaal gemaakt. Nu werk je aan oefeningen 5–10 in je boek of schrift. Leg je boek, pen en rekenmachine klaar. Het scherm helpt je een aanpak te kiezen; de groene kaders blijven je formularium.',
  reference: 'Oefeningen 5–10 op p. 77–78 · groene kaders op p. 72–73',
  duration: 'Werk tijdens de les zo ver als je raakt. Ben je sneller klaar, werk dan verder. Is de les om, pauzeer en hervat later.',
  homeFinished: 'Je hebt oefeningen 5–10 doorlopen: zeven berekeningen en vijf redeneeropdrachten. Leg je uitwerkingen klaar voor feedback.',
  completion: {
    eyebrow: 'Oefeningen 5–10 doorlopen',
    title: 'Je berekeningen en redeneringen liggen klaar',
    intro: 'Je koos energieformules, maakte onbekenden vrij en gebruikte energieomzettingen en behoud om situaties te verklaren.',
    work: 'Met “Gemaakt, verder” heb je bevestigd dat je oefening 5 volledig, 6a–c met eenhedencontrole, 7, 8a–b, 9a–b en 10 met verklaring gemaakt hebt. Dat is geen automatische correctie van je boekwerk.',
    checksLabel: 'Strategie en energiebehoud',
    nextTitle: 'Bespreek je aanpak',
    next: [
      'Leg je uitwerkingen klaar voor je leerkracht. Wijs een berekening of redenering aan waarover je twijfelt en vertel hoe je die aangepakt hebt.',
      'Deze route dekt niet het hele thema. Rekenen met energiebalansen, vermogen en rendement komt later nog aan bod.',
    ],
  },
}

export const steps = [
  {
    ...bookWork, id: 'oefening-5', section: 'Formules kiezen', title: 'Oefening 5 · drie situaties',
    source: 'Boek p. 77 · oefening 5 volledig · groene kaders p. 72–73',
    exercise: '5', page: 77, parts: ['kinetisch', 'gravitationeel', 'elastisch'],
    instructions: ['Maak de drie berekeningen: het metalen balletje, de appel en de veer. Schrijf bij elke berekening je formule, invulling en antwoord met eenheid.'],
    strategy: [
      'Herken wat de energie bepaalt: beweging, hoogte of vervorming. Kies daarmee het passende groene kader op p. 72–73.',
      'Koppel de gegevens en de gevraagde grootheid aan de symbolen in die formule. Stem de eenheden af vóór je invult.',
      'Werk de berekening uit en beoordeel of je antwoord bij de gevraagde grootheid past.',
    ],
    support: [
      'Beweging: “Kinetische energie” op p. 72. Hoogte: “Potentiële gravitationele energie” op p. 72. Vervorming: “Potentiële elastische energie” op p. 73.',
      tex`Voor de appel heb je ook \(g=9{,}81\,\mathrm{N/kg}\) nodig, zoals in het voorbeeld op p. 72. Controleer de massa-eenheid in de opgave.`,
      'Vergelijk je opbouw met de uitgewerkte voorbeelden op p. 72–73, niet je getallen met hun antwoorden.',
    ],
    next: 'Oefening 5 gemaakt, verder',
  },
  {
    ...bookWork, id: 'oefening-6a', section: 'Eenheden als controle', title: 'Oefening 6a · energie berekenen',
    source: 'Boek p. 77 · oefening 6a · kader p. 72 en fietsvoorbeeld p. 73',
    exercise: '6', page: 77, parts: ['a'],
    instructions: ['Bereken de kinetische energie in oefening 6a. Toon ook aan dat de eenheid bij energie past, zoals de opdracht boven oefening 6 vraagt.'],
    strategy: [
      'Kies de formule op basis van de gevraagde energievorm. Noteer gegeven en gevraagd en werk de berekening uit.',
      'Vervang in dezelfde formule de grootheden door hun SI-eenheden. Vergelijk die eenhedencontrole met het fietsvoorbeeld op p. 73.',
    ],
    support: [
      tex`Vertrek van \(E_{\mathrm{k}}=\frac{mv^2}{2}\). De factor 2 heeft geen eenheid.`,
      tex`Voor de eenheden: \(\mathrm{kg}\cdot(\mathrm{m/s})^2\). Dat is \(\mathrm{kg}\cdot\mathrm{m}^2/\mathrm{s}^2=\mathrm{J}\).`,
    ],
    next: 'Oefening 6a gemaakt, verder',
  },
  {
    ...bookWork, id: 'oefening-6b', section: 'De onbekende vrijmaken', title: 'Oefening 6b · massa zoeken',
    source: 'Boek p. 77 · oefening 6b · groen kader “Kinetische energie”, p. 72',
    exercise: '6', page: 77, parts: ['b'],
    instructions: ['Bereken de massa in oefening 6b. Laat in je uitwerking zien hoe je de formule omvormt. Controleer ook de eenheid van je resultaat.'],
    strategy: [
      'De gegeven energie en snelheid horen bij dezelfde formule als in 6a. Alleen de onbekende verandert.',
      tex`Maak eerst \(m\) vrij in de formule, zonder getallen. Vul daarna pas de gegevens in.`,
      'Gebruik de eenheden om te toetsen of je omvorming een massa oplevert.',
    ],
    support: [
      tex`Begin bij \(E_{\mathrm{k}}=\frac{mv^2}{2}\). Vermenigvuldig beide leden met 2: \(2E_{\mathrm{k}}=mv^2\).`,
      tex`Deel door \(v^2\): \(m=\frac{2E_{\mathrm{k}}}{v^2}\). Je vult dus geen energie in op de plaats van de massa.`,
      tex`Eenhedencontrole: \(\frac{\mathrm{J}}{(\mathrm{m/s})^2}=\mathrm{kg}\). Gebruik zo nodig de joule-uitdrukking uit het fietsvoorbeeld op p. 73.`,
    ],
    next: 'Oefening 6b gemaakt, verder',
  },
  {
    ...bookWork, id: 'oefening-6c', section: 'De onbekende vrijmaken', title: 'Oefening 6c · snelheid zoeken',
    source: 'Boek p. 77 · oefening 6c · groen kader “Kinetische energie”, p. 72',
    exercise: '6', page: 77, parts: ['c'],
    instructions: ['Bereken de snelheid in oefening 6c, met een omgevormde formule en eenhedencontrole. Je zoekt nu een snelheid, niet opnieuw een energie.'],
    strategy: [
      tex`Vertrek van de energieformule en maak \(v\) vrij vóór je getallen invult.`,
      'Werk de berekening uit. Kies de waarde die past bij de gevraagde grootte van de snelheid.',
      'Beoordeel je omvorming met de eenheden: levert ze een snelheid op?',
    ],
    support: [
      tex`Isoleer eerst \(v^2\): \(v^2=\frac{2E_{\mathrm{k}}}{m}\). Daaruit volgt \(v=\sqrt{\frac{2E_{\mathrm{k}}}{m}}\).`,
      tex`Voor de eenheden geldt \(\mathrm{J/kg}=\mathrm{m}^2/\mathrm{s}^2\). Na de wortel krijg je \(\mathrm{m/s}\). Gebruik de positieve waarde voor de grootte van de snelheid.`,
    ],
    next: 'Oefening 6c gemaakt, verder',
  },
  {
    ...bookWork, id: 'oefening-7', section: 'De aanpak overdragen', title: 'Oefening 7 · de veer in de jumping stilts',
    source: 'Boek p. 78 · oefening 7 · groen kader “Potentiële elastische energie”, p. 73',
    exercise: '7', page: 78, parts: ['lengteverandering'],
    instructions: ['Bereken de maximale lengteverandering van het veersysteem. Haal de gegevens uit zowel de tekst als de tekening en schrijf je omvorming op.'],
    strategy: [
      'Herken de energievorm en noteer welke grootheid ontbreekt. De formule kies je op basis van de situatie, niet op basis van de vorige oefening.',
      'Maak de gevraagde grootheid vrij en bereken daarna de lengteverandering. Vergelijk je aanpak met 6c: wat is hetzelfde, wat verandert?',
    ],
    support: [
      tex`Zoek in het groene kader op p. 73 de formule met \(E_{\mathrm{pot,el}}\), \(k\) en \(\Delta\ell\). De waarde van \(k\) staat bij de tekening.`,
      tex`Isoleer de lengteverandering: \((\Delta\ell)^2=\frac{2E_{\mathrm{pot,el}}}{k}\), dus \(\Delta\ell=\sqrt{\frac{2E_{\mathrm{pot,el}}}{k}}\).`,
      tex`Met energie in \(\mathrm{J}\) en veerconstante in \(\mathrm{N/m}\) krijg je de lengteverandering in \(\mathrm{m}\).`,
    ],
    next: 'Oefening 7 gemaakt, verder',
  },
  {
    id: 'check-strategie', type: 'quiz', final: true, section: 'Kort controleren', title: 'Welke aanpak past bij een nieuwe onbekende?',
    source: 'Groen kader “Potentiële gravitationele energie” op p. 72',
    question: tex`In een nieuwe opgave zijn \(E_{\mathrm{pot,gr}}\), \(m\) en \(g\) bekend. Je zoekt de hoogte. Welke formule gebruik je na het omvormen?`,
    options: [tex`\(h=E_{\mathrm{pot,gr}}\cdot mg\)`, tex`\(h=\frac{E_{\mathrm{pot,gr}}}{mg}\)`, tex`\(h=\frac{mg}{E_{\mathrm{pot,gr}}}\)`], answer: 1,
    correct: tex`Juist. Je behoudt de formule die bij de situatie hoort en maakt de gevraagde grootheid vrij. Uit \(E_{\mathrm{pot,gr}}=mgh\) volgt \(h=\frac{E_{\mathrm{pot,gr}}}{mg}\).`,
    hint: tex`Vertrek van \(E_{\mathrm{pot,gr}}=mgh\) in het groene kader op p. 72. Welke bewerking voer je aan beide leden uit om alleen \(h\) over te houden? Controleer ook of de eenheid een lengte wordt.`,
  },
  {
    ...bookWork, id: 'oefening-8', section: 'Verbanden verklaren', title: 'Oefening 8 · wat verandert er mee?',
    source: 'Boek p. 78 · oefening 8a en 8b · groene kaders p. 72',
    exercise: '8', page: 78, parts: ['a', 'b'],
    instructions: ['Beoordeel beide uitspraken van oefening 8. Schrijf telkens “juist” of “fout” én een verklaring met de passende formule. Alleen een antwoord aanduiden is hier niet voldoende.'],
    strategy: [
      'Bepaal wat verandert en welke grootheden gelijk blijven. Kies voor elke uitspraak de bijbehorende energieformule.',
      'Vergelijk de energie vóór en na de verandering met dezelfde symbolen of met een zelfgekozen getallenvoorbeeld. Gebruik dat verband in je verklaring.',
    ],
    support: [
      tex`Bij 8a kun je de nieuwe snelheid als \(2v\) invullen en de nieuwe energie vergelijken met \(\frac12mv^2\). Houd de massa gelijk.`,
      tex`Bij 8b vergelijk je de formule met \(h\) met dezelfde formule met \(2h\). Houd massa en zwaarteveldsterkte gelijk.`,
    ],
    next: 'Oefening 8 gemaakt, verder',
  },
  {
    ...bookWork, id: 'oefening-9', section: 'Energieomzettingen herkennen', title: 'Oefening 9 · recuperatief remmen',
    source: 'Boek p. 78 · oefening 9a en 9b · tekst en tekening van de hybride auto',
    exercise: '9', page: 78, parts: ['a', 'b'],
    instructions: ['Beantwoord 9a en 9b. Beschrijf de energieomzetting en leg uit wat het nut is van recuperatief remmen. Gebruik de tekst en de tekening bij de opgave.'],
    strategy: [
      'Volg de energie: welke energievorm bezit de rijdende auto, en wat gebeurt er volgens de tekening tijdens het remmen?',
      'Noteer voor 9a een omzettingsketen met pijlen. Gebruik die keten bij 9b om te verklaren waarvoor de teruggewonnen energie later bruikbaar is.',
    ],
    support: [
      'Kijk naar de verwijzing naar de accu onder de tekening. Welke verandering gebeurt er in een accu wanneer je hem oplaadt? Maak onderscheid tussen het transport van energie en de opslag ervan.',
      'Vergelijk met remmen waarbij de remmen vooral opwarmen. Wat kan het voertuig met opgeslagen energie doen dat met die verspreide warmte veel moeilijker is?',
    ],
    next: 'Oefening 9 gemaakt, verder',
  },
  {
    ...bookWork, id: 'oefening-10', section: 'Redeneren met energiebehoud', title: 'Oefening 10 · drie gladde hellingen',
    source: 'Boek p. 78 · oefening 10 · naslag: §3.1 “Behoud van energie”, p. 90',
    exercise: '10', page: 78, parts: ['keuze', 'verklaring'],
    instructions: ['Kies bij oefening 10 het juiste antwoord en schrijf een verklaring met energiebehoud. Lees daarvoor de eerste alinea en bekijk de vallende bal bij “Behoud van energie” op p. 90.'],
    strategy: [
      'Bekijk nauwkeurig wat gelijk blijft in de drie tekeningen: de lengte van de helling. Vergelijk vervolgens het verticale hoogteverschil, niet de afgelegde weg.',
      'Neem aan dat hetzelfde blok telkens vanuit rust vertrekt. Koppel de energie bovenaan aan de kinetische energie beneden. Wat mag je bij deze heel gladde hellingen verwaarlozen?',
      'Gebruik die vergelijking om je keuze te verklaren. Je hoeft geen hellingshoek of kracht te berekenen.',
    ],
    support: [
      tex`Bovenaan gebruik je \(E_{\mathrm{pot,gr}}=mgh\), met de grond als referentieniveau. Teken desnoods bij elke helling een verticale lijn voor \(h\).`,
      tex`Bij gelijke beginrust en verwaarloosbare wrijving geldt \(E_{\mathrm{k,beneden}}=mgh\). Massa en zwaarteveldsterkte blijven gelijk. Welke hoogte moet je dus vergelijken?`,
      'Even lange hellingen hebben niet noodzakelijk hetzelfde hoogteverschil. Geef je verklaring bij de tekeningen uit het boek, niet bij een veronderstelde gelijke hoogte.',
    ],
    next: 'Oefening 10 gemaakt, verder',
  },
  {
    id: 'check-energiebehoud', type: 'quiz', final: true, section: 'Afronden', title: 'En als er wél wrijving is?',
    source: 'Boek p. 90 · §3.1 “Behoud van energie”, uitleg bij de vallende bal',
    question: 'Een blok glijdt vanuit rust naar beneden, maar nu warmen het blok en de helling door wrijving op. Welke redenering klopt?',
    options: [
      'Alle aanvankelijke gravitationele energie wordt kinetische energie, ongeacht de wrijving.',
      'Een deel van de energie verdwijnt; de totale energie blijft dus niet behouden.',
      'Een deel wordt thermische energie. Neem ook die energie mee in de energiebalans.',
    ], answer: 2,
    correct: 'Juist. Met wrijving wordt niet alle afname van gravitationele energie omgezet in kinetische energie. Thermische energie telt ook mee; energie verdwijnt niet.',
    hint: 'Lees op p. 90 de alinea onder de uitleg over de vallende bal: ook thermische energie door wrijving en luchtweerstand maakt deel uit van de energiebalans. Vergelijk de totale energie, niet alleen de bewegingsenergie.',
    next: 'Bekijk mijn afronding',
  },
]
