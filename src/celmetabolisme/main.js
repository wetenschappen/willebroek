import { createApp } from 'vue'
import '../style.css'
import GuidedPath from '../guided/GuidedPath.vue'
import { lesson, steps } from './lesson.js'
import { STORAGE_KEY } from './progress.js'

createApp(GuidedPath, { lesson, steps, storageKey: STORAGE_KEY }).mount('#app')
