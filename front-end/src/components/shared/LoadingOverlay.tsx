import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const MESSAGES = [
    "Reading through your resume...",
    "Matching your experience to the role...",
    "Thinking about what an interviewer would ask you...",
    "Flagging things you'll want to get ahead of...",
    "Putting together your prep guide...",
    "Almost there — this one's detailed...",
    "Finishing up the analysis...",
];

const TIPS = [
    "Tip: Read the job description out loud before your interview.",
    "Tip: Prepare a 90-second intro before you walk in.",
    "Tip: Research the company's last 3 press releases.",
    "Tip: Have a story ready for every gap on your resume.",
    "Tip: The best interviews feel like conversations, not interrogations.",
];

export function LoadingOverlay() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex((i) => (i + 1) % MESSAGES.length);
        }, 2500);
        return () => clearInterval(messageInterval);
    }, []);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((p) => (p >= 95 ? 95 : p + 1));
        }, 150);
        return () => clearInterval(progressInterval);
    }, []);

    const tipIndex = Math.floor(messageIndex / 2) % TIPS.length;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            role="status"
            aria-live="polite"
            aria-label="Analysis in progress"
        >
            <motion.div
                initial={
                    !reducedMotion ? { opacity: 0, scale: 0.9 } : undefined
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-md w-full mx-4"
            >
                <div className="bg-surface border border-border rounded-2xl p-8 shadow-lg">
                    <motion.div
                        animate={!reducedMotion ? { scale: [1, 1.1, 1] } : {}}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6"
                    >
                        <Sparkles
                            className="w-8 h-8 text-white"
                            aria-hidden="true"
                        />
                    </motion.div>

                    <div className="h-[28px] flex items-center justify-center mb-6">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={messageIndex}
                                initial={
                                    !reducedMotion
                                        ? { opacity: 0, y: 8 }
                                        : undefined
                                }
                                animate={{ opacity: 1, y: 0 }}
                                exit={
                                    !reducedMotion
                                        ? { opacity: 0, y: -8 }
                                        : undefined
                                }
                                transition={{ duration: 0.3 }}
                                className="text-center text-heading font-semibold text-text-primary"
                            >
                                {MESSAGES[messageIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <div className="relative w-full h-2 bg-surface-raised rounded-full overflow-hidden mb-2">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-accent rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <p className="text-center text-micro uppercase text-text-muted tracking-wider">
                        {progress}% complete
                    </p>

                    <div className="mt-6 h-[20px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={tipIndex}
                                initial={
                                    !reducedMotion ? { opacity: 0 } : undefined
                                }
                                animate={{ opacity: 1 }}
                                exit={
                                    !reducedMotion ? { opacity: 0 } : undefined
                                }
                                transition={{ duration: 0.5 }}
                                className="text-small text-text-muted text-center italic"
                            >
                                {TIPS[tipIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <p
                        className="mt-6 text-center text-micro font-light text-text-muted opacity-40"
                        aria-hidden="true"
                    >
                        crafted with way too much coffee by Atharva ✦
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
