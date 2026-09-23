/**
 * Gezichtsveld van een Vlakke Spiegel - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 2: Zien door weerkaatsing (Les 4/4)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 46-48)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l06-gezichtsveld-spiegel',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Gezichtsveld van een Vlakke Spiegel',
    description: 'Het bepalen van het gezichtsveld via de constructie van het virtuele oogbeeld O\', invloed van spiegelafmetingen en afstand, en de verkeersveiligheid rond de dode hoek.',

    config: {
        groenCode: 'F3M01L06',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 46-48)'
    },

    goals: [
        'Ik kan het begrip gezichtsveld van een spiegel definiëren als het gebied dat een waarnemer via de spiegel kan overzien.',
        'Ik kan het gezichtsveld meetkundig nauwkeurig construeren met behulp van het virtuele oogbeeld O\' en de spiegelranden.',
        'Ik kan verklaren hoe de afmetingen van de spiegel en de afstand van het oog tot de spiegel het gezichtsveld beïnvloeden.',
        'Ik kan de gevaren van de dode hoek bij vrachtwagens en auto\'s analyseren aan de hand van het gezichtsveld.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 2: Gezichtsveld en Dode Hoek (p. 46-48)',
        instruction: '<p>Voer in je leerwerkboek op <strong>pagina 46</strong> de constructie uit van het gezichtsveld met het virtuele oogbeeld O\'. Maak vervolgens op <strong>pagina 47-48 oefeningen 17, 18, 19 en 20</strong>.</p>',
        formulaHint: 'Constructiestappen: 1) Spiegel het oog O loodrecht achter de spiegel tot O\' (db = dv); 2) Verbind O\' met de spiegelranden (stippellijn achter de spiegel, volle lijn ervóór).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over puntspiegeling (db = dv), virtuele beelden en terugkaatsingswet.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & De Dode Hoek',
                    description: 'Waarom kan een vrachtwagenchauffeur een fietser vlak naast zijn cabine toch compleet over het hoofd zien?',
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
                    title: 'Constructie Gezichtsveld & Veiligheid',
                    description: 'Methode met virtueel oogbeeld O\', invloed van oogafstand en spiegelgrootte, en dodehoekspiegels.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 17 t.e.m. 20 (leerwerkboek p. 47-48).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: gezichtsveld van een spiegel',
                    description: 'Bepaal het gezichtsveld via het virtuele oogbeeld.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Verkeersveiligheid & Spiegels Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Gezichtsveld & Dode Hoek',
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
                    title: 'Synthese van Hoofdstuk 2',
                    description: 'Samenvatting weerkaatsing en introductie tot lichtbreking in hoofdstuk 3.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de gezichtsveldconstructie en dode hoek.',
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
            title: 'Factoren die het Gezichtsveld Bepalen',
            instruction: 'Koppel elke verandering aan haar rechtstreekse effect op het gezichtsveld.',
            pairs: [
                { term: 'Spiegel breder maken', definition: 'Het gezichtsveld verbreedt aanzienlijk in horizontale richting' },
                { term: 'Verder naar achteren stappen', definition: 'Het gezichtsveld verkleint; je overziet een veel kleinere hoek van de kamer' },
                { term: 'Naar links bewegen voor de spiegel', definition: 'Het gezichtsveld verschuift naar rechts (je overziet de rechterkant van de kamer)' },
                { term: 'Spiegelkanteling naar onderen', definition: 'Het gezichtsveld verplaatst zich naar de vloer (bv. parkeerspiegel)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Gezichtsveld & Verkeer (WACO 3)',
            questions: [
                {
                    q: 'Hoe bepaal je meetkundig het snelst en nauwkeurigst het gezichtsveld van een waarnemer O in een vlakke spiegel?',
                    a: [
                        'Construeer eerst het virtuele beeld van het oog O\' achter de spiegel, en trek vanuit O\' zichtlijnen langs de uiterste spiegelranden de ruimte in.',
                        'Trek 50 willekeurige lichtstralen vanaf de spiegel naar het oog.',
                        'Meet de oppervlakte van de spiegel en vermenigvuldig die met 2.',
                        'Door de spiegel 90 graden te draaien.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom ziet een fietser die rechts naast een vrachtwagen staat de chauffeur vaak niet in zijn buitenspiegel?',
                    a: [
                        'Omdat de fietser zich in de dode hoek bevindt: buiten het gezichtsveld van de spiegel van de chauffeur.',
                        'Omdat vrachtwagenspiegels donker getint zijn.',
                        'Omdat spiegels alleen overdag werken.',
                        'Omdat de fietser te snel beweegt.'
                    ],
                    c: 0
                },
                {
                    q: 'Wat gebeurt er met het gezichtsveld van een waarnemer wanneer die van 3 meter afstand naar 50 cm afstand voor de spiegel stapt?',
                    a: [
                        'Het gezichtsveld wordt aanzienlijk groter: de hoek tussen de zichtlijnen waaiert veel breder uit.',
                        'Het gezichtsveld wordt kleiner.',
                        'Het gezichtsveld blijft exact gelijk.',
                        'Het gezichtsveld verdwijnt.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom gebruikt men op gevaarlijke, onoverzichtelijke kruispunten vaak een BOLLE spiegel in plaats van een vlakke spiegel?',
                    a: [
                        'Omdat een bolle spiegel een veel groter gezichtsveld heeft (panoramisch zicht), waardoor je naderende auto\'s veel eerder opmerkt.',
                        'Omdat een bolle spiegel het beeld 10x vergroot.',
                        'Omdat een bolle spiegel niet kan beslaan door regen.',
                        'Omdat een bolle spiegel geen licht weerkaatst.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Het Gezichtsveld van een Spiegel',
            subtitle: 'Constructie via O\', gezichtsveldgrenzen en dode hoek (WACO 3 p. 46-48)',
            badge: 'Fysica 3 - Les 6',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Het gezichtsveld van een vlakke spiegel definiëren en begrijpen.' },
                { icon: 'function', text: 'De meetkundige constructie uitvoeren met behulp van het virtuele oogbeeld O\'.' },
                { icon: 'function', text: 'Beredeneren hoe oogafstand en spiegelafmetingen het gezichtsveld beïnvloeden.' },
                { icon: 'function', text: 'De levensgevaarlijke dode hoek in het verkeer analyseren en voorkomen.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: De Dode Hoek in het Verkeer',
            question: 'Een fietser staat bij een rood verkeerslicht netjes rechts naast het voorwiel van een grote vrachtwagen. De vrachtwagenchauffeur heeft grote buitenspiegels. Toch merkt de chauffeur de fietser niet op en draait rechtsaf. Hoe kan iemand die zo dichtbij staat onzichtbaar zijn in een spiegel?',
            hint: 'Kijk naar het bereik van de lichtstralen die via de spiegel in het oog van de chauffeur kunnen vallen.',
            revealText: 'Een spiegel kan slechts een beperkt deel van de ruimte overzien: het GEZICHTSVELD. Door de hoge zitpositie en de vaste positie van de buitenspiegels bevindt de fietser zich in de zogeheten "dode hoek" (de blinde vlek buiten het gezichtsveld). Als jij de chauffeur in zijn spiegel niet ziet, ziet hij jou gegarandeerd ook niet!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Het Beeld van het Oog (O\')',
            items: [
                { label: 'Puntspiegeling', value: 'Net zoals elk voorwerp heeft ook het oog O van de waarnemer een virtueel beeld O\' achter de spiegel.' },
                { label: 'Symmetrie', value: 'db = dv (de afstand van O\' tot de spiegel is identiek aan de afstand van het echte oog O tot de spiegel).' },
                { label: 'Loodrecht', value: 'De verbindingslijn O-O\' staat loodrecht op het vlak van de spiegel.' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Het Gezichtsveld',
            definition: 'Het GEZICHTSVELD van een waarnemer bij een vlakke spiegel is het gebied in de ruimte vóór de spiegel waarvan lichtstralen na terugkaatsing op de spiegel in de pupil van het oog van de waarnemer kunnen terechtkomen.'
        },
        {
            layout: 'worked-example',
            title: 'De Snelle Constructiemethode via O\' (WACO 3 p. 46)',
            steps: [
                { label: 'Stap 1: Oog spiegelen', content: 'Teken vanuit het oog \\( O \\) een loodlijn op het spiegelvlak en pas aan de achterzijde dezelfde afstand af. Dit geeft het virtuele oogbeeld \\( O\' \\).' },
                { label: 'Stap 2: Grenslijnen trekken', content: 'Trek vanuit \\( O\' \\) rechte lijnen die precies door de uiterste boven- en onderrand (of linker- en rechterrand) van de spiegel gaan.' },
                { label: 'Stap 3: Tekenafspraak', content: 'Achter de spiegel teken je deze lijnen in STIPPELLIJN; vóór de spiegel trek je ze door als VOLLE lijnen in de ruimte.' },
                { label: 'Stap 4: Gezichtsveld arceren', content: 'De hele sector tussen de twee volle uitwaaierende lijnen vóór de spiegel vormt het gezichtsveld. Elk voorwerp in deze zone is zichtbaar!' }
            ]
        },
        {
            layout: 'properties',
            title: 'Factoren die het Gezichtsveld Bepalen',
            items: [
                { label: '1. Afstand van het oog tot de spiegel', value: 'Hoe DICHTER je bij de spiegel staat, hoe BREEDER de hoek vanuit O\' door de spiegelranden wordt ⇒ het gezichtsveld wordt groter!' },
                { label: '2. Afmeting van de spiegel', value: 'Hoe GROTER de spiegel, hoe meer ruimte de grenslijnen omsluiten ⇒ groter gezichtsveld.' },
                { label: '3. Positie van de waarnemer', value: 'Als je naar links stapt, verschuift het gezichtsveld naar rechts.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Praktijkproef: Het Zakspiegeltje',
            problem: 'Praktijkproef: Het Zakspiegeltje',
            steps: [
                { label: 'Op armlengte houden', content: 'Houd een klein zakspiegeltje van 5 cm op 50 cm afstand. Je ziet amper je eigen oog en neus.' },
                { label: 'Dichtbij houden', content: 'Breng hetzelfde spiegeltje vlak voor je oog (op 5 cm afstand).' },
                { label: 'Waarneming', content: 'Plotseling overzie je een gigantisch gezichtsveld: je ziet zowat het hele plafond en de achterwand van het lokaal!' },
                { label: 'Verklaring', content: 'Omdat de afstand \\( d_v \\) miniem is, staat \\( O\' \\) vlak achter de spiegel en waaieren de zichtlijnen extreem wijd uit.' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 18 p. 47)',
            question: 'Je bevindt je in een kamer voor een spiegel. Welke voorwerpen kun je zien via de spiegel?',
            options: [
                { id: 'A', text: 'Uitsluitend voorwerpen die zich exact recht voor de spiegel bevinden.', correct: false },
                { id: 'B', text: 'Alle voorwerpen die zich binnen de door O\' geconstrueerde gezichtsveldzone bevinden.', correct: true },
                { id: 'C', text: 'Alle voorwerpen in de hele kamer, want spiegels weerkaatsen alles.', correct: false },
                { id: 'D', text: 'Alleen voorwerpen die groter zijn dan de spiegel.', correct: false }
            ],
            explanation: 'Een voorwerp is alleen zichtbaar in de spiegel als lichtstralen die door dat voorwerp weerkaatst worden via het spiegeloppervlak de pupil van de waarnemer kunnen bereiken. Dit komt meetkundig exact overeen met de zone binnen het geconstrueerde gezichtsveld.'
        },
        {
            layout: 'properties',
            title: 'Verkeersveiligheid: Dodehoekregels',
            items: [
                { label: 'Gouden regel voor fietsers', value: 'Blijf NOOIT rechts naast een stilstaande vrachtwagen of bus staan bij een kruispunt!' },
                { label: 'Oogcontactregel', value: 'Als jij het gezicht van de chauffeur niet in zijn buitenspiegel kunt zien, kan hij jou NOOIT zien (reciprociteitsprincipe van lichtstralen).' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Gezichtsveld & Hoofdstuk 2',
            items: [
                'Gezichtsveld: het gebied vóór de spiegel dat via reflectie zichtbaar is.',
                'Constructie: spiegel het oog O naar O\' en trek zichtlijnen langs de spiegelranden.',
                'Gezichtsveld vergroot als je dichter bij de spiegel komt of als de spiegel groter is.',
                'Dode hoek: het niet-zichtbare gebied buiten het gezichtsveld (levensgevaarlijk in verkeer).',
                'Hoofdstuk 2 Zien door weerkaatsing is hiermee succesvol afgerond!'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor Hoofdstuk 3!',
            subtitle: 'In les 7 stappen we over naar lichtbreking: wat gebeurt er als een lichtstraal van lucht naar water of glas reist?',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '2 Afgerond' },
                { label: 'Lesuur', value: '6 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat is de relatie tussen de positie van het echte oog O en zijn virtuele spiegelbeeld O\'?',
                options: [
                    'O\' bevindt zich achter de spiegel op exact dezelfde loodrechte afstand als O ervóór staat (db = dv).',
                    'O\' bevindt zich op het spiegeloppervlak.',
                    'O\' bevindt zich tweemaal zo ver achter de spiegel.',
                    'O\' staat altijd ondersteboven.'
                ],
                correct: 0,
                explanation: 'Conform de wetten van de vlakke spiegel is het beeld O\' het symmetrische punt ten opzichte van het spiegelend vlak (db = dv).'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Wat stelt het "gezichtsveld" van een spiegel voor?',
                options: [
                    'Het gebied vóór de spiegel dat een waarnemer via de spiegel kan zien.',
                    'De oppervlakte van de spiegel in vierkante centimeter.',
                    'De hoek waaronder de spiegel aan de muur hangt.',
                    'De afstand tussen de spiegel en de lamp.'
                ],
                correct: 0,
                explanation: 'Het gezichtsveld is de driedimensionale ruimte die een waarnemer vanuit zijn specifieke oogpositie via spiegeling kan overzien.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Hoe teken je de zichtlijnen tussen het virtuele oogbeeld O\' en de spiegelranden achter de spiegel?',
                options: [
                    'In stippellijn (omdat het virtuele hulplijnen zijn achter de spiegel).',
                    'In een dikke volle lijn met pijlen.',
                    'In een golflijn.',
                    'Achter de spiegel mag je nooit lijnen tekenen.'
                ],
                correct: 0,
                explanation: 'Virtuele hulplijnen achter de spiegel worden conform de tekennormen altijd in stippellijn getekend.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wat gebeurt er met het gezichtsveld in een achteruitkijkspiegel als de chauffeur dichter naar de spiegel toe buigt?',
                options: [
                    'Het gezichtsveld wordt groter (de zichtlijnen waaieren breder uit).',
                    'Het gezichtsveld wordt kleiner.',
                    'Het gezichtsveld blijft exact gelijk.',
                    'De spiegel breekt.'
                ],
                correct: 0,
                explanation: 'Hoe kleiner de afstand van het oog tot de spiegel, hoe groter de zichthoek door de spiegelranden wordt, en dus hoe ruimer het gezichtsveld.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Twee voorwerpen A en B staan in een kamer. Voorwerp A bevindt zich binnen het geconstrueerde gezichtsveld van waarnemer O, en voorwerp B bevindt zich erbuiten. Welk voorwerp kan de waarnemer in de spiegel zien?',
                options: [
                    'Enkel voorwerp A.',
                    'Enkel voorwerp B.',
                    'Zowel A als B.',
                    'Geen van beide.'
                ],
                correct: 0,
                explanation: 'Alleen voorwerpen die binnen de grenzen van het gezichtsveld liggen, zenden stralen uit die via de spiegel in het oog O vallen.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Wat is de "dode hoek" bij een vrachtwagen in het verkeer?',
                options: [
                    'Het gebied rondom de vrachtwagen dat buiten het gezichtsveld van alle spiegels en het directe zicht van de chauffeur valt.',
                    'De ruimte onder de motorkap van de vrachtwagen.',
                    'De remweg van de vrachtwagen bij noodstop.',
                    'De achterbank van de cabine.'
                ],
                correct: 0,
                explanation: 'De dode hoek is de blinde vlek rondom het voertuig die niet door spiegels wordt gedekt en waarin voetgangers en fietsers onzichtbaar zijn.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Wat is de belangrijkste reden om op een uitrit een BOLLE verkeersspiegel te plaatsen?',
                options: [
                    'Een bolle spiegel biedt een aanzienlijk groter gezichtsveld (panoramisch overzicht over de hele straat).',
                    'Een bolle spiegel maakt auto\'s groter.',
                    'Een bolle spiegel warmt op tegen vorst.',
                    'Een bolle spiegel is goedkoper dan vlak glas.'
                ],
                correct: 0,
                explanation: 'Bolle spiegels spreiden de lichtstralen uiteen, waardoor ze een veel breder gezichtsveld opleveren dan een vlakke spiegel van dezelfde afmeting.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Verkeersveiligheid & Reflectie',
                description: 'Leg de bekende verkeersregel uit: "Als jij de chauffeur in zijn buitenspiegel niet kunt zien, dan kan de chauffeur jou ook niet zien." Verklaar dit aan de hand van het optische principe van de omkeerbaarheid van de lichtstralen.'
            }
        ]
    }
}
