import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme - Bleu & Blanc
        light: {
          bg: '#FFFFFF',
          surface: '#F8FAFC',
          text: '#0F172A',
          'text-secondary': '#475569',
          primary: '#1A4B8C',
          'primary-vibrant': '#4D8CFF',
          'primary-dark': '#0E2A47',
          accent: '#60A5FA',
          border: '#E2E8F0',
        },
        // Dark theme - Noir & Vert
        dark: {
          bg: '#0A0A0A',
          surface: '#141414',
          text: '#F0F0F0',
          'text-secondary': '#A8A8A8',
          primary: '#00FF7F',
          'primary-glow': '#32CD32',
          'primary-dark': '#00CC66',
          accent: '#39FF14',
          border: '#2A2A2A',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'monospace'],
        display: ['var(--font-display)', 'Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(77, 140, 255, 0.3)',
        'glow-md': '0 0 30px rgba(77, 140, 255, 0.4)',
        'glow-lg': '0 0 40px rgba(77, 140, 255, 0.5)',
        'glow-green-sm': '0 0 20px rgba(0, 255, 127, 0.3)',
        'glow-green-md': '0 0 30px rgba(0, 255, 127, 0.4)',
        'glow-green-lg': '0 0 40px rgba(0, 255, 127, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
