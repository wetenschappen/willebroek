<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { PhArrowLeft, PhArrowRight, PhCheckCircle, PhPause, PhXCircle } from '@phosphor-icons/vue'
import { lesson, steps } from './lesson.js'
import { advance, answerQuestion, canAdvance, confirmHelp, firstTrySummary, freshProgress, loadProgress, saveProgress } from './progress.js'

// Sommige browsers weigeren zelfs het opvragen van localStorage.
let storage
try { storage = window.localStorage } catch { /* Verder werken zonder opslag. */ }
const loaded = loadProgress(storage)
const state = ref(loaded.state)
const storageAvailable = ref(loaded.available)
const started = ref(false)
const resetConfirm = ref(false)
const selected = ref(null)
const checks = ref([])
const helpConfirmed = ref(false)
const submitted = ref(false)
const heading = ref(null)
const body = ref(null)
const feedback = ref(null)
const step = computed(() => steps[state.value.current])
const finished = computed(() => state.value.completed.length === steps.length)
const response = computed(() => state.value.responses[step.value?.id])
const quizLocked = computed(() => Boolean(response.value && (step.value?.diagnostic || response.value.last === step.value?.answer || response.value.assisted)))
const progress = computed(() => Math.round(state.value.completed.length / steps.length * 100))
const entryResult = computed(() => firstTrySummary(state.value, item => item.diagnostic))
const finalResult = computed(() => firstTrySummary(state.value, item => item.final))
const workReady = computed(() => step.value?.type !== 'work' || step.value.checks.every((_, index) => checks.value.includes(index)))
const ready = computed(() => step.value && workReady.value && canAdvance(state.value, step.value))
const bookStep = computed(() => step.value && step.value.type !== 'quiz')
const feedbackVisible = computed(() => response.value && (submitted.value || quizLocked.value))

watch(state, value => { storageAvailable.value = saveProgress(storage, value) }, { deep: true })

async function focusScreen() {
  await nextTick()
  body.value?.scrollTo({ top: 0 })
  heading.value?.focus()
}
function prepareScreen() {
  selected.value = response.value?.last ?? null
  checks.value = state.value.completed.includes(step.value?.id) ? step.value.checks?.map((_, index) => index) ?? [] : []
  helpConfirmed.value = false
  submitted.value = Boolean(response.value)
  focusScreen()
}
watch(() => state.value.current, prepareScreen)
function start() {
  started.value = true
  prepareScreen()
}
function pause() {
  started.value = false
  resetConfirm.value = false
  focusScreen()
}
async function checkAnswer() {
  if (selected.value === null) return
  state.value = answerQuestion(state.value, step.value, selected.value)
  submitted.value = true
  await nextTick()
  feedback.value?.scrollIntoView({ block: 'nearest' })
}
function next() {
  if (!ready.value) return
  state.value = advance(state.value)
}
function previous() {
  if (state.value.current > 0) state.value = { ...state.value, current: state.value.current - 1 }
}
function restart() {
  state.value = freshProgress()
  resetConfirm.value = false
  start()
}
function acceptHelp() {
  if (helpConfirmed.value) state.value = confirmHelp(state.value)
}
</script>

