/**
 * Vergrotingsfactor van een Bolle Lens - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Blinding lights (Optische fenomenen) | Hoofdstuk 4: Lenzen (Les 3/3)
 * Leerplan GO!: WD2_11.01.02, WD2_11.01.02.02, CD11.01.06
 */

export default {
    id: 'fys3-m01-l11-vergrotingsfactor',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'De Vergrotingsfactor van een Bolle Lens',
    description: 'Berekening van de vergrotingsfactor N van een lens via beeld- en voorwerpsafmetingen (N = |B| / V) en afstanden (N = b / v) met behulp van gelijkvormige driehoeken.',

    config: {
        groenCode: 'F3M01L11',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u'
    },

    goals: [
        'Ik kan de lineaire vergrotingsfactor N mathematisch definiëren als de verhouding van de beeldgrootte tot de voorwerpsgrootte (N = |B| / V).',
        'Ik kan aan de hand van gelijkvormige driehoeken bewijzen dat N = |B| / V = b / v.',
        'Ik kan berekenen hoe groot een geprojecteerd beeld wordt bij een gegeven voorwerpsafstand en beeldafstand (beamer, camera, oog).',
        'Ik kan de numerieke waarde van N fysisch interpreteren: N > 1 (vergroot beeld), N = 1 (even groot), N < 1 (verkleind beeld).'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Optische fenomenen - Hoofdstuk 4: Lenzen (p. 76-81)',
        instruction: '<p>Bestudeer in je leerwerkboek <strong>pagina 76 t.e.m. 78</strong> (definitie van de vergrotingsfactor en de gelijkvormigheid van driehoeken). Los de rekenopdrachten en toepassingen op <strong>pagina 79 t.e.m. 81</strong> zelfstandig op (o.a. de camera, de ooglens en de beamerprojector).</p>',
        formulaHint: 'Formule voor de vergrotingsfactor: \\( N = \\frac{|B|}{V} = \\frac{b}{v} \\). Let op: zorg dat alle afmetingen in exact dezelfde eenheid (bv. alles in cm of alles in m) zijn omgezet vóór je begint te delen!'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Toets',
                    description: '4 vragen over beeldafstand, voorwerpsafstand en verhoudingen.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Inleidende Instructie',
                    description: 'Van microchip tot bioscoopdoek: hoe schalen beelden?',
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
                    title: 'Theorie & Berekeningen',
                    description: 'Gelijkvormige driehoeken, het formulewiel en uitgewerkte beamer- en oogvraagstukken.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Boek Oefeningen',
                    description: 'Rekenopgaven WACO 3 p. 79-81.',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: de vergrotingsfactor',
                    description: 'Meet beeldafstand b, voorwerpsafstand v en bereken N = b / v.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Formulevormen & Afmetingen',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Rekenquiz Vergrotingsfactor',
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
                    title: 'Samenvatting & Synthese',
                    description: 'Formule-integratie en afronding van Hoofdstuk 4 (Lenzen).',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: '4 formatieve vragen over beamerberekening, ooglens en interpretatie van N.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'opticsLab',
            defaultMode: 'lens'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Formulewiel & Dimensies',
            instruction: 'Koppel de formulevorm aan de gevraagde grootheid.',
            pairs: [
                { term: 'Beeldgrootte berekenen (|B| =)', definition: 'N vermenigvuldigd met voorwerpsgrootte V (|B| = N · V)' },
                { term: 'Voorwerpsgrootte berekenen (V =)', definition: '|B| gedeeld door de vergrotingsfactor N (V = |B| / N)' },
                { term: 'Beeldafstand berekenen (b =)', definition: 'N vermenigvuldigd met voorwerpsafstand v (b = N · v)' },
                { term: 'Eenheid van vergrotingsfactor N', definition: 'Geen eenheid (dimensieloos getal, verhouding van twee gelijke lengtematen)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Rekenquiz Vergrotingsfactor',
            questions: [
                {
                    q: 'Een voorwerp van 4,0 cm hoog staat op 20 cm van een bolle lens. Het reële beeld op een scherm ontstaat op een beeldafstand b = 60 cm. Wat is de vergrotingsfactor N en hoe groot is het beeld?',
                    a: [
                        'N = 3,0 en |B| = 12,0 cm (b / v = 60 / 20 = 3; |B| = 3 · 4,0 cm).',
                        'N = 0,33 en |B| = 1,33 cm.',
                        'N = 15 en |B| = 60 cm.'
                    ],
                    c: 0
                },
                {
                    q: 'Een beamerlens projecteert een lcd-beeldje van 2,0 cm hoog op een scherm op 4,0 m afstand. Het geprojecteerde beeld is 1,60 m hoog. Wat is de vergrotingsfactor N?',
                    a: [
                        'N = 80 (want 160 cm / 2,0 cm = 80).',
                        'N = 0,80',
                        'N = 2,0'
                    ],
                    c: 0
                },
                {
                    q: 'Heeft de vergrotingsfactor N een eenheid zoals cm, meter of dioptrie?',
                    a: [
                        'Nee, N is een dimensieloos getal omdat het een verhouding van twee identieke lengtematen is.',
                        'Ja, N wordt uitgedrukt in dioptrie (dpt).',
                        'Ja, N heeft de eenheid centimeter per meter.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'De Vergrotingsfactor van een Bolle Lens',
            subtitle: 'Wiskundige verhoudingen: N = |B| / V = b / v',
            badge: 'Fysica 3 - Hoofdstuk 4 (Les 3/3)',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'De lineaire vergrotingsfactor N mathematisch definiëren als verhouding van beeld- tot voorwerpsgrootte.' },
                { icon: 'function', text: 'Aantonen dat wegens gelijkvormige rechthoekige driehoeken ook geldt: N = b / v.' },
                { icon: 'function', text: 'Kwantitatieve vraagstukken oplossen over beamers, smartphonecamera’s en het menselijk oog.' },
                { icon: 'function', text: 'Het gehele hoofdstuk 4 over bolle lenzen succesvol en overzichtelijk afronden.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Onderzoeksvraag: Van chip naar bioscoopwand',
            question: 'Een beamer bevat binnenin een lcd-schermpje van amper 2,5 cm hoog. Op de muur ontstaat een vlijmscherp beeld van 2,5 meter hoog. Hoeveel keer is het beeld vergroot, en wat betekent dit voor de afstand van de lens tot het scherm vergeleken met de afstand tot de chip?',
            hint: 'Denk aan de lichtstraal die ongebroken door het optisch middelpunt O van de lens reist.',
            revealText: 'Het beeld is exact 100 keer vergroot (250 cm / 2,5 cm = 100). Omdat de lichtstralen vanuit het optisch middelpunt O rechtlijnig uitwaaieren, moet het projectiescherm ook exact 100 keer zo ver van de lens staan als de chip binnenin de beamer (b = 100 · v)!'
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'De Vergrotingsfactor N',
            definition: 'De lineaire vergrotingsfactor N is de verhouding van de grootte van het beeld |B| tot de grootte van het voorwerp V: \\( N = \\frac{|B|}{V} \\). Omdat zowel |B| als V lengtes zijn (in m of cm), heeft de vergrotingsfactor **géén eenheid** (dimensieloos getal). Interpretatie: als N > 1 is het beeld vergroot; als N = 1 is het beeld even groot; als N < 1 is het beeld verkleind.'
        },
        {
            layout: 'steps',
            title: 'Meetkundig bewijs via gelijkvormige driehoeken',
            steps: [
                { icon: 'function', text: 'Teken een voorwerp VV′ loodrecht op de hoofdas op afstand v voor de lens. De middelpuntstraal loopt ongebroken door O naar het beeldpunt B′.' },
                { icon: 'function', text: 'Bekijk de rechthoekige voorwerpsdriehoek ΔOVV′ met rechthoekszijden v (horizontaal) en V (verticaal).' },
                { icon: 'function', text: 'Bekijk de rechthoekige beelddriehoek ΔOBB′ met rechthoekszijden b (horizontaal) en |B| (verticaal).' },
                { icon: 'function', text: 'De hoeken bij het optisch middelpunt O zijn overstaande hoeken en dus gelijk: ∠VOV′ = ∠BOB′. Beide driehoeken hebben hoeken van 90° en gelijke overstaande hoeken.' },
                { icon: 'function', text: 'Besluit: ΔOVV′ en ΔOBB′ zijn gelijkvormig (hh). De verhouding van overeenkomstige zijden is constant: \\( \\frac{|B|}{V} = \\frac{b}{v} \\implies N = \\frac{|B|}{V} = \\frac{b}{v} \\).' }
            ]
        },
        {
            layout: 'steps',
            title: 'Het Formulewiel & Omvormingen',
            steps: [
                { icon: 'function', text: 'Hoofdformule: \\( N = \\frac{|B|}{V} = \\frac{b}{v} \\).' },
                { icon: 'function', text: 'Beeldgrootte berekenen als N en V bekend zijn: \\( |B| = N \\cdot V \\).' },
                { icon: 'function', text: 'Voorwerpsgrootte berekenen als |B| en N bekend zijn: \\( V = \\frac{|B|}{N} \\).' },
                { icon: 'function', text: 'Beeldafstand berekenen als N en v bekend zijn: \\( b = N \\cdot v \\).' },
                { icon: 'function', text: 'Gouden rekenregel: Zorg dat V en |B| in dezelfde eenheid staan (bv. cm), én dat v en b in dezelfde eenheid staan (bv. m of cm) vóórdat je rekent!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld 1: Beamerprojector (WACO 3 oef. 34)',
            problem: 'Een beamer projecteert een voorwerp van zijn interne lcd-scherm op een groot wit scherm. Het geprojecteerde beeld is \\( 150\\text{ cm} \\) hoog. De lens heeft een vergrotingsfactor \\( N = 30 \\).',
            steps: [
                { label: 'Situatie', content: 'Een beamer projecteert een voorwerp van zijn interne lcd-scherm op een groot wit scherm. Het geprojecteerde beeld is \\( 150\\text{ cm} \\) hoog. De lens heeft een vergrotingsfactor \\( N = 30 \\).' },
                { label: 'Gegeven & Gevraagd', content: 'Gegeven: \\( |B| = 150\\text{ cm} \\), \\( N = 30 \\). Gevraagd: hoogte van het voorwerp op het lcd-scherm \\( V = ? \\)' },
                { label: 'Formule & Omvorming', content: '\\( N = \\frac{|B|}{V} \\implies V = \\frac{|B|}{N} \\)' },
                { label: 'Berekening', content: '\\( V = \\frac{150\\text{ cm}}{30} = 5{,}0\\text{ cm} \\)' },
                { label: 'Antwoord & Conclusie', content: 'De hoogte van de afbeelding op het lcd-schermpje in de beamer is \\( 5{,}0\\text{ cm} \\). Het beeld op de muur is 30 keer zo groot als het voorwerp in het toestel.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld 2: Smartphonecamera & Oog (WACO 3 oef. 30)',
            problem: 'Je fotografeert met een smartphone een vriend die \\( 150\\text{ cm} \\) groot is. Het beeld op de sensor van de camera is \\( 0{,}6\\text{ cm} \\) groot. Bereken de vergrotingsfactor \\( N \\).',
            steps: [
                { label: 'Situatie', content: 'Je fotografeert met een smartphone een vriend die \\( 150\\text{ cm} \\) groot is. Het beeld op de sensor van de camera is \\( 0{,}6\\text{ cm} \\) groot. Bereken de vergrotingsfactor \\( N \\).' },
                { label: 'Gegeven & Gevraagd', content: 'Gegeven: \\( V = 150\\text{ cm} \\), \\( |B| = 0{,}6\\text{ cm} \\). Gevraagd: \\( N = ? \\)' },
                { label: 'Formule & Berekening', content: '\\( N = \\frac{|B|}{V} = \\frac{0{,}6\\text{ cm}}{150\\text{ cm}} = 0{,}004 \\)' },
                { label: 'Fysische betekenis', content: 'Omdat \\( N = 0{,}004 \\ll 1 \\), is het beeld sterk verkleind (250 keer kleiner dan het werkelijke voorwerp). Zo past een volledig menselijk lichaam op een minuscuul camera-chipje van enkele millimeters!' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Tussentijdse Begripscheck',
            question: 'De diameter van een menselijk oog is 2,5 cm (dit is de beeldafstand b van de ooglens tot het netvlies). Een leerling leest een letterbord op een afstand v = 50 cm. Wat is de vergrotingsfactor N van de ooglens?',
            options: [
                { id: 'A', text: 'N = 0,050 (het beeld op het netvlies is 20 keer kleiner dan het werkelijke voorwerp)', correct: true },
                { id: 'B', text: 'N = 20 (het beeld op het netvlies is 20 keer groter)', correct: false },
                { id: 'C', text: 'N = 0,50 cm', correct: false },
                { id: 'D', text: 'N = 125', correct: false }
            ],
            explanation: 'N = b / v = 2,5 cm / 50 cm = 0,050. Let op: N heeft geen eenheid! Het beeld op het netvlies is 20 keer verkleind (1 / 0,050 = 20).'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Misconcepties & Veelgemaakte Fouten bij N',
            items: [
                'Fout: Denken dat N een eenheid heeft zoals cm of m. Correctie: N is de verhouding van twee lengtes en heeft absoluut géén eenheid.',
                'Fout: Rekenen met verschillende eenheden (bv. B in cm delen door V in meter). Correctie: Reken altijd eerst alle lengtes om naar dezelfde maateenheid.',
                'Fout: N = 0,5 interpreteren als "geen beeld". Correctie: N < 1 betekent simpelweg een verkleind beeld (halve grootte bij N = 0,5).',
                'Fout: Vergeten dat b/v gelijk is aan |B|/V. De afstanden van de lens bepalen direct de afmetingen van het geprojecteerde beeld.'
            ]
        },
        {
            layout: 'summary',
            title: 'Integrale Samenvatting Hoofdstuk 4 (Lenzen)',
            items: [
                'Les 9: Bolle lenzen hebben een positieve brandpuntsafstand f. De 3 hoofdstralen (evenwijdig breekt door F′, brandpuntsstraal treedt evenwijdig uit, middelpuntstraal loopt ongebroken rechtdoor).',
                'Les 10: De 5 standen van beeldvorming (v > 2f: camera, v = 2f: 1:1 kopie, f < v < 2f: beamer, v = f: schijnwerper/geen beeld, v < f: virtuele loep).',
                'Les 11: Kwantitatieve formule N = |B| / V = b / v. Bewijs via gelijkvormige driehoeken ΔOVV′ ~ ΔOBB′.',
                'Hoofdstuk 4 over lenzen is hiermee succesvol afgerond!'
            ]
        },
        {
            layout: 'closing',
            title: 'Proficiat met Hoofdstuk 4!',
            subtitle: 'Je beheerst nu de meetkundige en kwantitatieve optica van bolle lenzen.',
            stats: [
                { label: 'Thema', value: '1' },
                { label: 'Hoofdstuk', value: '4' },
                { label: 'Les', value: '3/3' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat stellen de symbolen v en b voor in de optica van bolle lenzen?',
                options: [
                    'v = voorwerpsafstand (afstand voorwerp tot lens), b = beeldafstand (afstand lens tot beeld)',
                    'v = valsnelheid van het licht, b = brekingsindex van het glas',
                    'v = voorwerpsgrootte in cm, b = beeldgrootte in cm',
                    'v = brandpuntsafstand links, b = brandpuntsafstand rechts'
                ],
                correct: 0,
                explanation: 'In de optica staat de kleine letter v voor de voorwerpsafstand (afstand van het voorwerp tot het optisch middelpunt O van de lens) en de kleine letter b voor de beeldafstand (van het optisch middelpunt O tot het gevormde beeld).'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Hoe is de lineaire vergrotingsfactor N van een lens gedefinieerd?',
                options: [
                    'N = grootte van het beeld (|B|) gedeeld door grootte van het voorwerp (V)',
                    'N = grootte van het voorwerp (V) gedeeld door grootte van het beeld (|B|)',
                    'N = voorwerpsafstand (v) vermenigvuldigd met beeldafstand (b)',
                    'N = brandpuntsafstand (f) gedeeld door de beeldafstand (b)'
                ],
                correct: 0,
                explanation: 'De vergrotingsfactor N geeft aan hoeveel keer het beeld groter of kleiner is dan het originele voorwerp: N = |B| / V.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Welke eenheid heeft de vergrotingsfactor N?',
                options: [
                    'N heeft géén eenheid (het is een dimensieloos verhoudingsgetal)',
                    'Centimeter (cm)',
                    'Meter per seconde (m/s)',
                    'Dioptrie (dpt)'
                ],
                correct: 0,
                explanation: 'Omdat N berekend wordt door twee lengtes met dezelfde eenheid door elkaar te delen (bv. cm/cm of m/m), vallen de eenheden tegen elkaar weg. N is dus een zuiver verhoudingsgetal zonder eenheid.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wat voor beeld ontstaat er wanneer een optisch toestel een vergrotingsfactor N = 0,25 heeft?',
                options: [
                    'Een verkleind beeld (het beeld is 4 keer kleiner dan het voorwerp)',
                    'Een vergroot beeld (het beeld is 4 keer groter dan het voorwerp)',
                    'Er ontstaat helemaal geen beeld omdat N kleiner is dan 1',
                    'Een beeld dat exact even groot is als het voorwerp'
                ],
                correct: 0,
                explanation: 'Als N < 1 is het beeld verkleind. Bij N = 0,25 is de hoogte van het beeld exact één vierde van de hoogte van het voorwerp (zoals bij een fototoestel).'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een beamer projecteert een dia van 3,0 cm hoog op een scherm dat 6,0 m verder staat. Het beeld op het scherm is 1,50 m hoog. Wat is de vergrotingsfactor N van deze projectie?',
                options: [
                    'N = 50 (want 150 cm / 3,0 cm = 50)',
                    'N = 0,50',
                    'N = 2,0',
                    'N = 200'
                ],
                correct: 0,
                explanation: 'Zet eerst alle eenheden gelijk: |B| = 1,50 m = 150 cm. Dan geldt: N = |B| / V = 150 cm / 3,0 cm = 50. Het beeld is 50 keer vergroot.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'In een beamer met vergrotingsfactor N = 40 staat de projectielens op 10 cm van de interne lcd-chip (v = 10 cm). Op welke afstand b van de lens bevindt zich het projectiescherm?',
                options: [
                    'b = 400 cm = 4,0 m (want b = N · v = 40 · 10 cm)',
                    'b = 0,25 cm',
                    'b = 40 cm = 0,40 m',
                    'b = 4,0 cm'
                ],
                correct: 0,
                explanation: 'Uit N = b / v volgt b = N · v. Dus b = 40 · 10 cm = 400 cm = 4,0 meter. Het scherm moet op 4,0 meter afstand staan voor een scherp beeld.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Waarom geldt de formule N = |B| / V = b / v bij een bolle lens volgens de meetkunde?',
                options: [
                    'Omdat de lichtstraal door het optisch middelpunt O ongebroken doorloopt, waardoor twee gelijkvormige rechthoekige driehoeken ΔOVV′ en ΔOBB′ ontstaan',
                    'Omdat alle lenzen volgens de wet van Snellius het licht met een constante factor vermenigvuldigen',
                    'Omdat de brandpuntsafstand altijd gelijk is aan de beeldafstand',
                    'Omdat de oppervlakte van een cirkel evenredig is met het kwadraat van de straal'
                ],
                correct: 0,
                explanation: 'De middelpuntstraal verbindt de top van het voorwerp V′ met de top van het beeld B′ recht door het optisch middelpunt O. De hoeken in O zijn overstaande hoeken en dus gelijk. Samen met de rechte hoek op de hoofdas maakt dit ΔOVV′ en ΔOBB′ gelijkvormig, zodat hun zijden dezelfde verhouding hebben: |B| / V = b / v.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Verdiepingsreflectie: Het omgekeerde beeld in ons oog en verrekijkers',
                description: 'Het reële beeld dat de ooglens op ons netvlies projecteert, is sterk verkleind (N = 0,050) én staat op zijn kop (ondersteboven). Leg uit: (1) Waarom ervaren wij de wereld om ons heen dan toch rechtopstaand? (2) Waarom zie je door een astronomische telescoop een sterrenbeeld ondersteboven, maar zorgt een moderne veldverrekijker met prisma\'s voor een rechtopstaand beeld?'
            }
        ]
    }
}
