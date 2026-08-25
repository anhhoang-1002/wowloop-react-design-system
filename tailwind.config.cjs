/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
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
        border: "var(--color-border-default)",
        input: "var(--color-border-subtle)",
        ring: "var(--color-interactive-primary)",
        background: "var(--color-surface-base)",
        foreground: "var(--color-text-primary)",
        primary: {
          DEFAULT: "#34D18A",
          foreground: "#FFFFFF",
          dark: "#29AF5C",
          light: "#52CC85",
          vibrant: "#18C778",
        },
        secondary: {
          DEFAULT: "var(--color-interactive-primary)",
          foreground: "#FFFFFF",
          hover: "var(--color-interactive-primary-hover)",
          light: "#465FF1",
          soft: "#B4CDFF",
          bg: "var(--color-border-accent)",
        },
        accent: {
          orangeStart: "#FF3C3A",
          orangeEnd: "#FF7A1D",
          orangeShadow: "#FFDCC4",
        },
        muted: {
          DEFAULT: "var(--color-text-muted)",
          foreground: "var(--color-text-secondary)",
        },
        canvas: "var(--color-surface-canvas)",
        surface: "var(--color-surface-raised)",
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
        'card-blue': 'var(--shadow-card)',
        'input-shadow': 'var(--shadow-card)',
        'pill-shadow': '0 4px 4px 0 rgba(0, 105, 191, 0.15)',
        'btn-green': '0 2px 4px 0 rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
};
