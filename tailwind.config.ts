import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // This enables class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: {
          light: '#3b82f6', // blue-500
          dark: '#60a5fa',  // blue-400
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'theme': 'background-color, color, border-color', // For smooth theme transitions
      },
      animation: {
        'theme-toggle': 'pulse 0.5s ease-in-out', // For theme toggle animation
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // If you'll have blog-like content
  ],
}

export default config