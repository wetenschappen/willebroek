# Klassikaal ABC-lesbord · 6ELTE / 6IICT (`/willebroek/6df/`)

- **Live URL:** `https://wetenschappen.github.io/willebroek/6df/`
- **Lokale ingang:** `npm run dev` → `http://127.0.0.1:5173/willebroek/6df/`
- **Technische opzet:** afzonderlijke Vite-ingang ([`6df/index.html`](../6df/index.html) → [`src/laatste-les/`](../src/laatste-les/)), los van de leerpad-registry en zonder leerlingaccounts of scores. Alleen de namenlijst wordt lokaal in de browser bewaard.
- **Aansluiting op papier:** bestaande bundel blz. 4 (*Proef van Charles*) + recto-verso **Eén vergelijking** blz. 5–6 + één stapeltje papieren verdiepingsbonnen (*Werkbon · Kwaliteitscontrole*, te printen via `?print=werkbon`, twee per A4).
- **Richtduur A / B / C:** 15 / 30 / 5 min. Timers gaan nooit automatisch door naar een volgende stap.

## Vóór de projectie

Open rechtsboven **Voorbereiding** (schuifregelaars-icoon):
1. Druk de papieren werkbonnen af (`?print=werkbon`) en leg ze op één vast stapeltje op de lessenaar.
2. Plak de aanwezige voornamen, één per regel, en klik op **Gebruik deze lijst**. De namen blijven na herladen beschikbaar in dezelfde browser op dezelfde site. Op een andere computer vul je de lijst één keer opnieuw in. Sla een lege lijst op om de namen te wissen. Er staan geen leerlingnamen in de broncode en er worden geen namen verstuurd.

Met **Kies leerling** in de vaste bovenbalk kun je tijdens elke stap een naam trekken, ook bij een gescrold werkblad. Deze knop, de denktimer en het exitticket gebruiken dezelfde lijst en trekken zonder herhaling tot iedereen aan bod is geweest. Herladen of een lijst opslaan start een nieuwe ronde.

Op een andere pc laadt een persoonlijke klaslink de namen meteen, zonder ze te plakken. De namen zitten in het fragment `#klas=` van die link. Het lesbord leest ze in de browser en haalt het fragment daarna uit de adresbalk. De link is niet versleuteld: bewaar hem privé en deel met leerlingen alleen de gewone leslink.

## Ontwerpkeuzes (Variant B · rustige bordtaal)

- Drie verticale kolommen **A (Instap)**, **B (Verwerken)**, **C (Afsluiting)** van links naar rechts en van boven naar beneden.
- Witte kaarten op `#f5f7f6` met 5 px kleurmarkering links (blauw = digitaal, groen = bundel op papier) en vaste iconen (`KaartIcoon.vue`).
- Geen visuele ruis (geen schreeuwerige labels, geen dubbele nummering, geen kaders in kaders), zodat leerlingen met leerstoornissen het bord moeiteloos kunnen scannen.
- Alle gedrukte bladzijden (blz. 4, 5 en 6) zijn 1-op-1 nagebouwd als bordkopie met stapsgewijze groene invulling via `←` / `→` of directe klik.

## Chronologische opbouw

- **A1 · Wat weet je nog?**
  Drie open begripsvragen (*Boyle*, *Gay-Lussac + kelvin*, *Charles-voorspelling blz. 4*) met eigen cilinderschets (`VoorkennisSchets.vue`), 40 s denktimer (kiest automatisch een naam op `0:00`, ook handmatig te trekken) en uitklapbaar tweeledig richtantwoord (**Macroscopisch** / **Microscopisch**).
- **A2 · Bekijk de vrije zuiger (blz. 4)** (`Blz4Werkblad.vue`)
  Directe linkknop naar de online simulatie (`https://wetenschappen.github.io/willebroek/gassen/simulatie/`) in een nieuw tabblad + exacte bordkopie van blz. 4 met 10 groene invulstappen (`0/10` → `10/10`).
- **B1 · Streep door wat gelijk blijft (blz. 5)** (`Blz5Werkblad.vue`)
  Drie afzonderlijke, rustige knoppen boven de exacte bordkopie van blz. 5 (`0/5` → `5/5`):
  1. `1. Van 3 regels naar 1` — visuele brug van $p \cdot V$, $p/T$ en $V/T$ naar $\frac{p \cdot V}{T}$.
  2. `2. Klascheck` — 30 s vingercheck voor Gay-Lussac (`1 vinger · p`, `2 vingers · V`, `3 vingers · T`) als live `Output = Input`.
  3. `3. Sporen` — convergente differentiatie zonder fysieke hulpkaarten: *Samen starten* (3 min verlengde instructie vooraan), *Zelfstandig verder* (`blz. 5 → blz. 6` met de 4 B’s: Brein · Bundel · Buur · Leerkracht) en *Klaar met blz. 6?* (verdieping via de Werkbon).
- **B2 · Bereken de einddruk (blz. 6)** (`Blz6Werkblad.vue`)
  Twee standen:
  1. `1. Werkbord` (standaard open, zonder spoilers): `1 · Vóór` / `2 · Na` cilinderkaarten (`ZuigerStand.vue`), rustige 15:00-werktimer, 4 B’s + tip (*bedek de kolom ‘na’*) en verwijzing naar de Werkbon.
  2. `2. Nakijken blz. 6`: exacte bordkopie van punt 1 t/m 7 met 7 groene invulstappen (`0/7` → `7/7`), einddruk `180 kPa` en dubbele controle (`4 = 4`, *ja / ja*).
- **C1 · Exitticket** (`ExitSchets.vue`)
  Drie korte vingerstem-vragen (*vaste vs. vrije zuiger*, *factor 1,2*, *open ventiel*) met sobere cilinderschetsen, naamkiezer (`Kies leerling` / `Andere naam`), en `Toon antwoord` (markeert de juiste optie groen + korte KaTeX-verklaring).
- **C2 · Terug naar de doelen**
  Alle drie de lesdoelen rechtstreeks zichtbaar naast hun bundelbewijs (`blz. 4`, `blz. 5`, `blz. 6`), korte duimcheck (*Duim omhoog / opzij / omlaag*) en uitklapbare `Vooruitblik: open ventiel` naar $pV = nRT$.

## Bouw en controle

- `npm run check` (health-check + 86 unit-tests, 0 nieuwe design-overtredingen)
- `npm run build`
- `npm run smoke` (controleert o.a. `6df/` en de gebouwde JS/CSS-assets)
- `node scripts/laatste-les.browser.mjs` (end-to-end browsertest van A1 t/m C2, werkbon-printweergave en smalle viewports tot 320/360 px)
