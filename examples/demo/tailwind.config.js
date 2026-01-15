/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@autumnsgrove/groveengine/**/*.{html,js,svelte,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        grove: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfcf8',
          200: '#faf8f3',
          300: '#f5f2ea',
          400: '#ede9de',
          500: '#e2ddd0'
        },
        bark: {
          700: '#6f4d39',
          800: '#553a2a',
          900: '#3d2914'
        }
      },
      fontFamily: {
        sans: ['Lexend', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
