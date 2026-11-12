# Energie basis — begeleide les bij oefeningen 5–10

Voor **4LAT / 4ECWE**, één uur fysica per week gedurende één semester,
uitsluitend **GO! basisvorming**. Introductie T2 en oefeningen **1–3 zijn al
klassikaal gemaakt**. De leerlingen doen fysica minder graag, maar zijn niet
zwak in fysica of wiskunde. Leer hen fysische begrippen, modelkeuzes en
oplossingsstrategieën, geen elementaire rekenvaardigheden.

## Actuele versie en ingang

**De leerkracht heeft het kinetische proefblok goedgekeurd en gevraagd die
lesaanpak uit te breiden tot de volledige les van 50 minuten: oefeningen 5–10.**
Versie 3 doet dat op de bestaande leerlinglink:

**https://wetenschappen.github.io/willebroek/energie-basis/**

Lokaal: `http://localhost:5173/willebroek/energie-basis/` na `npm run dev`.
Eigen HTML-ingang `energie-basis/index.html`, dezelfde repo/Vite-build/Pages-
publicatie als ABC, de twee-uursroute en celmetabolisme. Geen extra lesregistry,
accounts, dashboard of backend.

### Waarom deze opbouw?

- V1 beperkte zich tot 5 en 6a en bevatte te veel procedurele controles.
- V2 dekte 5–10, maar was volgens de leerkracht te bondig: vooral een
  opdrachtenlijst met hints, met onvoldoende meerwaarde tegenover zelf lesgeven.
- Het daarna gemaakte kinetische proefblok werd **inhoudelijk goedgekeurd**.
  Niet alleen de interface, maar de didactiek is nu doorgetrokken:
  **gericht boekonderzoek → begripsvraag → inhoudelijke feedback → toepassing**.

Het goedgekeurde blok vormt ongewijzigd de eerste vier lesstappen, behalve de
vervolgknop na de transfervraag. `lesson.js` importeert daarvoor de stappen uit
`kinetic-pilot.js`, zodat er geen twee uiteendrijvende versies van de uitleg zijn.
De aparte link `/willebroek/energie-basis/proefblok/` blijft als kleine referentie
bestaan, maar is **niet** de ingang voor de volledige les.

## Planning voor 50 minuten

| Richttijd | Inhoud | Boekwerk |
| --- | --- | --- |
| 18 min | Drie energiemodellen onderzoeken en begrijpen | 5: balletje, appel én veer |
| 15 min | Dezelfde relatie bij een andere onbekende, daarna modeloverdracht | 6a–c met eenhedencontrole en 7 |
| 5 min | Verbanden vergelijken, overige grootheden constant houden | 8a én 8b, met verklaringen |
| 5 min | Omzetting, overdracht en opslag onderscheiden | 9a én 9b |
| 7 min | Behoud bij gladde hellingen, slotvraag over wrijving en afronding | 10: keuze én verklaring |

Dit is een **ontwerpplanning**, geen gemeten klassentijd of garantie dat ieder
individu binnen 50 minuten klaar is. Alle 5–10-opdrachten staan in dezelfde les;
er is geen verborgen uitbreiding of automatische stop. Wie tijd over heeft,
werkt verder of bespreekt zijn uitwerking. Wie niet klaar is, pauzeert en hervat.
Geen opdracht of verklaring verdwijnt door een timer.

## Inhoud en plaats van alle opdrachten

De les heeft **26 inhoudelijke schermen: 7 boekonderzoeken, 9 begripsvragen en
10 boekopdrachten**. Het aantal volgt het leerwerk, niet andersom. De zeven
berekeningen (3 + 3 + 1) en vijf redeneeropdrachten (2 + 2 + 1) zijn volledig gedekt.

| Blok | Boekonderzoek en zichtbare uitleg/feedback | Toepassing op papier |
| --- | --- | --- |
| Kinetisch | Kader p. 72 en fietsvoorbeeld p. 73; systeemkeuze bepaalt de massa; transfervraag met dubbele massa bij gelijke snelheid | 5, eerste ongelabelde bullet: metalen balletje, p. 77 |
| Gravitationeel | Kader en Anaïsvoorbeeld p. 72; referentieniveau en verticale hoogte, niet de afgelegde weg | 5, tweede bullet: appel, p. 77 |
| Elastisch | Kader en flipperkastvoorbeeld p. 73; vervorming tegenover totale lengte; ook veerconstante bepaalt de energie, zelfs bij stilstand | 5, derde bullet: veer, p. 77 |
| Andere onbekende | Fietsvoorbeeld, inclusief eenhedencontrole; bekende/gevraagde grootheden van 6; energiemodel verandert niet doordat de onbekende verandert | 6a, 6b en 6c afzonderlijk; telkens omvorming waar nodig en de gevraagde eenhedencontrole, p. 77 |
| Overdracht | Elastisch model uit 5 hergebruiken, algebraïsche aanpak uit 6c overdragen; niet plots de snelheid van de springer zoeken | 7: maximale lengteverandering; gegevens uit tekst én figuur, p. 78 |
| Verbanden | Formules p. 72 vergelijken; karretje met halve snelheid als andere situatie dan de boekvraag | 8a–b: beide juist/fout én verklaren met het passende verband, p. 78 |
| Remmen | Tekst/figuur bij 9; eerste alinea chemische energie p. 70 als naslag; elektrische overdracht versus chemische opslag, geen volledige terugwinning beloven | 9a: omzettingsketen; 9b: nut bij later gebruik, p. 78 |
| Behoud | Eerste alinea en vallende bal op p. 90; som behouden terwijl bijdragen veranderen; slotfeedback neemt thermische energie mee bij wrijving | 10: antwoordkeuze én redenering, p. 78 |

