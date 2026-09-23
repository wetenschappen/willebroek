<template>
  <div v-if="isOpen" class="modal-fullscreen" @keydown.escape="handleClose">
    <div class="w-full h-full flex flex-col overflow-hidden bg-paper">
      <!-- Kopbalk: blauw anker, digitale activiteit -->
      <header class="fullscreen-bar fullscreen-bar-digital">
        <div class="p-2 rounded-control shrink-0" style="background: var(--color-digital-soft); color: var(--color-digital);">
          <PhSun :size="26" weight="fill" />
        </div>
        <div class="min-w-0">
          <h2 class="fullscreen-title">Virtueel Optica & Lenzen Lab</h2>
          <p class="fullscreen-label">{{ currentModeLabel }}</p>
        </div>
        <span class="ml-2 shrink-0 badge badge-digital">Digitaal</span>
        
        <div class="font-mono text-base text-slate-900 flex items-center gap-3 px-3 py-1.5 rounded-control ml-auto mr-2 shrink-0" style="background: var(--color-panel-muted); border: 2px solid var(--color-line);">
          <span>{{ headerReadout }}</span>
        </div>

        <button @click="handleClose" class="btn-close shrink-0" aria-label="Sluiten">
          <PhX :size="22" weight="bold" />
        </button>
      </header>

      <!-- Modusnavigatie -->
      <nav class="relative flex-shrink-0 flex justify-center gap-2 px-4" style="background: var(--color-panel); border-bottom: 2px solid var(--color-line);">
        <button
          v-for="mode in modes"
          :key="mode.id"
          @click="activeMode = mode.id"
          class="px-5 py-3 font-semibold text-base transition-colors"
          :style="activeMode === mode.id
            ? { color: 'var(--color-digital)', borderBottom: '4px solid var(--color-digital)' }
            : { color: 'var(--color-ink-soft)', borderBottom: '4px solid transparent' }"
        >
          {{ mode.label }}
        </button>
      </nav>

      <!-- Hoofdinhoud -->
      <main class="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-0">
        <!-- Linkerpaneel: Grafische SVG Simulatie (7 cols) -->
        <div class="lg:col-span-7 flex flex-col items-center justify-center p-6 relative overflow-hidden" style="background: var(--color-panel);">
          
          <!-- Mode 1: Breking & Weerkaatsing (Optische Schijf) -->
          <div v-if="activeMode === 'breking'" class="w-full h-full flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 800 500" class="w-full h-full max-h-[460px]">
              <!-- Gradenboog cirkel -->
              <circle cx="400" cy="250" r="210" fill="none" stroke="var(--color-line)" stroke-width="1.5" stroke-dasharray="4,4" />
              
              <!-- Scheidingsvlak -->
              <rect x="190" y="250" width="420" height="210" :fill="medium2.color" fill-opacity="0.25" />
              <line x1="100" y1="250" x2="700" y2="250" stroke="var(--color-line-strong)" stroke-width="3" />
              
              <!-- De Normaal (stippellijn loodrecht op grensvlak) -->
              <line x1="400" y1="40" x2="400" y2="460" stroke="var(--color-ink)" stroke-width="2" stroke-dasharray="6,4" />
              <text x="410" y="60" font-size="16" font-weight="bold" fill="var(--color-ink-soft)">normaal n</text>

              <!-- Middenstof labels -->
              <text x="210" y="235" font-size="18" font-weight="bold" fill="var(--color-ink)">{{ medium1.name }} (n₁ = {{ medium1.n }})</text>
              <text x="210" y="280" font-size="18" font-weight="bold" fill="var(--color-ink)">{{ medium2.name }} (n₂ = {{ medium2.n }})</text>

              <!-- Invallende lichtstraal -->
              <line
                :x1="400 - 220 * Math.sin(angleIncRad)"
                :y1="250 - 220 * Math.cos(angleIncRad)"
                x2="400"
                y2="250"
                stroke="var(--color-presentation)"
                stroke-width="4"
              />
              <!-- Pijltje op invallende straal -->
              <circle :cx="400 - 110 * Math.sin(angleIncRad)" :cy="250 - 110 * Math.cos(angleIncRad)" r="5" fill="var(--color-presentation)" />

              <!-- Weerkaatste lichtstraal (altijd î = t̂) -->
              <line
                x1="400"
                y1="250"
                :x2="400 + 220 * Math.sin(angleIncRad)"
                :y2="250 - 220 * Math.cos(angleIncRad)"
                stroke="var(--color-workbook)"
                stroke-width="3.5"
              />

              <!-- Gebroken lichtstraal (indien geen totale reflectie) -->
              <g v-if="!isTotalReflection">
                <line
                  x1="400"
                  y1="250"
                  :x2="400 + 220 * Math.sin(angleRefRad)"
                  :y2="250 + 220 * Math.cos(angleRefRad)"
                  stroke="var(--color-digital)"
                  stroke-width="4"
                />
                <!-- Pijltje op gebroken straal -->
                <circle :cx="400 + 110 * Math.sin(angleRefRad)" :cy="250 + 110 * Math.cos(angleRefRad)" r="5" fill="var(--color-digital)" />
                <text :x="400 + 140 * Math.sin(angleRefRad) + 15" :y="250 + 140 * Math.cos(angleRefRad)" font-size="18" font-weight="bold" fill="var(--color-digital)">
                  r̂ = {{ Math.round(angleRefDeg) }}°
                </text>
              </g>

              <!-- Totale interne reflectie melding -->
              <g v-else>
                <rect x="250" y="320" width="300" height="48" rx="8" fill="var(--color-presentation-soft)" stroke="var(--color-presentation)" stroke-width="2" />
                <text x="400" y="350" text-anchor="middle" font-size="18" font-weight="bold" fill="var(--color-presentation)">
                  Totale interne reflectie! (î > î_g = {{ Math.round(criticalAngleDeg) }}°)
                </text>
              </g>

              <!-- Hoekbogen -->
              <text :x="400 - 80 * Math.sin(angleIncRad / 2) - 35" :y="250 - 80 * Math.cos(angleIncRad / 2)" font-size="18" font-weight="bold" fill="var(--color-presentation)">
                î = {{ angleIncDeg }}°
              </text>
              <text :x="400 + 80 * Math.sin(angleIncRad / 2) + 15" :y="250 - 80 * Math.cos(angleIncRad / 2)" font-size="18" font-weight="bold" fill="var(--color-workbook)">
                t̂ = {{ angleIncDeg }}°
              </text>
            </svg>
          </div>

          <!-- Mode 2: Bolle Lens (Beeldconstructie) -->
          <div v-else-if="activeMode === 'lens'" class="w-full h-full flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 800 500" class="w-full h-full max-h-[460px]">
              <!-- Hoofdas -->
              <line x1="20" y1="250" x2="780" y2="250" stroke="var(--color-line-strong)" stroke-width="2" />
              
              <!-- Bolle lens (verticaal met pijlen aan uiteinden) -->
              <line x1="400" y1="60" x2="400" y2="440" stroke="var(--color-digital)" stroke-width="4" />
              <polygon points="400,50 392,70 408,70" fill="var(--color-digital)" />
              <polygon points="400,450 392,430 408,430" fill="var(--color-digital)" />
              <text x="408" y="270" font-size="18" font-weight="bold" fill="var(--color-ink)">O</text>

              <!-- Brandpunten F en F' -->
              <circle :cx="400 - focalPx" cy="250" r="5" fill="var(--color-presentation)" />
              <text :cx="400 - focalPx" x="400 - focalPx - 8" y="275" font-size="18" font-weight="bold" fill="var(--color-presentation)">F</text>
              
              <circle :cx="400 + focalPx" cy="250" r="5" fill="var(--color-presentation)" />
              <text :cx="400 + focalPx" x="400 + focalPx - 8" y="275" font-size="18" font-weight="bold" fill="var(--color-presentation)">F'</text>

              <!-- 2F en 2F' punten -->
              <circle :cx="400 - 2 * focalPx" cy="250" r="4" fill="var(--color-ink-soft)" />
              <text :cx="400 - 2 * focalPx" x="400 - 2 * focalPx - 14" y="275" font-size="15" fill="var(--color-ink-soft)">2F</text>
              <circle :cx="400 + 2 * focalPx" cy="250" r="4" fill="var(--color-ink-soft)" />
              <text :cx="400 + 2 * focalPx" x="400 + 2 * focalPx - 14" y="275" font-size="15" fill="var(--color-ink-soft)">2F'</text>

              <!-- Voorwerp V (groene pijl) -->
              <line :x1="400 - vPx" y1="250" :x2="400 - vPx" :y2="250 - objHeightPx" stroke="var(--color-workbook)" stroke-width="5" />
              <polygon :points="`${400 - vPx},${250 - objHeightPx - 10} ${400 - vPx - 8},${250 - objHeightPx + 5} ${400 - vPx + 8},${250 - objHeightPx + 5}`" fill="var(--color-workbook)" />
              <text :x="400 - vPx - 25" :y="250 - objHeightPx / 2" font-size="18" font-weight="bold" fill="var(--color-workbook)">V</text>

              <!-- Straal 1: Evenwijdig aan hoofdas -> breekt door F' (blauw) -->
              <line :x1="400 - vPx" :y1="250 - objHeightPx" x2="400" :y2="250 - objHeightPx" stroke="#3b82f6" stroke-width="2" />
              <line x1="400" :y1="250 - objHeightPx" :x2="400 + bPx" :y2="250 + imgHeightPx" stroke="#3b82f6" stroke-width="2" />

              <!-- Straal 2: Door optisch middelpunt O ongebroken (rood) -->
              <line :x1="400 - vPx" :y1="250 - objHeightPx" :x2="400 + bPx" :y2="250 + imgHeightPx" stroke="#ef4444" stroke-width="2" />

              <!-- Beeld B (indien reëel, paarse pijl) -->
              <g v-if="vDistance > focalLength">
                <line :x1="400 + bPx" y1="250" :x2="400 + bPx" :y2="250 + imgHeightPx" stroke="#8b5cf6" stroke-width="5" />
                <polygon :points="`${400 + bPx},${250 + imgHeightPx + 10} ${400 + bPx - 8},${250 + imgHeightPx - 5} ${400 + bPx + 8},${250 + imgHeightPx - 5}`" fill="#8b5cf6" />
                <text :x="400 + bPx + 15" :y="250 + imgHeightPx / 2" font-size="18" font-weight="bold" fill="#8b5cf6">B</text>
              </g>

              <!-- Toelichting onderaan de constructie -->
              <text x="400" y="480" text-anchor="middle" font-size="18" font-weight="bold" fill="var(--color-ink)">
                Stand: {{ lensSituationText }} (N = {{ lensMagnification.toFixed(2) }})
              </text>
            </svg>
          </div>

          <!-- Mode 3: Vlakke Spiegel -->
          <div v-else class="w-full h-full flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 800 500" class="w-full h-full max-h-[460px]">
              <!-- Spiegeloppervlak (verticaal in het midden) -->
              <line x1="400" y1="60" x2="400" y2="440" stroke="var(--color-ink)" stroke-width="5" />
              <!-- Spiegel arceerstreepjes achteraan (rechts) -->
              <g v-for="i in 18" :key="'mirror-' + i">
                <line x1="400" :y1="70 + i * 20" x2="415" :y2="85 + i * 20" stroke="var(--color-line-strong)" stroke-width="2" />
              </g>

              <!-- Voorwerp V (links, reëel, groen) -->
              <line :x1="400 - mirrorDistPx" y1="360" :x2="400 - mirrorDistPx" :y2="360 - mirrorHeightPx" stroke="var(--color-workbook)" stroke-width="6" />
              <polygon :points="`${400 - mirrorDistPx},${360 - mirrorHeightPx - 10} ${400 - mirrorDistPx - 8},${360 - mirrorHeightPx + 5} ${400 - mirrorDistPx + 8},${360 - mirrorHeightPx + 5}`" fill="var(--color-workbook)" />
              <text :x="400 - mirrorDistPx - 30" :y="360 - mirrorHeightPx / 2" font-size="20" font-weight="bold" fill="var(--color-workbook)">V</text>

              <!-- Spiegelbeeld B (rechts, virtueel, stippellijn paars) -->
              <line :x1="400 + mirrorDistPx" y1="360" :x2="400 + mirrorDistPx" :y2="360 - mirrorHeightPx" stroke="#8b5cf6" stroke-width="5" stroke-dasharray="6,4" />
              <polygon :points="`${400 + mirrorDistPx},${360 - mirrorHeightPx - 10} ${400 + mirrorDistPx - 8},${360 - mirrorHeightPx + 5} ${400 + mirrorDistPx + 8},${360 - mirrorHeightPx + 5}`" fill="#8b5cf6" />
              <text :x="400 + mirrorDistPx + 20" :y="360 - mirrorHeightPx / 2" font-size="20" font-weight="bold" fill="#8b5cf6">B (virtueel)</text>

              <!-- Symmetrie afstandslijnen -->
              <line :x1="400 - mirrorDistPx" y1="380" x2="400" y2="380" stroke="var(--color-ink)" stroke-width="2" />
              <text :x="400 - mirrorDistPx / 2" y="405" text-anchor="middle" font-size="16" font-weight="bold" fill="var(--color-ink)">dv = {{ mirrorDist }} cm</text>

              <line x1="400" y1="380" :x2="400 + mirrorDistPx" y2="380" stroke="var(--color-ink)" stroke-width="2" stroke-dasharray="4,4" />
              <text :x="400 + mirrorDistPx / 2" y="405" text-anchor="middle" font-size="16" font-weight="bold" fill="var(--color-ink)">db = {{ mirrorDist }} cm</text>

              <text x="400" y="80" text-anchor="middle" font-size="22" font-weight="bold" fill="var(--color-ink)">
                Vlakke spiegel: db = dv en |B| = V
              </text>
              <text x="400" y="115" text-anchor="middle" font-size="18" font-weight="600" fill="var(--color-digital)">
                Kenmerken: virtueel, rechtopstaand, even groot, symmetrisch
              </text>
            </svg>
          </div>
        </div>

        <!-- Rechterpaneel: Bediening & Opgaven (5 cols) -->
        <div class="lg:col-span-5 flex flex-col p-6 overflow-y-auto" style="background: var(--color-paper); border-left: 2px solid var(--color-line);">
          
          <!-- Controls voor Breking -->
          <div v-if="activeMode === 'breking'" class="space-y-6">
            <h3 class="text-xl font-bold text-slate-900 border-b pb-2" style="border-color: var(--color-line);">
              Parameters lichtbreking
            </h3>

            <!-- Slider Invalshoek -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Invalshoek î:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ angleIncDeg }}°</span>
              </div>
              <input type="range" min="0" max="85" step="1" v-model.number="angleIncDeg" class="w-full cursor-pointer accent-red-600" />
            </div>

            <!-- Selectie Middenstof 1 en 2 -->
            <div>
              <label class="block font-bold text-slate-700 mb-2">Overgang tussen stoffen:</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="pair in mediumPairs"
                  :key="pair.name"
                  @click="applyMediumPair(pair)"
                  class="p-2.5 text-left text-sm rounded-control border transition-all"
                  :style="selectedPairName === pair.name
                    ? { background: 'var(--color-digital-soft)', borderColor: 'var(--color-digital)', fontWeight: 'bold' }
                    : { background: 'var(--color-panel)', borderColor: 'var(--color-line)' }"
                >
                  <div class="text-slate-800">{{ pair.name }}</div>
                  <div class="text-xs font-mono text-slate-500">n₁={{ pair.m1.n }} → n₂={{ pair.m2.n }}</div>
                </button>
              </div>
            </div>

            <!-- Wet van Snellius Info -->
            <div class="p-4 rounded-xl border mt-4" style="background: var(--color-panel-muted); border-color: var(--color-line);">
              <h4 class="font-bold text-slate-800 mb-2">Wet van Snellius & Breking:</h4>
              <p class="font-mono text-sm leading-relaxed text-slate-700">
                n₁ · sin(î) = n₂ · sin(r̂)<br>
                î = {{ angleIncDeg }}° | Terugkaatsingshoek: t̂ = {{ angleIncDeg }}°<br>
                <span v-if="!isTotalReflection">
                  Brekingshoek: <strong>r̂ = {{ Math.round(angleRefDeg) }}°</strong>
                  ({{ medium2.n > medium1.n ? 'naar normaal toe gebroken' : 'weg van normaal gebroken' }})
                </span>
                <span v-else class="text-presentation font-bold">
                  Totale interne reflectie! Grenshoek î_g = {{ Math.round(criticalAngleDeg) }}°
                </span>
              </p>
            </div>
          </div>

          <!-- Controls voor Lens -->
          <div v-else-if="activeMode === 'lens'" class="space-y-6">
            <h3 class="text-xl font-bold text-slate-900 border-b pb-2" style="border-color: var(--color-line);">
              Parameters bolle lens
            </h3>

            <!-- Slider Brandpuntsafstand f -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Brandpuntsafstand f:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ focalLength }} cm</span>
              </div>
              <input type="range" min="5" max="20" step="1" v-model.number="focalLength" class="w-full cursor-pointer accent-red-600" />
            </div>

            <!-- Slider Voorwerpsafstand v -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Voorwerpsafstand v:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ vDistance }} cm</span>
              </div>
              <input type="range" min="6" max="50" step="1" v-model.number="vDistance" class="w-full cursor-pointer accent-blue-600" />
            </div>

            <!-- Presets: De 5 standen -->
            <div>
              <label class="block font-bold text-slate-700 mb-2">Snelkeuze (De 5 standen):</label>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <button @click="vDistance = 35; focalLength = 10" class="p-2 border rounded text-left hover:bg-slate-100">
                  <strong>1. Camera (v > 2f)</strong><br>Verkleind reëel
                </button>
                <button @click="vDistance = 20; focalLength = 10" class="p-2 border rounded text-left hover:bg-slate-100">
                  <strong>2. Kopie (v = 2f)</strong><br>1:1 reëel
                </button>
                <button @click="vDistance = 15; focalLength = 10" class="p-2 border rounded text-left hover:bg-slate-100">
                  <strong>3. Beamer (f &lt; v &lt; 2f)</strong><br>Vergroot reëel
                </button>
                <button @click="vDistance = 8; focalLength = 12" class="p-2 border rounded text-left hover:bg-slate-100">
                  <strong>5. Loep (v &lt; f)</strong><br>Vergroot virtueel
                </button>
              </div>
            </div>

            <!-- Kwantitatieve gegevens -->
            <div class="p-4 rounded-xl border mt-4" style="background: var(--color-panel-muted); border-color: var(--color-line);">
              <h4 class="font-bold text-slate-800 mb-2">Lenzenformule & Vergroting:</h4>
              <p class="font-mono text-sm leading-relaxed text-slate-700">
                1/f = 1/v + 1/b<br>
                Beeldafstand: <strong>b = {{ bDistance > 0 ? bDistance.toFixed(1) + ' cm' : 'oneindig' }}</strong><br>
                Vergrotingsfactor: <strong>N = |B|/V = b/v = {{ lensMagnification.toFixed(2) }}</strong>
              </p>
            </div>
          </div>

          <!-- Controls voor Spiegel -->
          <div v-else class="space-y-6">
            <h3 class="text-xl font-bold text-slate-900 border-b pb-2" style="border-color: var(--color-line);">
              Parameters vlakke spiegel
            </h3>

            <!-- Slider Voorwerpsafstand -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Voorwerpsafstand dv:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ mirrorDist }} cm</span>
              </div>
              <input type="range" min="5" max="30" step="1" v-model.number="mirrorDist" class="w-full cursor-pointer accent-blue-600" />
            </div>

            <!-- Slider Voorwerpshoogte -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Voorwerpsgrootte V:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ mirrorHeight }} cm</span>
              </div>
              <input type="range" min="5" max="25" step="1" v-model.number="mirrorHeight" class="w-full cursor-pointer accent-green-600" />
            </div>

            <div class="p-4 rounded-xl border mt-4" style="background: var(--color-panel-muted); border-color: var(--color-line);">
              <h4 class="font-bold text-slate-800 mb-2">Beeldkenmerken vlakke spiegel:</h4>
              <ul class="list-disc pl-5 font-mono text-sm space-y-1 text-slate-700">
                <li>Beeldafstand: db = dv = {{ mirrorDist }} cm</li>
                <li>Beeldgrootte: |B| = V = {{ mirrorHeight }} cm (N = 1)</li>
                <li>Aard: Virtueel beeld achter de spiegel</li>
                <li>Stand: Rechtopstaand, lateraal omgekeerd</li>
              </ul>
            </div>
          </div>

          <!-- Afrondknop -->
          <div class="mt-auto pt-6 border-t" style="border-color: var(--color-line);">
            <button
              @click="handleComplete"
              class="w-full py-3.5 px-6 rounded-btn font-bold text-white transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              style="background: var(--color-digital);"
            >
              <PhCheckCircle :size="20" weight="bold" />
              Activiteit voltooien
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PhSun, PhX, PhCheckCircle } from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  defaultMode: { type: String, default: 'lens' }
})