<template>
  <div class="modal-fullscreen energy-shell" @keydown.esc="started && pause()">
    <header class="fullscreen-bar" :class="started && bookStep ? 'fullscreen-bar-paper' : 'fullscreen-bar-digital'">
      <div class="energy-header">
        <strong class="fullscreen-title">Energie</strong>
        <span class="energy-class">4NAWE / 4SPOWE · Les 1</span>
      </div>
      <button v-if="started" class="btn btn-ghost" @click="pause"><PhPause aria-hidden="true" :size="20" /> Pauzeren</button>
    </header>

    <div class="energy-progress-copy">
      <span v-if="started && step">Stap {{ state.current + 1 }} van {{ steps.length }} · {{ step.section }}</span>
      <span v-else>{{ finished ? 'Deze les is afgerond' : 'Energie in systemen' }}</span>
      <span>{{ state.completed.length }} / {{ steps.length }} afgerond</span>
    </div>
    <div class="fullscreen-progress energy-progress" role="progressbar" aria-label="Afgeronde stappen in deze les" :aria-valuenow="state.completed.length" :aria-valuemax="steps.length" aria-valuemin="0">
      <span :style="{ width: progress + '%' }"></span>
    </div>

    <main ref="body" class="fullscreen-body">
      <div class="energy-sheet">
        <p v-if="!storageAvailable" class="energy-notice" role="status">Je browser kan je voortgang niet bewaren. Je kunt verder werken, maar houd dit tabblad open.</p>

        <template v-if="!started">
          <p class="eyebrow">{{ lesson.subtitle }}</p>
          <h1 ref="heading" tabindex="-1">{{ finished ? 'Je startles is klaar' : 'Stap voor stap aan de slag' }}</h1>
          <p class="energy-lead">{{ lesson.title }}</p>
          <p>Leg je boek, schrift en pen klaar. Je krijgt telkens één opdracht. Je antwoorden schrijf je in je boek of schrift.</p>
          <p class="energy-reference">Theorie p. {{ lesson.pages }} · oefeningen p. 85–86<br />{{ lesson.duration }}</p>
          <p v-if="state.completed.length && !finished">Je kunt verder bij stap {{ state.current + 1 }}. Je eerdere antwoorden zijn bewaard{{ storageAvailable ? ' in deze browser' : ' zolang dit tabblad openblijft' }}.</p>
          <p v-else-if="finished">Je hebt de eerste les doorlopen. De energieformules en de rest van T2 volgen later.</p>
          <p class="energy-small">{{ storageAvailable ? 'Voortgang wordt alleen op dit apparaat en in deze browser bewaard. Gebruik op een gedeeld apparaat “Opnieuw beginnen”.' : 'Er is geen account of online opslag.' }}</p>
          <button class="btn btn-primary energy-primary" @click="start">
            {{ finished ? 'Bekijk mijn afronding' : state.completed.length || state.responses[steps[1].id] ? 'Ga verder waar je gebleven was' : 'Start het leerpad' }}
            <PhArrowRight aria-hidden="true" :size="22" />
          </button>
          <div v-if="state.completed.length || Object.keys(state.responses).length" class="energy-reset">
            <button v-if="!resetConfirm" class="btn btn-ghost" @click="resetConfirm = true">Opnieuw beginnen</button>
            <div v-else class="energy-notice">
              <p>Je wist daarmee alle voortgang en antwoorden van deze les in deze browser. Zeker?</p>
              <button class="btn btn-primary" @click="restart">Ja, opnieuw beginnen</button>
              <button class="btn btn-ghost" @click="resetConfirm = false">Annuleren</button>
            </div>
          </div>
        </template>

        <template v-else-if="step">
          <div class="energy-source">
            <span class="badge" :class="bookStep ? 'badge-paper' : 'badge-digital'">{{ bookStep ? 'Boek / bundel' : 'Digitaal' }}</span>
            <span>{{ step.source }}</span>
          </div>
          <h1 ref="heading" tabindex="-1">{{ step.title }}</h1>
          <p v-if="step.diagnostic" class="energy-small">Kies eerst uit je hoofd. Dit is een opfrissing, geen toets op punten.</p>
          <template v-if="step.type !== 'quiz'">
            <p v-for="instruction in step.instructions" :key="instruction">{{ instruction }}</p>
            <p v-if="step.note" class="energy-notice">{{ step.note }}</p>
            <fieldset v-if="step.type === 'work'" class="energy-checklist">
              <legend>Vink pas aan als je het gemaakt hebt.</legend>
              <label v-for="(check, index) in step.checks" :key="check">
                <input v-model="checks" type="checkbox" :value="index" />
                <span>{{ check }}</span>
              </label>
            </fieldset>
          </template>
          <form v-else @submit.prevent="checkAnswer">
            <fieldset class="energy-question" :disabled="quizLocked">
              <legend>{{ step.question }}</legend>
              <label v-for="(option, index) in step.options" :key="option" class="ticket-option energy-option" :class="{ 'ticket-option-selected': selected === index }">
                <input v-model="selected" class="ticket-option-radio" type="radio" :name="step.id" :value="index" @change="submitted = false" />
                <span>{{ option }}</span>
              </label>
            </fieldset>
            <button v-if="!quizLocked" class="btn btn-primary energy-primary" type="submit" :disabled="selected === null">Controleer mijn antwoord</button>
            <div aria-live="polite" aria-atomic="true">
              <div v-if="feedbackVisible" ref="feedback" class="energy-feedback" :class="response.last === step.answer ? 'energy-feedback-correct' : 'energy-feedback-retry'">
                <strong class="energy-feedback-title">
                  <PhCheckCircle v-if="response.last === step.answer" :size="24" aria-hidden="true" />
                  <PhXCircle v-else :size="24" aria-hidden="true" />
                  {{ response.last === step.answer ? 'Juist' : step.diagnostic ? 'Even opfrissen' : response.assisted ? 'Met hulp verder' : 'Nog niet juist' }}
                </strong>
                <p>{{ response.last === step.answer ? step.correct : step.hint }}</p>
                <p v-if="!step.diagnostic && !quizLocked">Raadpleeg je boek. Kies daarna opnieuw en controleer je antwoord.</p>
              </div>
            </div>
          </form>
          <div v-if="step.type === 'quiz' && !step.diagnostic && response?.count >= 2 && !quizLocked" class="energy-notice">
            <p><strong>Loop je vast?</strong> Roep je leerkracht erbij en bespreek de vraag. Daarna kun je met hulp verder.</p>
            <label class="energy-help"><input v-model="helpConfirmed" type="checkbox" /> Ik heb deze vraag met mijn leerkracht besproken.</label>
            <button class="btn btn-ghost" :disabled="!helpConfirmed" @click="acceptHelp">Verder met hulp mogelijk maken</button>
          </div>
        </template>

        <template v-else>
          <p class="eyebrow">Einde van les 1</p>
          <h1 ref="heading" tabindex="-1">Je bent klaar voor vandaag</h1>
          <p>Je hebt systemen, energie-eenheden en energievormen herhaald.</p>
          <h2>Je boekwerk</h2>
          <p>Oefeningen 1 en 2 op p. 85 en oefening 4 op p. 86 zijn door jou als gemaakt aangeduid. Je leerkracht kan je uitwerking nakijken.</p>
          <h2>Je korte controles</h2>
          <p>Opfrissing: {{ entryResult.correct }} van {{ entryResult.total }} juist bij de eerste poging.</p>
          <p>Eindcheck: {{ finalResult.correct }} van {{ finalResult.total }} juist bij de eerste poging.</p>
          <p v-if="finalResult.assisted">Bij {{ finalResult.assisted }} eindvraag/vragen ging je met hulp verder. Bespreek die nog eens met je leerkracht.</p>
          <p class="energy-notice">De balk toont afgeronde stappen, geen cijfer of bewijs dat je alles beheerst.</p>
          <h2>Volgende les</h2>
          <p>We gaan verder met de energieformules vanaf p. 80. Oefening 3 en oefeningen 5–10 horen bij het vervolg; die zitten nog niet in dit leerpad.</p>
          <p>Is de les nog niet voorbij? Leg je uitwerkingen klaar en laat je leerkracht weten dat je klaar bent.</p>
        </template>
      </div>
    </main>

    <footer v-if="started" class="fullscreen-foot energy-footer">
      <button v-if="state.current > 0" class="btn btn-ghost" @click="previous"><PhArrowLeft aria-hidden="true" :size="20" /> Vorige</button>
      <span v-else></span>
      <div class="energy-forward">
        <span v-if="step?.type === 'work' && !workReady" class="energy-small">Maak het boekwerk en vink het aan.</span>
        <span v-else-if="step?.type === 'quiz' && !ready" class="energy-small">Beantwoord eerst de vraag.</span>
        <button v-if="step" class="btn btn-primary energy-primary" :disabled="!ready" @click="next">
          {{ step.next || (state.current === steps.length - 1 ? 'Bekijk mijn afronding' : 'Verder') }}
          <PhArrowRight aria-hidden="true" :size="22" />
        </button>
        <button v-else class="btn btn-primary energy-primary" @click="pause">Afronding bewaren en stoppen</button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.energy-shell { height: 100dvh; }
