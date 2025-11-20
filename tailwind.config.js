/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'music-bar-1': 'musicBar 1s ease-in-out infinite',
        'music-bar-2': 'musicBar 1s ease-in-out infinite 0.2s',
        'music-bar-3': 'musicBar 1s ease-in-out infinite 0.4s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        musicBar: {
          '0%, 100%': { height: '40%' },
          '50%': { height: '100%' },
        },
      },
    },
  },
  plugins: [],
}
