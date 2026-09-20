# Designreview live website

> Vergelijking van `design_skill.txt`, `docs/DESIGN-SYSTEM.md` en de website zoals die online stond tijdens de review.
>
> Dit document is bedoeld als werkdocument voor een volgende sessie. Bevindingen mogen worden afgevinkt, aangepast of aangevuld wanneer de activiteitenschermen opnieuw worden herwerkt.

> **Status na de doc-reconciliatie.** `docs/DESIGN-SYSTEM.md` heeft nu een Deel II met de tokens en systeemklassen. Daar staat ook de regel die hier ontbrak: elk scherm dat een leerling ziet volgt de huisstijl, inclusief modals en tickets. Enkele bevindingen hieronder zijn daarbij gecorrigeerd:
>
> - §7 heette "confetti": `PhConfetti` wordt geïmporteerd maar nooit gebruikt. Wat verschijnt is een groen vinkje (`PhCheck`) in een popup. De echte punten zijn de ongebruikte import, de `bg-black/30`-overlay en `shadow-2xl`.
> - §8 stelde `0/4/6/8px` voor. De repo gebruikt `8px` en `12px`; dat is nu de afspraak in `docs/DESIGN-SYSTEM.md` §11.
> - §4, §6 en §7 misten de volgende gevallen: `MixedRetrievalActivity`, `CircuitsActivity`, `IdealGasLawActivity`, `SpringForceLabActivity`, `SpotCheckModal`, `TicketModal`, `SlideCelebration`, `SlideMathGraph`, `Toolbox`.
> - §2 miste het hardloper-emoji in `SpringForceLabActivity.vue`.
> - Ontbrekende bevinding: `TicketModal.vue` (entry én exit) gebruikt amber en indigo, terwijl `card-entry` en `card-exit` in alle 24 lessen `type: 'digital'` zijn. Het ticket hoort dus blauw te zijn.

## Scope van deze review

- Live website: `https://wetenschappen.github.io/willebroek/`
- Repository: `wetenschappen/willebroek`
- Lokale basis: commit `58df154` — `de-vibecoding 6`
- Belangrijkste referenties:
  - `design_skill.txt`
  - `docs/DESIGN-SYSTEM.md`
- Gecontroleerde technische aspecten:
  - metadata en favicon;
  - live CSS en opgebouwde assets;
  - navigatie en routering;
  - activiteitsschermen;
  - animaties, blur, shadows, kleuren en radii;
  - projectorleesbaarheid;
  - responsiviteit en functionele staten.

## Samenvatting

De hoofdinterface volgt het afgesproken werkblad- en projectorconcept inmiddels duidelijk beter. De selectiepagina's, directe klasflow, donkere navigatie, IBM Plex-typografie en activiteitkleurtaal vormen een doelgerichte basis.

De grootste resterende afwijkingen zitten in oudere interactieve lescomponenten. Daar komen nog emoji's, paarse/violette legacy-kleuren, blur, semi-transparante overlays, zware shadows, bounce/pulse-animaties, confetti en veel verschillende border-radii voor.

### Algemene beoordeling

| Onderdeel | Beoordeling | Opmerking |
| --- | ---: | --- |
| Hoofdinterface en navigatie | 8/10 | Rustig, contrastrijk en duidelijk verbeterd |
| Les- en activiteitsschermen | 5/10 | Functioneel, maar visueel nog niet consequent met het design system |
| Technische metadata | 7/10 | Titel, description en favicon zijn goed; OG-afbeelding ontbreekt |
| Projectorvriendelijkheid | 6/10 | Goed in de shell, wisselend in modals en activiteiten |

## Presentatiemodal: specifieke reviewregel

De presentatie gebruikt een vaste `1920×1080`-canvas die naar het scherm schaalt.
Daarom zijn generieke app-badges, kleine `text-sm`-labels en dubbele categorieën
niet geschikt binnen slides: op een Chromebook worden ze te klein en inhoudelijk
herhalen ze vaak al de titel. `MathSlideWrapper` toont centraal alleen de rode
ankerbalk en de titel. Categoriegegevens blijven beschikbaar voor compatibiliteit,
maar worden niet als decoratieve student-facing badge gerenderd.

De discipline-slide behoudt zijn bruikbare rode contextanker, maar gebruikt een
compacte kopregel met titel en `AFSPRAKEN` in plaats van een gestapelde badgekop.

## Wat goed overeenkomt met de designrichtlijnen

