<script setup>
defineProps({
  badge: String,
  title: String,
  description: String
})
</script>

<template>
  <header class="lesson-intro">
    <p v-if="badge" class="eyebrow">{{ badge }}</p>
    <h1>{{ title }}</h1>
    <p v-if="description" class="lesson-description">{{ description }}</p>
  </header>
</template>
