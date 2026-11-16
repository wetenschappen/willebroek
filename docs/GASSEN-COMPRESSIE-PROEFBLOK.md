# Gassen — compressieproefblok voor 6ELTE / 6IICT

## Status en afbakening

**Inmiddels is daarnaast [les 1](GASSEN-LES1.md) lokaal gebouwd op
`/willebroek/gassen/`, met opwarming, vergelijken en het papieren slot.**
Dit document blijft de afbakening van de aparte compressiereferentie beschrijven;
die inhoud en opslag zijn niet vervangen door de nieuwe hoofdroute.

**Lokale proef, niet gepubliceerd of klassikaal beproefd.** Eigen ingang:
`/willebroek/gassen/proefblok/`. Dit is geen volledige bezoekles, geen hele
bundel en geen vervanging van `/energie-basis/` of van de ABC-planner.

Doelgroep: tien leerlingen in de gecombineerde klas **6ELTE / 6IICT**, elk met
een laptop. De geobserveerde les duurt 50 minuten en begint **zonder toets**.
De leerkracht opent nieuwe inhoudsblokken en bepaalt gezamenlijke overgangen.
Geen dashboard, accounts, technische klassloten of zelfstandig te starten nieuwe
theorie voor wie vroeg klaar is.

De afgesproken bundel omvat twee lessen:

- bezoekles: compressie, opwarming bij vast volume, vergelijking en individuele
  slotvraag (p. 1–5);
- vervolg: ideale gaswet, verplichte opdracht 3 en gerichte gemengde oefening
  (p. 6; p. 7 is verdieping).

**Dit proefblok dekt alleen compressie op p. 1–2.** Opwarming, kelvinonderzoek,
opdracht 2, vergelijking/slotvraag, de ideale gaswet/opdracht 3 en gemengde
examenvoorbereiding zijn nog niet in deze digitale route gebouwd. Opdracht 4
blijft verdieping. De ideale gaswet werd op 30 september gezamenlijk behandeld;
het vervolg moet die voorkennis activeren, niet overslaan of vanzelfsprekend
beheerst veronderstellen.

## Bron en leerdoelen

Eigen geïllustreerde bundel, proefversie van **zeven A4-pagina's**:

```text
C:/Users/Albert/Documents/6TSO/Afronding_Mechanica/voorstel aangepast lesmateriaal/
  Leerlingen/Bundel6_Gastoestanden.pdf
  Bronbestanden/Bundel6_Gastoestanden.inhoud.tex
```

De correctiesleutel is alleen voor de leerkracht en is geen websiteasset.
Originele bundels, afgeronde bundel 5 en afgenomen toetsen zijn niet aangepast
of opnieuw gebouwd voor deze digitale proef. Nog geen URL/QR toegevoegd aan
de papieren proefversie.

Leerplan: GO! Industriële ICT, PDF p. 19, **WD3_11.18.01**, vooral `.01.01`
(toestandsgrootheden beschrijven) en `.01.03` (toestandsveranderingen analyseren
met isothermen of tweestandenvergelijking). `.01.02` met pV=nRT volgt expliciet
in les 2. Digitale voortgang is geen bewijs van individuele doelbeheersing.

## Onderwijscyclus en exacte dekking

| Stap | Papier | Denkwerk / resultaat |
| --- | --- | --- |
| 1. Eerst voorspellen | p. 1, A0 | Drukverandering voorspellen bij halvering van V; eigen reden vóór het model |
| 2. Zuigeronderzoek | p. 1, A1 | 60 → 40 → 30 mL; drie drukken noteren en drie producten pV berekenen |
| 3. Begripsvraag | spuittekeningen p. 1 | Afgesloten gas, gelijkblijvende deeltjes/temperatuur; specifieke feedback op verdwijnen, krimpen en afkoelen |
| 4. Besluit en voorbeeld | besluit p. 1; kader/voorbeeld p. 2 | Constante grootheden en product benoemen; verbinden met p₁V₁=p₂V₂ en voorbeeld |
| 5. Zelf toepassen | p. 2, opdracht 1a–c | Constanten, richting voorspellen en volledige eigen berekening; zichtbare aanpak, optionele omvormingshulp |
| 6. Vervolg binnen hetzelfde onderwerp | p. 2, A+ | Eerst voorspellen hoe je vanuit 40 mL / 1,5 bar de druk halveert; dan controleren en punt aanduiden |

A0/A1/besluit/1a–c gebruiken `completion: 'button'`, geen reeks afvinkjes.
Een klik bevestigt **zelfgerapporteerd papierwerk**, niet juistheid. De laatste
stap is een lees-/onderzoeksaanbod: het slot claimt niet dat A+ is gemaakt.
Tijdens de les loopt dit vervolg tot de leerkracht de gezamenlijke overgang
opent. Als de klas eerder klaar is én het begrijpt, hoeft zij niet kunstmatig
te wachten. De echte duur is nog niet gemeten.

De begripsvraag bewaart de eerste poging. Na twee fouten kan de leerling
expliciet bevestigen dat hulp besproken is; dit is geen beveiligde
leerkrachtgoedkeuring. Hulp telt apart, niet als juist eerste antwoord.
Het slot noemt dit “Begrip”; het is geen formele puntenscore of volledige gaswettest.

## Het model: beperkt en controleerbaar

