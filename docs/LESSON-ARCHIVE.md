# Lesarchief

Alle lessen zijn **gearchiveerd, niet verwijderd**. De repo wordt herontworpen;
de oude lessen blijven als referentie staan.

## Waar staat wat

| Wat | Waar |
|---|---|
| Lesbestanden van vóór de redesign | `src/lessons/_archive/redesign-2026/` |
| Uitleg en terugzetinstructie | `src/lessons/_archive/redesign-2026/README.md` |
| Metadata van gearchiveerde lessen | `archivedModules` in `src/data/modules.js` |
| Eerdere archiefrondes | `src/lessons/_archive/waco3-optica/`, `waco4-druk/`, `placeholders/` |

De actieve registry `modules` in `src/data/modules.js` is **leeg**. Daardoor
tonen alle klassen de eerlijke lege staat ("Voor deze klas staan nog geen lessen
klaar") en bouwt de app geen lescode mee.

## Hoe het archief buiten de runtime blijft

- `LessonView.vue` laadt met `import.meta.glob('../lessons/*.js')`. Dat patroon
  raakt submappen niet, dus `_archive/` wordt nooit geïmporteerd of gebundeld.
- De health-check leest alleen `src/lessons/*.js` in de hoofdmap. Bestanden in
  `_archive/` zijn vrijgesteld van de ABC-controle (zie `scripts/health-check.mjs`).
- De lessen verdwijnen uit de build; de bundel wordt dus kleiner.

De unit tests in `scripts/*.test.mjs` importeren twee gearchiveerde lessen
rechtstreeks om hun inhoud te blijven bewaken. Dat is bewust: die tests horen
niet bij de leerlingruntime.

## Een les terugzetten

1. Verplaats het bestand terug:
   `git mv src/lessons/_archive/redesign-2026/<id>.js src/lessons/<id>.js`
2. Haal de entry uit `archivedModules` en zet ze in `modules`
   (`src/data/modules.js`). `id` moet gelijk blijven aan de bestandsnaam.
3. Controleer de ABC-structuur uit `docs/EVALUATION-DOSSIER-THEMA1.md`.
4. `npm run check && npm run build && npm run smoke`.

## Nieuwe lessen tijdens de redesign

Nieuwe of herwerkte lessen horen gewoon in `src/lessons/` en in `modules`, zoals
beschreven in `AGENTS.md`. Het archief is geen wachtrij: een les die terugkomt,
moet voldoen aan de dan geldende standaard.
