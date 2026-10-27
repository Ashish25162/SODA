import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  X, 
  Sparkles,
  Shield,
  Anchor,
  Compass,
  Award,
  Zap,
  ChevronRight
} from 'lucide-react';
import { articlesData } from '../data/articlesData';
import { formatDateSafe } from '../utils/dateFormatter';

export default function ArticlesSection() {
  const [activeArticle, setActiveArticle] = useState(null);

  // Graphic headers for the 3 articles based on branch category
  const getArticleBanner = (categoryType, id) => {
    switch (categoryType) {
      case 'ssb':
        return {
          gradient: 'from-amber-900 via-slate-900 to-[#0A192F]',
          accentBorder: 'border-amber-500/30',
          icon: <Award className="w-16 h-16 text-amber-500/20" />,
          pill: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          titleTag: 'SSB STRATEGY'
        };
      case 'navy':
        return {
          gradient: 'from-blue-950 via-slate-900 to-[#0A192F]',
          accentBorder: 'border-blue-500/30',
          icon: <Anchor className="w-16 h-16 text-blue-500/20" />,
          pill: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          titleTag: 'UPSC CALENDAR'
        };
      case 'army':
      default:
        return {
          gradient: 'from-emerald-950 via-slate-900 to-[#0A192F]',
          accentBorder: 'border-emerald-500/30',
          icon: <Compass className="w-16 h-16 text-emerald-500/20" />,
          pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          titleTag: 'MILITARY INTEL'
        };
    }
  };

  return (
    <section id="insights" className="pt-20 pb-24 bg-soft-mesh border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Complete, properly padded header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>DEFENSE INTEL & STRATEGY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F] tracking-tight">
            Latest Defense Updates & SSB Insights
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Curated military analysis, official UPSC timelines, and Officer Like Qualities guidance written directly by our defense mentorship board.
          </p>
        </div>

        {/* 3 Articles Grid — Rich Magazine Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articlesData.map((article) => {
            const formattedDate = formatDateSafe(article.rawDate, 'October 2026');
            const banner = getArticleBanner(article.categoryType, article.id);

            return (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* 180px Visual Graphic Banner (Mandatory upgrade) */}
                  <div className={`h-[180px] w-full bg-gradient-to-br ${banner.gradient} p-5 relative flex flex-col justify-between overflow-hidden border-b ${banner.accentBorder}`}>
                    
                    {/* Background Tactical Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

                    {/* Watermark Icon */}
                    <div className="absolute -right-2 -bottom-2 pointer-events-none select-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      {banner.icon}
                    </div>

                    {/* Top Tag & Reading Time */}
                    <div className="flex items-center justify-between relative z-10">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider border ${banner.pill}`}>
                        {article.category}
                      </span>
                      <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Banner Headline Preview */}
                    <div className="relative z-10">
                      <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                        {banner.titleTag}
                      </div>
                      <div className="text-xs text-slate-300 font-medium truncate mt-0.5">
                        Published by SODA Mentorship Desk
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Headline */}
                    <h3 className="font-heading font-extrabold text-lg text-[#0A192F] tracking-tight leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* 2-Line Summary */}
                    <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>

                    {/* Safe Date Display (Bug Fixed: never "Invalid Date") */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 py-4 bg-slate-50/90 border-t border-slate-100">
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="w-full text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center justify-between group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Briefing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#0A192F] text-white flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-1 rounded text-xs font-bold mb-2 bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeArticle.category}
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight">
                  {activeArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDateSafe(activeArticle.rawDate)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeArticle.readTime}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed prose prose-slate">
              <div dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Published by Sabre Officers Defense Academy Research Desk
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-[#0A192F] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
