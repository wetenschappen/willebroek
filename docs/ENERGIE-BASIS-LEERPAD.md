# Energie basis — oplossingsstrategieën bij oefeningen 5–10

Voor de gecombineerde klas **4LAT / 4ECWE**, één uur fysica per week gedurende
één semester, uitsluitend **GO! basisvorming**. De leerlingen doen fysica minder
graag, maar zijn niet zwak in wiskunde. Begeleiding betekent hier hulp bij de
**aanpak van een fysisch probleem**, geen uitleg van elementaire rekenvaardigheden.
Zie ook [BEGELEIDE-LEERPADEN.md](BEGELEIDE-LEERPADEN.md).

## Ingang en afbakening

- Leerlinglink: `https://wetenschappen.github.io/willebroek/energie-basis/`.
- Lokaal: `http://localhost:5173/willebroek/energie-basis/` na `npm run dev`.
- Introductie van T2 en oefeningen **1–3 zijn al klassikaal gemaakt**.
- De route begeleidt **oefeningen 5–10 volledig**, boek **p. 77–78** van de
  **1u-versie**. Gebruik niet de pagina's van de 2u-route voor 4NAWE/4SPOWE.
- Geen kunstmatig eindpunt na één lesuur: leerlingen werken tijdens de les zo
  ver als ze raken. Snellere leerlingen gaan verder; de rest kan pauzeren en
  later hervatten. Niet beloven dat iedereen de route in één uur afwerkt.
- Zeven berekeningen en vijf redeneeropdrachten, verdeeld over acht boekschermen.
  Daarnaast twee korte digitale controles, geen lange quiz.
- Eigen HTML-ingang `energie-basis/index.html`, dezelfde Vite-build en Pages-
  deployment. ABC en de andere twee leerpaden blijven intact.

Dit is nog **niet heel T2** en evenmin een semesterroute. Vermogen, rendement en
volwaardige kwantitatieve energiebalansen moeten later nog worden uitgewerkt.

## Waarom versie 2?

De eerste versie (5 en 6a, 16 schermen) was volgens de leerkracht te veel
**afchecken en te weinig oefenen**. De extra toelichting: voldoende/veel wiskunde
in deze richtingen; geen basisuitleg nodig over wat een kwadraat betekent.
De afspraak is daarom: substantieel boekwerk, een oplossingsstrategie bij een
nieuw soort probleem en minder procedurele bevestigingen. Dit is ontwerpfeedback,
geen meting van leerwinst of verslag van een afzonderlijke klasevaluatie.

Versie 2 heeft **tien inhoudelijke schermen**. Geen aparte materiaalcheck,
kwadraatquiz, afgevinkte voorbereidingsregels of verplichte leesbevestigingen.
De vervolgknop **“Oefening … gemaakt, verder”** is de zelfrapportage; er staat niet
nog een checklist voor. Het openen van een scherm rondt het niet af.

## Bronnen en gecontroleerde paginering

Lokale map: `docs/lesson material/jaar 4 - 1u/`.

| Bron | PDF-pagina's | Gebruik |
| --- | --- | --- |
| `GO! SO 2de graad doorstroom - leerplan Basisvorming.pdf` | 48, 50–51 | Fysische probleemaanpak en basisdoelen energie |
| `WACOF4DS1AL_T2_Handleiding (1).pdf` | 12–13 | Boek p. 72–73: groene leerlingkaders en uitgewerkte voorbeelden |
| Dezelfde handleiding | 17–18 | Boek p. 77–78: alle opgaven en deelvragen 5–10 |
| Dezelfde handleiding | 30 | Boek p. 90: gerichte leesopdracht bij energiebehoud voor oefening 10 en de slotcontrole |
| Dezelfde handleiding | 19 | Boek p. 79: scope-notitie bij §2.1 Arbeid |

De genoemde kaders en de volledige opgaven zijn op bronafbeeldingen nagekeken.
De opgaven op PDF p. 17–18 en de naslag op p. 30 zijn bij de herwerking opnieuw
visueel gecontroleerd. Op deze pagina's geldt boekpagina = PDF-pagina + 60;
dat is geen algemene regel voor andere bestanden. De route noemt boekpagina's.
Er is geen hele-boekverwerking geclaimd.

