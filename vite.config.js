import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/willebroek/',
  build: {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      input: {
        planner: fileURLToPath(new URL('./index.html', import.meta.url)),
        energie: fileURLToPath(new URL('./energie/index.html', import.meta.url)),
        celmetabolisme: fileURLToPath(new URL('./celmetabolisme/index.html', import.meta.url)),
        celdeling: fileURLToPath(new URL('./celdeling/index.html', import.meta.url)),
        energieBasis: fileURLToPath(new URL('./energie-basis/index.html', import.meta.url)),
        energieBasisProefblok: fileURLToPath(new URL('./energie-basis/proefblok/index.html', import.meta.url)),
        gassen: fileURLToPath(new URL('./gassen/index.html', import.meta.url)),
        gassenLes2: fileURLToPath(new URL('./gassen/les2/index.html', import.meta.url)),
        gassenSimulatie: fileURLToPath(new URL('./gassen/simulatie/index.html', import.meta.url)),
        gassenProefblok: fileURLToPath(new URL('./gassen/proefblok/index.html', import.meta.url)),
      },
      output: {
        manualChunks(id) {
          // Vendor chunk for large dependencies
          if (id.includes('node_modules/katex')) {
            return 'vendor-katex'
          }
          if (id.includes('node_modules/mathjs')) {
            return 'vendor-mathjs'
          }
          if (id.includes('node_modules/@phosphor-icons')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue') || id.includes('node_modules/vue-router')) {
            return 'vendor-vue'
          }
        }
      }
    }
  },
})
