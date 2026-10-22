<script setup>
import { ref, reactive, watch, computed, onMounted, onUnmounted, nextTick, h } from 'vue'

import { provide } from 'vue'
import SlideDiscipline from '../presentation/SlideDiscipline.vue'
import SlideTitle from '../presentation/SlideTitle.vue'
import SlideHero from '../presentation/SlideHero.vue'
import SlideStandard from '../presentation/SlideStandard.vue'
import SlideSteps from '../presentation/SlideSteps.vue'
import SlideExercise from '../presentation/SlideExercise.vue'
import SlideEquation from '../presentation/SlideEquation.vue'
import SlideComparison from '../presentation/SlideComparison.vue'
import SlideSplit from '../presentation/SlideSplit.vue'
import SlideMathGraph from '../presentation/SlideMathGraph.vue'
import SlideImageGrid from '../presentation/SlideImageGrid.vue'
import SlideBig from '../presentation/SlideBig.vue'
import SlideMultichoice from '../presentation/SlideMultichoice.vue'
import SlidePredict from '../presentation/SlidePredict.vue'
import SlideRealworld from '../presentation/SlideRealworld.vue'
import SlideRecap from '../presentation/SlideRecap.vue'
import SlideSummary from '../presentation/SlideSummary.vue'
import SlideImageHero from '../presentation/SlideImageHero.vue'
import SlideClosing from '../presentation/SlideClosing.vue'
import SlideDefinition from '../presentation/SlideDefinition.vue'
import SlideWorkedExample from '../presentation/SlideWorkedExample.vue'
import SlideBookExample from '../presentation/SlideBookExample.vue'
import SlideValueTable from '../presentation/SlideValueTable.vue'
import SlideProperties from '../presentation/SlideProperties.vue'
import SlideEquationSolver from '../presentation/SlideEquationSolver.vue'
import SlideTheoremProof from '../presentation/SlideTheoremProof.vue'

const layoutComponentMap = {
    'discipline': SlideDiscipline,
    'title': SlideTitle,
    'hero': SlideHero,
    'standard': SlideStandard,
    'steps': SlideSteps,
    'exercise': SlideExercise,
    'equation': SlideEquation,
    'comparison': SlideComparison,
    'split': SlideSplit,
    'math-graph': SlideMathGraph,
    'image-grid': SlideImageGrid,
    'big': SlideBig,
    'multichoice': SlideMultichoice,
    'predict': SlidePredict,
    'realworld': SlideRealworld,
    'recap': SlideRecap,
    'summary': SlideSummary,
    'image-hero': SlideImageHero,
    'closing': SlideClosing,
    'definition': SlideDefinition,
    'worked-example': SlideWorkedExample,
    'book-example': SlideBookExample,
    'value-table': SlideValueTable,
    'properties': SlideProperties,
    'equation-solver': SlideEquationSolver,
    'theorem-proof': SlideTheoremProof
}

import {
  PhX, PhCaretLeft, PhCaretRight,
  PhCheckCircle, PhPlayCircle, PhQuestion,
  PhArrowsOutSimple,
  PhSpeakerHigh, PhSpeakerSlash,
  PhFinnTheHuman,
  PhWarning, PhLightbulb, PhStar, PhXCircle,
  PhFlag, PhArrowsClockwise, PhGlobeHemisphereWest, PhTrophy, PhFunction, PhTriangle, PhMedal,
  PhUsers, PhBrain, PhTarget, PhChartLineUp, PhWrench, PhArrowDown, PhTrendDown, PhArrowFatDown, PhArrowLineDown, PhUploadSimple,
  PhBookOpen, PhHandPointing, PhHourglassLow, PhUserFocus,
  PhLink, PhCopy, PhCheck, PhDesktop, PhInfo, PhNotePencil, PhCircle,
  PhBookOpenText, PhChalkboardTeacher, PhTable, PhListChecks, PhGraph, PhCalculator, PhInfinity
} from '@phosphor-icons/vue'
import MathGraphSvg from '../activities/MathGraphSvg.vue'

const props = defineProps({
  isOpen: Boolean,
  slides: {
    type: Array,
    required: true
  },
  config: {
    type: Object,
    default: () => ({})
  },
  showDisciplineSlide: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'complete'])

const currentSlide = ref(0)
const revealedSteps = ref(0)
const selectedAnswer = ref(null)
const showCorrectPopup = ref(false)
const transitionName = ref('slide')
const linkCopied = ref(false)

