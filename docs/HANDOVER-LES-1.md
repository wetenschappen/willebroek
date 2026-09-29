# Handover: les 1 als gouden standaard

> Plak dit als openingsprompt. Het vat samen waar we staan, wat nog moet en
> waar het cursusmateriaal staat.

---

## Opdracht

`src/lessons/fys4-m01-druk-vaste-stoffen.js` is de **gouden standaard** voor alle
volgende lessen. De structuur staat vast en wordt door `npm run check`
afgedwongen. Wat nog moet: de **inhoud** van alles behalve het instapticket.

Werk stap per stap en laat me tussen elke stap kijken. Geen `TODO`-tekst of
Lorem ipsum achterlaten in wat leerlingen te zien krijgen.

## Wat al klaar is

Alleen **stap A, `card-entry`: het instapticket.** Dat is een sorteeropdracht
met drie kolommen (Normdruk / Onderdruk / Overdruk) en negen kaarten, alle negen
gecontroleerd tegen de officiële correctiesleutel. Het is een eigen vraagtype
`column-sort` in `TicketModal.vue` met de kaartcomponent
`src/components/activities/ColumnSortBoard.vue`: slepen met de muis, of tikken
op een kaart en dan op een kolom (voor aanraakschermen). Met directe feedback
(groen vinkje / rood kruis), een juist antwoord gaat op slot, en de uitslag meet
de **eerste poging** per kaart.

Let op: `docs/EVALUATION-DOSSIER-THEMA1.md` zegt "exact 4 diagnostische
meerkeuzevragen" voor `card-entry`. Wij hebben daar bewust een sorteeropdracht
van gemaakt. Werk dat dossier bij zodat het klopt met de code.

## Wat nog moet

Alles hieronder is nu nog `LOREM IPSUM`:

| Stap | Wat | Eis uit het dossier |
|---|---|---|
| A | `card-pres-a` + `slidesA` | 3 slides: doelen + activerende onderzoeks-/verwondervraag |
| B | `card-pres-b` + `slidesB` | 5 à 6 slides: definities, model, uitgewerkt rekenvoorbeeld (*Gegeven, Gevraagd, Formule, Berekening, Antwoord*), misconcepties, begripscheck |
| B | `card-workbook` | Werkboekopgaven met paginareferentie + formulehint |
| B | `card-activity` (`activities.main`) | Vakspecifieke simulatie; nu `idealGasLaw`, maar voor deze les is `PressureLab` met `defaultMode: 'vast'` de juiste keuze |
| B | `extraActivities` | Nog leeg: `dragDrop` en `mixedRetrieval` |
| C | `card-pres-c` + `slidesC` | 3 slides: vuistregels + misconceptie-ontkrachting |
| C | `card-exit` + `exitTicket` | 4 vragen: 3 meerkeuze met toelichting + 1 open synthesevraag |
| — | `goals` | Leerlingtaal, "Ik kan ..." |
| — | `config.description`, `workbook`, `config.cursusLink` | Nog Lorem ipsum of leeg |

Let op de **titel**: het bestand en de registry zeggen "Druk bij vaste stoffen"
(hoofdstuk 1), maar het instapticket toetst hoofdstuk 2 (gassen). Dat werkt als
diagnose op dag 1, maar beslis bewust of dat zo blijft.

## Cursusmateriaal

Alles staat in `docs/lesson material/Jaar 4/`:

| Bestand | Wat |
|---|---|
| `WACOF4DS2AL_T1_Handleiding (1).pdf` | Handleiding thema 1, 60 p. Bevat het handboek 1-op-1. **Gescand → de PDF-tool OCR't automatisch.** |
| `OSPLKITWACOF4DS2_01_oefeningen_met_oplossingen.pdf` | **De officiële correctiesleutel.** Altijd tegen deze controleren. |
| `WACOF4DS2AL_Jaarplan.xlsx` | Jaarplan. Hoofdstuk 1 = **2 lesuren**, met toets. |
| `WACOF4DS2AL_T1_juist fout stellingen_Oplossingen.docx` | Juist/fout-stellingen met oplossingen. |
| `GO! SO 2de graad doorstroom - leerplan Basisvorming.pdf` | Leerplan. |

**Pagina-offset:** de handleiding is het handboek met een marge. Er geldt
`handleiding p. X = handboek p. X + 8`. Reken altijd om naar de handboekpagina,
want dat is wat de leerling opent.

Hoofdstuk 1 ("Druk bij vaste stoffen") loopt over **handboek p. 13-19** =
handleiding p. 5-11. Inhoud: `p = F / A`, de eenheid pascal (`1 N/m²`), het
contactoppervlak en de gewichtskracht. De handleiding geeft didactische tips
(proef met spons en baksteen, oppervlaktevergroting via ski's en rupsbanden) en
noemt de alternatieve drukeenheden (mm Hg, atm, psi).

## Regels die al afgedwongen worden

- **ABC-structuur** — `scripts/health-check.mjs` controleert de drie stappen,
  de exacte kaart-id's, de tijden (15/30/5), de `slidesKey` per stap en de
  vraagtypen in de tickets. Een afwijking laat `npm run check` zakken.
- **Design** — `scripts/design-check.mjs` is een ratchet. Nieuwe overtredingen
  blokkeren; bestaande schuld staat in `scripts/design-baseline.json`. Eén
  fontpaar: IBM Plex Sans + Mono, ook in SVG-attributen.
- **Activiteiten** — een nieuw type registreren in `useActivitySystem.js`, en
  het moet door een actieve les gebruikt worden.
- **Slide-layouts** — 25 beschikbare layouts in `PresentationModal.vue`
  (`layoutComponentMap`). Let op: `SlideProperties` verwacht `properties: [{ label, value, icon }]`,
  niet `items`. De gearchiveerde les gebruikt daar de verkeerde sleutel.
- Beschikbare iconen staan in `iconMap` in `LessonContent.vue`; een niet-
  geregistreerd icoon faalt stil.

## Nuttige commando's

```bash
npm run check     # scope, ABC-structuur, tickets, design
npm run build
npm run smoke
git-save "bericht"
```

## Referentie

`src/lessons/_archive/waco4-druk/fys4-m01-l03-gasdruk-atmosfeer.js` is een
complete, goedgekeurde les. Bruikbaar als **structuur**voorbeeld, maar de data is
deels verouderd: `properties`-slides gebruiken daar `items`, en een
extra-activiteit verwijst naar een icoon dat niet meer bestaat. Neem de opbouw
over, niet de data.
