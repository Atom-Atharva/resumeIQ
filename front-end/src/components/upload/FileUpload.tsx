import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { formatFileSize } from "@/utils/formatters";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPE = "application/pdf";

export interface FileUploadProps {
    file: File | null;
    onFileChange: (file: File | null) => void;
    error?: string;
}

export function FileUpload({ file, onFileChange, error }: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const reducedMotion = useReducedMotion();

    const validateFile = (f: File): string | null => {
        if (f.type !== ACCEPTED_TYPE) {
            return "We need a PDF for this — got one?";
        }
        if (f.size > MAX_SIZE_BYTES) {
            return `File size must be 5MB or less. Current size: ${formatFileSize(f.size)}.`;
        }
        return null;
    };

    const handleFile = (f: File | null) => {
        setValidationError(null);
        if (!f) {
            onFileChange(null);
            return;
        }
        const err = validateFile(f);
        if (err) {
            setValidationError(err);
            onFileChange(null);
            return;
        }
        onFileChange(f);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) handleFile(dropped);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        handleFile(selected ?? null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleClear = () => {
        onFileChange(null);
        setValidationError(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleClick = () => {
        if (file) return;
        inputRef.current?.click();
    };

    return (
        <div className="w-full">
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPE}
                onChange={handleChange}
                className="sr-only"
                aria-label="Upload PDF resume"
            />

            {file ? (
                <>
                    <motion.div
                        initial={
                            !reducedMotion
                                ? { opacity: 0, scale: 0.95, y: 8 }
                                : undefined
                        }
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative flex items-center gap-4 p-4 rounded-2xl border-2 border-success/20 bg-success/5"
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                                <FileText
                                    className="w-6 h-6 text-success"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-medium text-text-primary truncate">
                                    {file.name}
                                </p>
                                <p className="text-small text-text-muted">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10">
                                    <CheckCircle2
                                        className="w-4 h-4 text-success"
                                        aria-hidden="true"
                                    />
                                    <span className="text-micro font-medium text-success uppercase">
                                        Ready
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    aria-label="Remove file"
                                    className="p-2 rounded-lg hover:bg-danger/10 text-text-muted hover:text-danger transition-colors"
                                >
                                    <X className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                    <AnimatePresence>
                        <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="mt-2 text-small text-text-muted"
                        >
                            Good — we've got your resume. Now paste the job
                            description below.
                        </motion.p>
                    </AnimatePresence>
                </>
            ) : (
                <motion.div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleClick();
                        }
                    }}
                    aria-label="Drop PDF here or click to browse"
                    animate={
                        isDragOver
                            ? { borderColor: "rgb(var(--accent))", scale: 1.01 }
                            : { borderColor: "rgb(var(--border))", scale: 1 }
                    }
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col items-center justify-center gap-3 p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                        isDragOver
                            ? "bg-accent/5 border-accent"
                            : "border-border hover:border-accent/50 hover:bg-surface-raised"
                    } ${
                        error || validationError
                            ? "border-danger bg-danger/5"
                            : ""
                    }`}
                    whileHover={
                        !reducedMotion && !isDragOver
                            ? { scale: 1.005 }
                            : undefined
                    }
                    whileTap={!reducedMotion ? { scale: 0.995 } : undefined}
                >
                    <motion.div
                        animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center"
                    >
                        <Upload
                            className="w-8 h-8 text-accent"
                            aria-hidden="true"
                        />
                    </motion.div>
                    <div className="text-center">
                        <p className="text-body font-medium text-text-primary mb-1">
                            Your resume goes here
                        </p>
                        <p className="text-small text-text-muted">
                            PDF only, max 5MB — we promise we won't judge the
                            formatting.
                        </p>
                    </div>
                </motion.div>
            )}

            {(error || validationError) && (
                <p className="mt-2 text-small text-danger" role="alert">
                    {error ?? validationError}
                </p>
            )}
        </div>
    );
}
