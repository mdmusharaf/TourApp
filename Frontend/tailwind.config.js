/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customLight: "#f9fafb",
        customCardBG: "#f5f5f4",
        customDark: "#1c1c1c",
        customText: "#f8f8f8",
        customCardDarK: "#2C2C2C",
      },
    },
  },
  plugins: [],
};
