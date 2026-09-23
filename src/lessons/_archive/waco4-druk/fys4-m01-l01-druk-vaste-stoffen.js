/**
 * Druk bij vaste stoffen: Definitie & Formule - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 1: Druk bij vaste stoffen (Les 1/2)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 12-19)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l01-druk-vaste-stoffen',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Druk bij vaste stoffen: Begrip & Formule',
    description: 'Grondige introductie tot het fysische begrip druk als de verhouding van de loodrechte kracht tot de contactoppervlakte, met de formule p = F / A, SI-eenheden en eenhedenomzettingen.',

    config: {
        groenCode: 'F4M01L01',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 12-19)'
    },

    goals: [
        'Ik kan verklaren dat druk de vervorming beschrijft die veroorzaakt wordt door een loodrecht op een oppervlak werkende kracht.',
        'Ik kan de wiskundige formule p = F / A en haar afgeleide vormen (F = p · A en A = F / p) vlot toepassen.',
        'Ik kan uitleggen dat de SI-eenheid van druk de pascal (Pa) is, met 1 Pa = 1 N/m², en kan omrekenen tussen Pa, hPa en bar.',
        'Ik kan beredeneren dat druk recht evenredig is met de kracht en omgekeerd evenredig met de contactoppervlakte.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 1: Druk bij vaste stoffen (p. 12-19)',
        instruction: '<p>Voer in je leerwerkboek op <strong>pagina 12-14</strong> de waarneming uit van de baksteen op schuimrubber. Maak vervolgens in de oefeningenbundel op <strong>pagina 1-3 oefeningen 1, 2, 4 en 8</strong>.</p>',
        formulaHint: 'Basisformule: \\( p = \\frac{F}{A} \\) \\(\\Leftrightarrow\\) \\( F = p \\cdot A \\) \\(\\Leftrightarrow\\) \\( A = \\frac{F}{p} \\). Let op: \\( 1\\text{ cm}^2 = 10^{-4}\\text{ m}^2 \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Toetsing van voorkennis over kracht (F), zwaartekracht (Fg = m · g) en oppervlakteberekening.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Introductie & Verwondering',
                    description: 'De baksteen op de spons: waarom maakt het contactoppervlak het verschil?',
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
                    title: 'Instructie & Rekenvoorbeelden',
                    description: 'Definitie van druk, SI-eenheid pascal, evenredigheden en uitgewerkt rekenvoorbeeld.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 1, 2, 4 en 8 (oefenbundel p. 1-3).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: druk bij vaste stoffen',
                    description: 'Onderzoek de invloed van kracht en contactoppervlakte op de druk.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Drukformules & Evenredigheden',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Druk Vaste Stoffen',
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
                    title: 'Synthese & Lesoverzicht',
                    description: 'Kernformules, SI-eenheden en vooruitblik naar toepassingen.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de kernconcepten en rekenvaardigheid.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'pressureLab',
            defaultMode: 'vast'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Wiskundige Relaties & Evenredigheden',
            instruction: 'Koppel elke wiskundige ingreep aan het juiste fysische gevolg voor de druk.',
            pairs: [
                { term: 'Kracht F verdubbelt bij constante A', definition: 'Druk p verdubbelt (recht evenredig verband)' },
                { term: 'Oppervlak A verdubbelt bij constante F', definition: 'Druk p wordt gehalveerd (omgekeerd evenredig verband)' },
                { term: 'Zowel F als A verdubbelen gelijktijdig', definition: 'Druk p blijft exact gelijk ((2·F)/(2·A) = F/A)' },
                { term: 'Oppervlak A wordt 4 keer kleiner', definition: 'Druk p wordt 4 keer groter' },
                { term: 'Afgeleide formule voor kracht F', definition: 'F = p · A (druk vermenigvuldigd met oppervlakte)' },
                { term: 'Afgeleide formule voor oppervlakte A', definition: 'A = F / p (kracht gedeeld door druk)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Druk en Evenredigheden (WACO 4)',
            questions: [
                {
                    q: 'Een erlenmeyer en een rondbodemkolf hebben exact dezelfde massa en bevatten beide 500 ml water. Welk vat oefent de grootste druk uit op de tafel?',
                    a: [
                        'De rondbodemkolf, omdat het contactoppervlak met de tafel veel kleiner is bij gelijkblijvend gewicht.',
                        'De erlenmeyer, omdat de brede bodem meer watermoleculen ondersteunt.',
                        'Beide oefenen exact dezelfde druk uit omdat het totale gewicht gelijk is.'
                    ],
                    c: 0
                },
                {
                    q: 'Je duwt met je duim op een tafel met een kracht van 20 N. Onder je duim heerst een druk van 1,2 · 10⁵ Pa. Hoe groot is het contactoppervlak in cm²?',
                    a: [
                        '1,7 cm² (want A = F / p = 20 / 120 000 = 1,67 · 10⁻⁴ m² = 1,67 cm²)',
                        '0,17 cm²',
                        '16,7 cm²'
                    ],
                    c: 0
                },
                {
                    q: 'Een massieve kubus oefent een druk p₁ uit op de grond. Een tweede kubus van hetzelfde materiaal heeft ribben die tweemaal zo lang zijn. Hoe groot is de druk p₂?',
                    a: [
                        'p₂ = 2 · p₁ (de massa stijgt met factor 2³ = 8, het oppervlak met factor 2² = 4; dus p = 8/4 = 2)',
                        'p₂ = 4 · p₁',
                        'p₂ = p₁ (de verhouding blijft gelijk)',
                        'p₂ = 8 · p₁'
                    ],
                    c: 0
                },
                {
                    q: 'Welke uitspraak over de eenheid van druk is wetenschappelijk FOUT?',
                    a: [
                        '1 mbar is gelijk aan 1 Pa.',
                        '1 Pa is gelijk aan 1 N/m².',
                        '1 bar is gelijk aan 100 000 Pa.',
                        '1 hPa is gelijk aan 100 Pa.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Druk bij vaste stoffen',
            subtitle: 'Begrip, formule en eenheden (WACO 4 Thema 1)',
            badge: 'Fysica 4 - Les 1',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Verklaren wat druk fysisch voorstelt: de uitwerking van een loodrechte kracht op een oppervlak.' },
                { icon: 'function', text: 'De formule p = F / A en haar afgeleide vormen vlot hanteren in berekeningen.' },
                { icon: 'function', text: 'Werken met de SI-eenheid pascal (1 Pa = 1 N/m²) en omrekenen naar hPa en bar.' },
                { icon: 'function', text: 'Het effect van een veranderend oppervlak of kracht op de druk voorspellen via evenredigheden.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwonderingsproef: De Baksteen op de Spons',
            question: 'Je legt een baksteen (massa 2,0 kg) op een zacht stuk schuimrubber. Je plaatst de steen achtereenvolgens op zijn grootste vlak, zijn middelvlak en zijn kleinste kopse vlak. Wat neem je waar qua indeuking van de spons?',
            hint: 'Bedenk: verandert de zwaartekracht op de baksteen wanneer je hem kantelt?',
            revealText: 'De zwaartekracht (Fg = m · g = 20 N) blijft bij elke stand exact gelijk! Toch zakt de steen op zijn kleinste kopse vlak veel dieper in de spons. De vervorming van het oppervlak hangt niet alleen af van de uitgeoefende kracht, maar ook van de oppervlakte waarop die kracht verdeeld wordt.'
        },
        {
            layout: 'properties',
            title: 'Voorkennis ophalen: Kracht & Zwaartekracht',
            items: [
                { label: 'Grootheid Kracht F', value: 'Beschrijft de wisselwerking tussen voorwerpen. SI-eenheid: newton (N).' },
                { label: 'Zwaartekracht Fg', value: 'Fg = m · g met m in kg en g = 9,81 N/kg (op aarde).' },
                { label: 'Vervorming', value: 'Een statisch effect van een kracht: buigen, indeuken of uitrekken.' },
                { label: 'Oppervlakte A', value: 'SI-eenheid: vierkante meter (m²). Let op: 1 cm² = 0,0001 m² = 10⁻⁴ m²!' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Druk (p)',
            definition: 'Druk is de verhouding van de grootte van de loodrecht op een oppervlak werkende kracht F tot de grootte van de contactoppervlakte A waarop die kracht werkt: \\( p = \\frac{F}{A} \\).'
        },
        {
            layout: 'properties',
            title: 'Grootheden, Eenheden en Omzettingen',
            items: [
                { label: 'Druk p', value: 'SI-eenheid: pascal (Pa). 1 Pa = 1 N/m².' },
                { label: 'Loodrechte kracht F', value: 'SI-eenheid: newton (N). Alleen de component loodrecht op het vlak telt mee!' },
                { label: 'Contactoppervlakte A', value: 'SI-eenheid: m². Omrekening: 1 mm² = 10⁻⁶ m², 1 cm² = 10⁻⁴ m², 1 dm² = 10⁻² m².' },
                { label: 'Bar & Hectopascal', value: '1 bar = 100 000 Pa = 10⁵ Pa. 1 hPa = 100 Pa = 1 mbar (meteorologie).' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Voorbeeld 1: Koelbox op het strand (WACO 4 p. 14)',
            problem: 'Gewicht van de koelbox \\( F_G = 60\\text{ N} \\); contactoppervlak met het zand \\( A = 0{,}12\\text{ m}^2 \\).',
            steps: [
                { label: 'Gegeven', content: 'Gewicht van de koelbox \\( F_G = 60\\text{ N} \\); contactoppervlak met het zand \\( A = 0{,}12\\text{ m}^2 \\).' },
                { label: 'Gevraagd', content: 'Druk \\( p \\) in pascal (Pa).' },
                { label: 'Formule', content: '\\( p = \\frac{F}{A} \\)' },
                { label: 'Berekening', content: '\\( p = \\frac{60\\text{ N}}{0{,}12\\text{ m}^2} = 500\\text{ Pa} = 5{,}0 \\cdot 10^2\\text{ Pa} \\)' },
                { label: 'Antwoord', content: 'De koelbox oefent een druk uit van \\( 5{,}0 \\cdot 10^2\\text{ Pa} \\) (of 5,0 hPa) op het zand.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Voorbeeld 2: Kast op vier poten (WACO 4 Oef. 7 p. 3)',
            problem: '\\( m = 50\\text{ kg} \\); aantal poten = 4; oppervlak per poot \\( A_{\\text{poot}} = 100\\text{ cm}^2 = 0{,}0100\\text{ m}^2 \\).',
            steps: [
                { label: 'Gegeven', content: '\\( m = 50\\text{ kg} \\); aantal poten = 4; oppervlak per poot \\( A_{\\text{poot}} = 100\\text{ cm}^2 = 0{,}0100\\text{ m}^2 \\).' },
                { label: 'Gevraagd', content: 'Druk \\( p \\) die de poten op de vloer uitoefenen.' },
                { label: 'Formules', content: '\\( F_G = m \\cdot g = 50\\text{ kg} \\cdot 9{,}81\\text{ N/kg} = 490{,}5\\text{ N} \\); \\( A_{\\text{tot}} = 4 \\cdot 0{,}0100\\text{ m}^2 = 0{,}0400\\text{ m}^2 \\).' },
                { label: 'Berekening', content: '\\( p = \\frac{F_G}{A_{\\text{tot}}} = \\frac{490{,}5\\text{ N}}{0{,}0400\\text{ m}^2} = 12\\,262{,}5\\text{ Pa} = 1{,}2 \\cdot 10^4\\text{ Pa} \\)' },
                { label: 'Antwoord', content: 'De kast oefent een druk uit van \\( 1{,}2 \\cdot 10^4\\text{ Pa} \\) (of 12 kPa) op de vloer.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Evenredigheden bij de Drukformule',
            items: [
                { label: 'Recht evenredig met F', value: 'Als het oppervlak constant blijft en de kracht verdubbelt (bv. zwaardere lading), dan verdubbelt de druk.' },
                { label: 'Omgekeerd evenredig met A', value: 'Als de kracht constant blijft en het contactoppervlak halveert, dan verdubbelt de druk.' },
                { label: 'Gelijktijdige verandering', value: 'Als zowel F als A met dezelfde factor veranderen, blijft de druk ongewijzigd: (2·F)/(2·A) = F/A.' },
                { label: 'Valkuil', value: 'Verwar nooit kracht (N) met druk (Pa)! Kracht is de inwerking, druk is de intensiteit per m².' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 4 Oef. 1 p. 1)',
            question: 'Een kracht van 100 N werkt loodrecht in op een oppervlak van 20 m². Wat gebeurt er met de druk als je zowel de kracht als het oppervlak verdubbelt?',
            options: [
                { id: 'A', text: 'De druk wordt gehalveerd (2,5 Pa).', correct: false },
                { id: 'B', text: 'De druk blijft even groot (5,0 Pa).', correct: true },
                { id: 'C', text: 'De druk verdubbelt (10 Pa).', correct: false },
                { id: 'D', text: 'De druk wordt vier keer groter (20 Pa).', correct: false }
            ],
            explanation: 'Oorspronkelijk: p = 100 N / 20 m² = 5,0 Pa. Na verdubbeling: p = (2 · 100 N) / (2 · 20 m²) = 200 N / 40 m² = 5,0 Pa. Teller en noemer worden met dezelfde factor vermenigvuldigd, waardoor de breukwaarde constant blijft.'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Themasynthese: Druk bij vaste stoffen',
            items: [
                'Druk p meet de loodrechte kracht per eenheid van oppervlakte: p = F / A.',
                'SI-eenheid is de pascal: 1 Pa = 1 N/m². Veelgebruikt: 1 hPa = 100 Pa, 1 bar = 100 000 Pa.',
                'Omrekening van oppervlakte vereist discipline: 1 cm² = 10⁻⁴ m².',
                'Druk vergroten doe je door F te vergroten of A te verkleinen (mes, naald).',
                'Druk verkleinen doe je door A te vergroten (sneeuwschoenen, rupsbanden).'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 2!',
            subtitle: 'In de volgende les onderzoeken we praktische toepassingen van drukvergroting en -verkleining in techniek, natuur en sport.',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstuk', value: '1 Vaste stoffen' },
                { label: 'Lesuur', value: '1 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat is de officiële SI-eenheid van kracht in de fysica?',
                options: ['Joule (J)', 'Newton (N)', 'Pascal (Pa)', 'Kilogram (kg)'],
                correct: 1,
                explanation: 'De newton (N) is de SI-eenheid van kracht. Pascal is de eenheid van druk, joule van energie/arbeid en kilogram van massa.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Hoe bereken je het gewicht (de zwaartekracht Fg) van een voorwerp met massa m = 4,0 kg op aarde?',
                options: [
                    'Fg = 4,0 N',
                    'Fg = 4,0 kg · 9,81 N/kg = 39,2 N',
                    'Fg = 4,0 kg / 9,81 N/kg = 0,41 N',
                    'Fg = 4,0 kg · 100 N/kg = 400 N'
                ],
                correct: 1,
                explanation: 'De zwaartekracht wordt berekend met Fg = m · g. Met g = 9,81 N/kg op aarde levert dit 4,0 · 9,81 = 39,2 N op.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Hoeveel vierkante meter (m²) is een oppervlakte van 250 cm²?',
                options: [
                    '25 m²',
                    '2,5 m²',
                    '0,25 m²',
                    '0,025 m² (want 1 cm² = 10⁻⁴ m²)'
                ],
                correct: 3,
                explanation: 'Van cm² naar m² deel je tweemaal door 100 (dus door 10 000 of vermenigvuldigen met 10⁻⁴): 250 cm² = 0,025 m².'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Een houten balk ligt op tafel. In welke stand oefent de balk de grootste zwaartekracht uit op de tafel?',
                options: [
                    'Wanneer hij op zijn grootste zijvlak ligt.',
                    'Wanneer hij rechtop staat op zijn kleinste kopse kant.',
                    'In alle standen is de zwaartekracht exact even groot.',
                    'Wanneer hij schuin tegen een steun leunt.'
                ],
                correct: 2,
                explanation: 'De zwaartekracht hangt uitsluitend af van de massa en de valversnelling (Fg = m · g) en is dus onafhankelijk van hoe het voorwerp georiënteerd is.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een persoon van 60 kg staat op één voet met een zooloppervlak van 150 cm² (0,015 m²). Hoe groot is de druk op de vloer (neem g = 9,81 N/kg)?',
                options: [
                    'p = 3,9 · 10⁴ Pa (39 kPa)',
                    'p = 3,9 · 10² Pa',
                    'p = 4,0 · 10⁵ Pa',
                    'p = 9,0 · 10³ Pa'
                ],
                correct: 0,
                explanation: 'Fg = 60 kg · 9,81 N/kg = 588,6 N. Druk p = F / A = 588,6 N / 0,015 m² = 39 240 Pa = 3,9 · 10⁴ Pa.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Welke stelling over druk bij vaste stoffen is wetenschappelijk JUIST (conform WACO 4)?',
                options: [
                    'Druk wordt veroorzaakt door zowel schuine als loodrechte krachten zonder onderscheid.',
                    'Druk is omgekeerd evenredig met de contactoppervlakte bij constante kracht.',
                    'De SI-eenheid van druk is de bar.',
                    'Als de oppervlakte halveert bij gelijke kracht, dan halveert ook de druk.'
                ],
                correct: 1,
                explanation: 'Druk is omgekeerd evenredig met het contactoppervlak: p = F / A. Als A kleiner wordt bij gelijke F, stijgt de druk.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Welke van onderstaande eenheden is gelijk aan 1 hectopascal (1 hPa)?',
                options: [
                    '1 N/m²',
                    '100 Pa (en 1 millibar)',
                    '10 000 Pa',
                    '1 bar'
                ],
                correct: 1,
                explanation: 'Hecto betekent honderd, dus 1 hPa = 100 Pa. In de meteorologie is 1 hPa exact gelijk aan 1 millibar (mbar).'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Reflectie & Begripscontrole',
                description: 'Leg in twee zinnen uit waarom een scherp keukenmes vlot door een tomaat snijdt, terwijl een bot mes met dezelfde drukkracht de tomaat enkel plet.'
            }
        ]
    }
}
