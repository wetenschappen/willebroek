<script setup>
import { computed } from 'vue'
const props = defineProps({ model: { type: String, required: true }, genotype: { type: String, required: true }, label: { type: String, required: true } })
const pea = computed(() => ['mono', 'di'].includes(props.model))
const color = computed(() => props.genotype.includes('G') ? '#e1bb20' : '#39854d')
const round = computed(() => props.model === 'mono' || props.genotype.includes('R'))
const flowerColor = computed(() => props.genotype === 'RR' ? '#b4232f' : props.genotype === 'WW' ? '#ffffff' : '#e6a2af')
</script>

<template>
  <svg v-if="pea" class="mendel-trait-symbol" viewBox="0 0 48 48" role="img" :aria-label="label">
    <circle v-if="round" cx="24" cy="24" r="19" :fill="color" stroke="var(--color-ink)" stroke-width="2" />
    <path v-else d="M12 5L25 9L35 5L42 18L38 27L42 38L28 43L17 39L6 42L4 28L9 19Z" :fill="color" stroke="var(--color-ink)" stroke-width="2" />
    <path d="M15 16Q20 12 24 15" fill="none" stroke="var(--color-ink)" stroke-width="2" />
  </svg>
  <svg v-else-if="['intermediate', 'codominant'].includes(model)" class="mendel-trait-symbol" viewBox="0 0 48 48" role="img" :aria-label="label">
    <path d="M24 23C0 11 17 -4 24 13C31 -4 48 11 25 24C48 36 31 52 24 35C17 52 0 36 24 23Z" :fill="model === 'codominant' && genotype === 'RW' ? '#ffffff' : flowerColor" stroke="var(--color-ink)" stroke-width="2" />
    <path v-if="model === 'codominant' && genotype === 'RW'" d="M24 23C0 11 17 -4 24 13V35C17 52 0 36 24 23Z" fill="#b4232f" stroke="var(--color-ink)" stroke-width="2" />
    <circle cx="24" cy="24" r="4" fill="var(--color-ink)" />
  </svg>
  <span v-else class="mendel-symbol-text" aria-hidden="true">{{ genotype }}</span>
</template>
