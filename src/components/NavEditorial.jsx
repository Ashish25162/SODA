import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogIn, LogOut, Award, ChevronDown } from 'lucide-react';

export default function NavEditorial({ onOpenBriefing, onOpenPracticeRoom, onOpenAuth }) {
  const { user, isAuthenticated, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const scrollTo = (id) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`} id="nav">
      <div className="wrap nav-inner">

        {/* Brand / Logo */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); scrollTo('top'); }}
          className="logo" 
          aria-label="Sabre Officers Defense Academy"
        >
          <span className="logo-mark" aria-hidden="true">
            <img 
              src="/logo.webp" 
              alt="SODA Crest" 
              className="w-full h-full object-contain p-0.5"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
              }}
            />
            <svg 
              className="hidden w-4 h-4 text-[#C9A961]"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 3v18M4 9l8-6 8 6M8 21h8"/>
            </svg>
          </span>
          <span className="logo-text">
            <strong>SABRE OFFICERS</strong>
            <span>Defense Academy · Gwalior</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="nav-links" id="navLinks">
            <li>
              <button 
                type="button" 
                onClick={() => scrollTo('about')}
                className="bg-transparent border-0 cursor-pointer text-inherit hover:text-[#08122A] transition-colors py-2 px-3 text-[13.5px] font-medium"
              >
                About
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => scrollTo('programs')}
                className="bg-transparent border-0 cursor-pointer text-inherit hover:text-[#08122A] transition-colors py-2 px-3 text-[13.5px] font-medium"
              >
                Programs
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => scrollTo('age-checker')}
                className="bg-transparent border-0 cursor-pointer text-inherit hover:text-[#08122A] transition-colors py-2 px-3 text-[13.5px] font-medium"
              >
                Eligibility
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => scrollTo('mentor')}
                className="bg-transparent border-0 cursor-pointer text-inherit hover:text-[#08122A] transition-colors py-2 px-3 text-[13.5px] font-medium"
              >
                The Mentor
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={onOpenPracticeRoom}
                className="bg-transparent border-0 cursor-pointer text-inherit hover:text-[#08122A] transition-colors py-2 px-3 text-[13.5px] font-medium flex items-center gap-1.5"
              >
                <span>Practice Tests</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#C9A961] text-[#08122A] uppercase">
                  SSB OIR
                </span>
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => scrollTo('results')}
                className="bg-transparent border-0 cursor-pointer text-inherit hover:text-[#08122A] transition-colors py-2 px-3 text-[13.5px] font-medium"
              >
                Results
              </button>
            </li>
          </ul>
        </nav>

        {/* Actions & Mobile Trigger */}
        <div className="nav-actions flex items-center gap-2.5">
          {/* Practice Room Button (Always visible) */}
          <button
            type="button"
            onClick={onOpenPracticeRoom}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold border border-[#0A1428]/20 bg-white hover:bg-[#FAF6EE] text-[#0A1428] transition-colors shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>TEST ROOM</span>
          </button>

          {/* Cadet Sign In / Profile dropdown */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#08122A] text-white text-xs font-mono border border-[#C9A961]/40 hover:bg-[#0C1D3D] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="max-w-[100px] truncate font-medium">
                  {user.fullName || user.email?.split('@')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-white/60" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#0A1428]/15 p-2 z-50 text-xs font-sans">
                  <div className="px-3 py-2 border-b border-[#0A1428]/10">
                    <span className="text-[10px] font-mono text-[#5C6577] uppercase block">Cadet Dossier</span>
                    <strong className="text-[#0A1428] block truncate">{user.fullName || user.email}</strong>
                    <span className="text-[11px] font-mono text-[#C9A961] block mt-0.5">{user.targetExam || 'NDA / CDS'}</span>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenPracticeRoom();
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-[#FAF6EE] text-[#0A1428] flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-[#C9A961]" />
                      <span>Cadet Practice Room</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-red-50 text-red-700 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold bg-[#FAF6EE] border border-[#0A1428]/15 hover:bg-white text-[#0A1428] transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>CADET LOGIN</span>
            </button>
          )}

          {/* Book a Briefing CTA */}
          <button 
            type="button"
            onClick={() => onOpenBriefing('Nav Briefing CTA')}
            className="btn btn-navy text-xs sm:text-sm py-2 px-3 sm:px-4"
          >
            <span>Book Briefing</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button 
            type="button"
            className={`nav-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Toggle menu" 
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-[#FAF6EE] border-b border-[#0A1428]/15 px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 font-sans text-sm font-medium">
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-2 border-b border-[#0A1428]/08 text-[#0A1428] hover:text-[#5A7048]"
            >
              01 — About the Academy
            </button>
            <button
              onClick={() => scrollTo('programs')}
              className="text-left py-2 border-b border-[#0A1428]/08 text-[#0A1428] hover:text-[#5A7048]"
            >
              02 — Officer Programs
            </button>
            <button
              onClick={() => scrollTo('age-checker')}
              className="text-left py-2 border-b border-[#0A1428]/08 text-[#0A1428] hover:text-[#5A7048]"
            >
              03 — Defense Eligibility Engine
            </button>
            <button
              onClick={() => scrollTo('mentor')}
              className="text-left py-2 border-b border-[#0A1428]/08 text-[#0A1428] hover:text-[#5A7048]"
            >
              04 — The Chief Mentor (Ex-Navy)
            </button>
            <button
              onClick={() => {
                closeMenu();
                onOpenPracticeRoom();
              }}
              className="text-left py-2 border-b border-[#0A1428]/08 text-[#08122A] font-bold flex items-center justify-between"
            >
              <span>05 — Cadet Practice Tests (OIR & PPDT)</span>
              <span className="text-[10px] font-mono bg-[#C9A961] text-[#08122A] px-1.5 py-0.5 rounded">NEW</span>
            </button>
            <button
              onClick={() => scrollTo('results')}
              className="text-left py-2 border-b border-[#0A1428]/08 text-[#0A1428] hover:text-[#5A7048]"
            >
              06 — Cadet Results & Reviews
            </button>
            <button
              onClick={() => scrollTo('journal')}
              className="text-left py-2 border-b border-[#0A1428]/08 text-[#0A1428] hover:text-[#5A7048]"
            >
              07 — Defense Journal & Guides
            </button>
          </nav>

          <div className="pt-4 flex flex-col gap-2.5">
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  closeMenu();
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-lg bg-[#08122A] text-white text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                CADET SIGN IN / REGISTER
              </button>
            ) : (
              <div className="bg-white p-3 rounded-lg border border-[#0A1428]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#5C6577] uppercase block">Logged In Cadet</span>
                  <span className="font-bold text-xs text-[#0A1428]">{user.fullName || user.email}</span>
                </div>
                <button
                  onClick={() => {
                    closeMenu();
                    signOut();
                  }}
                  className="text-xs font-mono text-red-600 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            )}

            <button
              onClick={() => {
                closeMenu();
                onOpenBriefing('Mobile Nav Drawer');
              }}
              className="btn btn-navy text-xs text-center justify-center py-2.5"
            >
              Book Officer Briefing
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
