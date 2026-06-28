import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm parchment/cream backgrounds
        surface: {
          DEFAULT: '#faf7f2',   // warm cream
          100: '#f5f0e8',       // slightly deeper cream
          200: '#ede5d8',       // warm linen
          300: '#d9cfc0',       // soft sand
          400: '#b8a99a',       // warm taupe
        },
        // Dark earthy text
        text: {
          DEFAULT: '#2d1f14',   // deep walnut brown
          muted: '#6b5744',     // warm medium brown
          dim: '#9c8472',       // faded terracotta
        },
        // Turmeric / saffron primary
        primary: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f59e0b',
          500: '#d97706',       // saffron / turmeric
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
          950: '#2a0f01',
        },
        // Forest herb green accent
        accent: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#16a34a',       // deep herbal green
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
          900: '#052e16',
          950: '#021a0c',
        },
        // Terracotta / earthy red for highlights
        terra: {
          100: '#fde8e0',
          200: '#f9c5b0',
          300: '#f4a07a',
          400: '#e07050',
          500: '#c05530',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'leaf-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        marquee: 'marquee 40s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'sway': 'sway 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(45,31,20,0.08), 0 1px 2px rgba(45,31,20,0.06)',
        'warm-md': '0 4px 12px rgba(45,31,20,0.10), 0 2px 6px rgba(45,31,20,0.06)',
        'warm-lg': '0 10px 30px rgba(45,31,20,0.12), 0 4px 12px rgba(45,31,20,0.08)',
        'saffron':  '0 4px 20px rgba(217,119,6,0.25)',
        'herb':     '0 4px 20px rgba(22,163,74,0.20)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
