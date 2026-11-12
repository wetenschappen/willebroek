# Energie basis — boekassistent voor 4LAT / 4ECWE

Zelfstandige fysicaroute volgens [BEGELEIDE-LEERPADEN.md](BEGELEIDE-LEERPADEN.md).
Dit is **niet** de energieroute van 4NAWE/4SPOWE: die gebruikt een ander boek
(2u-versie), andere pagina's en een ander startpunt.

## Doelgroep, start en ingang

- Gecombineerde groep **4LAT + 4ECWE**, één uur fysica per week gedurende één
  semester; uitsluitend **GO! basisvorming**, geen verdiept basisleerplan.
- De introductie van T2 en oefeningen **1–3 zijn al klassikaal gemaakt**.
- Deze eerste oefenles behandelt **oefening 5 volledig en alleen 6a**, boek p. 77.
- Leerlingpad: `/willebroek/energie-basis/`.
- Publicatieadres: `https://wetenschappen.github.io/willebroek/energie-basis/`.
  De gebruikelijke Pages-workflow publiceert de ingang na een geslaagde deployment.
- Lokaal: `http://localhost:5173/willebroek/energie-basis/` na `npm run dev`.
- Eigen HTML-ingang `energie-basis/index.html` in dezelfde Vite-build en repo.
  De ABC-planner, beide bestaande leerpaden en de actieve lesregistry blijven intact.

De opzet is voor één lesuur. De werkelijke benodigde tijd moet nog met deze klas
blijken; tussentijds pauzeren en hervatten mag. Vier berekeningen op papier zijn
het hoofdwerk, geen lange digitale quiz. Niet voorstellen als een route voor het
hele semester of voor het volledige thema.

## Bronnen en paginering

Lokale map: `docs/lesson material/jaar 4 - 1u/`.

| Bronbestand | Gebruikte PDF-pagina's | Betekenis |
| --- | --- | --- |
| `GO! SO 2de graad doorstroom - leerplan Basisvorming.pdf` | 50–51 | Officiële basisdoelen energie, balans, vermogen en rendement |
| `WACOF4DS1AL_T2_Handleiding (1).pdf` | 12–13 | **Boek p. 72–73**, groene leerlingkaders en uitgewerkte voorbeelden |
| Dezelfde handleiding | 17–18 | **Boek p. 77–78**, oefeningen 3–10 en alle deelopgaven |
| Dezelfde handleiding | 19 | **Boek p. 79**, expliciete leerkrachtnotitie bij §2.1 Arbeid |
| `OSPLKITWACOF4DS1_02_oefeningen_met_oplossingen.pdf` | Hoofdstuk-1-opgaven, eerder geraadpleegd | Lokale controlebron, niet de leerlingpaginering |

De relevante kaders, voorbeeldopbouw, opgaven en afbakeningsnotitie zijn op de
bronafbeeldingen gecontroleerd. In deze handleiding is op deze pagina's de
boekpagina steeds **PDF-pagina + 60**. Dat is geen algemene regel voor andere
boeken of voor het oplossingenbestand. De route noemt uitsluitend boekpagina's.
Geen hele-boekverwerking of volledige semesterdekking geclaimd.

De PDF's zijn lokaal gehouden via `.gitignore`; er zijn geen publieke kopieën,
PDF-links of overgenomen oplossingenboeken. Ook geen verborgen correctiesleutel
voor het gemaakte boekwerk in de leerlingcode.

## Leerplanfilter: basisdoelen bepalen de selectie

| GO!-doel | Betekenis voor de planning | Deze versie |
| --- | --- | --- |
| `BV2_06.44.01` | Wet van behoud in een geïsoleerd systeem omschrijven | Vervolg; geen nieuwe systemenles in dit oefenuur |
| `BV2_06.44.02` | Kwalitatieve energiebalansen en schematische voorstelling van omzettingen | Vervolg; niet afgedekt met enkel de drie formules |
| **`BV2_06.45.01`** | Kinetische, gravitationele en elastische energie berekenen met een formularium | **Focus van deze oefenroute**; groene kaders blijven beschikbaar |
| `BV2_06.45.02` | Een onbekende berekenen via een energiebalans in eenvoudige situaties | Later expliciet uitwerken; ondersteuning voor omvormen/wortels waar nodig |
| `BV2_06.46.01` | Rendement, nuttige of totale energie berekenen | Later uitwerken; niet geschrapt uit basisvorming |
| `BV2_06.46.02` | Gemiddeld vermogen, tijd of energie berekenen | Later uitwerken; niet geschrapt uit basisvorming |

