import { motion, useReducedMotion } from "framer-motion";
import { ShieldAlert, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export interface RedFlagsCardProps {
    redFlags: string[];
}

export function RedFlagsCard({ redFlags }: RedFlagsCardProps) {
    const reducedMotion = useReducedMotion();

    return (
        <Card>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
                    <ShieldAlert
                        className="w-5 h-5 text-danger"
                        aria-hidden="true"
                    />
                </div>
                <h3 className="text-heading font-semibold text-text-primary">
                    Things to get ahead of
                </h3>
            </div>

            {redFlags.length === 0 ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-success/5 border border-success/20">
                    <CheckCircle2
                        className="w-6 h-6 text-success shrink-0"
                        aria-hidden="true"
                    />
                    <p className="text-body text-success font-medium">
                        Nothing jumped out at us. That's actually a good sign —
                        go get that interview.
                    </p>
                </div>
            ) : (
                <>
                    <p className="text-small text-text-muted mb-4">
                        These might come up. Better to have a good answer ready
                        than to get caught off guard.
                    </p>
                    <ul className="space-y-3" role="list">
                        {redFlags.map((item, i) => (
                            <motion.li
                                key={i}
                                initial={
                                    !reducedMotion
                                        ? { opacity: 0, x: -8 }
                                        : undefined
                                }
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                className="relative pl-4 py-3 pr-4 rounded-lg bg-danger/5 border-l-4 border-danger"
                            >
                                <div className="flex items-start gap-3">
                                    <ShieldAlert
                                        className="w-5 h-5 text-danger shrink-0 mt-0.5"
                                        aria-hidden="true"
                                    />
                                    <span className="text-body text-text-primary">
                                        {item}
                                    </span>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </>
            )}
        </Card>
    );
}
