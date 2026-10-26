# Archief — redesign 2026

Deze map bevat de volledige lesvoorraad zoals die **actief was vóór de
redesign**. Niets hierin wordt geladen, getoond of mee gebouwd: `LessonView.vue`
laadt alleen `src/lessons/*.js` (niet de submappen), en `src/data/modules.js`
staat leeg.

## Waarom hier

De lessen worden herwerkt. Ze zijn niet verwijderd, zodat de inhoud, de
ABC-structuur, de tickets en de oefeningen later als referentie kunnen dienen.

## Verplaatste lessen

| Bestand | Vak | Jaar | Module |
|---|---|---|---|
| `fys4-m01-druk-vaste-stoffen.js` | Fysica | 4 | 1 — Druk |
| `fys4-m01-l02-voorbeeld.js` | Fysica | 4 | 1 — Druk |
| `fys4-m01-l09-archimedeskracht-vloeistoffen.js` | Fysica | 4 | 1 — Druk |
| `fys4-m01-l10-archimedeskracht-gassen.js` | Fysica | 4 | 1 — Druk |
| `bio6-m02-l01-mendel.js` | Biologie | 6 | 2 — Chromosomale erfelijkheid |
| `bio6-m03-l01-lymfe-aangeboren.js` | Biologie | 6 | 3 — Immuniteit |
| `bio6-m04-l01-celdeling.js` | Biologie | 6 | 4 — Celdeling |

De bijbehorende metadata staat in `archivedModules` in
`src/data/modules.js`.

## Terugzetten

1. `git mv src/lessons/_archive/redesign-2026/<id>.js src/lessons/<id>.js`
2. Zet de entry uit `archivedModules` terug in `modules` in `src/data/modules.js`.
3. Draai `npm run check`, `npm run build` en `npm run smoke`.

Zie ook `docs/LESSON-ARCHIVE.md`.
