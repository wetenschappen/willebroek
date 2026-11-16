// Eigen bundel 6, geïllustreerde proefversie van zeven pagina's.
// Alleen compressie: bezoekles p. 1–2. Opwarming, slot en les 2 volgen later.
const tex = String.raw

export const lesson = {
  id: 'fys6-gassen-compressie-proefblok-v1',
  title: 'Wat gebeurt met de druk als je gas samendrukt?',
  subtitle: '6ELTE / 6IICT · bundel 6 · compressieproefblok',
  headerTitle: 'Een gas samendrukken',
  headerContext: '6ELTE / 6IICT · proefblok',
  finishedTitle: 'Je compressieproefblok is afgerond',
  homeDescription: 'Je voorspelt op papier, onderzoekt een afgesloten spuit met een zuigermodel en gebruikt het verband in een berekening. Je bundel en rekenmachine blijven je hoofdwerkplek. Je leerkracht opent samen met de klas het volgende onderwerp.',
  reference: 'Bundel 6, geïllustreerde versie · p. 1–2 · A0, A1, besluit, opdracht 1a–c en vervolg A+',
  duration: 'Dit is één proefblok, niet de volledige bezoekles of de volledige bundel. Opwarming en de ideale gaswet zitten er nog niet in.',
  homeFinished: 'Je hebt het compressieblok doorlopen. Laat je papierwerk nakijken. De andere delen van bundel 6 zijn hiermee niet gemaakt.',
  completion: {
    eyebrow: 'Einde van het compressieproefblok',
    title: 'Het verband werkt onder voorwaarden',
    intro: tex`Bij dezelfde hoeveelheid gas en constante temperatuur geldt \(p_1V_1=p_2V_2\). Je bepaalt eerst wat gelijk blijft, voorspelt de richting van de verandering en controleert daarmee je berekening.`,
    work: 'Je hebt A0, de modeltabel A1, het besluit op p. 1 en opdracht 1a–c op p. 2 als uitgewerkt bevestigd. Dit is zelfrapportage: je papierwerk is niet automatisch nagekeken. Het bekijken van de laatste stap bevestigt niet dat A+ is gemaakt.',
    checksLabel: 'Begrip',
    nextTitle: 'Wat doe je nu?',
    next: [
      'Ben je vroeg klaar? Werk verder aan A+ op p. 2: voorspel eerst hoe je de druk halveert vanuit 40 mL en 1,5 bar. Controleer pas daarna met het model of het product pV.',
      'Laat je uitwerking zien en bespreek een twijfel met je leerkracht. Het volgende gezamenlijke blok is opwarming bij vast volume; dat is nog niet gebouwd in dit proefblok.',
      'De vergelijking, de slotvraag van les 1 en de ideale gaswet van les 2 blijven deel van de bundel. Een afgerond proefblok betekent niet dat de hele leerstof is afgewerkt.',
    ],
  },
}

