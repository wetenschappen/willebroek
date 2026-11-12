// WACO Fysica 4 (1u), boekpagina's. De goedgekeurde proefaanpak voor 5–10.
// Kernonderwijs zichtbaar; extra formulehulp optioneel. Boekwerk blijft op papier.
import { steps as kineticBlock } from './kinetic-pilot.js'
const tex = String.raw
const bookWork = { type: 'work', completion: 'button' }

export const curriculum = {
  primaryGoal: 'BV2_06.45.01',
  supportingGoals: ['BV2_06.40', 'BV2_06.44.01', 'BV2_06.44.02'],
  documentPages: [48, 50, 51],
  scope: 'Energieformules kiezen en gebruiken, een onbekende vrijmaken, verbanden verklaren en energieomzettingen en behoud toepassen. Geen volledige kwantitatieve energiebalansenroute.',
  completedBefore: ['1', '2', '3'],
  deferred: ['4'],
  later: ['kwantitatieve energiebalansen', 'vermogen', 'rendement'],
}

export const lesson = {
  id: 'fys4-basis-t2-begeleid-v3',
  title: 'Energie: onderzoeken, rekenen en verklaren',
  subtitle: 'T2 · oefeningen 5–10 · 4LAT / 4ECWE',
  headerTitle: 'Energie · basis',
  headerContext: '4LAT / 4ECWE · oefeningen 5–10',
  finishedTitle: 'Je energieles is afgerond',
  homeDescription: 'Oefeningen 1–3 heb je al klassikaal gemaakt. Nu onderzoek je voorbeelden in je boek, krijg je korte begripsvragen met uitleg en maak je oefeningen 5–10 op papier. Leg je boek, schrift en rekenmachine klaar. Je boek blijft je bron; het scherm begeleidt je aanpak.',
  reference: 'Oefeningen 5–10 op p. 77–78 · voorbeelden p. 72–73 · energiebehoud p. 90',
  duration: 'Gepland voor een les van 50 minuten. Werk op je eigen tempo verder; is de les om, pauzeer en hervat later. Er verdwijnen geen opdrachten na 50 minuten.',
  homeFinished: 'Je hebt oefeningen 5–10 doorlopen: zeven berekeningen en vijf redeneeropdrachten. Leg je uitwerkingen klaar voor feedback.',
  completion: {
    eyebrow: 'Oefeningen 5–10 doorlopen',
    title: 'Je berekeningen en verklaringen liggen klaar',
    intro: 'Je onderzocht welke gegevens bij een energiemodel horen, gebruikte de drie energieformules en verklaarde verbanden, recuperatief remmen en de gladde hellingen.',
    work: 'Met “Gemaakt, verder” heb je bevestigd dat je de drie delen van 5, 6a–c met eenhedencontrole, 7, 8a–b, 9a–b en 10 met verklaring gemaakt hebt. Dat is geen automatische correctie van je boekwerk.',
    checksLabel: 'Begrip en toepassing',
    nextTitle: 'Leg je aanpak uit',
    next: [
      'Laat je schriftelijke uitwerkingen nakijken. Kies één berekening en leg uit waarom je formule en gegevens bij de situatie horen. Wijs ook een redenering aan waarover je nog twijfelt.',
      'Ben je voor het einde van de les klaar? Herbekijk die uitwerking met je boek en bespreek je vraag met je leerkracht. Kwantitatieve energiebalansen, vermogen en rendement volgen later; dit is niet het hele thema.',
    ],
  },
}