Oefening 5 heeft geen gedrukte a/b/c-labels; gebruik de drie beschrijvingen.
De tussenliggende begripsvragen vervangen geen schriftelijke deelvraag. Bij 8
blijven beide verklaringen vereist, bij 9 zowel omzetting als nut, bij 10 zowel
keuze als verklaring. Geen hoofdstuk over arbeid of hoekberekeningen toevoegen.

### Essentiële broncorrectie bij 10

**De hellinglengte is constant, niet de verticale hoogte.** Vergelijk de verticale
hoogteverschillen en de bijbehorende beginenergie. Zelfde blok, beginrust en
verwaarloosbare wrijving zijn expliciete modelaannamen. De grond is het
referentieniveau. De route noemt geen correctieletter; de leerling moet kiezen
en de keuze onderbouwen. Een inhouds- én browsertest bewaken deze interpretatie.

## Wat de begeleiding wel en niet doet

- Elke nieuwe fysische kern start met een gerichte onderzoeksvraag bij het boek.
  Geen opdracht om een heel hoofdstuk door te lezen of het uitgewerkte voorbeeld
  opnieuw uit te rekenen.
- Alle negen begripsvragen geven **zichtbare inhoudelijke feedback na antwoorden**.
  Elke foutkeuze heeft eigen `feedbackByOption`, met de misvatting en een concrete
  bronverwijzing. De uitleg bij het juiste antwoord benoemt het fysische verband.
- De kernles staat niet verstopt achter “Ik heb een aanwijzing nodig”. Alleen
  extra hulp, zoals een formule omvormen of een voorbeeld opnieuw aanwijzen,
  blijft optioneel. Ook de boekopdracht bevat voldoende zichtbare begeleiding.
- De ondersteuning neemt af: 5 koppelt voorbeeld en gegevens; 6 wisselt onbekende;
  7 vraagt overdracht naar het andere energiemodel; 8–10 vragen verklaringen.
- Geen kwadraatles, verplichte bevestiging van elke rekenstap, materiaalquiz of
  boekwerkchecklist. `work` gebruikt `completion: 'button'`. De vervolgknop
  bevestigt **zelfgerapporteerd gemaakt** boekwerk; openen is niet afronden.
- Het boek/schrift blijft de hoofdwerkplek. Geen uitgeversfiguren, digitale kopie
  van het handboek, numerieke oplossingenlijst of automatische correctie van papier.
- “Begrip en toepassing” rapporteert eerste pogingen op de negen vragen. Een
  herkansing poetst die niet op. Na twee fouten kan een expliciet bevestigde
  bespreking met de leerkracht doorgang geven. Dat blijft zelfrapportage.
- De voortgangsbalk telt afgeronde stappen, niet beheersing. De slottekst vraagt
  de schriftelijke uitwerkingen te laten nakijken en twijfels te bespreken.

## Bronnen en gecontroleerde paginering

Lokale map: `docs/lesson material/jaar 4 - 1u/`. PDF-pagina's zijn 1-based.

| Bron | PDF-pagina's | Boek / doel |
| --- | --- | --- |
| `GO! SO 2de graad doorstroom - leerplan Basisvorming.pdf` | 48, 50–51 | Eerder gecontroleerde fysische probleemaanpak en basisdoelen energie, versie 31/01/2025 |
| `WACOF4DS1AL_T2_Handleiding (1).pdf` | 12–13 | p. 72–73: drie groene leerlingkaders en uitgewerkte voorbeelden |
| Dezelfde handleiding | 17–18 | p. 77–78: volledige opgaven, subvragen, figuren en opdrachten 5–10 |
| Dezelfde handleiding | 10, eerste alinea | p. 70: chemische energie; alleen deze alinea als gerichte naslag, niet het “Weetje” |
| Dezelfde handleiding | 30 | p. 90: eerste alinea, vallende bal en thermische energie; geen voedingsopdracht |
| Dezelfde handleiding | 19 | Eerder gecontroleerde scope-notitie p. 79 bij §2.1 Arbeid |

