import React from 'react';

export default function BentoEditorial({ onOpenBriefing, onOpenTests }) {
  return (
    <section className="section bg-[#F8FAFC]" id="about">
      <div className="wrap">
        <div className="head mb-12">
          <p className="eyebrow font-mono text-xs uppercase tracking-widest text-[#3F6212] font-semibold">
            01 — Institutional Track Record
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0A192F] tracking-tight">
            The academy, <span className="text-[#D97706]">at a glance.</span>
          </h2>
          <p className="font-sans text-base text-[#475569] mt-3 max-w-2xl">
            Twelve years of building commissioned officers for the Indian Armed Forces. Every statistic represents an aspirant who stepped into academy uniform.
          </p>
        </div>

        <div className="bento">

          {/* Large Dark Tile: 200+ Selections */}
          <div className="tile lg tile--dark bg-[#0A192F] text-white border border-[#1E293B] shadow-lg rounded-2xl p-6 sm:p-8">
            <div className="tile-fill flex flex-col justify-between h-full">
              <div>
                <div className="tile-label font-mono text-[10.5px] uppercase tracking-widest text-[#D97706] font-semibold mb-2">
                  Defence Selections
                </div>
                <div className="tile-number font-heading font-black text-5xl sm:text-6xl text-white tracking-tight my-2">
                  200+
                </div>
                <p className="tile-desc font-sans text-sm text-[#94A3B8] leading-relaxed mt-3">
                  Cadets recommended across Indian Army (NDA/CDS-IMA), Indian Navy (INA), and Air Force (AFA/AFCAT), plus CAPF Assistant Commandants.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D97706]">
                <span>UPSC &amp; SSB BOARDS VERIFIED</span>
                <span>GWALIOR CAMPUS</span>
              </div>
            </div>
          </div>

          {/* Small Tile: 12+ Years */}
          <div className="tile sm bg-white border border-[#CBD5E1] shadow-sm rounded-xl p-6">
            <div className="tile-fill">
              <div>
                <div className="tile-label font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                  Experience
                </div>
                <div className="tile-number font-heading font-extrabold text-4xl text-[#0A192F] mt-1">
                  12+ Years
                </div>
              </div>
              <p className="tile-desc font-sans text-xs text-[#64748B] mt-2">
                Premier defense coaching in Gwalior since 2013.
              </p>
            </div>
          </div>

          {/* Small Tile: 1:12 Ratio */}
          <div className="tile sm bg-white border border-[#CBD5E1] shadow-sm rounded-xl p-6">
            <div className="tile-fill">
              <div>
                <div className="tile-label font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                  Mentor Ratio
                </div>
                <div className="tile-number font-heading font-extrabold text-4xl text-[#0A192F] mt-1">
                  1:12
                </div>
              </div>
              <p className="tile-desc font-sans text-xs text-[#64748B] mt-2">
                Personalized guidance where every cadet is mentored directly.
              </p>
            </div>
          </div>

          {/* Small Tile: 4.9 Rating */}
          <div className="tile sm bg-white border border-[#CBD5E1] shadow-sm rounded-xl p-6">
            <div className="tile-fill">
              <div>
                <div className="tile-label font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                  Student &amp; Parent Rating
                </div>
                <div className="tile-number font-heading font-extrabold text-4xl text-[#D97706] mt-1">
                  4.9★
                </div>
              </div>
              <p className="tile-desc font-sans text-xs text-[#64748B] mt-2">
                Verified reviews for discipline and results.
              </p>
            </div>
          </div>

          {/* Small Warm Tile: 5-Day SSB Simulation */}
          <div className="tile sm bg-[#ECFCCB] border border-[#BEF264] shadow-sm rounded-xl p-6">
            <div className="tile-fill">
              <div className="text-xl mb-1">🎯</div>
              <div>
                <div className="tile-label font-mono text-[10px] uppercase tracking-wider text-[#3F6212] font-bold">
                  SSB Simulation
                </div>
                <div className="tile-number font-heading font-extrabold text-4xl text-[#3F6212] mt-1">
                  5-Day
                </div>
              </div>
              <p className="tile-desc font-sans text-xs text-[#365314] mt-2 font-medium">
                Psychology tests + Outdoor GTO obstacle ground.
              </p>
            </div>
          </div>

          {/* Large Tile: Mentor Quote & Practice Action */}
          <div className="tile lg bg-white border border-[#CBD5E1] shadow-sm rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="tile-fill">
              <div className="tile-label font-mono text-[10px] uppercase tracking-wider text-[#D97706] font-bold">
                Foundational Credo
              </div>
              <div className="font-heading font-bold text-2xl sm:text-3xl text-[#0A192F] tracking-tight leading-snug my-4">
                “We don't train candidates.<br />We build <span className="text-[#D97706]">officers.</span>”
              </div>
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0] flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A192F] text-white flex items-center justify-center font-bold text-sm">
                    AB
                  </div>
                  <div>
                    <strong className="block font-heading font-bold text-sm text-[#0A192F]">
                      Lt. Arjit M. Bharadwaj
                    </strong>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
                      Ex-Indian Navy · Chief Mentor
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenTests}
                  className="btn btn-navy text-xs py-2 px-4 shadow-sm"
                >
                  <span>Launch Practice Room →</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
