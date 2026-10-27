import React, { useState } from 'react';
import { articlesData } from '../data/articlesData';

export default function BriefingRoom() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const displayArticles = [
    {
      num: '01',
      tag: 'Field Note / 01',
      cat: 'NDA · Notification',
      title: 'NDA 2026: What changed in the written pattern & cutoff bracket',
      readTime: '6 min read',
      data: articlesData[1] || articlesData[0],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 3v18M3 12h18"/>
        </svg>
      ),
    },
    {
      num: '02',
      tag: 'Field Note / 02',
      cat: 'SSB · Psychology',
      title: 'The five days, decoded: a day-by-day SSB guide from ex-officers',
      readTime: '9 min read',
      data: articlesData[0],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 2l9 20-9-5-9 5 9-20z"/>
        </svg>
      ),
    },
    {
      num: '03',
      tag: 'Field Note / 03',
      cat: 'Strategy · Career',
      title: 'AFCAT vs CDS: choosing your first graduate commission attempt',
      readTime: '5 min read',
      data: articlesData[2] || articlesData[0],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 19V5M4 19h16M8 15l4-6 3 4 4-7"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="section bg-[#F8FAFC]" id="journal">
      <div className="wrap">

        {/* Section Header */}
        <div className="journal-head mb-10 flex items-end justify-between flex-wrap gap-4">
          <div className="head">
            <p className="eyebrow font-mono text-xs uppercase tracking-widest text-[#3F6212] font-semibold">
              06 — Defense Intelligence
            </p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F] tracking-tight">
              Read before <span className="text-[#D97706]">you apply.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#475569] mt-2">
              Tactical insights, syllabus updates, and officer-written breakdowns. Verified defense examination intelligence.
            </p>
          </div>
          <a href="#apply" className="btn btn-ghost text-xs py-2 px-4">
            Admissions Desk
          </a>
        </div>

        {/* Articles Grid */}
        <div className="journal-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayArticles.map((art) => (
            <div
              key={art.num}
              onClick={() => setSelectedArticle(art.data)}
              className="article bg-white border border-[#CBD5E1] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#D97706]/50 transition-all cursor-pointer flex flex-col justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedArticle(art.data);
                }
              }}
            >
              <div className="article-thumb bg-[#F1F5F9] p-6 flex items-center justify-between border-b border-[#E2E8F0] text-[#0A192F]">
                <span className="tag font-mono text-xs font-semibold text-[#64748B] uppercase tracking-wider">{art.tag}</span>
                <div className="w-8 h-8 text-[#D97706]">{art.icon}</div>
              </div>

              <div className="article-body p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="article-cat font-mono text-[10.5px] uppercase tracking-wider text-[#3F6212] font-bold block mb-2">{art.cat}</span>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[#0A192F] tracking-tight leading-snug">{art.title}</h4>
                </div>
                <div className="article-foot flex items-center justify-between pt-4 mt-6 border-t border-[#E2E8F0] font-mono text-xs text-[#64748B]">
                  <span>{art.readTime}</span>
                  <span className="text-[#D97706] font-bold">Read Field Note →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedArticle(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="modal-sheet max-w-2xl p-6 sm:p-8 bg-white rounded-xl shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#3F6212] font-bold">
                // SODA Defense Briefing
              </span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded border border-[#CBD5E1] grid place-items-center text-sm hover:bg-[#0A192F] hover:text-white transition-colors"
                aria-label="Close article"
              >
                ✕
              </button>
            </div>

            <div className="mt-6">
              <span className="inline-block px-3 py-1 bg-[#ECFCCB] text-[#3F6212] border border-[#BEF264] rounded-full font-mono text-xs tracking-wider uppercase font-bold mb-3">
                {selectedArticle.category} · {selectedArticle.readTime}
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-[#0A192F] leading-snug">
                {selectedArticle.title}
              </h2>
              <p className="mt-3 text-sm text-[#475569] bg-[#F8FAFC] border-l-4 border-[#D97706] p-3 rounded font-medium">
                {selectedArticle.summary}
              </p>

              <div 
                className="mt-6 font-sans text-sm sm:text-base leading-relaxed text-[#1E293B] space-y-4"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-4 flex-wrap">
                <span className="font-mono text-xs text-[#64748B]">
                  Published by Sabre Officers Defense Academy Faculty
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="btn btn-navy text-xs py-2 px-5"
                >
                  Close Briefing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
