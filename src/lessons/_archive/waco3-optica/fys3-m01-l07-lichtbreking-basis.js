/**
 * Lichtbreking aan een Scheidingsoppervlak - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 3: Lichtbreking (Les 1/2)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 49-55)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l07-lichtbreking-basis',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Lichtbreking aan een Scheidingsoppervlak',
    description: 'De oorzaak van lichtbreking door snelheidsverandering, breking naar de normaal (naar dichtere stof) en weg van de normaal (naar minder dichte stof), en alledaagse verschijnselen zoals het geknikte rietje.',

    config: {
        groenCode: 'F3M01L07',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 49-55)'
    },

    goals: [
        'Ik kan verklaren dat lichtbreking (refractie) de richtingsverandering is van een lichtstraal die schuin invalt op het scheidingsoppervlak tussen twee stoffen met verschillende lichtsnelheden.',
        'Ik kan de meetkundige elementen tekenen: invallende straal, gebroken straal, normaal n, invalshoek i en brekingshoek r.',
        'Ik kan voorspellen en tekenen dat een straal naar de normaal breekt bij overgang naar een optisch dichtere stof (v daalt ⇒ r < i).',
        'Ik kan voorspellen en tekenen dat een straal weg van de normaal breekt bij overgang naar een optisch minder dichte stof (v stijgt ⇒ r > i).',
        'Ik kan optische illusies verklaren zoals het geknikte rietje in water en de munt die omhoog lijkt te komen in een kopje water.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 3: Lichtbreking (p. 49-55)',
        instruction: '<p>Voer in je leerwerkboek op <strong>pagina 49</strong> de ontdekproef uit met het potlood in het glas water en de munt in de koffiekop. Maak vervolgens op <strong>pagina 52-55 oefeningen 1, 2, 3 en 5</strong>.</p>',
        formulaHint: 'Vuistregel: Sneller naar trager (lucht → water/glas) ⇒ \\( \\hat{r} < \\hat{i} \\) (naar de normaal). Trager naar sneller (water/glas → lucht) ⇒ \\( \\hat{r} > \\hat{i} \\) (weg van de normaal).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over optische middenstoffen, lichtsnelheid en de normaal.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & De Munt in de Beker',
                    description: 'Waarom wordt een onzichtbare munt op de bodem van een kopje plotseling zichtbaar zodra je er water bij giet?',
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
                    title: 'Lichtbreking & De Brekingsregels',
                    description: 'Oorzaak van breking, lichtsnelheden, breking naar de normaal vs weg van de normaal en straalconstructies.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 1 t.e.m. 5 (leerwerkboek p. 52-55).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: lichtbreking',
                    description: 'Onderzoek breking naar de normaal en van de normaal weg via Snellius.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Lichtsnelheden & Middenstoffen Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Lichtbreking & Illusies',
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
                    description: 'De 2 hoofdregels van breking en vooruitblik naar totale weerkaatsing in les 8.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van brekingswetten en straalgedrag.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'opticsLab',
            defaultMode: 'breking'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Lichtsnelheid in Verschillende Middenstoffen',
            instruction: 'Koppel elke optische middenstof aan haar specifieke lichtsnelheid.',
            pairs: [
                { term: 'Vacuüm en lucht', definition: 'Ongeveer 300 000 km/s (3,00 · 10⁸ m/s, de absolute kosmische maximumsnelheid)' },
                { term: 'Water', definition: 'Ongeveer 225 000 km/s (2,25 · 10⁸ m/s; 25% trager dan in vacuüm)' },
                { term: 'Vensterglas', definition: 'Ongeveer 200 000 km/s (2,00 · 10⁸ m/s; 33% trager dan in vacuüm)' },
                { term: 'Diamant', definition: 'Slechts 124 000 km/s (1,24 · 10⁸ m/s; extreem trage voortplanting)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Lichtbreking & Natuurverschijnselen (WACO 3)',
            questions: [
                {
                    q: 'Wat is de diepere fysische oorzaak dat een lichtstraal van richting verandert als hij schuin van lucht in water valt?',
                    a: [
                        'Licht plant zich in water trager voort (225 000 km/s) dan in lucht (300 000 km/s); het golffront vertraagt schuin.',
                        'Watermoleculen trekken het licht met zwaartekracht naar beneden.',
                        'Omdat water elektrisch geladen is.',
                        'Omdat lucht warm is en water koud.'
                    ],
                    c: 0
                },
                {
                    q: 'Een lichtstraal valt schuin in vanuit water naar lucht onder een invalshoek i = 30°. Hoe verhoudt de brekingshoek r in de lucht zich tot i?',
                    a: [
                        'r > 30° (bij overgang van trager naar sneller breekt de straal WEG van de normaal).',
                        'r < 30° (de straal breekt naar de normaal).',
                        'r = 30° (er is geen verandering).',
                        'r = 0°.'
                    ],
                    c: 0
                },
                {
                    q: 'Een speervisser staat op de oever en ziet een vis zwemmen in helder water. Waar moet hij mikken om de vis te raken?',
                    a: [
                        'Iets ONDER de plaats waar hij de vis ziet, omdat door lichtbreking het virtuele beeld van de vis hoger in het water lijkt te liggen.',
                        'Exact op de plaats waar hij de vis ziet.',
                        'Iets boven de vis.',
                        'Recht omhoog.'
                    ],
                    c: 0
                },
                {
                    q: 'Wat gebeurt er als een laserstraal exact loodrecht (i = 0°) op een dikke glazen ruit invalt?',
                    a: [
                        'De straal plant zich ongebroken rechtdoor voort (r = 0°), maar zijn lichtsnelheid vertraagt in het glas naar circa 200 000 km/s.',
                        'De straal buigt 90 graden af.',
                        'De straal wordt volledig teruggekaatst.',
                        'De straal verandert in ultraviolet licht.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Lichtbreking aan een Scheidingsoppervlak',
            subtitle: 'Snelheidsverschil, brekingsregels en optische illusies (WACO 3 p. 49-55)',
            badge: 'Fysica 3 - Les 7',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Begrijpen wat lichtbreking (refractie) is en waarom het optreedt.' },
                { icon: 'function', text: 'De lichtsnelheden in verschillende optische middenstoffen vergelijken.' },
                { icon: 'function', text: 'De brekingsregel "naar de normaal toe" (naar dichtere stof) toepassen.' },
                { icon: 'function', text: 'De brekingsregel "weg van de normaal" (naar minder dichte stof) toepassen.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: De Munt in de Beker (WACO 3 p. 49)',
            question: 'Je legt een muntstuk op de bodem van een ondoorzichtige koffiemok. Je stapt achteruit tot de rand van de mok de munt net voor je oog verbergt. Zonder je hoofd te bewegen giet een klasgenoot voorzichtig water in de mok. Plotseling zie je de munt weer helder over de rand! Is de munt omhoog gedreven?',
            hint: 'Denk aan de lichtstralen die van de munt naar jouw oog reizen.',
            revealText: 'De munt ligt nog steeds roerloos op de bodem! Maar zodra de lichtstralen die van de munt vertrekken het wateroppervlak verlaten naar de lucht, breken ze WEG van de normaal. De lichtstralen buigen dus over de rand van de mok heen tot in jouw oogpupil. Je hersenen trekken die straal recht door, waardoor de bodem hoger lijkt te liggen!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Lichtsnelheid in Middenstoffen',
            items: [
                { label: 'In vacuüm en lucht', value: 'c = 3,00 · 10⁸ m/s (snelste medium; optisch minst dicht).' },
                { label: 'In water', value: 'v = 2,25 · 10⁸ m/s (het licht vertraagt met circa 25%).' },
                { label: 'In glas', value: 'v = 2,00 · 10⁸ m/s (het licht vertraagt met circa 33%).' },
                { label: 'In diamant', value: 'v = 1,24 · 10⁸ m/s (extreem optisch dicht medium).' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Lichtbreking (Refractie)',
            definition: 'Lichtbreking is de abrupte verandering van voortplantingsrichting die een lichtstraal ondergaat wanneer ze schuin invalt op het scheidingsoppervlak tussen twee verschillende transparante optische middenstoffen, veroorzaakt door het verschil in lichtsnelheid.'
        },
        {
            layout: 'properties',
            title: 'Geval 1: Naar een Optisch Dichtere Stof',
            items: [
                { label: 'Overgang', value: 'Van optisch minder dicht naar optisch dichter (bv. van lucht naar water of glas: v₁ > v₂).' },
                { label: 'Het mechanisme', value: 'Het licht wordt vertraagd zodra het de nieuwe middenstof binnendringt.' },
                { label: 'De Brekingsregel', value: 'De lichtstraal breekt NAAR DE NORMAAL TOE: de brekingshoek r is kleiner dan de invalshoek i: r < i!' }
            ]
        },
        {
            layout: 'properties',
            title: 'Geval 2: Naar een Optisch Minder Dichte Stof',
            items: [
                { label: 'Overgang', value: 'Van optisch dichter naar optisch minder dicht (bv. van water of glas naar lucht: v₁ < v₂).' },
                { label: 'Het mechanisme', value: 'Het licht versnelt zodra het uittreedt in de ijlere middenstof.' },
                { label: 'De Brekingsregel', value: 'De lichtstraal breekt WEG VAN DE NORMAAL: de brekingshoek r is groter dan de invalshoek i: r > i!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Uitzondering: Loodrechte Inval (i = 0°)',
            problem: 'Een lichtstraal valt onder een rechte hoek van 90° op het wateroppervlak in.',
            steps: [
                { label: 'Situatie', content: 'Een lichtstraal valt onder een rechte hoek van 90° op het wateroppervlak in.' },
                { label: 'Invalshoek', content: 'Omdat de straal samenvalt met de normaal, is \\( \\hat{i} = 0^\\circ \\).' },
                { label: 'Brekingshoek', content: 'De straal breekt NIET van richting: \\( \\hat{r} = 0^\\circ \\). De straal gaat kaarsrecht door!' },
                { label: 'Verandert er dan niets?', content: 'Jawel! Hoewel de richting kaarsrecht blijft, vertraagt de lichtsnelheid wel van \\( 300\\,000\\text{ km/s} \\) naar \\( 225\\,000\\text{ km/s} \\).' }
            ]
        },
        {
            layout: 'properties',
            title: 'Alledaagse Fenomenen door Breking (WACO 3 p. 50)',
            items: [
                { label: 'Het geknikte rietje', value: 'Een rietje in een glas water lijkt op de waterspiegel precies doorgebroken of verschoven.' },
                { label: 'Schijnbare diepte', value: 'De bodem van een helder zwembad lijkt altijd veel minder diep te liggen dan in werkelijkheid (gevaarlijk voor duikers!).' },
                { label: 'Speervissen', value: 'Omdat de vis door breking hoger lijkt te zwemmen dan in werkelijkheid, moet de visser altijd onder de waargenomen vis mikken.' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 3 p. 53)',
            question: 'Een lichtstraal reist door een glazen prisma (optisch dicht) en treedt aan de schuine zijde uit naar de lucht (optisch minder dicht). Hoe gedraagt de straal zich bij het verlaten van het glas?',
            options: [
                { id: 'A', text: 'De straal breekt naar de normaal toe (r < i).', correct: false },
                { id: 'B', text: 'De straal breekt weg van de normaal (r > i).', correct: true },
                { id: 'C', text: 'De straal buigt in een cirkel.', correct: false },
                { id: 'D', text: 'De straal stopt met bewegen.', correct: false }
            ],
            explanation: 'Bij de overgang van glas naar lucht gaat het licht van een trager medium (200 000 km/s) naar een sneller medium (300 000 km/s). Volgens de tweede brekingsregel breekt de lichtstraal dan ALTIJD WEG van de normaal (r > i).'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Lichtbreking',
            items: [
                'Lichtbreking ontstaat door een verschil in lichtsnelheid tussen optische middenstoffen.',
                'Overgang naar optisch dichter (trager, bv. lucht → water): straal breekt NAAR de normaal (r < i).',
                'Overgang naar optisch minder dicht (sneller, bv. water → lucht): straal breekt WEG van de normaal (r > i).',
                'Bij loodrechte inval (i = 0°) is er geen richtingsverandering (r = 0°), wel snelheidsverandering.',
                'Breking veroorzaakt optische illusies (geknikt rietje, schijnbare diepte van zwembaden).'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 8!',
            subtitle: 'In les 8 onderzoeken we wat er gebeurt als je de invalshoek bij overgang naar een minder dichte stof steeds groter maakt: totale weerkaatsing en glasvezel.',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '3 Breking' },
                { label: 'Lesuur', value: '7 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat is de snelheid van het licht in water (afgerond)?',
                options: [
                    'Ongeveer 225 000 km/s (2,25 · 10⁸ m/s)',
                    'Ongeveer 300 000 km/s',
                    'Ongeveer 100 000 km/s',
                    '1 500 m/s'
                ],
                correct: 0,
                explanation: 'In water is de lichtsnelheid circa 225 000 km/s, wat trager is dan de 300 000 km/s in lucht of vacuüm.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Wat is de fysische oorzaak van lichtbreking?',
                options: [
                    'Het verschil in lichtsnelheid tussen de twee verschillende optische middenstoffen.',
                    'De chemische reactie tussen licht en watermoleculen.',
                    'De aantrekkingskracht van de aarde op fotonen.',
                    'De temperatuur van de spiegel.'
                ],
                correct: 0,
                explanation: 'Omdat het golffront aan één kant eerder vertraagt of versnelt dan aan de andere kant, zwenkt de lichtstraal van richting.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Tussen welke twee lijnen wordt de BREKINGSHOEK (r) gemeten?',
                options: [
                    'Tussen de gebroken lichtstraal en de normaal n in de tweede middenstof.',
                    'Tussen de gebroken lichtstraal en het grensvlak.',
                    'Tussen de invallende en de gebroken lichtstraal.',
                    'Tussen de normaal en de spiegel.'
                ],
                correct: 0,
                explanation: 'Net als de invalshoek wordt ook de brekingshoek r altijd ten opzichte van de normaal n gemeten.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wat gebeurt er met de richting van een lichtstraal die schuin invalt van lucht naar glas?',
                options: [
                    'De straal breekt NAAR de normaal toe (de brekingshoek r is kleiner dan de invalshoek i).',
                    'De straal breekt weg van de normaal (r > i).',
                    'De straal kaatst altijd 100% terug.',
                    'De straal gaat ongebroken rechtdoor.'
                ],
                correct: 0,
                explanation: 'Omdat glas optisch dichter is dan lucht (het licht vertraagt), buigt de straal naar de normaal toe: r < i.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een lichtstraal reist onder een hoek van 40° door glas en treedt uit naar de lucht. Welke waarde voor de brekingshoek r in de lucht is fysisch mogelijk?',
                options: [
                    'r = 62° (want r > i bij overgang van glas naar lucht)',
                    'r = 25°',
                    'r = 40°',
                    'r = 0°'
                ],
                correct: 0,
                explanation: 'Van een optisch dichtere stof (glas) naar een minder dichte stof (lucht) breekt het licht WEG van de normaal: de brekingshoek moet groter zijn dan 40°.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Wat gebeurt er met een lichtstraal die loodrecht (i = 0°) van lucht in water valt?',
                options: [
                    'De straal gaat ongebroken rechtdoor (r = 0°), maar haar snelheid vertraagt.',
                    'De straal breekt onder een hoek van 45° af.',
                    'De straal kaatst loodrecht terug in de lucht.',
                    'De straal splitst in 7 kleuren.'
                ],
                correct: 0,
                explanation: 'Bij loodrechte inval is er geen richtingsverandering (r = 0°), maar de lichtsnelheid vertraagt wel van 300 000 km/s naar 225 000 km/s.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Waarom lijkt een rietje in een glas water geknikt te zijn op de grens tussen water en lucht?',
                options: [
                    'Omdat de lichtstralen die vanaf het ondergedompelde rietje vertrekken aan het wateroppervlak breken weg van de normaal, waardoor ons brein het rietje op een virtueel verschoven positie ziet.',
                    'Omdat het glas het rietje fysiek krombuigt.',
                    'Omdat watermoleculen het rietje samendrukken.',
                    'Omdat water het rietje oplost.'
                ],
                correct: 0,
                explanation: 'Lichtstralen vanuit het water breken aan het oppervlak weg van de normaal. Onze hersenen projecteren die stralen rechtdoor, waardoor het onderwaterdeel verschoven lijkt.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Praktijktoepassing & Speervissen',
                description: 'Leg uit waarom een inheemse speervisser die vanaf een boot een vis in helder water ziet zwemmen, bewust een stukje ONDER de waargenomen vis moet mikken om raak te schieten. Maak in gedachten de stralengang.'
            }
        ]
    }
}
