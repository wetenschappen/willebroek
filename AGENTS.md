# AGENTS.md — Digitaal Leerpad (Fysica & Biologie)

> Single source of truth for AI agents working on this project.
> Last updated: herfst 2026 — meerdere vakken + schoolconfiguratie

---

## Repo per school

Deze repo hoort bij **één school**: de mapnaam is meteen ook de URL
(`wetenschappen.github.io/<repo>/`). De repo wordt aan het einde van de
opdracht achtergelaten zodat leerlingen de lessen kunnen blijven herbezoeken —
er wordt dan niets meer gepusht.

**Bij het opstarten van een nieuwe school:** kopieer deze repo, hernoem de map,
zet `base` in `vite.config.js` op de nieuwe naam, en pas
`src/data/subjects.js` + `src/data/students.js` aan. Zie
`docs/SCHOOL-SETUP.md`.

---

## Project Overview

A **Vue 3 multi-subject lesson planner** for Belgian secondary education.
Students navigate **Vak → Jaar → Klas → Module → Les**, and the app renders an
interactive timeline of activities, presentations and exercises.

Currently **Fysica** en **Biologie** are active. Wiskunde, Chemie en
Natuurwetenschappen staan volledig in de repo maar zijn uitgeschakeld
(`src/data/subjects.js`) — opnieuw aanzetten is één boolean.

**Stack:** Vue 3 (Composition API) · Vue Router · Vite · Tailwind CSS v4 · KaTeX · mathjs · Phosphor Icons

---

## Dev Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```

---

## Architecture

### Routing Flow

```
/ (SubjectSelection)                       ← alleen actieve vakken
  └─► /:subject (YearSelection)            ← bv. /fysica
        └─► /:subject/year/:id/class (ClassSelection)
              └─► /:subject/year/:id/class/:classId (ModuleSelection)
                    └─► /les/:id (LessonView → LessonContent)
```

`/les/:id` heeft bewust géén vak in de URL: de les-id is uniek over alle vakken
heen, en `LessonView` bepaalt via de module-registry welk vak het is. Zo blijft
`module.subject` de enige bron van waarheid.

### Vakconfiguratie

`src/data/subjects.js` is de enige plek waar vakken aan/uit gaan:

```javascript
export const subjectState = {
  physics:   true,    // zichtbaar
  biology:   true,    // zichtbaar
  chemistry: false,   // in de repo, verborgen
  science:   false,   // in de repo, verborgen
  math:      false    // in de repo, verborgen
}
```

Bij het uitschakelen blijft alles staan: lessen, modules, activiteiten, thema.
De router blokkeert de slug en het vak verschijnt niet in de navigatie.
Lessen van een uitgeschakeld vak laden nog steeds als je de URL kent.

- `App.vue` is a **thin shell** — just `<router-view>` + background watermark.
- `LessonView.vue` dynamically imports the lesson: `import('../lessons/${id}.js')`
- `LessonContent.vue` is the main lesson orchestrator (timeline, modals, activities).
- Module registry lives in `src/data/modules.js` — **every lesson file must be registered here**.

### Key Files

```
src/
├── App.vue                        # Shell — watermerk + achtergrond per vak
├── main.js                        # Mounts app, imports KaTeX CSS, registers router
├── router/index.js                # Routes + bewaking van de vak-slug
├── data/
│   ├── subjects.js                # ★ VAKKEN AAN/UIT + thema per vak
│   ├── modules.js                 # Lesregistry (id, subject, title, year, …)
│   └── students.js                # Voornamen per klas + klassen per vak/jaar
├── views/
│   ├── SubjectSelection.vue       # Vakkenkiezer (alleen actieve vakken)
│   ├── YearSelection.vue          # Jaarkiezer, gefilterd op vak
│   ├── ClassSelection.vue         # Klassen per vak + jaar
│   ├── ModuleSelection.vue        # Lessenlijst, gegroepeerd per module
│   └── LessonView.vue             # Dynamic lesson loader
├── lessons/
│   ├── _template.js               # Template for new lessons
│   ├── nando3-m01-l01-symbolen.js # Example lesson
│   └── ...                        # nando3-m* and nando4-m* lessons
├── composables/
│   ├── useLesson.js               # Normalises lesson data, exposes config/timeline/goals
│   ├── useProgress.js             # localStorage-backed card progress
│   ├── useActivitySystem.js       # Activity registry + open/close/complete logic
│   └── useMathEngine.js           # Auto-processes math notation in all lesson strings
├── components/
│   ├── LessonContent.vue          # Main orchestrator (timeline, modals, keyboard)
│   ├── modals/
│   │   ├── PresentationModal.vue  # Full-screen slide deck
│   │   ├── WorkbookModal.vue      # Workbook instructions
│   │   ├── TicketModal.vue        # Entry + exit tickets (mode prop)
│   │   ├── SpotCheckModal.vue     # Spot check questions
│   │   └── SolutionsModal.vue     # Solutions viewer
│   ├── presentation/              # One Vue component per slide layout
│   │   └── Slide*.vue
│   └── activities/                # One Vue component per activity type
│       └── *.vue
```

