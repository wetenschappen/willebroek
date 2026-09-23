# Evaluatiedossier: WACO 3 & WACO 4 - Thema 1 Lessenreeksen

> **Doel van dit document:**  
> Dit dossier documenteert de opgezette lessenreeksen voor **Thema 1 van WACO 3** (3NAWE + 3SPOWE) en **Thema 1 van WACO 4** (4NAWE + 4SPOWE).  
> Het biedt een extern/onafhankelijk AI-model alle noodzakelijke context, didactische criteria, mapping en technische verificatie-instructies om het geleverde werk grondig en objectief te auditeren.

---

## 1. Projectcontext & Doelstellingen

Het project **Willebroek** is een digitaal leerpad (Vue 3 + Vite) voor het Vlaams secundair onderwijs (GO! 2de graad doorstroomfinaliteit / D-finaliteit):
- **3NAWE + 3SPOWE:** 3e jaar Natuurwetenschappen & Sportwetenschappen (2 uur fysica/week).
- **4NAWE + 4SPOWE:** 4e jaar Natuurwetenschappen & Sportwetenschappen (2 uur fysica/week).

### Bronnen & Uitgangsmateriaal
1. **Jaarplannen (strikte urentelling):**
   - **WACO 3 Thema 1:** *"Blinding lights: optische fenomenen"* -> **exact 13 lesuren**.
   - **WACO 4 Thema 1:** *"Druk"* -> **exact 10 lesuren**.
2. **Leerplannen:**
   - GO! 2de graad D-finaliteit Basisvorming Natuurwetenschappen (leerplandoelen fysica).
   - Cesuurdoelen specifiek gedeelte Natuurwetenschappen (verdieping, afleidingen, kwantitatieve vraagstukken).
3. **Didactisch model (strikt 50-minuten ABC-structuur):**
   - **A: Instap (15 min):** 
     - `card-entry`: Formatief instapticket met **exact 4 diagnostische meerkeuzevragen** inclusief feedback en wetenschappelijke toelichting per antwoordoptie.
     - `card-pres-a`: Inleidende presentatie (`slidesA`, 3 slides) met doelen en een activerende onderzoeks-/verwondervraag.
   - **B: Verwerken (30 min) - Exact 3 canonieke kaarten:**
     - `card-pres-b`: Instructiepresentatie (`slidesB`, 5 à 6 slides) met formele definities, fysische modellen, stapsgewijs uitgewerkte rekenvoorbeelden (*Gegeven, Gevraagd, Formule, Berekening, Antwoord/Conclusie*), analyse van veelvoorkomende misconcepties, en interactieve begripschecks met distractor-analyse.
     - `card-workbook`: Werkboekopdrachten uit Plantyn WACO (`card-workbook`) met paginareferenties en formulehints.
     - `card-activity`: **Vakspecifieke interactieve simulatie / digitaal lab** afkomstig uit de fysica-modules (`PressureLabActivity`, `OpticsLabActivity`, `IdealGasLawActivity`, `ForcesLabActivity`).
   - **Verrijking (+ Extra Materiaal):** Royaal voorzien van **`+ Extra Materiaal`** (`extraActivities`) voor snellere leerlingen (matching via `dragDrop` en diepere retrieval/toepassingsvragen via `mixedRetrieval`).
   - **C: Afsluiting (5 min):** 
     - `card-pres-c`: Samenvattingspresentatie (`slidesC`, 3 slides) met vuistregels en misconceptie-ontkrachting.
     - `card-exit`: Formatief afsluitend ticket met **exact 4 vragen** (3 kwantitatieve/conceptuele meerkeuzevragen met toelichting + 1 open synthese-/reflectievraag).
4. **Design System & Presentatie-integriteit (`docs/DESIGN-SYSTEM.md` & `AGENTS.md`):**
   - Projectorleesbaarheid: lichte achtergrond (`--color-paper`), donkere tekst (`--color-ink`).
   - Wiskundige formules via KaTeX (`\\( ... \\)`).
   - Geen emojis in labels of knopteksten (design-ratchet).
   - Zero-warning beleid in `npm run check`.
   - Vaste 1920x1080 presentatieschaal zonder afkapping van titels of opgaven (`SlideWorkedExample.vue`, `SlideSteps.vue`, `SlideDefinition.vue`).
   - Geen AI-slop: 0 em dashes (`—`), 0 approximately-tekens (`\approx` / `≈` vervangen door `=`), correcte Nederlandse spelling/hoofdletters (geen Engels Title Case).

---

## 2. Overzicht van de Gecreëerde Lessen

### 2.1 WACO 4: Thema 1 - Druk (10 lessen)

Locatie: `src/lessons/fys4-m01-l*.js`  
Gekoppelde klas: `4NAWE+4SPOWE` -> Jaar 4, Module 1 (`m01`).

