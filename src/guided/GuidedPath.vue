<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { PhArrowLeft, PhArrowRight, PhCheckCircle, PhPause, PhXCircle } from '@phosphor-icons/vue'
import { createProgressSystem } from './progress.js'
import MathText from './MathText.vue'
import { questionFeedback } from './feedback.js'

const props = defineProps({
  lesson: { type: Object, required: true },
  steps: { type: Array, required: true },
  storageKey: { type: String, required: true },
})
const { lesson, steps } = props
const { advance, answerQuestion, canAdvance, confirmHelp, firstTrySummary, freshProgress, loadProgress, saveProgress, setWorkChecks } = createProgressSystem(lesson, steps, props.storageKey)

// Sommige browsers weigeren zelfs het opvragen van localStorage.
let storage
try { storage = window.localStorage } catch { /* Verder werken zonder opslag. */ }
const loaded = loadProgress(storage)
const state = ref(loaded.state)
const storageAvailable = ref(loaded.available)
const started = ref(false)
const resetConfirm = ref(false)
const selected = ref(null)
const helpConfirmed = ref(false)
const submitted = ref(false)
const heading = ref(null)
const body = ref(null)
const feedback = ref(null)
const step = computed(() => steps[state.value.current])
const checks = computed({
  get: () => state.value.workChecks[step.value?.id] ?? [],
  set: value => { state.value = setWorkChecks(state.value, value) },
})
const finished = computed(() => state.value.completed.length === steps.length)
const response = computed(() => state.value.responses[step.value?.id])
const quizLocked = computed(() => Boolean(response.value && (step.value?.diagnostic || response.value.last === step.value?.answer || response.value.assisted)))
const progress = computed(() => Math.round(state.value.completed.length / steps.length * 100))
const entryResult = computed(() => firstTrySummary(state.value, item => item.diagnostic))
const finalResult = computed(() => firstTrySummary(state.value, item => item.final))
const workReady = computed(() => step.value?.type !== 'work' || step.value.completion === 'button' || step.value.checks.every((_, index) => checks.value.includes(index)))
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
  helpConfirmed.value = false
  submitted.value = Boolean(response.value)
  focusScreen()
}
watch(() => state.value.current, prepareScreen)
function start() {
  if (finished.value) state.value = { ...state.value, current: steps.length }
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
  <div class="modal-fullscreen guided-shell" @keydown.esc="started && pause()">
    <header class="fullscreen-bar" :class="started && bookStep ? 'fullscreen-bar-paper' : 'fullscreen-bar-digital'">
      <div class="guided-header">
        <strong class="fullscreen-title"><MathText :text="lesson.headerTitle" /></strong>
        <span class="guided-class"><MathText :text="lesson.headerContext" /></span>
      </div>
      <button v-if="started" class="btn btn-ghost" @click="pause"><PhPause aria-hidden="true" :size="20" /> Pauzeren</button>
    </header>

    <div class="guided-progress-copy">
      <span v-if="started && step">Stap {{ state.current + 1 }} van {{ steps.length }} · <MathText :text="step.section" /></span>
      <span v-else><MathText :text="finished ? 'Deze les is afgerond' : lesson.title" /></span>
      <span>{{ state.completed.length }} / {{ steps.length }} afgerond</span>
    </div>
    <div class="fullscreen-progress guided-progress" role="progressbar" aria-label="Afgeronde stappen in deze les" :aria-valuenow="state.completed.length" :aria-valuemax="steps.length" aria-valuemin="0">
      <span :style="{ width: progress + '%' }"></span>
    </div>

    <main ref="body" class="fullscreen-body">
      <div class="guided-sheet">
        <p v-if="!storageAvailable" class="guided-notice" role="status">Je browser kan je voortgang niet bewaren. Je kunt verder werken, maar houd dit tabblad open.</p>

        <template v-if="!started">
          <p class="eyebrow"><MathText :text="lesson.subtitle" /></p>
          <h1 ref="heading" tabindex="-1"><MathText :text="finished ? lesson.finishedTitle || 'Deze les is klaar' : 'Stap voor stap aan de slag'" /></h1>
          <p class="guided-lead"><MathText :text="lesson.title" /></p>
          <p><MathText :text="lesson.homeDescription" /></p>
          <p class="guided-reference"><MathText :text="lesson.reference" /><br /><MathText :text="lesson.duration" /></p>
          <p v-if="state.completed.length && !finished">Je kunt verder bij stap {{ state.current + 1 }}. Je eerdere antwoorden zijn bewaard{{ storageAvailable ? ' in deze browser' : ' zolang dit tabblad openblijft' }}.</p>
          <p v-else-if="finished"><MathText :text="lesson.homeFinished" /></p>
          <p class="guided-small">{{ storageAvailable ? 'Voortgang wordt alleen op dit apparaat en in deze browser bewaard. Gebruik op een gedeeld apparaat “Opnieuw beginnen”.' : 'Er is geen account of online opslag.' }}</p>
          <button class="btn btn-primary guided-primary" @click="start">
            {{ finished ? 'Bekijk mijn afronding' : state.current || Object.keys(state.responses).length ? 'Ga verder waar je gebleven was' : 'Start het leerpad' }}
            <PhArrowRight aria-hidden="true" :size="22" />
          </button>
          <div v-if="state.completed.length || Object.keys(state.responses).length" class="guided-reset">
            <button v-if="!resetConfirm" class="btn btn-ghost" @click="resetConfirm = true">Opnieuw beginnen</button>
            <div v-else class="guided-notice">
              <p>Je wist daarmee alle voortgang en antwoorden van deze les in deze browser. Zeker?</p>
              <button class="btn btn-primary" @click="restart">Ja, opnieuw beginnen</button>
              <button class="btn btn-ghost" @click="resetConfirm = false">Annuleren</button>
            </div>
          </div>
        </template>

        <template v-else-if="step">
          <div class="guided-source">
            <span class="badge" :class="bookStep ? 'badge-paper' : 'badge-digital'">{{ bookStep ? 'Boek / bundel' : 'Digitaal' }}</span>
            <span><MathText :text="step.source" /></span>
          </div>
          <h1 ref="heading" tabindex="-1"><MathText :text="step.title" /></h1>
          <p v-if="step.diagnostic" class="guided-small">Kies eerst uit je hoofd. Dit is een opfrissing, geen toets op punten.</p>
          <template v-if="step.type !== 'quiz'">
            <p v-for="instruction in step.instructions" :key="instruction"><MathText :text="instruction" /></p>
            <section v-if="step.strategy?.length" class="guided-strategy" aria-label="Oplossingsstrategie">
              <h2>Zo pak je het aan</h2>
              <ol>
                <li v-for="item in step.strategy" :key="item"><MathText :text="item" /></li>
              </ol>
            </section>
            <p v-if="step.note" class="guided-notice"><MathText :text="step.note" /></p>
            <p v-if="step.links?.length" class="guided-links">
              <a v-for="link in step.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer"><MathText :text="link.label" /> (nieuw tabblad)</a>
            </p>
            <details v-if="step.support" :key="step.id" class="guided-support">
              <summary>Ik heb een aanwijzing nodig</summary>
              <p v-for="hint in step.support" :key="hint"><MathText :text="hint" /></p>
            </details>
            <fieldset v-if="step.type === 'work' && step.completion !== 'button'" class="guided-checklist">
              <legend>Vink pas aan als je het gemaakt hebt.</legend>
              <label v-for="(check, index) in step.checks" :key="check">
                <input v-model="checks" type="checkbox" :value="index" :disabled="state.completed.includes(step.id)" />
                <span><MathText :text="check" /></span>
              </label>
            </fieldset>
          </template>
          <form v-else @submit.prevent="checkAnswer">
            <fieldset class="guided-question" :disabled="quizLocked">
              <legend><MathText :text="step.question" /></legend>
              <label v-for="(option, index) in step.options" :key="option" class="ticket-option guided-option" :class="{ 'ticket-option-selected': selected === index }">
                <input v-model="selected" class="ticket-option-radio" type="radio" :name="step.id" :value="index" @change="submitted = false" />
                <span><MathText :text="option" /></span>
              </label>
            </fieldset>
            <button v-if="!quizLocked" class="btn btn-primary guided-primary" type="submit" :disabled="selected === null">Controleer mijn antwoord</button>
            <div aria-live="polite" aria-atomic="true">
              <div v-if="feedbackVisible" ref="feedback" class="guided-feedback" :class="response.last === step.answer ? 'guided-feedback-correct' : 'guided-feedback-retry'">
                <strong class="guided-feedback-title">
                  <PhCheckCircle v-if="response.last === step.answer" :size="24" aria-hidden="true" />
                  <PhXCircle v-else :size="24" aria-hidden="true" />
                  {{ response.last === step.answer ? 'Juist' : step.diagnostic ? 'Even opfrissen' : response.assisted ? 'Met hulp verder' : 'Nog niet juist' }}
                </strong>
                <p><MathText :text="questionFeedback(step, response)" /></p>
                <p v-if="!step.diagnostic && !quizLocked">Raadpleeg je boek. Kies daarna opnieuw en controleer je antwoord.</p>
              </div>
            </div>
          </form>
          <div v-if="step.type === 'quiz' && !step.diagnostic && response?.count >= 2 && !quizLocked" class="guided-notice">
            <p><strong>Loop je vast?</strong> Roep je leerkracht erbij en bespreek de vraag. Daarna kun je met hulp verder.</p>
            <label class="guided-help"><input v-model="helpConfirmed" type="checkbox" /> Ik heb deze vraag met mijn leerkracht besproken.</label>
            <button class="btn btn-ghost" :disabled="!helpConfirmed" @click="acceptHelp">Verder met hulp mogelijk maken</button>
          </div>
        </template>

        <template v-else>
          <p class="eyebrow"><MathText :text="lesson.completion.eyebrow" /></p>
          <h1 ref="heading" tabindex="-1"><MathText :text="lesson.completion.title" /></h1>
          <p><MathText :text="lesson.completion.intro" /></p>
          <h2>Je boekwerk</h2>
          <p><MathText :text="lesson.completion.work" /></p>
          <h2>Je korte controles</h2>
          <p v-if="entryResult.total">Opfrissing: {{ entryResult.correct }} van {{ entryResult.total }} juist bij de eerste poging.</p>
          <p v-if="finalResult.total"><MathText :text="lesson.completion.checksLabel || 'Eindcheck'" />: {{ finalResult.correct }} van {{ finalResult.total }} juist bij de eerste poging.</p>
          <p v-if="finalResult.assisted">Bij {{ finalResult.assisted }} eindvraag/vragen ging je met hulp verder. Bespreek die nog eens met je leerkracht.</p>
          <p class="guided-notice">De balk toont afgeronde stappen, geen cijfer of bewijs dat je alles beheerst.</p>
          <h2><MathText :text="lesson.completion.nextTitle" /></h2>
          <p v-for="paragraph in lesson.completion.next" :key="paragraph"><MathText :text="paragraph" /></p>
        </template>
      </div>
    </main>

    <footer v-if="started" class="fullscreen-foot guided-footer">
      <button v-if="state.current > 0" class="btn btn-ghost" @click="previous"><PhArrowLeft aria-hidden="true" :size="20" /> Vorige</button>
      <span v-else></span>
      <div class="guided-forward">
        <span v-if="step?.type === 'work' && !workReady" class="guided-small">Maak het boekwerk en vink het aan.</span>
        <span v-else-if="step?.type === 'quiz' && !ready" class="guided-small">Beantwoord eerst de vraag.</span>
        <button v-if="step" class="btn btn-primary guided-primary" :disabled="!ready" @click="next">
          <MathText :text="step.next || (state.current === steps.length - 1 ? 'Bekijk mijn afronding' : 'Verder')" />
          <PhArrowRight aria-hidden="true" :size="22" />
        </button>
        <button v-else class="btn btn-primary guided-primary" @click="pause">Afronding bewaren en stoppen</button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.guided-shell { height: 100dvh; }
.guided-header { display: flex; flex: 1; flex-wrap: wrap; align-items: baseline; gap: 8px 24px; }
.guided-class, .guided-small { color: var(--color-ink-soft); font-size: 1rem; line-height: 1.5; }
.guided-progress-copy { display: flex; flex-shrink: 0; justify-content: space-between; flex-wrap: wrap; gap: 8px; padding: 16px 32px; font-size: 1rem; font-weight: 600; background: var(--color-panel); }
.guided-progress { height: 8px; flex-shrink: 0; border-bottom: 2px solid var(--color-line); }
.guided-sheet { max-width: 760px; margin: 0 auto; padding: 16px 0 32px; font-size: 1.25rem; line-height: 1.65; }
.guided-sheet h1 { margin: 16px 0 24px; font-size: clamp(2rem, 4vw, 2.75rem); line-height: 1.15; font-weight: 600; letter-spacing: -0.025em; }
.guided-sheet h1:focus { outline: none; box-shadow: none; }
.guided-sheet h2 { margin: 32px 0 8px; font-size: 1.5rem; font-weight: 600; }
.guided-sheet p { margin-bottom: 24px; }
.guided-lead { font-weight: 600; font-size: 1.5rem; }
.guided-reference { padding-left: 16px; border-left: 6px solid var(--color-workbook); font-weight: 600; }
.guided-source { display: flex; align-items: center; flex-wrap: wrap; gap: 12px 16px; font-size: 1.0625rem; font-weight: 600; }
.guided-source .badge { font-size: 0.8125rem; }
.guided-notice { margin: 24px 0; padding: 16px 24px; border: 2px solid var(--color-line); border-radius: var(--radius-control); background: var(--color-panel); font-size: 1.0625rem; }
.guided-notice p:last-child { margin-bottom: 0; }
.guided-question { min-width: 0; margin: 0 0 24px; }
.guided-question legend { margin-bottom: 24px; font-size: 1.375rem; font-weight: 600; line-height: 1.5; }
.guided-option { display: flex; gap: 16px; align-items: flex-start; padding: 16px 24px; border-width: 2px; border-style: solid; border-radius: var(--radius-control); margin-bottom: 12px; cursor: pointer; }
.guided-option input { margin-top: 6px; flex-shrink: 0; }
.guided-question:disabled .guided-option { cursor: default; }
.guided-strategy { margin: 24px 0; padding-left: 16px; border-left: 6px solid var(--color-workbook); }
.guided-strategy h2 { margin: 0 0 12px; font-size: 1.25rem; line-height: 1.4; }
.guided-strategy ol { margin: 0; padding-left: 24px; list-style: decimal; }
.guided-strategy li { padding-left: 4px; margin-bottom: 12px; }
.guided-checklist { margin-top: 32px; }
.guided-checklist legend { padding: 0 0 16px; font-weight: 600; }
.guided-checklist label, .guided-help { display: flex; align-items: flex-start; gap: 16px; padding: 12px 0; cursor: pointer; }
.guided-checklist input, .guided-help input { width: 24px; height: 24px; flex-shrink: 0; margin-top: 4px; accent-color: var(--color-workbook); }
.guided-feedback { padding: 24px; margin-top: 24px; border: 2px solid var(--color-line); border-left-width: 6px; border-radius: var(--radius-control); }
.guided-feedback-correct { background: var(--color-workbook-soft); border-color: var(--color-workbook); }
.guided-feedback-retry { background: var(--color-digital-soft); border-color: var(--color-digital); }
.guided-feedback-title { display: flex; align-items: center; gap: 12px; }
.guided-feedback p { margin: 12px 0 0; }
.guided-primary { min-height: 48px; padding: 12px 24px; font-size: 1.0625rem; }
.guided-reset { margin-top: 24px; }
.guided-support { margin: 24px 0; padding: 16px 24px; border: 2px solid var(--color-line); border-radius: var(--radius-control); background: var(--color-panel); font-size: 1.0625rem; }
.guided-support summary { cursor: pointer; font-weight: 600; }
.guided-support p { margin: 16px 0 0; }
.guided-links a { display: block; padding: 8px 0; color: var(--color-digital); text-decoration: underline; text-underline-offset: 4px; font-weight: 600; }
.guided-footer { justify-content: space-between; gap: 16px; padding-top: 16px; padding-bottom: max(16px, env(safe-area-inset-bottom)); }
.guided-forward { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 8px 24px; }
button:disabled { cursor: not-allowed; background: var(--color-panel-muted); color: var(--color-ink-soft); border: 2px solid var(--color-line); box-shadow: none; }
@media (max-width: 640px) {
  .guided-progress-copy { padding: 12px 24px; }
  .guided-sheet { font-size: 1.125rem; padding-top: 0; }
  .guided-header { flex-direction: column; gap: 4px; }
  .guided-class { font-size: 0.875rem; }
  .guided-option { padding: 16px; }
  .guided-footer { align-items: stretch; }
  .guided-forward { flex: 1; }
  .guided-forward .guided-small { width: 100%; text-align: right; }
  .guided-primary { padding: 12px 16px; }
}
</style>
