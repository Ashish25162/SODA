import React, { useState } from 'react';

export default function CommandSelector({ onOpenBriefing, onSelectCoursePlan }) {
  const [activeBranch, setActiveBranch] = useState('army');

  const branches = [
    {
      id: 'army',
      num: '// 01',
      title: 'Army',
      subtitle: 'Infantry, Artillery, Engineers, Signals',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M12 2.5l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 8.9l6-.9L12 2.5z"/>
        </svg>
      ),
      routes: [
        { idx: '01', title: 'NDA — after Class 12 (PCM / Arts / Commerce)' },
        { idx: '02', title: 'CDS — after graduation (IMA Dehradun / OTA Chennai)' },
        { idx: '03', title: 'TES — 10+2 Technical Entry Scheme (Direct SSB)' },
        { idx: '04', title: 'SSC Tech — engineering graduates (Direct SSB)' }
      ],
      desc: "The largest of the three services, and the broadest in opportunity. Infantry, Artillery, Armoured Corps, Engineers, Signals and Special Forces — each with its own selection benchmark, GTO standards, and its own idea of military leadership."
    },
    {
      id: 'navy',
      num: '// 02',
      title: 'Navy',
      subtitle: 'Executive, Engineering, Education',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2.2"/>
          <path d="M12 7.5V21M4.5 13.5c0 4.2 3.4 7.5 7.5 7.5s7.5-3.3 7.5-7.5M2.5 13.5h4M17.5 13.5h4M8 10.5h8"/>
        </svg>
      ),
      routes: [
        { idx: '01', title: 'NDA — 10+2 B.Tech Cadet Entry Scheme' },
        { idx: '02', title: 'CDS — Indian Naval Academy (INA Ezhimala)' },
        { idx: '03', title: 'INET / Direct Entry — Indian Navy Entrance Test' },
        { idx: '04', title: 'SSC Executive & Technical — Naval Aviator / Submariner' }
      ],
      desc: "Executive, Engineering, Submarine and Naval Aviation branches. A tight, highly disciplined selection board — and a maritime standard of mental resilience that begins the moment you report to Naval Selection Boards."
    },
    {
      id: 'airforce',
      num: '// 03',
      title: 'Air Force',
      subtitle: 'Flying, Technical, Ground Duty',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M12 2.5l2.4 6.6 6.6.9-5 4.4 1.4 6.6-5.4-3.6-5.4 3.6L7.6 14.4l-5-4.4 6.6-.9L12 2.5z"/>
        </svg>
      ),
      routes: [
        { idx: '01', title: 'NDA — Flying Branch (Class 12 with Physics & Maths)' },
        { idx: '02', title: 'CDS — Air Force Academy (AFA Dundigal)' },
        { idx: '03', title: 'AFCAT — Flying, Technical & Ground Duty Branches' },
        { idx: '04', title: 'NCC Special Entry — Direct AFSB Board for C-Cert' }
      ],
      desc: "Flying, Ground Duty Technical (Aeronautical Engineers) and Non-Technical (Logistics, Accounts, Education). The AFSB and CPSS (Computerized Pilot Selection System) test for lightning composure under pressure — we simulate it until it becomes routine."
    }
  ];

  const current = branches.find(b => b.id === activeBranch) || branches[0];

  return (
    <section className="section-editorial section--light" id="command">
      <div className="container-custom">
        
        {/* Section Head */}
        <div className="section-head-custom">
          <p className="label-tactical">01 — Choose Your Command</p>
          <h2>Three services.<br />One standard.</h2>
          <p>
            Every branch has its own entry route, its own selection board, and its own idea of an officer. Pick a command to see the path.
          </p>
        </div>

        {/* Branch Tabs Grid */}
        <div className="branch-tabs-grid" role="tablist" aria-label="Select a service branch">
          {branches.map((b) => {
            const active = activeBranch === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setActiveBranch(b.id)}
                className={`branch-card ${active ? 'active' : ''}`}
                role="tab"
                aria-selected={active}
              >
                <span className="indicator"></span>
                <span className="num">{b.num}</span>
                {b.icon}
                <h3>{b.title}</h3>
                <p>{b.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Active Branch Panel */}
        <div className="branch-panel-custom grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Entry Routes (7 cols) */}
          <div className="md:col-span-7">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#465A37] mb-4 font-bold">
              Commission Entry Routes ({current.title})
            </p>
            <ul className="flex flex-col">
              {current.routes.map((r) => (
                <li 
                  key={r.idx}
                  className="flex items-baseline gap-4 py-3.5 border-b border-dashed border-[#0A1018]/15 text-[15px]"
                >
                  <span className="font-mono text-[10px] tracking-wider text-[#465A37] font-semibold shrink-0">
                    {r.idx}
                  </span>
                  <span className="text-[#0A1018] font-medium">
                    {r.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Tactical Description & CTA (5 cols) */}
          <div className="md:col-span-5 bg-white/70 p-6 border border-[#0A1018]/10 flex flex-col justify-between">
            <div>
              <p className="text-[14.5px] leading-relaxed text-[#5C6577]">
                {current.desc}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => {
                  const el = document.getElementById('courses');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wider uppercase text-[#0A1018] border-b border-[#C9A961] pb-1.5 hover:gap-4 hover:text-[#465A37] transition-all font-semibold"
              >
                <span>See the {current.title} course plan</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Command Note */}
        <p className="mt-8 font-mono text-xs tracking-wider text-[#5C6577]">
          Not sure which route fits you?{' '}
          <button 
            onClick={() => onOpenBriefing('Command Route Guidance')}
            className="text-[#465A37] font-bold underline underline-offset-4 hover:text-[#0A1018] transition-colors"
          >
            Book a free briefing
          </button>{' '}
          and we'll map it out together.
        </p>

      </div>
    </section>
  );
}
