import React from 'react';

export default function FooterEditorial({ onOpenLegal, onViewProgram }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="wrap">

        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top'); }} className="logo">
              <span className="logo-mark" aria-hidden="true">
                <img
                  src="/logo.webp"
                  alt="SODA Crest"
                  className="w-full h-full object-contain p-0.5"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <svg className="hidden w-4 h-4 text-[#C9A961]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v18M4 9l8-6 8 6M8 21h8"/>
                </svg>
              </span>
              <span className="logo-text">
                <strong className="text-[#FAF6EE]">SABRE OFFICERS</strong>
                <span className="text-[#8B94A2]">Defense Academy</span>
              </span>
            </a>
            <p>
              Officer-grade preparation for the Indian Armed Forces (Army, Navy, Air Force) and CAPF. Mentored by a former Indian Navy officer in Gwalior, Madhya Pradesh.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h5>Programs</h5>
            <ul>
              <li><button type="button" onClick={() => scrollTo('programs')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">NDA Foundation (3 Yrs)</button></li>
              <li><button type="button" onClick={() => scrollTo('programs')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">NDA Crash Course</button></li>
              <li><button type="button" onClick={() => scrollTo('programs')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">CDS (IMA / INA / OTA)</button></li>
              <li><button type="button" onClick={() => scrollTo('programs')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">AFCAT (Flying &amp; Ground)</button></li>
              <li><button type="button" onClick={() => scrollTo('programs')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">CAPF (Asst. Commandant)</button></li>
              <li><button type="button" onClick={() => scrollTo('programs')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">SSB 5-Day Simulation</button></li>
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h5>Academy</h5>
            <ul>
              <li><button type="button" onClick={() => scrollTo('about')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">By The Numbers</button></li>
              <li><button type="button" onClick={() => scrollTo('age-checker')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">Eligibility Engine</button></li>
              <li><button type="button" onClick={() => scrollTo('mentor')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">Chief Mentor</button></li>
              <li><button type="button" onClick={() => scrollTo('results')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">Cadet Results</button></li>
              <li><button type="button" onClick={() => scrollTo('journal')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">Briefing Room</button></li>
              <li><button type="button" onClick={() => scrollTo('apply')} className="text-left bg-transparent border-0 cursor-pointer text-[#8B94A2] hover:text-[#FAF6EE]">Book a Briefing</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5>Contact Desk</h5>
            <ul>
              <li><a href="tel:+918433247664">+91 84332 47664</a></li>
              <li><a href="mailto:info@sodaedu.in">info@sodaedu.in</a></li>
              <li><span className="text-[#8B94A2]">Near Gole Ka Mandir, Gwalior, MP</span></li>
              <li><span className="text-[#8B94A2]">Mon–Sat · 08:30 – 19:30</span></li>
              <li className="pt-2">
                <a
                  href="https://wa.me/918433247664"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#25D366] hover:underline"
                >
                  WhatsApp Academy Desk →
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>© 2026 Sabre Officers Defense Academy. All rights reserved.</span>
          <span className="status">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A7048] inline-block animate-pulse"></span>
            Admissions Open — 2026 Batch
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="bg-transparent border-0 p-0 text-inherit cursor-pointer hover:text-[#FAF6EE]"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="bg-transparent border-0 p-0 text-inherit cursor-pointer hover:text-[#FAF6EE]"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('refund')}
              className="bg-transparent border-0 p-0 text-inherit cursor-pointer hover:text-[#FAF6EE]"
            >
              Batch Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
