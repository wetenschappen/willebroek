export const MISSIONS = [
  {
    id: 'mono-p', label: 'Van P naar F₁', model: 'mono', parents: ['GG', 'gg'], core: true,
    task: 'Kruis een raszuivere gele plant met een raszuivere groene plant. Is het groene allel verdwenen in F₁?',
    target: 'Geel', genotypeTarget: 'Gg',
    hint: 'Elke nakomeling krijgt hier een G van de ene en een g van de andere ouder. Wisselen van de rollen verandert die combinatie niet.',
    question: 'Wat gebeurt er als je de twee ouders omwisselt (reciproque kruising)?',
    options: ['F₁ wordt groen.', 'F₁ blijft volledig Gg en geel.', 'Het recessieve allel verdwijnt.'], correct: 1,
    explanation: 'Uniformiteitswet: deze twee homozygote ouders leveren uitsluitend heterozygote nakomelingen. G overheerst, maar g blijft aanwezig. Voor deze autosomale kruising verandert omwisselen van de ouders niets.'
  },
  {
    id: 'mono-f2', label: 'F₁ × F₁ → F₂', model: 'mono', parents: ['Gg', 'Gg'], core: true,
    task: 'Twee gele F₁-planten worden gekruist. Verklaar hoe groen opnieuw kan verschijnen.',
    target: 'Groen', genotypeTarget: 'Gg',
    hint: 'De vakken zijn kansen, geen voorraad die na elke geboorte wordt opgebruikt. Een nieuwe bevruchting is onafhankelijk van de vorige.',
    question: 'Er zijn al drie gele nakomelingen. Wat is de kans dat de volgende groen is?',
    options: ['100%, want de verhouding moet 3 : 1 zijn.', '0%, want de ouders zijn geel.', '25%, onafhankelijk van de vorige nakomelingen.'], correct: 2,
    explanation: 'Genotypes GG : Gg : gg = 1 : 2 : 1, fenotypes geel : groen = 3 : 1. Elke bevruchting is een nieuwe kans: vier nakomelingen hoeven niet exact drie gele en één groene te zijn.'
  },
  {
    id: 'testcross', label: 'Testkruising', model: 'mono', parents: ['Gg', 'gg'],
    task: 'Een gele plant wordt gekruist met een groene plant. Hoe herken je een heterozygote gele ouder?',
    target: 'Groen', genotypeTarget: 'GG',
    hint: 'Werk terug vanuit een groen kind gg: van welke ouder moet elk van de twee g-allelen komen?',
    question: 'Welke conclusie mag je trekken als er minstens één groene nakomeling is?',
    options: ['De gele ouder is Gg.', 'De gele ouder is GG.', 'De groene ouder is Gg.'], correct: 0,
    explanation: 'Een groene nakomeling gg krijgt van beide ouders een g. De gele ouder moet dus Gg zijn. Alleen gele nakomelingen in een kleine steekproef bewijzen daarentegen niet dat de ouder GG is.'
  },
  {
    id: 'intermediate', label: 'Intermediaire overerving', model: 'intermediate', parents: ['RW', 'RW'],
    task: 'Kruis twee roze bloemen. Let op het verschil tussen een mengvorm in het fenotype en het doorgeven van allelen.',
    target: 'Roze', genotypeTarget: 'WW',
    question: 'Kun je in dit model een homozygote roze bloem kweken?',
    options: ['Ja: RR.', 'Nee, roze is altijd heterozygoot RW.', 'Ja: WW.'], correct: 1,
    explanation: 'RR is rood, RW is roze en WW is wit. De fenotypische verhouding is nu 1 : 2 : 1, net als de genotypische verhouding. De gameten bevatten R óf W, nooit een gemengd allel.'
  },
  {
    id: 'codominance', label: 'Codominantie', model: 'codominant', parents: ['RW', 'RW'],
    task: 'De genotypes zijn dezelfde als bij roze bloemen. Verandert het kruisingsvierkant of alleen het fenotype?',
    target: 'Rood én wit', genotypeTarget: 'RW',
    question: 'Wat onderscheidt RW hier van RW bij intermediaire overerving?',
    options: ['Hier komen rood en wit naast elkaar tot uiting, niet als roze mengvorm.', 'Hier bevat een gameet twee allelen.', 'Hier is W recessief.'], correct: 0,
    explanation: 'Het doorgeven van allelen blijft hetzelfde. Alleen hun uiting verschilt: codominantie = beide naast elkaar; intermediair = een tussenvorm. Beide F₂-kruisingen geven fenotypisch 1 : 2 : 1.'
  },
  {
    id: 'abo', label: 'Bloedgroepen', model: 'abo', parents: ['Ao', 'Bo'],
    task: 'Een ouder met bloedgroep A en een ouder met bloedgroep B zijn beiden heterozygoot. Welke bloedgroepen kunnen hun kinderen hebben?',
    target: 'Bloedgroep O', genotypeTarget: 'AB',
    question: 'Waarom bezit een persoon niet alle drie de ABO-allelen?',
    options: ['Het allel o verdwijnt bij volwassenen.', 'A en B kunnen niet samen voorkomen.', 'Er zijn drie allelen in de populatie, maar een diploïd individu bezit er twee.'], correct: 2,
    explanation: 'Ao × Bo geeft AB, Ao, Bo en oo: elk 25%. A en B zijn codominant; beide zijn dominant over o. Bloedgroep O schrijven we met hoofdletter O, het recessieve allel als kleine letter o.'
  },
  {
    id: 'di-p', label: 'Twee genen: P → F₁', model: 'di', parents: ['GGRR', 'ggrr'],
    task: 'Kruis raszuiver geel-rond met raszuiver groen-hoekig. Een gameet heeft nu twee letters. Waarom?',
    target: 'Geel · rond', genotypeTarget: 'GgRr',
    hint: 'Tel het aantal onderzochte genen, niet alleen het aantal letters. Een haploïde gameet bezit één allel voor kleur en één voor vorm.',
    question: 'Waarom is GR een geldige haploïde gameet?',
    options: ['Omdat GR twee allelen van hetzelfde gen heeft.', 'Omdat GR één allel van elk van twee verschillende genen heeft.', 'Omdat alle gameten diploïd zijn.'], correct: 1,
    explanation: 'Haploïd betekent één allel per gen, niet één letter in totaal. GGRR vormt alleen GR; ggrr alleen gr. F₁ is uniform GgRr en geel-rond.'
  },
  {
    id: 'di-f2', label: 'Het 4 × 4-vierkant', model: 'di', parents: ['GgRr', 'GgRr'], core: true,
    task: 'Vorm alle gameten en bouw F₂ op. De kleur en vorm erven in dit model onafhankelijk over.',
    target: 'Groen · hoekig', genotypeTarget: 'GgRr',
    hint: 'Controleer drie voorwaarden: de oudergenotypes, onafhankelijke overerving en volledige dominantie bij elk gen.',
    question: 'Wanneer verwacht je de fenotypische verhouding 9 : 3 : 3 : 1?',
    options: ['Bij elke kruising met twee kenmerken.', 'Alleen als er precies zestien nakomelingen zijn.', 'Bij GgRr × GgRr, onafhankelijke overerving en volledige dominantie bij beide genen.'], correct: 2,
    explanation: 'GR, Gr, gR en gr komen elk met kans 1/4 voor. De 16 even waarschijnlijke vakken geven geel-rond : geel-hoekig : groen-rond : groen-hoekig = 9 : 3 : 3 : 1. Groen-hoekig: 1/4 × 1/4 = 1/16.'
  },
  {
    id: 'di-test', label: 'Dihybride testkruising', model: 'di', parents: ['GgRr', 'ggrr'],
    task: 'Controleer of 9 : 3 : 3 : 1 ook geldt wanneer één ouder dubbel recessief is.',
    target: 'Groen · hoekig', genotypeTarget: 'GgRr',
    hint: 'De ene ouder maakt vier even waarschijnlijke gametentypes; de dubbel recessieve ouder maakt alleen gr. Hoeveel fenotypes ontstaan dan?',
    question: 'Welke fenotypische verhouding verwacht je hier?',
    options: ['1 : 1 : 1 : 1', '9 : 3 : 3 : 1', '3 : 1'], correct: 0,
    explanation: 'De dubbel recessieve ouder geeft uitsluitend gr. De vier gametentypes van GgRr leveren vier fenotypes op, elk met kans 1/4. Leer daarom de werkwijze, niet alleen de verhouding uit het hoofd.'
  },
  {
    id: 'lethal', label: 'Lethaal: welke noemer?', model: 'lethal', parents: ['GW', 'GW'],
    task: 'Kruis twee gele klimopplanten. Witte planten hebben geen bladgroen en overleven niet.',
    target: 'Wit · niet levensvatbaar', genotypeTarget: 'GW',
    hint: 'Streep WW weg voor je de overlevenden telt. Van de drie overblijvende delen zijn er twee GW en één GG.',
    question: 'Welk deel van de OVERLEVENDE planten is geel?',
    options: ['1/2', '2/3', '3/4'], correct: 1,
    explanation: 'Van alle zygoten is 1/4 GG, 1/2 GW en 1/4 WW. Na het afsterven van WW blijven drie delen over: één groen en twee geel. Dus 25% sterfte, maar 2/3 geel onder de overlevenden.'
  }
]

