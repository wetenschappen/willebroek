// Het goedgekeurde proefblok, ook de bron voor het eerste blok van de 5–10-les.
// Bron: WACO Fysica 4 (1u), boek p. 72–73 en eerste bullet van 5 op p. 77.
const tex = String.raw

export const lesson = {
  id: 'fys4-basis-kinetisch-proefblok-v1',
  title: 'Kinetische energie: wat vul je eigenlijk in?',
  subtitle: '4LAT / 4ECWE · proefblok kinetische energie',
  headerTitle: 'Kinetische energie',
  headerContext: '4LAT / 4ECWE · proefblok',
  finishedTitle: 'Je proefblok is afgerond',
  homeDescription: 'Je onderzoekt een uitgewerkt voorbeeld in je boek, bespreekt de betekenis van de formule via korte vragen en past je aanpak toe op het metalen balletje. Je boek, schrift en rekenmachine blijven je werkplek.',
  reference: 'Groen kader p. 72 · fietsvoorbeeld p. 73 · eerste deel van oefening 5, p. 77',
  duration: 'Dit is één proefblok, niet de volledige route voor oefeningen 5–10.',
  homeFinished: 'Je hebt het fietsvoorbeeld onderzocht en de berekening met het metalen balletje gemaakt. De overige delen van oefening 5 zitten niet in dit proefblok.',
  completion: {
    eyebrow: 'Einde van het proefblok',
    title: 'Van voorbeeld naar eigen aanpak',
    intro: tex`Bij \(E_{\mathrm{k}}=\frac{mv^2}{2}\) horen niet zomaar twee getallen. Je bepaalt eerst van welk systeem je de energie zoekt en welke massa en snelheid daarbij horen.`,
    work: 'Je hebt alleen de eerste berekening van oefening 5 op p. 77 als gemaakt bevestigd: het metalen balletje. Laat je schriftelijke uitwerking nakijken; deze is niet automatisch gecorrigeerd.',
    checksLabel: 'Begrip en toepassing',
    nextTitle: 'Hier stopt het proefblok',
    next: [
      'De appel en de veer van oefening 5, en oefeningen 6–10, zijn hiermee nog niet gemaakt. Gebruik voor de hele les de volledige energieroute voor 4LAT / 4ECWE.',
      'Bespreek bij je uitwerking: welk systeem onderzocht je, welke gegevens hoorden daarbij en waarom paste de gekozen formule?',
    ],
  },
}