De blauwe leerkrachtnotitie op boek p. 79 zegt expliciet dat **§2.1 Arbeid** voor
het verdiepte basisleerplan van de 1u-richting en de 2u-richting bestemd is.
**§2.2 Vermogen is wel basisvorming.** Voeg dus niet automatisch de volledige
arbeidsleer, hoekformule en bijbehorende oefeningen toe aan deze basisroute.
Omgekeerd zijn omvormen, een onbekende zoeken en worteltrekken niet automatisch
“verdieping”: ze kunnen nodig zijn bij de eenvoudige basisopgaven en krijgen dan
expliciete begeleiding. Een reeks- of moeilijkheidssymbool van de uitgever is
geen vervanging voor de leerplantoets.

Dit is een beperkte eerste oefenles binnen het leerdoel, **geen verklaring dat
de hele basisvorming of de beheersing ervan hiermee afgehandeld is**.

## Oefeningendekking

| Boekpagina | Onderdeel | In deze route | Bron / steun / vervolg |
| --- | --- | --- | --- |
| 77 (en voorafgaande pagina's) | Oefeningen 1–3 | Reeds klassikaal gemaakt, niet opnieuw ingepland | Twee korte opfrisvragen, geen volledige herhaling |
| 77 | Oefening 4, open/gesloten/geïsoleerd | Niet ingepland | Geïsoleerd systeem terugnemen bij behoud; niet zonder selectie alle classificatie laten maken |
| **77** | **5, bewegend metalen balletje** | Voorbereiden → kwadraatcheck → uitwerken | Groen kader kinetisch p. 72, fietsvoorbeeld p. 73 |
| **77** | **5, appel op hoogte** | Gegeven/gevraagd, massa omzetten, formule en berekening | Groen kader gravitationeel en voorbeeld p. 72; optionele gram-naar-kilogramhint |
| **77** | **5, uitgerekte veer** | Zelf formule kiezen, invullen en uitwerken | Groen kader elastisch en flipperkastvoorbeeld p. 73; symbolencheck vooraf |
| **77** | **6a** | Zelfstandiger berekening **én de gevraagde eenhedencontrole** | Kader p. 72, eenhedenregel fietsvoorbeeld p. 73; hulp alleen openklapbaar |
| 77 | 6b–c | Later | Andere onbekenden: massa en snelheid; omvormen en wortels begeleiden |
| 78 | 7 | Later | Lengteverandering uit elastische energie; formulegebruik met wortel begeleiden |
| 78 | 8a–b | Mogelijke volgende korte verwerking | Invloed van snelheid en hoogte; verklaar met formules, niet enkel juist/fout aanklikken |
| 78 | 9a–b | Later bij energieomzettingen beoordelen | Recuperatief remmen, omzetting en nut |
| 78 | 10 | Later bij behoud/energiebalans beoordelen | Drie gladde hellingen; zelfde hoogte en verantwoording |

Oefening 5 heeft in het boek drie **ongelabelde** bullets. De route benoemt de
situaties, niet fictieve boekletters “5a–c”. De eerste bullet krijgt twee
werkstappen, de andere elk één. Oefening 6 wordt niet als volledig gemaakt geteld.

## Didactische opbouw en rekenhulp

**16 schermen:** vier lees-/zoekschermen (start + drie groene kaders), vijf
boekwerkstappen en zeven korte vragen (twee diagnostisch, twee tussentijds,
drie als eindcheck).

1. Boek, schrift, pen en rekenmachine klaar; duidelijke afbakening.
2. Twee korte opfrisvragen: bewegingsenergie en joule.
3. Kinetisch kader zelf zoeken. Eerste berekening splitsen in gegeven/gevraagd/
   formule, kwadraatcheck en uitwerking. Dit maakt de rekenaanpak zichtbaar.
4. Gravitationeel kader zoeken, daarna tweede berekening met expliciete aandacht
   voor gram → kilogram. Gebruik `g = 9,81 N/kg`, zoals het boekvoorbeeld.
5. Elastisch kader zoeken, betekenis van de symbolen controleren, derde
   berekening maken. De lengteverandering staat al in meter.
6. Oefening 6a met minder voorafgaande hulp: leerling kiest zelf het kader en
   werkt volledig uit. De eenhedencontrole niet overslaan.
7. Drie kleine eindvragen over formulekeuze, kilogram en een nieuwe kinetische
   berekening. Geen digitale antwoordenverzameling voor de boekoefeningen.

De vaste papieraanpak is **gegeven → gevraagd → formule → invullen → berekenen
→ antwoord met eenheid**. Aanwijzingen zijn optioneel en beginnen gesloten bij
elke nieuwe werkstap. Hulp gebruikt waar mogelijk boekvoorbeelden met andere
getallen, geen volledige uitwerkingen van oefening 5 of 6a. De grammatica van het
kwadraat en de eenheden worden kort ondersteund, niet in een tweede online
hoofdstuk uitgelegd. De leerkracht blijft nodig voor nakijken en bij vastlopen.

Bij rekenen **mag het formularium gebruikt worden**, ook tijdens de digitale
eindcheck. Dit sluit aan op het leerplandoel; het is geen geheugentoets van
formules. Eerste pogingen en hulp worden wel eerlijk bijgehouden. Een gemaakte
boekopdracht is zelfrapportage, niet een automatisch juiste oplossing.

## Formuleweergave en techniek

- Lesdata: `src/energie-basis/lesson.js`; inhoudelijke selectie in `curriculum`.
- Ingang: `src/energie-basis/main.js`, `energie-basis/index.html`, `vite.config.js`.
- Gedeelde renderer: `src/guided/GuidedPath.vue`; geen gekopieerde app.
- `src/guided/MathText.vue` en `math.js` renderen expliciete `\( … \)` en
  `\[ … \]` met KaTeX, inclusief CSS, fonts en toegankelijke MathML.
- Dit geldt voor **alle dynamische leerlingtekst**: vragen, keuzes, aanwijzingen,
  feedback, instructies, afvinkpunten, titels en begin-/slotteksten, ook in de
  bestaande routes. Geen ruwe tekst door `v-html`; alleen de gegenereerde
  KaTeX-output wordt als HTML geplaatst (`trust: false`).
- Gewone tekst blijft IBM Plex; formules gebruiken de bij KaTeX horende
  wiskundeglyphs. Nederlandse decimalen worden niet naar punten omgezet.
- Foute LaTeX/delimiters laten de inhoudstests falen; de runtime toont bij een
  onverwachte fout een foutmelding, geen ongemerkt ongerenderde formule.
- Dit is een lichte, veilige renderer voor de begeleide routes. De bestaande
  ABC-mathengine met zijn ruimere HTML/Math.js-gebruik is niet gewijzigd.

## Opslag, privacy en versiebeheer

Eigen sleutel: **`willebroek:energie-basis:fys4-basis-t2-rekenen-v1`**.
Adapter: `src/energie-basis/progress.js`; gedeelde logica:
`src/guided/progress.js`. Geen namen, accounts, server of synchronisatie.
Deelvinkjes, afgeronde stappen en ingediende antwoorden worden lokaal bewaard.
Een reset betreft uitsluitend deze route, niet Energie of Celmetabolisme.
Bij ontbrekende browseropslag blijft het open tabblad werken met waarschuwing.

Een voortgangsbalk meet gemaakte stappen. Eerste pogingen worden niet overschreven
na een herkansing. Na twee fouten kan een leerling bevestigen dat de vraag met de
leerkracht besproken is; dat blijft **zelfrapportage**, geen beveiligde controle.
Verhoog `lesson.id` als latere inhoudswijzigingen de opgeslagen antwoorden
ongeldig maken; hergebruik de sleutel van de twee-uursroute nooit.

## Controleren

```sh
npm run check
npm run build
npm run smoke
node scripts/energie-basis.browser.mjs
node scripts/energie.browser.mjs
node scripts/celmetabolisme.browser.mjs
git diff --check
```

- `scripts/energie-basis.test.mjs`: afbakening, exacte deelopgaven/pagina's,
  eerst voorbereiden en dan rekenen, eigen opslag, partials, doorlopen,
  herstel, eerlijke hulp en eerste poging.
- `scripts/guided-math.test.mjs`: strikte formulecompilatie van alle tekstvelden
  van alle drie routes, decimalen, MathML, foutdetectie en gewone tekstveiligheid.
- Echte Chrome-test: alle schermen, formules in vragen/keuzes/feedback/open hints,
  geladen KaTeX-fonts, mobiel 320/390 px, toetsenbord, Escape, deelvinkjes na
  herladen en reset zonder de andere twee routes te wissen. Screenshots in temp.
- Beide bestaande browserroutes opnieuw doorlopen vanwege de gedeelde renderer.
- De smoketest controleert alle vier HTML-ingangen en hun JS/CSS. HTML-fallback
  wordt op MIME-type en documentstart herkend; de tekst `span<HtmlDomNode>`
  binnen de KaTeX-bundel is op zichzelf uiteraard geen HTML-document.

De techniek kan dit controleren; echte schriftelijke uitwerkingen en de haalbare
lestijd blijven klaswerk. Deze nieuwe route heeft nog geen afzonderlijke
klasevaluatie zoals de eerste energieroute.
