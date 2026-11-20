# Gaswetten — losse projectiesimulatie

`/willebroek/gassen/simulatie/` is een directe ingang voor de cilinder, geen
leerpad en geen leerlingopslag. Eén kopbalk, geen voetbalk. **Volledig scherm**
of F11; als de browser de Fullscreen API weigert, blijft de gewone pagina
bruikbaar. Publieke link: `https://wetenschappen.github.io/willebroek/gassen/simulatie/`.
Lokaal kun je dezelfde route openen zolang `npm run dev` draait. De aparte
lesroutes, compressieproef en de oude activiteit blijven behouden.

## Modelcontrole

De oude projectieweergave gebruikte de oude vierwettenactiviteit. Die kon bij
Charles en Avogadro berekend volume afzonderlijk op 5–25 L vastzetten, terwijl
de druk nog vast bleef. De afgeleide constante en de grafiek konden daardoor
meeschuiven met een toestand die niet meer aan pV = nRT voldeed. De losse
projectieroute heeft nu haar eigen kleine model. Dit begrenst alleen de
bestuurbare invoer, niet een afzonderlijke afgeleide grootheid.

Start voor alle standen: 15,00 L, 300 K, 1,00 mol, 166,2 kPa absoluut.
Intern rekent het model met Pa, m³, mol en K, en R = 8,31 J/(mol·K).
De kaartwaarden, zuigerhoogte en grafiekstip worden afgeleid uit dezelfde
toestand; de curve gebruikt dezelfde rekenfunctie.

| Relatie | Invoer | Vast | Controlepunt |
| --- | --- | --- | --- |
| Boyle | 5–30 L, schuif of zuiger | T, n | 15 → 7,5 L: 166,2 → 332,4 kPa |
| Gay-Lussac | 120–600 K | V, n | 300 → 600 K: 166,2 → 332,4 kPa |
| Charles | 120–600 K | p, n | 300 → 600 K: 15 → 30 L |
| Avogadro | 0,40–2,00 mol | p, T | 1 → 2 mol: 15 → 30 L |

De zuigerhoogte is lineair met het volume in deze doorsnede. Bij Gay-Lussac
staat een hangslot op de zuiger. Bij Avogadro laat de schets de geleiders boven
de zuiger weg; de gaspomp toont kort met een pijl of er gas bijkomt of weggaat.
Dat is terugkoppeling bij een nieuwe schuifstand, geen doorlopende stroming.
Stippen houden
hun grootte en stellen geen echte moleculen voor. Bij gelijke hoeveelheid
blijft het aantal stippen gelijk; bij variabele n wordt het illustratieve
aantal mee geschaald. De modelsnelheid schaalt met de wortel van T in kelvin.
De animatie toont geen warmteoverdracht, dynamische zuigerkrachtsbalans of
botstellende drukmeting. Elke schuifstand is een ideaal-gasevenwichtstoestand;
de aangegeven bereiken zijn geen echte materiaal- of gasgrenzen.

## Koppeling aan het leerplan

Bron: GO! Industriële ICT, derde graad dubbele finaliteit, p. 19, doel
WD3_11.18.01 en de drie subdoelen.

- `.01.01`: de toestandsgrootheden zijn direct zichtbaar; vraag leerlingen
  ze ook in woorden te beschrijven en de rol van kelvin te verklaren.
- `.01.02`: de formule en voorbeeldtoestanden zijn zichtbaar, maar bedienen
  is niet zelf rekenen. De projectieroute berekent de uitkomst; eigen
  formulekeuze, omvorming, eenheden en berekening blijven papierwerk.
  De verplichte opdracht 3a–c (onbekend volume) blijft in bundel 6.
- `.01.03`: goed ondersteund voor de gekozen vergelijkingen bij vaste n:
  één Boyle-isotherm en het druk-temperatuurverband bij vast V. Leerlingen
  kiezen/onderbouwen zelf het passende verband met het formularium. Geen
  isothermenfamilie of vrije gecombineerde toestandsverandering. Charles
  en Avogadro zijn extra vakillustraties; Avogadro heeft veranderlijke n,
  dus niet gebruiken bij de tweestandenformule voor dezelfde hoeveelheid.

Projectiecijfers staan in L en kPa. De papieren compressiegrafiek gebruikt
andere voorbeeldwaarden in mL en bar. Niets aan de papieren bundel aanpassen
om de getallen gelijk te krijgen; bespreek hetzelfde verband onder dezelfde
voorwaarden.

## Verificatie

`npm run check`: modeltest doorloopt elke geldige discrete schuifstand, inclusief
beide grenzen, en controleert pV=nRT, de twee constanten, grafiekbereik en
zuigerpositie. `npm run build && npm run smoke`. De aparte Chrome-test
`node scripts/gassen-simulatie.browser.mjs` test koppeling van waarden/bediening,
limietpunt, pauze, API-aanroep en F11-fallback, en de weergave op brede en smalle
vensters. Native fullscreen en leesbaarheid op de echte schoolprojector nog
praktisch controleren.
