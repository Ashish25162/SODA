# Sabre Officers Defense Academy (SODA) — Redesigned Web Portal

Modern, clean, institutional, and high-converting web platform redesigned for **Sabre Officers Defense Academy (SODA)** (`sodaedu.in`), Gwalior, Madhya Pradesh.

---

## 🏛️ Architectural Highlights & Features

### 1. Modern Institutional EdTech Design System
- **Color Discipline (60-30-10 Rule):**
  - **60% Primary Background:** Crisp Alabaster (`#F8FAFC`) and Pure White (`#FFFFFF`).
  - **30% Dark Brand Surface:** Deep Naval Obsidian (`#0A192F`) & Slate (`#0F172A`).
  - **10% Officer Accent & CTAs:** Officer’s Brass Gold (`#D97706` / hover: `#B45309`).
  - **Tri-Service Badges:**
    - **Army:** `#ECFCCB` bg, `#3F6212` text, `#BEF264` border.
    - **Navy:** `#DBEAFE` bg, `#1E40AF` text, `#93C5FD` border.
    - **Air Force:** `#E0F2FE` bg, `#0369A1` text, `#7DD3FC` border.
    - **SSB / Mentorship:** `#FEF3C7` bg, `#92400E` text, `#FDE68A` border.
- **Typography:** `Plus Jakarta Sans` for bold military headings, `Inter` for clean body typography.

### 2. High-Conversion 2-Column Split Hero (Replaced Slow Carousels)
- **Left Column:**
  - Trust Pill: `⚓ Mentored by Former Indian Navy Officer Lt. Arjit Mohan Bharadwaj`.
  - H1: *"Forge Your Path to Command in the Indian Armed Forces."*
  - Subtitle: Clear positioning for NDA, CDS, AFCAT, CAPF, and SSB.
  - Interactive Goal Selector (Pills): Immediately filters the 6 programs below based on candidate stage.
  - Primary & Secondary CTAs + Bottom Trust Bar (4.9★ Google Rating, 1-on-1 Mentorship, Tri-Service).
- **Right Column:**
  - Mentor showcase card featuring Lt. Arjit Mohan Bharadwaj (Former Officer, Indian Navy).
  - Tri-Service insignia pills (`Indian Army`, `Indian Navy`, `Indian Air Force`).
  - Floating glassmorphic trust badges (`Focus on 15 OLQs`, `Dedicated GTO Ground`).

### 3. Decision Course Cards (6 Programs)
Filterable grid (`All Programs`, `After 10th/12th`, `Graduate Entries`, `SSB Interview`) with structured metadata badges:
1. **NDA Coaching** (Class 12th Appearing / Pass)
2. **CDS Coaching** (Graduates / Final Year)
3. **AFCAT Coaching** (Indian Air Force Wings)
4. **CAPF (AC) Coaching** (Assistant Commandant)
5. **SSB Interview Program** (5-Day Testing & Dossier Review)
6. **Foundation Course** (11th & 12th Integrated)

*Actions:* "View Syllabus" (opens clean blueprint modal) & "Enquire Now" (opens counseling modal).

### 4. Interactive Defense Age & Eligibility Checker (Lead Magnet)
- Real-time calculation of candidate age in years & months from DOB.
- Instant green eligibility status for NDA, CDS, AFCAT, CAPF, and Foundation.
- Direct CTA: *"Get Personalized Study Plan for Your Eligible Exams"* pre-filling the counseling desk.

### 5. Mentor Spotlight & 5-Day SSB Bento Grid
- **"Building Future Officers. Guided by Real Service Experience."**
- **Card 1 (Featured Navy Deep Blue):** Philosophy statement avoiding rote answers, 3 key pillars.
- **Card 2:** Stage I & Psychological Battery (OIR, PPDT, TAT, WAT, SRT, SDT).
- **Card 3:** Outdoor GTO Ground Training (PGT, HGT, Obstacles in Gwalior).
- **Card 4:** Personal Interview & Board Conference (1-on-1 interview with Lt. Arjit Mohan Bharadwaj).

### 6. Verified Google Student Experiences
- 8 real verified student reviews from Gwalior candidates (Arun Pratap Singh, Abhinav Singh, Tanishq Kushwah, Anjali Rajawat, Rahul Sharma, Yuvraj Singh, Shivam Singh, Mayank Singh Tomar).
- Exam filter pills: `All Reviews`, `SSB Candidates`, `NDA`, `CDS`, `AFCAT`.

### 7. Latest Defense Insights & Bug Fix
- **CRITICAL BUG FIXED:** Resolved the "Invalid Date" bug from the previous website using `formatDateSafe` with fallback validation.
- 3 complete article cards with full read-modal support.

### 8. Institutional Footer & Counseling Modal
- 4-column structured footer with address in Padav Gwalior, phone numbers, WhatsApp, Play Store app link, and legal policy modals.
- Interactive admissions form with direct WhatsApp API routing (`+91 84332 47664`) and Google Apps Script background integration.

---

## 🛠️ Tech Stack & Commands

- **Framework:** React 18, Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Icons:** `lucide-react`
- **Fonts:** Plus Jakarta Sans, Inter

### Development:
```bash
npm.cmd run dev
```

### Production Build:
```bash
npm.cmd run build
```
Production output is located in `dist/`.
