/**
 * Bolle Lenzen: Begrippen & Hoofdstralen - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 4: Lenzen (Les 1/3)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 60-67)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l09-bolle-lenzen-hoofdstralen',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Bolle Lenzen: Begrippen & Hoofdstralen',
    description: 'Convergerende lenzen, het optisch middelpunt O, brandpunten F en F\', brandpuntsafstand f, en de 3 karakteristieke hoofdstralen voor beeldconstructies.',

    config: {
        groenCode: 'F3M01L09',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 60-67)'
    },

    goals: [
        'Ik kan het onderscheid uitleggen tussen een bolle (convergerende) lens en een holle (divergerende) lens aan de hand van vorm en bundelgedrag.',
        'Ik kan de meetkundige elementen van een bolle lens benoemen en tekenen: hoofdas, optisch middelpunt O, voorwerpsbrandpunt F, beeldbrandpunt F\' en brandpuntsafstand f.',
        'Ik kan de 3 karakteristieke hoofdstralen van een bolle lens nauwkeurig tekenen en toepassen: 1) evenwijdig ⇒ door F\'; 2) door O ⇒ ongebroken; 3) door F ⇒ evenwijdig.',
        'Ik begrijp dat het snijpunt van minstens 2 hoofdstralen de positie van het beeldpunt bepaalt.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 4: Bolle Lenzen en Hoofdstralen (p. 60-67)',
        instruction: '<p>Teken in je leerwerkboek op <strong>pagina 62-63</strong> de breking van een laserbundel door een bolle lens. Maak vervolgens in het werkboek op <strong>pagina 64-67 oefeningen 1, 2, 3 en 4</strong>.</p>',
        formulaHint: 'Brandpuntsafstand: \\( f = |OF| = |OF\'| \\). Drie hoofdstralen: 1) evenwijdig aan hoofdas \\( \\to \\) door \\( F\' \\); 2) door optisch middelpunt \\( O \\to \\) ongebroken; 3) door \\( F \\to \\) evenwijdig.'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over lichtbreking (naar en weg van de normaal) en convergerende bundels.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering: Vuur Maken met een Lens',
                    description: 'Waarom kan een loep zonlicht bundelen tot een brandend heet puntje op droge bladeren?',
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
                    title: 'Lenselementen & De 3 Hoofdstralen',
                    description: 'Optisch middelpunt O, brandpunten F en F\', brandpuntsafstand f en de 3 hoofdstralen.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 1 t.e.m. 4 (leerwerkboek p. 64-67).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: bolle lenzen en hoofdstralen',
                    description: 'Construeer de 3 hoofdstralen door een convergerende lens.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Lenzen & Brandpunten Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Bolle Lenzen & Hoofdstralen',
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
                    description: 'Overzicht van de 3 hoofdstralen en vooruitblik naar beeldvorming (5 standen) in les 10.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de 3 hoofdstralen en brandpunten.',
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
            title: 'Lensvormen en Bundelgedrag',
            instruction: 'Koppel het lenstype aan zijn optische eigenschappen.',
            pairs: [
                { term: 'Bolle lens (convergerend)', definition: 'Midden dikker dan randen; buigt lichtstralen naar elkaar toe naar een reëel brandpunt' },
                { term: 'Holle lens (divergerend)', definition: 'Midden dunner dan randen; spreidt lichtstralen uiteen vanuit een virtueel brandpunt' },
                { term: 'Brandglas / loep', definition: 'Toepassing van een bolle convergerende lens met korte brandpuntsafstand f' },
                { term: 'Beeldpunt bepalen', definition: 'Vereist het snijden van slechts 2 van de 3 bekende hoofdstralen' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Hoofdstralen & Bolle Lenzen (WACO 3)',
            questions: [
                {
                    q: 'Hoe breekt een lichtstraal die evenwijdig aan de hoofdas invalt op een bolle lens?',
                    a: [
                        'De straal breekt na de lens door het beeldbrandpunt F\'.',
                        'De straal gaat ongebroken rechtdoor.',
                        'De straal kaatst 180 graden terug.',
                        'De straal breekt door het voorwerpsbrandpunt F.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom gaat een lichtstraal die door het optisch middelpunt O van een dunne lens gaat ongebroken rechtdoor?',
                    a: [
                        'In het centrum van de lens zijn de twee bolle oppervlakken lokaal perfect evenwijdig aan elkaar (zoals een dunne vlakke glasplaat), waardoor de netto richtingsverandering nul is.',
                        'Omdat er in het middelpunt geen glas zit.',
                        'Omdat de lichtsnelheid in het middelpunt oneindig groot is.',
                        'Omdat het middelpunt magnetisch neutraal is.'
                    ],
                    c: 0
                },
                {
                    q: 'Een lens heeft een brandpuntsafstand f = 5,0 cm. Op welke afstand van het optisch middelpunt O bevindt het voorwerpsbrandpunt F zich?',
                    a: [
                        'Precies 5,0 cm vóór de lens (want |OF| = f = 5,0 cm).',
                        '10 cm vóór de lens.',
                        '2,5 cm vóór de lens.',
                        'Op oneindige afstand.'
                    ],
                    c: 0
                },
                {
                    q: 'Hoeveel hoofdstralen moet je minimaal construeren om de exacte positie van een beeldpunt achter de lens te vinden?',
                    a: [
                        'Minstens twee (twee snijdende rechten bepalen een uniek snijpunt).',
                        'Minstens tien.',
                        'Slechts één.',
                        'Vier.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Bolle Lenzen & Hoofdstralen',
            subtitle: 'Optisch middelpunt O, brandpunten en de 3 hoofdstralen (WACO 3 p. 60-67)',
            badge: 'Fysica 3 - Les 9',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Het verschil begrijpen tussen bolle (convergerende) en holle (divergerende) lenzen.' },
                { icon: 'function', text: 'De lenselementen (hoofdas, optisch middelpunt O, brandpunten F en F\', brandpuntsafstand f) aanduiden.' },
                { icon: 'function', text: 'De drie karakteristieke hoofdstralen nauwkeurig tekenen en toepassen.' },
                { icon: 'function', text: 'Inzien hoe het snijden van hoofdstralen leidt tot een scherp beeldpunt.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Vuur Maken met een Glasplaatje',
            question: 'Je bevindt je in het bos met een eenvoudig vergrootglas (bolle lens). Het is zonnig. Je houdt de lens stil boven een hoopje droge bladeren. Na enkele seconden stijgt er rook op en vatten de bladeren vlam! Hoe kan een koud stukje glas zomaar vuur ontsteken?',
            hint: 'Wat doet een bolle lens met een invallende evenwijdige zonnebundel?',
            revealText: 'Zonlicht bereikt de aarde als een evenwijdige lichtbundel. Een bolle lens breekt al die duizenden evenwijdige zonnestralen samen naar één enkel microscopisch klein brandpunt (F\'). Alle stralingsenergie van het hele lensoppervlak wordt geconcentreerd op een piepklein puntje, waardoor de temperatuur lokaal oploopt tot meer dan 400°C!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Lichtbreking in een Prisma',
            items: [
                { label: 'Breking naar de dikste zijde', value: 'Een lichtstraal die door een prisma reist, buigt altijd af naar de dikste basis van het prisma toe.' },
                { label: 'Een bolle lens als dubbel prisma', value: 'Een bolle lens kun je zien als twee prisma\'s die met hun dikke basis tegen elkaar zijn geplakt: het licht aan weerszijden buigt naar het centrum toe!' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'properties',
            title: 'Lenselementen bij de Bolle Lens (WACO 3 p. 60-61)',
            items: [
                { label: 'Optisch middelpunt O', value: 'Het geometrische centrum van de lens. Een straal door O gaat ongebroken rechtdoor.' },
                { label: 'Hoofdas', value: 'De denkbeeldige symmetrielijn die loodrecht door het optisch middelpunt O gaat.' },
                { label: 'Beeldbrandpunt F\'', value: 'Het punt op de hoofdas achter de lens waar invallende evenwijdige stralen na breking samenkomen.' },
                { label: 'Voorwerpsbrandpunt F', value: 'Het punt op de hoofdas vóór de lens; stralen die vanuit F vertrekken, breken na de lens evenwijdig aan de hoofdas.' },
                { label: 'Brandpuntsafstand f', value: 'De afstand f = |OF| = |OF\'|. Hoe boller de lens, hoe korter f en hoe sterker de lens convergeert.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'De Drie Karakteristieke Hoofdstralen (WACO 3 p. 62)',
            problem: 'De Drie Karakteristieke Hoofdstralen (WACO 3 p. 62)',
            steps: [
                { label: 'Hoofdstraal 1 (Evenwijdig)', content: 'Vertrekt vanaf het voorwerpspunt evenwijdig aan de hoofdas tot aan de lens \\( \\Rightarrow \\) breekt na de lens door het beeldbrandpunt \\( F\' \\).' },
                { label: 'Hoofdstraal 2 (Middelpunt)', content: 'Vertrekt vanaf het voorwerpspunt en loopt kaarsrecht door het optisch middelpunt \\( O \\Rightarrow \\) gaat ONGEBROKEN rechtdoor zonder afbuiging.' },
                { label: 'Hoofdstraal 3 (Brandpunt)', content: 'Vertrekt vanaf het voorwerpspunt door het voorwerpsbrandpunt \\( F \\) tot aan de lens \\( \\Rightarrow \\) breekt na de lens EVENWIJDIG aan de hoofdas verder.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Het Beeldpunt Vinden',
            items: [
                { label: 'Minstens 2 stralen volstaan', value: 'In de praktijk kies je altijd de twee gemakkelijkste hoofdstralen (meestal straal 1 en straal 2).' },
                { label: 'Het snijpunt', value: 'Waar de gebroken hoofdstralen elkaar achter de lens kruisen, bevindt zich het scherpe beeldpunt B van voorwerpspunt V.' },
                { label: 'Alle andere stralen', value: 'Ook de duizenden andere lichtstralen die door de lens vallen en geen hoofdstraal zijn, passeren exact door datzelfde beeldpunt!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Tekenvoorbeeld: Hoofdstralen Construeren',
            problem: 'Brandpuntsafstand \\( f = 3{,}0\\text{ cm} \\). Voorwerp \\( V \\) met hoogte \\( 2{,}0\\text{ cm} \\) op afstand \\( 6{,}0\\text{ cm} \\) vóór de lens.',
            steps: [
                { label: 'Gegeven', content: 'Brandpuntsafstand \\( f = 3{,}0\\text{ cm} \\). Voorwerp \\( V \\) met hoogte \\( 2{,}0\\text{ cm} \\) op afstand \\( 6{,}0\\text{ cm} \\) vóór de lens.' },
                { label: 'Stap 1: Assenstelsel', content: 'Teken de hoofdas, de lenslijn, \\( O \\), \\( F \\) (op 3 cm links) en \\( F\' \\) (op 3 cm rechts).' },
                { label: 'Stap 2: Straal 1 tekenen', content: 'Teken van de top van \\( V \\) een horizontale lijn naar de lens, en vandaar door \\( F\' \\).' },
                { label: 'Stap 3: Straal 2 tekenen', content: 'Teken van de top van \\( V \\) een rechte door \\( O \\).' },
                { label: 'Stap 4: Snijpunt bepalen', content: 'De twee lijnen snijden elkaar precies op 6,0 cm rechts van de lens, 2,0 cm onder de hoofdas!' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 2 p. 64)',
            question: 'Wat gebeurt er met een lichtstraal die door het voorwerpsbrandpunt F invalt op een bolle lens?',
            options: [
                { id: 'A', text: 'De straal breekt na de lens door het beeldbrandpunt F\'.', correct: false },
                { id: 'B', text: 'De straal breekt na de lens evenwijdig aan de hoofdas.', correct: true },
                { id: 'C', text: 'De straal gaat ongebroken rechtdoor.', correct: false },
                { id: 'D', text: 'De straal kaatst terug naar de lichtbron.', correct: false }
            ],
            explanation: 'Dit is de definitie van hoofdstraal 3: door de omkeerbaarheid van de lichtstralen zal een straal die door het brandpunt F invalt, na doorgang door de lens perfect evenwijdig aan de hoofdas verder reizen.'
        },
        {
            layout: 'properties',
            title: 'Tekenconventies voor Lenzen',
            items: [
                { label: 'Symbool bolle lens', value: 'Een verticale lijn met naar buiten wijzende pijlpunten aan de uiteinden.' },
                { label: 'Loodrechte lensas', value: 'De lensas staat altijd onder een rechte hoek (90°) op de hoofdas in punt O.' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Hoofdstralen van de Bolle Lens',
            items: [
                'Bolle lens (convergerend): buigt evenwijdige stralen naar het brandpunt F\'.',
                'Optisch middelpunt O: straal gaat ongebroken rechtdoor.',
                'Brandpuntsafstand f = |OF| = |OF\'|.',
                'Straal 1: evenwijdig ⇒ door F\'.',
                'Straal 2: door O ⇒ ongebroken.',
                'Straal 3: door F ⇒ evenwijdig.',
                'Het snijpunt van 2 hoofdstralen bepaalt de exacte positie van het beeld.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 10!',
            subtitle: 'In les 10 onderzoeken we de 5 verschillende standen van het voorwerp t.o.v. de brandpuntsafstand f en ontdekken we hoe beamers, camera\'s en vergrootglazen werken.',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '4 Lenzen' },
                { label: 'Lesuur', value: '9 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Hoe herken je een bolle (convergerende) lens aan haar vorm?',
                options: [
                    'Het midden van de lens is dikker dan de randen.',
                    'Het midden van de lens is dunner dan de randen.',
                    'De lens heeft overal exact dezelfde dikte.',
                    'De lens is hol aan beide kanten.'
                ],
                correct: 0,
                explanation: 'Een bolle convergerende lens is in het centrum dikker dan aan de buitenranden.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Wat is het "optisch middelpunt" O van een lens?',
                options: [
                    'Het centrale punt in het midden van de lens waar lichtstralen ongebroken rechtdoor gaan.',
                    'Het punt waar zonlicht brandt.',
                    'De buitenste rand van het glas.',
                    'De brandpuntsafstand in millimeters.'
                ],
                correct: 0,
                explanation: 'In het optisch middelpunt O zijn de lensoppervlakken evenwijdig; stralen die door O passeren ondergaan geen richtingsverandering.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Wat gebeurt er met een evenwijdige lichtbundel die op een bolle convergerende lens valt?',
                options: [
                    'De lichtstralen convergeren en komen samen in het beeldbrandpunt F\'.',
                    'De stralen waaieren uit elkaar in alle richtingen.',
                    'De stralen kaatsen terug.',
                    'De stralen verdwijnen.'
                ],
                correct: 0,
                explanation: 'De bolle lens convergeert de bundel naar één enkel punt op de hoofdas: het brandpunt F\'.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Hoe noem je de afstand tussen het optisch middelpunt O en het brandpunt F?',
                options: [
                    'De brandpuntsafstand (f).',
                    'De straal van de lens.',
                    'De beeldafstand.',
                    'De vergrotingsfactor.'
                ],
                correct: 0,
                explanation: 'De afstand van O tot F (en van O tot F\') is de brandpuntsafstand f van de lens.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Welk pad volgt hoofdstraal 1 (de evenwijdige straal) na doorgang door een bolle lens?',
                options: [
                    'De straal breekt door het beeldbrandpunt F\' achter de lens.',
                    'De straal gaat ongebroken rechtdoor.',
                    'De straal breekt door het optisch middelpunt O.',
                    'De straal blijft evenwijdig aan de hoofdas.'
                ],
                correct: 0,
                explanation: 'Hoofdstraal 1 valt evenwijdig aan de hoofdas in en breekt conform de lensdefinitie altijd door het brandpunt F\'.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Hoeveel hoofdstralen moet je minstens tekenen om de locatie van het beeldpunt van een voorwerp te bepalen?',
                options: [
                    '2 hoofdstralen (het snijpunt legt het punt uniek vast).',
                    '1 hoofdstraal.',
                    'Alle 3 hoofdstralen zijn altijd verplicht.',
                    'Geen enkele, je moet het berekenen.'
                ],
                correct: 0,
                explanation: 'Twee snijdende lijnen zijn meetkundig voldoende om een punt eenduidig te construeren; de 3e straal fungeert ter controle.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Een lens met een korte brandpuntsafstand f = 2 cm convergeert het licht … dan een lens met f = 20 cm.',
                options: [
                    'veel sterker (het licht buigt sterker af naar de hoofdas)',
                    'veel zwakker',
                    'exact even sterk',
                    'helemaal niet'
                ],
                correct: 0,
                explanation: 'Hoe korter de brandpuntsafstand f, hoe boller de lens is en hoe krachtiger ze de lichtstralen naar de hoofdas toe buigt.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Constructiestappen Beschrijven',
                description: 'Beschrijf in drie duidelijke stappen hoe je met potlood en liniaal de drie hoofdstralen tekent vanuit de top van een pijl die vóór een bolle lens staat.'
            }
        ]
    }
}
