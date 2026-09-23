<template>
  <div v-if="isOpen" class="modal-fullscreen" @keydown.escape="handleClose">
    <div class="w-full h-full flex flex-col overflow-hidden bg-paper">
      <!-- Kopbalk: blauw anker, digitale activiteit -->
      <header class="fullscreen-bar fullscreen-bar-digital">
        <div class="p-2 rounded-control shrink-0" style="background: var(--color-digital-soft); color: var(--color-digital);">
          <PhGauge :size="26" weight="fill" />
        </div>
        <div class="min-w-0">
          <h2 class="fullscreen-title">Virtueel Druk & Vloeistof Lab</h2>
          <p class="fullscreen-label">{{ currentModeLabel }}</p>
        </div>
        <span class="ml-2 shrink-0 badge badge-digital">Digitaal</span>
        
        <div class="font-mono text-base text-slate-900 flex items-center gap-3 px-3 py-1.5 rounded-control ml-auto mr-2 shrink-0" style="background: var(--color-panel-muted); border: 2px solid var(--color-line);">
          <span>Druk p = <strong>{{ formattedMainPressure }}</strong></span>
        </div>

        <button @click="handleClose" class="btn-close shrink-0" aria-label="Sluiten">
          <PhX :size="22" weight="bold" />
        </button>
      </header>

      <!-- Navigatie tussen simulatiemodi -->
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

      <!-- Hoofdinhoud: Simulatie + Bedieningspaneel -->
      <main class="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-0">
        <!-- Linkerpaneel: Grafische SVG Simulatie (7 cols) -->
        <div class="lg:col-span-7 flex flex-col items-center justify-center p-6 relative overflow-hidden" style="background: var(--color-panel);">
          
          <!-- Mode 1: Vaste stoffen -->
          <div v-if="activeMode === 'vast'" class="w-full h-full flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 800 500" class="w-full h-full max-h-[460px]">
              <!-- Grondvlak -->
              <line x1="50" y1="360" x2="750" y2="360" stroke="var(--color-line-strong)" stroke-width="4" />
              <g v-for="i in 28" :key="'hatch-' + i">
                <line :x1="50 + i * 25" y1="360" :x2="35 + i * 25" y2="385" stroke="var(--color-line)" stroke-width="2" />
              </g>

              <!-- Blok op grond -->
              <rect
                :x="400 - blockWidth / 2"
                :y="360 - blockHeight"
                :width="blockWidth"
                :height="blockHeight"
                fill="var(--color-panel-muted)"
                stroke="var(--color-ink)"
                stroke-width="3"
                rx="4"
              />

              <!-- Contactoppervlakte accentstrip -->
              <rect
                :x="400 - blockWidth / 2"
                y="354"
                :width="blockWidth"
                height="8"
                fill="var(--color-digital)"
                rx="2"
              />

              <!-- Krachtpijl (loodrecht naar beneden) -->
              <line
                x1="400"
                :y1="360 - blockHeight - arrowLength"
                x2="400"
                :y2="360 - blockHeight"
                stroke="var(--color-presentation)"
                stroke-width="5"
              />
              <polygon
                :points="`400,${360 - blockHeight} 390,${360 - blockHeight - 18} 410,${360 - blockHeight - 18}`"
                fill="var(--color-presentation)"
              />

              <!-- Labels op de tekening -->
              <text x="400" :y="360 - blockHeight - arrowLength - 14" text-anchor="middle" font-size="20" font-weight="bold" fill="var(--color-presentation)">
                F = {{ solidForce }} N
              </text>
              <text x="400" y="395" text-anchor="middle" font-size="18" font-weight="bold" fill="var(--color-digital)">
                A = {{ solidArea }} m² ({{ Math.round(solidArea * 10000) }} cm²)
              </text>
              <text x="400" y="70" text-anchor="middle" font-size="24" font-weight="bold" fill="var(--color-ink)">
                p = F / A = {{ formattedSolidPressure }}
              </text>
            </svg>
          </div>

          <!-- Mode 2: Hydrostatische druk (Twee vaten) -->
          <div v-else-if="activeMode === 'vloeistof'" class="w-full h-full flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 800 500" class="w-full h-full max-h-[460px]">
              <!-- Grondlijn -->
              <line x1="50" y1="420" x2="750" y2="420" stroke="var(--color-line-strong)" stroke-width="4" />

              <!-- Vat A: Breed vat (links) -->
              <rect x="120" :y="420 - liquidVesselHeight" width="220" :height="liquidVesselHeight" fill="none" stroke="var(--color-ink)" stroke-width="3" />
              <rect x="123" :y="420 - currentLiquidHeight" width="214" :height="currentLiquidHeight" :fill="liquidColor" fill-opacity="0.35" />

              <!-- Vat B: Smal vat (rechts) -->
              <rect x="460" :y="420 - liquidVesselHeight" width="90" :height="liquidVesselHeight" fill="none" stroke="var(--color-ink)" stroke-width="3" />
              <rect x="463" :y="420 - currentLiquidHeight" width="84" :height="currentLiquidHeight" :fill="liquidColor" fill-opacity="0.35" />

              <!-- Vloeistofoppervlakte stippellijn tussen beide vaten -->
              <line x1="120" :y1="420 - currentLiquidHeight" x2="550" :y2="420 - currentLiquidHeight" stroke="var(--color-digital)" stroke-width="2" stroke-dasharray="6,4" />

              <!-- Dieptesensor met pijl en maatstreep -->
              <line x1="230" :y1="420 - currentLiquidHeight" x2="230" :y2="420 - currentLiquidHeight + sensorDepthPx" stroke="var(--color-presentation)" stroke-width="3" />
              <circle cx="230" :cy="420 - currentLiquidHeight + sensorDepthPx" r="8" fill="var(--color-presentation)" />
              <circle cx="505" :cy="420 - currentLiquidHeight + sensorDepthPx" r="8" fill="var(--color-presentation)" />

              <text x="230" :y="420 - currentLiquidHeight + sensorDepthPx / 2" dx="15" font-size="18" font-weight="bold" fill="var(--color-presentation)">
                h = {{ liquidDepth }} m
              </text>

              <!-- Tekst en conclusie -->
              <text x="400" y="60" text-anchor="middle" font-size="24" font-weight="bold" fill="var(--color-ink)">
                Hydrostatische druk: p = ρ · g · h = {{ formattedHydroPressure }}
              </text>
              <text x="400" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="var(--color-ink-soft)">
                Totale druk (incl. 1013 hPa atmosfeer): {{ formattedTotalLiquidPressure }}
              </text>
              <text x="400" y="460" text-anchor="middle" font-size="16" font-weight="600" fill="var(--color-ink-soft)">
                Hydrostatische paradox: de vorm van het vat heeft géén invloed op de druk op diepte h!
              </text>
            </svg>
          </div>

          <!-- Mode 3: Hydraulica (Hefbrug van Pascal) -->
          <div v-else class="w-full h-full flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 800 500" class="w-full h-full max-h-[460px]">
              <!-- U-vormige leiding -->
              <path
                d="M 160 160 L 160 380 Q 160 410 200 410 L 600 410 Q 640 410 640 380 L 640 160"
                fill="none"
                stroke="var(--color-ink)"
                stroke-width="5"
              />
              <!-- Vloeistof binnenin -->
              <path
                d="M 163 260 L 163 380 Q 163 407 200 407 L 600 407 Q 637 407 637 380 L 637 280 L 520 280 L 520 370 L 280 370 L 280 260 Z"
                fill="var(--color-digital-soft)"
              />

              <!-- Zuiger 1 (links, smal) -->
              <rect x="165" y="240" width="110" height="20" fill="var(--color-presentation)" rx="2" />
              <!-- Krachtpijl F1 -->
              <line x1="220" y1="160" x2="220" y2="235" stroke="var(--color-presentation)" stroke-width="5" />
              <polygon points="220,235 212,220 228,220" fill="var(--color-presentation)" />
              <text x="220" y="145" text-anchor="middle" font-size="18" font-weight="bold" fill="var(--color-presentation)">
                F1 = {{ pascalF1 }} N
              </text>
              <text x="220" y="285" text-anchor="middle" font-size="16" font-weight="bold" fill="var(--color-ink)">
                A1 = {{ pascalA1 }} cm²
              </text>

              <!-- Zuiger 2 (rechts, breed) -->
              <rect x="525" y="260" width="110" height="20" fill="var(--color-workbook)" rx="2" />
              <!-- Auto op zuiger 2 -->
              <rect x="535" y="225" width="90" height="35" rx="6" fill="var(--color-panel-muted)" stroke="var(--color-ink)" stroke-width="2" />
              <circle cx="555" cy="260" r="8" fill="var(--color-ink)" />
              <circle cx="605" cy="260" r="8" fill="var(--color-ink)" />

              <!-- Krachtpijl F2 omhoog -->
              <line x1="580" y1="210" x2="580" y2="150" stroke="var(--color-workbook)" stroke-width="5" />
              <polygon points="580,150 572,165 588,165" fill="var(--color-workbook)" />
              <text x="580" y="135" text-anchor="middle" font-size="18" font-weight="bold" fill="var(--color-workbook)">
                F2 = {{ formattedPascalF2 }} N
              </text>
              <text x="580" y="305" text-anchor="middle" font-size="16" font-weight="bold" fill="var(--color-ink)">
                A2 = {{ pascalA2 }} cm²
              </text>

              <!-- Centrale drukformule -->
              <text x="400" y="80" text-anchor="middle" font-size="22" font-weight="bold" fill="var(--color-ink)">
                Beginsel van Pascal: p = F1 / A1 = F2 / A2
              </text>
              <text x="400" y="115" text-anchor="middle" font-size="18" font-weight="600" fill="var(--color-digital)">
                Krachtvermenigvuldiging: factor {{ (pascalA2 / pascalA1).toFixed(1) }}x
              </text>
            </svg>
          </div>
        </div>

        <!-- Rechterpaneel: Bediening & Opgaven (5 cols) -->
        <div class="lg:col-span-5 flex flex-col p-6 overflow-y-auto" style="background: var(--color-paper); border-left: 2px solid var(--color-line);">
          
          <!-- Controls voor Vaste stoffen -->
          <div v-if="activeMode === 'vast'" class="space-y-6">
            <h3 class="text-xl font-bold text-slate-900 border-b pb-2" style="border-color: var(--color-line);">
              Parameters vaste stof
            </h3>

            <!-- Slider Kracht F -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Loodrechte kracht F:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ solidForce }} N</span>
              </div>
              <input type="range" min="10" max="2000" step="10" v-model.number="solidForce" class="w-full cursor-pointer accent-red-600" />
            </div>

            <!-- Slider Oppervlakte A -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Contactoppervlak A:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ solidArea }} m²</span>
              </div>
              <input type="range" min="0.005" max="0.5" step="0.005" v-model.number="solidArea" class="w-full cursor-pointer accent-blue-600" />
            </div>

            <!-- Snelle scenario-knoppen -->
            <div class="pt-4 border-t" style="border-color: var(--color-line);">
              <p class="font-bold text-sm text-slate-600 uppercase tracking-wider mb-3">Voorbeeldscenario's</p>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="scen in solidScenarios"
                  :key="scen.name"
                  @click="applySolidScenario(scen)"
                  class="p-2.5 text-left text-sm rounded-control border hover:border-slate-400 transition-colors"
                  style="background: var(--color-panel); border-color: var(--color-line);"
                >
                  <div class="font-bold text-slate-800">{{ scen.name }}</div>
                  <div class="text-xs text-slate-500 font-mono">{{ scen.desc }}</div>
                </button>
              </div>
            </div>

            <!-- Berekening details -->
            <div class="p-4 rounded-xl border mt-4" style="background: var(--color-panel-muted); border-color: var(--color-line);">
              <h4 class="font-bold text-slate-800 mb-2">Formule & Waarden:</h4>
              <p class="font-mono text-sm leading-relaxed text-slate-700">
                p = F / A<br>
                p = {{ solidForce }} N / {{ solidArea }} m²<br>
                <strong>p = {{ Math.round(solidForce / solidArea) }} Pa = {{ (solidForce / solidArea / 100).toFixed(1) }} hPa = {{ (solidForce / solidArea / 100000).toFixed(4) }} bar</strong>
              </p>
            </div>
          </div>

          <!-- Controls voor Vloeistoffen -->
          <div v-else-if="activeMode === 'vloeistof'" class="space-y-6">
            <h3 class="text-xl font-bold text-slate-900 border-b pb-2" style="border-color: var(--color-line);">
              Parameters vloeistof
            </h3>

            <!-- Slider Diepte h -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Diepte h:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ liquidDepth }} m</span>
              </div>
              <input type="range" min="0" max="30" step="0.5" v-model.number="liquidDepth" class="w-full cursor-pointer accent-blue-600" />
            </div>

            <!-- Vloeistofselectie -->
            <div>
              <label class="block font-bold text-slate-700 mb-2">Vloeistof & dichtheid ρ:</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="fluid in fluidTypes"
                  :key="fluid.name"
                  @click="selectedFluid = fluid"
                  class="p-2.5 text-left text-sm rounded-control border transition-all"
                  :style="selectedFluid.name === fluid.name
                    ? { background: 'var(--color-digital-soft)', borderColor: 'var(--color-digital)', fontWeight: 'bold' }
                    : { background: 'var(--color-panel)', borderColor: 'var(--color-line)' }"
                >
                  <div>{{ fluid.name }}</div>
                  <div class="text-xs font-mono text-slate-500">{{ fluid.rho }} kg/m³</div>
                </button>
              </div>
            </div>

            <!-- Berekening details -->
            <div class="p-4 rounded-xl border mt-4" style="background: var(--color-panel-muted); border-color: var(--color-line);">
              <h4 class="font-bold text-slate-800 mb-2">Hydrostatische druk:</h4>
              <p class="font-mono text-sm leading-relaxed text-slate-700">
                p_hydr = ρ · g · h<br>
                p_hydr = {{ selectedFluid.rho }} kg/m³ · 9,81 N/kg · {{ liquidDepth }} m<br>
                <strong>p_hydr = {{ Math.round(selectedFluid.rho * 9.81 * liquidDepth) }} Pa = {{ (selectedFluid.rho * 9.81 * liquidDepth / 100000).toFixed(2) }} bar</strong>
              </p>
            </div>
          </div>

          <!-- Controls voor Pascal -->
          <div v-else class="space-y-6">
            <h3 class="text-xl font-bold text-slate-900 border-b pb-2" style="border-color: var(--color-line);">
              Parameters hydraulische hefbrug
            </h3>

            <!-- Slider Ingangskracht F1 -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Ingangskracht F1:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ pascalF1 }} N</span>
              </div>
              <input type="range" min="20" max="1000" step="20" v-model.number="pascalF1" class="w-full cursor-pointer accent-red-600" />
            </div>

            <!-- Slider A1 -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Oppervlakte kleine zuiger A1:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ pascalA1 }} cm²</span>
              </div>
              <input type="range" min="5" max="50" step="5" v-model.number="pascalA1" class="w-full cursor-pointer accent-blue-600" />
            </div>

            <!-- Slider A2 -->
            <div>
              <div class="flex justify-between items-center mb-2 font-mono text-base">
                <span class="font-bold text-slate-700">Oppervlakte grote zuiger A2:</span>
                <span class="px-2 py-0.5 rounded font-bold" style="background: var(--color-panel-muted);">{{ pascalA2 }} cm²</span>
              </div>
              <input type="range" min="50" max="1000" step="25" v-model.number="pascalA2" class="w-full cursor-pointer accent-green-600" />
            </div>

            <div class="p-4 rounded-xl border mt-4" style="background: var(--color-panel-muted); border-color: var(--color-line);">
              <h4 class="font-bold text-slate-800 mb-2">Hefkracht op zuiger 2:</h4>
              <p class="font-mono text-sm leading-relaxed text-slate-700">
                F2 = F1 · (A2 / A1)<br>
                F2 = {{ pascalF1 }} N · ({{ pascalA2 }} / {{ pascalA1 }})<br>
                <strong>F2 = {{ Math.round(pascalF1 * (pascalA2 / pascalA1)) }} N (geschikt voor {{ Math.round(pascalF1 * (pascalA2 / pascalA1) / 9.81) }} kg)</strong>
              </p>
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
import { PhGauge, PhX, PhCheckCircle } from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  defaultMode: { type: String, default: 'vast' }
})