Nieuwe gerichte component, **geen verbouwing van de bestaande vierwettenactiviteit**
`s-activities/IdealGasLawActivity.vue`. Die heeft andere eenheden, grenzen en
bediening en blijft byte-ongewijzigd.

- Ideaal gas, dezelfde hoeveelheid gas, T = **300 K**; absolute druk in **bar**.
- Volume **20–80 mL**, stappen van 1 mL; exactknoppen 60, 40, 30 en 80 mL.
- Afgesloten spuit, geen toevoer/lek; gasruimte geometrisch evenredig met V.
- 60 mL → 1,00 bar; 40 → 1,50; 30 → 2,00; 80 → 0,75; 20 → 3,00.
- pV = **60 bar·mL**. Intern: Pa, m³, K, R = 8,31;
  n = 100000 × 60·10⁻⁶ / (8,31 × 300) ≈ 0,00240674 mol.
- Live gebogen p,V-diagram: stip en hulplijnen gebruiken dezelfde berekening
  als het drukveld. Geen rechte lijn tussen de uiterste toestanden.
- Twaalf **representatieve** stippen; aantal, grootte en snelheid blijven
  behouden. Hun schematische beweging is geen moleculaire drukmeting.
  De druk volgt de ideale gaswet, niet getelde botsingen: dit is geen
  onafhankelijke experimentele bevestiging van diezelfde wet.
- Slepen met muis/touch, native schuifbalk, exacte knoppen, toetsenbord en reset.
  De zuiger ondersteunt pijlen en Home/End; gegevens zijn ook tekstueel beschikbaar.
- Animatie kan gepauzeerd worden; `prefers-reduced-motion` start zonder beweging.
  Verborgen document pauzeert frames; unmount verwijdert frames en listeners.

De **toestelstand en animatie zijn tijdelijk**: bij teruggaan/herladen start
het model op 60 mL voor A1 of 40 mL voor A+. Geen opgeslagen meettabel suggereren.
De routevoortgang blijft lokaal bewaard als opslag beschikbaar is; de notities
staan op papier. Zonder opslag werkt het huidige tabblad, met waarschuwing.

## Techniek en lokale controle

- Inhoud: `src/gassen/compression-pilot.js`.
- Model: `src/gassen/compression-model.js`.
- Component: `src/gassen/CompressionLab.vue`.
- Dunne wrapper: `src/gassen/CompressionPilot.vue`, gemount door `pilot-main.js`.
- HTML-ingang: `gassen/proefblok/index.html`, expliciet in `vite.config.js`.
- Gedeelde renderer blijft `src/guided/GuidedPath.vue`: alleen een scoped
  `activity`-slot toegevoegd en werkstappen met `activity` digitaal gekleurd.
  Geen kopie van de app of wijziging in `progress.js`.
- Eigen les-id `fys6-gassen-compressie-proefblok-v1` en sleutel
  `willebroek:gassen:proefblok:fys6-gassen-compressie-proefblok-v1`.
  Geen migratie van antwoorden uit andere routes.

Lokaal bekijken, vanuit de repository:

```bash
npm run dev
# http://localhost:5173/willebroek/gassen/proefblok/
```

Controlevolgorde:

```bash
npm run check
npm run build
npm run smoke
node scripts/gassen-compressie.browser.mjs
node scripts/energie-basis.browser.mjs
node scripts/energie-kinetisch-pilot.browser.mjs
node scripts/energie.browser.mjs
node scripts/celmetabolisme.browser.mjs
git diff --check
```

`npm run check` bevat de gasmodel-/route-/opslagtests en strikte compilatie
van alle gasformules. De optionele Chrome-tests gebruiken Node 22+ en Chrome
(of `CHROME_PATH`), geen extra npm-dependency. Ze testen desktop 1366×768 en
mobiel 390/320 px, muis-/touchdrag, toetsenbord, grafiek, deeltjes, feedback,
eerste poging, hulproute, papierbevestiging, reset/andere sleutels, herladen,
Escape, reduced motion, opslagweigering en animatie-opruiming bij pauzeren.
Screenshots worden in een tijdelijke map geschreven. Dit is **geen volledige
test met een schermlezer of een echt schooltoestel**.

## Nog nodig vóór lesgebruik of publicatie

1. Leerkracht doorloopt de proef met de **gedrukte p. 1–2** ernaast: zijn de
   denkstappen duidelijk en vult het scherm het papier echt aan?
2. Realistische looptijd, ondersteuning en afspraken voor snelle leerlingen
   toetsen; niet afleiden uit de test die automatisch op knoppen klikt.
3. De uitbreiding naar opwarming en het slot is inmiddels apart gebouwd:
   [les 1](GASSEN-LES1.md). Die volledige route blijft nog in de praktijk te toetsen.
4. Print-/schrijfruimte, schoollaptop, schoolwifi en definitieve link testen.
5. Projectie met het echte krijtbord beoordelen: 25% links / 50% midden /
   25% rechts, alleen werkelijk zichtbare zijpanelen bij middenprojectie.
   Browser-screenshots bewijzen geen leesbaarheid vanaf een leerlingbank.
6. Papierfallback blijft de bundel met afleesbare modelgrafiek. Pas na
   werkende route en klascontrole eventueel definitieve URL/QR toevoegen.

Geen publicatie, commit, bundelherbouw of examenregelingwijziging hoort bij
het bouwen van deze lokale proef.
