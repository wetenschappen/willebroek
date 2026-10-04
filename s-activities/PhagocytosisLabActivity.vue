<script setup>
import { ref, computed } from 'vue'

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
</script>

<template>
<div class="activity-container flex flex-col h-full bg-paper relative text-slate-900 select-none">
    
    <!-- Header -->
    <div class="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-white shrink-0 shadow-sm z-10">
        <div>
            <h2 class="text-xl font-bold text-slate-800 tracking-tight">Labo: Ontstekingsreactie & Fagocytose</h2>
            <p class="text-sm font-medium text-slate-500 mt-1">Ontdek de 2de afweerlinie stap voor stap</p>
        </div>
        <button @click="$emit('close')" class="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
        
        <!-- Left Panel: Simulation -->
        <div class="flex-[2] relative p-8 flex items-center justify-center bg-slate-50">
            <div class="w-full max-w-2xl aspect-video bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex items-center justify-center">
                
                <!-- SVG Canvas -->
                <svg width="100%" height="100%" viewBox="0 0 800 450" class="absolute inset-0">
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
        </div>

        <!-- Right Panel: Controls -->
        <div class="w-80 bg-white border-l border-slate-200 flex flex-col relative z-10 shrink-0 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
            <div class="flex-1 p-8 flex flex-col justify-center">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-digital-soft text-digital mb-6 font-bold text-xl">
                    {{ currentStep + 1 }}
                </div>
                <h3 class="text-2xl font-bold text-slate-800 mb-4 tracking-tight">{{ currentStepData.label }}</h3>
                <p class="text-slide-body text-slate-600 leading-relaxed font-medium">
                    {{ currentStepData.desc }}
                </p>
                
                <div class="mt-8 flex gap-2 w-full">
                    <button @click="prevStep" 
                            :disabled="currentStep === 0"
                            class="flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-colors border border-slate-200"
                            :class="currentStep === 0 ? 'text-slate-500 bg-slate-50 cursor-not-allowed' : 'text-slate-700 bg-white hover:bg-slate-50 cursor-pointer'">
                        Vorige
                    </button>
                    <button @click="nextStep"
                            class="flex-[2] py-3 px-4 rounded-lg font-bold text-sm transition-colors cursor-pointer"
                            :class="currentStep === 4 ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-digital hover:bg-digital-strong text-white'">
                        {{ currentStep === 4 ? 'Afronden' : 'Volgende' }}
                    </button>
                </div>
            </div>

            <!-- Progress Track -->
            <div class="h-2 bg-slate-100 flex w-full">
                <div class="h-full bg-digital transition-all duration-300" :style="{ width: ((currentStep + 1) / 5) * 100 + '%' }"></div>
            </div>
        </div>

    </div>
</div>
</template>

<style scoped>
.activity-container {
    animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
