<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { PhActivity, PhX, PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'

const props = defineProps({
  id: { type: String, required: true }
})

const emit = defineEmits(['close', 'complete'])

// 0: Normal, 1: Wound (Bacteria enter), 2: Histamine (Dilation), 3: Diapedesis, 4: Phagocytosis
const currentStep = ref(0)

const steps = [
    { label: 'Rustsituatie', desc: 'Gezond weefsel (bovenaan) en een normaal, intact bloedvat (onderaan).' },
    { label: 'Verwonding', desc: 'Een splinter doorboort de huidbarrière en brengt bacteriën naar binnen.' },
    { label: 'Histamine', desc: 'Mestcellen slaan alarm en geven histamine af. Het bloedvat wordt wijder en meer doorlaatbaar (vasodilatatie).' },
    { label: 'Diapedese', desc: 'Witte bloedcellen (macrofagen) vervormen zich en kruipen via de wand uit het bloedvat het weefsel in.' },
    { label: 'Fagocytose', desc: 'De macrofagen sluiten de bacteriën in via schijnvoetjes en breken ze af ("eten").' }
]

const currentStepData = computed(() => steps[currentStep.value])

function nextStep() {
    if (currentStep.value < 4) {
        currentStep.value++
    } else {
        emit('complete')
    }
}
function prevStep() {
    if (currentStep.value > 0) currentStep.value--
}

// Escape sluit net als de X in de kopbalk.
function handleKeydown(e) {
    if (e.key === 'Escape') {
        e.preventDefault()
        emit('close')
    }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <!-- Fullscreen-activiteitenshell: licht, blauw anker (digitale activiteit). -->
  <div class="modal-fullscreen">

    <!-- Kopbalk -->
    <header class="fullscreen-bar fullscreen-bar-digital">
      <div class="p-2 rounded-control shrink-0" style="background: var(--color-digital-soft); color: var(--color-digital);">
        <PhActivity weight="fill" class="text-xl" />
      </div>
      <div class="min-w-0">
        <h2 class="fullscreen-title">Labo: ontstekingsreactie en fagocytose</h2>
        <p class="fullscreen-label">{{ currentStepData.label }} — stap {{ currentStep + 1 }} van 5</p>
      </div>
      <button type="button" @click="emit('close')" class="btn-close ml-auto" aria-label="Sluiten">
        <PhX class="text-2xl" />
      </button>
    </header>

    <!-- Voortgangsbalk -->
    <div class="fullscreen-progress">
      <span :style="{ width: ((currentStep + 1) / 5) * 100 + '%' }"></span>
    </div>

    <!-- Midden: simulatie links, uitleg rechts -->
    <div class="fullscreen-body phagocytosis-body">

        <!-- Simulatie -->
        <div class="phagocytosis-canvas">
            <svg width="100%" height="100%" viewBox="0 0 800 450" class="select-none">
                    <defs>
                        <!-- Styles and Filters -->
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    <!-- Background / Tissue -->
                    <rect width="800" height="450" fill="#fdfbf7" />

                    <!-- Tissue cells (Epidermis/Dermis) -->
                    <g opacity="0.6">
                        <circle cx="100" cy="80" r="30" fill="#fde68a" stroke="#d97706" stroke-width="2" />
                        <circle cx="180" cy="60" r="35" fill="#fde68a" stroke="#d97706" stroke-width="2" />
                        <circle cx="270" cy="90" r="40" fill="#fde68a" stroke="#d97706" stroke-width="2" />
                        <circle cx="360" cy="50" r="30" fill="#fde68a" stroke="#d97706" stroke-width="2" />
                        <circle cx="500" cy="80" r="35" fill="#fde68a" stroke="#d97706" stroke-width="2" />
                        <circle cx="650" cy="70" r="45" fill="#fde68a" stroke="#d97706" stroke-width="2" />
                        <circle cx="750" cy="100" r="30" fill="#fde68a" stroke="#d97706" stroke-width="2" />
                    </g>

                    <!-- Splinter (Visible from step 1) -->
                    <g :style="{ opacity: currentStep >= 1 ? 1 : 0, transition: 'all 0.5s', transform: currentStep >= 1 ? 'translateY(0)' : 'translateY(-50px)' }">
                        <polygon points="400,-10 430,150 390,140" fill="#78350f" />
                    </g>

                    <!-- Bacteria (Visible from step 1, disappear at step 4) -->
                    <g :style="{ opacity: (currentStep >= 1 && currentStep < 4) ? 1 : 0, transition: 'all 0.5s' }">
                        <ellipse cx="400" cy="170" rx="8" ry="16" fill="#10b981" stroke="#047857" stroke-width="2" transform="rotate(20 400 170)" />
                        <ellipse cx="440" cy="160" rx="8" ry="16" fill="#10b981" stroke="#047857" stroke-width="2" transform="rotate(-30 440 160)" />
                        <ellipse cx="380" cy="190" rx="8" ry="16" fill="#10b981" stroke="#047857" stroke-width="2" transform="rotate(45 380 190)" />
                        <ellipse cx="450" cy="190" rx="8" ry="16" fill="#10b981" stroke="#047857" stroke-width="2" transform="rotate(-10 450 190)" />
                    </g>

                    <!-- Mast Cells -->
                    <g>
                        <circle cx="200" cy="200" r="25" fill="#e879f9" stroke="#a21caf" stroke-width="2" />
                        <circle cx="600" cy="180" r="25" fill="#e879f9" stroke="#a21caf" stroke-width="2" />
                        <text x="200" y="240" text-anchor="middle" font-size="12" fill="#a21caf" font-weight="bold">Mestcel</text>
                        <text x="600" y="220" text-anchor="middle" font-size="12" fill="#a21caf" font-weight="bold">Mestcel</text>
                    </g>

                    <!-- Histamine particles (Visible at step 2) -->
                    <g :style="{ opacity: currentStep >= 2 ? 1 : 0, transition: 'all 0.5s' }">
                        <!-- Left mast cell -->
                        <circle cx="240" cy="220" r="4" fill="#c026d3" />
                        <circle cx="250" cy="240" r="4" fill="#c026d3" />
                        <circle cx="230" cy="260" r="4" fill="#c026d3" />
                        <circle cx="280" cy="250" r="4" fill="#c026d3" />
                        <circle cx="260" cy="280" r="4" fill="#c026d3" />
                        <!-- Right mast cell -->
                        <circle cx="560" cy="210" r="4" fill="#c026d3" />
                        <circle cx="540" cy="230" r="4" fill="#c026d3" />
                        <circle cx="580" cy="240" r="4" fill="#c026d3" />
                        <circle cx="520" cy="250" r="4" fill="#c026d3" />
                    </g>

                    <!-- Blood vessel -->
                    <g :style="{ transition: 'all 0.5s' }">
                        <!-- Vessel walls: expand at step 2 -->
                        <path :d="currentStep >= 2 ? 'M0,300 L800,300' : 'M0,350 L800,350'" stroke="#ef4444" stroke-width="6" stroke-dasharray="20,10" style="transition: all 0.5s ease-in-out;" />
                        <path :d="currentStep >= 2 ? 'M0,450 L800,450' : 'M0,420 L800,420'" stroke="#ef4444" stroke-width="6" stroke-dasharray="20,10" style="transition: all 0.5s ease-in-out;" />

                        <!-- Blood plasma -->
                        <rect x="0" :y="currentStep >= 2 ? 300 : 350" width="800" :height="currentStep >= 2 ? 150 : 70" fill="#fee2e2" opacity="0.6" style="transition: all 0.5s ease-in-out;" />

                        <!-- Red blood cells -->
                        <circle cx="100" cy="385" r="15" fill="#ef4444" />
                        <circle cx="300" cy="385" r="15" fill="#ef4444" />
                        <circle cx="700" cy="385" r="15" fill="#ef4444" />

                        <text x="50" y="415" font-size="12" fill="#b91c1c" font-weight="bold">Rode bloedcellen</text>

                        <!-- White blood cells (Macrophages inside vessel) -->
                        <g :style="{ opacity: currentStep < 3 ? 1 : 0, transition: 'opacity 0.5s' }">
                            <path d="M420,385 C430,370 450,375 440,395 C430,405 410,400 420,385 Z" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="3" />
                            <circle cx="430" cy="385" r="5" fill="#0369a1" />
                        </g>

                        <!-- Macrophage Diapedesis (Step 3) -->
                        <g :style="{ opacity: currentStep === 3 ? 1 : 0, transition: 'opacity 0.5s' }">
                            <path d="M420,300 C430,270 450,280 440,310 C430,330 410,320 420,300 Z" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="3" />
                            <circle cx="430" cy="300" r="5" fill="#0369a1" />
                            <text x="490" y="300" font-size="12" fill="#0284c7" font-weight="bold">Diapedese</text>
                        </g>

                        <!-- Macrophage Phagocytosis (Step 4) -->
                        <g :style="{ opacity: currentStep === 4 ? 1 : 0, transition: 'opacity 0.5s' }">
                            <!-- Enclosing the bacteria -->
                            <path d="M370,180 C400,140 470,140 460,190 C450,230 360,220 370,180 Z" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="3" />
                            <circle cx="415" cy="200" r="5" fill="#0369a1" />
                            <!-- Digested bacteria fragments -->
                            <circle cx="390" cy="170" r="4" fill="#10b981" opacity="0.6" />
                            <circle cx="440" cy="175" r="4" fill="#10b981" opacity="0.6" />
                            <circle cx="400" cy="190" r="4" fill="#10b981" opacity="0.6" />
                            <text x="480" y="180" font-size="12" fill="#0284c7" font-weight="bold">Fagocytose door macrofaag</text>
                        </g>
                    </g>
                </svg>
        </div>

        <!-- Stappenplan -->
        <aside class="phagocytosis-panel">
            <span class="phagocytosis-step">{{ currentStep + 1 }}</span>
            <h3 class="phagocytosis-step-title">{{ currentStepData.label }}</h3>
            <p class="phagocytosis-step-text">{{ currentStepData.desc }}</p>

            <ol class="phagocytosis-track">
                <li
                    v-for="(step, idx) in steps"
                    :key="step.label"
                    class="phagocytosis-track-item"
                    :class="idx === currentStep ? 'phagocytosis-track-item-active' : ''"
                >
                    <span class="phagocytosis-track-dot">{{ idx + 1 }}</span>
                    {{ step.label }}
                </li>
            </ol>

            <div class="phagocytosis-actions">
                <button
                    type="button"
                    @click="prevStep"
                    :disabled="currentStep === 0"
                    class="btn"
                    style="border: 2px solid var(--color-line-strong);"
                >
                    <PhArrowLeft weight="bold" /> Vorige
                </button>
                <button type="button" @click="nextStep" class="btn btn-primary">
                    {{ currentStep === 4 ? 'Afronden' : 'Volgende' }} <PhArrowRight weight="bold" />
                </button>
            </div>
        </aside>

    </div>
  </div>
</template>

<style scoped>
.phagocytosis-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}

.phagocytosis-canvas {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    aspect-ratio: 16 / 9;
    background: var(--color-panel);
    border: 2px solid var(--color-line-strong);
    border-radius: var(--radius-card);
    overflow: hidden;
}

.phagocytosis-panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
}

