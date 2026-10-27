import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, BookOpen, Brain, Clock, Shield, CheckCircle2, Target, Globe } from 'lucide-react';

export const WrittenPracticePage: React.FC = () => {
  const cards = [
    {
      label: 'MATHEMATICS & OIR REASONING',
      title: 'Precision Quantitative Reps',
      body: 'Work through calculus, trigonometry, vector geometry, and high-velocity non-verbal reasoning patterns before the physical examination clock begins.',
      icon: Brain,
    },
    {
      label: 'ENGLISH & MILITARY EXPRESSION',
      title: 'Vocabulary & Narrative Precision',
      body: 'Sharpen reading comprehension, active idiom mastery, and the structured sentence clarity necessary for written papers, PPDT narrations, and personal interviews.',
      icon: BookOpen,
    },
    {
      label: 'DEFENCE AFFAIRS & GENERAL STUDIES',
      title: 'Geopolitical & Strategic Foundations',
      body: 'Connect Indian military history, defense procurements, constitution, and global security developments into coherent, defensible arguments.',
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-cream-1 py-12 md:py-20 parchment-pattern">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Hero */}
        <div className="bg-cream-2 border border-tactical-2 rounded-xl p-8 sm:p-12 shadow-dossier mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-olive/15 text-olive rounded border border-olive/30 font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <span>SODA ACADEMIC WING // WRITTEN EXAMINATION REPOSITORY</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-bold text-ink mb-4">
            Officer Paper Mastery. <span className="italic font-normal text-gold-dim">Precision under constraints.</span>
          </h1>
          <p className="text-base text-ink-2 max-w-2xl leading-relaxed mb-8">
            Structured written drills engineered by Sabre Officers Defense Academy (sodaedu.in) mentors for NDA (Mathematics & GAT), CDS, and AFCAT papers. Focus on negative-marking mitigation and disciplined time management.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/csss"
              className="inline-flex items-center space-x-2 bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded shadow-sm"
            >
              <span>Launch CSSS Cognitive Battery (70Q)</span>
              <ArrowRight size={15} className="text-gold" />
            </Link>
            <a
              href="https://sodaedu.in/courses"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-cream-1 hover:bg-cream-3 border border-tactical-2 text-ink font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded shadow-sm"
            >
              <span>View SODA Classroom Courses</span>
            </a>
          </div>
        </div>

        {/* Content Cards */}
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
                  SODA SYLLABUS ALIGNED
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Box */}
        <div className="p-4 bg-navy-1 text-cream-2 rounded-lg border border-tactical-dark flex items-center space-x-3 text-xs font-mono">
          <Shield size={16} className="text-gold shrink-0" />
          <span>
            Integrated with Sabre Officers Defense Academy’s on-campus training facilities at Gwalior HQ (Padav, Lashkar).
          </span>
        </div>
      </div>
    </div>
  );
};