---

## Adding a New Lesson

### Step 1: Create the lesson file

```bash
cp src/lessons/_template.js src/lessons/nando3-m07-l01-gelijkvormigheid.js
```

Fill in the lesson data (see format below).

### Step 2: Register in modules.js

```javascript
// src/data/modules.js
{
  id: 'fys3-m07-l01-weerstand',
  subject: 'physics',              // ← verplicht
  title: 'Elektriciteit: Weerstand',
  year: 3,
  grade: '3de Jaar Fysica',
  icon: PhLightning,
  color: 'text-indigo-600',
  bg: 'bg-indigo-50'
}
```

### Les-ID's per vak

| Vak | Prefix | Voorbeeld |
|---|---|---|
| Fysica | `fys<jr>-` | `fys3-m01-l02-stroomkringen` |
| Biologie | `bio<jr>-` | `bio4-m02-l01-immunologie` |
| Chemie | `chem<jr>-` | `chem2-m01-l01-reacties` |
| Natuurwetenschappen | `nw<jr>-` | `nw1-m01-l01-onderzoek` |
| Wiskunde | `nando<jr>-` / `lpd-` | `nando3-m16-l03-gegroepeerd` |

`ModuleSelection` groepeert lessen op `m(\d+)-l(\d+)` uit de id — dat werkt voor
alle bovenstaande prefixen.

That's it — `LessonView.vue` handles the rest via dynamic import.

---

## Lesson Data Format

```javascript
export default {
  // 1. METADATA (required)
  id: 'fys3-m01-l02-stroomkringen',       // Must match filename and modules.js entry
  subject: 'physics',                      // physics · biology · chemistry · science · math
  className: '3de Middelbaar',
  title: 'Elektriciteit: Stroomkringen',
  description: 'Serie- en parallelschakelingen',

  // 2. CONFIG (required)
  config: {
    groenCode: 'M01L2',            // Code shown on answer sheet
    groenAntwoord: 'fysica',       // Password to unlock teacher reveal (S key in presentation)
    masterCode: 'wetenschappen',   // Master override password
    classId: '3NWa',               // Key into src/data/students.js
    textbook: 'Nando 3 Module 07',
    cursusLink: 'https://albertshalaj.github.io/lesmateriaal',  // Optional: opens in Toolbox
    disciplineRules: [...],     // Optional: overrides discipline slide rules
    extraTools: [...],          // Optional: extra toolbox buttons
  },

  // 3. GOALS (recommended, array of strings)
  goals: [
    'Ik begrijp wat gelijkvormige figuren zijn.',
    'Ik kan de verhoudingsregel toepassen.'
  ],

  // 4. WORKBOOK (required)
  workbook: {
    title: 'Werkboek Oefeningen',
    subtitle: 'Module 07',
    instruction: '<p>Maak <strong>oefeningen 1–8</strong> op pagina 45.</p>',
    formulaHint: 'Raadpleeg het handboek voor de volledige theorie.'
  },

  // 5. TIMELINE (required)
  // Typically 3 steps: A (instap/diagnostisch), B (verwerken), C (samenvatting/exit)
  timeline: {
    stepA: {
      step: 'A', title: 'Instap', time: '15 min',
      cards: [
        { id: 'card-entry', type: 'digital', title: 'Diagnostische Toets',
          description: 'Wat weet je al?', action: 'entry-ticket', icon: 'PhQuestion' },
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
        { id: 'card-activity', type: 'digital', title: 'Interactieve Oefening',
          description: 'Visuele verkenning.', action: 'activity', activityId: 'similarity', icon: 'PhShapes' }
      ],
      // extraActivities is optional. The "Extra Materiaal" toggle always appears on step B.
      // If omitted, the panel shows "Geen extra materiaal beschikbaar".
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

  // 6. ACTIVITIES (required if cards reference them)
  activities: {
    similarity: { type: 'similarity', title: 'Gelijkvormigheid' },
    mixedRetrieval: { type: 'mixedRetrieval', title: 'Gemengde Herhaling' }
  },

  // 7. SLIDE ARRAYS (one per slidesKey used in timeline cards)
  slidesA: [
    { layout: 'title', title: 'Module 07', subtitle: 'Gelijkvormigheid', badge: 'Wiskunde', icon: 'function' },
    { layout: 'standard', title: 'Wat is gelijkvormigheid?', content: 'Twee figuren zijn gelijkvormig als...' }
  ],
  slidesB: [
    { layout: 'definition', term: 'Gelijkvormige figuren', definition: 'Figuren met dezelfde vorm maar...' },
    { layout: 'worked-example', title: 'Voorbeeld', steps: [
      { label: 'Stap 1', content: 'Schrijf de verhouding op.' },
      { label: 'Stap 2', content: 'Los op voor x.' }
    ]}
  ],
  slidesC: [
    { layout: 'summary', title: 'Samenvatting', items: ['Gelijkvormig = zelfde vorm, andere grootte.'] },
    { layout: 'celebration', title: 'Klaar!', subtitle: 'Goed gewerkt.' }
  ],

  // 8. TICKETS
  entryTicket: {
    questions: [
      { id: 'en1', type: 'mc', question: 'Zijn twee vierkanten altijd gelijkvormig?',
        options: ['Ja', 'Nee', 'Soms'], correct: 0 }
    ]
  },
  exitTicket: {
    questions: [
      { id: 'ex1', type: 'mc', question: 'Wat is de schaalfactor?',
        options: ['Verhouding van zijden', 'Oppervlakte', 'Hoeksom'], correct: 0 },
      { id: 'ex2', type: 'open', question: 'Open Vraag', description: 'Geef een voorbeeld van gelijkvormige figuren in het dagelijks leven.' }
    ]
  },

  // 9. SPOT CHECK (optional)
  spotCheck: {
    questions: [{ question: 'Noem twee gelijkvormige figuren.', answer: 'Bijv. twee cirkels, twee vierkanten.' }]
  }
}
```

