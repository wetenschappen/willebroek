<script setup>
import { PhPlay, PhPause, PhStop, PhPencilSimple } from '@phosphor-icons/vue'
import { ref, watch, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  startDuration: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close'])

// STATE
const isExpanded = ref(false)
const isRunning = ref(false)
const timeLeft = ref(0)
const initialTime = ref(0)
const inputMins = ref(0)
const inputSecs = ref(0)

let intervalId = null
let audioCtx = null

// WATCHERS
watch(() => props.startDuration, (newVal) => {
    if (newVal > 0) {
        inputMins.value = newVal.toString().padStart(2, '0')
        inputSecs.value = '00'
        timeLeft.value = newVal * 60
        initialTime.value = timeLeft.value
        startTimer()
    }
})

// SYNC INPUTS ON OPEN
watch(isExpanded, (val) => {
    if (val) {
        // Sync inputs to current remaining time (rounded up to minutes? No, exact)
        const m = Math.floor(timeLeft.value / 60)
        const s = timeLeft.value % 60
        inputMins.value = m.toString().padStart(2, '0')
        inputSecs.value = s.toString().padStart(2, '0')
    }
})

// TIMER LOGIC
function startTimer() {
    // Parse text inputs "05" -> 5
    // Only update if we are not RESUMING (checking if timeLeft matches inputs approximately? No, just restart if expanded)
    if (isExpanded.value) {
         const m = parseInt(inputMins.value) || 0
         const s = parseInt(inputSecs.value) || 0
         if (m === 0 && s === 0) return

         timeLeft.value = m * 60 + s
         initialTime.value = timeLeft.value
    }

    isRunning.value = true
    isExpanded.value = false // Auto collapse when running

    // Audio Context Resume
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    if (audioCtx.state === 'suspended') audioCtx.resume()

    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(tick, 1000)
}

function tick() {
    if (timeLeft.value > 0) {
        timeLeft.value--
    } else {
        finish()
    }
}

function pauseTimer() {
    isRunning.value = false
    clearInterval(intervalId)
}

function togglePlayPause() {
    if (isRunning.value) {
        pauseTimer()
    } else {
        // If it was finished (00:00), we probably shouldn't just "resume" 0.
        // But stopTimer resets to 0.
        // If paused at >0, start.
        if (timeLeft.value > 0) startTimer()
    }
}

function stopTimer() {
    pauseTimer()
    timeLeft.value = 0
    initialTime.value = 0
}

function finish() {
    pauseTimer()
    playAlarm()
}

// AUDIO
function playAlarm() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    const now = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    // ALARM: More aggressive
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.setValueAtTime(440, now + 0.2)
    osc.frequency.setValueAtTime(880, now + 0.4)
    osc.frequency.setValueAtTime(440, now + 0.6)
    osc.frequency.setValueAtTime(880, now + 0.8) // Extra beeps
    osc.frequency.setValueAtTime(440, now + 1.0)

    gain.gain.setValueAtTime(0.5, now)
    gain.gain.linearRampToValueAtTime(0.8, now + 0.5) // Loud
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2)

    osc.start(now)
    osc.stop(now + 1.2)
}

// FORMATTING
const formattedTime = computed(() => {
    const m = Math.floor(timeLeft.value / 60).toString().padStart(2, '0')
    const s = (timeLeft.value % 60).toString().padStart(2, '0')
    return `${m}:${s}`
})

function applySetup() {
    startTimer()
}

function padInput(type) {
    if (type === 'min') {
        let val = parseInt(inputMins.value) || 0
        if (val < 0) val = 0
        if (val > 99) val = 99
        inputMins.value = val.toString().padStart(2, '0')
    } else {
        let val = parseInt(inputSecs.value) || 0
        if (val < 0) val = 0
        if (val > 59) val = 59
        inputSecs.value = val.toString().padStart(2, '0')
    }
}

function enforceTwoDigits(type) {
    const val = type === 'min' ? inputMins.value : inputSecs.value
    // Keep only digits
    const clean = val.replace(/\D/g, '')
    // Trim to 2
    const trimmed = clean.slice(0, 2)

    if (type === 'min') inputMins.value = trimmed
    else inputSecs.value = trimmed
}
</script>

