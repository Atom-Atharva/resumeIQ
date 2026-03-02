import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

export interface QuestionsCardProps {
    questions: string[];
}

export function QuestionsCard({ questions }: QuestionsCardProps) {
    const reducedMotion = useReducedMotion();

    if (questions.length === 0) return null;

    return (
        <Card>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MessageCircle
                        className="w-5 h-5 text-accent"
                        aria-hidden="true"
                    />
                </div>
                <h3 className="text-heading font-semibold text-text-primary">
                    Smart questions to leave them thinking
                </h3>
            </div>
            <p className="text-small text-text-muted mb-4">
                Asking good questions is half the interview. These will make you
                sound like someone who actually did their homework.
            </p>
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4" role="list">
                {questions.map((item, i) => (
                    <motion.li
                        key={i}
                        initial={
                            !reducedMotion ? { opacity: 0, y: 8 } : undefined
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className="group relative p-4 rounded-xl border border-border bg-surface-raised hover:border-accent/50 hover:bg-surface transition-all duration-200"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-small font-semibold text-accent">
                                    {i + 1}
                                </span>
                            </div>
                            <span className="text-body text-text-primary font-medium group-hover:text-accent transition-colors">
                                {item}
                            </span>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </Card>
    );
}
