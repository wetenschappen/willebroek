# Archimedes — 4NAWE/4SPOWE, Thema 1 hoofdstuk 4

## Twee resterende lesuren

1. `#/les/fys4-m01-l09-archimedeskracht-vloeistoffen`
   **Archimedes: afleiding en parameteronderzoek**
2. `#/les/fys4-m01-l10-archimedeskracht-gassen`
   **Archimedes: drijven, gassen en boekvraagstukken**

Beide staan onder Fysica → 4NAWE/4SPOWE → T1 Druk. Ze hebben elk de gewone
ABC-structuur van 15 + 30 + 5 minuten. Er is geen lesdatum verzonnen.
De oude gearchiveerde lesbestanden blijven referentiemateriaal, niet de actieve
inhoud. De dubbele archiefvermeldingen zijn uit de registry verwijderd.

Deze lessen sluiten aan op de al gegeven inleiding. Het is geen nieuwe
lessenreeks vanaf nul. Het uitgeversjaarplan voorziet 2,5 uur voor hoofdstuk 4;
de gekozen resterende twee uren zijn expliciet goedgekeurd door de leerkracht.

## Bronnen en leerplankoppeling

- `docs/lesson material/Jaar 4/WACOF4DS2AL_T1_Handleiding (1).pdf`
  - boek p. 49–50: experimenteel ontdekken;
  - p. 51: theoretische afleiding;
  - p. 52–54: wet, bultrugvoorbeeld, zinken/zweven/stijgen/drijven en personenvoorbeeld;
  - p. 56–58: gassen en uitgewerkt ballonvoorbeeld;
  - p. 60–64: oefeningen **1–18**, inclusief deelvragen.
  - In deze PDF is boekpagina = PDF-pagina + 8. Enkele boekpagina's zijn
    afbeeldingen onder een tekstlaag met alleen leerkrachtannotaties. Ook de
    eigenlijke boekinhoud van die pagina's is via OCR gecontroleerd.
- `docs/lesson material/Jaar 4/OSPLKITWACOF4DS2_01_oefeningen_met_oplossingen.pdf`
  - PDF p. 18–27: oplossingen hoofdstuk 4. Dit zijn **niet** de boekpaginanummers.
- `docs/lesson material/Jaar 4/WACOF4DS2AL_Jaarplan.xlsx`, blad
  `Jaarplan WACO 4 Fysica 2u`, AF–AJ: hoofdstuk, 2,5 uren en online labo's.
- GO! leerplan Natuurwetenschappen, PDF p. 34:
  `WD2_11.01.03.01` (Archimedeskracht berekenen/analyseren) en
  `WD2_11.01.03.03` (statisch evenwicht/krachtenbalans).
- GO! Basisvorming, p. 50: `BV2_06.43.02`, invloedsfactoren op vloeistofdruk.

Hergebruikte didactiek uit `C:/Users/Albert/Documents/Archimedes/`:
`ArchimedesDerivationBuilder.vue`, `ArchimedesTheoryQuest.vue` en
`TheoryQuestScene.vue`. Het oude project blijft ongewijzigd. De oude ISAAC-
paginanummers, notatie, donkere schil, automatische timers en Fullscreen API
zijn niet overgenomen. De figuren en componenten zijn opnieuw opgebouwd voor
WACO en de Willebroek-huisstijl. Er wordt geen chemie-runtime geïmporteerd.

## Essentiële inhoudelijke keuze

- **V_vl** = volume **verplaatste** vloeistof, niet alle vloeistof in het vat.
- **V_ond** = ondergedompeld deel van het voorwerp.
- **V_vw** = totaal voorwerpvolume.
- Altijd in dit model: **V_vl = V_ond**.
- Alleen bij volledige onderdompeling: ook **V_vl = V_vw**.
- Gelijke volumes van twee stoffen vereisen geen gelijke massa's of dichtheden.
- De boekformule blijft **F_A = ρ_vl · g · V_vl**.

Drijven is verplicht onderdeel, maar er wordt **geen aparte drijfformule**
met een verhouding van dichtheden als te leren formule ingevoerd. We beginnen
bij **F_A = F_G**, gebruiken de massa van het hele systeem en het daadwerkelijk
verplaatste volume, precies zoals de bootopgave uit het boek.

## Uur 1 — herstel en onderzoek

### A · 15 minuten

Instapticket over druk, onderdompeling en volume-eenheden. Bespreek waarom de
notaties van het boek en van de leerlingen verenigbaar zijn. De drie
volumefiguren tonen half, volledig en dieper volledig ondergedompeld.

### B · 30 minuten

De presentatie ondersteunt de uitleg; de digitale activiteit is de actieve
verwerking. Laat niet alle bronnen onafhankelijk achter elkaar uitvoeren.

1. **Welke volumes?** Twee begripsvragen, met feedback en vergrendelde juiste
   antwoorden. De tekening kan tussen drie situaties wisselen.
2. **Afleidingbouwer:** acht denkstappen. F₂ > F₁ → verschil → F = pA →
   hydrostatische druk → uitfactoren → h₂ − h₁ = z → Az = V → gewicht van de
   verplaatste vloeistof. Eén vraag en formuleovergang per stap, conform p. 51.
