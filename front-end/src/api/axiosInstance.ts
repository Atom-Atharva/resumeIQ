import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isNetworkError?: boolean,
    public isTimeout?: boolean
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1.0";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 180000,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      throw new ApiError(
        "The analysis is taking longer than expected. Please try again.",
        undefined,
        false,
        true
      );
    }

    if (error.code === "ERR_NETWORK" || !error.response) {
      throw new ApiError(
        "Unable to connect to server. Please check your connection.",
        undefined,
        true,
        false
      );
    }

    const statusCode = error.response?.status;
    const data = error.response?.data as { message?: string } | undefined;
    const message =
      data?.message ?? error.message ?? "An unexpected error occurred.";

    throw new ApiError(message, statusCode, false, false);
  }
);