const emit = defineEmits(['close', 'complete'])

const modes = [
  { id: 'breking', label: '1. Breking & Weerkaatsing' },
  { id: 'lens', label: '2. Bolle lens & Beeldvorming' },
  { id: 'spiegel', label: '3. Vlakke spiegel' }
]

const activeMode = ref(props.defaultMode || 'lens')

const currentModeLabel = computed(() => {
  const m = modes.find(m => m.id === activeMode.value)
  return m ? m.label : 'Optica Lab'
})

// --- State Breking ---
const angleIncDeg = ref(40)
const angleIncRad = computed(() => (angleIncDeg.value * Math.PI) / 180)

const mediumPairs = [
  { name: 'Lucht naar Glas', m1: { name: 'Lucht', n: 1.0, color: '#f8fafc' }, m2: { name: 'Glas', n: 1.5, color: '#38bdf8' } },
  { name: 'Lucht naar Water', m1: { name: 'Lucht', n: 1.0, color: '#f8fafc' }, m2: { name: 'Water', n: 1.33, color: '#0284c7' } },
  { name: 'Lucht naar Diamant', m1: { name: 'Lucht', n: 1.0, color: '#f8fafc' }, m2: { name: 'Diamant', n: 2.42, color: '#e0f2fe' } },
  { name: 'Water naar Lucht', m1: { name: 'Water', n: 1.33, color: '#0284c7' }, m2: { name: 'Lucht', n: 1.0, color: '#f8fafc' } }
]

