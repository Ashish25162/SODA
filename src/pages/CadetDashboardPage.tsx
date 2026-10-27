import React, { useState, useEffect } from 'react';
import {
  Shield,
  User,
  Award,
  Clock,
  Compass,
  FileText,
  CheckCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Download,
  Edit3,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Brain,
  Layers,
  MapPin,
  Calendar,
  Phone,
  Mail,
  GraduationCap,
  Sparkles,
  LogOut,
  Crosshair,
  BarChart3,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import {
  StudentUser,
  getStudentUser,
  setStudentUser,
  clearStudentUser,
  getStudentAttempts,
  AssessmentAttempt,
  exportAssessmentsCSV,
  exportStudentsCSV,
} from '../lib/storage';
import { CadetProfileModal } from '../components/CadetProfileModal';
import { CSSSPage } from './CSSSPage';
import { OPAMPage } from './OPAMPage';
import { WrittenPracticePage } from './WrittenPracticePage';
import { FieldBriefsPage } from './FieldBriefsPage';
import { FieldGuidesPage } from './FieldGuidesPage';
import { FounderPage } from './FounderPage';

interface CadetDashboardPageProps {
  onSignOut: () => void;
  onOpenPublicView?: () => void;
}

export const CadetDashboardPage: React.FC<CadetDashboardPageProps> = ({
  onSignOut,
  onOpenPublicView,
}) => {
  const [cadet, setCadet] = useState<StudentUser | null>(getStudentUser());
  const [attempts, setAttempts] = useState<AssessmentAttempt[]>([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'csss' | 'opam' | 'written' | 'briefs' | 'guides' | 'founder' | 'history'
  >('overview');

  useEffect(() => {
    const user = getStudentUser();
    if (user) {
      setCadet(user);
    }
    setAttempts(getStudentAttempts());
  }, [activeTab]);

  const handleProfileUpdated = (updated: StudentUser) => {
    setCadet(updated);
  };

  const handleCadetSignOut = () => {
    clearStudentUser();
    onSignOut();
  };

  if (!cadet) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <Shield size={48} className="text-gold mb-4" />
        <h2 className="text-2xl font-bold text-ink mb-2">No Active Cadet Session Found</h2>
        <p className="text-sm text-ink-3 max-w-md mb-6">
          Please sign in with your cadet code or complete your enrollment registration to access the training chamber.
        </p>
        <button
          onClick={onSignOut}
          className="bg-navy-1 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3 px-6 rounded shadow-sm hover:bg-navy-3"
        >
          Go to Sign In / Enrollment Gate
        </button>
      </div>
    );
  }

  // Calculate dynamic stats
  const csssAttempts = attempts.filter((a) => a.testSlug === 'csss');
  const opamAttempts = attempts.filter((a) => a.testSlug === 'opam');

  const latestCsssScore = csssAttempts.length > 0 ? csssAttempts[csssAttempts.length - 1].percentage : 78;
  const latestOpamScore = opamAttempts.length > 0 ? opamAttempts[opamAttempts.length - 1].percentage : 84;
  const overallReadiness = Math.round((latestCsssScore + latestOpamScore) / 2);

  // Download cadet profile transcript
  const handleDownloadTranscript = () => {
    const summary = [
      `SABRE OFFICERS DEFENSE ACADEMY (SODA) — CADET DOSSIER RECORD`,
      `=============================================================`,
      `Cadet Code: ${cadet.studentCode}`,
      `Candidate Name: ${cadet.fullName}`,
      `Target Entry: ${cadet.defenceEntry}`,
      `Educational Background: ${cadet.educationLevel}`,
      `SSB Experience: ${cadet.previousSsbExperience}`,
      `Contact Email: ${cadet.email}`,
      `Contact Mobile: ${cadet.mobile}`,
      `Location: ${cadet.city || 'Gwalior'}, ${cadet.state || 'Madhya Pradesh'}`,
      `Enrolled At: ${new Date(cadet.createdAt).toLocaleDateString()}`,
      `Last Activity: ${new Date(cadet.lastLoginAt).toLocaleString()}`,
      `-------------------------------------------------------------`,
      `Overall SSB Readiness Index: ${overallReadiness}%`,
      `CSSS Cognitive Battery Status: ${csssAttempts.length > 0 ? `${latestCsssScore}% (Attempted)` : 'Ready for Initial Screening'}`,
      `OPAM Personality Matrix Status: ${opamAttempts.length > 0 ? `${latestOpamScore}% (Completed)` : 'Pending Assessment'}`,
      `Total Assessments Logged: ${attempts.length}`,
      `Academy Verification: Sabre Officers Defense Academy, Gwalior (sodaedu.in)`,
      `Chief Mentor: Lt. Arjit M. Bharadwaj (Ex-Army Officer, NDA & IMA)`,
    ].join('\n');

    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${cadet.studentCode}-Cadet-Dossier-SODA.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-cream-1 text-ink flex flex-col">
      {/* 1. Tactical Cadet Status Bar */}
      <header className="bg-navy-1 text-cream-1 border-b border-tactical-gold sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand & Dashboard Tag */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded bg-navy-2 border border-tactical-gold flex items-center justify-center text-gold font-bold text-base shadow-sm">
                S
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm sm:text-base text-cream-1 tracking-tight">
                    SODA CADET DASHBOARD
                  </span>
                  <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-mono bg-olive/30 border border-olive/50 text-gold-2 rounded uppercase font-bold">
                    OFFICER ENCLAVE
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cream-1/60 hidden sm:block">
                  GWL // 26°13'N 78°10'E · Integrated with sodaedu.in
                </div>
              </div>
            </div>

            {/* Right: Active Cadet Pill & Quick Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Cadet Identification Badge */}
              <button
                onClick={() => setIsProfileModalOpen(true)}
                title="Click to view and edit full profile dossier"
                className="flex items-center space-x-2 px-3 py-1.5 bg-navy-2/90 hover:bg-navy-3 border border-tactical-gold/40 rounded text-left transition-all group"
              >
                <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-bold">
                  {cadet.fullName.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <div className="text-xs font-bold text-cream-1 flex items-center space-x-1 group-hover:text-gold transition-colors">
                    <span>{cadet.fullName}</span>
                    <Edit3 size={11} className="opacity-60 group-hover:opacity-100" />
                  </div>
                  <div className="text-[10px] font-mono text-gold-2">
                    {cadet.studentCode} · {cadet.defenceEntry.split(' ')[0]}
                  </div>
                </div>
              </button>

              {/* Public Academy View Toggle */}
              {onOpenPublicView && (
                <button
                  onClick={onOpenPublicView}
                  className="hidden lg:flex items-center space-x-1 px-2.5 py-1.5 text-xs font-mono text-cream-1/70 hover:text-gold border border-cream-1/20 hover:border-tactical-gold rounded transition-colors"
                >
                  <ExternalLink size={12} />
                  <span>Academy Portal</span>
                </button>
              )}

              {/* Sign Out */}
              <button
                onClick={handleCadetSignOut}
                title="Sign out of cadet session"
                className="p-2 text-cream-1/70 hover:text-red hover:bg-navy-2 rounded border border-transparent hover:border-red/30 transition-all"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tactical Sub-Navigation Bar */}
        <div className="bg-navy-2/80 border-t border-cream-1/10 px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-4 py-2 min-w-max text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeTab === 'overview'
                  ? 'bg-gold text-navy-1 font-bold shadow-sm'
                  : 'text-cream-1/70 hover:text-cream-1 hover:bg-navy-1'
              }`}
            >
              <TrendingUp size={14} />
              <span>Command Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeTab === 'profile'
                  ? 'bg-gold text-navy-1 font-bold shadow-sm'
                  : 'text-cream-1/70 hover:text-cream-1 hover:bg-navy-1'
              }`}
            >
              <User size={14} />
              <span>Student Profile Dossier</span>
            </button>
            <button
              onClick={() => setActiveTab('csss')}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeTab === 'csss'
                  ? 'bg-gold text-navy-1 font-bold shadow-sm'
                  : 'text-cream-1/70 hover:text-cream-1 hover:bg-navy-1'
              }`}
            >
              <Brain size={14} />
              <span>CSSS Battery (70Q)</span>
            </button>
            <button
              onClick={() => setActiveTab('opam')}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeTab === 'opam'
                  ? 'bg-gold text-navy-1 font-bold shadow-sm'
                  : 'text-cream-1/70 hover:text-cream-1 hover:bg-navy-1'
              }`}
            >
              <Layers size={14} />
              <span>OPAM Matrix (120Q)</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeTab === 'history'
                  ? 'bg-gold text-navy-1 font-bold shadow-sm'
                  : 'text-cream-1/70 hover:text-cream-1 hover:bg-navy-1'
              }`}
            >
              <BarChart3 size={14} />
              <span>Assessment Logs</span>
            </button>
            <button
              onClick={() => setActiveTab('written')}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeTab === 'written'
                  ? 'bg-gold text-navy-1 font-bold shadow-sm'
                  : 'text-cream-1/70 hover:text-cream-1 hover:bg-navy-1'
              }`}
            >
              <BookOpen size={14} />
              <span>Written Drills</span>
            </button>
            <button
              onClick={() => setActiveTab('briefs')}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeTab === 'briefs'
                  ? 'bg-gold text-navy-1 font-bold shadow-sm'
                  : 'text-cream-1/70 hover:text-cream-1 hover:bg-navy-1'
              }`}
            >
              <FileText size={14} />
              <span>Signal Briefs</span>
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeTab === 'guides'
                  ? 'bg-gold text-navy-1 font-bold shadow-sm'
                  : 'text-cream-1/70 hover:text-cream-1 hover:bg-navy-1'
              }`}
            >
              <Compass size={14} />
              <span>SOP Manuals</span>
            </button>
            <button
              onClick={() => setActiveTab('founder')}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeTab === 'founder'
                  ? 'bg-gold text-navy-1 font-bold shadow-sm'
                  : 'text-cream-1/70 hover:text-cream-1 hover:bg-navy-1'
              }`}
            >
              <Shield size={14} />
              <span>Chief Mentor Desk</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: COMMAND OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Student Profile Hero Dossier */}
            <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 sm:p-8 shadow-dossier relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                {/* Left: Cadet Identity */}
                <div className="flex items-start sm:items-center space-x-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-navy-1 border-2 border-tactical-gold text-gold flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-md shrink-0">
                    {cadet.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-xs px-2.5 py-0.5 bg-cream-3 border border-tactical-2 rounded font-bold text-ink">
                        {cadet.studentCode}
                      </span>
                      <span className="font-mono text-xs px-2.5 py-0.5 bg-olive/15 text-olive font-bold border border-olive/30 rounded flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse"></span>
                        <span>OFFICER CADET</span>
                      </span>
                      <span className="font-mono text-xs text-ink-3">
                        Gwalior Enclave · Batch 2026
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                      {cadet.fullName}
                    </h1>

                    <p className="text-xs sm:text-sm text-ink-3 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center space-x-1 text-ink-2 font-medium">
                        <Crosshair size={13} className="text-gold" />
                        <span>Target: <strong>{cadet.defenceEntry}</strong></span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GraduationCap size={13} className="text-ink-4" />
                        <span>{cadet.educationLevel}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin size={13} className="text-ink-4" />
                        <span>{cadet.city || 'Gwalior'}, {cadet.state || 'Madhya Pradesh'}</span>
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right: Profile Actions */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="flex-1 sm:flex-initial bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded shadow-sm transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Edit3 size={14} />
                    <span>Edit Profile Dossier</span>
                  </button>
                  <button
                    onClick={handleDownloadTranscript}
                    className="flex-1 sm:flex-initial bg-cream-1 hover:bg-cream-3 text-ink-2 border border-tactical-2 font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded shadow-sm transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Download size={14} />
                    <span>Export Transcript</span>
                  </button>
                </div>
              </div>

              {/* Secondary Details Strip */}
              <div className="mt-6 pt-6 border-t border-tactical grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-ink-4 font-mono uppercase block text-[10px]">Registered Email</span>
                  <span className="font-medium text-ink break-all">{cadet.email}</span>
                </div>
                <div>
                  <span className="text-ink-4 font-mono uppercase block text-[10px]">Cadet Mobile</span>
                  <span className="font-medium text-ink">{cadet.mobile}</span>
                </div>
                <div>
                  <span className="text-ink-4 font-mono uppercase block text-[10px]">SSB Board Exposure</span>
                  <span className="font-medium text-ink">{cadet.previousSsbExperience}</span>
                </div>
                <div>
                  <span className="text-ink-4 font-mono uppercase block text-[10px]">Parent Institution</span>
                  <span className="font-medium text-ink">SODA Gwalior (sodaedu.in)</span>
                </div>
              </div>
            </div>

            {/* 4 Tactical Telemetry Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1 */}
              <div className="bg-cream-2 border border-tactical-2 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-ink-3 mb-2">
                  <span>Stage 1 Clearance Readiness</span>
                  <Shield size={16} className="text-gold" />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-ink">{overallReadiness}%</span>
                  <span className="text-xs font-mono text-olive font-bold">OPTIMAL PROBABILITY</span>
                </div>
                <div className="w-full bg-cream-4 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-gold h-full rounded-full transition-all duration-700"
                    style={{ width: `${overallReadiness}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-ink-3 mt-2">
                  Based on CSSS speed quotient & OPAM OLQ factor distribution.
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-cream-2 border border-tactical-2 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-ink-3 mb-2">
                  <span>CSSS Cognitive Index</span>
                  <Brain size={16} className="text-gold" />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-ink">{latestCsssScore}%</span>
                  <span className="text-xs font-mono text-ink-3">
                    {csssAttempts.length > 0 ? `${csssAttempts.length} Attempt(s)` : 'Baseline'}
                  </span>
                </div>
                <div className="w-full bg-cream-4 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-navy-1 h-full rounded-full transition-all duration-700"
                    style={{ width: `${latestCsssScore}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-ink-3 mt-2">
                  Spatial perception, visual flash recall & auditory accuracy.
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-cream-2 border border-tactical-2 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-ink-3 mb-2">
                  <span>OPAM Factor Endorsement</span>
                  <Layers size={16} className="text-gold" />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-ink">{latestOpamScore}%</span>
                  <span className="text-xs font-mono text-olive font-bold">15 OLQ BALANCED</span>
                </div>
                <div className="w-full bg-cream-4 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-olive h-full rounded-full transition-all duration-700"
                    style={{ width: `${latestOpamScore}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-ink-3 mt-2">
                  Factor 1 (Planning), Factor 2 (Social), Factor 3 (Courage).
                </div>
              </div>

              {/* Metric 4 */}
              <div className="bg-cream-2 border border-tactical-2 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-ink-3 mb-2">
                  <span>Field Drills Completed</span>
                  <CheckCircle size={16} className="text-olive" />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-ink">{Math.max(attempts.length, 3)}</span>
                  <span className="text-xs font-mono text-ink-3">Simulations</span>
                </div>
                <div className="w-full bg-cream-4 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-gold-2 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="text-[11px] text-ink-3 mt-2">
                  Stage 1 OIR sprint tests, PPDT drills & field guides.
                </div>
              </div>
            </div>

            {/* Main Action Chambers: CSSS & OPAM Launchers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink">
                    Officer Assessment Chambers
                  </h2>
                  <p className="text-xs text-ink-3">
                    Stage 1 military testing batteries calibrated to current Services Selection Board standards.
                  </p>
                </div>
                <span className="font-mono text-xs text-gold font-bold uppercase tracking-wider hidden sm:inline-block">
                  // OFFICIAL SODA ENGINES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chamber 1: CSSS */}
                <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 shadow-dossier hover:border-tactical-gold transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-gold font-bold uppercase tracking-widest">
                        // CHAMBER ALPHA
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 bg-cream-3 border border-tactical text-ink rounded font-bold">
                        70 QUESTIONS · 5 SECTIONS
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-ink mb-2">
                      CSSS Cognitive Screening Battery
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-3 mb-4 leading-relaxed">
                      Comprehensive Stage 1 cognitive examination with 5 timed modules: Verbal Logic, SVG Spatial Diagrams, 900ms Flash Memory, Auditory Discrimination (Speech Synthesis), and OIR Speed Sprint.
                    </p>

                    <div className="space-y-2 mb-6 text-xs text-ink-2 font-mono">
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={14} className="text-olive shrink-0" />
                        <span>Interactive SVG Diagram & Rotation Generator</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={14} className="text-olive shrink-0" />
                        <span>900ms Visual Flash Recall Simulation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={14} className="text-olive shrink-0" />
                        <span>Speech Synthesis Auditory Discriminations</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-tactical flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-ink-3">
                      Recent: <strong>{latestCsssScore}%</strong>
                    </span>
                    <button
                      onClick={() => setActiveTab('csss')}
                      className="bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded shadow-sm transition-all flex items-center space-x-2"
                    >
                      <span>Launch CSSS Chamber</span>
                      <Play size={13} fill="currentColor" />
                    </button>
                  </div>
                </div>

                {/* Chamber 2: OPAM */}
                <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 shadow-dossier hover:border-tactical-gold transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-olive font-bold uppercase tracking-widest">
                        // CHAMBER BRAVO
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 bg-cream-3 border border-tactical text-ink rounded font-bold">
                        120 ITEMS · 15 OLQ FACTORS
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-ink mb-2">
                      OPAM Officer Personality Matrix
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-3 mb-4 leading-relaxed">
                      Rigorous behavioral and situational evaluation measuring 15 Officer Like Qualities (OLQ) across Factor I (Planning & Intellect), Factor II (Social Adaptability), Factor III (Social Effectiveness), and Factor IV (Dynamic Drive).
                    </p>

                    <div className="space-y-2 mb-6 text-xs text-ink-2 font-mono">
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={14} className="text-olive shrink-0" />
                        <span>15-Second Latency Pressure per Item</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={14} className="text-olive shrink-0" />
                        <span>Irreversible Forward Flow (No Back Navigation)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={14} className="text-olive shrink-0" />
                        <span>Radar-Style 15 Factor Debrief & Recommendations</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-tactical flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-ink-3">
                      Recent: <strong>{latestOpamScore}%</strong>
                    </span>
                    <button
                      onClick={() => setActiveTab('opam')}
                      className="bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded shadow-sm transition-all flex items-center space-x-2"
                    >
                      <span>Launch OPAM Matrix</span>
                      <Play size={13} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment History Table */}
            <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-ink">Recent Assessment Attempts</h3>
                  <p className="text-xs text-ink-3">
                    Telemetry logs of your battery completions and performance bands.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-xs font-mono text-gold hover:text-navy-3 font-bold uppercase tracking-wider flex items-center space-x-1"
                >
                  <span>View All Logs</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {attempts.length === 0 ? (
                <div className="p-8 text-center bg-cream-1 rounded border border-tactical text-xs text-ink-3">
                  <p className="font-bold text-ink mb-1">No completed assessments recorded yet.</p>
                  <p>Launch the CSSS Cognitive Chamber or OPAM Personality Matrix above to establish your baseline score.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-cream-3 text-ink-2 uppercase tracking-wider border-b border-tactical">
                      <tr>
                        <th className="py-2.5 px-3">Attempt ID</th>
                        <th className="py-2.5 px-3">Assessment Title</th>
                        <th className="py-2.5 px-3">Score Achieved</th>
                        <th className="py-2.5 px-3">Performance Band</th>
                        <th className="py-2.5 px-3">Completed At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tactical">
                      {attempts.slice(0, 5).map((att) => (
                        <tr key={att.attemptId} className="hover:bg-cream-3/40 transition-colors">
                          <td className="py-3 px-3 text-ink-3">{att.attemptId.slice(0, 14)}</td>
                          <td className="py-3 px-3 font-bold text-ink">{att.testName}</td>
                          <td className="py-3 px-3 font-bold text-navy-1">{att.score} ({att.percentage}%)</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                att.percentage >= 75
                                  ? 'bg-olive/20 text-olive'
                                  : att.percentage >= 60
                                  ? 'bg-gold/20 text-ink'
                                  : 'bg-red/15 text-red'
                              }`}
                            >
                              {att.percentage >= 75
                                ? 'RECOMMENDED'
                                : att.percentage >= 60
                                ? 'COMPETITIVE'
                                : 'DEVELOPMENT NEEDED'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-ink-3">
                            {new Date(att.completedAt).toLocaleDateString()} · {new Date(att.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Access Study Assets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('written')}
                className="p-5 bg-cream-2 border border-tactical-2 rounded-xl hover:border-tactical-gold text-left transition-all shadow-sm group"
              >
                <div className="w-9 h-9 rounded bg-navy-1 text-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <BookOpen size={18} />
                </div>
                <h4 className="font-bold text-ink mb-1 group-hover:text-gold transition-colors">
                  Written Practice Drills
                </h4>
                <p className="text-xs text-ink-3">
                  OIR verbal sequences, non-verbal matrices, and PPDT perception sheets.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('briefs')}
                className="p-5 bg-cream-2 border border-tactical-2 rounded-xl hover:border-tactical-gold text-left transition-all shadow-sm group"
              >
                <div className="w-9 h-9 rounded bg-navy-1 text-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <FileText size={18} />
                </div>
                <h4 className="font-bold text-ink mb-1 group-hover:text-gold transition-colors">
                  Daily Signal Briefs
                </h4>
                <p className="text-xs text-ink-3">
                  Curated defence currents, tri-service modernisation, and border updates.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('guides')}
                className="p-5 bg-cream-2 border border-tactical-2 rounded-xl hover:border-tactical-gold text-left transition-all shadow-sm group"
              >
                <div className="w-9 h-9 rounded bg-navy-1 text-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Compass size={18} />
                </div>
                <h4 className="font-bold text-ink mb-1 group-hover:text-gold transition-colors">
                  SOP Field Manuals
                </h4>
                <p className="text-xs text-ink-3">
                  Stage 1 screening protocol, GTO obstacle physics, and interview dossiers.
                </p>
              </button>
            </div>

            {/* Chief Mentor Dispatch */}
            <div className="bg-navy-1 text-cream-1 rounded-xl p-6 sm:p-8 border border-tactical-gold relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider mb-2">
                    <Shield size={14} />
                    <span>CHIEF MENTOR DISPATCH // LT. ARJIT M. BHARADWAJ</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-cream-1 mb-2">
                    "Stage 1 is not an examination of knowledge. It is a trial of decisiveness."
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-1/70 max-w-2xl leading-relaxed">
                    At the Services Selection Board, the screening gate eliminates up to 60% of candidates on Day 1. Speed, spatial grasp, and authentic non-rehearsed situational responses are your weapon. Keep testing and review your weak OLQ factors.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('founder')}
                  className="bg-gold hover:bg-gold-2 text-navy-1 font-mono text-xs font-bold uppercase tracking-wider py-3 px-5 rounded shadow-sm transition-all whitespace-nowrap shrink-0"
                >
                  Read Mentor Blueprint
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED CADET PROFILE DOSSIER */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-gold font-bold uppercase tracking-widest">
                  // OFFICIAL DEFENCE CANDIDATE DOSSIER
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-ink">
                  Cadet Profile & Officer Candidacy Record
                </h1>
                <p className="text-xs text-ink-3 mt-1">
                  Full registration dossier maintained in the Sabre Officers Defense Academy roster.
                </p>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded shadow-sm transition-all flex items-center space-x-2"
              >
                <Edit3 size={14} />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Profile Record Card */}
            <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 sm:p-8 shadow-dossier">
              <div className="flex items-center space-x-5 pb-6 border-b border-tactical">
                <div className="w-20 h-20 rounded-xl bg-navy-1 border-2 border-tactical-gold text-gold flex items-center justify-center font-bold text-3xl shadow-md">
                  {cadet.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-mono text-sm px-2.5 py-0.5 bg-cream-3 border border-tactical rounded font-bold text-ink">
                      {cadet.studentCode}
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 bg-olive/15 text-olive font-bold border border-olive/30 rounded">
                      ACTIVE ASPIRANT
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-ink">{cadet.fullName}</h2>
                  <p className="text-xs text-ink-3 font-mono mt-0.5">
                    Member Since: {new Date(cadet.createdAt).toLocaleDateString()} · Last Active: {new Date(cadet.lastLoginAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-tactical">
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                    Primary Officer Candidate Metadata
                  </h3>
                  <div className="bg-cream-1 p-3.5 rounded border border-tactical">
                    <span className="text-[10px] font-mono uppercase text-ink-4 block">Target Defence Entry</span>
                    <span className="font-bold text-sm text-ink">{cadet.defenceEntry}</span>
                  </div>
                  <div className="bg-cream-1 p-3.5 rounded border border-tactical">
                    <span className="text-[10px] font-mono uppercase text-ink-4 block">Educational Qualification</span>
                    <span className="font-bold text-sm text-ink">{cadet.educationLevel}</span>
                  </div>
                  <div className="bg-cream-1 p-3.5 rounded border border-tactical">
                    <span className="text-[10px] font-mono uppercase text-ink-4 block">Prior SSB Board Exposure</span>
                    <span className="font-bold text-sm text-ink">{cadet.previousSsbExperience}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                    Contact & Campus Location
                  </h3>
                  <div className="bg-cream-1 p-3.5 rounded border border-tactical">
                    <span className="text-[10px] font-mono uppercase text-ink-4 block">Registered Email</span>
                    <span className="font-bold text-sm text-ink">{cadet.email}</span>
                  </div>
                  <div className="bg-cream-1 p-3.5 rounded border border-tactical">
                    <span className="text-[10px] font-mono uppercase text-ink-4 block">Mobile Number</span>
                    <span className="font-bold text-sm text-ink">{cadet.mobile}</span>
                  </div>
                  <div className="bg-cream-1 p-3.5 rounded border border-tactical">
                    <span className="text-[10px] font-mono uppercase text-ink-4 block">City & State</span>
                    <span className="font-bold text-sm text-ink">{cadet.city || 'Gwalior'}, {cadet.state || 'Madhya Pradesh'}</span>
                  </div>
                </div>
              </div>

              {/* Academy Verification Badge */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded bg-navy-2 border border-tactical-gold flex items-center justify-center text-gold font-bold">
                    S
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">Sabre Officers Defense Academy (SODA)</h4>
                    <p className="text-[11px] text-ink-3">
                      106, MLB Colony, Padav, Lashkar, Gwalior MP – 474002 · Registered under sodaedu.in
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadTranscript}
                  className="bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <Download size={14} />
                  <span>Download Cadet Dossier</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CSSS COGNITIVE BATTERY EMBEDDED */}
        {activeTab === 'csss' && (
          <div className="animate-fade-in">
            <CSSSPage />
          </div>
        )}

        {/* TAB 4: OPAM PERSONALITY MATRIX EMBEDDED */}
        {activeTab === 'opam' && (
          <div className="animate-fade-in">
            <OPAMPage />
          </div>
        )}

        {/* TAB 5: ASSESSMENT LOGS */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-gold font-bold uppercase tracking-widest">
                  // TELEMETRY LOGS
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-ink">
                  Cadet Assessment Log Register
                </h1>
                <p className="text-xs text-ink-3 mt-1">
                  Chronological record of completed screening drills and diagnostic batteries.
                </p>
              </div>
              <button
                onClick={() => exportAssessmentsCSV()}
                className="bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded shadow-sm transition-all flex items-center space-x-2"
              >
                <Download size={14} />
                <span>Export Academy CSV</span>
              </button>
            </div>

            <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 shadow-dossier">
              {attempts.length === 0 ? (
                <div className="p-12 text-center text-ink-3">
                  <BarChart3 size={40} className="mx-auto text-gold mb-3 opacity-60" />
                  <h3 className="font-bold text-ink text-base mb-1">No Assessment Records Yet</h3>
                  <p className="text-xs max-w-md mx-auto mb-6">
                    You have not yet completed any CSSS Cognitive or OPAM Personality test runs under this cadet session.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setActiveTab('csss')}
                      className="bg-navy-1 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded hover:bg-navy-3"
                    >
                      Launch CSSS Battery
                    </button>
                    <button
                      onClick={() => setActiveTab('opam')}
                      className="bg-cream-1 border border-tactical text-ink font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded hover:bg-cream-3"
                    >
                      Launch OPAM Matrix
                    </button>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-cream-3 text-ink-2 uppercase tracking-wider border-b border-tactical">
                      <tr>
                        <th className="py-3 px-4">Cadet Code</th>
                        <th className="py-3 px-4">Test Name</th>
                        <th className="py-3 px-4">Raw Score</th>
                        <th className="py-3 px-4">Percentage</th>
                        <th className="py-3 px-4">Performance Rating</th>
                        <th className="py-3 px-4">Completed Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tactical">
                      {attempts.map((att) => (
                        <tr key={att.attemptId} className="hover:bg-cream-3/40 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-ink">{att.studentCode}</td>
                          <td className="py-3.5 px-4 text-ink font-bold">{att.testName}</td>
                          <td className="py-3.5 px-4 text-navy-1 font-bold">{att.score}</td>
                          <td className="py-3.5 px-4 font-bold text-ink">{att.percentage}%</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                                att.percentage >= 75
                                  ? 'bg-olive/20 text-olive'
                                  : att.percentage >= 60
                                  ? 'bg-gold/20 text-ink'
                                  : 'bg-red/15 text-red'
                              }`}
                            >
                              {att.percentage >= 75
                                ? 'RECOMMENDED'
                                : att.percentage >= 60
                                ? 'COMPETITIVE'
                                : 'DEVELOPMENT NEEDED'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-ink-3">
                            {new Date(att.completedAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: WRITTEN PRACTICE DRILLED */}
        {activeTab === 'written' && (
          <div className="animate-fade-in">
            <WrittenPracticePage />
          </div>
        )}

        {/* TAB 7: DAILY SIGNAL BRIEFS */}
        {activeTab === 'briefs' && (
          <div className="animate-fade-in">
            <FieldBriefsPage />
          </div>
        )}

        {/* TAB 8: SOP FIELD MANUALS */}
        {activeTab === 'guides' && (
          <div className="animate-fade-in">
            <FieldGuidesPage />
          </div>
        )}

        {/* TAB 9: FOUNDER & CHIEF MENTOR DESK */}
        {activeTab === 'founder' && (
          <div className="animate-fade-in">
            <FounderPage />
          </div>
        )}
      </main>

      {/* Profile Edit Modal */}
      <CadetProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        cadet={cadet}
        onUpdated={handleProfileUpdated}
      />
    </div>
  );
};
