import { Textarea } from "@/components/ui/Textarea";

export interface JobDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const MAX_CHARS = 10000;

export function JobDescriptionInput({
    value,
    onChange,
    error,
}: JobDescriptionInputProps) {
    return (
        <Textarea
            label="Job Description"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste the job posting here. The more complete it is, the better our analysis."
            error={error}
            required
            rows={8}
            maxLength={MAX_CHARS}
            showCharCount
            maxCharCount={MAX_CHARS}
            className="min-h-[180px] resize-y"
        />
    );
}
