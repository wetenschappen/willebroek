# Willebroek design system

> Praktische ontwerpafspraken voor het leerplatform fysica en biologie.
>
> Dit document is leidend voor nieuwe schermen en componenten. Het doel is niet
> een opvallende interface, maar een rustig, doelbewust werkblad dat leerlingen
> zelfstandig van een beamer kunnen lezen.

## 1. Ontwerpdoel

Willebroek moet in een klaslokaal op beamerafstand leesbaar zijn zonder dat de
leerkracht de interface moet uitleggen. Ontwerp daarom voor de leerling die op
de achterste rij zit:

- informatie moet onmiddellijk herkenbaar zijn;
- tekst moet donker en groot genoeg zijn;
- belangrijke structuur moet zichtbaar blijven zonder hover;
- de interface moet rustig blijven, zonder decoratieve ruis;
- elke tekst moet iets functioneels zeggen.

De kern is: **helderheid boven sfeer, structuur boven effect, inhoud boven decoratie**.

## 2. Projectorregel: geen zwakke signalen

Fletse grijze tekst, dunne grijze lijnen en informatie die alleen via hover
zichtbaar wordt, zijn verboden in de lesinterface.

Gebruik niet:

- lichtgrijze tekst voor instructies, metadata of beschrijvingen;
- hairline borders als enige scheiding tussen belangrijke onderdelen;
- lage opacity om een actieve of leesbare tekst te maken;
- kleurverschillen die alleen zichtbaar zijn bij hover;
- een status die uitsluitend door kleur wordt meegedeeld.

Gebruik wel:

- donkere tekst op een lichte achtergrond;
- minimaal 2px lijnen voor belangrijke scheidingen;
- een vaste, brede kleurankerbalk voor activiteitstypes;
- tekstlabels naast kleur;
- een sterke focus- en hoverstaat zonder layoutverschuiving.

`--color-ink` is de standaard voor gewone leesbare tekst. `--color-ink-soft`
mag alleen voor ondersteunende tekst worden gebruikt wanneer die nog duidelijk
leesbaar blijft. `--color-ink-muted` mag niet gebruikt worden voor informatie
die leerlingen nodig hebben om een opdracht uit te voeren.

## 3. Activiteitstaal: kleur hoort bij het soort activiteit

Kleur verwijst nooit naar het schoolvak. Fysica en biologie blijven visueel
neutraal; hun onderscheid komt via de functionele iconen `PhPlanet` en
`PhMicroscope` en via tekst.

| Kleur | Betekenis | Zichtbaar label | Voorbeelden |
| --- | --- | --- | --- |
| Blauw | digitaal | `DIGITAAL` | entry ticket, exit ticket, quiz, digitale oefening |
| Rood | presentatie | `PRESENTATIE` | theorie, klassikale uitleg, demonstratie |
| Groen | fysiek werk | `BOEK / BUNDEL` | boek, bundel of werkblad |

Een activiteitstype krijgt altijd:

1. een vaste, zichtbare kleurankerbalk;
2. een tekstlabel dat de kleur betekenis geeft;
3. voldoende contrast voor titel, beschrijving en actie;
4. geen extra vierde kleur voor een technische status zoals `check`.

Kleur is nooit de enige informatiedrager. Combineer kleur met label, tekst,
positie en waar nuttig een functioneel icoon.

## 4. Typografie

De vaste lettertypes zijn:

- `IBM Plex Sans` voor interface- en leestekst;
- `IBM Plex Mono` voor korte metadata, tijden en technische labels.

Gebruik een beperkt type-raster. Verklein tekst niet om meer inhoud in een
scherm te proppen. Een projector heeft liever minder tekst die goed leesbaar is
dan meer tekst die leerlingen niet kunnen ontcijferen.

Titels, instructies en beschrijvingen zijn donker. Metadata is nooit zo klein of
licht dat het op afstand verdwijnt. Gebruik korte labels in hoofdletters alleen
waar ze scanbaarheid verbeteren.

## 5. Lay-out en componenten

- Gebruik het bestaande 8px-ritme voor ruimte, padding en gaps.
- Houd inhoud op een vaste, leesbare kolombreedte.
- Gebruik lijsten en werkbladen boven generieke dashboardkaarten.
- Gebruik één rustige panelstijl; geen verzameling losse visuele kaarten.
- Houd randen, padding, uitlijning en radius consistent.
- Laat hover nooit de layout verschuiven.
- Gebruik sterke vaste linkerbalken voor lijstitems en tijdlijnactiviteiten.
- Laat actieve toestand zien met structuur en tekst, niet met glow of pulseren.

## 6. ABC-tijdlijn

De ABC-structuur is al betekenisvol. Herhaal die betekenis niet onnodig.

De letter in de tijdlijnmarker en de titel naast de marker zijn voldoende:

- `A  Instap`
- `B  Verwerken`
- `C  Afsluiting`

Schrijf dus niet nog eens `Fase A`, `Fase B` of `Fase C` naast de letter. De
letter is de fase-indicator; de titel geeft de activiteit aan. Gebruik ruimte en
tekst alleen voor informatie die de leerling nodig heeft, zoals tijdsduur,
instructie, activiteitstype en actie.

## 7. Copy: zo weinig mogelijk, zo specifiek mogelijk

Elke tekst moet een taak verduidelijken. Schrap:

- dubbele labels;
- uitleg die al uit de context blijkt;
- generieke slogans;
- decoratieve microcopy;
- meerdere knoppen met dezelfde betekenis.

Geef de actie kort en concreet: `Start digitaal`, `Open presentatie` of `Open
boek / bundel`. Herhaal niet tegelijk hetzelfde type in meerdere omschrijvingen
als één label volstaat.

## 8. Verboden vibe-code-signalen

Nieuwe code mag deze patronen niet introduceren:

- emoji's als interface-element;
- decoratieve sparkles of generieke dashboardversiering;
- paarse gradients, glow, blur of neon zonder functionele reden;
- grote decoratieve iconen naast kleine tekst;
- agressieve hover-, bounce- of pulse-animaties;
- kaarten die bij hover verspringen;
- willekeurige kleuren per vak of per scherm;
- informatie die alleen zichtbaar is door kleur of hover;
- verschillende willekeurige border-radii of spacingwaarden;
- generieke of lege marketingtaal.

Phosphor-iconen zijn functioneel: ze verduidelijken een actie, status of vak.
Gebruik ze niet als decoratieve opvulling.

## 9. Nieuwe schermen controleren

Voor elke nieuwe component:

- Kan een leerling op de achterste rij de hoofdtekst lezen?
- Is alle belangrijke tekst donker genoeg?
- Zijn belangrijke scheidingen en kleurankers zichtbaar zonder hover?
- Is kleur gecombineerd met een tekstlabel of andere betekenis?
- Staat er geen dubbele tekst die de interface langer maakt?
- Is het schoolvak neutraal en is kleur gereserveerd voor activiteitstype?
- Verschuift de layout niet bij hover of focus?
- Zijn mobiel en beamerbreedte bruikbaar?
- Zijn `npm run check`, `npm run build`, `npm run smoke` en `git diff --check` geslaagd?
