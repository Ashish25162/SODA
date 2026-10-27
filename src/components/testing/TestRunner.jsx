import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ShieldCheck, 
  Award,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function calculateOirRating(percentage) {
  if (percentage >= 85) {
    return {
      rating: 'OIR 1',
      grade: 'Outstanding',
      status: 'High Screening Recommendation',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-300'
    };
  } else if (percentage >= 75) {
    return {
      rating: 'OIR 2',
      grade: 'Very Good',
      status: 'Solid Screening Probability',
      color: 'text-blue-700 bg-blue-50 border-blue-300'
    };
  } else if (percentage >= 60) {
    return {
      rating: 'OIR 3',
      grade: 'Average',
      status: 'Borderline — PPDT Narration Decisive',
      color: 'text-amber-800 bg-amber-50 border-amber-300'
    };
  } else if (percentage >= 45) {
    return {
      rating: 'OIR 4',
      grade: 'Below Average',
      status: 'High Screening Risk',
      color: 'text-orange-800 bg-orange-50 border-orange-300'
    };
  } else {
    return {
      rating: 'OIR 5',
      grade: 'Poor',
      status: 'Screen Out Likely',
      color: 'text-red-700 bg-red-50 border-red-300'
    };
  }
}

export default function TestRunner({ test, onClose, onTestCompleted }) {
  const { user, saveTestAttempt } = useAuth();

  // State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: selectedOptionIndex }
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState((test.durationMinutes || 10) * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeTakenSeconds, setTimeTakenSeconds] = useState(0);
  const [scoreResult, setScoreResult] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // for review: 'all', 'incorrect', 'correct'

  // PPDT specific state
  const isPpdt = test.category === 'PPDT';
  const [ppdtPhase, setPpdtPhase] = useState(0); // 0: intro, 1: observation (30s), 2: box marking (60s), 3: story writing (240s), 4: complete
  const [ppdtChars, setPpdtChars] = useState({ age: '22', sex: 'M', mood: '+' });
  const [ppdtAction, setPpdtAction] = useState('');
  const [ppdtStory, setPpdtStory] = useState('');

  const timerRef = useRef(null);
  const totalSeconds = (test.durationMinutes || 10) * 60;

  // Countdown timer for standard tests
  useEffect(() => {
    if (isSubmitted || isPpdt) return;

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isSubmitted, isPpdt]);

  // Handle standard test submit
  const handleSubmitTest = async (autoSubmit = false) => {
    if (isSubmitted) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const timeSpent = totalSeconds - secondsRemaining;
    setTimeTakenSeconds(timeSpent);

    let correctCount = 0;
    const questions = test.questions || [];

    questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected !== undefined && selected === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const oirEvaluation = calculateOirRating(percentage);

    const result = {
      testId: test.id,
      testTitle: test.title,
      category: test.category,
      correctCount,
      totalQuestions: total,
      score: percentage,
      oirRating: oirEvaluation.rating,
      oirGrade: oirEvaluation.grade,
      statusRecommendation: oirEvaluation.status,
      timeTakenMinutes: Math.max(1, Math.ceil(timeSpent / 60)),
      timeTakenFormatted: `${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s`,
      submittedAt: new Date().toISOString()
    };

    setScoreResult(result);
    setIsSubmitted(true);
    setShowSubmitModal(false);

    // Persist attempt to database / auth context
    try {
      await saveTestAttempt({
        test_id: test.id,
        test_title: test.title,
        category: test.category,
        score: percentage,
        total_questions: total,
        correct_count: correctCount,
        oir_rating: oirEvaluation.rating,
        time_taken_seconds: timeSpent
      });
    } catch (err) {
      console.warn('Could not auto-save attempt:', err);
    }

    if (onTestCompleted) {
      onTestCompleted(result);
    }
  };

  // Toggle option selection
  const handleSelectOption = (qId, optionIdx) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  // Toggle marked for review
  const toggleMarkForReview = (qId) => {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  // Time format
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = secondsRemaining < 120 && secondsRemaining > 0;

  // Current question object
  const questions = test.questions || [];
  const currentQ = questions[currentIdx] || null;

  // Counts
  const answeredCount = Object.keys(answers).length;
  const reviewCount = markedForReview.size;

  // ----------------------------------------------------
  // PPDT HANDLER (Picture Perception and Description Test)
  // ----------------------------------------------------
  if (isPpdt) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050B16]/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#FAF6EE] border border-[#0A1428]/20 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="bg-[#08122A] text-white px-6 py-4 flex items-center justify-between border-b border-[#C9A961]/30">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono tracking-widest bg-[#C9A961] text-[#08122A] font-bold uppercase">
                  SSB STAGE 1
                </span>
                <span className="text-xs font-mono text-white/70">PPDT SIMULATION SUITE</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">{test.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-mono border border-white/20 hover:border-white/50 text-white/80 hover:text-white rounded transition-colors"
            >
              EXIT SUITE
            </button>
          </div>

          {/* PPDT Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {ppdtPhase === 0 && (
              <div className="max-w-2xl mx-auto space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#08122A] text-[#C9A961] flex items-center justify-center mx-auto border border-[#C9A961]/40">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0A1428]">SSB PPDT Real-Time Simulator</h3>
                  <p className="text-sm text-[#5C6577] mt-2 leading-relaxed">
                    The Picture Perception & Description Test evaluates your mental clarity, observation power, and storytelling logic under strict time pressure.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
                  <div className="bg-white p-4 rounded-lg border border-[#0A1428]/10 shadow-sm">
                    <span className="text-[11px] font-mono font-bold text-[#C9A961] block">PHASE 1 (30s)</span>
                    <h4 className="font-bold text-sm text-[#0A1428] mt-1">Image Exposure</h4>
                    <p className="text-xs text-[#5C6577] mt-1">Hazy picture shown for exactly 30 seconds. Identify characters, age, mood.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-[#0A1428]/10 shadow-sm">
                    <span className="text-[11px] font-mono font-bold text-[#C9A961] block">PHASE 2 (1 MIN)</span>
                    <h4 className="font-bold text-sm text-[#0A1428] mt-1">Box Marking</h4>
                    <p className="text-xs text-[#5C6577] mt-1">Mark primary character position, age, sex (M/F), and mood (+/ - / 0).</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-[#0A1428]/10 shadow-sm">
                    <span className="text-[11px] font-mono font-bold text-[#C9A961] block">PHASE 3 (4 MIN)</span>
                    <h4 className="font-bold text-sm text-[#0A1428] mt-1">Story Composition</h4>
                    <p className="text-xs text-[#5C6577] mt-1">Draft a realistic, constructive narrative with past, present, and future action.</p>
                  </div>
                </div>

                <button
                  onClick={() => setPpdtPhase(1)}
                  className="px-6 py-3 rounded-lg bg-[#08122A] hover:bg-[#0C1D3D] text-[#C9A961] font-bold text-sm tracking-wide border border-[#C9A961]/40 shadow-md inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                >
                  START PPDT SIMULATION
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {ppdtPhase === 1 && (
              <div className="space-y-4 max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-between border-b border-[#0A1428]/10 pb-3">
                  <span className="text-xs font-mono font-bold text-[#C9A961] uppercase">Phase 1: Image Observation</span>
                  <span className="text-xs font-mono text-[#5C6577]">Observe the scene carefully</span>
                </div>

                {/* Hazy Stimulus Canvas */}
                <div className="w-full aspect-video bg-[#0A1428] rounded-xl border border-[#0A1428]/30 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#050B16] via-[#132C57]/40 to-[#08122A] opacity-90" />
                  <div className="relative z-10 space-y-3 text-center max-w-md">
                    <span className="px-3 py-1 rounded text-xs font-mono bg-[#C9A961]/20 text-[#C9A961] border border-[#C9A961]/30">
                      OFFICIAL STIMULUS PLATE #07
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      Village Irrigation & Canal Planning Session
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A young civil engineer holding blueprints stands near an active water reservoir discussing with two local farmers and a village head under the banyan tree.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setPpdtPhase(2)}
                  className="px-6 py-2.5 rounded-lg bg-[#08122A] text-white text-xs font-mono font-bold tracking-wider hover:bg-[#0C1D3D] transition-colors"
                >
                  PROCEED TO BOX MARKING →
                </button>
              </div>
            )}

            {ppdtPhase === 2 && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="border-b border-[#0A1428]/10 pb-3 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#C9A961] uppercase">Phase 2: Box Marking & Action</span>
                  <span className="text-xs font-mono text-[#5C6577]">Enter character parameters</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#0A1428]/10 space-y-4 shadow-sm">
                  <h4 className="text-sm font-bold text-[#0A1428]">Primary Character Demographics (SSB Sheet Standard)</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-[#5C6577] block mb-1">Age</label>
                      <input
                        type="text"
                        value={ppdtChars.age}
                        onChange={(e) => setPpdtChars({ ...ppdtChars, age: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-[#0A1428]/20 rounded focus:ring-1 focus:ring-[#08122A] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-[#5C6577] block mb-1">Sex</label>
                      <select
                        value={ppdtChars.sex}
                        onChange={(e) => setPpdtChars({ ...ppdtChars, sex: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-[#0A1428]/20 rounded focus:ring-1 focus:ring-[#08122A] outline-none bg-white"
                      >
                        <option value="M">Male (M)</option>
                        <option value="F">Female (F)</option>
                        <option value="P">Person (P)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-[#5C6577] block mb-1">Mood</label>
                      <select
                        value={ppdtChars.mood}
                        onChange={(e) => setPpdtChars({ ...ppdtChars, mood: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-[#0A1428]/20 rounded focus:ring-1 focus:ring-[#08122A] outline-none bg-white"
                      >
                        <option value="+">+ Positive (+)</option>
                        <option value="0">0 Neutral (0)</option>
                        <option value="-">- Negative (-)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#5C6577] block mb-1">Central Action / Theme of Story</label>
                    <input
                      type="text"
                      placeholder="e.g., Organizing community solar pump installation for drought relief"
                      value={ppdtAction}
                      onChange={(e) => setPpdtAction(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-[#0A1428]/20 rounded focus:ring-1 focus:ring-[#08122A] outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setPpdtPhase(3)}
                    disabled={!ppdtAction.trim()}
                    className="px-6 py-2.5 rounded-lg bg-[#08122A] disabled:opacity-50 text-white text-xs font-mono font-bold tracking-wider hover:bg-[#0C1D3D] transition-colors"
                  >
                    CONTINUE TO STORY WRITING →
                  </button>
                </div>
              </div>
            )}

            {ppdtPhase === 3 && (
              <div className="space-y-4 max-w-3xl mx-auto">
                <div className="border-b border-[#0A1428]/10 pb-3 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#C9A961] uppercase">Phase 3: Story Writing (4 Minutes)</span>
                  <span className="text-xs font-mono text-[#5C6577]">Past · Present · Future Outcome</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#0A1428]/10 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-mono text-[#5C6577]">
                    <span>Target: 100 - 120 words</span>
                    <span>Words: {ppdtStory.trim() ? ppdtStory.trim().split(/\s+/).length : 0}</span>
                  </div>
                  <textarea
                    rows={8}
                    value={ppdtStory}
                    onChange={(e) => setPpdtStory(e.target.value)}
                    placeholder="Write your story here... Outline: What led to the situation, what is currently happening, and what was the positive final outcome."
                    className="w-full p-3 text-sm border border-[#0A1428]/20 rounded-lg focus:ring-1 focus:ring-[#08122A] outline-none resize-none font-sans leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5C6577]">Keep your hero proactive, resourceful, and collaborative.</span>
                  <button
                    onClick={() => setPpdtPhase(4)}
                    disabled={!ppdtStory.trim()}
                    className="px-6 py-2.5 rounded-lg bg-[#08122A] disabled:opacity-50 text-[#C9A961] text-xs font-mono font-bold tracking-wider hover:bg-[#0C1D3D] transition-colors shadow"
                  >
                    SUBMIT PPDT RECORD →
                  </button>
                </div>
              </div>
            )}

            {ppdtPhase === 4 && (
              <div className="max-w-xl mx-auto text-center space-y-6 py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0A1428]">PPDT Response Saved</h3>
                  <p className="text-sm text-[#5C6577] mt-2">
                    Your response sheet has been recorded into your Cadet Dossier. In the SODA physical academy batch, this story is presented during the 1-minute individual narration and Group Discussion.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#0A1428]/10 text-left text-xs font-mono space-y-1">
                  <div><strong>Action:</strong> {ppdtAction || 'N/A'}</div>
                  <div><strong>Character:</strong> {ppdtChars.age} yrs / {ppdtChars.sex} / Mood: {ppdtChars.mood}</div>
                  <div><strong>Word Count:</strong> {ppdtStory.trim().split(/\s+/).length} words</div>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#08122A] text-white text-xs font-mono font-bold tracking-wider hover:bg-[#0C1D3D]"
                >
                  RETURN TO PRACTICE ROOM
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // STANDARD EXAM RUNNER (OIR / GAT)
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 bg-[#050B16]/95 backdrop-blur-md flex flex-col text-[#0A1428]">
      {/* Top Banner & Control Bar */}
      <header className="bg-[#08122A] text-white border-b border-[#C9A961]/25 px-4 sm:px-8 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#0A1428] border border-[#C9A961]/30 flex items-center justify-center text-[#C9A961] font-mono font-bold text-sm">
            {test.category || 'OIR'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A961] font-semibold">
                {test.stage || 'STAGE 1 TEST'}
              </span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-[11px] font-mono text-white/60">
                Q {currentIdx + 1} of {questions.length}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1">
              {test.title}
            </h1>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          {!isSubmitted && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-sm tracking-wider font-bold ${
                isLowTime
                  ? 'bg-red-950/80 text-red-300 border-red-500 animate-pulse'
                  : 'bg-[#0A1428] text-[#C9A961] border-[#C9A961]/40'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>
          )}

          {!isSubmitted ? (
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-1.5 rounded-lg bg-[#C9A961] hover:bg-[#DBBD7A] text-[#08122A] font-bold text-xs tracking-wider font-mono transition-colors shadow-sm"
            >
              SUBMIT TEST
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider transition-colors"
            >
              EXIT
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#F4EFE6]">
        {/* If Not Submitted: Question & Answers */}
        {!isSubmitted ? (
          <>
            {/* Left / Center: Question Panel */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col justify-between">
              <div className="max-w-3xl mx-auto w-full space-y-6">
                {/* Question Metadata Bar */}
                <div className="flex items-center justify-between border-b border-[#0A1428]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#08122A] text-white">
                      QUESTION {currentIdx + 1}
                    </span>
                    <span className="text-xs font-mono text-[#5C6577]">
                      [Mark: +1 | No Negative]
                    </span>
                  </div>
                  <button
                    onClick={() => currentQ && toggleMarkForReview(currentQ.id)}
                    className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded transition-colors ${
                      currentQ && markedForReview.has(currentQ.id)
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-white border border-[#0A1428]/15 text-[#5C6577] hover:text-[#0A1428]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>
                      {currentQ && markedForReview.has(currentQ.id)
                        ? 'Marked for Review'
                        : 'Mark for Review'}
                    </span>
                  </button>
                </div>

                {/* Question Prompt */}
                {currentQ && (
                  <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#0A1428]/10 shadow-sm space-y-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#0A1428] leading-relaxed">
                      {currentQ.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">
                      {currentQ.options.map((option, optIdx) => {
                        const isSelected = answers[currentQ.id] === optIdx;
                        const optionLabels = ['A', 'B', 'C', 'D'];

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(currentQ.id, optIdx)}
                            className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-4 ${
                              isSelected
                                ? 'bg-[#08122A] text-white border-[#08122A] shadow-md ring-2 ring-[#C9A961]/40'
                                : 'bg-[#FAF6EE] text-[#0A1428] border-[#0A1428]/12 hover:border-[#0A1428]/30 hover:bg-white'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                                isSelected
                                  ? 'bg-[#C9A961] text-[#08122A]'
                                  : 'bg-white border border-[#0A1428]/20 text-[#5C6577]'
                              }`}
                            >
                              {optionLabels[optIdx]}
                            </span>
                            <span className="text-sm sm:text-base font-medium flex-1">
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="max-w-3xl mx-auto w-full pt-6 flex items-center justify-between border-t border-[#0A1428]/10 mt-6">
                <button
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 rounded-lg bg-white border border-[#0A1428]/15 text-[#0A1428] font-mono text-xs font-semibold hover:bg-[#FAF6EE] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  PREVIOUS
                </button>

                <div className="text-xs font-mono text-[#5C6577] hidden sm:block">
                  Answered: <strong className="text-[#0A1428]">{answeredCount}</strong> / {questions.length}
                </div>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-lg bg-[#08122A] text-[#C9A961] font-mono text-xs font-bold hover:bg-[#0C1D3D] flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    NEXT QUESTION
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="px-5 py-2 rounded-lg bg-[#C9A961] text-[#08122A] font-mono text-xs font-bold hover:bg-[#DBBD7A] flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    FINISH & SUBMIT
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </main>

            {/* Right: Question Palette & Status (Learners SSB style) */}
            <aside className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-[#0A1428]/15 p-5 flex flex-col justify-between shrink-0">
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1428]">
                    Question Palette
                  </h3>
                  <p className="text-[11px] text-[#5C6577] mt-0.5">
                    Click any index to jump directly
                  </p>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-y border-[#0A1428]/10 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#08122A]" />
                    <span className="text-[#5C6577]">Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-400" />
                    <span className="text-[#5C6577]">Review ({reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#FAF6EE] border border-[#0A1428]/20" />
                    <span className="text-[#5C6577]">Unanswered ({questions.length - answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded border-2 border-[#C9A961]" />
                    <span className="text-[#5C6577]">Current</span>
                  </div>
                </div>

                {/* Question Grid Buttons */}
                <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                  {questions.map((q, idx) => {
                    const isAns = answers[q.id] !== undefined;
                    const isRev = markedForReview.has(q.id);
                    const isCurr = currentIdx === idx;

                    let bgClass = 'bg-[#FAF6EE] text-[#0A1428] border-[#0A1428]/15 hover:border-[#0A1428]/40';
                    if (isAns && isRev) {
                      bgClass = 'bg-amber-400 text-[#08122A] font-bold border-amber-500';
                    } else if (isAns) {
                      bgClass = 'bg-[#08122A] text-white font-bold border-[#08122A]';
                    } else if (isRev) {
                      bgClass = 'bg-amber-100 text-amber-900 border-amber-400 font-semibold';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-9 rounded font-mono text-xs flex items-center justify-center border transition-all ${bgClass} ${
                          isCurr ? 'ring-2 ring-[#C9A961] ring-offset-1 font-bold' : ''
                        }`}
                      >
                        {(idx + 1).toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cadet Dossier Quick Pill */}
              <div className="bg-[#FAF6EE] p-3.5 rounded-lg border border-[#0A1428]/10 text-xs mt-4">
                <span className="text-[10px] font-mono text-[#5C6577] block uppercase">Candidate</span>
                <span className="font-bold text-[#0A1428] block truncate">
                  {user ? user.fullName || user.email : 'Cadet Guest'}
                </span>
                <span className="text-[11px] text-[#5C6577] font-mono block mt-0.5">
                  Target: {user ? user.targetExam || 'NDA / CDS' : 'SSB Screening'}
                </span>
              </div>
            </aside>
          </>
        ) : (
          /* ----------------------------------------------------
             SUBMITTED: INSTANT OFFICIAL SCORECARD & SOLUTIONS
             ---------------------------------------------------- */
          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Scorecard Hero Banner */}
              <div className="bg-[#08122A] text-white rounded-2xl border border-[#C9A961]/40 p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A961]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#C9A961]/20 border border-[#C9A961]/40 text-[#C9A961] text-xs font-mono uppercase tracking-wider font-bold">
                      <Award className="w-3.5 h-3.5" />
                      OFFICIAL ASSESSMENT RESULT
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {test.title}
                    </h2>
                    <p className="text-sm text-white/70">
                      Evaluated on Indian Armed Forces SSB Stage 1 OIR grading norms.
                    </p>
                  </div>

                  {/* OIR Big Badge */}
                  {scoreResult && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-xl text-center min-w-[200px]">
                      <span className="text-[11px] font-mono tracking-widest text-[#C9A961] uppercase block font-semibold">
                        ASSESSED OIR
                      </span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-white block mt-1">
                        {scoreResult.oirRating}
                      </span>
                      <span className="text-xs font-mono font-medium text-emerald-400 block mt-1">
                        {scoreResult.oirGrade}
                      </span>
                    </div>
                  )}
                </div>

                {/* Score Stats Grid */}
                {scoreResult && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <span className="text-[10px] font-mono text-white/60 uppercase block">Score Percentage</span>
                      <span className="text-xl font-bold text-white mt-0.5 block">{scoreResult.score}%</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <span className="text-[10px] font-mono text-white/60 uppercase block">Correct / Total</span>
                      <span className="text-xl font-bold text-[#C9A961] mt-0.5 block">
                        {scoreResult.correctCount} / {scoreResult.totalQuestions}
                      </span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <span className="text-[10px] font-mono text-white/60 uppercase block">Time Spent</span>
                      <span className="text-xl font-bold text-white mt-0.5 block">{scoreResult.timeTakenFormatted}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <span className="text-[10px] font-mono text-white/60 uppercase block">SSB Recommendation</span>
                      <span className="text-xs font-mono font-medium text-emerald-400 mt-1.5 block truncate">
                        {scoreResult.statusRecommendation}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions & Explanation Section */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0A1428]/15 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1428]">
                      Detailed Solutions & Rationales
                    </h3>
                    <p className="text-xs text-[#5C6577] mt-0.5">
                      Review question answers, defense shortcuts, and logic patterns.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeFilter === 'all'
                          ? 'bg-[#08122A] text-white font-bold'
                          : 'bg-white text-[#5C6577] border border-[#0A1428]/15 hover:text-[#0A1428]'
                      }`}
                    >
                      All ({questions.length})
                    </button>
                    <button
                      onClick={() => setActiveFilter('incorrect')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeFilter === 'incorrect'
                          ? 'bg-red-700 text-white font-bold'
                          : 'bg-white text-[#5C6577] border border-[#0A1428]/15 hover:text-red-700'
                      }`}
                    >
                      Incorrect ({questions.length - (scoreResult?.correctCount || 0)})
                    </button>
                    <button
                      onClick={() => setActiveFilter('correct')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeFilter === 'correct'
                          ? 'bg-emerald-700 text-white font-bold'
                          : 'bg-white text-[#5C6577] border border-[#0A1428]/15 hover:text-emerald-700'
                      }`}
                    >
                      Correct ({scoreResult?.correctCount || 0})
                    </button>
                  </div>
                </div>

                {/* Filtered Question List */}
                <div className="space-y-4">
                  {questions
                    .filter((q) => {
                      const userChoice = answers[q.id];
                      const isCorrect = userChoice === q.correctAnswer;
                      if (activeFilter === 'correct') return isCorrect;
                      if (activeFilter === 'incorrect') return !isCorrect;
                      return true;
                    })
                    .map((q, qIndex) => {
                      const userChoice = answers[q.id];
                      const isAttempted = userChoice !== undefined;
                      const isCorrect = userChoice === q.correctAnswer;
                      const optionLabels = ['A', 'B', 'C', 'D'];

                      return (
                        <div
                          key={q.id}
                          className="bg-white p-5 sm:p-6 rounded-xl border border-[#0A1428]/10 shadow-sm space-y-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF6EE] text-[#0A1428] border border-[#0A1428]/10">
                                Q{q.id}
                              </span>
                              {isCorrect ? (
                                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> CORRECT (+1)
                                </span>
                              ) : isAttempted ? (
                                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                                  <XCircle className="w-3.5 h-3.5" /> INCORRECT (0)
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                  <AlertCircle className="w-3.5 h-3.5" /> UNATTEMPTED (0)
                                </span>
                              )}
                            </div>
                          </div>

                          <h4 className="text-base font-semibold text-[#0A1428]">
                            {q.question}
                          </h4>

                          {/* Options grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {q.options.map((opt, optI) => {
                              const isThisCorrect = optI === q.correctAnswer;
                              const isThisSelected = optI === userChoice;

                              let cardStyle = 'bg-[#FAF6EE] border-[#0A1428]/10 text-[#5C6577]';
                              if (isThisCorrect) {
                                cardStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                              } else if (isThisSelected && !isThisCorrect) {
                                cardStyle = 'bg-red-50 border-red-300 text-red-900 font-medium';
                              }

                              return (
                                <div
                                  key={optI}
                                  className={`p-2.5 rounded-lg border flex items-center gap-2.5 ${cardStyle}`}
                                >
                                  <span className="w-5 h-5 rounded-full bg-white border border-current flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                                    {optionLabels[optI]}
                                  </span>
                                  <span className="flex-1">{opt}</span>
                                  {isThisCorrect && <span className="text-[10px] font-mono text-emerald-700 font-bold">KEY</span>}
                                  {isThisSelected && !isThisCorrect && <span className="text-[10px] font-mono text-red-600 font-bold">YOUR PICK</span>}
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation */}
                          {q.explanation && (
                            <div className="bg-[#FAF6EE] p-3 rounded-lg border border-[#C9A961]/30 text-xs text-[#0A1428] leading-relaxed flex items-start gap-2">
                              <HelpCircle className="w-4 h-4 text-[#C9A961] shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-mono text-[#08122A] block mb-0.5">EXPLANATION:</strong>
                                <span>{q.explanation}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#0A1428]/15 pb-12">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setAnswers({});
                    setMarkedForReview(new Set());
                    setSecondsRemaining(totalSeconds);
                    setCurrentIdx(0);
                    setScoreResult(null);
                  }}
                  className="px-5 py-2.5 rounded-lg border border-[#0A1428]/20 bg-white hover:bg-[#FAF6EE] text-[#0A1428] font-mono text-xs font-semibold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                >
                  <RotateCcw className="w-4 h-4" />
                  RETAKE ASSESSMENT
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#08122A] hover:bg-[#0C1D3D] text-[#C9A961] font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-colors shadow-md w-full sm:w-auto justify-center"
                >
                  RETURN TO PRACTICE ROOM
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal Before Submit */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-[#050B16]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#0A1428]/20 p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#0A1428]">Confirm Test Submission</h3>
            <p className="text-xs text-[#5C6577] leading-relaxed">
              Are you sure you want to finalize your answers? Once submitted, your test will be evaluated against official SSB OIR rating criteria.
            </p>

            <div className="bg-[#FAF6EE] p-3 rounded-lg border border-[#0A1428]/10 text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-[#5C6577]">Total Questions:</span>
                <span className="font-bold text-[#0A1428]">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6577]">Questions Answered:</span>
                <span className="font-bold text-emerald-700">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6577]">Unanswered:</span>
                <span className="font-bold text-red-600">{questions.length - answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6577]">Marked for Review:</span>
                <span className="font-bold text-amber-700">{reviewCount}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg border border-[#0A1428]/15 text-xs font-mono hover:bg-slate-50 transition-colors"
              >
                RETURN TO TEST
              </button>
              <button
                onClick={() => handleSubmitTest(false)}
                className="px-5 py-2 rounded-lg bg-[#08122A] text-[#C9A961] font-mono text-xs font-bold hover:bg-[#0C1D3D] transition-colors shadow"
              >
                CONFIRM & SUBMIT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
