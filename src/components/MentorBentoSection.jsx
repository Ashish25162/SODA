import React, { useState } from 'react';
import { 
  Anchor, 
  Brain, 
  Flag, 
  UserCheck, 
  CheckCircle2, 
  Shield, 
  Sparkles, 
  ArrowRight,
  Compass,
  Award,
  AlertTriangle,
  Lightbulb,
  Clock,
  ChevronRight
} from 'lucide-react';

export default function MentorBentoSection({ onOpenCounseling }) {
  const [activeDay, setActiveDay] = useState('day1');

  const ssbProtocols = {
    day1: {
      title: "Day 1: Stage-I Screening (OIR & PPDT)",
      badge: "SCREENING ROUND (60-70% REJECTION FILTER)",
      whatCandidatesDo: "Officers Intelligence Rating (OIR) test consisting of verbal and non-verbal reasoning problems under strict time pressure, followed by Picture Perception & Discussion Test (PPDT) where candidates view a hazy image for 30 seconds, write a story in 4 minutes, give a 1-minute individual narration, and participate in a group discussion.",
      commonMistakes: "Rushing into chaotic arguments during group discussion ('fish market'), narrating pre-memorized heroic stories that do not match the picture, and neglecting OIR rating scores.",
      howSodaTrains: "Rigorous 20-second timed OIR drills to secure Rating 1/2, natural perception training without standard clichés, and assertive, dignified narration techniques taught directly by Ex-Navy Officer Lt. Arjit Mohan Bharadwaj."
    },
    day2: {
      title: "Day 2: Psychological Test Battery",
      badge: "WRITTEN PERSONALITY DOSSIER",
      whatCandidatesDo: "Back-to-back written psychological tests: 12 Thematic Apperception Test (TAT) slides (including 1 blank slide), 60 Word Association Test (WAT) words shown for 15 seconds each, 60 Situation Reaction Test (SRT) practical dilemmas in 30 minutes, and the Self-Description Test (SDT).",
      commonMistakes: "Writing fake or coached responses, copying textbook answers, projecting artificial traits that contradict the PIQ form, and leaving too many SRTs incomplete due to lack of speed.",
      howSodaTrains: "Comprehensive 1-on-1 dossier evaluation where every TAT story, WAT reaction, and SRT response is personally evaluated by Lt. Bharadwaj to identify and eliminate cognitive dissonance while preserving individual authenticity."
    },
    day34: {
      title: "Days 3 & 4: Group Testing Officer (GTO) Ground Tasks",
      badge: "OUTDOOR TEAMWORK & LEADERSHIP",
      whatCandidatesDo: "Nine physical and tactical outdoor tasks on the obstacle ground: Group Discussion (GD), Group Planning Exercise (GPE), Progressive Group Task (PGT), Half Group Task (HGT), Individual Obstacles (IO), Command Task (CT), Snake Race / Group Obstacle Race, Lecturette, and Final Group Task (FGT).",
      commonMistakes: "Dominating physically while ignoring team ideas, standing idle without contributing helping material (phatta, balli, rope), breaking color rules, and shouting instructions instead of demonstrating calm leadership.",
      howSodaTrains: "Practical hands-on training on SODA's dedicated GTO ground in Gwalior. Candidates practice cantilever mechanics, fulcrum placement, knot tying, and leading without aggression under realistic military standards."
    },
    day5: {
      title: "Day 5: Personal Interview & Final Board Conference",
      badge: "1-ON-1 WITH INTERVIEWING OFFICER & BOARD",
      whatCandidatesDo: "In-depth 45–60 minute interview with the Interviewing Officer (Dissecting the candidate's Personal Information Questionnaire - PIQ, academic trajectory, family background, current geopolitics, and career choices) followed by the Closing Board Conference with all assessors present.",
      commonMistakes: "Bluffing on hobbies, sports, or family background; lack of general awareness about modern military defense platforms; weak eye contact, poor posture, and defensive justifications under stress questions.",
      howSodaTrains: "Realistic video-recorded mock interviews conducted directly by Lt. Arjit Mohan Bharadwaj. Detailed PIQ dissection, stress-response habituation, and polishing officer demeanor and crisp articulation."
    }
  };

  const currentProtocol = ssbProtocols[activeDay];

  return (
    <section id="ssb-bento" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-md">
            <Anchor className="w-3.5 h-3.5" />
            <span>Military Mentorship Heritage</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[42px] text-[#0A192F] tracking-tight leading-tight">
            Building Future Officers.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700 block sm:inline">
              Guided by Real Service Experience.
            </span>
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            SSB is not an exam of memory—it is an authentic assessment of personality, character, and psychological stability. Experience our structured 4-pillar methodology in Gwalior.
          </p>
        </div>

        {/* 2-Column Bento Grid: Chief Mentor Left (7 Cols) + 3D GTO Diorama Right (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* LEFT: Featured Chief Mentor Card (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 lg:p-9 border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            
            {/* Subtle background glow & 3D Crest watermark */}
            <div className="absolute -top-12 -right-12 w-80 h-80 opacity-15 pointer-events-none select-none">
              <img
                src="/assets/3d/tri_service_crest.png"
                alt="Tri-Service Crest"
                className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(217,119,6,0.3)]"
              />
            </div>

            <div className="space-y-6 relative z-10">
              
              {/* Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-slate-800/90 px-2.5 py-1 rounded border border-amber-500/30">
                    Chief Mentor Profile
                  </span>
                </div>
                <div className="badge-navy text-xs font-bold px-3 py-1 rounded-md">
                  Indian Navy Veteran
                </div>
              </div>

              {/* Mentor Intro Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-800 border-2 border-amber-500/50 overflow-hidden shrink-0 shadow-xl">
                  <img
                    src="/assets/mentor-DmqBwYyP.png"
                    alt="Lt. Arjit Mohan Bharadwaj"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-amber-400">
                    <Shield className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    Lt. Arjit Mohan Bharadwaj
                  </h3>
                  <p className="text-amber-400 text-sm font-semibold mt-0.5">
                    Founder & Chief Mentor | Former Officer, Indian Navy
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Direct guidance • SSB Psychology Assessor • Leadership Strategist
                  </p>
                </div>
              </div>

              {/* The Core Philosophy Quote */}
              <div className="bg-slate-900/95 rounded-xl p-5 border border-slate-700/80 relative">
                <div className="text-amber-400 text-3xl font-serif leading-none absolute -top-3 left-4">
                  “
                </div>
                <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed pt-2">
                  At Sabre Officers Defense Academy, training goes beyond textbooks. We don't promote rote-memorized SSB answers—we evaluate your natural personality and cultivate genuine Officer Like Qualities (OLQs) required by the Armed Forces.
                </p>
              </div>

              {/* 3 Key Pillars */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Our Uncompromising Institutional Pillars:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                      <Anchor className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-white">Ex-Navy Mentorship</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Direct training under real military officer experience.
                    </div>
                  </div>

                  <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-white">Focus on 15 OLQs</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Developing genuine reasoning, courage, and initiative.
                    </div>
                  </div>

                  <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-white">Individual Dossier</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Personal attention & correction of individual blind spots.
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Card Action */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <span className="text-xs text-slate-400">
                Next 14-Day & 21-Day SSB Interview Batches starting monthly in Gwalior.
              </span>
              <button
                onClick={() => onOpenCounseling('SSB Mentorship Batch')}
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>Reserve SSB Seat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* RIGHT: 3D GTO Obstacle Ground Showcase Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0A192F] via-[#0E203C] to-[#0A192F] text-white rounded-2xl p-6 border border-slate-700 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            
            {/* Ambient accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                  GTO Ground Infrastructure
                </span>
                <span className="text-xs text-slate-400">
                  Padav, Gwalior
                </span>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Dedicated 3D GTO Obstacle Ground
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Real military training ground equipped with authentic PGT, HGT, and Command Task structures matching selection board dimensions.
                </p>
              </div>

              {/* 3D GTO Obstacle Ground Render Container */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950/80 border border-slate-700/80 aspect-[4/3] flex items-center justify-center p-2 shadow-inner group-hover:border-amber-500/40 transition-colors">
                <img
                  src="/assets/3d/gto_obstacle_ground.png"
                  alt="3D SSB GTO Obstacle Ground Diorama"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback */}
                <div className="hidden w-full h-full flex-col items-center justify-center bg-slate-900 p-4 text-center">
                  <Flag className="w-10 h-10 text-amber-400 mb-2" />
                  <div className="font-bold text-white text-sm">Dedicated GTO Ground</div>
                  <div className="text-xs text-slate-400">Padav, Gwalior Campus</div>
                </div>
              </div>

              {/* Quick Ground Highlights */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200">Full PGT, HGT & CT Planks</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200">10 Standard IO Obstacles</span>
                </div>
              </div>

            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily outdoor physical drills</span>
              </span>
              <button
                onClick={() => onOpenCounseling('GTO Ground Visit')}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
              >
                <span>Visit Campus</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* INTERACTIVE 5-DAY SSB PROTOCOL SWITCHER (Mandatory visual upgrade) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded">
                Interactive Testing Timeline
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0A192F] mt-1">
                5-Day Services Selection Board (SSB) Protocol Breakdown
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg self-start md:self-auto">
              Select a Day to Explore Testing Details
            </span>
          </div>

          {/* Day Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
            {[
              { id: 'day1', label: 'Day 1: Screening', sub: 'OIR & PPDT Drills' },
              { id: 'day2', label: 'Day 2: Psychology', sub: 'TAT, WAT, SRT & SDT' },
              { id: 'day34', label: 'Day 3–4: GTO Ground', sub: 'Outdoor Tasks & Obstacles' },
              { id: 'day5', label: 'Day 5: Interview', sub: 'PIQ & Final Conference' },
            ].map((tab) => {
              const active = activeDay === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDay(tab.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    active
                      ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-md font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className={`text-xs font-bold ${active ? 'text-amber-400' : 'text-slate-900'}`}>
                    {tab.label}
                  </div>
                  <div className={`text-[11px] mt-0.5 ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                    {tab.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display: What Candidates Do | Common Mistakes | How SODA Trains You */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h4 className="font-heading font-extrabold text-lg text-[#0A192F]">
                {currentProtocol.title}
              </h4>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                {currentProtocol.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              {/* Box 1: What Candidates Do */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-2">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>What Candidates Do</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {currentProtocol.whatCandidatesDo}
                </p>
              </div>

              {/* Box 2: Common Mistakes */}
              <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200">
                <div className="flex items-center gap-1.5 font-bold text-rose-900 text-xs mb-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Common Fatal Mistakes</span>
                </div>
                <p className="text-rose-950 leading-relaxed">
                  {currentProtocol.commonMistakes}
                </p>
              </div>

              {/* Box 3: How SODA Trains You */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs mb-2">
                  <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>How SODA Mentors You</span>
                </div>
                <p className="text-emerald-950 leading-relaxed">
                  {currentProtocol.howSodaTrains}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