Het lokale oplossingenbestand is geen leerlingasset. De PDF's blijven genegeerd
via `.gitignore`; er worden geen uitgevershandleidingen, figuren of volledige
correctiesleutels gepubliceerd. Formules en symbolische omvormingen zijn hulp,
geen numerieke antwoordenverzameling voor de boekoefeningen.

### Belangrijke broncorrectie bij oefening 10

De opgave zegt dat de **lengte van de hellingen constant** is. De verticale
hoogteverschillen zijn **niet** gelijk. De oude documentatie en een eerdere
bespreking namen ten onrechte gelijke hoogte aan. Die aanname is verwijderd.
De route laat hellinglengte en verticale hoogte vergelijken en vervolgens
redeneren met de beginenergie. Geen arbeids- of hoekberekening nodig. Vanuit
rust vertrekken, met hetzelfde blok en verwaarloosbare wrijving, wordt expliciet
als modelaanname benoemd. Een regressietest bewaakt deze broninterpretatie.

## Leerplanselectie en dekking

| Doel | Plaats in deze route |
| --- | --- |
| `BV2_06.40` | Probleem analyseren, formule kiezen, onbekende vrijmaken en resultaat controleren |
| `BV2_06.45.01` | Energieformules gebruiken, oefenen in 5–7; formularium toegestaan |
| `BV2_06.44.01` | Behoud toepassen bij 10; naslag p. 90 en slotcontrole |
| `BV2_06.44.02` | Omzettingsketen bij 9 en thermische energie in de slotcontrole; geen volledige dekking van alle energievormen geclaimd |
| `BV2_06.45.02` | Voorbereidende redenering bij 10, maar nog geen volledige oefenreeks met kwantitatieve energiebalansen |
| `BV2_06.46.01–02` | Rendement en vermogen: later, niet geschrapt uit basisvorming |

**Oefeningen 5–10 passen inhoudelijk bij basisvorming**, ook waar de uitgever een
moeilijkere reeks aanduidt. Ze zijn geen aparte verdiepingsroute voor snelle
leerlingen. De expliciete notitie op boek p. 79 reserveert **§2.1 Arbeid** voor
het verdiepte basisleerplan van de 1u-richting en de 2u-richting; §2.2 Vermogen
is wel basisvorming. “Basis” betekent niet dat onbekenden vrijmaken of wortels
gebruiken moet worden vermeden.

## Alle opdrachten hebben een concrete plaats

| Boek | Opdracht | Scherm en oplossingsstrategie |
| --- | --- | --- |
| 77 | 5, alle drie ongelabelde bullets | Eén scherm: beweging/hoogte/vervorming herkennen → groen kader kiezen → gegevens koppelen → uitwerken en beoordelen |
| 77 | 6a | Energie berekenen én de gevraagde eenhedencontrole; fietsvoorbeeld p. 73 als model |
| 77 | 6b | Massa zoeken; eerst symbolisch vrijmaken, daarna invullen en eenheid controleren |
| 77 | 6c | Snelheid zoeken; onbekende isoleren, positieve grootte gebruiken, eenhedencontrole |
| 78 | 7 | Maximale lengteverandering; gegevens uit tekst én figuur, aanpak van 6c overdragen naar elastische energie |
| 78 | 8a–b | Beide uitspraken juist/fout én verklaren; wat verandert, wat blijft gelijk, wat volgt uit de formule? |
| 78 | 9a–b | Energieomzetting en nut van recuperatief remmen; omzettingsketen, transport tegenover opslag |
| 78 | 10 | Keuze én verklaring; gelijke hellinglengte onderscheiden van verticale hoogte, energiebehoud gebruiken |

Oefeningen 1–3 worden niet opnieuw ingepland. Oefening 4 is niet opgenomen; het
geïsoleerde systeem wordt functioneel teruggenomen bij behoud. De zes volledige
oefeningen 5–10 bevatten samen zeven berekeningen (3 + 3 + 1) en vijf
redeneeropdrachten (2 + 2 + 1).

## Begeleiding zonder microstappen

Elk boekscherm bevat de exacte opdracht, een zichtbare **“Zo pak je het aan”**-
strategie en alleen indien nodig een openklapbare aanwijzing. Geen digitale
uitwerking als vervanging van het boek. De groene kaders op p. 72–73 blijven het
formularium; p. 90 wordt alleen gericht gelezen bij het nieuwe behoudsprobleem.

