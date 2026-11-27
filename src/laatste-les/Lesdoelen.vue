<script setup>
import { goals } from './inhoud.js'
</script>

<template>
  <ol class="goal-list" aria-label="Drie lesdoelen met succescriteria">
    <li v-for="({ title, page, goal, check }, i) in goals" :key="title" class="goal-card">
      <div class="goal-copy">
        <p class="goal-heading">
          <strong>{{ i + 1 }}. {{ title }}</strong>
          <span class="goal-page">{{ page }}</span>
        </p>
        <p class="goal-statement">{{ goal }}</p>
      </div>
      <div class="board-goal-proof">
        <p class="board-goal-proof-label">Zo toon ik het</p>
        <p>{{ check }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.goal-list {
  display: grid;
  gap: 10px;
  list-style: none;
  margin: 14px 0 16px;
  padding: 0;
}
.goal-card {
  display: grid;
  grid-template-columns: minmax(0, 1.22fr) minmax(0, 1fr);
  gap: clamp(14px, 2vw, 30px);
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-left: 5px solid var(--color-workbook);
  padding: clamp(12px, 1.25vw, 20px) clamp(14px, 1.6vw, 24px);
  color: var(--color-ink);
}
.goal-list-recap { gap:8px; margin-block:10px }
.goal-list-recap .goal-card { padding-block:10px }
.goal-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 3px 14px;
  font-size: clamp(19px, 2vw, 29px);
  line-height: 1.13;
}
.goal-heading strong { font-weight: 650 }
.goal-page {
  color: var(--color-workbook);
  font-size: max(16px, .72em);
  font-weight: 600;
  white-space: nowrap;
}
.goal-statement {
  margin-top: 5px;
  font-size: clamp(19px, 2.1vw, 31px);
  font-weight: 500;
  line-height: 1.24;
}
.board-goal-proof {
  border-left: 1px solid var(--color-line);
  padding-left: clamp(14px, 1.65vw, 24px);
  font-size: clamp(18px, 1.82vw, 27px);
  line-height: 1.27;
}
.board-goal-proof-label {
  font-size: max(16px, .83em);
  line-height: 1.25;
  font-weight: 650;
  margin-bottom: 5px;
}
@media (max-width: 700px) {
  .goal-card { grid-template-columns: 1fr; gap: 11px }
  .board-goal-proof { border-left: 0; border-top: 1px solid var(--color-line); padding: 9px 0 0 }
}
</style>