.phagocytosis-step {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
    color: var(--color-digital);
    background: var(--color-digital-soft);
    border-radius: var(--radius-control);
    font-size: 1.25rem;
    font-weight: 700;
}

.phagocytosis-step-title {
    margin: 0 0 8px;
    color: var(--color-ink);
    font-size: 1.5rem;
    font-weight: 700;
}

.phagocytosis-step-text {
    margin: 0;
    color: var(--color-ink-soft);
    font-size: 1.0625rem;
    line-height: 1.5;
}

.phagocytosis-track {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 20px 0 0;
    padding: 0;
    list-style: none;
}

.phagocytosis-track-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px 6px 6px;
    color: var(--color-ink-soft);
    background: var(--color-panel);
    border: 2px solid var(--color-line-strong);
    border-radius: var(--radius-control);
    font-size: 0.8125rem;
    font-weight: 600;
}

.phagocytosis-track-dot {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    color: var(--color-ink-soft);
    background: var(--color-panel-muted);
    border-radius: var(--radius-control);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
}

.phagocytosis-track-item-active {
    color: var(--color-ink);
    background: var(--color-digital-soft);
    border-color: var(--color-digital);
}

.phagocytosis-track-item-active .phagocytosis-track-dot {
    color: #ffffff;
    background: var(--color-digital);
}

.phagocytosis-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;
}

@media (min-width: 1024px) {
    .phagocytosis-body {
        grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
        align-items: start;
    }

    .phagocytosis-canvas,
    .phagocytosis-panel {
        max-width: none;
        margin: 0;
    }
}
</style>
