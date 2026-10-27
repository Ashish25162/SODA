/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          1: '#F8FAFC',
          2: '#FFFFFF',
          3: '#F1F5F9',
          4: '#E2E8F0',
        },
        navy: {
          1: '#0A192F',
          2: '#060F1E',
          3: '#0F2544',
          950: '#060F1E',
          900: '#0A192F',
          800: '#112240',
          700: '#1B355B',
        },
        ink: {
          DEFAULT: '#0A192F',
          2: '#1E293B',
          3: '#475569',
          4: '#64748B',
        },
        gold: {
          DEFAULT: '#D97706',
          2: '#B45309',
          dim: '#92400E',
          bright: '#F59E0B',
          brass: '#C9A961',
        },
        olive: {
          DEFAULT: '#3F6212',
          2: '#365314',
          600: '#3F6212',
          500: '#4D7C0F',
          badge: '#ECFCCB',
        },
        red: {
          DEFAULT: '#DC2626',
          signal: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderColor: {
        line: 'rgba(10, 25, 47, 0.08)',
        'line-light': 'rgba(10, 25, 47, 0.14)',
        'line-gold': 'rgba(217, 119, 6, 0.35)',
        'line-dark': 'rgba(248, 250, 252, 0.12)',
      }
    },
  },
  plugins: [],
}
