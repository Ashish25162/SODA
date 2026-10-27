import React from 'react';
import { Link } from 'wouter';
import { Shield, ArrowUpRight, Lock, ExternalLink, Award, MapPin, Phone, Mail } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-navy-1 text-cream-1 border-t border-tactical-dark pt-16 pb-12 naval-grid-pattern relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Institutional Integration & Advisory Banner */}
        <div className="mb-12 p-5 bg-navy-2/90 border border-tactical-dark rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2 bg-gold/15 text-gold rounded border border-gold/30 shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-gold uppercase">
                SABRE OFFICERS DEFENSE ACADEMY // SODA DIGITAL SCREENING WING
              </h4>
              <p className="text-xs text-cream-3 mt-1 leading-relaxed max-w-3xl">
                This testing platform is the dedicated diagnostic and screening wing of <strong className="text-cream-1">Sabre Officers Defense Academy (sodaedu.in)</strong>, Gwalior. Preparing aspirants for commissioned officer appointments in the Indian Army, Indian Navy, Indian Air Force, and Coast Guard through disciplined cognitive simulation and authentic 15 OLQ profiling.
              </p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-xs font-mono text-gold hover:text-gold-2 flex items-center space-x-1.5 px-3.5 py-2 border border-tactical-gold rounded bg-navy-1"
          >
            <span>Visit sodaedu.in</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Footer Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 border-b border-tactical-dark pb-12">
          {/* Col 1: Identity & Gwalior HQ */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-navy-2 border border-tactical-gold rounded flex items-center justify-center text-gold font-sans text-xl font-bold">
                S
              </div>
              <div>
                <span className="font-sans text-lg font-bold text-cream-1">SABRE OFFICERS</span>
                <p className="text-[10px] font-mono tracking-widest text-gold uppercase">
                  Defense Academy // SODA
                </p>
              </div>
            </div>
            <p className="text-xs text-cream-3 leading-relaxed">
              India's trusted defense institute for NDA, CDS, AFCAT, and SSB Interview guidance under retired & commissioned defense mentors.
            </p>
            <div className="pt-2 text-[11px] font-mono text-cream-3 space-y-1">
              <div className="flex items-start space-x-1.5">
                <MapPin size={13} className="text-gold shrink-0 mt-0.5" />
                <span>106, MLB Colony, Padav, Lashkar, Gwalior (MP) – 474002</span>
              </div>
              <div className="flex items-center space-x-1.5 pt-1">
                <Phone size={13} className="text-gold shrink-0" />
                <span>+91 90098 29888 / +91 84332 47664</span>
              </div>
            </div>
          </div>

          {/* Col 2: Testing Batteries */}
          <div>
            <h4 className="text-xs font-mono font-bold text-gold uppercase tracking-widest mb-4">
              Testing Chambers
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-3 font-mono">
              <li>
                <Link href="/csss" className="hover:text-gold transition-colors flex items-center justify-between">
                  <span>CSSS Cognitive Battery</span>
                  <span className="text-[10px] text-olive bg-navy-2 px-1 rounded">70Q</span>
                </Link>
              </li>
              <li>
                <Link href="/opam" className="hover:text-gold transition-colors flex items-center justify-between">
                  <span>OPAM Personality Matrix</span>
                  <span className="text-[10px] text-gold bg-navy-2 px-1 rounded">120Q</span>
                </Link>
              </li>
              <li>
                <Link href="/tests" className="hover:text-gold transition-colors flex items-center justify-between">
                  <span>Written Paper Drills</span>
                  <span className="text-[10px] text-cream-4">NDA/CDS</span>
                </Link>
              </li>
              <li>
                <Link href="/briefs" className="hover:text-gold transition-colors">
                  <span>Daily Signal & GD Briefs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academy Courses (sodaedu.in) */}
          <div>
            <h4 className="text-xs font-mono font-bold text-gold uppercase tracking-widest mb-4">
              SODA Academy Courses
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-3 font-mono">
              <li>
                <a
                  href="/#programs"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>NDA + Schooling (11th & 12th)</span>
                  <ExternalLink size={11} className="text-cream-4" />
                </a>
              </li>
              <li>
                <a
                  href="/#programs"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>CDS (IMA / OTA / INA / AFA)</span>
                  <ExternalLink size={11} className="text-cream-4" />
                </a>
              </li>
              <li>
                <a
                  href="/#programs"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>AFCAT Flying & Ground Duty</span>
                  <ExternalLink size={11} className="text-cream-4" />
                </a>
              </li>
              <li>
                <a
                  href="/#programs"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>Comprehensive SSB Interview Batch</span>
                  <ExternalLink size={11} className="text-cream-4" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Armed Forces & Admin */}
          <div>
            <h4 className="text-xs font-mono font-bold text-gold uppercase tracking-widest mb-4">
              Official Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-3 font-mono">
              <li>
                <a
                  href="https://joinindianarmy.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors flex items-center space-x-1.5"
                >
                  <span>Join Indian Army</span>
                  <ExternalLink size={11} className="text-cream-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://joinindiannavy.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors flex items-center space-x-1.5"
                >
                  <span>Join Indian Navy</span>
                  <ExternalLink size={11} className="text-cream-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://careerairforce.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors flex items-center space-x-1.5"
                >
                  <span>Join Indian Air Force</span>
                  <ExternalLink size={11} className="text-cream-4" />
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center space-x-1.5 text-cream-4 hover:text-gold"
                >
                  <Lock size={12} />
                  <span>Administrative Control Console</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-cream-4 space-y-3 sm:space-y-0">
          <div>
            <span>© 2026 Sabre Officers Defense Academy (SODA). Integrated with <a href="/" className="text-gold hover:underline">sodaedu.in</a>.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>GWL // 26°13'N 78°10'E</span>
            <span>·</span>
            <span>INSTITUTIONAL MILITARY EDITORIAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
