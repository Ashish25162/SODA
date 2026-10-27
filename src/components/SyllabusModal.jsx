import React from 'react';

export default function SyllabusModal({ course, onClose, onEnquire }) {
  if (!course) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="modal-sheet max-w-3xl overflow-hidden flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#08122A] text-[#F4EFE6] flex items-start justify-between gap-4 border-b border-[#C9A961]/25">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[10.5px] uppercase tracking-widest text-[#C9A961]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5A7048]"></span>
              <span>Official Curriculum Blueprint</span>
              <span className="text-[#8B94A2]">· Duration: {course.duration}</span>
            </div>
            <h3 className="font-sans font-semibold text-2xl tracking-tight text-[#FAF6EE]">
              {course.title} Syllabus &amp; Blueprint
            </h3>
            <p className="text-[#8B94A2] text-xs sm:text-sm mt-1 max-w-xl">
              {course.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded border border-[#F4EFE6]/20 grid place-items-center text-sm text-[#8B94A2] hover:text-[#FAF6EE] hover:bg-[#F4EFE6]/10 transition-colors shrink-0"
            aria-label="Close syllabus"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 max-h-[70vh] bg-[#FAF6EE]">
          
          {/* Detailed Overview */}
          <div className="bg-[#F4EFE6] p-4 rounded border border-[#0A1428]/10">
            <h4 className="font-sans font-semibold text-sm text-[#0A1428] mb-1">
              Course Objective &amp; Officer Training Philosophy
            </h4>
            <p className="text-[#5C6577] text-xs sm:text-sm leading-relaxed">
              {course.detailedOverview}
            </p>
          </div>

          {/* Key Highlights */}
          {course.highlights && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#0A1428] font-bold mb-3">
                Key Training Pillars
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-[#F4EFE6] p-3 rounded border border-[#0A1428]/08 text-xs text-[#0A1428]">
                    <span className="text-[#5A7048] font-bold">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section by Section Syllabus */}
          {course.syllabus && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#0A1428] font-bold mb-3">
                Detailed Examination Syllabus
              </h4>
              <div className="space-y-3">
                {course.syllabus.map((item, idx) => (
                  <div key={idx} className="bg-[#F4EFE6] p-4 rounded border border-[#0A1428]/10">
                    <h5 className="font-sans font-semibold text-sm text-[#0A1428] mb-1.5 flex items-center justify-between">
                      <span>{item.section}</span>
                    </h5>
                    <p className="text-xs text-[#5C6577] leading-relaxed">
                      {item.topics}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#FAF6EE] border-t border-[#0A1428]/10 flex items-center justify-between gap-3 flex-wrap">
          <div className="font-mono text-[11px] text-[#5C6577]">
            Batch admissions open for upcoming academic term.
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost text-xs py-2 px-4"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onEnquire(course.title)}
              className="btn btn-gold text-xs py-2 px-5"
            >
              <span>Enquire for {course.title}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
