/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        // Text colors for the light theme
        ink: {
          DEFAULT: "#0B0D12",
          soft: "#3A3F4E",
          muted: "#686E80",
          faint: "#9AA0AF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F4F4F1",
          card: "#FFFFFF",
          border: "rgba(11, 13, 18, 0.08)",
          hover: "#F1F2F5",
          dark: "#F4F4F1",
          // A deep stage for video-heavy blocks
          night: "#0B0D12",
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
          950: "#1E1B4B",
        },
        accent: {
          cyan: "#0891B2",
          purple: "#9333EA",
          emerald: "#059669",
          coral: "#F97362",
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
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 10px 30px -10px rgba(79, 70, 229, 0.45)",
        "glow-lg": "0 18px 50px -12px rgba(79, 70, 229, 0.55)",
        "glow-cyan": "0 10px 30px -10px rgba(8, 145, 178, 0.35)",
        card: "0 1px 2px rgba(11, 13, 18, 0.04), 0 8px 24px -12px rgba(11, 13, 18, 0.12)",
        lift: "0 2px 4px rgba(11, 13, 18, 0.04), 0 24px 48px -16px rgba(11, 13, 18, 0.18)",
        stage: "0 2px 6px rgba(11, 13, 18, 0.06), 0 40px 80px -24px rgba(30, 27, 75, 0.35)",
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
