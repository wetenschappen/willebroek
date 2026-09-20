/**
 * Ecosystemen: Voedselketens — Biologie 2
 *
 * SKELETON: alle structuur staat klaar (ABC-timeline, slides, tickets).
 * Vervang elke TODO door echte inhoud. Zie AGENTS.md voor de lesopbouw.
 */
export default {
    // ─── 1. METADATA ──────────────────────────────────────────────────────────
    id: 'bio2-m02-l01-ecosysteem',
    subject: 'biology',
    className: '2de Middelbaar',
    title: 'Ecosystemen: Voedselketens',
    description: 'Voedselketens',

    // ─── 2. CONFIG ────────────────────────────────────────────────────────────
    config: {
        groenCode: 'M02L01',
        groenAntwoord: 'biologie',
        masterCode: 'wetenschappen',
        classId: '2A',
        textbook: 'Biologie 2'
    },

    // ─── 3. GOALS ─────────────────────────────────────────────────────────────
    goals: [
        'Ik kan ecosystemen beschrijven.',
        'Ik begrijp hoe ecosystemen werkt.',
        'Ik pas ecosystemen toe op een nieuw voorbeeld.'
    ],

    // ─── 4. WORKBOOK ──────────────────────────────────────────────────────────
    workbook: {
        title: 'Werkboek Oefeningen',
        subtitle: 'Biologie 2',
        instruction: '<p>Maak <strong>oefeningen X–X</strong> op pagina XX.</p>',
        formulaHint: 'Raadpleeg het handboek voor de volledige theorie.'
    },

    // ─── 5. TIMELINE ──────────────────────────────────────────────────────────
    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                { id: 'card-entry', type: 'digital', title: 'Diagnostische Toets',
                  description: 'Wat weet je al over ecosystemen?', action: 'entry-ticket', icon: 'PhQuestion' },
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
        main: { type: 'dragDrop', title: 'Ecosystemen: begrippen koppelen' },
        mixedRetrieval: { type: 'mixedRetrieval', title: 'Gemengde Herhaling' }
    },

    // ─── 7. SLIDES ────────────────────────────────────────────────────────────
    slidesA: [
        { layout: 'title', title: 'Ecosystemen', subtitle: 'Voedselketens', badge: 'Biologie', icon: 'function' },
        { layout: 'steps', title: 'Wat ga je leren?', steps: [
            { icon: 'function', text: 'Ik kan ecosystemen beschrijven.' },
            { icon: 'function', text: 'Ik begrijp hoe ecosystemen werkt.' }
        ]},
        { layout: 'predict', title: 'Wat weet je al?', question: 'Wat weet je al over ecosystemen?',
          hint: 'Denk aan wat je eerder zag.', revealText: 'TODO: antwoord invullen.' }
    ],

    slidesB: [
        { layout: 'definition', term: 'Ecosystemen', definition: 'TODO: definitie invullen.' },
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
        { layout: 'closing', title: 'Einde van de les', subtitle: 'Je hebt deze les afgerond.',
          stats: [{ label: 'Module', value: '02' }] }
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
              description: 'Leg in je eigen woorden uit wat je vandaag leerde over ecosystemen.' }
        ]
    }
}
