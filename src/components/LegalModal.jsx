import React from 'react';

export default function LegalModal({ policyType, onClose }) {
  if (!policyType) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      updated: "October 2026",
      body: `
        <p>Sabre Officers Defense Academy (SODA) respects your privacy and is committed to protecting your personal information. This Privacy Policy outlines our practices regarding data collection and usage.</p>
        
        <h4>1. Information We Collect</h4>
        <p>We collect personal details such as candidate name, mobile phone number, academic credentials, and exam interests when submitted via our counseling forms, WhatsApp inquiries, or phone communications.</p>

        <h4>2. Use of Information</h4>
        <p>Information gathered is utilized solely for:</p>
        <ul>
          <li>Delivering batch schedules, counseling sessions, and academic course updates.</li>
          <li>Processing academy registrations and candidate dossier evaluations.</li>
          <li>Internal performance records and student verification.</li>
        </ul>

        <h4>3. Data Security</h4>
        <p>We implement stringent physical and electronic safeguards to ensure student information remains confidential. We never sell, lease, or distribute student contact databases to third-party marketing companies.</p>
      `
    },
    terms: {
      title: "Terms and Conditions",
      updated: "October 2026",
      body: `
        <p>By accessing the Sabre Officers Defense Academy website or enrolling in any of our coaching or SSB programs, you agree to comply with the following institutional terms:</p>

        <h4>1. Admission and Enrollment</h4>
        <p>Admission into specialized defense batches (NDA, CDS, AFCAT, CAPF, Foundation) and SSB interview programs is subject to meeting eligibility benchmarks and batch capacity.</p>

        <h4>2. Code of Conduct &amp; Discipline</h4>
        <p>As an academy preparing candidates for the Indian Armed Forces, high discipline, punctuality, and respect toward instructors, fellow aspirants, and academy property are mandatory at all times on academy premises and GTO grounds.</p>

        <h4>3. Curriculum &amp; Timetable</h4>
        <p>The academy management reserves the right to modify class timings, faculty allocations, or test schedules to optimize learning outcomes in response to official UPSC notifications.</p>
      `
    },
    refund: {
      title: "Batch & Fee Policy",
      updated: "October 2026",
      body: `
        <p>Sabre Officers Defense Academy maintains transparent fee policies across all courses:</p>

        <h4>1. Seat Reservation &amp; Registration Fee</h4>
        <p>Registration fees paid to reserve seats in forthcoming batches (NDA, CDS, AFCAT, SSB) are processed toward study material kits, uniform provisions, and mock test setup.</p>

        <h4>2. Course Transfer Requests</h4>
        <p>Candidates who need to postpone their batch due to university exams or medical reasons may submit a written batch transfer request to the academy registrar without penalty.</p>

        <h4>3. Institutional Contact</h4>
        <p>For any billing or registration queries, contact our administrative office at info@sodaedu.in or call +91 84332 47664.</p>
      `
    }
  };

  const current = content[policyType] || content.privacy;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="modal-sheet max-w-2xl overflow-hidden flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-[#08122A] text-[#F4EFE6] flex items-center justify-between border-b border-[#C9A961]/25">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A961] block mb-1">
              Institutional Compliance · Last Updated: {current.updated}
            </span>
            <h3 className="font-sans font-semibold text-2xl tracking-tight text-[#FAF6EE]">
              {current.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded border border-[#F4EFE6]/20 grid place-items-center text-sm text-[#8B94A2] hover:text-[#FAF6EE] hover:bg-[#F4EFE6]/10 transition-colors shrink-0"
            aria-label="Close legal modal"
          >
            ✕
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh] bg-[#FAF6EE] font-sans text-sm leading-relaxed text-[#0A1428]/85 space-y-4">
          <div dangerouslySetInnerHTML={{ __html: current.body }} />
        </div>

        <div className="p-4 bg-[#FAF6EE] border-t border-[#0A1428]/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-navy text-xs py-2 px-5"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
