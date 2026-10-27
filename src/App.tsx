import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { AuthProvider } from './context/AuthContext';

// Institutional Main Website Components
import NavEditorial from './components/NavEditorial';
import HeroEditorial from './components/HeroEditorial';
import MarqueeEditorial from './components/MarqueeEditorial';
import BentoEditorial from './components/BentoEditorial';
import ProgramsEditorial from './components/ProgramsEditorial';
import AgeCheckerEditorial from './components/AgeCheckerEditorial';
import MentorEditorial from './components/MentorEditorial';
import RecordEditorial from './components/RecordEditorial';
import BriefingRoom from './components/BriefingRoom';
import ApplySection from './components/ApplySection';
import FooterEditorial from './components/FooterEditorial';

// Modals
import CounselingModal from './components/CounselingModal';
import SyllabusModal from './components/SyllabusModal';
import LegalModal from './components/LegalModal';
import AuthModal from './components/auth/AuthModal';
import PracticeRoom from './components/testing/PracticeRoom';

// Cadet Testing & Command Portal Pages
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { CadetDashboardPage } from './pages/CadetDashboardPage';
import { CadetAuthGate } from './components/CadetAuthGate';
import { CSSSPage } from './pages/CSSSPage';
import { OPAMPage } from './pages/OPAMPage';
import { WrittenPracticePage } from './pages/WrittenPracticePage';
import { FieldBriefsPage } from './pages/FieldBriefsPage';
import { FieldGuidesPage } from './pages/FieldGuidesPage';
import { FounderPage } from './pages/FounderPage';
import { AdminPage } from './pages/AdminPage';
import { getStudentUser, clearStudentUser } from './lib/storage';

// ----------------------------------------------------
// MAIN INSTITUTIONAL ACADEMY WEBSITE (sodaedu.in)
// ----------------------------------------------------
function MainWebsite() {
  const [, setLocation] = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counselingModal, setCounselingModal] = useState({
    isOpen: false,
    initialCourse: 'NDA Coaching',
    calculatorData: null,
  });
  const [syllabusCourse, setSyllabusCourse] = useState(null);
  const [legalModalType, setLegalModalType] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPracticeRoom, setShowPracticeRoom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const progress = max > 0 ? h.scrollTop / max : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBriefing = (programName = 'General Officer Briefing', calcData = null) => {
    setCounselingModal({
      isOpen: true,
      initialCourse: programName,
      calculatorData: calcData,
    });
  };

  const closeBriefing = () => {
    setCounselingModal({
      isOpen: false,
      initialCourse: 'General Officer Briefing',
      calculatorData: null,
    });
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#0A1428] relative font-sans">
      {/* Ambient Grain & Scroll Progress Overlay */}
      <div className="grain" aria-hidden="true"></div>
      <div 
        className="progress" 
        style={{ transform: `scaleX(${scrollProgress})` }} 
        aria-hidden="true"
      ></div>

      {/* Navigation with Practice Room & Auth triggers */}
      <NavEditorial 
        onOpenBriefing={openBriefing}
        onOpenPracticeRoom={() => setShowPracticeRoom(true)}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      <main id="top">
        {/* Hero Section */}
        <HeroEditorial 
          onOpenBriefing={openBriefing}
          onOpenTests={() => setShowPracticeRoom(true)}
          onExplorePrograms={() => {
            const el = document.getElementById('programs');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Marquee Ticker Tape */}
        <MarqueeEditorial />

        {/* 01 — By the Numbers (Bento Grid) */}
        <BentoEditorial 
          onOpenBriefing={openBriefing}
        />

        {/* 02 — Programs (Curriculum Sequenced + Path Roadmap) */}
        <ProgramsEditorial 
          onViewSyllabus={(course) => setSyllabusCourse(course)}
          onOpenBriefing={openBriefing}
        />

        {/* 03 — Defense Age & Eligibility Engine */}
        <AgeCheckerEditorial 
          onOpenBriefingWithEligible={(calcPayload) => {
            openBriefing('Eligibility Consultation', calcPayload);
          }}
        />

        {/* 04 — The Mentor (Lt. Arjit M. Bharadwaj) */}
        <MentorEditorial 
          onOpenBriefing={openBriefing}
        />

        {/* 05 — The Record (Cadet Selections & Verified Reviews) */}
        <RecordEditorial />

        {/* 06 — The Briefing Room (Journal & Military Guides) */}
        <BriefingRoom />

        {/* 07 — Apply for Briefing */}
        <ApplySection />
      </main>

      {/* Footer */}
      <FooterEditorial 
        onOpenLegal={(type) => setLegalModalType(type)}
        onViewProgram={() => {
          const el = document.getElementById('programs');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating WhatsApp Action Pill */}
      <a 
        href="https://wa.me/918433247664?text=Hello%20Sabre%20Officers%20Defense%20Academy%2C%20I%20would%20like%20to%20inquire%20about%20officer%20coaching%20batches."
        target="_blank"
        rel="noreferrer"
        className="whatsapp-floating"
        aria-label="Direct WhatsApp Academy Chat"
      >
        <span className="text-base leading-none">💬</span>
        <span>Chat with Desk</span>
      </a>

      {/* Modals */}
      <CounselingModal
        isOpen={counselingModal.isOpen}
        onClose={closeBriefing}
        initialCourse={counselingModal.initialCourse}
        calculatorData={counselingModal.calculatorData}
      />

      <SyllabusModal
        course={syllabusCourse}
        onClose={() => setSyllabusCourse(null)}
        onEnquire={(title) => {
          setSyllabusCourse(null);
          openBriefing(title);
        }}
      />

      <LegalModal
        policyType={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Cadet Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
        }}
      />

      {/* Cadet Practice Testing Room (SSB OIR, PPDT, GAT) */}
      {showPracticeRoom && (
        <PracticeRoom
          onClose={() => setShowPracticeRoom(false)}
          onOpenAuth={() => setShowAuthModal(true)}
        />
      )}
    </div>
  );
}

