# Sabre Officers Defense Academy (SODA) — Cadet Command & Testing Portal

> **Official Cadet Assessment & Training Platform integrated with [sodaedu.in](https://sodaedu.in/)**  
> **Headquarters:** 106, MLB Colony, Padav, Lashkar, Gwalior MP – 474002 (`GWL // 26°13'N 78°10'E`)  
> **Chief Mentor:** Lt. Arjit M. Bharadwaj (Ex-Army Officer, NDA & IMA Alumnus)

---

## 🎖️ Overview

**SODA (Sabre Officers Defense Academy)** is an institutional military editorial web application designed for defence aspirants preparing for the **Services Selection Board (SSB)** Stage 1 Screening and Stage 2 Psychological Evaluations (NDA, CDS, AFCAT, OTA, INET, and CAPF).

The platform transforms defence preparation into an officer-grade training chamber featuring:
- **Cadet Authentication & Enrollment Portal**: Seamless sign-in and registration workflow with assigned Cadet Codes (e.g., `SODA-2601`).
- **Cadet Training Dashboard**: Personalized candidate dossier, real-time Stage 1 screening readiness index, and live assessment telemetry.
- **Interactive Student Profile Editor**: Manage target defence entry, academic qualification, SSB experience, and contact details with instant local synchronization.
- **CSSS Cognitive Battery (70 Questions)**: 5 timed sections testing verbal logic, SVG spatial rotation diagrams, 900ms visual flash recall drills, auditory discrimination (Web Speech API), and OIR speed sprints.
- **OPAM Officer Personality Matrix (120 Items)**: Time-compressed (15s/item) non-rehearsed situational and self-description matrix evaluating the **15 Officer Like Qualities (OLQ)** across 4 Core Factors.
- **Admin Management Console (`/admin`)**: Academy telemetry, candidate roster, test/question bank management, and CSV exports.
- **Field Assets**: Written practice drills, daily military signal briefs, SOP field manuals, and Chief Mentor dispatches.

---

## 🎨 Design Philosophy & Aesthetic Identity

The portal implements an **Institutional Military Editorial** design system:
- **Parchment & Editorial Canvas**: Antique Alabaster & Bone Cream (`#F4EFE6`, `#FAF6EE`) conveying official gazette and commission records.
- **Deep Naval Anchors**: Heavy naval obsidian (`#08122A`, `#0A1428`) providing officer-grade authority and contrast.
- **Tri-Service Accentuation**:
  - *Indian Navy*: Deep Admiralty Ink (`#0A1428`)
  - *Indian Army*: Service Olive Drab (`#5A7048`)
  - *Officer Commission*: Brushed Brass Gold (`#C9A961`)
- **Universal Regular Sans-Serif Typography**: Clean, authoritative, modern sans-serif (`Inter Tight` / `Inter`) throughout headings, body copy, and UI controls for maximum clarity and readability.

---

## 🚀 Key Functional Modules

### 1. Cadet Authentication & Enrollment Gate (`/` or `/login`)
- Supports verified 1-click logins for demonstration cadets:
  - `Arun Pratap Singh` (`SODA-2601` · CDS / IMA Dehradun)
  - `Abhinav Singh` (`SODA-2602` · NDA 11th/12th Foundation)
  - `Tanishq Kushwah` (`SODA-2603` · AFCAT Flying Branch)
- New cadet registration form capturing full profile dossier (Name, Email, Mobile, Target Entry, Education Level, Prior SSB Board Exposure, Location).
- Automatic cadet ID provisioning and session persistence.

### 2. Cadet Command Dashboard (`/` or `/dashboard`)
- **Student Profile Dossier Card**: Displays cadet avatar, full name, code, contact details, target entry, and academic status.
- **Profile Modal Editor**: Cadets can update their personal details at any time.
- **Dossier Transcript Export**: Downloadable official `.txt` candidate record.
- **4 Real-Time Telemetry Gauges**:
  1. *Stage 1 Clearance Readiness Index*
  2. *CSSS Cognitive Speed Quotient*
  3. *OPAM 15 OLQ Factor Endorsement*
  4. *Field Drills Completed Tally*
- **Assessment History Table**: Chronological log of past test scores, percentages, and performance bands.
- **Integrated Sub-Navigation**: Quick switching between Command Overview, Student Profile Dossier, CSSS Battery, OPAM Matrix, Assessment Logs, Written Drills, Signal Briefs, SOP Manuals, and Chief Mentor Desk.

### 3. CSSS Cognitive Battery (70 Questions across 5 Sections)
- Section 1: **Verbal Logic & Analogies** (15 Questions)
- Section 2: **Spatial & Pattern Reasoning** (15 Questions with interactive SVG diagram generator)
- Section 3: **Working Memory & Flash Recall** (15 Questions with 900ms visual flash stimulus)
- Section 4: **Auditory Discrimination & Recall** (10 Questions utilizing Web Speech API speech synthesis)
- Section 5: **OIR Speed Sprint** (15 Questions under strict time constraints)
- Comprehensive performance debrief with section breakdown and Stage 1 screening clearance probability.

### 4. OPAM Officer Personality Matrix (120 Items)
- **15-Second Soft Timer** per prompt to capture subconscious, authentic reactions.
- **Irreversible Forward Flow** (No back navigation or answer modification).
- Profiles all **15 Officer Like Qualities (OLQ)**:
  - *Factor I (Planning & Organizing)*: Effective Intelligence, Reasoning Ability, Organizing Ability, Power of Expression.
  - *Factor II (Social Adjustment)*: Social Adaptability, Cooperation, Sense of Responsibility.
  - *Factor III (Social Effectiveness)*: Initiative, Self Confidence, Speed of Decision, Ability to Influence Group, Liveliness.
  - *Factor IV (Dynamic)*: Determination, Courage, Stamina.
- Comprehensive debrief featuring radar visualization, Top 3 strengths, and Bottom 3 growth recommendations.

### 5. Academy Admin Console (`/admin`)
- Accessible via `/admin` or `/admin/dashboard` (Default access PIN: `soda2026`).
- Real-time candidate registration telemetry and assessment completion metrics.
- Candidate directory with student details, defence entries, and CSV export (`soda-cadets-register.csv`).
- Test catalogue and Question Bank CRUD controls.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v3, PostCSS, Autoprefixer
- **Routing**: Wouter (lightweight declarative routing)
- **Icons**: Lucide React
- **Audio Synthesis**: Native Web Speech API (`speechSynthesis`)
- **Visuals**: SVG Vector Diagram Renderer, Canvas Confetti
- **Storage**: Browser LocalStorage engine with automatic seed profiles and CSV export
- **Bundler & Tooling**: Vite 8, Node.js

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/Ashish25162/SODA.git

# Navigate into the project directory
cd SODA

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🏛️ SODA Academy Campus

- **Campus Address**: 106, MLB Colony, Padav, Lashkar, Gwalior, Madhya Pradesh – 474002
- **Helpline**: +91 90098 29888 / +91 84332 47664
- **Official Website**: [https://sodaedu.in/](https://sodaedu.in/)

---

## 📄 License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE).
