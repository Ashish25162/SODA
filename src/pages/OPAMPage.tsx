import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import {
  Clock,
  Compass,
  ArrowRight,
  Shield,
  RotateCcw,
  AlertTriangle,
  Award,
  Zap,
  TrendingUp,
  TrendingDown,
  HelpCircle,
} from 'lucide-react';
import {
  OPAM_ITEMS,
  OPAMItem,
  calculateOLQProfile,
  OLQScoreResult,
  OLQ_LABELS,
  ALL_OPAM_ITEMS_MAP,
} from '../data/opamQuestions';
import { StudentModal } from '../components/StudentModal';
import { getStudentUser, saveAssessmentAttempt } from '../lib/storage';

interface OPAMAnswer {
  itemId: string;
  type: string;
  value: string;
  latency: number;
  score: number;
}

export const OPAMPage: React.FC = () => {
  const [phase, setPhase] = useState<'landing' | 'run' | 'report'>('landing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [promptStartTime, setPromptStartTime] = useState(0);
  const [answers, setAnswers] = useState<OPAMAnswer[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const answeredLockRef = useRef<string | null>(null);

  const totalItems = OPAM_ITEMS.length;
  const currentItem = OPAM_ITEMS[currentIndex];

  // Soft Timer Countdown (15s per response)
  useEffect(() => {
    if (phase !== 'run' || !currentItem) return;

    answeredLockRef.current = null;
    setTimeLeft(15);
    setPromptStartTime(performance.now());

    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          handleResponse('timeout', 0);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [phase, currentIndex]);

  const handleStartClicked = () => {
    const user = getStudentUser();
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    startFreshAssessment();
  };

  const startFreshAssessment = () => {
    answeredLockRef.current = null;
    setCurrentIndex(0);
    setAnswers([]);
    setPhase('run');
  };

  const handleResponse = (val: string, score: number = 1) => {
    if (!currentItem || answeredLockRef.current === currentItem.id) return;
    answeredLockRef.current = currentItem.id;

    const latency = Math.round(performance.now() - promptStartTime);
    const updated = [
      ...answers,
      {
        itemId: currentItem.id,
        type: currentItem.type,
        value: val,
        latency,
        score,
      },
    ];
    setAnswers(updated);

    if (currentIndex < totalItems - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed full matrix
      const totalScore = updated.reduce((acc, curr) => acc + curr.score, 0);
      const percentage = Math.round((totalScore / totalItems) * 100);

      localStorage.setItem(
        'soda_opam_result',
        JSON.stringify({
          answers: updated,
          savedAt: new Date().toISOString(),
          bankSize: totalItems,
          sequence: 'mixed',
        })
      );
      localStorage.setItem(
        'learnerspark-opam-result',
        JSON.stringify({
          answers: updated,
          savedAt: new Date().toISOString(),
          bankSize: totalItems,
          sequence: 'mixed',
        })
      );
      saveAssessmentAttempt('opam', 'SODA OPAM Personality Assessment Module', totalScore, percentage);
      setPhase('report');
    }
  };

  // 1. Landing Screen
  if (phase === 'landing') {
    return (
      <div className="min-h-screen bg-cream-1 py-12 md:py-20 parchment-pattern">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Briefing */}
            <div className="lg:col-span-7 bg-cream-2 p-8 sm:p-12 border border-tactical-2 rounded-xl shadow-dossier">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/15 text-gold-dim rounded border border-gold/30 font-mono text-xs font-bold uppercase tracking-wider mb-6">
                <span>SODA OPAM</span>
                <span>//</span>
                <span>OFFICER PERSONALITY MODULE</span>
              </div>

              <h1 className="font-sans text-3xl sm:text-5xl font-bold text-ink leading-tight mb-6">
                Answer as <span className="italic font-normal text-gold-dim">you</span> are, not as an ideal officer.
              </h1>

              <p className="text-base text-ink-2 leading-relaxed mb-6">
                The full bank runs through 120 original prompts formulated for Sabre Officers Defense Academy (sodaedu.in) candidates in an interleaved sequence. Self-description, forced choice, and situation reaction items keep changing shape so you practise staying consistent rather than memorising an assessor’s rhythm.
              </p>

              <div className="p-4 bg-cream-1 border border-tactical rounded-lg mb-8 space-y-2">
                <span className="text-xs font-mono font-bold text-ink block">
                  READ THIS FIRST // CADET ADVISORY
                </span>
                <p className="text-xs text-ink-3 leading-relaxed">
                  There are no artificial “right” answers in self-description or forced choice. Situation items use a best-fit response model to make the subsequent debrief actionable.
                </p>
              </div>

              <button
                onClick={handleStartClicked}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gold hover:bg-gold-2 text-navy-1 font-mono font-bold text-xs uppercase tracking-wider py-4 px-8 rounded shadow-md transition-all hover:translate-y-[-1px]"
              >
                <span>Start OPAM Assessment (120 Prompts)</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right Column: Specifications */}
            <div className="lg:col-span-5 bg-navy-1 text-cream-1 p-8 rounded-xl border border-tactical-dark shadow-dossier-dark">
              <div className="flex items-center justify-between pb-4 border-b border-tactical-dark mb-6">
                <span className="font-mono text-xs text-gold uppercase tracking-widest">
                  RUN PROTOCOL / MIXED BANK
                </span>
                <span className="font-mono text-xs bg-navy-2 px-2 py-1 rounded text-cream-3">
                  120 PROMPTS
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-3 bg-navy-2/90 border border-tactical-dark rounded flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-cream-1 block">
                      15s Soft Timer per prompt
                    </span>
                    <span className="text-[10px] font-mono text-cream-4">
                      Encourages spontaneous, unfiltered responses
                    </span>
                  </div>
                  <Clock size={16} className="text-gold" />
                </div>
                <div className="p-3 bg-navy-2/90 border border-tactical-dark rounded flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-cream-1 block">
                      Single-Direction Flow
                    </span>
                    <span className="text-[10px] font-mono text-cream-4">
                      Strictly no backtracking or retrospective editing
                    </span>
                  </div>
                  <Shield size={16} className="text-olive" />
                </div>
                <div className="p-3 bg-navy-2/90 border border-tactical-dark rounded flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-cream-1 block">
                      Multi-Dimensional Factor Readout
                    </span>
                    <span className="text-[10px] font-mono text-cream-4">
                      Mapped across all 15 Officer Like Qualities
                    </span>
                  </div>
                  <Award size={16} className="text-gold" />
                </div>
              </div>

              <div className="pt-4 border-t border-tactical-dark flex justify-between text-[11px] font-mono text-cream-4">
                <span>NO BACK NAVIGATION</span>
                <span>MIXED SEQUENCE</span>
              </div>
            </div>
          </div>
        </div>

        <StudentModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => {
            setIsAuthOpen(false);
            startFreshAssessment();
          }}
        />
      </div>
    );
  }

  // 2. Report Screen
  if (phase === 'report') {
    const latencies = answers.map((a) => a.latency).sort((a, b) => a - b);
    const medianLatency = Math.round(latencies[Math.floor(answers.length / 2)] || 0);
    const underOneSecond = answers.filter((a) => a.latency < 1000).length;

    const situationAnswers = answers.filter((a) => a.type === 'situation');
    const bestSituations = situationAnswers.filter((a) => {
      const item = ALL_OPAM_ITEMS_MAP.get(a.itemId);
      if (item && item.type === 'situation' && item.best !== undefined) {
        return a.value.charCodeAt(0) - 65 === item.best;
      }
      return false;
    }).length;

    const situationPct = situationAnswers.length
      ? Math.round((bestSituations / situationAnswers.length) * 100)
      : 0;

    const olqProfile = calculateOLQProfile(answers);
    const topQualities = olqProfile.slice(0, 3);
    const bottomQualities = olqProfile.slice(-3).reverse();

    return (
      <div className="min-h-screen bg-cream-1 py-12 md:py-20 parchment-pattern">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="bg-cream-2 p-8 sm:p-10 border border-tactical-2 rounded-xl shadow-dossier mb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-tactical gap-4 mb-6">
              <div>
                <span className="font-mono text-xs text-gold-dim font-bold uppercase tracking-widest block mb-1">
                  SODA OPAM // DEBRIEF REPORT
                </span>
                <h1 className="font-sans text-3xl sm:text-4xl font-bold text-ink">
                  A mirror of your own <span className="italic font-normal text-gold-dim">choices.</span>
                </h1>
                <p className="text-xs text-ink-3 mt-1">
                  Compiled from all {answers.length} choices recorded in this mixed run at Sabre Officers Defense Academy.
                </p>
              </div>
              <button
                onClick={startFreshAssessment}
                className="inline-flex items-center space-x-2 bg-navy-1 hover:bg-navy-3 text-cream-1 text-xs font-mono font-bold uppercase tracking-wider px-4 py-3 rounded self-start"
              >
                <RotateCcw size={14} className="text-gold" />
                <span>Repeat Run</span>
              </button>
            </div>

            {/* Score & Speed Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6 bg-cream-1 border border-tactical rounded-lg mb-8">
              <div>
                <span className="block text-[11px] font-mono text-ink-4 uppercase tracking-wider">
                  SITUATION JUDGEMENT
                </span>
                <span className="font-mono text-3xl font-bold text-gold">
                  {situationPct}%
                </span>
                <span className="block text-[10px] font-mono text-ink-4 mt-0.5">BEST-FIT CHOICES</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-ink-4 uppercase tracking-wider">
                  RESPONSES RECORDED
                </span>
                <span className="font-mono text-2xl font-bold text-ink">
                  {answers.length} / {totalItems}
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-ink-4 uppercase tracking-wider">
                  MEDIAN LATENCY
                </span>
                <span className="font-mono text-2xl font-bold text-ink">
                  {medianLatency} ms
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-ink-4 uppercase tracking-wider">
                  DECIDED UNDER 1s
                </span>
                <span className="font-mono text-2xl font-bold text-ink">
                  {underOneSecond}
                </span>
                <span className="block text-[10px] font-mono text-ink-4 mt-0.5">IMPULSIVITY CHECK</span>
              </div>
            </div>

            {/* Most & Least Endorsed OLQ Qualities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Most Endorsed */}
              <div className="p-6 bg-cream-1 border border-tactical rounded-lg">
                <div className="flex items-center space-x-2 text-olive mb-2">
                  <TrendingUp size={16} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    MOST ENDORSED QUALITIES
                  </span>
                </div>
                <h4 className="font-sans text-lg font-bold text-ink mb-4">
                  Qualities your choices leaned towards:
                </h4>
                <div className="space-y-3">
                  {topQualities.map((item, idx) => (
                    <div key={item.olq} className="p-3 bg-cream-2 border border-tactical rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs font-bold text-ink">
                          0{idx + 1} · {item.label}
                        </span>
                        <span className="font-mono text-xs text-olive font-bold">
                          {item.pct}%
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-ink-4">
                        Aligned on {item.hits} of {item.opportunities} tagged prompts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Least Endorsed / Growth Areas */}
              <div className="p-6 bg-cream-1 border border-tactical rounded-lg">
                <div className="flex items-center space-x-2 text-gold-dim mb-2">
                  <TrendingDown size={16} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    GROWTH OPPORTUNITIES
                  </span>
                </div>
                <h4 className="font-sans text-lg font-bold text-ink mb-4">
                  Qualities with fewest aligned choices:
                </h4>
                <div className="space-y-3">
                  {bottomQualities.map((item, idx) => (
                    <div key={item.olq} className="p-3 bg-cream-2 border border-tactical rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs font-bold text-ink">
                          0{idx + 1} · {item.label}
                        </span>
                        <span className="font-mono text-xs text-ink-3 font-bold">
                          {item.pct}%
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-ink-4">
                        Fewer aligned choices here ({item.pct}%). Target for deliberate reps.
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mentor Debrief Guidance */}
            <div className="p-6 bg-navy-1 text-cream-1 rounded-lg border border-tactical-dark">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block mb-2">
                HOW TO READ THIS DEBRIEF // LT. ARJIT M. BHARADWAJ (SODA CHIEF MENTOR)
              </span>
              <p className="text-xs text-cream-3 leading-relaxed mb-4">
                Use the two lists as a diagnostic starting point, not a scoreboard. The qualities at the top are behaviors your spontaneous reactions naturally prioritized; the qualities at the bottom were endorsed less frequently and are worth practicing on purpose.
              </p>
              <div className="text-[11px] font-mono text-cream-4">
                REPEAT AFTER 48 HOURS // MEASURE LATENCY & PATTERN STABILITY
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Run State
  if (!currentItem) return null;

  return (
    <div className="min-h-screen bg-cream-1 py-8 md:py-12 parchment-pattern">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between bg-cream-2 border border-tactical rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-navy-1 text-gold">
              {currentIndex + 1} / {totalItems}
            </span>
            <span className="font-mono text-xs text-ink-3 uppercase">
              // {currentItem.type === 'self' ? 'Self-Description' : currentItem.type === 'forced' ? 'Forced Choice' : 'Situation Reaction'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock size={16} className={timeLeft <= 3 ? 'text-red animate-pulse' : 'text-gold'} />
            <span
              className={`font-mono text-sm font-bold px-2.5 py-0.5 rounded border ${
                timeLeft <= 3
                  ? 'bg-red/10 border-red text-red'
                  : 'bg-cream-1 border-tactical text-ink'
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Prompt Canvas */}
        <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 sm:p-10 shadow-dossier relative min-h-[380px] flex flex-col justify-between">
          <div>
            {/* Format Kicker */}
            <span className="font-mono text-[11px] text-olive font-bold uppercase tracking-wider block mb-3">
              {currentItem.type === 'self'
                ? 'ENDORSEMENT // AGREE OR DISAGREE'
                : currentItem.type === 'forced'
                ? 'FORCED CHOICE // SELECT MORE CHARACTERISTIC BEHAVIOUR'
                : 'SITUATION REACTION // IMMEDIATE ACTION'}
            </span>

            {/* Prompt Type 1: Self-Description */}
            {currentItem.type === 'self' && (
              <div>
                <h2 className="font-sans text-2xl sm:text-3xl text-ink font-bold leading-snug mb-8">
                  "{currentItem.text}"
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleResponse('agree')}
                    className="p-5 bg-cream-1 hover:bg-cream-3 border border-tactical-2 hover:border-tactical-gold rounded-lg font-mono text-sm font-bold text-ink uppercase tracking-wider transition-all text-center"
                  >
                    Agree // Characteristic
                  </button>
                  <button
                    onClick={() => handleResponse('disagree')}
                    className="p-5 bg-cream-1 hover:bg-cream-3 border border-tactical-2 hover:border-tactical-gold rounded-lg font-mono text-sm font-bold text-ink-3 uppercase tracking-wider transition-all text-center"
                  >
                    Disagree // Uncharacteristic
                  </button>
                </div>
              </div>
            )}

            {/* Prompt Type 2: Forced Choice */}
            {currentItem.type === 'forced' && (
              <div>
                <h3 className="text-xs font-mono text-ink-3 mb-6">
                  Which statement better reflects your natural, everyday tendency?
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={() => handleResponse('left')}
                    className="w-full p-5 bg-cream-1 hover:bg-cream-3 border border-tactical-2 hover:border-tactical-gold rounded-lg text-left transition-all group"
                  >
                    <span className="font-mono text-xs text-gold font-bold block mb-1">
                      STATEMENT A
                    </span>
                    <p className="font-sans text-lg text-ink font-bold">
                      {currentItem.left}
                    </p>
                  </button>
                  <button
                    onClick={() => handleResponse('right')}
                    className="w-full p-5 bg-cream-1 hover:bg-cream-3 border border-tactical-2 hover:border-tactical-gold rounded-lg text-left transition-all group"
                  >
                    <span className="font-mono text-xs text-olive font-bold block mb-1">
                      STATEMENT B
                    </span>
                    <p className="font-sans text-lg text-ink font-bold">
                      {currentItem.right}
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Prompt Type 3: Situation Reaction */}
            {currentItem.type === 'situation' && (
              <div>
                <h2 className="font-sans text-xl sm:text-2xl text-ink font-bold leading-snug mb-6">
                  {currentItem.text}
                </h2>
                <div className="space-y-3">
                  {currentItem.options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleResponse(String.fromCharCode(65 + idx))}
                      className="w-full p-4 bg-cream-1 hover:bg-cream-3 border border-tactical-2 hover:border-tactical-gold rounded-lg text-left transition-all flex items-start space-x-3 group"
                    >
                      <span className="w-6 h-6 rounded bg-navy-1 text-cream-1 font-mono text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy-1 transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm font-mono text-ink group-hover:text-ink font-medium leading-relaxed">
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-tactical flex justify-between items-center text-[10px] font-mono text-ink-4 mt-6">
            <span>NO BACK NAVIGATION // STRICT SEQUENCE</span>
            <span>AUTO-ADVANCES ON SELECTION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
