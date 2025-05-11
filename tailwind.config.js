/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crypto-dark': '#0F172A',
        'crypto-darker': '#020617',
        'crypto-blue': '#00BFFF',
        'crypto-purple': '#8A2BE2',
        'crypto-green': '#00FA9A',
        'crypto-red': '#FF3E4D',
        'crypto-yellow': '#FFD700',
        'crypto-gray': '#64748B'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backgroundImage: {
        'crypto-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'blue-purple-gradient': 'linear-gradient(135deg, #00BFFF 0%, #8A2BE2 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00BFFF, 0 0 10px #00BFFF',
        'neon-purple': '0 0 5px #8A2BE2, 0 0 10px #8A2BE2',
      }
    },
  },
  plugins: [],
}