import React from 'react';
import {
  Award,
  BookOpen,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  Shield,
  CheckCircle,
  Clock,
  Compass,
  MapPin,
} from 'lucide-react';

export const FounderPage: React.FC = () => {
  const qualifications = [
    'Commissioned Officer (Retd.)',
    'NDA & IMA Alumnus',
    'SSB Screening Specialist',
    'M.Sc Defence Studies',
    '15 OLQ Assessment Director',
    'Chief Mentor · SODA Gwalior',
  ];

  const milestones = [
    {
      year: 'Commission',
      title: 'NDA & IMA Leadership',
      body: 'Trained and commissioned through the premier military institutions of the nation—National Defence Academy (Khadakwasla) and Indian Military Academy (Dehradun).',
    },
    {
      year: 'Service',
      title: 'Operational Service & Troop Command',
      body: 'Commanded troops in challenging operational environments, developing a first-hand understanding of stress inoculation, fast decision-making, and officer temperament.',
    },
    {
      year: 'Pedagogy',
      title: 'SSB Psychological & Screening Research',
      body: 'Deconstructed the 3-tier SSB selection framework—Psychologist, GTO, and Interviewing Officer—focusing on true behavioural observation rather than scripted theatrics.',
    },
    {
      year: 'Academy',
      title: 'Sabre Officers Defense Academy (SODA)',
      body: 'Established SODA in Gwalior as an institutional military training academy, producing consistent recommendations for NDA, CDS, AFCAT, and OTA batches.',
    },
    {
      year: 'Digital Wing',
      title: 'SODA Cadet Screening Chamber',
      body: 'Built the digital cognitive and personality diagnostic batteries (CSSS & OPAM) to allow pan-India aspirants to benchmark latency and OLQ endorsements before stepping onto board grounds.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream-1 py-12 md:py-20 parchment-pattern">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Hero Card */}
        <div className="bg-cream-2 border border-tactical-2 rounded-xl p-8 sm:p-12 shadow-dossier mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="md:col-span-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/15 text-gold-dim rounded border border-gold/30 font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <span>CHIEF MENTOR · SSB INTERVIEW DIRECTOR</span>
              </div>

              <h1 className="font-sans text-3xl sm:text-5xl font-bold text-ink mb-4">
                Lt. Arjit M.{' '}
                <span className="italic font-normal text-gold-dim">Bharadwaj</span>
              </h1>

              <p className="text-base text-ink-2 leading-relaxed mb-6">
                Guiding India's next generation of commissioned officers through military discipline, psychological self-awareness, and unvarnished diagnostic feedback at Sabre Officers Defense Academy (SODA).
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <a
                  href="https://wa.me/919009829888"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 bg-olive hover:bg-olive-2 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3 px-5 rounded shadow-sm transition-all"
                >
                  <MessageCircle size={15} />
                  <span>Direct Mentorship WhatsApp</span>
                </a>
                <a
                  href="mailto:admissions@sodaedu.in"
                  className="inline-flex items-center space-x-2 bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3 px-5 rounded shadow-sm transition-all"
                >
                  <Mail size={15} className="text-gold" />
                  <span>admissions@sodaedu.in</span>
                </a>
                <a
                  href="tel:+919009829888"
                  className="inline-flex items-center space-x-2 bg-cream-1 hover:bg-cream-3 text-ink font-mono text-xs font-bold uppercase tracking-wider py-3 px-5 rounded border border-tactical-2 transition-all"
                >
                  <Phone size={15} />
                  <span>+91 90098 29888</span>
                </a>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono text-ink-4">
                <MapPin size={13} className="text-gold" />
                <span>SODA GWALIOR CAMPUS // 106, MLB COLONY, PADAV, LASHKAR, GWALIOR</span>
              </div>
            </div>

            {/* Right Avatar Card */}
            <div className="md:col-span-4 flex flex-col items-center text-center p-6 bg-cream-1 border border-tactical rounded-lg">
              <div className="w-24 h-24 rounded-full bg-navy-1 border-2 border-tactical-gold text-gold flex items-center justify-center font-sans text-3xl font-bold shadow-md mb-4">
                AMB
              </div>
              <span className="font-mono text-[11px] text-olive font-bold uppercase tracking-widest block mb-1">
                CHIEF MENTOR
              </span>
              <strong className="text-sm font-bold text-ink block">Lt. Arjit M. Bharadwaj</strong>
              <span className="text-xs text-ink-3 mt-1">Sabre Officers Defense Academy</span>
              <a
                href="https://sodaedu.in/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-[11px] font-mono text-gold hover:underline flex items-center space-x-1"
              >
                <span>sodaedu.in</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="bg-cream-2 border border-tactical rounded-xl p-8 shadow-sm mb-10">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-widest block mb-2">
            MILITARY HERITAGE & PEDAGOGICAL PHILOSOPHY
          </span>
          <h2 className="font-sans text-2xl font-bold text-ink mb-6">
            The architect of an authentic, officer-grade preparation room.
          </h2>

          <div className="flex flex-wrap gap-2.5 mb-8">
            {qualifications.map((q, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-cream-1 text-ink font-mono text-xs font-bold rounded border border-tactical"
              >
                <CheckCircle size={13} className="text-olive" />
                <span>{q}</span>
              </span>
            ))}
          </div>

          <p className="text-sm text-ink-2 leading-relaxed mb-4">
            Under Lt. Arjit M. Bharadwaj’s stewardship, Sabre Officers Defense Academy (SODA) operates on a simple, non-negotiable principle: <strong className="text-ink">train for the true shape of the test, not a fantasy of yourself.</strong>
          </p>
          <p className="text-sm text-ink-2 leading-relaxed">
            The Selection Board assessors are trained behavioral psychologists and senior officers. Memorised stories in PPDT or rehearsed answers in personal interviews are exposed within minutes. SODA’s diagnostic batteries and classroom workshops strip away theatrics to build genuine speed, emotional stability, and the 15 Officer Like Qualities.
          </p>
        </div>

        {/* Milestone Timeline */}
        <div className="bg-navy-1 text-cream-1 border border-tactical-dark rounded-xl p-8 sm:p-10 shadow-dossier-dark mb-10 naval-grid-pattern">
          <div className="mb-8">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-widest block mb-1">
              COMMISSION & SERVICE TIMELINE
            </span>
            <h3 className="font-sans text-3xl font-bold text-cream-1">
              A disciplined approach to the work before the hall.
            </h3>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-5 bg-navy-2/90 border border-tactical-dark rounded-lg flex flex-col sm:flex-row sm:items-start gap-4 hover:border-tactical-gold transition-colors"
              >
                <span className="font-mono text-sm font-bold text-gold w-28 shrink-0">
                  {m.year}
                </span>
                <div>
                  <h4 className="font-sans text-xl font-bold text-cream-1 mb-1">{m.title}</h4>
                  <p className="text-xs text-cream-3 leading-relaxed">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Handwritten Personal Sign-off in Caveat Font */}
        <div className="p-8 bg-cream-2 border border-tactical-2 rounded-xl text-center shadow-sm">
          <p className="text-sm text-ink-2 max-w-xl mx-auto mb-4 italic">
            "An officer is not defined by swagger or loud speeches. An officer is defined by composure when plans collapse and the steadfast willingness to stand up for the team. Train your habits honestly."
          </p>
          <div className="font-handwriting text-4xl text-ink-2 font-bold mb-1">
            Lt. Arjit M. Bharadwaj
          </div>
          <span className="font-mono text-[11px] text-ink-4 uppercase tracking-widest">
            Chief Mentor & Director of SSB Training // Sabre Officers Defense Academy (sodaedu.in)
          </span>
        </div>
      </div>
    </div>
  );
};