| # | Les-ID | Onderwerp & Inhoud | Didactische componenten (ABC) | Digitaal Lab (card-activity) & Extra Materiaal |
|---|---|---|---|---|
| 1 | `fys4-m01-l01-druk-vaste-stoffen` | Definitie $p = F / A$, eenheid pascal ($1\text{ N/m}^2$), bar, contactoppervlak en gewichtskracht. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **PressureLab** (mode: vast) + `dragDrop` + `mixedRetrieval` |
| 2 | `fys4-m01-l02-toepassingen-druk-vaste-stoffen` | Drukvergroting vs. drukverkleining (sneeuwschoenen, spijkers, rupsbanden, naaldhakken), kubusschaalprobleem $2z$. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **PressureLab** (mode: vast) + `dragDrop` + `mixedRetrieval` |
| 3 | `fys4-m01-l03-gasdruk-atmosfeer` | Kinetisch deeltjesmodel, botsingen tegen wanden, atmosferische druk, proef van Torricelli ($760\text{ mm Hg}$), $1013\text{ hPa}$. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **IdealGasLaw** + `dragDrop` + `mixedRetrieval` |
| 4 | `fys4-m01-l04-meten-gasdruk-manometer` | Barometers (kwik/aneroïde), open/gesloten U-buismanometer, relatieve overdruk/onderdruk vs. absolute druk. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **IdealGasLaw** + `dragDrop` + `mixedRetrieval` |
| 5 | `fys4-m01-l05-hydrostatische-druk` | Afleiding & formule $p_{\text{hydr}} = \rho \cdot g \cdot h$, onafhankelijkheid van vatvorm (hydrostatische paradox), stuwdammen. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **PressureLab** (mode: vloeistof) + `dragDrop` + `mixedRetrieval` |
| 6 | `fys4-m01-l06-totale-vloeistofdruk-vaten` | Totale druk $p_{\text{tot}} = p_{\text{atm}} + \rho \cdot g \cdot h$, communicerende vaten, watertorens, sifon, peilglas. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **PressureLab** (mode: vloeistof) + `dragDrop` + `mixedRetrieval` |
| 7 | `fys4-m01-l07-beginsel-van-pascal` | Drukoverdracht in afgesloten vloeistoffen, hydraulische hefbrug ($\frac{F_1}{A_1} = \frac{F_2}{A_2}$), verplaatsing & arbeid, remmen. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **PressureLab** (mode: pascal) + `dragDrop` + `mixedRetrieval` |
| 8 | `fys4-m01-l08-vraagstukken-vloeistofdruk` | Geavanceerde synthesevraagstukken: U-buis met twee onmengbare vloeistoffen ($\rho_1 h_1 = \rho_2 h_2$), kracht op onderwaterwanden ($F = p \cdot A$). | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **PressureLab** (mode: vloeistof) + `dragDrop` + `mixedRetrieval` |
| 9 | `fys4-m01-l09-archimedeskracht-vloeistoffen` | Opwaartse stuwkracht $F_A = \rho_{\text{vl}} \cdot g \cdot V_{\text{ond}}$, ontstaan door drukverschil, voorwaarden drijven/zweven/zinken. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **ForcesLab** + `dragDrop` + `mixedRetrieval` |
| 10 | `fys4-m01-l10-archimedeskracht-gassen` | Archimedes in gassen ($F_A = \rho_{\text{lucht}} \cdot g \cdot V$), heteluchtballonnen, hefkracht $F_{\text{netto}} = F_A - F_z$, complete themasynthese Druk. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **ForcesLab** + `dragDrop` + `mixedRetrieval` |

---

### 2.2 WACO 3: Thema 1 - Optische fenomenen (13 lessen)

Locatie: `src/lessons/fys3-m01-l*.js`  
Gekoppelde klas: `3NAWE+3SPOWE` -> Jaar 3, Module 1 (`m01`).

