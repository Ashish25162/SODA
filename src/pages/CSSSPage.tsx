import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import {
  Clock,
  ArrowRight,
  Shield,
  Volume2,
  Eye,
  CheckCircle,
  XCircle,
  RotateCcw,
  Compass,
  AlertTriangle,
  Award,
  ChevronRight,
  VolumeX,
} from 'lucide-react';
import { CSSS_QUESTIONS, CSSSQuestion, CSSS_SECTION_META } from '../data/csssQuestions';
import { QuestionDiagram } from '../components/QuestionDiagram';
import { StudentModal } from '../components/StudentModal';
import { getStudentUser, saveAssessmentAttempt, StudentUser } from '../lib/storage';

interface AnswerLog {
  index: number;
  answer: number;
  latency: number;
  correct: boolean;
}

export const CSSSPage: React.FC = () => {
  const [phase, setPhase] = useState<'landing' | 'run' | 'pause' | 'report'>('landing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [answers, setAnswers] = useState<AnswerLog[]>([]);
  const [viewState, setViewState] = useState<'flash' | 'question'>('question');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);

  const answeredLockRef = useRef<string | null>(null);
  const audioTriggeredRef = useRef<string | null>(null);

  const totalQuestions = CSSS_QUESTIONS.length;
  const currentQ = CSSS_QUESTIONS[currentIndex];
  const nextQ = currentIndex < totalQuestions - 1 ? CSSS_QUESTIONS[currentIndex + 1] : null;

  // Check speech synthesis support on mount
  useEffect(() => {
    setAudioSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  // Timer & Question Display Lifecycle
  useEffect(() => {
    if (phase !== 'run' || !currentQ) return;

    answeredLockRef.current = null;
    const isMemoryFlash = currentQ.section === 'memory' && !!currentQ.flashText;

    setViewState(isMemoryFlash ? 'flash' : 'question');
    setTimeLeft(currentQ.duration);

    // Play Audio if in Audio section
    if (currentQ.section === 'audio') {
      triggerAudioCue(currentQ);
    }

    let timerInterval: any = null;
    let flashTimeout: any = null;

    const startQuestionTimer = () => {
      setQuestionStartTime(performance.now());
      timerInterval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            window.clearInterval(timerInterval);
            handleAnswerSubmit(-1); // Timeout penalty
            return currentQ.duration;
          }
          return prev - 1;
        });
      }, 1000);
    };

    if (isMemoryFlash) {
      flashTimeout = window.setTimeout(() => {
        setViewState('question');
        startQuestionTimer();
      }, 900);
    } else {
      startQuestionTimer();
    }

    return () => {
      if (timerInterval) window.clearInterval(timerInterval);
      if (flashTimeout) window.clearTimeout(flashTimeout);
    };
  }, [phase, currentIndex]);

  // Audio Playback Engine
  const triggerAudioCue = (q: CSSSQuestion) => {
    if (audioTriggeredRef.current === q.id) return;
    audioTriggeredRef.current = q.id;

    if (q.audioText && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(q.audioText.split(/[–-]/).join(' ... '));
      utterance.rate = 0.72;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      return;
    }

    // Web Audio API tone fallback
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 740;
        osc.type = 'sine';
        gain.gain.value = 0.05;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      }
    } catch (e) {
      console.warn('Audio fallback failed', e);
    }
  };

  const handleStartClicked = () => {
    const user = getStudentUser();
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    startFreshRun();
  };

  const startFreshRun = () => {
    answeredLockRef.current = null;
    audioTriggeredRef.current = null;
    setCurrentIndex(0);
    setAnswers([]);
    setViewState('question');
    setPhase('run');
  };

  const handleAnswerSubmit = (optionIndex: number) => {
    if (!currentQ || answeredLockRef.current === currentQ.id) return;
    answeredLockRef.current = currentQ.id;

    const latency = Math.round(performance.now() - questionStartTime);
    const isCorrect = optionIndex === currentQ.answer;

    const updatedAnswers = [
      ...answers,
      {
        index: currentIndex,
        answer: optionIndex,
        latency,
        correct: isCorrect,
      },
    ];
    setAnswers(updatedAnswers);

    // If final question finished
    if (currentIndex >= totalQuestions - 1) {
      const correctCount = updatedAnswers.filter((a) => a.correct).length;
      const pct = Math.round((correctCount / totalQuestions) * 100);

      localStorage.setItem(
        'soda_csss_result',
        JSON.stringify({
          answers: updatedAnswers,
          savedAt: new Date().toISOString(),
          bankSize: totalQuestions,
        })
      );
      localStorage.setItem(
        'learnerspark-csss-result',
        JSON.stringify({
          answers: updatedAnswers,
          savedAt: new Date().toISOString(),
          bankSize: totalQuestions,
        })
      );
      saveAssessmentAttempt('csss', 'SODA CSSS Cognitive Screening Battery', correctCount, pct);
      setPhase('report');
      return;
    }

    // Check if moving to a new section
    if (nextQ && nextQ.section !== currentQ.section) {
      setPhase('pause');
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleResumeAfterPause = () => {
    setCurrentIndex((prev) => prev + 1);
    setPhase('run');
  };

  // Section Score Aggregator
  const getSectionStats = (sectionKey: string) => {
    const sectionLogs = answers.filter((a) => CSSS_QUESTIONS[a.index]?.section === sectionKey);
    const correctCount = sectionLogs.filter((a) => a.correct).length;
    const totalInSec = CSSS_QUESTIONS.filter((q) => q.section === sectionKey).length;
    const avgLatency = sectionLogs.length
      ? Math.round(sectionLogs.reduce((acc, curr) => acc + curr.latency, 0) / sectionLogs.length)
      : 0;

    return {
      correct: correctCount,
      total: totalInSec,
      accuracy: totalInSec > 0 ? Math.round((correctCount / totalInSec) * 100) : 0,
      avgLatency,
    };
  };

  // 1. Landing Screen
  if (phase === 'landing') {
    return (
      <div className="min-h-screen bg-cream-1 py-12 md:py-20 parchment-pattern">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Intro */}
            <div className="lg:col-span-7 bg-cream-2 p-8 sm:p-12 border border-tactical-2 rounded-xl shadow-dossier">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-olive/15 text-olive rounded border border-olive/30 font-mono text-xs font-bold uppercase tracking-wider mb-6">
                <span>SODA CSSS</span>
                <span>//</span>
                <span>COGNITIVE SCREENING BATTERY</span>
              </div>

              <h1 className="font-sans text-3xl sm:text-5xl font-bold text-ink leading-tight mb-6">
                Speed, memory & attention under compressed time.
              </h1>

              <p className="text-base text-ink-2 leading-relaxed mb-8">
                The SSB Stage 1 screening gate gives you no time to overthink. Formulated for Sabre Officers Defense Academy (sodaedu.in) cadets, this 70-question battery presents memory sequences, spatial folding net diagrams, logical matrices, and spoken audio cues under strict per-question soft timers.
              </p>

              <div className="p-4 bg-cream-1 border border-tactical rounded-lg mb-8 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-ink">
                  <Shield size={16} className="text-gold" />
                  <span>CADET OPERATIONAL PROTOCOL</span>
                </div>
                <p className="text-xs text-ink-3">
                  Single-click responses advance automatically. Answers cannot be recalled. If the countdown expires, the item is marked as unattempted.
                </p>
              </div>

              <button
                onClick={handleStartClicked}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono font-bold text-xs uppercase tracking-wider py-4 px-8 rounded shadow-md transition-all hover:translate-y-[-1px]"
              >
                <span>Initiate 70-Question Battery</span>
                <ArrowRight size={16} className="text-gold" />
              </button>
            </div>

            {/* Right Column: Battery Specifications */}
            <div className="lg:col-span-5 bg-navy-1 text-cream-1 p-8 rounded-xl border border-tactical-dark shadow-dossier-dark">
              <div className="flex items-center justify-between pb-4 border-b border-tactical-dark mb-6">
                <span className="font-mono text-xs text-gold uppercase tracking-widest">
                  BATTERY SPECIFICATIONS
                </span>
                <span className="font-mono text-xs bg-navy-2 px-2 py-1 rounded text-cream-3">
                  SSB STAGE 1
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {Object.entries(CSSS_SECTION_META).map(([sec, meta]) => (
                  <div
                    key={sec}
                    className="p-3 bg-navy-2/90 border border-tactical-dark rounded flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-cream-1 block">
                        {meta.label}
                      </span>
                      <span className="text-[10px] font-mono text-cream-4">
                        Single-rep response target
                      </span>
                    </div>
                    <span className="font-mono text-xs text-gold font-bold bg-navy-1 px-2.5 py-1 rounded border border-tactical-dark">
                      {meta.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-tactical-dark flex justify-between text-[11px] font-mono text-cream-4">
                <span>TOTAL: 70 QUESTIONS</span>
                <span>SOFT TIMERS: 5s — 12s</span>
              </div>
            </div>
          </div>
        </div>

        <StudentModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => {
            setIsAuthOpen(false);
            startFreshRun();
          }}
        />
      </div>
    );
  }

  // 2. Pause / Section Checkpoint Screen
  if (phase === 'pause' && nextQ) {
    const nextMeta = CSSS_SECTION_META[nextQ.section];
    return (
      <div className="min-h-screen bg-navy-1 text-cream-1 flex items-center justify-center p-4 naval-grid-pattern">
        <div className="max-w-lg w-full bg-navy-2 border border-tactical-gold p-8 rounded-xl shadow-dossier-dark text-center">
          <div className="w-12 h-12 bg-gold/15 text-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
            <Clock size={24} />
          </div>

          <span className="font-mono text-xs text-gold uppercase tracking-widest block mb-1">
            SECTION CHECKPOINT REACHED
          </span>

          <h2 className="font-sans text-2xl font-bold mb-3">
            Prepare for Section: {nextMeta.label}
          </h2>

          <p className="text-xs text-cream-3 leading-relaxed mb-6">
            You are transitioning to the <strong className="text-cream-1">{nextMeta.label}</strong> module. Each question in this segment has a compressed timer of <strong className="text-gold">{nextMeta.duration} seconds</strong>. Settle your focus.
          </p>

          <button
            onClick={handleResumeAfterPause}
            className="w-full bg-gold hover:bg-gold-2 text-navy-1 font-mono font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <span>Proceed to Next Section</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // 3. Report Screen
  if (phase === 'report') {
    const totalCorrect = answers.filter((a) => a.correct).length;
    const accuracyPct = Math.round((totalCorrect / totalQuestions) * 100);
    const sortedLatencies = [...answers].map((a) => a.latency).sort((a, b) => a - b);
    const medianLatency = sortedLatencies[Math.floor(sortedLatencies.length / 2)] || 0;

    const performanceBand =
      accuracyPct >= 75 ? 'Strong' : accuracyPct >= 55 ? 'Competitive' : 'Needs Work';

    const bandColor =
      accuracyPct >= 75
        ? 'text-olive bg-olive/15 border-olive/30'
        : accuracyPct >= 55
        ? 'text-gold bg-gold/15 border-gold/30'
        : 'text-red bg-red/15 border-red/30';

    return (
      <div className="min-h-screen bg-cream-1 py-12 md:py-20 parchment-pattern">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Header */}
          <div className="bg-cream-2 p-8 sm:p-10 border border-tactical-2 rounded-xl shadow-dossier mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-tactical gap-4 mb-6">
              <div>
                <span className="font-mono text-xs text-olive font-bold uppercase tracking-widest block mb-1">
                  SODA CSSS // DEBRIEF READOUT
                </span>
                <h1 className="font-sans text-3xl sm:text-4xl font-bold text-ink">
                  Keep the signal. <span className="italic font-normal text-gold-dim">Adjust the method.</span>
                </h1>
              </div>
              <button
                onClick={startFreshRun}
                className="inline-flex items-center space-x-2 bg-navy-1 hover:bg-navy-3 text-cream-1 text-xs font-mono font-bold uppercase tracking-wider px-4 py-3 rounded self-start"
              >
                <RotateCcw size={14} className="text-gold" />
                <span>Repeat Battery</span>
              </button>
            </div>

            {/* Score & Performance Band */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6 bg-cream-1 border border-tactical rounded-lg mb-8">
              <div className="sm:col-span-1 border-b sm:border-b-0 sm:border-r border-tactical pb-4 sm:pb-0">
                <span className="block text-[11px] font-mono text-ink-4 uppercase tracking-wider">
                  OVERALL BAND
                </span>
                <span className={`inline-block font-mono text-lg font-bold px-2 py-0.5 rounded border mt-1 ${bandColor}`}>
                  {performanceBand}
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-ink-4 uppercase tracking-wider">
                  ACCURACY
                </span>
                <span className="font-mono text-2xl font-bold text-ink">
                  {accuracyPct}%
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-ink-4 uppercase tracking-wider">
                  TOTAL CORRECT
                </span>
                <span className="font-mono text-2xl font-bold text-ink">
                  {totalCorrect} / {totalQuestions}
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
            </div>

            {/* Section Breakdown Grid */}
            <h3 className="font-sans text-xl font-bold text-ink mb-4">
              Sectional Competency & Speed
            </h3>
            <div className="space-y-3 mb-8">
              {Object.entries(CSSS_SECTION_META).map(([secKey, meta]) => {
                const stat = getSectionStats(secKey);
                return (
                  <div
                    key={secKey}
                    className="p-4 bg-cream-1 border border-tactical rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-ink block">
                        {meta.label}
                      </span>
                      <span className="text-[11px] font-mono text-ink-4">
                        Average latency: {stat.avgLatency}ms
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-cream-3 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-navy-1 h-full rounded-full"
                          style={{ width: `${stat.accuracy}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-xs font-bold text-ink w-16 text-right">
                        {stat.correct} / {stat.total} ({stat.accuracy}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Steps CTA */}
            <div className="pt-6 border-t border-tactical flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-ink-3">
                Completed dossier logged. Next recommended drill: OPAM Personality Module.
              </span>
              <Link
                href="/opam"
                className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-2 text-navy-1 font-mono text-xs font-bold uppercase tracking-wider py-3 px-6 rounded shadow-sm"
              >
                <span>Launch OPAM Matrix (120Q)</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Run State
  return (
    <div className="min-h-screen bg-cream-1 py-8 md:py-12 parchment-pattern">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between bg-cream-2 border border-tactical rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-navy-1 text-gold">
              Q {currentIndex + 1} / {totalQuestions}
            </span>
            <span className="font-mono text-xs text-ink-3 hidden sm:inline">
              // {currentQ.sectionLabel}
            </span>
          </div>

          {/* Timer Display */}
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

        {/* Question Canvas Card */}
        <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 sm:p-10 shadow-dossier relative min-h-[380px] flex flex-col justify-between">
          {viewState === 'flash' ? (
            /* 900ms Flash sequence for Working Memory */
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <span className="font-mono text-xs text-gold font-bold uppercase tracking-widest mb-3">
                MEMORISE THE SEQUENCE
              </span>
              <div className="font-sans text-4xl sm:text-5xl font-bold text-navy-1 tracking-widest bg-cream-3/80 px-8 py-5 rounded border border-tactical-gold">
                {currentQ.flashText}
              </div>
              <span className="text-xs font-mono text-ink-4 mt-4">
                Disappears in 900 milliseconds...
              </span>
            </div>
          ) : (
            <div>
              {/* Question Category & Subtype */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-olive font-bold uppercase tracking-wider">
                  {currentQ.section.toUpperCase()} // {currentQ.subtype.toUpperCase().replace('_', ' ')}
                </span>
                {currentQ.section === 'audio' && (
                  <button
                    onClick={() => triggerAudioCue(currentQ)}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono text-gold hover:text-gold-dim"
                  >
                    <Volume2 size={14} />
                    <span>Replay Audio</span>
                  </button>
                )}
              </div>

              {/* Prompt Text */}
              <h2 className="font-sans text-xl sm:text-2xl text-ink font-bold leading-snug mb-4">
                {currentQ.prompt}
              </h2>

              {/* Visual Diagram if present */}
              {currentQ.visual && (
                <QuestionDiagram type={currentQ.visual} label="Figure Alignment" />
              )}

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSubmit(idx)}
                    className="p-4 bg-cream-1 hover:bg-cream-3 border border-tactical-2 hover:border-tactical-gold rounded-lg text-left transition-all flex items-start space-x-3 group"
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

          {/* Footer Note */}
          <div className="pt-6 border-t border-tactical flex justify-between items-center text-[10px] font-mono text-ink-4 mt-6">
            <span>SINGLE ATTEMPT // NO BACKTRACKING</span>
            <span>PRESS OPTION TO AUTO-ADVANCE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
