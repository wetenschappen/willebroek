/**
 * Beeldvorming bij de Vlakke Spiegel - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 2: Zien door weerkaatsing (Les 3/4)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 38-45)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l05-vlakke-spiegel-beeld',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Beeldvorming bij de Vlakke Spiegel',
    description: 'De vijf wetenschappelijke kenmerken van het beeld bij een vlakke spiegel (virtueel, rechtopstaand, even groot, symmetrisch db = dv, links-rechts verwisseld), puntspiegeling en de ambulance-toepassing.',

    config: {
        groenCode: 'F3M01L05',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 38-45)'
    },

    goals: [
        'Ik kan de 5 kenmerken van het beeld bij een vlakke spiegel opsommen en verklaren: virtueel, rechtopstaand, even groot, symmetrisch (db = dv) en links-rechts verwisseld.',
        'Ik kan het onderscheid uitleggen tussen een virtueel beeld (ontstaat door snijdende hulplijnen achter de spiegel) en een reëel beeld.',
        'Ik kan het beeld van een voorwerp meetkundig nauwkeurig construeren via puntspiegeling ten opzichte van het spiegelvlak.',
        'Ik kan alledaagse optische fenomenen verklaren, zoals spiegelschrift op een ziekenwagen (AMBULANCE).'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 2: Beeldvorming Vlakke Spiegel (p. 38-45)',
        instruction: '<p>Voer in je leerwerkboek op <strong>pagina 38</strong> de glasplaatproef uit met de brandende kaars. Maak in het werkboek op <strong>pagina 40-45 oefeningen 11, 12, 14, 15 en 16</strong>.</p>',
        formulaHint: 'Symmetrieregel: beeldafstand \\( d_b = d_v \\). Beeldgrootte: \\( |B| = V \\). Virtuele stralen achter de spiegel worden ALTIJD in stippellijn getekend.'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over de terugkaatsingswet (i = t), normaal n en regelmatige reflectie.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & De Brandende Kaars in Water',
                    description: 'Hoe kan een kaars vrolijk branden in een vol glas water achter een halfdoorlatende spiegel?',
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
                    title: 'De 5 Beeldkenmerken & Constructie',
                    description: 'Virtueel, rechtopstaand, even groot, db = dv, laterale omkering en puntspiegeling.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 11, 12, 14 en 15 (leerwerkboek p. 40-45).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: vlakke spiegel',
                    description: 'Onderzoek beeldafstand, beeldgrootte en virtuele beeldvorming.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Spiegelbeeld Eigenschappen Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Beeldvorming & Spiegelschrift',
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
                    description: 'Overzicht van de 5 kenmerken en vooruitblik naar het gezichtsveld in les 6.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van beeldkenmerken en puntspiegeling.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'opticsLab',
            defaultMode: 'spiegel'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Afstanden en Verplaatsingen voor de Spiegel',
            instruction: 'Koppel elke verplaatsing vóór de spiegel aan het correcte gevolg voor het spiegelbeeld.',
            pairs: [
                { term: 'Je staat op 2,0 m voor de spiegel', definition: 'Het beeld bevindt zich op 2,0 m achter de spiegel; afstand jij-beeld is 4,0 m' },
                { term: 'Je doet 1 stap (0,5 m) naar achteren', definition: 'De afstand tussen jou en je spiegelbeeld neemt toe met 1,0 meter (db + dv = 5,0 m)' },
                { term: 'Je zwaait met je rechterhand', definition: 'Je spiegelbeeld zwaait met zijn linkerhand (spiegelschrift AMBULANCE)' },
                { term: 'De spiegel is slechts 50 cm hoog', definition: 'Het beeld van een persoon van 1,80 m is nog steeds 1,80 m groot (|B| = V)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Beeldvorming Vlakke Spiegel (WACO 3)',
            questions: [
                {
                    q: 'Waarom staat het woord "AMBULANCE" op de motorkap van een ziekenwagen in spiegelschrift geschreven?',
                    a: [
                        'Omdat een achteruitkijkspiegel het beeld lateraal omkeert (links en rechts verwisselt), waardoor de voorliggende bestuurder het woord direct correct kan lezen.',
                        'Omdat het zo wettelijk verplicht is in heel Europa.',
                        'Omdat de verf dan minder snel afslijt.',
                        'Om voetgangers te verwarren.'
                    ],
                    c: 0
                },
                {
                    q: 'Je staat op 1,5 meter afstand recht voor een vlakke badkamerspiegel. Hoe groot is de afstand tussen jou en jouw spiegelbeeld?',
                    a: [
                        '3,0 meter (want dv = 1,5 m en db = 1,5 m, dus totale afstand is dv + db = 3,0 m)',
                        '1,5 meter',
                        '0,75 meter',
                        '4,5 meter'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom noemen fysici het beeld in een vlakke spiegel een "VIRTUEEL" beeld?',
                    a: [
                        'Omdat er achter de spiegel in werkelijkheid geen reële lichtstralen samenkomen; het beeld ontstaat enkel door het denkbeeldig doortrekken van teruggekaatste stralen.',
                        'Omdat het beeld alleen met een VR-bril zichtbaar is.',
                        'Omdat het beeld op de computer gemaakt is.',
                        'Omdat het beeld ondersteboven staat.'
                    ],
                    c: 0
                },
                {
                    q: 'Als je naar een spiegel toeloopt met een snelheid van 1,5 m/s, met welke relatieve snelheid nadert jouw spiegelbeeld jou dan?',
                    a: [
                        '3,0 m/s (want zowel jij als je beeld leggen 1,5 meter per seconde af naar het spiegelvlak toe)',
                        '1,5 m/s',
                        '0,75 m/s',
                        '0 m/s'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Beeldvorming bij de Vlakke Spiegel',
            subtitle: 'De 5 wetenschappelijke kenmerken van het spiegelbeeld (WACO 3 p. 38-45)',
            badge: 'Fysica 3 - Les 5',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'De vijf eigenschappen van het beeld bij een vlakke spiegel grondig analyseren.' },
                { icon: 'function', text: 'Het verschil begrijpen tussen een virtueel beeld en een reëel beeld.' },
                { icon: 'function', text: 'Het spiegelbeeld meetkundig construeren via de puntspiegeling (loodlijn en symmetrie).' },
                { icon: 'function', text: 'Spiegelschrift (AMBULANCE) en afstandsveranderingen berekenen.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: De Kaars in het Glas Water',
            question: 'In een goocheltruc (Pepper\'s ghost) zie je een kaarsvlam rustig branden midden in een glas dat tot de rand gevuld is met water. Hoe kan een vlam onder water blijven branden zonder te doven?',
            hint: 'Kijk goed tussen de toeschouwer en het glas: staat er een onzichtbare glasplaat?',
            revealText: 'De brandende kaars staat in werkelijkheid vóór een schuin geplaatste glasplaat (halfdoorlatende spiegel). Het glas water staat erachter op exact dezelfde afstand (dv = db). Doordat de glasplaat het beeld van de vlam virtueel achter het glas projecteert, lijkt de vlam perfect in het water te branden!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: De Terugkaatsingswet',
            items: [
                { label: 'De Wet', value: 'i = t (invalshoek = terugkaatsingshoek).' },
                { label: 'Stralengang', value: 'Lichtstralen vertrekken vanaf een voorwerpspunt, kaatsen op de spiegel en vallen in het oog.' },
                { label: 'Hersenen faken een zichtlijn', value: 'Je hersenen gaan er altijd van uit dat licht in een rechte lijn reist; ze verlengen de stralen achter de spiegel!' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'properties',
            title: 'De Vijf Beeldkenmerken (WACO 3 p. 38)',
            items: [
                { label: '1. Virtueel', value: 'Het beeld ontstaat achter de spiegel op het snijpunt van de verlengden van de teruggekaatste stralen. Je kunt het niet op een vel papier projecteren.' },
                { label: '2. Rechtopstaand', value: 'Het beeld staat niet ondersteboven; wat boven is blijft boven.' },
                { label: '3. Even groot', value: 'De hoogte en breedte van het beeld zijn exact gelijk aan die van het voorwerp: |B| = V.' },
                { label: '4. Symmetrisch (db = dv)', value: 'De afstand van het beeld tot de spiegel is exact gelijk aan de afstand van het voorwerp tot de spiegel.' },
                { label: '5. Lateraal omgekeerd', value: 'Links en rechts zijn verwisseld: je linkerhand wordt de rechterhand van je spiegelbeeld.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Stap-voor-Stap Constructie: Puntspiegeling',
            problem: 'Stap-voor-Stap Constructie: Puntspiegeling',
            steps: [
                { label: 'Stap 1: Loodlijn trekken', content: 'Trek vanuit voorwerpspunt \\( A \\) een rechte loodlijn (onder 90°) op het spiegelend vlak.' },
                { label: 'Stap 2: Afstand meten', content: 'Meet de voorwerpsafstand \\( d_v \\) van punt \\( A \\) tot het spiegelvlak.' },
                { label: 'Stap 3: Beeldpunt afpassen', content: 'Teken achter de spiegel op de verlengde loodlijn een stippellijn met exact dezelfde lengte \\( d_b = d_v \\).' },
                { label: 'Stap 4: Benoemen', content: 'Het eindpunt is het virtuele beeldpunt \\( A\' \\). Herhaal dit voor punt \\( B \\) om het beeld \\( A\'B\' \\) te voltooien.' }
            ]
        },
        {
            layout: 'properties',
            title: 'Laterale Omkering: De Ambulance',
            items: [
                { label: 'Het probleem', value: 'Een ziekenwagen rijdt achter een auto. De bestuurder kijkt via zijn achteruitkijkspiegel naar achteren.' },
                { label: 'De spiegeling', value: 'Omdat een vlakke spiegel links en rechts verwisselt, zou het woord AMBULANCE in spiegelbeeld onleesbaar zijn.' },
                { label: 'De oplossing', value: 'Men schildert het woord op de motorkap reeds in spiegelschrift. De spiegel draait het nogmaals om, waardoor de chauffeur het direct foutloos kan lezen!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld: Afstanden voor de Spiegel',
            problem: 'Emma staat op 2,0 meter voor een vlakke spiegel.',
            steps: [
                { label: 'Situatie', content: 'Emma staat op 2,0 meter voor een vlakke spiegel.' },
                { label: 'Vraag 1: Waar bevindt het beeld zich?', content: 'Op exact \\( d_b = d_v = 2{,}0\\text{ meter} \\) virtueel achter het spiegeloppervlak.' },
                { label: 'Vraag 2: Wat is de afstand tussen Emma en haar beeld?', content: '\\( d_{\\text{totaal}} = d_v + d_b = 2{,}0\\text{ m} + 2{,}0\\text{ m} = 4{,}0\\text{ meter} \\).' },
                { label: 'Vraag 3: Emma doet 1 meter achteruit', content: '\\( d_v = 3{,}0\\text{ m} \\Rightarrow d_b = 3{,}0\\text{ m} \\). De afstand tussen haar en het beeld is nu \\( 6{,}0\\text{ meter} \\)!' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 14 p. 43)',
            question: 'Je kijkt in een spiegel die slechts 60 cm hoog is. Je ziet je hele bovenlichaam. Hoe groot is jouw virtuele spiegelbeeld in werkelijkheid?',
            options: [
                { id: 'A', text: 'Precies 60 cm, want het beeld past zich aan de spiegelgrootte aan.', correct: false },
                { id: 'B', text: 'Exact even groot als jouw werkelijke bovenlichaam (|B| = V).', correct: true },
                { id: 'C', text: 'Tweemaal zo groot.', correct: false },
                { id: 'D', text: 'Dat hangt af van hoe ver je van de spiegel staat.', correct: false }
            ],
            explanation: 'Conform de derde eigenschap is het beeld bij een vlakke spiegel ALTIJD exact even groot als het voorwerp (|B| = V), ongeacht de afmetingen van de spiegel zelf!'
        },
        {
            layout: 'properties',
            title: 'Tekenconventie in de Fysica',
            items: [
                { label: 'Reële lichtstralen', value: 'Vóór de spiegel: volle lijnen met pijlen die de lichtrichting aangeven.' },
                { label: 'Virtuele hulplijnen', value: 'Achter de spiegel: ALTIJD STIPPELLIJNEN zonder pijlen (want daar reist in werkelijkheid geen licht).' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: De Vlakke Spiegel',
            items: [
                'Het beeld is: 1) Virtueel, 2) Rechtopstaand, 3) Even groot (|B| = V), 4) Symmetrisch (db = dv), 5) Lateraal omgekeerd.',
                'Virtueel betekent: gevormd door het verlengen van teruggekaatste stralen achter de spiegel.',
                'Constructie verloopt via puntspiegeling: loodlijn op de spiegel en db = dv afpassen.',
                'Toepassingen: spiegelschrift op hulpdiensten, Pepper\'s ghost illusie, periscopen.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 6!',
            subtitle: 'In les 6 bepalen we exact welk deel van de ruimte je in een spiegel kunt zien: de constructie van het gezichtsveld en de dode hoek.',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '2 Weerkaatsing' },
                { label: 'Lesuur', value: '5 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat gebeurt er met de terugkaatsingshoek als de invalshoek van een lichtstraal op een vlakke spiegel 40° is?',
                options: [
                    'De terugkaatsingshoek is 40° (i = t).',
                    'De terugkaatsingshoek is 50°.',
                    'De terugkaatsingshoek is 80°.',
                    'De terugkaatsingshoek is 20°.'
                ],
                correct: 0,
                explanation: 'Volgens de terugkaatsingswet is de terugkaatsingshoek altijd identiek aan de invalshoek: t = i = 40°.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Waar bevindt het beeld van een voorwerp zich bij een vlakke spiegel?',
                options: [
                    'Achter het spiegeloppervlak, op een afstand gelijk aan de voorwerpsafstand.',
                    'Op het spiegeloppervlak zelf, zoals een poster.',
                    'Vóór de spiegel, zwevend in de lucht.',
                    'In het oog van de waarnemer.'
                ],
                correct: 0,
                explanation: 'Het spiegelbeeld bevindt zich virtueel achter het spiegeloppervlak op beeldafstand db = dv.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Hoe verhoudt de grootte van het spiegelbeeld |B| zich tot de grootte van het voorwerp V bij een vlakke spiegel?',
                options: [
                    'Het beeld is altijd exact even groot als het voorwerp (|B| = V).',
                    'Het beeld wordt kleiner als je verder weg gaat staan.',
                    'Het beeld is altijd vergroot.',
                    'Het beeld is gehalveerd.'
                ],
                correct: 0,
                explanation: 'Bij een vlakke spiegel is de vergrotingsfactor altijd 1: het beeld is exact even groot als het voorwerp.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Hoe teken je virtuele lichtstralen achter een spiegel volgens de officiële fysica-afspraken?',
                options: [
                    'In stippellijnen (zonder pijlpunten).',
                    'In dikke rode lijnen met dubbele pijl.',
                    'In gegolfde lijnen.',
                    'Virtuele lijnen mogen nooit getekend worden.'
                ],
                correct: 0,
                explanation: 'Omdat er achter de spiegel in werkelijkheid geen licht reist, worden virtuele hulplijnen altijd in stippellijn getekend.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een hardloper rent met een snelheid van 4,0 m/s recht op een grote vlakke spiegel af. Met welke snelheid ziet hij zijn spiegelbeeld naar zich toe bewegen?',
                options: [
                    '8,0 m/s (want zowel de loper als zijn beeld naderen de spiegel met 4,0 m/s; 4 + 4 = 8)',
                    '4,0 m/s',
                    '2,0 m/s',
                    '0 m/s'
                ],
                correct: 0,
                explanation: 'Omdat db = dv, verkleint de onderlinge afstand tussen de loper en zijn virtuele beeld met tweemaal de loopsnelheid: 4,0 + 4,0 = 8,0 m/s.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Welk van de volgende kenmerken is GEEN kenmerk van het beeld bij een vlakke spiegel?',
                options: [
                    'Het beeld is reëel en kan worden opgevangen op een wit projectiescherm.',
                    'Het beeld is virtueel.',
                    'Het beeld is even groot als het voorwerp.',
                    'Het beeld is symmetrisch ten opzichte van het spiegelvlak (db = dv).'
                ],
                correct: 0,
                explanation: 'Het beeld bij een vlakke spiegel is VIRTUEEL en kan nooit op een scherm worden opgevangen.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Wat gebeurt er met je spiegelbeeld als je voor de spiegel staat en je linkeroor aanraakt met je linkerhand?',
                options: [
                    'Je spiegelbeeld raakt zijn rechteroor aan met zijn rechterhand (laterale omkering).',
                    'Je spiegelbeeld raakt zijn linkeroor aan met zijn linkerhand.',
                    'Je spiegelbeeld draait zich om.',
                    'Het beeld verdwijnt.'
                ],
                correct: 0,
                explanation: 'Door de laterale verwisseling van links en rechts lijkt je spiegelbeeld zijn rechteroor met zijn rechterhand aan te raken.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Geometrische Verklaring',
                description: 'Leg uit hoe je met passer en geodriehoek het beeld van een asymmetrische letter "F" voor een vlakke spiegel construeert via de methode van de puntspiegeling.'
            }
        ]
    }
}
