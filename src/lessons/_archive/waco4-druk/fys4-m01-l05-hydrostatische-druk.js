/**
 * Hydrostatische druk in vloeistoffen - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 3: Druk bij vloeistoffen (Les 1/4)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 40-49)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l05-hydrostatische-druk',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Hydrostatische Druk in Vloeistoffen',
    description: 'Het ontstaan van vloeistofdruk door het gewicht van bovenliggende vloeistoflagen, de formele afleiding p_hydr = ρ · g · h, de hydrostatische paradox en diepteberekeningen.',

    config: {
        groenCode: 'F4M01L05',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 40-49)'
    },

    goals: [
        'Ik kan verklaren dat hydrostatische druk ontstaat door het gewicht van de bovenliggende vloeistoflagen.',
        'Ik kan de wiskundige afleiding van de formule p_hydr = ρ · g · h stap voor stap reproduceren.',
        'Ik begrijp dat hydrostatische druk enkel afhangt van de diepte h, de massadichtheid ρ en de zwaarteveldsterkte g (en NIET van de vatvorm of totale hoeveelheid vloeistof).',
        'Ik kan de hydrostatische paradox verklaren en toepassen op stuwdammen en duikers.',
        'Ik kan de formule omvormen om de diepte h = p / (ρ · g) of de dichtheid ρ = p / (g · h) te berekenen.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 3: Hydrostatische Druk (p. 40-49)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 40-44</strong> de proeven over de hydrostatische paradox. Maak in de oefeningenbundel op <strong>pagina 12-15 oefeningen 1, 2, 4 en 9</strong>.</p>',
        formulaHint: 'Basisformule: \\( p_{\\text{hydr}} = \\rho_{\\text{vl}} \\cdot g \\cdot h \\). Diepte: \\( h = \\frac{p_{\\text{hydr}}}{\\rho \\cdot g} \\). Dichtheid zuiver water: \\( 998\\text{ kg/m}^3 \= 1\\,000\\text{ kg/m}^3 \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over massadichtheid (ρ = m / V), zwaartekracht en druk.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & De Duikparadox',
                    description: 'Waarom doet 5 meter duiken in een enorm zwembad exact evenveel pijn aan je trommelvlies als 5 meter in een smalle buis?',
                    action: 'presentation',
                    slidesKey: 'slidesA'
                }
            ]
        },

        stepB: {
            step: 'B', title: 'Verwerken', time: '30 min',
            cards: [
                {
                    id: 'card-pres-b',
                    type: 'class',
                    title: 'Hydrostatische Druk & Afleiding',
                    description: 'Afleiding p = ρ · g · h, de hydrostatische paradox en het rekenvoorbeeld stuwdam.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 1, 2, 4 en 9 (oefenbundel p. 12-15).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: hydrostatische druk',
                    description: 'Onderzoek hoe diepte en vloeistofdichtheid de druk bepalen.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Diepte & Vloeistoffen Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Hydrostatica & Stuwdammen',
                    category: 'Verdieping',
                    icon: 'PhLightbulb'
                }
            ]
        },

        stepC: {
            step: 'C', title: 'Afsluiting', time: '5 min',
            cards: [
                {
                    id: 'card-pres-c',
                    type: 'class',
                    title: 'Synthese Hydrostatica',
                    description: 'De vuistregels van vloeistofdruk en vooruitblik naar communicerende vaten.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de hydrostatische druk en rekenoefeningen.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'pressureLab',
            defaultMode: 'vloeistof'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Massadichtheid van Vloeistoffen en Druk',
            instruction: 'Koppel elke vloeistof aan haar invloed op de hydrostatische druk op 10 m diepte.',
            pairs: [
                { term: 'Kwik (ρ = 13 600 kg/m³)', definition: 'Extreem hoge druk: 10 m kwik geeft ruim 1,3 · 10⁶ Pa (13 bar!)' },
                { term: 'Zeewater (ρ = 1 025 kg/m³)', definition: 'Iets hogere druk dan in zoet water door opgelost zout: ~100,5 kPa' },
                { term: 'Zoet water (ρ = 998 kg/m³)', definition: 'Standaard referentie: 10 meter waterdiepte komt overeen met circa 1 bar druk' },
                { term: 'Olijfolie (ρ = 920 kg/m³)', definition: 'Lagere druk dan in water doordat olie lichter is en blijft drijven' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Hydrostatische Druk & Vraagstukken (WACO 4)',
            questions: [
                {
                    q: 'Een stuwdam ondervindt onderaan een hydrostatische druk van 5,00 · 10⁵ Pa van het zoete water erachter (ρ = 998 kg/m³, g = 9,81 N/kg). Hoe diep is het stuwmeer?',
                    a: [
                        '51,1 meter (want h = p / (ρ · g) = 500 000 / (998 · 9,81) = 51,07 m)',
                        '5,0 meter',
                        '500 meter',
                        '25,5 meter'
                    ],
                    c: 0
                },
                {
                    q: 'Drie vaten A, B en C hebben een identiek bodemoppervlak en zijn gevuld met water tot een hoogte van 40 cm. Vat A is cilindrisch, vat B loopt conisch wijd uit (bevat 5x zoveel water), en vat C is smal buisvormig. Welk vat heeft de grootste hydrostatische druk op de bodem?',
                    a: [
                        'Alle drie de vaten hebben exact dezelfde bodemdruk (de hydrostatische paradox).',
                        'Vat B, omdat daar het meeste water en dus het grootste gewicht in zit.',
                        'Vat C, omdat het water daar smaller samengeperst zit.',
                        'Vat A, omdat het mooi regelmatig van vorm is.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom zijn stuwdammen onderaan veel dikker gebouwd dan bovenaan?',
                    a: [
                        'Omdat de hydrostatische druk recht evenredig toeneemt met de diepte (p = ρ · g · h), waardoor de waterdruk onderaan het allergrootst is.',
                        'Omdat koud water zwaarder is dan warm water.',
                        'Om schepen te laten aanmeren.',
                        'Omdat beton onderaan sneller uithardt.'
                    ],
                    c: 0
                },
                {
                    q: 'Welke stelling over hydrostatische druk is volgens WACO 4 FOUT?',
                    a: [
                        'De hydrostatische druk in een punt is omgekeerd evenredig met de massadichtheid van de vloeistof.',
                        'De hydrostatische druk ontstaat door het gewicht van de bovenliggende vloeistoflagen.',
                        'In éénzelfde horizontaal vlak is de hydrostatische druk in alle richtingen even groot.',
                        'De hydrostatische druk is recht evenredig met de diepte onder de vloeistofspiegel.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Hydrostatische Druk',
            subtitle: 'Vloeistofdruk, afleiding p = ρ · g · h en de hydrostatische paradox (WACO 4 p. 40-49)',
            badge: 'Fysica 4 - Les 5',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Uitleggen hoe het gewicht van een vloeistofkolom leidt tot hydrostatische druk.' },
                { icon: 'function', text: 'De wiskundige formule p_hydr = ρ · g · h begrijpen en stap-voor-stap afleiden.' },
                { icon: 'function', text: 'De hydrostatische paradox doorgronden: waarom vatvorm geen rol speelt.' },
                { icon: 'function', text: 'Dieptes, drukken en vloeistofdichtheden berekenen met concrete vraagstukken.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: De Duikparadox',
            question: 'Je duikt 4 meter diep in de oceaan (die miljoenen kubieke meters water bevat) en voelt een duidelijke druk op je oren. Zou je exact dezelfde oorpijn voelen als je 4 meter diep duikt in een smalle glazen buis met amper 20 liter water?',
            hint: 'Denk aan de definitie van druk: telt het totale volume van het waterbekken mee, of alleen de hoogte van het water boven je?',
            revealText: 'Je voelt exact dezelfde druk op je trommelvliezen! De hydrostatische druk op een bepaalde diepte hangt enkel af van de hoogte van de vloeistoflaag boven je (4 meter) en de dichtheid van het water, en absoluut NIET van de totale hoeveelheid water rondom je.'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Massadichtheid (ρ)',
            items: [
                { label: 'Definitie', value: 'ρ = m / V (massa gedeeld door volume). SI-eenheid: kg/m³.' },
                { label: 'Dichtheid zoet water', value: '1 000 kg/m³ (of 1,00 kg/dm³, 998 kg/m³ bij 20°C).' },
                { label: 'Dichtheid zeewater', value: '1 025 kg/m³ tot 1 030 kg/m³ (zwaarder door opgelost zout).' },
                { label: 'Zwaartekracht op volume', value: 'FG = m · g = ρ · V · g = ρ · A · h · g.' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Hydrostatische Druk (p_hydr)',
            definition: 'De hydrostatische druk is de druk die in een stilstaande vloeistof heerst ten gevolge van het gewicht van de bovenliggende vloeistoflagen: \\( p_{\\text{hydr}} = \\rho_{\\text{vl}} \\cdot g \\cdot h \\).'
        },
        {
            layout: 'worked-example',
            title: 'Wiskundige Afleiding van de Formule',
            problem: 'Wiskundige Afleiding van de Formule',
            steps: [
                { label: 'Stap 1: Vloeistofkolom', content: 'Beschouw een denkbeeldige vloeistofcilinder met grondvlak \\( A \\), hoogte \\( h \\) en massadichtheid \\( \\rho \\).' },
                { label: 'Stap 2: Volume & Massa', content: 'Het volume is \\( V = A \\cdot h \\). De massa van de kolom is \\( m = \\rho \\cdot V = \\rho \\cdot A \\cdot h \\).' },
                { label: 'Stap 3: Gewichtskracht', content: 'Het gewicht van deze kolom op de bodem is \\( F_G = m \\cdot g = \\rho \\cdot A \\cdot h \\cdot g \\).' },
                { label: 'Stap 4: Druk op het bodemoppervlak', content: '\\( p = \\frac{F_G}{A} = \\frac{\\rho \\cdot A \\cdot h \\cdot g}{A} \\). Oppervlak \\( A \\) valt weg in teller en noemer!' },
                { label: 'Eindformule', content: '\\( p_{\\text{hydr}} = \\rho \\cdot g \\cdot h \\). Druk hangt NIET af van oppervlakte \\( A \\)!' }
            ]
        },
        {
            layout: 'properties',
            title: 'De Drie Eigenschappen van Hydrostatische Druk',
            items: [
                { label: '1. Recht evenredig met diepte h', value: 'Elke meter dieper stijgt de waterdruk met circa 10 000 Pa (0,1 bar). Op 10 meter diepte is de vloeistofdruk ~1 bar.' },
                { label: '2. Recht evenredig met dichtheid ρ', value: 'In een zwaardere vloeistof (zoals kwik of zeewater) is de hydrostatische druk op dezelfde diepte groter.' },
                { label: '3. Alzijdig in één horizontaal vlak', value: 'Op een bepaalde diepte werkt de hydrostatische druk in alle richtingen met exact dezelfde intensiteit (naar onder, naar boven en zijwaarts).' }
            ]
        },
        {
            layout: 'properties',
            title: 'De Hydrostatische Paradox',
            items: [
                { label: 'Verrassende waarneming', value: 'Vaten met verschillende vormen (smal, cilindrisch of wijd uitlopend) hebben bij gelijke vloeistofhoogte h exact dezelfde bodemdruk!' },
                { label: 'Fysische verklaring', value: 'Bij een wijd uitlopend vat dragen de schuine wanden een deel van het vloeistofgewicht. Bij een toelopend vat duwen de schuine wanden extra naar beneden.' },
                { label: 'Gevolg voor stuwdammen', value: 'De waterdruk tegen een stuwdam hangt uitsluitend af van de diepte van het meer, niet of het stuwmeer 100 meter breed is of 50 kilometer lang!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Voorbeeld: Diepte van een Stuwmeer (WACO 4 Oef. 9 p. 15)',
            problem: 'Druk onderaan stuwdam \\( p_{\\text{hydr}} = 5{,}00 \\cdot 10^5\\text{ Pa} \\); zoet water \\( \\rho = 998\\text{ kg/m}^3 \\); \\( g = 9{,}81\\text{ N/kg} \\).',
            steps: [
                { label: 'Gegeven', content: 'Druk onderaan stuwdam \\( p_{\\text{hydr}} = 5{,}00 \\cdot 10^5\\text{ Pa} \\); zoet water \\( \\rho = 998\\text{ kg/m}^3 \\); \\( g = 9{,}81\\text{ N/kg} \\).' },
                { label: 'Gevraagd', content: 'Diepte van het stuwmeer \\( h \\) in meter.' },
                { label: 'Formule omvormen', content: '\\( p = \\rho \\cdot g \\cdot h \\Rightarrow h = \\frac{p}{\\rho \\cdot g} \\)' },
                { label: 'Berekening', content: '\\( h = \\frac{5{,}00 \\cdot 10^5\\text{ Pa}}{998\\text{ kg/m}^3 \\cdot 9{,}81\\text{ N/kg}} = \\frac{500\\,000}{9\\,790{,}38} \= 51{,}07\\text{ m} \= 51{,}1\\text{ m} \\)' },
                { label: 'Antwoord', content: 'Het stuwmeer is 51,1 meter diep achter de stuwdam.' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 4 Oef. 2 p. 12)',
            question: 'Drie glazen recipiënten met verschillende vorm maar identiek bodemoppervlak zijn gevuld met water tot een hoogte van 30 cm. Welke uitspraak over de druk op de bodem is JUIST?',
            options: [
                { id: 'A', text: 'Het vat met de meeste liters water heeft de grootste bodemdruk.', correct: false },
                { id: 'B', text: 'In alle drie de vaten is de druk op de bodem exact gelijk (p = ρ · g · h).', correct: true },
                { id: 'C', text: 'Het smalste vat heeft de grootste bodemdruk.', correct: false },
                { id: 'D', text: 'De bodemdruk is in alle drie de vaten gelijk aan nul pascal.', correct: false }
            ],
            explanation: 'Conform de hydrostatische paradox hangt de bodemdruk p = ρ · g · h uitsluitend af van de vloeistofhoogte h (30 cm) en de massadichtheid ρ van water. Omdat h en ρ voor alle drie de vaten identiek zijn, is de hydrostatische bodemdruk exact even groot.'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Hydrostatische Druk',
            items: [
                'Hydrostatische druk ontstaat door het gewicht van bovenliggende vloeistoflagen.',
                'Formule: p_hydr = ρ · g · h (met ρ in kg/m³, g = 9,81 N/kg en h in m).',
                'Druk neemt recht evenredig toe met de diepte en de vloeistofdichtheid.',
                'Hydrostatische paradox: de vorm van het vat en de totale vloeistofmassa hebben géén invloed op de druk op de bodem.',
                'Stuwdammen zijn onderaan dikker omdat de waterdruk met de diepte toeneemt.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 6!',
            subtitle: 'In les 6 combineren we de hydrostatische druk met de atmosferische druk (totale vloeistofdruk) en onderzoeken we communicerende vaten.',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstuk', value: '3 Vloeistoffen' },
                { label: 'Lesuur', value: '5 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat stelt de massadichtheid ρ van een stof voor?',
                options: [
                    'De verhouding van de massa tot het volume: ρ = m / V',
                    'Het product van de massa en het oppervlak: ρ = m · A',
                    'De verhouding van het gewicht tot de druk: ρ = F / p',
                    'De snelheid waarmee een vloeistof stroomt'
                ],
                correct: 0,
                explanation: 'Massadichtheid is gedefinieerd als massa per volume-eenheid: ρ = m / V (in kg/m³).'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Wat is de massadichtheid van zuiver vloeibaar water in SI-eenheden (bij benadering)?',
                options: [
                    '1 kg/m³',
                    '100 kg/m³',
                    '1 000 kg/m³ (of 1,00 kg/dm³)',
                    '10 000 kg/m³'
                ],
                correct: 2,
                explanation: '1 liter (1 dm³) water weegt 1 kg, wat overeenkomt met 1 000 kg per m³.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Waardoor ontstaat de hydrostatische druk in een vloeistof?',
                options: [
                    'Door het gewicht van de bovenliggende vloeistoflagen dat naar beneden drukt.',
                    'Door de atmosferische wind die over het wateroppervlak waait.',
                    'Door magnetische velden in de watermoleculen.',
                    'Door de wrijving van het water tegen de vatwand.'
                ],
                correct: 0,
                explanation: 'Hydrostatische druk ontstaat doordat vloeistoflagen een massa hebben en onder invloed van de zwaartekracht op de onderliggende lagen drukken.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Hoeveel pascal druk levert een waterlaag van 1,0 meter zoet water ongeveer op (neem g = 10 N/kg en ρ = 1 000 kg/m³)?',
                options: [
                    'Ongeveer 10 000 Pa (10 kPa of 0,1 bar)',
                    'Ongeveer 100 Pa',
                    'Ongeveer 1 000 000 Pa',
                    'Ongeveer 10 Pa'
                ],
                correct: 0,
                explanation: 'p = ρ · g · h = 1 000 kg/m³ · 10 N/kg · 1 m = 10 000 Pa = 10 kPa.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een duiker bevindt zich op een diepte van 25,0 meter in zoet water (ρ = 1 000 kg/m³, g = 9,81 N/kg). Hoe groot is de hydrostatische druk van het water op zijn lichaam?',
                options: [
                    'p_hydr = 2,45 · 10⁵ Pa (245 kPa of ca. 2,45 bar)',
                    'p_hydr = 25 000 Pa',
                    'p_hydr = 9,81 · 10⁴ Pa',
                    'p_hydr = 2,45 · 10⁶ Pa'
                ],
                correct: 0,
                explanation: 'p_hydr = ρ · g · h = 1 000 kg/m³ · 9,81 N/kg · 25,0 m = 245 250 Pa = 2,45 · 10⁵ Pa.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Wat houdt de hydrostatische paradox in volgens de lessen Fysica 4?',
                options: [
                    'Vloeistoffen kunnen omhoog stromen zonder pomp.',
                    'De bodemdruk is in vaten met gelijke vloeistofhoogte en vloeistofsoort exact gelijk, ongeacht de vorm of totale hoeveelheid vloeistof.',
                    'De druk in water is altijd gelijk aan de druk in kwik.',
                    'Zware voorwerpen zinken altijd sneller dan lichte voorwerpen.'
                ],
                correct: 1,
                explanation: 'De bodemdruk hangt uitsluitend af van de diepte h en dichtheid ρ (p = ρ · g · h). De vorm van het vat en het totale vloeistofvolume spelen geen enkele rol.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Op 10 meter diepte in zeewater (ρ = 1 025 kg/m³) is de hydrostatische druk … dan op 10 meter diepte in zoet water (ρ = 1 000 kg/m³).',
                options: [
                    'iets groter (want p is recht evenredig met de dichtheid ρ)',
                    'exact gelijk',
                    'iets kleiner',
                    'onberekenbaar'
                ],
                correct: 0,
                explanation: 'Omdat zeewater een hogere dichtheid heeft (1 025 > 1 000 kg/m³), weegt een kolom zeewater meer, waardoor de hydrostatische druk groter is.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Toepassingsvraag & Ontwerp',
                description: 'Leg aan de hand van de formule p_hydr = ρ · g · h uit waarom de betonnen muur van een stuwdam onderaan metersdik moet zijn, terwijl de dam bovenaan relatief dun kan worden uitgevoerd.'
            }
        ]
    }
}
