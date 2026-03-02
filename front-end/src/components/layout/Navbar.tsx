import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md transition-all duration-200">
            <nav
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between"
                aria-label="Main navigation"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <Sparkles
                            className="w-5 h-5 text-white"
                            aria-hidden="true"
                        />
                    </div>
                    <span className="text-heading font-semibold text-text-primary">
                        ResumeIQ
                    </span>
                </div>
                <ThemeToggle />
            </nav>
        </header>
    );
}
