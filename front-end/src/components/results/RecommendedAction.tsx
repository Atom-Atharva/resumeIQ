import { motion, useReducedMotion } from "framer-motion";
import {
    getRecommendedActionVariant,
    getHumanActionLabel,
} from "@/utils/formatters";
import type { AnalysisResult } from "@/types/resume";

export interface RecommendedActionProps {
    action: AnalysisResult["recommended_action"];
}

const contextNotes: Record<string, string> = {
    "Strong Hire": "This one's a no-brainer. Go in confident.",
    Hire: "You've got what they're looking for. Prep well and close it.",
    Maybe: "There's potential here, but you'll need to make a strong case.",
    Reject: "Tough match. But now you know where to focus next.",
};

type ThemeColors = {
    card: string;
    label: string;
    action: string;
    brief: string;
    glow: string;
};

const themeMap: Record<string, ThemeColors> = {
    success: {
        card: "bg-success/10 border-success/30",
        label: "text-success/70",
        action: "text-success",
        brief: "text-success/60",
        glow: "bg-success/20",
    },
    accent: {
        card: "bg-accent/10 border-accent/30",
        label: "text-accent/70",
        action: "text-accent",
        brief: "text-accent/60",
        glow: "bg-accent/20",
    },
    warning: {
        card: "bg-warning/10 border-warning/30",
        label: "text-warning/70",
        action: "text-warning",
        brief: "text-warning/60",
        glow: "bg-warning/20",
    },
    danger: {
        card: "bg-danger/10 border-danger/30",
        label: "text-danger/70",
        action: "text-danger",
        brief: "text-danger/60",
        glow: "bg-danger/20",
    },
};

export function RecommendedAction({ action }: RecommendedActionProps) {
    const reducedMotion = useReducedMotion();
    const variant = getRecommendedActionVariant(action);
    const theme = themeMap[variant];

    return (
        <div
            className={`relative overflow-hidden rounded-2xl border ${theme.card} h-full min-h-[220px] p-6 flex flex-col`}
        >
            {/* Background glow */}
            <div
                className={`absolute -bottom-12 -right-12 w-40 h-40 rounded-full ${theme.glow} blur-3xl`}
                aria-hidden="true"
            />

            {/* Top-left label */}
            <span
                className={`text-micro uppercase tracking-wider font-semibold ${theme.label}`}
            >
                Our honest take
            </span>

            {/* Center action */}
            <div className="flex-1 flex items-center justify-center">
                <motion.h2
                    initial={
                        !reducedMotion ? { opacity: 0, scale: 0.8 } : undefined
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.1,
                    }}
                    className={`text-3xl sm:text-4xl font-bold tracking-tight ${theme.action}`}
                >
                    {getHumanActionLabel(action)}
                </motion.h2>
            </div>

            {/* Brief below */}
            <p className={`text-small ${theme.brief} text-center`}>
                {contextNotes[action] || ""}
            </p>
        </div>
    );
}
