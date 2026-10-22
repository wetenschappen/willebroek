export const math = (s, ...args) => `\\( ${String.raw(s, ...args)} \\)`
export const list = (...items) => `<ul class="slide-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`
const questionNotation = text => text.includes('\\(') ? text : text.replace(/F_A|F_G|V_vl|V_ond|V_vw|ρ_vl|ρ_vw/g, token => {
  const [letter, sub] = token.split('_')
  return math`${letter === 'ρ' ? '\\rho' : letter}_{\mathrm{${sub}}}`
})
export const mc = (id, question, options, correct) => ({ id, type: 'mc', question: questionNotation(question), options: options.map(questionNotation), correct })

export function archimedesLesson({ id, title, description, phase, goals, exercises, slidesA, slidesB, slidesC, entry, exit }) {
  const investigate = phase === 'investigate'
  return {
    id, subject: 'physics', className: '4NAWE + 4SPOWE', title, description,
    config: { title, description, classId: '4NAWE+4SPOWE', textbook: 'WACO 4 Fysica 2u · Thema 1: Druk · Hoofdstuk 4: Archimedeskracht · p. 49–64', groenCode: investigate ? 'F4T1H4A' : 'F4T1H4B', groenAntwoord: 'fysica', masterCode: 'wetenschappen' },
    curriculum: ['WD2_11.01.03.01', 'WD2_11.01.03.03', 'BV2_06.43.02'], goals,
    workbook: { title: 'WACO 4: Archimedeskracht', subtitle: investigate ? 'Uur 1 · begripscontrole en eerste toepassing · p. 60–64' : 'Uur 2 · volledig overzicht oefeningen 1–18 · p. 60–64', exercises },
    timeline: {
      stepA: { step: 'A', title: 'Instap', time: '15 min', cards: [
        { id: 'card-entry', type: 'digital', title: investigate ? 'Wat was nog onduidelijk?' : 'Wat bleef hangen?', description: investigate ? 'Controleer druk, volume en de betekenis van de gebruikte symbolen.' : 'Haal verplaatst volume, diepte en de krachtenbalans terug uit het onderzoek.', action: 'entry-ticket', icon: 'PhQuestion' },
        { id: 'card-pres-a', type: 'class', title: investigate ? math`V_{\mathrm{vl}}` + ' of ' + math`V_{\mathrm{ond}}` + ': wie heeft gelijk?' : 'Van stijgen naar drijven en zweven', description: investigate ? 'Dezelfde ruimte krijgt twee beschrijvingen. Vergelijk gedeeltelijke en volledige onderdompeling.' : 'Drijvend evenwicht en de uitbreiding van Archimedes naar gassen.', action: 'presentation', slidesKey: 'slidesA' }
      ] },
      stepB: { step: 'B', title: 'Verwerken', time: '30 min', cards: [
        { id: 'card-activity', type: 'digital', title: investigate ? 'Afleidingbouwer en Physics Lab' : 'Krachtenbalansen: drijven en gassen', description: investigate ? 'Bouw de afleiding op. Voorspel, meet en verklaar bij vijf parameteronderzoeken.' : 'Vergelijk de twee krachten en verklaar zinken, zweven, stijgen, drijven en een ballon.', action: 'activity', activityId: 'activity', icon: 'PhFlask' },
        { id: 'card-pres-b', type: 'class', title: investigate ? 'Van drukverschil naar Archimedes' : 'Boekuitwerkingen: voorbeelden en opgaven 1–18', description: investigate ? 'Volg de WACO-afleiding op p. 51, verklaar de factoren en werk het bultrugvoorbeeld uit.' : 'Kies bovenaan een voorbeeld of opgave. Onthul Gegeven, Gevraagd, Oplossing en Antwoord stap voor stap.', action: 'presentation', slidesKey: 'slidesB' },
        { id: 'card-workbook', type: 'paper', title: investigate ? 'Eerste boektoepassingen' : 'Boekopgaven 1–18: volledige lijst', description: investigate ? 'Controleer je begrip met 1, 2, 3 en 10. Opgave 17 is een verbinding met hydrostatische druk.' : 'Werk in het boek. Wat je al hebt gemaakt, hoeft niet opnieuw. Gebruik de slides voor gerichte controle; spreek af hoe je resterende opgaven afwerkt.', action: 'workbook', icon: 'PhBookOpen', exercises }
      ] },
      stepC: { step: 'C', title: 'Afsluiting', time: '5 min', cards: [
        { id: 'card-pres-c', type: 'class', title: 'De kern vasthouden', description: investigate ? 'Volumenotatie, drukverschil en de drie factoren van de archimedeskracht.' : 'Kies de juiste krachtenbalans en controleer eenheden en antwoord.', action: 'presentation', slidesKey: 'slidesC' },
        { id: 'card-exit', type: 'digital', title: 'Exitticket Archimedes', description: 'Controleer individueel wat je kunt verklaren en toepassen.', action: 'exit-ticket', icon: 'PhTarget' }
      ] }
    },
    activities: { activity: { type: 'archimedesLab', title: investigate ? 'Archimedes: afleiding en Physics Lab' : 'Archimedes: drijven en gassen', phase, storageKey: '4NAWE-4SPOWE-t1-archimedes' } },
    slidesA, slidesB, slidesC, entryTicket: { questions: entry }, exitTicket: { questions: exit }
  }
}

