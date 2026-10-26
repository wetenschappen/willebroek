/**
 * Voorbeeldles - Fysica 4 (plaatsvervanger)
 * Vak: Fysica | Klas: 4NAWE + 4SPOWE
 * Datum: 01/10/2026
 *
 * Deze les is een plaatsvervanger om de moduleweergave met meerdere lessen
 * te bekijken. De inhoud is minimaal maar correct; vervang of verwijder
 * deze les zodra de echte les klaar is. Structuur volgt
 * src/lessons/_template.js en de gouden standaard exact.
 */

export default {
    id: 'fys4-m01-l02-voorbeeld',
    subject: 'physics',
    className: '4NAWE + 4SPOWE',
    date: '01/10/2026',
    title: 'Communicerende vaten',
    description: 'Onderzoek waarom vloeistof in communicerende vaten even hoog staat en pas het principe toe op waterpassen en sluizen.',

    config: {
        title: 'Communicerende vaten',
        description: 'Onderzoek waarom vloeistof in communicerende vaten even hoog staat en pas het principe toe op waterpassen en sluizen.',

        groenCode: 'F4M02',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '4NAWE+4SPOWE',
        date: '01/10/2026',
        textbook: 'WACO 4 Fysica 2u (Thema 1 Druk, hoofdstuk 4)'
    },

    goals: [
        'Ik kan uitleggen waarom een vloeistof in communicerende vaten overal even hoog staat.',
        'Ik kan met \\( p_{\\text{hydr}} = \\rho \\cdot g \\cdot h \\) beredeneren dat de vorm van het vat er niet toe doet.',
        'Ik kan een toepassing zoals de waterpas of de sluis beschrijven met het principe van communicerende vaten.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 4 (Thema 1 Druk)',
        subtitle: 'Hoofdstuk 4: Communicerende vaten (p. 36-37)',
        instruction: '<p>Maak de opdrachten bij communicerende vaten in je leerwerkboek. Gebruik de formule voor hydrostatische druk om je antwoorden te verantwoorden.</p>',
        formulaHint: 'Hydrostatische druk: \\( p_{\\text{hydr}} = \\rho \\cdot g \\cdot h \\). In verbonden vaten is \\( h \\) op dezelfde diepte gelijk, dus is ook de druk gelijk.'
    },

    timeline: {

        // ── STAP A: Instap (15 min) ───────────────────────────────────────────
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Wat weet je nog?',
                    description: 'Herinner je je de formule voor hydrostatische druk en de grootheden erin?',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Water dat gelijk loopt',
                    description: 'Van een theepot met korte tuit naar de vraag wanneer vloeistof even hoog staat.',
                    action: 'presentation',
                    slidesKey: 'slidesA'
                }
            ]
        },

        // ── STAP B: Verwerken (30 min) ────────────────────────────────────────
        stepB: {
            step: 'B', title: 'Verwerken', time: '30 min',
            cards: [
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Begrippen koppelen',
                    description: 'Koppel elk begrip aan de juiste uitleg over communicerende vaten.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhShapes'
                },
                {
                    id: 'card-pres-b',
                    type: 'class',
                    title: 'Communicerende vaten',
                    description: 'Waarom druk alleen van diepte afhangt en vaten dus samen even hoog staan.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Boekopdrachten WACO',
                    description: 'Maak de opdrachten over communicerende vaten in je leerwerkboek.',
                    action: 'workbook',
                    icon: 'PhBookOpen',
                    exercises: 'Opdracht 1 (p. 36): Leg uit waarom de vloeistof in alle vaten even hoog staat.\n' +
                               'Opdracht 2 (p. 36): Waterpas tussen twee kamers: waarom werkt dit?\n' +
                               'Opdracht 3 (p. 37): Sluis: bereken de druk op de sluisdeur op 4,0 m diepte.'
                }
            ]
        },

        // ── STAP C: Afsluiting (5 min) ────────────────────────────────────────
        stepC: {
            step: 'C', title: 'Afsluiting', time: '5 min',
            cards: [
                {
                    id: 'card-pres-c',
                    type: 'class',
                    title: 'Samenvatting',
                    description: 'De kern over communicerende vaten op een rij.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Reflectie op de les.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    // ─── ACTIVITIES ─────────────────────────────────────────────────────────
    activities: {
        main: {
            type: 'dragDrop',
            title: 'Communicerende vaten: begrippen',
            instruction: 'Sleep elk begrip naar de juiste uitleg.',
            pairs: [
                { term: 'Communicerende vaten', definition: 'Vaten die onderling verbonden zijn door de vloeistof' },
                { term: 'Gelijkpeil', definition: 'De vloeistof staat in alle vaten even hoog' },
                { term: 'Hydrostatische druk', definition: 'Druk door het gewicht van de vloeistof erboven' },
                { term: 'Waterpas', definition: 'Gereedschap dat met gelijkpeil werkt' }
            ]
        }
    },

    // ─── SLIDES ─────────────────────────────────────────────────────────────
    slidesA: [
        { layout: 'title', title: 'Communicerende vaten', subtitle: 'Waarom loopt water gelijk?', badge: 'Fysica', icon: 'function' },
        { layout: 'steps', title: 'Wat ga je leren?', steps: [
            { icon: 'function', text: 'Je legt uit waarom vloeistof in verbonden vaten even hoog staat.' },
            { icon: 'function', text: 'Je past het principe toe op een waterpas en een sluis.' }
        ]},
        { layout: 'predict', title: 'Wat denk je?', question: 'Je schenkt water in een theepot. Staat het water in de pot even hoog als in de tuit?', hint: 'Denk aan de druk op dezelfde diepte.', revealText: 'Ja: op dezelfde diepte is de druk gelijk, dus staat de vloeistof even hoog.' }
    ],

    slidesB: [
        { layout: 'definition', term: 'Communicerende vaten', definition: 'Vaten die onderling verbonden zijn, zodat de vloeistof kan doorstromen.' },
        { layout: 'definition', term: 'Gelijkpeil', definition: 'In rust staat de vloeistof in alle vaten even hoog, ongeacht de vorm van het vat.' },
        { layout: 'worked-example', title: 'Waarom even hoog?', steps: [
            { label: 'Vraag',    content: 'Waarom staat de vloeistof in beide vaten even hoog?' },
            { label: 'Redenering', content: 'Op dezelfde diepte h is de hydrostatische druk \\( \\rho \\cdot g \\cdot h \\) in beide vaten gelijk.' },
            { label: 'Besluit',  content: 'Een hoogteverschil zou een drukverschil geven, en de vloeistof stroomt tot de druk gelijk is.' }
        ]},
        { layout: 'multichoice', title: 'Check', question: 'Je hebt één smal en één breed vat verbonden. Waar staat het water het hoogst?', options: [
            { id: 'A', text: 'In het smalle vat, omdat er minder water drukt', correct: false },
            { id: 'B', text: 'Even hoog in beide vaten', correct: true },
            { id: 'C', text: 'In het brede vat, omdat er meer water staat', correct: false }
        ], explanation: 'De druk hangt alleen af van diepte en vloeistof, niet van de vorm of inhoud van het vat.' }
    ],

    slidesC: [
        { layout: 'summary', title: 'Samenvatting', items: [
            'In communicerende vaten staat een vloeistof in rust overal even hoog.',
            'De druk op een bepaalde diepte hangt alleen af van diepte en vloeistofdichtheid.',
            'Toepassingen: theepot, waterpas en sluis.'
        ]},
        { layout: 'closing', title: 'Einde van de les', subtitle: 'Je hebt deze les afgerond.',
          stats: [{ label: 'Thema', value: '4' }] }
    ],

    // ─── TICKETS ────────────────────────────────────────────────────────────
    entryTicket: {
        questions: [
            { id: 'en1', type: 'mc', question: 'Met welke formule bereken je de hydrostatische druk?',
              options: ['\\( p = F / A \\)', '\\( p = \\rho \\cdot g \\cdot h \\)', '\\( p = m \\cdot V \\)'], correct: 1 },
            { id: 'en2', type: 'mc', question: 'Welke grootheid hoort bij de eenheid kg/m³?',
              options: ['Druk', 'Dichtheid', 'Diepte'], correct: 1 }
        ]
    },

    exitTicket: {
        questions: [
            { id: 'ex1', type: 'mc', question: 'Waarom staat de vloeistof in communicerende vaten even hoog?',
              options: ['Omdat de vaten even groot zijn', 'Omdat de druk op dezelfde diepte gelijk is', 'Omdat de vloeistof haar gewicht verdeelt'], correct: 1 },
            { id: 'ex2', type: 'open', question: 'Noem één toepassing van communicerende vaten en leg uit hoe die werkt.',
              description: 'Gebruik het woord druk in je uitleg.' }
        ]
    }
}
