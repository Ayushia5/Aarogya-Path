/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          teal: '#0B9E9E', // Primary Teal
          navy: '#0D2B3E', // Dark Navy
        },
        health: {
          bg: '#F0F4F7',     // Background
          card: '#FFFFFF',   // Card White
          border: '#E2E8F0', // Border
          text: {
            primary: '#1A2333',
            secondary: '#5C6B7A',
            muted: '#9AAAB8',
          },
          success: '#4CAF7D',
          warning: '#F5A623',
          danger: '#E05252',
          cyan: '#00D4D4',   // Cyan Accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '24px',
      },
      boxShadow: {
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      letterSpacing: {
        'tight-heading': '-0.02em',
      },
    },
  },
  plugins: [],
}
