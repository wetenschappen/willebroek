/**
 * Gecombineerde vraagstukken vloeistofdruk & U-buizen - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 3: Druk bij vloeistoffen (Les 4/4)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 54-63)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l08-vraagstukken-vloeistofdruk',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Vraagstukken Vloeistofdruk & U-buizen',
    description: 'Geavanceerde synthese van vloeistofdruk: de U-buis met twee onmengbare vloeistoffen (ρ₁ · h₁ = ρ₂ · h₂), cirkelvormige zuigers en netto krachten op patrijspoorten.',

    config: {
        groenCode: 'F4M01L08',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 54-63)'
    },

    goals: [
        'Ik kan de evenwichtsvoorwaarde van een U-buis met twee onmengbare vloeistoffen afleiden en toepassen: ρ₁ · h₁ = ρ₂ · h₂.',
        'Ik kan verklaren waarom de vloeistof met de kleinste massadichtheid in de U-buis het hoogste vloeistofpeil heeft.',
        'Ik kan vraagstukken oplossen met cirkelvormige zuigers waarbij de diameter gegeven is (A = π · r² = π · d² / 4).',
        'Ik kan het onderscheid maken tussen de totale kracht (F_tot = p_tot · A) en de netto kracht (F_netto = p_hydr · A) op onderwaterwanden en patrijspoorten.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 3: Vraagstukken & Synthese (p. 54-63)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 54-57</strong> de evenwichtsberekening van de U-buis met twee vloeistoffen. Maak in de oefeningenbundel op <strong>pagina 16-19 oefeningen 13, 14, 15 en 16</strong>.</p>',
        formulaHint: 'U-buis: \\( \\rho_1 \\cdot h_1 = \\rho_2 \\cdot h_2 \\). Oppervlak cirkel: \\( A = \\pi \\cdot r^2 = \\frac{\\pi \\cdot d^2}{4} \\). Kracht: \\( F = p \\cdot A \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over hydrostatische druk, Pascal en communicerende vaten.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering & Probleemstelling',
                    description: 'Water en olie in één U-buis: waarom staan de vloeistofspiegels plots niet meer gelijk?',
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
                    title: 'U-buis met 2 Vloeistoffen & Krachtberekening',
                    description: 'Afleiding ρ₁ · h₁ = ρ₂ · h₂, rekenvoorbeeld olie/water en patrijspoort onderzeeër.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 13 t.e.m. 16 (oefenbundel p. 16-19).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: vloeistofdruk en vaten',
                    description: 'Onderzoek hydrostatische druk en communicerende vloeistofkolommen.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Vloeistofdruk Synthese Matching',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Dieptequiz U-buis & Patrijspoorten',
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
                    description: 'De 3 pijlers van vloeistofdruk: hydrostatica, Pascal en communicerende vaten.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve evaluatie van de U-buisberekening en onderwaterkrachten.',
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
            title: 'Dichtheid en Zuigerverhoudingen',
            instruction: 'Koppel elke situatie aan het juiste fysische resultaat.',
            pairs: [
                { term: 'Diameter zuiger verdubbelt (d₂ = 2·d₁)', definition: 'Oppervlak A₂ wordt 4 keer groter (want A is evenredig met d²)' },
                { term: 'Diameter zuiger verdrievoudigt (d₂ = 3·d₁)', definition: 'Oppervlak A₂ wordt 9 keer groter, dus hefkracht stijgt met factor 9' },
                { term: 'Olie (900 kg/m³) op water (1 000 kg/m³)', definition: 'De oliekolom staat hoger dan de waterkolom (h_olie / h_water = 1 000 / 900 = 1,11)' },
                { term: 'Water (1 000 kg/m³) op kwik (13 600 kg/m³)', definition: 'Een waterkolom van 13,6 cm is in evenwicht met slechts 1,0 cm kwik' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Dieptequiz: Gecombineerde Vraagstukken (WACO 4)',
            questions: [
                {
                    q: 'In een open U-buis staat water (ρ₁ = 1 000 kg/m³). In het rechterbeen giet men een laag olie (ρ₂ = 800 kg/m³) met een hoogte h₂ = 20,0 cm. Hoe hoog staat het water h₁ boven het scheidingsvlak in het linkerbeen?',
                    a: [
                        '16,0 cm (want h₁ = (ρ₂ · h₂) / ρ₁ = (800 · 20,0) / 1 000 = 16,0 cm)',
                        '25,0 cm',
                        '20,0 cm',
                        '10,0 cm'
                    ],
                    c: 0
                },
                {
                    q: 'Een ronde patrijspoort van een onderzeeboot heeft een diameter van 40,0 cm (r = 0,200 m; A = 0,126 m²). De onderzeeër bevindt zich op 50,0 m diepte in zeewater (ρ = 1 025 kg/m³, g = 9,81 N/kg). In de boot heerst normale atmosferische druk (1,01 · 10⁵ Pa). Hoe groot is de NETTO naar binnen gerichte kracht op het glas?',
                    a: [
                        '6,33 · 10⁴ N (circa 63,3 kN; want F_netto = p_hydr · A = (1 025 · 9,81 · 50) · 0,126)',
                        '7,60 · 10⁴ N',
                        '5,03 · 10⁵ N',
                        '1,27 · 10⁴ N'
                    ],
                    c: 0
                },
                {
                    q: 'Een hydraulische lift heeft twee ronde cilinders. Cilinder 1 heeft een diameter d₁ = 4,0 cm en cilinder 2 heeft d₂ = 40 cm (10 keer zo groot). Met welke factor wordt de kracht vermenigvuldigd?',
                    a: [
                        'Met een factor 100 (want A is evenredig met d², dus (40/4)² = 10² = 100)',
                        'Met een factor 10',
                        'Met een factor 20',
                        'Met een factor 400'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom staat in een U-buis met olie en water de vloeistof met de kleinste dichtheid altijd het hoogst?',
                    a: [
                        'Omdat een lichte vloeistof per centimeter hoogte minder weegt; er is dus een hogere kolom nodig om dezelfde hydrostatische druk uit te oefenen als een zwaardere vloeistof.',
                        'Omdat olie meer aangetrokken wordt door de lucht.',
                        'Omdat watermoleculen krimpen in een buis.',
                        'Omdat de zwaartekracht op olie omhoog gericht is.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Vraagstukken Vloeistofdruk',
            subtitle: 'U-buis met 2 vloeistoffen, ronde zuigers en onderwaterkrachten (WACO 4 p. 54-63)',
            badge: 'Fysica 4 - Les 8',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'Het evenwicht in een U-buis met twee onmengbare vloeistoffen berekenen (ρ₁ · h₁ = ρ₂ · h₂).' },
                { icon: 'function', text: 'Verklaren waarom vloeistoffen met verschillende dichtheid op ongelijke hoogtes staan.' },
                { icon: 'function', text: 'Krachten berekenen op cirkelvormige zuigers via diameters (A = π · d² / 4).' },
                { icon: 'function', text: 'Het verschil toepassen tussen totale kracht en netto kracht op onderwaterwanden.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Olie op Water in een U-buis',
            question: 'Je hebt een U-buis waarin water in beide benen exact even hoog staat. In het rechterbeen giet je voorzichtig 15 cm zonnebloemolie (dichtheid 920 kg/m³). De vloeistofspiegels staan nu niet meer op gelijke hoogte! In welk been staat de vloeistofspiegel het hoogst?',
            hint: 'Denk na: welke vloeistof is lichter per kubieke centimeter?',
            revealText: 'Het rechterbeen (met de olie) staat aanzienlijk hoger! Omdat olie lichter is dan water (ρ = 920 t.o.v. 1 000 kg/m³), is er een langere kolom olie nodig om dezelfde hydrostatische druk op te bouwen als de kortere, zwaardere waterkolom links.'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Wiskunde & Meetkunde',
            items: [
                { label: 'Cirkeloppervlakte met straal r', value: 'A = π · r².' },
                { label: 'Cirkeloppervlakte met diameter d', value: 'A = π · (d / 2)² = (π · d²) / 4.' },
                { label: 'Diameter verdubbelen', value: 'Als de diameter verdubbelt, verviervoudigt de oppervlakte! (factor 2² = 4).' },
                { label: 'Kracht uit druk', value: 'F = p · A (met p in Pa, A in m² en F in N).' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'worked-example',
            title: 'Wiskundige Afleiding: U-buis met 2 Vloeistoffen',
            problem: 'Wiskundige Afleiding: U-buis met 2 Vloeistoffen',
            steps: [
                { label: 'Stap 1: Referentievlak', content: 'Trek een denkbeeldige horizontale lijn door het scheidingsvlak tussen vloeistof 1 en 2 in de U-buis.' },
                { label: 'Stap 2: Drukgelijkheid', content: 'Op deze horizontale lijn moet de druk links gelijk zijn aan de druk rechts: \\( p_{\\text{links}} = p_{\\text{rechts}} \\).' },
                { label: 'Stap 3: Drukken uitschrijven', content: '\\( p_{\\text{atm}} + \\rho_1 \\cdot g \\cdot h_1 = p_{\\text{atm}} + \\rho_2 \\cdot g \\cdot h_2 \\).' },
                { label: 'Stap 4: Vereenvoudigen', content: '\\( p_{\\text{atm}} \\) valt aan weerszijden weg, evenals de zwaarteveldsterkte \\( g \\)!' },
                { label: 'Eindformule', content: '\\( \\rho_1 \\cdot h_1 = \\rho_2 \\cdot h_2 \\Leftrightarrow \\frac{h_1}{h_2} = \\frac{\\rho_2}{\\rho_1} \\). De hoogtes zijn omgekeerd evenredig met de massadichtheden!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld 1: U-buis Olie en Water (WACO 4 Oef. 13 p. 16)',
            problem: 'Water \\( \\rho_1 = 1\\,000\\text{ kg/m}^3 \\); olie \\( \\rho_2 = 800\\text{ kg/m}^3 \\); oliekolom \\( h_2 = 20{,}0\\text{ cm} \\).',
            steps: [
                { label: 'Gegeven', content: 'Water \\( \\rho_1 = 1\\,000\\text{ kg/m}^3 \\); olie \\( \\rho_2 = 800\\text{ kg/m}^3 \\); oliekolom \\( h_2 = 20{,}0\\text{ cm} \\).' },
                { label: 'Gevraagd', content: 'Hoogte van de waterkolom \\( h_1 \\) boven het scheidingsvlak (in cm).' },
                { label: 'Formule', content: '\\( \\rho_1 \\cdot h_1 = \\rho_2 \\cdot h_2 \\Rightarrow h_1 = \\frac{\\rho_2 \\cdot h_2}{\\rho_1} \\)' },
                { label: 'Berekening', content: '\\( h_1 = \\frac{800\\text{ kg/m}^3 \\cdot 20{,}0\\text{ cm}}{1\\,000\\text{ kg/m}^3} = \\frac{16\\,000}{1\\,000} = 16{,}0\\text{ cm} \\)' },
                { label: 'Antwoord', content: 'De waterkolom is 16,0 cm hoog. De vloeistofspiegel van de olie staat dus 4,0 cm hoger dan die van het water!' }
            ]
        },
        {
            layout: 'properties',
            title: 'Totale Kracht versus Netto Kracht',
            items: [
                { label: 'Totale kracht van het water', value: 'F_tot = p_tot · A = (patm + ρ · g · h) · A. Dit is de werkelijke fysieke kracht die het water uitoefent op de buitenkant van een wand.' },
                { label: 'Tegendruk van binnenlucht', value: 'Binnen in een onderzeeër of duikersklok heerst normale atmosferische druk patm, die van binnen naar buiten drukt: F_binnen = patm · A.' },
                { label: 'Netto kracht op het venster', value: 'F_netto = F_buiten - F_binnen = (patm + ρ·g·h)·A - (patm·A) = (ρ·g·h) · A = p_hydr · A. De atmosfeer heft zichzelf op!' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld 2: Patrijspoort Onderzeeër (WACO 4 Oef. 15 p. 18)',
            problem: 'Diepte \\( h = 50{,}0\\text{ m} \\); \\( \\rho_{\\text{zee}} = 1\\,025\\text{ kg/m}^3 \\); diameter raam \\( d = 40{,}0\\text{ cm} = 0{,}400\\text{ m} \\); \\( g = 9{,}81\\text{ N/kg} \\).',
            steps: [
                { label: 'Gegeven', content: 'Diepte \\( h = 50{,}0\\text{ m} \\); \\( \\rho_{\\text{zee}} = 1\\,025\\text{ kg/m}^3 \\); diameter raam \\( d = 40{,}0\\text{ cm} = 0{,}400\\text{ m} \\); \\( g = 9{,}81\\text{ N/kg} \\).' },
                { label: 'Gevraagd', content: 'Netto kracht \\( F_{\\text{netto}} \\) op het glas.' },
                { label: 'Oppervlakte', content: '\\( A = \\frac{\\pi \\cdot d^2}{4} = \\frac{\\pi \\cdot (0{,}400\\text{ m})^2}{4} \= 0{,}1257\\text{ m}^2 \\)' },
                { label: 'Hydrostatische druk', content: '\\( p_{\\text{hydr}} = 1\\,025\\text{ kg/m}^3 \\cdot 9{,}81\\text{ N/kg} \\cdot 50{,}0\\text{ m} = 502\\,762{,}5\\text{ Pa} \= 5{,}03 \\cdot 10^5\\text{ Pa} \\)' },
                { label: 'Netto kracht', content: '\\( F_{\\text{netto}} = p_{\\text{hydr}} \\cdot A = 502\\,762{,}5\\text{ Pa} \\cdot 0{,}1257\\text{ m}^2 \= 63\\,200\\text{ N} = 6{,}32 \\cdot 10^4\\text{ N} \\)' },
                { label: 'Conclusie', content: 'Het vensterglas moet bestand zijn tegen een netto kracht van meer dan 63 kN (het gewicht van ruim 6 ton)!' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Inzichtscheck (WACO 4 Oef. 14 p. 17)',
            question: 'Een hydraulische pers heeft twee ronde zuigers. Zuiger 1 heeft diameter d₁ = 2 cm, zuiger 2 heeft diameter d₂ = 20 cm (factor 10 groter). Hoeveel newton hefkracht F₂ ontstaat er als je duwt met F₁ = 50 N?',
            options: [
                { id: 'A', text: '500 N', correct: false },
                { id: 'B', text: '5 000 N (want factor 10² = 100, dus 50 · 100 = 5 000 N)', correct: true },
                { id: 'C', text: '50 N', correct: false },
                { id: 'D', text: '25 000 N', correct: false }
            ],
            explanation: 'De oppervlakte van een cirkel is evenredig met het kwadraat van de diameter (A = π·d²/4). Als de diameter met factor 10 toeneemt, neemt het oppervlak toe met 10² = 100. De kracht F₂ is dus 100 · 50 N = 5 000 N!'
        },
        {
            layout: 'properties',
            title: 'Praktijktips voor Vraagstukken',
            items: [
                { label: 'Stap 1: Maak een schets', value: 'Teken altijd de vloeistofkolommen en duid het scheidingsvlak aan.' },
                { label: 'Stap 2: Eén eenhedenstelsel', value: 'Zet alle afmetingen direct om naar meter (m) en oppervlakten naar m².' },
                { label: 'Stap 3: Schrap constanten', value: 'In verhoudingen (zoals de U-buis) vallen g en π vaak weg: reken slim!' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Synthese: Hoofdstuk 3 Vloeistoffen',
            items: [
                'Hydrostatische druk: p_hydr = ρ · g · h (gewicht van de vloeistoflaag).',
                'Totale druk: p_tot = p_atm + ρ · g · h.',
                'Beginsel van Pascal: F₁ / A₁ = F₂ / A₂ (krachtwinst = verplaatsingsverlies).',
                'U-buis met 2 vloeistoffen: ρ₁ · h₁ = ρ₂ · h₂ (lichtste vloeistof staat het hoogst).',
                'Cirkeloppervlakte: A = π · d² / 4 (diameter verdubbelen = oppervlak verviervoudigen).'
            ]
        },
        {
            layout: 'closing',
            title: 'Klaar voor Hoofdstuk 4!',
            subtitle: 'In les 9 stappen we over naar de beroemde opwaartse stuwkracht van Archimedes: waarom drijven zware stalen vrachtschepen op water?',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstuk', value: '3 Afgerond' },
                { label: 'Lesuur', value: '8 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Hoe luidt de formule voor de oppervlakte A van een cirkelvormige zuiger met diameter d?',
                options: [
                    'A = π · d',
                    'A = (π · d²) / 4',
                    'A = 2 · π · d',
                    'A = π · d²'
                ],
                correct: 1,
                explanation: 'A = π · r² = π · (d/2)² = (π · d²) / 4.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Als je water (dichtheid 1 000 kg/m³) en kwik (13 600 kg/m³) in een U-buis giet, welke vloeistof staat dan op het hoogste peil boven het scheidingsvlak?',
                options: [
                    'Het water, omdat het de kleinste massadichtheid heeft.',
                    'Het kwik, omdat het de grootste massadichtheid heeft.',
                    'Beide vloeistoffen staan altijd exact even hoog.',
                    'Kwik verdampt onmiddellijk in een U-buis.'
                ],
                correct: 0,
                explanation: 'Uit ρ₁ · h₁ = ρ₂ · h₂ volgt dat de vloeistof met de laagste dichtheid (water) de grootste hoogte moet hebben om evenveel hydrostatische druk uit te oefenen.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Wat gebeurt er met de totale hydrostatische kracht op een sluisdeur als de waterhoogte verdubbelt?',
                options: [
                    'De gemiddelde druk én het oppervlak verdubbelen beide, waardoor de kracht viermaal zo groot wordt.',
                    'De kracht verdubbelt.',
                    'De kracht blijft exact gelijk.',
                    'De kracht halveert.'
                ],
                correct: 0,
                explanation: 'Zowel de waterdruk p (evenredig met h) als het natte oppervlak A (evenredig met h) nemen met factor 2 toe, waardoor F = p · A verviervoudigt.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Waarom mag je de atmosferische druk patm weglaten bij het berekenen van de netto kracht op een raam van een onderzeeboot?',
                options: [
                    'Omdat binnen in de onderzeeër ook 1 bar atmosferische druk heerst, die de buitenste 1 bar atmosferische druk perfect opheft.',
                    'Omdat de atmosfeer onder water niet bestaat.',
                    'Omdat water de atmosfeer vernietigt.',
                    'Omdat patm veel te klein is om te meten.'
                ],
                correct: 0,
                explanation: 'Zowel binnen als buiten werkt patm op het raam in tegengestelde richting, waardoor de netto kracht uitsluitend door de hydrostatische waterdruk veroorzaakt wordt.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'In een open U-buis is een kolom alcohol (ρ₁ = 800 kg/m³) in evenwicht met een kolom water (ρ₂ = 1 000 kg/m³). Als de alcoholkolom 15,0 cm hoog is, hoe hoog is de waterkolom h₂ dan?',
                options: [
                    '12,0 cm (want h₂ = (800 · 15,0) / 1 000 = 12,0 cm)',
                    '18,75 cm',
                    '15,0 cm',
                    '8,0 cm'
                ],
                correct: 0,
                explanation: 'ρ₁ · h₁ = ρ₂ · h₂ ⇒ h₂ = (ρ₁ · h₁) / ρ₂ = (800 · 15,0) / 1 000 = 12,0 cm.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Bij een hydraulische garagekrik heeft de kleine pompzuiger een diameter van 2,0 cm en de grote hefzuiger een diameter van 10,0 cm (5x groter). Met welke factor wordt de uitgeoefende kracht vermenigvuldigd?',
                options: [
                    'Factor 25 (want factor 5² = 25)',
                    'Factor 5',
                    'Factor 10',
                    'Factor 50'
                ],
                correct: 0,
                explanation: 'De oppervlakteverhouding is (d₂ / d₁)² = (10 / 2)² = 5² = 25. De hefkracht is 25 keer zo groot als de ingangskracht.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Op een patrijspoort van 0,050 m² op 20 m diepte in zoet water (ρ = 1 000 kg/m³, g = 9,81 N/kg) heerst een hydrostatische druk van circa 196 kPa. Hoe groot is de netto naar binnen gerichte kracht?',
                options: [
                    'F_netto = 9,8 · 10³ N (9 810 N)',
                    'F_netto = 196 N',
                    'F_netto = 1,96 · 10⁵ N',
                    'F_netto = 98 N'
                ],
                correct: 0,
                explanation: 'F_netto = p_hydr · A = 196 200 Pa · 0,050 m² = 9 810 N = 9,8 · 10³ N.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Wiskundig Inzicht & Reflectie',
                description: 'Leg uit waarom bij het afleiden van de U-buisformule ρ₁ · h₁ = ρ₂ · h₂ noch de atmosferische druk patm, noch de buisdiameter, noch de zwaarteveldsterkte g in de eindformule voorkomen.'
            }
        ]
    }
}