---

## Card Actions

| Action | Effect | Extra fields |
|---|---|---|
| `presentation` | Opens `PresentationModal` with the specified slide array | `slidesKey` (default: `'slides'`) |
| `workbook` | Opens `WorkbookModal` | — |
| `exit-ticket` | Opens `TicketModal` in exit mode | — |
| `entry-ticket` | Opens `TicketModal` in entry mode | — |
| `activity` | Opens activity component | `activityId` (key in `activities`) |
| `external-link` | Opens URL in new tab + marks done | `url` |
| `custom` | Marks card as done only | — |

### Card Types (badge colour)

| Type | Badge | Use |
|---|---|---|
| `class` | Rood — Klassikaal | Teacher-led |
| `digital` | Blauw — Digitaal | Interactive / online |
| `paper` | Groen — Werkboek | Handboek exercises |
| `check` | Paars — Vastzetting | Tests / checks |

---

## Presentation Slides

### How It Works

- `PresentationModal.vue` renders slides full-screen (1920×1080 scaled to fit).
- Each layout is a separate component in `src/components/presentation/`.
- Math text (`\( ... \)`) in **all lesson strings** is auto-processed by `useMathEngine.js` — no manual KaTeX needed.
- The `discipline` slide is **auto-prepended** for the first presentation card of a lesson (or when `card.showDiscipline: true`).

### Keyboard Shortcuts (inside presentation)

| Key | Action |
|---|---|
| `→` / `Space` | Next slide (or reveal next step) |
| `←` | Previous slide (or un-reveal last step) |
| `S` | Reveal next step on `steps`, `exercise`, `worked-example`, `recap` — password-gated (`config.groenAntwoord`) |
| `Esc` / exit fullscreen | Close modal |

### All Supported Slide Layouts

#### General layouts
| Layout | Use |
|---|---|
| `discipline` | Auto-generated rules + cursus URL (never write manually) |
| `title` | Module opener |
| `hero` | Visual hook with image |
| `standard` | Plain text / explanation |
| `big` | Large single statement / key formula |
| `predict` | Activate prior knowledge (click to reveal answer) |
| `realworld` | Real-world context (cause/consequence/takeaway) |
| `comparison` | Two-column side-by-side comparison |
| `split` | Text + image side by side |
| `image-grid` | Two images with captions |
| `image-hero` | Large image above, text below |
| `multichoice` | Interactive quiz (click answer) |
| `recap` | Step-by-step Q&A reveal |
| `summary` | Bullet-point summary |
| `celebration` | Positive end slide |
| `steps` | Click-to-reveal learning goals |
| `exercise` | Step-by-step worked exercise (S key) |
| `equation` | Formula breakdown with colour-coded parts |

#### Math-specific layouts (new)
| Layout | Use |
|---|---|
| `definition` | Formal term + definition box |
| `worked-example` | Multi-step solution with S-key reveal |
| `value-table` | Input/output table for functions |
| `properties` | Numbered list of mathematical properties |
| `equation-solver` | Step-by-step equation solving |
| `theorem-proof` | Theorem statement + proof steps |
| `math-graph` | SVG function graph with step-by-step reveals |

### Slide Structure Examples

