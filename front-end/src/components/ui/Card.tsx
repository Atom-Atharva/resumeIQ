import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: "default" | "raised" | "bordered";
    padding?: "none" | "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            children,
            variant = "default",
            padding = "lg",
            className = "",
            ...props
        },
        ref,
    ) => {
        const baseStyles =
            "rounded-2xl transition-all duration-200 bg-surface border border-border";

        const variants = {
            default: "shadow-sm",
            raised: "shadow-lg",
            bordered: "border-2",
        };

        const paddings = {
            none: "",
            sm: "p-3",
            md: "p-4",
            lg: "p-6",
        };

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    },
);

Card.displayName = "Card";
