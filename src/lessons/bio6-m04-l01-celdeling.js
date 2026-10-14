export default {
    id: 'bio6-m04-l01-celdeling',
    subject: 'biology',
    className: '6de middelbaar',

    config: {
        title: 'Celcyclus, mitose en meiose',
        description: 'Thema 4, deel 2. Lesverloop over 2 × 50 minuten: in uur 1 geeft de leerkracht de theorie met de drie simulaties op het scherm; in uur 2 maken leerlingen de handboekopgaven en kunnen ze de simulaties zelfstandig gebruiken.',
        groenCode: 'B6M4L1',
        groenAntwoord: 'biologie',
        masterCode: 'wetenschappen',
        classId: '6MOWE+6SPOWE',
        textbook: 'WACO 5 Biologie: Thema 4: DNA en celdeling'
    },

    goals: [
        'Ik kan de fasen van de celcyclus beschrijven en uitleggen wat er in G₁, S, G₂ en G₀ gebeurt.',
        'Ik kan de fasen van de mitose in de juiste volgorde uitleggen en het resultaat voorspellen.',
        'Ik kan uitleggen hoe meiose leidt tot vier haploïde gameten en hoe crossing-over en mixing genetische variatie veroorzaken.',
        'Ik kan uitleggen hoe falende celcycluscontrole kan bijdragen aan kanker en waarom apoptose beschermend werkt.',
        'Ik kan mitose en meiose vergelijken op basis van delingen, chromosomenaantal en genetische overeenkomst.'
    ],

    workbook: {
        title: 'Oefeningen: celdeling',
        subtitle: 'Thema 4: deel 2',
        exercises: [
            { id: '1', number: '1', title: 'Moeder- en dochtercellen', page: '182' },
            { id: '2', number: '2', title: 'Interfase en de celcyclus', page: '182' },
            { id: '3', number: '3', title: 'Fasen van de mitose', page: '182' },
            { id: '4', number: '4', title: 'Herhaalde mitotische delingen', page: '182' },
            { id: '5', number: '5', title: 'Mitose en meiose vergelijken', page: '183' },
            { id: '6', number: '6', title: 'Celdeling en fase herkennen', page: '183' },
            { id: '7', number: '7', title: 'Waarom geen crossing-over bij mitose?', page: '183' },
            { id: '8', number: '8', title: 'Een delingsfiguur interpreteren', page: '183' },
            { id: '9', number: '9', title: 'Crossing-over en mixing', page: '183' },
            { id: '10', number: '10', title: 'Chromosomenaantal tijdens de meiose', page: '183' },
            { id: '11', number: '11', title: 'Vorming van zaadcellen schematiseren', page: '183' },
            { id: '12', number: '12', title: 'Chromatiden tijdens de meiose', page: '183' },
            { id: '13', number: '13', title: 'Bijen: haploïd of diploïd?', page: '184' },
            { id: '14', number: '14', title: 'Een chromosoomafwijking bij een tweeling', page: '184' }
        ]
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Voorkennis: DNA en chromosomen',
                    description: 'Activeer wat je al weet over chromosomen en gameten.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Van één cel naar een organisme',
                    description: 'Instapvraag en doelen voor de twee lesuren.',
                    action: 'presentation',
                    slidesKey: 'slidesA'
                }
            ]
        },
        stepB: {
            step: 'B', title: 'Verwerken', time: '30 min',
            cards: [
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Celdeling: drie simulaties',
                    description: 'Celcyclus, mitose en meiose: eerst klassikaal op het scherm, daarna zelfstandig op de laptop.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhShapes'
                },
                {
                    id: 'card-pres-b',
                    type: 'class',
                    title: 'Theorie: celdeling stap voor stap',
                    description: 'Kernbegrippen en overzicht om bij de simulaties te gebruiken.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Alle handboekopgaven: celdeling',
                    description: 'Werk in het tweede lesuur de oefeningen 1–14 af op pagina 182–184. Gebruik de simulaties wanneer je een proces opnieuw wilt bekijken.',
                    action: 'workbook',
                    icon: 'PhBookOpen',
                    exercises: [
                        { id: '1', number: '1', title: 'Moeder- en dochtercellen', page: '182' },
                        { id: '2', number: '2', title: 'Interfase en de celcyclus', page: '182' },
                        { id: '3', number: '3', title: 'Fasen van de mitose', page: '182' },
                        { id: '4', number: '4', title: 'Herhaalde mitotische delingen', page: '182' },
                        { id: '5', number: '5', title: 'Mitose en meiose vergelijken', page: '183' },
                        { id: '6', number: '6', title: 'Celdeling en fase herkennen', page: '183' },
                        { id: '7', number: '7', title: 'Waarom geen crossing-over bij mitose?', page: '183' },
                        { id: '8', number: '8', title: 'Een delingsfiguur interpreteren', page: '183' },
                        { id: '9', number: '9', title: 'Crossing-over en mixing', page: '183' },
                        { id: '10', number: '10', title: 'Chromosomenaantal tijdens de meiose', page: '183' },
                        { id: '11', number: '11', title: 'Vorming van zaadcellen schematiseren', page: '183' },
                        { id: '12', number: '12', title: 'Chromatiden tijdens de meiose', page: '183' },
                        { id: '13', number: '13', title: 'Bijen: haploïd of diploïd?', page: '184' },
                        { id: '14', number: '14', title: 'Een chromosoomafwijking bij een tweeling', page: '184' }
                    ]
                }
            ]
        },
        stepC: {
            step: 'C', title: 'Afsluiting', time: '5 min',
            cards: [
                {
                    id: 'card-pres-c',
                    type: 'class',
                    title: 'Kern van de celdeling',
                    description: 'Zet mitose en meiose naast elkaar.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exitticket',
                    description: 'Controleer de belangrijkste verschillen.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'cellDivisionLab',
            title: 'Celdeling: drie simulaties'
        }
    },

    slidesA: [
        { layout: 'title', title: 'Celcyclus, mitose en meiose', subtitle: 'Thema 4 · deel 2: celdeling', badge: 'Biologie', icon: 'dna' },
        { layout: 'steps', title: 'Twee lesuren, drie processen', steps: [
            { icon: 'function', text: 'Uur 1: we bouwen de theorie op met de drie simulaties.' },
            { icon: 'book-open', text: 'Uur 2: je maakt de handboekopgaven en gebruikt de simulaties waar nodig.' },
            { icon: 'target', text: 'Doel: verklaren wat er met chromosomen gebeurt tijdens celdeling.' }
        ]},
        { layout: 'predict', title: 'Denk eerst zelf na', question: 'Je lichaam bestaat uit biljoenen cellen, maar begon als één zygote. Hoe kan dat?', hint: 'Denk aan wat er met een cel gebeurt vóór en tijdens een deling.', revealText: 'Door herhaalde mitosen ontstaan nieuwe lichaamscellen; meiose vormt de gameten voor geslachtelijke voortplanting.' }
    ],

    slidesB: [
        { layout: 'comparison', title: 'Twee soorten deling', left: { title: 'Mitose', content: 'Eén deling → 2 diploïde dochtercellen. Ze zijn genetisch identiek aan elkaar en aan de moedercel. Nodig voor groei, herstel en vervanging; bij eukaryote eencelligen en bij plantenstekken ondersteunt mitose ongeslachtelijke voortplanting. Bacteriën delen door binaire deling, niet door mitose.' }, right: { title: 'Meiose', content: 'Twee opeenvolgende delingen → 4 haploïde dochtercellen. Ze zijn genetisch verschillend. Nodig voor de vorming van gameten.' } },
        { layout: 'steps', title: 'Celcyclus: interfase en deling', steps: [
            { icon: 'function', text: '<strong>G₁:</strong> celgroei en aanmaak van celbestanddelen; de cel beslist of ze verder deelt of naar G₀ gaat.' },
            { icon: 'book-open', text: '<strong>S:</strong> DNA-replicatie. Het chromosomenaantal blijft gelijk; elk chromosoom krijgt twee zusterchromatiden.' },
            { icon: 'check', text: '<strong>G₂:</strong> controle en herstel van DNA; voorbereiding op deling. Te grote schade kan apoptose veroorzaken.' },
            { icon: 'users', text: '<strong>M-fase:</strong> mitose of meiose, gevolgd door cytokinese.' }
        ]},
        { layout: 'steps', title: 'Mitose: wat gebeurt er?', steps: [
            { icon: 'brain', text: '<strong>Profase:</strong> chromosomen condenseren; de spoelfiguur wordt opgebouwd.' },
            { icon: 'check', text: '<strong>Metafase:</strong> chromosomen liggen afzonderlijk op het evenaarsvlak.' },
            { icon: 'users', text: '<strong>Anafase:</strong> zusterchromatiden scheiden en gaan naar tegenovergestelde polen.' },
            { icon: 'function', text: '<strong>Telofase en cytokinese:</strong> twee kernen en daarna twee identieke dochtercellen.' }
        ]},
        { layout: 'steps', title: 'Meiose I: homologe chromosomen', steps: [
            { icon: 'users', text: '<strong>Profase I:</strong> homologe chromosomen vormen tetrades; crossing-over wisselt DNA-segmenten uit tussen niet-zusterchromatiden.' },
            { icon: 'target', text: '<strong>Metafase I:</strong> homologe paren richten zich toevallig op; die willekeurige verdeling heet mixing.' },
            { icon: 'users', text: '<strong>Anafase I:</strong> homologe chromosomen scheiden (disjunctie); zusterchromatiden blijven samen.' },
            { icon: 'function', text: '<strong>Na meiose I:</strong> twee haploïde cellen, met chromosomen die nog uit twee chromatiden bestaan.' }
        ]},
        { layout: 'steps', title: 'Meiose II en het eindresultaat', steps: [
            { icon: 'users', text: 'Meiose II verloopt in beide cellen tegelijk; de zusterchromatiden worden van elkaar gescheiden.' },
            { icon: 'function', text: 'Er ontstaan vier haploïde dochtercellen (gameten), genetisch verschillend door mixing en crossing-over. Variatie binnen een populatie is belangrijk voor evolutie en aanpassing aan veranderende omstandigheden.' },
            { icon: 'check', text: 'Bij bevruchting versmelten twee haploïde kernen tot een diploïde zygote.' }
        ]},
        { layout: 'comparison', title: 'Plantencel en diercel', left: { title: 'Diercel', content: 'Centriolen helpen de spoelfiguur organiseren. Bij cytokinese snoert het celmembraan in.' }, right: { title: 'Plantencel', content: 'Plantencellen hebben geen centriolen. Tijdens cytokinese versmelten Golgi-blaasjes in het midden tot een celplaat; cellulose verstevigt die tot een nieuwe celwand.' } }
    ],

    slidesC: [
        { layout: 'summary', title: 'Wat moet je onthouden?', items: [
            'De interfase bestaat uit G₁, S en G₂; in de S-fase wordt het DNA gekopieerd.',
            'Mitose: één deling levert twee genetisch identieke diploïde dochtercellen op.',
            'Meiose: twee delingen leveren vier haploïde gameten op; crossing-over en mixing zorgen voor variatie.',
            'Bij bevruchting versmelten twee haploïde kernen tot een diploïde zygote.'
        ], keyTakeaway: 'Mitose behoudt het chromosomenaantal; meiose halveert het.' },
        { layout: 'closing', title: 'Klaar om te oefenen?', subtitle: 'Gebruik de drie simulaties als denkmodel bij de oefeningen uit het handboek.', stats: [{ label: 'Thema', value: '4' }, { label: 'Simulaties', value: '3' }] }
    ],

    entryTicket: {
        questions: [
            { id: 'en1', type: 'mc', question: 'Een menselijke lichaamscel is diploïd (2n = 46). Hoeveel chromosomen heeft een menselijke gameet?', options: ['23', '46', '92'], correct: 0 },
            { id: 'en2', type: 'mc', question: 'Wat bevat een homoloog chromosomenpaar?', options: ['Twee chromosomen met dezelfde soorten genen, één van elke ouder', 'Twee volledig identieke chromatiden', 'Twee chromosomen die alleen in gameten voorkomen'], correct: 0 }
        ]
    },

    exitTicket: {
        questions: [
            { id: 'ex1', type: 'mc', question: 'Wat is het resultaat van één mitotische deling van een diploïde moedercel?', options: ['Twee diploïde, genetisch identieke dochtercellen', 'Vier haploïde, genetisch unieke dochtercellen', 'Twee haploïde gameten'], correct: 0 },
            { id: 'ex2', type: 'mc', question: 'In welke fase vindt crossing-over plaats?', options: ['Profase I', 'Metafase II', 'Anafase van de mitose'], correct: 0 },
            { id: 'ex3', type: 'mc', question: 'Wat scheidt in anafase I van de meiose?', options: ['Homologe chromosomen; zusterchromatiden blijven samen', 'Zusterchromatiden', 'Twee dochterkernen'], correct: 0 }
        ]
    }
}
