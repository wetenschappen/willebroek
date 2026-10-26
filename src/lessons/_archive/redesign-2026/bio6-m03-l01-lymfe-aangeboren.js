export default {

    // ─── 1. METADATA ────────────────────────────────────────────────────────────
    id: 'bio6-m03-l01-lymfe-aangeboren',
    subject: 'biology',
    className: '6de Middelbaar',

    // ─── 2. CONFIG ──────────────────────────────────────────────────────────────
    config: {
        title: 'Lymfe en Aangeboren Afweer',
        description: 'Het lymfestelsel, de mechanische barrières en de niet-specifieke (aangeboren) afweer.',
        groenCode: 'B6M3L1',
        groenAntwoord: 'biologie',
        masterCode: 'wetenschappen',
        classId: '6MOWE+6SPOWE',
        textbook: 'WACO 6 Biologie',
    },

    // ─── 3. GOALS ───────────────────────────────────────────────────────────────
    goals: [
        'Ik kan de delen van het lymfestelsel benoemen en hun functie beschrijven.',
        'Ik kan de eerste afweerlinie (mechanische en chemische barrières) toelichten.',
        'Ik beschrijf hoe de tweede afweerlinie (fagocytose en ontstekingsreactie) werkt na een weefselbeschadiging.'
    ],

    // ─── 4. WORKBOOK ────────────────────────────────────────────────────────────
    workbook: {
        title: 'Oefeningen Aangeboren Afweer',
        subtitle: 'Thema 3: Immuniteit',
        exercises: [
            { id: '1', number: '1', title: 'Het lymfestelsel', page: '143' },
            { id: '2', number: '2', title: 'Bloedcellen', page: '144' }
        ]
    },

    // ─── 5. TIMELINE ────────────────────────────────────────────────────────────
    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Toets',
                    description: 'Wat weet je nog over het bloed?',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Inleidende Instructie',
                    description: 'Het bloed en het lymfestelsel.',
                    action: 'presentation',
                    slidesKey: 'slidesA'
                }
            ]
        },

        stepB: {
            step: 'B', title: 'Verwerken', time: '30 min',
            cards: [
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactieve Verwerking',
                    description: 'Simulatie: Ontsteking & Fagocytose.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhShapes'
                },
                {
                    id: 'card-pres-b',
                    type: 'class',
                    title: 'Uitgebreide Theorie',
                    description: 'De eerste en tweede afweerlinie in detail.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Boek Oefeningen',
                    description: 'Maak de oefeningen over de theorie.',
                    action: 'workbook',
                    icon: 'PhBookOpen',
                    exercises: [
                        { id: '1', number: '1', title: 'Het lymfestelsel', page: '143' },
                        { id: '2', number: '2', title: 'Bloedcellen', page: '144' }
                    ]
                }
            ]
        },

        stepC: {
            step: 'C', title: 'Afsluiting', time: '5 min',
            cards: [
                {
                    id: 'card-pres-c',
                    type: 'class',
                    title: 'Samenvatting',
                    description: 'De kern van de les.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: 'Controleer je kennis.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    // ─── 6. ACTIVITIES ──────────────────────────────────────────────────────────
    activities: {
        main: {
            type: 'phagocytosisLab',
            title: 'Labo: Ontsteking en Fagocytose'
        }
    },

    // ─── 7. SLIDES ──────────────────────────────────────────────────────────────
    slidesA: [
        { layout: 'title', title: 'Lymfe en Aangeboren Afweer', subtitle: 'Thema 3 - Immuniteit', badge: 'Biologie', icon: 'shield-check' },
        { layout: 'steps', title: 'Wat ga je leren?', steps: [
            { icon: 'drop', text: 'Het lymfestelsel begrijpen' },
            { icon: 'shield', text: 'De eerste afweerlinie: onze lichaamsbarrières' },
            { icon: 'bug', text: 'De tweede afweerlinie: ontsteking en fagocytose' }
        ]},
        { layout: 'predict', title: 'Wat weet je al?', question: 'Welke bloedcellen zijn primair verantwoordelijk voor onze afweer?', hint: 'Denk aan de kleuren van bloedcellen...', revealText: 'De witte bloedcellen (leukocyten)' }
    ],

    slidesB: [
        { layout: 'comparison', title: '1. Het Lymfestelsel', left: { title: 'Lymfevaten', content: 'Vervoeren lymfe (weefselvocht) terug naar de bloedbaan.' }, right: { title: 'Lymfeorganen', content: 'Lymfeknopen, milt en zwezerik (thymus) filteren pathogenen en produceren witte bloedcellen.' } },
        { layout: 'big', title: 'Drie afweerlinies', subtitle: 'Ons immuunsysteem heeft 3 verdedigingslinies.', text: '1ste linie: Fysiek en chemisch (aangeboren)<br>2de linie: Fagocytose & Ontsteking (aangeboren)<br>3de linie: Specifieke immuniteit (verworven)' },
        { layout: 'steps', title: '2. De Eerste Afweerlinie', steps: [
            { icon: 'shield', text: '<strong>Fysisch:</strong> Huid en slijmvliezen (fysieke barrière).' },
            { icon: 'flask', text: '<strong>Chemisch:</strong> Maagzuur (lage pH) en lysozymen (enzymen in tranen/speeksel).' },
            { icon: 'bug', text: '<strong>Microbioom:</strong> Goede bacteriën (bv. darmflora) concurreren met pathogenen.' }
        ]},
        { layout: 'comparison', title: '3. De Tweede Afweerlinie', left: { title: 'Fagocytose', content: 'Witte bloedcellen (macrofagen, neutrofielen) "eten" de indringers op via schijnvoetjes (pseudopodiën).' }, right: { title: 'Ontsteking', content: 'Reactie op weefselschade. Gekenmerkt door roodheid, warmte, zwelling en pijn.' } },
        { layout: 'worked-example', title: 'Hoe werkt een ontsteking?', problem: 'Wat gebeurt er precies als je een splinter in je vinger krijgt?', steps: [
            { label: 'Histamine', content: 'Mestcellen geven histamine vrij, wat de bloedvaten wijder maakt (roodheid & warmte).' },
            { label: 'Vochtuittreding', content: 'Bloedvaten worden meer doorlaatbaar, er treedt vocht uit (zwelling & pijn).' },
            { label: 'Diapedese', content: 'Witte bloedcellen kruipen uit de bloedbaan naar het weefsel.' },
            { label: 'Fagocytose', content: 'Macrofagen ruimen de bacteriën en afgestorven cellen (etter/pus) op.' }
        ], answer: 'Een perfect gecoördineerde lokale afweerreactie!' }
    ],

    slidesC: [
        { layout: 'summary', title: 'Samenvatting', items: [
            'Het lymfestelsel helpt bij vochtbalans en afweer.',
            'De 1ste afweerlinie houdt indringers buiten (huid, lysozymen, microbioom).',
            'De 2de afweerlinie valt snel aan via ontsteking (histamine) en fagocytose.'
        ]},
        { layout: 'closing', title: 'Einde van de les', subtitle: 'Je kent nu de aangeboren afweer.', stats: [{ label: 'Thema', value: '3' }] }
    ],

    // ─── 8. TICKETS ─────────────────────────────────────────────────────────────

    entryTicket: {
        questions: [
            { id: 'en1', type: 'mc', question: 'Welk bestanddeel van ons bloed speelt de belangrijkste rol in het immuunsysteem?',
              options: ['Rode bloedcellen', 'Witte bloedcellen', 'Bloedplaatjes', 'Bloedplasma'], correct: 1 }
        ]
    },

    exitTicket: {
        questions: [
            { id: 'ex1', type: 'mc', question: 'Wat is het gevolg van histamine-vrijgave bij een ontsteking?',
              options: ['Het vernauwt de bloedvaten.', 'Het trekt extra rode bloedcellen aan.', 'Het maakt bloedvaten wijder en meer doorlaatbaar.', 'Het breekt direct bacteriën af.'], correct: 2 },
            { id: 'ex2', type: 'mc', question: 'Tot welke afweerlinie behoort het maagzuur?',
              options: ['De eerste afweerlinie', 'De tweede afweerlinie', 'De derde afweerlinie'], correct: 0 }
        ]
    }
}
