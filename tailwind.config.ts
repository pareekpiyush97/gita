import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Primary — deep navy authority scale
        navy: {
          950: "#060E1F",
          900: "#0A1B33",
          800: "#102748",
          700: "#17335C",
          600: "#1F4270",
          500: "#2A5488",
        },
        // Secondary — emerald growth scale
        emerald: {
          600: "#0B8457",
          500: "#12A66B",
          400: "#34C48A",
          300: "#7BDBAF",
          100: "#E3F7EE",
        },
        // Signature accent — brushed gold, used sparingly for premium moments
        gold: {
          500: "#B08A3E",
          400: "#C6A15B",
          300: "#DCC58C",
        },
        paper: "#F6F8F7",
        ink: {
          900: "#0F1620",
          700: "#333E4C",
          600: "#4B5768",
          400: "#8792A0",
        },
      },
      fontFamily: {
        display: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 2.6vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(10, 27, 51, 0.15)",
        lift: "0 20px 60px -15px rgba(10, 27, 51, 0.35)",
        glass: "0 8px 32px 0 rgba(10, 27, 51, 0.12)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      keyframes: {
        "rise": {
          "0%": { transform: "translateY(24px) scaleY(0.7)", opacity: "0" },
          "100%": { transform: "translateY(0) scaleY(1)", opacity: "1" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "counter-pulse": {
          "0%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
