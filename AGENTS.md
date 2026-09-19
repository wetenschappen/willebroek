# AGENTS.md — Willebroek leerpad

> Referentie voor AI-agents en toekomstige wijzigingen.
> Deze repo is uitsluitend voor **fysica en biologie**.

## Projectscope

Willebroek is een Vue 3 + Vite lesplanner voor Belgisch secundair onderwijs.
De navigatie is:

```text
Vak → Jaar → Klas → Module → Les
```

Deze repository bevat alleen:

- `physics` / Fysica
- `biology` / Biologie

Andere vakken horen in een aparte schoolrepo en mogen niet opnieuw als verborgen
productiescope in deze repo worden toegevoegd.

## Design system

Volg `docs/DESIGN-SYSTEM.md` voor alle nieuwe schermen en componenten. De
belangrijkste regel is projectorleesbaarheid: geen fletse grijze lesinformatie,
geen belangrijke haarlijntjes en geen betekenis die alleen via hover of kleur
wordt doorgegeven. Activiteitskleur is semantisch: blauw = digitaal, rood =
presentatie en groen = boek/bundel. Fysica en biologie krijgen geen eigen
activiteitskleur.

Er is geen uitzondering voor "oudere" componenten: **elk scherm dat een
leerling ziet volgt de huisstijl**, inclusief modals, tickets en de
activiteiten op de ABC-kaart. Gebruik de systeemklassen uit `src/style.css`
(`.card-*`, `.badge-*`, `.modal-*`, `.btn*`) en de tokens uit `:root` in plaats
van eigen Tailwind-kleurcombinaties. Een activiteit erft het kleurtype van de
kaart waarop ze staat: `card-entry` en `card-exit` zijn `digital`, dus hun
modals zijn blauw met het label `DIGITAAL`.

Binnen een laboratoriumsimulatie mag een kleur wel een natuurkundige grootheid
voorstellen, maar alleen met een legenda of label. Zie Deel II van
`docs/DESIGN-SYSTEM.md` voor de tokens, de contrastcijfers en de opruimlijst.

## Commando's

```bash
npm install       # eenmalig dependencies installeren
npm run dev       # ontwikkelserver
npm run check     # scope-, registry- en activity-health-check
npm run build     # productiebuild
npm run smoke     # preview-smoketest na een build
npm run preview   # productiebuild lokaal bekijken
```

`npm run check` controleert exact de twee toegestane vakken, de lesregistry,
les-id's, subjects, activity-types, imports en de afwezigheid van oude
wiskunde-/chemie-/playground-runtimecode. De GitHub Actions-workflow voert
`npm run check` uit vóór `npm run build` en `npm run smoke`.

## Architectuur

```text
src/
├── App.vue
├── main.js
├── router/index.js
├── data/
│   ├── subjects.js        # actieve vakken en thema's
│   ├── modules.js         # registry van alle fysica-/biologielessen
│   └── students.js        # voornamen en klassen
├── lessons/
│   ├── _template.js
│   ├── fys*.js
│   └── bio*.js
├── views/
├── composables/
├── components/activities/ # generieke activiteiten
├── components/modals/
└── components/presentation/

s-activities/              # fysica-activiteiten
scripts/health-check.mjs   # automatische projectcheck
scripts/smoke-check.mjs    # preview-smoketest
docs/
```

`src/data/subjects.js` is de bron van waarheid voor de actieve vakken.
`modules.js` is de bron van waarheid voor lesmetadata. De les wordt op basis
van zijn unieke id dynamisch geladen door `LessonView.vue`.

Routes gebruiken hash-routing:

```text
#/                 vakkenkeuze
#/fysica           leerjaren fysica
#/biologie         leerjaren biologie
#/les/<id>         lesweergave
```

## Een les toevoegen

Maak eerst het lesbestand vanuit het template:

```bash
cp src/lessons/_template.js src/lessons/fys3-m01-l03-weerstand.js
# of
cp src/lessons/_template.js src/lessons/bio3-m01-l03-celademhaling.js
```

Vul daarna de inhoud in en registreer dezelfde id in `src/data/modules.js`.

| Vak | Prefix | Voorbeeld |
|---|---|---|
| Fysica | `fys<jaar>-` | `fys3-m01-l03-weerstand` |
| Biologie | `bio<jaar>-` | `bio3-m01-l03-celademhaling` |

Vereiste aandachtspunten:

- `id` is gelijk aan bestandsnaam zonder `.js` en aan de registry-entry.
- `subject` is `physics` of `biology` en is op beide plaatsen gelijk.
- Gebruik exact drie tijdlijnstappen: `Instap`, `Verwerken`, `Afsluiting`.
- Elke timeline-card krijgt een unieke `id` voor de voortgang.
- Een presentatiekaart gebruikt `action: 'presentation'` met de juiste
  `slidesKey`.
- Gebruik `\\( ... \\)` voor wiskundige notatie.
- Laat geen `TODO`-tekst in een les staan die aan leerlingen wordt gepubliceerd.

## Activiteiten

Activiteiten worden geregistreerd in
`src/composables/useActivitySystem.js`.

| Key | Component | Vak | Rol |
|---|---|---|---|
| `dragDrop` | `DragDropActivity.vue` | Fysica en biologie | Extra materiaal |
| `mixedRetrieval` | `MixedRetrievalActivity.vue` | Fysica en biologie | Extra materiaal |
| `forcesLab` | `ForcesLabActivity.vue` | Fysica | Card activity |
| `springForceLab` | `SpringForceLabActivity.vue` | Fysica | Card activity |
| `circuits` | `CircuitsActivity.vue` | Fysica | Card activity |
| `idealGasLaw` | `IdealGasLawActivity.vue` | Fysica | Card activity |

Vakspecifieke activiteiten horen op de digitale `card-activity` in stap B.
Generieke activiteiten horen in `extraActivities`, niet op de hoofdkaart.

Bij een nieuwe activiteit:

1. Voeg de lazy import toe in `useActivitySystem.js`.
2. Voeg de key toe aan `COMPONENT_MAP`.
3. Gebruik geen `requestFullscreen()` of `exitFullscreen()`; activiteiten
   zijn modale overlays.
4. Zorg dat een actieve les het type gebruikt, zodat `npm run check` het dekt.
5. Voer `npm run check`, `npm run build` en `npm run smoke` uit.

## Studenten en privacy

`src/data/students.js` bevat uitsluitend voornamen. Deze gegevens worden in de
publieke JavaScript-bundel opgenomen; het wachtwoord van de naamkiezer is dus
een drempel, geen beveiliging. Zet daar geen gevoelige informatie in.

## Scope-regels

- Voeg geen chemie-, wiskunde- of natuurwetenschappenlessen toe.
- Voeg geen wiskunde-playground of verborgen vakregistry toe.
- Houd `modules.js`, `subjects.js`, `students.js` en lesbestanden synchroon.
- `dist/` en `node_modules/` mogen niet gecommit worden; `.gitignore` regelt dit.
- Controleer bij wijzigingen altijd eerst `npm run check`, daarna `npm run build`.
- Gebruik `git-save "duidelijk bericht"` om te committen en te publiceren.