const selectedPair = ref(mediumPairs[0])
const selectedPairName = computed(() => selectedPair.value.name)
const medium1 = computed(() => selectedPair.value.m1)
const medium2 = computed(() => selectedPair.value.m2)

function applyMediumPair(pair) {
  selectedPair.value = pair
}

const isTotalReflection = computed(() => {
  if (medium1.value.n <= medium2.value.n) return false
  const sinCritical = medium2.value.n / medium1.value.n
  return Math.sin(angleIncRad.value) > sinCritical
})

const criticalAngleDeg = computed(() => {
  if (medium1.value.n <= medium2.value.n) return 90
  return (Math.asin(medium2.value.n / medium1.value.n) * 180) / Math.PI
})

const angleRefRad = computed(() => {
  if (isTotalReflection.value) return 0
  const sinR = (medium1.value.n * Math.sin(angleIncRad.value)) / medium2.value.n
  return Math.asin(Math.min(1, Math.max(-1, sinR)))
})
const angleRefDeg = computed(() => (angleRefRad.value * 180) / Math.PI)

// --- State Lens ---
const focalLength = ref(10)
const vDistance = ref(25)
const objHeight = ref(10)

const focalPx = computed(() => focalLength.value * 12)
const vPx = computed(() => vDistance.value * 12)
const objHeightPx = computed(() => objHeight.value * 10)

