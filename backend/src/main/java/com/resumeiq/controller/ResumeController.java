package com.resumeiq.controller;

import com.resumeiq.dto.ApiResponse;
import com.resumeiq.service.GeminiService;
import com.resumeiq.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.JsonNode;

import java.io.IOException;

@RestController
@RequestMapping("/resume")
@RequiredArgsConstructor
public class ResumeController {

    @Autowired
    private final PdfService pdfService;

    @Autowired
    private final GeminiService geminiService;

    @PostMapping("/analyze")
    public ResponseEntity<ApiResponse<Object>> uploadResume(
            @RequestParam("resume") MultipartFile file,
            @RequestParam("jobDescription") String jobDescription) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Resume file cannot be empty.");
        }
        if (jobDescription.isEmpty()) {
            throw new IllegalArgumentException("Job description cannot be empty.");
        }

        String extractedText = pdfService.extractText(file);
        JsonNode aiResponse = geminiService.analyze(extractedText, jobDescription);

        return ResponseEntity.ok(ApiResponse.success("Resume Analysis Completed.", aiResponse));
    }
}
