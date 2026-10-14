<script setup>
defineProps({ spindle: Boolean, fertilized: Boolean })
</script>

<template>
  <g class="division-legend">
    <circle cx="30" cy="28" r="6" fill="#b4232f" />
    <text x="44" y="33">{{ fertilized ? 'van de moeder' : 'maternaal' }}</text>
    <circle cx="194" cy="28" r="6" fill="#075985" />
    <text x="208" y="33">{{ fertilized ? 'van de vader' : 'paternaal' }}</text>
    <g v-if="spindle">
      <path d="M 455 28 H 491" stroke="var(--color-ink-soft)" stroke-width="2" />
      <text x="503" y="33">trekdraden</text>
      <path d="M 625 28 H 661" stroke="var(--color-line)" stroke-width="2" stroke-dasharray="5 4" />
      <text x="673" y="33">steundraden</text>
    </g>
  </g>
</template>

<style scoped>
.division-legend text { fill: var(--color-ink); font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; font-weight: 500; }
</style>