Een nieuw scherm is verantwoord als het **denkwerk verandert**: 6a berekent
energie, 6b massa, 6c snelheid. Niet elke regel “gegeven / gevraagd / invullen”
wordt een aparte handeling in de interface. De drie berekeningen van 5 staan
samen; 8, 9 en 10 vragen telkens de hele schriftelijke redenering.

De optionele hulp maakt bijvoorbeeld eerst de onbekende symbolisch vrij, of
wijst bij een verklaring aan welke grootheden gelijk blijven. Geen lesje
kwadrateren en geen verplichte herhaling van gram-naar-kilogramrekenen.

Twee digitale vragen ondersteunen het boekwerk:

1. Na 7: de aanpak overdragen naar een nieuwe onbekende (hoogte).
2. Na 10: energiebehoud toepassen wanneer er wél wrijving en opwarming zijn.

Beide tellen mee in **“Strategie en energiebehoud”**, op basis van de eerste
poging. Geen opfrisscore “0 van 0”. Juiste antwoorden gaan op slot; na twee
fouten blijft expliciete leerkrachthulp mogelijk. Boekwerk blijft zelfrapportage,
geen automatische correctie of beheersingsscore.

## Techniek, opslag en compatibiliteit

- Inhoud: `src/energie-basis/lesson.js`; ingang: `src/energie-basis/main.js`.
- Gedeelde renderer: `src/guided/GuidedPath.vue`, met optionele `strategy`-lijst.
- `work` met **`completion: 'button'`** bevestigt met de vervolgknop, zonder
  `checks`. De bestaande checklistmodus blijft de standaard voor de andere routes.
- `src/guided/progress.js` ondersteunt beide vormen, inclusief herstel en
  terugkijken zonder dubbel tellen. Geen verborgen of automatische deelvinkjes.
- Alle tekstvelden, ook `strategy`, gebruiken `MathText.vue` / `math.js`:
  strikte KaTeX, MathML, Nederlandse komma's en geladen fonts. Alleen KaTeX-
  output wordt als HTML geplaatst; gewone tekst niet.
- Nieuwe inhoudsversie en sleutel:
  **`willebroek:energie-basis:fys4-basis-t2-oefenen-v2`**.
  V1-antwoorden passen niet bij deze inhoud/volgorde en worden niet stilzwijgend
  overgenomen. De oude v1-sleutel blijft onaangeroerd, net als de twee andere
  leerpaden. Er is geen migratie die eerder boekwerk als nieuw gemaakt meetelt.
- Alleen lokale opslag, geen accounts, namen, server of synchronisatie.
  Pauzeren/herladen hervat de lopende boekopdracht; schriftelijke tussenstappen
  blijven in het boek/schrift, niet in digitale deelvinkjes. Bij geweigerde opslag
  werkt het open tabblad met een waarschuwing. Reset vraagt bevestiging en raakt
  alleen v2.

## Verificatie

```sh
npm run check
npm run build
npm run smoke
node scripts/energie-basis.browser.mjs
node scripts/energie.browser.mjs
node scripts/celmetabolisme.browser.mjs
git diff --check
```

De inhoudstests bewaken alle deelopgaven, paginering, strategie in plaats van
microchecks, de interpretatie van oefening 10, beide bevestigingsvormen,
opslagisolatie, v1-versiescheiding en eerste pogingen/hulp. De wiskundetests
compileren alle tekstvelden van alle routes, inclusief de nieuwe strategieën.

De Chrome-test doorloopt de tien schermen en controleert het ontbreken van
boekwerkchecklists, formules in strategie/hulp/vraag/keuzes/feedback, MathML en
fonts, 320/390 px, toetsenbord, pauze/refresh/Escape, doorkunnen na 8, terugkijken,
reset en behoud van de andere opslagsleutels. Beide bestaande leerpaden worden
opnieuw getest vanwege de gedeelde renderer en voortgangslogica.

De daadwerkelijke lestijd en de kwaliteit van de schriftelijke oplossingen blijven
in de klas te beoordelen; de technische tests bewijzen geen leerlingbeheersing.
