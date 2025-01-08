/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003366', // Deep Blue for primary
        secondary: '#FFD700', // Gold
        hover: '#4CAF50', // Soft Green for hover effects
        background: '#f5f5f5', // Light Gray for background
        textPrimary: '#2C2C2C', // Dark Gray text
      },
      fontFamily: {
        navbar: ['Poppins', 'sans-serif'], // Bold and impactful font for navbar
        heading: ['Poppins', 'sans-serif'], // Bold font for headings
        body: ['Roboto', 'sans-serif'], // Clean font for body text
      },
    },
  },
  plugins: [
    daisyui,
  ],
}
