import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    showCharCount?: boolean;
    maxCharCount?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            error,
            showCharCount = false,
            maxCharCount,
            value,
            className = "",
            ...props
        },
        ref,
    ) => {
        const charCount = typeof value === "string" ? value.length : 0;

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-small font-medium text-text-primary mb-2">
                        {label}
                        {props.required && (
                            <span className="text-danger ml-1">*</span>
                        )}
                    </label>
                )}
                <div className="relative">
                    <textarea
                        ref={ref}
                        value={value}
                        className={`w-full px-4 py-3 text-body bg-surface border rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-text-muted/50 ${
                            error
                                ? "border-danger focus:ring-danger"
                                : "border-border focus:bg-surface-raised"
                        } ${className}`}
                        {...props}
                    />
                    {showCharCount && maxCharCount && (
                        <div className="absolute bottom-3 right-3 text-micro text-text-muted pointer-events-none">
                            {charCount} / {maxCharCount}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-1.5 text-small text-danger flex items-center gap-1">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Textarea.displayName = "Textarea";
