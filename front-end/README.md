# ResumeIQ

> AI-powered resume analyzer and interview preparation tool.

---

## Overview

ResumeIQ analyzes your PDF resume against a job description to deliver AI-powered insights for interview preparation. Upload your resume, paste the job description, and receive a comprehensive report including fit score, strengths, gaps, role-specific interview questions with answer strategies, red flags to address, and questions to ask the interviewer. The tool helps job seekers understand how well they match a role and prepare strategically for interviews.

---

## Tech Stack

| Layer     | Technology                   |
| --------- | ---------------------------- |
| Frontend  | React 18, TypeScript, Vite   |
| Styling   | Tailwind CSS                 |
| Animation | Framer Motion                |
| State     | React Query (TanStack Query) |
| HTTP      | Axios                        |
| Icons     | Lucide React                 |
| Backend   | Spring Boot 4, Java 21       |
| AI        | Google Gemini 2.0 Flash      |
| PDF       | Apache PDFBox 3              |

---

## Project Structure

```
front-end/
├── Dockerfile                              # Docker container configuration
├── index.html                              # HTML entry point
├── package.json                            # NPM dependencies and scripts
├── postcss.config.js                       # PostCSS configuration
├── README.md                               # Project documentation (this file)
├── tailwind.config.ts                      # Tailwind CSS configuration with typography scale
├── tsconfig.json                           # TypeScript configuration
├── tsconfig.node.json                      # TypeScript config for Node tools
├── vite.config.d.ts                        # Vite config type declarations
├── vite.config.js                          # Vite configuration (JS)
├── vite.config.ts                          # Vite configuration (TS)
├── app/
│   ├── routes/                             # Route definitions
│   └── welcome/                            # Welcome page components
├── public/                                 # Static assets
└── src/
    ├── App.tsx                             # Root app with hero section and animated gradient blobs
    ├── index.css                           # Global design system with color tokens and shadows
    ├── main.tsx                            # Application entry point
    ├── vite-env.d.ts                       # Vite environment type definitions
    ├── api/
    │   ├── axiosInstance.ts                # Axios instance with base config and interceptors
    │   └── resumeApi.ts                    # Resume analysis API functions
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx                  # Frosted glass navbar with logo and theme toggle
    │   │   └── PageWrapper.tsx             # Responsive page layout wrapper
    │   ├── results/
    │   │   ├── FaqSection.tsx              # Grouped FAQs by category with priority badges and accordions
    │   │   ├── FitScoreCard.tsx            # Animated ring with glow effect and counting animation
    │   │   ├── GapsCard.tsx                # Gaps with alternating row backgrounds
    │   │   ├── QuestionsCard.tsx           # Numbered question cards in 2-column grid
    │   │   ├── RecommendedAction.tsx       # Large badge with scale animation and context notes
    │   │   ├── RedFlagsCard.tsx            # Red bordered cards with success state when empty
    │   │   ├── ResultsDashboard.tsx        # Main results orchestrator with staggered animations
    │   │   ├── StrengthsCard.tsx           # Strengths with alternating row backgrounds
    │   │   └── SummaryCard.tsx             # Summary with left accent border and scrollable content
    │   ├── shared/
    │   │   ├── ErrorMessage.tsx            # Shake animation with Try Again and Start Over buttons
    │   │   ├── LoadingOverlay.tsx          # Progress bar with cycling messages and tips
    │   │   └── ThemeToggle.tsx             # Three-state theme toggle (system/light/dark) with icons
    │   ├── ui/
    │   │   ├── Badge.tsx                   # Multi-variant badge with size options
    │   │   ├── Button.tsx                  # Gradient button with hover effects and loading state
    │   │   ├── Card.tsx                    # Card container with variant and padding options
    │   │   ├── Spinner.tsx                 # Animated loading spinner
    │   │   └── Textarea.tsx                # Textarea with label, error state, and character count
    │   └── upload/
    │       ├── FileUpload.tsx              # Drag-and-drop with scale animation and file preview card
    │       └── JobDescriptionInput.tsx     # Textarea with character count (10,000 max)
    ├── context/
    │   └── ThemeContext.tsx                # Theme provider with system/light/dark support
    ├── hooks/
    │   ├── useAnalyzeResume.ts             # React Query mutation hook for resume analysis
    │   └── useTheme.ts                     # Hook to access theme context
    ├── types/
    │   └── resume.ts                       # TypeScript types for API responses
    └── utils/
        └── formatters.ts                   # Utility functions for score colors and labels
```

---

## Features

