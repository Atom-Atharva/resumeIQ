import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
    onStartOver?: () => void;
}

export function ErrorMessage({
    message,
    onRetry,
    onStartOver,
}: ErrorMessageProps) {
    const reducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={!reducedMotion ? { opacity: 0, scale: 0.95 } : undefined}
            animate={
                !reducedMotion
                    ? {
                          opacity: 1,
                          scale: 1,
                          x: [0, -4, 4, -4, 4, 0],
                      }
                    : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
            role="alert"
            aria-live="assertive"
        >
            <Card className="text-center">
                <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle
                        className="w-8 h-8 text-danger"
                        aria-hidden="true"
                    />
                </div>
                <h3 className="text-title font-semibold text-text-primary mb-2">
                    Well, that didn't work.
                </h3>
                <p className="text-body text-text-muted mb-6">
                    Something went wrong on our end — not yours. Give it another
                    shot and it should be fine.
                </p>
                {message && (
                    <p className="text-small text-text-muted/70 mb-6 -mt-4">
                        {message}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="primary" onClick={onRetry}>
                        <RefreshCw className="w-4 h-4" aria-hidden="true" />
                        Try again
                    </Button>
                    {onStartOver && (
                        <Button variant="ghost" onClick={onStartOver}>
                            <Home className="w-4 h-4" aria-hidden="true" />
                            Start over
                        </Button>
                    )}
                </div>
            </Card>
        </motion.div>
    );
}