```javascript
// TITLE
{ layout: 'title', title: 'Module 07', subtitle: 'Gelijkvormigheid', badge: 'Wiskunde', icon: 'function' }

// STANDARD
{ layout: 'standard', title: 'Definitie', content: 'Twee figuren zijn gelijkvormig als \( k > 0 \) zodat...' }

// DEFINITION (math-specific)
{ layout: 'definition', term: 'Schaalfactor', definition: 'De verhouding \( k = \\frac{b}{a} \) waarbij...' }

// WORKED EXAMPLE (S-key step reveal)
{ layout: 'worked-example', title: 'Bereken x', steps: [
  { label: 'Gegeven', content: '\( \\frac{x}{4} = \\frac{6}{8} \)' },
  { label: 'Stap 1', content: 'Kruislings vermenigvuldigen: \( 8x = 24 \)' },
  { label: 'Oplossing', content: '\( x = 3 \)' }
]}

// PROPERTIES
{ layout: 'properties', title: 'Eigenschappen van gelijkvormige driehoeken', items: [
  'Overeenkomstige hoeken zijn gelijk.',
  'Overeenkomstige zijden zijn evenredig.'
]}

// VALUE TABLE
{ layout: 'value-table', title: 'Functietabel', headers: ['x', 'f(x) = 2x + 1'],
  rows: [[-2, -3], [-1, -1], [0, 1], [1, 3], [2, 5]] }

// MATH GRAPH (step-by-step)
{ layout: 'math-graph', title: 'Grafiek van f(x) = 2x + 1',
  steps: [
    { label: 'Assen', mathConfig: { functions: [], axes: true } },
    { label: 'Lijn', mathConfig: { functions: [{ expr: '2*x+1', color: '#F97316' }] } }
  ]
}

// MULTICHOICE
{ layout: 'multichoice', title: 'Quiz', question: 'Zijn twee rechthoeken altijd gelijkvormig?',
  options: [
    { id: 'A', text: 'Ja, altijd.', correct: false },
    { id: 'B', text: 'Nee, niet altijd.', correct: true }
  ],
  explanation: 'Een rechthoek 2×4 en een rechthoek 3×4 zijn niet gelijkvormig.'
}

// SUMMARY
{ layout: 'summary', title: 'Samenvatting', items: [
  'Gelijkvormig = zelfde vorm, andere grootte.',
  'Schaalfactor \( k = \\frac{b}{a} \)'
]}

// CELEBRATION
{ layout: 'celebration', title: 'Klaar!', subtitle: 'Je beheerst gelijkvormigheid.',
  stats: [{ label: 'Slides', value: '12' }, { label: 'Status', value: 'TOP' }] }
```

### Optimal Slide Flow

```
1. discipline   — Auto-generated (first deck only)
2. title        — Module opener
3. steps        — "Wat ga je leren?"
4. predict      — Activeer voorkennis
5–8. content    — definition / standard / properties / worked-example
9. recap        — Mid-lesson check
10. multichoice — Active quiz
11. summary     — Consolidate
12. celebration — Positive close
```

---

## Activity System

Activities are registered in `src/composables/useActivitySystem.js`. Each maps a string key to a Vue component.

### Activity Roles — Where Each Type Belongs

Activities serve two distinct roles in a lesson:

| Role | Where | Which activities |
|---|---|---|
| **Subject-specific practice** | `card-activity` digital card in step B | Topic-specific ones (`similarity`, `pythagoras`, `linearFunctions`, etc.) |
| **Extra materiaal** | `extraActivities` in step B (collapsible panel) | General ones: `mixedRetrieval`, `dragDrop`, `categorySort`, `mathFillBlanks`, `hotspot` |

**Do not** put subject-specific activities in `extraActivities`, and **do not** put general activities in the main digital card.

### Extra Materiaal Panel

The **Extra Materiaal** toggle (`+` button) is always visible at the bottom of step B — whether or not `extraActivities` is defined. If the array is absent or empty, the panel shows *"Geen extra materiaal beschikbaar"*.

Recommended general activities for extra materiaal:

| Key | Best for |
|---|---|
| `mixedRetrieval` | Multiple-choice retrieval practice (any topic) |
| `dragDrop` | Term ↔ definition matching |
| `categorySort` | Sorting concepts into categories |
| `mathFillBlanks` | Fill-in-the-blank with live math context (graph / equation / table) |
| `hotspot` | Explore-style: click points on a graph or image to reveal info |

### Full Activity Registry

