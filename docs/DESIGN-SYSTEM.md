# Willebroek design system

> Praktische ontwerpafspraken voor het leerplatform fysica en biologie.
>
> Dit document is leidend voor nieuwe schermen en componenten. Het doel is niet
> een opvallende interface, maar een rustig, doelbewust werkblad dat leerlingen
> zelfstandig van een beamer kunnen lezen.
>
> Dit document bestaat uit twee delen. **Deel I** beschrijft principes en is
> stabiel. **Deel II** beschrijft de tokens en systeemklassen uit
> `src/style.css`; dat is de implementatie van Deel I. Bij twijfel geldt Deel I:
> als code en document verschillen, is de code fout, niet het principe.

## Inhoud

- Deel I — Principes
  - [1. Ontwerpdoel](#1-ontwerpdoel)
  - [2. Projectorregel: geen zwakke signalen](#2-projectorregel-geen-zwakke-signalen)
  - [3. Activiteitstaal: kleur hoort bij het soort activiteit](#3-activiteitstaal-kleur-hoort-bij-het-soort-activiteit)
  - [4. Typografie](#4-typografie)
  - [5. Lay-out en componenten](#5-lay-out-en-componenten)
  - [6. ABC-tijdlijn](#6-abc-tijdlijn)
  - [7. Copy: zo weinig mogelijk, zo specifiek mogelijk](#7-copy-zo-weinig-mogelijk-zo-specifiek-mogelijk)
  - [8. Verboden vibe-code-signalen](#8-verboden-vibe-code-signalen)
- Deel II — Implementatie
  - [9. Bron van waarheid](#9-bron-van-waarheid)
  - [10. Kleurtokens](#10-kleurtokens)
  - [11. Radius, schaduw en focus](#11-radius-schaduw-en-focus)
  - [12. Ruimte](#12-ruimte)
  - [13. Teksttokens en contrast](#13-teksttokens-en-contrast)
  - [14. Systeemklassen](#14-systeemklassen)
  - [15. Verplichte toepassing: welke schermen moeten volgen](#15-verplichte-toepassing-welke-schermen-moeten-volgen)
  - [16. Opruimlijst](#16-opruimlijst)
  - [17. Handhaving: `design-baseline.json`](#17-handhaving-design-baselinejson)
  - [18. Nieuwe schermen controleren](#18-nieuwe-schermen-controleren)

## 1. Ontwerpdoel

Willebroek moet in een klaslokaal op beamerafstand leesbaar zijn zonder dat de
leerkracht de interface moet uitleggen. Ontwerp daarom voor de leerling die op
de achterste rij zit:

- informatie moet onmiddellijk herkenbaar zijn;
- tekst moet donker en groot genoeg zijn;
- belangrijke structuur moet zichtbaar blijven zonder hover;
- de interface moet rustig blijven, zonder decoratieve ruis;
- elke tekst moet iets functioneels zeggen.

De kern is: **helderheid boven sfeer, structuur boven effect, inhoud boven decoratie**.

## 2. Projectorregel: geen zwakke signalen

Fletse grijze tekst, dunne grijze lijnen en informatie die alleen via hover
zichtbaar wordt, zijn verboden in de lesinterface.

Gebruik niet:

- lichtgrijze tekst voor instructies, metadata of beschrijvingen;
- hairline borders als enige scheiding tussen belangrijke onderdelen;
- lage opacity om een actieve of leesbare tekst te maken;
- kleurverschillen die alleen zichtbaar zijn bij hover;
- een status die uitsluitend door kleur wordt meegedeeld.

Gebruik wel:

- donkere tekst op een lichte achtergrond;
- minimaal 2px lijnen voor belangrijke scheidingen;
- een vaste, brede kleurankerbalk voor activiteitstypes;
- tekstlabels naast kleur;
- een sterke focus- en hoverstaat zonder layoutverschuiving.

`--color-ink` is de standaard voor gewone leesbare tekst. `--color-ink-soft`
mag alleen voor ondersteunende tekst worden gebruikt wanneer die nog duidelijk
leesbaar blijft (9.7:1 op wit).

Er is **geen** `--color-ink-muted`. Die token bestond vroeger op `#718087`
(4.09:1) en haalde de drempel niet op een beamer tegen een witte muur. Hij is
bewust verwijderd, niet behouden als synoniem. Voeg geen lichtgrijze tint
opnieuw toe: gebruik `--color-ink`, `--color-ink-soft` of `slate-500`
(`#52636a`, 6.3:1) als de tekst echt ondergeschikt is.

## 3. Activiteitstaal: kleur hoort bij het soort activiteit

Kleur verwijst nooit naar het schoolvak. Fysica en biologie blijven visueel
neutraal; hun onderscheid komt via de functionele iconen `PhPlanet` en
`PhMicroscope` en via tekst.

| Kleur | Betekenis | Zichtbaar label | Voorbeelden |
| --- | --- | --- | --- |
| Blauw | digitaal | `DIGITAAL` | entry ticket, exit ticket, quiz, digitale oefening |
| Rood | presentatie | `PRESENTATIE` | theorie, klassikale uitleg, demonstratie |
| Groen | fysiek werk | `BOEK / BUNDEL` | boek, bundel of werkblad |

Een activiteitstype krijgt altijd:

1. een vaste, zichtbare kleurankerbalk;
2. een tekstlabel dat de kleur betekenis geeft;
3. voldoende contrast voor titel, beschrijving en actie;
4. geen extra vierde kleur voor een technische status zoals `check`.

Kleur is nooit de enige informatiedrager. Combineer kleur met label, tekst,
positie en waar nuttig een functioneel icoon.

## 4. Typografie

De vaste lettertypes zijn:

- `IBM Plex Sans` voor interface- en leestekst;
- `IBM Plex Mono` voor korte metadata, tijden en technische labels.

Gebruik een beperkt type-raster. Verklein tekst niet om meer inhoud in een
scherm te proppen. Een projector heeft liever minder tekst die goed leesbaar is
dan meer tekst die leerlingen niet kunnen ontcijferen.

Titels, instructies en beschrijvingen zijn donker. Metadata is nooit zo klein of
licht dat het op afstand verdwijnt. Gebruik korte labels in hoofdletters alleen
waar ze scanbaarheid verbeteren.

## 5. Lay-out en componenten

- Gebruik het bestaande 8px-ritme voor ruimte, padding en gaps.
- Houd inhoud op een vaste, leesbare kolombreedte.
- Gebruik lijsten en werkbladen boven generieke dashboardkaarten.
- Gebruik één rustige panelstijl; geen verzameling losse visuele kaarten.
- Houd randen, padding, uitlijning en radius consistent.
- Laat hover nooit de layout verschuiven.
- Gebruik sterke vaste linkerbalken voor lijstitems en tijdlijnactiviteiten.
- Laat actieve toestand zien met structuur en tekst, niet met glow of pulseren.

## 6. ABC-tijdlijn

De ABC-structuur is al betekenisvol. Herhaal die betekenis niet onnodig.

De letter in de tijdlijnmarker en de titel naast de marker zijn voldoende:

- `A  Instap`
- `B  Verwerken`
- `C  Afsluiting`

Schrijf dus niet nog eens `Fase A`, `Fase B` of `Fase C` naast de letter. De
letter is de fase-indicator; de titel geeft de activiteit aan. Gebruik ruimte en
tekst alleen voor informatie die de leerling nodig heeft, zoals tijdsduur,
instructie, activiteitstype en actie.

## 7. Copy: zo weinig mogelijk, zo specifiek mogelijk

Elke tekst moet een taak verduidelijken. Schrap:

- dubbele labels;
- uitleg die al uit de context blijkt;
- generieke slogans;
- decoratieve microcopy;
- meerdere knoppen met dezelfde betekenis.

Geef de actie kort en concreet: `Start digitaal`, `Open presentatie` of `Open
boek / bundel`. Herhaal niet tegelijk hetzelfde type in meerdere omschrijvingen
als één label volstaat.

## 8. Verboden vibe-code-signalen

Nieuwe code mag deze patronen niet introduceren:

- emoji's als interface-element;
- decoratieve sparkles of generieke dashboardversiering;
- paarse gradients, glow, blur of neon zonder functionele reden;
- grote decoratieve iconen naast kleine tekst;
- agressieve hover-, bounce- of pulse-animaties;
- kaarten die bij hover verspringen;
- willekeurige kleuren per vak of per scherm;
- informatie die alleen zichtbaar is door kleur of hover;
- verschillende willekeurige border-radii of spacingwaarden;
- generieke of lege marketingtaal.

Phosphor-iconen zijn functioneel: ze verduidelijken een actie, status of vak.
Gebruik ze niet als decoratieve opvulling.

---

# Deel II — Implementatie

> Dit deel beschrijft wat er feitelijk in de repo staat. Alles hier is na te
> kijken in `src/style.css` en `tailwind.config.js`. Wijzig je een token of
> systeemklasse, werk dan deze sectie in dezelfde commit bij.

## 9. Bron van waarheid

De implementatie staat op drie plaatsen, in deze volgorde van gezag:

| Plaats | Bevat |
| --- | --- |
| `src/style.css` — `:root` | de kleur-, radius-, schaduw- en focustokens |
| `src/style.css` — `@layer components` | de systeemklassen: `.card-*`, `.badge-*`, `.modal-*`, `.btn*`, `.lesson-*` |
| `tailwind.config.js` | de Tailwind-doorvertaling: `slate`-herkartering, `fontFamily`, `borderRadius`, `boxShadow` |

Gebruik **geen** losse Tailwind-kleurschaal als `blue-600` of `indigo-500` in een
schermcomponent. Een scherm dat de huisstijl volgt, gebruikt uitsluitend:

1. de systeemklassen uit sectie 14; of
2. de tokens uit sectie 10 via `var(--color-…)` in een eigen `<style>`-blok.

Er bestaan nu Tailwind-utilities voor de systeemkleuren:

```text
bg-paper            bg-panel           bg-panel-muted
bg-digital          bg-digital-soft    text-digital
bg-presentation     bg-presentation-soft  text-presentation
bg-workbook         bg-workbook-soft   text-workbook
border-line         border-line-strong
text-ink            text-ink-light     text-ink-soft      text-ink-dark
text-physics        text-biology       text-action
rounded-control     rounded-card
shadow-subtle       shadow-card        shadow-lift        shadow-float
```

Gebruik die in nieuwe code. Voor de resterende gevallen blijft `var(--color-…)`
in een `style`-attribuut het alternatief.

De standaard Tailwind-schalen zijn niet verboden in een laboratoriumsimulatie
waar een kleur een natuurkundige grootheid voorstelt (zie sectie 15).

## 10. Kleurtokens

Deze variabelen staan in `:root` in `src/style.css`.

### Oppervlak en tekst

| Token | Waarde | Gebruik |
| --- | --- | --- |
| `--color-paper` | `#f5f7f6` | pagina-achtergrond |
| `--color-panel` | `#ffffff` | kaarten, panelen, modalin houd |
| `--color-panel-muted` | `#edf2f1` | hover- en rustvlakken, ingesloten blokken |
| `--color-ink` | `#17252b` | standaard leesbare tekst |
| `--color-ink-soft` | `#34474e` | ondersteunende tekst die leesbaar moet blijven |
| `--color-line` | `#52636a` | gewone randen en scheidingen |
| `--color-line-strong` | `#263a42` | nadrukranden, kleurankerbalken, 2px-scheidingen |

### Activiteitstype

| Token | Waarde | Betekenis | Label |
| --- | --- | --- | --- |
| `--color-digital` / `--color-digital-soft` | `#075985` / `#e3f1f5` | digitaal | `DIGITAAL` |
| `--color-presentation` / `--color-presentation-soft` | `#b4232f` / `#fde8e9` | presentatie | `PRESENTATIE` |
| `--color-workbook` / `--color-workbook-soft` | `#237a4b` / `#e7f2ea` | fysiek werk | `BOEK / BUNDEL` |

### Vak- en actiekleur

| Token | Waarde | Gebruik |
| --- | --- | --- |
| `--color-physics` / `--color-physics-soft` | `#176b87` / `#e3f1f5` | watermerk en eyebrow van het vak Fysica |
| `--color-biology` / `--color-biology-soft` | `#397553` / `#e7f2ea` | watermerk en eyebrow van het vak Biologie |
| `--color-action` / `--color-action-soft` | `#b65b2d` / `#fbede5` | het interactieaccent: actieve tijdlijnmarker en -lijn, hover op rijen, links, `.fab-btn` en `.goals-trigger`, en gemarkeerde woorden in de afsprakenpresentatie |

> **Let op — token-schuld, nog niet opgelost.** In de praktijk zijn er te veel
> bijna-gelijke kleuren:
>
> - `--color-ink-muted` is verwijderd. De Tailwind-utility `text-ink-muted`
>   bestaat **niet meer**; die gaf `#52636a` en botste met het CSS-token. Gebruik
>   `text-ink`, `text-ink-light`, of `var(--color-ink-soft)`.
> - Fysica (`#176b87`) en digitaal (`#075985`) liggen dicht bij elkaar, net als
>   biologie (`#397553`) en boek/bundel (`#237a4b`). Een leerling kan vak- en
>   activiteitskleur daardoor niet betrouwbaar onderscheiden. Het tekstlabel en
>   het icoon (`PhPlanet` / `PhMicroscope`) blijven daarom **verplicht**.

## 11. Radius, schaduw en focus

| Token | Waarde | Toepassing |
| --- | --- | --- |
| `--radius-control` | `8px` | knoppen, invoervelden, compacte controls |
| `--radius-card` | `12px` | kaarten, panelen, `modal-content` |
| `--shadow-rest` | `0 1px 2px` + `0 8px 24px` | rustende kaarten |
| `--shadow-dialog` | `0 20px 50px rgb(23 37 43 / 0.18)` | dialoogvensters en overlaypanelen |
| `--focus-ring` | `0 0 0 3px rgb(23 107 135 / 0.24)` | `:focus-visible`, al globaal ingesteld |

Daarnaast heeft `.badge` een vaste `6px` en gebruikt `.fab-btn` een cirkel.

Dit is de volledige, toegestane radiuslijst voor de schil van een scherm:

```text
0px        fullscreen werkbladen
6px        .badge
8px        controls, knoppen, .btn
12px       kaarten, panelen, dialoogvensters
50%        uitsluitend .fab-btn
```

Losse Tailwind-radii zijn niet verboden voor *binnen*elementen van een
simulatie, maar de schil volgt bovenstaande lijst.

`rounded-2xl` (`16px`), `rounded-3xl` (`24px`), `rounded-xl` (`12px`) en
`rounded-lg` (`8px`) zijn Tailwind-utilities die toevallig in de buurt komen.
Gebruik in nieuwe code `rounded-control` of `rounded-card`, zodat de bedoeling
zichtbaar is.

> Deze lijst vervangt het voorstel `0/4/6/8px` uit `DESIGN-REVIEW-LIVE.md` §8.
> De repo gebruikt `8` en `12`; dat is nu de afspraak.

## 12. Ruimte

Er is **geen** spacingschaal als token. De afspraak is het 8px-ritme uit
sectie 5, uitgedrukt in Tailwind-stappen: `2` (8px), `3` (12px), `4` (16px),
`6` (24px), `8` (32px). Vermijd oneven tussenstappen voor structuur.

## 13. Teksttokens en contrast

Gemeten contrast op `--color-panel` (`#ffffff`):

| Kleur | Ratio | Verdict |
| --- | ---: | --- |
| `--color-ink` `#17252b` | 15.7:1 | ruim voldoende |
| `--color-ink-soft` `#34474e` | 9.7:1 | voldoende |
| `--color-digital` `#075985` | 7.6:1 | voldoende |
| `--color-presentation` `#b4232f` | 6.5:1 | voldoende |
| `slate-500` `#52636a` | 6.3:1 | voldoende, voor echt ondergeschikte tekst |
| `--color-workbook` `#237a4b` | 5.3:1 | voldoende |
| `--color-action` `#b65b2d` | 4.6:1 | net voldoende, alleen voor accenten |
| `slate-400` `#718682` | 3.9:1 | **zakt** — nooit functionele tekst |
| `slate-300` `#b8c8c6` | 1.7:1 | **zakt** — nooit functionele tekst |

`slate-400` en `slate-300` halen de drempel voor gewone tekst (4.5:1) niet en
verdwijnen op een beamer. Gebruik `--color-ink` of `--color-ink-soft`, of
`slate-500` (`#52636a`, 6.3:1) als de tekst echt ondergeschikt is.

## 14. Systeemklassen

Alles hieronder staat in `@layer components` in `src/style.css`. Een scherm dat
de huisstijl volgt, hergebruikt deze klassen in plaats van eigen Tailwind-
combinaties.

### Activiteitskaart

| Klasse | Functie |
| --- | --- |
| `.card` | basispaneel: wit, `--radius-card`, `--shadow-rest`, 4px kleurankerbalk via `::before` |
| `.card-interactive` | klikbare kaart met hover op `--color-line-strong` |
| `.card-locked` | niet-beschikbare kaart |
| `.card-digital` / `.card-check` | ankerbalk blauw |
| `.card-paper` | ankerbalk groen |
| `.card-class` | ankerbalk rood |
| `.card-done` | afgeronde kaart; kleurt `.lesson-activity-action` terug naar `--color-ink` |

### Activiteit in de ABC-tijdlijn

| Klasse | Functie |
| --- | --- |
| `.lesson-activity` | rij met 10px linkerbalk en 2px onderrand |
| `.lesson-activity-copy`, `.activity-meta`, `.activity-description` | tekstblok; `strong` is `--color-ink` |
| `.lesson-activity-action` | rechter actie, krijgt de kleur van het activiteitstype |
| `.extra-branch`, `.branch-activity` | extra materiaal onder de hoofdkaart |

### Badge

`.badge` plus precies één variant: `.badge-digital`, `.badge-paper`,
`.badge-class`, `.badge-check` (identiek aan `digital`) of `.badge-neutral`.
De badge is de **tekstlabel-drager** uit sectie 3.

> Deze klassen zijn gedefinieerd maar worden nog nergens gebruikt. De tijdlijn
> zet het label nu via `.activity-meta` (`ActivityCard.vue`) en de
> presentatieslides via `MathSlideWrapper`. Zet nieuwe labels op `.badge`.

### Knop

`.btn` als basis, daarna `.btn-primary`, `.btn-ghost`, `.btn-close` of
`.btn-close-dark`. Sluitknoppen op een donkere balk gebruiken `.btn-close-dark`.

### Overlay en dialoog

| Klasse | Functie |
| --- | --- |
| `.modal-backdrop` | egaal `rgb(23 37 43 / 0.72)` — **geen blur** — plus `.open` voor de zichtbare staat |
| `.modal-content` | wit paneel op `--color-panel`, `1px --color-line`, `--radius-card`, `--shadow-dialog` |
| `.modal-fullscreen` | schermvullende **lichte** basis: `--color-paper`, `--color-ink`, `z-[9999]`, geen radius |

### Fullscreen-activiteitenshell

Elk scherm dat het volledige beeld vult, bouwt op dezelfde vier delen. Dit is de
skeletstructuur die nieuwe activiteiten hergebruiken:

| Klasse | Functie |
| --- | --- |
| `.modal-fullscreen` | de buitenste laag: `fixed inset-0`, `--color-paper`, `100vw × 100vh` |
| `.fullscreen-bar` | kopbalk op `--color-panel` met `3px` onderrand; de kleur daarvan is het activiteitstype |
| `.fullscreen-progress` + `span` | voortgangsbalk van `4px` |
| `.fullscreen-body` | scrollend middenstuk met vaste padding (32/24px, 48px op desktop) |
| `.fullscreen-foot` | voetbalk op `--color-panel` met `2px` bovenrand, knoppen rechts |
| `.fullscreen-bar-digital` / `-paper` / `-class` | zet de ankerkleur van de kopbalk |
| `.fullscreen-title` / `.fullscreen-label` | titel in `--color-ink`, label in IBM Plex Mono |

De verplichte opbouw:

```html
<div class="modal-fullscreen">
  <header class="fullscreen-bar fullscreen-bar-digital">
    <span class="fullscreen-label">DIGITAAL</span>
    <h2 class="fullscreen-title">Exit ticket</h2>
  </header>
  <div class="fullscreen-progress"><span :style="{ width: progress + '%' }"></span></div>
  <div class="fullscreen-body"><!-- inhoud --></div>
  <footer class="fullscreen-foot">
    <button class="btn btn-primary">Volgende</button>
  </footer>
</div>
```

Eigenschappen van de shell, in volgorde van belangrijkheid:

1. **Altijd licht.** Zie sectie 15. Geen `bg-black`, `bg-slate-900` of
   `bg-slate-950` op een schermvullend leesvlak.
2. **Het activiteitstype zit in de kopbalk**, niet in een eigen palet.
3. **Eén radius:** `0` voor de shell, `--radius-card` voor panelen erbinnen.
4. **Eén schaduw:** `--shadow-dialog` voor overlays, `--shadow-rest` voor
   panelen. Geen `shadow-2xl`.
5. **Geen blur, glow, pulse of bounce.** Actieve toestand is statisch en
   tekstueel.
6. **Knoppen komen uit `.btn`**, niet uit losse `bg-slate-900 text-white`-
   combinaties.

> Een klein donker element is toegestaan en soms gewenst: de navigatiebalk
> (`.lesson-nav`), `.btn-primary`, `.timeline-icon` en `.fab-btn` zijn donker en
> dat is een bewuste keuze. Verboden is een **groot donker leesvlak**.

`.modal-fullscreen` was donker (`--color-ink` met witte tekst) en is op
projectorverzoek omgezet naar licht. Gebruik het als lichte basis voor **elke**
activiteit en elk ticket die het volledige scherm inneemt. Gebruik geen eigen
`fixed inset-0 … bg-black` of `bg-slate-900/80 backdrop-blur-sm`; dat is precies
de afwijking die `DESIGN-REVIEW-LIVE.md` §4 beschrijft.

### Shell en presentatie

`.lesson-nav`, `.lesson-main`, `.lesson-intro`, `.timeline-heading`,
`.timeline-time`, `.timeline-icon`, `.timeline-line`, `.goals-*`, `.fab-btn`,
`.tool-item`, `.selection-page`, `.content-page`, `.subject-row`, `.index-row`,
`.lesson-row`, `.class-choice`, `.empty-state`, `.slide-viewport`, `.ppt-stage`.

## 15. Verplichte toepassing: welke schermen moeten volgen

Deze regel stond nog nergens en veroorzaakte de huidige drift. **Elk scherm dat
een leerling te zien krijgt, volgt de huisstijl**, inclusief modals en
activiteiten. Er is geen uitzondering voor oudere componenten.

De activiteiten van de ABC-kaart erven het kleurtype van die kaart. De kaart
bepaalt dat type via `action` of `type`; zie `LessonContent.vue` (`getCardMeta`)
en `ActivityCard.vue`.

| Kaart op de tijdlijn | `action` / `type` | Component | Kleur in het scherm |
| --- | --- | --- | --- |
| `card-entry` | `entry-ticket` / `digital` | `TicketModal` | blauw `--color-digital`, label `DIGITAAL` |
| `card-exit` | `exit-ticket` / `digital` | `TicketModal` | blauw `--color-digital`, label `DIGITAAL` |
| `card-pres-*` | `presentation` / `class` | `PresentationModal` | rood `--color-presentation`, label `PRESENTATIE` |
| `card-workbook` | `workbook` / `paper` | `WorkbookModal` | groen `--color-workbook`, label `BOEK / BUNDEL` |
| `card-activity` | `activity` / `digital` | `DragDrop`, `MixedRetrieval`, `Circuits`, `ForcesLab`, `SpringForceLab`, `IdealGasLaw` | blauw `--color-digital`, label `DIGITAAL` |

Concreet voor de entry- en exittickets: die kaarten staan in alle lessen als
`type: 'digital'`, en `LessonContent.vue` geeft ze allebei het label `DIGITAAL`.
Het ticket is dus **blauw**, met het label `DIGITAAL`, en niet amber voor entry
en indigo voor exit zoals `TicketModal.vue` nu doet. Eén ticketcomponent, één
kleurtype, verschil alleen in tekst en icoon.

### Geen donkere leesvlakken — harde regel

**De projector staat tegen een witte muur.** Een donker scherm is dan niet
leesbaar: het licht van de beamer valt naast het beeld en de klas ziet een
grijze waas in plaats van tekst. Dit is geen smaakvoorkeur maar een gemeten
klacht uit de praktijk.

Daarom geldt voor élk scherm dat een leerling leest — slides, tickets,
activiteiten, presentaties:

- achtergrond is `--color-paper` of `--color-panel`;
- tekst is `--color-ink` of `--color-ink-soft`;
- **geen** `bg-black`, `bg-slate-900`, `bg-slate-950` of `var(--color-ink)` als
  schermvullend leesvlak;
- geen donkere gradient of donkere foto als leesachtergrond, tenzij er een
  lichte tekstplaat over het leesbare deel ligt.

Kleine donkere elementen blijven toegestaan: `.lesson-nav`, `.btn-primary`,
`.timeline-icon`, `.fab-btn`. Die zijn een accent, geen leesvlak.

De presentatielaag is omgezet: alle slides zijn licht.

### De presentatielaag volgt dezelfde taal

De slides zijn geen apart systeem meer. Ze gebruiken dezelfde tokens, dezelfde
kopbalklogica en dezelfde activiteitskleur (rood `PRESENTATIE`, want een slide
hoort bij een `card-pres-*`).

Wat is verwijderd:

- `bg-slate-900`/`bg-black` slides → `--color-paper`;
- `font-serif` (`SlideHero`, `SlideTitle`, `SlideStandard`) → het fontpaar is
  IBM Plex Sans + Mono;
- `font-family: 'Open Sans'` in 8 slides → **nooit geladen**, viel stil terug op
  de browserdefault;
- de `amber-500` ankerbalk in `MathSlideWrapper` → de rode activiteitskleur;
- `text-slate-500`/`text-slate-400` labels → `--color-ink-soft`;
- de zwarte letterbox in `.slide-viewport` → `--color-paper`.

De afsluitende slide heette `SlideCelebration` en toonde confetti, een ster en
"Klaar!". Feestelijke afsluitingen horen niet in een werkblad: de slide heet nu
`SlideClosing`, de layoutkey is `closing`, en de tekst is `Einde van de les` /
`Je hebt deze les afgerond.` zonder decoratie.

Alle 26 slides blijven bestaan. Dat sommige layouts nu niet in een les gebruikt
worden, betekent niet dat ze weg mogen: ze demonstreren de volledige
presentatiecapaciteit en moeten dus dezelfde taal spreken. Er is geen "dode"
slide die mag verouderen.

Voor de laboratoriumsimulaties (`Circuits`, `ForcesLab`, `SpringForceLab`,
`IdealGasLaw`) geldt een dubbele afspraak:

1. **De schil volgt het systeem**: een egaal paneel, 2px `--color-line-strong`,
   `--radius-card`, en de blauwe ankerbalk van het digitale activiteitstype.
2. **Binnen de simulatie mag kleur een grootheid voorstellen** — een veer, een
   batterij, een krachtvector. Zo'n kleur is geen UI-accent maar vakinhoud en
   moet altijd een legenda of label hebben.

Wat ook in de simulatie niet mag: blur, glow, neon, bounce, pulse, emoji als
object, en een willekeurige radius. Zie sectie 8.

## 16. Opruimlijst

Bekende afwijkingen tussen code en dit document. Deze lijst hoort te krimpen;
voeg hier niets toe zonder het eerst in de code te zien.

| Klasse | Status | Actie |
| --- | --- | --- |
| `.modal-fullscreen` | licht gemaakt, **nog 0 keer gebruikt** | inzetten voor ticket, presentatie en simulaties |
| `.fullscreen-bar/-body/-foot/-progress` | nieuw, **nog 0 keer gebruikt** | zie de shellsectie in sectie 14 |
| `.btn-primary`, `.btn-ghost` | gedefinieerd, **0 keer gebruikt** | knoppen in modals hierop zetten |
| `.badge` en alle `.badge-*` | gedefinieerd, **0 keer gebruikt** | badges in tijdlijn en modals hierop zetten |
| `.card` als losse klasse | **0 keer gebruikt**; alleen via `ActivityCard.vue` | rechtstreeks gebruik vermijden, anders verliest de kaart zijn ankerbalk |
| `TicketModal.vue` | eigen fullscreen, amber + indigo | herbouwen op de shellsectie + blauw |
| `PresentationModal.vue` | **omgezet** naar lichte shell met rode voortgangsbalk | klaar |
| `SlideHero`, `SlideTitle`, `SlideBig`, `SlideClosing` | **omgezet** naar `--color-paper` | klaar |
| `font-serif` | **verwijderd** uit alle slides | klaar |
| `Open Sans` | **verwijderd** uit alle slides | klaar |
| `MathSlideWrapper.vue` | **omgezet**: rode ankerbalk + badge met label | klaar |
| `DragDrop`, `MixedRetrieval`, `Circuits`, `ForcesLab`, `SpringForceLab`, `IdealGasLaw` | eigen schil, blur, `shadow-2xl` | schil naar sectie 15; sim-inhoud mag vakkleuren houden met legenda |
| `NamePickerOverlay.vue` | `bg-slate-900/90 backdrop-blur-sm` | egale overlay |
| `Toolbox.vue` | `indigo`, `purple`, `text-slate-400` | tokens + systeemklassen |
| `text-slate-400` / `text-slate-300` | 50 + 10 voorkomens | vervangen, zie sectie 13 |
| `tailwind.config.js` — `surface`, `chrome` | 0 echte gebruikssites | opruimen; `surface.50/100/200/300` dupliceert `slate.50/100/200/300` |
| `tailwind.config.js` — `brand`, `ink` | `text-brand-orange` (1×) en `text-ink-dark` (1×), beide een duplicaat van een token | vervangen door `text-action` en `text-ink`, daarna opruimen |
| `tailwind.config.js` — `math.violet` | **verwijderd** | klaar |
| `text-ink-muted` | **verwijderd** uit `src/style.css` en `tailwind.config.js` | klaar |
| Geen utility voor `--color-panel`, `--color-line`, `--color-digital`, `--color-presentation`, `--color-workbook` | **opgelost**: de kleurgroepen `paper`, `panel`, `line`, `digital`, `presentation`, `workbook` en `ink.soft` bestaan nu in `tailwind.config.js` | klaar |
| `rounded-2xl`, `rounded-3xl` | restanten in activiteiten | naar `rounded-card` |

## 17. Handhaving: `design-baseline.json`

De regels uit dit document worden automatisch gecontroleerd door
`scripts/design-check.mjs`, dat onderdeel is van `npm run check`.

Het werkt als een **ratchet**:

- `scripts/design-baseline.json` bevat het huidige aantal overtredingen per regel;
- een **nieuwe** overtreding laat `npm run check` zakken en blokkeert de build;
- bestaande schuld blokkeert niet, maar wordt gerapporteerd;
- ruim je schuld op, verlaag dan het getal in dezelfde commit.

Huidige baseline (na de eerste meting):

```text
text-slate-400     50      text-slate-300     10
font-serif          3      Open Sans           8
backdrop-blur      19      animate-pulse       6
bounce              3      ping                2
shadow-2xl         13      emoji               10
donkere leesvlakken  7      ink-muted           0  ← moet 0 blijven
```

`scripts/design-baseline-files.json` onthoudt wélke bestanden al bekend zijn,
zodat een nieuwe overtreding het juiste bestand aanwijst in plaats van de
alfabetische top.

Een losse meting:

```bash
node scripts/design-check.mjs
```

## 18. Nieuwe schermen controleren

Voor elke nieuwe component:

- Kan een leerling op de achterste rij de hoofdtekst lezen?
- Is alle achtergrond licht genoeg? (geen donker leesvlak)
- Is alle belangrijke tekst donker genoeg?
- Zijn belangrijke scheidingen en kleurankers zichtbaar zonder hover?
- Is kleur gecombineerd met een tekstlabel of andere betekenis?
- Staat er geen dubbele tekst die de interface langer maakt?
- Is het schoolvak neutraal en is kleur gereserveerd voor activiteitstype?
- Verschuift de layout niet bij hover of focus?
- Gebruikt het scherm de systeemklassen uit sectie 14 in plaats van eigen
  Tailwind-combinaties?
- Bouwt een schermvullende activiteit op de shellsectie uit sectie 14?
- Zijn mobiel en beamerbreedte bruikbaar?
- Zijn `npm run check`, `npm run build`, `npm run smoke` en `git diff --check` geslaagd?
