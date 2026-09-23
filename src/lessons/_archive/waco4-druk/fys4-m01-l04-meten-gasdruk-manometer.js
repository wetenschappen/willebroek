/**
 * Meten van gasdruk: manometers, overdruk en onderdruk - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 2: Druk bij gassen (Les 2/2)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 30-39)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l04-meten-gasdruk-manometer',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Meten van Gasdruk: Manometers, Overdruk & Onderdruk',
    description: 'Het onderscheid tussen barometers en manometers, de werking van open U-buizen en Bourdon-manometers, en het fysische onderscheid tussen absolute druk, overdruk en onderdruk.',

    config: {
        groenCode: 'F4M01L04',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 30-39)'
    },

    goals: [
        'Ik kan het onderscheid toelichten tussen een barometer (meet de atmosferische druk) en een manometer (meet de gasdruk in een afgesloten ruimte).',
        'Ik kan de begrippen absolute druk, overdruk (pgas > patm) en onderdruk (pgas < patm) fysisch verklaren en toepassen op alledaagse voorbeelden.',
        'Ik kan uit het vloeistofhoogteverschil van een open U-buismanometer afleiden of er over- of onderdruk heerst en de absolute gasdruk berekenen.',
        'Ik begrijp dat een bandenspanningsmeter altijd overdruk aangeeft en kan omrekenen naar absolute druk (p_abs = p_over + p_atm).'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 2: Manometers en Drukvormen (p. 30-39)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 30-34</strong> de werking van de U-buismanometer en de metaalmanometer. Maak in de oefeningenbundel op <strong>pagina 9-11 oefeningen 5, 6, 7 en 8</strong>.</p>',
        formulaHint: 'Formules: Overdruk: \\( \\Delta p = p_{\\text{gas}} - p_{\\text{atm}} \\). Absolute druk: \\( p_{\\text{abs}} = p_{\\text{over}} + p_{\\text{atm}} \\). U-buis: \\( p_{\\text{gas}} = p_{\\text{atm}} \\pm \\rho \\cdot g \\cdot \\Delta h \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Toets',
                    description: 'Voorkennis over gasdruk, kinetisch model en normdruk (1013 hPa).',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & Probleemstelling',
                    description: 'Waarom sist een fietsventiel en waarom klapt een leeggezogen flesje dicht?',
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
                    title: 'Manometers & Drukverschillen',
                    description: 'Barometer vs manometer, open U-buis, absolute druk vs overdruk en rekenvoorbeelden.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Lab: Gaswetten & Manometersimulatie',
                    description: 'Onderzoek interactief het verband tussen volume, temperatuur en druk.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 5, 6, 7 en 8 (oefenbundel p. 9-11).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Overdruk vs Onderdruk Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Manometers & Drukvormen',
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
                    title: 'Synthese van Hoofdstuk 2',
                    description: 'Overzicht van gasdrukmetingen en brug naar vloeistofdruk in hoofdstuk 3.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van overdruk, onderdruk en U-buismanometers.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'idealGasLaw',
            defaultMode: 'boyle'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Overdruk versus Onderdruk in het Dagelijks Leven (WACO 4)',
            instruction: 'Classificeer elke concrete situatie uit het leerwerkboek als overdruk of onderdruk.',
            pairs: [
                { term: 'Lucht laten ontsnappen uit fietsband', definition: 'Overdruk (pgas > patm): de lucht stroomt spontaan van hoge naar lage druk' },
                { term: 'Openknippen van vacuüm koffiepakje', definition: 'Onderdruk (pgas < patm): lucht sist naar binnen doordat de buitendruk groter is' },
                { term: 'Drankje opzuigen met een rietje', definition: 'Onderdruk in je mond: atmosferische druk duwt de vloeistof in het rietje omhoog' },
                { term: 'Vliegtuigcabine op kruishoogte', definition: 'Overdruk (800 hPa binnen vs. 260 hPa buiten): cabine moet luchtdicht zijn' },
                { term: 'Zuignap tegen een gladde tegel', definition: 'Onderdruk onder de nap: atmosferische druk perst de nap muurvast tegen de tegel' },
                { term: 'Spuitbus deodorant / slagroom', definition: 'Overdruk: drijfgas perst de inhoud krachtig naar buiten via het spuitkanaal' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Manometers & Berekeningen (WACO 4)',
            questions: [
                {
                    q: 'Een open U-buismanometer is aangesloten op een gasfles. De vloeistof in het open been staat 15 cm hoger dan in het been aan de gasfles. Welke conclusie is JUIST?',
                    a: [
                        'In de gasfles heerst overdruk ten opzichte van de atmosferische druk.',
                        'In de gasfles heerst onderdruk ten opzichte van de atmosferische druk.',
                        'De druk in de gasfles is exact gelijk aan de atmosferische druk.',
                        'De gasfles is volledig vacuüm getrokken.'
                    ],
                    c: 0
                },
                {
                    q: 'Een bandenspanningsmeter geeft een overdruk aan van 2,4 bar bij een atmosferische druk van 1,0 bar. Wat is de werkelijke absolute druk in de autoband?',
                    a: [
                        '3,4 bar (want p_abs = p_over + p_atm = 2,4 + 1,0 bar)',
                        '2,4 bar',
                        '1,4 bar',
                        '2,4 · 10⁵ Pa'
                    ],
                    c: 0
                },
                {
                    q: 'Welk meettoestel gebruik je om de kans op neerslag te voorspellen aan de hand van luchtdrukwijzigingen?',
                    a: [
                        'Een barometer.',
                        'Een manometer.',
                        'Een dynamometer.',
                        'Een thermometer.'
                    ],
                    c: 0
                },
                {
                    q: 'Welke uitspraak over gasdrukmetingen is FOUT volgens WACO 4?',
                    a: [
                        'Er heerst overdruk in een vat als de atmosferische druk groter is dan de gasdruk in het vat.',
                        'De gasdruk in een afgesloten vat meet je met een manometer.',
                        'De atmosferische druk meet je met een barometer.',
                        'Bij onderdruk is de absolute gasdruk kleiner dan 1 013 hPa.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Meten van gasdruk',
            subtitle: 'Manometers, overdruk en onderdruk (WACO 4 p. 30-39)',
            badge: 'Fysica 4 - Les 4',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Het duidelijke onderscheid maken tussen barometers en manometers.' },
                { icon: 'function', text: 'De werking van een open U-buismanometer analyseren aan de hand van vloeistofhoogtes.' },
                { icon: 'function', text: 'Fysisch verklaren wat overdruk en onderdruk betekenen en alledaagse voorbeelden herkennen.' },
                { icon: 'function', text: 'Omrekenen tussen absolute druk en overdruk (zoals bij bandenspanning).' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Waarom sist een fietsband?',
            question: 'Wanneer je het ventiel van een goed opgepompte fietsband indrukt, hoor je een fel sissend geluid en voel je een krachtige luchtstroom naar buiten blazen. Waarom stroomt de lucht naar buiten en niet naar binnen?',
            hint: 'Vergelijk de gasdruk binnenin de band met de atmosferische druk buiten de band.',
            revealText: 'In de fietsband heerst een druk van ca. 4 bar (400 000 Pa). Buiten heerst de atmosferische druk van slechts 1 bar (100 000 Pa). Gassen stromen spontaan van een gebied met hoge druk naar een gebied met lage druk tot er evenwicht is. In de band heerst dus OVERDRUK!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Barometer versus Manometer',
            items: [
                { label: 'Barometer', value: 'Meet de atmosferische druk van de omringende open lucht (vb. kwikbarometer, doos van Vidi).' },
                { label: 'Manometer', value: 'Meet de druk van een afgesloten gas in een recipiënt (vb. U-buis, bourdonbuis in compressor).' },
                { label: 'Vuistregel uit WACO 4', value: 'Buitenlucht meet je met een barometer; een afgesloten gas meet je met een manometer!' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'properties',
            title: 'Drie Drukbegrippen op een Rij',
            items: [
                { label: 'Absolute gasdruk (p_abs)', value: 'De werkelijke, totale druk die de gasdeeltjes op de wanden uitoefenen t.o.v. het absolute vacuüm (p = 0).' },
                { label: 'Overdruk (Δp_over)', value: 'De gasdruk is GROTER dan de atmosferische druk: p_gas > p_atm. Overdruk = p_gas - p_atm. Vb: autoband, gasfles.' },
                { label: 'Onderdruk (Δp_onder)', value: 'De gasdruk is KLEINER dan de atmosferische druk: p_gas < p_atm. Onderdruk = p_atm - p_gas. Vb: vacuümverpakking, longen bij inademing.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'De Open U-buismanometer',
            problem: 'De Open U-buismanometer',
            steps: [
                { label: 'Bouw', content: 'Een U-vormige glazen buis deels gevuld met vloeistof (water of kwik). Het ene been is verbonden met het gasvat, het andere staat open naar de atmosfeer.' },
                { label: 'Gelijke hoogte', content: 'Staan beide vloeistofspiegels even hoog? Dan is \\( p_{\\text{gas}} = p_{\\text{atm}} \\) (geen over- of onderdruk).' },
                { label: 'Open been hoger (Δh > 0)', content: 'Het gas drukt harder dan de atmosfeer: er heerst OVERDRUK. Formule: \\( p_{\\text{gas}} = p_{\\text{atm}} + \\rho \\cdot g \\cdot \\Delta h \\).' },
                { label: 'Vatbeen hoger (Δh > 0)', content: 'De atmosfeer drukt harder dan het gas: er heerst ONDERDRUK. Formule: \\( p_{\\text{gas}} = p_{\\text{atm}} - \\rho \\cdot g \\cdot \\Delta h \\).' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Praktijkvoorbeeld: Autobandenspanning (WACO 4 p. 32)',
            problem: 'De digitale bandenspanningsmeter aan het benzinestation geeft een waarde aan van 2,2 bar.',
            steps: [
                { label: 'Situatie', content: 'De digitale bandenspanningsmeter aan het benzinestation geeft een waarde aan van 2,2 bar.' },
                { label: 'Wat meet de meter?', content: 'Industriële manometers meten de OVERDRUK (het verschil met de omringende atmosfeer)!' },
                { label: 'Gegeven', content: '\\( p_{\\text{over}} = 2{,}2\\text{ bar} \\); \\( p_{\\text{atm}} \= 1{,}0\\text{ bar} \\).' },
                { label: 'Gevraagd', content: 'De werkelijke absolute druk \\( p_{\\text{abs}} \\) in de band.' },
                { label: 'Berekening', content: '\\( p_{\\text{abs}} = p_{\\text{over}} + p_{\\text{atm}} = 2{,}2\\text{ bar} + 1{,}0\\text{ bar} = 3{,}2\\text{ bar} = 3{,}2 \\cdot 10^5\\text{ Pa} \\).' },
                { label: 'Conclusie', content: 'De totale druk in de band is 3,2 bar. Als de band leegloopt, wijst de meter 0,0 bar aan, hoewel er nog steeds 1,0 bar lucht in zit!' }
            ]
        },
        {
            layout: 'properties',
            title: 'Metaalmanometer (Bourdonbuis)',
            items: [
                { label: 'Werking', value: 'Een gebogen, afgeplatte metalen buis (de bourdonveer) die verbonden is met het gasreservoir.' },
                { label: 'Fysisch principe', value: 'Bij toenemende gasdruk probeert de gekromde buis zich recht te trekken (zoals een feestrolletje dat je uitblaast).' },
                { label: 'Overbrenging', value: 'Een hefboompje en tandwiel vertalen deze minieme beweging naar een wijzer op een gekalibreerde schaalverdeling.' },
                { label: 'Robuustheid', value: 'Bevat geen vloeistof en kan daarom tegen schokken op duikflessen, gasbranders en compressoren.' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 4 Oef. 3 p. 9)',
            question: 'In een vliegtuig op 10 km hoogte heerst in de cabine een druk van 800 hPa. De buitendruk op die hoogte is 264 hPa. Welke stelling over de cabinedruk is JUIST?',
            options: [
                { id: 'A', text: 'In de cabine heerst onderdruk t.o.v. de buitendruk.', correct: false },
                { id: 'B', text: 'In de cabine heerst overdruk t.o.v. de buitendruk (Δp = 536 hPa).', correct: true },
                { id: 'C', text: 'De cabinedruk is exact gelijk aan de buitendruk.', correct: false },
                { id: 'D', text: 'De cabine bevindt zich in een toestand van compleet vacuüm.', correct: false }
            ],
            explanation: 'Binnen heerst 800 hPa, buiten slechts 264 hPa. Omdat p_binnen > p_buiten, heerst er in de cabine een aanzienlijke overdruk van 800 - 264 = 536 hPa naar buiten gericht. De vliegtuigwand moet sterk genoeg zijn om deze uitwaartse kracht te weerstaan!'
        },
        {
            layout: 'properties',
            title: 'Ademhalingsmechanisme bij de Mens',
            items: [
                { label: 'Inademen', value: 'Het middenrif daalt en de borstkas zet uit ⇒ longvolume V ↑ ⇒ druk in longen daalt onder patm (onderdruk) ⇒ buitenlucht stroomt automatisch naar binnen.' },
                { label: 'Uitademen', value: 'Het middenrif ontspant en de borstkas krimpt ⇒ longvolume V ↓ ⇒ druk in longen stijgt boven patm (overdruk) ⇒ lucht wordt naar buiten gestuwd.' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Hoofdstuk 2 Gasdruk',
            items: [
                'Barometers meten de open atmosferische druk; manometers meten de gasdruk in vaten.',
                'Overdruk: p_gas > p_atm (lucht wil ontsnappen).',
                'Onderdruk: p_gas < p_atm (buitenlucht wil naar binnen).',
                'Absolute druk = overdruk + atmosferische druk: p_abs = p_over + p_atm.',
                'Open U-buis: vloeistofkolomverschil Δh geeft direct de over- of onderdruk aan.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor Hoofdstuk 3!',
            subtitle: 'In les 5 onderzoeken we hoe vloeistoffen druk uitoefenen en leiden we de formule van de hydrostatische druk af.',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstuk', value: '2 Afgerond' },
                { label: 'Lesuur', value: '4 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Welk meettoestel dient specifiek om de atmosferische luchtdruk te meten?',
                options: ['Een manometer', 'Een barometer', 'Een dynamometer', 'Een caloriemeter'],
                correct: 1,
                explanation: 'Een barometer meet de luchtdruk van de open atmosfeer, terwijl een manometer de druk in een afgesloten gasreservoir meet.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Wat gebeurt er met de druk in een afgesloten cilinder als je de zuiger indrukt en het volume halveert (bij constante temperatuur)?',
                options: [
                    'De druk verdubbelt, want de deeltjes botsen dubbel zo vaak per seconde tegen de wanden.',
                    'De druk wordt gehalveerd.',
                    'De druk blijft gelijk omdat het aantal moleculen gelijk is gebleven.',
                    'De druk daalt naar nul.'
                ],
                correct: 0,
                explanation: 'Bij volumeverkleining neemt de concentratie gasdeeltjes toe, waardoor het aantal botsingen per seconde per oppervlakte-eenheid verdubbelt (wet van Boyle-Mariotte).'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Welke stelling over overdruk is JUIST volgens WACO 4?',
                options: [
                    'Er heerst overdruk in een vat als de gasdruk in het vat groter is dan de atmosferische druk.',
                    'Er heerst overdruk in een vat als de atmosferische druk groter is dan de gasdruk in het vat.',
                    'Overdruk betekent dat de druk exact gelijk is aan nul pascal.',
                    'Overdruk kan alleen voorkomen in een vloeistof en nooit in een gas.'
                ],
                correct: 0,
                explanation: 'Overdruk treedt op wanneer p_gas > p_atm. Er is dan een netto kracht van binnen naar buiten gericht.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Als een vat onderdruk heeft, wat zal er gebeuren zodra je er een klein gaatje in prikt?',
                options: [
                    'Er zal gas uit het vat naar buiten spuiten.',
                    'Buitenlucht zal het vat in stromen totdat de druk gelijk is aan de atmosferische druk.',
                    'Er gebeurt helemaal niets.',
                    'Het vat zal onmiddellijk ontploffen.'
                ],
                correct: 1,
                explanation: 'Bij onderdruk is de druk binnenin lager dan de omringende luchtdruk. Lucht stroomt van hoge naar lage druk, dus de buitenlucht dringt naar binnen.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een compressor toont een manometeraanwijzing van 6,0 bar. Wat is de werkelijke absolute druk in het vat als de atmosferische druk 1,0 bar is?',
                options: [
                    '5,0 bar',
                    '6,0 bar',
                    '7,0 bar (want p_abs = p_over + p_atm = 6,0 + 1,0 bar)',
                    '60 bar'
                ],
                correct: 2,
                explanation: 'Een technische manometer geeft de overdruk aan. De absolute druk is altijd de overdruk plus de heersende atmosferische druk: 6,0 + 1,0 = 7,0 bar.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Bij een open U-buismanometer staat de vloeistof in het vatbeen 8 cm hoger dan in het open been. Welke toestand heerst er in het vat?',
                options: [
                    'Er heerst overdruk in het vat.',
                    'Er heerst onderdruk in het vat (de atmosferische druk duwt harder).',
                    'Er heerst atmosferische normdruk.',
                    'Het vat is volledig gevuld met vloeistof.'
                ],
                correct: 1,
                explanation: 'Omdat de vloeistof aan de vatkant omhoog geduwd wordt, is de kracht van de atmosferische druk op het open been groter dan de gasdruk in het vat: er is ONDERDRUK.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Waarom wordt een pakje gemalen koffie in de winkel keihard vacuüm verpakt en sist het wanneer je het openknipt?',
                options: [
                    'Omdat er stikstofgas onder hoge overdruk in is gepompt.',
                    'Omdat de lucht eruit gezogen is (onderdruk); de buitenluchtdruk perst de verpakking strak om de koffie, en bij openknippen stroomt lucht naar binnen.',
                    'Omdat koffiebonen uitzetten in plastic.',
                    'Omdat de verpakking magnetisch geladen is.'
                ],
                correct: 1,
                explanation: 'In het pak heerst onderdruk. De atmosferische druk duwt het pakje samen tot een hard blok. Bij openknippen sist de lucht naar binnen door het drukverschil.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Redeneervraag & Toepassing',
                description: 'Leg uit hoe het menselijk ademhalingsstelsel gebruikmaakt van over- en onderdruk om lucht in en uit de longen te laten stromen.'
            }
        ]
    }
}