const bDistance = computed(() => {
  if (vDistance.value === focalLength.value) return 0
  return (vDistance.value * focalLength.value) / (vDistance.value - focalLength.value)
})
const bPx = computed(() => bDistance.value * 12)

const lensMagnification = computed(() => {
  if (vDistance.value === 0) return 1
  return Math.abs(bDistance.value / vDistance.value)
})
const imgHeightPx = computed(() => lensMagnification.value * objHeightPx.value)

const lensSituationText = computed(() => {
  const v = vDistance.value
  const f = focalLength.value
  if (v > 2 * f) return 'v > 2f: Fototoestel (reëel, omgekeerd, verkleind)'
  if (v === 2 * f) return 'v = 2f: 1:1 kopie (reëel, omgekeerd, even groot)'
  if (v > f && v < 2 * f) return 'f < v < 2f: Beamer / Projector (reëel, omgekeerd, vergroot)'
  if (v === f) return 'v = f: Schijnwerper (evenwijdige bundel)'
  return 'v < f: Loep (virtueel, rechtopstaand, vergroot)'
})

// --- State Spiegel ---
const mirrorDist = ref(15)
const mirrorHeight = ref(12)
const mirrorDistPx = computed(() => mirrorDist.value * 9)
const mirrorHeightPx = computed(() => mirrorHeight.value * 10)

const headerReadout = computed(() => {
  if (activeMode.value === 'breking') {
    return isTotalReflection.value ? 'Totale interne reflectie' : `r̂ = ${Math.round(angleRefDeg.value)}°`
  }
  if (activeMode.value === 'lens') {
    return `N = ${lensMagnification.value.toFixed(2)} | b = ${bDistance.value > 0 ? bDistance.value.toFixed(1) + ' cm' : '∞'}`
  }
  return `db = dv = ${mirrorDist.value} cm`
})

function handleClose() {
  emit('close')
}

function handleComplete() {
  emit('complete')
}
</script>
