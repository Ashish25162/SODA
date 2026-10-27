import React, { useState, useEffect } from 'react';

export default function HeroEditorial({ onOpenBriefing, onExplorePrograms, onOpenTests }) {
  const words = ['Officer', 'Commander', 'Leader', 'Guardian', 'Aviator'];
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 250);
    }, 2800);

    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section className="hero bg-[#F8FAFC]" id="top">
      <div className="hero-bg" aria-hidden="true"></div>

      <div className="wrap hero-grid">

        {/* Hero Copy (Left) */}
        <div className="hero-copy">
          <div className="hero-eyebrow font-mono text-xs font-semibold text-[#3F6212] uppercase tracking-widest bg-[#ECFCCB] px-3.5 py-1.5 rounded-full border border-[#BEF264] w-fit">
            <span className="w-2 h-2 rounded-full bg-[#3F6212] animate-pulse inline-block mr-2"></span>
            Gwalior Campus · Admissions &amp; SSB Batches Active
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#0A192F] leading-[1.08] mt-6">
            Commission your <span className="text-[#D97706]">future.</span>
          </h1>

          <p className="hero-lead font-sans text-base sm:text-lg text-[#475569] leading-relaxed mt-5 max-w-xl">
            Officer-grade preparation for <strong className="text-[#0A192F]">NDA, CDS, AFCAT, CAPF</strong> and the{' '}
            <strong className="text-[#0A192F]">SSB Interview</strong> — led by a former Indian Navy officer with online mock testing &amp; GTO obstacle training.
          </p>

          <div className="hero-actions flex items-center gap-3.5 mt-8 flex-wrap">
            <button 
              type="button"
              onClick={() => onOpenBriefing('Hero Primary CTA')}
              className="btn btn-gold shadow-md font-semibold text-sm py-3 px-6"
            >
              <span>Book a Free Briefing</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>

            <button 
              type="button"
              onClick={onOpenTests}
              className="btn btn-navy font-semibold text-sm py-3 px-6 shadow-sm flex items-center gap-2"
            >
              <span>Student Practice Room</span>
              <span className="bg-[#D97706] text-white text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                OIR &amp; SSB
              </span>
            </button>

            <button 
              type="button"
              onClick={onExplorePrograms}
              className="btn btn-ghost font-medium text-sm py-3 px-5"
            >
              Explore Programs
            </button>
          </div>

          <div className="hero-meta mt-10 pt-6 border-t border-[#E2E8F0]">
            <div className="hero-meta-item">
              <strong className="font-heading font-extrabold text-2xl text-[#0A192F]">200+</strong>
              <span className="font-mono text-xs uppercase tracking-wider text-[#64748B]">Selections</span>
            </div>
            <div className="hero-meta-item">
              <strong className="font-heading font-extrabold text-2xl text-[#0A192F]">12+</strong>
              <span className="font-mono text-xs uppercase tracking-wider text-[#64748B]">Years Active</span>
            </div>
            <div className="hero-meta-item">
              <strong className="font-heading font-extrabold text-2xl text-[#0A192F]">1:12</strong>
              <span className="font-mono text-xs uppercase tracking-wider text-[#64748B]">Mentor Ratio</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card (Right) */}
        <div className="hero-visual">
          <div className="hero-card bg-[#0A192F] border border-[#1E293B] shadow-2xl rounded-2xl" aria-label="Cadet Personnel File">
            <div className="card-top font-mono text-[10.5px] uppercase tracking-wider text-[#94A3B8] pb-3 border-b border-white/10 flex items-center justify-between">
              <span>Cadet Dossier / SODA-2026</span>
              <span className="live text-[#34D399] flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse"></span>
                Active Candidate
              </span>
            </div>

            <div className="card-figure group my-4 rounded-xl overflow-hidden border border-white/10 relative aspect-[4/3] bg-[#060F1E]">
              <div className="scan" aria-hidden="true"></div>
              
              {/* Officer Image */}
              <img
                src="/assets/mentor-DmqBwYyP.png"
                alt="Lt. Arjit Mohan Bharadwaj"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />

              {/* Fallback Outline */}
              <svg 
                className="hidden w-2/3 h-2/3 text-[#D97706]/40 mx-auto"
                viewBox="0 0 240 240" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              >
                <circle cx="120" cy="90" r="45"/>
                <path d="M40 240c0-44 36-80 80-80s80 36 80 80"/>
              </svg>
            </div>

            {/* Rotating Officer Title */}
            <div 
              className="card-word font-heading font-black text-3xl sm:text-4xl text-[#F8FAFC] tracking-tight uppercase text-center py-2 transition-opacity duration-200"
              style={{ opacity: fade ? 1 : 0 }}
            >
              {words[wordIdx]}
            </div>

            <div className="card-meta grid grid-cols-3 gap-2 bg-[#112240] p-3 rounded-xl border border-white/10 text-center font-mono text-xs">
              <div>
                <span className="block text-[9.5px] uppercase text-[#94A3B8]">Target</span>
                <strong className="block text-white font-bold text-xs mt-0.5">NDA/CDS</strong>
              </div>
              <div className="border-x border-white/10 px-2">
                <span className="block text-[9.5px] uppercase text-[#94A3B8]">Stage</span>
                <strong className="block text-[#D97706] font-bold text-xs mt-0.5">SSB Prep</strong>
              </div>
              <div>
                <span className="block text-[9.5px] uppercase text-[#94A3B8]">Cohort</span>
                <strong className="block text-white font-bold text-xs mt-0.5">2026 Batch</strong>
              </div>
            </div>

            <div className="card-stamp font-mono text-[9px] uppercase tracking-widest text-[#D97706] mt-3 text-center border-t border-white/10 pt-2 font-semibold" aria-hidden="true">
              Gwalior Campus · Central Command
            </div>
          </div>

          <div className="float-chip float-1 bg-white border border-[#CBD5E1] shadow-md rounded-full px-4 py-2 font-mono text-xs font-semibold text-[#0A192F]" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-[#3F6212] inline-block mr-1.5"></span>
            Ex-Navy Chief Mentor
          </div>
          <div className="float-chip float-2 bg-white border border-[#CBD5E1] shadow-md rounded-full px-4 py-2 font-mono text-xs font-semibold text-[#0A192F]" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-[#D97706] inline-block mr-1.5"></span>
            Stage 1 &amp; GTO Ground
          </div>
        </div>

      </div>
    </section>
  );
}