const emit = defineEmits(['close', 'complete'])

const modes = [
  { id: 'vast', label: '1. Vaste stoffen' },
  { id: 'vloeistof', label: '2. Hydrostatische druk' },
  { id: 'pascal', label: '3. Hydraulica & Pascal' }
]

const activeMode = ref(props.defaultMode || 'vast')

const currentModeLabel = computed(() => {
  const m = modes.find(m => m.id === activeMode.value)
  return m ? m.label : 'Simulatie'
})

// --- State voor Vaste stoffen ---
const solidForce = ref(600)
const solidArea = ref(0.05)

const blockWidth = computed(() => Math.min(450, Math.max(80, Math.sqrt(solidArea.value) * 600)))
const blockHeight = ref(100)
const arrowLength = computed(() => Math.min(150, Math.max(50, solidForce.value / 15)))

const formattedSolidPressure = computed(() => {
  const p = solidForce.value / solidArea.value
  if (p >= 100000) return (p / 100000).toFixed(2) + ' bar'
  if (p >= 1000) return Math.round(p / 100) + ' hPa'
  return Math.round(p) + ' Pa'
})

const solidScenarios = [
  { name: 'Baksteen plat', desc: 'F=20 N, A=0,02 m²', F: 20, A: 0.02 },
  { name: 'Baksteen op kant', desc: 'F=20 N, A=0,005 m²', F: 20, A: 0.005 },
  { name: 'Yusuf op schaatsen', desc: 'F=600 N, A=0,0008 m²', F: 600, A: 0.005 },
  { name: 'Sneeuwschoenen', desc: 'F=600 N, A=0,20 m²', F: 600, A: 0.20 }
]

