import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?:
        | "default"
        | "success"
        | "warning"
        | "danger"
        | "accent"
        | "rose"
        | "amber"
        | "slate";
    size?: "sm" | "md" | "lg";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            children,
            variant = "default",
            size = "md",
            className = "",
            ...props
        },
        ref,
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200";

        const variants = {
            default: "bg-surface-raised text-text-primary border border-border",
            success: "bg-success/10 text-success border border-success/20",
            warning: "bg-warning/10 text-warning border border-warning/20",
            danger: "bg-danger/10 text-danger border border-danger/20",
            accent: "bg-accent/10 text-accent border border-accent/20",
            rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
            amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
            slate: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20",
        };

        const sizes = {
            sm: "text-micro px-2 py-0.5 h-5",
            md: "text-small px-3 py-1 h-6",
            lg: "text-body px-8 py-3 min-w-[12rem] h-12 text-lg font-bold",
        };

        return (
            <span
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            >
                {children}
            </span>
        );
    },
);

Badge.displayName = "Badge";