| Key | Component | Topic | Role |
|---|---|---|---|
| `dragDrop` | DragDropActivity | Generic matching | Extra materiaal |
| `categorySort` | CategorySortActivity | Sorting into categories | Extra materiaal |
| `mixedRetrieval` | MixedRetrievalActivity | Multiple-choice review | Extra materiaal |
| `mathFillBlanks` | MathFillBlanksActivity | Fill-in-blank + math context | Extra materiaal |
| `hotspot` | HotspotActivity | Explore (image or graph) | Extra materiaal |
| `realNumbers` | RealNumbersActivity | Real number sets | Card activity |
| `logic` | LogicActivity | Logic / sets | Card activity |
| `linearEquations` | LinearEquationsActivity | 1st degree equations | Card activity |
| `linearSystems` | LinearSystemsActivity | Systems of equations | Card activity |
| `linearFunctions` | LinearFunctionsActivity | Linear functions | Card activity |
| `functionIntroduction` | FunctionIntroductionActivity | Function concept | Card activity |
| `quadraticFunctions` | QuadraticFunctionsActivity | Quadratic functions | Card activity |
| `quadraticEquations` | QuadraticEquationsActivity | Quadratic equations | Card activity |
| `rationalFunctions` | RationalFunctionsActivity | Rational functions | Card activity |
| `polynomialDivision` | PolynomialDivisionActivity | Polynomial division | Card activity |
| `vectors` | VectorsActivity | Vectors | Card activity |
| `analyticGeometry` | AnalyticGeometryActivity | Analytic geometry | Card activity |
| `circleGeometry` | CircleGeometryActivity | Circle geometry | Card activity |
| `similarity` | SimilarityActivity | Similarity / scaling | Card activity |
| `pythagoras` | PythagorasActivity | Pythagoras | Card activity |
| `trigonometryCircle` | TrigonometryCircleActivity | Unit circle | Card activity |
| `trigonometryRightTriangle` | TrigonometryRightTriangleActivity | Right triangle trig | Card activity |
| `spatialGeometry` | SpatialGeometryActivity | 3D / spatial geometry | Card activity |
| `descriptiveStatistics` | DescriptiveStatisticsActivity | Stats: centre + spread | Card activity |
| `correlation` | CorrelationActivity | Correlation / regression | Card activity |
| `graphTheory` | GraphTheoryActivity | Graph theory | Card activity |
| `countingProblems` | CountingProblemsActivity | Combinatorics / counting | Card activity |

> **Excluded from use:** `fillBlanks` (hardcoded for a specific force-diagram lesson, not generic), `symbolDrill` (chemistry elements only).

### Natuurwetenschappen-activiteiten (`s-activities/`)

Deze map stond oorspronkelijk los van de app. Ze zijn nu geregistreerd en
bruikbaar vanuit lessen. Ze hebben **nog niet** de 8 pedagogische elementen
(zie `test_scores.py`) — ze werken, maar missen uitgewerkt voorbeeld,
voorspellingspoort, Bloom-label enz.

| Key | Component | Vak | Onderwerp |
|---|---|---|---|
| `forcesLab` | ForcesLabActivity | Fysica | Krachten op objecten |
| `springForceLab` | SpringForceLabActivity | Fysica | Veerkracht, Hooke (gebruikt chart.js) |
| `circuits` | CircuitsActivity | Fysica | Serie- en parallelschakelingen |
| `idealGasLaw` | IdealGasLawActivity | Fysica | Algemene gaswet |
| `curveSketching` | CurveSketchingActivity | **Wiskunde** | Functieanalyse, afgeleiden |
| `chemicalBonding` | ChemicalBondingActivity | Chemie | Covalente bindingen |
| `ionicBonding` | IonicBondingActivity | Chemie | Ionbindingen |
| `reactionBalance` | ReactionBalanceActivity | Chemie | Reacties kloppend maken |

**Let op:** `curveSketching` is een wiskunde-activiteit (intercepten,
asymptoten, afgeleiden), geen natuurkunde — niet in fysicalessen gebruiken.

Bij het toevoegen van een nieuwe activiteit uit `s-activities/`:
1. Lazy import toevoegen in `useActivitySystem.js`
2. Key toevoegen aan `COMPONENT_MAP`
3. Controleren op `requestFullscreen`/`exitFullscreen` — die horen er **niet**
   in (activiteiten zijn modale overlays). `fullscreen` prop op `false`.
4. Externe imports nakijken en zo nodig installeren

### Referencing an Activity from a Card

```javascript
// In timeline card (subject-specific):
{ id: 'card-activity', type: 'digital', title: 'Interactieve Oefening',
  action: 'activity', activityId: 'similarity' }

// In activities map:
activities: {
  similarity: { type: 'similarity', title: 'Gelijkvormigheid' }
}
```

Activity completion marks `'card-' + activityId` as done in progress.

### MathFillBlanksActivity — Data Format

A fill-in-the-blank activity with an optional live math context panel on the left.

```javascript
mathFillBlanks: {
  type: 'mathFillBlanks',
  title: 'Grafiek Lezen',
  instruction: 'Bestudeer de grafiek en vul de juiste waarden in.',

  // context: one of 'graph' | 'equation' | 'table' | 'text' (optional)
  context: {
    type: 'graph',
    label: 'f(x) = 2x + 1',          // shown in context footer
    config: {                          // passed directly to MathGraphSvg
      domain: [-5, 5],
      range:  [-5, 10],
      functions: [{ expr: '2*x+1', color: '#F97316' }],
      points:    [{ x: 0, y: 1, label: 'A', color: '#0f172a' }]
    }
  },
  // context: { type: 'equation', content: '\\( ax^2 + bx + c = 0 \\)' }
  // context: { type: 'table',    headers: ['x','f(x)'], rows: [[-1,1],[0,3],[1,5]] }
  // context: { type: 'text',     content: 'Een rechte heeft vergelijking ...' }

  questions: [
    { sentence: 'Het snijpunt met de y-as is ___ .',  answer: '1',    hint: 'Kijk naar x = 0.' },
    { sentence: 'De rico is ___ .',                   answer: '2',    altAnswers: ['2.0'] },
    { sentence: 'Voor \\( x = 3 \\) is f(x) = ___ .', answer: '7' }
  ]
}
```

