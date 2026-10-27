import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Menu, 
  X, 
  ChevronDown, 
  Compass, 
  Award, 
  Calculator, 
  BookOpen, 
  FileText, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';

export default function Navbar({ onOpenCounseling, onSelectCourse }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setCoursesDropdown(false);
    setResourcesDropdown(false);
  };

  const scrollToSection = (id) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm' 
        : 'bg-white border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Crest & Title */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-xl bg-[#0A192F] p-1.5 flex items-center justify-center shadow-md border border-slate-700 overflow-hidden shrink-0 group-hover:border-amber-500 transition-colors">
              <img
                src="/logo.webp"
                alt="Sabre Officers Defense Academy Crest"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center text-amber-400">
                <Shield className="w-7 h-7" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl text-[#0A192F] tracking-tight leading-tight group-hover:text-amber-700 transition-colors">
                  SODA
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Defence Academy
                </span>
              </div>
              <span className="text-[13px] font-semibold text-slate-800 leading-none mt-0.5 hidden sm:block">
                Sabre Officers Defense Academy
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                Gwalior • Mentored by Ex-Indian Navy Officer
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation (Clean, 5 main links) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => scrollToSection('home')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0A192F] hover:bg-slate-50 rounded-lg transition-colors"
            >
              Home
            </button>

            {/* Courses Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCoursesDropdown(true)}
              onMouseLeave={() => setCoursesDropdown(false)}
            >
              <button
                onClick={() => scrollToSection('courses')}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0A192F] hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Courses</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${coursesDropdown ? 'rotate-180' : ''}`} />
              </button>

              {coursesDropdown && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 mt-1 z-50 animate-in fade-in-50 duration-200">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Our Training Programs
                  </div>
                  {[
                    { name: 'NDA Coaching', badge: '12th Appearing/Pass', id: 'nda' },
                    { name: 'CDS Coaching', badge: 'Graduates / OTA', id: 'cds' },
                    { name: 'AFCAT Coaching', badge: 'Air Force Wings', id: 'afcat' },
                    { name: 'CAPF (AC) Coaching', badge: 'Assistant Commandant', id: 'capf' },
                    { name: 'SSB Interview Mentorship', badge: '5-Day Board', id: 'ssb' },
                    { name: 'Foundation Course', badge: '11th & 12th + NDA', id: 'foundation' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCoursesDropdown(false);
                        if (onSelectCourse) onSelectCourse(item.id);
                        scrollToSection('courses');
                      }}
                      className="w-full text-left px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-700 flex items-center justify-between transition-colors"
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-2 pt-2 px-3">
                    <button
                      onClick={() => { setCoursesDropdown(false); scrollToSection('courses'); }}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      View All 6 Programs <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SSB Training */}
            <button
              onClick={() => scrollToSection('ssb-bento')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0A192F] hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>SSB Training</span>
            </button>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesDropdown(true)}
              onMouseLeave={() => setResourcesDropdown(false)}
            >
              <button
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0A192F] hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${resourcesDropdown ? 'rotate-180' : ''}`} />
              </button>

              {resourcesDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 mt-1 z-50 animate-in fade-in-50 duration-200">
                  <button
                    onClick={() => { setResourcesDropdown(false); scrollToSection('age-calculator'); }}
                    className="w-full text-left px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-amber-700 flex items-center gap-2.5 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-xs">Defense Age Calculator</div>
                      <div className="text-[11px] text-slate-500">Check NDA, CDS & AFCAT eligibility</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setResourcesDropdown(false); scrollToSection('insights'); }}
                    className="w-full text-left px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-amber-700 flex items-center gap-2.5 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-xs">Articles & SSB Strategy</div>
                      <div className="text-[11px] text-slate-500">Expert tips & exam roadmaps</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setResourcesDropdown(false); scrollToSection('insights'); }}
                    className="w-full text-left px-3.5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-amber-700 flex items-center gap-2.5 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-xs">Current Affairs Hub</div>
                      <div className="text-[11px] text-slate-500">Defense & military updates</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* About & Results */}
            <button
              onClick={() => scrollToSection('reviews')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0A192F] hover:bg-slate-50 rounded-lg transition-colors"
            >
              About & Results
            </button>
          </nav>

          {/* Right: CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenCounseling('General Admission')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Counseling</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => onOpenCounseling('Mobile Quick Counseling')}
              className="bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              Counseling
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span>Our Courses (6 Programs)</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                NDA • CDS • SSB
              </span>
            </button>
            <button
              onClick={() => scrollToSection('ssb-bento')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              SSB Training & Mentorship
            </button>
            <button
              onClick={() => scrollToSection('age-calculator')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>Defense Age & Eligibility Calculator</span>
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Verified Student Reviews & Results
            </button>
            <button
              onClick={() => scrollToSection('insights')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Latest Defense Updates & Blog
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                closeMenu();
                onOpenCounseling('Mobile Menu Counseling');
              }}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg text-center shadow transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Counseling Session</span>
            </button>

            <a
              href="https://wa.me/918433247664"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-center shadow text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Chat with Academy Counselor on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
