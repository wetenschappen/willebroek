<script setup>
import { ref, computed } from 'vue'
import {
    PhWrench, PhX, PhFilePdf, PhEnvelope, PhCheck,
    PhLink, PhMathOperations, PhFunction, PhGraph,
    PhLockKey, PhAtom, PhLeaf, PhDna, PhTree
} from '@phosphor-icons/vue'

const props = defineProps({
    subject: { type: String, default: 'physics' },
    extraTools: { type: Array, default: () => [] }
})

const isOpen = ref(false)
const toggle = () => isOpen.value = !isOpen.value
const close  = () => isOpen.value = false

const emit = defineEmits(['open-tool', 'open-pdf'])

// ── Teacher email ──────────────────────────────────────
const teacherEmail = 'albert.shalaj@gmail.com'
const copied = ref(false)
function copyEmail() {
    navigator.clipboard.writeText(teacherEmail)
    copied.value = true
    setTimeout(() => { copied.value = false; close() }, 2000)
}

// ── External links ─────────────────────────────────────
const FORMULARIA = {
    physics: { url: 'https://albertshalaj.github.io/lesmateriaal/', label: 'Formularium', subtitle: 'Fysische formules' },
    biology: { url: 'https://albertshalaj.github.io/lesmateriaal/', label: 'Lesmateriaal', subtitle: 'Overzichten en naslag' }
}

const formularium = computed(() => FORMULARIA[props.subject] || FORMULARIA.physics)

// ── Gereedschap per vak ────────────────────────────────
const COMMON_TOOLS = [
    {
        label: 'Desmos Calculator',
        subtitle: 'Wetenschappelijke rekenmachine',
        url: 'https://www.desmos.com/scientific',
        icon: PhMathOperations,
        color: 'bg-slate-100 text-slate-700'
    },
    {
        label: 'Desmos Grafieken',
        subtitle: 'Interactieve grafiekenplotter',
        url: 'https://www.desmos.com/calculator',
        icon: PhGraph,
        color: 'bg-slate-100 text-slate-700'
    }
]

const SUBJECT_TOOLS = {
    physics: [
        ...COMMON_TOOLS,
        {
            label: 'PhET Simulaties',
            subtitle: 'Fysica simulaties',
            url: 'https://phet.colorado.edu/nl/simulations/browse',
            icon: PhAtom,
            color: 'bg-blue-100 text-blue-700'
        },
        {
            label: 'Formuleblad',
            subtitle: 'Fysische formules',
            url: 'https://albertshalaj.github.io/lesmateriaal/',
            icon: PhFunction,
            color: 'bg-cyan-100 text-cyan-700'
        }
    ],
    biology: [
        {
            label: 'Bioplek',
            subtitle: 'Uitleg biologie',
            url: 'https://www.bioplek.org/',
            icon: PhLeaf,
            color: 'bg-slate-100 text-slate-700'
        },
        {
            label: 'Biodigital',
            subtitle: '3D modellen menselijk lichaam',
            url: 'https://human.biodigital.com/',
            icon: PhDna,
            color: 'bg-green-100 text-green-700'
        },
        {
            label: 'PhET Simulaties',
            subtitle: 'Biologie simulaties',
            url: 'https://phet.colorado.edu/nl/simulations/browse',
            icon: PhTree,
            color: 'bg-slate-100 text-slate-700'
        }
    ]
}

const subjectTools = computed(() => SUBJECT_TOOLS[props.subject] || COMMON_TOOLS)

// Extra tools icon map (from lesson config)
const iconMap = { PhFilePdf, PhLink, PhMathOperations, PhGraph, PhFunction, PhLockKey }

function openLink(url) {
    window.open(url, '_blank')
    close()
}

function openTool(tool) {
    emit('open-tool', tool)
    close()
}

function openPdf() {
    emit('open-pdf')
    close()
}
</script>

