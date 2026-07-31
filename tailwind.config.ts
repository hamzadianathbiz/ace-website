import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ace: {
          red: '#D60019',
          'red-dark': '#A30013',
          black: '#0a0a0a',
          ink: '#404040',
          muted: '#595959',
          // Warm paper — the page ground.
          cream: '#FDFCF4',
          // One step down from cream. Panels, cards, image wells.
          sand: '#F1EFE3',
          gray1: '#f5f5f5',
          gray2: '#e6e6e6',
          gray3: '#8c8c8c',
          // Hairline, warmed to sit on cream rather than on cool gray.
          line: '#E4E1D3',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', '"Helvetica Neue"', '-apple-system', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
        // Headline font — see app/layout.tsx. Display-scale moments only:
        // hero headline, the two "written large" statement paragraphs,
        // stat numbers. Not for body copy or UI chrome.
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      spacing: {
        gutter: '120px',
      },
      transitionTimingFunction: {
        // easeInOutCubic — eases out of rest and back into it, so neither end of
        // the extend has a hard edge. easeOut alone starts too abruptly here.
        ace: 'cubic-bezier(0.65, 0, 0.35, 1)',
        // easeOutQuint — leaves fast and spends most of the duration
        // settling. Entrances land rather than arrive.
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
