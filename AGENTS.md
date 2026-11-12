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
leerling ziet volgt de huisstijl**, inclusief modals, tickets, slides en de
activiteiten op de ABC-kaart. Gebruik de systeemklassen uit `src/style.css`
(`.card-*`, `.badge-*`, `.modal-*`, `.fullscreen-*`, `.btn*`) en de tokens uit
`:root` in plaats van eigen Tailwind-kleurcombinaties. Een activiteit erft het
kleurtype van de kaart waarop ze staat: `card-entry` en `card-exit` zijn
`digital`, dus hun modals zijn blauw met het label `DIGITAAL`.

**Presentatie-uitzondering:** alleen slidecanvassen volgen de rood-witte en
marineblauwe stijl van `docs/lesson material/Hoofdstuk 5.pdf` (zie §15 van het
designsysteem). Grote rode inhoudstitels op wit; title/big/closing mogen een
rood statementvlak met witte grote tekst tonen. Gebruik `--color-slide-*` en
`text-slide-*` / `bg-slide-*`, geen appkleur-combinaties. Geen footer, logo,
schoolnaam of paginanummer op de slides; de leerkrachtbediening blijft buiten
het canvas. IBM Plex blijft. De stapsgewijze onthullayouts blijven behouden.
Deze uitzondering geldt **niet** voor tickets, simulaties of de appschil.

**Geen donkere leesvlakken** (behoudens het rode statementvlak hierboven).
De projector staat tegen een witte muur, dus een
donker scherm is onleesbaar. Achtergrond is `--color-paper` of `--color-panel`,
tekst is `--color-ink` of `--color-ink-soft`. Geen `bg-black`, `bg-slate-900` of
`--color-ink` als schermvullend vlak. Kleine donkere elementen (`.lesson-nav`,
`.btn-primary`, `.timeline-icon`, `.fab-btn`) mogen wel.

Er is één fontpaar: IBM Plex Sans + IBM Plex Mono. Geen `font-serif`, geen
`Open Sans`.

Binnen een laboratoriumsimulatie mag een kleur wel een natuurkundige grootheid
voorstellen, maar alleen met een legenda of label. Zie Deel II van
`docs/DESIGN-SYSTEM.md` voor de tokens, de contrastcijfers, de
fullscreen-activiteitenshell en de opruimlijst.

`npm run check` bevat een **design-ratchet**: nieuwe overtredingen blokkeren de
build, bestaande schuld staat in `scripts/design-baseline.json`. Ruim je iets
op, verlaag dan dat getal in dezelfde commit. Losse meting:
`node scripts/design-check.mjs`.

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
│   ├── bio*.js
│   └── _archive/         # gearchiveerde lessen, buiten de runtime
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

**Alle lessen zijn gearchiveerd** voor de redesign. De actieve registry
`modules` is leeg; de lesbestanden en hun metadata staan in
`src/lessons/_archive/redesign-2026/` en `archivedModules`. Zie
`docs/LESSON-ARCHIVE.md` voor de volledige lijst en de terugzetinstructie.

Routes gebruiken hash-routing:

```text
#/                         landing page: vak + klas kiezen
#/fysica/class/<klas>      lessen voor een klas
#/biologie/class/<klas>    lessen voor een klas
#/les/<id>                 lesweergave
```

De oude tussenpagina voor leerjaren is geen onderdeel meer van de leerlingflow.
Klassen zonder lessen tonen op de modulepagina een eerlijke lege staat. De
zichtbare knop Klassen bovenaan is de enige terugweg; er wordt geen extra actie
of leerjaarselectie aangeboden.

## Begeleide leerpaden naast ABC

Lees **`docs/BEGELEIDE-LEERPADEN.md`** bij een verzoek om een schermgestuurd
leerpad, extra stapsgewijze begeleiding of een toepassing voor bijvoorbeeld
6TSO. De afspraak is één concrete opdracht per scherm: het scherm stuurt, het
boek blijft de hoofdwerkplek. Korte controles ondersteunen het boekwerk;
voortgang is geen beheersingsscore. De ABC-planner blijft bestaan voor andere
groepen. Deze aanpak is geen algemene verlaging van het inhoudelijke niveau.

De eerste toepassing is `/willebroek/energie/`: een zelfstandige fysicaroute
voor 4NAWE/4SPOWE, met een tweede HTML-ingang (`energie/index.html`) in dezelfde
Vite-build, geen ABC-les in `modules.js`. Bron, eerste-lesafbakening,
oefeningendekking en opslag staan in `docs/ENERGIE-LEERPAD.md`.
Code: `src/energie/`; tests: `scripts/energie.test.mjs` (onder `npm run check`).
De gedeelde huisstijl blijft verplicht. De eerste versie behandelt alleen de
start van T2, niet het hele thema.

De tweede toepassing is `/willebroek/celmetabolisme/`: een biologie-oefenroute
voor de gecombineerde klas 5SPOWE/5MOWE (jaar 5 DS), na de gegeven uitleg van
T2H1. Alle oefeningen 1–8 op boek p. 77–78 en het juist/fout-blok zijn ingepland.
Bronnen en afbakening: `docs/CELMETABOLISME-LEERPAD.md`; inhoud:
`src/celmetabolisme/`; tests: `scripts/celmetabolisme.test.mjs`.

