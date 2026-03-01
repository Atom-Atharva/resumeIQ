package com.resumeiq.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.resumeiq.exception.GeminiServiceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class GeminiService {

    private final Client client;
    private final String promptTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public GeminiService(@Value("${gemini.api.key}") String apiKey,
                         @Value("classpath:prompts/resume-prompt.txt") Resource promptResource) throws IOException {
        this.client = Client.builder()
                .apiKey(apiKey)
                .build();
        this.promptTemplate = promptResource.getContentAsString(StandardCharsets.UTF_8);
    }

    @Retryable(
            retryFor = {GeminiServiceException.class},
            maxAttempts = 3,
            backoff = @Backoff(delay = 2000, multiplier = 2)
    )
    public JsonNode analyze(String resume, String jobDescription) {
        String fullPrompt = promptTemplate.replace("{{RESUME}}", resume)
                .replace("{{JOB_DESCRIPTION}}", jobDescription);

        GenerateContentConfig config = GenerateContentConfig.builder()
                .responseMimeType("application/json")
                .build();

        GenerateContentResponse response = client.models.generateContent(
                "gemini-3-flash-preview",
                fullPrompt,
                config
        );

        String result = response.text();

        if (result == null || result.isBlank()) {
            // triggers retry
            throw new GeminiServiceException("AI returned empty response");
        }

        try{
            return objectMapper.readTree(result);
        } catch (JacksonException e) {
            throw new GeminiServiceException("AI returned malformed JSON");
        }
    }

    @Recover
    public String recover(GeminiServiceException e, String resume, String jobDescription) {
        // Throws force error after retries.
        throw new GeminiServiceException("AI failed after 3 attempts. " + e.getMessage(), e);
    }

}
