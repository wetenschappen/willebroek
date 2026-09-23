/**
 * Lichtbronnen & Rechtlijnige Voortplanting - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Optische fenomenen | Hoofdstuk 1: Zien door licht (Les 1/3)
 * Handboek: WACO 3 Fysica 2u (Thema 1, p. 12-19)
 * Leerplan GO!: BV1_06.40, BV1_06.41, WD1_11.01.01.01
 */

export default {
    id: 'fys3-m01-l01-lichtbronnen-en-voortplanting',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Lichtbronnen & Rechtlijnige Voortplanting',
    description: 'Het onderscheid tussen natuurlijke en kunstmatige lichtbronnen, hete en koude bronnen, donkere lichamen, optische middenstoffen en de 3 soorten lichtbundels.',

    config: {
        groenCode: 'F3M01L01',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u (Thema 1 Blinding Lights, p. 12-19)'
    },

    goals: [
        'Ik kan het fundamentele verschil uitleggen tussen een lichtbron (zendt zelf licht uit) en een donker lichaam (weerkaatst licht).',
        'Ik kan lichtbronnen classificeren als natuurlijk of kunstmatig, en als heet (temperatuurstraler) of koud (luminescentie).',
        'Ik kan de voorwaarden en eigenschappen van een optische middenstof toelichten (doorzichtig, doorschijnend, ondoorzichtig).',
        'Ik kan aantonen dat licht zich in een homogene doorzichtige middenstof rechtlijnig voortplant met snelheid c = 3,00 · 10⁸ m/s.',
        'Ik kan de 3 soorten lichtbundels (evenwijdig, divergerend, convergerend) herkennen, benoemen en tekenen met lichtstralen.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Blinding Lights - Hoofdstuk 1: Zien door licht (p. 12-19)',
        instruction: '<p>Voer in je leerwerkboek op <strong>pagina 15</strong> de ontdekproef uit met het rechte en geplooide rietje. Maak vervolgens in het werkboek op <strong>pagina 16-19 oefeningen 4, 5, 8, 9, 10 en 13</strong>.</p>',
        formulaHint: 'Lichtsnelheid in vacuüm en lucht: \\( c = 3{,}00 \\cdot 10^8\\text{ m/s} = 300\\,000\\text{ km/s} \\). Formule: \\( s = v \\cdot t \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over licht als stralingsenergie, het elektromagnetisch spectrum en de werking van het oog.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & De Rietjesproef',
                    description: 'Waarom kun je een brandende kaars wél zien door een recht rietje, maar nooit door een gebogen rietje?',
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
                    title: 'Lichtbronnen & Bundels',
                    description: 'Natuurlijk vs kunstmatig, heet vs koud, optische middenstoffen en de 3 bundeltypes.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 3 oefeningen 5, 9, 10 en 13 (leerwerkboek p. 16-19).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: lichtvoortplanting',
                    description: 'Verken rechtlijnige voortplanting en lichtbundels.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Optische Eigenschappen Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Licht & Voortplanting',
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
                    description: 'Kernbegrippen van lichtvoortplanting en vooruitblik naar schaduwvorming.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van lichtbronnen, middenstoffen en bundeltypes.',
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
            title: 'Lichtbronnen Indelen: Natuurlijk, Kunstmatig, Heet & Koud',
            instruction: 'Koppel elk concreet voorbeeld aan zijn exacte wetenschappelijke categorie.',
            pairs: [
                { term: 'De Zon / De sterren', definition: 'Natuurlijke, hete lichtbron (temperatuurstraler via kernfusie)' },
                { term: 'Vuurvliegje / Diepzeevis', definition: 'Natuurlijke, koude lichtbron (bioluminescentie zonder warmteontwikkeling)' },
                { term: 'Brandende kaars / Gloeilamp', definition: 'Kunstmatige, hete lichtbron (temperatuurstraler door verbranding of gloeidraad)' },
                { term: 'Witte LED / Smartphone-scherm', definition: 'Kunstmatige, koude lichtbron (elektroluminescentie via halfgeleiders)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Lichtbronnen & Voortplanting (WACO 3)',
            questions: [
                {
                    q: 'Waarom is de volle maan aan de nachtelijke hemel strikt genomen GEEN lichtbron?',
                    a: [
                        'Omdat de maan een donker lichaam is dat zelf geen licht opwekt, maar zonlicht weerkaatst naar de aarde.',
                        'Omdat de maan te koud is om te gloeien.',
                        'Omdat het maanlicht uit infrarode straling bestaat.',
                        'Omdat de maan alleen schijnt als het bewolkt is.'
                    ],
                    c: 0
                },
                {
                    q: 'De zon bevindt zich op circa 150 miljoen kilometer (1,50 · 10¹¹ m) van de aarde. Hoe lang doet een lichtstraal erover om die afstand af te leggen (c = 3,00 · 10⁸ m/s)?',
                    a: [
                        '500 seconden (oftewel 8 minuten en 20 seconden)',
                        '50 seconden',
                        '8 uur',
                        'Onmiddellijk (0 seconden)'
                    ],
                    c: 0
                },
                {
                    q: 'Welke van onderstaande stoffen is GEEN optische middenstof?',
                    a: [
                        'Een massieve ijzeren plaat (ondoorzichtig; absorbeert of reflecteert al het licht).',
                        'Plexiglas',
                        'Zuiver water',
                        'Luchtledige ruimte (vacuüm)'
                    ],
                    c: 0
                },
                {
                    q: 'Welke bundel ontstaat wanneer zonlicht door een brandglas (bolle convergerende lens) valt en in één klein brandpuntje samenkomt?',
                    a: [
                        'Een convergerende lichtbundel.',
                        'Een divergerende lichtbundel.',
                        'Een evenwijdige lichtbundel.',
                        'Een diffuse lichtbundel.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Zien door licht',
            subtitle: 'Lichtbronnen, voortplanting en lichtbundels (WACO 3 p. 12-19)',
            badge: 'Fysica 3 - Les 1',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Het verschil uitleggen tussen lichtbronnen en donkere lichamen.' },
                { icon: 'function', text: 'Lichtbronnen indelen in natuurlijk/kunstmatig en heet/koud.' },
                { icon: 'function', text: 'Aantonen dat licht zich rechtlijnig voortplant door een optische middenstof.' },
                { icon: 'function', text: 'De drie soorten lichtbundels (evenwijdig, divergerend, convergerend) herkennen en tekenen.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: De Proef met het Rietje (WACO 3 p. 15)',
            question: 'Je plaatst een brandend theelichtje op tafel. Je kijkt met één oog door een recht rietje en ziet de vlam helder. Vervolgens plooi je het rietje in een knik van 90 graden. Zie je de vlam nog als je er opnieuw door kijkt?',
            hint: 'Kan licht "de bocht om" buigen in een buisje vol lucht?',
            revealText: 'Je ziet helemaal niets meer! Licht kan in een homogene middenstof zoals lucht nooit spontaan de bocht om buigen. Licht plant zich altijd strikt RECHTLIJNIG voort. Om de vlam te zien, moet er een kaarsrechte zichtlijn zijn tussen de bron en je oogpupil.'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Elektromagnetische Straling',
            items: [
                { label: 'Wat is licht?', value: 'Een vorm van stralingsenergie die zich voortplant als elektromagnetische golven.' },
                { label: 'Zichtbaar spectrum', value: 'Het menselijk oog detecteert slechts een piepklein deeltje van het EM-spectrum (golflengtes van circa 400 nm tot 700 nm).' },
                { label: 'Buiten het zichtbare spectrum', value: 'Infrarood (warmte), ultraviolet (bruinen/zonnebrand), röntgenstralen en radiogolven zijn onzichtbaar voor ons oog.' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Lichtbron versus Donker Lichaam',
            definition: 'Een LICHTBRON is een lichaam dat zelf licht produceert en uitzendt. Een DONKER LICHAAM produceert zelf geen licht, maar wordt enkel zichtbaar doordat het licht van een externe lichtbron absorbeert of weerkaatst naar onze ogen.'
        },
        {
            layout: 'properties',
            title: 'Indeling van Lichtbronnen (WACO 3 p. 13-14)',
            items: [
                { label: 'Natuurlijke bronnen', value: 'Komen van nature voor in het heelal en produceren spontaan licht: de zon, sterren, bliksem, vuurvliegjes, poollicht.' },
                { label: 'Kunstmatige bronnen', value: 'Door de mens vervaardigd: gloeilamp, ledlamp, brandende kaars, tl-buis, smartphone-scherm, laserpointer, glowsticks.' },
                { label: 'Hete lichtbronnen', value: 'Temperatuurstralers: zenden licht uit doordat materie zeer heet wordt (> 800°C; zon, gloeidraad, kaarsvlam).' },
                { label: 'Koude lichtbronnen', value: 'Luminescentie: zenden licht uit zonder hitte (leds, vuurvliegje via chemische enzymen, chemiluminescentie in breekstaafjes).' }
            ]
        },
        {
            layout: 'properties',
            title: 'Optische Middenstoffen en Lichtdoorlaatbaarheid',
            items: [
                { label: 'Optische middenstof', value: 'Elke materie (of vacuüm) waarin licht zich kan voortplanten (lucht, water, glas, ijs, diamant, vacuüm).' },
                { label: 'Doorzichtig (transparant)', value: 'Laat vrijwel alle licht ongehinderd door; voorwerpen erachter zijn scherp zichtbaar (helder vensterglas, zuiver water, lucht).' },
                { label: 'Doorschijnend (translucide)', value: 'Laat licht door maar verstrooit de stralen in alle richtingen; voorwerpen erachter zijn wazig/onherkenbaar (matglas, bakpapier, melkglas).' },
                { label: 'Ondoorzichtig (opaak)', value: 'Laat helemaal geen licht door; absorbeert of weerkaatst alle stralen (hout, steen, metaal, dik karton).' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'De Lichtsnelheid c: Rekenvoorbeeld Zon-Aarde',
            problem: 'De Lichtsnelheid c: Rekenvoorbeeld Zon-Aarde',
            steps: [
                { label: 'Constante lichtsnelheid', content: 'In vacuüm en lucht plant licht zich voort met \\( c = 3{,}00 \\cdot 10^8\\text{ m/s} = 300\\,000\\text{ km/s} \\).' },
                { label: 'Afstand aarde-zon', content: '\\( \\Delta x = 150\\,000\\,000\\text{ km} = 1{,}50 \\cdot 10^{11}\\text{ m} \\).' },
                { label: 'Reistijd berekenen', content: '\\( \\Delta t = \\frac{\\Delta x}{c} = \\frac{1{,}50 \\cdot 10^{11}\\text{ m}}{3{,}00 \\cdot 10^8\\text{ m/s}} = 500\\text{ s} \\)' },
                { label: 'Omrekenen naar minuten', content: '\\( 500\\text{ s} = 8\\text{ minuten en } 20\\text{ seconden} \\).' },
                { label: 'Conclusie', content: 'Het zonlicht dat je nu op je huid voelt, verliet de zon ruim 8 minuten geleden!' }
            ]
        },
        {
            layout: 'properties',
            title: 'De Drie Soorten Lichtbundels (WACO 3 p. 15-18)',
            items: [
                { label: 'Lichtstraal', value: 'Een denkbeeldige dunne rechte lijn met een pijlpunt die de richting aangeeft waarin het licht zich verplaatst.' },
                { label: '1. Evenwijdige lichtbundel', value: 'De lichtstralen lopen evenwijdig aan elkaar (zonlicht dat het aardoppervlak bereikt, laserstraal).' },
                { label: '2. Divergerende lichtbundel', value: 'De lichtstralen lopen vanuit één gemeenschappelijk punt uit elkaar (zaklamp, straatlantaarn, kaarsvlam).' },
                { label: '3. Convergerende lichtbundel', value: 'De lichtstralen lopen vanuit verschillende richtingen naar één punt toe (licht na doorgang door een bolle lens).' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 3 Oef. 5 p. 16)',
            question: 'Bekijk de volgende vier lichamen: de volle maan, een brandende lucifer, een niet-brandende kaars en een glowstick die oplicht. Welke indeling is VOLLEDIG JUIST?',
            options: [
                { id: 'A', text: 'Maan: lichtbron; Lucifer: lichtbron; Kaars: donker lichaam; Glowstick: lichtbron.', correct: false },
                { id: 'B', text: 'Maan: donker lichaam; Lucifer: kunstmatige hete bron; Kaars: donker lichaam; Glowstick: kunstmatige koude bron.', correct: true },
                { id: 'C', text: 'Maan: donker lichaam; Lucifer: natuurlijke bron; Kaars: koude bron; Glowstick: donker lichaam.', correct: false },
                { id: 'D', text: 'Alle vier zijn lichtbronnen omdat ze allemaal zichtbaar zijn.', correct: false }
            ],
            explanation: 'De maan en een niet-brandende kaars produceren zelf geen licht (donkere lichamen). De lucifer produceert licht via hitte (hete kunstmatige bron) en de geactiveerde glowstick via een koude chemische reactie (chemiluminescentie).'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Zien door licht',
            items: [
                'Lichtbronnen zenden zelf licht uit; donkere lichamen weerkaatsen extern licht.',
                'Lichtbronnen zijn natuurlijk of kunstmatig, en heet (temperatuur) of koud (luminescentie).',
                'Optische middenstoffen: doorzichtig (helder zicht), doorschijnend (wazig), ondoorzichtig (geen doorgang).',
                'Rechtlijnige voortplanting in homogene middenstof met lichtsnelheid c = 3,00 · 10⁸ m/s.',
                'Drie bundeltypes: evenwijdig, divergerend (uit elkaar) en convergerend (naar elkaar).'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 2!',
            subtitle: 'In les 2 onderzoeken we het rechtstreekse gevolg van rechtlijnige lichtvoortplanting: schaduwvorming, kernschaduw, bijschaduw en zonsverduisteringen.',
            stats: [
                { label: 'Thema', value: '1 Optica' },
                { label: 'Hoofdstuk', value: '1 Zien door licht' },
                { label: 'Lesuur', value: '1 van 13' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat voor soort energie is licht volgens de natuurkunde?',
                options: ['Chemische energie', 'Stralingsenergie', 'Mechanische energie', 'Thermische energie'],
                correct: 1,
                explanation: 'Licht is een vorm van elektromagnetische stralingsenergie die zich in golven en fotonen voortplant.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Welk deel van het elektromagnetische spectrum kan het gezonde menselijke oog rechtstreeks waarnemen?',
                options: [
                    'Zichtbaar licht (golflengtes van circa 400 nm tot 700 nm)',
                    'Infrarood licht (warmtestraling)',
                    'Ultraviolet licht (uv-straling)',
                    'Alle soorten elektromagnetische golven'
                ],
                correct: 0,
                explanation: 'Onze netvliescellen (staafjes en kegeltjes) zijn uitsluitend gevoelig voor zichtbaar licht tussen ~400 nm en ~700 nm.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Hoe plant licht zich voort in een homogene, doorzichtige optische middenstof zoals lucht of water?',
                options: [
                    'Langs kaarsrechte lijnen (rechtlijnige voortplanting).',
                    'In spiraalvormige cirkels rond materiedeeltjes.',
                    'Als een grillige slingerbeweging.',
                    'Licht buigt automatisch rond alle vaste voorwerpen heen.'
                ],
                correct: 0,
                explanation: 'In een homogene optische middenstof verplaatst licht zich altijd strikt langs rechte banen (de rechtlijnige voortplanting van het licht).'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Wat is de snelheid van het licht in vacuüm en lucht (afgerond in m/s en km/s)?',
                options: [
                    'c = 3,00 · 10⁸ m/s (oftewel 300 000 km/s)',
                    'c = 340 m/s',
                    'c = 3 000 km/s',
                    'c = 3,00 · 10⁵ m/s'
                ],
                correct: 0,
                explanation: 'Licht reist in vacuüm met de universele maximumsnelheid van 3,00 · 10⁸ m/s (300 000 km/s). 340 m/s is de geluidssnelheid in lucht!'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Welke van onderstaande lichamen is een DONKER LICHAAM en dus GEEN lichtbron?',
                options: [
                    'De volle maan aan de nachtelijke hemel.',
                    'Een oplichtend vuurvliegje.',
                    'Een brandende kaarsvlam.',
                    'Het beeldscherm van een ingeschakelde tablet.'
                ],
                correct: 0,
                explanation: 'De maan produceert zelf geen licht; het is een donker rotsachtig lichaam dat zonlicht weerkaatst.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Wat is het kenmerk van een DIVERGERENDE lichtbundel?',
                options: [
                    'De lichtstralen lopen vanuit één punt steeds verder uit elkaar (bv. bij een zaklamp).',
                    'De lichtstralen lopen perfect evenwijdig aan elkaar.',
                    'De lichtstralen kruisen elkaar in één brandpunt.',
                    'De lichtstralen weerkaatsen op een spiegel.'
                ],
                correct: 0,
                explanation: 'Divergeren betekent uiteenlopen: vanuit de lichtbron waaieren de stralen kegelvormig uit elkaar.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Waarom noemen we een witte LED een "koude" lichtbron en een klassieke gloeilamp een "hete" lichtbron?',
                options: [
                    'Omdat een gloeilamp licht produceert door een gloeidraad witheet te verhitten (> 2 500°C), terwijl een LED licht opwekt via halfgeleiders met nauwelijks warmteverlies.',
                    'Omdat een LED gekoeld moet worden met vloeibare stikstof.',
                    'Omdat gloeilampen alleen in de winter gebruikt worden.',
                    'Omdat LED-licht kouder aanvoelt dan water.'
                ],
                correct: 0,
                explanation: 'Gloeilampen zijn temperatuurstralers (veel warmteverlies), terwijl leds werken via elektroluminescentie (koude bronnen met hoog energierendement).'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Waarneming & Verklaring',
                description: 'Leg aan de hand van het begrip "rechtlijnige voortplanting van het licht" uit waarom je iemand die om de hoek van een stenen gang staat wél kunt horen roepen, maar hem pas kunt zien zodra je zelf de hoek omslaat.'
            }
        ]
    }
}
