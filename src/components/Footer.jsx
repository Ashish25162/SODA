import React from 'react';
import { 
  Shield, 
  MapPin, 
  Phone, 
  Smartphone, 
  MessageCircle, 
  Send, 
  ArrowRight,
  Clock
} from 'lucide-react';

export default function Footer({ onOpenCounseling, onOpenLegal, onSelectCourse }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-slate-800">
      
      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand, Mission & App (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 p-1 flex items-center justify-center shrink-0">
                <img
                  src="/logo.webp"
                  alt="SODA Defense Academy Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-amber-400">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white tracking-tight">
                  Sabre Officers Defense Academy
                </h3>
                <p className="text-amber-400 text-xs font-semibold">
                  Mentored by Ex-Indian Navy Officer
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              India's Trusted SSB Interview & Defense Training Academy in Gwalior, Madhya Pradesh. We prepare serious aspirants for leadership and officer commissions in NDA, CDS, AFCAT, and CAPF.
            </p>

            {/* Google Play Download Button */}
            <div className="pt-1">
              <div className="text-xs font-semibold text-slate-400 mb-2">
                Download Official Learning App:
              </div>
              <a
                href="https://play.google.com/store/apps/details?id=com.ajmyig.nfiuah"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-slate-800/90 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-all shadow-sm"
              >
                <Smartphone className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider leading-none">
                    GET IT ON
                  </div>
                  <div className="text-xs font-bold font-heading text-white leading-tight mt-0.5">
                    Google Play Store
                  </div>
                </div>
              </a>
            </div>

            {/* Social Icons (Direct Clean SVGs) */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://www.instagram.com/sabreacademy.ssb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-amber-400 border border-slate-700 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@sabreacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-red-400 border border-slate-700 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9"/>
                </svg>
              </a>
              <a
                href="https://t.me/sabreofficersdefenceacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-blue-400 border border-slate-700 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Column 2: Quick Navigation Links (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ssb-bento')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Mentorship
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('courses')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Our Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ssb-bento')}
                  className="hover:text-amber-400 transition-colors"
                >
                  5-Day SSB Ground
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('age-calculator')}
                  className="hover:text-amber-400 transition-colors text-amber-300 font-medium"
                >
                  Age & Eligibility Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('insights')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Defense Insights & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('reviews')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Verified Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Defense Courses (2.5 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Our Officer Courses
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {[
                { name: 'NDA Coaching (12th)', id: 'nda' },
                { name: 'CDS Coaching (Graduates)', id: 'cds' },
                { name: 'AFCAT Coaching (Air Force)', id: 'afcat' },
                { name: 'CAPF (AC) Coaching', id: 'capf' },
                { name: 'SSB Interview Mentorship', id: 'ssb' },
                { name: 'Foundation Course (11th & 12th)', id: 'foundation' },
              ].map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      if (onSelectCourse) onSelectCourse(c.id);
                      scrollTo('courses');
                    }}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{c.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Academy Location (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Academy & Contact
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="leading-snug">
                  SODA Building, MLB Colony, Padav, Gwalior – 474002 (Near Miss Hills School), Madhya Pradesh
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <a
                  href="tel:+918433247664"
                  className="flex items-center gap-2 hover:text-amber-400 text-slate-300 font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>+91 84332 47664</span>
                </a>
                <a
                  href="tel:+919258247664"
                  className="flex items-center gap-2 hover:text-amber-400 text-slate-300 font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>+91 92582 47664</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Counseling Hours: 8:00 AM – 7:30 PM (Daily)</span>
              </div>

              {/* Action Buttons: Call Now & WhatsApp */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href="tel:+918433247664"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-2 px-3 rounded-lg border border-slate-700 text-center transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/918433247664?text=Hi%20SODA,%20I%20would%20like%20to%20inquire%20about%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs py-2 px-3 rounded-lg text-center transition-colors flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-slate-800/80 py-6 px-4 bg-slate-950/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © 2026 Sabre Officers Defense Academy | All Rights Reserved.
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-amber-400 transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('refund')}
              className="hover:text-amber-400 transition-colors"
            >
              Refund Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('disclaimer')}
              className="hover:text-amber-400 transition-colors"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
