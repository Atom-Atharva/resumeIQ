import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { AnalysisResult } from "@/types/resume";
import { FitScoreCard } from "./FitScoreCard";
import { SummaryCard } from "./SummaryCard";
import { StrengthsCard } from "./StrengthsCard";
import { GapsCard } from "./GapsCard";
import { RecommendedAction } from "./RecommendedAction";
import { FaqSection } from "./FaqSection";
import { RedFlagsCard } from "./RedFlagsCard";
import { QuestionsCard } from "./QuestionsCard";

export interface ResultsDashboardProps {
    result: AnalysisResult;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
};

export function ResultsDashboard({ result }: ResultsDashboardProps) {
    const reducedMotion = useReducedMotion();
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowIntro(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-center py-24"
                    >
                        <p className="text-2xl font-semibold text-text-primary text-center">
                            Alright, here's the honest picture.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {!showIntro && (
                <motion.div
                    variants={reducedMotion ? undefined : container}
                    initial="hidden"
                    animate="show"
                    className="space-y-8"
                >
                    {/* Hero Section */}
                    <motion.div
                        variants={reducedMotion ? undefined : item}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
                    >
                        <div className="flex items-center justify-center">
                            <FitScoreCard score={result.fit_score} />
                        </div>
                        <div>
                            <RecommendedAction
                                action={result.recommended_action}
                            />
                        </div>
                    </motion.div>

                    {/* Recruiter Summary — full width */}
                    <motion.div variants={reducedMotion ? undefined : item}>
                        <SummaryCard summary={result.summary} />
                    </motion.div>

                    {/* Strengths and Gaps */}
                    <motion.div
                        variants={reducedMotion ? undefined : item}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        <StrengthsCard strengths={result.strengths} />
                        <GapsCard gaps={result.gaps} />
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div variants={reducedMotion ? undefined : item}>
                        <FaqSection faqs={result.faqs} />
                    </motion.div>

                    {/* Red Flags */}
                    <motion.div variants={reducedMotion ? undefined : item}>
                        <RedFlagsCard redFlags={result.red_flags_to_address} />
                    </motion.div>

                    {/* Questions */}
                    <motion.div variants={reducedMotion ? undefined : item}>
                        <QuestionsCard
                            questions={result.questions_to_ask_interviewer}
                        />
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        variants={reducedMotion ? undefined : item}
                        className="pt-8 pb-4"
                    >
                        <p className="text-center text-micro text-text-muted opacity-60">
                            ResumeIQ — built to give you an honest shot at the
                            job
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
