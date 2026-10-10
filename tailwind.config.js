/** @type {import('tailwindcss').Config} */
export default {
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
      }
    },
  },
  plugins: [],
}
