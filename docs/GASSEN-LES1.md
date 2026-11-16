# Gastoestandsveranderingen — les 1 voor 6ELTE / 6IICT

## Status en ingang

**Lokaal gebouwd en technisch getest; niet gepubliceerd of in de klas beproefd.**
Nieuwe hoofdroute: `/willebroek/gassen/`. De aparte compressiereferentie
`/willebroek/gassen/proefblok/` blijft bestaan met ongewijzigde inhoud en eigen
opslag. Zie ook [het dossier van die proef](GASSEN-COMPRESSIE-PROEFBLOK.md).

Tien leerlingen, gecombineerde 6ELTE / 6IICT, ieder een laptop. Bezoekles van
**50 minuten, zonder starttoets**. Papier blijft de hoofdwerkplek. De
leerkracht opent elk nieuw inhoudsblok en bepaalt de gezamenlijke overgangen;
geen technisch klasslot, dashboard, account of tweede digitale theoriebundel.

## Bron en inhoudelijke afbakening

Eigen geïllustreerde bundel, proefversie van zeven pagina's:

```text
C:/Users/Albert/Documents/6TSO/Afronding_Mechanica/voorstel aangepast lesmateriaal/
  Leerlingen/Bundel6_Gastoestanden.pdf
  Bronbestanden/Bundel6_Gastoestanden.inhoud.tex
```

**Deze route begeleidt p. 1–5**, niet de hele bundel of de twee lessen.
De ideale gaswet pV=nRT en verplichte opdracht 3 op p. 6 blijven voor les 2,
gevolgd door gerichte gemengde oefening. Dat vervolg is inmiddels apart
gebouwd op `/willebroek/gassen/les2/`; zie [les 2](GASSEN-LES2.md). Opdracht 4 op p. 7 blijft verdieping. De ideale gaswet werd op
30 september samen behandeld: het vervolg moet activeren, niet automatisch
beheersing aannemen. Geen nieuwe examenregeling of examenpublicatie.

Leerplan: GO! Industriële ICT, PDF p. 19, WD3_11.18.01. Les 1 richt zich vooral
op `.01.01` (toestandsgrootheden beschrijven) en `.01.03` (veranderingen analyseren
met isothermen of tweestandenvergelijking). `.01.02` met de ideale gaswet komt
expliciet terug in les 2. Een voortgangsbalk bewijst geen doelbeheersing.

## Dekking van de veertien schermen

| Scherm | Bron | Denkwerk / resultaat |
| --- | --- | --- |
| 1–5 | p. 1–2 | Exacte eerste vijf stappen van de compressieproef: A0, A1, begripsfeedback, besluit/voorbeeld, opdracht 1a–c |
| 6 | p. 2, A+ | Extra binnen compressie tot gezamenlijke overgang; eigen voorspelling en controle met zuiger |
| 7 | p. 3, B0 | Na gezamenlijke opening: drukverandering in een star vat voorspellen vóór model |
| 8 | p. 3, B1 | 300 → 360 K, drukken en p/T op papier; 450 K alleen extra controlepunt |
| 9 | p. 3, kelvinkader | 20 → 40 °C niet als verdubbeling gebruiken; specifieke feedback op drie denkfouten |
| 10 | p. 3, kader/besluit | Vast V/n, snellere deeltjes, rechte grafiek en constante p/T; kelvin benoemen |
| 11 | p. 4 | Alle deelvragen van opdracht 2a–c, inclusief Celsiusverklaring; eigen begindruk gebruiken |
| 12 | p. 4, B+ | Extra gedachtevraag bij vast volume tot gezamenlijke vergelijking; geen echte verwarmingsproef |
| 13 | p. 5, V1/V2 | Tabel én verklaring: drukstijging hoeft geen volumeverkleining te betekenen |
| 14 | p. 5, slotvraag a–c | Ieder afzonderlijk op papier, formulehulp mag; eigen antwoorden laten staan voor leerkrachtcontrole |

A+ en B+ zijn `read`-aanbodstappen: bekijken betekent niet dat de uitbreiding
is gemaakt. Geen nieuwe theorie voor vroege finishers. Overgangen worden in de
instructies benoemd, niet via geheime codes, softwarevergrendeling of extra
bevestigingsrituelen afgedwongen. Als de klas eerder klaar is én begrijpt wat
zij deed, kan de leerkracht eerder overgaan.

De basisopdrachten gebruiken één button-bevestiging, geen deelafvinklijsten.
Het slot claimt alleen **zelfgerapporteerd uitgewerkt papierwerk**, geen
juistheid. De twee digitale begripsvragen bewaren eerste pogingen en hulp.
De score “Begripsvragen onderweg” is **niet** de individuele papieren slotvraag,
geen formele toets en geen volledige beheersingsscore. Het slotwerk krijgt
geen automatisch antwoord, meerkeuzegok of schijnbeoordeling.

## Opwarmmodel