// ----------------------------------------------------
// ROUTER WRAPPER: UNIFIES MAIN WEBSITE + CADET PORTAL
// ----------------------------------------------------
export default function App() {
  const [, setLocation] = useLocation();

  const handleSignOut = () => {
    clearStudentUser();
    setLocation('/');
  };

  return (
    <AuthProvider>
      <Switch>
        {/* Flagship Institutional Website */}
        <Route path="/" component={MainWebsite} />
        <Route path="/home" component={MainWebsite} />
        <Route path="/public" component={MainWebsite} />

        {/* Dedicated Cadet Login & Enrollment Gate */}
        <Route path="/login">
          <CadetAuthGate onSuccess={() => setLocation('/dashboard')} />
        </Route>

        {/* Cadet Command & Telemetry Dashboard */}
        <Route path="/dashboard">
          <CadetDashboardPage
            onSignOut={handleSignOut}
            onOpenPublicView={() => setLocation('/')}
          />
        </Route>

        {/* Admin Management Console */}
        <Route path="/admin">
          <AdminPage section="dashboard" />
        </Route>
        <Route path="/admin/dashboard">
          <AdminPage section="dashboard" />
        </Route>
        <Route path="/admin/students">
          <AdminPage section="students" />
        </Route>
        <Route path="/admin/tests">
          <AdminPage section="tests" />
        </Route>
        <Route path="/admin/questions">
          <AdminPage section="questions" />
        </Route>

        {/* Public Testing & Cadet Drills with SiteHeader & SiteFooter */}
        <Route path="/csss">
          <SiteHeader />
          <main className="flex-1">
            <CSSSPage />
          </main>
          <SiteFooter />
        </Route>

        <Route path="/opam">
          <SiteHeader />
          <main className="flex-1">
            <OPAMPage />
          </main>
          <SiteFooter />
        </Route>

        <Route path="/tests">
          <SiteHeader />
          <main className="flex-1">
            <WrittenPracticePage />
          </main>
          <SiteFooter />
        </Route>

        <Route path="/briefs">
          <SiteHeader />
          <main className="flex-1">
            <FieldBriefsPage />
          </main>
          <SiteFooter />
        </Route>

        <Route path="/guides">
          <SiteHeader />
          <main className="flex-1">
            <FieldGuidesPage />
          </main>
          <SiteFooter />
        </Route>

        <Route path="/founder">
          <SiteHeader />
          <main className="flex-1">
            <FounderPage />
          </main>
          <SiteFooter />
        </Route>

        {/* Fallback to Main Website */}
        <Route component={MainWebsite} />
      </Switch>
    </AuthProvider>
  );
}