| # | Les-ID | Onderwerp & Inhoud | Didactische componenten (ABC) | Digitaal Lab (card-activity) & Extra Materiaal |
|---|---|---|---|---|
| 1 | `fys3-m01-l01-lichtbronnen-en-voortplanting` | Primaire vs. secundaire lichtbronnen, natuurlijk/kunstmatig, koud/warm, middenstoffen, $c = 3{,}00 \cdot 10^8\text{ m/s}$, bundeltypes. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: spiegel) + `dragDrop` + `mixedRetrieval` |
| 2 | `fys3-m01-l02-schaduwvorming` | Rechtlijnige voortplanting, puntbron (kernschaduw/umbra) vs. uitgebreide bron (bijschaduw/penumbra), zons- en maansverduistering. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: spiegel) + `dragDrop` + `mixedRetrieval` |
| 3 | `fys3-m01-l03-lichamen-zien-terugkaatsing` | Oog als receptor, invalshoek $\hat{i}$, normaal $n$, terugkaatsingshoek $\hat{t}$, terugkaatsingswet ($\hat{i} = \hat{t}$ in één vlak). | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: breking) + `dragDrop` + `mixedRetrieval` |
| 4 | `fys3-m01-l04-diffuse-weerkaatsing` | Regelmatige/spiegelende weerkaatsing vs. diffuse terugkaatsing, microscopische normalen, bioscoopscherm, nat wegdek. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: breking) + `dragDrop` + `mixedRetrieval` |
| 5 | `fys3-m01-l05-vlakke-spiegel-beeld` | 5 beeldkenmerken vlakke spiegel: virtueel, rechtopstaand, even groot ($|B|=V$), symmetrisch ($d_b = d_v$), lateraal omgekeerd. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: spiegel) + `dragDrop` + `mixedRetrieval` |
| 6 | `fys3-m01-l06-gezichtsveld-spiegel` | Gezichtsveld bepalen via het virtuele oogbeeld ($O'$), invloed spiegelgrootte en afstand, dode hoek in het verkeer. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: spiegel) + `dragDrop` + `mixedRetrieval` |
| 7 | `fys3-m01-l07-lichtbreking-basis` | Breking door lichtsnelheidsverschil, overgang naar dichtere stof ($\hat{r} < \hat{i}$, naar normaal) en minder dichtere stof ($\hat{r} > \hat{i}$, weg van normaal). | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: breking) + `dragDrop` + `mixedRetrieval` |
| 8 | `fys3-m01-l08-totale-weerkaatsing` | Voorwaarden voor totale reflectie (optisch dichter naar minder dicht én $\hat{i} > \hat{i}_g$), grenshoek water ($49^\circ$) en glas ($42^\circ$), glasvezel. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: breking) + `dragDrop` + `mixedRetrieval` |
| 9 | `fys3-m01-l09-bolle-lenzen-hoofdstralen` | Bolle (convergerende) lens: optisch middelpunt $O$, hoofdas, brandpunten $F$ en $F'$, brandpuntsafstand $f$, de 3 hoofdstralen. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: lens) + `dragDrop` + `mixedRetrieval` |
| 10 | `fys3-m01-l10-bolle-lenzen-beeldvorming` | De 5 voorwerpsafstanden: $v > 2f$ (fototoestel), $v = 2f$ (1:1), $f < v < 2f$ (beamer), $v = f$ (schijnwerper), $v < f$ (loep). | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: lens) + `dragDrop` + `mixedRetrieval` |
| 11 | `fys3-m01-l11-vergrotingsfactor` | Lineaire vergroting $N = \frac{\|B\|}{V} = \frac{b}{v}$, gelijkvormige driehoeken, beamerberekening, ooglensdiameter ($2{,}5\text{ cm}$). | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: lens) + `dragDrop` + `mixedRetrieval` |
| 12 | `fys3-m01-l12-kleuren-wit-licht` | Dispersie door prisma, continu spectrum ROGGBIV, golflengteafhankelijkheid van breking (rood minst, violet meest), regenboog. | Entry (4 vr), Slides (11 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: breking) + `dragDrop` + `mixedRetrieval` |
| 13 | `fys3-m01-l13-kleur-donkere-lichamen` | Selectieve absorptie en weerkaatsing, paprika onder groen licht wordt zwart, kleurfilters, integrale themasynthese Optica. | Entry (4 vr), Slides (12 sl), Werkboek (4 opg), Exit (4 vr) | **OpticsLab** (mode: lens) + `dragDrop` + `mixedRetrieval` |

---

## 3. Technische & Architecturale Implementatie

### 3.1 Registry & Routing
- In `src/data/modules.js` zijn de modules en lessen geregistreerd:
  - `year: 3`, `module: 1` (`fys3-m01`) bevat exact de 13 les-ID's van WACO 3 Thema 1.
  - `year: 4`, `module: 1` (`fys4-m01`) bevat exact de 10 les-ID's van WACO 4 Thema 1.
- In `src/data/students.js` zijn de actieve klassen gekoppeld:
  - `3NAWE+3SPOWE` -> `yearByClass: 3`
  - `4NAWE+4SPOWE` -> `yearByClass: 4`
- Hash routing werkt via `#/les/:id` (dynamische import via `LessonView.vue`).

