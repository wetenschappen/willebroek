/**
 * Beginsel van Pascal en hydraulische systemen - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 3: Druk bij vloeistoffen (Les 3/4)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 50-59)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l07-beginsel-van-pascal',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Het Beginsel van Pascal & Hydraulica',
    description: 'Drukoverdracht in afgesloten vloeistoffen volgens Pascal, de hydraulische hefbrug (F1/A1 = F2/A2), behoud van arbeid en toepassingen in hydraulische remmen en graafmachines.',

    config: {
        groenCode: 'F4M01L07',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 50-59)'
    },

    goals: [
        'Ik kan het beginsel van Pascal nauwkeurig formuleren: druk op een afgesloten vloeistof plant zich onverminderd voort in alle richtingen in heel de vloeistof.',
        'Ik kan de formule van het hydraulisch systeem afleiden en toepassen: F1 / A1 = F2 / A2.',
        'Ik kan uitleggen dat een hydraulisch systeem een krachtvermenigvuldiger is, maar dat de arbeid behouden blijft (W1 = W2, dus F1 · Δx1 = F2 · Δx2).',
        'Ik kan de werking van hydraulische remmen, hefbruggen en graafmachines verklaren aan de hand van het beginsel van Pascal.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 3: Beginsel van Pascal (p. 50-59)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 50-54</strong> de theorie en tekeningen over de hydraulische pers. Los in de oefeningenbundel op <strong>pagina 14-17 oefeningen 8, 10, 11 en 12</strong> op.</p>',
        formulaHint: 'Formules: \\( \\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\Rightarrow F_2 = F_1 \\cdot \\frac{A_2}{A_1} \\). Arbeid: \\( F_1 \\cdot \\Delta x_1 = F_2 \\cdot \\Delta x_2 \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over drukformule (p = F / A), eigenschappen van vloeistoffen en eenheden.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering: Een Auto Tillen met Één Hand',
                    description: 'Hoe kan een mecanicien met een lichte handdruk een truck van 5 000 kg omhoog heffen?',
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
                    title: 'Het Beginsel van Pascal & Hydraulica',
                    description: 'Formule F1/A1 = F2/A2, krachtversterking vs verplaatsing en het rekenvoorbeeld autobrug.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 8, 10, 11 en 12 (oefenbundel p. 14-17).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: hydraulische hefbrug',
                    description: 'Simuleer drukoverdracht en krachtvermenigvuldiging volgens Pascal.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Hydraulische Componenten Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz Pascal & Hydraulica',
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
                    description: 'Kernformules hydraulica, de gulden mechanische regel en vooruitblik naar U-buisvraagstukken.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van het beginsel van Pascal en hydraulische vraagstukken.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'pressureLab',
            defaultMode: 'pascal'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Verhoudingen in Hydraulische Systemen',
            instruction: 'Koppel de verhouding tussen de zuigers aan het juiste gevolg voor kracht en verplaatsing.',
            pairs: [
                { term: 'A₂ is 100 keer zo groot als A₁', definition: 'Kracht F₂ is 100x groter dan F₁; verplaatsing Δx₂ is 100x kleiner dan Δx₁' },
                { term: 'A₂ is 4 keer zo groot als A₁', definition: 'Kracht F₂ is 4x groter dan F₁; verplaatsing Δx₂ is 4x kleiner dan Δx₁' },
                { term: 'A₁ en A₂ zijn exact even groot', definition: 'Kracht F₂ is gelijk aan F₁; verplaatsing Δx₂ is gelijk aan Δx₁' },
                { term: 'Stralen verhouden zich als r₂ = 2 · r₁', definition: 'Oppervlak A₂ = 4 · A₁, dus de hefkracht wordt 4 keer zo groot' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Beginsel van Pascal (WACO 4)',
            questions: [
                {
                    q: 'Je wilt met een hydraulische lift een auto van 1 450 kg optillen. De kleine zuiger heeft een oppervlakte A₁ = 10 cm² en de grote zuiger A₂ = 100 cm². Welke kracht moet je op de kleine zuiger uitoefenen (g = 9,81 N/kg)?',
                    a: [
                        '1,4 · 10³ N (1 422 N, want F₁ = F₂ · (A₁ / A₂) = (1 450 · 9,81) · (10 / 100) = 14 225 · 0,10)',
                        '14 225 N',
                        '142 N',
                        '1,4 · 10⁵ N'
                    ],
                    c: 0
                },
                {
                    q: 'Een afgesloten vat vol vloeistof heeft 5 stoppen (A bovenaan, B, C, D onderaan en E opzij). Je oefent op stop A een extra druk p uit. Wat gebeurt er bij de andere stoppen conform de wet van Pascal?',
                    a: [
                        'Op alle vier de andere stoppen is exact dezelfde drukverhoging p meetbaar, ongeacht hun positie of diepte.',
                        'Alleen op stop D recht eronder ontstaat een drukverhoging.',
                        'Op de diepere stoppen ontstaat een veel grotere drukverhoging dan op de zijstoppen.',
                        'De druk plant zich uitsluitend verticaal naar beneden voort.'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom kun je met een hydraulische hefbrug géén gratis energie of arbeid winnen?',
                    a: [
                        'Omdat de verplaatsing van de zware last omgekeerd evenredig kleiner is: om de auto 1 cm op te tillen met een factor 100 hefbrug, moet je de kleine zuiger 100 cm omlaag duwen (W₁ = W₂).',
                        'Omdat vloeistof altijd energie absorbeert en vernietigt.',
                        'Omdat de zwaartekracht verdubbelt bij hydraulische systemen.',
                        'Omdat de hefbrug na 1 minuut stopt met werken.'
                    ],
                    c: 0
                },
                {
                    q: 'Welke uitspraak over het beginsel van Pascal is FOUT volgens WACO 4?',
                    a: [
                        'In een hydraulisch systeem is het product van de kracht met het oppervlak aan beide kanten even groot (F₁ · A₁ = F₂ · A₂).',
                        'De druk uitgeoefend op een deel van de vloeistof in een afgesloten ruimte plant zich onverminderd voort in alle richtingen.',
                        'In een hydraulisch systeem is de verhouding van de kracht tot de oppervlakte aan beide kanten even groot (F₁ / A₁ = F₂ / A₂).',
                        'Hydraulische systemen werken omdat vloeistoffen nagenoeg onsamendrukbaar zijn.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Het Beginsel van Pascal',
            subtitle: 'Drukoverdracht in afgesloten vloeistoffen en hydraulica (WACO 4 p. 50-59)',
            badge: 'Fysica 4 - Les 7',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Het beginsel van Pascal begrijpen en wetenschappelijk nauwkeurig formuleren.' },
                { icon: 'function', text: 'De werking van de hydraulische hefbrug afleiden via p₁ = p₂ en F₁/A₁ = F₂/A₂.' },
                { icon: 'function', text: 'Inzien dat arbeid en energie behouden blijven (krachtwinst = verplaatsingsverlies).' },
                { icon: 'function', text: 'Toepassingen in remsystemen van wagens en fietsen, graafmachines en hefkranen verklaren.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Een Auto Tillen met je Hand',
            question: 'In een autogarage tilt een hefbrug een zware bestelwagen van 2 500 kg op. De pomp die dit aandrijft oefent slechts een kracht uit van 250 newton (vergelijkbaar met het optillen van een rugzak van 25 kg). Hoe kan een vloeistof een kracht zomaar vertienvoudigen?',
            hint: 'Denk aan de oppervlaktes van de zuigers aan weerszijden van de hydraulische leiding.',
            revealText: 'Vloeistoffen zijn onsamendrukbaar. Als je met de kleine zuiger druk opbouwt, plant die druk zich onverminderd voort naar de grote zuiger onder de wagen. Omdat die zuiger een 10x groter oppervlak heeft (F = p · A), is de opwaartse hefkracht ook 10x groter!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Incompressibiliteit van Vloeistoffen',
            items: [
                { label: 'Gassen zijn samendrukbaar', value: 'Veel lege ruimte tussen de moleculen; je kunt het volume fors verkleinen.' },
                { label: 'Vloeistoffen zijn onsamendrukbaar', value: 'Moleculen raken elkaar al aan. Volume kan niet worden verkleind (incompressibel).' },
                { label: 'Directe drukoverbrenging', value: 'Elke drukverandering aan één uiteinde plant zich met de geluidssnelheid door de hele vloeistof voort.' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Het Beginsel van Pascal (1653)',
            definition: 'De druk die wordt uitgeoefend op een deel van een vloeistof in een afgesloten ruimte, plant zich onverminderd voort in alle richtingen in heel de vloeistof (en loodrecht op de wanden van het vat).'
        },
        {
            layout: 'properties',
            title: 'Historische Proef: De Bol van Pascal',
            items: [
                { label: 'De Opstelling', value: 'Een holle metalen bol vol water met tientallen kleine gaatjes in alle richtingen, afgesloten met een zuiger.' },
                { label: 'De Waarneming', value: 'Zodra je de zuiger indrukt, spuiten uit álle gaatjes (boven, onder, links, rechts) identieke waterstralen met exact dezelfde kracht en snelheid!' },
                { label: 'De Conclusie', value: 'De drukverhoging plant zich niet alleen in de duwrichting voort, maar volkomen alzijdig en onverminderd.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'De Hydraulische Hefbrug: Wiskundige Afleiding',
            problem: 'De Hydraulische Hefbrug: Wiskundige Afleiding',
            steps: [
                { label: 'Opstelling', content: 'Twee verbonden cilinders met zuigeroppervlakken \\( A_1 \\) (ingangszuiger) en \\( A_2 \\) (hefzuiger), gevuld met hydraulische olie.' },
                { label: 'Druk is gelijk', content: 'Volgens Pascal is de druk aan beide kanten exact gelijk: \\( p_1 = p_2 \\).' },
                { label: 'Definitie van druk invullen', content: '\\( \\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\)' },
                { label: 'Hefkracht F₂ uitdrukken', content: '\\( F_2 = F_1 \\cdot \\frac{A_2}{A_1} \\)' },
                { label: 'Krachtvermenigvuldiger', content: 'Is de hefzuiger 50 keer groter dan de pompdrukzuiger (\\( A_2 = 50 A_1 \\))? Dan is de hefkracht \\( F_2 = 50 F_1 \\)!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld: Auto Optillen (WACO 4 Oef. 8 p. 15)',
            problem: '\\( m_{\\text{auto}} = 1\\,450\\text{ kg} \\); \\( A_1 = 10\\text{ cm}^2 \\); \\( A_2 = 100\\text{ cm}^2 \\); \\( g = 9{,}81\\text{ N/kg} \\).',
            steps: [
                { label: 'Gegeven', content: '\\( m_{\\text{auto}} = 1\\,450\\text{ kg} \\); \\( A_1 = 10\\text{ cm}^2 \\); \\( A_2 = 100\\text{ cm}^2 \\); \\( g = 9{,}81\\text{ N/kg} \\).' },
                { label: 'Gevraagd', content: 'Benodigde kracht \\( F_1 \\) op de kleine zuiger.' },
                { label: 'Stap 1: Gewicht auto', content: '\\( F_2 = F_G = m \\cdot g = 1\\,450\\text{ kg} \\cdot 9{,}81\\text{ N/kg} = 14\\,224{,}5\\text{ N} \\)' },
                { label: 'Stap 2: Formule toepassen', content: '\\( \\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\Rightarrow F_1 = F_2 \\cdot \\frac{A_1}{A_2} \\)' },
                { label: 'Stap 3: Berekening', content: '\\( F_1 = 14\\,224{,}5\\text{ N} \\cdot \\frac{10\\text{ cm}^2}{100\\text{ cm}^2} = 14\\,224{,}5 \\cdot 0{,}10 = 1\\,422{,}45\\text{ N} \= 1{,}4 \\cdot 10^3\\text{ N} \\)' },
                { label: 'Antwoord', content: 'Je hebt een kracht van slechts \\( 1{,}4 \\cdot 10^3\\text{ N} \\) (overeenkomend met 145 kg) nodig om de wagen van 1 450 kg op te tillen.' }
            ]
        },
        {
            layout: 'properties',
            title: 'De Gulden Regel: Behoud van Arbeid',
            items: [
                { label: 'Verplaatst volume vloeistof', value: 'Omdat olie niet samendrukbaar is, is het verplaatste volume links gelijk aan rechts: V₁ = V₂ ⇒ A₁ · Δx₁ = A₂ · Δx₂.' },
                { label: 'Verplaatsing van de zuigers', value: 'Δx₂ = Δx₁ · (A₁ / A₂). Als de kracht 10x vergroot wordt, beweegt de last 10x minder ver omhoog!' },
                { label: 'Arbeid is behouden', value: 'W₁ = F₁ · Δx₁ = (F₂ · A₁/A₂) · (Δx₂ · A₂/A₁) = F₂ · Δx₂ = W₂. Er ontstaat geen gratis energie!' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 4 Oef. 1 p. 12)',
            question: 'Een afgesloten vat vol vloeistof heeft vijf stoppen (A, B, C, D, E). Je oefent op stop A een extra druk p uit. Welke stelling is JUIST conform de wet van Pascal?',
            options: [
                { id: 'A', text: 'Alleen op stop D recht eronder ontstaat een drukverhoging.', correct: false },
                { id: 'B', text: 'Op alle vier de andere stoppen ontstaat exact dezelfde drukverhoging p.', correct: true },
                { id: 'C', text: 'Op de diepste stop C ontstaat een tweemaal zo grote drukverhoging.', correct: false },
                { id: 'D', text: 'De druk dooft uit en bereikt de zijstoppen niet.', correct: false }
            ],
            explanation: 'Het beginsel van Pascal stelt expliciet dat een drukverhoging op een afgesloten vloeistof zich onverminderd voortplant in álle richtingen. Elke stop ondervindt dus exact dezelfde druktoename p.'
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Beginsel van Pascal',
            items: [
                'Beginsel van Pascal: druk in een afgesloten vloeistof plant zich onverminderd en alzijdig voort.',
                'Hydraulische hefbrug: F₁ / A₁ = F₂ / A₂ ⇒ F₂ = F₁ · (A₂ / A₁).',
                'Krachtversterker: hoe groter A₂ t.o.v. A₁, hoe groter de hefkracht.',
                'Behoud van arbeid: F₁ · Δx₁ = F₂ · Δx₂. Wat je wint aan kracht, verlies je aan verplaatsing.',
                'Toepassingen: hefbruggen, hydraulische schijfremmen, graafmachines, hydraulische persen.'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor les 8!',
            subtitle: 'In les 8 verdiepen we vloeistofdruk met gecombineerde vraagstukken over U-buizen met twee vloeistoffen en totale krachten op onderwaterwanden.',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstuk', value: '3 Vloeistoffen' },
                { label: 'Lesuur', value: '7 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Wat is het belangrijkste fysische verschil tussen vloeistoffen en gassen bij samendrukken?',
                options: [
                    'Vloeistoffen zijn praktisch onsamendrukbaar, terwijl gassen gemakkelijk samendrukbaar zijn.',
                    'Vloeistoffen zijn veel gemakkelijker samen te drukken dan gassen.',
                    'Zowel vloeistoffen als gassen kunnen niet worden samengedrukt.',
                    'Gassen hebben geen moleculen en vloeistoffen wel.'
                ],
                correct: 0,
                explanation: 'In vloeistoffen zitten moleculen al dicht tegen elkaar (vloeistoffen zijn incompressibel), waardoor drukveranderingen direct worden doorgegeven.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Als een kracht van 50 N werkt op een zuigeroppervlakte van 5,0 cm² (0,00050 m²), hoe groot is dan de druk in de vloeistof?',
                options: [
                    '100 000 Pa (1,0 bar)',
                    '10 000 Pa',
                    '250 Pa',
                    '1 000 Pa'
                ],
                correct: 0,
                explanation: 'p = F / A = 50 N / 0,00050 m² = 100 000 Pa = 1,0 · 10⁵ Pa = 1,0 bar.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Wat beweert het beginsel van Pascal over de druk in een afgesloten vloeistof?',
                options: [
                    'De druk plant zich onverminderd voort in alle richtingen in de hele vloeistof.',
                    'De druk neemt af met het kwadraat van de afstand.',
                    'De druk plant zich alleen naar beneden toe voort.',
                    'De druk verdwijnt na enkele centimeters.'
                ],
                correct: 0,
                explanation: 'Pascal ontdekte dat een druk uitgeoefend op een afgesloten vloeistof zich alzijdig en zonder verlies in de hele vloeistof verspreidt.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Welke relatie geldt voor de twee zuigers in een hydraulisch systeem (volgens WACO 4)?',
                options: [
                    'F₁ / A₁ = F₂ / A₂ (druk is overal gelijk)',
                    'F₁ · A₁ = F₂ · A₂',
                    'F₁ + A₁ = F₂ + A₂',
                    'F₁ / F₂ = A₂ / A₁'
                ],
                correct: 0,
                explanation: 'Omdat de druk p = F / A overal in de vloeistof gelijk is, geldt p₁ = p₂ oftewel F₁ / A₁ = F₂ / A₂.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'In een hydraulische hefbrug heeft zuiger 1 een oppervlak van 20 cm² en zuiger 2 een oppervlak van 600 cm² (30x groter). Welke hefkracht F₂ ontstaat er als je op zuiger 1 duwt met F₁ = 150 N?',
                options: [
                    'F₂ = 4 500 N (want F₂ = 150 · (600 / 20) = 150 · 30)',
                    'F₂ = 150 N',
                    'F₂ = 5,0 N',
                    'F₂ = 90 000 N'
                ],
                correct: 0,
                explanation: 'F₂ = F₁ · (A₂ / A₁) = 150 N · (600 / 20) = 150 · 30 = 4 500 N.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Als je in het bovenstaande vraagstuk de kleine zuiger 30 cm omlaag duwt, hoeveel centimeter gaat de zware last op zuiger 2 dan omhoog?',
                options: [
                    '1,0 cm (want Δx₂ = Δx₁ / 30 = 30 cm / 30)',
                    '30 cm',
                    '900 cm',
                    '0,10 cm'
                ],
                correct: 0,
                explanation: 'Het verplaatste volume is gelijk: A₁ · Δx₁ = A₂ · Δx₂. Omdat A₂ dertig keer groter is, beweegt zuiger 2 dertig keer minder ver omhoog: 30 cm / 30 = 1,0 cm.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Waarom mogen er absoluut géén luchtbellen in het hydraulische remsysteem van een auto of racefiets zitten?',
                options: [
                    'Omdat lucht samendrukbaar is: als je remt, pers je eerst de luchtbel samen en wordt de remdruk niet krachtig doorgegeven naar de remklauwen.',
                    'Omdat lucht de remvloeistof bevriest.',
                    'Omdat lucht het rempedaal blokkeert.',
                    'Omdat lucht het gewicht van de auto te veel verhoogt.'
                ],
                correct: 0,
                explanation: 'Lucht is samendrukbaar. Luchtbellen absorberen de slag van het pedaal (sponsachtig remgevoel) in plaats van de druk onverminderd door te geven.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Conceptuele Verklaring',
                description: 'Leg uit waarom een hydraulische hefbrug wél een "krachtvermenigvuldiger" is, maar géén "arbeidsvermenigvuldiger". Verwijs in je antwoord naar kracht, verplaatsing en arbeid (W = F · Δx).'
            }
        ]
    }
}
