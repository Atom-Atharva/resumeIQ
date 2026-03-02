import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export interface StrengthsCardProps {
    strengths: string[];
}

export function StrengthsCard({ strengths }: StrengthsCardProps) {
    const reducedMotion = useReducedMotion();

    return (
        <Card>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2
                        className="w-5 h-5 text-success"
                        aria-hidden="true"
                    />
                </div>
                <h3 className="text-heading font-semibold text-text-primary">
                    What works in your favor
                </h3>
            </div>
            <ul className="space-y-0" role="list">
                {strengths.map((item, i) => (
                    <motion.li
                        key={i}
                        initial={
                            !reducedMotion ? { opacity: 0, x: -8 } : undefined
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className={`flex items-start gap-3 py-3 px-4 rounded-lg ${
                            i % 2 === 0 ? "bg-surface-raised" : "bg-surface"
                        }`}
                    >
                        <div
                            className="w-2 h-2 rounded-full bg-success mt-2 shrink-0"
                            aria-hidden="true"
                        />
                        <span className="text-body text-text-primary">
                            {item}
                        </span>
                    </motion.li>
                ))}
            </ul>
        </Card>
    );
}
