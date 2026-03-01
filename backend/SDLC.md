# ResumeIQ — SDLC Documentation

> A living document tracking the design, architecture, and development journey of ResumeIQ.
> Update this file every time a new phase is completed.

---

## 1. Project Overview

**Application Name:** ResumeIQ
**Purpose:** An AI-powered resume analyzer that accepts a resume (PDF) and a job description, then returns a detailed analysis of candidate fit, strengths, gaps, interview preparation questions, and FAQs.
**Status:** In Development — Phase 1 (Backend Setup)

---

## 2. Problem Statement

Job seekers struggle to objectively evaluate how well their resume matches a job description. ResumeIQ solves this by leveraging AI to provide structured, actionable feedback — eliminating guesswork before applying or interviewing.

---

## 3. Core Features Planned

- Upload resume in PDF format
- Paste or upload a job description
- AI-generated match score (0–100)
- Strengths analysis — what matches well
- Gaps analysis — what is missing
- Recommendations — how to improve
- Interview preparation questions
- Role-specific FAQs

---

## 4. Architecture Decisions

### 4.1 Architecture Style
**Monolith (for MVP)** — Single Spring Boot application handles everything. Chosen for simplicity, faster iteration, and easier debugging at this stage. Microservices deferred to a future version.

### 4.2 API Style
**Synchronous REST API** — Client sends request, waits for response. Simple to implement. Claude/Gemini API calls take 5–15 seconds so proper timeout handling and a loading state on the frontend are required.

### 4.3 Storage Strategy
**Stateless (No Database for MVP)** — No data is persisted. Every request is processed in memory and discarded. Keeps the architecture clean and avoids privacy concerns around storing resume data.

### 4.4 PDF Handling
Parsed server-side using Apache PDFBox. File is processed in memory and never written to disk or stored. Ensures privacy and simplicity.

### 4.5 LLM Integration
An abstraction layer (`GeminiService` behind an `LLMService` interface) is used so the AI provider can be swapped in the future without touching business logic.

### 4.6 Prompt Management
Prompts stored as external `.txt` files inside `src/main/resources/prompts/`. Loaded at runtime. This allows prompt iteration without recompiling or redeploying the application.

---

## 5. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Backend | Spring Boot 4.0.3 (Java 21) | Robust, production-grade, familiar |
| Build Tool | Maven | Simpler than Gradle for this project size |
| PDF Parsing | Apache PDFBox | Free, reliable, Java-native |
| HTTP Client | Spring WebClient (Reactive) | Modern, non-blocking, RestTemplate is deprecated |
| AI API | Google Gemini API (Free Tier) | Generous free tier — 1M tokens/day |
| Frontend | React | Better UX for file uploads and rendering structured results |
| Backend IDE | IntelliJ IDEA Community Edition | Free, best Java support |
| Frontend IDE | Cursor | Free tier, AI-native, great for React |
| AI in IDE | Gemini Code Assist (IntelliJ plugin) | Free, no API key needed, just Google login |

---

## 6. Spring Boot Project Configuration