<template>
  <div>
    <!-- ── FAB BUTTON ──────────────────────────────────── -->
    <button
        @click="toggle"
        class="fab-btn"

        title="Werkbalk"
    >
        <PhWrench v-if="!isOpen" weight="bold" />
        <PhX v-else weight="bold" />
    </button>

    <!-- ── PANEL ──────────────────────────────────────── -->
    <!-- Backdrop (mobile) -->
    <div
        v-if="isOpen"
        class="fixed inset-0 z-30 sm:hidden"
        @click="close"
    ></div>

    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-2"
    >
        <div
            v-if="isOpen"
            class="fixed bottom-24 right-6 z-40 w-72 bg-white rounded-card overflow-hidden origin-bottom-right" style="border: 2px solid var(--color-line-strong); box-shadow: var(--shadow-dialog);"
        >
            <!-- Panel header -->
            <div class="bg-slate-900 px-4 py-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <PhWrench weight="bold" class="text-white text-base" />
                    <span class="text-xs font-black text-white uppercase tracking-widest">Werkbalk</span>
                </div>
                <button @click="close" class="btn-close-dark !p-1">
                    <PhX weight="bold" class="text-sm" />
                </button>
            </div>

            <div class="max-h-[70vh] overflow-y-auto">

                <!-- ── SECTION: Les ─────────────────────────────── -->
                <div class="px-3 pt-3 pb-1">
                    <p class="text-[11px] font-bold text-slate-700 uppercase tracking-[0.12em] px-2 mb-1.5">Les</p>

                    <!-- Correctiesleutel — top of list -->
                    <button @click="openTool('solutions')" class="tool-item w-full">
                        <div class="w-8 h-8 rounded-control bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                            <PhLockKey weight="bold" class="text-base" />
                        </div>
                        <div class="flex-1 text-left">
                            <div class="text-sm font-semibold text-slate-800 leading-tight">Correctiesleutel</div>
                            <div class="text-[11px] text-slate-600">Beveiligd met wachtwoord</div>
                        </div>
                        <span class="badge badge-neutral flex-shrink-0">Slot</span>
                    </button>

                    <!-- Cursus PDF -->
                    <button @click="openPdf()" class="tool-item w-full">
                        <div class="w-8 h-8 rounded-control bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                            <PhFilePdf weight="bold" class="text-base" />
                        </div>
                        <div class="flex-1 text-left">
                            <div class="text-sm font-semibold text-slate-800 leading-tight">Lege Cursus</div>
                            <div class="text-[11px] text-slate-600">Open cursus als PDF</div>
                        </div>
                    </button>

                    <!-- Formularium -->
                    <button @click="openLink(formularium.url)" class="tool-item w-full">
                        <div class="w-8 h-8 rounded-control bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                            <PhMathOperations weight="bold" class="text-base" />
                        </div>
                        <div class="flex-1 text-left">
                            <div class="text-sm font-semibold text-slate-800 leading-tight">{{ formularium.label }}</div>
                            <div class="text-[11px] text-slate-600">{{ formularium.subtitle }}</div>
                        </div>
                    </button>

                    <!-- Dynamic Extra Tools from lesson config -->
                    <button
                        v-for="(tool, idx) in extraTools"
                        :key="idx"
                        @click="openLink(tool.url)"
                        class="tool-item w-full"
                    >
                        <div class="w-8 h-8 rounded-control bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                            <component :is="iconMap[tool.icon] || PhLink" weight="bold" class="text-base" :class="tool.color || 'text-slate-500'" />
                        </div>
                        <div class="flex-1 text-left">
                            <div class="text-sm font-semibold text-slate-800 leading-tight">{{ tool.label }}</div>
                        </div>
                    </button>
                </div>

                <div class="mx-3 border-t border-slate-100 my-1"></div>

                <!-- ── SECTION: Rekenmachines ────────────────────── -->
                <div class="px-3 pb-1">
                    <p class="text-[11px] font-bold text-slate-700 uppercase tracking-[0.12em] px-2 mb-1.5 pt-2">Rekenmachines</p>

                    <button
                        v-for="tool in subjectTools"
                        :key="tool.label"
                        @click="openLink(tool.url)"
                        class="tool-item w-full"
                    >
                        <div class="w-8 h-8 rounded-control flex items-center justify-center flex-shrink-0" :class="tool.color">
                            <component :is="tool.icon" weight="bold" class="text-base" />
                        </div>
                        <div class="flex-1 text-left">
                            <div class="text-sm font-semibold text-slate-800 leading-tight">{{ tool.label }}</div>
                            <div class="text-[11px] text-slate-600">{{ tool.subtitle }}</div>
                        </div>
                    </button>
                </div>

                <div class="mx-3 border-t border-slate-100 my-1"></div>

                <!-- ── SECTION: Hulp ─────────────────────────────── -->
                <div class="px-3 pb-3">
                    <p class="text-[11px] font-bold text-slate-700 uppercase tracking-[0.12em] px-2 mb-1.5 pt-2">Contact</p>

                    <!-- Email copy button -->
                    <button
                        @click="copyEmail"
                        class="tool-item w-full"
                        :class="copied ? 'bg-slate-50' : ''"
                    >
                        <template v-if="copied">
                            <div class="w-8 h-8 rounded-control bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                                <PhCheck weight="bold" class="text-base" />
                            </div>
                            <div class="flex-1 text-left">
                                <div class="text-sm font-semibold text-slate-900 leading-tight">Gekopieerd!</div>
                                <div class="text-[11px] text-slate-600">Klaar om te plakken</div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="w-8 h-8 rounded-control bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                <PhEnvelope weight="bold" class="text-base" />
                            </div>
                            <div class="flex-1 text-left">
                                <div class="text-sm font-semibold text-slate-800 leading-tight">Mail de leerkracht</div>
                                <div class="text-[11px] text-slate-600">Klik om e-mailadres te kopiëren</div>
                            </div>
                        </template>
                    </button>
                </div>
            </div>
        </div>
    </Transition>
  </div>
</template>
