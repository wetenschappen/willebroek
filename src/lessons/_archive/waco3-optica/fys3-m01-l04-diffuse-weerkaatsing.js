/**
 * Regelmatige versus Diffuse Weerkaatsing - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 2: Zien door weerkaatsing (Les 2/4)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 34-37)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l04-diffuse-weerkaatsing',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Regelmatige versus Diffuse Weerkaatsing',
    description: 'Het fysische onderscheid tussen spiegelende reflectie (glad oppervlak, evenwijdige normalen) en diffuse verstrooiing (ruw oppervlak, alzijdige zichtbaarheid) en toepassingen zoals het bioscoopscherm en nat asfalt.',

    config: {
        groenCode: 'F3M01L04',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 34-37)'
    },

    goals: [
        'Ik kan het fysische verschil toelichten tussen regelmatige (spiegelende) weerkaatsing en diffuse weerkaatsing (verstrooiing).',
        'Ik kan verklaren dat bij regelmatige weerkaatsing een evenwijdige bundel evenwijdig blijft (beeldvorming), terwijl bij diffuse weerkaatsing het licht in alle richtingen verstrooid wordt.',
        'Ik begrijp dat de terugkaatsingswet i = t óók geldt bij diffuse weerkaatsing, maar dan ten opzichte van de plaatselijke normaal in elk microscopisch oneffen puntje.',
        'Ik kan alledaagse verschijnselen analyseren (het matte bioscoopscherm, verblinding op nat asfalt bij nacht, matte verf op klasmuren).'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 2: Regelmatige & Diffuse Weerkaatsing (p. 34-37)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 34-35</strong> de microscopische structuur van papier en spiegels. Maak in het werkboek op <strong>pagina 36-37 oefeningen 7, 8, 9 en 10</strong>.</p>',
        formulaHint: 'Bij beide reflectievormen geldt strikt: \\( \\hat{i} = \\hat{t} \\). Bij een ruw oppervlak varieert de oriëntatie van de normaal \\( n \\) echter van punt tot punt.'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over de normaal, invalshoek en de wet i = t.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering: Het Bioscoopscherm',
                    description: 'Waarom is een bioscoopscherm mat wit en hangt er geen gigantische spiegel vooraan in de zaal?',
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
                    title: 'Regelmatig vs Diffuus & Nat Asfalt',
                    description: 'Evenwijdige normalen vs willekeurige normalen, microscopische ruwheid en natte wegen bij nacht.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 7 t.e.m. 10 (leerwerkboek p. 36-37).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: regelmatige vs diffuse weerkaatsing',
                    description: 'Verken het effect van oppervlakte en normaal op de terugkaatsing.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Oppervlaktestructuren Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Reflectievormen & Verkeersveiligheid',
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
                    description: 'Vergelijking van spiegelend en diffuus en vooruitblik naar het beeld in de vlakke spiegel.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van regelmatige en diffuse weerkaatsing.',
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
            title: 'Oppervlakten en Hun Reflectiegedrag',
            instruction: 'Koppel elk materiaal aan zijn optische oppervlaktestructuur.',
            pairs: [
                { term: 'Gepolijste zilveren lepel', definition: 'Spiegelend (regelmatig): je ziet een vervormd spiegelbeeld van je gezicht' },
                { term: 'Wit printpapier', definition: 'Diffuus: lijkt glad voor de vinger, maar is microscopisch een berglandschap van vezels' },
                { term: 'Rimpelloos meer bij windstilte', definition: 'Spiegelend: bomen en bergen worden haarscherp weerspiegeld op het water' },
                { term: 'Matte muurverf in de woonkamer', definition: 'Diffuus: voorkomt hinderlijke weerkaatsingen van zonlicht en lampen' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Diffuse Weerkaatsing & Verkeersveiligheid (WACO 3)',
            questions: [
                {
                    q: 'Geldt de terugkaatsingswet i = t wanneer een lichtstraal weerkaatst op een ruw wit laken?',
                    a: [
                        'Ja, de wet geldt op elk microscopisch puntje ten opzichte van de plaatselijke normaal in dat punt.',
                        'Nee, bij diffuse weerkaatsing verliezen de natuurwetten hun geldigheid.',
                        'Alleen als het laken van zijde gemaakt is.',
                        'Alleen bij ultraviolet licht.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom ziet een toeschouwer op rij 1 links in de bioscoopzaal exact hetzelfde filmbeeld als iemand op rij 20 rechts?',
                    a: [
                        'Omdat het matte bioscoopscherm het projectielicht diffuus in alle mogelijke richtingen verstrooit.',
                        'Omdat het bioscoopscherm zelf een actieve lichtbron is zoals een tv.',
                        'Omdat de projector 100 verschillende stralenbundels tegelijk uitzendt.',
                        'Omdat de zaal donker is.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom is autorijden op een nat geasfalteerd wegdek in het donker veel gevaarlijker dan op een droge weg?',
                    a: [
                        'Het water vult de microscopische poriën van het asfalt op, waardoor het wegdek verandert in een vlakke spiegel die tegenliggers verblindt en het eigen zicht op de weg belemmert.',
                        'Omdat water koplampen afbuigt naar de hemel.',
                        'Omdat koplampen doven in water.',
                        'Omdat de lichtsnelheid op nat asfalt tot nul vertraagt.'
                    ],
                    c: 0
                },
                {
                    q: 'Wat is de oorzaak dat een invallende evenwijdige lichtbundel na diffuse weerkaatsing alle kanten op waaiert?',
                    a: [
                        'Doordat het oppervlak oneffen is, staan de normalen in de verschillende invalspunten niet evenwijdig aan elkaar.',
                        'Doordat de fotonen met elkaar in botsing komen.',
                        'Doordat de invalshoek groter is dan 90°.',
                        'Doordat ruwe stoffen het licht doen smelten.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Regelmatige versus Diffuse Weerkaatsing',
            subtitle: 'Spiegelend oppervlak versus verstrooiing (WACO 3 p. 34-37)',
            badge: 'Fysica 3 - Les 4',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Het fysische verschil begrijpen tussen spiegelende en diffuse weerkaatsing.' },
                { icon: 'function', text: 'Verklaren waarom bij een ruw oppervlak de normalen niet evenwijdig lopen.' },
                { icon: 'function', text: 'Inzien dat de terugkaatsingswet i = t overal en altijd microscopisch geldig blijft.' },
                { icon: 'function', text: 'Toepassingen in verkeer (nat asfalt), architectuur (matte verf) en film (bioscoopscherm) verklaren.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Waarom Geen Spiegel in de Bioscoop?',
            question: 'Een filmprojector projecteert een prachtig beeld met felle kleuren. Waarom projecteert men de film op een mat wit linnen doek en niet op een gigantische glazen spiegel? Een spiegel weerkaatst toch veel meer licht?',
            hint: 'Bedenk waar het licht naartoe kaatst als een evenwijdige bundel op een spiegel valt.',
            revealText: 'Een spiegel weerkaatst alle lichtstralen volgens de wet i = t in één geconcentreerde richting! Alleen de toeschouwer die toevallig precies in die gereflecteerde bundel zit zou een oogverblindende witte lichtvlek zien, terwijl alle andere 300 toeschouwers in de zaal een pikzwart scherm zouden zien. Het matte doek verstrooit het licht diffuus naar álle zetels!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: De Terugkaatsingswet',
            items: [
                { label: 'De Wet', value: 'i = t (invalshoek is gelijk aan terugkaatsingshoek).' },
                { label: 'De Normaal n', value: 'Staat altijd loodrecht op het raakvlak van het oppervlak in het invalspunt.' },
                { label: 'Evenwijdige bundel', value: 'Alle invallende lichtstralen hebben dezelfde richting en dezelfde hoek.' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'properties',
            title: 'Regelmatige (Spiegelende) Weerkaatsing',
            items: [
                { label: 'Oppervlak', value: 'Volmaakt glad en gepolijst (glas, spiegel, chroom, stilstaand water).' },
                { label: 'De Normalen', value: 'Omdat het oppervlak kaarsrecht is, lopen de normalen in alle invalspunten perfect evenwijdig aan elkaar.' },
                { label: 'Bundelgedrag', value: 'Een invallende evenwijdige lichtbundel blijft na weerkaatsing een strakke evenwijdige bundel!' },
                { label: 'Waarneming', value: 'Vormt een scherp beeld (spiegelbeeld), maar veroorzaakt sterke verblinding als je recht in de bundel kijkt.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Diffuse Weerkaatsing (Verstrooiing)',
            items: [
                { label: 'Oppervlak', value: 'Ruw, oneffen of korrelig (papier, karton, textiel, hout, stenen muur, huid).' },
                { label: 'De Normalen', value: 'Door microscopische heuvels en dalen wijst de normaal in elk punt in een compleet andere richting!' },
                { label: 'Bundelgedrag', value: 'Een invallende evenwijdige bundel wordt in alle denkbare richtingen uit elkaar geslagen (verstrooid).' },
                { label: 'Waarneming', value: 'Geen spiegelbeeld; het voorwerp is gelijkmatig zichtbaar vanuit élke hoek in de kamer zonder verblinding.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Geldt de Wet i = t bij Diffuse Weerkaatsing?',
            problem: 'Geldt de Wet i = t bij Diffuse Weerkaatsing?',
            steps: [
                { label: 'De Grote Vraag', content: 'Als licht alle kanten op verstrooid wordt, is de wet \\( \\hat{i} = \\hat{t} \\) dan ongeldig geworden?' },
                { label: 'Microscopische Blik', content: 'Zoom 10 000 keer in op het papieroppervlak. Elk minuscuul stukje vezel is een plat vlakje met zijn eigen plaatselijke normaal \\( n \\).' },
                { label: 'De Natuurwet', content: 'Op elk afzonderlijk raakpuntje geldt nog steeds onverbiddelijk: \\( \\hat{i} = \\hat{t} \\)!' },
                { label: 'De Conclusie', content: 'Niet de fysische wet verandert, maar de oriëntatie van de normaal verandert willekeurig van punt tot punt.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Verkeersfysica: Nat Asfalt bij Nacht (WACO 3 p. 35)',
            items: [
                { label: 'Droge weg', value: 'Asfalt is grofkorrelig. Koplampen van je auto weerkaatsen diffuus in alle richtingen. Een deel van dat licht kaatst terug naar je ogen ⇒ je ziet de weg duidelijk.' },
                { label: 'Natte weg', value: 'Regenwater vult alle oneffenheden tussen de asfaltsteentjes op. Het wateroppervlak vormt een spiegelgladde laag!' },
                { label: 'Gevolg 1 (Verblinding)', value: 'Koplampen van tegenliggers spiegelen vooruit in jouw ogen: gevaarlijke verblinding.' },
                { label: 'Gevolg 2 (Zwart wegdek)', value: 'Jouw eigen koplampen spiegelen naar voren weg van de weg; er keert geen licht terug naar je ogen ⇒ de weg lijkt pikzwart.' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 8 p. 36)',
            question: 'Waarom kun je in een spiegel wél je eigen gezicht zien, maar op een wit blad printpapier (dat toch 80% van het licht weerkaatst) niet?',
            options: [
                { id: 'A', text: 'Omdat papier al het licht absorbeert en een spiegel niet.', correct: false },
                { id: 'B', text: 'Omdat de spiegel het licht regelmatig weerkaatst (beeldinformatie blijft intact), terwijl papier het licht diffuus verstrooit.', correct: true },
                { id: 'C', text: 'Omdat papier alleen geel licht weerkaatst.', correct: false },
                { id: 'D', text: 'Omdat een spiegel zelf licht produceert.', correct: false }
            ],
            explanation: 'Bij een spiegel blijven de stralen die van je neus of ogen vertrekken netjes geordend (evenwijdige normalen), waardoor een scherp beeld ontstaat. Papier weerkaatst wel licht, maar verstrooit de stralen kriskras door elkaar: alle beeldinformatie gaat verloren.'
        },
        {
            layout: 'properties',
            title: 'Waarom Zien we de Wereld Rondom Ons?',
            items: [
                { label: 'Dankzij diffuse reflectie', value: 'Als alle materie spiegelglad was, zouden we alleen verblindende lichtvlekken van lampen zien. Dankzij diffuse verstrooiing kunnen we tafels, borden, boeken en mensen vanuit elke positie comfortabel waarnemen.' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Regelmatig vs Diffuus',
            items: [
                'Regelmatige weerkaatsing: glad oppervlak, evenwijdige normalen, evenwijdige bundel blijft evenwijdig ⇒ vormt een spiegelbeeld.',
                'Diffuse weerkaatsing: ruw oppervlak, normalen wijzen alle kanten op, licht verstrooit in alle richtingen ⇒ voorwerp overal zichtbaar.',
                'De reflectiewet i = t geldt altijd en overal, ook op ruwe oppervlakken (punt per punt).',
                'Toepassingen: mat bioscoopscherm, nat wegdek, matte muurverf.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 5!',
            subtitle: 'In les 5 ontleden we de vijf exacte kenmerken van het spiegelbeeld bij een vlakke spiegel en construeren we virtuele beelden.',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '2 Weerkaatsing' },
                { label: 'Lesuur', value: '4 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat gebeurt er met een invallende evenwijdige lichtbundel bij REGELMATIGE weerkaatsing op een spiegel?',
                options: [
                    'De teruggekaatste lichtbundel is opnieuw evenwijdig.',
                    'De bundel wordt in alle richtingen verstrooid.',
                    'De bundel verandert in een convergerende lichtbundel.',
                    'Al het licht wordt geabsorbeerd en omgezet in warmte.'
                ],
                correct: 0,
                explanation: 'Bij een glad oppervlak lopen alle normalen evenwijdig; alle stralen vallen in met dezelfde hoek en kaatsen onder dezelfde hoek terug, waardoor de bundel evenwijdig blijft.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Waarom lopen de normalen bij een ruw oppervlak (zoals baksteen of papier) NIET evenwijdig aan elkaar?',
                options: [
                    'Omdat het oppervlak microscopisch oneffen is, waardoor het raakvlak op elk punt een andere hoek heeft.',
                    'Omdat de zwaartekracht op ruw papier varieert.',
                    'Omdat de normaal alleen bij glas bestaat.',
                    'Omdat lichtstralen op ruwe oppervlakken sneller bewegen.'
                ],
                correct: 0,
                explanation: 'De normaal staat altijd loodrecht op het plaatselijke raakvlak. Op een oneffen oppervlak varieert de helling van punt tot punt.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Welk type weerkaatsing zorgt ervoor dat je een witte pagina van je handboek vanuit elke hoek in het klaslokaal kunt lezen?',
                options: [
                    'Diffuse weerkaatsing (verstrooiing).',
                    'Regelmatige weerkaatsing.',
                    'Totale interne weerkaatsing.',
                    'Lichtbreking.'
                ],
                correct: 0,
                explanation: 'Diffuse verstrooiing stuurt lichtstralen in alle richtingen de ruimte in, waardoor de pagina vanuit elke kijkhoek zichtbaar is.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wat is de reden dat een bioscoopscherm niet van spiegelend materiaal gemaakt wordt?',
                options: [
                    'Omdat bij een spiegel alleen mensen recht tegenover de projector het beeld zouden zien, terwijl de rest van de zaal niets ziet.',
                    'Omdat spiegels te zwaar zijn om op te hangen.',
                    'Omdat spiegels het geluid van de luidsprekers dempen.',
                    'Omdat een spiegel het beeld ondersteboven draait.'
                ],
                correct: 0,
                explanation: 'Een spiegel weerkaatst het projectielicht in één strakke bundel; alleen diffuus linnen doek spreidt het licht gelijkmatig over alle zetels.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Geldt de terugkaatsingswet i = t bij diffuse weerkaatsing op een ruwe stenen muur?',
                options: [
                    'Ja, de wet geldt op elk microscopisch raakpunt ten opzichte van de plaatselijke normaal.',
                    'Nee, bij diffuse weerkaatsing geldt de reflectiewet niet meer.',
                    'Alleen als de muur wit geschilderd is.',
                    'Alleen bij loodrechte inval.'
                ],
                correct: 0,
                explanation: 'De wet i = t is universeel en geldt op elk minuscuul oneffenheidje ten opzichte van de plaatselijke loodlijn.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Waarom spiegelt een plas stilstaand water wél de bomen en lucht, maar een woelig meer met golven niet?',
                options: [
                    'Stilstaand water is een glad spiegelend vlak (regelmatige reflectie); golfjes maken het oppervlak oneffen en verstrooien het licht diffuus.',
                    'Omdat koud water beter reflecteert dan warm water.',
                    'Omdat golven lichtdeeltjes vernietigen.',
                    'Omdat modder in het water de zwaartekracht verandert.'
                ],
                correct: 0,
                explanation: 'Golfjes creëren een continu wisselend oneffen oppervlak waardoor het gereflecteerde licht diffuus verstrooid raakt en het spiegelbeeld verdwijnt.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Wat verklaart de gevaarlijke verblinding op nat asfalt bij nacht in het verkeer?',
                options: [
                    'Het waterlaagje maakt het ruwe asfalt spiegelglad, waardoor koplampen regelmatig spiegelen naar de ogen van tegenliggers.',
                    'Water versterkt het wattage van autolampen.',
                    'Water absorbeert de donkere kleuren van het spectrum.',
                    'De banden van auto\'s wekken statische elektriciteit op die flitst.'
                ],
                correct: 0,
                explanation: 'Het waterlaagje transformeert de diffuse weg in een spiegel (regelmatige reflectie) die het felle koplampenlicht rechtstreeks in de ogen van tegenliggers kaatst.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Inzicht & Reflectie',
                description: 'Leg uit waarom een glanzende foto in een tijdschrift soms moeilijk leesbaar is onder een felle bureaulamp (verblinding), terwijl een matte foto vanuit elke hoek scherp en rustig leesbaar blijft.'
            }
        ]
    }
}