- [x] PDF resume upload with drag and drop
- [x] Job description input
- [x] AI-powered fit score (0-100)
- [x] Recruiter summary
- [x] Strengths analysis
- [x] Gaps analysis
- [x] Hiring recommendation
- [x] Role-specific interview FAQs grouped by category and priority
- [x] Red flags identification
- [x] Questions to ask the interviewer
- [x] Light / Dark / System theme
- [x] Fully responsive (320px to 1440px)
- [x] Animated UI with Framer Motion
- [x] Global error handling
- [x] Retry logic on AI failure

---

## Getting Started

### Prerequisites

- Node.js 20+
- Java 21
- Maven 3.9+

### Frontend Setup

```bash
cd front-end
npm install
cp .env.example .env
npm run dev
```

### Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

### Environment Variables

| Variable          | Description          | Example               |
| ----------------- | -------------------- | --------------------- |
| VITE_API_BASE_URL | Spring Boot base URL | http://localhost:8080 |
| GEMINI_API_KEY    | Google Gemini key    | AIza...               |

---

## API Reference

### POST /resume/analyze

Analyzes a PDF resume against a job description using Google Gemini AI and returns detailed insights.

**Request:**

```
Content-Type: multipart/form-data

resume:         PDF file (binary)
jobDescription: string
```

**Response:**

```json
{
    "success": true,
    "message": "Resume Analysis Completed.",
    "data": {
        "fit_score": 72,
        "summary": "Strong technical background with 5 years of full-stack experience...",
        "strengths": [
            "Extensive React and TypeScript expertise",
            "Strong system design experience"
        ],
        "gaps": [
            "Limited experience with microservices architecture",
            "No mention of Kubernetes or container orchestration"
        ],
        "recommended_action": "Maybe",
        "faqs": [
            {
                "category": "Technical Skills",
                "priority": "High",
                "question": "How do you approach state management in large React applications?",
                "why_asked": "To assess architectural decision-making",
                "answer_strategy": "Discuss trade-offs between Context API, Redux, and React Query..."
            }
        ],
        "red_flags_to_address": [
            "Employment gap between Jan 2022 and Jun 2022"
        ],
        "questions_to_ask_interviewer": [
            "What does the on-call rotation look like for this team?",
            "How does the team approach technical debt?"
        ]
    }
}
```

**Example:**

```bash
curl -X POST http://localhost:8080/resume/analyze \
  -F "resume=@/path/to/resume.pdf" \
  -F "jobDescription=We are looking for a Senior Full-Stack Engineer..."
```

---

## Architecture Decisions

| Decision                          | Reason                                                   |
| --------------------------------- | -------------------------------------------------------- |
| Spring Retry with 3 attempts      | Gemini occasionally returns empty or malformed JSON      |
| responseMimeType application/json | Prevents Gemini from wrapping JSON in markdown           |
| JsonNode return type              | Avoids double serialization of AI response string        |
| React Query for API calls         | Built-in loading, error, retry state management          |
| Framer Motion for all animations  | Consistent spring physics, respects reduced-motion       |
| Three-state theme system          | Respects OS preferences while allowing manual override   |
| Alternating row backgrounds       | Improves scannability in dense lists like strengths/gaps |
| Gradient blobs on hero            | Creates visual interest without distracting from content |
| Custom scrollbar styling          | Maintains design consistency across all scroll areas     |

---

## Known Issues

| Issue          | Status | Notes |
| -------------- | ------ | ----- |
| None currently | —      | —     |

---

## Changelog

> All notable changes to ResumeIQ are documented here, ordered newest first.

---

### 🎨 `2026-03-01` — Humanize UI & Remove Purple Gradients

| Area                 | Change                                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Color System**     | Replaced all purple/indigo/violet gradients with **teal** (primary) and **coral** (secondary) accent palette. New CSS tokens: `accent-light`, `accent-muted`, `coral`, `coral-light`, `coral-dark` |
| **Copy Overhaul**    | Rewrote every user-facing string with warm, conversational tone                                                                                                                                    |
| **Loading Messages** | Humanized cycling messages — _"Reading through your resume…"_, _"Thinking about what an interviewer would ask you…"_, etc. New rotating tips                                                       |
| **Score Reactions**  | Contextual human reactions below fit score ring based on score range                                                                                                                               |
| **Result Entrance**  | 1.2 s intro flash — _"Alright, here's the honest picture."_ — before dashboard appears                                                                                                             |
| **Section Intros**   | Warm subtitle copy added to FAQ, Questions, and Red Flags sections                                                                                                                                 |
| **Analyze Button**   | Subtle pulse animation (`scale 1 → 1.01 → 1`) when both inputs are ready; tooltip when disabled                                                                                                    |
| **File Upload**      | Post-select guidance: _"Good — we've got your resume. Now paste the job description below."_                                                                                                       |
| **Error Page**       | _"Well, that didn't work."_ with empathetic body copy                                                                                                                                              |
| **Back Button**      | _"← Analyze another one"_ replacing _"New Analysis"_                                                                                                                                               |
| **Footer**           | Centered line at results bottom: _"ResumeIQ — built to give you an honest shot at the job"_                                                                                                        |
| **Developer Credit** | Hidden signature in loading overlay (`opacity-40`, `text-micro`): _"crafted with way too much coffee by Atharva ✦"_                                                                                |
| **Button**           | Solid teal `bg-accent` replacing purple gradient                                                                                                                                                   |
| **Navbar**           | Solid teal logo mark replacing gradient                                                                                                                                                            |

