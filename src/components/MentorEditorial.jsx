import React from 'react';

export default function MentorEditorial({ onOpenBriefing }) {
  const stats = [
    { num: '12+', label: 'Years Mentoring' },
    { num: '1:12', label: 'Faculty Ratio' },
    { num: '5-Day', label: 'Full SSB Simulation' },
    { num: 'GTO Ground', label: 'Outdoor Obstacles', isAccent: true },
  ];

  return (
    <section className="section bg-[#FFFFFF] border-y border-[#E2E8F0]" id="mentor">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Officer Framed Portrait Plate (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px]">
              
              {/* Officer Card Plate Container */}
              <div className="relative bg-[#F8FAFC] border border-[#CBD5E1] p-3 sm:p-4 rounded-xl shadow-lg">
                
                {/* Tactical Top Tag */}
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#E2E8F0] font-mono text-[10px] tracking-widest text-[#64748B] uppercase">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#3F6212]"></span>
                    GWL // 26°13'N 78°10'E
                  </span>
                  <span className="text-[#D97706] font-bold">
                    OFFICER DOSSIER
                  </span>
                </div>

                {/* Portrait Window */}
                <div className="relative aspect-[3/3.8] overflow-hidden rounded-lg bg-[#0A192F] border border-[#CBD5E1] group">
                  <img
                    src="/assets/mentor-DmqBwYyP.png"
                    alt="Lt. Arjit Mohan Bharadwaj - Former Officer Indian Navy"
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'grid';
                    }}
                  />

                  {/* Fallback SVG */}
                  <div className="hidden w-full h-full place-items-center text-[#3F6212]/40">
                    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-2/3 h-2/3">
                      <circle cx="100" cy="80" r="38"/>
                      <path d="M32 240c0-38 30-68 68-68s68 30 68 68"/>
                      <path d="M80 76h40" strokeDasharray="2 6"/>
                    </svg>
                  </div>

                  {/* Subtle 3D Crest Watermark in corner */}
                  <div className="absolute top-3 right-3 w-10 h-10 pointer-events-none opacity-40">
                    <img 
                      src="/assets/3d/tri_service_crest.png" 
                      alt="" 
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  {/* Bottom Slate Officer Plate */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#0A192F] text-[#F8FAFC] px-4 py-3.5 flex items-center justify-between border-t border-[#D97706]/40">
                    <div>
                      <strong className="block font-heading font-bold text-base tracking-tight text-white">
                        Lt. Arjit M. Bharadwaj
                      </strong>
                      <span className="block font-mono text-[10px] tracking-widest text-[#D97706] uppercase mt-0.5 font-semibold">
                        Ex-Indian Navy
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#112240] border border-[#D97706]/40 grid place-items-center text-[#D97706] text-xs">
                      ⚓
                    </div>
                  </div>

                </div>

                {/* Officer Quote Pill underneath */}
                <div className="mt-3 pt-2 text-center border-t border-[#E2E8F0]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#3F6212] font-semibold">
                    Personalized 1-on-1 Mentorship · Direct Access
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Founder Copy, Credentials & 4 Stat Pillars (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <p className="eyebrow text-[#3F6212]">04 — The Mentor</p>

            {/* Clean, Non-Fancy Bold Heading */}
            <blockquote className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.12] tracking-tight text-[#0A192F]">
              “We don't train candidates.<br />
              We build <span className="text-[#D97706]">officers.</span>”
            </blockquote>

            {/* Bio */}
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#475569] max-w-2xl font-normal">
              Lt. Arjit Mohan Bharadwaj served in the Indian Navy before founding Sabre Officers
              Defense Academy in Gwalior. His method is simple and unglamorous: rigorous academics,
              relentless SSB psychological simulation, and a standard of military discipline that doesn't drop when
              nobody is watching.
            </p>

            {/* Clean Professional Credential Plate */}
            <div className="mt-8 flex items-center gap-5 flex-wrap">
              <div className="bg-[#0A192F] text-white px-5 py-3 rounded-lg border border-[#D97706]/40 flex items-center gap-3.5 shadow-sm">
                <span className="text-xl">⚓</span>
                <div>
                  <strong className="block font-heading font-bold text-sm sm:text-base tracking-wide text-white">
                    Arjit M. Bharadwaj
                  </strong>
                  <span className="block font-mono text-[9.5px] uppercase tracking-widest text-[#D97706] font-semibold">
                    Founder &amp; Chief Mentor
                  </span>
                </div>
              </div>

              <div className="font-mono text-xs text-[#64748B] border-l-2 border-[#D97706] pl-4 py-1 leading-relaxed">
                <strong className="text-[#0A192F] block text-xs font-semibold">
                  Ex-Indian Navy · Gwalior Campus
                </strong>
                Direct SSB Guidance &amp; Psychological Analysis
              </div>
            </div>

            {/* The 4 Stat Pillars */}
            <div className="mt-10 pt-8 border-t border-[#E2E8F0]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((st, i) => (
                  <div 
                    key={i} 
                    className="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg shadow-sm hover:border-[#D97706]/50 transition-colors"
                  >
                    <strong className={`block font-heading font-extrabold text-2xl sm:text-3xl leading-none tracking-tight ${st.isAccent ? 'text-[#3F6212]' : 'text-[#0A192F]'}`}>
                      {st.num}
                    </strong>
                    <span className="block font-mono text-[10px] tracking-wider uppercase text-[#64748B] mt-2 font-semibold">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => onOpenBriefing('Mentorship Session with Lt. Bharadwaj')}
                className="btn btn-navy text-xs sm:text-sm py-3 px-6 shadow-sm"
              >
                <span>Book a Mentorship Session</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
              
              <a
                href="tel:+918433247664"
                className="btn btn-ghost text-xs sm:text-sm py-3 px-5"
              >
                📞 Direct Academy Desk (+91 84332 47664)
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
