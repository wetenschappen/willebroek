/**
 * Schaduwvorming: Kernschaduw & Bijschaduw - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 1: Zien door licht (Les 2/3)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 20-23)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l02-schaduwvorming',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Schaduwvorming: Kernschaduw & Bijschaduw',
    description: 'Het ontstaan van schaduw als gevolg van de rechtlijnige lichtvoortplanting, het verschil tussen puntbronnen en uitgebreide bronnen (kernschaduw vs. bijschaduw) en zons- en maansverduisteringen.',

    config: {
        groenCode: 'F3M01L02',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 20-23)'
    },

    goals: [
        'Ik kan verklaren dat schaduwvorming een direct gevolg is van de rechtlijnige voortplanting van het licht door een ondoorzichtig lichaam.',
        'Ik kan de stralengang construeren bij een kleine lichtbron (puntbron) en het schaduwgebied op een scherm aanduiden.',
        'Ik kan het onderscheid uitleggen en construeren tussen de kernschaduw (geen licht) en de bijschaduw/halfschaduw (gedeeltelijk verlicht) bij een grote lichtbron.',
        'Ik kan het mechanisme van zonsverduisteringen (totale en gedeeltelijke eclips) en maansverduisteringen (bloedmaan) verklaren aan de hand van schaduwkegels in de ruimte.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 1: Schaduwvorming (p. 20-23)',
        instruction: '<p>Teken in je leerwerkboek op <strong>pagina 20-21</strong> de stralenconstructies voor de puntbron en de uitgebreide lichtbron. Maak vervolgens op <strong>pagina 22-23 oefeningen 19, 20, 21 en 22</strong> over eclipsen.</p>',
        formulaHint: 'Constructie: trek grensstralen vanuit de uiterste punten van de lichtbron \\( L_A \\) en \\( L_B \\) rakend langs de randen van het ondoorzichtige voorwerp.'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over rechtlijnige lichtvoortplanting, lichtstralen en ondoorzichtige lichamen.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & Eclipsen',
                    description: 'Hoe kan de kleine maan (400x kleiner dan de zon) de gigantische zon toch compleet verduisteren?',
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
                    title: 'Stralengang & Schaduwzones',
                    description: 'Puntbron vs uitgebreide bron, kernschaduw, bijschaduw en astronomische verduisteringen.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 19 t.e.m. 22 (leerwerkboek p. 20-23).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: schaduwvorming',
                    description: 'Verken kernschaduw en bijschaduw met puntbronnen en uitgebreide bronnen.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Verduisteringen & Schaduwen Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Schaduw & Ruimtefenomenen',
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
                    description: 'Kernregels van schaduwvorming en overgang naar hoofdstuk 2: zien door weerkaatsing.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van kernschaduw, bijschaduw en zonsverduistering.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'opticsLab',
            defaultMode: 'spiegel'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Astronomische Eclipsen & Uitlijning',
            instruction: 'Koppel elke verduistering aan de juiste astronomische volgorde en waarneming.',
            pairs: [
                { term: 'Zonsverduistering (volgorde)', definition: 'Zon - Maan - Aarde (de maan werpt haar schaduw op het aardoppervlak)' },
                { term: 'Maansverduistering (volgorde)', definition: 'Zon - Aarde - Maan (de maan trekt door de reusachtige schaduwkegel van de aarde)' },
                { term: 'Bloedmaan', definition: 'Koperrode gloed op de verduisterde maan door roodgebroken zonlicht door de aardatmosfeer' },
                { term: 'Schaduwtheater / zonnewijzer', definition: 'Praktische toepassing van schaduwvorming door zonlicht en kaarslicht' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Schaduw & Eclipsen (WACO 3)',
            questions: [
                {
                    q: 'Waarvan is het ontstaan van een scherpe schaduw achter een voorwerp het directe fysische bewijs?',
                    a: [
                        'Van de rechtlijnige voortplanting van het licht in een optische middenstof.',
                        'Van de kromming van de ruimte rond zware voorwerpen.',
                        'Van de golfdeeltjesdualiteit van fotonen.',
                        'Van de reflectiewet op ruwe oppervlakken.'
                    ],
                    c: 0
                },
                {
                    q: 'Wat neemt een astronaut op de aarde waar als hij zich precies in de bijschaduw (penumbra) van de maan bevindt tijdens een zonsverduistering?',
                    a: [
                        'Een gedeeltelijke zonsverduistering: hij ziet een deel van de zonneschijf, terwijl een ander deel door de maan wordt afgedekt.',
                        'Een totale zonsverduistering waarbij de dag volledig in nacht verandert.',
                        'Een maansverduistering.',
                        'Hij ziet helemaal geen verschil met een normale zonnige dag.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom heeft een operatiekamer in een ziekenhuis een grote ronde operatielamp met tientallen afzonderlijke ledlampen in plaats van één felle puntlamp?',
                    a: [
                        'Omdat door de grote uitgebreide lichtbron de kernschaduw van de handen van de chirurg verdwijnt, waardoor er geen storende donkere schaduw in het operatiegebied valt.',
                        'Omdat chirurgen van gekleurd licht houden.',
                        'Om de temperatuur in de zaal hoog te houden.',
                        'Omdat één lamp te veel elektriciteit verbruikt.'
                    ],
                    c: 0
                },
                {
                    q: 'Tijdens een totale maansverduistering wordt de maan niet pikzwart, maar kleurt ze mysterieus donkerrood ("bloedmaan"). Waardoor ontstaat dit verschijnsel?',
                    a: [
                        'Doordat rood zonlicht door de dikke aardatmosfeer wordt afgebogen en gefilterd naar de maanoppervlakte toe.',
                        'Doordat de maan zelf plotseling rood gloeit door hitte.',
                        'Doordat de zon tijdens een eclips alleen rood licht uitzendt.',
                        'Door weerkaatsing op de rode woestijnen van Mars.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Schaduwvorming',
            subtitle: 'Kernschaduw, bijschaduw en zonsverduisteringen (WACO 3 p. 20-23)',
            badge: 'Fysica 3 - Les 2',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Uitleggen hoe schaduwvorming ontstaat door rechtlijnige lichtvoortplanting.' },
                { icon: 'function', text: 'De stralengang en schaduw construeren bij een kleine puntbron.' },
                { icon: 'function', text: 'Het verschil aantonen tussen kernschaduw en bijschaduw bij een grote lichtbron.' },
                { icon: 'function', text: 'Het mechanisme van totale en gedeeltelijke zons- en maansverduisteringen verklaren.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: De Kosmische Toevalligheid',
            question: 'De zon heeft een diameter die 400 keer zo groot is als de maan. Toch kan de kleine maan tijdens een totale zonsverduistering de reusachtige zonneschijf precies voor 100% afdekken. Hoe kan een klein maantje zo een enorme reus verduisteren?',
            hint: 'Denk aan de afstanden in het zonnestelsel: wat weet je over de afstand zon-aarde t.o.v. maan-aarde?',
            revealText: 'De zon is 400 keer groter dan de maan, maar staat toevallig ook exact 400 keer verder van de aarde weg! Hierdoor hebben beide hemellichamen vanaf de aarde gezien exact dezelfde schijnbare diameter (een halve booggraad). Daardoor past de maan tijdens een eclips precies voor de zon.'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Rechtlijnige Lichtstralen',
            items: [
                { label: 'Rechtlijnigheid', value: 'Licht plant zich in een homogene middenstof altijd kaarsrecht voort.' },
                { label: 'Ondoorzichtig lichaam', value: 'Laat geen lichtstralen door. De stralen die het voorwerp raken worden geabsorbeerd of teruggekaatst.' },
                { label: 'Grensstralen', value: 'Lichtstralen die precies langs de buitenste rand van het voorwerp scheren; zij bakenen de schaduwzone af.' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Wat is Schaduw?',
            definition: 'Het gebied achter een ondoorzichtig lichaam waar geen licht van een bepaalde lichtbron kan komen, noemen we de SCHADUW. Schaduwvorming is een rechtstreeks bewijs voor de rechtlijnige voortplanting van het licht.'
        },
        {
            layout: 'worked-example',
            title: 'Geval 1: Kleine Lichtbron (Puntbron)',
            problem: 'Geval 1: Kleine Lichtbron (Puntbron)',
            steps: [
                { label: 'Opstelling', content: 'Een zeer kleine lichtbron \\( L \\) (bv. een ledje of lamp met klein gaatje), een ondoorzichtig lichaam \\( V \\) en een projectiescherm.' },
                { label: 'Grensstralen tekenen', content: 'Trek twee rechte lichtstralen vanuit \\( L \\) die rakelings langs de boven- en onderkant van \\( V \\) scheren tot op het scherm.' },
                { label: 'Resultaat op het scherm', content: 'Er ontstaat één haarscherpe, diepzwarte schaduw: de KERNSCHADUW (umbra).' },
                { label: 'Schaduwruimte', content: 'Het kegelvormige volume tussen het voorwerp en het scherm waar geen licht doordringt, heet de eigenlijke schaduwruimte.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Geval 2: Grote Lichtbron (Uitgebreide Bron)',
            problem: 'Geval 2: Grote Lichtbron (Uitgebreide Bron)',
            steps: [
                { label: 'Opstelling', content: 'Een grote lichtbron (bv. een lange tl-buis of de zon) met uiterste punten \\( L_A \\) (bovenaan) en \\( L_B \\) (onderaan).' },
                { label: 'Grensstralen trekken', content: 'Trek vanuit \\( L_A \\) twee stralen langs de randen van \\( V \\). Trek vanuit \\( L_B \\) eveneens twee stralen langs de randen van \\( V \\).' },
                { label: 'Kernschaduw (umbra)', content: 'Het centrale gebied op het scherm waar géén enkele straal van \\( L_A \\) én géén enkele straal van \\( L_B \\) raakt (volledige duisternis).' },
                { label: 'Bijschaduw (penumbra)', content: 'Het omringende grijsachtige gebied dat wél licht ontvangt van \\( L_A \\), maar niet van \\( L_B \\) (of omgekeerd; gedeeltelijk verlicht).' }
            ]
        },
        {
            layout: 'properties',
            title: 'Astronomische Toepassing: Zonsverduistering',
            items: [
                { label: 'Opstelling in het heelal', value: 'ZON - MAAN - AARDE (de maan staat tussen de zon en de aarde in).' },
                { label: 'Totale eclips', value: 'In de smalle zone waar de kernschaduw van de maan op aarde valt (slechts ~150 km breed), is de zon compleet onzichtbaar en wordt het overdag pikkedonker.' },
                { label: 'Gedeeltelijke eclips', value: 'In de veel bredere zone van de bijschaduw van de maan ziet men een gedeeltelijke hap uit de zonneschijf.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Astronomische Toepassing: Maansverduistering',
            items: [
                { label: 'Opstelling in het heelal', value: 'ZON - AARDE - MAAN (de aarde staat tussen de zon en de maan in).' },
                { label: 'Volle maan duikt onder', value: 'De maan trekt door de gigantische schaduwkegel die de aarde in de ruimte werpt.' },
                { label: 'Bloedmaan', value: 'De maan verdwijnt niet helemaal: aardse atmosfeer breekt het rode spectrum van het zonlicht naar de maan, waardoor ze koperrood oplicht.' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 20 p. 21)',
            question: 'Wat is het cruciale verschil tussen de kernschaduw en de bijschaduw bij een grote lichtbron?',
            options: [
                { id: 'A', text: 'In de kernschaduw komt géén enkel lichtpunt van de bron; in de bijschaduw komt licht van een deel van de bron.', correct: true },
                { id: 'B', text: 'De kernschaduw ontstaat alleen bij spiegels en de bijschaduw bij glas.', correct: false },
                { id: 'C', text: 'De bijschaduw is altijd donkerder dan de kernschaduw.', correct: false },
                { id: 'D', text: 'Kernschaduw ontstaat uitsluitend in de ruimte en nooit in de klas.', correct: false }
            ],
            explanation: 'Kernschaduw (umbra) is het gebied dat door het hele oppervlak van de bron wordt afgeschermd (0% licht). Bijschaduw (penumbra) ontvangt licht van een deel van de uitgebreide bron, waardoor er een zachte, grijze overgangszone ontstaat.'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Schaduwvorming',
            items: [
                'Schaduw is het gebied achter een ondoorzichtig lichaam waar geen licht doordringt.',
                'Schaduwvorming bewijst dat licht zich rechtlijnig voortplant.',
                'Puntbron: veroorzaakt uitsluitend een scherpe kernschaduw.',
                'Uitgebreide bron: veroorzaakt een kernschaduw (geen licht) omgeven door een bijschaduw (deels verlicht).',
                'Zonsverduistering: maan tussen zon en aarde. Maansverduistering: aarde tussen zon en maan.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 3!',
            subtitle: 'In les 3 verlaten we de schaduwen en onderzoeken we hoe we donkere lichamen zien via de terugkaatsingswet.',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '1 Afgerond' },
                { label: 'Lesuur', value: '2 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Welk type stof is vereist om een duidelijke schaduw op een scherm te werpen?',
                options: [
                    'Een ondoorzichtig (opaak) lichaam.',
                    'Een perfect doorzichtig (transparant) lichaam.',
                    'Een spiegelend oppervlak.',
                    'Een hete gasvlam.'
                ],
                correct: 0,
                explanation: 'Alleen een ondoorzichtig lichaam blokkeert de lichtstralen volledig en creëert een donkere schaduwzone achter zich.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Hoe noem je een lichtbron waarvan de afmetingen verwaarloosbaar klein zijn ten opzichte van de afstand tot het voorwerp?',
                options: [
                    'Een puntbron.',
                    'Een uitgebreide lichtbron.',
                    'Een diffuse lichtbron.',
                    'Een convergerende lichtbron.'
                ],
                correct: 0,
                explanation: 'Een kleine lichtbron modelleren we in de optica als een puntbron (alle stralen vertrekken vanuit 1 enkel geometrisch punt).'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Wat ontstaat er op een scherm achter een voorwerp als je een PUNTBRON gebruikt?',
                options: [
                    'Uitsluitend een scherpe kernschaduw (geen bijschaduw).',
                    'Alleen een vage bijschaduw.',
                    'Een regenboogpatroon.',
                    'Een vergroot virtueel beeld.'
                ],
                correct: 0,
                explanation: 'Bij een puntbron zijn er slechts 2 uiterste grensstralen; het schaduwgebied is haarscherp begrensd (alleen kernschaduw).'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wat is de juiste volgorde van de hemellichamen tijdens een ZONSVERDUISTERING?',
                options: [
                    'Zon - Maan - Aarde',
                    'Zon - Aarde - Maan',
                    'Aarde - Zon - Maan',
                    'Maan - Zon - Aarde'
                ],
                correct: 0,
                explanation: 'Tijdens een zonsverduistering schuift de maan tussen de zon en de aarde, waardoor de maanschaduw op de aarde valt.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Wat is de wetenschappelijke definitie van de KERNSCHADUW (umbra) bij een grote lichtbron?',
                options: [
                    'Het gebied waar helemaal geen enkel licht van de lichtbron kan komen.',
                    'Het gebied dat verlicht wordt door de helft van de lamp.',
                    'De schaduw die alleen buiten in zonlicht ontstaat.',
                    'Het gebied waar alle lichtstralen convergeren.'
                ],
                correct: 0,
                explanation: 'De kernschaduw is het centrale, volledig donkere deel van de schaduw waar geen enkele lichtstraal van de bron doordringt.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Wat neemt een waarnemer op aarde waar in het gebied waar de BIJSCHADUW van de maan valt tijdens een eclips?',
                options: [
                    'Een gedeeltelijke zonsverduistering.',
                    'Een totale zonsverduistering.',
                    'Een maansverduistering.',
                    'Een halo rond de maan.'
                ],
                correct: 0,
                explanation: 'In de bijschaduw van de maan bereikt licht van een deel van de zonneschijf het oog: men ziet een gedeeltelijke eclips.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Waarom heeft een operatiekamerlamp tientallen lampjes verspreid over een grote koepel?',
                options: [
                    'Om te vermijden dat de handen van de chirurg een storende, donkere kernschaduw in de operatiewond werpen.',
                    'Om de zaal steriel te houden met uv-licht.',
                    'Om de chirurg wakker te houden.',
                    'Omdat één lamp te veel hitte afgeeft.'
                ],
                correct: 0,
                explanation: 'Door de grote diameter van de lamp ontstaat er nagenoeg geen kernschaduw onder de handen of het instrument van de chirurg.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Ruimtelijke Verklaring',
                description: 'Leg uit waarom een maansverduistering vanaf vrijwel de gehele nachtzijde van de aarde zichtbaar is, terwijl een totale zonsverduistering slechts in een smalle strook van circa 150 km breed te zien is.'
            }
        ]
    }
}
