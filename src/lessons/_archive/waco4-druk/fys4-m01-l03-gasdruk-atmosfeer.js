/**
 * Gasdruk en de atmosfeer - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 2: Druk bij gassen (Les 1/2)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 24-33)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l03-gasdruk-atmosfeer',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Gasdruk & de Atmosfeer',
    description: 'Ontstaan van gasdruk via het kinetisch deeltjesmodel, atmosferische druk, de proef van Torricelli (760 mm Hg), normdruk 1013 hPa en de Maagdenburger halve bollen.',

    config: {
        groenCode: 'F4M01L03',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 24-33)'
    },

    goals: [
        'Ik kan verklaren dat gasdruk ontstaat door ontelbare botsingen van bewegende gasdeeltjes tegen de wanden van het vat (en NIET door het gewicht van de deeltjes).',
        'Ik kan het begrip atmosferische druk (luchtdruk) toelichten en verklaren waarom die afneemt met de hoogte.',
        'Ik ken de waarde van de normdruk: p₀ = 1 013 hPa = 1 013 mbar = 1,013 · 10⁵ Pa.',
        'Ik kan de historische proeven van Torricelli (kwikbarometer) en Otto von Guericke (Maagdenburger halve bollen) uitleggen.',
        'Ik kan berekenen welke enorme kracht de atmosfeer uitoefent op alledaagse oppervlakken (zoals een kamerraam) en verklaren waarom ramen niet bezwijken.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 2: Gasdruk en Atmosfeer (p. 24-33)',
        instruction: '<p>Lees in je leerwerkboek op <strong>pagina 24-28</strong> de theorie over het deeltjesmodel en de proef van Torricelli. Maak in de oefeningenbundel op <strong>pagina 6-8 oefeningen 1, 2, 3 en 4</strong>.</p>',
        formulaHint: 'Formules: \\( p = \\frac{F}{A} \\Rightarrow F = p \\cdot A \\). Normdruk: \\( p_0 = 1\\,013\\text{ hPa} = 101\\,300\\text{ Pa} \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over deeltjesmodel, gasgedrag en drukformule.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering: 15 Ton op je Slaapkamerraam',
                    description: 'Waarom verbrijzelt de atmosferische druk het glas van je raam niet?',
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
                    title: 'Gasdruk, Torricelli & Atmosfeer',
                    description: 'Kinetisch model, Torricelli-proef, normdruk en krachtberekening op ramen.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 1 t.e.m. 4 (oefenbundel p. 6-8).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: gasdruk en deeltjes',
                    description: 'Onderzoek hoe botsende gasdeeltjes druk uitoefenen op de wand.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Atmosfeer & Hoogteprofiel',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Gasdruk & Torricelli',
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
                    description: 'Kernbegrippen van gasdruk en vooruitblik naar manometers en overdruk.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van gasdruk en de proef van Torricelli.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'idealGasLaw',
            defaultMode: 'boyle'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Atmosferische Hoogtes & Drukeffecten',
            instruction: 'Koppel elke situatie aan het juiste fysische gevolg voor de gasdruk.',
            pairs: [
                { term: 'Op zeeniveau (0 m)', definition: 'Luchtdruk is gemiddeld 1 013 hPa (hoogste concentratie gasdeeltjes)' },
                { term: 'Vliegtuigcabine op 10 km', definition: 'Wordt op ca. 800 hPa gehouden (buitendruk op die hoogte is slechts ca. 260 hPa)' },
                { term: 'Top van Mount Everest (8 848 m)', definition: 'Luchtdruk is gedaald tot circa 330 hPa (slechts 1/3 van zeeniveau; zuurstoftekort)' },
                { term: 'Vacuüm verpakking openknippen', definition: 'Lucht stroomt met sissend geluid naar binnen door het drukverschil met de atmosfeer' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Gasdruk & Atmosfeer (WACO 4)',
            questions: [
                {
                    q: 'Wat is de fysische oorzaak van gasdruk in een gesloten vat?',
                    a: [
                        'De voortdurende botsingen van snel bewegende gasdeeltjes tegen de binnenwand.',
                        'Het gewicht van de gasdeeltjes die op de bodem rusten.',
                        'De chemische reactie tussen de gasmoleculen en de wand.',
                        'De elektrostatische aantrekking tussen gasatomen.'
                    ],
                    c: 0
                },
                {
                    q: 'Bereken de kracht van de buitenlucht op een raam van 1,50 m² bij een normale atmosferische druk van 101 300 Pa.',
                    a: [
                        '151 950 N (circa 1,52 · 10⁵ N, overeenkomend met ruim 15 ton!)',
                        '67 533 N',
                        '101 300 N',
                        '1 520 N'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom gebruikte Torricelli in 1643 kwik (dichtheid 13 600 kg/m³) in plaats van water (1 000 kg/m³) voor zijn barometerbuis?',
                    a: [
                        'Omdat kwik een 13,6 keer grotere massadichtheid heeft, waardoor de vloeistofkolom slechts 76 cm hoog is i.p.v. ruim 10 meter bij water.',
                        'Omdat water niet kan verdampen in een buis.',
                        'Omdat kwik lichter is dan lucht.',
                        'Omdat kwik transparant is en gemakkelijk afleesbaar.'
                    ],
                    c: 0
                },
                {
                    q: 'Welke stelling over de normdruk is conform WACO 4 JUIST?',
                    a: [
                        'De normdruk bedraagt 1 013 hPa of 1 013 mbar.',
                        'De normdruk bedraagt 1 013 Pa.',
                        'De normdruk bedraagt 1 013 bar.',
                        'De normdruk bedraagt 10 130 Pa.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Gasdruk & de Atmosfeer',
            subtitle: 'Kinetisch deeltjesmodel, Torricelli en atmosferische kracht (WACO 4 p. 24-33)',
            badge: 'Fysica 4 - Les 3',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Verklaren hoe gasdruk ontstaat op microscopisch niveau via het kinetisch deeltjesmodel.' },
                { icon: 'function', text: 'Uitleggen wat atmosferische druk is en waarom die afneemt met de hoogte.' },
                { icon: 'function', text: 'De historische experimenten van Torricelli (760 mm Hg) en Von Guericke begrijpen.' },
                { icon: 'function', text: 'Berekenen hoe groot de kracht van de luchtlaag is op alledaagse voorwerpen.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: 15 Ton op je Raam',
            question: 'De buitenlucht oefent op een standaard slaapkamerraam van 1,50 m² een verpletterende kracht uit van ruim 150 000 newton (vergelijkbaar met het gewicht van 15 personenwagens). Waarom sneuvelt het glas niet spontaan?',
            hint: 'Bedenk wat er zich aan de andere kant van het glas (in je kamer) bevindt.',
            revealText: 'Binnen in je kamer bevindt zich eveneens lucht onder atmosferische druk! De binnenlucht drukt met exact dezelfde kracht (150 000 N) van binnen naar buiten. De twee tegengestelde krachten heffen elkaar perfect op: de nettokracht is 0 N.'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Het Kinetisch Deeltjesmodel',
            items: [
                { label: 'Gassen bestaan uit deeltjes', value: 'Moleculen of atomen die zich op grote afstand van elkaar bevinden.' },
                { label: 'Voortdurende beweging', value: 'Gasdeeltjes bewegen kriskras door elkaar met snelheden van honderden meters per seconde.' },
                { label: 'Elastische botsingen', value: 'Deeltjes botsen voortdurend tegen elkaar en tegen de wanden van hun recipiënt zonder energieverlies.' },
                { label: 'Temperatuur en snelheid', value: 'Hoe hoger de temperatuur, hoe sneller de gasdeeltjes gemiddeld bewegen.' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Gasdruk (p_gas)',
            definition: 'Gasdruk is het macroscopische gevolg van ontelbare microscopische botsingen van kriskras bewegende gasdeeltjes tegen een oppervlak. Bij elke botsing oefent een deeltje een minieme stootkracht uit; samen leveren die een continue loodrechte kracht F op het oppervlak A: \\( p = \\frac{F}{A} \\).'
        },
        {
            layout: 'properties',
            title: 'Misconceptie: Gewicht versus Botsingen',
            items: [
                { label: 'Veelgemaakte FOUT', value: 'Denken dat gasdruk ontstaat doordat het gewicht van de gasdeeltjes op de bodem van een vat rust.' },
                { label: 'De Wetenschappelijke WAARHEID', value: 'Gasdeeltjes botsen in álle richtingen (boven, onder, zijkant) met evenveel kracht. De druk in een klein gasvat is overal identiek!' },
                { label: 'Hoe gasdruk verhogen?', value: '1) Meer deeltjes toevoegen (oppompen); 2) Volume verkleinen (samendrukken); 3) Temperatuur verhogen (snellere botsingen).' }
            ]
        },
        {
            layout: 'properties',
            title: 'De Atmosferische Druk (Luchtdruk)',
            items: [
                { label: 'Wat is de atmosfeer?', value: 'Een luchtlaag van tientallen kilometers dik rond de aarde, bijeengehouden door de zwaartekracht.' },
                { label: 'Normdruk p₀', value: 'Gemiddelde atmosferische druk op zeeniveau bij 0°C: p₀ = 1 013 hPa = 1 013 mbar = 101 300 Pa = 1,013 · 10⁵ Pa.' },
                { label: 'Waarom daalt luchtdruk met hoogte?', value: 'Op grote hoogte is er minder lucht boven je (kleinere luchtkolom) én is de lucht ijler (minder deeltjes per m³).' },
                { label: 'Cabinedruk in vliegtuigen', value: 'Op 10 km hoogte is de buitendruk slechts ~260 hPa. Cabines worden kunstmatig op ~800 hPa gehouden.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Historische Proef 1: Torricelli (1643)',
            problem: 'Historische Proef 1: Torricelli (1643)',
            steps: [
                { label: 'Opstelling', content: 'Evangelista Torricelli vulde een glazen buis van 1 meter met kwik (Hg) en plaatste die ondersteboven in een kwikbak.' },
                { label: 'Waarneming', content: 'Het kwik zakte tot een hoogte van precies 76,0 cm (760 mm Hg) boven het vloeistofniveau in de bak.' },
                { label: 'Verklaring', content: 'De atmosferische druk die op het open kwikoppervlak duwt, houdt precies het gewicht van 76 cm kwik in evenwicht!' },
                { label: 'Bovenste ruimte', content: 'Boven de kwikkolom bevindt zich geen lucht: het zogeheten "Torricelli-vacuüm".' },
                { label: 'Waarom geen water?', content: 'Kwik heeft een dichtheid van \\( 13\\,600\\text{ kg/m}^3 \\). Met water (\\( 1\\,000\\text{ kg/m}^3 \\)) zou de buis 10,33 meter lang moeten zijn!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Historische Proef 2: Maagdenburger Halve Bollen (1654)',
            problem: 'Historische Proef 2: Maagdenburger Halve Bollen (1654)',
            steps: [
                { label: 'Opstelling', content: 'Burgemeester Otto von Guericke bracht twee holle koperen halve bollen tegen elkaar en pompte de lucht ertussen weg met een vacuümpomp.' },
                { label: 'Krachtmeting', content: 'Twee teams van elk 8 paarden (16 paarden in totaal) slaagden er niet in om de twee helften van elkaar los te trekken!' },
                { label: 'Fysische oorzaak', content: 'Binnen heerst vacuüm (\\( p_{\\text{in}} \= 0 \\)). Buiten perst de atmosferische druk (\\( 101\\,300\\text{ Pa} \\)) de bollen met tienduizenden newton op elkaar.' },
                { label: 'Zodra lucht wordt toegelaten', content: 'Vallen de bollen direct moeiteloos van elkaar af.' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 4 Oef. 1 p. 6)',
            question: 'Bereken de kracht op een raam van 1,50 m² bij een normale luchtdruk van 101 300 Pa. Welke berekening is JUIST?',
            options: [
                { id: 'A', text: 'F = p · A = 101 300 Pa · 1,50 m² = 151 950 N (= 1,52 · 10⁵ N)', correct: true },
                { id: 'B', text: 'F = p / A = 101 300 / 1,50 = 67 533 N', correct: false },
                { id: 'C', text: 'F = A / p = 1,50 / 101 300 = 1,48 · 10⁻⁵ N', correct: false },
                { id: 'D', text: 'F = 101 300 N, onafhankelijk van het oppervlak', correct: false }
            ],
            explanation: 'Uit p = F / A volgt F = p · A. Met p = 101 300 Pa en A = 1,50 m² levert dit F = 151 950 N op. Dit toont de kolossale omvang van de atmosferische druk aan!'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Gasdruk & Atmosfeer',
            items: [
                'Gasdruk ontstaat door botsingen van kriskras bewegende gasdeeltjes tegen de wanden.',
                'Atmosferische druk ontstaat doordat de luchtlaag rond de aarde overal op drukt.',
                'Normdruk op zeeniveau: p₀ = 1 013 hPa = 1 013 mbar = 101 300 Pa = 760 mm Hg.',
                'Luchtdruk neemt af naarmate je hoger in de atmosfeer klimt.',
                'Torricelli toonde luchtdruk aan met zijn kwikbuis (76 cm Hg); Von Guericke met de Maagdenburger halve bollen.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 4!',
            subtitle: 'In les 4 ontdekken we hoe we gasdruk concreet meten met manometers en hoe overdruk en onderdruk werken.',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstuk', value: '2 Gassen' },
                { label: 'Lesuur', value: '3 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat gebeurt er volgens het deeltjesmodel met de snelheid van gasmoleculen als je een gas opwarmt?',
                options: [
                    'De moleculen gaan gemiddeld sneller bewegen.',
                    'De moleculen gaan trager bewegen.',
                    'De snelheid blijft gelijk, maar de moleculen zetten zelf uit.',
                    'De moleculen stoppen met botsen.'
                ],
                correct: 0,
                explanation: 'Temperatuur is een maat voor de gemiddelde kinetische energie (bewegingsenergie) van de deeltjes. Bij hogere temperatuur bewegen ze sneller.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Als een gas in een afgesloten ruimte wordt samengeperst tot een kleiner volume, wat gebeurt er dan met het aantal botsingen per seconde per cm² wand?',
                options: [
                    'Het aantal botsingen neemt toe, waardoor de druk stijgt.',
                    'Het aantal botsingen neemt af, waardoor de druk daalt.',
                    'Het aantal botsingen blijft gelijk.',
                    'De deeltjes botsen alleen nog tegen elkaar en niet meer tegen de wand.'
                ],
                correct: 0,
                explanation: 'In een kleiner volume zitten de deeltjes dichter op elkaar, waardoor ze veel vaker per seconde tegen de wand botsen. Dit leidt tot een hogere druk.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Welke waarde stelt de standaard normdruk op zeeniveau voor (conform WACO 4)?',
                options: [
                    '1 013 Pa',
                    '1 013 hPa (of 1 013 mbar)',
                    '100 000 hPa',
                    '10,13 bar'
                ],
                correct: 1,
                explanation: 'De normdruk is 1 013 hPa (= 101 300 Pa = 1 013 mbar).'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Welke kracht oefent een gasdruk van 200 000 Pa uit op een oppervlakte van 0,05 m²?',
                options: [
                    '10 000 N (want F = p · A = 200 000 · 0,05)',
                    '4 000 000 N',
                    '40 N',
                    '1 000 N'
                ],
                correct: 0,
                explanation: 'F = p · A = 200 000 N/m² · 0,05 m² = 10 000 N.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Welke uitspraak over het ontstaan van gasdruk is wetenschappelijk JUIST?',
                options: [
                    'Gasdruk ontstaat door het gewicht van de gasdeeltjes op de bodem van het vat.',
                    'Gasdruk ontstaat doordat bewegende gasdeeltjes voortdurend tegen de wanden botsen en daarbij stootkrachten uitoefenen.',
                    'Gasdruk heerst enkel onderaan in een vat en nooit aan het plafond.',
                    'Gasdruk ontstaat door magnetische afstoting tussen de gasdeeltjes.'
                ],
                correct: 1,
                explanation: 'Gasdruk is het resultaat van de talloze elastische botsingen van deeltjes tegen het oppervlak (conform WACO 4).'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Waarom daalt de atmosferische druk wanneer je van zeeniveau naar de top van een hoge berg klimt?',
                options: [
                    'Omdat de zwaartekracht op de berg plotseling nul wordt.',
                    'Omdat er minder lucht boven je ligt en de lucht op grote hoogte ijler is (minder botsingen per seconde).',
                    'Omdat de temperatuur op een berg altijd hoger is.',
                    'Omdat de aarde op een berg sneller ronddraait.'
                ],
                correct: 1,
                explanation: 'Op grotere hoogte is de bovenliggende luchtkolom korter en is de deeltjesdichtheid lager, wat resulteert in minder botsingen en een lagere druk.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Hoe hoog was de kwikkolom in de beroemde barometerproef van Torricelli bij normale atmosferische druk op zeeniveau?',
                options: [
                    '760 mm (of 76 cm Hg)',
                    '10,33 meter',
                    '1,013 meter',
                    '7,60 mm'
                ],
                correct: 0,
                explanation: 'Bij normale atmosferische druk houdt de lucht een kwikkolom van precies 760 mm Hg (76 cm) in evenwicht.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Reflectie & Begripscontrole',
                description: 'Leg uit waarom twee teams van 8 paarden er in 1654 niet in slaagden om de Maagdenburger halve bollen uit elkaar te trekken, maar de bollen onmiddellijk vanzelf uit elkaar vielen zodra Otto von Guericke het kraantje opendraaide.'
            }
        ]
    }
}
