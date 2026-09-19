<script setup>
/**
 * NAAMKIEZER — vraagt eerst een wachtwoord.
 *
 * De namen staan in de publieke bundel; dit wachtwoord houdt leerlingen van de
 * knop, het beschermt de gegevens niet. Zie src/data/students.js.
 */
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { PhUserCircle, PhX, PhLockKey, PhArrowRight } from '@phosphor-icons/vue'
import { school } from '../data/subjects.js'

const props = defineProps({
    isOpen: Boolean,
    names: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['close'])

// ── Vergrendeling ────────────────────────────────────────────────────────────
// Ontgrendeld blijft ontgrendeld zolang de pagina open blijft, zodat je tijdens
// een les niet elke keer opnieuw moet intikken.
const unlocked = ref(false)
const codeInput = ref('')
const codeError = ref(false)
const codeField = ref(null)

// ── Namen ────────────────────────────────────────────────────────────────────
const selectedName = ref('')
const lastPickedName = ref('')
const isSpinning = ref(false)
const displayName = ref('')

function submitCode() {
    if (codeInput.value.trim().toLowerCase() === String(school.namePickerCode).toLowerCase()) {
        unlocked.value = true
        codeError.value = false
        codeInput.value = ''
        // Start meteen met kiezen
        setTimeout(() => pickRandomName(), 250)
    } else {
        codeError.value = true
        codeInput.value = ''
    }
}

function pickRandomName() {
    if (isSpinning.value) return
    if (!props.names || props.names.length === 0) return

    // Vermijd dezelfde naam twee keer na elkaar
    let availableNames = props.names.filter(name => name !== lastPickedName.value)
    if (availableNames.length === 0) availableNames = props.names

    isSpinning.value = true

    let cycles = 0
    const maxCycles = 20
    const baseInterval = 50

    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * props.names.length)
        displayName.value = props.names[randomIndex]
        cycles++

        if (cycles >= maxCycles) {
            clearInterval(interval)
            const finalIndex = Math.floor(Math.random() * availableNames.length)
            selectedName.value = availableNames[finalIndex]
            displayName.value = selectedName.value
            lastPickedName.value = selectedName.value
            isSpinning.value = false
        }
    }, baseInterval + (cycles * 5)) // Vertraagt geleidelijk
}

function close() {
    emit('close')
}

// Bij openen: altijd opnieuw om het wachtwoord vragen tenzij al ontgrendeld
watch(() => props.isOpen, async (isOpen) => {
    if (isOpen) {
        selectedName.value = ''
        displayName.value = ''
        codeError.value = false

        if (unlocked.value) {
            setTimeout(() => pickRandomName(), 300)
        } else {
            await nextTick()
            codeField.value?.focus()
        }
    }
})

function handleKeydown(e) {
    if (!props.isOpen) return

    if (e.key === 'Escape') {
        e.preventDefault()
        e.stopImmediatePropagation()
        close()
    } else if (unlocked.value && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault()
        pickRandomName()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isOpen" class="fixed inset-0 z-[10020] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm">

                <button @click="close" class="absolute top-6 right-6 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <PhX class="text-2xl" />
                </button>

                <!-- ── VERGRENDELD ───────────────────────────────────────── -->
                <div v-if="!unlocked" class="text-center px-8 w-full max-w-md">

                    <div class="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 bg-slate-700">
                        <PhLockKey class="text-6xl text-white/80" weight="fill" />
                    </div>

                    <p class="text-2xl text-white/60 mb-2 font-medium">Naamkiezer vergrendeld</p>
                    <p class="text-white/30 text-sm mb-8">Voer de code in om verder te gaan.</p>

                    <form @submit.prevent="submitCode" class="flex flex-col items-center gap-4">
                        <input
                            ref="codeField"
                            v-model="codeInput"
                            type="password"
                            autocomplete="off"
                            placeholder="Code"
                            :class="[
                                'w-64 px-5 py-3 rounded-xl bg-white/10 border text-white text-center text-xl tracking-widest outline-none transition-colors',
                                codeError ? 'border-red-400 placeholder-red-300' : 'border-white/20 focus:border-amber-400'
                            ]"
                        />

                        <button
                            type="submit"
                            class="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-xl text-base uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/30 flex items-center gap-2"
                        >
                            Ontgrendelen
                            <PhArrowRight weight="bold" />
                        </button>

                        <p v-if="codeError" class="text-red-300 text-sm font-medium">
                            Onjuiste code.
                        </p>
                    </form>
                </div>

                <!-- ── ONTGRENDELD ───────────────────────────────────────── -->
                <div v-else class="text-center px-8">

                    <div :class="[
                        'w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-300',
                        isSpinning ? 'bg-amber-500 animate-pulse' : 'bg-amber-600'
                    ]">
                        <PhUserCircle class="text-7xl text-white" weight="fill" />
                    </div>

                    <p class="text-2xl text-white/60 mb-4 font-medium">Wie mag antwoorden?</p>

                    <div class="min-h-[120px] flex items-center justify-center">
                        <h1 :class="[
                            'font-bold text-white transition-all duration-200',
                            isSpinning ? 'text-6xl text-white/70' : 'text-8xl md:text-9xl'
                        ]">
                            {{ displayName || '...' }}
                        </h1>
                    </div>

                    <div class="mt-10 flex flex-col items-center gap-3">
                        <button
                            @click="pickRandomName"
                            :disabled="isSpinning || names.length === 0"
                            class="px-8 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-black rounded-xl text-base uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/30"
                        >
                            {{ isSpinning ? 'Kiezen...' : 'Opnieuw' }}
                        </button>

                        <p v-if="names.length === 0" class="text-white/40 text-sm">
                            Geen namen gevonden voor deze klas.
                        </p>
                        <p v-else class="text-white/30 text-xs font-medium tracking-wider uppercase">
                            Spatie of Enter om opnieuw te kiezen &nbsp;&bull;&nbsp; Esc om te sluiten
                        </p>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
