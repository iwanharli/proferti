/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Deep Slate
          light: '#1e293b',
          dark: '#020617',
        },
        accent: {
          DEFAULT: '#10b981', // Emerald
          soft: 'rgba(16, 185, 129, 0.1)',
          hover: '#059669',
        },
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.2)',
      },
    },
  },
  plugins: [],
}
