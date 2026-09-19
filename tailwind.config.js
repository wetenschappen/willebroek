/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        slate: {
          50: '#f5f7f6',
          100: '#edf2f1',
          200: '#d5dfde',
          300: '#b8c8c6',
          400: '#718682',
          500: '#52636a',
          600: '#34474e',
          700: '#263a42',
          800: '#1f3138',
          900: '#17252b',
        },
        physics: {
          DEFAULT: '#176b87',
          soft: '#e3f1f5',
        },
        biology: {
          DEFAULT: '#397553',
          soft: '#e7f2ea',
        },
        action: {
          DEFAULT: '#b65b2d',
          soft: '#fbede5',
        },
        /* Kept for lesson-specific presentation content during the migration. */
        math: {
          blue: '#176b87',
          'blue-light': '#e3f1f5',
          'blue-bg': '#f2f8fa',
          orange: '#b65b2d',
          'orange-light': '#f3d2c0',
          'orange-bg': '#fbede5',
          emerald: '#397553',
          'emerald-light': '#c7dfce',
          'emerald-bg': '#e7f2ea',
          violet: '#526b78',
          'violet-light': '#d5dfde',
          'violet-bg': '#edf2f1',
        },
        surface: {
          white: '#ffffff',
          50: '#f5f7f6',
          100: '#edf2f1',
          200: '#d5dfde',
          300: '#b8c8c6',
        },
        ink: {
          DEFAULT: '#17252b',
          light: '#34474e',
          dark: '#17252b',
        },
        chrome: {
          dark: '#17252b',
          border: '#34474e',
        },
        brand: {
          dark: '#17252b',
          mid: '#34474e',
          orange: '#b65b2d',
          accent: '#397553',
        },
      },
      borderRadius: {
        control: '8px',
        card: '12px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgb(23 37 43 / 0.06)',
        card: '0 1px 2px rgb(23 37 43 / 0.06), 0 8px 24px rgb(23 37 43 / 0.04)',
        lift: '0 2px 4px rgb(23 37 43 / 0.08), 0 12px 28px rgb(23 37 43 / 0.06)',
        float: '0 20px 50px rgb(23 37 43 / 0.18)',
      },
    },
  },
  plugins: [],
}
