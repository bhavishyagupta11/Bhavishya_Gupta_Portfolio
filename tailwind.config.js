/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ide: {
          bg: 'var(--ide-bg)',
          sidebar: 'var(--ide-sidebar)',
          activity: 'var(--ide-activity)',
          editor: 'var(--ide-editor)',
          tabs: 'var(--ide-tabs)',
          tabActive: 'var(--ide-tab-active)',
          tabInactive: 'var(--ide-tab-inactive)',
          border: 'var(--ide-border)',
          accent: 'var(--ide-accent)',
          accentHover: 'var(--ide-accent-hover)',
          text: 'var(--ide-text)',
          textMuted: 'var(--ide-text-muted)',
          statusbar: 'var(--ide-statusbar)',
          terminal: 'var(--ide-terminal)',
          hover: 'var(--ide-hover)',
          selection: 'var(--ide-selection)',
          gutter: 'var(--ide-gutter)',
        }
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
      }
    },
  },
  plugins: [],
}
