/**
 * Samenstelling van Wit Licht & Dispersie - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Blinding lights (Optische fenomenen) | Hoofdstuk 5: Samenstelling van wit licht (Les 1/2)
 * Leerplan GO!: WD2_11.01.01, WD2_11.01.02, CD11.01.06
 */

export default {
    id: 'fys3-m01-l12-kleuren-wit-licht',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Samenstelling van Wit Licht: Dispersie & Spectrum',
    description: 'Het aantonen dat wit licht samengesteld is uit verschillende spectralkleuren, dispersie door een prisma, het kleurenspectrum (ROGGBIV) en het mechanisme achter de natuurlijke regenboog.',

    config: {
        groenCode: 'F3M01L12',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u'
    },

    goals: [
        'Ik kan met de historische proef van Newton aantonen dat wit licht samengesteld is uit verschillende spectralkleuren.',
        'Ik kan het verschijnsel dispersie (kleurschifting) verklaren doordat verschillende kleuren licht een verschillende voortplantingssnelheid hebben in dichtere optische middenstoffen.',
        'Ik kan de zeven spectralkleuren in de juiste volgorde van afbuiging opnoemen en toepassen (ROGGBIV: rood breekt het minst, violet breekt het sterkst).',
        'Ik kan het ontstaan van een natuurlijke regenboog verklaren aan de hand van breking, dispersie en totale interne reflectie in bolvormige waterdruppels.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Optische fenomenen - Hoofdstuk 5: Samenstelling van wit licht (p. 82-84)',
        instruction: '<p>Lees in je leerwerkboek <strong>pagina 82 en 83</strong> aandachtig door. Bekijk de proef met het glazen prisma en de voorbeelden van kleurschifting op dvd\'s en zeepbellen. Los vervolgens de opdrachten over de spectralkleuren en het ontstaan van de regenboog op <strong>pagina 83 en 84</strong> op.</p>',
        formulaHint: 'Volgorde van het continu spectrum: Rood - Oranje - Geel - Groen - Blauw - Indigo - Violet (ROGGBIV). Onthoud: rood reist het snelst in glas en breekt het minst af; violet reist het traagst in glas en breekt het sterkst af!'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Toets',
                    description: '4 vragen over lichtbreking, de aard van wit licht en kleurschifting.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Inleidende Instructie',
                    description: 'Waar komen de kleuren van de regenboog en een dvd vandaan?',
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
                    title: 'Theorie & Mechanisme',
                    description: 'Prismabreking, ROGGBIV, het snelheidsverschil in glas en de regendruppel.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Boek Oefeningen',
                    description: 'Oefeningen WACO 3 p. 83-84.',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: kleurschifting en spectrum',
                    description: 'Verken dispersie van wit licht in het ROGGBIV-spectrum.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Spectrum & Brekingseigenschappen',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dispersie & Regenboog Quiz',
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
                    title: 'Samenvatting & Inzichten',
                    description: 'Synthese van dispersie en vooruitblik naar de kleur van voorwerpen.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: '4 formatieve vragen over ROGGBIV, het prismamechanisme en de regenboog.',
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
            title: 'Optische Fenomenen & Natuur',
            instruction: 'Koppel het natuurverschijnsel aan de optische verklaring.',
            pairs: [
                { term: 'Natuurlijke regenboog', definition: 'Breking, dispersie en totale interne reflectie van zonlicht in regendruppels' },
                { term: 'Kleuren op een dvd of zeepbel', definition: 'Interferentie en kleurschifting van invallend wit licht op microscopische groefjes of dunne lagen' },
                { term: 'Schijf van Newton', definition: 'Snelle additieve menging van spectralkleuren op het netvlies die wit oplevert' },
                { term: 'Omgekeerd tweede prisma', definition: 'Voegt de uitwaaierende spectralkleuren weer exact samen tot één evenwijdige witte bundel' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dispersie & Regenboog Quiz',
            questions: [
                {
                    q: 'Waarom buigt violet licht sterker af in een glazen prisma dan rood licht?',
                    a: [
                        'Omdat violet licht zich in glas langzamer voortplant dan rood licht, waardoor het een hogere brekingsindex ondervindt.',
                        'Omdat rood licht warmer is en violet licht kouder.',
                        'Omdat het prisma van binnen paars geverfd is.',
                        'Omdat violet licht een grotere massa heeft.'
                    ],
                    c: 0
                },
                {
                    q: 'Welke spectralkleur bevindt zich in het continu spectrum precies tussen oranje en groen?',
                    a: [
                        'Geel (volgorde ROGGBIV: Rood - Oranje - Geel - Groen - Blauw - Indigo - Violet).',
                        'Blauw',
                        'Indigo',
                        'Bruin'
                    ],
                    c: 0
                },
                {
                    q: 'Waar bevindt de zon zich altijd wanneer je als waarnemer naar een regenboog kijkt?',
                    a: [
                        'Precies achter je rug (de regendruppels bevinden zich vóór je).',
                        'Precies vóór je, recht achter de regendruppels.',
                        'Recht boven je hoofd op het zenit.',
                        'Onder de horizon.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Samenstelling van Wit Licht: Dispersie & Spectrum',
            subtitle: 'Van het prisma van Newton tot de kleuren van de regenboog',
            badge: 'Fysica 3 - Hoofdstuk 5 (Les 1/2)',
            icon: 'sun'
        },
        {
            layout: 'steps',
            title: 'Wat ontdek je in deze les?',
            steps: [
                { icon: 'sun', text: 'Bewijzen dat wit zonlicht geen enkelvoudige kleur is, maar samengesteld uit alle kleuren van de regenboog.' },
                { icon: 'sun', text: 'Het fysische mechanisme van dispersie (kleurschifting) verklaren via lichtsnelheid in optische middenstoffen.' },
                { icon: 'sun', text: 'De zeven spectralkleuren in de juiste volgorde van afbuiging beheersen (het ROGGBIV-spectrum).' },
                { icon: 'sun', text: 'De vorming van de natuurlijke regenboog stap voor stap verklaren in bolvormige waterdruppels.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Historische Verwondering: Newton in 1666',
            question: 'Vóór Isaac Newton dacht men dat een glazen prisma zelf kleur "toevoegde" aan zuiver wit zonlicht (zoals een verfstof). Welk briljant vervolgexperiment voerde Newton uit om te bewijzen dat de kleuren al IN het witte licht zaten?',
            hint: 'Wat gebeurt er als je de uitgewaaierde gekleurde bundel door een tweede, omgekeerd prisma laat lopen?',
            revealText: 'Newton plaatste een tweede identiek prisma, maar dan ondersteboven, achter het eerste prisma. De zeven uitgewaaierde kleuren werden weer exact samengevoegd tot één zuivere witte lichtbundel! Dit leverde het onomstotelijke bewijs: het prisma voegt niets toe, het splitst enkel het reeds aanwezige witte licht!'
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Dispersie (Kleurschifting)',
            definition: 'Dispersie is het verschijnsel waarbij een samengestelde lichtbundel (zoals wit zonlicht) bij breking in een optische middenstof gesplitst wordt in zijn afzonderlijke samenstellende kleuren. Licht dat uit meerdere kleuren bestaat noemen we **polychromatisch** (veelkleurig) licht. Een lichtstraal van één zuivere kleur noemen we **monochromatisch** licht (zoals een rode laser).'
        },
        {
            layout: 'steps',
            title: 'Waarom treedt dispersie op? De Fysische Oorzaak',
            steps: [
                { icon: 'sun', text: 'In het luchtledige (vacuüm) en in lucht planten alle lichtgolven zich voort met exact dezelfde lichtsnelheid: \\( c = 3{,}00 \\cdot 10^8\\text{ m/s} \\).' },
                { icon: 'sun', text: 'In dichtere middenstoffen (glas, water) hangt de voortplantingssnelheid v echter af van de golflengte (kleur) van het licht.' },
                { icon: 'sun', text: 'Rood licht (lange golflengte) reist het snelst door glas: \\( v_{\\text{rood}} \\) is het grootst. Het ondervindt de kleinste brekingsindex en breekt het MINSTE af.' },
                { icon: 'sun', text: 'Violet licht (korte golflengte) reist het traagst door glas: \\( v_{\\text{violet}} \\) is het kleinst. Het ondervindt de grootste brekingsindex en breekt het STERKSTE af.' },
                { icon: 'sun', text: 'Gevolg: Bij elke breking aan het grensvlak wijken de stralengangen van de verschillende kleuren uiteen. De bundel waaiert open in een kleurenbundel!' }
            ]
        },
        {
            layout: 'steps',
            title: 'Het Zichtbare Spectrum (ROGGBIV)',
            steps: [
                { icon: 'sun', text: 'Het continu spectrum van wit licht bevat 7 herkenbare hoofdkleuren in vaste volgorde:' },
                { icon: 'sun', text: '**R** - Rood (kleinste brekingshoek, langste golflengte: \\( \= 700\\text{ nm} \\))' },
                { icon: 'sun', text: '**O** - Oranje & **G** - Geel' },
                { icon: 'sun', text: '**G** - Groen (het midden van het zichtbare spectrum)' },
                { icon: 'sun', text: '**B** - Blauw & **I** - Indigo' },
                { icon: 'sun', text: '**V** - Violet (grootste brekingshoek, kortste golflengte: \\( \= 400\\text{ nm} \\))' },
                { icon: 'sun', text: 'Onthoud het handige ezelsbruggetje: **ROGGBIV**!' }
            ]
        },
        {
            layout: 'steps',
            title: 'Kleurschifting in het Dagelijks Leven',
            steps: [
                { icon: 'sun', text: 'Cd of Dvd: De microscopische putjes en sporen werken als een reflectietralie; door interferentie zie je een schitterende regenboog bij weerkaatsing.' },
                { icon: 'sun', text: 'Zeepbellen & Olievlekken: Witte lichtstralen die weerkaatsen aan de boven- en onderkant van het uiterst dunne vloeistoffilmpje doven elkaar selectief uit, waardoor levendige spectralkleuren overblijven.' },
                { icon: 'sun', text: 'Fonkeldiamant: De combinatie van sterke dispersie en herhaalde totale interne reflectie (grenshoek 24,4°) creëert het karakteristieke "vuur" van een briljant.' }
            ]
        },
        {
            layout: 'steps',
            title: 'Het Mechanisme van de Natuurlijke Regenboog',
            steps: [
                { icon: 'sun', text: 'Voorwaarde: De zon schijnt achter je rug en vóór je hangen bolvormige regendruppels in de lucht.' },
                { icon: 'sun', text: '**Stap 1: Breking & Dispersie bij intreding.** Wit zonlicht breekt aan het bolle wateroppervlak. Rood breekt minder af dan violet; het licht waaiert uit binnenin de druppel.' },
                { icon: 'sun', text: '**Stap 2: Totale interne reflectie.** De stralen bereiken de achterwand van de druppel onder een hoek die groter is dan de grenshoek van water (48,6°). Het licht kaatst intern terug.' },
                { icon: 'sun', text: '**Stap 3: Tweede breking bij uittreding.** Het gereflecteerde licht verlaat de druppel aan de voorzijde richting het oog van de waarnemer. Rood treedt uit onder een hoek van \\( 42^\\circ \\) t.o.v. de zonnestralen, violet onder \\( 40^\\circ \\).' },
                { icon: 'sun', text: 'Resultaat: Hoger gelegen druppels sturen rood licht naar ons oog, lager gelegen druppels violet. Daarom staat rood ALTIJD aan de buitenste (bovenste) rand van de hoofdregenboog!' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Tussentijdse Inzichtscheck: Dispersie',
            question: 'Wanneer een smalle bundel wit licht door een glazen prisma schijnt, welke uitspraak over de spectralkleuren is dan fysisch volkomen correct?',
            options: [
                { id: 'A', text: 'Rood licht buigt het minst af omdat het zich in glas het snelst voortplant; violet buigt het sterkst af omdat het zich het langzaamst voortplant.', correct: true },
                { id: 'B', text: 'Violet licht buigt het minst af omdat het de hoogste energie heeft.', correct: false },
                { id: 'C', text: 'Alle kleuren buigen exact evenveel af omdat de wet van Snellius voor alle licht hetzelfde is.', correct: false },
                { id: 'D', text: 'Het prisma produceert zelf de kleuren door chemische reacties in het glasoppervlak.', correct: false }
            ],
            explanation: 'Dispersie ontstaat doordat de lichtsnelheid in een optische middenstof afhangt van de golflengte. Rood reist het snelst door glas en buigt het minst af; violet reist het traagst en buigt het sterkst af.'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Misconcepties & Denkfouten rond Kleur en Licht',
            items: [
                'Fout: Denken dat wit licht "kleurloos" of enkelvoudig is. Feit: Wit licht bevat juist álle spectralkleuren tegelijkertijd.',
                'Fout: Denken dat het prisma pigment of verf toevoegt aan het licht. Feit: Het prisma scheidt enkel de verschillende golflengten door ongelijke brekingshoeken.',
                'Fout: ROGGBIV achterstevoren onthouden. Feit: De volgorde van afbuiging begint bij rood (minst afgebogen) en eindigt bij violet (sterkst afgebogen).',
                'Fout: Denken dat een regenboog een fysieke boog op een vaste plek in het landschap is. Feit: Een regenboog is een optische kegel rond de gezichtsas van de waarnemer!'
            ]
        },
        {
            layout: 'summary',
            title: 'De Vier Gouden Vuistregels van Les 12',
            items: [
                '1. Wit licht is polychromatisch en bestaat uit het continue ROGGBIV-spectrum.',
                '2. Dispersie (kleurschifting) ontstaat doordat verschillende kleuren licht een andere snelheid v hebben in glas of water.',
                '3. Brekingsvolgorde: Rood breekt het minst af (snelste v in glas), violet breekt het sterkst af (traagste v in glas).',
                '4. Een regenboog ontstaat door breking + dispersie + interne reflectie in waterdruppels (rood bovenaan op 42°, violet onderaan op 40°).'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor de finale van Thema 1!',
            subtitle: 'In de volgende les ontdekken we waarom voorwerpen (zoals paprika\'s en bananen) een specifieke kleur hebben.',
            stats: [
                { label: 'Thema', value: '1' },
                { label: 'Hoofdstuk', value: '5' },
                { label: 'Les', value: '1/2' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Bestaat wit zonlicht uit één enkele zuivere lichtkleur of uit een mengsel?',
                options: [
                    'Het is polychromatisch (een mengsel van alle spectralkleuren van het zichtbare spectrum)',
                    'Het is monochromatisch (één enkele, zuivere elektromagnetische frequentie)',
                    'Het bestaat uitsluitend uit een mengsel van rood en groen licht',
                    'Het is geen echt licht maar een optische illusie van onze hersenen'
                ],
                correct: 0,
                explanation: 'Wit licht is polychromatisch (samengesteld licht). Het bevat alle golflengten van het zichtbare spectrum door elkaar gemengd.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Wat gebeurt er met een schuin invallende lichtstraal wanneer hij van lucht overgaat in glas of water?',
                options: [
                    'De lichtstraal breekt naar de normaal toe omdat de snelheid in de dichtere stof afneemt',
                    'De lichtstraal breekt van de normaal weg omdat de snelheid toeneemt',
                    'De lichtstraal plant zich zonder richtingsverandering rechtdoor voort',
                    'De lichtstraal wordt altijd voor 100% geabsorbeerd'
                ],
                correct: 0,
                explanation: 'Bij de overgang van een optisch minder dichte stof (lucht, c = 300.000 km/s) naar een optisch dichtere stof (glas of water) daalt de lichtsnelheid en breekt de straal naar de normaal toe (brekingshoek r < invalshoek i).'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Hoe noemt men in de fysica het verschijnsel waarbij wit licht door breking gesplitst wordt in zijn afzonderlijke spectralkleuren?',
                options: [
                    'Dispersie (of kleurschifting)',
                    'Diffusie (of verstrooiing)',
                    'Condensatie',
                    'Fata morgana'
                ],
                correct: 0,
                explanation: 'Het splitsen van wit licht in spectralkleuren ten gevolge van breking heet dispersie of kleurschifting.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wat toonde Isaac Newton aan toen hij een tweede omgekeerd prisma achter een eerste prisma plaatste?',
                options: [
                    'Dat de uitgewaaierde kleuren weer exact samengevoegd kunnen worden tot een witte lichtbundel',
                    'Dat het glas van het tweede prisma permanent rood verkleurde',
                    'Dat licht in het tweede prisma volledig verdween door absorptie',
                    'Dat er een zwart gat ontstond achter het tweede prisma'
                ],
                correct: 0,
                explanation: 'Het tweede omgekeerde prisma voegde alle spectralkleuren weer samen tot wit licht. Daarmee bewees Newton onomstotelijk dat de kleuren eigenschappen zijn van het witte licht zelf en niet door het prisma worden "toegevoegd".'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Welke spectralkleur breekt bij het binnendringen van een glazen prisma het MINSTE af ten opzichte van de oorspronkelijke richting?',
                options: [
                    'Rood (omdat rood in glas de hoogste snelheid heeft en de kleinste brekingsindex ondervindt)',
                    'Violet (omdat violet de kortste golflengte heeft)',
                    'Groen (omdat groen precies in het midden ligt)',
                    'Alle kleuren breken altijd onder exact dezelfde hoek af'
                ],
                correct: 0,
                explanation: 'Rood licht heeft van alle zichtbare kleuren de langste golflengte en reist het snelst door glas. Daardoor buigt rood het minst af; violet reist het traagst en buigt het sterkst af.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Wat is de correcte volgorde van het zichtbare kleurenspectrum van minst afgebogen naar sterkst afgebogen?',
                options: [
                    'Rood - Oranje - Geel - Groen - Blauw - Indigo - Violet (ROGGBIV)',
                    'Violet - Indigo - Blauw - Groen - Geel - Oranje - Rood (VIBGGOR)',
                    'Rood - Groen - Blauw - Geel - Oranje - Violet',
                    'Blauw - Geel - Rood - Groen - Violet - Oranje'
                ],
                correct: 0,
                explanation: 'Het ezelsbruggetje ROGGBIV geeft de correcte volgorde van toenemende afbuiging en afnemende golflengte: Rood, Oranje, Geel, Groen, Blauw, Indigo, Violet.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Welke drie optische stappen doorloopt een zonnestraal in een bolvormige regendruppel bij het ontstaan van een hoofdregenboog?',
                options: [
                    '1: Breking en dispersie bij intreden water; 2: Totale interne reflectie aan de achterwand; 3: Tweede breking bij uittreden',
                    '1: Spiegeling op de buitenzijde van de druppel; 2: Absorptie; 3: Warmteafgifte',
                    '1: Buiging rond de druppel; 2: Schaduwvorming; 3: Diffuse reflectie',
                    '1: Totale reflectie bij intreden; 2: Breking in het middelpunt; 3: Polarisatie'
                ],
                correct: 0,
                explanation: 'Bij de hoofdregenboog treedt zonlicht binnen met breking en kleurschifting, kaatst aan de achterkant van de druppel intern terug door totale reflectie, en treedt aan de voorzijde weer uit met een tweede breking.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Natuurwetenschappelijke Verklaring: Jouw eigen regenboog',
                description: 'Wanneer je op een zonnige zomernamiddag met een tuinslang een fijne waternevel spuit, zie je plotseling een levendige mini-regenboog verschijnen. Verklaar aan de hand van de geziene optische wetten: (1) Waar moet de zon staan ten opzichte van jou en de waternevel? (2) Waarom zie je de kleur rood altijd aan de bovenste/buitenste boog en violet aan de onderste/binnenste rand?'
            }
        ]
    }
}
