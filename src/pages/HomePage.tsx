import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight,
  Shield,
  Clock,
  Compass,
  Award,
  CheckCircle2,
  Brain,
  Activity,
  Zap,
  BookOpen,
  ChevronRight,
  BarChart2,
  Users,
  ExternalLink,
  Target,
  Sparkles,
} from 'lucide-react';
import { OLQ_FACTORS } from '../data/opamQuestions';
import { StudentModal } from '../components/StudentModal';
import { getStudentUser } from '../lib/storage';

export const HomePage: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTarget, setAuthTarget] = useState<string>('/opam');

  const startAssessmentWithAuth = (target: string) => {
    const user = getStudentUser();
    if (user) {
      window.location.href = target;
    } else {
      setAuthTarget(target);
      setIsAuthOpen(true);
    }
  };

  const academyPillars = [
    {
      number: '01',
      title: 'Officer-Led Mentorship',
      body: 'Every assessment framework, interview simulation, and psychological debrief is designed by commissioned officers who have served in active operational commands.',
    },
    {
      number: '02',
      title: 'Authentic Latency Benchmarking',
      body: 'No inflated percentiles. Our digital chambers record millisecond-level decision latency to expose hesitation, second-guessing, and cognitive fatigue.',
    },
    {
      number: '03',
      title: '15 OLQ Behavioural Mapping',
      body: 'We reject scripted answers. SODA’s matrix measures your spontaneous actions against the 15 declassified Officer Like Qualities defined by DIPR.',
    },
    {
      number: '04',
      title: 'Integrated Gwalior Campus',
      body: 'Seamless synergy between our digital screening wing and on-campus classroom programs for NDA Foundation, CDS, AFCAT, and outdoor GTO grounds.',
    },
  ];

  // Authentic verified experiences from SODA Gwalior alumni
  const studentExperiences = [
    {
      initials: 'AP',
      name: 'Arun Pratap Singh',
      role: 'SSB Recommended Candidate · SODA Gwalior',
      text: 'What sets SODA apart from commercial coaching factories is the personal debrief. Bharadwaj sir broke down my cognitive latency and taught me to communicate with military precision.',
    },
    {
      initials: 'AS',
      name: 'Abhinav Singh',
      role: 'NDA Foundation Cadet · SODA Batch',
      text: 'Joining SODA during school foundation gave me an immense edge. The timed visual net tests and memory flash drills made Day-1 screening feel like second nature.',
    },
    {
      initials: 'TK',
      name: 'Tanishq Kushwah',
      role: 'CDS Aspirant · SODA Gwalior',
      text: 'The best academy in Gwalior for genuine SSB preparation. The focus is entirely on developing authentic OLQs and clear narrative flow during PPDT discussions.',
    },
    {
      initials: 'MT',
      name: 'Mayank Singh Tomar',
      role: 'OTA Aspirant · Recommended Track',
      text: 'A disciplined, officer-grade environment. SODA’s diagnostic drills mirror the actual stress of the testing hall, teaching you to keep calm when the clock is loud.',
    },
  ];

  const sodaCourses = [
    {
      title: 'NDA + Schooling (11th & 12th Foundation)',
      desc: 'Integrated two-year residential and day-boarding program combining CBSE/State board academics with rigorous NDA written syllabus and physical officer conditioning.',
      badge: 'FOUNDATION',
      link: 'https://sodaedu.in/courses',
    },
    {
      title: 'CDS (Combined Defence Services)',
      desc: 'Comprehensive officer-entry curriculum for college graduates targeting IMA Dehradun, OTA Chennai, INA Ezhimala, and AFA Dundigal.',
      badge: 'GRADUATE WING',
      link: 'https://sodaedu.in/courses',
    },
    {
      title: 'AFCAT (Flying & Ground Duty)',
      desc: 'Specialized syllabus covering quantitative aptitude, verbal comprehension, spatial reasoning, and military aviation awareness for Indian Air Force aspirants.',
      badge: 'AIR FORCE',
      link: 'https://sodaedu.in/courses',
    },
    {
      title: 'Comprehensive 14-Day SSB Interview Program',
      desc: 'Full-spectrum guidance covering Stage 1 OIR/PPDT, Stage 2 Psychological Dossiers (TAT, WAT, SRT, SD), GTO outdoor obstacle grounds, and mock personal interviews.',
      badge: 'INTERVIEW SPECIAL',
      link: 'https://sodaedu.in/courses',
    },
  ];

  return (
    <div className="min-h-screen bg-cream-1 text-ink">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-tactical parchment-pattern">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl">
            {/* Tactical Kicker */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-cream-2 border border-tactical-2 rounded mb-6">
              <span className="w-2 h-2 rounded-full bg-olive animate-pulse"></span>
              <span className="font-mono text-xs text-olive font-bold tracking-widest uppercase">
                SODA DIGITAL CADET WING // GWALIOR HQ
              </span>
            </div>

            {/* Display Headline with Classical Editorial Accent */}
            <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.08] mb-6">
              Commission your{' '}
              <span className="italic font-normal text-gold-dim">future.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-ink-2 max-w-2xl font-normal leading-relaxed mb-8">
              Welcome to the official assessment and diagnostic testing portal of <strong className="text-ink">Sabre Officers Defense Academy (sodaedu.in)</strong>. Engineered at our Gwalior headquarters to cultivate the analytical speed, psychological resilience, and Officer Like Qualities (OLQs) demanded by the Services Selection Boards.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10">
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 bg-navy-1 hover:bg-navy-3 text-gold font-mono font-bold text-xs uppercase tracking-wider py-4 px-7 rounded shadow-md transition-all hover:translate-y-[-1px] border border-tactical-gold"
              >
                <Shield size={16} />
                <span>Cadet Command Dashboard</span>
                <ArrowRight size={15} />
              </Link>
              <button
                onClick={() => startAssessmentWithAuth('/csss')}
                className="inline-flex items-center justify-center space-x-2 bg-cream-2 hover:bg-cream-3 text-ink font-mono font-bold text-xs uppercase tracking-wider py-4 px-6 rounded border border-tactical-2 transition-all hover:border-gold"
              >
                <span>CSSS Battery (70Q)</span>
              </button>
              <button
                onClick={() => startAssessmentWithAuth('/opam')}
                className="inline-flex items-center justify-center space-x-2 bg-gold hover:bg-gold-2 text-navy-1 font-mono font-bold text-xs uppercase tracking-wider py-4 px-6 rounded shadow-sm transition-all hover:translate-y-[-1px]"
              >
                <span>OPAM Matrix (120Q)</span>
                <Compass size={16} />
              </button>
            </div>

            {/* Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-cream-2/80 backdrop-blur-sm border border-tactical rounded-lg shadow-parchment max-w-3xl">
              <div className="p-2 border-r border-tactical last:border-r-0">
                <span className="block text-[10px] font-mono text-ink-4 uppercase tracking-wider">
                  Testing Status
                </span>
                <span className="font-mono text-xs font-bold text-olive">SODA ACTIVE</span>
              </div>
              <div className="p-2 border-r border-tactical last:border-r-0">
                <span className="block text-[10px] font-mono text-ink-4 uppercase tracking-wider">
                  Latency Threshold
                </span>
                <span className="font-mono text-xs font-bold text-ink">5 — 15 SECONDS</span>
              </div>
              <div className="p-2 border-r border-tactical last:border-r-0">
                <span className="block text-[10px] font-mono text-ink-4 uppercase tracking-wider">
                  Evaluation Framework
                </span>
                <span className="font-mono text-xs font-bold text-ink">CSSS & OPAM</span>
              </div>
              <div className="p-2">
                <span className="block text-[10px] font-mono text-ink-4 uppercase tracking-wider">
                  Command Coordinates
                </span>
                <span className="font-mono text-xs font-bold text-gold">GWL // 26°13'N 78°10'E</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 — BY THE NUMBERS: The Academy at a Glance */}
      <section className="py-20 bg-cream-2 border-b border-tactical">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-olive tracking-widest uppercase block mb-2">
              01 — BY THE NUMBERS // SODA EXCELLENCE
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl text-ink font-bold mb-4">
              The academy, <span className="italic font-normal text-gold-dim">at a glance.</span>
            </h2>
            <p className="text-ink-2 leading-relaxed text-base sm:text-lg">
              Sabre Officers Defense Academy was founded on a singular conviction: commissioned leadership cannot be produced through generic coaching factories. It demands military discipline, continuous diagnostic evaluation, and one-on-one officer mentorship.
            </p>
          </div>

          {/* 3 Academy Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 bg-cream-1 border border-tactical rounded-lg hover:border-tactical-gold transition-colors shadow-sm">
              <span className="font-mono text-xs text-gold font-bold mb-3 block">// 01 · SCREENING PROFICIENCY</span>
              <h3 className="font-sans text-2xl font-bold text-ink mb-2">
                Stage 1 Elimination Filter
              </h3>
              <p className="text-sm text-ink-3 leading-relaxed">
                Over 65% of candidates are screened out on Day 1. SODA trains aspirants to dominate Officer Intelligence Rating (OIR) booklets and deliver confident, cohesive PPDT narratives without panic.
              </p>
            </div>
            <div className="p-7 bg-cream-1 border border-tactical rounded-lg hover:border-tactical-gold transition-colors shadow-sm">
              <span className="font-mono text-xs text-olive font-bold mb-3 block">// 02 · COGNITIVE LATENCY</span>
              <h3 className="font-sans text-2xl font-bold text-ink mb-2">
                Rapid Working Memory & Spatial Agility
              </h3>
              <p className="text-sm text-ink-3 leading-relaxed">
                Our 70-question CSSS battery trains cadets under 5-second to 12-second soft timers, testing 3D cube net foldings, line symmetry, and auditory memory under pressure.
              </p>
            </div>
            <div className="p-7 bg-cream-1 border border-tactical rounded-lg hover:border-tactical-gold transition-colors shadow-sm">
              <span className="font-mono text-xs text-ink-2 font-bold mb-3 block">// 03 · PSYCHOLOGICAL ASSESSMENT</span>
              <h3 className="font-sans text-2xl font-bold text-ink mb-2">
                15 OLQ Leadership Profiling
              </h3>
              <p className="text-sm text-ink-3 leading-relaxed">
                The 120-item OPAM matrix diagnoses your natural behavioral reactions across Planning, Social Adjustment, Social Effectiveness, and Dynamic factors without artificial coaching bias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — THE SELECTION CRITERIA: Four Factors, Fifteen Qualities */}
      <section className="py-20 bg-cream-1 border-b border-tactical">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono font-bold text-gold tracking-widest uppercase block mb-1">
                02 // DEFENCE COMMISSION RECORD
              </span>
              <h2 className="font-sans text-3xl sm:text-5xl text-ink font-bold">
                Four Factors. <span className="italic font-normal text-gold-dim">Fifteen Qualities.</span>
              </h2>
            </div>
            <p className="text-xs font-mono text-ink-3 mt-3 md:mt-0">
              The declassified tri-service assessment matrix used across all Indian Selection Boards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {OLQ_FACTORS.map((f) => (
              <div
                key={f.code}
                className="p-6 bg-cream-2 border border-tactical-2 rounded-lg flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-tactical">
                    <span className="font-mono text-xs font-bold text-gold">{f.code}</span>
                    <span className="font-mono text-[11px] text-ink-4">04 / 15</span>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-ink mb-4">{f.factor}</h3>
                  <ul className="space-y-3">
                    {f.qualities.map((q) => (
                      <li key={q.code} className="text-xs">
                        <span className="font-mono font-bold text-ink-2 block">{q.name}</span>
                        <span className="text-ink-4 text-[11px]">{q.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Three Integrated Diagnostic Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-navy-1 text-cream-1 rounded-lg border border-tactical-dark relative shadow-dossier-dark">
              <span className="font-mono text-3xl font-bold text-gold block mb-4">01</span>
              <h3 className="font-sans text-2xl font-bold mb-3">Stage 1 Screening Gate</h3>
              <p className="text-sm text-cream-3 leading-relaxed mb-6">
                Master verbal and non-verbal reasoning patterns before the physical board clock begins. Build composure during PPDT individual narration and group consensus.
              </p>
              <div className="pt-4 border-t border-tactical-dark flex justify-between items-center text-xs font-mono text-gold">
                <span>DAY 1 SCREENING ELIMINATION</span>
                <ChevronRight size={16} />
              </div>
            </div>

            <div className="p-8 bg-cream-2 text-ink rounded-lg border border-tactical-2 relative shadow-dossier">
              <span className="font-mono text-3xl font-bold text-olive block mb-4">02</span>
              <h3 className="font-sans text-2xl font-bold mb-3">CSSS Cognitive Battery</h3>
              <p className="text-sm text-ink-3 leading-relaxed mb-6">
                70 timed diagnostic items across 5 sections: memory flash sequences, 3D spatial net foldings, logical series, active vocabulary, and spoken audio cues.
              </p>
              <div className="pt-4 border-t border-tactical flex justify-between items-center text-xs font-mono text-olive font-bold">
                <span>ACCURACY & LATENCY BENCHMARK</span>
                <Link href="/csss" className="hover:underline flex items-center space-x-1">
                  <span>Enter Chamber</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="p-8 bg-cream-2 text-ink rounded-lg border border-tactical-2 relative shadow-dossier">
              <span className="font-mono text-3xl font-bold text-gold block mb-4">03</span>
              <h3 className="font-sans text-2xl font-bold mb-3">OPAM Personality Matrix</h3>
              <p className="text-sm text-ink-3 leading-relaxed mb-6">
                120 original prompts combining self-description, forced-choice trade-offs, and operational situation reactions under a 15-second soft timer.
              </p>
              <div className="pt-4 border-t border-tactical flex justify-between items-center text-xs font-mono text-gold-dim font-bold">
                <span>AUTHENTIC OLQ AUDIT</span>
                <Link href="/opam" className="hover:underline flex items-center space-x-1">
                  <span>Launch Matrix</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — SODA CLASSROOM COURSES INTEGRATION */}
      <section className="py-20 bg-cream-2 border-b border-tactical">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono font-bold text-olive tracking-widest uppercase block mb-1">
                03 // SODA ACADEMY CURRICULUM
              </span>
              <h2 className="font-sans text-3xl sm:text-5xl text-ink font-bold">
                On-Campus Batches at <span className="italic font-normal text-gold-dim">Gwalior HQ.</span>
              </h2>
            </div>
            <a
              href="https://sodaedu.in/courses"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-gold hover:text-gold-2 flex items-center space-x-1 mt-3 md:mt-0 font-bold"
            >
              <span>Explore All Courses on sodaedu.in</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sodaCourses.map((c, idx) => (
              <div
                key={idx}
                className="p-7 bg-cream-1 border border-tactical rounded-lg hover:border-tactical-gold transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-cream-3 text-ink-2 border border-tactical">
                      {c.badge}
                    </span>
                    <span className="text-xs font-mono text-gold font-bold">SODA OFFICIAL</span>
                  </div>
                  <h3 className="font-sans text-2xl font-bold text-ink mb-2">{c.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-3 leading-relaxed mb-4">{c.desc}</p>
                </div>
                <div className="pt-4 border-t border-tactical flex justify-between items-center">
                  <span className="text-[11px] font-mono text-ink-4">
                    Admissions Open // SODA Gwalior Campus
                  </span>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono font-bold text-navy-1 hover:text-gold flex items-center space-x-1"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — THE SODA CODE OF TRAINING */}
      <section className="py-20 bg-navy-1 text-cream-1 border-b border-tactical-dark naval-grid-pattern">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold text-gold tracking-widest uppercase block mb-1">
              04 // SODA TRAINING STANDARD
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-bold mb-4">
              Institutional Military <span className="italic font-normal text-gold">Editorial.</span>
            </h2>
            <p className="text-cream-3 text-base leading-relaxed">
              No false urgency, no borrowed confidence, and no commercial coaching gimmicks—just a disciplined, officer-grade preparation environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {academyPillars.map((p) => (
              <div
                key={p.number}
                className="p-6 bg-navy-2/90 border border-tactical-dark rounded-lg hover:border-tactical-gold transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-2xl font-bold text-gold">{p.number}</span>
                  <Award size={18} className="text-gold/60" />
                </div>
                <h3 className="font-sans text-xl font-bold text-cream-1 mb-2">{p.title}</h3>
                <p className="text-xs text-cream-3 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — VERIFIED CANDIDATE EXPERIENCES */}
      <section className="py-20 bg-cream-2 border-b border-tactical">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-gold tracking-widest uppercase block mb-1">
              05 // SODA GWALIOR EXPERIENCES
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-ink font-bold mb-2">
              Verified Candidate Testimonials from SODA Gwalior.
            </h2>
            <p className="text-xs font-mono text-ink-4">Uncurated feedback from recommended candidates and active foundation cadets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentExperiences.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-cream-1 border border-tactical rounded-lg flex flex-col justify-between shadow-sm"
              >
                <div className="mb-6">
                  <span className="text-4xl font-sans text-gold leading-none block mb-3">“</span>
                  <p className="text-xs sm:text-sm text-ink-2 leading-relaxed italic">"{t.text}"</p>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-tactical">
                  <div className="w-9 h-9 rounded-full bg-navy-1 text-gold font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-ink block">{t.name}</strong>
                    <span className="text-[10px] font-mono text-ink-3">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — START WITH A SIGNAL: Call to Action */}
      <section className="py-20 bg-cream-1">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 bg-cream-2 border border-tactical-2 rounded-xl shadow-dossier flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold text-olive tracking-widest uppercase block mb-2">
                06 // INITIATE CADET TESTING
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl text-ink font-bold mb-3">
                Calm diagnostic evaluation beats anxious speculation.
              </h2>
              <p className="text-sm sm:text-base text-ink-3 leading-relaxed">
                Choose an assessment chamber below. All answers, response latencies, and sectional accuracy scores sync securely to your SODA Cadet Dossier.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => startAssessmentWithAuth('/csss')}
                className="bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-4 px-6 rounded shadow-sm flex items-center justify-center space-x-2"
              >
                <span>CSSS Cognitive (70Q)</span>
                <ArrowRight size={15} className="text-gold" />
              </button>
              <button
                onClick={() => startAssessmentWithAuth('/opam')}
                className="bg-gold hover:bg-gold-2 text-navy-1 font-mono text-xs font-bold uppercase tracking-wider py-4 px-6 rounded shadow-sm flex items-center justify-center space-x-2"
              >
                <span>OPAM Personality (120Q)</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Student Modal */}
      <StudentModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setIsAuthOpen(false);
          window.location.href = authTarget;
        }}
      />
    </div>
  );
};
