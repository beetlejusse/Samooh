import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Custom pastel palette
        pastel: {
          pink: "#FFD6E0",
          lavender: "#C8B6FF",
          mint: "#C1FFD7",
          blue: "#B5DEFF",
          yellow: "#FFF5BA",
          peach: "#FFCDA8",
        },

        // Acrylic theme colors
        acrylic: {
          bg: "rgba(255, 255, 255, 0.7)",
          border: "rgba(255, 255, 255, 0.2)",
          hover: "rgba(255, 255, 255, 0.9)",
        },

        // New primary colors
        primary: {
          DEFAULT: "#FF85A1", // Vibrant pink
          hover: "#FF6B8B",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#7B68EE", // Medium slate blue
          hover: "#6A5ACD",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#64DFDF", // Turquoise
          hover: "#5AC8C8",
          foreground: "#FFFFFF",
        },

        // Other UI colors
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.8)",
          foreground: "#333333",
        },
        muted: {
          DEFAULT: "#F0F0F0",
          foreground: "#666666",
        },
        destructive: {
          DEFAULT: "#FF8080",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        glow: "0 0 15px rgba(255, 133, 161, 0.5)",
        "glow-blue": "0 0 15px rgba(123, 104, 238, 0.5)",
        "glow-mint": "0 0 15px rgba(100, 223, 223, 0.5)",
      },
      backgroundImage: {
        "gradient-pastel": "linear-gradient(to right, #FFD6E0, #C8B6FF, #C1FFD7)",
        "gradient-vibrant": "linear-gradient(to right, #FF85A1, #7B68EE, #64DFDF)",
        "gradient-card": "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
