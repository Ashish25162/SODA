import React from 'react';
import { 
  Shield, 
  Anchor, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Compass, 
  Users, 
  Target,
  Sparkles
} from 'lucide-react';

export default function HeroSection({ 
  selectedStage, 
  onSelectStage, 
  onOpenCounseling, 
  onScrollToCalculator,
  onScrollToCourses 
}) {
  const stages = [
    { id: 'all', label: 'All Streams' },
    { id: '10th-12th', label: 'After 10th / 12th (NDA & Foundation)' },
    { id: 'graduates', label: 'Graduates (CDS / AFCAT / CAPF)' },
    { id: 'ssb', label: 'SSB Interview Prep' },
  ];

  const handleStageClick = (stageId) => {
    onSelectStage(stageId);
    onScrollToCourses();
  };

  return (
    <section id="home" className="relative bg-tactical-grid text-white pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      
      {/* Dynamic 3D Crest Watermark in Background */}
      <div className="absolute top-1/2 right-4 lg:right-16 -translate-y-1/2 w-96 h-96 lg:w-[480px] lg:h-[480px] opacity-15 pointer-events-none select-none animate-float-slow">
        <img
          src="/assets/3d/tri_service_crest.png"
          alt="Tri-Service 3D Crest Watermark"
          className="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(217,119,6,0.25)]"
        />
      </div>

      {/* Radar Concentric Rings in Background */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-20 hidden lg:block">
        <div className="w-full h-full rounded-full border border-slate-600/50 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border border-amber-500/30 flex items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-full border border-blue-500/30"></div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Content & Conversion (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg hover:border-amber-400 transition-colors">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <Anchor className="w-4 h-4 text-amber-400" />
              <span>Mentored by Former Indian Navy Officer Lt. Arjit Mohan Bharadwaj</span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.12] tracking-tight text-white">
              Forge Your Path to Command in the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                Indian Armed Forces.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Gwalior’s premier defense academy for <span className="text-white font-semibold">NDA, CDS, AFCAT, CAPF</span>, and 5-Day <span className="text-white font-semibold">SSB Interview</span> preparation. Build Officer Like Qualities (OLQs) under real military mentorship, not scripted coaching.
            </p>

            {/* Interactive Goal Selector (Segmented Pills) */}
            <div className="w-full bg-[#0A192F]/90 p-3 sm:p-3.5 rounded-xl border border-slate-700/80 shadow-xl space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold px-1">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  Select Your Target Stage:
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">Click to filter courses below</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {stages.map((stage) => {
                  const isActive = selectedStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleStageClick(stage.id)}
                      className={`text-xs font-semibold py-2 px-2.5 rounded-lg border transition-all text-center leading-tight ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold scale-[1.02]'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700/80 hover:text-white'
                      }`}
                    >
                      {stage.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-1">
              <button
                onClick={() => onOpenCounseling('Hero Section CTA')}
                className="bg-amber-600 hover:bg-amber-500 text-white font-heading font-bold text-base px-7 py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Apply for Next Batch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-base px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Check Your Exam Eligibility</span>
                <span className="text-amber-400 font-bold">→</span>
              </button>
            </div>

            {/* Bottom Trust Bar: 3 Mini Metrics */}
            <div className="pt-4 border-t border-slate-800/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">4.9 ★ Rating</div>
                  <div className="text-slate-400 text-[11px]">Verified Google Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">1-on-1 Mentorship</div>
                  <div className="text-slate-400 text-[11px]">Personal Dossier Evaluation</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Tri-Service Focus</div>
                  <div className="text-slate-400 text-[11px]">Army • Navy • Air Force</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Visual Showcase Card (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Main Showcase Container */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900/95 via-[#0A192F]/95 to-slate-900/95 rounded-2xl p-5 border border-slate-700/80 shadow-2xl backdrop-blur-md">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-700/80 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-extrabold text-sm shadow-inner">
                    ⚓
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm leading-tight">
                      Lt. Arjit Mohan Bharadwaj
                    </h3>
                    <p className="text-amber-400 text-xs font-medium">
                      Founder & Chief Mentor • Former Officer, Indian Navy
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Veteran
                </span>
              </div>

              {/* Mentor Image Container with Graceful Fallback */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-700/80 aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center group">
                <img
                  src="/assets/mentor-DmqBwYyP.png"
                  alt="Lt. Arjit Mohan Bharadwaj - Former Officer Indian Navy"
                  className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback container if image fails to render */}
                <div className="hidden w-full h-full flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-[#0A192F] p-6 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-base">Lt. Arjit Mohan Bharadwaj</div>
                    <div className="text-xs text-amber-300">Former Commissioned Officer, Indian Navy</div>
                  </div>
                </div>

                {/* Bottom Overlay Gradient with Quote */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4">
                  <p className="text-xs text-slate-200 italic leading-snug">
                    "We do not teach candidates to mimic answers. We train young minds to possess authentic Officer Like Qualities (OLQs)."
                  </p>
                </div>
              </div>

              {/* Tri-Service Insignia Pills (Completely unobstructed!) */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Official Tri-Service Entries Trained:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="badge-army text-center py-1.5 px-2 rounded-lg font-bold text-xs shadow-xs">
                    Indian Army
                  </div>
                  <div className="badge-navy text-center py-1.5 px-2 rounded-lg font-bold text-xs shadow-xs">
                    Indian Navy
                  </div>
                  <div className="badge-airforce text-center py-1.5 px-2 rounded-lg font-bold text-xs shadow-xs">
                    Air Force
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphic Trust Card 1 (FIXED POSITION: Mid-Left Edge, Zero Overlap with Army Badge!) */}
              <div className="hidden sm:flex items-center gap-2.5 absolute top-1/2 -left-6 -translate-y-1/2 bg-slate-900/95 border border-amber-500/40 rounded-xl px-3.5 py-2 shadow-2xl backdrop-blur-md z-20">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Focus on 15 OLQs</div>
                  <div className="text-[10px] text-slate-400">Psychology, GTO & PI</div>
                </div>
              </div>

              {/* Floating Glassmorphic Trust Card 2 (Top Right Corner) */}
              <div className="hidden sm:flex items-center gap-2.5 absolute -top-4 -right-4 bg-slate-900/95 border border-slate-700 rounded-xl px-3.5 py-2 shadow-2xl backdrop-blur-md z-20">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Dedicated GTO Ground</div>
                  <div className="text-[10px] text-slate-400">Obstacles in Padav, Gwalior</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Dynamic Curved SVG Section Divider at Bottom */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 text-[#F8FAFC] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

    </section>
  );
}