Voor v3 opnieuw tekst én bronbeelden van PDF p. 12–13, 17–18 en 30 bekeken,
plus een bronuitsnede van de eerste alinea op p. 10. De OCR van onder meer de
formules op 12–13 is verdacht; de beelden zijn leidend, niet formulekandidaten.
Dit is gerichte broncontrole, geen claim dat het hele boek is verwerkt of correct
ge-OCR'd. Boekpagina = PDF-pagina + 60 geldt hier, niet voor de 2u-route.

Lokale PDF's en oplossingenbestanden blijven via `.gitignore` buiten publicatie.
Alleen eigen lesinstructies, verklaringen en symbolische formulehulp gaan mee.

## Leerplanselectie en grenzen

| Doel | Plaats |
| --- | --- |
| `BV2_06.40` | Gegevens en model kiezen, onbekende vrijmaken en resultaat beoordelen |
| `BV2_06.45.01` | Drie energieformules gebruiken, 5–7, met formularium |
| `BV2_06.44.01` | Kwalitatief behoud, vallende bal, 10 en wrijving |
| `BV2_06.44.02` | Omzetting bij 9 en thermische energie; geen volledige dekking van alle energievormen |
| `BV2_06.45.02` | Voorbereiding bij 10, geen volledige kwantitatieve balansenoefenreeks |
| `BV2_06.46.01–02` | Rendement en vermogen volgen later, niet uit basisvorming geschrapt |

Alle oefeningen 5–10 passen inhoudelijk bij basisvorming, ook waar de uitgever
een moeilijkere reeks aanduidt. Oefening 4 is uitgesteld; het geïsoleerde systeem
wordt functioneel hernomen bij behoud. §2.1 Arbeid is voor deze groep niet
verplicht; §2.2 Vermogen wel. Nog geen hele-T2- of semesterdekking claimen.

## Techniek, opslag en compatibiliteit

- `src/energie-basis/lesson.js`: volledige v3-les, inclusief het geïmporteerde
  goedgekeurde kinetische blok; `main.js` en `progress.js` blijven dunne adapters.
- Gedeelde `src/guided/GuidedPath.vue`, `feedback.js`, `progress.js`,
  `MathText.vue` en `math.js`. Geen nieuwe renderer, scorestructuur of opslagengine.
- Nieuwe les-id **`fys4-basis-t2-begeleid-v3`** en sleutel
  **`willebroek:energie-basis:fys4-basis-t2-begeleid-v3`**. De gewijzigde volgorde en
  vraaginhoud maken de antwoorden van v1/v2/proefblok niet uitwisselbaar.
- Geen stille migratie. Oude basis-v1/v2-sleutels, de proefbloksleutel, de
  twee-uursenergie en celmetabolisme blijven bewaard. V3-reset raakt alleen v3.
- Alleen lokale opslag; hervat na pauze/refresh op hetzelfde scherm. Schriftelijke
  tussenstappen blijven in het boek. Bij geweigerde opslag werkt het open tabblad
  met een waarschuwing. Geen namen, accounts, synchronisatie of backend.
- Alle dynamische teksten, inclusief keuze-uitleg en optionele hulp, krijgen
  strikte KaTeX en MathML. Nederlandse komma's blijven behouden. Gewone tekst is
  geen HTML. Geen nieuwe appkleuren, fonts of componentstijlen.

## Verificatie

```sh
npm run check
npm run build
npm run smoke
node scripts/energie-basis.browser.mjs
node scripts/energie-kinetisch-pilot.browser.mjs
node scripts/energie.browser.mjs
node scripts/celmetabolisme.browser.mjs
git diff --check
```

Inhoudstests controleren de overname van het goedgekeurde blok, de cycli,
alle deelopgaven, source-relevante modelaannamen, feedback, eenhedencontrole,
versiescheiding, herstel, eerste pogingen en hulp. De wiskundetests compileren
alle tekstvelden van alle routes, ook alle keuze-afhankelijke feedback.

Chrome doorloopt alle 26 schermen en **alle foutkeuzes én juiste antwoorden**,
plus alle optionele boekhulp. Controles: KaTeX/MathML/fonts, 320/390 px,
zichtbare kernopdrachten zonder checklists, toetsenbord, pauze/refresh/Escape,
herkansen, expliciete hulp, afronding, terugkijken, reset en behoud van v1/v2,
proefblok, energie en biologie. De drie andere ingangen blijven regressiedekking.

De technische tests bewijzen geen leerwinst, passende individuele lestijd of
correcte schriftelijke uitwerkingen. Dat blijft in de klas te beoordelen.