### Rustigere hoofdflow

De hoofdflow is gewijzigd naar directe klasselectie:

```text
Vak → Klas → Module → Les
```

Dat is doelgerichter dan een overbodige jaarselectie en past bij de dagelijkse klasworkflow.

### Projectorvriendelijke basis

De nieuwe basis gebruikt onder andere:

- IBM Plex Sans voor interface- en leestekst;
- IBM Plex Mono voor metadata en technische labels;
- donkere tekst op lichte panelen;
- zichtbare randen en separators;
- duidelijke donkere navigatieknoppen;
- vaste activiteitkleuren met tekstlabels;
- functionele Phosphor-iconen;
- lijsten en werkbladstructuren in plaats van een generiek dashboard.

Dit sluit aan bij de kern van het design system:

> helderheid boven sfeer, structuur boven effect, inhoud boven decoratie.

### Geen duidelijke marketing- of generieke dashboardstijl

In de hoofdflow zijn geen duidelijke signalen gevonden zoals:

- paarse gradients;
- fake testimonials;
- generieke slogans;
- sparkle-emoji's in de hoofdinterface;
- een semi-transparante globale header.

### Metadata en basis-HTML

De online HTML bevat:

- een correcte titel: `GO! Atheneum Willebroek`;
- een Nederlandstalige description;
- een favicon;
- OpenGraph title en description;
- een Twitter card-type.

### Loading- en foutstatus

`src/views/LessonView.vue` bevat zowel een laadstatus als een foutstatus. Daarmee is de app beter voorbereid op dynamisch laden dan een interface waarin een klik tijdelijk niets lijkt te doen.

## Bevindingen en openstaande verbeterpunten

## 1. Prioriteit hoog — OpenGraph-afbeelding ontbreekt

In `index.html` staat:

```html
<meta property="og:image" content="/og-image.png">
```

`public/og-image.png` bestaat echter niet. Online gaf dit bestand een `404`.

Dit is precies de technische rode vlag uit `design_skill.txt`: een ontbrekende OpenGraph-afbeelding.

### Actie

- [ ] Voeg `public/og-image.png` toe.
- [ ] Gebruik bij voorkeur een absolute URL voor sociale platforms:

```html
<meta
  property="og:image"
  content="https://wetenschappen.github.io/willebroek/og-image.png"
>
```

- [ ] Als er voorlopig geen afbeelding komt, verwijder dan de ongeldige metadata in plaats van naar een 404 te verwijzen.

## 2. Prioriteit hoog — Emoji's in de krachtenactiviteit

Ook gevonden buiten deze activiteit: `SpringForceLabActivity.vue` rendert een 🏃 als hardloper in de SVG (`emojiX`/`emojiY`, regel ~943). Neem die mee in dezelfde opruiming.

In `s-activities/ForcesLabActivity.vue` worden emoji's als objectrepresentatie gebruikt:

```js
{ id: 'auto', label: 'Auto', emoji: '🚗' }
{ id: 'mens', label: 'Persoon', emoji: '🧍' }
{ id: 'hond', label: 'Hond', emoji: '🐕' }
{ id: 'appel', label: 'Appel', emoji: '🍎' }
```

Deze worden ook in de simulatie gerenderd.

Dit botst met:

- `design_skill.txt`: geen emoji's als UI-elementen;
- `docs/DESIGN-SYSTEM.md`: geen emoji's als interface-elementen;
- projectorvriendelijkheid: emoji-weergave verschilt per platform en browser.

### Actie

- [ ] Vervang emoji's door eenvoudige SVG-objecten of sobere functionele iconen.
- [ ] Behoud de schematische stijl van een fysicasimulatie.
- [ ] Controleer of objecten op een beamer nog duidelijk herkenbaar zijn.

Mogelijke functionele iconen zijn bijvoorbeeld `PhCar` en `PhUser`; voor hond en appel is een kleine eigen SVG waarschijnlijk beter dan een decoratief pictogram.

## 3. Prioriteit hoog — Timer is te agressief vormgegeven

In `src/components/widgets/TimerWidget.vue` worden onder andere gebruikt:

- `backdrop-blur-sm`;
- `animate-pulse`;
- bounce-animatie;
- ping-animatie;
- `text-9xl`;
- een zeer sterke rode glow-shadow;
- `rounded-3xl`;
- een pulserende alarmtekst `TIME'S UP!`.

Relevante regels zijn ongeveer `180–185`, `197` en `242`.

