import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, Eye, Lightbulb, Target } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { FAQ } from "@/types/resume";

export interface FaqSectionProps {
    faqs: FAQ[];
}

const priorityVariant: Record<FAQ["priority"], "rose" | "amber" | "slate"> = {
    High: "rose",
    Medium: "amber",
    Low: "slate",
};

function groupByCategory(faqs: FAQ[]): Map<string, FAQ[]> {
    const map = new Map<string, FAQ[]>();
    for (const faq of faqs) {
        const list = map.get(faq.category) ?? [];
        list.push(faq);
        map.set(faq.category, list);
    }
    return map;
}

function FaqItem({
    faq,
    isOpen,
    onToggle,
    reducedMotion,
}: {
    faq: FAQ;
    isOpen: boolean;
    onToggle: () => void;
    reducedMotion: boolean | null;
}) {
    return (
        <div className="border-b border-border last:border-b-0">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`faq-${faq.question.slice(0, 20)}`}
                className="w-full flex items-start justify-between gap-4 py-4 px-2 text-left hover:bg-surface-raised rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Badge variant={priorityVariant[faq.priority]} size="sm">
                        {faq.priority}
                    </Badge>
                    <span className="font-medium text-body text-text-primary">
                        {faq.question}
                    </span>
                </div>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-text-muted mt-1"
                >
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={`faq-${faq.question.slice(0, 20)}`}
                        initial={
                            !reducedMotion
                                ? { height: 0, opacity: 0 }
                                : undefined
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                            !reducedMotion
                                ? { height: 0, opacity: 0 }
                                : undefined
                        }
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            initial={!reducedMotion ? { x: -8 } : undefined}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="pb-4 px-2 space-y-4"
                        >
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-raised">
                                <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Eye
                                        className="w-4 h-4 text-accent"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-micro uppercase tracking-wider text-text-muted font-medium mb-1">
                                        Why they ask this
                                    </p>
                                    <p className="text-body text-text-primary">
                                        {faq.why_asked}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-raised">
                                <div className="w-6 h-6 rounded-lg bg-warning/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Lightbulb
                                        className="w-4 h-4 text-warning"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-micro uppercase tracking-wider text-text-muted font-medium mb-1">
                                        How to answer
                                    </p>
                                    <p className="text-body text-text-primary">
                                        {faq.answer_strategy}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FaqSection({ faqs }: FaqSectionProps) {
    const [openId, setOpenId] = useState<string | null>(null);
    const reducedMotion = useReducedMotion();
    const grouped = groupByCategory(faqs);

    if (faqs.length === 0) return null;

    return (
        <Card>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Target
                        className="w-5 h-5 text-accent"
                        aria-hidden="true"
                    />
                </div>
                <h3 className="text-heading font-semibold text-text-primary">
                    Let's get you ready
                </h3>
            </div>
            <p className="text-small text-text-muted mb-6">
                These are the questions we'd ask if we were interviewing you.
                The honest answers are usually the best ones.
            </p>
            <div className="space-y-4">
                {Array.from(grouped.entries()).map(([category, items]) => {
                    const hasHighPriority = items.some(
                        (item) => item.priority === "High",
                    );
                    const highPriorityCount = items.filter(
                        (item) => item.priority === "High",
                    ).length;

                    return (
                        <div
                            key={category}
                            className="rounded-xl border border-border bg-surface-raised p-4"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <h4 className="text-body font-semibold text-text-primary">
                                        {category}
                                    </h4>
                                    {hasHighPriority && (
                                        <Badge variant="rose" size="sm">
                                            {highPriorityCount} High Priority
                                        </Badge>
                                    )}
                                </div>
                                <span className="text-small text-text-muted">
                                    {items.length}{" "}
                                    {items.length === 1
                                        ? "question"
                                        : "questions"}
                                </span>
                            </div>
                            <div className="space-y-0">
                                {items.map((faq, i) => {
                                    const faqId = `${category}-${i}`;
                                    return (
                                        <FaqItem
                                            key={faqId}
                                            faq={faq}
                                            isOpen={openId === faqId}
                                            onToggle={() =>
                                                setOpenId((prev) =>
                                                    prev === faqId
                                                        ? null
                                                        : faqId,
                                                )
                                            }
                                            reducedMotion={reducedMotion}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