<details>
<summary>📁 Files affected (20)</summary>

`index.css` · `tailwind.config.ts` · `formatters.ts` · `Button.tsx` · `Navbar.tsx` · `LoadingOverlay.tsx` · `ErrorMessage.tsx` · `FileUpload.tsx` · `JobDescriptionInput.tsx` · `FitScoreCard.tsx` · `SummaryCard.tsx` · `RecommendedAction.tsx` · `StrengthsCard.tsx` · `GapsCard.tsx` · `FaqSection.tsx` · `RedFlagsCard.tsx` · `QuestionsCard.tsx` · `ResultsDashboard.tsx` · `App.tsx` · `README.md`

</details>

---

### ✨ `2026-03-01` — Complete Visual & Structural Overhaul

| Area                    | Change                                                                                                                                                                                     |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Design System**       | Rebuilt with refined color palette, softer dark mode (no pure blacks), typography scale (`display` / `title` / `heading` / `body` / `small` / `micro`), custom shadows, smooth transitions |
| **Theme System**        | Three-state cycle (system → light → dark), animated icon transitions, `localStorage` persistence                                                                                           |
| **Button**              | Gradient backgrounds, hover scaling, loading state                                                                                                                                         |
| **Card**                | Variant and padding options                                                                                                                                                                |
| **Badge**               | 8 variants, 3 sizes                                                                                                                                                                        |
| **Spinner / Textarea**  | Enhanced spinner; Textarea with character count                                                                                                                                            |
| **Navbar**              | Frosted glass effect with logo mark                                                                                                                                                        |
| **PageWrapper**         | Responsive padding                                                                                                                                                                         |
| **ThemeToggle**         | Rotating icon animations                                                                                                                                                                   |
| **LoadingOverlay**      | Progress bar, cycling status messages, animated logo pulse, rotating tips                                                                                                                  |
| **ErrorMessage**        | Shake animation, dual action buttons (Try Again / Start Over)                                                                                                                              |
| **FileUpload**          | Inviting drag zone, scale on hover/drag, checkmark badge on file select                                                                                                                    |
| **JobDescriptionInput** | Integrated with new Textarea component                                                                                                                                                     |
| **FitScoreCard**        | Larger ring (180 px), glow effect, thicker stroke, counting animation                                                                                                                      |
| **RecommendedAction**   | Large pill badge, scale animation, context notes                                                                                                                                           |
| **SummaryCard**         | Left accent border, raised background, scrollable content                                                                                                                                  |
| **Strengths / Gaps**    | Alternating row backgrounds, icon headers, stagger animations                                                                                                                              |
| **FaqSection**          | Category grouping, priority badges, Eye / Lightbulb icons, high-priority count                                                                                                             |
| **RedFlagsCard**        | Red left borders, success state when empty                                                                                                                                                 |
| **QuestionsCard**       | Numbered cards, 2-column grid, hover effects                                                                                                                                               |
| **ResultsDashboard**    | Improved responsive grid (`sm` / `lg` breakpoints)                                                                                                                                         |
| **App.tsx**             | Animated gradient blobs, pill badge with pulse, display heading, staggered entrance, Sparkle icon on button                                                                                |
| **Accessibility**       | ARIA labels, focus rings, semantic HTML, color never sole indicator, `prefers-reduced-motion` respected                                                                                    |
| **Responsiveness**      | Optimized 320 px → 1536 px, mobile-first, appropriate breakpoints                                                                                                                          |

<details>
<summary>📁 Files affected (27)</summary>

`index.css` · `tailwind.config.ts` · `ThemeContext.tsx` · `useTheme.ts` · `Button.tsx` · `Card.tsx` · `Badge.tsx` · `Spinner.tsx` · `Textarea.tsx` · `Navbar.tsx` · `PageWrapper.tsx` · `ThemeToggle.tsx` · `LoadingOverlay.tsx` · `ErrorMessage.tsx` · `FileUpload.tsx` · `JobDescriptionInput.tsx` · `FitScoreCard.tsx` · `SummaryCard.tsx` · `RecommendedAction.tsx` · `StrengthsCard.tsx` · `GapsCard.tsx` · `FaqSection.tsx` · `RedFlagsCard.tsx` · `QuestionsCard.tsx` · `ResultsDashboard.tsx` · `App.tsx` · `README.md`

</details>