Dit is functioneel begrijpelijk als alarm, maar visueel te luid voor het rustige leerplatform. Het raakt meerdere waarschuwingen uit `design_skill.txt` en `docs/DESIGN-SYSTEM.md`:

- bad animations;
- pulse en bounce;
- overmatige shadows;
- overdreven grote typografie;
- onrustige actieve toestand.

### Actie

- [ ] Vervang bounce, ping en glow door een statische alarmstatus.
- [ ] Gebruik een vaste rode kleurankerbalk.
- [ ] Toon een duidelijk tekstlabel, bijvoorbeeld `TIJD VOORBIJ`.
- [ ] Houd de timer groot genoeg voor projectie, maar niet op `text-9xl`-schaal.
- [ ] Gebruik een gewone knop `Sluiten`.

Gewenste structuur:

```text
TIJD VOORBIJ
00:00
Sluiten
```

## 4. Prioriteit hoog — Blur en semi-transparante overlays

Blur en transparantie komen nog voor in meerdere componenten:

- `src/components/activities/DragDropActivity.vue`
- `src/views/LessonView.vue`
- `src/components/NamePickerOverlay.vue`
- `src/components/widgets/TimerWidget.vue`

Voorbeelden:

```html
bg-slate-900/60 backdrop-blur-sm
bg-white/80 backdrop-blur-md
bg-white/60 backdrop-blur-md
shadow-2xl
```

Dit botst met de regel dat blur, glow en neon niet zonder functionele reden mogen worden gebruikt. Op een projector zijn vaste, contrastrijke vlakken bovendien voorspelbaarder dan vervaagde achtergronden.

### Actie

Vervang bijvoorbeeld:

```html
bg-slate-900/60 backdrop-blur-sm
```

door:

```html
bg-slate-900/85
```

En vervang:

```html
bg-white/80 backdrop-blur-md
```

door een vast paneel met zichtbare rand:

```html
bg-white border-2 border-[var(--color-line-strong)]
```

- [ ] Verwijder blur uit gewone fout-, laad- en modaltoestanden.
- [ ] Houd de overlay egaal en de inhoud scherp.

## 5. Prioriteit midden — Paarse en violette legacy-kleuren

Er zijn geen paarse gradients gevonden, maar wel paarse/violette UI-kleuren in onder andere:

- `src/components/Toolbox.vue`
- `src/data/modules.js`

Voorbeelden:

```js
color: 'text-indigo-600'
bg: 'bg-indigo-50'
color: 'text-violet-600'
bg: 'bg-violet-50'
```

en:

```html
bg-purple-100 text-purple-600
```

Dit maakt de kleurtaal minder eenduidig. De afgesproken semantiek is:

- blauw = digitaal;
- rood = presentatie;
- groen = boek/bundel.

### Actie

- [ ] Maak module- en toolboxkleuren neutraal.
- [ ] Gebruik kleur niet als vak-, module- of moeilijkheidskleur.
- [ ] Reserveer blauw, rood en groen voor activiteitstypes.
- [ ] Controleer of elke kleur nog een tekstlabel of andere betekenisdrager heeft.

## 6. Prioriteit midden — Drag-and-drop bevat te veel hover- en transitie-effecten

In `src/components/activities/DragDropActivity.vue` komen onder andere voor:

- `transition-all`;
- `hover:shadow-sm`;
- `hover:border-indigo-400`;
- `hover:bg-indigo-50/40`;
- `scale-95` tijdens slepen;
- bounce op de voltooiingsstatus;
- meerdere afgeronde chips en rijen.

### Actie

- [ ] Gebruik vaste 2px-randen voor dropzones.
- [ ] Maak de drag-status zichtbaar via structuur en tekst, niet via schaaltransformatie.
- [ ] Verwijder hover-shadow.
- [ ] Gebruik neutrale dropzones met een duidelijke actieve border.
- [ ] Toon feedback ook tekstueel: `Correct`, `Opnieuw proberen` of `Nog niet ingevuld`.

## 7. Prioriteit midden — Confetti in de presentatiemodal

> **Correctie.** Deze bevinding klopte feitelijk niet. `PhConfetti` wordt geïmporteerd maar nergens gerenderd; de variabele `showConfetti` toont een groene popup met `PhCheck`. Wat resteert is de ongebruikte import, de `bg-black/30`-overlay en `shadow-2xl`.

`src/components/modals/PresentationModal.vue` importeert onder andere:

