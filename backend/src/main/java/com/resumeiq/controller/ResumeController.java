package com.resumeiq.controller;

import com.resumeiq.dto.ApiResponse;
import com.resumeiq.service.PdfService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/resume")
public class ResumeController {

    private final PdfService pdfService;

    public ResumeController(PdfService pdfService) {
        this.pdfService = pdfService;
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<String>> uploadResume(@RequestParam("resume") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Please upload a file!"));
        }

        String extractedText = pdfService.extractText(file);
        return ResponseEntity.ok(ApiResponse.success("PDF text extracted successfully", extractedText));
    }
}