function applySolidScenario(scen) {
  solidForce.value = scen.F
  solidArea.value = scen.A
}

// --- State voor Vloeistoffen ---
const liquidDepth = ref(5)
const liquidVesselHeight = ref(300)
const currentLiquidHeight = ref(260)
const sensorDepthPx = computed(() => (liquidDepth.value / 30) * currentLiquidHeight.value)

const fluidTypes = [
  { name: 'Water', rho: 1000, color: '#38bdf8' },
  { name: 'Zeewater', rho: 1025, color: '#0284c7' },
  { name: 'Olie', rho: 850, color: '#f59e0b' },
  { name: 'Kwik', rho: 13600, color: '#94a3b8' }
]
const selectedFluid = ref(fluidTypes[0])
const liquidColor = computed(() => selectedFluid.value.color)

const formattedHydroPressure = computed(() => {
  const p = selectedFluid.value.rho * 9.81 * liquidDepth.value
  return (p / 100000).toFixed(2) + ' bar (' + Math.round(p / 100) + ' hPa)'
})

const formattedTotalLiquidPressure = computed(() => {
  const p = 101300 + selectedFluid.value.rho * 9.81 * liquidDepth.value
  return (p / 100000).toFixed(2) + ' bar'
})

// --- State voor Pascal ---
const pascalF1 = ref(200)
const pascalA1 = ref(10)
const pascalA2 = ref(200)

const formattedPascalF2 = computed(() => {
  return Math.round(pascalF1.value * (pascalA2.value / pascalA1.value))
})

const formattedMainPressure = computed(() => {
  if (activeMode.value === 'vast') return formattedSolidPressure.value
  if (activeMode.value === 'vloeistof') return formattedHydroPressure.value
  return (pascalF1.value / (pascalA1.value / 10000) / 100000).toFixed(2) + ' bar'
})

function handleClose() {
  emit('close')
}

function handleComplete() {
  emit('complete')
}
</script>
