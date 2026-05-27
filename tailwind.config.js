/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#bcd4ff',
          300: '#8eb8ff',
          400: '#5990ff',
          500: '#3366ff',
          600: '#1a44f5',
          700: '#1533e1',
          800: '#172bb6',
          900: '#192b8f',
          950: '#141c57',
        },
      },
    },
  },
  plugins: [],
}

