import { useEffect, useRef } from "react";
import { motion, animate, useReducedMotion } from "framer-motion";
import {
    getScoreRingClass,
    getScoreTextClass,
    getScoreReaction,
} from "@/utils/formatters";

export interface FitScoreCardProps {
    score: number;
}

const SIZE = 180;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function FitScoreCard({ score }: FitScoreCardProps) {
    const reducedMotion = useReducedMotion();
    const countRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (reducedMotion) {
            if (countRef.current)
                countRef.current.textContent = score.toString();
            return;
        }
        const controls = animate(0, score, {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
                if (countRef.current)
                    countRef.current.textContent = Math.round(v).toString();
            },
        });
        return () => controls.stop();
    }, [score, reducedMotion]);

    const ringClass = getScoreRingClass(score);
    const textClass = getScoreTextClass(score);

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative" style={{ width: SIZE, height: SIZE }}>
                {/* Glow effect */}
                <div
                    className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${ringClass}`}
                    aria-hidden="true"
                />
                <svg
                    width={SIZE}
                    height={SIZE}
                    className="transform -rotate-90 relative"
                    aria-hidden="true"
                >
                    <circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={STROKE}
                        className="text-border"
                    />
                    <motion.circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        strokeWidth={STROKE}
                        strokeLinecap="round"
                        className={ringClass}
                        strokeDasharray={CIRCUMFERENCE}
                        initial={{ strokeDashoffset: CIRCUMFERENCE }}
                        animate={{
                            strokeDashoffset:
                                CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE,
                        }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <span
                            ref={countRef}
                            className={`text-[2.5rem] font-bold ${textClass} tabular-nums`}
                            aria-live="polite"
                            aria-label={`Fit score: ${score} out of 100`}
                        >
                            {reducedMotion ? score : "0"}
                        </span>
                    </div>
                </div>
            </div>
            <p className="text-micro uppercase tracking-wider text-text-muted font-medium">
                How well you match
            </p>
            <p className="text-small italic text-text-muted text-center max-w-[220px]">
                {getScoreReaction(score)}
            </p>
        </div>
    );
}
