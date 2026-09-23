/**
 * LEERLINGENLIJSTEN - Willebroek
 *
 * ── AFSPRAKEN ───────────────────────────────────────────────────────────────
 * • Enkel VOORNAMEN. Geen achternamen, geen initialen met achternaam.
 * • De naamkiezer vraagt een wachtwoord voor er iets zichtbaar wordt
 *   (zie `namePickerCode` in src/data/subjects.js).
 * • Deze lijst wordt meegebouwd in de publieke bundel. Zet hier dus niets in
 *   wat niet op een publieke webpagina mag staan.
 *
 * ── KLASSEN KOPPELEN ────────────────────────────────────────────────────────
 * `classesBySubjectYear` bepaalt welke klassen op het klasscherm staan.
 * De sleutel moet exact overeenkomen met een sleutel in `studentLists`.
 * Een klas zonder namen werkt ook - de naamkiezer valt dan terug op de
 * volledige lijst van dat vak.
 */

export const studentLists = {
    '3NWa': [
        'Barvin', 'Gloria', 'Linde', 'Xander', 'Amal', 'Rayan',
        'Latifa', 'Mathias', 'Margo', 'Hamza', 'Phebe', 'Gilles',
        'Max', 'Fran', 'Maxim', 'Anne-Charlotte', 'Rodrick', 'Emma',
        'Linde', 'Leen', 'Hannelore'
    ],
    '3NWb': [
        'Younes', 'Mouad', 'Mohammed', 'Mohammed', 'Pieter-Jan', 'Lily', 'Senne',
        'Edouarda', 'Vic', 'Ruben', 'Daan', 'Daan', 'Julie', 'Said', 'Favour',
        'Aurora', 'Burak', 'Romee-Reese', 'Owen'
    ],
    '3HW': [
        'Firdaws',
        'Sofie',
        'Natali',
        'Elise',
        'Ilana',
        'Noa',
        'Esma',
        'Lise',
        'Merve',
        'Julie',
        'Amla',
        'Amy',
        'Esmée',
        'Zoë'
    ]
}

/**
 * Welke klassen verschijnen per vak.
 * Pas dit aan per school - dit is het enige bestand dat je daarvoor hoeft te wijzigen.
 */
export const classesBySubject = {
    physics: ['3NAWE+3SPOWE', '4NAWE+4SPOWE', '4ECWE+4LAT', '6ELTE+6IICT'],
    biology: ['5MOWE+5SPOWE', '6MOWE+6SPOWE']
}

/**
 * Welk leerjaar achter een klascode zit. Eén bron van waarheid: de modulelijst
 * en de routering lezen allebei deze tabel, zodat ze niet uit elkaar kunnen lopen.
 *
 * Let op: een klas hier vermelden betekent niet dat er al lessen voor bestaan.
 * De modulelijst toont een lege staat zolang een leerjaar geen lessen heeft.
 */
export const yearByClass = {
    '3NAWE+3SPOWE': 3,
    '4NAWE+4SPOWE': 4,
    '4ECWE+4LAT': 4,
    '6ELTE+6IICT': 6,
    '5MOWE+5SPOWE': 5,
    '6MOWE+6SPOWE': 6
}

/** Leerjaar voor een klascode, of null als de klas onbekend is. */
export function yearForClass(classId) {
    return yearByClass[classId] ?? null
}

/** Klassen die leerlingen voor een vak kunnen kiezen. */
export function classesForSubject(subjectId) {
    return classesBySubject[subjectId] || []
}

/** Toon de klascode zoals die op school gebruikt wordt. */
export function classLabel(classId) {
    if (!classId) return classId
    // Verenigde klassen tonen als één groep: '4NAWE+4SPOWE' → '4NAWE + 4SPOWE'.
    if (classId.includes('+')) return classId.split('+').join(' + ')
    if (classId === '6D-A') return '6D/A'
    return classId
}

// Oude leerjaarindeling blijft beschikbaar voor bestaande lesdata en helpers.
export const classesBySubjectYear = {
    physics: {
        1: ['1A', '1B'],
        2: ['2A', '2B'],
        3: ['3NWa', '3NWb', '3HW'],
        4: ['4NWa', '4NWb']
    },
    biology: {
        1: ['1A', '1B'],
        2: ['2A', '2B'],
        3: ['3NWa', '3NWb', '3HW'],
        4: ['4NWa', '4NWb']
    },
}

/** Klassen voor één vak + leerjaar. Leeg als er niets geconfigureerd is. */
export function classesFor(subjectId, year) {
    return classesBySubjectYear[subjectId]?.[year] || []
}

/**
 * Namen voor de naamkiezer.
 * Valt terug op alle namen van het vak zodat een nieuwe klas meteen werkt
 * zolang er nog geen lijst voor bestaat.
 */
export function namesForClass(classId, subjectId) {
    if (classId && studentLists[classId]) return studentLists[classId]

    // Fallback: alle namen van dit vak, ontdubbeld.
    const all = Object.values(classesBySubjectYear[subjectId] || {})
        .flat()
        .flatMap(id => studentLists[id] || [])

    return [...new Set(all)]
}