De derde toepassing is `/willebroek/energie-basis/`: fysica voor de gecombineerde
4LAT/4ECWE, één uur per week gedurende één semester, uitsluitend GO! basisvorming.
Introductie en oefeningen 1–3 zijn al klassikaal gemaakt. **Het kinetische proefblok
is goedgekeurd en de leerkracht vroeg de aanpak door te trekken naar de hele les
van 50 minuten: oefeningen 5–10. Versie 3 is die volledige begeleide les**, niet
meer de bondige opdrachtenlijst van v2. Boek p. 77–78 van de **1u-versie**, met
voorbeelden op 72–73, chemische opslag als gerichte naslag p. 70 en behoud p. 90.
Zeven berekeningen en vijf redeneeropdrachten, inclusief de eenhedencontrole bij
6a–c. Inhoudelijke cyclus: **boekonderzoek → begripsvraag → zichtbare uitleg bij
de gekozen misvatting → toepassing**. De les heeft 26 schermen: 7 onderzoeken,
9 begripsvragen, 10 boekopdrachten. Dat aantal is geen sjabloon voor andere lessen.

De leerlingen zijn wiskundig vaardig. Leer fysische begrippen en modelkeuzes,
geen kwadraatles of bevestiging van elke rekenstap. De kerninstructie staat
zichtbaar, alleen aanvullende formule-/strategiehulp is optioneel. `work` met
`completion: 'button'` bevestigt via “Gemaakt, verder”, zonder boekwerkchecklists.
Vijftig minuten is de planning, geen inhoudsslot: wie niet klaar is pauzeert en
hervat, niemand krijgt een ingekorte 5–10-route. Let bij 10 op **gelijke
hellinglengte, niet gelijke hoogte**, met beginrust en verwaarloosbare wrijving.
Gebruik niet de 2u-paginering. Arbeid §2.1 is niet verplicht; kwantitatieve
energiebalansen, vermogen en rendement blijven voor het vervolg. Geen hele-T2-
of semesterdekking claimen.

Bron, lesplanning, dekking en compatibiliteit: `docs/ENERGIE-BASIS-LEERPAD.md`.
Code: `src/energie-basis/`; tests: `scripts/energie-basis.test.mjs` en
`scripts/energie-basis.browser.mjs`. V3 heeft een nieuwe les-id/opslagsleutel;
neem v1/v2- of proefblokantwoorden niet blind over. De oude sleutels en de twee
andere routes blijven bewaard. De aparte referentie
`/willebroek/energie-basis/proefblok/` blijft bestaan met eigen opslag; **deel voor
de hele les de hoofdlink**.
De eerste vier v3-stappen hergebruiken `kinetic-pilot.js`, met alleen een andere
vervolgknop aan het einde. De proefblokingang wordt getest door
`scripts/energie-kinetisch-pilot.test.mjs` en de gelijknamige browsertest.
`src/guided/feedback.js` ondersteunt `feedbackByOption` met fallback naar `hint`;
het wijzigt geen scores of bestaande twee-uurs-/biologievraaginhoud.

De configureerbare renderer en onafhankelijke voortgangslogica staan in
`src/guided/`. Gebruik die bij volgende routes; kopieer geen volledige app.
Elke les krijgt eigen data, begin-/slotteksten, HTML-ingang en opslagsleutel.
`MathText.vue` / `math.js` renderen alle dynamische leerlingtekst met KaTeX en
MathML. Gebruik `\\( … \\)` / `\\[ … \\]` in JavaScript-strings (of `String.raw`),
geen ruwe LaTeX in keuzes, hints of feedback. Voeg nieuwe lesdata toe aan
`scripts/guided-math.test.mjs` en controleer alle formulevelden op mobiel.
De bestaande energievoortgang moet compatibel blijven. Deelvinkjes worden nu
ook bij nog niet afgerond boekwerk bewaard. Lees de technische afspraken in
`docs/BEGELEIDE-LEERPADEN.md` vóór uitbreiding. Voor 6TSO is de wens vastgelegd,
maar onderwerp, bron, exacte klas en lestijd moeten nog worden bepaald;
er is nog geen 6TSO-route gebouwd.

Klasfeedback over Energie: de leerkracht rapporteerde geen verduidelijkingsvragen.
Behoud daarom de rol van boekassistent en de afwisseling met korte controles;
maak van deze routes geen tweede informatiebron of digitale theoriebundel.

## Een ABC-les toevoegen

Deze sectie geldt voor lessen in de bestaande ABC-planner. Voor zelfstandige
begeleide leerpaden geldt `docs/BEGELEIDE-LEERPADEN.md`.

Nieuwe of herwerkte lessen komen in `src/lessons/` en in `modules`; het archief
is geen wachtrij. Zie `docs/LESSON-ARCHIVE.md` om een gearchiveerde les terug te
zetten.

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
| `pressureLab` | `PressureLabActivity.vue` | Fysica | Card activity |
| `archimedesLab` | `ArchimedesLabActivity.vue` | Fysica | Card activity (volumes, afleidingbouwer, 5 parameterproeven, drijven en gassen) |
| `opticsLab` | `OpticsLabActivity.vue` | Fysica | Card activity |
| `phagocytosisLab` | `PhagocytosisLabActivity.vue` | Biologie | Card activity |
| `cellDivisionLab` | `CellDivisionLabActivity.vue` | Biologie | Card activity (3 sims: celcyclus, mitose, meiose) |
| `mendelLab` | `MendelLabActivity.vue` | Biologie | Card activity (10 oefenroutes, vrij kruisingslab en begripsvragen) |

Vakspecifieke activiteiten horen op de digitale `card-activity` in stap B.
Generieke activiteiten horen in `extraActivities`, niet op de hoofdkaart.

Bij een nieuwe activiteit:

1. Voeg de lazy import toe in `useActivitySystem.js`.
2. Voeg de key toe aan `COMPONENT_MAP`.
3. Open digitale activiteiten en tickets via
   `composables/useBrowserFullscreen.js`, zodat de browser-URL-balk verdwijnt
   op kleine schermen. De modale overlay blijft de fallback als de browser de
   Fullscreen API weigert; Escape en de sluitknop sluiten de activiteit.
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
