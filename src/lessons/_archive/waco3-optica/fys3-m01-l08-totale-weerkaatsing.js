/**
 * Totale Weerkaatsing & Grenshoek - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 3: Lichtbreking (Les 2/2)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 56-59)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l08-totale-weerkaatsing',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Totale Weerkaatsing & Grenshoek',
    description: 'Het ontstaan van de grenshoek (r = 90°), de twee strikte voorwaarden voor totale interne weerkaatsing (dichter naar minder dicht en i > ig) en toepassingen in glasvezel, endoscopie en prisma-verrekijkers.',

    config: {
        groenCode: 'F3M01L08',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 56-59)'
    },

    goals: [
        'Ik kan verklaren wat de grenshoek (i_g) is: de invalshoek in de optisch dichtere stof waarbij de brekingshoek r precies 90° bedraagt.',
        'Ik kan de twee strikte voorwaarden voor totale weerkaatsing formuleren en toepassen: 1) van optisch dichter naar minder dicht; 2) invalshoek i > i_g.',
        'Ik ken de grenshoeken voor water-lucht (ca. 49°), glas-lucht (ca. 42°) en diamant-lucht (ca. 24°).',
        'Ik kan de werking van glasvezelkabels (telecommunicatie en endoscopie), porroprisma\'s in verrekijkers en retroreflectoren (kattenogen) verklaren.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 3: Totale Weerkaatsing (p. 56-59)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 56-57</strong> de proeven met het halfronde glazen blokje op de optische schijf. Maak vervolgens op <strong>pagina 58-59 oefeningen 6, 7, 8 en 10</strong>.</p>',
        formulaHint: 'Twee voorwaarden voor totale weerkaatsing: 1) \\( v_1 < v_2 \\) (optisch dichter naar minder dicht); 2) \\( \\hat{i} > \\hat{i}_g \\). Grenshoek glas: \\( 42^\\circ \\); water: \\( 49^\\circ \\); diamant: \\( 24^\\circ \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over lichtbreking weg van de normaal (r > i) en lichtsnelheden.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & Licht in een Waterstraal',
                    description: 'Hoe kan een laserstraal gevangen blijven in een gekromde waterstraal uit een fles?',
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
                    title: 'Grenshoek, Totale Weerkaatsing & Glasvezel',
                    description: 'De twee voorwaarden, grenshoekwaarden (49°, 42°, 24°), glasvezeltechnologie en porroprisma\'s.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 6, 7, 8 en 10 (leerwerkboek p. 58-59).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: totale weerkaatsing',
                    description: 'Onderzoek de grenshoek en totale interne reflectie in water en glas.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Optische Vezels & Prisma\'s Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Totale Reflectie & Glasvezel',
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
                    title: 'Synthese van Hoofdstuk 3',
                    description: 'Overzicht van breking en totale reflectie, en introductie van bolle lenzen in hoofdstuk 4.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de grenshoek en totale weerkaatsing.',
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
            title: 'Grenshoeken van Transparante Stoffen naar Lucht',
            instruction: 'Koppel elke stof aan haar specifieke grenshoek en optisch effect.',
            pairs: [
                { term: 'Water (naar lucht)', definition: 'Grenshoek i_g = 49°: onder water zie je boven 49° de wateroppervlakte als een zilveren spiegel' },
                { term: 'Kroonglas (naar lucht)', definition: 'Grenshoek i_g = 42°: een invalshoek van 45° in een prisma levert gegarandeerd 100% reflectie op' },
                { term: 'Diamant (naar lucht)', definition: 'Grenshoek i_g = 24°: extreem kleine grenshoek zorgt voor schitterende interne lichtopsluiting' },
                { term: 'Medische endoscoop', definition: 'Bundel van duizenden glasvezels om inwendige organen haarscherp te verlichten en bekijken' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Totale Weerkaatsing & Glasvezel (WACO 3)',
            questions: [
                {
                    q: 'Onder welke twee strikte voorwaarden treedt TOTALE WEERKAATSING op?',
                    a: [
                        'Het licht reist van optisch dichter naar optisch minder dicht én de invalshoek is groter dan de grenshoek (i > i_g).',
                        'Het licht reist van lucht naar glas onder een hoek van 90°.',
                        'Het licht valt loodrecht in op een spiegel.',
                        'Het licht is monochromatisch en heeft een golflengte van 500 nm.'
                    ],
                    c: 0
                },
                {
                    q: 'Een duiker schijnt met zijn onderwaterlamp omhoog naar het wateroppervlak (grenshoek water-lucht i_g = 49°). Wat gebeurt er met de lichtstraal als de invalshoek i = 60° bedraagt?',
                    a: [
                        'Totale weerkaatsing: de straal kan het water niet verlaten en kaatst voor 100% terug naar beneden onder een hoek van 60°.',
                        'De straal breekt onder een hoek van 90° in de lucht.',
                        'De straal verlaat het water rechtdoor.',
                        'De straal wordt geabsorbeerd door het water.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom fonkelt een vakkundig geslepen diamant veel intenser dan een identiek geslepen glazen namaaksteen?',
                    a: [
                        'Diamant heeft een extreem kleine grenshoek (24° vs 42° voor glas), waardoor vrijwel alle binnendringende stralen vele malen totaal weerkaatsen voor ze aan de bovenzijde uittreden.',
                        'Diamant is radioactief en zendt zelf licht uit.',
                        'Diamant reflecteert alleen ultraviolet licht.',
                        'Diamant heeft geen brekingsindex.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom geeft een 45°-45°-90° glazen prisma in een kwaliteitsverrekijker een veel helderder beeld dan een gewone spiegel?',
                    a: [
                        'Totale weerkaatsing in glas reflecteert 100% van het licht zonder enig verlies, terwijl een spiegelende metaallaag altijd 5 tot 10% licht absorbeert en kan oxideren.',
                        'Omdat prisma\'s licht versterken als een batterij.',
                        'Omdat prisma\'s de kleuren omkeren.',
                        'Omdat glas lichter weegt dan spiegels.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Totale Weerkaatsing & Grenshoek',
            subtitle: 'Lichtopsluiting in glasvezel, prisma\'s en diamanten (WACO 3 p. 56-59)',
            badge: 'Fysica 3 - Les 8',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Het begrip grenshoek (invalshoek waarbij r = 90°) begrijpen en aanduiden.' },
                { icon: 'function', text: 'De twee strikte voorwaarden voor totale interne weerkaatsing toepassen.' },
                { icon: 'function', text: 'De typische grenshoeken voor water (49°), glas (42°) en diamant (24°) hanteren.' },
                { icon: 'function', text: 'Toepassingen in glasvezeltechnologie, medische endoscopie en verrekijkers verklaren.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Licht in een Waterstraal',
            question: 'Je prikt een gaatje in de zijkant van een plastic fles vol water, zodat er een dunne gekromde waterstraal in een bakje stroomt. Aan de achterkant schijn je met een rode laserpen recht door de fles in het gaatje. Wat gebeurt er met het laserlicht?',
            hint: 'Volgt het licht de rechte lijn naar de overkant van het lokaal, of volgt het de kromme waterstraal?',
            revealText: 'Het laserlicht buigt mee met de kromme waterstraal tot in het opvangbakje! Zodra de laserstraal van binnenuit tegen de wand van de waterstraal botst onder een hoek groter dan 49°, treedt TOTALE WEERKAATSING op. Het licht blijft als in een tunnel gevangen in het water. Dit is exact het principe van de moderne glasvezelkabel!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Breking Weg van de Normaal',
            items: [
                { label: 'Voorwaarde', value: 'Overgang van een optisch dichtere stof (trager) naar een minder dichte stof (sneller): v₁ < v₂.' },
                { label: 'Hoekrelatie', value: 'r > i (de brekingshoek is ALTIJD groter dan de invalshoek).' },
                { label: 'Wat als i groter wordt?', value: 'Als je de invalshoek i vergroot, buigt de gebroken straal r steeds dichter naar het wateroppervlak toe.' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'De Grenshoek (i_g)',
            definition: 'De grenshoek \\( \\hat{i}_g \\) is de invalshoek in de optisch dichtere stof waarbij de brekingshoek in de optisch minder dichte stof precies \\( 90^\\circ \\) bedraagt (\\( \\hat{r} = 90^\\circ \\)). De gebroken straal scheert dan rakelings langs het scheidingsoppervlak.'
        },
        {
            layout: 'definition',
            term: 'Totale Weerkaatsing',
            definition: 'Als de invalshoek groter is dan de grenshoek (\\( \\hat{i} > \\hat{i}_g \\)), kan het licht de optisch dichtere stof niet meer verlaten. Er treedt geen breking meer op: 100% van het licht wordt volgens de reflectiewet (\\( \\hat{t} = \\hat{i} \\)) intern teruggekaatst.'
        },
        {
            layout: 'properties',
            title: 'De Twee Strikte Voorwaarden (WACO 3 p. 57)',
            items: [
                { label: 'Voorwaarde 1: Middenstoffen', value: 'Het licht MOET reizen van een optisch dichtere stof (bv. glas of water) naar een optisch minder dichte stof (bv. lucht). Van lucht naar water kan NOOIT totale reflectie optreden!' },
                { label: 'Voorwaarde 2: Invalshoek', value: 'De invalshoek moet strikt groter zijn dan de grenshoek van die stofovergang: i > i_g.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Grenshoeken naar Lucht in de Praktijk',
            items: [
                { label: 'Water → lucht (i_g = 49°)', value: 'Als een duiker onder water schijnt onder 55°, keert de bundel volledig terug naar de bodem.' },
                { label: 'Kroonglas → lucht (i_g = 42°)', value: 'Ideaal voor 45°-prisma\'s: omdat 45° > 42°, reflecteert glas onder 45° altijd voor 100%.' },
                { label: 'Diamant → lucht (i_g = 24°)', value: 'Extreem kleine grenshoek! Vrijwel al het licht dat binnenkomt botst onder i > 24° en blijft fonkelend binnenin rondkaatsen.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Toepassingen in Techniek en Geneeskunde',
            items: [
                { label: 'Glasvezel (Fiber)', value: 'Flinterdunne zuivere glasvezel. Lichtpulsen vallen in onder i > 42° en kaatsen met 200 000 km/s duizenden kilometers ver door zonder lekverlies.' },
                { label: 'Medische endoscopie', value: 'Een flexibele buis met duizenden glasvezels brengt licht in de maag of gewrichten en zendt het beeld haarscherp terug naar de chirurg.' },
                { label: 'Porroprisma in verrekijker', value: 'Vouwt de lichtweg tweemaal om en zet het beeld rechtop, met 100% lichtopbrengst (helderder dan gewone spiegels).' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 7 p. 58)',
            question: 'Een lichtstraal valt in van lucht naar glas onder een invalshoek van 65°. Treedt er totale weerkaatsing op?',
            options: [
                { id: 'A', text: 'Ja, want 65° is groter dan de grenshoek van glas (42°).', correct: false },
                { id: 'B', text: 'Nee, want het licht gaat van een minder dichte naar een dichtere stof; aan voorwaarde 1 is niet voldaan!', correct: true },
                { id: 'C', text: 'Alleen als het glas gekleurd is.', correct: false },
                { id: 'D', text: 'Ja, als het een laserstraal is.', correct: false }
            ],
            explanation: 'Dit is de klassieke valkuil! Totale weerkaatsing kan UITSLUITEND optreden wanneer licht van een optisch dichtere stof (trager) naar een minder dichte stof (sneller) gaat. Van lucht naar glas breekt het licht altijd NAAR de normaal toe en kan er nóóit totale reflectie optreden.'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Hoofdstuk 3 Breking',
            items: [
                'Lichtbreking ontstaat door snelheidsverschil tussen middenstoffen.',
                'Grenshoek i_g: invalshoek waarbij brekingshoek r = 90° (scheert langs oppervlak).',
                'Totale weerkaatsing: 100% reflectie binnenshuis mits 1) dichter → minder dicht én 2) i > i_g.',
                'Grenshoeken naar lucht: water (49°), glas (42°), diamant (24°).',
                'Toepassingen: glasvezelinternet, endoscopie, porroprisma\'s en fonkelende diamanten.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor Hoofdstuk 4!',
            subtitle: 'In les 9 onderzoeken we hoe bolle lenzen licht breken met de drie karakteristieke hoofdstralen.',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '3 Afgerond' },
                { label: 'Lesuur', value: '8 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'In welke situatie breekt een lichtstraal WEG van de normaal (r > i)?',
                options: [
                    'Bij de overgang van een optisch dichtere stof (trager) naar een optisch minder dichte stof (sneller).',
                    'Bij de overgang van lucht naar glas.',
                    'Bij loodrechte inval op een wateroppervlak.',
                    'Bij reflectie op een spiegel.'
                ],
                correct: 0,
                explanation: 'Wanneer licht versnelt bij overgang naar een optisch ijlere stof (zoals water naar lucht), buigt de straal weg van de normaal: r > i.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Wat gebeurt er met de brekingshoek r als je de invalshoek i in water steeds groter maakt (richting grenshoek)?',
                options: [
                    'De brekingshoek r in de lucht wordt ook steeds groter en nadert 90°.',
                    'De brekingshoek wordt kleiner en nadert 0°.',
                    'De brekingshoek blijft exact 45°.',
                    'Het licht dooft onmiddellijk uit.'
                ],
                correct: 0,
                explanation: 'Omdat r > i, zal de brekingshoek r meegroeien totdat hij de maximale waarde van 90° bereikt.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Wat is de definitie van de "grenshoek" (i_g)?',
                options: [
                    'De invalshoek in de optisch dichtere stof waarbij de brekingshoek in de minder dichte stof precies 90° is.',
                    'De maximale temperatuur van een prisma.',
                    'De hoek waaronder een spiegel breekt.',
                    'De hoek tussen de normaal en de spiegel.'
                ],
                correct: 0,
                explanation: 'Bij de grenshoek i_g scheert de gebroken lichtstraal net langs het scheidingsoppervlak (r = 90°).'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Hoe groot is de grenshoek voor de overgang van gewoon glas naar lucht ongeveer?',
                options: [
                    'Ongeveer 42°',
                    'Ongeveer 90°',
                    'Ongeveer 10°',
                    'Ongeveer 75°'
                ],
                correct: 0,
                explanation: 'Voor kroonglas naar lucht bedraagt de grenshoek circa 42°.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Kan er totale weerkaatsing optreden wanneer een lichtstraal van lucht naar water reist?',
                options: [
                    'Nee, nooit (omdat lucht optisch minder dicht is dan water; voorwaarde 1 is niet vervuld).',
                    'Ja, bij elke hoek groter dan 49°.',
                    'Ja, alleen als het water zout is.',
                    'Ja, bij loodrechte inval.'
                ],
                correct: 0,
                explanation: 'Totale weerkaatsing kan uitsluitend optreden bij overgang van optisch dichter naar optisch minder dicht.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Een lichtstraal in glas (i_g = 42°) valt op het grensvlak met lucht onder een invalshoek van 50°. Wat gebeurt er met het licht?',
                options: [
                    'Totale weerkaatsing: 100% van het licht kaatst terug in het glas onder een terugkaatsingshoek van 50°.',
                    'Het licht breekt onder een hoek van 90° in de lucht.',
                    'Het licht treedt ongebroken uit naar de lucht.',
                    'Het licht wordt volledig geabsorbeerd.'
                ],
                correct: 0,
                explanation: 'Omdat glas optisch dichter is dan lucht én de hoek van 50° groter is dan de grenshoek (42°), treedt totale weerkaatsing op volgens t = i = 50°.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Welk technologisch instrument maakt gebruik van totale interne weerkaatsing om licht door flexibele dunne vezels te sturen?',
                options: [
                    'De glasvezelkabel (telecom en endoscopie).',
                    'De luidspreker.',
                    'De microscoopplaat.',
                    'De kwikbarometer.'
                ],
                correct: 0,
                explanation: 'In glasvezelkabels zorgt totale interne reflectie ervoor dat datasignalen over enorme afstanden zonder lichtlekkage getransporteerd worden.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Optische Analyse',
                description: 'Leg uit waarom een diamant (grenshoek 24°) door een juwelier in precieze facetten geslepen moet worden om maximaal te "fonkelen". Wat gebeurt er met een lichtstraal die aan de bovenzijde binnentreedt?'
            }
        ]
    }
}
