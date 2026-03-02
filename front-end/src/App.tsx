import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FileUpload } from "@/components/upload/FileUpload";
import { JobDescriptionInput } from "@/components/upload/JobDescriptionInput";
import { Button } from "@/components/ui/Button";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { ResultsDashboard } from "@/components/results/ResultsDashboard";
import { useAnalyzeResume } from "@/hooks/useAnalyzeResume";
import type { AnalysisResult } from "@/types/resume";

export default function App() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [validationErrors, setValidationErrors] = useState<{
        file?: string;
        jobDescription?: string;
    }>({});
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [view, setView] = useState<"input" | "results">("input");

    const { analyze, isPending, errorMessage, reset } = useAnalyzeResume();
    const reducedMotion = useReducedMotion();

    const handleRetry = () => {
        reset();
        if (file && jobDescription.trim()) {
            analyze(
                { file, jobDescription: jobDescription.trim() },
                {
                    onSuccess: (data) => {
                        setResult(data);
                        setView("results");
                    },
                },
            );
        }
    };

    const handleStartOver = () => {
        setResult(null);
        setView("input");
        setValidationErrors({});
        setFile(null);
        setJobDescription("");
        reset();
    };

    const handleAnalyze = () => {
        const errors: { file?: string; jobDescription?: string } = {};
        if (!file) errors.file = "We need your resume to get started.";
        if (!jobDescription.trim())
            errors.jobDescription =
                "Paste the job description so we know what to match against.";
        setValidationErrors(errors);
        if (Object.keys(errors).length > 0) return;
        if (!file) return;

        analyze(
            { file, jobDescription: jobDescription.trim() },
            {
                onSuccess: (data) => {
                    setResult(data);
                    setView("results");
                },
            },
        );
    };

    const handleBack = () => {
        setResult(null);
        setView("input");
        setValidationErrors({});
        reset();
    };

    return (
        <>
            <Navbar />
            <PageWrapper>
                <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {view === "input" ? (
                                <motion.div
                                    key="input"
                                    initial={
                                        !reducedMotion
                                            ? { opacity: 0, y: 20 }
                                            : undefined
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={
                                        !reducedMotion
                                            ? { opacity: 0, y: -20 }
                                            : undefined
                                    }
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="relative max-w-[680px] mx-auto space-y-6 py-8"
                                >
                                    {/* Animated gradient blobs */}
                                    {!reducedMotion && (
                                        <>
                                            <motion.div
                                                className="absolute -top-20 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl"
                                                animate={{
                                                    x: [0, 30, 0],
                                                    y: [0, -30, 0],
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                                aria-hidden="true"
                                            />
                                            <motion.div
                                                className="absolute -top-32 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl"
                                                animate={{
                                                    x: [0, -30, 0],
                                                    y: [0, 30, 0],
                                                    scale: [1, 1.15, 1],
                                                }}
                                                transition={{
                                                    duration: 10,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                                aria-hidden="true"
                                            />
                                        </>
                                    )}

                                    {/* Hero section */}
                                    <div className="relative text-center mb-10">
                                        <motion.div
                                            initial={
                                                !reducedMotion
                                                    ? { opacity: 0, y: 10 }
                                                    : undefined
                                            }
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.1,
                                            }}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-raised border border-border mb-6"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                            <span className="text-small text-text-muted font-medium">
                                                AI-Powered Interview Prep
                                            </span>
                                        </motion.div>
                                        <motion.h1
                                            initial={
                                                !reducedMotion
                                                    ? { opacity: 0, y: 10 }
                                                    : undefined
                                            }
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.2,
                                            }}
                                            className="text-display font-bold text-text-primary mb-4"
                                        >
                                            Drop your resume in — let's see what
                                            you've got
                                        </motion.h1>
                                        <motion.p
                                            initial={
                                                !reducedMotion
                                                    ? { opacity: 0, y: 10 }
                                                    : undefined
                                            }
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.3,
                                            }}
                                            className="text-body text-text-muted max-w-[540px] mx-auto"
                                        >
                                            Upload your resume, paste the job
                                            description, and we'll tell you
                                            exactly how you stack up — plus
                                            everything you need to prep.
                                        </motion.p>
                                    </div>

                                    {/* Upload and input section */}
                                    <motion.div
                                        initial={
                                            !reducedMotion
                                                ? { opacity: 0, y: 10 }
                                                : undefined
                                        }
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.4,
                                        }}
                                    >
                                        <FileUpload
                                            file={file}
                                            onFileChange={setFile}
                                            error={validationErrors.file}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={
                                            !reducedMotion
                                                ? { opacity: 0, y: 10 }
                                                : undefined
                                        }
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                    >
                                        <JobDescriptionInput
                                            value={jobDescription}
                                            onChange={setJobDescription}
                                            error={
                                                validationErrors.jobDescription
                                            }
                                        />
                                    </motion.div>

                                    {errorMessage && (
                                        <ErrorMessage
                                            message={errorMessage}
                                            onRetry={handleRetry}
                                            onStartOver={handleStartOver}
                                        />
                                    )}

                                    <motion.div
                                        initial={
                                            !reducedMotion
                                                ? { opacity: 0, y: 10 }
                                                : undefined
                                        }
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.6,
                                        }}
                                    >
                                        <motion.div
                                            animate={
                                                file &&
                                                jobDescription.trim() &&
                                                !isPending
                                                    ? {
                                                          scale: [1, 1.01, 1],
                                                      }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                fullWidth
                                                isLoading={isPending}
                                                onClick={handleAnalyze}
                                                disabled={
                                                    !file ||
                                                    !jobDescription.trim()
                                                }
                                                title={
                                                    !file ||
                                                    !jobDescription.trim()
                                                        ? "Add your resume and the job description first."
                                                        : undefined
                                                }
                                            >
                                                {!isPending && (
                                                    <Sparkles
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Let's find out
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="results"
                                    initial={
                                        !reducedMotion
                                            ? { opacity: 0, y: 20 }
                                            : undefined
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={
                                        !reducedMotion
                                            ? { opacity: 0, y: -20 }
                                            : undefined
                                    }
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="space-y-8 py-4"
                                >
                                    <motion.div
                                        whileHover={{ x: -4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleBack}
                                            className="group"
                                        >
                                            ← Analyze another one
                                        </Button>
                                    </motion.div>

                                    {result && (
                                        <ResultsDashboard result={result} />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </PageWrapper>

            {isPending && <LoadingOverlay />}
        </>
    );
}
