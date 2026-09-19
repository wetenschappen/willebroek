/**
 * Magnetisme: Velden — Fysica 3
 *
 * SKELETON: alle structuur staat klaar (ABC-timeline, slides, tickets).
 * Vervang elke TODO door echte inhoud. Zie AGENTS.md voor de lesopbouw.
 */
export default {
    // ─── 1. METADATA ──────────────────────────────────────────────────────────
    id: 'fys3-m02-l01-magnetisme',
    subject: 'physics',
    className: '3de Middelbaar',
    title: 'Magnetisme: Velden',
    description: 'Velden',

    // ─── 2. CONFIG ────────────────────────────────────────────────────────────
    config: {
        groenCode: 'M02L01',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NWa',
        textbook: 'Fysica 3'
    },

    // ─── 3. GOALS ─────────────────────────────────────────────────────────────
    goals: [
        'Ik kan magnetisme beschrijven.',
        'Ik begrijp hoe magnetisme werkt.',
        'Ik pas magnetisme toe op een nieuw voorbeeld.'
    ],

    // ─── 4. WORKBOOK ──────────────────────────────────────────────────────────
    workbook: {
        title: 'Werkboek Oefeningen',
        subtitle: 'Fysica 3',
        instruction: '<p>Maak <strong>oefeningen X–X</strong> op pagina XX.</p>',
        formulaHint: 'Raadpleeg het handboek voor de volledige theorie.'
    },

    // ─── 5. TIMELINE ──────────────────────────────────────────────────────────
    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                { id: 'card-entry', type: 'digital', title: 'Diagnostische Toets',
                  description: 'Wat weet je al over magnetisme?', action: 'entry-ticket', icon: 'PhQuestion' },
                { id: 'card-pres-a', type: 'class', title: 'Inleidende Instructie',
                  description: 'Korte theorie.', action: 'presentation', slidesKey: 'slidesA' }
            ]
        },
        stepB: {
            step: 'B', title: 'Verwerken', time: '30 min',
            cards: [
                { id: 'card-pres-b', type: 'class', title: 'Uitgebreide Theorie',
                  description: 'Stap voor stap uitgewerkt.', action: 'presentation', slidesKey: 'slidesB' },
                { id: 'card-workbook', type: 'paper', title: 'Boek Oefeningen',
                  description: 'Maak oefeningen in het handboek.', action: 'workbook', icon: 'PhBookOpen' },
                { id: 'card-activity', type: 'digital', title: 'Interactieve Verwerking',
                  description: 'Visuele verkenning.', action: 'activity', activityId: 'main', icon: 'PhShapes' }
            ],
            extraActivities: [
                { id: 'mixedRetrieval', title: 'Gemengde Herhaling', category: 'Herhaling', icon: 'PhArrowsClockwise' }
            ]
        },
        stepC: {
            step: 'C', title: 'Afsluiting', time: '5 min',
            cards: [
                { id: 'card-pres-c', type: 'class', title: 'Samenvatting',
                  description: 'Kern van de les.', action: 'presentation', slidesKey: 'slidesC' },
                { id: 'card-exit', type: 'digital', title: 'Exit Ticket',
                  description: 'Reflectie op de les.', action: 'exit-ticket', icon: 'PhTarget' }
            ]
        }
    },

    // ─── 6. ACTIVITIES ────────────────────────────────────────────────────────
    activities: {
        main: { type: 'dragDrop', title: 'Magnetisme: begrippen koppelen' },
        mixedRetrieval: { type: 'mixedRetrieval', title: 'Gemengde Herhaling' }
    },

    // ─── 7. SLIDES ────────────────────────────────────────────────────────────
    slidesA: [
        { layout: 'title', title: 'Magnetisme', subtitle: 'Velden', badge: 'Fysica', icon: 'function' },
        { layout: 'steps', title: 'Wat ga je leren?', steps: [
            { icon: 'function', text: 'Ik kan magnetisme beschrijven.' },
            { icon: 'function', text: 'Ik begrijp hoe magnetisme werkt.' }
        ]},
        { layout: 'predict', title: 'Wat weet je al?', question: 'Wat weet je al over magnetisme?',
          hint: 'Denk aan wat je eerder zag.', revealText: 'TODO: antwoord invullen.' }
    ],

    slidesB: [
        { layout: 'definition', term: 'Magnetisme', definition: 'TODO: definitie invullen.' },
        { layout: 'worked-example', title: 'Voorbeeld', steps: [
            { label: 'Gegeven',   content: 'TODO' },
            { label: 'Stap 1',    content: 'TODO' },
            { label: 'Oplossing', content: 'TODO' }
        ]},
        { layout: 'multichoice', title: 'Check', question: 'TODO: vraag invullen.', options: [
            { id: 'A', text: 'TODO optie A', correct: false },
            { id: 'B', text: 'TODO optie B', correct: true }
        ], explanation: 'TODO: uitleg invullen.' }
    ],

    slidesC: [
        { layout: 'summary', title: 'Samenvatting', items: [
            'TODO: kernpunt 1',
            'TODO: kernpunt 2'
        ]},
        { layout: 'celebration', title: 'Klaar!', subtitle: 'Goed gewerkt vandaag.',
          stats: [{ label: 'Module', value: '02' }, { label: 'Status', value: 'TOP' }] }
    ],

    // ─── 8. TICKETS ───────────────────────────────────────────────────────────
    entryTicket: {
        questions: [
            { id: 'en1', type: 'mc', question: 'TODO: voorkennisvraag?',
              options: ['TODO A', 'TODO B', 'TODO C'], correct: 0 }
        ]
    },

    exitTicket: {
        questions: [
            { id: 'ex1', type: 'mc', question: 'TODO: leerdoelvraag?',
              options: ['TODO A', 'TODO B', 'TODO C'], correct: 0 },
            { id: 'ex2', type: 'open', question: 'Reflectie',
              description: 'Leg in je eigen woorden uit wat je vandaag leerde over magnetisme.' }
        ]
    }
}
