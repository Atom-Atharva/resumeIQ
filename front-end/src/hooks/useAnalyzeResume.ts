import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AnalysisResult } from "@/types/resume";
import { ApiError } from "@/api/axiosInstance";
import { analyzeResume } from "@/api/resumeApi";

export interface AnalyzeParams {
  file: File;
  jobDescription: string;
}

export function useAnalyzeResume() {
  const mutation = useMutation<AnalysisResult, ApiError, AnalyzeParams>({
    mutationFn: ({ file, jobDescription }) => analyzeResume(file, jobDescription),
  });

  const analyze = (
    params: AnalyzeParams,
    options?: UseMutationOptions<AnalysisResult, ApiError, AnalyzeParams>
  ) => mutation.mutate(params, options);

  const errorMessage =
    mutation.error instanceof ApiError ? mutation.error.message : undefined;

  return {
    analyze,
    data: mutation.data,
    isPending: mutation.isPending,
    error: mutation.error,
    errorMessage,
    reset: mutation.reset,
  };
}
