import React from 'react';
import { 
  GraduationCap, 
  Target, 
  CheckCircle, 
  FileText, 
  ArrowRight, 
  Clock, 
  Layers,
  Sparkles,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';
import { coursesData } from '../data/coursesData';

export default function CoursesSection({ 
  selectedStage, 
  onSelectStage, 
  onViewSyllabus, 
  onOpenCounseling 
}) {
  const tabs = [
    { id: 'all', label: 'All Programs' },
    { id: '10th-12th', label: 'After 10th / 12th' },
    { id: 'graduates', label: 'Graduate Entries' },
    { id: 'ssb', label: 'SSB Interview' },
  ];

  const filteredCourses = selectedStage === 'all'
    ? coursesData
    : coursesData.filter(course => course.targetStage === selectedStage);

  // Service Branch specific card accents & header tints
  const getCardBranchTheme = (id, badgeType) => {
    switch (id) {
      case 'nda':
      case 'capf':
        return {
          topBorder: 'border-t-4 border-lime-600',
          headerTint: 'bg-gradient-to-b from-lime-50/70 via-white to-white',
          pillBadge: 'badge-army',
          iconColor: 'text-lime-700'
        };
      case 'cds':
        return {
          topBorder: 'border-t-4 border-blue-700',
          headerTint: 'bg-gradient-to-b from-blue-50/70 via-white to-white',
          pillBadge: 'badge-navy',
          iconColor: 'text-blue-700'
        };
      case 'afcat':
        return {
          topBorder: 'border-t-4 border-sky-500',
          headerTint: 'bg-gradient-to-b from-sky-50/70 via-white to-white',
          pillBadge: 'badge-airforce',
          iconColor: 'text-sky-600'
        };
      case 'ssb':
      case 'foundation':
      default:
        return {
          topBorder: 'border-t-4 border-amber-500',
          headerTint: 'bg-gradient-to-b from-amber-50/80 via-white to-white',
          pillBadge: 'badge-ssb',
          iconColor: 'text-amber-700'
        };
    }
  };

  return (
    <section id="courses" className="py-16 sm:py-20 bg-soft-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Structured Defense Pathways</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F] tracking-tight">
            Commissioned{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">
              Officer Training Programs
            </span>
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Meticulously planned curriculum aligned with UPSC & Services Selection Board standards. Compare eligibility, focus areas, and training modes below.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {tabs.map((tab) => {
              const active = selectedStage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectStage(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-[#0A192F] text-white shadow-md shadow-slate-900/15 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    active ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {tab.id === 'all' 
                      ? coursesData.length 
                      : coursesData.filter(c => c.targetStage === tab.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Programs Grid — Dynamic Accents & Compact Bento Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map((course) => {
            const theme = getCardBranchTheme(course.id, course.badge.type);

            return (
              <div
                key={course.id}
                className={`bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group ${theme.topBorder}`}
              >
                {/* Card Header & Content */}
                <div className={`p-6 pb-4 ${theme.headerTint}`}>
                  
                  {/* Top Category Badge & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-tight ${theme.pillBadge}`}>
                      {course.badge.label}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1 bg-white/90 border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {course.duration.split(' ')[0]} {course.duration.split(' ')[1]}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-heading font-extrabold text-xl text-[#0A192F] tracking-tight group-hover:text-amber-700 transition-colors">
                    {course.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* COMPACT 2x2 BENTO METADATA GRID (Replaced bulky stacked grey bars!) */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    
                    {/* Bento Box 1: Eligibility */}
                    <div className="bg-slate-50/90 p-2.5 rounded-lg border border-slate-200/70">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mb-0.5">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Eligibility</span>
                      </div>
                      <div className="text-[11px] text-slate-600 leading-tight font-medium">
                        {course.eligibility.split('(')[0].trim()}
                      </div>
                    </div>

                    {/* Bento Box 2: Target Age */}
                    <div className="bg-slate-50/90 p-2.5 rounded-lg border border-slate-200/70">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mb-0.5">
                        <CalendarCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Age Bracket</span>
                      </div>
                      <div className="text-[11px] text-slate-600 leading-tight font-medium">
                        {course.eligibility.includes('(') ? course.eligibility.split('(')[1].replace(')', '') : 'Official UPSC'}
                      </div>
                    </div>

                    {/* Bento Box 3: Focus Area */}
                    <div className="bg-slate-50/90 p-2.5 rounded-lg border border-slate-200/70">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mb-0.5">
                        <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Core Focus</span>
                      </div>
                      <div className="text-[11px] text-slate-600 leading-tight font-medium truncate" title={course.focusArea}>
                        {course.focusArea}
                      </div>
                    </div>

                    {/* Bento Box 4: Training Mode */}
                    <div className="bg-slate-50/90 p-2.5 rounded-lg border border-slate-200/70">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mb-0.5">
                        <Layers className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>Mode</span>
                      </div>
                      <div className="text-[11px] text-slate-600 leading-tight font-medium truncate" title={course.trainingMode}>
                        {course.trainingMode}
                      </div>
                    </div>

                  </div>

                  {/* Key Highlights Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Key Program Pillars:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {course.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-snug">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-3.5 bg-slate-50/90 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onViewSyllabus(course)}
                    className="w-full bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs py-2 px-3 rounded-lg border border-slate-200 shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Syllabus</span>
                  </button>

                  <button
                    onClick={() => onOpenCounseling(course.title)}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs py-2 px-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1 active:scale-95"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Guidance Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-[#0A192F]">
                Unsure which defense entry fits your age or academic stream?
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                Use our interactive Defense Age Calculator below or speak directly with academy counselors in Padav, Gwalior.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById('age-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg border border-slate-300 transition-colors"
            >
              Open Age Calculator
            </button>
            <button
              onClick={() => onOpenCounseling('Course Guidance Help')}
              className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow transition-colors"
            >
              Get Free Guidance
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
