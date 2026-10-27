import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Shield, Lock, User, ArrowUpRight, ExternalLink } from 'lucide-react';
import { getStudentUser, StudentUser, clearStudentUser } from '../lib/storage';
import { StudentModal } from './StudentModal';

export const SiteHeader: React.FC = () => {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [cadet, setCadet] = useState<StudentUser | null>(null);

  useEffect(() => {
    setCadet(getStudentUser());
  }, [location, isAuthOpen]);

  const navLinks = [
    { label: 'Cadet Dashboard', href: '/', badge: 'HQ' },
    { label: 'CSSS Battery', href: '/csss', badge: '70Q' },
    { label: 'OPAM Matrix', href: '/opam', badge: '120Q' },
    { label: 'Written Drills', href: '/tests', badge: 'Practice' },
    { label: 'Signal Briefs', href: '/briefs', badge: 'Daily' },
    { label: 'SOP Manuals', href: '/guides', badge: 'Field' },
    { label: 'Chief Mentor', href: '/founder' },
  ];

  return (
    <>
      {/* Top Gazette Telemetry Bar */}
      <div className="bg-navy-2 text-cream-1 py-1.5 px-4 text-[11px] font-mono tracking-wider border-b border-tactical-dark flex justify-between items-center">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-2 rounded-full bg-olive animate-pulse"></span>
            <span className="text-gold uppercase font-bold">
              SODA CADET SCREENING CHAMBER // STAGE 1 ACTIVE
            </span>
            <span className="hidden md:inline text-cream-3">
              · GWALIOR HQ // 26°13'N 78°10'E
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center space-x-1 text-gold hover:text-gold-2 transition-colors"
            >
              <span>sodaedu.in</span>
              <ExternalLink size={11} />
            </a>
            {cadet ? (
              <div className="flex items-center space-x-2 text-cream-2">
                <span className="text-olive">●</span>
                <span>{cadet.studentCode} ({cadet.fullName})</span>
                <button
                  onClick={() => {
                    clearStudentUser();
                    setCadet(null);
                  }}
                  className="text-gold hover:underline ml-2"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hover:text-gold transition-colors flex items-center space-x-1"
              >
                <User size={12} />
                <span>Cadet Sign-In</span>
              </button>
            )}
            <Link
              href="/admin/dashboard"
              className="text-cream-4 hover:text-gold transition-colors flex items-center space-x-1"
            >
              <Lock size={11} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-cream-1/95 backdrop-blur-md border-b border-tactical transition-all">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand Lockup */}
          <Link href="/" className="group flex items-center space-x-3.5 focus:outline-none">
            <div className="w-11 h-11 bg-navy-1 border border-tactical-gold rounded flex items-center justify-center text-gold shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-sans text-2xl font-bold tracking-tight">S</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-ink group-hover:text-navy-3 transition-colors">
                  SABRE
                </span>
                <span className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-cream-3 text-ink-2 border border-tactical">
                  SODA
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-ink-3 uppercase">
                Officers Defense Academy · Gwalior
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 text-xs font-mono font-medium rounded tracking-wide transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-navy-1 text-gold font-semibold shadow-sm'
                      : 'text-ink-2 hover:text-ink hover:bg-cream-3/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                        isActive
                          ? 'bg-gold/20 text-gold'
                          : 'bg-cream-4 text-ink-3'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-ink-2 hover:text-ink flex items-center space-x-1 px-3 py-2 rounded border border-tactical"
            >
              <span>Main Academy</span>
              <ExternalLink size={12} className="text-gold" />
            </a>
            {cadet ? (
              <Link
                href="/"
                className="inline-flex items-center space-x-2 bg-navy-1 hover:bg-navy-3 text-gold text-xs font-mono font-bold tracking-wider uppercase px-4 py-2.5 rounded transition-all shadow-sm border border-tactical-gold"
              >
                <User size={13} />
                <span>Dashboard ({cadet.studentCode})</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-2 text-navy-1 text-xs font-mono font-bold tracking-wider uppercase px-4 py-2.5 rounded transition-all shadow-sm hover:shadow-gold-glow"
              >
                <User size={13} />
                <span>Cadet Sign In / Register</span>
                <ArrowUpRight size={14} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-ink hover:text-navy-3 focus:outline-none rounded border border-tactical"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileOpen && (
          <div className="lg:hidden bg-cream-2 border-b border-tactical-2 px-6 py-6 animate-fade-in shadow-dossier">
            <div className="space-y-2 mb-6">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded text-sm font-mono tracking-wide ${
                    location === item.href
                      ? 'bg-navy-1 text-gold font-bold'
                      : 'text-ink-2 hover:bg-cream-3'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-cream-4 text-ink-3 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-tactical space-y-3">
              <Link
                href="/opam"
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-gold text-navy-1 font-mono font-bold uppercase tracking-wider py-3 rounded"
              >
                <span>Take OPAM Assessment</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/csss"
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-navy-1 text-cream-1 font-mono font-bold uppercase tracking-wider py-3 rounded"
              >
                <span>Take CSSS Battery</span>
                <ArrowUpRight size={16} />
              </Link>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center space-x-2 text-xs font-mono text-ink-2 py-2"
              >
                <span>Visit Main Portal (sodaedu.in)</span>
                <ExternalLink size={12} className="text-gold" />
              </a>
              <Link
                href="/admin/dashboard"
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center justify-center space-x-2 text-xs font-mono text-ink-3 py-2"
              >
                <Lock size={12} />
                <span>Admin Console Sign-in</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Student Login / Registration Modal */}
      <StudentModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => {
          setCadet(u);
          setIsAuthOpen(false);
        }}
      />
    </>
  );
};