3. **Physics Lab:** vijf onderzoeken, elk voorspellen → A en B meten → verklaren.
   - ρ_vl: 1 000 → 2 000 kg/m³;
   - onderdompeling van hetzelfde blok: 50 → 100%;
   - g, virtueel: 9,81 → 19,62 N/kg;
   - diepte bovenkant, volledig ondergedompeld: 0,2 → 1,0 m;
   - ρ_vw, gelijk volume: 500 → 1 500 kg/m³.

Een voorspelling mag fout zijn: ze wordt vastgelegd vóór de metingen en pas
nadien beoordeeld. Eén meting is niet genoeg om de verklaringsvraag te openen.
Daarna moet de verklaring correct zijn. Een juiste verklaring blijft vaststaan.
Tussenwaarden zijn vrij te onderzoeken, maar alleen A en B tellen voor de
gevraagde vergelijking. Beide metingen verschijnen met eenheden in een tabel.

Gebruik het bultrugvoorbeeld en boekopgaven **1, 2, 3 en 10** als eerste
transfer; **17** is een verbinding met hydrostatische druk. Afhankelijk van het
tempo kan de zelfstandige uitwerking verder in uur 2. De kern is begrijpen,
niet klikken om een groen eindscherm te halen.

### C · 5 minuten

Synthese en exitticket: verplaatst volume, diepte, een berekening en een open
verklaring van A · z. Neem resterende fouten mee naar uur 2.

## Uur 2 — drijven, gassen en vraagstukken

### A · 15 minuten

Korte retrieval. Bespreek de krachtresultante bij een vanuit rust losgelaten
voorwerp, daarna de overgang van stijgen naar drijven. Bij drijven vermindert
het ondergedompelde volume tot F_A = F_G. De uitbreiding naar gassen gebruikt
de massadichtheid van het **omringende** gas en de **totale** massa.

### B · 30 minuten

Het lab bevat vijf korte balansen: zinken, zweven, stijgen, drijvend evenwicht
en een zwevende ballon. Voor elk moeten zowel vergelijking als toestand juist
zijn. De drijfsituatie wordt niet verward met het eerste ogenblik van loslaten.

Het werkboek toont alle **18** opgaven en hun boekpagina. Reeds gemaakte opgaven
uit uur 1 hoeven niet opnieuw. De boekpresentatie heeft **37 slides**:
werkwijze, alle drie de voorbeelden en alle achttien opgaven. Via **Ga naar**
kan je direct een voorbeeld of opgave kiezen. Bij springen zijn oplossingen
weer verborgen; Spatie/→ of de onthulknop toont de volgende boekrubriek.
← neemt eerst een onthulde stap terug. Escape en de X sluiten.

Berekeningen volgen **Gegeven → Gevraagd → Oplossing → Antwoord**. Langere
oplossingen lopen over meerdere slides. Begripsvragen krijgen een verklaring
en antwoord, niet een verzonnen rekenprocedure. De oplossingroute, waarden en
afronding volgen de bron. Voorbeeld: boot → evenwicht → kracht → verplaatst
volume → diepgang, niet een alternatieve korte verhoudingformule. Er is geen
externe correctiesleutel-URL verzonnen en geen leerkrachten-PDF in de app
gepubliceerd: de rode boekpresentatie bevat de uitwerkingen.

Niet alle 37 slides klassikaal behandelen. Kies gericht, bijvoorbeeld 3, 7, 9,
11 en 14, en laat leerlingen de rest zelfstandig verwerken of controleren.
**Het volledige pakket samen met alle labwerk past niet gegarandeerd in één
lesuur.** Spreek af hoe onafgewerkte opgaven worden afgewerkt. Geen opgaven zijn
stilzwijgend geschrapt om een kunstmatige afwerktijd te beloven.

### C · 5 minuten

Synthese van de verschillende situaties en een exitticket met drie
meerkeuzevragen en een open verklaring over drijvend evenwicht.

## Boekwaarden die niet verwisseld mogen worden

| Situatie | Waarde |
| --- | --- |
| Bultrug p. 52 | ρ_zeewater = 1 025 kg/m³ |
| Persoon p. 54 | 70,00 kg; 65,00 dm³; 1 025 kg/m³; route via lichaamsdichtheid |
| Ballonvoorbeeld p. 58 | ρ_lucht = **1,29** kg/m³ |
| Opgaven 3, 7 en 11 | ρ_water = **998** kg/m³ |
| Opgaven 6, 8 en 15 | ρ_lucht = **1,293** kg/m³ |
| Opgave 9 | 1,030 kg/dm³ = 1 030 kg/m³; 10,0 m is overbodig voor F_A |
| Opgave 13 | 1 kg/dm³, gevraagde volume in liter |
| Opgave 14 | expliciet afgerond 1 000 kg/m³ |
| Digitaal parameterlab | expliciet 1 000 kg/m³, tenzij dit de onderzochte variabele is |

