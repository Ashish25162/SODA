import React from 'react';

export default function RecordEditorial() {
  return (
    <section className="section bg-[#0A192F] text-white" id="results">
      <div className="wrap">

        {/* Section Head */}
        <div className="results-head mb-12">
          <div className="head">
            <p className="eyebrow font-mono text-xs uppercase tracking-widest text-[#D97706] font-semibold">
              05 — Verified Record
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Words from <span className="text-[#D97706]">the ranks.</span>
            </h2>
            <p className="text-[#94A3B8] mt-4 max-w-xl text-base font-normal">
              Cadets recommended into the Indian Army, Navy, and Air Force. Authentic debriefs from candidates who trained on the ground in Gwalior.
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className="results-grid">

          {/* Featured Large Review */}
          <div className="result featured bg-[#112240] border border-white/10 rounded-2xl p-6 sm:p-8">
            <span className="result-badge badge-selected bg-[#ECFCCB] text-[#3F6212] border border-[#BEF264] px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase w-fit mb-4 inline-block">
              ✓ Recommended · Indian Army (NDA)
            </span>
            <blockquote className="font-heading font-medium text-xl sm:text-2xl lg:text-3xl leading-snug text-white tracking-tight flex-1 my-4">
              “The SSB simulations were harder than the actual board. By the time I sat in front of the Interviewing Officer at 34 SSB Allahabad, nothing felt new. That's the entire point of this place.”
            </blockquote>
            <div className="result-who flex items-center gap-4 pt-6 border-t border-white/10 mt-6">
              <div className="w-11 h-11 rounded-full bg-[#D97706] text-[#0A192F] flex items-center justify-center font-heading font-black text-lg">
                A
              </div>
              <div>
                <strong className="text-white block font-heading font-bold text-base">Aditya S.</strong>
                <span className="text-[#D97706] font-mono text-xs tracking-wider uppercase font-semibold">
                  NDA 151 Course · Recommended
                </span>
              </div>
            </div>
          </div>

          {/* Sub Reviews (Right Column) */}
          <div className="col space-y-4">
            
            <div className="result bg-[#112240] border border-white/10 rounded-2xl p-6">
              <span className="result-badge badge-recommended bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD] px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase w-fit mb-3 inline-block">
                ✓ Recommended · Indian Navy (INA)
              </span>
              <p className="font-sans text-sm text-[#CBD5E1] leading-relaxed my-2">
                “I came in for the written exam. I left with an officer's daily routine, an unshakeable standard of discipline, and a mentor who still called to check in before my academy reporting.”
              </p>
              <div className="result-who flex items-center gap-3 pt-4 border-t border-white/10 mt-4">
                <div className="w-9 h-9 rounded-full bg-[#3F6212] text-white flex items-center justify-center font-heading font-bold text-sm">
                  P
                </div>
                <div>
                  <strong className="text-white block font-heading font-bold text-sm">Priya M.</strong>
                  <span className="text-[#94A3B8] font-mono text-[11px] tracking-wider uppercase">
                    CDS Entry · Selected INA Ezhimala
                  </span>
                </div>
              </div>
            </div>

            <div className="result bg-[#112240] border border-white/10 rounded-2xl p-6">
              <span className="result-badge badge-recommended bg-[#E0F2FE] text-[#0369A1] border border-[#7DD3FC] px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase w-fit mb-3 inline-block">
                ✓ Recommended · Air Force (AFCAT)
              </span>
              <p className="font-sans text-sm text-[#CBD5E1] leading-relaxed my-2">
                “The psychology tests and GTO outdoor obstacle ground is where the real work happens. Lt. Bharadwaj Sir broke down every single one of my responses until my genuine OLQs showed through.”
              </p>
              <div className="result-who flex items-center gap-3 pt-4 border-t border-white/10 mt-4">
                <div className="w-9 h-9 rounded-full bg-[#D97706] text-[#0A192F] flex items-center justify-center font-heading font-bold text-sm">
                  R
                </div>
                <div>
                  <strong className="text-white block font-heading font-bold text-sm">Rohan K.</strong>
                  <span className="text-[#94A3B8] font-mono text-[11px] tracking-wider uppercase">
                    AFCAT · Flying Branch Recommended
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
