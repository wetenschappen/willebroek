# Energie — begeleide spinoff voor 4NAWE / 4SPOWE

Dit is de eerste toepassing van de aanpak uit
[BEGELEIDE-LEERPADEN.md](BEGELEIDE-LEERPADEN.md). Dat document beschrijft de
herbruikbare didactische afspraken en de aandachtspunten bij uitbreiding naar
andere groepen, waaronder de gewenste toepassing voor 6TSO. Deze pagina
beschrijft alleen de concrete energieroute.

## Ingang en publicatie

- Productie: `https://wetenschappen.github.io/willebroek/energie/`
- Lokaal: `http://localhost:5173/willebroek/energie/` na `npm run dev` (of de poort die Vite toont).
- De bestaande planner op `/willebroek/` en zijn ABC-routes blijven ongewijzigd.
- `energie/index.html` is een tweede Vite-ingang. De normale GitHub Pages-workflow publiceert beide ingangen vanuit één `dist/`.
- Geen apart domein, repo, router of backend. Een directe refresh van `energie/` werkt omdat de build daar een echte `index.html` schrijft.

## Eerste versie: één lesuur na de toets

De leerling ziet één opdracht of één vraag tegelijk, geen keuzedashboard. De eerste les behandelt de begrippen op **boekpagina's 73–79**. De voortgangsbalk meet afgeronde stappen van deze les, niet het hele thema of beheersing.

Bron: `docs/lesson material/Jaar 4/WACOF4DS2AL_T2_Handleiding.pdf`, specifiek PDF p. 5–12 en 17–18 (boek p. 73–80 en 85–86). Deze eerste versie is geen verwerking van het hele document. De gebruikte uitleg en opdrachten zijn ook op bronafbeeldingen gecontroleerd (PDF p. 5–12, 17–18).

**Let op:** groene vlakken in de marge van de handleiding zijn soms leerkrachtnotities, geen kaders in het leerlingenboek. Het leerpad verwijst naar het groene leerlingkader **“Energie” op boek p. 76**; andere passages worden via titel of figuur aangewezen. De wetenschappelijk problematische uitweiding in het “Weetje” op p. 79 wordt niet als opdracht of feedback overgenomen. Bij de thermos benoemen we de geïdealiseerde benadering expliciet.

De eerste drie digitale vragen zijn diagnostisch: na het eerste antwoord volgt feedback en mag de leerling verder. Latere controles vragen een juist antwoord, of na twee foute pogingen een expliciete bevestiging dat de vraag met de leerkracht besproken is. Dit laatste is zelfrapportage, geen beveiligde leerkrachtgoedkeuring. Juiste antwoorden gaan op slot; eerste pogingen blijven bewaard. De afronding rapporteert de eerste pogingen op de opfrissing en eindcheck, niet een opgepoetste herkansingsscore.

## Oefeningendekking en vervolg

| Boekonderdeel | Eerste versie | Vervolg |
| --- | --- | --- |
| Oefening 1, p. 85 | Alle drie systemen; leerling vinkt elk systeem af | Nakijken door leerkracht |
| Oefening 2, p. 85 | a, b en c | Nakijken door leerkracht |
| Oefening 4, p. 86 | Tabel met drie titels en alle acht systemen | Nakijken door leerkracht |
| Voorbeeldvragen a–d en juist/fout a–e, p. 80 | Niet als boekopdracht ingepland | Inplannen bij herhaling van §1.1 |
| Oefening 3, p. 86 | Nog niet: vraagt ook formules | Na de drie energieformules |
| Oefeningen 5–8, p. 86–87 | Nog niet | Formules, omvormen en verbanden |
| Oefeningen 9–10, p. 87 | Nog niet | Toepassing na energieformules |
| Onderzoek / STEM-actie, p. 77 | Geen zelfstandige uitvoering met vlammen | Alleen onder begeleiding, apart plannen |
| Hoofdstukken 2 en 3 | Nog niet uitgewerkt | Eerst bronpagina's en alle (deel)opgaven controleren en inplannen |

Er wordt **niet** beweerd dat hiermee alle oefeningen van T2 gemaakt zijn. Het eindscherm noemt de nog ontbrekende hoofdstuk-1-oefeningen expliciet. Doel voor latere uitbreiding: elke (deel)oefening een concrete plaats geven en deze tabel uitbreiden.

## Bestanden

- `src/energie/lesson.js`: onafhankelijke lesdata met stabiele stap-id's, boekverwijzingen, feedback en boekopdrachten.
- `src/energie/EnergyPath.vue`: lichte fullscreen-werkbladshell, native radio's, boekwerkbevestiging, pauzeren, teruggaan en hervatten. Dit is een zelfstandige pagina, geen modal die vanuit ABC opent.
- `src/energie/progress.js`: geteste voortgangslogica, versiecontrole en defensief herstellen.
- `src/energie/main.js` en `energie/index.html`: eigen ingang; deelt alleen huisstijl en Vue met de planner.
- `scripts/energie.test.mjs`: inhoudsstructuur, vraaglogica, eerste poging, hulproute, hervatten en opslagfouten.
- `scripts/energie.browser.mjs`: optionele echte Chrome-test van de volledige route, mobiel, hulproute, refresh, reset, Escape, opslagweigering en de nog bereikbare planner; screenshots in een tijdelijke map.
- `scripts/smoke-check.mjs`: controleert beide productie-ingangen en de energie-assets.

## Opslag en privacy

Afgeronde stappen en ingediende digitale antwoorden worden bewaard. Losse vinkjes binnen een nog niet afgeronde boekopdracht worden bij pauzeren of herladen niet bewaard.

Alleen lokale browseropslag (`willebroek:energie:t2-energie-start-v1`), geen namen, accounts, analytics of online resultatenopslag. De huisstijl laadt, net als de planner, IBM Plex via Google Fonts. Geen synchronisatie tussen apparaten. Bij geblokkeerde opslag blijft het leerpad in het open tabblad werken met een zichtbare waarschuwing. “Opnieuw beginnen” vraagt bevestiging en wist alleen deze lesvoortgang, geen plannergegevens.

Boekwerk wordt als **door de leerling bevestigd** behandeld, niet automatisch nagekeken. Hulpbevestigingen en digitale eerste pogingen zijn geen formele toetsresultaten.

Bij inhoudelijke wijzigingen die opgeslagen antwoorden ongeldig maken: verhoog `lesson.id`. Nieuwe schermen blijven buiten de ABC-registry; dit is bewust een andere didactische route, uitsluitend voor fysica.

## Controleren

```sh
npm run check
npm run build
npm run smoke
git diff --check
# Optioneel, Node 22+ en Chrome (Windows-default of CHROME_PATH):
node scripts/energie.browser.mjs
```

Handmatig/browser: direct openen en refreshen op `energie/`; start → fout/juist antwoord → boekwerk → eindcheck; teruggaan zonder dubbele voortgang; pauzeren/hervatten na refresh; opnieuw beginnen met annuleren; hulproute na twee foute pogingen; toetsenbordbediening; mobiel en projectorscherm; opslagweigering. Escape pauzeert de route zonder voortgang te wissen.
