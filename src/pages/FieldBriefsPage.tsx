import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Compass, Shield, Radio, MessageSquare, Globe, Award } from 'lucide-react';

export const FieldBriefsPage: React.FC = () => {
  const cards = [
    {
      label: 'GEOSTRATEGIC BRIEFS',
      title: 'Indo-Pacific & National Security',
      body: 'Deconstruct border infrastructure, maritime security, tri-service theaterisation, and defense indigenisation into clear, defensible perspectives.',
      icon: Radio,
    },
    {
      label: 'LECTURETTE ARCHITECTURE',
      title: 'The 3-Minute Officer Format',
      body: 'Master SODA’s standard lecturette delivery format: a definitive opening statement, two concrete operational facts, and a balanced strategic conclusion.',
      icon: Globe,
    },
    {
      label: 'GD CONSENSUS TECHNIQUES',
      title: 'Group Influence without Aggression',
      body: 'Learn how to intervene calmly during chaotic group discussions, synthesise diverging opinions, and lead the team toward a workable conclusion.',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-cream-1 py-12 md:py-20 parchment-pattern">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Hero */}
        <div className="bg-cream-2 border border-tactical-2 rounded-xl p-8 sm:p-12 shadow-dossier mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/15 text-gold-dim rounded border border-gold/30 font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <span>SODA STRATEGIC WING // DAILY MILITARY SIGNAL & GD BRIEFS</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-bold text-ink mb-4">
            Strategic Articulation. <span className="italic font-normal text-gold-dim">From headlines to officer lecturettes.</span>
          </h1>
          <p className="text-base text-ink-2 max-w-2xl leading-relaxed mb-8">
            Curated defense briefings developed by Sabre Officers Defense Academy (sodaedu.in) mentors. Transform complex geopolitical, national security, and military modernization developments into structured, authoritative speaking points.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/founder"
              className="inline-flex items-center space-x-2 bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded shadow-sm"
            >
              <span>Consult Chief Mentor (Lt. Arjit M. Bharadwaj)</span>
              <ArrowRight size={15} className="text-gold" />
            </Link>
            <a
              href="https://sodaedu.in/blog"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-cream-1 hover:bg-cream-3 border border-tactical-2 text-ink font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded shadow-sm"
            >
              <span>Read SODA Academy Blog</span>
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
                  TESTED IN SODA GD SESSIONS
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Box */}
        <div className="p-4 bg-navy-1 text-cream-2 rounded-lg border border-tactical-dark flex items-center space-x-3 text-xs font-mono">
          <Shield size={16} className="text-gold shrink-0" />
          <span>
            Independent strategic briefings designed for military officer leadership expression under SODA Gwalior faculty.
          </span>
        </div>
      </div>
    </div>
  );
};
