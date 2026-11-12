// WACO Fysica 4, 1u-versie: boek p. 72–73 en 77 (niet de 2u-paginering).
// Alleen de eerste oefenles na de klassikaal gemaakte oefeningen 1–3.
const tex = String.raw

export const curriculum = {
  primaryGoal: 'BV2_06.45.01',
  documentPages: [50, 51],
  scope: 'Energie berekenen met een formularium; nog geen volledige energiebalansenroute.',
  completedBefore: ['1', '2', '3'],
  deferred: ['4', '6b', '6c', '7', '8', '9', '10'],
}

export const lesson = {
  id: 'fys4-basis-t2-rekenen-v1',
  title: 'Energie berekenen met je boek',
  subtitle: 'Fysica · jaar 4 · basisvorming · 4LAT / 4ECWE',
  headerTitle: 'Energie · basis',
  headerContext: '4LAT / 4ECWE · oefenles',
  finishedTitle: 'Je eerste oefenroute is klaar',
  homeDescription: 'Oefeningen 1–3 heb je al samen met je leerkracht gemaakt. Nu oefen je het rekenen, stap voor stap. Leg je boek, schrift, pen en rekenmachine klaar. De groene kaders mag je blijven gebruiken.',
  reference: 'Oefening 5 en 6a op p. 77 · groene kaders op p. 72–73',
  duration: 'Voor één lesuur. Werk rustig; pauzeren en later hervatten kan altijd.',
  homeFinished: 'Je hebt de drie berekeningen van oefening 5 en oefening 6a gemaakt. De rest van het thema volgt later, met je leerkracht.',
  completion: {
    eyebrow: 'Einde van de eerste oefenroute',
    title: 'Je vier berekeningen zijn klaar',
    intro: 'Je hebt geoefend met beweging, hoogte en een vervormde veer. Je boek blijft je formularium.',
    work: 'Je hebt de drie deelopdrachten van oefening 5 en oefening 6a op p. 77 als gemaakt aangeduid. Laat je uitwerkingen nakijken: de vinkjes betekenen niet dat alles automatisch juist is.',
    nextTitle: 'Leg je uitwerkingen klaar',
    next: [
      'Controleer bij elke berekening: gegeven en gevraagd, de formule, het invullen en een antwoord met eenheid. Heb je ergens getwijfeld? Wijs die regel aan wanneer je leerkracht komt kijken.',
      'Dit is nog niet het hele hoofdstuk. Begin niet zomaar aan de resterende oefeningen; je leerkracht kiest de volgende opdrachten bij de basisdoelen.',
      'Ben je vroeg klaar? Leg zonder naar je uitwerking te kijken uit waarom je bij de drie delen van oefening 5 telkens een andere formule gebruikt. Kijk daarna in de groene kaders of je uitleg klopt.',
    ],
  },
}

