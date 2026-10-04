<template>
  <div v-if="isOpen" class="modal-fullscreen">
    <div class="w-full h-full flex flex-col overflow-hidden bg-paper">
      <!-- Kopbalk: blauw anker, digitale activiteit -->
      <header class="fullscreen-bar fullscreen-bar-digital">
        <div class="p-2 rounded-control shrink-0" style="background: var(--color-digital-soft); color: var(--color-digital);">
          <PhCalculator :size="24" weight="bold" />
        </div>
        <div class="min-w-0">
          <h2 class="fullscreen-title">Afleiding van de formule</h2>
          <p class="fullscreen-label">Stapsgewijze opbouw van hydrostatische druk</p>
        </div>
        <span class="ml-2 shrink-0 badge badge-digital">Digitaal</span>

        <button @click="handleClose" class="btn-close ml-auto shrink-0" aria-label="Sluiten">
          <PhX :size="22" weight="bold" />
        </button>
      </header>

      <!-- Hoofdinhoud: 2 kolommen (links visualisatie, rechts denkstappen) -->
      <main class="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-0 overflow-hidden">
        
        <!-- Linkerpaneel: Grafische SVG weergave (6 cols) -->
        <div class="lg:col-span-6 flex flex-col items-center justify-center p-6 relative overflow-hidden" style="background: var(--color-panel);">
          
          <svg viewBox="0 0 600 500" class="w-full h-full max-h-[500px] select-none">
            <!-- 3D Perspectief Vloeistofvat -->
            <g transform="translate(100, 40)">
              
              <!-- Achterkant van het vloeistofoppervlak (boven) -->
              <ellipse cx="200" cy="50" rx="150" ry="35" fill="#38bdf8" fill-opacity="0.1" stroke="var(--color-ink-soft)" stroke-width="2" stroke-dasharray="4,4" />
              
              <!-- Omtrek van het vat -->
              <path d="M 50,50 L 50,330 A 150,35 0 0,0 350,330 L 350,50" fill="#38bdf8" fill-opacity="0.1" stroke="var(--color-ink)" stroke-width="3" />
              
              <!-- Voorkant van het vloeistofoppervlak (boven) -->
              <path d="M 50,50 A 150,35 0 0,0 350,50" fill="none" stroke="var(--color-ink)" stroke-width="3" />
              
              <!-- Oppervlakte label -->
              <text x="200" y="10" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--color-digital)">Vloeistofoppervlak (p_atm)</text>

              <!-- Denkbeeldige 3D kolom vloeistof -->
              <g transform="translate(0, 0)">
                <!-- Bovenkant van de kolom (op vloeistofoppervlak) -->
                <ellipse cx="200" cy="50" rx="55" ry="13" fill="#0284c7" fill-opacity="0.25" stroke="var(--color-digital)" stroke-width="2.5" stroke-dasharray="6,4" />
                
                <!-- Verticale stippellijnen van de kolom -->
                <line x1="145" y1="50" x2="145" y2="280" stroke="var(--color-digital)" stroke-width="2.5" stroke-dasharray="6,4" />
                <line x1="255" y1="50" x2="255" y2="280" stroke="var(--color-digital)" stroke-width="2.5" stroke-dasharray="6,4" />
                
                <!-- Grondvlak A van de kolom (bodem) -->
                <ellipse cx="200" cy="280" rx="55" ry="13" fill="var(--color-presentation)" />
                <text x="200" y="285" text-anchor="middle" font-size="16" font-weight="bold" fill="#fff">A</text>
              </g>

              <!-- Hoogtemaat h (diepte) -->
              <line x1="100" y1="50" x2="100" y2="280" stroke="var(--color-ink)" stroke-width="2" />
              <line x1="92" y1="50" x2="108" y2="50" stroke="var(--color-ink)" stroke-width="2" />
              <line x1="92" y1="280" x2="108" y2="280" stroke="var(--color-ink)" stroke-width="2" />
              <text x="85" y="170" text-anchor="end" font-size="18" font-weight="bold" fill="var(--color-ink)">h</text>

              <!-- Vector Pijl voor de Kracht F (wordt dynamisch getoond afhankelijk van stap) -->
              <g v-if="derivationStep >= 0">
                <line x1="200" y1="120" x2="200" y2="260" stroke="var(--color-presentation)" stroke-width="4" />
                <polygon points="200,268 192,250 208,250" fill="var(--color-presentation)" />
                
                <g transform="translate(215, 195)">
                  <!-- Vector pijltje boven F -->
                  <line x1="0" y1="-16" x2="12" y2="-16" stroke="var(--color-presentation)" stroke-width="1.8" stroke-linecap="round" />
                  <polyline points="8.5,-18.5 12.5,-16 8.5,-13.5" fill="none" stroke="var(--color-presentation)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  <text x="0" y="0" font-size="19" font-weight="bold" fill="var(--color-presentation)">F</text>
                  
                  <text v-if="!isCorrect && derivationStep === 0" x="17" y="0" font-size="19" font-weight="bold" fill="var(--color-presentation)">= ?</text>
                </g>
              </g>

            </g>
          </svg>

          <!-- KaTeX formule banner onder de figuur (geeft het antwoord pas prijs NA het juist antwoorden) -->
          <div class="w-full max-w-lg mt-2 p-3 rounded-lg text-center font-semibold text-slate-800 transition-all"
               :style="isCorrect
                 ? { background: 'var(--color-workbook-soft)', border: '2px solid var(--color-workbook)' }
                 : { background: 'var(--color-paper)', border: '2px solid var(--color-line)' }"
               v-html="processMathText(currentFormulaDisplay)">
          </div>
        </div>

        <!-- Rechterpaneel: Denkstappen, keuzes & toelichting (6 cols) -->
        <div class="lg:col-span-6 flex flex-col p-6 overflow-y-auto" style="background: var(--color-paper); border-left: 2px solid var(--color-line);">
          
          <!-- Stepper header -->
          <div class="flex items-center justify-between border-b pb-3 mb-5" style="border-color: var(--color-line);">
            <div>
              <span class="text-xs uppercase font-bold tracking-wider text-slate-500">Formule opbouwen</span>
              <h3 class="text-xl font-bold text-slate-900">
                {{ isCompleted ? 'Afleiding voltooid' : `Stap ${derivationStep + 1} van ${derivationSteps.length}` }}
              </h3>
            </div>
            <div class="flex items-center gap-1.5">
              <span
                v-for="(st, idx) in derivationSteps"
                :key="idx"
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                :style="idx === derivationStep && !isCompleted
                  ? { background: 'var(--color-digital)', color: '#fff' }
                  : idx < derivationStep || isCompleted
                    ? { background: 'var(--color-workbook)', color: '#fff' }
                    : { background: 'var(--color-panel-muted)', color: 'var(--color-ink-soft)', border: '1px solid var(--color-line)' }"
              >
                <PhCheck v-if="idx < derivationStep || isCompleted" :size="14" weight="bold" />
                <span v-else>{{ idx + 1 }}</span>
              </span>
            </div>
          </div>

          <!-- Actieve denkstap -->
          <div v-if="!isCompleted" class="space-y-4 flex-1 flex flex-col">
            <div class="p-5 rounded-card border" style="background: var(--color-panel); border-color: var(--color-line);">
              <h4 class="font-bold text-lg text-slate-900 mb-2">
                {{ derivationSteps[derivationStep].title }}
              </h4>
              <p class="text-base text-slate-700 leading-relaxed mb-5" v-html="processMathText(derivationSteps[derivationStep].question)"></p>

              <!-- Keuzeopties (4 opties) -->
              <div class="space-y-3">
                <button
                  v-for="(opt, optIdx) in derivationSteps[derivationStep].options"
                  :key="optIdx"
                  @click="handleSelectOption(optIdx)"
                  :disabled="answerChecked"
                  class="w-full p-4 text-left rounded-control border-2 transition-all flex items-start gap-3 cursor-pointer min-h-[56px]"
                  :style="getOptionStyle(optIdx)"
                >
                  <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                        :style="selectedOption === optIdx
                          ? { background: 'var(--color-digital)', color: '#fff' }
                          : { background: 'var(--color-panel-muted)', color: 'var(--color-ink-soft)' }">
                    {{ String.fromCharCode(65 + optIdx) }}
                  </span>
                  <div class="text-base font-medium flex-1 text-slate-800" v-html="processMathText(opt.text)"></div>
                </button>
              </div>

              <!-- Feedback na antwoord -->
              <div v-if="answerChecked" class="mt-5 p-4 rounded-lg text-base leading-relaxed border"
                   :style="isCorrect
                     ? { background: 'var(--color-workbook-soft)', borderColor: 'var(--color-workbook)', color: 'var(--color-ink)' }
                     : { background: 'var(--color-presentation-soft)', borderColor: 'var(--color-presentation)', color: 'var(--color-ink)' }">
                <p class="font-bold mb-1">{{ isCorrect ? 'Juist beredeneerd!' : 'Niet juist' }}</p>
                <p v-html="processMathText(feedbackText)"></p>
              </div>

              <!-- Actieknoppen na keuze -->
              <div v-if="answerChecked" class="mt-4 flex justify-end">
                <button
                  v-if="isCorrect"
                  @click="handleNextStep"
                  class="btn btn-primary text-base flex items-center gap-2 cursor-pointer"
                  style="background: var(--color-digital);"
                >
                  <span>{{ derivationStep < derivationSteps.length - 1 ? 'Volgende denkstap' : 'Bekijk het eindresultaat' }}</span>
                  <PhArrowRight :size="18" weight="bold" />
                </button>
                <button
                  v-else
                  @click="resetCurrentChoice"
                  class="btn btn-secondary text-base flex items-center gap-2 cursor-pointer"
                >
                  <PhArrowCounterClockwise :size="18" weight="bold" />
                  <span>Kies opnieuw</span>
                </button>
              </div>
            </div>

            <!-- Overzicht van de afleiding tot nu toe -->
            <div class="p-4 rounded-card border mt-auto" style="background: var(--color-panel-muted); border-color: var(--color-line);">
              <div class="flex justify-between items-center mb-2">
                <h5 class="font-bold text-xs uppercase tracking-wider text-slate-600">Afleiding tot nu toe</h5>
                <button @click="resetAll" class="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer">
                  Herstarten
                </button>
              </div>
              <div class="space-y-1.5 text-sm text-slate-800">
                <div v-for="(s, sIdx) in revealedStepsList" :key="sIdx" class="flex items-center gap-2">
                  <PhCheck :size="16" weight="bold" class="text-workbook shrink-0" />
                  <span v-html="processMathText(s.formulaSummary)"></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Voltooid scherm -->
          <div v-else class="space-y-5 flex-1 flex flex-col justify-between">
            <div class="space-y-5">
              <div class="p-6 rounded-card border-2 text-center" style="background: var(--color-digital-soft); border-color: var(--color-digital);">
                <span class="text-xs uppercase font-bold tracking-wider text-slate-600">Eindformule</span>
                <div class="text-3xl font-bold my-3 text-slate-900" v-html="processMathText('\\[ \\mathbf{p_{\\text{tot}} = p_{\\text{atm}} + \\rho \\cdot g \\cdot h} \\]')"></div>
                <p class="text-slate-700 font-medium text-base" v-html="processMathText('De hydrostatische druk hangt uitsluitend af van de diepte \\( h \\) en de massadichtheid \\( \\rho \\).')">
                </p>
              </div>

              <div class="p-5 rounded-card border space-y-4" style="background: var(--color-panel); border-color: var(--color-line);">
                <h4 class="font-bold text-base text-slate-900">Wat bewijst deze afleiding?</h4>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style="background: var(--color-workbook); color: #fff;">
                    <PhCheck :size="14" weight="bold" />
                  </div>
                  <p class="text-sm text-slate-700 leading-relaxed" v-html="processMathText('<strong>Grondvlak \\( A \\) valt volledig weg:</strong> De druk hangt op geen enkele manier af van de oppervlakte van de bodem of de breedte van het vat.')">
                  </p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style="background: var(--color-workbook); color: #fff;">
                    <PhCheck :size="14" weight="bold" />
                  </div>
                  <p class="text-sm text-slate-700 leading-relaxed" v-html="processMathText('<strong>De hydrostatische paradox:</strong> Twee vaten met dezelfde vloeistof en hetzelfde vloeistofpeil hebben op de bodem exact dezelfde druk, ongeacht hun vorm.')">
                  </p>
                </div>
              </div>
            </div>

            <!-- Afrondknop -->
            <div class="pt-4 border-t" style="border-color: var(--color-line);">
              <button
                @click="handleComplete"
                class="w-full py-4 px-6 rounded-btn font-bold text-lg text-white transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                style="background: var(--color-digital);"
              >
                <PhCheckCircle :size="22" weight="bold" />
                <span>Activiteit voltooien</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { PhCalculator, PhX, PhCheckCircle, PhCheck, PhArrowRight, PhArrowCounterClockwise } from '@phosphor-icons/vue'