export const volumeFigure = `<svg viewBox="0 0 1200 300" role="img" aria-label="Een blok half ondergedompeld, volledig ondergedompeld en dieper volledig ondergedompeld."><g stroke="var(--color-slide-ink)" stroke-width="3" fill="var(--color-slide-soft)"><path d="M30 95H350V255H30Z M430 95H750V255H430Z M830 95H1150V255H830Z"/></g><g fill="var(--color-slide-paper)" stroke="var(--color-slide-ink)" stroke-width="3"><rect x="140" y="45" width="100" height="100"/><rect x="540" y="110" width="100" height="100"/><rect x="940" y="145" width="100" height="100"/></g><g stroke="var(--color-slide-ink)" stroke-width="3"><path d="M30 95H350 M430 95H750 M830 95H1150"/></g><g fill="var(--color-slide-ink)" text-anchor="middle" font-size="30"><text x="190" y="30">Half</text><text x="590" y="30">Volledig</text><text x="990" y="30">Volledig, dieper</text><text x="190" y="290">V<tspan baseline-shift="sub" font-size="20">ond</tspan> = V<tspan baseline-shift="sub" font-size="20">vl</tspan> = 500 cm³</text><text x="590" y="290">1 000 cm³</text><text x="990" y="290">1 000 cm³</text></g></svg>`
export const pressureFigure = `<svg viewBox="0 0 1000 420" style="display:block;width:100%;max-height:440px;" role="img" aria-label="Kubus onder water met bovenvlak op h1, ondervlak op h2 en twee tegengestelde drukkrachten."><path d="M60 50H930 M60 50V395H930V50" fill="var(--color-slide-soft)" stroke="var(--color-slide-ink)" stroke-width="3"/><rect x="340" y="150" width="230" height="180" fill="var(--color-slide-paper)" stroke="var(--color-slide-ink)" stroke-width="4"/><g stroke="var(--color-slide-ink)" stroke-width="3" fill="none"><path d="M235 50V150 M220 50H250 M220 150H250 M660 50V330 M645 50H675 M645 330H675 M610 150V330 M595 150H625 M595 330H625"/><path d="M455 80V145m-12 -18l12 18l12 -18 M455 395V335m-12 18l12 -18l12 18" stroke-width="5"/></g><g font-size="36" fill="var(--color-slide-ink)"><text x="180" y="110">h₁</text><text x="680" y="205">h₂</text><text x="625" y="250">z</text><text x="480" y="115">F₁ ↓</text><text x="480" y="385">F₂ ↑</text><text x="430" y="250">V</text><text x="535" y="318">A</text><text x="730" y="110">h₂ − h₁ = z</text></g></svg>`