- `sentence`: plain text with `___` as the blank; supports `\( ... \)` math anywhere.
- `answer`: correct value (string or number). Comparison is case-insensitive, comma↔dot normalised.
- `altAnswers`: extra accepted values (optional array).
- `hint`: shown on request (optional).
- Enter key submits, Escape closes.

### HotspotActivity — Image & Graph Modes

Supports two modes depending on what props are provided:

**Image mode** (original) — hotspot positions as percentages relative to the image:
```javascript
hotspot: {
  type: 'hotspot',
  title: 'Figuur Verkennen',
  instruction: 'Klik op de hotspots om meer te ontdekken.',
  image: 'https://...',        // required for image mode
  hotspots: [
    { x: 25, y: 40, title: 'Label', content: 'Uitleg...', color: 'amber' }
  ]
}
```

**Graph mode** (new) — hotspot positions in math coordinates, auto-converted to SVG percentages:
```javascript
hotspotGraph: {
  type: 'hotspot',
  title: 'Kwadratische Functie Verkennen',
  instruction: 'Klik op de punten om hun eigenschappen te ontdekken.',
  graphConfig: {               // required for graph mode (replaces image)
    domain: [-4, 4],
    range:  [-2, 8],
    functions: [{ expr: 'x^2 - 1', color: '#F97316' }],
    points:    [{ x: 0, y: -1, label: 'T', color: '#0f172a' }]
  },
  hotspots: [
    {
      x: 0, y: -1,             // math coordinates
      title: 'Top T(0, −1)',
      content: 'De top van de parabool. Minimumwaarde is \\( -1 \\).',
      color: 'amber'
    }
  ]
}
```

- `color` on a hotspot controls the info-panel icon colour. Use Tailwind colour names: `amber`, `emerald`, `indigo`, `rose`, etc.
- Clicking all hotspots emits `complete` and marks the card as done.
- A "Volgende →" button in the info panel lets students step through hotspots sequentially.

---

## Tickets (Entry + Exit)

Both use `TicketModal.vue` with a `mode` prop (`'entry'` or `'exit'`).

```javascript
entryTicket: {
  questions: [
    { id: 'en1', type: 'mc', question: 'Vraag?', options: ['A', 'B', 'C'], correct: 0 },
    { id: 'en2', type: 'open', question: 'Open vraag', description: 'Beschrijf...' }
  ]
},
exitTicket: {
  questions: [
    { id: 'ex1', type: 'mc', question: 'Vraag?', options: ['A', 'B', 'C'], correct: 1 }
  ]
}
```

- Supported types: `mc`, `open`
- `juist-fout` is **auto-normalized** to `mc` with options `['Juist', 'Fout']` by `useLesson.js`
- Modal appends built-in `mood` and `finish` steps after provided questions
- Open questions require > 10 characters to continue

---

## Global Keyboard Shortcuts (in lesson view)

| Key | Action |
|---|---|
| `N` | Toggle name picker |
| `R` | Reset progress (with confirmation) |
| `C` | Toggle math background watermark |

---

## localStorage Keys

| Key | Purpose |
|---|---|
| `${lessonId}` | Lesson progress (done card IDs) — id is unique across subjects, so no collisions |
| `planner-show-watermark` | Background toggle |
| `teacher_unlocked` | Presentation teacher-mode unlock |

---

## Design System

- **Font:** `Open Sans` (body), `JetBrains Mono` (accents)
- **Brand orange:** `#F97316` (`brand-orange`, `amber-500`)
- **Brand dark:** `#0B1120` (`brand-dark`)
- **Slate palette** for structure and text
- **8-point spacing grid:** `p-4`, `p-6`, `p-8`, `gap-4/6/8` — never `p-7`, `mb-11`
- **Radii:** `rounded-2xl` cards, `rounded-xl` small elements, `rounded-lg` badges

---

## Do's and Don'ts

