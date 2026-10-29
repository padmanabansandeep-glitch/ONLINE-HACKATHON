# VISTA AI (விஸ்டா) 🧭🎓 — ONLINE HACKATHON
### AI-Enabled Career Counselling & Family Decision-Support Platform for Vocational Education

[![React](https://img.shields.io/badge/React-18%2F19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Firestore-orange.svg)](https://firebase.google.com/)
[![Bilingual](https://img.shields.io/badge/Languages-English%20%7C%20தமிழ்-emerald.svg)]()

> A full-stack, responsive, AI-powered educational technology platform that helps students discover viable vocational education courses and empowers parents and guardians to compare costs, job prospects, and pathways together.

---

## 🌟 Key Highlights & Modules

1. **AI Interest & Aptitude Assessment**:
   - 10-question dual-language psychometric and practical inclination questionnaire.
   - Evaluates 7 core vocational domains: Information Technology, Electrical & Energy, Automotive & EV, Healthcare, Agriculture, Business & Finance, Creative Arts.
   - Interactive Recharts visualizer (Radar affinity graph and bar distributions).

2. **AI Course Recommendation Engine**:
   - Transparent, explainable algorithm matching current qualification (Class 10/12/ITI), stated financial budget (₹), course duration preference, and assessment score.
   - 12+ verified, realistic vocational courses curriculum dataset aligned with NSDC, DGT, and TNSDC frameworks.
   - Match score breakdown (0-100%) explaining *why* each course matches the student profile.

3. **Family Decision-Support Hub (Flagship Module)**:
   - Shared, consent-based dashboard linking student and parent accounts using a unique 6-digit access code (e.g., `VISTA-7294`).
   - Side-by-side comparison of student ambitions vs. parent budget and safety priorities.
   - Interactive discussion feed where parents and students comment on specific courses and mark support status.
   - 5-Pillar Decision Alignment Checklist (Budget suitability, Commute feasibility, Passion alignment, Job prospects, Higher education growth).
   - Final course selection stage tracking updated by the student.

4. **Dedicated AI Career Counsellor Chatbot**:
   - Dual-language support (English and தமிழ்).
   - Context-aware responses reflecting the student's qualification, budget, and assessment status.
   - Supports Google Gemini API integration or secure backend proxy, with an intelligent built-in educational knowledge base fallback that operates offline.
   - Quick-prompt suggestion buttons and session history persistence.

5. **Personalized Career Roadmap**:
   - Step-by-step 6-phase milestone progression from foundational tools to practical labs, portfolio development, NCVT/NASSCOM certification, apprenticeships (NAPS), and mock interviews.
   - Interactive completion checkboxes, progress percentage bar, and celebration confetti upon accomplishment.

6. **Side-by-Side Course Comparison Matrix**:
   - Compares up to 4 courses across tuition fees, course duration, eligibility, skills taught, entry-level jobs, and further education progression.
   - Neutral comparison without declaring any course universally superior.

7. **Multi-Role Support & Instant 1-Click Demo Evaluation**:
   - **Student Role**: Take assessments, explore and shortlist courses, manage roadmap, chat with AI, invite parent.
   - **Parent Role**: View student's shortlisted courses, review fee breakdowns, participate in family discussions.
   - **Administrator Role**: Course catalog CRUD (Add new course, edit details, delete outdated courses), platform analytics, and user feedback review.
   - Fast demo role switcher in the navigation bar to test all 3 views immediately.

8. **Bilingual (English & தமிழ்) & Dark Mode**:
   - Instant language toggle with comprehensive translation dictionary across all navigation, buttons, forms, and assessment questions.
   - Modern blue, violet, and white aesthetic with dark mode toggle and glassmorphism styling.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React.js (ES6+ Modules) with Vite |
| **Styling** | Tailwind CSS v3 with custom glassmorphism and modern gradient palettes |
| **Icons** | Lucide React |
| **Data Visualization** | Recharts (Radar charts and bar charts) |
| **Authentication & Database** | Firebase Authentication & Cloud Firestore (with local persistent fallback) |
| **Backend & Cloud Functions** | Firebase Cloud Functions (`functions/index.js`) |
| **Security & Authorization** | Cloud Firestore Security Rules (`firestore.rules`) |
| **AI Integration** | Google Gemini API (1.5 Flash) + Serverless proxy + Grounded Domain Guidance Engine |
| **Interactive Feedback** | Canvas Confetti |

---

## 📂 Project Architecture

```
VISTA/
├── index.html                   # Entry HTML with Google Fonts & SEO metadata
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind theme extensions & dark mode config
├── postcss.config.js            # PostCSS plugin setup
├── firestore.rules              # Cloud Firestore role-based security rules
├── firebase.json                # Firebase hosting & function deploy settings
├── .env.example                 # Environment variables template
├── functions/
│   └── index.js                 # Firebase Cloud Functions (AI proxy & family link verification)
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application routing & provider setup
    ├── index.css                # Tailwind directives, glassmorphism, and custom styles
    ├── context/
    │   ├── AuthContext.jsx      # Multi-role auth, user state, courses state, family state
    │   ├── LanguageContext.jsx  # English and Tamil (தமிழ்) switcher
    │   └── ThemeContext.jsx     # Dark mode & Light mode switcher
    ├── firebase/
    │   └── config.js            # Firebase client initialization & emulator/mock adapter
    ├── data/
    │   ├── coursesData.js       # 12+ realistic vocational courses with dual-language metadata
    │   └── assessmentQuestions.js # 10 interactive questions with weighted scoring
    ├── services/
    │   ├── recommendationEngine.js # Explainable course recommendation algorithm
    │   └── aiCounsellorService.js # Dual-language AI counsellor service
    ├── translations/
    │   └── translations.js      # English & Tamil translations dictionary
    ├── components/
    │   ├── Navbar.jsx           # Responsive header with role switcher & language toggle
    │   ├── Sidebar.jsx          # Collapsible desktop navigation sidebar
    │   ├── CourseCard.jsx       # Course card with match scores & action buttons
    │   ├── CourseModal.jsx      # Detailed modal with syllabus & accreditation info
    │   └── Footer.jsx           # Modern footer with trust notes and disclaimer
    └── pages/
        ├── LandingPage.jsx      # Animated landing page with hero & sectors showcase
        ├── StudentDashboard.jsx # Personalized home with progress and recommendations
        ├── ParentDashboard.jsx  # Parent portal for fee review & career safety
        ├── AssessmentPage.jsx   # 10-question vocational assessment
        ├── AssessmentResultsPage.jsx # Recharts Radar profile & match results
        ├── CourseExplorerPage.jsx # Search, multi-filters, and budget slider
        ├── CourseComparisonPage.jsx # Side-by-side 4-course comparison matrix
        ├── FamilyDecisionDashboard.jsx # Flagship consent-based collaborative hub
        ├── CareerRoadmapPage.jsx # 6-phase milestone tracker with confetti celebration
        ├── ChatbotPage.jsx      # AI vocational career counsellor chat
        ├── StudentProfilePage.jsx # Student qualification, budget, and goal settings
        ├── AdminDashboard.jsx   # Course catalog CRUD, analytics, and feedback
        ├── PrivacyConsentPage.jsx # Data protection & consent architecture
        ├── LoginPage.jsx        # Login page with 1-click test demo accounts
        └── RegisterPage.jsx     # Registration restricted to Student and Parent
```

---

## 🔒 Cloud Firestore Database & Security Rules

The database design adheres strictly to the required collections:
- `users`: User UID, display name, email, role (`student`, `parent`, `admin`).
- `studentProfiles`: Qualification, stream, marks, interests, budget, location, career goals.
- `assessments`: Calculated domain scores, responses, completion timestamp.
- `courses`: Course title, category, eligibility, duration, fees, skills, career roles, verified institute.
- `familyLinks`: Authorized student-parent consent links (`studentUid`, `parentUid`, `consentStatus`).
- `familyDiscussions`: Shortlisted course notes, student/parent comments, support tags.
- `roadmaps`: Career goal, milestone checklist, progress percentage.
- `chatHistory`: User chat sessions and messages.
- `feedback`: User ratings and comments.

**Security Rules (`firestore.rules`) Highlights:**
- Student profiles are strictly readable only by the student themselves, authorized parents with an active consent record in `familyLinks`, or an administrator.
- The `courses` catalog is publicly readable, but write/edit/delete operations are restricted to verified administrators.
- Parents cannot browse or modify unlinked student records.

---

## 🚀 Running the Project Locally

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Setup & Installation
```bash
# Clone or navigate to the project directory
cd "online hackathon"

# Install dependencies
npm install --legacy-peer-deps
```

### 3. Environment Variables (Optional)
To test with live Firebase or Google Gemini API credentials:
```bash
# Copy example configuration
cp .env.example .env
```
*(The application works with 100% interactive functionality out-of-the-box even without any third-party credentials!)*

### 4. Start Local Development Server
```bash
npm run dev
```
Open **[http://127.0.0.1:5173/](http://127.0.0.1:5173/)** in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 🧪 Demonstration & Testing Walkthrough Guide

Follow these steps during your presentation or evaluation:

1. **Landing Page**:
   - Observe the modern hero banner, animated badges, and vocational sectors showcase.
   - Click the **Language Switcher** in the navbar to toggle between **English** and **தமிழ்**. Notice how all headings, buttons, and descriptions update seamlessly.
   - Click the **Theme Toggle** (Sun/Moon icon) to switch between Dark Mode and Light Mode.

2. **Career Assessment Module**:
   - Click **"Start Career Assessment"**.
   - Answer the 10 interactive questions covering technology, electronics, healthcare, EV systems, agriculture, and business.
   - Click **"Submit & Analyze Matches"**.
   - Review your **Interest Radar Profile** powered by Recharts, your identified strengths, and the top recommended vocational courses with calculated match scores.

3. **Course Explorer & Comparison**:
   - Navigate to **"Course Explorer"**.
   - Search for *"web"* or *"electrician"*. Adjust the **Max Budget Slider** to filter courses under ₹20,000.
   - Click the comparison icon (⚖️) on 3 courses, then navigate to **"Compare Courses"** to view the side-by-side evaluation matrix.

4. **Family Decision-Support Hub**:
   - Click **"Family Decision Hub"**.
   - Review the student's unique 6-digit access code (e.g., `VISTA-7294`).
   - Examine the shared discussion thread for shortlisted courses.
   - Add a note/comment to the discussion thread.
   - Check off items in the **5-Pillar Decision Alignment Checklist**.
   - Update the **Final Course Decision Status**.

5. **AI Career Counsellor Chatbot**:
   - Navigate to **"AI Career Counsellor"**.
   - Click one of the suggested quick prompts (e.g., *"Which vocational courses can I study after Class 10?"* or in Tamil *"10-ஆம் வகுப்பு முடித்தபின் என்ன படிக்கலாம்?"*).
   - Notice the grounded, realistic response highlighting eligibility, skills, and government-subsidized options.

6. **Personalized Career Roadmap**:
   - Navigate to **"Career Roadmap"**.
   - Select your target career (e.g., *Full Stack Web Developer* or *Automobile & EV Technician*).
   - Click on the milestone checkboxes to mark them completed. Notice the completion progress bar update and the celebration confetti animation!

7. **Multi-Role Testing (Student, Parent, Admin)**:
   - Click the **Role Switcher** pill in the top-right navbar.
   - Switch to **Parent (Ramesh)**: Notice the specialized Parent Dashboard focusing on course fee affordability, career safety, and family discussions.
   - Switch to **Admin (Director)**: Notice access to the **Admin Management Portal**, where you can add new vocational courses, inspect platform usage analytics, and review user feedback.

---

## 🎓 College Demonstration Summary

> **"VISTA AI addresses the critical national gap in vocational career counselling. Rather than pushing every student toward generic four-year degrees, it matches students with high-demand, skill-based vocational pathways based on aptitude, qualification, and family budget. Most importantly, its Family Decision-Support Hub brings parents and students together to evaluate tuition costs, job safety, and career growth collaboratively and transparently."**

---
*Developed with ❤️ for Vocational Education and Informed Family Decision-Making.*
>>>>>>> 9eced90 (feat: complete VISTA AI platform implementation)
