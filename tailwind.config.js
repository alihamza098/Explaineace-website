/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090E",
        surface: {
          DEFAULT: "#0F111A",
          subtle: "#141724",
          card: "#121520",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "#181C2E",
        },
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        ink: { DEFAULT: "#0C0A09", 2: "#14110F", 3: "#1C1815", line: "rgba(244,240,230,0.12)" },
        paper: { DEFAULT: "#F4F0E6", dim: "#B9B4A5", mute: "#8A8678" },
        signal: { DEFAULT: "#FF6B3D", dim: "#E0522A", ink: "#1F0A02" },
        accent: {
          cyan: "#38BDF8",
          purple: "#A855F7",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99, 102, 241, 0.25)",
        "glow-lg": "0 0 60px -15px rgba(99, 102, 241, 0.35)",
        "glow-cyan": "0 0 40px -10px rgba(56, 189, 248, 0.25)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
