/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0075FF',
          dark: '#0F172A',
          slate: '#1E293B',
          gray: '#64748B',
          lightGray: '#94A3B8',
          border: '#D8E2EC',
          borderLight: '#E2E8F0',
          bgSoft: '#F0F6FE',
          greenOngoing: '#16A34A',
          greenBg: '#EEFAF2',
          redRecord: '#EA3829',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand-btn': '0 8px 20px -2px rgba(0, 117, 255, 0.35)',
        'record-btn': '0 6px 16px -2px rgba(234, 56, 41, 0.35)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 6px 18px rgba(0, 0, 0, 0.08)',
        'mobile-frame': '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      spacing: {
        '4.5': '1.125rem',
      },
      transitionTimingFunction: {
        'apple-spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'apple-sheet': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'apple-pop': 'cubic-bezier(0.34, 1.35, 0.64, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pageEnter: {
          '0%': { opacity: '0', transform: 'translateY(6px) scale(0.996)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        sheetUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        dialogPop: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        dropdownPop: {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(-4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        breathe: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.96)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'fadeIn': 'fadeIn 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slideUp': 'slideUp 260ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'page-enter': 'pageEnter 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'sheet-up': 'sheetUp 320ms cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'dialog-pop': 'dialogPop 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'dropdown-pop': 'dropdownPop 180ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'apple-breathe': 'breathe 2.4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
