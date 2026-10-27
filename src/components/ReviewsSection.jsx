import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Award,
  ShieldCheck,
  Quote
} from 'lucide-react';
import { reviewsData } from '../data/reviewsData';

export default function ReviewsSection() {
  const [activeFilter, setActiveFilter] = useState('All Reviews');

  const filterTabs = ['All Reviews', 'SSB Candidates', 'NDA', 'CDS', 'AFCAT'];

  const filteredReviews = activeFilter === 'All Reviews'
    ? reviewsData
    : reviewsData.filter(r => r.category === activeFilter);

  // Helper to render text with bold highlighted phrases
  const renderHighlightedReview = (review) => {
    const fullText = review.fullReview;
    const highlight = review.highlightedKeywords;

    if (!highlight || !fullText.includes(highlight)) {
      return <span>{fullText}</span>;
    }

    const parts = fullText.split(highlight);
    return (
      <span>
        {parts[0]}
        <strong className="text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-bold">
          {highlight}
        </strong>
        {parts[1]}
      </span>
    );
  };

  const getBranchAvatarBorder = (category) => {
    switch (category) {
      case 'NDA':
        return 'ring-2 ring-lime-400 bg-lime-100 text-lime-800';
      case 'CDS':
        return 'ring-2 ring-blue-400 bg-blue-100 text-blue-800';
      case 'AFCAT':
        return 'ring-2 ring-sky-400 bg-sky-100 text-sky-800';
      case 'SSB Candidates':
      default:
        return 'ring-2 ring-amber-400 bg-amber-100 text-amber-800';
    }
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Authentic Cadet & Candidate Reviews</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F] tracking-tight">
            Verified Student Experiences & Results
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Real feedback from defense aspirants and SSB candidates trained under Lt. Arjit Mohan Bharadwaj at Sabre Officers Defense Academy in Gwalior.
          </p>
        </div>

        {/* 1. TOP FEATURED BANNER CARD (Wide Horizontal Spotlight Card) */}
        <div className="bg-gradient-to-r from-[#0A192F] via-[#0F284D] to-[#0A192F] text-white rounded-2xl p-6 sm:p-8 lg:p-9 shadow-xl border border-slate-800 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Rating Stat Left */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-700/80 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="font-heading font-extrabold text-4xl text-white">
                4.9 / 5.0
              </div>
              <p className="text-amber-300 font-semibold text-xs uppercase tracking-wider mt-1">
                Highest Rated Defence Academy in Gwalior
              </p>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Aggregated from 150+ verified Google Reviews by students clearing NDA written, CDS, and recommended for Armed Forces.
              </p>
              <a
                href="https://www.google.com/search?q=sabre+officers+defense+academy+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Read Original Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Featured Quote Right */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded border border-amber-500/30">
                  Featured Candidate Spotlight
                </span>
                <span className="text-xs text-slate-400">
                  Recommended Cadet Feedback
                </span>
              </div>
              <p className="text-slate-200 text-base sm:text-lg italic leading-relaxed font-serif">
                “One of the best academy in Gwalior for SSB prep... <strong className="text-amber-300 font-bold">Bharadwaj sir's personal interaction</strong> is what I liked the most. He pointed out my specific blind spots in the psychology dossier that no standard book ever mentioned.”
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-amber-500/30 text-amber-300 font-bold flex items-center justify-center border border-amber-400">
                  APS
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-white">Arun Pratap Singh</div>
                  <div className="text-xs text-slate-400">SSB Candidate • Indian Armed Forces Board Recommendation Track</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {filterTabs.map((tab) => {
            const active = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-[#0A192F] text-white shadow-md font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 2. DYNAMIC 3-COLUMN MASONRY-STYLE CARD GRID WITH QUOTE WATERMARKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => {
            const avatarClass = getBranchAvatarBorder(review.category);

            return (
              <div
                key={review.id}
                className="bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70 rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Large Decorative Quotation Mark Watermark in Background */}
                <div className="absolute -top-3 -right-2 text-slate-200/50 font-serif text-8xl pointer-events-none select-none leading-none group-hover:text-amber-100 transition-colors">
                  “
                </div>

                <div className="relative z-10">
                  {/* Rating & Verified Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                      Verified Google
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4">
                    {renderHighlightedReview(review)}
                  </p>
                </div>

                {/* Candidate Info with Service-Colored Avatar Ring */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-full ${avatarClass} font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}>
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-slate-900 leading-tight">
                        {review.name}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {review.role}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-md shadow-2xs">
                    {review.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
