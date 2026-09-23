/**
 * Totale vloeistofdruk en communicerende vaten - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 3: Druk bij vloeistoffen (Les 2/4)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 44-53)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l06-totale-vloeistofdruk-vaten',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Totale Vloeistofdruk & Communicerende Vaten',
    description: 'Berekening van de totale druk p_tot = p_atm + ρ · g · h, het principe van communicerende vaten en toepassingen zoals watertorens, peilglazen, sifons en de slangwaterpas.',

    config: {
        groenCode: 'F4M01L06',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 44-53)'
    },

    goals: [
        'Ik kan verklaren dat de totale druk in een vloeistof gelijk is aan de som van de atmosferische druk en de hydrostatische druk: p_tot = p_atm + p_hydr.',
        'Ik kan de totale druk op elke diepte in zoet- of zoutwater correct berekenen.',
        'Ik kan het principe van communicerende vaten uitleggen: vloeistof staat in verbonden vaten op gelijke hoogte bij dezelfde vloeistofsoort.',
        'Ik kan alledaagse en technische toepassingen analyseren (watertorens, sifon onder wastafel, peilglazen, slangwaterpas en sluizen).'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 3: Totale Druk en Communicerende Vaten (p. 44-53)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 44-48</strong> het principe van de communicerende vaten. Maak in de oefeningenbundel op <strong>pagina 12-16 oefeningen 3, 5, 6 en 7</strong>.</p>',
        formulaHint: 'Totale druk: \\( p_{\\text{tot}} = p_{\\text{atm}} + \\rho_{\\text{vl}} \\cdot g \\cdot h \\). Communicerende vaten met 1 vloeistof: \\( h_1 = h_2 \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Toets',
                    description: 'Voorkennis over hydrostatische druk (p = ρ · g · h) en atmosferische normdruk.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering: De Watertoren',
                    description: 'Hoe komt het dat er water met hoge druk uit de kraan op de 3e verdieping stroomt zonder pomp in je kelder?',
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
                    title: 'Totale Druk & Communicerende Vaten',
                    description: 'Formule p_tot, werking van communicerende vaten, watertorens en sifons.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 3, 5, 6 en 7 (oefenbundel p. 12-16).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: vloeistofdruk in vaten',
                    description: 'Onderzoek de hydrostatische paradox en communicerende vaten.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Techniek & Sanitair Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Totale Druk & Vaten',
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
                    description: 'Overzicht van totale vloeistofdruk en vooruitblik naar het beginsel van Pascal.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van totale druk en communicerende vaten.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'pressureLab',
            defaultMode: 'vloeistof'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Dieptes en Drukken in de Zee',
            instruction: 'Koppel elke diepte aan de heersende totale druk in zeewater (ρ = 1 025 kg/m³, patm = 1 bar).',
            pairs: [
                { term: 'Aan het wateroppervlak (h = 0 m)', definition: 'Totale druk is exact gelijk aan de atmosferische druk: 1,013 bar (~101 kPa)' },
                { term: 'Op 10 meter diepte', definition: 'Totale druk is circa 2 bar (1 bar atmosfeer + ~1 bar waterkolom)' },
                { term: 'Op 20 meter diepte (Noordzee)', definition: 'Totale druk is circa 3,02 bar (3,02 · 10⁵ Pa)' },
                { term: 'Op 100 meter diepte', definition: 'Totale druk is circa 11 bar (1 bar atmosfeer + ~10 bar waterkolom)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Totale Druk & Communicerende Vaten (WACO 4)',
            questions: [
                {
                    q: 'Bereken de totale druk in de Noordzee op een diepte van 20,00 m (zeewater ρ = 1 025 kg/m³, g = 9,81 N/kg, patm = 101 300 Pa).',
                    a: [
                        '3,02 · 10⁵ Pa (want p_tot = 101 300 + 1 025 · 9,81 · 20,00 = 101 300 + 201 105 = 302 405 Pa)',
                        '2,01 · 10⁵ Pa',
                        '1,01 · 10⁵ Pa',
                        '4,04 · 10⁵ Pa'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom staat het waterpeil in twee communicerende vaten met gelijke vloeistof altijd exact even hoog?',
                    a: [
                        'Omdat in het verbindingskanaal onderaan de hydrostatische druk van beide kanten gelijk moet zijn om evenwicht te hebben (ρ·g·h₁ = ρ·g·h₂ ⇒ h₁ = h₂).',
                        'Omdat de zwaartekracht alleen op het hoogste vat werkt.',
                        'Omdat watermoleculen elkaar horizontaal aantrekken met magnetische krachten.',
                        'Omdat de atmosfeer harder duwt op het smalste vat.'
                    ],
                    c: 0
                },
                {
                    q: 'Een theepot heeft een schenktuit. Waarom mag de opening van de schenktuit nooit lager liggen dan het deksel van de theepot?',
                    a: [
                        'Omdat de theepot en tuit communicerende vaten vormen: als het waterpeil in de pot boven de tuitopening stijgt, loopt de thee spontaan uit de tuit.',
                        'Omdat de thee dan te snel zou afkoelen.',
                        'Omdat er dan geen stoom kan ontsnappen.',
                        'Omdat het porselein dan kan barsten.'
                    ],
                    c: 0
                },
                {
                    q: 'Welke uitspraak over de totale vloeistofdruk is JUIST conform WACO 4?',
                    a: [
                        'De totale druk op het vloeistofoppervlak (h = 0) is gelijk aan de atmosferische druk patm.',
                        'De totale druk is onafhankelijk van de atmosferische druk op het oppervlak.',
                        'De totale druk is omgekeerd evenredig met de diepte h.',
                        'De totale druk in een vloeistof is overal nul pascal.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Totale Druk & Communicerende Vaten',
            subtitle: 'Formule p_tot = p_atm + p_hydr en waterhuishouding (WACO 4 p. 44-53)',
            badge: 'Fysica 4 - Les 6',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Begrijpen waarom de atmosferische druk altijd optelt bij de vloeistofdruk.' },
                { icon: 'function', text: 'De totale druk op willekeurige dieptes in zoet en zout water berekenen.' },
                { icon: 'function', text: 'De wet van communicerende vaten afleiden en verklaren.' },
                { icon: 'function', text: 'Toepassingen zoals watertorens, sifons, peilglazen en sluizen analyseren.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Water op de 3e Verdieping',
            question: 'Je woont op de 3e verdieping van een appartementsgebouw. Wanneer je de kraan opendraait, spuit het water er met krachtige druk uit, hoewel er in het hele gebouw geen actieve elektrische pomp staat te draaien. Waar komt die waterdruk vandaan?',
            hint: 'Kijk eens naar de horizon in je gemeente: welk hoog bouwwerk zie je daar staan?',
            revealText: 'De druk is afkomstig van de watertoren! Het waterreservoir in de watertoren bevindt zich op tientallen meters hoogte boven het maaiveld. Doordat de watertoren en jouw waterleiding communicerende vaten vormen, duwt de hydrostatische waterkolom van de toren het water vanzelf omhoog naar jouw kraan.'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Hydrostatische Druk & Drukoptelling',
            items: [
                { label: 'Hydrostatische formule', value: 'p_hydr = ρ · g · h (met ρ in kg/m³, g = 9,81 N/kg en h in m).' },
                { label: 'Atmosferische druk patm', value: 'De buitenlucht drukt met 101 300 Pa (ongeveer 1 bar) op het open wateroppervlak.' },
                { label: 'Drukoverdracht', value: 'Vloeistoffen kunnen niet worden samengeperst: elke druk op het oppervlak plant zich integraal voort in de vloeistof!' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Totale Vloeistofdruk (p_tot)',
            definition: 'In een open vloeistofreservoir is de totale druk op een diepte h gelijk aan de som van de atmosferische druk op het oppervlak en de hydrostatische druk van de vloeistoflaag: \\( p_{\\text{tot}} = p_{\\text{atm}} + p_{\\text{hydr}} = p_{\\text{atm}} + \\rho_{\\text{vl}} \\cdot g \\cdot h \\).'
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld: Druk in de Noordzee (WACO 4 Oef. p. 12)',
            problem: 'Diepte \\( h = 20{,}00\\text{ m} \\); massadichtheid zeewater \\( \\rho = 1\\,025\\text{ kg/m}^3 \\); \\( g = 9{,}81\\text{ N/kg} \\); \\( p_{\\text{atm}} = 101\\,300\\text{ Pa} \\).',
            steps: [
                { label: 'Gegeven', content: 'Diepte \\( h = 20{,}00\\text{ m} \\); massadichtheid zeewater \\( \\rho = 1\\,025\\text{ kg/m}^3 \\); \\( g = 9{,}81\\text{ N/kg} \\); \\( p_{\\text{atm}} = 101\\,300\\text{ Pa} \\).' },
                { label: 'Gevraagd', content: 'Totale druk \\( p_{\\text{tot}} \\) op die diepte (in Pa en bar).' },
                { label: 'Stap 1: Hydrostatische druk', content: '\\( p_{\\text{hydr}} = \\rho \\cdot g \\cdot h = 1\\,025\\text{ kg/m}^3 \\cdot 9{,}81\\text{ N/kg} \\cdot 20{,}00\\text{ m} = 201\\,105\\text{ Pa} \= 2{,}01\\text{ bar} \\)' },
                { label: 'Stap 2: Totale druk optellen', content: '\\( p_{\\text{tot}} = p_{\\text{atm}} + p_{\\text{hydr}} = 101\\,300\\text{ Pa} + 201\\,105\\text{ Pa} = 302\\,405\\text{ Pa} \= 3{,}02 \\cdot 10^5\\text{ Pa} \\)' },
                { label: 'Antwoord', content: 'Op 20 meter diepte in de Noordzee heerst een totale druk van \\( 3{,}02 \\cdot 10^5\\text{ Pa} \\) (of 3,02 bar).' }
            ]
        },
        {
            layout: 'properties',
            title: 'De Wet van de Communicerende Vaten',
            items: [
                { label: 'Definitie', value: 'Twee of meer recipiënten die aan de onderzijde door een vloeistofkanaal met elkaar verbonden zijn.' },
                { label: 'De Wet', value: 'In communicerende vaten die met één homogene vloeistof gevuld zijn, staat het vloeistofoppervlak in alle takken op exact hetzelfde horizontale niveau: h₁ = h₂.' },
                { label: 'Onafhankelijk van takvorm', value: 'Het maakt niet uit of de ene buis kaarsrecht, spiraalvormig, dik of flinterdun is: de hoogte h is overal gelijk.' },
                { label: 'Fysische verklaring', value: 'In de verbindingsbuis onderaan moet p₁ = p₂ zijn om stroming te voorkomen: ρ · g · h₁ = ρ · g · h₂ ⇒ h₁ = h₂.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Toepassingen in Techniek en Huis',
            items: [
                { label: 'De Watertoren', value: 'Staat op het hoogste punt. Het waterpeil in het torenreservoir bepaalt de druk in de hele gemeente. Woningen hoger dan de toren hebben een drukpomp nodig.' },
                { label: 'De Sifon (zwanenhals)', value: 'De gebogen afvoerbuis onder lavabo of toilet. Een laagje water sluit de buis luchtdicht af en belet dat kwalijk rioolgas de woning binnendringt.' },
                { label: 'Het Peilglas', value: 'Een smal doorzichtig buisje naast een grote ondoorzichtige ketel (stoommachine, koffiemachine) toont van buitenaf exact hoe vol de ketel is.' },
                { label: 'De Slangwaterpas', value: 'Metsers vullen een transparante slang met water om over tientallen meters afstand kaarsrechte horizontale referentielijnen uit te zetten.' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 4 Oef. 4 p. 13)',
            question: 'Een theepot is tot aan de rand gevuld met hete thee. De schenktuit reikt minder hoog dan de bovenrand van de theepot. Wat gebeurt er?',
            options: [
                { id: 'A', text: 'De thee blijft netjes in de pot zitten zolang je niet schenkt.', correct: false },
                { id: 'B', text: 'De thee stroomt spontaan uit de tuit tot het niveau in de pot gelijk is aan de tuitrand.', correct: true },
                { id: 'C', text: 'Er ontstaat een hevelwerking die de theepot in één keer volledig leegzuigt.', correct: false },
                { id: 'D', text: 'De theepot barst door de overdruk.', correct: false }
            ],
            explanation: 'Theepot en tuit zijn communicerende vaten. De vloeistof zoekt altijd een gelijk horizontaal niveau. Als de tuit lager is dan de vloeistofspiegel in de pot, stroomt de thee er onmiddellijk vanzelf uit!'
        },
        {
            layout: 'properties',
            title: 'Sluizencomplexen',
            items: [
                { label: 'Hoogteverschil overbruggen', value: 'Schepen moeten van een hooggelegen kanaal naar een laaggelegen rivier varen.' },
                { label: 'Communicerend vullen/ledigen', value: 'Ondergrondse schuiven openen de verbinding tussen kolk en rivier. Zonder pompen stroomt water vanzelf door zwaartekracht tot de niveaus exact gelijk zijn.' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Totale Druk & Vaten',
            items: [
                'Totale druk: p_tot = p_atm + ρ · g · h. Aan de oppervlakte heerst altijd minimaal 1 bar.',
                'Elke 10 meter waterdiepte voegt ongeveer 1 bar (100 kPa) hydrostatische druk toe.',
                'In communicerende vaten met één vloeistofsoort staat het vloeistofpeil overal even hoog: h₁ = h₂.',
                'Praktische toepassingen: watertoren, sifon, peilglas, slangwaterpas, sluizen.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 7!',
            subtitle: 'In les 7 onderzoeken we hoe druk zich voortplant in afgesloten vloeistoffen: het beroemde beginsel van Pascal en hydraulische hefbruggen.',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstuk', value: '3 Vloeistoffen' },
                { label: 'Lesuur', value: '6 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Hoe groot is de atmosferische normdruk patm aan het wateroppervlak (afgerond in kPa en bar)?',
                options: [
                    '101,3 kPa (ca. 1,01 bar)',
                    '10,13 kPa (0,1 bar)',
                    '1 013 kPa (10,1 bar)',
                    '1,00 Pa'
                ],
                correct: 0,
                explanation: 'De atmosferische normdruk is 101,3 kPa of circa 1,01 bar.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Als een duiker 10 meter diep duikt in water, hoeveel bar hydrostatische druk voegt die waterlaag ongeveer toe aan zijn lichaam?',
                options: [
                    'Ongeveer 1,0 bar (100 000 Pa)',
                    'Ongeveer 0,1 bar',
                    'Ongeveer 10 bar',
                    'Ongeveer 0,01 bar'
                ],
                correct: 0,
                explanation: 'p = ρ · g · h = 1 000 kg/m³ · 9,81 N/kg · 10 m = 98 100 Pa = 1 bar.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Wat zijn communicerende vaten volgens de definitie in de fysica?',
                options: [
                    'Vaten die onderaan met elkaar verbonden zijn via een vloeistofkanaal.',
                    'Vaten die via geluidsgolven met elkaar communiceren.',
                    'Vaten die alleen met gas gevuld kunnen worden.',
                    'Elektrisch geleidende bekers.'
                ],
                correct: 0,
                explanation: 'Communicerende vaten zijn aan de onderzijde verbonden recipiënten waarin vloeistof vrij tussen de benen kan stromen.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wat gebeurt er met het waterpeil in twee verbonden vaten van verschillende dikte als je er water in giet?',
                options: [
                    'Het water staat in beide vaten exact op dezelfde hoogte.',
                    'Het smalle vat heeft een veel hoger waterpeil.',
                    'Het dikke vat heeft een veel hoger waterpeil.',
                    'Al het water stroomt naar het dikste vat en het smalle vat blijft leeg.'
                ],
                correct: 0,
                explanation: 'In communicerende vaten met één homogene vloeistof staat het vloeistofoppervlak in alle takken op exact hetzelfde horizontale niveau.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Wat is de totale druk op een diepte van 30,0 m in een zoetwatermeer (ρ = 1 000 kg/m³, g = 9,81 N/kg, patm = 101 300 Pa)?',
                options: [
                    'p_tot = 3,96 · 10⁵ Pa (ca. 3,96 bar)',
                    'p_tot = 2,94 · 10⁵ Pa',
                    'p_tot = 1,01 · 10⁵ Pa',
                    'p_tot = 4,95 · 10⁵ Pa'
                ],
                correct: 0,
                explanation: 'p_hydr = 1 000 · 9,81 · 30 = 294 300 Pa. Totale druk p_tot = 101 300 + 294 300 = 395 600 Pa = 3,96 · 10⁵ Pa.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Waarom heeft een sifon (zwanenhals) onder een wastafel een U-vorm waarin altijd water blijft staan?',
                options: [
                    'Om te voorkomen dat voorwerpen in het riool vallen.',
                    'Om als communicerend vat een waterslot te vormen dat kwalijk rioolgas belet om de badkamer binnen te dringen.',
                    'Om de waterleiding extra snel door te spoelen.',
                    'Om de hydrostatische druk in de afvoerbuis op te voeren.'
                ],
                correct: 1,
                explanation: 'Het stilstaande water in de U-bocht vormt een luchtdichte afsluiting (waterslot) tegen rioolstank.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Waarom moet een gemeentelijke watertoren op een hooggelegen heuvel of hoge toren worden gebouwd?',
                options: [
                    'Om te zorgen dat het waterpeil in de toren hoger ligt dan alle kranen in het leveringsgebied, zodat water via communicerende vaten vanzelf naar boven stroomt.',
                    'Omdat de lucht op grote hoogte schoner is.',
                    'Om blikseminslagen af te weren.',
                    'Omdat water op grote hoogte sneller stroomt.'
                ],
                correct: 0,
                explanation: 'De watertoren fungeert als het hoogste been van een stel communicerende vaten. Hierdoor stroomt water zonder extra pomp naar alle lagere aftappunten.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Praktijktoepassing & Redenering',
                description: 'Leg uit hoe een bouwvakker met een eenvoudige doorzichtige tuinslang gevuld met water kan controleren of twee steunpilaren die 30 meter uit elkaar staan exact even hoog zijn.'
            }
        ]
    }
}
