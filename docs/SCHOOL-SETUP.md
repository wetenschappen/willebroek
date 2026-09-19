# Nieuwe school opzetten

Deze repo hoort bij **één school**. De mapnaam is meteen de URL:
`https://wetenschappen.github.io/<mapnaam>/`. Aan het einde van de opdracht
laat je de repo met rust — leerlingen kunnen de lessen blijven herbezoeken.

---

## 1. Repo aanmaken

Op github.com onder de organisatie `wetenschappen`:

- Naam: de school, kort en URL-vriendelijk — bv. `koha`, `willebroek`, `mechelen`
- **Public** (nodig voor gratis GitHub Pages)
- Geen README, geen .gitignore — die komen uit de kopie

Daarna lokaal:

```bash
cp -a willebroek <nieuweschool>
cd <nieuweschool>
rm -rf .git dist
git init -b main
git remote add origin git@github.com:wetenschappen/<nieuweschool>.git
```

---

## 2. Verplicht aanpassen — 4 bestanden

### `vite.config.js`
```javascript
base: '/<nieuweschool>/',
```
**Zonder dit werkt de site niet** — de assets worden dan vanaf het verkeerde pad
gezocht en je krijgt een blanco pagina.

### `src/data/subjects.js`
```javascript
export const school = {
  name: 'Schoolnaam',
  tagline: 'Kies je vak om aan de slag te gaan.',
  namePickerCode: 'kies-iets'
}

export const subjectState = {
  physics: true,
  biology: true
}
```

Deze schoolrepo bevat uitsluitend fysica en biologie. Andere vakken horen in een aparte repo.

### `src/data/students.js`
- `studentLists`: **enkel voornamen** per klas
- `classesBySubjectYear`: welke klassen per vak en leerjaar verschijnen

De sleutel in `classesBySubjectYear` moet exact overeenkomen met een sleutel in
`studentLists`. Een klas zonder namen werkt ook — de naamkiezer valt dan terug
op alle namen van dat vak.

### `index.html`
Titel, `description` en og-tags aanpassen aan de school.

---

## 3. Optioneel

| Bestand | Wat |
|---|---|
| `package.json` | `name` naar `<school>-leerpad` |
| `.github/workflows/deploy.yml` | `name:` naar de school |
| `src/data/modules.js` | lessen toevoegen voor de vakken die je geeft |
| `AGENTS.md` | titel en vakkenlijst bovenaan |

---

## 4. Eerste push

```bash
git add -A
git commit -m "init: <school> leerpad"
git push -u origin main
```

**GitHub Pages aanzetten:** Settings → Pages → Source = *GitHub Actions*.
De workflow in `.github/workflows/deploy.yml` bouwt en publiceert automatisch
bij elke push naar `main`. Na ± 1 minuut staat de site op
`https://wetenschappen.github.io/<nieuweschool>/`.

---

## 5. Lessen toevoegen

```bash
cp src/lessons/_template.js src/lessons/fys3-m01-l03-weerstand.js
```

Vul het bestand in en registreer het in `src/data/modules.js` met het juiste
`subject`. Zie `AGENTS.md` voor het volledige lessenformaat.

### Lessen overnemen van een andere school

Kopieer het lesbestand en zet het in de registry:

```bash
cp ../andere-school/src/lessons/fys3-m01-l02-stroomkringen.js src/lessons/
```

De les-id's zijn uniek over alle vakken, dus overnemen gaat zonder conflicten.
`localStorage`-voortgang van leerlingen zit op les-id, dus die blijft kloppen.

---

## 6. Einde opdracht — repo achterlaten

Er is **geen archiefstap nodig**. Stop gewoon met pushen. De site blijft staan
en de inhoud verandert niet meer.

Twee dingen om te weten:

- **Laatste push:** zet daarna GitHub Pages om naar branch-deploy
  (Settings → Pages → Source = *Deploy from a branch* → `gh-pages`) zodra je
  een laatste build hebt gedaan, of accepteer dat de Actions-workflow blijft
  draaien bij toekomstige pushes. Met branch-deploy kan een latere
  dependency-wijziging de site niet meer stukmaken.
- **Verwijder de repo niet** zolang leerlingen de link nog nodig hebben — met de
  repo verdwijnt ook de site.

### Namen en privacy

`studentLists` wordt meegebouwd in de publieke bundel. Iedereen die de
broncode bekijkt, ziet de voornamen — het wachtwoord op de naamkiezer houdt
leerlingen van de knop, maar beschermt de gegevens niet.

Overweeg daarom vóór de eerste push:

- enkel voornamen (staat al zo)
- geen schoolnaam in de repo-URL als dat gevoelig ligt — de app zelf mag de
  schoolnaam tonen
- bij twijfel: `students.js` leeghalen voor de push en de namen lokaal houden

Als er ooit een volledige naam in de git-historiek belandt, is verwijderen uit
de laatste commit niet genoeg: de historiek bevat het bestand nog. In dat geval
moet de historiek herschreven worden (`git filter-repo`) of moet de repo
opnieuw opgestart worden.