export const steps = [
  {
    id: 'start-na-oefening-3', type: 'read', section: 'Starten', title: 'Open je boek op p. 77',
    source: 'Boek Fysica 4 (1u) · p. 77 · oefening 5',
    instructions: [
      'Zoek oefening 5. Vandaag maak je de drie berekeningen van deze oefening en daarna oefening 6a. Oefeningen 1–3 hoef je niet opnieuw te maken.',
      'Je schrijft in je boek of schrift. Het scherm geeft telkens één opdracht. De groene kaders op p. 72–73 en je rekenmachine mag je gebruiken.',
    ],
    note: 'Kijk naar de paginanummers van je eigen leerboek. Dit is de basisroute voor 4LAT / 4ECWE, niet de route van de twee-uursgroep.',
    next: 'Mijn boek en rekenmachine liggen klaar',
  },
  {
    id: 'opfrissing-beweging', type: 'quiz', diagnostic: true, section: 'Even opfrissen', title: 'Welke energie hoort bij bewegen?',
    source: 'Eerst uit je hoofd · hulp in het groene kader op p. 72',
    question: 'Je wilt de energie berekenen die een rijdende skateboarder bezit door zijn beweging. Welke energievorm zoek je?',
    options: ['Kinetische energie', 'Potentiële elastische energie', 'Potentiële gravitationele energie'], answer: 0,
    correct: tex`Juist. Beweging hoort bij kinetische energie, met symbool \(E_{\mathrm{k}}\).`,
    hint: 'Zoek op p. 72 het groene kader “Kinetische energie”. Dat is de energie van een bewegend voorwerp.',
  },
  {
    id: 'opfrissing-eenheid', type: 'quiz', diagnostic: true, section: 'Even opfrissen', title: 'Waarin noteer je energie?',
    source: 'Hulp: de regel “SI-eenheid” in de groene kaders op p. 72–73',
    question: 'Welke eenheid hoort bij een berekende hoeveelheid energie?',
    options: [tex`Kilogram (\(\mathrm{kg}\))`, tex`Joule (\(\mathrm{J}\))`, tex`Meter per seconde (\(\mathrm{m/s}\))`], answer: 1,
    correct: tex`Juist. Je eindantwoord voor energie krijgt de eenheid joule: \(\mathrm{J}\).`,
    hint: 'Bekijk de regel “SI-eenheid” in een groen energiekader. De massa heeft een andere eenheid dan de energie die je berekent.',
  },
  {
    id: 'kader-kinetisch', type: 'read', section: 'Oefening 5 · bewegend balletje', title: 'Zoek het groene kader op p. 72',
    source: 'Boek p. 72 · groen kader “Kinetische energie”',
    instructions: [
      'Lees in het groene kader de formule voor kinetische energie. Zoek in de tekst erboven wat de twee gegevens in de formule betekenen.',
      tex`Wijs in je boek \(m\) en \(v\) aan. De massa noteer je in \(\mathrm{kg}\), de snelheid in \(\mathrm{m/s}\). Kijk ook waar het kwadraat en de deling door 2 staan.`,
    ],
    next: 'Ik heb de formule en gegevens gevonden',
  },
  {
    id: 'oefening-5-beweging-plan', type: 'work', section: 'Oefening 5 · bewegend balletje', title: 'Noteer eerst wat je weet',
    source: 'Boek p. 77 · oefening 5 · eerste deel, het metalen balletje',
    exercise: '5', page: 77, parts: ['kinetisch-voorbereiden'],
    instructions: [
      'Lees alleen het eerste deel van oefening 5, over het balletje. Schrijf “Gegeven” en “Gevraagd” boven je berekening.',
      'Noteer de twee gegevens uit de opgave met hun symbool en eenheid. Schrijf daarna de gevraagde energiegrootheid en de passende formule uit het groene kader op p. 72. Reken nog niet uit.',
    ],
    support: [
      tex`De massa krijgt het symbool \(m\); de snelheid het symbool \(v\). Gevraagd is \(E_{\mathrm{k}}\), niet de snelheid.`,
      tex`Controleer je formule in het boek: \(E_{\mathrm{k}}=\frac{mv^2}{2}\). Beide gegevens staan in deze opgave al in de geschikte eenheden.`,
    ],
    checks: ['Ik heb de twee gegevens met symbool en eenheid genoteerd.', 'Ik heb gevraagd en de formule genoteerd.'],
    next: 'Mijn voorbereiding staat op papier',
  },
  {
    id: 'check-kwadraat', type: 'quiz', section: 'Kort controleren', title: 'Wat betekent het kwadraat?',
    source: 'Hulp: groen kader “Kinetische energie” op p. 72',
    question: tex`Een andere snelheid is \(4{,}0\,\mathrm{m/s}\). Wat betekent \(4{,}0^2\) wanneer je de snelheid kwadrateert?`,
    options: [tex`\(4{,}0+4{,}0\)`, tex`\(4{,}0\cdot 2\)`, tex`\(4{,}0\cdot 4{,}0\)`], answer: 2,
    correct: tex`Juist. Kwadrateren is het getal met zichzelf vermenigvuldigen: \(4{,}0^2=16{,}0\). Gebruik straks wel de snelheid uit je eigen boekoefening.`,
    hint: tex`Het kleine cijfer 2 betekent “maal zichzelf”, niet “maal twee”. Schrijf \(v^2\) eens als \(v\cdot v\). Kies daarna opnieuw.`,
  },
  {
    id: 'oefening-5-beweging-rekenen', type: 'work', section: 'Oefening 5 · bewegend balletje', title: 'Bereken de energie van het balletje',
    source: 'Boek p. 77 · oefening 5 · eerste deel afwerken',
    exercise: '5', page: 77, parts: ['kinetisch-uitwerken'],
    instructions: [
      'Ga verder onder je voorbereiding. Vul de gegevens in de formule in. Zorg dat duidelijk blijft wat je kwadrateert en wat je door 2 deelt.',
      'Reken uit met je rekenmachine. Noteer een eindantwoord met eenheid. Bewaar genoeg cijfers tijdens het rekenen en rond pas op het einde af zoals afgesproken.',
    ],
    support: [
      tex`Reken in deze volgorde: eerst \(v^2\), dan vermenigvuldigen met \(m\), daarna delen door 2. Je kwadrateert niet de massa.`,
      'Kijk desnoods naar de opbouw van het uitgewerkte fietsvoorbeeld op p. 73. Dat gebruikt andere gegevens; neem het antwoord niet over.',
    ],
    checks: ['Ik heb ingevuld én de berekening opgeschreven.', 'Ik heb de snelheid gekwadrateerd en door 2 gedeeld.', 'Ik heb een eindantwoord met de eenheid joule genoteerd.'],
    next: 'Eerste berekening gemaakt',
  },
  {
    id: 'kader-gravitationeel', type: 'read', section: 'Oefening 5 · appel op hoogte', title: 'Zoek het kader voor energie op hoogte',
    source: 'Boek p. 72 · groen kader “Potentiële gravitationele energie”',
    instructions: [
      'Zoek nu het andere groene kader op p. 72: “Potentiële gravitationele energie”. Lees de formule en bekijk de opbouw van het voorbeeld eronder.',
      tex`Zoek welke symbolen bij massa en hoogte horen. Gebruik voor de zwaarteveldsterkte \(g=9{,}81\,\mathrm{N/kg}\), zoals in het boekvoorbeeld.`,
    ],
    next: 'Ik heb het juiste kader gevonden',
  },
  {
    id: 'oefening-5-hoogte', type: 'work', section: 'Oefening 5 · appel op hoogte', title: 'Bereken de energie van de appel',
    source: 'Boek p. 77 · oefening 5 · tweede deel, de appel',
    exercise: '5', page: 77, parts: ['gravitationeel'],
    instructions: [
      'Lees het tweede deel van oefening 5. Noteer gegeven en gevraagd. Let op: de massa staat in gram. Zet die eerst om naar kilogram.',
      'Neem de formule uit het groene kader op p. 72 over, vul in en reken uit. Noteer het eindantwoord met eenheid. Gebruik dezelfde opbouw als bij je eerste berekening.',
    ],
    support: [
      tex`Van gram naar kilogram: deel door 1000. Bijvoorbeeld \(250\,\mathrm{g}=0{,}250\,\mathrm{kg}\). Gebruik daarna de massa uit je eigen opgave.`,
      tex`De formule is \(E_{\mathrm{pot,gr}}=mgh\). Hier hoef je geen snelheid te kwadrateren. Vul massa, zwaarteveldsterkte en hoogte in.`,
    ],
    checks: ['Ik heb gegeven en gevraagd genoteerd, met de massa in kilogram.', 'Ik heb de formule opgeschreven, ingevuld en uitgerekend.', 'Ik heb een eindantwoord met de eenheid joule genoteerd.'],
    next: 'Tweede berekening gemaakt',
  },
  {
    id: 'kader-elastisch', type: 'read', section: 'Oefening 5 · uitgerekte veer', title: 'Zoek het groene kader op p. 73',
    source: 'Boek p. 73 · groen kader “Potentiële elastische energie”',
    instructions: [
      'Zoek het groene kader “Potentiële elastische energie”. Bekijk de formule en het voorbeeld met de flipperkast eronder.',
      tex`Zoek in de tekst wat \(k\) en \(\Delta\ell\) betekenen. Let op: het kwadraat staat bij de lengteverandering \((\Delta\ell)^2\), niet bij \(k\).`,
    ],
    next: 'Ik heb de symbolen teruggevonden',
  },
  {
    id: 'check-lengteverandering', type: 'quiz', section: 'Kort controleren', title: 'Welk gegeven wordt gekwadrateerd?',
    source: 'Hulp: groen kader “Potentiële elastische energie” op p. 73',
    question: tex`In de formule \(E_{\mathrm{pot,el}}=\frac{k(\Delta\ell)^2}{2}\) gebruik je twee gegevens. Welke beschrijving klopt?`,
    options: [
      tex`\(k\) is de massa en \(\Delta\ell\) is de snelheid.`,
      tex`\(k\) is de veerconstante en \(\Delta\ell\) is de lengteverandering.`,
      tex`\(k\) is de lengteverandering en \(\Delta\ell\) is de veerconstante.`,
    ], answer: 1,
    correct: tex`Juist. \(k\) noteer je in \(\mathrm{N/m}\); \(\Delta\ell\) in \(\mathrm{m}\). Het is de lengteverandering die je kwadrateert.`,
    hint: tex`Lees de zin boven het groene kader op p. 73. Zoek “lengteverandering” en “veerconstante” en koppel ze aan de symbolen. Het driehoekje in \(\Delta\ell\) betekent hier een verandering.`,
  },
  {
    id: 'oefening-5-veer', type: 'work', section: 'Oefening 5 · uitgerekte veer', title: 'Bereken de energie van de veer',
    source: 'Boek p. 77 · oefening 5 · derde deel, de veer',
    exercise: '5', page: 77, parts: ['elastisch'],
    instructions: [
      'Lees het derde deel van oefening 5. Noteer zelf gegeven en gevraagd. Gebruik het groene kader op p. 73 om de formule te kiezen.',
      'Vul in, reken uit en schrijf een antwoord met eenheid. De lengteverandering uit deze opgave staat al in meter.',
    ],
    support: [
      tex`Je zoekt \(E_{\mathrm{pot,el}}\). Neem \(k\) en \(\Delta\ell\) over uit de opgave en controleer de eenheden in het boek.`,
      tex`Reken eerst \((\Delta\ell)^2\) uit. Vermenigvuldig dan met \(k\) en deel door 2. Vergelijk je opbouw met het flipperkastvoorbeeld op p. 73, niet de getallen.`,
    ],
    checks: ['Ik heb de gegevens met de juiste symbolen en eenheden genoteerd.', 'Ik heb de formule opgeschreven, ingevuld en uitgerekend.', 'Ik heb een eindantwoord met de eenheid joule genoteerd.'],
    next: 'Oefening 5 helemaal gemaakt',
  },
  {
    id: 'oefening-6a', type: 'work', section: 'Oefening 6a · zelf proberen', title: 'Gebruik de aanpak nu zelfstandig',
    source: 'Boek p. 77 · alleen oefening 6a',
    exercise: '6', page: 77, parts: ['a'],
    instructions: [
      'Maak oefening 6a. Kies zelf het passende groene kader. Schrijf gegeven, gevraagd, formule, invulling en eindantwoord op. Gebruik je rekenmachine.',
      'De opgave vraagt ook om de eenheid te controleren. Bekijk daarvoor de eenhedenregel van het fietsvoorbeeld op p. 73 en pas die toe op jouw formule.',
    ],
    support: [
      'Het voorwerp beweegt. Zoek dus op p. 72 het groene kader voor de energie van een bewegend voorwerp. De gegevens zijn al in kilogram en meter per seconde gegeven.',
      tex`Voor de eenhedencontrole kun je gebruiken: \(\mathrm{kg}\cdot(\mathrm{m/s})^2\), dus \(\mathrm{kg}\cdot\mathrm{m}^2/\mathrm{s}^2=\mathrm{J}\). Delen door het getal 2 verandert de eenheid niet.`,
    ],
    checks: ['Ik heb gegeven, gevraagd en de gekozen formule genoteerd.', 'Ik heb de berekening en een eindantwoord met eenheid opgeschreven.', 'Ik heb ook de gevraagde eenhedencontrole opgeschreven.'],
    next: 'Oefening 6a gemaakt',
  },
  {
    id: 'eindcheck-formulekeuze', type: 'quiz', final: true, section: 'Korte eindcheck', title: 'Kies de formule bij de situatie',
    source: 'De groene kaders op p. 72–73 mag je gebruiken',
    question: 'Je berekent de gravitationele energie van een boek op een hoge plank, ten opzichte van de vloer. Welke formule past?',
    options: [tex`\(E_{\mathrm{pot,el}}=\frac{k(\Delta\ell)^2}{2}\)`, tex`\(E_{\mathrm{k}}=\frac{mv^2}{2}\)`, tex`\(E_{\mathrm{pot,gr}}=mgh\)`], answer: 2,
    correct: 'Juist. Hier gaat het om hoogte boven een gekozen referentieniveau. Je gebruikt massa, zwaarteveldsterkte en hoogte.',
    hint: 'Je zoekt geen bewegingsenergie en er is geen vervormde veer. Zoek op p. 72 het groene kader voor gravitationele energie.',
  },
  {
    id: 'eindcheck-massa', type: 'quiz', final: true, section: 'Korte eindcheck', title: 'Staan de gegevens in de juiste eenheid?',
    source: 'Hulp: de massa in het groene kader en voorbeeld op p. 72',
    question: tex`Een andere opgave geeft een massa van \(200\,\mathrm{g}\). Welke waarde vul je in als de formule de massa in kilogram vraagt?`,
    options: [tex`\(0{,}200\,\mathrm{kg}\)`, tex`\(200\,\mathrm{kg}\)`, tex`\(200\,000\,\mathrm{kg}\)`], answer: 0,
    correct: tex`Juist. \(200\,\mathrm{g}\div 1000=0{,}200\,\mathrm{kg}\). De waarde in kilogram is kleiner dan die in gram.`,
    hint: tex`Er gaan \(1000\,\mathrm{g}\) in \(1\,\mathrm{kg}\). Deel de waarde in gram dus door 1000. Je verandert alleen de eenheid, niet de hoeveelheid materiaal.`,
  },
  {
    id: 'eindcheck-rekenen', type: 'quiz', final: true, section: 'Korte eindcheck', title: 'Een kleine nieuwe berekening',
    source: 'Groen kader “Kinetische energie” op p. 72 · rekenmachine toegestaan',
    question: tex`Een karretje heeft massa \(m=2{,}0\,\mathrm{kg}\) en snelheid \(v=3{,}0\,\mathrm{m/s}\). Gebruik \(E_{\mathrm{k}}=\frac{mv^2}{2}\). Hoeveel kinetische energie bezit het?`,
    options: [tex`\(6{,}0\,\mathrm{J}\)`, tex`\(9{,}0\,\mathrm{J}\)`, tex`\(18\,\mathrm{J}\)`], answer: 1,
    correct: tex`Juist. Eerst \(3{,}0^2=9{,}0\). Dan \(2{,}0\cdot 9{,}0=18\). Tot slot \(18\div 2=9{,}0\,\mathrm{J}\).`,
    hint: tex`Controleer twee dingen: heb je de snelheid gekwadrateerd, en heb je daarna door 2 gedeeld? Gebruik de volgorde uit het groene kader: \(m\cdot v^2\), daarna delen door 2.`,
  },
]
