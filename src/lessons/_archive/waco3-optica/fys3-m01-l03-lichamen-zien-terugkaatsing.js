/**
 * Lichamen Zien & de Terugkaatsingswet - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 2: Zien door weerkaatsing (Les 1/4)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 24-33)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l03-lichamen-zien-terugkaatsing',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Lichamen Zien & de Terugkaatsingswet',
    description: 'Het mechanisme waarmee ons oog donkere lichamen waarneemt via weerkaatsing, de geometrie van het spiegeloppervlak (normaal n, invalspunt I) en de twee terugkaatsingswetten (i = t).',

    config: {
        groenCode: 'F3M01L03',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 24-33)'
    },

    goals: [
        'Ik kan verklaren hoe het oog donkere lichamen waarneemt doordat zij licht van een bron absorberen en weerkaatsen naar de pupil.',
        'Ik kan de meetkundige elementen van een spiegeling benoemen en tekenen: spiegelend vlak, invalspunt I, normaal n, invallende straal en teruggekaatste straal.',
        'Ik kan de twee terugkaatsingswetten formuleren: de stralen liggen in één vlak en de invalshoek is gelijk aan de terugkaatsingshoek (\\( \\hat{i} = \\hat{t} \\)).',
        'Ik kan hoekberekeningen uitvoeren en vermijden dat de hoek met de spiegel wordt verward met de hoek met de normaal.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 2: Zien door weerkaatsing (p. 24-33)',
        instruction: '<p>Voer in je leerwerkboek op <strong>pagina 29-30</strong> het experiment uit met de optische schijf, de vlakke spiegel en de laserstraal. Los vervolgens in het werkboek op <strong>pagina 31-33 oefeningen 1, 2, 3 en 6</strong> op.</p>',
        formulaHint: 'Terugkaatsingswet: \\( \\hat{i} = \\hat{t} \\). Hoek met spiegel: \\( \\alpha + \\hat{i} = 90^\\circ \\Rightarrow \\hat{i} = 90^\\circ - \\alpha \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over lichtbronnen, donkere lichamen en rechtlijnige lichtstralen.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & De Laserstraal',
                    description: 'Waarom zie je een laserstraal in zuivere lucht niet, maar wel als je krijtstof in de kamer blaast?',
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
                    title: 'Lichamen Zien & Terugkaatsing',
                    description: 'Oogwaarneming, normaal n, de twee terugkaatsingswetten en hoekberekeningen.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 1 t.e.m. 6 (leerwerkboek p. 31-33).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: de terugkaatsingswet',
                    description: 'Onderzoek de invalshoek en terugkaatsingshoek op de optische schijf.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Hoekberekeningen & Reflectie Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Terugkaatsingswetten',
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
                    description: 'De vuistregels van spiegeling en vooruitblik naar diffuse weerkaatsing in les 4.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de terugkaatsingswet en straalconstructies.',
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
            title: 'Hoekberekeningen bij Terugkaatsing',
            instruction: 'Koppel de hoek met de spiegel aan de resulterende invalshoek en totale hoekverdraaiing.',
            pairs: [
                { term: 'Straal maakt hoek van 30° met de spiegel', definition: 'Invalshoek i = 60°; terugkaatsingshoek t = 60°; hoek tussen stralen = 120°' },
                { term: 'Straal maakt hoek van 45° met de spiegel', definition: 'Invalshoek i = 45°; terugkaatsingshoek t = 45°; stralen staan loodrecht (90°)' },
                { term: 'Straal valt loodrecht in langs de normaal', definition: 'Invalshoek i = 0°; terugkaatsingshoek t = 0°; straal keert op zichzelf terug' },
                { term: 'Straal scheert rakelings over de spiegel (90°)', definition: 'Invalshoek i = 90°; terugkaatsingshoek t = 90°; geen feitelijke reflectie' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Terugkaatsingswet (WACO 3)',
            questions: [
                {
                    q: 'Een lichtstraal valt in op een vlakke spiegel. De hoek tussen de invallende straal en het spiegeloppervlak bedraagt 35°. Hoe groot is de terugkaatsingshoek t?',
                    a: [
                        '55° (want de normaal staat loodrecht op de spiegel, dus i = 90° - 35° = 55° en t = i = 55°)',
                        '35°',
                        '70°',
                        '110°'
                    ],
                    c: 0
                },
                {
                    q: 'De hoek tussen de invallende lichtstraal en de teruggekaatste lichtstraal bedraagt 80°. Hoe groot is de invalshoek i?',
                    a: [
                        '40° (want i + t = 80° en omdat i = t, geldt 2 · i = 80° ⇒ i = 40°)',
                        '80°',
                        '20°',
                        '50°'
                    ],
                    c: 0
                },
                {
                    q: 'Wat zegt de EERSTE terugkaatsingswet van de optica?',
                    a: [
                        'De invallende straal, de normaal en de teruggekaatste straal liggen in één en hetzelfde vlak.',
                        'Licht plant zich altijd rechtlijnig voort.',
                        'De terugkaatsingshoek is altijd groter dan de invalshoek.',
                        'Spiegels absorberen al het licht.'
                    ],
                    c: 0
                },
                {
                    q: 'Wat gebeurt er met een lichtstraal die loodrecht op een vlakke spiegel invalt?',
                    a: [
                        'De straal valt in met hoek i = 0° en kaatst langs exact dezelfde lijn terug (t = 0°).',
                        'De straal kaatst terug onder een hoek van 90° over het spiegeloppervlak.',
                        'De straal wordt voor 100% geabsorbeerd door het glas.',
                        'De straal splitst zich in twee stralen.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Zien door weerkaatsing',
            subtitle: 'Normaal, invalshoek en de terugkaatsingswet (WACO 3 p. 24-33)',
            badge: 'Fysica 3 - Les 3',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Uitleggen hoe het oog donkere lichamen ziet via weerkaatst licht.' },
                { icon: 'function', text: 'De meetkundige elementen (invalspunt I, normaal n, invallende en teruggekaatste straal) tekenen.' },
                { icon: 'function', text: 'De twee terugkaatsingswetten toepassen (in één vlak en i = t).' },
                { icon: 'function', text: 'Hoekberekeningen correct uitvoeren t.o.v. de normaal n.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: De Onzichtbare Laserstraal',
            question: 'In sciencefictionfilms zie je laserstralen altijd helder door de lucht flitsen. In werkelijkheid zie je een laserstraal in een schone kamer helemaal niet; je ziet enkel een rood stipje op de muur! Pas als je krijtstof of nevel in de lucht blaast, wordt de straal zichtbaar. Waarom?',
            hint: 'Hoe kan licht vanuit een lichtstraal jouw oogpupil bereiken?',
            revealText: 'Licht plant zich rechtlijnig voort. Als de laserstraal rechtdoor naar de muur schijnt, komt er géén enkel lichtdeeltje in jouw oog terecht. Zodra je krijtstof vernevelt, botst het laserlicht op de stofdeeltjes. Die weerkaatsen het licht in alle richtingen, waardoor een deel in je oog valt en de straal zichtbaar wordt!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Hoe Ziet het Oog?',
            items: [
                { label: 'Receptor orgaan', value: 'Het oog is een lichtontvanger: we zien een voorwerp pas als er licht vanuit dat voorwerp op ons netvlies valt.' },
                { label: 'Lichtbronnen zien', value: 'Zenden zelf licht uit dat rechtstreeks het oog binnendringt (zon, lamp, kaars).' },
                { label: 'Donkere lichamen zien', value: 'Zenden zelf geen licht uit. Ze moeten worden beschenen door een lichtbron en dat licht weerkaatsen naar ons oog.' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'properties',
            title: 'Meetkundige Begrippen bij Spiegeling (WACO 3 p. 29)',
            items: [
                { label: 'Spiegelend vlak', value: 'Het vlakke, gladde oppervlak dat de lichtstralen terugkaatst.' },
                { label: 'Invalspunt I', value: 'Het punt waar de invallende lichtstraal het spiegeloppervlak raakt.' },
                { label: 'Normaal n', value: 'De loodlijn op het spiegeloppervlak in het invalspunt I (maakt een hoek van 90° met de spiegel!).' },
                { label: 'Invallende straal', value: 'De lichtstraal die naar de spiegel toe beweegt (pijl naar I gericht).' },
                { label: 'Teruggekaatste straal', value: 'De lichtstraal die na reflectie van de spiegel weg beweegt (pijl weg van I).' }
            ]
        },
        {
            layout: 'definition',
            term: 'De Twee Terugkaatsingswetten',
            definition: '1e Wet: De invallende straal, de normaal n en de teruggekaatste straal liggen in één en hetzelfde vlak (het invalsvlak).\\n\\n2e Wet: De terugkaatsingshoek \\( \\hat{t} \\) is gelijk aan de invalshoek \\( \\hat{i} \\): \\( \\hat{i} = \\hat{t} \\).'
        },
        {
            layout: 'properties',
            title: 'Klassieke Valkuil: De Hoek met de Normaal',
            items: [
                { label: 'Veelgemaakte FOUT', value: 'De hoek tussen de lichtstraal en het spiegelvlak meten en die "invalshoek" noemen.' },
                { label: 'De Wetenschappelijke REGEL', value: 'Invalshoek i en terugkaatsingshoek t worden ALTIJD gemeten ten opzichte van de NORMAAL n!' },
                { label: 'Omrekenformule', value: 'Als de hoek met de spiegel α is, dan is de invalshoek: i = 90° - α.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld: Spiegelhoek van 30° (WACO 3 Oef. 3 p. 32)',
            problem: 'Een lichtstraal valt in op een vlakke spiegel en maakt een hoek \\( \\alpha = 30^\\circ \\) met het spiegeloppervlak.',
            steps: [
                { label: 'Gegeven', content: 'Een lichtstraal valt in op een vlakke spiegel en maakt een hoek \\( \\alpha = 30^\\circ \\) met het spiegeloppervlak.' },
                { label: 'Gevraagd', content: 'Invalshoek \\( \\hat{i} \\), terugkaatsingshoek \\( \\hat{t} \\) en de totale hoek tussen beide stralen.' },
                { label: 'Stap 1: Invalshoek i', content: '\\( \\hat{i} = 90^\\circ - \\alpha = 90^\\circ - 30^\\circ = 60^\\circ \\)' },
                { label: 'Stap 2: Terugkaatsingshoek t', content: 'Volgens de 2e terugkaatsingswet is \\( \\hat{t} = \\hat{i} = 60^\\circ \\)' },
                { label: 'Stap 3: Hoek tussen de stralen', content: '\\( \\hat{i} + \\hat{t} = 60^\\circ + 60^\\circ = 120^\\circ \\)' },
                { label: 'Antwoord', content: 'De invalshoek is 60°, de terugkaatsingshoek is 60° en de hoek tussen beide stralen is 120°.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Bijzonder Geval: Loodrechte Inval',
            problem: 'Een lichtstraal valt loodrecht op het spiegeloppervlak in (recht langs de normaal \\( n \\)).',
            steps: [
                { label: 'Situatie', content: 'Een lichtstraal valt loodrecht op het spiegeloppervlak in (recht langs de normaal \\( n \\)).' },
                { label: 'Invalshoek bepalen', content: 'Omdat de straal samenvalt met de normaal, is de hoek met de normaal \\( \\hat{i} = 0^\\circ \\).' },
                { label: 'Terugkaatsingshoek', content: '\\( \\hat{t} = \\hat{i} = 0^\\circ \\).' },
                { label: 'Gevolg', content: 'De lichtstraal kaatst exact langs dezelfde rechte lijn terug in tegengestelde richting (retroreflectie bij loodrechte inval).' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 2 p. 31)',
            question: 'De hoek tussen de invallende lichtstraal en de teruggekaatste lichtstraal bedraagt precies 70°. Hoe groot is de hoek tussen de invallende straal en het spiegelend oppervlak?',
            options: [
                { id: 'A', text: '35°', correct: false },
                { id: 'B', text: '55° (want i = 70° / 2 = 35°; hoek met spiegel = 90° - 35° = 55°)', correct: true },
                { id: 'C', text: '70°', correct: false },
                { id: 'D', text: '20°', correct: false }
            ],
            explanation: 'Omdat i = t is i + t = 2·i = 70° ⇒ i = 35°. De normaal staat loodrecht op de spiegel (90°). De hoek tussen de straal en het spiegelvlak is dus 90° - 35° = 55°!'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Terugkaatsing',
            items: [
                'We zien donkere lichamen doordat ze licht weerkaatsen naar onze ogen.',
                'Normaal n is de loodlijn op het spiegelvlak in het invalspunt I.',
                'Invalshoek i en terugkaatsingshoek t meet je ALTIJD t.o.v. de normaal: i = t.',
                'Invallende straal, normaal en teruggekaatste straal liggen in één vlak.',
                'Bij loodrechte inval is i = 0° en kaatst de straal over zichzelf terug.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 4!',
            subtitle: 'In les 4 ontdekken we waarom een spiegel een scherp beeld vormt, maar een wit blad papier of een witte muur het licht diffuus verstrooit.',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '2 Weerkaatsing' },
                { label: 'Lesuur', value: '3 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Hoe ontstaat het beeld op het netvlies van ons oog wanneer we naar een houten tafel kijken?',
                options: [
                    'Licht van een lamp valt op de tafel, wordt gedeeltelijk weerkaatst en dat weerkaatste licht valt in ons oog.',
                    'Ons oog zendt actieve zichtstralen uit die de tafel aftasten.',
                    'De tafel produceert zelf houtlicht.',
                    'Door warmtestraling die de pupil binnendringt.'
                ],
                correct: 0,
                explanation: 'We zien donkere lichamen pas als zij licht van een externe lichtbron absorberen en verstrooien/weerkaatsen naar onze ogen.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Wat is de NORMAAL (n) in de geometrische optica?',
                options: [
                    'De rechte lijn die loodrecht (onder 90°) op het spiegeloppervlak staat in het invalspunt.',
                    'De lijn die evenwijdig loopt aan de spiegel.',
                    'De gemiddelde baan van alle lichtstralen.',
                    'De achterkant van de glazen spiegel.'
                ],
                correct: 0,
                explanation: 'De normaal is de wiskundige loodlijn op het spiegelend vlak ter hoogte van het punt waar de lichtstraal invalt.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Tussen welke twee lijnen wordt de INVALSHOEK (i) volgens de fysische definitie gemeten?',
                options: [
                    'Tussen de invallende lichtstraal en de normaal n.',
                    'Tussen de invallende lichtstraal en het spiegeloppervlak.',
                    'Tussen de invallende en de teruggekaatste straal.',
                    'Tussen de normaal en het oog van de waarnemer.'
                ],
                correct: 0,
                explanation: 'In de optica worden alle hoeken (invalshoek, terugkaatsingshoek, brekingshoek) altijd gemeten ten opzichte van de normaal n.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Hoe luidt de beroemde tweede terugkaatsingswet?',
                options: [
                    'De terugkaatsingshoek is gelijk aan de invalshoek: i = t.',
                    'De terugkaatsingshoek is altijd tweemaal zo groot als de invalshoek.',
                    'De invalshoek plus de terugkaatsingshoek is altijd 90°.',
                    'Licht kaatst willekeurig alle kanten op.'
                ],
                correct: 0,
                explanation: 'De tweede terugkaatsingswet stelt dat de hoek van inval exact gelijk is aan de hoek van terugkaatsing: i = t.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een lichtstraal valt in op een spiegel met een invalshoek van 25° (t.o.v. de normaal). Hoe groot is de hoek tussen de invallende en teruggekaatste straal?',
                options: [
                    '50° (want i + t = 25° + 25° = 50°)',
                    '25°',
                    '65°',
                    '130°'
                ],
                correct: 0,
                explanation: 'Omdat i = t = 25°, is de totale hoek tussen de invallende en teruggekaatste lichtstraal gelijk aan 25° + 25° = 50°.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Als een lichtstraal een hoek van 50° maakt met het spiegeloppervlak, hoe groot is dan de terugkaatsingshoek t?',
                options: [
                    '40° (want i = 90° - 50° = 40° en t = i = 40°)',
                    '50°',
                    '80°',
                    '100°'
                ],
                correct: 0,
                explanation: 'De normaal staat onder 90° op de spiegel. De invalshoek is dus 90° - 50° = 40°. Volgens de reflectiewet is t = i = 40°.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Wat is de waarde van de invalshoek i wanneer een lichtstraal loodrecht op een spiegel invalt?',
                options: [
                    'i = 0° (de straal valt samen met de normaal)',
                    'i = 90°',
                    'i = 180°',
                    'i = 45°'
                ],
                correct: 0,
                explanation: 'Omdat de normaal loodrecht op de spiegel staat, maakt een loodrecht invallende straal een hoek van 0° met de normaal.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Constructie & Uitleg',
                description: 'Leg uit waarom een periscoop (kijkbuis van een onderzeeër) twee vlakke spiegels bevat die elk onder een hoek van 45° geplaatst zijn om licht over een verticale afstand van 2 meter naar beneden te leiden.'
            }
        ]
    }
}