Verder gebruikt het boek g = 9,81 N/kg. Het rekenmodel bewaart ongeronde
waarden; de boekslides tonen de bijbehorende uitgeversafrondingen.

### Nuances voor de leerkracht

- Opgave 4 beschrijft expliciet een **groter wordend** ballonvolume. Die
  redenering is geen algemene claim dat elke ballon bij verwarmen groter wordt;
  een heteluchtballon met een al volledig gespannen omhulsel kan anders worden
  gemodelleerd. De gegeven boekcontext blijft behouden.
- Opgave 16 volgt het opgegeven effectieve-volume-model. Losse, lucht-doorlatende
  veren verplaatsen niet automatisch hun hele bulkvolume aan lucht. Bespreek de
  reikwijdte van dit boekmodel als die vraag ontstaat.
- Bij 17 wordt een maatbeker zonder overlopen verondersteld. Het digitale lab
  gebruikt juist een grote bak met **overloop** om de waterspiegel te fixeren:
  dat is een andere gecontroleerde proefopstelling, geen tegenspraak.
- Bij de bal die uit het water springt is een opwaartse snelheid niet hetzelfde
  als een blijvend opwaartse resultante. De verklaring noemt ook de beweging
  nadat de opwaartse kracht afneemt.

## Wetenschappelijk model en bediening

`src/physics/archimedes.js` bevat de zuivere, geteste SI-berekeningen. Het model
neemt een star lichaam en een uniforme, onsamendrukbare vloeistof. Bij de
vloeistofgevallen worden luchtstuwkracht en weerstand verwaarloosd.

Tijdens het parameteronderzoek wordt het blok **vastgehouden**. Een benodigde
extra kracht omhoog/omlaag wordt expliciet vermeld. De drukfiguur toont alleen
de vloeistofkrachten; F_A is hun resultante, niet de totale kracht op het blok.
Een zinkend blok wordt niet op de bodem getekend alsof er geen normaalkracht is.
Krachtpijlen delen binnen hun figuur één N-schaal; er wordt geen kunstmatige
minimale pijllengte toegevoegd. Diepten zijn schematisch weergegeven.

De twee lesactiviteiten delen lokale opslag, zonder leerlingnamen:
`willebroek:archimedes:v1:4NAWE-4SPOWE-t1-archimedes`.

- Uur 1 afronden vraagt 2 volumevragen, 8 afleidingsstappen en 5 onderzoeken.
- Uur 2 afronden vraagt 5 volledige krachtenbalansen.
- Alle tabs blijven in beide uren beschikbaar voor herhaling. Op een smal
  scherm vervangen selectielijsten de lange rij onderzoek-/situatieknoppen.
- Eerste pogingen en oorspronkelijke voorspellingen worden apart bewaard.
- Sluiten of herladen bewaart antwoorden; de leskaart wordt pas voltooid na de
  passende afrondknop.
- Wissen vraagt bevestiging en wist beide uren labovoortgang, niet de aparte
  leskaart- of werkboekvoortgang.
- Bij geblokkeerde opslag verschijnt een melding. Escape en X sluiten dezelfde
  overlay; focus blijft binnen de activiteit en keert terug naar de opener.
  De activiteit gebruikt geen Fullscreen API.

## Bestanden en validatie

- `src/lessons/fys4-m01-l09-archimedeskracht-vloeistoffen.js`
- `src/lessons/fys4-m01-l10-archimedeskracht-gassen.js`
- `src/physics/archimedes.js`: rekenmodel
- `src/physics/archimedes-lesson.js`: ABC-basis en eigen theoriefiguren
- `src/physics/archimedes-book.js`: brongetrouwe boekuitwerkingen
- `s-activities/ArchimedesLabActivity.vue` en `s-activities/archimedes/`
- `src/components/presentation/SlideBookExample.vue`: lineaire boekrubrieken
- `PresentationModal.vue`: optionele inhoudskeuze, buiten het slidecanvas

`npm run check` bevat acht Archimedes-tests naast de tien bestaande Mendel-tests:
volume-identiteit, drukafleiding, vijf parameterproeven, begin-/eindtoestand,
boekberekeningen, ongeldige invoer, volledige opdrachtdekking en strikte KaTeX.

Optionele volledige browsercontrole, zonder extra browserdependency:

```bash
npm run check
npm run build
npm run smoke
node scripts/archimedes.browser.mjs
```

De browsertest gebruikt Node 22+ en geïnstalleerde Chrome. Stel zo nodig
`CHROME_PATH` in.
Screenshots gaan naar een tijdelijke map, of naar `ARCHIMEDES_ARTIFACTS` als je
die variabele instelt. De test doorloopt vragen en metingen, fout/herkansing,
sluiten/herladen, beide uren, alle zes decks volledig onthuld, boekinhoudskeuze,
werkboek, mobiele breedte, toetsenbord/focus, bevestigde reset en geblokkeerde
opslag. Ook de 18 bestaande Mendel-theorieslides worden als regressiecheck
volledig onthuld. Alle slides worden op verticale én horizontale overflow en
buiten het canvas lopende formules gecontroleerd.
