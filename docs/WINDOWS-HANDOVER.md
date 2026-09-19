# Windows — verder werken aan het Willebroek-project

> Voor de pi-agent op de Windows-machine. Alles wat je nodig hebt om dit
> project op te zetten en daarna te blijven gebruiken.

---

## Context

Er wordt gewerkt aan het **Willebroek-leerpad**: een Vue 3 + Vite lesplanner
voor fysica en biologie. De repo staat op GitHub en de site is live:

- **Repo:** https://github.com/wetenschappen/willebroek (public)
- **Site:** https://wetenschappen.github.io/willebroek/
- **Stack:** Vue 3 · Vue Router · Vite 7 · Tailwind CSS v4 · KaTeX · Phosphor Icons

De bedoeling is dat je dit project hier opzet en daarna op dezelfde manier kunt
blijven werken als op de Linux-machine: code aanpassen, `git-save "bericht"`,
en de site staat ± 2 minuten later online.

**pi is al geconfigureerd op deze machine — daar hoeft niets aan te gebeuren.**
Het gaat alleen om het project en het `git-save`-commando.

---

## Vereisten

| Nodig | Waarom | Check |
|---|---|---|
| **Git for Windows** | pi gebruikt Git Bash; levert ook `git` en `ssh` | `git --version` |
| **Node.js 20.19+ of 22.12+** | Vite 7 weigert oudere versies | `node --version` |
| **SSH-sleutel bij GitHub** | om te kunnen pushen | `ssh -T git@github.com` |

Als Node ontbreekt: installeer via https://nodejs.org (LTS is prima).
Node 20.19 of hoger is verplicht — met een oudere versie faalt `npm run build`.

---

## Stap 1 — SSH-check

```bash
ssh -T git@github.com
```

Verwacht: `Hi wetenschappen! You've successfully authenticated...`

Krijg je `Permission denied (publickey)`, dan is er nog geen SSH-sleutel op deze
machine. Maak er een aan en voeg de publieke sleutel toe aan GitHub:

```bash
ssh-keygen -t ed25519 -C "wetenschappen@users.noreply.github.com"
cat ~/.ssh/id_ed25519.pub
```

Dat laatste commando print de sleutel — zet die op
https://github.com/settings/keys (New SSH key).

---

## Stap 2 — Project klonen

```bash
cd ~
git clone git@github.com:wetenschappen/willebroek.git
cd willebroek
npm install
```

`npm install` duurt 1–2 minuten en haalt ~300 MB aan dependencies op.

> **Wat NIET meekomt via git** (met opzet):
> - `node_modules/` — wordt opnieuw opgebouwd door `npm install`
> - `dist/` — bouwsel voor GitHub Pages; nooit committen
> - `materiaal/` — uitgeversmateriaal en correctiesleutels van het handboek.
>   Staat **niet** in de repo, want dat is auteursrechtelijk materiaal en het
>   hoort niet publiek te staan. Vraag de gebruiker om deze map over te zetten
>   als je die nodig hebt.

---

## Stap 3 — Controleren dat het werkt

```bash
npm run dev
```