<template>
  <div>
      <!-- ALARM: statische, contrastrijke toestand.
           Geen blur, pulse, bounce of glow: op een beamer is een vaste rode
           balk met grote tekst beter leesbaar dan een bewegend effect. -->
      <Teleport to="body">
          <div
            v-if="timeLeft === 0 && initialTime > 0"
            class="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style="background: var(--color-paper);"
          >
              <div class="w-full" style="border-top: 16px solid var(--color-presentation);"></div>

              <div class="flex flex-1 flex-col items-center justify-center px-8 text-center">
                  <p class="fullscreen-label mb-6" style="color: var(--color-presentation);">
                      Tijd voorbij
                  </p>

                  <p
                    class="font-mono font-bold tabular-nums"
                    style="color: var(--color-ink); font-size: clamp(6rem, 18vw, 13rem); line-height: 1; letter-spacing: -0.02em;"
                  >
                      00:00
                  </p>

                  <button class="btn btn-primary mt-12" style="min-height: 56px; padding: 0 40px; font-size: 1.125rem;" @click="stopTimer">
                      Sluiten
                  </button>
              </div>

              <div class="w-full" style="border-top: 16px solid var(--color-presentation);"></div>
          </div>
      </Teleport>

      <!-- INLINE TIMER (No Teleport - renders where placed) -->
      <div class="relative">
           <!-- The Pill - Compact for thin header -->
          <div class="flex items-center gap-4 h-full">
              <!-- Timer Display - Bigger & integrated -->
              <div
                  class="font-mono font-bold text-2xl tracking-widest tabular-nums leading-none"
                  :class="{'text-slate-500': timeLeft === 0 && initialTime === 0, 'text-emerald-400': isRunning && timeLeft > 0, 'text-red-100 font-black': timeLeft === 0 && initialTime > 0}"
              >
                  {{ formattedTime }}
              </div>

              <!-- Divider -->
              <div class="h-6 w-px bg-slate-700/50"></div>

              <!-- Controls -->
              <div class="flex items-center gap-1">
                  <!-- 1. Play/Pause -->
                  <button
                      @click="togglePlayPause"
                      class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 transition-colors"
                      :class="(!isRunning && timeLeft > 0) ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-500 hover:text-white'"
                      :disabled="timeLeft === 0 && !isRunning"
                      :title="(!isRunning && timeLeft > 0) ? 'Hervat' : 'Pauze'"
                  >
                      <component :is="(!isRunning && timeLeft > 0) ? PhPlay : PhPause" weight="fill" class="text-sm" />
                  </button>

                  <!-- 2. Stop -->
                  <button
                      @click="stopTimer"
                      class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-600 hover:text-red-500 transition-colors"
                      title="Stop"
                  >
                      <PhStop weight="fill" class="text-sm" />
                  </button>

                  <!-- 3. Edit (Pencil) -->
                  <button
                      @click="isExpanded = !isExpanded"
                      class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-600 hover:text-white transition-colors"
                      :class="{'bg-slate-800 text-white': isExpanded}"
                      title="Instellingen"
                  >
                      <PhPencilSimple weight="bold" class="text-sm" />
                  </button>
              </div>
          </div>

          <!-- EXPANDED SETUP VIEW (Dropdown) -->
          <div
              v-if="isExpanded"
              class="absolute right-0 top-full mt-2 bg-white rounded-card border-2 w-[260px] p-4 flex flex-col z-[100] origin-top-right"
              style="border-color: var(--color-line-strong); box-shadow: var(--shadow-dialog);"
          >
              <div class="mb-3 text-center">
                  <span class="text-sm font-bold text-slate-600 uppercase tracking-widest">Stel timer in</span>
              </div>

              <!-- Inputs -->
              <div class="flex items-center justify-center gap-2 mb-4">
                    <input
                      type="text"
                      inputmode="numeric"
                      maxlength="2"
                      v-model="inputMins"
                      @focus="$event.target.select()"
                      @blur="padInput('min')"
                      @input="enforceTwoDigits('min')"
                      class="w-16 text-4xl text-center font-bold text-slate-800 border-b-2 border-slate-300 focus:border-slate-700 outline-none bg-transparent p-1 font-mono selection:bg-slate-200 placeholder:text-slate-500"
                      placeholder="00"
                    />
                    <span class="text-2xl text-slate-500 font-light pb-2 select-none">:</span>
                    <input
                      type="text"
                      inputmode="numeric"
                      maxlength="2"
                      v-model="inputSecs"
                      @focus="$event.target.select()"
                      @blur="padInput('sec')"
                      @input="enforceTwoDigits('sec')"
                      class="w-16 text-4xl text-center font-bold text-slate-800 border-b-2 border-slate-300 focus:border-slate-700 outline-none bg-transparent p-1 font-mono selection:bg-slate-200 placeholder:text-slate-500"
                      placeholder="00"
                    />
              </div>

              <!-- Start Button -->
              <button
                  @click="applySetup"
                  class="btn btn-primary w-full"
              >
                    <PhPlay weight="fill" />
                    Start timer
              </button>
          </div>
      </div>
  </div>
</template>

<style scoped>
/* Geen floatIn-animatie meer: de dropdown verschijnt direct, zonder beweging. */
</style>