### ✅ DO
- Register every new lesson in `src/data/modules.js`
- Use `slidesKey` on presentation cards to point to the right slide array
- Give every card a unique `id` (used for progress tracking)
- Use KaTeX-style math wrapped in `\( ... \)` — it renders correctly everywhere (tickets, slides, spot checks, activities)
- Use the correct `subject` — `physics` · `biology` · `chemistry` · `science` · `math`. It must match the `subject` on the same lesson in `src/data/modules.js`, otherwise the theming (kleur, icoon, watermerk, header-label) klopt niet
- Keep timeline to exactly 3 steps: **A** `Instap` · **B** `Verwerken` · **C** `Afsluiting`
- Use `entry-ticket` for diagnostic questions at the start
- Put subject-specific activities in the `card-activity` digital card in step B
- Put general activities (`mixedRetrieval`, `dragDrop`, `mathFillBlanks`, `hotspot`, `categorySort`) in `extraActivities` for the Extra Materiaal panel
- Use `cp src/lessons/_template.js` for every new lesson — the template enforces the correct ABC structure

### ❌ DON'T
- Don't use `route-assessment` — this feature has been removed
- Don't use `sequence` or `trueFalse` activity keys — not in the current registry
- Don't write a `discipline` slide manually — it's always auto-generated
- Don't use emojis in lesson text — use Phosphor icons instead
- Don't use `fillBlanks` or `symbolDrill` in `extraActivities` — they are not generic (see excluded list above)
- Don't import lesson files in `App.vue` — routing handles this automatically
- Don't use arbitrary spacing values (`p-7`, `mb-11`, etc.)
- Don't name timeline steps anything other than `Instap`, `Verwerken`, `Afsluiting` — these are the standard labels used across all lessons
- Don't call `requestFullscreen` or `exitFullscreen` inside activity components — activities are modal overlays, not fullscreen apps

---

## Troubleshooting

**Lesson not showing in module list**  
→ Check `src/data/modules.js` — the `id` must exactly match the filename (without `.js`).

**Activity not opening**  
→ Check that `activityId` in the card matches a key in `activities` map, and that key exists in the `COMPONENT_MAP` in `useActivitySystem.js`.

**Math not rendering**  
→ Wrap in `\( ... \)` (preferred) or `$...$` (also supported). Both are processed by `useMathEngine.js` and rendered via `v-html` everywhere in the app — tickets, spot checks, slide content, and activity instructions all support math notation.

**Slides not loading**  
→ Check that `slidesKey` on the card matches a top-level key in the lesson file (e.g. `slidesB`).

**Progress not resetting**  
→ Use the `R` key in lesson view, or clear `localStorage` manually.

**Extra Materiaal panel not showing activities**  
→ Check that the `id` in each `extraActivities` entry exactly matches a key in the lesson's `activities` map.

**MathFillBlanks graph not rendering**  
→ Ensure `context.config` is a valid `MathGraphSvg` config object with at least `domain`, `range`, and `functions`.

**HotspotActivity hotspots misaligned in graph mode**  
→ Verify that `domain` and `range` in `graphConfig` match what the graph actually shows. Hotspot coordinates use math units, not pixels.

---

## Changelog

### Herfst 2026 — Meerdere vakken + schoolconfiguratie

#### Nieuwe architectuur
- **`src/data/subjects.js`** toegevoegd: vakregistry met per vak een slug, label, icoon, accentkleur, hoverkleuren, watermerk en achtergrond. `subjectState` bepaalt welke vakken actief zijn — dit is de enige plek waar vakken aan/uit gaan.
- **Route `/:subject`** ingevoerd. Nieuwe flow: `SubjectSelection → YearSelection → ClassSelection → ModuleSelection → LessonView`. `/les/:id` blijft ongewijzigd (één segment, geen conflict).
- **`SubjectSelection.vue`** toegevoegd: vakkenkiezer die alleen actieve vakken toont.
- **`App.vue`** thematiseert nu per vak: watermerk-icoon, kleur en achtergrond komen uit de registry, bepaald via de route (of via de les-id op `/les/:id`).

#### Registry
- **`modules.js`** herschreven: elk item heeft nu een verplicht `subject`-veld. Fysica (12) en biologie (12) nieuw toegevoegd; chemie (4) en alle **68 wiskundelessen** bleven bewaard maar staan uitgeschakeld.
- **`modulesFor(subject, year)`** en **`yearsFor(subject)`** toegevoegd. `YearSelection` toont enkel leerjaren waarvoor het vak effectief lessen heeft.
- Lessen van een uitgeschakeld vak laden nog steeds als je de URL kent — enkel de navigatie verbergt ze.

#### Namen & privacy
- **`students.js`** herschreven: enkel **voornamen**, geen achternamen meer. 14 volledige namen uit de klas `3-HW` zijn vervangen door voornamen.
- **`classesBySubjectYear`** toegevoegd: klassen per vak en leerjaar, plus `classesFor()` en `namesForClass()` met fallback naar alle namen van het vak.
- **`NamePickerOverlay.vue`** vraagt nu een wachtwoord (`school.namePickerCode`) voor er iets zichtbaar wordt. Ontgrendeld blijft ontgrendeld zolang de pagina open blijft.
  > Dit is een **drempel, geen beveiliging**: de namen zitten in de publieke bundel. Zie de waarschuwing bovenin `students.js`.

