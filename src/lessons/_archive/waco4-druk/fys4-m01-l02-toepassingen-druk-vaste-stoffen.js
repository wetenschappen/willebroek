/**
 * Toepassingen van druk bij vaste stoffen - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 1: Druk bij vaste stoffen (Les 2/2)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 15-23)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l02-toepassingen-druk-vaste-stoffen',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Toepassingen & Vraagstukken: Druk bij vaste stoffen',
    description: 'Praktische toepassingen van drukvergroting en drukverkleining in techniek, sport en natuur, met complexe vraagstukken (spijkerbed, rupsbanden, schaatsen en schaalvergroting).',

    config: {
        groenCode: 'F4M01L02',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 15-23)'
    },

    goals: [
        'Ik kan doelgericht bepalen of een technische aanpassing dient voor drukvergroting (A verkleinen) of drukverkleining (A vergroten).',
        'Ik kan verklaren hoe een fakir pijnloos op een spijkerbed kan liggen aan de hand van het totale contactoppervlak.',
        'Ik kan vraagstukken oplossen waarbij oppervlakte, kracht en druk moeten worden gecombineerd (zoals maximale massa op ijs).',
        'Ik kan voorspellen hoe de druk verandert wanneer een ruimtelijk voorwerp wordt geschaald (verhouding volume en oppervlakte).'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 1: Toepassingen en Vraagstukken (p. 15-23)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 15-18</strong> de voorbeelden van druk in de leefwereld. Los vervolgens in de oefeningenbundel op <strong>pagina 2-5 oefeningen 5, 6, 9, 10 en 11</strong> op.</p>',
        formulaHint: 'Formules: \\( p = \\frac{F}{A} \\), \\( F_G = m \\cdot g \\), \\( m = \\frac{p \\cdot A}{g} \\). Let op: \\( 1\\text{ cm}^2 = 10^{-4}\\text{ m}^2 \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Toets',
                    description: 'Controle op de basisformule p = F / A en eenhedenomzettingen van les 1.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & Probleemstelling',
                    description: 'Het mysterie van het spijkerbed en de 50-tons tank op zacht zand.',
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
                    title: 'Toepassingen & Diepte-analyse',
                    description: 'Drukvergroting vs. drukverkleining, schaalvergroting van kubussen en schaatsers op het ijs.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 5, 6, 9, 10 en 11 (oefenbundel p. 2-5).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: toepassingen van druk',
                    description: 'Vergelijk de druk van schaatsen, sneeuwschoenen en bakstenen.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Techniek & Natuur Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Toepassingen Vaste Stoffen',
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
                    title: 'Synthese van Hoofdstuk 1',
                    description: 'De vuistregels van druk bij vaste stoffen en vooruitblik naar gassen.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de toepassingen en berekeningen.',
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
            title: 'Biologische & Technische Aanpassingen',
            instruction: 'Koppel de biologische of technische aanpassing aan het juiste drukprincipe.',
            pairs: [
                { term: 'Brede voeten van een kameel', definition: 'Drukverkleining op woestijnzand om niet weg te zakken' },
                { term: 'Slagtanden van een walrus / leeuw', definition: 'Drukvergroting op een piepklein contactpunt om prooi te doorboren' },
                { term: 'Brede banden van landbouwtractor', definition: 'Drukverkleining om bodemverdichting op akkers tegen te gaan' },
                { term: 'Duimspijkerkop vs. punt', definition: 'Groot oppervlak aan duimzijde (kleine druk), vlijmscherpe punt aan houtzijde (hoge druk)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Vraagstukken Druk Vaste Stoffen (WACO 4)',
            questions: [
                {
                    q: 'Yusuf staat op schaatsen. De totale oppervlakte van beide stalen ijzers samen is 15 cm². Het ijs kan een maximale druk van 6,0 · 10⁵ Pa dragen. Hoe zwaar mag Yusuf maximaal zijn (g = 9,81 N/kg)?',
                    a: [
                        '92 kg (want m = (p · A) / g = (6,0·10⁵ · 15·10⁻⁴) / 9,81 = 900 / 9,81 = 91,7 kg)',
                        '60 kg',
                        '125 kg',
                        '45 kg'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom kan iemand op een spijkerbed liggen met 1 000 spijkers, maar zou diegene ernstig gewond raken bij het staan op slechts 1 enkele spijker?',
                    a: [
                        'Omdat bij 1 000 spijkers de totale contactoppervlakte 1 000 keer zo groot is, waardoor de druk per spijker onder de doordringdrempel van de huid blijft.',
                        'Omdat de zwaartekracht op een liggend lichaam veel kleiner is dan op een staand lichaam.',
                        'Omdat spijkers in een bed magnetisch zijn en elkaar afstoten.',
                        'Omdat spijkers in een bed flexibel meeveren.'
                    ],
                    c: 0
                },
                {
                    q: 'Stapel 1 bestaat uit 1 baksteen. Stapel 2 bestaat uit 3 bakstenen op elkaar op hetzelfde grondoppervlak. Stapel 3 bestaat uit 6 bakstenen (3 hoog, 2 breed). Welke relatie tussen de drukken p₁, p₂ en p₃ is JUIST?',
                    a: [
                        'p₂ = 3 · p₁ en p₃ = 3 · p₁ (want bij stapel 3 is zowel het gewicht als het oppervlak verdubbeld t.o.v. stapel 2)',
                        'p₃ = 6 · p₁ en p₂ = 3 · p₁',
                        'p₁ = p₂ = p₃',
                        'p₃ = 2 · p₂'
                    ],
                    c: 0
                },
                {
                    q: 'Een olifant heeft een massa van 4 000 kg en 4 poten met elk een oppervlak van 800 cm². Een dame van 60 kg staat op 2 naaldhakken van elk 0,5 cm². Wie oefent de grootste druk uit op de ondergrond?',
                    a: [
                        'De dame op naaldhakken (p = 5,9 · 10⁶ Pa t.o.v. p = 1,2 · 10⁵ Pa voor de olifant; bijna 50 keer zo groot!)',
                        'De olifant, omdat zijn massa 4 000 kg bedraagt.',
                        'Beide oefenen exact dezelfde druk uit.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Toepassingen van druk',
            subtitle: 'Drukvergroting, drukverkleining en vraagstukken (WACO 4 p. 15-23)',
            badge: 'Fysica 4 - Les 2',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Situaties in sport, natuur en techniek indelen in drukvergroting en drukverkleining.' },
                { icon: 'function', text: 'Het fysische geheim achter het spijkerbed en sneeuwschoenen verklaren.' },
                { icon: 'function', text: 'Complexe vraagstukken oplossen waarbij oppervlakte, maximale druk en massa worden gekoppeld.' },
                { icon: 'function', text: 'Beredeneren hoe druk verandert bij schaalvergroting van vaste lichamen (kubusprobleem).' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Fakir op het spijkerbed',
            question: 'Een fakir gaat ontspannen liggen op een houten bord met 1 200 vlijmscherpe stalen spijkers. Waarom doorboren de spijkers zijn huid niet, terwijl hij op 1 enkele spijker onmiddellijk zou bloeden?',
            hint: 'Denk aan de totale contactoppervlakte: wat gebeurt er met de totale A als er 1 200 contactpunten zijn?',
            revealText: 'Bij 1 200 spijkers wordt het totale lichaamsgewicht (bv. 700 N) verdeeld over 1 200 punten. De kracht per spijker is minder dan 0,6 N! De resulterende druk per spijkerpunt is daardoor veel te laag om door de taaie opperhuid heen te dringen.'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Formules en Afgeleiden',
            items: [
                { label: 'Basisformule', value: 'p = F / A (met p in Pa, F in N en A in m²)' },
                { label: 'Kracht berekenen', value: 'F = p · A (bij gekende druk en oppervlakte)' },
                { label: 'Oppervlakte berekenen', value: 'A = F / p (bij gekende kracht en maximale druk)' },
                { label: 'Gewichtskracht Fg', value: 'Fg = m · g (met g = 9,81 N/kg op aarde)' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'properties',
            title: 'Twee Strategieën in de Praktijk',
            items: [
                { label: 'Druk VERGROTEN', value: 'Doel: materiaal doorsnijden, doorboren of grip krijgen. Methode: contactoppervlak A zo klein mogelijk maken (A ↓ ⇒ p ↑).' },
                { label: 'Voorbeelden drukvergroting', value: 'Scherpe messen, injectienaalden, spijkers, schaatsijzers, naaldhakken, dorens en slagtanden.' },
                { label: 'Druk VERKLEINEN', value: 'Doel: wegzakken of beschadiging van de ondergrond voorkomen. Methode: contactoppervlak A zo groot mogelijk maken (A ↑ ⇒ p ↓).' },
                { label: 'Voorbeelden drukverkleining', value: 'Sneeuwschoenen, rupsbanden van bulldozers, brede tractorbanden, funderingsvoeten van gebouwen.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Voorbeeld 1: Yusuf op het ijs (WACO 4 Oef. 11 p. 5)',
            problem: 'Contactoppervlak 2 schaatsen: \\( A = 15\\text{ cm}^2 = 15 \\cdot 10^{-4}\\text{ m}^2 \\); maximale draagdruk ijs: \\( p_{\\text{max}} = 6{,}0 \\cdot 10^5\\text{ Pa} \\).',
            steps: [
                { label: 'Gegeven', content: 'Contactoppervlak 2 schaatsen: \\( A = 15\\text{ cm}^2 = 15 \\cdot 10^{-4}\\text{ m}^2 \\); maximale draagdruk ijs: \\( p_{\\text{max}} = 6{,}0 \\cdot 10^5\\text{ Pa} \\).' },
                { label: 'Gevraagd', content: 'Maximale massa \\( m \\) van Yusuf (in kg).' },
                { label: 'Formules', content: '\\( p = \\frac{F_G}{A} = \\frac{m \\cdot g}{A} \\Rightarrow m = \\frac{p \\cdot A}{g} \\)' },
                { label: 'Berekening', content: '\\( m = \\frac{6{,}0 \\cdot 10^5\\text{ N/m}^2 \\cdot 15 \\cdot 10^{-4}\\text{ m}^2}{9{,}81\\text{ N/kg}} = \\frac{900\\text{ N}}{9{,}81\\text{ N/kg}} \= 91{,}7\\text{ kg} \= 92\\text{ kg} \\)' },
                { label: 'Antwoord', content: 'Yusuf mag maximaal 92 kg wegen om niet door het ijs te zakken.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Voorbeeld 2: Het Kubus-schaalprobleem (WACO 4 Oef. 10 p. 4)',
            problem: 'Een kubus met ribbe \\( z \\) oefent druk \\( p_1 \\) uit. Een tweede kubus heeft een ribbe \\( 2z \\) en is van hetzelfde materiaal.',
            steps: [
                { label: 'Situatie', content: 'Een kubus met ribbe \\( z \\) oefent druk \\( p_1 \\) uit. Een tweede kubus heeft een ribbe \\( 2z \\) en is van hetzelfde materiaal.' },
                { label: 'Volume & Gewicht', content: '\\( V_1 = z^3 \\Rightarrow V_2 = (2z)^3 = 8z^3 = 8 V_1 \\). Het gewicht \\( F_G \\) wordt dus 8 keer groter!' },
                { label: 'Contactoppervlak', content: '\\( A_1 = z^2 \\Rightarrow A_2 = (2z)^2 = 4z^2 = 4 A_1 \\). Het oppervlak wordt 4 keer groter.' },
                { label: 'Drukberekening', content: '\\( p_2 = \\frac{F_{G2}}{A_2} = \\frac{8 F_{G1}}{4 A_1} = 2 \\cdot \\frac{F_{G1}}{A_1} = 2 p_1 \\)' },
                { label: 'Conclusie', content: 'De druk verdubbelt! Dit verklaart waarom reusachtige dieren (zoals olifanten) relatief veel bredere poten nodig hebben dan muizen.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Olifant versus Naaldhak: De Cijfers',
            items: [
                { label: 'Olifant (4 000 kg)', value: 'Fg = 39 240 N. 4 poten van 800 cm² = 0,32 m². Druk: p = 39 240 / 0,32 = 1,2 · 10⁵ Pa (120 kPa).' },
                { label: 'Dame op 2 naaldhakken (60 kg)', value: 'Fg = 588,6 N. 2 hakjes van 0,5 cm² = 0,0001 m². Druk: p = 588,6 / 0,0001 = 5,9 · 10⁶ Pa (5 900 kPa)!' },
                { label: 'Vergelijking', value: 'De naaldhak oefent bijna 50 keer meer druk uit op de vloer dan de zware olifant! Daarom zijn naaldhakken verboden op houten sportvloeren.' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 4 Oef. 9 p. 4)',
            question: 'Stapel 1 is 1 baksteen. Stapel 2 bestaat uit 3 stenen op elkaar. Stapel 3 bestaat uit 6 stenen (3 hoog, 2 breed). Welke relatie tussen de drukken p₁, p₂ en p₃ is JUIST?',
            options: [
                { id: 'A', text: 'p₂ = 3 · p₁ en p₃ = 6 · p₁', correct: false },
                { id: 'B', text: 'p₂ = 3 · p₁ en p₃ = 3 · p₁', correct: true },
                { id: 'C', text: 'p₁ = p₂ = p₃', correct: false },
                { id: 'D', text: 'p₃ = 2 · p₂', correct: false }
            ],
            explanation: 'Bij stapel 2: F is 3x groter, A blijft gelijk, dus p₂ = 3 · p₁. Bij stapel 3: F is 6x groter en A is 2x groter, dus p₃ = (6/2) · p₁ = 3 · p₁. Hierdoor is p₃ exact gelijk aan p₂!'
        },
        {
            layout: 'properties',
            title: 'Wetenschappelijke Vuistregels',
            items: [
                { label: 'Veiligheidsfactor', value: 'In bouwkunde en sport berekent men altijd p_max om scheuren, indeuken of breken te voorkomen.' },
                { label: 'Bodemverdichting', value: 'Zware landbouwmachines vernielen de bodemstructuur als de banden niet breed genoeg zijn.' },
                { label: 'Glijfilm op ijs', value: 'De zeer hoge druk onder het schaatsijzer (in combinatie met wrijvingswarmte) creëert een vloeibaar waterfilmpje waarop de schaats glijdt.' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Hoofdstuk 1 Vaste Stoffen',
            items: [
                'Druk p = F / A: beschrijft het vervormend effect van een loodrechte kracht.',
                'Drukvergroting: A verkleinen (mes, naald, schaats).',
                'Drukverkleining: A vergroten (sneeuwschoen, rupsband, spijkerbed).',
                'Schaalvergroting: een groter meetkundig gelijk lichaam oefent een grotere druk uit (volume groeit met z³, oppervlakte slechts met z²).'
            ]
        },
        {
            layout: 'closing',
            title: 'Einde van Hoofdstuk 1',
            subtitle: 'In les 3 verlaten we de vaste stoffen en onderzoeken we hoe druk ontstaat in gassen en onze atmosfeer.',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstuk', value: '1 Afgerond' },
                { label: 'Lesuur', value: '2 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat is de wiskundig juiste omvorming van de drukformule om het contactoppervlak A te berekenen?',
                options: [
                    'A = p · F',
                    'A = F / p',
                    'A = p / F',
                    'A = F + p'
                ],
                correct: 1,
                explanation: 'Uit p = F / A volgt door vermenigvuldigen met A en delen door p: A = F / p.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Hoeveel vierkante meter (m²) is 15 cm²?',
                options: [
                    '0,15 m²',
                    '0,015 m²',
                    '0,0015 m² (of 15 · 10⁻⁴ m²)',
                    '1,5 m²'
                ],
                correct: 2,
                explanation: '1 cm² = 10⁻⁴ m². Dus 15 cm² = 15 · 10⁻⁴ m² = 0,0015 m².'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Een houten blok oefent een druk van 400 Pa uit. Welke maatregel zorgt ervoor dat de druk stijgt naar 800 Pa?',
                options: [
                    'Het contactoppervlak verdubbelen bij gelijk gewicht.',
                    'Het contactoppervlak halveren bij gelijk gewicht.',
                    'Zowel het gewicht als het contactoppervlak verdubbelen.',
                    'Het gewicht halveren bij gelijk oppervlak.'
                ],
                correct: 1,
                explanation: 'Druk is omgekeerd evenredig met het oppervlak (p = F / A). Als het contactoppervlak halveert, verdubbelt de druk.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Waarom heeft een rupsband van een bulldozer een zeer grote oppervlakte?',
                options: [
                    'Om de zwaartekracht op de bulldozer te verkleinen.',
                    'Om de druk op de zachte ondergrond te verkleinen zodat de bulldozer niet wegzakt.',
                    'Om de wrijving met de grond volledig tot nul te herleiden.',
                    'Om sneller te kunnen rijden op asfalt.'
                ],
                correct: 1,
                explanation: 'Door het contactoppervlak A fors te vergroten, wordt de druk p op de grond veel kleiner, waardoor het zware voertuig niet wegzakt.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een fakir heeft een gewicht van 600 N en ligt op een spijkerbed met 1 500 spijkers. De punt van elke spijker heeft een oppervlakte van 0,002 cm² (2 · 10⁻⁷ m²). Hoe groot is de gemiddelde druk onder één spijkerpunt?',
                options: [
                    'p = 2,0 · 10⁶ Pa (2,0 MPa, ver onder de doorsteekdrempel)',
                    'p = 3,0 · 10⁸ Pa',
                    'p = 400 Pa',
                    'p = 1,5 · 10³ Pa'
                ],
                correct: 0,
                explanation: 'Kracht per spijker F = 600 N / 1 500 = 0,4 N. Druk p = F / A = 0,4 N / (2 · 10⁻⁷ m²) = 2,0 · 10⁶ Pa (2,0 MPa).'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Bij een kubus van massief koper met ribbe z is de druk op de tafel p₁. Een tweede massieve koperen kubus heeft een ribbe van 3z. Wat is de druk p₂?',
                options: [
                    'p₂ = 3 · p₁',
                    'p₂ = 9 · p₁',
                    'p₂ = 27 · p₁',
                    'p₂ = p₁'
                ],
                correct: 0,
                explanation: 'Volume (en dus gewicht) stijgt met 3³ = 27. Oppervlakte stijgt met 3² = 9. Druk p₂ = (27 / 9) · p₁ = 3 · p₁.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Welke van onderstaande toepassingen berust op drukvergroting door oppervlakteverkleining?',
                options: [
                    'Sneeuwschoenen om over diepe sneeuw te lopen.',
                    'De stalen punt van een injectienaald om een ader aan te prikken.',
                    'De brede betonnen funderingsplaat onder een appartementsgebouw.',
                    'De brede houten biels onder een spoorwegrail.'
                ],
                correct: 1,
                explanation: 'Een injectienaald heeft een microscopisch kleine punt (kleine A), waardoor met een minieme spierkracht een enorme druk ontstaat die de huid vlot doorboort.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Toepassingsvraag',
                description: 'Leg uit waarom een schaatser op flinterdunne schaatsijzers soepel over het ijs glijdt, maar op gewone wandelschoenen met rubberen zolen nauwelijks vooruitkomt.'
            }
        ]
    }
}