export const steps = [
  {
    id: 'compressie-voorspellen', type: 'work', completion: 'button', section: 'Eerst zelf voorspellen',
    title: 'Wat verwacht je als de ruimte halveert?',
    source: 'Bundel 6 · p. 1 · A0, boven de spuittekening', page: 1, exercise: 'A0', parts: ['voorspelling', 'verklaring'],
    instructions: [
      'Maak A0 op papier: dezelfde hoeveelheid gas zit afgesloten en de temperatuur blijft gelijk. Het gas krijgt de helft van de ruimte. Voorspel wat er met de druk gebeurt en schrijf kort waarom.',
      'Noteer eerst je eigen gedachte, vóór je het model of de uitleg bekijkt. Je voorspelling hoeft nog niet juist te zijn; straks vergelijk je haar met de modelwaarden.',
    ],
    next: 'Voorspelling genoteerd, onderzoeken',
  },
  {
    id: 'compressie-onderzoeken', type: 'work', completion: 'button', activity: 'gas-compression', initialVolume: 60,
    section: 'Eén grootheid veranderen', title: 'Verander alleen het volume',
    source: 'Bundel 6 · p. 1 · A1 en de modeltabel', page: 1, exercise: 'A1', parts: ['60 mL', '40 mL', '30 mL', 'pV'],
    instructions: [
      tex`De temperatuur blijft \(300\,\mathrm{K}\) en er ontsnapt geen gas. Begin bij \(60\,\mathrm{mL}\). Kies daarna \(40\,\mathrm{mL}\) en \(30\,\mathrm{mL}\). Noteer bij elke stand de absolute druk in je tabel op p. 1.`,
      tex`Bereken op papier telkens \(pV\). Vergelijk daarna \(60\) met \(30\,\mathrm{mL}\): wat gebeurde met de druk toen het volume halveerde?`,
    ],
    note: 'Ga verder zodra je drie drukwaarden en de drie producten op papier hebt. Een klik op de vervolgknop bevestigt alleen dat jij dit hebt uitgewerkt.',
    next: 'Tabel uitgewerkt, bekijk de begripsvraag',
  },
  {
    id: 'compressie-deeltjes', type: 'quiz', final: true, section: 'Verklaren wat gelijk blijft',
    title: 'Wat verandert er in de afgesloten spuit?',
    source: 'Bundel 6 · p. 1 · vergelijk de twee spuittekeningen',
    question: 'De spuit wordt samengedrukt bij gelijke temperatuur. Welke beschrijving past bij dit model?',
    options: [
      'Er verdwijnen deeltjes uit de spuit doordat de ruimte kleiner wordt.',
      'De gasdeeltjes worden kleiner, zodat ze in minder ruimte passen.',
      'De deeltjes bewegen gemiddeld langzamer doordat de temperatuur daalt.',
      'Dezelfde deeltjes krijgen minder ruimte; de temperatuur blijft gelijk.',
    ],
    answer: 3,
    correct: tex`Juist. De spuit is afgesloten: dezelfde hoeveelheid gas krijgt minder ruimte. De deeltjes krimpen niet en \(T\) blijft gelijk. Ze botsen vaker tegen eenzelfde wandoppervlakte per tijd; de druk stijgt. De animatie illustreert dit, maar de modeldruk wordt met de gaswet berekend.`,
    hint: 'Vergelijk p. 1: wat blijft gelijk aan de stippen en de temperatuur, en wat verandert aan de gasruimte?',
    feedbackByOption: [
      'Afgesloten betekent dat er geen gas ontsnapt. In de tekeningen op p. 1 blijven evenveel stippen aanwezig. Minder gasruimte betekent hier dus niet minder gas. Kijk opnieuw wat de zuiger wél verandert.',
      'De deeltjes krimpen niet. Op p. 1 zijn de stippen in beide toestanden even groot; alleen hun beschikbare ruimte wordt kleiner. Onderscheid de grootte van een deeltje van het volume dat het gas inneemt.',
      tex`In deze proef is de temperatuur bewust vastgezet op \(300\,\mathrm{K}\). Er is dus geen lagere temperatuur waarmee je tragere gemiddelde deeltjesbeweging kunt verklaren. Kijk op p. 1 welke grootheid je wél verandert.`,
      null,
    ],
    next: 'Verbind het onderzoek met de formule',
  },
  {
    id: 'compressie-besluit', type: 'work', completion: 'button', section: 'Van waarneming naar verband',
    title: 'Schrijf het besluit en bekijk het voorbeeld',
    source: 'Bundel 6 · besluit onderaan p. 1 · groen kader en uitgewerkt voorbeeld op p. 2',
    page: 1, exercise: 'besluit-A', parts: ['constanten', 'product', 'verklaring'],
    instructions: [
      'Schrijf onder “Besluit” op p. 1 wat tijdens het onderzoek gelijk bleef en welk product constant was. Vergelijk met je oorspronkelijke voorspelling.',
      tex`Bekijk vervolgens het kader en het uitgewerkte voorbeeld op p. 2. Omdat \(T_1=T_2\), vereenvoudigt de tweestandenvergelijking tot \(p_1V_1=p_2V_2\). Wijs aan hoe het voorbeeld de einddruk vrijmaakt. Je hoeft het voorbeeld niet opnieuw uit te rekenen.`,
    ],
    next: 'Besluit genoteerd, zelf toepassen',
  },
  {
    id: 'compressie-opdracht-1', type: 'work', completion: 'button', section: 'Zelf rekenen op papier',
    title: 'Maak opdracht 1a, 1b en 1c',
    source: 'Bundel 6 · p. 2 · “1. Een afgesloten spuit”',
    page: 2, exercise: '1', parts: ['a', 'b', 'c'],
    instructions: [
      'Maak alle drie deelvragen van opdracht 1 op papier. Benoem de constante grootheden, voorspel de richting van de drukverandering en werk de berekening volledig uit.',
      'Gebruik het voorbeeld op dezelfde pagina voor de aanpak, maar neem de gegevens uit jouw opdracht. Controleer of je einddruk past bij je voorspelling. Laat de uitwerking nakijken als je twijfelt.',
    ],
    strategy: [
      'Noteer gegeven en gevraagd, met hun eenheden.',
      tex`Gebruik \(p_1V_1=p_2V_2\) en maak \(p_2\) vrij vóór je invult.`,
      'Vul de eigen gegevens in, geef je antwoord met eenheid en controleer de richting van de verandering.',
    ],
    support: [
      tex`Als je \(p_2\) zoekt, deel je beide kanten van \(p_1V_1=p_2V_2\) door \(V_2\). Zo krijg je \(p_2=p_1V_1/V_2\).`,
      'In deze vergelijking mogen beide drukken in bar en beide volumes in mL blijven. Bij een kleiner volume verwacht je een grotere druk, zolang temperatuur en hoeveelheid gas gelijk blijven.',
    ],
    next: 'Opdracht 1a–c uitgewerkt, verder',
  },
  {
    id: 'compressie-vervolg', type: 'read', activity: 'gas-compression', initialVolume: 40,
    section: 'Verder onderzoeken binnen hetzelfde model', title: 'Vroeg klaar? Werk aan A+',
    source: 'Bundel 6 · p. 2 · A+ onderaan',
    instructions: [
      tex`Ben je vroeg klaar met de basis? Werk aan A+: begin bij \(40\,\mathrm{mL}\) en \(1{,}5\,\mathrm{bar}\). Hoe krijg je de helft van die druk bij dezelfde temperatuur en hoeveelheid gas?`,
      'Noteer eerst op papier je voorspelde volume en verklaring. Gebruik pas daarna dit model of het product pV om te controleren. Duid het nieuwe punt in de grafiek op p. 1 aan.',
    ],
    note: 'A+ is vervolgonderzoek, geen nieuwe verplichte basisopdracht. De vervolgknop bevestigt niet dat A+ is gemaakt. Tijdens de les werk je hieraan tot de gezamenlijke tussenstop van je leerkracht.',
    next: 'Bekijk de afronding van het proefblok',
  },
]

export const STORAGE_KEY = `willebroek:gassen:proefblok:${lesson.id}`