// SCALING LOGIC
const scale = ref(1)
const stageRef = ref(null)
const containerRef = ref(null)
const exerciseScrollRef = ref(null)

function updateScale() {
  if (!containerRef.value) return
  const parentW = containerRef.value.clientWidth
  const parentH = containerRef.value.clientHeight
  
  // Fit to screen by choosing the smallest scale factor
  const scaleH = parentH / 1080
  const scaleW = parentW / 1920
  scale.value = Math.min(scaleH, scaleW)
}

// --- HELPERS ---
function cleanUrl(url) {
    if (!url) return ''
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

async function copyLink(url) {
    if (!url) return
    try {
        await navigator.clipboard.writeText(url)
        linkCopied.value = true
        setTimeout(() => linkCopied.value = false, 2000)
    } catch {
        window.open(url, '_blank')
    }
}

// --- DISCIPLINE SLIDE (auto-generated, matches reference design) ---
const disciplineSlide = computed(() => ({
    layout: 'discipline',
    cursusLink: props.config?.cursusLink || '',
    rules: props.config?.disciplineRules || [
        { text: 'In <span class="text-slide-red">stilte</span> binnenkomen en plaatsnemen.' },
        { text: '<span class="text-slide-red">Jassen uit</span>, cursus op de bank klaarleggen.' },
        { text: '<span class="text-slide-red">Rust</span> bewaren: praten enkel na hand opsteken en toestemming.' },
        { text: 'Samen werken van de eerste tot de <span class="text-slide-red">laatste minuut</span>.' }
    ]
}))

// --- SLIDES (with conditionally injected discipline slide) ---
const parsedCursusLink = computed(() => {
    const link = props.config?.cursusLink || 'albertshalaj.github.io/lesmateriaal'
    try {
        const u = new URL(link.startsWith('http') ? link : 'https://' + link)
        return { domain: u.hostname, path: u.pathname !== '/' ? u.pathname : '' }
    } catch {
        const parts = link.split('/')
        if (parts.length > 1) return { domain: parts[0], path: '/' + parts.slice(1).join('/') }
        return { domain: 'albertshalaj.github.io', path: link.startsWith('/') ? link : '/' + link }
    }
})

const slidesCopy = computed(() => {
    if (!props.slides) return []
    const processedSlides = props.slides.map(slide => {
        if (slide.layout === 'recap' && slide.questions) {
            return {
                ...slide,
                questions: slide.questions.map(q => ({ ...q, revealed: false }))
            }
        }
        return slide
    })
    // Only prepend discipline slide for first/default deck
    if (props.showDisciplineSlide && props.config) {
        return [disciplineSlide.value, ...processedSlides]
    }
    return processedSlides
})

const slides = computed(() => slidesCopy.value)
const totalSlides = computed(() => slides.value.length)
const progressPercentage = computed(() => ((currentSlide.value + 1) / totalSlides.value) * 100)
// Optional authored contents list, outside the slide canvas. Large book decks
// remain usable without clicking through every preceding solution.
const sections = computed(() => slides.value.flatMap((slide, index) => slide.section ? [{ index, label: slide.section }] : []))
const activeSection = computed(() => sections.value.filter(section => section.index <= currentSlide.value).at(-1)?.index ?? '')
function jumpToSection(event) {
    const index = Number(event.target.value)
    if (!Number.isInteger(index) || index < 0 || index >= totalSlides.value) return
    transitionName.value = index < currentSlide.value ? 'slide-back' : 'slide'
    currentSlide.value = index
    revealedSteps.value = 0
    selectedAnswer.value = null
    showCorrectPopup.value = false
}

const currentMathConfigForAnalysis = computed(() => {
    const slide = slides.value[currentSlide.value];
    if (!slide || slide.layout !== 'math-graph') return null;
    return slide.steps?.[revealedSteps.value]?.mathConfig || slide.mathConfig || null;
});

function nextSlide() {
  if (currentSlide.value < totalSlides.value - 1) {
    transitionName.value = 'slide'
    currentSlide.value++
    revealedSteps.value = 0
    selectedAnswer.value = null
  }
}

// A single reveal count drives arrows, Space, Back and the disabled state.
// Worked examples may consume their first step as the problem statement.
function revealLimit(slide) {
    if (!slide) return 0
    if (slide.layout === 'predict') return (slide.revealText || slide.answer) ? 1 : 0
    if (slide.layout === 'recap') return slide.questions?.length || 0
    if (slide.layout === 'math-graph' || slide.layout === 'equation-solver') {
        return Math.max(0, (slide.steps?.length || 0) - 1)
    }
    if (slide.layout === 'worked-example') {
        const first = slide.steps?.[0]
        const consumesProblem = !slide.problem && ['Situatie', 'Opgave'].includes(first?.label)
        return Math.max(0, (slide.steps?.length || 0) - (consumesProblem ? 1 : 0))
    }
    if (['steps', 'theorem-proof', 'exercise', 'book-example'].includes(slide.layout)) return slide.steps?.length || 0
    return 0
}

const hasNextReveal = computed(() => {
    const slide = slides.value[currentSlide.value]
    // Exercise answers retain the separate teacher-unlock shortcut.
    return slide?.layout !== 'exercise' && revealedSteps.value < revealLimit(slide)
})
const canAdvance = computed(() => hasNextReveal.value || currentSlide.value < totalSlides.value - 1)
const canGoBack = computed(() => currentSlide.value > 0 || revealedSteps.value > 0)

function advancePresentation() {
    if (hasNextReveal.value) revealNextStep(revealLimit(slides.value[currentSlide.value]))
    else nextSlide()
}

function prevSlide() {
    if (revealedSteps.value > 0 && revealLimit(slides.value[currentSlide.value]) > 0) {
        reverseStep()
    } else if (currentSlide.value > 0) {
        transitionName.value = 'slide-back'
        currentSlide.value--
        revealedSteps.value = 0
        selectedAnswer.value = null
    }
}

function revealNextStep(maxSteps) {
    if (revealedSteps.value < maxSteps) {
        revealedSteps.value++
        nextTick(() => {
            if (exerciseScrollRef.value) {
                const items = exerciseScrollRef.value.querySelectorAll('.exercise-step')
                if (items[revealedSteps.value - 1]) {
                    items[revealedSteps.value - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                }
            }
        })
    }
}

function reverseStep() {
    if (revealedSteps.value > 0) {
        revealedSteps.value--
        nextTick(() => {
            if (exerciseScrollRef.value) {
                const items = exerciseScrollRef.value.querySelectorAll('.exercise-step')
                if (items[revealedSteps.value - 1]) {
                    items[revealedSteps.value - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                }
            }
        })
    }
}

function selectAnswer(option) {
    selectedAnswer.value = option.id
    if (option.correct) {
        showCorrectPopup.value = true
        setTimeout(() => showCorrectPopup.value = false, 2000)
    }
}

function finish() {
    emit('complete')
    emit('close')
}

watch(() => props.isOpen, (val) => {
    if (!val) {
        if (document.fullscreenElement) document.exitFullscreen().catch(e => {})
        setTimeout(() => {
            currentSlide.value = 0
            revealedSteps.value = 0
            selectedAnswer.value = null
            linkCopied.value = false
        }, 500)
        window.removeEventListener('resize', updateScale)
        window.removeEventListener('keydown', handleKeydown)
    } else {
        window.addEventListener('keydown', handleKeydown)
        window.addEventListener('resize', updateScale)
        nextTick(() => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(e => {
                    console.log('Fullscreen request denied:', e)
                })
            }
            updateScale()
        })
    }
})

// Keyboard navigation
function handleKeydown(e) {
    if (!props.isOpen) return

    // Sluiten met Escape, net als de X rechtsboven. In native fullscreen pakt de
    // browser Escape soms zelf; dan sluit handleFullscreenChange de presentatie.
    if (e.key === 'Escape') {
        e.preventDefault()
        emit('close')
        return
    }

    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return

    if (e.key === 's' || e.key === 'S') {
        e.preventDefault()
        const slide = slides.value[currentSlide.value]
        if (!slide) return
        
        const isStepsLayout = ['steps', 'exercise', 'worked-example', 'recap', 'equation-solver', 'theorem-proof', 'book-example'].includes(slide.layout)
        const maxSteps = revealLimit(slide)

        // The displayed S hint on a thinking question must match Space/click.
        if (slide.layout === 'predict') {
            revealNextStep(maxSteps)
            return
        }

        if (isStepsLayout && maxSteps && revealedSteps.value < maxSteps) {
            if (localStorage.getItem('teacher_unlocked') !== 'true') {
                const correctPwd = props.config?.groenAntwoord || '1234'
                const pwd = window.prompt('Leerkracht-beveiliging:\nVoer het wachtwoord in om antwoorden te onthullen:')
                if (pwd && pwd.trim().toLowerCase() === correctPwd.toLowerCase()) {
                    localStorage.setItem('teacher_unlocked', 'true')
                    revealNextStep(maxSteps)
                } else if (pwd !== null) {
                    alert('Ongeldig wachtwoord.')
                }
            } else {
                revealNextStep(maxSteps)
            }
        }
        return
    }

    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        advancePresentation()
    }
    if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
    }
}