import { processMathText } from '../src/composables/useMathEngine.js'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'complete'])

const derivationStep = ref(0)
const selectedOption = ref(null)
const answerChecked = ref(false)
const isCorrect = ref(false)
const feedbackText = ref('')
const isCompleted = ref(false)

const derivationSteps = [
  {
    title: 'Stap 1: Balans van de krachten',
    question: 'We bekijken een denkbeeldige vloeistofkolom met grondvlak \\( A \\). Welke neerwaartse krachten drukken er in totaal op dit grondvlak?',
    options: [
      {
        text: 'Enkel de zwaartekracht op de waterkolom: \\( F_{tot} = m_{water} \\cdot g \\)',
        correct: false,
        feedback: 'Je vergeet de lucht! Bovenop de vloeistof duwt de atmosfeer ook mee naar beneden.'
      },
      {
        text: 'De zwaartekracht op de waterkolom én de kracht van de atmosfeer: \\( F_{tot} = F_{atm} + m_{water} \\cdot g \\)',
        correct: true,
        feedback: 'Uitstekend! De totale kracht op de bodem is het gewicht van het water PLUS de kracht van de lucht die op het wateroppervlak drukt.'
      },
      {
        text: 'De atmosferische druk vermenigvuldigd met de watermassa.',
        correct: false,
        feedback: 'Je kunt druk en massa niet zomaar vermenigvuldigen om een kracht te bekomen.'
      },
      {
        text: 'De opwaartse archimedeskracht van het water.',
        correct: false,
        feedback: 'We zoeken hier de *neerwaartse* krachten die de druk op de bodem veroorzaken, niet de opwaartse stuwkracht.'
      }
    ],
    promptText: 'Denkstap 1: Welke krachten drukken neerwaarts op het vlak A?',
    formulaDisplay: 'Bewezen stap 1: \\( F_{tot} = F_{atm} + m_{water} \\cdot g \\)',
    formulaSummary: '1. Krachtenbalans: \\( F_{tot} = F_{atm} + m_{water} \\cdot g \\)'
  },
  {
    title: 'Stap 2: Van kracht naar druk',
    question: 'We willen de totale druk \\( p \\) op de bodem kennen. Druk is kracht gedeeld door oppervlakte (\\( p = \\frac{F}{A} \\)). Wat wordt de vergelijking als we alles door \\( A \\) delen?',
    options: [
      {
        text: '\\( p = p_{atm} + m_{water} \\cdot g \\cdot A \\)',
        correct: false,
        feedback: 'Niet correct, je hebt de oppervlakte \\( A \\) vermenigvuldigd in de tweede term in plaats van erdoor te delen.'
      },
      {
        text: '\\( p = F_{atm} + \\frac{m_{water} \\cdot g}{A} \\)',
        correct: false,
        feedback: 'Je bent vergeten \\( F_{atm} \\) ook te delen door \\( A \\). Bedenk dat \\( \\frac{F_{atm}}{A} = p_{atm} \\).'
      },
      {
        text: '\\( p = p_{atm} + \\frac{m_{water} \\cdot g}{A} \\)',
        correct: true,
        feedback: 'Juist! We delen elke term door \\( A \\). \\( \\frac{F_{atm}}{A} \\) wordt de atmosferische druk \\( p_{atm} \\), en we houden \\( \\frac{m_{water} \\cdot g}{A} \\) over.'
      },
      {
        text: '\\( p = \\frac{p_{atm}}{A} + m_{water} \\cdot g \\)',
        correct: false,
        feedback: 'Je deelt de druk nog eens door de oppervlakte, dat is fysisch onzin.'
      }
    ],
    promptText: 'Denkstap 2: Deel beide kanten door het grondvlak A (\\( p = F/A \\)).',
    formulaDisplay: 'Bewezen stap 2: \\( p = p_{atm} + \\frac{m_{water} \\cdot g}{A} \\)',
    formulaSummary: '2. Delen door A: \\( p = p_{atm} + \\frac{m_{water} \\cdot g}{A} \\)'
  },
  {
    title: 'Stap 3: Massa en volume van de kolom',
    question: 'We kunnen de massa (\\( m_{water} \\)) herschrijven met de massadichtheid (\\( \\rho \\)). Voor een rechte kolom met grondvlak \\( A \\) en hoogte \\( h \\) is het volume \\( V = A \\cdot h \\). Hoe kunnen we de massa uitschrijven?',
    options: [
      {
        text: '\\( m_{water} = \\frac{\\rho}{A \\cdot h} \\)',
        correct: false,
        feedback: 'Niet juist, uit \\( \\rho = \\frac{m}{V} \\) volgt na vermenigvuldigen dat \\( m = \\rho \\cdot V \\).'
      },
      {
        text: '\\( m_{water} = \\rho \\cdot A \\cdot h \\)',
        correct: true,
        feedback: 'Klopt! Massa is dichtheid maal volume (\\( \\rho \\cdot V \\)), en het volume is \\( A \\cdot h \\). Dus: \\( m_{water} = \\rho \\cdot A \\cdot h \\).'
      },
      {
        text: '\\( m_{water} = \\rho + A \\cdot h \\)',
        correct: false,
        feedback: 'Grootheden met verschillende eenheden kun je niet optellen.'
      },
      {
        text: '\\( m_{water} = \\frac{A \\cdot h}{\\rho} \\)',
        correct: false,
        feedback: 'Eenheden controleren: volume gedeeld door dichtheid (m³ / (kg/m³)) levert geen kg (massa) op.'
      }
    ],
    promptText: 'Denkstap 3: Druk de watermassa uit via dichtheid ρ en hoogte h.',
    formulaDisplay: 'Bewezen stap 3: \\( m_{water} = \\rho \\cdot A \\cdot h \\)',
    formulaSummary: '3. Massa substitueren: \\( m_{water} = \\rho \\cdot A \\cdot h \\)'
  },
  {
    title: 'Stap 4: Het grote "aha"-moment',
    question: 'Vul de uitdrukking voor de massa nu in onze breuk in: \\( p = p_{atm} + \\frac{\\rho \\cdot A \\cdot h \\cdot g}{A} \\). Wat valt je wiskundig op aan deze vergelijking?',
    options: [
      {
        text: 'De dichtheid \\( \\rho \\) valt weg, de druk hangt enkel af van het grondvlak \\( A \\).',
        correct: false,
        feedback: 'Kijk goed naar de breuk: de \\( \\rho \\) staat alleen in de teller en verdwijnt dus niet.'
      },
      {
        text: 'De valversnelling \\( g \\) valt weg, vloeistofdruk is overal in het heelal gelijk.',
        correct: false,
        feedback: 'Zwaartekracht trekt nog steeds aan het water, \\( g \\) blijft absoluut in de formule.'
      },
      {
        text: 'Het grondvlak \\( A \\) valt weg! De druk hangt op geen enkele manier af van de breedte of oppervlakte van het vat!',
        correct: true,
        feedback: 'Exact! Omdat \\( A \\) zowel in de teller als noemer staat, kunnen we het wegdelen. Dit verklaart de hydrostatische paradox: vorm of breedte van het vat maken geen verschil, enkel de diepte \\( h \\) en dichtheid \\( \\rho \\)!'
      },
      {
        text: 'Niets valt weg, we moeten de oppervlakte van het vat altijd exact berekenen.',
        correct: false,
        feedback: 'Kijk naar de factor \\( A \\) in de teller en \\( A \\) in de noemer. Wat gebeurt er als je die deelt?'
      }
    ],
    promptText: 'Denkstap 4: Vul massa in de drukvergelijking in en vereenvoudig.',
    formulaDisplay: 'Bewezen stap 4: \\( p = p_{atm} + \\frac{\\rho \\cdot A \\cdot h \\cdot g}{A} = p_{atm} + \\rho \\cdot g \\cdot h \\)',
    formulaSummary: '4. \\( A \\) valt weg: \\( p = p_{atm} + \\rho \\cdot g \\cdot h \\)'
  }
]

