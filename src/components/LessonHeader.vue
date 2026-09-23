<script setup>
defineProps({
  badge: String,
  title: String,
  description: String
})
</script>

<template>
  <header class="lesson-intro">
    <p v-if="badge" class="eyebrow" v-html="badge"></p>
    <h1 v-html="title"></h1>
    <p v-if="description" class="lesson-description" v-html="description"></p>
  </header>
</template>
