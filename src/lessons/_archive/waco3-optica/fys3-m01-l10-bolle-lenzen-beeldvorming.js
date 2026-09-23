/**
 * Beeldvorming bij Bolle Lenzen: De 5 Standen - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 4: Lenzen (Les 2/3)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 68-76)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l10-bolle-lenzen-beeldvorming',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Beeldvorming bij Bolle Lenzen: De 5 Standen',
    description: 'De vijf kenmerkende voorwerpsposities bij een convergerende lens (v > 2f, v = 2f, f < v < 2f, v = f en v < f) en hun toepassingen in camera\'s, beamers, schijnwerpers en vergrootglazen.',

    config: {
        groenCode: 'F3M01L10',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 68-76)'
    },

    goals: [
        'Ik kan voor elk van de 5 voorwerpsafstanden (v > 2f, v = 2f, f < v < 2f, v = f en v < f) de beeldkenmerken bepalen: reëel/virtueel, rechtopstaand/omgekeerd en vergroot/verkleind/even groot.',
        'Ik kan de stralengang voor elk van de 5 situaties meetkundig nauwkeurig construeren met behulp van 2 hoofdstralen.',
        'Ik kan optische apparaten koppelen aan de juiste voorwerpspositie: fototoestel (v > 2f), 1:1 kopieerapparaat (v = 2f), beamer (f < v < 2f), schijnwerper (v = f) en loep (v < f).',
        'Ik kan verklaren waarom een dia in een projector altijd ondersteboven moet worden geplaatst.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 4: Beeldvorming bij Lenzen (p. 68-76)',
        instruction: '<p>Construeer in je leerwerkboek op <strong>pagina 68-73</strong> de 5 verschillende beelden met potlood en liniaal. Maak vervolgens in het werkboek op <strong>pagina 74-76 oefeningen 5, 6, 7 en 8</strong>.</p>',
        formulaHint: 'Reëel beeld: stralen snijden achter de lens (projecteerbaar op scherm). Virtueel beeld (v < f): verlengden van stralen snijden vóór de lens (alleen met het oog zichtbaar).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over de 3 hoofdstralen, brandpunt F\' en brandpuntsafstand f.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering: De Dia Ondersteboven',
                    description: 'Waarom moet een leerkracht een dia of transparant ondersteboven in de projector leggen om hem rechtop te zien?',
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
                    title: 'De 5 Standen van de Bolle Lens',
                    description: 'Camera (v > 2f), 1:1 (v = 2f), projector (f < v < 2f), schijnwerper (v = f) en loep (v < f).',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 5 t.e.m. 8 (leerwerkboek p. 74-76).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: de 5 standen van beeldvorming',
                    description: 'Verken camera, beamer en loep door het voorwerp te verschuiven.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Optische Toestellen Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Beeldvorming & Lenzen',
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
                    description: 'Overzichtstabel van de 5 standen en vooruitblik naar de vergrotingsfactor in les 11.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de 5 lensstanden en beeldkenmerken.',
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
            title: 'Optische Apparaten en Hun Lenspositie',
            instruction: 'Koppel het optische toestel aan zijn werkingsprincipe volgens WACO 3.',
            pairs: [
                { term: 'Smartphone camera', definition: 'v > 2f: werpt een sterk verkleind reëel beeld op de fotosensor' },
                { term: 'Klasbeamer op scherm', definition: 'f < v < 2f: projecteert een sterk vergroot omgekeerd beeld op de witte muur' },
                { term: 'Draagbare loep', definition: 'v < f: je kijkt dichtbij waardoor een vergroot rechtopstaand virtueel beeld ontstaat' },
                { term: 'Koplamp van een auto', definition: 'v = f: het lampje in het brandpunt zendt een strakke evenwijdige bundel de nacht in' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Beeldvorming bij Lenzen (WACO 3)',
            questions: [
                {
                    q: 'Een voorwerp staat op 8,0 cm van een bolle lens met brandpuntsafstand f = 5,0 cm. Welke beeldkenmerken treden op?',
                    a: [
                        'Reëel, omgekeerd en vergroot (want f < v < 2f: 5 cm < 8 cm < 10 cm; stand 3 beamer).',
                        'Reëel, omgekeerd en verkleind.',
                        'Virtueel, rechtopstaand en vergroot.',
                        'Er ontstaat helemaal geen beeld.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom moet een dia in een ouderwetse diaprojector altijd ONDERSTEBOVEN in de houder worden gestoken?',
                    a: [
                        'Omdat een bolle projectorlens in stand 3 (f < v < 2f) een omgekeerd beeld werpt; door de dia ondersteboven te laden, verschijnt het beeld op het scherm weer netjes rechtop.',
                        'Omdat de lamp onderaan zit.',
                        'Om warmte beter af te voeren.',
                        'Omdat dia\'s anders smelten.'
                    ],
                    c: 0
                },
                {
                    q: 'In welke stand werkt een vergrootglas (loep) wanneer je er een postzegel mee bestudeert?',
                    a: [
                        'Stand 5: v < f (het voorwerp staat dichter bij de lens dan het brandpunt F, wat een virtueel, rechtopstaand en vergroot beeld oplevert).',
                        'Stand 1: v > 2f',
                        'Stand 3: f < v < 2f',
                        'Stand 4: v = f'
                    ],
                    c: 0
                },
                {
                    q: 'Wat gebeurt er met de stralengang als een kleine gloeidraad van een koplamp precies in het brandpunt F van een bolle lens wordt geplaatst (v = f)?',
                    a: [
                        'Alle lichtstralen treden na de lens evenwijdig aan de hoofdas naar buiten (evenwijdige schijnwerperbundel).',
                        'Het licht convergeert naar één punt.',
                        'Het licht wordt 100% teruggekaatst.',
                        'De lens dooft het licht.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Beeldvorming bij Bolle Lenzen',
            subtitle: 'De 5 kenmerkende standen en optische apparaten (WACO 3 p. 68-76)',
            badge: 'Fysica 3 - Les 10',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'De vijf specifieke voorwerpsafstanden (v > 2f, v = 2f, f < v < 2f, v = f, v < f) begrijpen.' },
                { icon: 'function', text: 'Voor elke stand de drie beeldkenmerken (reëel/virtueel, rechtop/omgekeerd, vergroot/verkleind) bepalen.' },
                { icon: 'function', text: 'De meetkundige stralenconstructie met 2 hoofdstralen foutloos uitvoeren.' },
                { icon: 'function', text: 'De werking van fototoestellen, beamers, schijnwerpers en vergrootglazen verklaren.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Waarom Moet de Dia Ondersteboven?',
            question: 'Wanneer je een bioscoopprojector of diaprojector gebruikt, moet de filmstrook of dia altijd ondersteboven en achterstevoren in het apparaat worden geschoven om de film op het witte doek rechtop te zien. Waarom draait de lens het beeld zomaar 180 graden om?',
            hint: 'Kijk naar de hoofdstralen: wat gebeurt er met de straal die van de top van het voorwerp door O gaat?',
            revealText: 'Een bolle lens die een beeld projecteert op een scherm (stand 3: f < v < 2f) kruist alle lichtstralen achter de lens. De lichtstraal van de bovenkant van de dia reist schuin naar beneden, en de straal van de onderkant reist schuin naar boven. Het beeld op het scherm staat dus onverbiddelijk ondersteboven en links-rechts verwisseld!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: De 2 Meest Gebruikte Hoofdstralen',
            items: [
                { label: 'Straal 1 (Evenwijdig)', value: 'Loopt evenwijdig aan hoofdas ⇒ breekt door het beeldbrandpunt F\'.' },
                { label: 'Straal 2 (Middelpunt)', value: 'Loopt recht door het centrum O ⇒ gaat ongebroken rechtdoor.' },
                { label: 'Snijpunt', value: 'Waar straal 1 en straal 2 elkaar kruisen, ontstaat het reële beeldpunt B!' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'properties',
            title: 'De 5 Standen in het Overzicht (WACO 3 p. 68)',
            items: [
                { label: 'Stand 1: v > 2f', value: 'Beeld is REËEL, OMGEKEERD en VERKLEIND (f < b < 2f). Toepassing: Fototoestel / menselijk oog.' },
                { label: 'Stand 2: v = 2f', value: 'Beeld is REËEL, OMGEKEERD en EVEN GROOT (b = 2f). Toepassing: 1:1 Kopieerapparaat.' },
                { label: 'Stand 3: f < v < 2f', value: 'Beeld is REËEL, OMGEKEERD en VERGROOT (b > 2f). Toepassing: Beamer / diaprojector.' },
                { label: 'Stand 4: v = f', value: 'GEEN BEELD: de stralen lopen na de lens evenwijdig. Toepassing: Schijnwerper / autokoplamp.' },
                { label: 'Stand 5: v < f', value: 'Beeld is VIRTUEEL, RECHTOPSTAAND en VERGROOT (vóór de lens). Toepassing: Loep / vergrootglas.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Stand 1: De Fotocamera (v > 2f)',
            problem: 'Je fotografeert een boom van 10 meter hoog op 30 meter afstand met een cameralens met brandpuntsafstand \\( f = 50\\text{ mm} \\).',
            steps: [
                { label: 'Situatie', content: 'Je fotografeert een boom van 10 meter hoog op 30 meter afstand met een cameralens met brandpuntsafstand \\( f = 50\\text{ mm} \\).' },
                { label: 'Voorwerpsafstand', content: '\\( v = 30\\text{ m} \\gg 2f = 0{,}10\\text{ m} \\). Stand 1 is van toepassing.' },
                { label: 'Beeldvorming', content: 'De lichtstralen kruisen vlak achter het brandpunt \\( F\' \\) (op beeldafstand \\( b \= 50\\text{ mm} \\)).' },
                { label: 'Resultaat', content: 'Op de kleine beeldsensor van de camera ontstaat een haarscherp, verkleind en omgekeerd beeld van de hele boom!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Stand 3: De Beamer / Projector (f < v < 2f)',
            problem: 'In de beamer bevindt zich een klein micro-LCD-schermpje van amper 2 cm breed.',
            steps: [
                { label: 'Situatie', content: 'In de beamer bevindt zich een klein micro-LCD-schermpje van amper 2 cm breed.' },
                { label: 'Positie t.o.v. de lens', content: 'Het schermpje staat nét voorbij het brandpunt: \\( f < v < 2f \\).' },
                { label: 'Beeldvorming', content: 'De lichtstralen kruisen elkaar pas meters ver achter de lens op de bioscoopwand: \\( b \\gg 2f \\).' },
                { label: 'Resultaat', content: 'Er ontstaat een reëel, omgekeerd maar gigantisch VERGROOT beeld van 3 meter breed op de muur!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Stand 5: Het Vergrootglas / De Loep (v < f)',
            problem: 'Je houdt een loep vlak boven een piepkleine letter in je handboek (\\( v < f \\)).',
            steps: [
                { label: 'Situatie', content: 'Je houdt een loep vlak boven een piepkleine letter in je handboek (\\( v < f \\)).' },
                { label: 'Gedrag van de stralen', content: 'Omdat het voorwerp zo dicht bij de lens staat, breken de stralen wel naar elkaar toe, maar snijden ze elkaar niet achter de lens (ze lopen uit elkaar!).' },
                { label: 'Waar ontstaat het beeld?', content: 'Kijk je met je oog door de lens, dan verlengen je hersenen de stralen virtueel naar achteren.' },
                { label: 'Resultaat', content: 'Je ziet een VIRTUEEL, RECHTOPSTAAND en sterk VERGROOT beeld van de letter!' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 6 p. 75)',
            question: 'Een bolle lens heeft f = 4,0 cm. Een kaars staat op v = 8,0 cm van de lens. Welke uitspraak over het beeld is JUIST?',
            options: [
                { id: 'A', text: 'Het beeld is reëel, omgekeerd en exact even groot als de kaars (op b = 8,0 cm).', correct: true },
                { id: 'B', text: 'Het beeld is virtueel en vergroot.', correct: false },
                { id: 'C', text: 'Er is geen beeld mogelijk.', correct: false },
                { id: 'D', text: 'Het beeld is verkleind op 4 cm.', correct: false }
            ],
            explanation: 'Omdat v = 8,0 cm en f = 4,0 cm, geldt exact v = 2f (stand 2). Volgens de optische wetten is het beeld dan reëel, omgekeerd en precies even groot als het voorwerp (|B| = V), op een beeldafstand b = 2f = 8,0 cm.'
        },
        {
            layout: 'properties',
            title: 'Reëel versus Virtueel bij Lenzen',
            items: [
                { label: 'Reëel beeld (standen 1, 2, 3)', value: 'Ontstaat door daadwerkelijk snijdende lichtstralen achter de lens. KAN worden opgevangen op een wit scherm of fotosensor.' },
                { label: 'Virtueel beeld (stand 5)', value: 'Ontstaat door het denkbeeldig verlengen van divergerende stralen vóór de lens. Kan NIET op een scherm worden opgevangen, enkel met het oog waargenomen.' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: De 5 Lensstanden',
            items: [
                'v > 2f: reëel, omgekeerd, verkleind (camera, oog).',
                'v = 2f: reëel, omgekeerd, even groot (1:1 kopieerapparaat).',
                'f < v < 2f: reëel, omgekeerd, vergroot (beamer, projector).',
                'v = f: geen beeld; evenwijdige stralenbundel (schijnwerper).',
                'v < f: virtueel, rechtopstaand, vergroot (loep, vergrootglas).'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 11!',
            subtitle: 'In les 11 leren we de lineaire vergrotingsfactor N = |B|/V = b/v berekenen aan de hand van gelijkvormige driehoeken.',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '4 Lenzen' },
                { label: 'Lesuur', value: '10 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat is het belangrijkste verschil tussen een reëel beeld en een virtueel beeld bij lenzen?',
                options: [
                    'Een reëel beeld kan op een scherm worden opgevangen; een virtueel beeld niet.',
                    'Een reëel beeld is altijd groter dan het voorwerp.',
                    'Een virtueel beeld staat altijd ondersteboven.',
                    'Een reëel beeld ontstaat alleen in het donker.'
                ],
                correct: 0,
                explanation: 'Reële beelden worden gevormd door elkaar fysiek kruisende lichtstralen en kunnen op papier of een scherm worden geprojecteerd.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Als een voorwerp op zeer grote afstand voor een bolle lens staat (v > 2f), hoe ziet het beeld er dan uit?',
                options: [
                    'Reëel, omgekeerd en verkleind (zoals in een fototoestel).',
                    'Virtueel, rechtopstaand en vergroot.',
                    'Reëel, rechtopstaand en even groot.',
                    'Er is geen beeld.'
                ],
                correct: 0,
                explanation: 'In stand 1 (camera) is het beeld altijd reëel, omgekeerd en sterk verkleind.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'In welk optisch apparaat wil men een reëel, sterk VERGROOT beeld op een scherm projecteren?',
                options: [
                    'Een beamer / diaprojector (stand 3: f < v < 2f).',
                    'Een loep.',
                    'Een zonnebril.',
                    'Een achteruitkijkspiegel.'
                ],
                correct: 0,
                explanation: 'Een beamer plaatst het miniatuurscherm tussen f en 2f van de lens om een gigantisch vergroot reëel beeld op de wand te toveren.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wat gebeurt er als je een voorwerp precies in het voorwerpsbrandpunt F van een bolle lens zet (v = f)?',
                options: [
                    'De gebroken stralen lopen evenwijdig; er ontstaat een strakke schijnwerperbundel zonder beeld.',
                    'Er ontstaat een reëel beeld op afstand 2f.',
                    'De lens ontploft door hitte.',
                    'Het beeld wordt oneindig klein.'
                ],
                correct: 0,
                explanation: 'Bij v = f kruisen de hoofdstralen elkaar na de lens niet meer; ze lopen evenwijdig de ruimte in (schijnwerperprincipe).'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een plantje van 10 cm hoog staat op 15 cm van een bolle lens met brandpuntsafstand f = 10 cm. Welke uitspraak over het beeld is JUIST?',
                options: [
                    'Het beeld is reëel, omgekeerd en vergroot (want 10 cm < 15 cm < 20 cm).',
                    'Het beeld is virtueel en verkleind.',
                    'Het beeld is even groot.',
                    'Er is geen beeld.'
                ],
                correct: 0,
                explanation: 'Omdat f < v < 2f (10 cm < 15 cm < 20 cm), bevindt het voorwerp zich in stand 3 (projectorstand): reëel, omgekeerd en vergroot.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Welke stand van de bolle lens gebruikt een bioloog wanneer hij met een handloep naar de pootjes van een mier kijkt?',
                options: [
                    'Stand 5: v < f (dichter bij de lens dan het brandpunt; levert een vergroot, rechtopstaand virtueel beeld op).',
                    'Stand 1: v > 2f',
                    'Stand 2: v = 2f',
                    'Stand 4: v = f'
                ],
                correct: 0,
                explanation: 'Een loep werkt uitsluitend als vergrootglas wanneer het voorwerp zich binnen de brandpuntsafstand bevindt (v < f).'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Waar bevindt het reële beeld zich als het voorwerp precies op afstand v = 2f van de lens staat?',
                options: [
                    'Precies op beeldafstand b = 2f achter de lens (even groot, |B| = V).',
                    'In het brandpunt F\'.',
                    'Vóór de lens op afstand f.',
                    'Op oneindige afstand.'
                ],
                correct: 0,
                explanation: 'Bij v = 2f is de situatie volkomen symmetrisch: het beeld ontstaat exact op b = 2f achter de lens en is 1:1 even groot.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Toepassingsanalyse & Verklaring',
                description: 'Leg uit waarom een smartphonecamera foto\'s kan maken van zowel een berg op 5 kilometer afstand als een vriend op 2 meter afstand, en wat de autofocus-motor in de lens daarbij mechanisch doet.'
            }
        ]
    }
}