export const steps = [
  {
    id: 'kinetisch-boekonderzoek', type: 'read', section: 'Onderzoeken in je boek',
    title: 'Onderzoek de keuzes in het fietsvoorbeeld',
    source: 'Boek p. 72 · groen kader “Kinetische energie” · fietsvoorbeeld bovenaan p. 73',
    instructions: [
      'Lees het groene kader op p. 72. Bekijk daarna de vraag en de uitwerking van het fietsvoorbeeld bovenaan p. 73.',
      tex`Zoek wat in dat voorbeeld met het systeem bedoeld wordt. Wijs vervolgens bij “Gegeven” aan welke massa \(m\) en snelheid \(v\) in de formule terechtkomen. Waarom gebruikt de uitwerking juist die massa?`,
      'Je hoeft het voorbeeld niet opnieuw uit te rekenen. Zoek het verband tussen de vraag, het gekozen systeem en de ingevulde gegevens; daarover gaat de volgende vraag.',
    ],
    next: 'Bekijk de vraag over het systeem',
  },
  {
    id: 'kinetisch-systeemcheck', type: 'quiz', final: true, section: 'Begrijpen wat je invult',
    title: 'Welke massa hoort bij het systeem?',
    source: 'Boek p. 73 · fietsvoorbeeld · vergelijk de vraag met “Gegeven”',
    question: tex`Je berekent de kinetische energie van het systeem renner–fiets. Welke massa hoort dan bij \(m\) in de formule?`,
    options: ['Alleen de massa van de renner.', 'Alleen de massa van de fiets.', 'De massa van de renner en de fiets samen.'],
    answer: 2,
    correct: tex`Juist. De vraag gaat over renner én fiets. In het boekmodel bewegen ze met dezelfde snelheid, dus gebruik je hun totale massa in \(E_{\mathrm{k}}=\frac{mv^2}{2}\). Daarom telt het voorbeeld eerst beide massa’s op. Kies bij een nieuwe opgave dus eerst het systeem en pas daarna de getallen.`,
    hint: 'Vergelijk op p. 73 het systeem in de vraag met de twee massa’s onder “Gegeven”. Welke voorwerpen horen bij de energie die gevraagd wordt?',
    feedbackByOption: [
      tex`Met alleen de massa van de renner bereken je ook alleen zijn kinetische energie. De fiets beweegt mee en hoort bij het gevraagde systeem. Vergelijk op p. 73 de vraag met de eerste regel onder “Gegeven”: welke massa omvat het hele systeem?`,
      tex`Met alleen de massa van de fiets laat je de bewegende renner buiten beschouwing. De vraag gaat niet alleen over de fiets. Zoek op p. 73 welke twee voorwerpen in het systeem zitten en hoe dat bij “Gegeven” in \(m\) verwerkt wordt.`,
      null,
    ],
    next: 'Pas de aanpak toe op het balletje',
  },
  {
    id: 'kinetisch-balletje', type: 'work', completion: 'button', section: 'Toepassen in je boek',
    title: 'Maak de berekening met het metalen balletje',
    source: 'Boek p. 77 · oefening 5 · alleen de eerste bullet',
    exercise: '5', page: 77, parts: ['kinetisch'],
    instructions: [
      'Bereken de kinetische energie van het metalen balletje. Schrijf je volledige uitwerking in je boek of schrift: gegeven en gevraagd, formule, invulling en antwoord met eenheid.',
      'Gebruik het fietsvoorbeeld als model voor je aanpak, niet als bron van getallen. Daar bestond het systeem uit twee voorwerpen; hier zoek je de energie van het balletje. Kies dus opnieuw welke gegevens bij jouw systeem horen.',
      'Controleer je uitwerking met het groene kader op p. 72: staat elk gegeven bij het passende symbool en heeft je eindantwoord de eenheid van energie?',
    ],
    support: [
      tex`De beweging bepaalt hier welke energievorm je zoekt. Kijk in het groene kader “Kinetische energie” op p. 72 welke rol \(m\) en \(v\) spelen. Welke waarden uit de opgave horen daarbij?`,
      tex`Werk met de formule \(E_{\mathrm{k}}=\frac{mv^2}{2}\) en de gegevens van het balletje. Bekijk op p. 73 hoe het voorbeeld van formule naar invulling en antwoord gaat. Neem niet de getallen van renner en fiets over.`,
    ],
    next: 'Berekening gemaakt, verder',
  },
  {
    id: 'kinetisch-transfer', type: 'quiz', final: true, section: 'Het verband gebruiken',
    title: 'En bij een ander balletje?',
    source: 'Boek p. 72 · groen kader “Kinetische energie” mag je gebruiken',
    question: 'Een tweede balletje heeft tweemaal zoveel massa als het eerste, maar beweegt even snel. Hoe verhouden hun kinetische energieën zich?',
    options: ['Het tweede balletje heeft half zoveel kinetische energie.', 'Beide balletjes hebben evenveel kinetische energie.', 'Het tweede balletje heeft tweemaal zoveel kinetische energie.'],
    answer: 2,
    correct: tex`Juist. Niet alleen snelheid, maar ook massa bepaalt de kinetische energie. Bij dezelfde \(v\) blijft de factor \(\frac{v^2}{2}\) gelijk. Tweemaal zoveel massa geeft dan tweemaal zoveel kinetische energie. Je kunt het verband dus verklaren zonder beide situaties volledig uit te rekenen.`,
    hint: tex`Gebruik de formule op p. 72. Alleen \(m\) verandert; \(v\) blijft gelijk. Vergelijk de formule met \(m\) met diezelfde formule met \(2m\).`,
    feedbackByOption: [
      tex`Je verwacht nu minder energie bij meer massa. Controleer de plaats van \(m\) in de formule op p. 72: vermenigvuldig je ermee of deel je erdoor? De snelheid blijft in deze vergelijking gelijk.`,
      tex`Dezelfde snelheid betekent niet automatisch dezelfde kinetische energie. Er staat ook \(m\) in de formule. Houd op p. 72 de snelheid gelijk en bekijk wat verandert als je alleen de massa verdubbelt.`,
      null,
    ],
    next: 'Bekijk de afronding van dit blok',
  },
]

// Eigen sleutel: bekijken/resetten van de proef verandert de 5–10-route niet.
export const STORAGE_KEY = `willebroek:energie-basis:proefblok:${lesson.id}`
