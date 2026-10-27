import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Compass, Shield, BookOpen, Target, CheckCircle2, FileText } from 'lucide-react';

export const FieldGuidesPage: React.FC = () => {
  const cards = [
    {
      label: 'STAGE 1: SCREENING PROTOCOLS',
      title: 'OIR Rating & PPDT Narration',
      body: 'Understand how OIR ratings are indexed, master the 1-minute crisp individual narration without stammering, and contribute constructiveness to group story consensus.',
      icon: Target,
    },
    {
      label: 'PIQ FORM CONSISTENCY',
      title: 'The Assessor’s Operational Blueprint',
      body: 'Learn how your Personal Information Questionnaire (PIQ) shapes the Interviewing Officer’s questions. Eliminate discrepancies in academic, sports, and family history.',
      icon: FileText,
    },
    {
      label: 'STAGE 2 PSYCH & GTO GROUND',
      title: 'Projective Testing & Command Tasks',
      body: 'Deconstruct TAT story structure, positive WAT associations, practical SRT solutions, and how to command your sub-group on the Gwalior SODA obstacle course.',
      icon: Compass,
    },
  ];

  return (
    <div className="min-h-screen bg-cream-1 py-12 md:py-20 parchment-pattern">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Hero */}
        <div className="bg-cream-2 border border-tactical-2 rounded-xl p-8 sm:p-12 shadow-dossier mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-olive/15 text-olive rounded border border-olive/30 font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <span>SODA PROCEDURAL WING // SSB INTERVIEW FIELD MANUAL</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-bold text-ink mb-4">
            The Board Manual. <span className="italic font-normal text-gold-dim">Protocols for Stage 1, Stage 2 & Conference.</span>
          </h1>
          <p className="text-base text-ink-2 max-w-2xl leading-relaxed mb-8">
            Essential operational guidelines formulated by Sabre Officers Defense Academy (sodaedu.in) mentors covering Stage 1 screening gate mechanics, PIQ dossier integrity, and 15 OLQ observable behaviours.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/csss"
              className="inline-flex items-center space-x-2 bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded shadow-sm"
            >
              <span>Practise Stage 1 Cognitive Battery (70Q)</span>
              <ArrowRight size={15} className="text-gold" />
            </Link>
            <a
              href="https://sodaedu.in/about"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-cream-1 hover:bg-cream-3 border border-tactical-2 text-ink font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded shadow-sm"
            >
              <span>About SODA Gwalior Campus</span>
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-cream-2 border border-tactical rounded-lg p-7 shadow-sm hover:border-tactical-gold transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-gold">{card.label}</span>
                    <Icon size={18} className="text-ink-3" />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-ink mb-2">{card.title}</h3>
                  <p className="text-xs text-ink-3 leading-relaxed mb-4">{card.body}</p>
                </div>
                <div className="pt-3 border-t border-tactical text-[11px] font-mono text-olive font-bold">
                  SODA FIELD MANUAL STANDARD
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Box */}
        <div className="p-4 bg-navy-1 text-cream-2 rounded-lg border border-tactical-dark flex items-center space-x-3 text-xs font-mono">
          <Shield size={16} className="text-gold shrink-0" />
          <span>
            Field operational guides formulated by retired officers and senior assessors at Sabre Officers Defense Academy (sodaedu.in).
          </span>
        </div>
      </div>
    </div>
  );
};
