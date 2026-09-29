/**
 * Druk bij vaste stoffen en gassen - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Datum: 24/09/2026
 * Handboek: Plantyn WACO 4 Fysica (Thema 1, p. 18-29)
 * Leerplan GO! D-finaliteit: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-druk-vaste-stoffen',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    date: '24/09/2026',
    title: 'Druk: vaste stoffen en gassen',
    description: 'Afronding van druk bij vaste stoffen (p. 18-19) en verkenning van gasdruk, het deeltjesmodel, atmosferische druk en overdruk/onderdruk met toepassingen (p. 20-29).',

    config: {
        groenCode: 'F4M01',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        date: '24/09/2026',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 18-29)',
        oplossingen: {
            url: 'https://wetenschappen.github.io/verbeteren/f4t1.pdf',
            code: 'donderdag',
            title: 'Correctiesleutel thema 1 (p. 18-29)'
        }
    },

    goals: [
        'Ik kan met behulp van het kinetisch deeltjesmodel verklaren hoe gasdruk ontstaat door botsingen van deeltjes tegen de wanden van een vat.',
        'Ik kan beredeneren welk effect een verandering van temperatuur, volume of aantal deeltjes heeft op de gasdruk in een afgesloten ruimte.',
        'Ik kan met de formule \\( F = p \\cdot A \\) de uitgeoefende kracht van de atmosferische druk op een oppervlak berekenen in de correcte SI-eenheid (N) en wetenschappelijke notatie.',
        'Ik kan het onderscheid tussen overdruk en onderdruk toelichten aan de hand van alledaagse toepassingen (zoals een fietsband, een zuignap en een vacuumpak koffie).',
        'Ik kan de waarde van de normdruk op zeeniveau geven in pascal, hectopascal en bar (\\( 1013\\text{ hPa} = 1,013\\text{ bar} = 101\\,300\\text{ Pa} \\)) en verklaren waarom de luchtdruk daalt met de hoogte.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4 (Thema 1 Druk)',
        subtitle: 'Hoofdstuk 1 (p. 18-19) en hoofdstuk 2 (p. 20-29)',
        instruction: '<p>Werk zelfstandig de opdrachten af in je schrift en leerwerkboek. Start bij de afronding van vaste stoffen (p. 18-19) en ga vervolgens door naar de opdrachten van druk bij gassen (p. 26-29). Gebruik de digitale tussenstappen op je scherm als hulpmiddel.</p>',
        formulaHint: 'Basisformules: \\( p = \\frac{F}{A} \\) \\(\\Leftrightarrow\\) \\( F = p \\cdot A \\). Normdruk: \\( p_{\\text{atm}} = 101\\,300\\text{ Pa} = 1013\\text{ hPa} = 1,013\\text{ bar} \\). Let op eenheden: \\( 1\\text{ cm}^2 = 10^{-4}\\text{ m}^2 \\).'
    },

    timeline: {
        stepA: {
            step: 'A',
            title: 'Instap en afronding van vaste stoffen',
            time: '10 min',
            cards: [
                {
                    id: 'card-hook',
                    type: 'class',
                    title: 'De afgesloten spuit en de zuignap',
                    description: 'Sluit een lege injectiespuit af met je duim en trek aan de zuiger. Wat voel je en waarom? Zuigt het vacuüm, of duwt de buitenlucht?',
                    action: 'presentation',
                    slidesKey: 'hook_slides'
                },
                {
                    id: 'card-fixed-support',
                    type: 'digital',
                    title: 'Oplossingshulp vaste stoffen (p. 18-19)',
                    description: 'Voorbeeldopgave Oef 7 (kast op 4 poten) met stapsgewijze uitwerking en zelfcheck.',
                    action: 'presentation',
                    slidesKey: 'fixed_support_slides'
                }
            ]
        },

        stepB: {
            step: 'B',
            title: 'Verwerken: druk bij gassen',
            time: '30 min',
            cards: [
                {
                    id: 'card-gas-theory',
                    type: 'class',
                    title: 'Theorieverkenner: druk bij gassen',
                    description: 'Van botsende gasdeeltjes en de 3 parameters tot atmosferische druk, vacuümproeven en overdruk versus onderdruk.',
                    action: 'presentation',
                    slidesKey: 'gas_theory_slides'
                },
                {
                    id: 'card-calculations',
                    type: 'digital',
                    title: 'Vraagstukhulp: oefeningen p. 26-29',
                    description: 'Voorbeeldoefeningen per type: handpalm (p. 28 oef 8) en het ISS Cupola-raam (p. 29 oef 11).',
                    action: 'presentation',
                    slidesKey: 'calculation_slides'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek WACO: alle opdrachten p. 18-29',
                    description: 'Volledig overzicht van alle opdrachten uit WACO 4 met paginanummers en hints.',
                    action: 'workbook',
                    exercises: 'Opdracht 7 (p. 18): kast van 50 kg op 4 poten (druk per poot)\n' +
                               'Opdracht 8 (p. 18): duim met 20 N op tafel (oppervlakte in cm²)\n' +
                               'Opdracht 9 (p. 19): stapels stenen en drukevenredigheid\n' +
                               'Opdracht 10 (p. 19): kubus 2z schaalprobleem (druk verdubbelt)\n' +
                               'Opdracht 11 (p. 19): Yusuf op schaatsen (maximaal toelaatbare massa)\n' +
                               'Opdracht 1 (p. 26): meettoestel kiezen (barometer en manometer)\n' +
                               'Opdracht 2 (p. 26): definitie van overdruk en onderdruk\n' +
                               'Opdracht 3 (p. 26): kracht van de luchtdruk op een raam van 1,50 m²\n' +
                               'Opdracht 4 (p. 27): waarde van de normdruk op zeeniveau\n' +
                               'Opdracht 5 (p. 27): luchtdruk op een berg en in het dal\n' +
                               'Opdracht 6 (p. 27): gasfles (overdruk) en zuignappen (onderdruk)\n' +
                               'Opdracht 7 (p. 27): latje breken met krant en luchtdruk\n' +
                               'Opdracht 8 (p. 28): kracht en equivalente massa op een handpalm van 165 cm²\n' +
                               'Opdracht 9 (p. 28): situaties classificeren als over- of onderdruk\n' +
                               'Opdracht 10 (p. 28): drie manieren om gasdruk in een vat te verhogen\n' +
                               'Opdracht 11 (p. 29): kracht op het Cupola-raam van het ISS\n' +
                               'Opdracht 12 (p. 29): schietschijfpijlen met zuignapjes verklaren'
                }
            ]
        },

        stepC: {
            step: 'C',
            title: 'Afsluiting en synthese',
            time: '10 min',
            cards: [
                {
                    id: 'card-summary',
                    type: 'class',
                    title: 'Samenvatting: druk bij gassen',
                    description: 'Synthese van het deeltjesmodel, normdruk, overdruk versus onderdruk en de krachtformule F = p · A.',
                    action: 'presentation',
                    slidesKey: 'summary_slides'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Formatief afsluitend ticket',
                    description: 'Drie meerkeuzevragen en een koppelopdracht om je inzicht in gasdruk en atmosferische druk te testen.',
                    action: 'exit-ticket'
                }
            ]
        }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SLIDE DECKS
    // ══════════════════════════════════════════════════════════════════════════

    hook_slides: [
        {
            layout: 'predict',
            title: 'De afgesloten spuit en de zuignap',
            question: 'Je sluit een lege injectiespuit luchtdicht af met je duim en trekt met kracht aan de zuiger. Wat gebeurt er als je de zuiger loslaat, en waarom is het zo moeilijk om hem uitgetrokken te houden?',
            context: 'Denk na over de krachten: trekt het vacuüm aan de binnenzijde, of gebeurt er iets anders aan de buitenkant?',
            hint: 'Klik om de fysische verklaring te onthullen',
            revealText: 'De zuiger schiet met kracht terug naar binnen. Het is niet het vacuüm binnenin dat zuigt (een vacuüm bevat immers geen materie en kan geen trekkracht uitoefenen). Het is de buitenlucht die met de volle atmosferische druk (\\( 1013\\text{ hPa} \\)) krachtig tegen de zuiger duwt. Binnen heerst onderdruk, buiten heerst de volle normdruk.'
        }
    ],

    fixed_support_slides: [
        {
            layout: 'title',
            title: 'Afronding druk bij vaste stoffen',
            subtitle: 'Uitgewerkt voorbeeld opgave 7 (p. 18)'
        },
        {
            layout: 'worked-example',
            title: 'Opgave 7 (p. 18): kast op vier poten',
            problem: 'Een kast heeft een massa van 50 kg en staat op vier poten die elk een oppervlakte van 100 cm² hebben. Bereken de grootte van de druk die elke poot op de grond uitoefent.',
            steps: [
                {
                    label: 'Gegeven',
                    result: '\\( m = 50\\text{ kg} \\), \\( \\text{aantal poten} = 4 \\), \\( A_{\\text{poot}} = 100\\text{ cm}^2 = 0{,}0100\\text{ m}^2 \\), \\( \\text{gevraagd: } p = ? \\)'
                },
                {
                    label: 'Totale zwaartekracht',
                    result: '\\( F = F_G = m \\cdot g = 50\\text{ kg} \\cdot 9{,}81\\text{ N/kg} = 490{,}5\\text{ N} \\)'
                },
                {
                    label: 'Totaal contactoppervlak',
                    result: '\\( A = 4 \\cdot A_{\\text{poot}} = 4 \\cdot 0{,}0100\\text{ m}^2 = 0{,}0400\\text{ m}^2 \\)'
                },
                {
                    label: 'Druk per poot berekenen',
                    result: '\\( p = \\frac{F}{A} = \\frac{490{,}5\\text{ N}}{0{,}0400\\text{ m}^2} = 12\\,262{,}5\\text{ Pa} = 1{,}2 \\cdot 10^4\\text{ Pa} \\)'
                }
            ],
            answer: 'De poten oefenen een druk uit van \\( 1{,}2 \\cdot 10^4\\text{ Pa} \\) uit op de grond.'
        }
    ],

    gas_theory_slides: [
        {
            layout: 'title',
            title: 'Theorieverkenner: druk bij gassen',
            subtitle: 'Kinetisch deeltjesmodel, atmosferische normdruk, meettoestellen en overdruk/onderdruk (WACO Thema 1, p. 20-25)'
        },
        {
            layout: 'definition',
            title: 'Groen kader (p. 20): druk in een gas',
            term: 'Kinetisch deeltjesmodel van gasdruk',
            formula: '\\( p = \\frac{F}{A} \\)',
            explanation: 'In een gas bewegen de deeltjes (moleculen) voortdurend met hoge snelheden kriskras door elkaar. Bij elke botsing tegen de wand oefenen de gasdeeltjes een kleine stootkracht uit.<br><br>De <strong>gasdruk</strong> is de totale kracht die al deze ontelbare botsende deeltjes samen per oppervlakte-eenheid uitoefenen op de wanden van het vat.<br><br><em>Onthoud:</em> Gasdruk ontstaat <strong>niet</strong> door het gewicht van de gasdeeltjes, maar door hun voortdurende botsingen tegen de wanden.',
            conditions: [
                'Gasdeeltjes bewegen ordeloos en met grote snelheden',
                'Elke botsing levert een loodrechte stootkracht op de wand',
                'Gasdruk is de som van alle botsingskrachten gedeeld door het wandoppervlak'
            ]
        },
        {
            layout: 'steps',
            title: 'Groen kader (p. 21): drie parameters die gasdruk bepalen',
            steps: [
                {
                    title: '1. Aantal deeltjes (N) vergroten',
                    content: 'Pomp je meer gasdeeltjes in hetzelfde volume? Dan zijn er meer botsingen per seconde per vierkante meter tegen de wanden: <strong>de druk stijgt</strong>.'
                },
                {
                    title: '2. Temperatuur (T) verhogen',
                    content: 'Bij verwarming bewegen de gasdeeltjes sneller. Ze botsen vaker én met een grotere stootkracht tegen de wanden: <strong>de druk stijgt</strong>.'
                },
                {
                    title: '3. Volume (V) verkleinen',
                    content: 'Druk je de zuiger in en maak je het vat kleiner? De deeltjes zitten dichter bijeen en botsen vaker per oppervlakte-eenheid tegen de wand: <strong>de druk stijgt</strong>.'
                }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Begripscheck: invloed van temperatuur (p. 21)',
            question: 'Wat gebeurt er met de gasdruk in een afgesloten aerosol spuitbus als je deze in de hete zon laat liggen?',
            options: [
                'De druk daalt, want het gas zet uit.',
                'De druk stijgt, want de deeltjes bewegen sneller en botsen heviger en vaker tegen de wanden.',
                'De druk blijft exact gelijk, want er kunnen geen deeltjes ontsnappen.',
                'De druk verdwijnt volledig.'
            ],
            correct: 1,
            explanation: 'Correct! Temperatuurstijging verhoogt de snelheid van de gasdeeltjes. Ze botsen met meer impuls en een hogere frequentie tegen de stalen wand, waardoor de druk gevaarlijk hoog kan oplopen.'
        },
        {
            layout: 'equation',
            title: 'Groen kader (p. 23): atmosferische normdruk',
            equation: '\\( p_{\\text{atm}} = 101\\,300\\text{ Pa} = 1013\\text{ hPa} = 1{,}013\\text{ bar} \\)',
            subtitle: 'Gemiddelde luchtdruk op zeeniveau bij 0 °C. Op grotere hoogte daalt de luchtdruk omdat de lucht ijler is (minder deeltjes en minder botsingen).',
            variables: [
                { symbol: '\\( 101\\,300\\text{ Pa} \\)', meaning: 'SI-basiseenheid', unit: 'N/m²' },
                { symbol: '\\( 1013\\text{ hPa} \\)', meaning: 'Meteorologische eenheid', unit: 'Hectopascal' },
                { symbol: '\\( 1{,}013\\text{ bar} \\)', meaning: 'Technische eenheid', unit: 'Bar (100 000 Pa)' },
                { symbol: '\\( 760\\text{ mm Hg} \\)', meaning: 'Kwikbarometer Torricelli', unit: 'Kwikhoogte' }
            ]
        },
        {
            layout: 'comparison',
            title: 'Groen kader (p. 24): meten van druk',
            left: {
                title: 'Barometer (atmosferische druk)',
                content: 'Meettoestel om de <strong>buitenluchtdruk</strong> van de open dampkring te meten.<br><br>• Kwikbarometer van Torricelli (760 mm Hg)<br>• Metaalbarometer (aneroïde doos van Vidi)<br>• Gebruikt in weerstations'
            },
            right: {
                title: 'Manometer (gasdruk in een vat)',
                content: 'Meettoestel om de <strong>gasdruk in een afgesloten ruimte</strong> te meten.<br><br>• Vloeistofmanometer (U-buis met vloeistofverschil)<br>• Metaalmanometer (bourdonbuis)<br>• Gebruikt op fietspomp, compressor, duikfles'
            }
        },
        {
            layout: 'comparison',
            title: 'Groen kader (p. 25): overdruk en onderdruk',
            left: {
                title: 'Overdruk (\\( p_{\\text{gas}} > p_{\\text{atm}} \\))',
                content: 'De gasdruk in de ruimte is <strong>hoger dan de atmosferische druk</strong>.<br><br>Voorbeelden:<br>• Opgepompte fietsband (4 bar)<br>• Duikfles (200 bar)<br>• Spuitbus deodorant'
            },
            right: {
                title: 'Onderdruk (\\( p_{\\text{gas}} < p_{\\text{atm}} \\))',
                content: 'De gasdruk in de ruimte is <strong>lager dan de atmosferische druk</strong>.<br><br>Voorbeelden:<br>• Vacuümpak koffie<br>• Zuignap tegen het raam<br>• Inademen via de longen'
            }
        },
        {
            layout: 'multichoice',
            title: 'Begripscheck: vliegtuig op 10 km hoogte (p. 28 Oef 9e)',
            question: 'Op 10 km hoogte bedraagt de buitendruk amper 264 hPa. In de passagierscabine houdt men de druk op 800 hPa. Welke toestand heerst er in de cabine ten opzichte van de omringende buitenlucht?',
            options: [
                'Onderdruk, want 800 hPa is minder dan de zeeniveau-normdruk van 1013 hPa.',
                'Overdruk, want de druk in de cabine (800 hPa) is aanzienlijk hoger dan de omringende buitenlucht (264 hPa).',
                'Er is geen drukverschil tussen cabine en buitenlucht.',
                'De cabine is vacuüm gezogen.'
            ],
            correct: 1,
            explanation: 'Correct! Overdruk en onderdruk worden altijd beoordeeld ten opzichte van de directe omgeving. Omdat 800 hPa > 264 hPa heerst er in het vliegtuig een stevige overdruk naar buiten toe.'
        }
    ],

    calculation_slides: [
        {
            layout: 'title',
            title: 'Vraagstukhulp: kracht van luchtdruk',
            subtitle: 'Stap-voor-stap oplossen met F = p · A'
        },
        {
            layout: 'worked-example',
            title: 'Opgave 8 (p. 28): kracht op je handpalm',
            problem: 'a) Hoe groot is de kracht die de luchtdruk uitoefent op je handpalm met een oppervlakte van 165 cm²? b) Met welke massa komt deze kracht overeen?',
            steps: [
                {
                    label: 'Oppervlakte omzetten naar m²',
                    result: '\\( A_{\\text{hand}} = 165\\text{ cm}^2 = 0{,}0165\\text{ m}^2 \\)'
                },
                {
                    label: 'Luchtkracht berekenen',
                    result: '\\( p_{\\text{atm}} = 1\\,013\\text{ hPa} = 101\\,300\\text{ Pa} \\), \\( F_{\\text{hand}} = p_{\\text{atm}} \\cdot A_{\\text{hand}} = 101\\,300\\text{ Pa} \\cdot 0{,}0165\\text{ m}^2 = 1\\,671{,}45\\text{ N} = 1{,}67 \\cdot 10^3\\text{ N} \\)'
                },
                {
                    label: 'Equivalente massa berekenen',
                    result: '\\( F_{G,\\text{hand}} = m_{\\text{hand}} \\cdot g \\), \\( m_{\\text{hand}} = \\frac{F_{G,\\text{hand}}}{g} = \\frac{1{,}67 \\cdot 10^3\\text{ N}}{9{,}81\\text{ N/kg}} = 0{,}170 \\cdot 10^3\\text{ kg} = 1{,}70 \\cdot 10^2\\text{ kg} \\)'
                }
            ],
            answer: 'a) De kracht van de luchtdruk op de handpalm is \\( 1{,}67 \\cdot 10^3\\text{ N} \\).<br>b) Dit komt overeen met een massa van \\( 1{,}70 \\cdot 10^2\\text{ kg} \\) of \\( 170\\text{ kg} \\).'
        },
        {
            layout: 'worked-example',
            title: 'Opgave 11 (p. 29): het Cupola-raam van het ISS',
            problem: 'Het ronde raam van de Cupola in het ISS heeft een diameter van 80 cm. Binnen heerst de normdruk (101 300 Pa), buiten is het vacuüm (0 Pa). Bereken de kracht op het raam.',
            steps: [
                {
                    label: 'Gegeven',
                    result: '\\( d = 80\\text{ cm} = 0{,}80\\text{ m} \\Rightarrow r = 0{,}40\\text{ m} \\), \\( p_{\\text{binnen}} = 1\\,013\\text{ hPa} = 101\\,300\\text{ Pa} \\), \\( \\text{gevraagd: } F = ? \\)'
                },
                {
                    label: 'Oplossing',
                    result: '\\( F = p \\cdot A = p \\cdot \\pi \\cdot r^2 = 101\\,300\\text{ Pa} \\cdot 3{,}14 \\cdot (0{,}40\\text{ m})^2 = 318\\,082\\text{ Pa} \\cdot 0{,}16\\text{ m}^2 = 50\\,893{,}12\\text{ N} = 5{,}1 \\cdot 10^4\\text{ N} \\)'
                }
            ],
            answer: 'Het ronde raam moet een kracht van \\( 5{,}1 \\cdot 10^4\\text{ N} \\) kunnen weerstaan.'
        }
    ],

    summary_slides: [
        {
            layout: 'title',
            title: 'Samenvatting: druk bij gassen',
            subtitle: 'De essentie van hoofdstuk 2'
        },
        {
            layout: 'steps',
            title: 'Vier fysische pijlers',
            steps: [
                {
                    title: '1. Oorsprong van gasdruk',
                    content: 'Gasdruk ontstaat door elastische botsingen van chaotisch bewegende deeltjes tegen de wanden.'
                },
                {
                    title: '2. De 3 parameters',
                    content: 'Druk stijgt wanneer: temperatuur stijgt (snellere deeltjes), volume daalt (dichter bijeen), of aantal deeltjes toeneemt.'
                },
                {
                    title: '3. Atmosferische normdruk',
                    content: '\\( 1013\\text{ hPa} = 1{,}013\\text{ bar} = 101\\,300\\text{ Pa} \\). De luchtdruk neemt af met de hoogte.'
                },
                {
                    title: '4. Overdruk en onderdruk',
                    content: 'Overdruk: druk is hoger dan omgevingsdruk. Onderdruk: druk is lager dan omgevingsdruk (vacuüm zuigt niet, buitenlucht duwt!).'
                }
            ]
        },
        {
            layout: 'split',
            title: 'Overdruk versus onderdruk in de praktijk',
            left: {
                title: 'Overdruk',
                content: '<strong>\\( p_{\\text{gas}} > p_{\\text{atm}} \\)</strong><br><br>• Fietsband, autoband<br>• Spuitbus deodorant<br>• Duikfles (200 bar)<br>• Gemeten met manometer'
            },
            right: {
                title: 'Onderdruk',
                content: '<strong>\\( p_{\\text{gas}} < p_{\\text{atm}} \\)</strong><br><br>• Zuignap tegen gladde wand<br>• Vacuümpak koffie<br>• Drinken met een rietje<br>• Buitenlucht zorgt voor de kracht'
            }
        }
    ],

    exitTicket: {
        questions: [
            {
                id: 'q1',
                type: 'mc',
                question: 'Hoe ontstaat de druk die een gas uitoefent op de wanden van een afgesloten vat volgens het deeltjesmodel?',
                options: [
                    'Door de zwaartekracht van de deeltjes die op de bodem rusten.',
                    'Door de ontelbare botsingen van de bewegende gasdeeltjes tegen de wanden.',
                    'Door de aantrekkingskrachten tussen de gasdeeltjes onderling.',
                    'Omdat de deeltjes stilstaan en ruimte innemen.'
                ],
                correct: 1
            },
            {
                id: 'q2',
                type: 'mc',
                question: 'Welke van onderstaande waarden komt exact overeen met de gemiddelde atmosferische normdruk op zeeniveau?',
                options: [
                    '1013 Pa',
                    '101 300 hPa',
                    '1,013 bar (of 1013 hPa)',
                    '10,13 bar'
                ],
                correct: 2
            },
            {
                id: 'q3',
                type: 'mc',
                question: 'Waarom blijft een rubberen zuignap stevig tegen een glazen raam zitten als je hem ertegenaan drukt?',
                options: [
                    'De lucht onder de zuignap trekt de zuignap vast naar binnen.',
                    'De moleculen van het rubber smelten samen met het glas.',
                    'Door het indrukken ontstaat onderdruk binnenin, waardoor de atmosferische buitenlucht de zuignap krachtig tegen het glas duwt.',
                    'Door de magnetische lading van het glas.'
                ],
                correct: 2
            },
            {
                id: 'q4',
                type: 'matching',
                question: 'Verbind elk verschijnsel met de juiste fysische verklaring.',
                description: 'Klik eerst op een situatie aan de linkerkant en kies vervolgens de passende fysische verklaring aan de rechterkant.',
                pairs: [
                    {
                        left: 'Rubberen zuignap blijft tegen een raam plakken',
                        right: 'Onderdruk binnenin; de atmosferische buitenlucht duwt de nap met volle kracht tegen het glas.'
                    },
                    {
                        left: 'Afgesloten injectiespuit uittrekken voelt zwaar',
                        right: 'In de cilinder daalt de druk; de buitenlucht duwt met atmosferische normdruk tegen de zuiger.'
                    },
                    {
                        left: 'Sneeuwschoenen voorkomen dat je in diepe sneeuw wegzakt',
                        right: 'Groter contactoppervlak verlaagt de uitgeoefende druk bij een gelijkblijvende zwaartekracht.'
                    },
                    {
                        left: 'Een hard opgepompte fietsband voelt stevig aan',
                        right: 'Overdruk in de band door een groot aantal gasdeeltjes die intensief tegen de binnenwand botsen.'
                    }
                ]
            }
        ]
    }
}
