export interface FAQ {
  category: string;
  priority: "High" | "Medium" | "Low";
  question: string;
  why_asked: string;
  answer_strategy: string;
}

export interface AnalysisResult {
  fit_score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommended_action: "Strong Hire" | "Hire" | "Maybe" | "Reject";
  faqs: FAQ[];
  red_flags_to_address: string[];
  questions_to_ask_interviewer: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
