import { createApp } from 'vue'
import '../style.css'
import GuidedPath from '../guided/GuidedPath.vue'
import { lesson, steps, STORAGE_KEY } from './kinetic-pilot.js'

createApp(GuidedPath, { lesson, steps, storageKey: STORAGE_KEY }).mount('#app')
