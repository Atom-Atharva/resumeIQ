import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    isLoading?: boolean;
    children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            fullWidth = false,
            isLoading = false,
            disabled,
            className = "",
            children,
            ...props
        },
        ref,
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary:
                "bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.01] active:scale-[0.99]",
            secondary:
                "bg-surface-raised text-text-primary border border-border hover:bg-surface hover:border-accent/50",
            ghost: "text-text-primary hover:bg-surface-raised hover:text-accent active:bg-surface",
            danger: "bg-danger text-white hover:bg-danger/90 shadow-lg shadow-danger/20 hover:shadow-xl hover:shadow-danger/30",
        };

        const sizes = {
            sm: "text-small px-3 py-1.5 h-8",
            md: "text-body px-4 py-2 h-10",
            lg: "text-body px-6 py-3 h-[52px] text-[1rem] font-semibold",
        };

        const widthClass = fullWidth ? "w-full" : "";

        return (
            <motion.button
                ref={ref}
                whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Loader2
                            className="w-5 h-5 animate-spin"
                            aria-hidden="true"
                        />
                        <span>Working on it...</span>
                    </>
                ) : (
                    children
                )}
            </motion.button>
        );
    },
);

Button.displayName = "Button";
