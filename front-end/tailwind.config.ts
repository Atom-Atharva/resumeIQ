import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                surface: "rgb(var(--surface) / <alpha-value>)",
                "surface-raised": "rgb(var(--surface-raised) / <alpha-value>)",
                border: "rgb(var(--border) / <alpha-value>)",
                "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
                "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
                accent: "rgb(var(--accent) / <alpha-value>)",
                "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
                "accent-light": "rgb(var(--accent-light) / <alpha-value>)",
                "accent-muted": "rgb(var(--accent-muted) / <alpha-value>)",
                coral: "rgb(var(--coral) / <alpha-value>)",
                "coral-light": "rgb(var(--coral-light) / <alpha-value>)",
                "coral-dark": "rgb(var(--coral-dark) / <alpha-value>)",
                success: "rgb(var(--success) / <alpha-value>)",
                warning: "rgb(var(--warning) / <alpha-value>)",
                danger: "rgb(var(--danger) / <alpha-value>)",
            },
            fontSize: {
                display: [
                    "3rem",
                    { lineHeight: "1.1", letterSpacing: "-0.02em" },
                ],
                title: [
                    "1.5rem",
                    { lineHeight: "1.2", letterSpacing: "-0.01em" },
                ],
                heading: [
                    "1.125rem",
                    { lineHeight: "1.4", letterSpacing: "-0.01em" },
                ],
                body: ["0.9375rem", { lineHeight: "1.6" }],
                small: ["0.8125rem", { lineHeight: "1.5" }],
                micro: [
                    "0.6875rem",
                    { lineHeight: "1.4", letterSpacing: "0.04em" },
                ],
            },
            boxShadow: {
                DEFAULT: "var(--shadow)",
                lg: "var(--shadow-lg)",
            },
            backdropBlur: {
                xs: "2px",
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                shimmer: "shimmer 2s linear infinite",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