Generated via [start.spring.io](https://start.spring.io) with the following settings:

| Setting | Value |
|---|---|
| Project | Maven |
| Language | Java |
| Spring Boot | 4.0.3 |
| Group | com.resumeiq |
| Artifact | ResumeIQ |
| Package Name | com.resumeiq |
| Packaging | Jar |
| Java Version | 21 |
| Configuration | Properties |

**Dependencies added at generation:**
- Spring Web
- Spring Boot DevTools
- Lombok
- Spring Reactive Web

**Dependency added manually in pom.xml post-generation:**
- Apache PDFBox (PDF text extraction)

---

## 7. Key Concepts Learned

### @RestController vs @Controller
`@RestController` = `@Controller` + `@ResponseBody` combined. It tells Spring to write the return value directly into the HTTP response body as JSON or text. `@Controller` alone is for MVC apps that return HTML views (Thymeleaf, JSP). In a REST API, always use `@RestController`.

### @GetMapping vs @RequestMapping
`@RequestMapping` is the parent annotation that handles any HTTP method but requires explicit method specification. `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping` are shortcuts. Modern Spring code uses the specific shortcut annotations.

### Default Port & Configuration
Spring Boot runs on port `8080` by default. Override in `application.properties` via `server.port=YOUR_PORT`.

---

## 8. Development Phases

### Phase 0 — Setup ✅ COMPLETE
- [x] Project generated on Spring Initializr
- [x] Opened in IntelliJ IDEA Community Edition
- [x] Gemini Code Assist plugin installed
- [x] Health check endpoint created at `GET /health/status`
- [x] Application runs and endpoint responds correctly

### Phase 1 — PDF Upload & Text Extraction ✅ COMPLETE
- [x] Add PDFBox dependency to `pom.xml`
- [x] Create `PdfService` to extract text from uploaded PDF
- [x] Create `POST /resume/upload` endpoint that accepts a PDF file
- [x] Return extracted raw text in the response
- [x] Test with a real PDF

### Phase 2 — AI Integration ✅ COMPLETE
- [x] Get Gemini API key from aistudio.google.com
- [x] Store API key in `application.properties`
- [x] Create `GeminiService` using Client
- [x] Write and store prompt template in `src/main/resources/prompts/`
- [x] Call Gemini API and return raw response
- [x] Handle malformed JSON from AI (self-healing or retry logic)

### Phase 3 — Wire Everything Together ✅ COMPLETE
- [x] Create `ApiResponse` DTO with all fields (score, strengths, gaps, etc.)
- [x] Create `POST /resume/analyze` endpoint combining PDF extraction + AI call
- [x] Parse AI JSON response into DTO using JsonNode and ObjectMapper
- [x] Return structured result to client
- [x] Add proper error handling throughout

### Phase 4 — React Frontend ✅ COMPLETE
- [x] Create React app in Cursor
- [x] Build file upload component (PDF + JD textarea)
- [x] Build results rendering component (score, cards, sections)
- [x] Connect to Spring Boot API via axios
- [x] Handle CORS in Spring Boot with `@CrossOrigin`
- [x] Add loading state and error handling

---

## 9. Prompt Strategy

The AI prompt has four responsibilities:

1. **System context** — defines the AI's role (expert technical recruiter, 15 years experience)
2. **Input injection** — clearly labeled resume text and job description with separators
3. **Task instruction** — explicit list of sections to produce
4. **Output format** — strict instruction to return raw JSON only, no markdown, no explanation

**Expected JSON schema from AI:**
```json
{
  "overallScore": 85,
  "verdict": "Strong Fit | Moderate Fit | Weak Fit",
  "strengths": ["..."],
  "gaps": ["..."],
  "recommendations": ["..."],
  "interviewPrep": {
    "likelyQuestions": ["..."],
    "suggestedAnswersApproach": ["..."],
    "topicsToStudy": ["..."]
  },
  "faqs": ["..."]
}
```

---

## 10. Problem Solving Framework

When stuck, follow this order before asking for help:

1. Read the error message carefully — what is it actually saying?
2. Google it — Stack Overflow, Spring docs, Gemini docs
3. Ask Gemini Code Assist inside IntelliJ
4. Try something, break it, try again
5. Only then ask — but explain what you already tried

---

## 11. Folder Structure (Planned)

```
backend/
└── src/main/
    ├── java/com/resumeiq/
    │   ├── controller/
    │   │   └── ResumeController.java
    │   ├── service/
    │   │   ├── PdfService.java
    │   │   └── GeminiService.java
    │   ├── dto/
    │   │   ├── AnalysisResult.java
    │   │   └── InterviewPrep.java
    │   └── ResumeIqApplication.java
    └── resources/
        ├── prompts/
        │   └── analysis-prompt.txt
        └── application.properties

frontend/
└── src/
    ├── components/
    │   ├── UploadForm.jsx
    │   ├── LoadingState.jsx
    │   └── AnalysisResult.jsx
    ├── App.jsx
    └── index.js
```

---

*Last updated: Phase 4 complete — Application up and running.*