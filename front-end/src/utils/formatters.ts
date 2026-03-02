import type { AnalysisResult } from "@/types/resume";

export type ScoreVariant = "danger" | "warning" | "accent" | "success";

export function getScoreVariant(score: number): ScoreVariant {
    if (score <= 40) return "danger";
    if (score <= 60) return "warning";
    if (score <= 80) return "accent";
    return "success";
}

export function getScoreTextClass(score: number): string {
    const variant = getScoreVariant(score);
    const map: Record<ScoreVariant, string> = {
        danger: "text-danger",
        warning: "text-warning",
        accent: "text-accent",
        success: "text-success",
    };
    return map[variant];
}

export function getScoreRingClass(score: number): string {
    const variant = getScoreVariant(score);
    const map: Record<ScoreVariant, string> = {
        danger: "stroke-danger",
        warning: "stroke-warning",
        accent: "stroke-accent",
        success: "stroke-success",
    };
    return map[variant];
}

export type RecommendedActionVariant =
    | "success"
    | "accent"
    | "warning"
    | "danger";

export function getRecommendedActionVariant(
    action: AnalysisResult["recommended_action"],
): RecommendedActionVariant {
    const map: Record<
        AnalysisResult["recommended_action"],
        RecommendedActionVariant
    > = {
        "Strong Hire": "success",
        Hire: "accent",
        Maybe: "warning",
        Reject: "danger",
    };
    return map[action];
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getHumanActionLabel(
    action: AnalysisResult["recommended_action"],
): string {
    const map: Record<AnalysisResult["recommended_action"], string> = {
        "Strong Hire": "Strong Yes",
        Hire: "Yes",
        Maybe: "On the Fence",
        Reject: "Not This Time",
    };
    return map[action];
}

export function getScoreReaction(score: number): string {
    if (score >= 81)
        return "You're a strong match. Don't undersell yourself in there.";
    if (score >= 61) return "Solid fit. A few things to prep and you're ready.";
    if (score >= 41)
        return "It's a stretch \u2014 but stretch roles are how people grow.";
    return "This one's a long shot. Worth knowing before you apply.";
}