#### Vakgebonden componenten
- **`Toolbox.vue`**: gereedschap en formularium zijn nu per vak. Fysica krijgt PhET-simulaties en een formuleblad, biologie krijgt Bioplek/Biodigital/PhET, chemie een periodiek systeem.
- **`GoalsWidget.vue`**: icoon komt uit de vakregistry in plaats van een hardcoded if-keten (biologie kreeg voordien een flacon).
- **`LessonContent.vue`**: header toont het vaklabel uit de registry (stond hardcoded op "Wiskunde").
- **`ActivityTester.vue`**: "Wiskunde Activity Playground" → "Activiteiten Playground".

#### Lessen
- **24 nieuwe lesskeletons** gegenereerd voor fysica en biologie (12 + 12), in de ABC-structuur met slides, tickets en activities. Alle inhoud staat op `TODO`.
- **4 chemie-skeletons** bewaard, ook al staat het vak uit.
- Alle **68 wiskundelessen** bleven ongewijzigd in `src/lessons/`.
- **`_template.js` v4.0**: meerdere vakken, correcte voorbeeld-id's, geen wiskunde-specifieke defaults meer.

#### Overig
- **`vite.config.js`**: `base` staat op de schoolrepo-naam (`/willebroek/`).
- **`package.json`**: naam gewijzigd.
- **`index.html`**: titel, meta en og-tags voor fysica & biologie.
- **`.github/workflows/deploy.yml`**: workflownaam per school.

---

### Session 2 — 2026-06-20

### Session 2 — 2026-06-20

#### Timeline
- **Step titles standardised** across all 70+ lesson files:
  - `'Diagnostisch & Instap'` → `'Instap'`
  - `'Samenvatting & Exit'` → `'Afsluiting'`
  - `'Verwerken'` unchanged
- **Extra Materiaal toggle** (`ExtraChallengeBranch`) now always rendered on step B regardless of whether `extraActivities` is defined. Shows *"Geen extra materiaal beschikbaar"* when the array is absent or empty. Not shown on steps A or C.

#### Template
- **`_template.js` rewritten** (v3.0) to enforce the ABC structure: `slidesA/B/C`, correct card types, `entry-ticket` → `presentation` in A, `presentation` → `workbook` → `activity` in B, `presentation` → `exit-ticket` in C. Old template had 5 steps (A–E) with wrong card types and a single `slides` array.

#### Module selection view
- **`ModuleSelection.vue` rewritten** from a 3-column card grid to a grouped table-of-contents list. Lessons are grouped by module number (parsed from the lesson ID, e.g. `nando3-m01-l01` → Module 01). Each group shows a header with icon + topic name + lesson count. Each lesson is a horizontal row with a coloured lesson-number pill, full title, and arrow.

#### Activity system
- **Fullscreen bug fixed** across all 29 activity components: `fullscreen` prop default changed from `true` to `false`, and all `requestFullscreen` / `exitFullscreen` browser API calls removed. Activities are modal overlays — they do not and should not touch the browser fullscreen API.
- **`DragDropActivity` UI rewritten**: terms are now compact draggable chips in a wrapping pool at the top of the modal; definitions are horizontal rows with a right-aligned drop zone. Eliminates the clipping issue caused by full-width draggable bars.
- **Activity roles defined**: subject-specific activities belong in `card-activity`; general activities (`mixedRetrieval`, `dragDrop`, `categorySort`, `mathFillBlanks`, `hotspot`) belong in `extraActivities`.
- **`fillBlanks` and `symbolDrill` disqualified** from `extraActivities`: `fillBlanks` is hardcoded for a specific force-diagram lesson (not generic); `symbolDrill` is chemistry-only.

#### New components
- **`MathFillBlanksActivity`** (`src/components/activities/MathFillBlanksActivity.vue`) — new general-purpose activity for extra materiaal. Left panel shows a live math context (`graph` / `equation` / `table` / `text`); right panel presents sequential fill-in-the-blank questions. Registered as `mathFillBlanks` in `useActivitySystem.js`.
- **`HotspotActivity` generalised** — now supports two modes:
  - `image` mode (unchanged): provide `image` URL + hotspot positions as percentages.
  - `graph` mode (new): provide `graphConfig` (a `MathGraphSvg` config) + hotspot positions in math coordinates, auto-converted to SVG percentages. Info panel slides in from the right with a "Volgende →" sequential navigation button.

#### Demo lesson
- **`nando1-demo.js` updated** to showcase all four Extra Materiaal activity types: `dragDrop` (begrippen koppelen), `mixedRetrieval` (kennischeck), `mathFillBlanks` (grafiek lezen — `f(x) = 2x+1`), `hotspot` in graph mode (kwadratische functie `x²−1` with top + two zeros as hotspots).
