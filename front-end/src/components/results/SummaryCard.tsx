import { Card } from "@/components/ui/Card";

export interface SummaryCardProps {
    summary: string;
}

export function SummaryCard({ summary }: SummaryCardProps) {
    return (
        <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-l-2xl" />
            <Card className="border-l-0 rounded-l-none bg-surface-raised">
                <h3 className="text-heading font-semibold text-text-primary mb-3">
                    The recruiter's perspective
                </h3>
                <div className="max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-body text-text-muted leading-relaxed">
                        {summary}
                    </p>
                </div>
            </Card>
        </div>
    );
}
