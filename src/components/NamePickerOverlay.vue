<script setup>
/**
 * NAAMKIEZER - vraagt eerst een wachtwoord.
 *
 * De namen staan in de publieke bundel; dit wachtwoord houdt leerlingen van de
 * knop, het beschermt de gegevens niet. Zie src/data/students.js.
 */
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { PhX, PhLockKey, PhArrowRight } from '@phosphor-icons/vue'
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
            <!-- Naamkiezer: licht, egaal vlak. Geen blur, geen doorschijnende
                 tekst. De gekozen naam is het grootste element op het scherm,
                 zodat de klas hem vanaf de achterste rij leest. -->
            <div v-if="isOpen" class="modal-fullscreen">

                <button @click="close" class="btn-close absolute top-6 right-6 z-10" aria-label="Sluiten">
                    <PhX class="text-2xl" />
                </button>

                <!-- ── VERGRENDELD ───────────────────────────────────────── -->
                <div v-if="!unlocked" class="flex-1 flex flex-col items-center justify-center px-8">

                    <div class="w-24 h-24 rounded-full flex items-center justify-center mb-8" style="background: var(--color-panel-muted);">
                        <PhLockKey class="text-5xl" style="color: var(--color-ink-soft);" weight="fill" />
                    </div>

                    <p class="text-2xl font-bold text-slate-800 mb-2">Naamkiezer vergrendeld</p>
                    <p class="text-base text-slate-600 mb-8">Voer de code in om verder te gaan.</p>

                    <form @submit.prevent="submitCode" class="flex flex-col items-center gap-4">
                        <input
                            ref="codeField"
                            v-model="codeInput"
                            type="password"
                            autocomplete="off"
                            placeholder="Code"
                            :class="[
                                'w-64 px-5 py-3 rounded-control bg-white border-2 text-slate-800 text-center text-xl tracking-widest outline-none transition-colors',
                                codeError ? 'border-red-400 placeholder-red-300' : 'border-slate-300 focus:border-slate-700'
                            ]"
                        />

                        <button
                            type="submit"
                            class="btn btn-primary"
                            style="min-height: 48px; padding: 0 32px;"
                        >
                            Ontgrendelen
                            <PhArrowRight weight="bold" />
                        </button>

                        <p v-if="codeError" class="text-base font-medium" style="color: var(--color-presentation);">
                            Onjuiste code.
                        </p>
                    </form>
                </div>

                <!-- ── ONTGRENDELD ───────────────────────────────────────── -->
                <div v-else class="flex-1 flex flex-col items-center justify-center px-8 text-center">

                    <p class="fullscreen-label mb-6">Wie mag antwoorden?</p>

                    <div class="min-h-[160px] flex items-center justify-center">
                        <p :class="[
                            'font-bold transition-opacity duration-200',
                            isSpinning ? 'text-5xl text-slate-600' : 'text-7xl md:text-8xl text-slate-900'
                        ]">
                            {{ displayName || '...' }}
                        </p>
                    </div>

                    <div class="mt-10 flex flex-col items-center gap-3">
                        <button
                            @click="pickRandomName"
                            :disabled="isSpinning || names.length === 0"
                            class="btn btn-primary"
                            style="min-height: 48px; padding: 0 32px;"
                        >
                            {{ isSpinning ? 'Kiezen...' : 'Opnieuw' }}
                        </button>

                        <p v-if="names.length === 0" class="text-base text-slate-600">
                            Geen namen gevonden voor deze klas.
                        </p>
                        <p v-else class="text-sm text-slate-500 font-medium tracking-wider uppercase">
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
