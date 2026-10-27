/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cream Scale (Base Surfaces & Backgrounds — 60%)
        'cream-1': 'var(--bg-1)',
        'cream-2': 'var(--bg-2)',
        'cream-3': 'var(--bg-3)',
        'cream-4': 'var(--bg-4)',

        // Naval Ink Scale (Headings, Body Text & Deep Surfaces — 30%)
        'ink': 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'ink-4': 'var(--ink-4)',
        'navy-1': 'var(--navy-1)',
        'navy-2': 'var(--navy-2)',
        'navy-3': 'var(--navy-3)',

        // Officer Accents & Badges (The 10% Pop)
        'gold': 'var(--gold)',
        'gold-2': 'var(--gold-2)',
        'gold-dim': 'var(--gold-dim)',
        'olive': 'var(--olive)',
        'olive-2': 'var(--olive-2)',
        'red': 'var(--red)',
      },
      borderColor: {
        'tactical': 'var(--b)',
        'tactical-2': 'var(--b-2)',
        'tactical-gold': 'var(--b-gold)',
        'tactical-dark': 'var(--b-dark)',
      },
      fontFamily: {
        // Universal regular sans typography throughout the platform
        sans: ['"Inter Tight"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'parchment': '0 4px 20px -2px rgba(10, 20, 40, 0.05)',
        'dossier': '0 10px 30px -5px rgba(8, 18, 42, 0.08), 0 0 0 1px rgba(10, 20, 40, 0.08)',
        'dossier-dark': '0 20px 40px -10px rgba(5, 11, 22, 0.6), 0 0 0 1px rgba(244, 239, 230, 0.08)',
        'gold-glow': '0 0 20px rgba(201, 169, 97, 0.25)',
      },
    },
  },
  plugins: [],
};