const currentFormulaDisplay = computed(() => {
  if (isCompleted.value) {
    return 'Eindresultaat: \\( \\mathbf{p_{tot} = p_{atm} + \\rho \\cdot g \\cdot h} \\)'
  }
  const current = derivationSteps[derivationStep.value]
  // Pas het bewezen resultaat tonen zodra de leerling het juiste antwoord heeft aangeklikt!
  if (isCorrect.value && answerChecked.value) {
    return current.formulaDisplay
  }
  return current.promptText
})

const revealedStepsList = computed(() => {
  if (isCompleted.value) {
    return derivationSteps
  }
  return derivationSteps.slice(0, derivationStep.value + (isCorrect.value ? 1 : 0))
})

function handleSelectOption(idx) {
  if (answerChecked.value) return
  selectedOption.value = idx
  answerChecked.value = true
  const step = derivationSteps[derivationStep.value]
  const opt = step.options[idx]
  isCorrect.value = opt.correct
  feedbackText.value = opt.feedback
}

function resetCurrentChoice() {
  selectedOption.value = null
  answerChecked.value = false
  isCorrect.value = false
  feedbackText.value = ''
}

function handleNextStep() {
  if (derivationStep.value < derivationSteps.length - 1) {
    derivationStep.value++
    resetCurrentChoice()
  } else {
    isCompleted.value = true
  }
}

function resetAll() {
  derivationStep.value = 0
  isCompleted.value = false
  resetCurrentChoice()
}

function getOptionStyle(optIdx) {
  if (!answerChecked.value) {
    return selectedOption.value === optIdx
      ? { borderColor: 'var(--color-digital)', background: 'var(--color-digital-soft)' }
      : { borderColor: 'var(--color-line)', background: '#fff' }
  }
  const opt = derivationSteps[derivationStep.value].options[optIdx]
  if (opt.correct) {
    return { borderColor: 'var(--color-workbook)', background: 'var(--color-workbook-soft)' }
  }
  if (selectedOption.value === optIdx && !opt.correct) {
    return { borderColor: 'var(--color-presentation)', background: 'var(--color-presentation-soft)' }
  }
  return { borderColor: 'var(--color-line)', background: '#fff', opacity: 0.6 }
}

function handleClose() {
  emit('close')
}

// Escape sluit net als de X. @keydown.escape op de root werkt niet: die div
// krijgt nooit focus, dus de listener moet op window staan.
function handleKeydown(e) {
  if (e.key !== 'Escape' || !props.isOpen) return
  e.preventDefault()
  handleClose()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

function handleComplete() {
  emit('complete')
  emit('close')
}
</script>