`src/gassen/heating-model.js` en `HeatingLab.vue`, naast het ongewijzigde
compressiemodel. Star, afgesloten vat van **60 mL**, dezelfde hoeveelheid gas
als het modelreferentiepunt, absolute druk in **bar**.

- Intern Pa, m³, mol, K en R = 8,31. Drukveld en grafiek gebruiken dezelfde
  SI-drukfunctie. 300 K → 1,00 bar; 360 → 1,20; 450 → 1,50; 600 → 2,00.
- Verhouding p/T = 1/300 bar/K. Dit model heeft **niet** de begindruk van
  opdracht 2 (2,0 bar). Instructie en hulp waarschuwen expliciet tegen het
  overnemen van 1,20 bar als antwoord op die andere situatie.
- Bedienbaar van **273–600 K**, gehele K: native schuifbalk, exacte knoppen
  300/360/450, numerieke invoer met Enter/blur, reset. Ongeldige exacte invoer
  houdt de vorige stand en toont een foutmelding. 293 en 313 K zijn zo precies
  instelbaar; Celsiusweergave volgt de schoolafspraak θ = T − 273.
- p,T-diagram is recht, met live stip en hulplijnen. Alleen de grafische
  verlenging 0–273 K is gestippeld en expliciet **geen proef bij 0 K**.
  De simulator accepteert 0 K niet als toestand. Geen claim dat een echt gas
  over die hele verlenging ideaal blijft.
- De gasruimte verandert niet. Twaalf representatieve stippen blijven even
  groot en talrijk; schematische snelheid schaalt met √(T/300). Dit is geen
  experimentele drukmeting uit botsingen en geen uitvoeradvies voor een echt
  verwarmd drukvat.
- Animatie pauzeerbaar, reduced motion start stil; verborgen document stopt
  frames, unmount ruimt animatie en listeners op.

Toestelstanden zijn tijdelijk: terugkeren/herladen reset naar 300 K; de
leerpadvoortgang blijft lokaal bewaard als opslag werkt, notities staan op
papier. Zonder opslag blijft het open tabblad werken met waarschuwing.

## Techniek en controle

- `src/gassen/lesson.js`: eigen lesdata; eerste vijf compressiestappen hergebruikt.
- `GasLesson.vue` + `main.js`: dunne wrapper om de gedeelde `GuidedPath.vue`.
  Scoped activity-slot mount compressie of opwarming met `:key="step.id"`.
- `gassen/index.html`: eigen Vite-ingang en smoketest.
- Les-id `fys6-gastoestanden-les1-v1`, opslag
  `willebroek:gassen:les1:fys6-gastoestanden-les1-v1`.
  **Geen automatische overname** van proefblokantwoorden; oude sleutels blijven staan.
- Geen wijziging aan `progress.js`, bestaande gasactiviteit, ABC-registry,
  bundelbestanden of correctiesleutels voor deze uitbreiding.

```bash
npm run dev
# /willebroek/gassen/ op de door Vite getoonde host/poort
npm run check
npm run build
npm run smoke
node scripts/gassen-les1.browser.mjs
node scripts/gassen-compressie.browser.mjs
node scripts/energie-basis.browser.mjs
node scripts/energie-kinetisch-pilot.browser.mjs
node scripts/energie.browser.mjs
node scripts/celmetabolisme.browser.mjs
git diff --check
```

69 unit-/inhoudstests, inclusief gasmodellen, volledige verplichte dekking,
versies/opslag, temperatuurverhoudingen, deeltjeseigenschappen en strikte
KaTeX-compilatie. Nieuwe Chrome-test: alle veertien schermen, exacte modelwaarden
en grafiek, begripsfeedback/MathML, hints, 1366×768 en 390/320 px, toetsenbord,
invoerfouten, animatiepauze/opruiming, herladen/Escape, hulp, reduced motion,
reset en opslagweigering. Geen volledige schermlezertest of echt schooltoestel.

## Praktijkcontrole blijft nodig

De eerdere planning blijft een **nog te toetsen** ontwerp:
0–5 start/voorspelling, 5–20 compressie, 20–35 opwarming,
35–44 vergelijken/feedback, 44–48 individueel slot, 48–50 afsluiten.
Alle uitleg en overgangen horen binnen die tijden. Veertien schermen of een
snelle automatische browsertest bewijst niet dat tien leerlingen dit in die
tijd zinvol afwerken.

Doorloop met de gedrukte bundel; test echte schoollaptops, wifi, projector en
het krijtbord (25% links / 50% midden / 25% rechts). Alleen werkelijk zichtbare
zijpanelen gebruiken bij middenprojectie. Controleer schrijfruimte en neem
echte uitwerkingen waar. De papieren modelgrafieken blijven de technische
fallback. Publiceer of voeg pas URL/QR toe nadat die controles dit rechtvaardigen.
Bundel 5 en reeds afgenomen toetsen blijven gesloten materiaal.