const handleFullscreenChange = () => {
    // Fullscreen verandert de viewportgrootte; opnieuw meten, anders blijft de
    // slide op de oude schaal staan.
    nextTick(updateScale)
    if (props.isOpen && !document.fullscreenElement) {
        emit('close')
    }
}

// De stage hangt aan de grootte van de container: volg die ook als de klas een
// chromebook dichtklapt of de projector van resolutie wisselt.
let resizeObserver = null

onMounted(() => {
    window.addEventListener('resize', updateScale)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    // Eenmalig meten bij het openen. Zonder dit blijft de schaal op 1 tot de
    // gebruiker het venster aanraakt en steekt de slide buiten het scherm.
    updateScale()
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', updateScale)
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
    resizeObserver?.disconnect()
})

watch(containerRef, (el) => {
    resizeObserver?.disconnect()
    if (!el || typeof ResizeObserver === 'undefined') return
    resizeObserver = new ResizeObserver(updateScale)
    resizeObserver.observe(el)
})

const iconMap = {
    lightbulb: PhLightbulb, star: PhStar,
    check: PhCheckCircle, x: PhXCircle,
    function: PhFunction, triangle: PhTriangle, users: PhUsers,
    brain: PhBrain, target: PhTarget, 'presentation-chart': PhChartLineUp,
    wrench: PhWrench, globe: PhGlobeHemisphereWest,
    'arrow-down': PhArrowDown, 'trend-down': PhTrendDown,
    'arrow-fat-down': PhArrowFatDown, 'arrow-line-down': PhArrowLineDown,
    'arrow-from-surface': (props) => h(PhUploadSimple, { ...props, style: 'transform: scaleY(-1)' }),
    'upload-simple': PhUploadSimple, 'book-open': PhBookOpen,
    'hand-pointing': PhHandPointing, 'hourglass': PhHourglassLow,
    'user-focus': PhUserFocus, 'speaker-slash': PhSpeakerSlash,
    info: PhInfo,
    'definition': PhBookOpenText,
    'worked-example': PhChalkboardTeacher,
    'value-table': PhTable,
    'properties': PhListChecks,
    'graph': PhGraph,
    'calculator': PhCalculator,
    'infinity': PhInfinity,
    'exercise': PhNotePencil,
    'comparison': PhChartLineUp,
    'steps': PhListChecks,
    'formula': PhFunction,
    'chart': PhChartLineUp,
    'ruler': PhArrowLineDown,
    'compass': PhTriangle,
    'pi': PhFunction
}


