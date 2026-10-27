import React, { useState, useEffect } from 'react';

export default function CounselingModal({ 
  isOpen, 
  onClose, 
  initialCourse = 'NDA Coaching', 
  calculatorData = null 
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(initialCourse || 'NDA Coaching');
  const [education, setEducation] = useState('12th Appearing/Pass');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialCourse) {
      setCourse(initialCourse);
    }
    if (calculatorData) {
      if (calculatorData.education) setEducation(calculatorData.education);
      if (calculatorData.eligibleList) {
        setMessage(`Candidate Age: ${calculatorData.age}. Eligible Exams: ${calculatorData.eligibleList}. Interested in customized batch plan.`);
      }
    }
  }, [initialCourse, calculatorData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);

    const textMsg = encodeURIComponent(
      `*New Academy Admission Inquiry - SODA*\n` +
      `• *Name:* ${name}\n` +
      `• *Phone:* ${phone}\n` +
      `• *Course:* ${course}\n` +
      `• *Education:* ${education}\n` +
      (message ? `• *Details:* ${message}\n` : '') +
      `• *Source:* SODA Officer Portal`
    );

    const waUrl = `https://wa.me/918433247664?text=${textMsg}`;

    // Optional background sync with Google Apps Script
    try {
      fetch('https://script.google.com/macros/s/AKfycbxWlmLtBpOaLbuf0t6j4YXf_bfaRCn9xaAb_FcBVh2zT1l_InA-wMbw66tv2dq0w8V0dg/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          course,
          education,
          message,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {});
    } catch {}

    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="modal-sheet max-w-lg overflow-hidden flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#08122A] text-[#F4EFE6] relative border-b border-[#C9A961]/25">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded border border-[#F4EFE6]/20 grid place-items-center text-sm text-[#8B94A2] hover:text-[#FAF6EE] hover:bg-[#F4EFE6]/10 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-widest text-[#C9A961] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A7048] animate-pulse"></span>
            Direct Academy Admissions Desk
          </div>
          
          <h3 className="font-sans font-semibold text-2xl tracking-tight text-[#FAF6EE]">
            Book Free Officer Counseling
          </h3>
          <p className="text-[#8B94A2] text-xs sm:text-sm mt-1 leading-snug">
            Speak directly with Lt. Arjit Mohan Bharadwaj's guidance team in Gwalior.
          </p>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4 bg-[#FAF6EE]">
            <div className="w-14 h-14 rounded-full bg-[#5A7048]/15 text-[#5A7048] mx-auto grid place-items-center text-2xl font-bold">
              ✓
            </div>
            <h4 className="font-sans font-semibold text-xl text-[#0A1428]">
              Inquiry Dispatched Successfully!
            </h4>
            <p className="text-[#5C6577] text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              We have forwarded your details to our senior admissions counselor. You will receive a call within a few hours to map out your upcoming exam plan.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-navy text-xs px-6 py-2.5"
              >
                Close &amp; Return to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-[#FAF6EE]">
            
            {/* Candidate Name */}
            <div className="field-clean">
              <label htmlFor="modal-name">Candidate's Full Name *</label>
              <input
                id="modal-name"
                type="text"
                required
                placeholder="e.g. Vikramaditya Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="field-clean">
              <label htmlFor="modal-phone">WhatsApp / Calling Number *</label>
              <input
                id="modal-phone"
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <span className="font-mono text-[9.5px] text-[#5C6577] mt-0.5">
                Enter 10-digit mobile number for WhatsApp batch schedule.
              </span>
            </div>

            {/* Course & Education */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="field-clean">
                <label htmlFor="modal-course">Target Program</label>
                <select
                  id="modal-course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="NDA Coaching">NDA Coaching (12th)</option>
                  <option value="CDS Coaching">CDS Coaching (Graduates)</option>
                  <option value="AFCAT Coaching">AFCAT Coaching (Air Force)</option>
                  <option value="CAPF (AC) Coaching">CAPF (Assistant Commandant)</option>
                  <option value="SSB Interview Program">SSB Interview Mentorship</option>
                  <option value="Foundation Course">Foundation Course (11th &amp; 12th)</option>
                </select>
              </div>

              <div className="field-clean">
                <label htmlFor="modal-edu">Current Education</label>
                <select
                  id="modal-edu"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                >
                  <option value="10th Pass">10th Pass</option>
                  <option value="11th / 12th Appearing">11th / 12th Appearing</option>
                  <option value="12th Pass">12th Pass</option>
                  <option value="College Graduate / Final Year">College Graduate / Final Year</option>
                </select>
              </div>
            </div>

            {/* Specific Questions */}
            <div className="field-clean">
              <label htmlFor="modal-msg">Questions / Target Attempt Year</label>
              <textarea
                id="modal-msg"
                rows="2"
                placeholder="Ask about hostel facility, batch timings, fee concessions, or SSB batches..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="font-sans text-xs bg-[#F4EFE6] border border-[#0A1428]/15 rounded p-2.5 outline-none focus:border-[#C9A961]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gold w-full text-xs sm:text-sm py-3 justify-center"
              >
                {submitting ? (
                  <span>Connecting with Academy...</span>
                ) : (
                  <>
                    <span>Submit &amp; Connect on WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-[#5C6577] mt-2.5">
                <span className="text-[#5A7048]">🔒</span>
                <span>Zero spam. Your information is 100% confidential.</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
