<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { PhTarget, PhX, PhCheck } from '@phosphor-icons/vue'
import { subjectById } from '../data/subjects.js'

const props = defineProps({
  goals: { type: Array, required: true },
  subject: { type: String, default: 'physics' },
  lessonId: { type: String, required: true }
})

const iconComponent = computed(() => subjectById(props.subject)?.watermarkIcon || PhTarget)
const isOpen = ref(false)
const completedGoals = ref([])
const storageKey = computed(() => `planner-goals-${props.lessonId}`)

onMounted(() => {
  const stored = localStorage.getItem(storageKey.value)
  if (stored) completedGoals.value = JSON.parse(stored)
})

const toggle = () => { isOpen.value = !isOpen.value }

watch(isOpen, (val) => { document.body.style.overflow = val ? 'hidden' : '' })
watch(completedGoals, (val) => localStorage.setItem(storageKey.value, JSON.stringify(val)), { deep: true })
onUnmounted(() => { document.body.style.overflow = '' })

function toggleGoal(index) {
  completedGoals.value = completedGoals.value.includes(index)
    ? completedGoals.value.filter(i => i !== index)
    : [...completedGoals.value, index]
}
</script>

<template>
  <div>
    <button
      type="button"
      @click="toggle"
      class="goals-trigger"
      :class="{ 'goals-trigger-open': isOpen }"
      title="Doelstellingen"
      aria-label="Doelstellingen openen"
    >
      <component :is="iconComponent" v-if="!isOpen" weight="regular" aria-hidden="true" />
      <PhX v-else weight="regular" aria-hidden="true" />
      <span class="goals-trigger-label">Doelen</span>
      <span class="goals-trigger-count">{{ completedGoals.length }}/{{ goals.length }}</span>
    </button>

    <div v-if="isOpen" class="goals-overlay" @click.self="toggle">
      <section class="goals-dialog" role="dialog" aria-modal="true" aria-labelledby="goals-title">
        <header class="goals-dialog-header">
          <div class="goals-dialog-title">
            <component :is="iconComponent" weight="regular" aria-hidden="true" />
            <div>
              <p class="eyebrow">Lesoverzicht</p>
              <h2 id="goals-title">Doelstellingen</h2>
            </div>
          </div>
          <button type="button" class="btn-close" @click="toggle" aria-label="Sluiten">
            <PhX weight="regular" />
          </button>
        </header>

        <div class="goals-dialog-body">
          <p class="goals-progress">{{ completedGoals.length }} van {{ goals.length }} doelstellingen bereikt</p>
          <ul class="goals-list">
            <li v-for="(goal, i) in goals" :key="i">
              <button type="button" class="goal-row" @click="toggleGoal(i)">
                <span class="goal-check" :class="{ 'goal-check-done': completedGoals.includes(i) }">
                  <PhCheck v-if="completedGoals.includes(i)" weight="bold" aria-hidden="true" />
                </span>
                <span :class="{ 'goal-done': completedGoals.includes(i) }">{{ goal }}</span>
              </button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
