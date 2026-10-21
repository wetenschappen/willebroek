/** Mendeliaanse modellen: één allel per locus per gameet, onafhankelijke loci.
 * Alle Punnett-vakken zijn even waarschijnlijk. Geen model voor gekoppelde genen.
 * A/B/o volgt de notatie uit WACO (fenotype O, genotype oo).
 */
export const MODELS = {
  mono: {
    label: 'Erwten · één kenmerk', loci: [['G', 'g']],
    legend: 'G = geel (dominant) · g = groen (recessief)',
    rule: 'Volledige dominantie: GG en Gg zijn geel; alleen gg is groen.',
    phenotype: g => g.includes('G') ? 'Geel' : 'Groen'
  },
  di: {
    label: 'Erwten · twee kenmerken', loci: [['G', 'g'], ['R', 'r']],
    legend: 'G = geel · g = groen · R = rond · r = hoekig',
    rule: 'De genen liggen op verschillende chromosomenparen en erven onafhankelijk over. Per gen geldt volledige dominantie.',
    phenotype: g => `${g.includes('G') ? 'Geel' : 'Groen'} · ${g.includes('R') ? 'rond' : 'hoekig'}`
  },
  intermediate: {
    label: 'Bloemen · intermediair', loci: [['R', 'W']],
    legend: 'R = allel voor rood · W = allel voor wit · RW = roze',
    rule: 'De heterozygoot heeft een intermediair fenotype. De allelen zelf vermengen niet: een RW-gameet bestaat niet.',
    phenotype: g => g === 'RR' ? 'Rood' : g === 'WW' ? 'Wit' : 'Roze'
  },
  codominant: {
    label: 'Bloemen · codominant', loci: [['R', 'W']],
    legend: 'R = allel voor rood · W = allel voor wit · RW = rood én wit',
    rule: 'Beide allelen komen naast elkaar tot uiting: RW is rood én wit, niet roze.',
    phenotype: g => g === 'RR' ? 'Rood' : g === 'WW' ? 'Wit' : 'Rood én wit'
  },
  abo: {
    label: 'Bloedgroepen · A, B en o', loci: [['A', 'B', 'o']],
    legend: 'A en B zijn codominant · o is recessief · bloedgroep O = oo',
    rule: 'Er bestaan drie allelen in de populatie, maar elk individu bezit er twee en elke gameet één.',
    phenotype: g => `Bloedgroep ${g.includes('A') && g.includes('B') ? 'AB' : g.includes('A') ? 'A' : g.includes('B') ? 'B' : 'O'}`
  },
  lethal: {
    label: 'Klimop · lethaal allel', loci: [['G', 'W']],
    legend: 'GG = groen · GW = geel · WW = wit, niet levensvatbaar',
    rule: 'Eerst alle zygoten tellen. WW sterft af door gebrek aan bladgroen; verhoudingen onder overlevenden hebben een andere noemer.',
    phenotype: g => g === 'GG' ? 'Groen' : g === 'WW' ? 'Wit · niet levensvatbaar' : 'Geel',
    viable: g => g !== 'WW'
  }
}

const product = lists => lists.reduce((acc, list) => acc.flatMap(prefix => list.map(item => prefix + item)), [''])

export function genotypeOptions(modelId) {
  return product(MODELS[modelId].loci.map(alleles => alleles.flatMap((a, i) => alleles.slice(i).map(b => a + b))))
}

export function normalizeGenotype(value, modelId) {
  const model = MODELS[modelId]
  const text = String(value).replace(/\s/g, '')
  if (text.length !== model.loci.length * 2) return null
  const pairs = model.loci.map((alleles, i) => {
    const pair = [...text.slice(i * 2, i * 2 + 2)]
    if (pair.some(a => !alleles.includes(a))) return null
    return pair.sort((a, b) => alleles.indexOf(a) - alleles.indexOf(b)).join('')
  })
  return pairs.includes(null) ? null : pairs.join('')
}

export function gametes(genotype, modelId) {
  const canonical = normalizeGenotype(genotype, modelId)
  if (!canonical) throw new Error(`Ongeldig genotype: ${genotype} (${modelId})`)
  return product(MODELS[modelId].loci.map((_, i) => [...new Set(canonical.slice(i * 2, i * 2 + 2))]))
}

export function combineGametes(a, b, modelId) {
  return normalizeGenotype([...a].map((allele, i) => allele + b[i]).join(''), modelId)
}

export function cross(modelId, parentA, parentB) {
  const rows = gametes(parentA, modelId)
  const columns = gametes(parentB, modelId)
  const cells = rows.flatMap((a, r) => columns.map((b, c) => {
    const genotype = combineGametes(a, b, modelId)
    return { id: `${r}-${c}`, row: r, column: c, a, b, genotype,
      phenotype: MODELS[modelId].phenotype(genotype), viable: MODELS[modelId].viable?.(genotype) ?? true }
  }))
  return { rows, columns, cells }
}

export function distribution(cells, key = 'phenotype') {
  const counts = new Map()
  for (const cell of cells) counts.set(cell[key], (counts.get(cell[key]) || 0) + 1)
  return [...counts].map(([label, count]) => ({ label, count, total: cells.length, probability: count / cells.length }))
}

export function drawOffspring(cells, count, random = Math.random) {
  return Array.from({ length: count }, () => cells[Math.floor(random() * cells.length)])
}

export const percent = probability => `${new Intl.NumberFormat('nl-BE', { maximumFractionDigits: 2 }).format(probability * 100)}%`
