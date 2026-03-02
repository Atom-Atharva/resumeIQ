import type { AnalysisResult, ApiResponse } from "@/types/resume";
import { axiosInstance } from "./axiosInstance";

export async function analyzeResume(
  file: File,
  jobDescription: string
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  const response = await axiosInstance.post<ApiResponse<AnalysisResult>>(
    "/resume/analyze",
    formData
  );

  return response.data.data;
}