export const steps = [
  // De vier goedgekeurde proefschermen, met alleen een andere overgang aan het einde.
  ...kineticBlock.map((step, index) => index === kineticBlock.length - 1
    ? { ...step, next: 'Onderzoek energie door hoogte' } : { ...step }),
  {
    id: 'hoogte-onderzoek', type: 'read', section: 'Energie door hoogte',
    title: 'Welke hoogte hoort in de formule?',
    source: 'Boek p. 72 · groen kader “Potentiële gravitationele energie” en voorbeeld met Anaïs',
    instructions: [
      'Onderzoek het kader en het voorbeeld met Anaïs. Zoek welke drie grootheden de energie bepalen en welke waarde het voorbeeld voor de zwaarteveldsterkte gebruikt.',
      tex`De hoogte \(h\) wordt gemeten tegenover een gekozen referentieniveau. Neem de grond als nulniveau. Wijs bij een voorwerp boven de grond de verticale hoogte aan: dat is iets anders dan de weg die het heeft afgelegd.`,
      'Je onderzoekt dus niet hoe lang de klim of de verplaatsing duurde, maar de positie van het voorwerp tegenover het gekozen nulniveau. Gebruik dat onderscheid bij de volgende vraag.',
    ],
    next: 'Vergelijk twee manieren van omhooggaan',
  },
  {
    id: 'hoogte-check', type: 'quiz', final: true, section: 'Energie door hoogte',
    title: 'Verandert de energie als de route verandert?',
    source: 'Boek p. 72 · groen kader “Potentiële gravitationele energie”',
    question: 'Je brengt dezelfde tas met een lift of via een langere trap naar dezelfde verdieping. Je kiest in beide gevallen de grond als nulniveau. Hoe vergelijk je de gravitationele energie van de tas op die verdieping?',
    options: ['Via de trap is ze groter, want de afgelegde weg is langer.', 'Ze is gelijk: massa, zwaarteveldsterkte en verticale eindhoogte zijn gelijk.', 'Met de lift is ze nul, want de tas ligt stil op de liftvloer.'], answer: 1,
    correct: tex`Juist. In \(E_{\mathrm{pot,gr}}=mgh\) staan massa, zwaarteveldsterkte en verticale hoogte boven het nulniveau. De afgelegde weg staat er niet in. Stilstand maakt deze energie niet nul: het gaat om positie, niet om beweging.`,
    hint: 'Vergelijk op p. 72 de symbolen in de formule. Welke veranderen wanneer je alleen de route naar dezelfde verdieping wijzigt?',
    feedbackByOption: [
      tex`Je verwart de afgelegde weg met de hoogte \(h\). Kijk op p. 72 welke positiegegevens in de formule staan. De tas komt langs beide routes op dezelfde verticale hoogte boven de grond.`,
      null,
      'Stilstand betekent dat de tas geen kinetische energie heeft in dit model. Gravitationele energie hoort bij haar positie boven het gekozen nulniveau. Kijk op p. 72 of snelheid in die formule voorkomt.',
    ],
    next: 'Pas dit toe op de appel',
  },
  {
    ...bookWork, id: 'oefening-5-appel', section: 'Toepassen: hoogte',
    title: 'Oefening 5 · de appel in de boom',
    source: 'Boek p. 77 · oefening 5 · tweede bullet · voorbeeld op p. 72',
    exercise: '5', page: 77, parts: ['gravitationeel'],
    instructions: [
      'Bereken de gravitationele energie van de appel. Neem de grond als nulniveau. Schrijf gegeven en gevraagd, formule, invulling en antwoord met eenheid.',
      tex`Gebruik het voorbeeld met Anaïs op p. 72 als model: koppel de massa en verticale hoogte van de appel aan de formule en gebruik \(g=9{,}81\,\mathrm{N/kg}\). Stem de massa-eenheid af vóór je invult.`,
    ],
    support: [
      tex`De formule bij deze positie-energie is \(E_{\mathrm{pot,gr}}=mgh\). Gebruik de massa in \(\mathrm{kg}\) en de hoogte in \(\mathrm{m}\).`,
      tex`Controleer je eenheden zoals bij Anaïs: \(\mathrm{kg}\cdot\mathrm{N/kg}\cdot\mathrm{m}=\mathrm{N}\cdot\mathrm{m}=\mathrm{J}\).`,
    ],
    next: 'Berekening gemaakt, verder',
  },
  {
    id: 'veer-onderzoek', type: 'read', section: 'Energie door vervorming',
    title: 'Onderzoek wat de veer opslaat',
    source: 'Boek p. 73 · “Potentiële elastische energie”, groen kader en flipperkastvoorbeeld',
    instructions: [
      'Lees de uitleg en onderzoek het flipperkastvoorbeeld. De veer kan energie opslaan terwijl je haar vervormd vasthoudt. Zoek wat de veerconstante en de lengteverandering voorstellen.',
      tex`Vergelijk \(\Delta\ell\) in de formule met de eerste regel onder “Gegeven”. Het gaat om de verandering tegenover de onvervormde lengte, niet om de totale lengte van de veer. Bekijk ook in welke eenheden de gegevens worden ingevuld.`,
      'Vergelijk in gedachten twee veren die even ver worden uitgerekt: de ene is stijver dan de andere. Onderzoek in het groene kader of alleen de vervorming de opgeslagen energie bepaalt.',
    ],
    next: 'Vergelijk de twee veren',
  },
  {
    id: 'veer-check', type: 'quiz', final: true, section: 'Energie door vervorming',
    title: 'Zelfde vervorming, andere veer',
    source: 'Boek p. 73 · groen kader “Potentiële elastische energie”',
    question: 'Twee veren worden even ver uitgerekt en daarna stilgehouden. Veer B heeft een grotere veerconstante dan veer A. Welke uitspraak past bij het boekmodel?',
    options: ['Beide veren hebben geen elastische energie, want ze bewegen niet.', 'Beide veren slaan evenveel energie op, want hun lengteverandering is gelijk.', 'Veer B slaat meer elastische energie op, want ook de veerconstante telt mee.'], answer: 2,
    correct: tex`Juist. In \(E_{\mathrm{pot,el}}=\frac{k(\Delta\ell)^2}{2}\) bepalen zowel de veerconstante als de vervorming de energie. Bij dezelfde \(\Delta\ell\) geeft een grotere \(k\) meer energie. Die energie is door vervorming opgeslagen, ook zonder beweging.`,
    hint: tex`Bekijk op p. 73 welke symbolen behalve \(\Delta\ell\) in de formule staan. Welke grootheid verschilt bij de twee veren?`,
    feedbackByOption: [
      'Je gebruikt het kenmerk van kinetische energie voor een andere energievorm. Lees de eerste zin onder “Potentiële elastische energie” op p. 73: de vervorming kan energie opslaan terwijl je de veer stilhoudt.',
      tex`Gelijke vervorming is maar één gegeven. In het groene kader op p. 73 staat ook \(k\). Vergelijk beide veren met dezelfde \(\Delta\ell\), maar met verschillende veerconstanten.`,
      null,
    ],
    next: 'Bereken de energie van de veer',
  },
  {
    ...bookWork, id: 'oefening-5-veer', section: 'Toepassen: vervorming',
    title: 'Oefening 5 · de uitgerekte veer',
    source: 'Boek p. 77 · oefening 5 · derde bullet · voorbeeld op p. 73',
    exercise: '5', page: 77, parts: ['elastisch'],
    instructions: [
      'Maak de berekening met de uitgerekte veer. Schrijf de formule, invulling en het antwoord met eenheid. Gebruik het flipperkastvoorbeeld als model, maar neem de gegevens uit jouw opgave.',
      tex`Koppel de gegeven uitrekking aan \(\Delta\ell\) en de veerconstante aan \(k\). Controleer of beide eenheden bij het groene kader passen. Daarmee heb je ook het derde deel van oefening 5 gemaakt.`,
    ],
    support: [tex`Gebruik \(E_{\mathrm{pot,el}}=\frac{k(\Delta\ell)^2}{2}\). Bekijk bij het voorbeeld op p. 73 hoe de eenheden \(\mathrm{N/m}\) en \(\mathrm{m}\) samen een energie opleveren.`],
    next: 'Berekening gemaakt, verder',
  },
  {
    id: 'onbekende-onderzoek', type: 'read', section: 'Hetzelfde model, een andere vraag',
    title: 'Onderzoek de aanpak, niet alleen de invulling',
    source: 'Boek p. 73 · fietsvoorbeeld · daarna de vragen bij 6a–c op p. 77',
    instructions: [
      'Bekijk in het fietsvoorbeeld hoe “Gegeven”, “Gevraagd” en de gekozen formule met elkaar samenhangen. Onderzoek ook de eenhedencontrole rechts van de berekening.',
      'Lees vervolgens de vragen van 6a, 6b en 6c. In elke situatie gaat het om beweging, maar niet telkens om dezelfde onbekende. Bepaal wat per deelvraag bekend en gevraagd is.',
      'De fysische situatie bepaalt het energiemodel. De gevraagde grootheid bepaalt hoe je die formule omvormt. Eenheden helpen controleren of je uitkomst werkelijk energie, massa of snelheid voorstelt.',
    ],
    next: 'Kies een model voor een andere onbekende',
  },
  {
    id: 'onbekende-check', type: 'quiz', final: true, section: 'Hetzelfde model, een andere vraag',
    title: 'Van energie naar snelheid',
    source: 'Boek p. 72 · groen kader “Kinetische energie” · vragen bij 6 op p. 77',
    question: 'Van een bewegend voorwerp ken je de kinetische energie en de massa. Je zoekt de grootte van de snelheid. Welke aanpak past?',
    options: [
      tex`Ik gebruik \(E_{\mathrm{pot,gr}}=mgh\), want de massa is bekend.`,
      tex`Ik gebruik \(E_{\mathrm{k}}=\frac{mv^2}{2}\) en maak \(v\) vrij.`,
      'Ik moet een andere energieformule zoeken, want de kinetische formule mag alleen gebruikt worden om energie te berekenen.',
    ], answer: 1,
    correct: tex`Juist. Het blijft het model voor bewegingsenergie. Dezelfde relatie verbindt \(E_{\mathrm{k}}\), \(m\) en \(v\), ongeacht welke daarvan gevraagd is. Maak de onbekende eerst vrij en toets je uitkomst aan de gevraagde eenheid. Dat is de aanpak voor 6a–c.`,
    hint: 'Kies op p. 72 de formule op basis van de energievorm in de situatie, niet op basis van één los gegeven of de plaats van de onbekende.',
    feedbackByOption: [
      'Massa komt in meer dan één energiemodel voor. Hier is de gegeven energie gekoppeld aan beweging, niet aan een hoogte. Vergelijk op p. 72 de namen en symbolen van de twee groene kaders.',
      null,
      'Een formule beschrijft een verband tussen grootheden, geen eenrichtingsrecept. Bekijk op p. 72 welke drie grootheden de kinetische formule verbindt. Ook wanneer snelheid gevraagd is, blijft die relatie geldig.',
    ],
    next: 'Maak oefening 6a',
  },
  {
    ...bookWork, id: 'oefening-6a', section: 'Toepassen: energie zoeken',
    title: 'Oefening 6a · energie berekenen',
    source: 'Boek p. 77 · oefening 6a · eenhedencontrole in het fietsvoorbeeld op p. 73',
    exercise: '6', page: 77, parts: ['a'],
    instructions: [
      'Bereken de kinetische energie in 6a. Noteer gegeven en gevraagd en werk uit met de formule die bij beweging hoort.',
      'Toon ook aan dat de eenheid past bij de gevraagde grootheid, zoals de opdracht boven oefening 6 vraagt. Vervang in je formule de grootheden door hun SI-eenheden en vergelijk met het fietsvoorbeeld op p. 73.',
    ],
    support: [
      tex`Vertrek van \(E_{\mathrm{k}}=\frac{mv^2}{2}\). De factor 2 heeft geen eenheid.`,
      tex`Voor de eenheden: \(\mathrm{kg}\cdot(\mathrm{m/s})^2=\mathrm{kg}\cdot\mathrm{m}^2/\mathrm{s}^2=\mathrm{J}\).`,
    ],
    next: 'Oefening 6a gemaakt, verder',
  },
  {
    ...bookWork, id: 'oefening-6b', section: 'Toepassen: massa zoeken',
    title: 'Oefening 6b · massa zoeken',
    source: 'Boek p. 77 · oefening 6b · groen kader “Kinetische energie”, p. 72',
    exercise: '6', page: 77, parts: ['b'],
    instructions: [
      tex`Bereken de massa in 6b. Het energiemodel blijft hetzelfde als in 6a. Maak eerst \(m\) vrij zonder getallen, en vul daarna de gegevens in. Laat je omvorming in je uitwerking zien.`,
      'Controleer ook de eenheid van je resultaat. Je formule moet nu een massa opleveren, niet de energie-eenheid uit de vorige deelvraag.',
    ],
    support: [
      tex`Begin bij \(E_{\mathrm{k}}=\frac{mv^2}{2}\). Vermenigvuldig beide leden met 2: \(2E_{\mathrm{k}}=mv^2\). Deel daarna door \(v^2\): \(m=\frac{2E_{\mathrm{k}}}{v^2}\).`,
      tex`Eenhedencontrole: \(\frac{\mathrm{J}}{(\mathrm{m/s})^2}=\mathrm{kg}\). Gebruik zo nodig de joule-uitdrukking uit het fietsvoorbeeld op p. 73.`,
    ],
    next: 'Oefening 6b gemaakt, verder',
  },
  {
    ...bookWork, id: 'oefening-6c', section: 'Toepassen: snelheid zoeken',
    title: 'Oefening 6c · snelheid zoeken',
    source: 'Boek p. 77 · oefening 6c · groen kader “Kinetische energie”, p. 72',
    exercise: '6', page: 77, parts: ['c'],
    instructions: [
      'Bereken de snelheid in 6c. Kies zelf de juiste relatie en maak de gevraagde grootheid vrij vóór je invult. Schrijf je omvorming en berekening op.',
      'Toon met de eenheden aan dat je een snelheid krijgt. De opgave vraagt de grootte van die snelheid; kies de bijbehorende positieve waarde.',
    ],
    support: [
      tex`Uit \(E_{\mathrm{k}}=\frac{mv^2}{2}\) volgt \(v^2=\frac{2E_{\mathrm{k}}}{m}\), dus \(v=\sqrt{\frac{2E_{\mathrm{k}}}{m}}\).`,
      tex`Voor de eenheden geldt \(\mathrm{J/kg}=\mathrm{m}^2/\mathrm{s}^2\). Na de wortel krijg je \(\mathrm{m/s}\).`,
    ],
    next: 'Oefening 6c gemaakt, verder',
  },
  {
    ...bookWork, id: 'oefening-7', section: 'De aanpak overdragen',
    title: 'Oefening 7 · terug naar de veer',
    source: 'Boek p. 78 · oefening 7 en tekening · groen kader op p. 73',
    exercise: '7', page: 78, parts: ['lengteverandering'],
    instructions: [
      'Bereken de maximale lengteverandering van het veersysteem in de Jumping Stilts. Haal de gegevens uit zowel de tekst als de tekening. Schrijf gegeven en gevraagd, je omvorming en de berekening met eenheid op.',
      tex`Kies opnieuw de formule op basis van de situatie: je onderzoekt vervorming, niet de snelheid van de springer. De gevraagde \(\Delta\ell\) is een lengteverandering, niet de totale veerlengte. Vergelijk je aanpak met 6c: opnieuw is de onbekende gekwadrateerd, maar het fysische model is anders.`,
    ],
    support: [
      tex`Zoek in het kader op p. 73 de relatie tussen \(E_{\mathrm{pot,el}}\), \(k\) en \(\Delta\ell\). De waarde van \(k\) staat bij de tekening.`,
      tex`Isoleer de lengteverandering: \((\Delta\ell)^2=\frac{2E_{\mathrm{pot,el}}}{k}\), dus \(\Delta\ell=\sqrt{\frac{2E_{\mathrm{pot,el}}}{k}}\). Met \(\mathrm{J}\) en \(\mathrm{N/m}\) krijg je \(\mathrm{m}\).`,
    ],
    next: 'Oefening 7 gemaakt, verder',
  },
  {
    id: 'verbanden-onderzoek', type: 'read', section: 'Verbanden verklaren',
    title: 'Vergelijk wat verandert en wat gelijk blijft',
    source: 'Boek p. 72 · groene kaders voor kinetische en gravitationele energie',
    instructions: [
      'Vergelijk de twee formules op p. 72. Onderzoek hoe snelheid bij de bewegingsenergie en hoogte bij de gravitationele energie voorkomen. Welke staat in het kwadraat en welke niet?',
      'Bij het tweede balletje hield je de snelheid gelijk en veranderde alleen de massa. Onderzoek nu wat er gebeurt als alleen de snelheid verandert. Houd massa en energievorm gelijk, zodat je niet twee veranderingen door elkaar haalt.',
      'Je hoeft daarvoor niet telkens een volledige nieuwe berekening te maken. Vergelijk dezelfde formule voor de oude en de nieuwe situatie. Probeer dat bij de volgende vraag.',
    ],
    next: 'Gebruik het snelheidsverband',
  },
  {
    id: 'verbanden-check', type: 'quiz', final: true, section: 'Verbanden verklaren',
    title: 'Halve snelheid: ook halve energie?',
    source: 'Boek p. 72 · groen kader “Kinetische energie” mag je gebruiken',
    question: 'Een karretje rijdt met de helft van zijn eerdere snelheid. Zijn massa blijft gelijk. Welk deel van de eerdere kinetische energie heeft het dan?',
    options: ['De helft, want de snelheid is gehalveerd.', 'Een kwart, want de snelheid komt gekwadrateerd in de formule voor.', 'Evenveel, want de massa is niet veranderd.'], answer: 1,
    correct: tex`Juist. Bij dezelfde massa is de kinetische energie evenredig met \(v^2\). Vervang je \(v\) door \(\frac{v}{2}\), dan wordt die factor \(\frac14v^2\). De energie is dus een kwart. Onderzoek bij oefening 8 ook telkens hoe de veranderde grootheid in haar eigen formule voorkomt.`,
    hint: tex`Vergelijk op p. 72 de formule met \(v\) met dezelfde formule met \(\frac{v}{2}\). Welke factor verandert, en welke blijft gelijk?`,
    feedbackByOption: [
      tex`Je behandelt het snelheidsverband als een recht evenredig verband. In het kader op p. 72 staat echter \(v^2\), niet \(v\). Vervang alleen de snelheid door \(\frac{v}{2}\) en vergelijk dan de energieën.`,
      null,
      tex`Gelijke massa betekent niet dat alle energie gelijk blijft. Op p. 72 staat behalve \(m\) ook \(v^2\) in de formule. Hier verandert juist de snelheid.`,
    ],
    next: 'Verklaar de twee uitspraken van oefening 8',
  },
  {
    ...bookWork, id: 'oefening-8', section: 'Toepassen: verbanden',
    title: 'Oefening 8 · twee uitspraken onderzoeken',
    source: 'Boek p. 78 · oefening 8a en 8b · groene kaders p. 72',
    exercise: '8', page: 78, parts: ['a', 'b'],
    instructions: [
      'Beoordeel beide uitspraken van oefening 8. Noteer telkens “juist” of “fout” én een verklaring met de passende formule. Alleen het antwoord aanduiden is niet genoeg.',
      'Bepaal bij elke uitspraak wat verandert en wat gelijk blijft. Gebruik bij 8a het snelheidsverband; onderzoek bij 8b afzonderlijk hoe de hoogte in de andere energieformule voorkomt. Neem dus niet zomaar dezelfde factor over.',
    ],
    support: [
      tex`Bij 8a kun je \(2v\) invullen en vergelijken met de formule met \(v\). Bij 8b vergelijk je de formule met \(2h\) met die met \(h\). Houd in beide gevallen de overige grootheden gelijk.`,
      'Een zelfgekozen getallenvoorbeeld mag helpen bij je onderzoek. Leg in je verklaring ook uit waarom het verband uit de formule volgt.',
    ],
    next: 'Oefening 8 gemaakt, verder',
  },
  {
    id: 'remmen-onderzoek', type: 'read', section: 'Energie terugwinnen',
    title: 'Volg de energie tijdens het remmen',
    source: 'Boek p. 78 · tekst en tekening bij oefening 9 · naslag: eerste alinea p. 70',
    instructions: [
      'Lees de tekst bij oefening 9 en bekijk de tekening, inclusief het onderschrift over de accu. Zoek waar de energie vandaan komt en waar ze na het remmen beschikbaar wordt gehouden.',
      'Maak onderscheid tussen energie elektrisch overdragen en energie in de accu opslaan. Lees zo nodig alleen de eerste alinea over chemische energie op p. 70: bij stofomzettingen kan energie in die vorm opgeslagen of vrijgemaakt worden.',
      'Vergelijk met remmen waarbij vooral de remmen opwarmen. De vraag is niet alleen welke energie wordt omgezet, maar ook waarvoor ze later nog bruikbaar is.',
    ],
    next: 'Maak onderscheid tussen overdracht en opslag',
  },
  {
    id: 'remmen-check', type: 'quiz', final: true, section: 'Energie terugwinnen',
    title: 'Waar blijft de teruggewonnen energie?',
    source: 'Boek p. 78 · onderschrift bij de auto · chemische energie p. 70',
    question: 'Bij recuperatief remmen wordt een deel van de bewegingsenergie via een generator elektrisch naar de accu overgedragen. Welke beschrijving van de opslag past daarbij?',
    options: ['De accu bewaart de beweging van de auto als kinetische energie.', 'Elektrische overdracht en chemische opslag zijn hetzelfde; er gebeurt geen verdere omzetting.', 'Bij het opladen neemt de chemisch opgeslagen energie van de accu toe; die kan later opnieuw gebruikt worden.'], answer: 2,
    correct: 'Juist. De auto verliest kinetische energie. Een deel wordt elektrisch overgedragen en bij het opladen chemisch opgeslagen in de accu. Later kan die energie opnieuw de aandrijving ondersteunen. Niet alle bewegingsenergie wordt teruggewonnen; onder meer opwarming blijft mogelijk.',
    hint: 'Verbind het onderschrift over opladen op p. 78 met de eerste alinea over chemische energie op p. 70. Onderscheid hoe energie wordt overgedragen van hoe ze wordt opgeslagen.',
    feedbackByOption: [
      'De energie blijft beschikbaar terwijl de auto en accu stilstaan. De opslag kan dus niet simpelweg de oorspronkelijke beweging zijn. Bekijk het opladen op p. 78 en de beschrijving van chemische energie op p. 70.',
      'Elektrisch energie overdragen beschrijft de weg naar de accu, niet de opslagtoestand erna. Verbind het opladen op p. 78 met de energieomzettingen bij chemische energie op p. 70.',
      null,
    ],
    next: 'Werk de omzetting en het nut uit',
  },
  {
    ...bookWork, id: 'oefening-9', section: 'Toepassen: recuperatief remmen',
    title: 'Oefening 9 · de omzetting én het nut',
    source: 'Boek p. 78 · oefening 9a en 9b · tekst en tekening van de hybride auto',
    exercise: '9', page: 78, parts: ['a', 'b'],
    instructions: [
      'Beantwoord 9a en 9b. Schrijf voor 9a een omzettingsketen met pijlen. Maak daarin duidelijk wat de rijdende auto aan energie bezit, hoe energie naar de accu gaat en hoe ze wordt opgeslagen.',
      'Leg voor 9b uit wat het nut daarvan is bij later gebruik van de auto. Vergelijk met energie die bij het remmen vooral als warmte over de omgeving verspreid raakt. Alleen “er wordt energie teruggewonnen” herhaalt de vraag; verklaar waarvoor dat helpt.',
    ],
    support: ['Gebruik de tekening op p. 78 als controle: komt de accu in je keten voor? Maak bij je verklaring onderscheid tussen het teruggewonnen deel en de totale oorspronkelijke bewegingsenergie.'],
    next: 'Oefening 9 gemaakt, verder',
  },
  {
    id: 'behoud-onderzoek', type: 'read', section: 'Energiebehoud gebruiken',
    title: 'Onderzoek de vallende bal',
    source: 'Boek p. 90 · §3.1 “Behoud van energie”, eerste alinea en uitleg bij posities 1–3',
    instructions: [
      'Lees de eerste alinea over energiebehoud en bekijk de vallende bal op p. 90. Volg de uitleg bij posities 1, 2 en 3. Het voedingsvoorbeeld onderaan hoef je voor deze opdracht niet te lezen.',
      'Vergelijk de energie door hoogte met de energie door beweging. Neem voor je eerste redenering verwaarloosbare luchtweerstand aan en de grond als nulniveau. Welke energievorm neemt af en welke neemt toe?',
      'Zoek ook waarom “de totale energie blijft gelijk” niet betekent dat elke afzonderlijke energievorm gelijk blijft. Dat onderscheid heb je bij de hellingen nodig.',
    ],
    next: 'Verklaar de energie onderweg',
  },
  {
    id: 'behoud-check', type: 'quiz', final: true, section: 'Energiebehoud gebruiken',
    title: 'Waar is de energie tijdens het vallen?',
    source: 'Boek p. 90 · vallende bal, posities 1 en 2',
    question: 'Een bal valt vanuit rust. We verwaarlozen luchtweerstand. Halverwege is zijn gravitationele energie kleiner dan bovenaan. Welke verklaring past?',
    options: ['De afname is omgezet in kinetische energie; de bal heeft onderweg beide energievormen.', 'Die energie is verdwenen omdat de bal lager hangt.', 'Energiebehoud betekent dat de gravitationele energie niet mag afnemen.'], answer: 0,
    correct: 'Juist. Tijdens het vallen daalt de energie door hoogte en stijgt de bewegingsenergie. In dit model blijft hun som gelijk. Onderaan is de afname van gravitationele energie omgezet in kinetische energie. Je kunt die gedachte ook op een gladde helling toepassen.',
    hint: 'Vergelijk op p. 90 posities 1 en 2. Energiebehoud gaat over de totale energie, niet over één vorm afzonderlijk.',
    feedbackByOption: [
      null,
      'Je ziet terecht minder hoogte-energie, maar volgt de andere energievorm nog niet. Zoek bij positie 2 op p. 90 welke energie de bewegende bal intussen heeft gekregen.',
      'Behoud van totale energie laat juist omzetting tussen vormen toe. Vergelijk de hoogte en beweging bij posities 1 en 2 op p. 90: welke bijdragen veranderen terwijl hun som gelijk blijft?',
    ],
    next: 'Pas energiebehoud toe op de hellingen',
  },
  {
    ...bookWork, id: 'oefening-10', section: 'Toepassen: gladde hellingen',
    title: 'Oefening 10 · dezelfde lengte, dezelfde energie?',
    source: 'Boek p. 78 · oefening 10 · energiebehoud op p. 90',
    exercise: '10', page: 78, parts: ['keuze', 'verklaring'],
    instructions: [
      'Kies het juiste antwoord in oefening 10 en schrijf een verklaring met energiebehoud. Neem aan dat hetzelfde blok telkens vanuit rust vertrekt en dat wrijving bij de heel gladde hellingen verwaarloosbaar is.',
      'De lengte van de helling is telkens gelijk. Vergelijk nu het verticale hoogteverschil bij de drie tekeningen, niet de afgelegde weg. Kies de grond als nulniveau en koppel de energie bovenaan aan de kinetische energie beneden.',
      'Gebruik je onderzoek van de tas en de vallende bal om je keuze te onderbouwen. Je hoeft geen hellingshoek of kracht te berekenen.',
    ],
    support: [
      tex`Bovenaan gebruik je \(E_{\mathrm{pot,gr}}=mgh\). Teken bij elke helling een verticale lijn voor \(h\). Even lange hellingen hebben niet noodzakelijk hetzelfde hoogteverschil.`,
      tex`Bij beginrust en verwaarloosbare wrijving geldt \(E_{\mathrm{k,beneden}}=mgh\). Massa en zwaarteveldsterkte blijven gelijk. Welke hoogte moet je dus vergelijken?`,
    ],
    next: 'Oefening 10 gemaakt, verder',
  },
  {
    id: 'check-energiebehoud', type: 'quiz', final: true, section: 'Afsluiten',
    title: 'En als er wél wrijving is?',
    source: 'Boek p. 90 · alinea over thermische energie onder de uitleg bij de vallende bal',
    question: 'Een blok glijdt vanuit rust naar beneden, maar nu warmen het blok en de helling door wrijving op. Welke redenering klopt?',
    options: [
      'Alle aanvankelijke gravitationele energie wordt kinetische energie, ongeacht de wrijving.',
      'Een deel van de energie verdwijnt; de totale energie blijft dus niet behouden.',
      'Een deel wordt thermische energie. Neem ook die energie mee in de energiebalans.',
    ], answer: 2,
    correct: 'Juist. Met wrijving wordt niet alle afname van gravitationele energie omgezet in kinetische energie. Neem het blok en de helling samen mee: ook de toegenomen thermische energie telt. Energie verdwijnt niet, maar is verdeeld over meer vormen.',
    hint: 'Lees op p. 90 de alinea over thermische energie door wrijving en luchtweerstand. Vergelijk de totale energie van de betrokken voorwerpen, niet alleen de bewegingsenergie.',
    feedbackByOption: [
      'Bij de gladde hellingen mocht je wrijving verwaarlozen. Nu vermeldt de vraag juist opwarming: daarmee gaat ook een deel naar thermische energie. Zoek die bijdrage in de alinea op p. 90.',
      'Energie die niet meer als bewegingsenergie beschikbaar is, is niet verdwenen. Het blok en de helling warmen op. Lees op p. 90 hoe die thermische energie in het totaal wordt meegenomen.',
      null,
    ],
    next: 'Bekijk mijn afronding',
  },
]
