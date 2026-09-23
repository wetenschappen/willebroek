<script setup>
import { computed } from 'vue'
import { PhBookOpen, PhX, PhCheckCircle, PhLightbulb, PhListNumbers } from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: Boolean,
  workbook: {
    type: Object,
    default: () => ({})
  },
  cardExercises: {
    type: [String, Array],
    default: ''
  }
})

const emit = defineEmits(['close', 'complete', 'open-solutions'])

function completeAndClose() {
    emit('complete')
    emit('close')
}

function close() {
    emit('close')
}

const parsedExercises = computed(() => {
    const raw = props.cardExercises || props.workbook?.exercises
    if (!raw) return []
    if (Array.isArray(raw)) return raw

    const lines = String(raw).split('\n').filter(l => l.trim())
    const list = []

    for (const line of lines) {
        // Pattern: Opdracht / Aan de slag X (p. Y): Beschrijving
        let match = line.match(/^(Opdracht|Aan de slag|Oefening)\s+(\S+)\s*\(p\.\s*(\d+(?:-\d+)?)\):\s*(.+)/i)
        if (match) {
            list.push({
                nr: `${match[1]} ${match[2]}`,
                page: `p. ${match[3]}`,
                title: match[4].trim()
            })
            continue
        }

        // Pattern: Oef X: Titel (p. Y)
        match = line.match(/^(.+?)\s*\(p\.\s*(\d+(?:-\d+)?)\)$/i)
        if (match) {
            list.push({
                nr: '•',
                page: `p. ${match[2]}`,
                title: match[1].trim()
            })
            continue
        }

        list.push({
            nr: '•',
            page: '',
            title: line.trim()
        })
    }

    return list
})
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop open" @click="close">
    <div class="modal-content max-w-xl w-full" @click.stop style="background: var(--color-panel); border: 2px solid var(--color-line-strong); box-shadow: var(--shadow-dialog); border-radius: var(--radius-card);">

      <!-- Header -->
      <header class="px-6 py-4 flex justify-between items-center border-b" style="border-color: var(--color-line);">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-control flex-shrink-0" style="background: var(--color-workbook-soft); color: var(--color-workbook);">
            <PhBookOpen weight="fill" class="text-xl" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-900 leading-tight">{{ workbook.title || 'Werkboek en bundel' }}</h3>
            <p v-if="workbook.subtitle" class="text-xs text-slate-600 mt-0.5">{{ workbook.subtitle }}</p>
          </div>
        </div>
        <button type="button" @click="close" class="btn-close" aria-label="Sluiten">
          <PhX class="text-xl" />
        </button>
      </header>

      <!-- Body -->
      <div class="p-6 space-y-5 max-h-[75vh] overflow-y-auto">

        <!-- Instruction Block -->
        <div v-if="workbook.instruction" class="p-4 rounded-card" style="background: var(--color-workbook-soft); border: 1px solid var(--color-workbook);">
          <div class="flex items-start gap-3">
            <PhBookOpen weight="fill" class="text-xl shrink-0 mt-0.5" style="color: var(--color-workbook);" />
            <div class="text-slate-800 text-sm leading-relaxed" v-html="workbook.instruction"></div>
          </div>
        </div>

        <!-- Formula Hint Block -->
        <div v-if="workbook.formulaHint" class="p-4 rounded-card" style="background: var(--color-paper); border: 1px solid var(--color-line);">
          <div class="flex items-start gap-3">
            <PhLightbulb weight="fill" class="text-xl shrink-0 mt-0.5 text-slate-700" />
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Formule / Aanwijzing</p>
              <div class="text-slate-900 text-sm font-medium leading-relaxed" v-html="workbook.formulaHint"></div>
            </div>
          </div>
        </div>

        <!-- Exercises List -->
        <div v-if="parsedExercises.length" class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <PhListNumbers weight="bold" class="text-lg text-slate-700" />
            <h4 class="text-sm font-bold uppercase tracking-wider text-slate-800">Oefeningen</h4>
          </div>

          <div class="divide-y rounded-card border" style="border-color: var(--color-line); background: var(--color-panel);">
            <div
              v-for="(ex, idx) in parsedExercises"
              :key="idx"
              class="p-3.5 flex items-start justify-between gap-4"
            >
              <div class="flex items-start gap-3 flex-1 min-w-0">
                <span class="text-xs font-bold px-2 py-0.5 rounded-control font-mono shrink-0 mt-0.5" style="background: var(--color-workbook-soft); color: var(--color-workbook);">
                  {{ ex.nr }}
                </span>
                <span class="text-sm font-medium text-slate-800 leading-snug" v-html="ex.title"></span>
              </div>
              <span v-if="ex.page" class="text-xs font-bold text-slate-600 shrink-0 tabular-nums pt-0.5">
                {{ ex.page }}
              </span>
            </div>
          </div>
        </div>

        <!-- Completion Button -->
        <div class="pt-4 flex justify-center">
          <button
            type="button"
            @click="completeAndClose"
            class="btn btn-primary flex items-center justify-center gap-2 w-full max-w-sm"
            style="min-height: 48px;"
          >
            <PhCheckCircle weight="bold" class="text-xl" />
            <span>Klaar met de opdrachten</span>
          </button>
        </div>

        <!-- Solution Key Link -->
        <div class="flex justify-center pt-1">
          <button
            type="button"
            @click="emit('open-solutions')"
            class="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-2 rounded-control hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span>Correctiesleutel raadplegen (beveiligd met code)</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
