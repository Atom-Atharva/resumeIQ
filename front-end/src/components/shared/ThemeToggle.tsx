import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/context/ThemeContext";

const themeConfig: Record<Theme, { icon: typeof Sun; label: string }> = {
    system: { icon: Monitor, label: "System preference" },
    light: { icon: Sun, label: "Light mode" },
    dark: { icon: Moon, label: "Dark mode" },
};

export function ThemeToggle() {
    const { theme, cycleTheme } = useTheme();
    const reducedMotion = useReducedMotion();

    const currentConfig = themeConfig[theme];
    const Icon = currentConfig.icon;

    return (
        <button
            type="button"
            onClick={cycleTheme}
            aria-label={`Current theme: ${currentConfig.label}. Click to cycle.`}
            className="p-2 rounded-xl border border-border bg-surface hover:bg-surface-raised focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={theme}
                    initial={
                        !reducedMotion
                            ? { opacity: 0, rotate: -90, scale: 0.6 }
                            : undefined
                    }
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={
                        !reducedMotion
                            ? { opacity: 0, rotate: 90, scale: 0.6 }
                            : undefined
                    }
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="inline-flex items-center justify-center text-text-primary"
                >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                </motion.span>
            </AnimatePresence>
        </button>
    );
}