### 3.2 Activity System Integratie
In `src/composables/useActivitySystem.js`:
- De interactieve labs (`pressureLab`, `opticsLab`, `forcesLab`, `idealGasLaw`) zijn geregistreerd in `COMPONENT_MAP` en verwijzen naar actieve Vue 3 componenten in `s-activities/`.
- `card-activity` in stap B van elke les opent direct het bijbehorende interactieve lab met de juiste startmodus.
- De extra materiaal componenten (`dragDrop`, `mixedRetrieval`) worden geopend via de verrijkingskaart (`ExtraChallengeBranch.vue`).

### 3.3 Verificatiecommando's & Resultaten
Alle geautomatiseerde checks zijn lokaal uitgevoerd en slagen zonder fouten:
```bash
# 1. Health check (scope, registry, activity-types, imports, design-ratchet)
npm run check
# Uitkomst: 42 registry-items gecontroleerd, alle 7 activity-types geregistreerd, 0 fouten, 0 design regressies.

# 2. Productiebuild
npm run build
# Uitkomst: Vite 7 bundelt alle 23 lesbestanden + interactieve labs in ~13s met code 0.

# 3. Preview smoketest
npm run smoke
# Uitkomst: HTTP 200 op preview server met correcte metadata.
```

---

## 4. Evaluatie-instructie voor een Onafhankelijk AI-Model

Gebruik onderstaande prompt om een onafhankelijk AI-model (bv. Claude 3.7 Sonnet, GPT-4o, Gemini 1.5 Pro) dit werk te laten auditeren:

```markdown
Gelieve een onafhankelijke kwaliteits- en conformiteitsaudit uit te voeren op de lessenreeksen van het Willebroek-leerpad.

Lees de documentatie in `docs/EVALUATION-DOSSIER-THEMA1.md` en inspecteer de lesbestanden in `src/lessons/`:
- `src/lessons/fys4-m01-l*.js` (10 lessen, WACO 4 Thema 1: Druk)
- `src/lessons/fys3-m01-l*.js` (13 lessen, WACO 3 Thema 1: Optische fenomenen)
- `src/data/modules.js` (lesregistry)
- `src/data/students.js` (klassen- en leerjaarkoppeling)
- `s-activities/` (`PressureLabActivity.vue`, `OpticsLabActivity.vue`, `ForcesLabActivity.vue`, `IdealGasLawActivity.vue`)
- `src/components/presentation/` (`SlideWorkedExample.vue`, `SlideSteps.vue`, `SlideDefinition.vue`)

Evalueer specifiek op de volgende 5 domeinen:
1. **Curriculum & Jaarplan-conformiteit:**
   - Klopt het aantal lesuren exact met de jaarplannen (10 voor WACO 4 Druk, 13 voor WACO 3 Optica)?
   - Worden de GO! leerplandoelen en cesuurdoelen voor D-finaliteit Natuurwetenschappen correct en diepgaand behandeld?
2. **Didactische Kwaliteit (50-minuten ABC-methode):**
   - Heeft elke les een strikte en consistente ABC-opbouw:
     - Stap A (15 min): 2 kaarten (card-entry met exact 4 diagnostische vragen, card-pres-a)?
     - Stap B (30 min): exact 3 kaarten (card-pres-b instructie, card-workbook WACO oefeningen, card-activity digitaal lab)? Geen ongeoorloofde extra kaarten.
     - Stap C (5 min): 2 kaarten (card-pres-c synthese, card-exit met exact 4 vragen)?
   - Bevatten de presentaties kwalitatieve didactische content (10-12 slides, stapsgewijze voorbeelden met Gegeven/Gevraagd/Formule/Berekening/Antwoord, begripschecks)?
3. **Differentiatie & Interactieve Simulaties:**
   - Beschikt elke les op de blauwe hoofdkaart in stap B over een echte interactieve vaksimulatie (`pressureLab`, `opticsLab`, `idealGasLaw`, `forcesLab`)?
   - Beschikt elke les over extra materiaal (`dragDrop` matching + `mixedRetrieval` verdieping) voor snellere leerlingen?
4. **Wetenschappelijke, Wiskundige & Taalkundige Zuiverheid:**
   - Zijn de fysische formules, eenheden (Pa, bar, hPa, m/s, m², etc.) en wetten foutloos geformuleerd?
   - Zijn formules conform het Vlaams secundair onderwijs opgesteld met `=` in plaats van benaderingstekens (`≈` of `\approx`)?
   - Is overdreven Engels Title Case vermeden en volgt de tekst de Nederlandse spellingregels?
   - Zijn storende AI-elementen zoals em dashes (`—`) afwezig?
5. **Codekwaliteit, Presentatieweergave & Systeemintegriteit:**
   - Worden worked-example slides en steps slides in de presentation modal vlekkeloos gerenderd zonder afkapping of lege kaders?
   - Slagen `npm run check`, `npm run build` en `npm run smoke` met 0 fouten?

Geef een bondig eindoordeel per domein met een score op 10 en eventuele aanbevelingen.
```