.energy-header { display: flex; flex: 1; flex-wrap: wrap; align-items: baseline; gap: 8px 24px; }
.energy-class, .energy-small { color: var(--color-ink-soft); font-size: 1rem; line-height: 1.5; }
.energy-progress-copy { display: flex; flex-shrink: 0; justify-content: space-between; flex-wrap: wrap; gap: 8px; padding: 16px 32px; font-size: 1rem; font-weight: 600; background: var(--color-panel); }
.energy-progress { height: 8px; flex-shrink: 0; border-bottom: 2px solid var(--color-line); }
.energy-sheet { max-width: 760px; margin: 0 auto; padding: 16px 0 32px; font-size: 1.25rem; line-height: 1.65; }
.energy-sheet h1 { margin: 16px 0 24px; font-size: clamp(2rem, 4vw, 2.75rem); line-height: 1.15; font-weight: 600; letter-spacing: -0.025em; }
.energy-sheet h1:focus { outline: none; box-shadow: none; }
.energy-sheet h2 { margin: 32px 0 8px; font-size: 1.5rem; font-weight: 600; }
.energy-sheet p { margin-bottom: 24px; }
.energy-lead { font-weight: 600; font-size: 1.5rem; }
.energy-reference { padding-left: 16px; border-left: 6px solid var(--color-workbook); font-weight: 600; }
.energy-source { display: flex; align-items: center; flex-wrap: wrap; gap: 12px 16px; font-size: 1.0625rem; font-weight: 600; }
.energy-source .badge { font-size: 0.8125rem; }
.energy-notice { margin: 24px 0; padding: 16px 24px; border: 2px solid var(--color-line); border-radius: var(--radius-control); background: var(--color-panel); font-size: 1.0625rem; }
.energy-notice p:last-child { margin-bottom: 0; }
.energy-question { min-width: 0; margin: 0 0 24px; }
.energy-question legend { margin-bottom: 24px; font-size: 1.375rem; font-weight: 600; line-height: 1.5; }
.energy-option { display: flex; gap: 16px; align-items: flex-start; padding: 16px 24px; border-width: 2px; border-style: solid; border-radius: var(--radius-control); margin-bottom: 12px; cursor: pointer; }
.energy-option input { margin-top: 6px; flex-shrink: 0; }
.energy-question:disabled .energy-option { cursor: default; }
.energy-checklist { margin-top: 32px; }
.energy-checklist legend { padding: 0 0 16px; font-weight: 600; }
.energy-checklist label, .energy-help { display: flex; align-items: flex-start; gap: 16px; padding: 12px 0; cursor: pointer; }
.energy-checklist input, .energy-help input { width: 24px; height: 24px; flex-shrink: 0; margin-top: 4px; accent-color: var(--color-workbook); }
.energy-feedback { padding: 24px; margin-top: 24px; border: 2px solid var(--color-line); border-left-width: 6px; border-radius: var(--radius-control); }
.energy-feedback-correct { background: var(--color-workbook-soft); border-color: var(--color-workbook); }
.energy-feedback-retry { background: var(--color-digital-soft); border-color: var(--color-digital); }
.energy-feedback-title { display: flex; align-items: center; gap: 12px; }
.energy-feedback p { margin: 12px 0 0; }
.energy-primary { min-height: 48px; padding: 12px 24px; font-size: 1.0625rem; }
.energy-reset { margin-top: 24px; }
.energy-footer { justify-content: space-between; gap: 16px; padding-top: 16px; padding-bottom: max(16px, env(safe-area-inset-bottom)); }
.energy-forward { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 8px 24px; }
button:disabled { cursor: not-allowed; background: var(--color-panel-muted); color: var(--color-ink-soft); border: 2px solid var(--color-line); box-shadow: none; }
@media (max-width: 640px) {
  .energy-progress-copy { padding: 12px 24px; }
  .energy-sheet { font-size: 1.125rem; padding-top: 0; }
  .energy-header { flex-direction: column; gap: 4px; }
  .energy-class { font-size: 0.875rem; }
  .energy-option { padding: 16px; }
  .energy-footer { align-items: stretch; }
  .energy-forward { flex: 1; }
  .energy-forward .energy-small { width: 100%; text-align: right; }
  .energy-primary { padding: 12px 16px; }
}
</style>
