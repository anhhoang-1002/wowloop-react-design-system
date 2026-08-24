/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#DFE6F1",
        input: "#CACACA",
        ring: "#122DBD",
        background: "#F1F7FF",
        foreground: "#111827",
        primary: {
          DEFAULT: "#34D18A",
          foreground: "#FFFFFF",
          dark: "#29AF5C",
          light: "#52CC85",
          vibrant: "#18C778",
        },
        secondary: {
          DEFAULT: "#122DBD",
          foreground: "#FFFFFF",
          hover: "#0E2499",
          light: "#465FF1",
          soft: "#B4CDFF",
          bg: "#E3EEFF",
        },
        accent: {
          orangeStart: "#FF3C3A",
          orangeEnd: "#FF7A1D",
          orangeShadow: "#FFDCC4",
        },
        muted: {
          DEFAULT: "#9B9B9B",
          foreground: "#6B7280",
        },
        canvas: "#F1F7FF",
        surface: "#FFFFFF",
        danger: {
          DEFAULT: "#CC4B37",
          bg: "#F9ECEA",
        },
      },
      borderRadius: {
        lg: "10px",
        md: "8px",
        sm: "4px",
        xl: "15px",
        pill: "52px",
      },
      boxShadow: {
        'card-blue': '0 4px 20px 0 rgba(0, 80, 197, 0.20)',
        'input-shadow': '0 4px 8px 0 rgba(70, 95, 241, 0.10)',
        'pill-shadow': '0 4px 4px 0 rgba(0, 105, 191, 0.15)',
        'btn-green': '0 2px 4px 0 rgba(0, 0, 0, 0.28)',
        'solid-offset': '4px 4px 0 0 #FFDCC4',
      },
    },
  },
  plugins: [],
}