```text
PhStar
PhConfetti  ← ongebruikt
showConfetti  ← naam dekt de inhoud niet
```

De overlay toont een vinkje met de tekst `Correct!`.

Dit is minder ernstig dan de timer, maar botst met de wens om actieve toestand via structuur en tekst te communiceren in plaats van via decoratieve animatie.

### Actie

- [ ] Verwijder de ongebruikte `PhConfetti`-import en hernoem `showConfetti`.
- [ ] Vervang de `bg-black/30`-overlay en `shadow-2xl` door een egaal paneel met een 2px rand.
- [ ] Houd `PhCheckCircle` als rustige status: `Antwoord gecontroleerd` of `Correct`.
- [ ] Laat de knop `Ga verder` de primaire feedbackactie zijn.

## 7b. Prioriteit midden — Het ticket volgt de kleurtaal niet

Deze bevinding ontbrak in de eerste review. `card-entry` en `card-exit` staan in alle 24 lessen als `type: 'digital'`, dus blauw met het label `DIGITAAL`. `src/components/modals/TicketModal.vue` opent echter een eigen fullscreen met een ander palet:

```text
entry  →  amber-500 / amber-50
 exit  →  indigo-600 / indigo-50
```

Zie `accentBgSelected`, `accentBg`, `progressBarColor` (regels ~176–185).

Daarmee zegt de kaart op de tijdlijn blauw en de modal amber of indigo. Bovendien gebruikt de modal `bg-amber-50/50`, `bg-indigo-50/30`, een `backdrop-blur`-badge en `text-slate-400`, en hergebruikt hij `.modal-fullscreen` niet.

### Actie

- [ ] Bouw het ticket op `.modal-fullscreen` uit `src/style.css`.
- [ ] Gebruik één kleurtype: blauw `--color-digital`, met het label `DIGITAAL`.
- [ ] Laat entry en exit alleen verschillen in titel, icoon en vraagset, niet in kleur.
- [ ] Vervang de halftransparante headerbalken door `--color-panel-muted`.

## 8. Prioriteit midden — Te veel verschillende border-radii

De live CSS bevat veel verschillende radiuswaarden. In de componenten worden onder andere gebruikt:

- `rounded-full`;
- `rounded-lg`;
- `rounded-xl`;
- `rounded-2xl`;
- `rounded-3xl`;
- hoekige fullscreenpanelen.

Dat is niet overal fout, maar de oudere activiteitenschermen voelen hierdoor als een verzameling verschillende visuele systemen.

De afspraak staat nu in `docs/DESIGN-SYSTEM.md` §11:

```text
0px   fullscreen werkbladen
6px   .badge
8px   controls, knoppen, .btn
12px  kaarten, panelen, dialoogvensters
50%   uitsluitend .fab-btn
```

### Radius-systeem

Dit voorstel is vervangen door de afspraak hierboven. De oudere stap `4px` en `6px` voor knoppen bestaan niet in de repo; gebruik `.btn` en `rounded-control`.

- [x] Inventariseer de legacy-componenten — zie de opruimlijst in `docs/DESIGN-SYSTEM.md` §16.
- [ ] Normaliseer radii tijdens de volgende activiteitspass.
- [ ] Vermijd nieuwe willekeurige radiuswaarden.

## 9. Prioriteit midden — Fletse ondersteunende tekst

Op verschillende plaatsen komen voor:

```text
text-slate-400
text-white/70
text-white/50
bg-white/60
```

Voorbeelden staan in `Toolbox.vue`, `TimerWidget.vue`, `DragDropActivity.vue`, `PresentationModal.vue` en `NamePickerOverlay.vue`.

Dit is riskant voor projectie wanneer de tekst functioneel is, bijvoorbeeld:

- `Beveiligd met wachtwoord`;
- `Open cursus als PDF`;
- `Klik ergens om te sluiten`;
- `Begrippen koppelen`.

### Actie

- [ ] Gebruik voor belangrijke ondersteunende tekst `--color-ink-soft`.
- [ ] Vermijd lage opacity voor functionele tekst.
- [ ] Controleer tekst op een beamer of in een screenshot op afstand.
- [ ] Laat contrast niet afhangen van hover.

## Routering en directe links

De router gebruikt `createWebHashHistory()`. De werkelijke routes zijn daardoor hash-routes, bijvoorbeeld:

```text
/willebroek/#/
/willebroek/#/fysica/class/3D
```

