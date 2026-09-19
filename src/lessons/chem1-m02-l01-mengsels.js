/**
 * Mengsels: Soorten — Chemie 1
 *
 * SKELETON. Chemie staat UIT op deze school (zie src/data/subjects.js).
 * Het bestand blijft bewaard zodat het vak opnieuw aangezet kan worden.
 */
export default {
    id: 'chem1-m02-l01-mengsels',
    subject: 'chemistry',
    className: '1de Middelbaar',
    title: 'Mengsels: Soorten',
    description: 'Soorten',
    config: {
        groenCode: 'M02L01',
        groenAntwoord: 'chemie',
        masterCode: 'wetenschappen',
        classId: '1A',
        textbook: 'Chemie 1'
    },
    goals: [
        'Ik kan mengsels beschrijven.',
        'Ik begrijp hoe mengsels werkt.'
    ],
    workbook: {
        title: 'Werkboek Oefeningen',
        subtitle: 'Chemie 1',
        instruction: '<p>Maak <strong>oefeningen X–X</strong> op pagina XX.</p>',
        formulaHint: 'Raadpleeg het handboek voor de volledige theorie.'
    },
    timeline: {
        stepA: { step: 'A', title: 'Instap', time: '15 min', cards: [
            { id: 'card-entry', type: 'digital', title: 'Diagnostische Toets',
              description: 'Wat weet je al?', action: 'entry-ticket', icon: 'PhQuestion' },
            { id: 'card-pres-a', type: 'class', title: 'Inleidende Instructie',
              description: 'Korte theorie.', action: 'presentation', slidesKey: 'slidesA' }
        ]},
        stepB: { step: 'B', title: 'Verwerken', time: '30 min', cards: [
            { id: 'card-pres-b', type: 'class', title: 'Uitgebreide Theorie',
              description: 'Stap voor stap.', action: 'presentation', slidesKey: 'slidesB' },
            { id: 'card-workbook', type: 'paper', title: 'Boek Oefeningen',
              description: 'Maak oefeningen.', action: 'workbook', icon: 'PhBookOpen' },
            { id: 'card-activity', type: 'digital', title: 'Interactieve Verwerking',
              description: 'Visuele verkenning.', action: 'activity', activityId: 'main', icon: 'PhShapes' }
        ]},
        stepC: { step: 'C', title: 'Afsluiting', time: '5 min', cards: [
            { id: 'card-pres-c', type: 'class', title: 'Samenvatting',
              description: 'Kern van de les.', action: 'presentation', slidesKey: 'slidesC' },
            { id: 'card-exit', type: 'digital', title: 'Exit Ticket',
              description: 'Reflectie.', action: 'exit-ticket', icon: 'PhTarget' }
        ]}
    },
    activities: {
        main: { type: 'dragDrop', title: 'Mengsels: begrippen koppelen' }
    },
    slidesA: [
        { layout: 'title', title: 'Mengsels', subtitle: 'Soorten', badge: 'Chemie', icon: 'function' },
        { layout: 'steps', title: 'Wat ga je leren?', steps: [
            { icon: 'function', text: 'Ik kan mengsels beschrijven.' }
        ]}
    ],
    slidesB: [
        { layout: 'definition', term: 'Mengsels', definition: 'TODO' },
        { layout: 'multichoice', title: 'Check', question: 'TODO', options: [
            { id: 'A', text: 'TODO A', correct: false },
            { id: 'B', text: 'TODO B', correct: true }
        ], explanation: 'TODO' }
    ],
    slidesC: [
        { layout: 'summary', title: 'Samenvatting', items: ['TODO'] },
        { layout: 'celebration', title: 'Klaar!', subtitle: 'Goed gewerkt.' }
    ],
    entryTicket: { questions: [
        { id: 'en1', type: 'mc', question: 'TODO?', options: ['A', 'B', 'C'], correct: 0 }
    ] },
    exitTicket: { questions: [
        { id: 'ex1', type: 'mc', question: 'TODO?', options: ['A', 'B', 'C'], correct: 0 }
    ] }
}
