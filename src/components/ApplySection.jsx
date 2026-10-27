import React, { useState } from 'react';

export default function ApplySection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: 'NDA Foundation',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide candidate name';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Please provide valid 10-digit phone';
    if (!formData.program) errs.program = 'Please select program';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Send WhatsApp notification
    const msg = encodeURIComponent(
      `Hello SODA Desk, I would like to request a Free Officer Briefing.\nCandidate: ${formData.name}\nPhone: ${formData.phone}\nProgram: ${formData.program}`
    );
    window.open(`https://wa.me/918433247664?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="section bg-[#F1F5F9] border-t border-[#E2E8F0]" id="apply">
      <div className="wrap cta-grid">

        {/* Head */}
        <div className="cta-head">
          <p className="eyebrow font-mono text-xs uppercase tracking-widest text-[#3F6212] font-semibold">
            07 — Direct Admissions Desk
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0A192F] tracking-tight leading-tight">
            Your commission starts with <span className="text-[#D97706]">one conversation.</span>
          </h2>
          <p className="font-sans text-base text-[#475569] mt-4 leading-relaxed">
            Talk to an experienced officer, not an admission agent. Complimentary 20-minute briefing session — in person at our Gwalior campus, or over direct telephone.
          </p>
          <ul className="cta-list mt-6 space-y-2.5 font-mono text-xs text-[#1E293B]">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3F6212]"></span>
              No consultation fee, no obligation
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3F6212]"></span>
              Honest assessment of academic &amp; SSB readiness
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3F6212]"></span>
              Response within 24 hours guaranteed
            </li>
          </ul>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="form bg-white p-8 border border-[#3F6212] rounded-2xl shadow-lg flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#ECFCCB] text-[#3F6212] grid place-items-center text-2xl font-bold">
              ✓
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-[#0A192F]">
              Briefing Request Dispatched
            </h3>
            <p className="text-sm text-[#475569] max-w-sm">
              Thank you, <strong className="text-[#0A192F]">{formData.name}</strong>. Our admissions officer will contact you within 24 hours.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/918433247664"
                target="_blank"
                rel="noreferrer"
                className="btn btn-navy text-xs py-2.5 px-6 font-semibold shadow-sm"
              >
                Chat on WhatsApp (+91 84332 47664)
              </a>
            </div>
          </div>
        ) : (
          <form className="form bg-white border border-[#CBD5E1] shadow-xl rounded-2xl p-6 sm:p-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="form-head col-span-2 flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-heading font-bold text-xl text-[#0A192F]">Request an Officer Briefing</h3>
              <span className="font-mono text-[10.5px] tracking-widest uppercase text-[#3F6212] bg-[#ECFCCB] px-2.5 py-1 rounded font-bold">
                Free · 20 Mins
              </span>
            </div>

            <div className="field">
              <label htmlFor="cta-name" className="font-mono text-xs uppercase tracking-wider text-[#475569] block mb-1 font-semibold">
                Candidate Name
              </label>
              <input
                id="cta-name"
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D97706]"
              />
              {errors.name && <span className="font-mono text-[10px] text-[#DC2626] mt-1 block">{errors.name}</span>}
            </div>

            <div className="field">
              <label htmlFor="cta-phone" className="font-mono text-xs uppercase tracking-wider text-[#475569] block mb-1 font-semibold">
                WhatsApp Phone
              </label>
              <input
                id="cta-phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3.5 py-2.5 text-sm text-[#0A192F] focus:outline-none focus:border-[#D97706]"
              />
              {errors.phone && <span className="font-mono text-[10px] text-[#DC2626] mt-1 block">{errors.phone}</span>}
            </div>

            <div className="field full col-span-2">
              <label htmlFor="cta-program" className="font-mono text-xs uppercase tracking-wider text-[#475569] block mb-1 font-semibold">
                Target Program
              </label>
              <select
                id="cta-program"
                name="program"
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                required
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3.5 py-2.5 text-sm font-medium text-[#0A192F] focus:outline-none focus:border-[#D97706]"
              >
                <option>NDA Foundation (After 10th)</option>
                <option>NDA Crash Course (After 12th)</option>
                <option>CDS Exam Coaching</option>
                <option>AFCAT Coaching</option>
                <option>CAPF (AC) Coaching</option>
                <option>SSB Interview Mastery (5-Day)</option>
                <option>Not sure — need guidance</option>
              </select>
            </div>

            <div className="col-span-2 pt-2">
              <button type="submit" className="btn btn-gold w-full justify-center font-semibold text-sm py-3.5 shadow-md">
                <span>Submit &amp; Connect with Officer Desk</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}