export const CHECKS = [
  {
    id: 'pedigree', title: 'Stamboom: werk terug vanuit een kind', pedigree: true,
    question: 'In dit autosomaal recessieve model hebben twee ouders zonder aandoening een kind met de aandoening. Wat staat vast?',
    options: ['Beide ouders zijn AA.', 'Beide ouders zijn Aa.', 'Eén ouder is aa en de andere AA.'], correct: 1,
    explanation: 'Het kind is aa en kreeg van elke ouder een a. De ouders hebben zelf geen aandoening, dus allebei Aa. Een broer of zus zonder aandoening kan AA of Aa zijn: noteer A· zolang het tweede allel onzeker is.'
  },
  {
    id: 'dominant', title: 'Dominant is niet hetzelfde als veelvoorkomend',
    question: 'Wat betekent dominant in een volledig dominant-recessief model?',
    options: ['Dat het allel het meest voorkomt.', 'Dat het allel sterker of beter is.', 'Dat het fenotype van dit allel tot uiting komt in de heterozygoot.'], correct: 2,
    explanation: 'Dominantie beschrijft de uiting bij een heterozygoot, niet hoe vaak een allel voorkomt en ook niet of een eigenschap gunstig is.'
  },
  {
    id: 'independent', title: 'Kansen vermenigvuldigen',
    question: 'Bij GgRr × GgRr is P(groen) = 1/4 en P(rond) = 3/4. De genen erven onafhankelijk over. Hoe groot is P(groen én rond)?',
    options: ['3/16', '4/8', '1/16'], correct: 0,
    explanation: 'Bij onafhankelijke gebeurtenissen vermenigvuldig je de kansen: 1/4 × 3/4 = 3/16. Zonder onafhankelijke overerving mag je deze regel hier niet zomaar toepassen.'
  },
  {
    id: 'screening', title: 'Neonatale screening',
    question: 'Waarom worden pasgeborenen gescreend op bepaalde zeldzame aandoeningen?',
    options: ['Om alle genotypes in één test vast te leggen.', 'Omdat vroeg opsporen en behandelen ernstige schade kan voorkomen.', 'Omdat een positieve screening altijd een definitieve diagnose is.'], correct: 1,
    explanation: 'Screening spoort een verhoogd risico op. Een afwijkende screening vraagt bevestigend onderzoek. Vroege behandeling kan bij de geselecteerde aandoeningen het verschil maken.'
  }
]