provide('resolveImageUrl', resolveImageUrl)
provide('iconMap', iconMap)

function resolveImageUrl(url) {
    if (!url) return ''
    if (url.startsWith('http') || url.startsWith('data:')) return url
    const baseUrl = import.meta.env.BASE_URL || '/'
    let normalizedUrl = url
    if (normalizedUrl.startsWith('./')) normalizedUrl = normalizedUrl.substring(2)
    if (normalizedUrl.startsWith('/')) normalizedUrl = normalizedUrl.substring(1)
    return baseUrl.endsWith('/') ? baseUrl + normalizedUrl : baseUrl + '/' + normalizedUrl
}
</script>

<template>
<Teleport to="body">
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-[9999] bg-slide-paper text-slate-900 flex flex-col font-sans overflow-hidden w-screen h-screen">
            
            <!-- Voortgangsbalk: rood anker, want dit is een presentatie -->
            <div class="absolute top-0 left-0 right-0 h-3 z-[70]" style="background: var(--color-slide-soft);">
                <div class="h-full slide-anchor" :style="{ width: progressPercentage + '%' }"></div>
            </div>

            <label v-if="sections.length" class="presentation-contents">
                <span>Ga naar</span>
                <select aria-label="Kies een onderdeel of boekopgave" :value="activeSection" @change="jumpToSection">
                    <option v-if="activeSection === ''" value="" disabled>Kies een onderdeel</option>
                    <option v-for="section in sections" :key="section.index" :value="section.index">{{ section.label }}</option>
                </select>
            </label>

            <!-- Sluiten: buiten het 1920x1080-canvas, dus echte schermpunten.
                 Blijft bewust klein: dit is bediening voor de leerkracht, geen
                 leesvlak voor de klas. -->
            <div class="absolute top-5 right-5 z-50">
                <button @click="emit('close')" class="btn-close" style="background: var(--color-panel); border: 2px solid var(--color-line-strong);" aria-label="Sluiten">
                    <PhX class="text-xl" />
                </button>
            </div>

            <!-- Statische statusmelding: geen confetti, geen overlay over het hele
                 scherm. Valt buiten het canvas en is dus een schermmaat; hij moet
                 vanachter in de klas nog leesbaar zijn, vandaar deze maat. -->
            <div v-if="showCorrectPopup" class="fixed inset-0 z-[150] pointer-events-none flex items-center justify-center">
                <div class="bg-white px-12 py-8 rounded-card flex items-center gap-6" style="border: 2px solid var(--color-workbook); box-shadow: var(--shadow-dialog);">
                    <div class="w-16 h-16 rounded-control flex items-center justify-center shrink-0" style="background: var(--color-workbook-soft); color: var(--color-workbook);">
                        <PhCheck weight="bold" class="text-4xl" />
                    </div>
                    <span class="text-4xl font-bold text-slate-900">Juist</span>
                </div>
            </div>
            
            <div ref="containerRef" class="slide-viewport">
                <div ref="stageRef" class="ppt-stage" :style="{ transform: `scale(${scale})` }">
                    
                    <Transition :name="transitionName">
                        <div :key="currentSlide" class="absolute inset-0 w-full h-full">
                            
                            <div class="w-full h-full relative">
                                
                                <component 
                                    v-if="slides[currentSlide] && layoutComponentMap[slides[currentSlide].layout]"
                                    :is="layoutComponentMap[slides[currentSlide].layout]" 
                                    :slide="slides[currentSlide]"
                                    :revealedSteps="revealedSteps"
                                    :parsedCursusLink="parsedCursusLink"
                                    :currentMathConfigForAnalysis="currentMathConfigForAnalysis"
                                    @revealNext="revealNextStep"
                                    @selectAnswer="selectAnswer"
                                    @copyLink="copyLink"
                                    @showCorrectPopup="() => { showCorrectPopup = true; setTimeout(() => showCorrectPopup = false, 2000) }"
                                />
                                <div v-else-if="slides[currentSlide]" class="flex items-center justify-center w-full h-full bg-paper text-slide-heading text-presentation">
                                    Onbekende slidelayout: {{ slides[currentSlide].layout }}
                                </div>
                                <div v-else class="flex items-center justify-center w-full h-full bg-paper text-slide-heading text-slate-700">
                                    Geen slides beschikbaar.
                                </div>

                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Voetnavigatie: bediening voor de leerkracht, dus echte
                     schermpunten. Groot genoeg om te raken, klein genoeg om
                     niet met de slide te wedijveren. -->
                <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[80] bg-white rounded-control" style="border: 2px solid var(--color-line-strong);">
                    <button @click.stop="prevSlide" class="btn-close" :disabled="!canGoBack" aria-label="Vorige slide">
                        <PhCaretLeft class="text-xl" />
                    </button>
                    
                    <span class="font-mono text-base font-semibold tracking-[0.08em] text-slate-800 min-w-[4.5rem] text-center select-none">{{ currentSlide + 1 }} / {{ totalSlides }}</span>

                    <button @click.stop="advancePresentation" class="btn-close" aria-label="Volgende slide"
                            :disabled="!canAdvance">
                        <PhCaretRight class="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</Teleport>
</template>

<style scoped>
.presentation-contents { position: absolute; top: 20px; left: 20px; z-index: 80; display: flex; align-items: center; gap: 8px; max-width: calc(100vw - 104px); background: var(--color-panel); color: var(--color-ink); padding: 4px 8px; border: 2px solid var(--color-line-strong); border-radius: var(--radius-control); }
.presentation-contents select { min-width: 0; max-width: 360px; padding: 4px; color: var(--color-ink); background: var(--color-panel); }
@media (max-width: 600px) { .presentation-contents span { display: none; } .presentation-contents select { max-width: 220px; } }
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}
.exercise-scroll::-webkit-scrollbar {
    width: 8px;
}
.exercise-scroll::-webkit-scrollbar-track {
    background: transparent;
}
.exercise-scroll::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}
.exercise-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
}
</style>