Open de URL die verschijnt (meestal http://localhost:5173/willebroek/).
Je zou het vakkenkeuzescherm moeten zien met **Fysica** en **Biologie**.

Stop de dev-server met `Ctrl+C`.

Een productiebuild testen:

```bash
npm run build
```

Verwacht: `✓ built in ~55s`. Er verschijnen een paar waarschuwingen over
`eval` in `LogicActivity.vue` — die zijn oud en onschadelijk, de build slaagt.

> **Geheugen:** de build heeft ruim 1 GB nodig. Op een machine met weinig RAM
> en zonder swap kan hij omvallen. Dan:
> ```bash
> NODE_OPTIONS="--max-old-space-size=1792" npm run build
> ```

---

## Stap 4 — `git-save` installeren

Dit is het script dat alles commit en meteen pusht — hetzelfde commando als op
de Linux-machine. Het staat in de repo (`scripts/git-save`), dus je hoeft het
niet over te typen.

```bash
bash scripts/install-git-save.sh
```

Het script kiest automatisch de juiste map (`~/bin` op Git Bash,
`~/.local/bin` op Linux/macOS) en zegt wat je moet doen als die map nog niet
op je PATH staat. Volg in dat geval de instructie: één regel toevoegen aan
`~/.bashrc`, dan `source ~/.bashrc`.

Testen:

```bash
git-save --help 2>/dev/null || echo "commando bestaat"
```

(Zonder argumenten vraagt `git-save` om een commit-bericht — dan zit je goed.)

---

## Stap 5 — Dagelijks gebruik

```bash
cd ~/willebroek
git-save "les 3 elektriciteit afgewerkt"
```

Wat er dan gebeurt:

1. alle wijzigingen worden gecommit
2. er wordt gepusht naar GitHub
3. de GitHub Action bouwt en publiceert de site (± 2 min)

De link naar de actieve build wordt onderaan het commando geprint. De site zelf
blijft op dezelfde plek:

**https://wetenschappen.github.io/willebroek/**

---

## Hoe het project in elkaar zit

```
src/
├── data/
│   ├── subjects.js     ← ★ welke vakken staan AAN + thema per vak
│   ├── modules.js      ← alle lessen (id, subject, jaar, titel, icoon)
│   └── students.js     ← voornamen per klas + klassen per vak/jaar
├── views/
│   ├── SubjectSelection.vue   ← vakkenkeuze
│   ├── YearSelection.vue      ← leerjaar (enkel jaren met lessen)
│   ├── ClassSelection.vue     ← klas
│   ├── ModuleSelection.vue    ← lessenlijst per module
│   └── LessonView.vue         ← laadt de les dynamisch
├── lessons/            ← één .js-bestand per les
├── components/
│   ├── activities/     ← generieke fysica-/biologieactiviteiten
│   ├── presentation/   ← slide-layouts
│   └── modals/         ← presentatie, werkboek, tickets
└── composables/        ← logica (progress, activity system, math engine)
```

### Vakken aan/uitzetten

In `src/data/subjects.js` bepaalt `subjectState` wat zichtbaar is:

```javascript
export const subjectState = {
  physics: true,
  biology: true
}
```

Deze repo bevat uitsluitend fysica en biologie. Andere vakken horen in een
aparte repo en worden hier niet opnieuw toegevoegd.

### Een les toevoegen

```bash
cp src/lessons/_template.js src/lessons/fys3-m01-l03-weerstand.js
# of
cp src/lessons/_template.js src/lessons/bio3-m01-l03-celademhaling.js
```

Vul het bestand in en registreer het in `src/data/modules.js` met het juiste
`subject` (`physics` of `biology`).
Het `subject` moet op beide plekken exact hetzelfde zijn, anders klopt het
thema (kleur, icoon, watermerk) niet.

Volledige documentatie staat in **`AGENTS.md`** — dat bestand is de
referentie voor alles rond lessen, slides, activiteiten en tickets.
Lees dat door voor je iets aanpast.

---

## Belangrijk om te weten

**`/les/:id` heeft geen vak in de URL.** De les-id is uniek over alle vakken,
dus `/les/fys3-m01-l02-stroomkringen` werkt zonder `fysica` ervoor. De les
bepaalt zelf zijn vak via `modules.js`.

**GitHub Pages gebruikt hash-routing.** Een link ziet er zo uit:

```
https://wetenschappen.github.io/willebroek/#/fysica
```

Een pad zonder `#` (`/willebroek/fysica`) bestaat niet als bestand en geeft een
404. Dat wordt opgevangen door `public/404.html`, dat het pad omzet naar de
hash-variant. Let op: de hash moet `#/` zijn en **niet** `#!/` — Vue Router
stript de oude hashbang niet en dan matcht geen enkele route.

**Nooit `dist/` of `node_modules/` committen.** Ze staan in `.gitignore`, dus
dat gaat vanzelf goed zolang je `git-save` gebruikt.

---

## Als er iets misgaat

**Site toont een blanco pagina of assets geven 404**
→ `base` in `vite.config.js` moet gelijk zijn aan de repo-naam: `'/willebroek/'`.
Case-sensitive.

**`git-save: command not found`**
→ `bash scripts/install-git-save.sh` opnieuw, of het PATH-advies volgen dat
het script geeft. Gebruik eventueel het volledige pad.

**`error: src refspec main does not match any`**
→ Er is nog geen commit. Doe eerst `git add -A && git commit -m "init"`.
`git-save` zelf vangt dit nu op.

**`error: failed to push`**
→ Er staan wijzigingen op GitHub die je lokaal niet hebt:
`git pull --rebase` en dan opnieuw `git-save`.

**Build valt om met een memory error**
→ Zie de opmerking bij Stap 3 (`NODE_OPTIONS=--max-old-space-size=1792`).

**Een les verschijnt niet in de lijst**
→ Staat het bestand in `src/lessons/` én is het geregistreerd in
`src/data/modules.js`? De `id` moet exact overeenkomen met de bestandsnaam
zonder `.js`.

---

## Eerste opdracht

Zet het project op volgens stap 1–4 en controleer dat de site lokaal draait.
Meld daarna wat je gedaan hebt en wat er eventueel niet lukte — dan weet de
gebruiker of het gelukt is voor hij verder werkt.