Een request naar een pad zonder hash, zoals:

```text
/willebroek/fysica
```

komt online eerst bij `public/404.html` terecht. Die pagina verwijst met JavaScript door naar de hash-route.

Dit is een geldige GitHub Pages-oplossing, maar directe links zijn hierdoor minder elegant deelbaar en indexeerbaar.

- [ ] Behoud de oplossing zolang GitHub Pages hash-routing vereist.
- [ ] Controleer dat `404.html` bij elke routewijziging blijft werken.
- [ ] Documenteer hash-routes in smoke-tests en eventuele handleidingen.

## Inhoudelijke routecontrole

> **Aangevuld.** Naast biologie 5D en 6D heeft ook **fysica 6D/A** geen lessen.
> Drie klassen tonen dus een lege modulelijst. Opgelost door:
>
> - de landing page meteen vak en klas laat kiezen;
> - de lege staat uitleg en één uitweg naar de landing page te geven in plaats van
>   een tweede keuze naar de oude jaarpagina;
> - de klascode-naar-leerjaar-mapping naar één bron te verhuizen
>   (`yearByClass` in `src/data/students.js`), want die stond dubbel;
> - `npm run check` die mapping te laten controleren en de klassen zonder
>   lessen te rapporteren.

De directe biologieklassen zijn:

```text
5D
6D
```

In `src/views/ModuleSelection.vue` worden deze naar jaar 5 en jaar 6 gemapt. De huidige moduledata bevat echter voornamelijk modules voor jaren 1 tot en met 4.

Daardoor kunnen deze routes een leeg of onvolledig moduleoverzicht tonen:

```text
#/biologie/class/5D
#/biologie/class/6D
```

Dit is geen zuiver visueel probleem, maar wel een UX-probleem: een zichtbare klaskeuze moet naar een bruikbaar vervolgscherm leiden.

- [ ] Voeg passende module- en lesdata voor 5D toe.
- [ ] Voeg passende module- en lesdata voor 6D toe.
- [ ] Of leg expliciet een correcte mapping naar bestaande lesjaren vast.
- [ ] Test elke directe klasroute handmatig.

## Wat al gecontroleerd is

De volgende controles waren succesvol tijdens de review:

```text
npm run check
npm run build
npm run smoke
git diff --check
```

De health check bevestigde onder andere:

- alleen `physics` en `biology` zijn actieve vakken;
- 24 registry-items horen bij actieve vakken;
- 24 fysica-/biologielessen hebben geldige ids;
- gebruikte activity-types hebben geldige registraties;
- activity-imports verwijzen naar bestaande bestanden;
- geen wiskunde-, chemie- of test-playgroundcode zit in de actieve runtimecode.

## Aanbevolen volgorde voor de volgende sessie

0. Doc-reconciliatie — **gedaan**: `docs/DESIGN-SYSTEM.md` Deel II, `AGENTS.md` en dit document bijgewerkt.
1. Voeg de ontbrekende OG-afbeelding toe of verwijder de ongeldige tag.
2. Verwijder emoji's uit `ForcesLabActivity.vue` én `SpringForceLabActivity.vue`.
3. Herwerk `TimerWidget.vue` naar een statische, contrastrijke alarmstatus.
4. Verwijder blur en overmatige transparantie uit fout-, laad- en modaltoestanden.
5. Zet `TicketModal.vue` op `.modal-fullscreen` met blauw `--color-digital` in plaats van amber/indigo.
6. Vervang de succes-popup en bounce door functionele feedback.
7. Neutraliseer paarse/violette module- en toolboxkleuren.
8. Normaliseer ondersteunende tekst en border-radii.
9. Vul de biologie-inhoud voor 5D en 6D aan.
10. Controleer alle directe hash-routes handmatig.
11. Voer daarna opnieuw uit:

```bash
npm run check
npm run build
npm run smoke
git diff --check
```

## Eindconclusie

De hoofdinterface is niet langer een generieke of haastig opgebouwde dashboardstijl. De nieuwe navigatie en designbasis zijn doelgericht en sluiten goed aan op projectorleesbaarheid.

De resterende designschuld zit vooral in de oudere interactieve activiteiten. De volgende ontwerp-pass moet daarom niet opnieuw de hele shell veranderen, maar de lescomponenten systematisch naar dezelfde visuele taal brengen:

> geen decoratief effect als structuur volstaat; geen kleur zonder label; geen animatie als een vaste toestand duidelijker is.
