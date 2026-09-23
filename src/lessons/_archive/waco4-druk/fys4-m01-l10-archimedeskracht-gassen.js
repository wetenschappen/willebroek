/**
 * Archimedeskracht in gassen & Themasynthese Druk - Fysica 4
 * Vak: Fysica (2u) | Klas: 4NAWE+4SPOWE
 * Thema 1: Druk | Hoofdstuk 4: Archimedeskracht (Les 2/2)
 * Handboek: WACO 4 Fysica 2u (Thema 1, p. 70-85)
 * Leerplan GO!: BV2_06.50, BV2_06.51, BV2_06.40, WD2_11.01.04.01
 */

export default {
    id: 'fys4-m01-l10-archimedeskracht-gassen',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    title: 'Archimedeskracht in Gassen & Themasynthese Druk',
    description: 'Opwaartse stuwkracht in gassen, heteluchtballonnen, hefkrachtberekeningen en de complete themasynthese over vaste stoffen, vloeistoffen en gassen ter voorbereiding op het proefwerk.',

    config: {
        groenCode: 'F4M01L10',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, p. 70-85)'
    },

    goals: [
        'Ik kan verklaren dat een voorwerp in een gas een opwaartse archimedeskracht ondervindt gelijk aan het gewicht van het verplaatste gas: FA = ρ_gas · g · V.',
        'Ik kan de werking van een heteluchtballon en een heliumballon verklaren aan de hand van dichtheidsverschillen en de hefkracht F_netto = FA - Fz.',
        'Ik kan vraagstukken oplossen over het maximale draagvermogen en de hefkracht van ballonnen.',
        'Ik beheers de complete synthese van Thema 1 Druk: vaste stoffen (p = F/A), vloeistoffen (p_hydr, Pascal, vaten) en gassen (atmosfeer, manometers, Archimedes).'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4',
        subtitle: 'Thema 1: Druk - Hoofdstuk 4: Archimedes in Gassen & Themasynthese (p. 70-85)',
        instruction: '<p>Bestudeer in je leerwerkboek op <strong>pagina 70-74</strong> de heteluchtballon en de synthesekaarten op <strong>pagina 76-80</strong>. Maak in de oefeningenbundel op <strong>pagina 25-27 oefeningen 17, 18, 19 en de syntheseoefeningen</strong>.</p>',
        formulaHint: 'Formules: \\( F_A = \\rho_{\\text{lucht}} \\cdot g \\cdot V \\). Hefkracht: \\( F_{\\text{hef}} = F_A - F_{z,\\text{totaal}} \\). Normdichtheid lucht: \\( \\rho_{\\text{lucht}} \= 1{,}29\\text{ kg/m}^3 \\).'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Voorkennis',
                    description: 'Voorkennis over de wet van Archimedes, massadichtheid van gassen en krachtenbalans.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Verwondering: Een Kolos in de Lucht',
                    description: 'Hoe kan een heteluchtballon van 3 000 m³ met een zware mand en 6 passagiers zomaar opstijgen?',
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
                    title: 'Archimedes in Gassen & Themasynthese',
                    description: 'Hefkracht heteluchtballonnen, heliumballonnen en het grote integrale overzicht van Thema 1 Druk.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Werkboek Opgaven',
                    description: 'WACO 4 oefeningen 17 t.e.m. 19 en themasynthese (oefenbundel p. 25-27).',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: krachten in gassen',
                    description: 'Onderzoek opwaartse stuwkracht in gassen en hefkracht.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Formule- & Domeinoverzicht Druk',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Examentraining Thema 1 Druk',
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
                    title: 'Eindsynthese Thema 1 Druk',
                    description: 'Felicitaties! Je beheerst nu de volledige fysica van vaste stoffen, vloeistoffen en gassen.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Formatieve eindtoets over Archimedes in gassen en de thematische hoofdlijnen.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'forcesLab'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'De 4 Kernformules van Thema 1 Druk',
            instruction: 'Koppel de formule aan haar voorwaarden en toepassingsgebied.',
            pairs: [
                { term: 'p = F / A', definition: 'Definitie van druk voor vaste stoffen en contactvlakken (in Pa = N/m²)' },
                { term: 'p_hydr = ρ · g · h', definition: 'Vloeistofdruk in een rustende vloeistofkolom (onafhankelijk van vatvorm)' },
                { term: 'F₁ / A₁ = F₂ / A₂', definition: 'Hydraulische hefbrug en remmen (gelijke druk aan ingangs- en uitgangszuiger)' },
                { term: 'FA = ρ_medium · g · V', definition: 'Wet van Archimedes in zowel vloeistoffen als gassen' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Grote Proefwerktraining Thema 1 Druk (WACO 4)',
            questions: [
                {
                    q: 'Een heteluchtballon heeft een volume van 2 500 m³. De koude buitenlucht heeft een dichtheid van 1,25 kg/m³ en de hete lucht in de ballon 0,95 kg/m³ (g = 9,81 N/kg). Hoe groot is de maximale massa van de ballonmantel, mand en passagiers die de ballon net kan laten zweven?',
                    a: [
                        '750 kg (want Δρ = 1,25 - 0,95 = 0,30 kg/m³; m_max = Δρ · V = 0,30 · 2 500 = 750 kg)',
                        '3 125 kg',
                        '2 375 kg',
                        '150 kg'
                    ],
                    c: 0
                },
                {
                    q: 'Waarom stijgt een met helium gevulde feestballon spontaan op in de lucht, maar een met ademlucht opgeblazen ballon niet?',
                    a: [
                        'Omdat helium een veel lagere massadichtheid heeft (0,18 kg/m³) dan lucht (1,29 kg/m³), waardoor FA > Fz. Uitgeademde lucht bevat zwaarder CO₂ en waterdamp.',
                        'Omdat helium elektrisch geladen is.',
                        'Omdat de atmosfeer helium aantrekt en gewone lucht afstoot.',
                        'Omdat helium warm is en adem koud.'
                    ],
                    c: 0
                },
                {
                    q: 'Welke van de volgende stellingen over Archimedes in gassen is JUIST volgens WACO 4?',
                    a: [
                        'De formule FA = m_gas · g is een juiste formule voor de archimedeskracht in een gas.',
                        'Een voorwerp omgeven door een gas ondervindt een kracht gelijk aan de massa van het verplaatste gas.',
                        'Als ρ_gas < ρ_voorwerp zal het voorwerp opstijgen in het gas.',
                        'De archimedeskracht in een gas is omgekeerd evenredig met het verplaatste gasvolume.'
                    ],
                    c: 0
                },
                {
                    q: 'Wat is de relatie tussen 1 hectopascal (hPa), 1 millibar (mbar) en 1 pascal (Pa)?',
                    a: [
                        '1 hPa = 1 mbar = 100 Pa',
                        '1 hPa = 100 mbar = 1 Pa',
                        '1 hPa = 1 bar = 100 000 Pa',
                        '1 mbar = 1 000 Pa'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Archimedes in Gassen & Synthese',
            subtitle: 'Ballonnen, hefkracht en de themasynthese van Druk (WACO 4 p. 70-85)',
            badge: 'Fysica 4 - Les 10',
            icon: 'function'
        },
        {
            layout: 'steps',
            title: 'Wat leer je in deze les?',
            steps: [
                { icon: 'function', text: 'De wet van Archimedes uitbreiden naar gassen en de atmosfeer.' },
                { icon: 'function', text: 'Het fysische mechanisme achter hetelucht- en heliumballonnen verklaren.' },
                { icon: 'function', text: 'Kwantitatieve berekeningen maken over hefkracht en maximale payload.' },
                { icon: 'function', text: 'De complete synthese van Thema 1 Druk integreren ter voorbereiding op evaluatie.' }
            ]
        },
        {
            layout: 'predict',
            title: 'Verwondering: Een Kolos in de Lucht',
            question: 'Een heteluchtballon heeft een volume van 3 000 m³ en weegt inclusief gasbrander, mand en 5 personen meer dan 1 200 kg. Wanneer de piloot de gasbrander ontsteekt, stijgt deze reusachtige massa majestueus op in de lucht. Waardoor ontstaat die opwaartse beweging?',
            hint: 'Denk aan de dichtheid van lucht: wat gebeurt er met lucht als je haar verwarmt?',
            revealText: 'Warme lucht zet uit, waardoor er minder deeltjes per m³ zitten en de dichtheid daalt! De omringende koude buitenlucht weegt meer per m³ dan de hete lucht in de ballon. Het gewicht van de verplaatste koude buitenlucht (de archimedeskracht FA) is groter dan het totale gewicht van de ballon met hete lucht, waardoor de ballon opstijgt!'
        },
        {
            layout: 'properties',
            title: 'Voorkennis: Dichtheden van Gassen (bij 0°C, 1 atm)',
            items: [
                { label: 'Koude lucht (0°C)', value: 'ρ = 1,29 kg/m³.' },
                { label: 'Kamerlucht (20°C)', value: 'ρ = 1,20 kg/m³.' },
                { label: 'Hete lucht in ballon (~100°C)', value: 'ρ = 0,95 kg/m³ (fors lichter dan buitenlucht!).' },
                { label: 'Heliumgas (He)', value: 'ρ = 0,18 kg/m³ (zeer licht, niet brandbaar).' }
            ]
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'De Wet van Archimedes in Gassen',
            definition: 'Een voorwerp dat omgeven is door een gas, ondervindt een opwaarts gerichte archimedeskracht FA die gelijk is aan het GEWICHT van het verplaatste volume gas: \\( F_A = m_{\\text{gas, verplaatst}} \\cdot g = \\rho_{\\text{omringend gas}} \\cdot g \\cdot V \\).'
        },
        {
            layout: 'properties',
            title: 'Stijgen, Zweven en Dalen in de Lucht',
            items: [
                { label: 'Opstijgen (FA > Fz)', value: 'Wanneer de gemiddelde dichtheid van de ballon kleiner is dan de dichtheid van de omringende lucht (ρ_gem < ρ_lucht).' },
                { label: 'Zweven op hoogte (FA = Fz)', value: 'Op grote hoogte is de lucht ijler (ρ_lucht daalt). De ballon stijgt totdat FA exact gelijk is aan Fz.' },
                { label: 'Dalen (FA < Fz)', value: 'De piloot laat de lucht in de ballon afkoelen of trekt aan de parachute-klep bovenaan om hete lucht te laten ontsnappen.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Rekenvoorbeeld: Hefkracht van een Ballon (WACO 4 Oef. 18 p. 26)',
            problem: 'Volume ballon \\( V = 2\\,000\\text{ m}^3 \\); \\( \\rho_{\\text{buiten}} = 1{,}25\\text{ kg/m}^3 \\); \\( \\rho_{\\text{warm}} = 0{,}95\\text{ kg/m}^3 \\); \\( g = 9{,}81\\text{ N/kg} \\).',
            steps: [
                { label: 'Gegeven', content: 'Volume ballon \\( V = 2\\,000\\text{ m}^3 \\); \\( \\rho_{\\text{buiten}} = 1{,}25\\text{ kg/m}^3 \\); \\( \\rho_{\\text{warm}} = 0{,}95\\text{ kg/m}^3 \\); \\( g = 9{,}81\\text{ N/kg} \\).' },
                { label: 'Gevraagd', content: 'Nettokracht (hefkracht \\( F_{\\text{hef}} \\)) die beschikbaar is om mand, mantel en passagiers te tillen.' },
                { label: 'Stap 1: Archimedeskracht', content: '\\( F_A = \\rho_{\\text{buiten}} \\cdot g \\cdot V = 1{,}25\\text{ kg/m}^3 \\cdot 9{,}81\\text{ N/kg} \\cdot 2\\,000\\text{ m}^3 = 24\\,525\\text{ N} \\)' },
                { label: 'Stap 2: Gewicht hete lucht', content: '\\( F_{z,\\text{lucht}} = \\rho_{\\text{warm}} \\cdot g \\cdot V = 0{,}95\\text{ kg/m}^3 \\cdot 9{,}81\\text{ N/kg} \\cdot 2\\,000\\text{ m}^3 = 18\\,639\\text{ N} \\)' },
                { label: 'Stap 3: Hefkracht berekenen', content: '\\( F_{\\text{hef}} = F_A - F_{z,\\text{lucht}} = 24\\,525\\text{ N} - 18\\,639\\text{ N} = 5\\,886\\text{ N} \= 5{,}9 \\cdot 10^3\\text{ N} \\)' },
                { label: 'Conclusie', content: 'De ballon kan een nuttige massa tillen van \\( m = \\frac{5\\,886\\text{ N}}{9{,}81\\text{ N/kg}} = 600\\text{ kg} \\) (bv. mand, piloot en 5 passagiers)!' }
            ]
        },
        {
            layout: 'properties',
            title: 'Integrale Themasynthese: De 3 Domeinen van Druk',
            items: [
                { label: '1. Vaste stoffen', value: 'Druk p = F/A. Drukvergroting (kleine A: mes, naald) vs. drukverkleining (grote A: sneeuwschoen, rupsband).' },
                { label: '2. Gassen', value: 'Kinetisch botsingsmodel; atmosferische normdruk 1 013 hPa; barometers (atmosfeer) vs manometers (overdruk/onderdruk).' },
                { label: '3. Vloeistoffen', value: 'Hydrostatische druk p = ρ·g·h; hydrostatische paradox; totale druk p_tot = patm + ρ·g·h; communicerende vaten; wet van Pascal (F₁/A₁ = F₂/A₂).' },
                { label: '4. Archimedes', value: 'FA = ρ_medium · g · V_ond. Geldt in vloeistoffen (schepen, duikers) én gassen (heteluchtballonnen).' }
            ]
        },
        {
            layout: 'multichoice',
            title: 'Klassikale Examentest (WACO 4 Synthese)',
            question: 'Welke fysische bewering is als enige VOLLEDIG JUIST over Thema 1 Druk?',
            options: [
                { id: 'A', text: 'De hydrostatische druk op de bodem van een vat hangt af van de totale vorm en hoeveelheid water.', correct: false },
                { id: 'B', text: 'De archimedeskracht op een ondergedompeld voorwerp is gelijk aan het gewicht van de verplaatste middenstof (FA = ρ_medium · g · V_ond).', correct: true },
                { id: 'C', text: 'Bij een hydraulische hefbrug win je zowel kracht als arbeid.', correct: false },
                { id: 'D', text: 'Gasdruk wordt veroorzaakt doordat gasmoleculen met hun gewicht op de bodem rusten.', correct: false }
            ],
            explanation: 'Optie B is de zuivere definitie van de wet van Archimedes. De andere opties bevatten klassieke valkuilen: bodemdruk hangt niet af van vatvorm (paradox), arbeid is behouden (geen energiewinst), en gasdruk ontstaat door botsingen, niet door deeltjesgewicht.'
        },
        {
            layout: 'properties',
            title: 'Examentips & Formule-checklist',
            items: [
                { label: 'Controleer altijd eenheden', value: 'Oppervlakten altijd naar m² (1 cm² = 10⁻⁴ m²); volumes naar m³ (1 dm³ = 10⁻³ m³ = 1 liter).' },
                { label: 'Let op de dichtheid', value: 'Bij Archimedes gebruik je de dichtheid van de omringende vloeistof of het gas, NOOIT die van het voorwerp zelf!' },
                { label: 'Totale druk niet vergeten', value: 'Vraagt een opgave naar de totale druk onder water? Tel er altijd patm (101 300 Pa) bij op!' }
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Afsluiting: Thema 1 Druk Voltooid',
            items: [
                '10 lesuren fysica doorlopen: van bakstenen op schuimrubber tot heteluchtballonnen.',
                'Alle GO! leerplandoelen en cesuurdoelen voor D-finaliteit Natuurwetenschappen zijn behandeld.',
                'Je beschikt over krachtige formules: p = F/A, p_hydr = ρ·g·h, F₁/A₁ = F₂/A₂ en FA = ρ·g·V.',
                'Je bent optimaal voorbereid op het thema-examen over Druk!'
            ]
        },
        {
            layout: 'closing',
            title: 'Proficiat!',
            subtitle: 'Thema 1 Druk voor 4NAWE+4SPOWE is hiermee integraal afgerond.',
            stats: [
                { label: 'Thema', value: '1 Druk' },
                { label: 'Hoofdstukken', value: '4' },
                { label: 'Lesuren', value: '10 van 10' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Geldt de wet van Archimedes ook voor voorwerpen die zich in de lucht bevinden?',
                options: [
                    'Ja, elk voorwerp omgeven door een gas ondervindt een opwaartse kracht gelijk aan het gewicht van het verplaatste gas.',
                    'Nee, Archimedes geldt uitsluitend voor vloeistoffen zoals water.',
                    'Alleen als het voorwerp zich in een vacuüm bevindt.',
                    'Alleen bij temperaturen onder nul graden Celsius.'
                ],
                correct: 0,
                explanation: 'Gassen zijn fluïda net zoals vloeistoffen. Elk lichaam in lucht verplaatst lucht en ondervindt daardoor een opwaartse archimedeskracht.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Waarom voel je de archimedeskracht van de lucht in het dagelijks leven bijna nooit op je lichaam?',
                options: [
                    'Omdat de dichtheid van lucht (ca. 1,2 kg/m³) heel klein is t.o.v. de dichtheid van een mens (ca. 1 000 kg/m³); FA is amper 1 newton.',
                    'Omdat de lucht geen zwaartekracht heeft.',
                    'Omdat mensen immuun zijn voor atmosferische krachten.',
                    'Omdat de luchtdeeltjes te snel bewegen.'
                ],
                correct: 0,
                explanation: 'Omdat lucht ongeveer 800x minder dicht is dan water, is de opwaartse kracht van lucht op een mens slechts circa 0,8 tot 1 N, wat verwaarloosbaar is t.o.v. ons gewicht (700 N).'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Wat gebeurt er met de massadichtheid van lucht wanneer je de lucht opwarmt?',
                options: [
                    'De dichtheid neemt af omdat de lucht uitzet (minder massa per m³).',
                    'De dichtheid neemt toe.',
                    'De dichtheid blijft exact gelijk.',
                    'De dichtheid wordt nul.'
                ],
                correct: 0,
                explanation: 'Door opwarming zetten gassen uit (thermische expansie). Hetzelfde volume bevat dan minder moleculen, waardoor de dichtheid daalt.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Welke gasdichtheid is het kleinst bij normale atmosferische omstandigheden?',
                options: [
                    'Heliumgas (0,18 kg/m³)',
                    'Koude lucht (1,29 kg/m³)',
                    'Koolstofdioxide (1,98 kg/m³)',
                    'Zuurstofgas (1,43 kg/m³)'
                ],
                correct: 0,
                explanation: 'Helium heeft na waterstof de kleinste atoommassa en dichtheid (0,18 kg/m³), waardoor heliumballonnen krachtig stijgen.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een weerballon heeft een volume van 10,0 m³ gevuld met helium. De omringende buitenlucht heeft een dichtheid van 1,20 kg/m³ (g = 9,81 N/kg). Hoe groot is de opwaartse archimedeskracht FA van de lucht op de ballon?',
                options: [
                    'FA = 118 N (want FA = ρ_lucht · g · V = 1,20 · 9,81 · 10,0 = 117,7 N)',
                    'FA = 17,7 N',
                    'FA = 10,0 N',
                    'FA = 1 180 N'
                ],
                correct: 0,
                explanation: 'FA = ρ_lucht · g · V = 1,20 kg/m³ · 9,81 N/kg · 10,0 m³ = 117,72 N = 118 N.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Wanneer zal een luchtballon stoppen met stijgen en op een bepaalde hoogte blijven zweven?',
                options: [
                    'Wanneer de ballon de grens van de dampkring bereikt.',
                    'Wanneer de dichtheid van de steeds ijler wordende buitenlucht zo ver gedaald is dat FA exact gelijk is geworden aan het totale gewicht Fz van de ballon.',
                    'Wanneer de zwaartekracht plots wegvalt.',
                    'Wanneer de gasbrander uitgeblazen wordt door de wind.'
                ],
                correct: 1,
                explanation: 'Omdat luchtdichtheid met de hoogte afneemt, wordt FA op grote hoogte kleiner. De ballon zweeft zodra FA = Fz.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Welke formule gebruik je om de totale druk op een duiker op 15 m diepte in de oceaan te berekenen?',
                options: [
                    'p_tot = patm + ρ · g · h',
                    'p = F / A',
                    'FA = ρ · g · V',
                    'F₁ / A₁ = F₂ / A₂'
                ],
                correct: 0,
                explanation: 'De totale druk onder water is de som van de atmosferische druk op het wateroppervlak en de hydrostatische druk van de waterlaag.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Eindreflectie Thema 1 Druk',
                description: 'Geef in drie zinnen een overkoepelende synthese: leg uit waarom het begrip druk fundamenteel anders werkt bij vaste stoffen (krachtoverdracht via oppervlak), vloeistoffen (onsamendrukbare hydrostatica en Pascal) en gassen (kinetische botsingen en samendrukbaarheid).'
            }
        ]
    }
}
