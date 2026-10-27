import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  Shield, 
  Clock, 
  Award, 
  FileText, 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  UserCheck, 
  BarChart3, 
  BookOpen, 
  ArrowLeft,
  LogIn,
  Layers,
  Sparkles,
  RefreshCw,
  Brain,
  Compass,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockTestsData } from '../../data/mockTestsData';
import TestRunner from './TestRunner';

export default function PracticeRoom({ onClose, onOpenAuth }) {
  const [, setLocation] = useLocation();
  const { user, getTestAttempts, isAuthenticated } = useAuth();
  const [activeTest, setActiveTest] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Load test history
  const loadAttempts = async () => {
    setLoadingAttempts(true);
    try {
      const data = await getTestAttempts();
      setAttempts(data || []);
    } catch (err) {
      console.warn('Could not fetch test history:', err);
    } finally {
      setLoadingAttempts(false);
    }
  };

  useEffect(() => {
    loadAttempts();
  }, [user]);

  // Categories filter
  const filteredTests = mockTestsData.filter((t) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'OIR') return t.category === 'OIR';
    if (activeCategory === 'PPDT') return t.category === 'PPDT';
    if (activeCategory === 'GAT') return t.category === 'GAT';
    return true;
  });

  // Calculate high-level stats from attempts
  const testsAttemptedCount = attempts.length;
  const bestOirAttempt = attempts.find((a) => a.oir_rating === 'OIR 1') 
    ? 'OIR 1' 
    : attempts.find((a) => a.oir_rating === 'OIR 2') 
      ? 'OIR 2' 
      : attempts.length > 0 
        ? attempts[0].oir_rating 
        : 'N/A';

  const avgAccuracy = attempts.length > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.score || 0), 0) / attempts.length)
    : 0;

  return (
    <div className="fixed inset-0 z-40 bg-[#FAF6EE] flex flex-col overflow-y-auto text-[#0A1428] font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#08122A] text-white border-b border-[#C9A961]/25 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            title="Return to Main Website"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C9A961] text-[#08122A] uppercase tracking-wider">
                SODA CADET LAB
              </span>
              <span className="text-white/40 text-xs hidden sm:inline">•</span>
              <span className="text-[11px] font-mono text-white/60 hidden sm:inline">
                STAGE 1 & DEFENSE PRACTICE ROOM
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Cadet Testing & Assessment Room
            </h1>
          </div>
        </div>

        {/* User state in header */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-lg text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 font-medium truncate max-w-[140px]">
                {user.fullName || user.email}
              </span>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-lg bg-[#C9A961] hover:bg-[#DBBD7A] text-[#08122A] font-bold text-xs font-mono tracking-wider transition-colors flex items-center gap-1.5 shadow"
            >
              <LogIn className="w-3.5 h-3.5" />
              CADET SIGN IN
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-mono border border-white/20 hover:border-white/50 text-white/80 hover:text-white rounded transition-colors"
          >
            EXIT LAB
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto w-full p-4 sm:p-8 space-y-8 flex-1">
        {/* Cadet Dossier Banner */}
        <div className="bg-[#08122A] text-white rounded-2xl border border-[#C9A961]/30 p-6 sm:p-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A961]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest text-[#C9A961] uppercase font-bold">
                  OFFICER SCREENING INTELLIGENCE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                SSB Stage 1 OIR & Psychological Simulators
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Benchmark your verbal, non-verbal, and storytelling speed against actual Indian Armed Forces SSB selection board standards.
              </p>
            </div>

            {/* Cadet Real-time Stats Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 sm:p-5 grid grid-cols-3 gap-4 min-w-[280px]">
              <div className="text-center border-r border-white/10 pr-2">
                <span className="text-[10px] font-mono text-white/60 uppercase block">Tests Taken</span>
                <span className="text-2xl font-bold text-white block mt-0.5">{testsAttemptedCount}</span>
              </div>
              <div className="text-center border-r border-white/10 pr-2">
                <span className="text-[10px] font-mono text-white/60 uppercase block">Best OIR</span>
                <span className="text-2xl font-bold text-[#C9A961] block mt-0.5">{bestOirAttempt}</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-mono text-white/60 uppercase block">Avg Accuracy</span>
                <span className="text-2xl font-bold text-emerald-400 block mt-0.5">{avgAccuracy}%</span>
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 px-6 sm:px-8">
              <div className="text-xs text-white/80">
                <span className="font-bold text-[#C9A961]">Guest Practice Mode:</span> You can take practice tests right now. Create a free cadet account to permanently sync your test dossier.
              </div>
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-lg bg-[#C9A961] hover:bg-[#DBBD7A] text-[#08122A] font-bold text-xs font-mono tracking-wider transition-colors whitespace-nowrap shadow"
              >
                CREATE CADET PROFILE →
              </button>
            </div>
          )}
        </div>

        {/* Test Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0A1428]/15 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0A1428]">Available Testing Modules</h3>
            <p className="text-xs text-[#5C6577] mt-0.5">Select a module to initiate timed examination</p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs overflow-x-auto pb-1">
            {['ALL', 'OIR', 'PPDT', 'GAT'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeCategory === cat
                    ? 'bg-[#08122A] text-white font-bold border-[#08122A] shadow-sm'
                    : 'bg-white text-[#5C6577] border-[#0A1428]/15 hover:text-[#0A1428]'
                }`}
              >
                {cat === 'ALL' ? 'All Tests' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-[#0A1428]/15 p-6 flex flex-col justify-between hover:border-[#08122A] hover:shadow-lg transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#FAF6EE] text-[#08122A] border border-[#0A1428]/15">
                    {t.stage || 'STAGE 1'}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-[#5C6577]">
                    <Clock className="w-3.5 h-3.5 text-[#C9A961]" />
                    <span>{t.durationMinutes} Mins</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[#0A1428] group-hover:text-[#08122A] leading-snug">
                    {t.title}
                  </h4>
                  <p className="text-xs text-[#5C6577] mt-2 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#0A1428]/10 flex items-center justify-between text-xs font-mono text-[#5C6577]">
                  <span>{t.totalQuestions} Questions</span>
                  <span className="text-emerald-700 font-semibold">Immediate Scoring</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTest(t)}
                className="mt-6 w-full py-2.5 rounded-lg bg-[#08122A] hover:bg-[#0C1D3D] text-[#C9A961] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-transform group-hover:-translate-y-0.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                START TEST
              </button>
            </div>
          ))}
        </div>

        {/* Advanced Full-Scale Military Testing Chambers */}
        <div className="bg-[#08122A] text-white rounded-2xl border border-[#C9A961]/30 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A961] font-bold block">
                FULL-BATTERY PSYCHOLOGICAL & COGNITIVE TESTING
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Official SODA SSB Testing Chambers (CSSS & OPAM)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  setLocation('/dashboard');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-[#C9A961]" />
                CADET DASHBOARD
              </button>
              <button
                onClick={() => {
                  onClose();
                  setLocation('/admin');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#C9A961]" />
                ADMIN
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CSSS 70Q */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#C9A961]/50 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C9A961] text-[#08122A]">
                    70 QUESTIONS · 5 SECTIONS
                  </span>
                  <span className="text-xs font-mono text-white/60">Stage 1 Screening</span>
                </div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[#C9A961]" />
                  CSSS Cognitive Battery
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Verbal logic, SVG spatial rotation diagrams, 900ms visual flash stimulus drills, Web Speech auditory recall, and rapid OIR speed sprints.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setLocation('/csss');
                }}
                className="mt-5 w-full py-2.5 rounded-lg bg-[#C9A961] hover:bg-[#DBBD7A] text-[#08122A] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors shadow"
              >
                LAUNCH CSSS 70Q BATTERY →
              </button>
            </div>

            {/* OPAM 120Q */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#C9A961]/50 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    120 ITEMS · 15 SEC/ITEM
                  </span>
                  <span className="text-xs font-mono text-white/60">Stage 2 Psychology</span>
                </div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  OPAM Officer Personality Matrix
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Time-compressed subconscious reaction test profiling the 15 Officer Like Qualities (OLQ) across Planning, Social Adjustment, Dynamic, and Effectiveness.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setLocation('/opam');
                }}
                className="mt-5 w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#08122A] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors shadow"
              >
                LAUNCH OPAM 120Q MATRIX →
              </button>
            </div>
          </div>
        </div>

        {/* Cadet Dossier: Test History Table */}
        <div className="bg-white rounded-xl border border-[#0A1428]/15 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#0A1428]/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#0A1428]">Your Test Attempt Record</h3>
              <p className="text-xs text-[#5C6577] mt-0.5">Historical record of all completed assessments</p>
            </div>
            <button
              onClick={loadAttempts}
              className="p-1.5 rounded border border-[#0A1428]/15 hover:bg-[#FAF6EE] text-[#5C6577] hover:text-[#0A1428] transition-colors"
              title="Refresh Record"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {attempts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#0A1428]/10 text-[#5C6577]">
                    <th className="py-2.5 font-semibold">Assessment Title</th>
                    <th className="py-2.5 font-semibold">Category</th>
                    <th className="py-2.5 font-semibold">Score</th>
                    <th className="py-2.5 font-semibold">OIR Rating</th>
                    <th className="py-2.5 font-semibold">Time</th>
                    <th className="py-2.5 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0A1428]/10">
                  {attempts.map((att, idx) => (
                    <tr key={att.id || idx} className="hover:bg-[#FAF6EE]/50">
                      <td className="py-3 font-sans font-semibold text-[#0A1428]">
                        {att.test_title}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                          {att.category}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-[#0A1428]">
                        {att.score}% ({att.correct_count}/{att.total_questions})
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          att.oir_rating === 'OIR 1' ? 'bg-emerald-100 text-emerald-800' :
                          att.oir_rating === 'OIR 2' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {att.oir_rating}
                        </span>
                      </td>
                      <td className="py-3 text-[#5C6577]">
                        {Math.floor((att.time_taken_seconds || 0) / 60)}m {(att.time_taken_seconds || 0) % 60}s
                      </td>
                      <td className="py-3 text-[#5C6577]">
                        {att.created_at ? new Date(att.created_at).toLocaleDateString() : 'Today'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF6EE] text-[#5C6577] flex items-center justify-center mx-auto border border-[#0A1428]/10">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-[#0A1428]">No Assessments Completed Yet</h4>
              <p className="text-xs text-[#5C6577] max-w-sm mx-auto">
                Launch any test above to benchmark your skills. Your scores, OIR rating, and time analysis will automatically populate here.
              </p>
            </div>
          )}
        </div>

        {/* SSB OIR Rating Benchmark Guide */}
        <div className="bg-[#FAF6EE] rounded-xl border border-[#0A1428]/15 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C9A961]" />
            <h3 className="text-sm font-bold text-[#0A1428] uppercase tracking-wide">
              Official SSB Stage 1 OIR Rating Scale Explained
            </h3>
          </div>
          <p className="text-xs text-[#5C6577] leading-relaxed">
            In the Services Selection Board (SSB), Stage 1 Screening consists of two tests: the <strong>Officer Intelligence Rating (OIR)</strong> test and the <strong>Picture Perception and Description Test (PPDT)</strong>. Candidates securing OIR 1 and OIR 2 have over an 80% statistical clearance probability in Stage 1 screening.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            <div className="bg-white p-3 rounded-lg border border-emerald-300">
              <span className="font-mono font-bold text-xs text-emerald-800 block">OIR 1</span>
              <span className="text-[11px] font-semibold text-[#0A1428] block mt-0.5">Outstanding (≥85%)</span>
              <span className="text-[10px] text-[#5C6577] block mt-1">High Screening Probability</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-300">
              <span className="font-mono font-bold text-xs text-blue-800 block">OIR 2</span>
              <span className="text-[11px] font-semibold text-[#0A1428] block mt-0.5">Very Good (75-84%)</span>
              <span className="text-[10px] text-[#5C6577] block mt-1">Solid Recommendation</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-300">
              <span className="font-mono font-bold text-xs text-amber-800 block">OIR 3</span>
              <span className="text-[11px] font-semibold text-[#0A1428] block mt-0.5">Average (60-74%)</span>
              <span className="text-[10px] text-[#5C6577] block mt-1">PPDT Story & GD Decisive</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-orange-300">
              <span className="font-mono font-bold text-xs text-orange-800 block">OIR 4</span>
              <span className="text-[11px] font-semibold text-[#0A1428] block mt-0.5">Below Avg (45-59%)</span>
              <span className="text-[10px] text-[#5C6577] block mt-1">Significant Risk</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-red-300">
              <span className="font-mono font-bold text-xs text-red-800 block">OIR 5</span>
              <span className="text-[11px] font-semibold text-[#0A1428] block mt-0.5">Poor (&lt;45%)</span>
              <span className="text-[10px] text-[#5C6577] block mt-1">Screen Out Likely</span>
            </div>
          </div>
        </div>
      </main>

      {/* Test Runner Modal when active */}
      {activeTest && (
        <TestRunner
          test={activeTest}
          onClose={() => {
            setActiveTest(null);
            loadAttempts();
          }}
          onTestCompleted={() => {
            loadAttempts();
          }}
        />
      )}
    </div>
  );
}
