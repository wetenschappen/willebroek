/**
 * Druk bij vaste stoffen - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE + 4SPOWE
 * Datum: 24/09/2026
 * Handboek: Plantyn WACO 4 Fysica (WACOF4DS2AL), Thema 1 Druk, hoofdstuk 1
 * Leerplan GO! D-finaliteit: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 *
 * GOUDEN STANDAARD. Deze les volgt de ABC-structuur uit
 * docs/EVALUATION-DOSSIER-THEMA1.md en src/lessons/_template.js exact:
 *
 *   A  Instap        card-entry + card-pres-a       15 min
 *   B  Verwerken     card-pres-b + card-workbook
 *                    + card-activity               30 min
 *   C  Afsluiting    card-pres-c + card-exit         5 min
 *
 * Contentregel: elke stelling, waarde en opgave is rechtstreeks uit het
 * handboek overgenomen. De bladzijde staat in de commentaar bij elk blok.
 */

export default {
    id: 'fys4-m01-druk-vaste-stoffen',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    date: '24/09/2026',
    title: 'Hydrostatische druk: druk bij vloeistoffen',
    description: 'Onderzoek hoe druk in vloeistoffen ontstaat: van de mensenpiramide naar de formule p = ρ · g · h en de hydrostatische paradox.',

    config: {
        // LessonHeader leest config.title en config.description; LessonView laadt
        // alleen het lesbestand, dus de titel staat hier, niet in modules.js.
        title: 'Hydrostatische druk: druk bij vloeistoffen',
        description: 'Onderzoek hoe druk in vloeistoffen ontstaat: van de mensenpiramide naar de formule p = ρ · g · h en de hydrostatische paradox.',

        groenCode: 'F4M01',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        date: '24/09/2026',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, hoofdstuk 3)',
        oplossingen: {
            url: 'https://wetenschappen.github.io/verbeteren/f4t1.pdf',
            code: 'donderdag',
            title: 'Correctiesleutel thema 1'
        }
    },

    goals: [
        'Ik kan met de analogie van een mensenpiramide verklaren waarom de druk in een vloeistof toeneemt met de diepte.',
        'Ik kan de formule voor hydrostatische druk (\\( p_{\\text{hydr}} = \\rho \\cdot g \\cdot h \\)) toepassen in berekeningen met correcte SI-eenheden.',
        'Ik kan beredeneren waarom de bodemdruk in een vloeistof enkel afhangt van de diepte en de vloeistofdichtheid, en niet van de vorm van het vat.',
        'Ik kan de praktische vuistregel hanteren dat in water elke 10 meter diepte ongeveer \\( 100\\,000\\text{ Pa} = 1\\text{ bar} \\) extra druk oplevert.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4 (Thema 1 Druk)',
        subtitle: 'Hoofdstuk 3: Druk bij vloeistoffen (p. 32-35)',
        instruction: '<p>Werk zelfstandig aan de opdrachten in je schrift en leerwerkboek. Gebruik het stappenplan (Gegeven, Gevraagd, Formule, Berekening, Antwoord) voor kwantitatieve vraagstukken.</p>',
        formulaHint: 'Hydrostatische druk: \\( p_{\\text{hydr}} = \\rho \\cdot g \\cdot h \\). Totale druk: \\( p_{\\text{tot}} = p_{\\text{atm}} + \\rho \\cdot g \\cdot h \\). Let op eenheden: \\( \\rho \\) in \\( \\text{kg/m}^3 \\), \\( h \\) in \\( \\text{m} \\), \\( g = 9{,}81\\text{ N/kg} \\), \\( p_{\\text{atm}} = 101\\,300\\text{ Pa} \\).'
    },

    timeline: {

        // ── STAP A: Instap (15 min) ───────────────────────────────────────────
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Wat weet je nog?',
                    description: 'Herinner je je het verschil tussen normdruk, onderdruk en overdruk uit de vorige les?',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Druk in lagen: de mensenpiramide',
                    description: 'Van de belasting in een acrobatische toren naar de druk op diepte in water.',
                    action: 'presentation',
                    slidesKey: 'slidesA'
                }
            ]
        },

        // ── STAP B: Verwerken (30 min) ────────────────────────────────────────
        stepB: {
            step: 'B', title: 'Verwerken', time: '30 min',
            cards: [
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Afleiding van de formule',
                    description: 'Bouw in 4 denkstappen de formule voor hydrostatische druk op.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhShapes'
                },
                {
                    id: 'card-pres-b',
                    type: 'class',
                    title: 'Hydrostatische druk',
                    description: 'De formule p = ρ · g · h, de eenheden en de hydrostatische paradox.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Boekopdrachten WACO',
                    description: 'Maak oefening 5, 9 en 3 in je leerwerkboek over vloeistofdruk.',
                    action: 'workbook',
                    icon: 'PhBookOpen',
                    exercises: 'Opdracht 5 (p. 33): Twee duikers op 10,0 m diepte in meer vs. Noordzee (invloed van dichtheid en diepte)\n' +
                               'Opdracht 9 (p. 35): Stuwdam met 5,00 · 10⁵ Pa waterdruk (bereken stuwmeerdiepte h)\n' +
                               'Opdracht 3 (p. 32): Totale druk in de Noordzee op 20,00 m diepte (inclusief normdruk)'
                }
            ],
            extraActivities: [
                {
                    id: 'extra-begrippen',
                    title: 'Grootheden en eenheden koppelen',
                    category: 'Begripsvorming',
                    icon: 'PhArrowsDownUp'
                },
                {
                    id: 'extra-olympiade',
                    title: 'Olympiade: bodemdruk vergelijken',
                    category: 'Inzicht en verdieping',
                    icon: 'PhLightbulb'
                }
            ]
        },

        // ── STAP C: Afsluiting (5 min) ────────────────────────────────────────
        stepC: {
            step: 'C', title: 'Afsluiting', time: '5 min',
            cards: [
                {
                    id: 'card-pres-c',
                    type: 'class',
                    title: 'Samenvatting',
                    description: 'De kerninzichten en vuistregels over vloeistofdruk op een rij.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit ticket',
                    description: 'Vier snelle denkvragen om te controleren of je de essentie mee hebt.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    // ── ACTIVITIES ────────────────────────────────────────────────────────────
    activities: {
        main: {
            type: 'pressureLab',
            title: 'Afleiding van de formule'
        },
        'extra-begrippen': {
            type: 'dragDrop',
            title: 'Koppel grootheid en eenheid bij vloeistofdruk',
            instruction: 'Sleep elke fysische grootheid naar de juiste definitie of eenheid.',
            pairs: [
                { term: 'Hydrostatische druk (p_hydr)', definition: 'Druk door het eigen gewicht van de bovenliggende vloeistofkolom (Pa)' },
                { term: 'Massadichtheid (ρ)', definition: 'Massa per volume vloeistof in kg/m³ (zoet water = 1 000 kg/m³)' },
                { term: 'Diepte (h)', definition: 'Verticale afstand onder het vloeistofoppervlak in meter (m)' },
                { term: 'Totale druk (p_tot)', definition: 'Som van atmosferische luchtdruk en hydrostatische druk (p_atm + p_hydr)' }
            ]
        },
        'extra-olympiade': {
            type: 'mixedRetrieval',
            title: 'Vlaamse Fysica Olympiade: hydrostatische paradox',
            questions: [
                {
                    q: 'Vier vaten A, B, C en D hebben verschillende vormen. In vat A (hoogte h, water ρ), vat B (hoogte h, zout water 2ρ), vat C (hoogte 2h, water ρ) en vat D (hoogte 2h, zout water 2ρ). In welk vat is de bodemdruk maximaal? (Olympiade 2009 / WACO p. 34)',
                    a: [
                        'Vat D: p = 2ρ · g · 2h = 4 · ρ · g · h',
                        'Vat C: p = ρ · g · 2h = 2 · ρ · g · h',
                        'Vat B: p = 2ρ · g · h = 2 · ρ · g · h',
                        'In alle vier de vaten is de druk gelijk'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom heeft een stuwdam onderaan altijd een veel dikkere betonnen wand dan bovenaan?',
                    a: [
                        'Omdat de hydrostatische druk p = ρ · g · h evenredig toeneemt met de diepte, waardoor de uitgeoefende kracht onderaan het grootst is.',
                        'Omdat de watertemperatuur op de bodem van het meer veel lager is.',
                        'Omdat het stuwmeer onderaan breder is dan bovenaan.'
                    ],
                    c: 0
                },
                {
                    q: 'In de hydrostatische paradox hebben twee vaten met dezelfde bodemoppervlakte en waterhoogte exact dezelfde bodemdruk, ook al bevat vat 1 drie keer zoveel watermassa als vat 2. Waarom?',
                    a: [
                        'Omdat bodemdruk enkel afhangt van de verticale waterkolomhoogte h en massadichtheid ρ, niet van de vatvorm.',
                        'Omdat het extra water in vat 1 geen gewicht heeft.',
                        'Omdat de luchtdruk het verschil compenseert.'
                    ],
                    c: 0
                }
            ]
        }
    },

    // ─── SLIDES ───────────────────────────────────────────────────────────────

    slidesA: [
        {
            layout: 'title',
            title: 'Hydrostatische druk',
            subtitle: 'Thema 1: Druk in vloeistoffen',
            badge: 'Theorie',
            icon: 'atom'
        },
        {
            layout: 'hero',
            title: 'De mensenpiramide',
            subtitle: 'We zagen al druk in gassen. Hoe zit het bij vloeistoffen?<br><br>Denk aan een mensenpiramide: hoe lager je staat, hoe meer gewicht er op je rust.',
            image: '/assets/castellers_piramide.jpg',
            credit: 'Gewichtsverdeling in lagen'
        },
        {
            layout: 'comparison',
            title: 'Van atleten naar water',
            left: {
                title: 'Net onder water',
                content: '<span style="color: var(--color-digital); font-weight: bold; font-size: 1.2em;">h = 0,2 m</span><br><br>Er ligt nauwelijks water op je. De neerwaartse druk is minimaal.'
            },
            right: {
                title: 'Diep in de zee',
                content: '<span style="color: var(--color-presentation); font-weight: bold; font-size: 1.2em;">h = 5,0 m</span><br><br>Een massieve kolom water rust op je. Het totale gewicht duwt hard naar beneden.'
            }
        }
    ],

    slidesB: [
        {
            layout: 'title',
            title: 'Hydrostatische Druk',
            subtitle: 'Formalisatie van de formule',
            badge: 'Theorie',
            icon: 'calculator'
        },
        {
            layout: 'big',
            title: 'De afleiding samengevat',
            content: 'Zojuist zagen we dat het <strong>grondvlak A wegberekenbaar is</strong>.<br><br>De druk wordt dus uitsluitend veroorzaakt door de <span style="color: var(--color-digital); font-weight: bold;">diepte</span> en de <span style="color: var(--color-digital); font-weight: bold;">dichtheid</span> van de vloeistof.'
        },
        {
            layout: 'equation',
            title: 'Hydrostatische druk',
            equation: '\\( p_{\\text{hydr}} = \\rho \\cdot g \\cdot h \\)',
            variables: [
                { symbol: '\\( p_{\\text{hydr}} \\)', meaning: 'Hydrostatische druk', unit: 'Pa' },
                { symbol: '\\( \\rho \\)', meaning: 'Massadichtheid', unit: 'kg/m³' },
                { symbol: '\\( g \\)', meaning: 'Zwaarteveldsterkte', unit: 'N/kg' },
                { symbol: '\\( h \\)', meaning: 'Diepte', unit: 'm' }
            ]
        },
        {
            layout: 'comparison',
            title: 'De hydrostatische paradox',
            left: {
                title: 'De misvatting',
                content: '<span style="color: var(--color-presentation); font-size: 1.2em; font-weight: bold; display: block; margin-bottom: 0.5rem;">[FOUT]</span>"Meer water betekent altijd meer druk op de bodem."<br><br>Men denkt ten onrechte dat een grote bak water harder drukt dan een smalle buis.'
            },
            right: {
                title: 'De werkelijkheid',
                content: '<span style="color: var(--color-workbook); font-size: 1.2em; font-weight: bold; display: block; margin-bottom: 0.5rem;">[JUIST]</span>In \\( p = \\rho \\cdot g \\cdot h \\) staat geen volume of vorm.<br><br>Twee vaten met <strong>hetzelfde vloeistofpeil</strong> hebben op de bodem <strong>exact dezelfde druk</strong>.'
            }
        },
        {
            layout: 'comparison',
            title: 'Vuistregel voor duikers',
            left: {
                title: 'Water',
                content: '1 meter diepte levert in zoet water ongeveer \\( 10\\,000\\text{ Pa} \\) extra druk op.'
            },
            right: {
                title: 'Diepzee',
                content: '<span style="color: var(--color-workbook); font-size: 1.5em; font-weight: bold;">+ 1 bar per 10m</span><br><br>Elke 10 meter dalen verhoogt de hydrostatische druk met afgerond 1 bar.'
            }
        },
        {
            layout: 'worked-example',
            title: 'Uitgewerkt: Totale druk',
            method: 'Vergeet de atmosfeer niet (101 300 Pa) die bovenop het water drukt!',
            problem: 'Bereken de totale druk in de Noordzee op een diepte van 20,00 m (\\( \\rho = 1\\,025\\text{ kg/m}^3 \\)).',
            steps: [
                { label: 'Gegeven', content: '\\( h = 20{,}00\\text{ m} \\), \\( \\rho = 1\\,025\\text{ kg/m}^3 \\), \\( p_{\\text{atm}} = 101\\,300\\text{ Pa} \\)' },
                { label: 'Gevraagd', content: '\\( p_{\\text{tot}} = ? \\)' },
                { label: 'Formule', content: '\\( p_{\\text{tot}} = p_{\\text{atm}} + \\rho \\cdot g \\cdot h \\)' },
                { label: 'Berekening', content: '\\( p_{\\text{tot}} = 101\\,300 + (1\\,025 \\cdot 9{,}81 \\cdot 20{,}00) = 302\\,405\\text{ Pa} \\)' }
            ],
            answer: 'De totale druk is \\( 3{,}02 \\cdot 10^5\\text{ Pa} \\).'
        }
    ],

    slidesC: [
        {
            layout: 'title',
            title: 'Samenvatting',
            subtitle: 'Hydrostatische druk',
            badge: 'Samenvatting',
            icon: 'check'
        },
        {
            layout: 'comparison',
            title: 'Wat bepaalt de druk?',
            left: {
                title: 'Wél invloed',
                content: '<span style="color: var(--color-digital); font-size: 1.2em; font-weight: bold;">Diepte (h) & Dichtheid (ρ)</span><br><br>Hoe dieper, of hoe zwaarder de vloeistof, hoe groter de druk.'
            },
            right: {
                title: 'Géén invloed (Paradox)',
                content: '<span style="color: var(--color-presentation); font-size: 1.2em; font-weight: bold;">Vorm & Volume</span><br><br>De totale hoeveelheid water en de breedte van het vat maken wiskundig geen enkel verschil.'
            }
        },
        {
            layout: 'standard',
            title: 'Klaar voor het exit ticket?',
            content: 'Neem je laptop erbij en test jezelf met 4 snelle diagnostische vragen. Succes!'
        }
    ],

    // ─── TICKETS ──────────────────────────────────────────────────────────────

    /**
     * Instapticket: sorteren in drie kolommen.
     *
     * Elke kaart draagt zijn juiste kolom in de data (`item.column`), dus de
     * oplossing staat in het lesbestand en niet in de component.
     *
     * BRONNEN (Handleiding WACO 4 Fysica, Thema 1):
     *   p. 18 = handboek p. 26, samenvatting hoofdstuk 2:
     *     "De normdruk is 1 013 hPa (of 1 013 mbar) groot."
     *     "Bij overdruk is de druk in een vat hoger dan de atmosferische druk,
     *      bij onderdruk lager."
     *     oefening 3: "... de normale luchtdruk van 101 300 Pa ..."
     *   p. 20 = handboek p. 28, oefening 9: "Noteer of het in de volgende
     *     situaties om een onderdruk of een overdruk gaat." met situaties a-e.
     *   p. 21 = handboek p. 29: "In het ISS heerst de normdruk en de druk aan de
     *     buitenkant is te verwaarlozen."
     *   p. 16 = handboek p. 24: ademhaling "werkt volgens het principe van de
     *     onderdruk": de borstkas wordt groter en de buitenlucht stroomt naar
     *     binnen.
     *
     * LET OP bij het verbeteren: dit is exact de indeling van de officiële
     * correctiesleutel (OSPLKITWACOF4DS2 p. 9): de fietsband, de ballon en het
     * vliegtuig zijn OVERdruk, de koffie en het flesje zijn ONDERdruk. De
     * fietsband is dus geen onderdruk: er stroomt lucht uit omdat de druk in de
     * band hoger is dan de atmosferische druk.
     */
    entryTicket: {
        questions: [
            {
                id: 'entry-sort',
                type: 'column-sort',
                // Meteen groen of rood per kaart. Dit is een diagnostisch
                // instapticket: de leerling moet meteen zien wat al zit en
                // wat nog niet, zodat hij weet waar hij moet opletten.
                revealAnswers: true,
                question: 'Sorteer: normdruk, onderdruk of overdruk?',
                description: 'Sleep elke kaart naar de kolom die erbij hoort. Je ziet meteen of je goed zit.',
                columns: [
                    {
                        id: 'normdruk',
                        label: 'Normdruk',
                        hint: 'De standaarddruk waarop we alles vergelijken.',
                        items: [
                            {
                                id: 'norm-1',
                                column: 'normdruk',
                                text: 'De gemiddelde luchtdruk op zeeniveau is afgerond \\( 101\\,300\\text{ Pa} \\).'
                            },
                            {
                                id: 'norm-2',
                                column: 'normdruk',
                                text: 'Die standaarddruk schrijf je ook als \\( 1\\,013\\text{ hPa} \\), of als \\( 1\\,013\\text{ mbar} \\).'
                            },
                            {
                                id: 'norm-3',
                                column: 'normdruk',
                                text: 'In het ISS heerst de normdruk, terwijl de druk aan de buitenkant bijna nul is.'
                            }
                        ]
                    },
                    {
                        id: 'onderdruk',
                        label: 'Onderdruk',
                        hint: 'De druk is lager dan de atmosferische druk.',
                        items: [
                            {
                                id: 'onder-1',
                                column: 'onderdruk',
                                text: 'Je knipt een vacuümverpakking gemalen koffie open en hoort de lucht naar binnen stromen.'
                            },
                            {
                                id: 'onder-2',
                                column: 'onderdruk',
                                text: 'Je zuigt lucht uit een plastic flesje, waardoor de luchtdruk het flesje samendrukt.'
                            },
                            {
                                id: 'onder-3',
                                column: 'onderdruk',
                                text: 'Bij het inademen wordt de borstkas groter, ontstaat er een onderdruk en stroomt de buitenlucht naar binnen.'
                            }
                        ]
                    },
                    {
                        id: 'overdruk',
                        label: 'Overdruk',
                        hint: 'De druk is hoger dan de atmosferische druk.',
                        items: [
                            {
                                id: 'over-1',
                                column: 'overdruk',
                                text: 'Je laat de lucht uit een opgepompte fietsband ontsnappen door het ventiel in te drukken.'
                            },
                            {
                                id: 'over-2',
                                column: 'overdruk',
                                text: 'Je blaast een ballon op, knijpt hem dicht en laat hem los: hij vliegt weg.'
                            },
                            {
                                id: 'over-3',
                                column: 'overdruk',
                                text: 'Op 10 km hoogte houdt men de druk in het vliegtuig op \\( 800\\text{ hPa} \\), terwijl het buiten \\( 264\\text{ hPa} \\) is.'
                            }
                        ]
                    }
                ]
            }
        ]
    },

    /**
     * Exitticket: 4 snelle diagnostische denkvragen (conceptueel, geen berekeningen).
     *
     * BRONNEN (Handleiding WACO 4 Fysica, Thema 1, Hoofdstuk 3):
     *   p. 24 = handboek p. 32, theorie p = ρ · g · h en p_tot = p_atm + p_hydr
     *   p. 25 = handboek p. 33, oefening 5 (Thomas in zoet water vs Sarah in zeewater)
     *   p. 25 = handboek p. 33, oefening 6 (de hydrostatische paradox)
     *   p. 24 = handboek p. 32, vuistregel 10 m water = 1 bar
     */
    exitTicket: {
        questions: [
            {
                id: 'ex1-diepte',
                type: 'mc',
                question: 'Wat gebeurt er met de hydrostatische druk als een duiker twee keer zo diep onder water afdaalt?',
                options: [
                    'De hydrostatische druk verdubbelt (recht evenredig met de diepte).',
                    'De hydrostatische druk blijft gelijk, want het watervolume verandert niet.',
                    'De hydrostatische druk verviervoudigt (kwadratisch verband met de diepte).',
                    'De hydrostatische druk halveert, omdat dieper water meer tegendruk biedt.'
                ],
                correct: 0
            },
            {
                id: 'ex2-dichtheid',
                type: 'mc',
                question: 'Twee duikers zwemmen op exact dezelfde diepte van 10,0 meter: de ene in zoet water en de andere in de zoute Noordzee. Wie ondervindt de grootste vloeistofdruk?',
                options: [
                    'De duiker in zoet water, omdat zoet water zuiverder is.',
                    'De duiker in de Noordzee, omdat zout water een grotere massadichtheid heeft.',
                    'Beiden ondervinden exact dezelfde druk, omdat enkel de diepte telt.',
                    'Dat hangt af van het lichaamsoppervlak van de duiker.'
                ],
                correct: 1
            },
            {
                id: 'ex3-paradox',
                type: 'mc',
                question: 'Een smalle proefbuis en een breed aquarium zijn beide gevuld met water tot een vloeistofhoogte van 40 cm. Wat geldt voor de hydrostatische druk op de bodem van beide vaten?',
                options: [
                    'In het brede aquarium is de bodemdruk veel groter omdat er veel meer water in zit.',
                    'In de smalle proefbuis is de bodemdruk groter omdat het water samengeperst wordt.',
                    'De bodemdruk is in beide vaten exact even groot (hydrostatische paradox).',
                    'De bodemdruk is nul omdat het water niet stroomt.'
                ],
                correct: 2
            },
            {
                id: 'ex4-vuistregel',
                type: 'mc',
                question: 'Met hoeveel stijgt de vloeistofdruk in water bij benadering per 10 meter diepte?',
                options: [
                    'Met ongeveer 0,01 bar (1 000 Pa)',
                    'Met ongeveer 0,1 bar (10 000 Pa)',
                    'Met ongeveer 1 bar (100 000 Pa)',
                    'Met ongeveer 10 bar (1 000 000 Pa)'
                ],
                correct: 2
            }
        ]
    }
}
