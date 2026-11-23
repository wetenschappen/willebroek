<script setup>
// Twee schematische evenwichtsstanden; gelijke doorsnede, gaslengte 12:8.
defineProps({ na: Boolean })
</script>
<template>
  <svg viewBox="0 0 102 108" aria-hidden="true" focusable="false">
    <rect x="13" :y="na ? 54 : 30" width="76" :height="na ? 48 : 72" fill="var(--color-digital-soft)"/>
    <path d="M13 17 V102 H89 V17" fill="none" stroke="currentColor" stroke-width="3"/>
    <g :transform="na ? 'translate(0 24)' : undefined" fill="currentColor">
      <rect x="14" y="25" width="74" height="5"/><rect x="48" y="8" width="6" height="18"/><rect x="38" y="5" width="26" height="4"/>
    </g>
  </svg>
</template>
