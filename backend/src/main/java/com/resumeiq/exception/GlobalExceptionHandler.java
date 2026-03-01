package com.resumeiq.exception;

import com.resumeiq.dto.ApiResponse;
import com.resumeiq.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;

import java.io.IOException;
import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleIOException(IOException ex, WebRequest request) {
        ErrorResponse errorDetails = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "File Processing Error",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );
        ApiResponse<ErrorResponse> apiResponse = ApiResponse.error("An error occurred while processing the file.", errorDetails);
        return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleMaxSizeException(MaxUploadSizeExceededException ex, WebRequest request) {
        ErrorResponse errorDetails = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.PAYLOAD_TOO_LARGE.value(),
                "File Size Limit Exceeded",
                "File size exceeds the configured limit.",
                request.getDescription(false).replace("uri=", "")
        );
        ApiResponse<ErrorResponse> apiResponse = ApiResponse.error("File is too large.", errorDetails);
        return new ResponseEntity<>(apiResponse, HttpStatus.PAYLOAD_TOO_LARGE);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        ErrorResponse errorDetails = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Invalid Request",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );
        ApiResponse<ErrorResponse> apiResponse = ApiResponse.error("Invalid argument provided.", errorDetails);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleGlobalException(Exception ex, WebRequest request) {
        ErrorResponse errorDetails = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );
        ApiResponse<ErrorResponse> apiResponse = ApiResponse.error("A server error occurred.", errorDetails);
        return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleMultipartException(MultipartException ex, WebRequest request) {
        ErrorResponse errorDetails = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Invalid File Upload",
                "Please upload a valid multipart file.",
                request.getDescription(false).replace("uri=", "")
        );
        ApiResponse<ErrorResponse> apiResponse = ApiResponse.error("File upload failed.", errorDetails);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(GeminiServiceException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleGeminiException(GeminiServiceException ex, WebRequest request) {
        ErrorResponse errorDetails = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.SERVICE_UNAVAILABLE.value(),
                "AI Service Error",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );
        ApiResponse<ErrorResponse> apiResponse = ApiResponse.error("Resume analysis failed. Please try again.", errorDetails);
        return new ResponseEntity<>(apiResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }
}
