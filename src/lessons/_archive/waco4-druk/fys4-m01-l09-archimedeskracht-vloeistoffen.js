/**
 * Opwaartse stuwkracht in vloeistoffen (Archimedes) - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 4: Archimedeskracht (Les 1/2)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 64-75)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l09-archimedeskracht-vloeistoffen',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Opwaartse Stuwkracht in Vloeistoffen (Archimedes)',
    description: 'Het ontstaan van de archimedeskracht door hydrostatisch drukverschil, de wet FA = ρ_vl · g · V_ond, de voorwaarden voor drijven, zweven en zinken, en VFO-vraagstukken.',

    config: {
        groenCode: 'F4M01L09',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 64-75)'
    },

    goals: [
        'Ik kan verklaren dat de archimedeskracht ontstaat doordat de hydrostatische druk aan de onderkant van een ondergedompeld lichaam groter is dan aan de bovenkant.',
        'Ik kan de wet van Archimedes formuleren: de opwaartse kracht is gelijk aan het gewicht van de verplaatste vloeistof: FA = ρ_vl · g · V_ond.',
        'Ik begrijp dat FA uitsluitend afhangt van de vloeistofdichtheid en het ondergedompelde volume (en NIET van de dichtheid of massa van het voorwerp zelf).',
        'Ik kan de criteria voor zinken (Fz > FA), zweven (Fz = FA) en drijven (Fz = FA bij deels ondergedompeld volume) beredeneren en kwantitatief toepassen.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 4: Archimedeskracht in Vloeistoffen (p. 64-75)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 64-68</strong> het drukverschilmodel en de badkuip-anekdote van Archimedes. Los in de oefeningenbundel op <strong>pagina 20-25 oefeningen 1, 3, 9, 10 en 14 (VFO)</strong> op.</p>',
        formulaHint: 'Formule: \\( F_A = \\rho_{\\text{vl}} \\cdot g \\cdot V_{\\text{ond}} \\). Zwaartekracht: \\( F_z = m \\cdot g = \\rho_{\\text{vw}} \\cdot g \\cdot V_{\\text{vw}} \\). Schijnbaar gewicht: \\( F_{\\text{sch}} = F_z - F_A \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over hydrostatische druk, volume (m³, dm³) en dichtheid.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & Probleemstelling',
                    description: 'Waarom weegt een zware steen onder water veel minder aan een veerunster dan in lucht?',
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
                    title: 'De Wet van Archimedes & Drijfcriteria',
                    description: 'Drukverschilmodel, formule FA = ρ_vl · g · V_ond, Karim in de zee en VFO-vraagstukken.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Krachtenlab: Drijven, Zweven & Zinken',
                    description: 'Simuleer opwaartse stuwkracht, schijnbaar gewicht en dichtheden.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhWaves'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 9, 10 en 14 (oefenbundel p. 21-24).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Archimedes Drijfcriteria Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Archimedes & Olympiade',
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
                    description: 'Samenvatting van de archimedeskracht in vloeistoffen en brug naar gassen.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de wet van Archimedes en rekenvaardigheid.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'forcesLab'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Drijven, Zweven en Zinken (WACO 4)',
            instruction: 'Koppel elke fysische toestand aan de juiste krachtsrelatie en dichtheidsverhouding.',
            pairs: [
                { term: 'Zinken in vloeistof', definition: 'F_z > F_A oftewel ρ_voorwerp > ρ_vloeistof: het voorwerp zakt naar de bodem' },
                { term: 'Zweven in vloeistof', definition: 'F_z = F_A oftewel ρ_voorwerp = ρ_vloeistof: voorwerp blijft op elke diepte in rust' },
                { term: 'Drijven aan het oppervlak', definition: 'F_z = F_A op het ondergedompelde deel; ρ_gemiddeld < ρ_vloeistof' },
                { term: 'Schijnbaar gewicht', definition: 'F_sch = F_z - F_A: de kracht die een veerunster onder water aangeeft' },
                { term: 'Verplaatste vloeistof', definition: 'Het volume vloeistof dat exact gelijk is aan het ondergedompelde volume van het voorwerp' },
                { term: 'Grootte van F_A hangt af van', definition: 'Uitsluitend de dichtheid van de vloeistof en het ondergedompelde volume (ρ_vl en V_ond)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Archimedes & Olympiadevraagstukken (WACO 4)',
            questions: [
                {
                    q: 'Karim duikt in de zee (ρ = 1 030 kg/m³, g = 9,81 N/kg). Met zijn uitrusting weegt hij 77 kg en heeft hij een volume van 72 dm³ (0,072 m³). Zal Karim zinken, zweven of stijgen?',
                    a: [
                        'Karim zinkt (want Fz = 755 N en FA = 1 030 · 9,81 · 0,072 = 727 N; Fz > FA)',
                        'Karim zweeft (Fz = FA)',
                        'Karim stijgt naar het oppervlak (FA > Fz)'
                    ],
                    c: 0
                },
                {
                    q: 'Een massief blok nikkel (ρ = 8 800 kg/m³) ondervindt in water een archimedeskracht van 12 N. Welke archimedeskracht meet je als je een even groot blok aluminium (ρ = 2 700 kg/m³) volledig onderdompelt in hetzelfde water?',
                    a: [
                        'Exact 12 N (want FA = ρ_water · g · V; het volume en het water zijn identiek!)',
                        'Minder dan 12 N, want aluminium is lichter.',
                        'Meer dan 12 N, want aluminium drijft makkelijker.',
                        '39 N'
                    ],
                    c: 0
                },
                {
                    q: 'Een voorwerp weegt aan een dynamometer in lucht 90 N en in water 60 N (FA,water = 30 N). In een onbekende vloeistof weegt het voorwerp 20 N (FA,vl = 70 N). Wat is de dichtheid van de onbekende vloeistof (VFO 2005; ρ_water = 1 000 kg/m³)?',
                    a: [
                        '2 333 kg/m³ (want ρ_vl = ρ_water · (FA,vl / FA,water) = 1 000 · (70 / 30) = 2 333 kg/m³)',
                        '1 333 kg/m³',
                        '1 500 kg/m³',
                        '3 000 kg/m³'
                    ],
                    c: 0
                },
                {
                    q: 'Een bal drijft op het water waarbij precies de helft boven water uitsteekt. Om de bal helemaal onder te duwen is een extra handkracht van 1,0 N nodig. Hoe groot is het gewicht Fz van de bal (VFO 2009)?',
                    a: [
                        '1,0 N (bij drijven is Fz = FA(halve bal); om de 2e helft onder te duwen is nog eens FA(halve bal) = 1,0 N nodig)',
                        '0,5 N',
                        '2,0 N',
                        'Niet te berekenen'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Opwaartse Stuwkracht in Vloeistoffen',
            subtitle: 'De wet van Archimedes, drijfcriteria en schijnbaar gewicht (WACO 4 p. 64-75)',
            badge: 'Fysica 4 - Les 9',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Het microscopische en hydrostatische ontstaan van de archimedeskracht verklaren.' },
                { icon: 'function', text: 'De formule FA = ρ_vl · g · V_ond begrijpen en correct toepassen.' },
                { icon: 'function', text: 'De drijf-, zweef- en zinkvoorwaarden fysisch beargumenteren en berekenen.' },
                { icon: 'function', text: 'Complexe vraagstukken (zoals van de Vlaamse Fysica Olympiade) stapsgewijs oplossen.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Waarom weeg je minder in het zwembad?',
            question: 'Wanneer je een zware vriend in het zwembad op je schouders tilt, lijkt hij vederlicht. Zodra hij uit het water stapt, bezwijk je bijna onder zijn gewicht. Heeft het water zijn massa verminderd?',
            hint: 'Denk aan de krachten: welke nieuwe kracht grijpt er onder water op hem aan?',
            revealText: 'Zijn massa (aantal kg) is absoluut niet veranderd! Maar het water oefent op zijn ondergedompelde lichaam een krachtige opwaartse stuwkracht (FA) uit die recht tegen de zwaartekracht in werkt. Het "schijnbaar gewicht" dat jij moet dragen is gelijk aan Fz - FA!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Hydrostatische Druk op Diepte',
            items: [
                { label: 'Diepte en druk', value: 'Hoe dieper in de vloeistof, hoe groter de hydrostatische druk: p = ρ · g · h.' },
                { label: 'Zijdelingse krachten', value: 'Op gelijke diepte heffen de zijwaartse drukkrachten elkaar perfect op.' },
                { label: 'Verticale krachten', value: 'De onderkant van een voorwerp zit ALTIJD dieper in het water dan de bovenkant!' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'worked-example',
            title: 'Waarom ontstaat er een Opwaartse Kracht?',
            problem: 'Waarom ontstaat er een Opwaartse Kracht?',
            steps: [
                { label: 'Stap 1: Kubus in water', content: 'Beschouw een kubus met grondvlak \\( A \\) en hoogte \\( H \\). De bovenkant bevindt zich op diepte \\( h_1 \\), de onderkant op diepte \\( h_2 = h_1 + H \\).' },
                { label: 'Stap 2: Neerwaartse kracht op bovenvlak', content: '\\( F_1 = p_1 \\cdot A = (\\rho_{\\text{vl}} \\cdot g \\cdot h_1) \\cdot A \\) (naar beneden gericht).' },
                { label: 'Stap 3: Opwaartse kracht op ondervlak', content: '\\( F_2 = p_2 \\cdot A = (\\rho_{\\text{vl}} \\cdot g \\cdot h_2) \\cdot A \\) (naar boven gericht).' },
                { label: 'Stap 4: Netto verticale kracht', content: '\\( F_A = F_2 - F_1 = \\rho_{\\text{vl}} \\cdot g \\cdot A \\cdot (h_2 - h_1) = \\rho_{\\text{vl}} \\cdot g \\cdot A \\cdot H \\).' },
                { label: 'Eindresultaat', content: 'Omdat \\( A \\cdot H = V \\) het volume van de kubus is, geldt: \\( F_A = \\rho_{\\text{vl}} \\cdot g \\cdot V_{\\text{ond}} \\)!' }
            ]
        },
        {
            layout: 'definition',
            term: 'De Wet van Archimedes',
            definition: 'Een voorwerp dat geheel of gedeeltelijk in een vloeistof is ondergedompeld, ondervindt een opwaarts gerichte kracht FA die gelijk is aan het GEWICHT van de door het voorwerp verplaatste vloeistof: \\( F_A = m_{\\text{verplaatste vloeistof}} \\cdot g = \\rho_{\\text{vl}} \\cdot g \\cdot V_{\\text{ond}} \\).'
        },
        {
            layout: 'properties',
            title: 'Klassieke Valkuil: Welke dichtheid gebruik je?',
            items: [
                { label: 'Grote FOUT', value: 'De massadichtheid van het voorwerp (ρ_voorwerp) invullen in de formule van Archimedes.' },
                { label: 'De REGEL uit WACO 4', value: 'In FA = ρ_vl · g · V_ond gebruik je ALTIJD de massadichtheid van de VLOEISTOF waarin het voorwerp zit!' },
                { label: 'Gevolg', value: 'Twee identieke bollen van 1 liter (één van lood en één van hout) ondervinden onder water PRECIES DEZELFDE opwaartse stuwkracht FA (namelijk 9,81 N)!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld: Karim in de Zee (WACO 4 Oef. 9 p. 21)',
            problem: 'Massa Karim met uitrusting \\( m = 77\\text{ kg} \\); volume \\( V = 72\\text{ dm}^3 = 0{,}072\\text{ m}^3 \\); zeewater \\( \\rho = 1\\,030\\text{ kg/m}^3 \\); \\( g = 9{,}81\\text{ N/kg} \\).',
            steps: [
                { label: 'Gegeven', content: 'Massa Karim met uitrusting \\( m = 77\\text{ kg} \\); volume \\( V = 72\\text{ dm}^3 = 0{,}072\\text{ m}^3 \\); zeewater \\( \\rho = 1\\,030\\text{ kg/m}^3 \\); \\( g = 9{,}81\\text{ N/kg} \\).' },
                { label: 'Gevraagd', content: 'Zal Karim zinken, zweven of stijgen?' },
                { label: 'Stap 1: Zwaartekracht', content: '\\( F_z = m \\cdot g = 77\\text{ kg} \\cdot 9{,}81\\text{ N/kg} = 755{,}37\\text{ N} \= 7{,}6 \\cdot 10^2\\text{ N} \\)' },
                { label: 'Stap 2: Archimedeskracht', content: '\\( F_A = \\rho_{\\text{vl}} \\cdot g \\cdot V = 1\\,030\\text{ kg/m}^3 \\cdot 9{,}81\\text{ N/kg} \\cdot 0{,}072\\text{ m}^3 = 727{,}51\\text{ N} \= 7{,}3 \\cdot 10^2\\text{ N} \\)' },
                { label: 'Stap 3: Krachten vergelijken', content: 'Omdat \\( F_z > F_A \\) (755 N > 728 N), is de nettokracht naar beneden gericht (27 N).' },
                { label: 'Antwoord', content: 'Karim zal langzaam naar de bodem zinken tenzij hij zijn trimvest met lucht opblaast om zijn volume te vergroten!' }
            ]
        },
        {
            layout: 'properties',
            title: 'De Drie Evenwichtstoestanden',
            items: [
                { label: '1. Zinken', value: 'Fz > FA ⇔ ρ_vw > ρ_vl: het voorwerp zinkt naar de bodem. Schijnbaar gewicht op de bodem: F_bodem = Fz - FA.' },
                { label: '2. Zweven', value: 'Fz = FA ⇔ ρ_vw = ρ_vl: het voorwerp blijft op elke willekeurige diepte bewegingloos hangen (duikboot in evenwicht, vis met zwemblaas).' },
                { label: '3. Drijven', value: 'Het voorwerp stijgt tot aan het oppervlak. Daar zinkt het net diep genoeg in zodat FA op het ondergedompelde deel exact gelijk is aan Fz: Fz = FA(V_ond).' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 4 Oef. 10 p. 21)',
            question: 'Een blok nikkel (dichtheid 8 800 kg/m³) ondervindt in water een archimedeskracht van 12 N. Welke archimedeskracht ondervindt een even groot blok aluminium (dichtheid 2 700 kg/m³) in hetzelfde water?',
            options: [
                { id: 'A', text: 'Minder dan 12 N, want aluminium weegt veel minder dan nikkel.', correct: false },
                { id: 'B', text: 'Exact 12 N (want FA hangt uitsluitend af van vloeistofdichtheid en volume).', correct: true },
                { id: 'C', text: 'Meer dan 12 N.', correct: false },
                { id: 'D', text: 'Nul newton.', correct: false }
            ],
            explanation: 'De formule voor de archimedeskracht luidt FA = ρ_vl · g · V_ond. Omdat beide blokken exact hetzelfde volume hebben en in dezelfde vloeistof (water) zijn ondergedompeld, verplaatsen ze exact hetzelfde gewicht aan water. De opwaartse kracht is voor beide blokken exact 12 N!'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Archimedeskracht in Vloeistoffen',
            items: [
                'Ontstaan: hydrostatische druk onderaan is groter dan bovenaan (Δp levert opwaartse FA).',
                'Wet van Archimedes: FA = ρ_vl · g · V_ond (gewicht van verplaatste vloeistof).',
                'FA hangt NIET af van de dichtheid van het voorwerp, enkel van het verplaatste vloeistofvolume.',
                'Zinken: Fz > FA (ρ_vw > ρ_vl). Zweven: Fz = FA (ρ_vw = ρ_vl). Drijven: Fz = FA(V_ond) (ρ_gem < ρ_vl).',
                'Schijnbaar gewicht aan een dynamometer: F_sch = Fz - FA.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 10!',
            subtitle: 'In les 10 breiden we Archimedes uit naar gassen (heteluchtballonnen) en ronden we Thema 1 af met een complete themasynthese.',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstuk', value: '4 Archimedes' },
                { label: 'Lesuur', value: '9 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Waarom weegt een zwaar massief rotsblok onder water schijnbaar minder dan in de lucht?',
                options: [
                    'Omdat de zwaartekracht onder water verdwijnt.',
                    'Omdat het water een opwaartse stuwkracht uitoefent die tegengesteld is aan de zwaartekracht.',
                    'Omdat de massa van de steen afneemt door het water.',
                    'Omdat de waterdruk de steen samendrukt.'
                ],
                correct: 1,
                explanation: 'Het water oefent een opwaarts gerichte archimedeskracht FA uit. De veerunster meet dan het schijnbare gewicht F_sch = Fz - FA.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Waaraan is de grootte van de archimedeskracht FA volgens de wet van Archimedes gelijk?',
                options: [
                    'Aan het gewicht van het ondergedompelde voorwerp.',
                    'Aan het gewicht van de verplaatste hoeveelheid vloeistof.',
                    'Aan de massa van de verplaatste vloeistof.',
                    'Aan de totale druk op de bodem van het vat.'
                ],
                correct: 1,
                explanation: 'De archimedeskracht is exact gelijk aan het GEWICHT (m · g = ρ_vl · g · V) van de verplaatste vloeistof.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Welke massadichtheid moet je invullen in de formule FA = ρ · g · V_ond?',
                options: [
                    'De massadichtheid van het ondergedompelde voorwerp.',
                    'De massadichtheid van de vloeistof waarin het voorwerp zich bevindt.',
                    'Het gemiddelde van beide massadichtheden.',
                    'De dichtheid van lucht.'
                ],
                correct: 1,
                explanation: 'In de formule van Archimedes staat ρ altijd voor de dichtheid van de omringende vloeistof (of het omringende gas).'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wanneer zal een massief voorwerp in een vloeistof zweven (op willekeurige diepte blijven hangen)?',
                options: [
                    'Als de zwaartekracht groter is dan de archimedeskracht.',
                    'Als de massadichtheid van het voorwerp exact gelijk is aan die van de vloeistof (Fz = FA).',
                    'Als het voorwerp lichter is dan lucht.',
                    'Als het voorwerp magnetisch is.'
                ],
                correct: 1,
                explanation: 'Bij zweven heerst er een perfect krachten-evenwicht: Fz = FA, wat equivalent is aan ρ_voorwerp = ρ_vloeistof.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een massief beeldje van 2,0 dm³ (0,0020 m³) wordt volledig ondergedompeld in water (ρ = 1 000 kg/m³, g = 9,81 N/kg). Hoe groot is de archimedeskracht op het beeldje?',
                options: [
                    'FA = 19,6 N (want FA = 1 000 · 9,81 · 0,0020 = 19,62 N)',
                    'FA = 2,0 N',
                    'FA = 196 N',
                    'FA = 0,20 N'
                ],
                correct: 0,
                explanation: 'FA = ρ_vl · g · V = 1 000 kg/m³ · 9,81 N/kg · 0,0020 m³ = 19,62 N = 19,6 N.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Aan een veerunster weegt een metalen cilinder in lucht 50 N. Volledig ondergedompeld in water wijst de veerunster nog 38 N aan. Wat is het volume van de cilinder (neem g = 9,81 N/kg, ρ_water = 1 000 kg/m³)?',
                options: [
                    'V = 1,2 dm³ (want FA = 50 - 38 = 12 N; V = FA / (ρ · g) = 12 / 9 810 = 0,00122 m³ = 1,22 dm³)',
                    'V = 5,0 dm³',
                    'V = 3,8 dm³',
                    'V = 0,12 dm³'
                ],
                correct: 0,
                explanation: 'FA = Fz - F_sch = 50 N - 38 N = 12 N. Volume V = FA / (ρ · g) = 12 / (1 000 · 9,81) = 0,00122 m³ = 1,2 dm³.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Hoe slaagt een gigantisch stalen containerschip van 100 000 ton (staaldichtheid 7 800 kg/m³) erin om te drijven op water (dichtheid 1 000 kg/m³)?',
                options: [
                    'Omdat de romp hol is en vol lucht zit, waardoor de gemiddelde dichtheid van het hele schip kleiner is dan die van water.',
                    'Omdat zout water staal automatisch afstoot.',
                    'Omdat de motoren het schip continu omhoog duwen.',
                    'Omdat de watermoleculen een stijve laag vormen onder het schip.'
                ],
                correct: 0,
                explanation: 'Door de holle scheepsromp gevuld met lucht is de totale massa gedeeld door het totale scheepsvolume (de gemiddelde dichtheid) veel kleiner dan 1 000 kg/m³.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Wetenschappelijke Verklaring & Afleiding',
                description: 'Leg in je eigen woorden uit hoe de hydrostatische druk p = ρ · g · h aan de basis ligt van het ontstaan van de opwaartse stuwkracht van Archimedes op een ondergedompeld lichaam.'
            }
        ]
    }
}
