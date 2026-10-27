import React, { useState, useId } from 'react';

export default function AgeCheckerEditorial({ onOpenBriefingWithEligible }) {
  const [dob, setDob] = useState('2004-08-15');
  const [education, setEducation] = useState('Graduate / Final Year');
  const [gender, setGender] = useState('Male');
  const [showIneligible, setShowIneligible] = useState(false);

  const dobId = useId();
  const genderId = useId();
  const educationId = useId();

  // Calculate Age in Years and Months
  const calculateAge = (dateString) => {
    if (!dateString) return null;
    const birthDate = new Date(dateString);
    if (isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalYearsDecimal = years + months / 12;
    return { years, months, totalYearsDecimal };
  };

  const ageData = calculateAge(dob);

  // Eligibility Evaluation Engine
  const evaluateEligibility = (examId, ageObj, edu) => {
    if (!ageObj) return { eligible: false, reason: 'Please enter a valid Date of Birth.', cutoff: '-' };
    const age = ageObj.totalYearsDecimal;

    switch (examId) {
      case 'cds':
        if (age >= 18.8 && age <= 25 && edu === 'Graduate / Final Year') {
          const yearsLeft = (25 - age).toFixed(1);
          return {
            eligible: true,
            badge: 'Army · Navy · Air Force',
            branches: 'IMA (Army) · INA (Navy) · AFA (Air Force) · OTA',
            cutoff: '19 to 25 Years',
            yearsLeft,
            summary: `~${yearsLeft} years attempt window remaining. Direct entry to military academies.`
          };
        }
        return {
          eligible: false,
          cutoff: '19 to 25 Years',
          reason: edu !== 'Graduate / Final Year' ? 'Requires Final Year or Degree' : age > 25 ? 'Age limit (25 yrs) reached' : 'Minimum age is 19 years'
        };

      case 'afcat':
        if (age >= 19.8 && age <= 26 && edu === 'Graduate / Final Year') {
          const yearsLeft = (26 - age).toFixed(1);
          const wing = age <= 24 ? 'Flying Branch & Ground Duty' : 'Ground Duty (Tech / Non-Tech)';
          return {
            eligible: true,
            badge: 'Indian Air Force',
            branches: wing,
            cutoff: '20 to 26 Years',
            yearsLeft,
            summary: `~${yearsLeft} years window for computerized AFCAT + AFSB testing.`
          };
        }
        return {
          eligible: false,
          cutoff: '20 to 26 Years',
          reason: edu !== 'Graduate / Final Year' ? 'Requires Degree with min 60%' : age > 26 ? 'Age limit (26 yrs) reached' : 'Minimum age is 20 years'
        };

      case 'capf':
        if (age >= 19.8 && age <= 25 && edu === 'Graduate / Final Year') {
          const yearsLeft = (25 - age).toFixed(1);
          return {
            eligible: true,
            badge: 'Central Armed Police',
            branches: 'Assistant Commandant (BSF, CRPF, CISF, ITBP, SSB)',
            cutoff: '20 to 25 Years',
            yearsLeft,
            summary: `~${yearsLeft} years window for Gazetted Officer entry into paramilitary forces.`
          };
        }
        return {
          eligible: false,
          cutoff: '20 to 25 Years',
          reason: edu !== 'Graduate / Final Year' ? 'Requires University Degree' : age > 25 ? 'Age limit (25 yrs) reached' : 'Minimum age is 20 years'
        };

      case 'nda':
        if (age >= 16.2 && age <= 19.5 && (edu === '12th Appearing/Pass' || edu === '10th Pass')) {
          const yearsLeft = (19.5 - age).toFixed(1);
          return {
            eligible: true,
            badge: 'Tri-Service Cadet Entry',
            branches: 'National Defence Academy (Khadakwasla)',
            cutoff: '16.5 to 19.5 Years',
            yearsLeft,
            summary: `~${yearsLeft} years attempt window for NDA written + SSB.`
          };
        }
        return {
          eligible: false,
          cutoff: '16.5 to 19.5 Years',
          reason: age > 19.5 ? 'Age limit passed (Target graduate CDS/AFCAT entries instead)' : 'For 11th & 12th aspirants'
        };

      case 'foundation':
        if (age >= 14 && age <= 17 && (edu === '10th Pass' || edu === '12th Appearing/Pass')) {
          const yearsLeft = (17 - age).toFixed(1);
          return {
            eligible: true,
            badge: 'School Integrated',
            branches: '2-Year Board + NDA Foundation',
            cutoff: '14 to 17 Years',
            yearsLeft,
            summary: `~${yearsLeft} years remaining to build military foundation with schooling.`
          };
        }
        return {
          eligible: false,
          cutoff: '14 to 17 Years',
          reason: 'For Class 10th & 11th students only'
        };

      default:
        return { eligible: false, cutoff: '-', reason: 'Evaluation required' };
    }
  };

  const allExams = [
    { id: 'cds', shortName: 'CDS', fullName: 'Combined Defence Services (UPSC)' },
    { id: 'afcat', shortName: 'AFCAT', fullName: 'Air Force Common Admission Test (IAF)' },
    { id: 'capf', shortName: 'CAPF (AC)', fullName: 'Central Armed Police Forces (UPSC)' },
    { id: 'nda', shortName: 'NDA', fullName: 'National Defence Academy (UPSC)' },
    { id: 'foundation', shortName: 'Foundation', fullName: 'Integrated 11th/12th + NDA' },
  ];

  const results = allExams.map((e) => ({
    ...e,
    ...evaluateEligibility(e.id, ageData, education),
  }));

  const eligibleExams = results.filter((r) => r.eligible);
  const ineligibleExams = results.filter((r) => !r.eligible);
  const eligibleNames = eligibleExams.map((r) => r.shortName).join(', ');

  return (
    <section className="section" id="age-checker">
      <div className="wrap">
        
        {/* Head */}
        <div className="head">
          <p className="eyebrow">03 — Eligibility Engine</p>
          <h2>Check your defense <em>exam window.</em></h2>
          <p>
            UPSC cutoffs are calculated to the exact day. Enter your birth date and education stage to instantly see which officer exams you can attempt.
          </p>
        </div>

        {/* Clean 2-Column Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Simple Inputs Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FAF6EE] border border-[#0A1428]/12 p-6 sm:p-7 rounded-xl shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#0A1428]/10 font-mono text-xs">
              <span className="uppercase tracking-widest text-[#0A1428] font-semibold">
                Your Details
              </span>
              <span className="text-[10px] tracking-wider text-[#5A7048] bg-[#5A7048]/10 border border-[#5A7048]/30 px-2 py-0.5 rounded font-medium">
                Official UPSC Rules
              </span>
            </div>

            {/* Date of Birth */}
            <div className="field-clean">
              <label htmlFor={dobId} className="font-medium text-xs text-[#0A1428]">
                1. Date of Birth
              </label>
              <input
                id={dobId}
                type="date"
                value={dob}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-[#F4EFE6] border border-[#0A1428]/15 rounded-md px-3 py-2.5 text-sm font-sans text-[#0A1428] focus:outline-none focus:border-[#C9A961]"
              />
            </div>

            {/* Education Qualification */}
            <div className="field-clean">
              <label htmlFor={educationId} className="font-medium text-xs text-[#0A1428]">
                2. Academic Qualification
              </label>
              <select
                id={educationId}
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full bg-[#F4EFE6] border border-[#0A1428]/15 rounded-md px-3 py-2.5 text-sm font-sans text-[#0A1428] focus:outline-none focus:border-[#C9A961]"
              >
                <option value="Graduate / Final Year">College Graduate / Final Year Student</option>
                <option value="12th Appearing/Pass">Class 12th (Appearing or Passed)</option>
                <option value="10th Pass">Class 10th Passed (Entering 11th)</option>
              </select>
            </div>

            {/* Gender Toggle */}
            <div className="field-clean">
              <label htmlFor={genderId} className="font-medium text-xs text-[#0A1428]">
                3. Gender (All Services Open for Female Cadets)
              </label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {['Male', 'Female'].map((gen) => (
                  <button
                    key={gen}
                    type="button"
                    onClick={() => setGender(gen)}
                    className={`py-2 px-3 font-sans text-xs font-medium rounded border transition-all ${
                      gender === gen
                        ? 'bg-[#0A1428] text-[#F4EFE6] border-[#0A1428] shadow-sm'
                        : 'bg-[#F4EFE6] text-[#5C6577] border-[#0A1428]/15 hover:text-[#0A1428]'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Age Box */}
            {ageData && (
              <div className="p-3.5 bg-[#EAE3D6]/70 border border-[#0A1428]/10 rounded-lg flex items-center justify-between font-mono text-xs">
                <span className="text-[#5C6577]">Your Exact Age Today:</span>
                <span className="text-[#0A1428] font-bold text-sm">
                  {ageData.years} Yrs, {ageData.months} Mos
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Clean, Empowering Result View (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Result Summary Banner */}
            <div className="p-4 sm:p-5 bg-[#FAF6EE] border border-[#5A7048]/30 rounded-xl flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5A7048] animate-pulse"></span>
                  <strong className="font-sans font-semibold text-lg sm:text-xl text-[#0A1428]">
                    {eligibleExams.length > 0 
                      ? `${eligibleExams.length} Commission Entries Available For You` 
                      : 'Consult Mentor for Specialized Entries'}
                  </strong>
                </div>
                <p className="text-xs sm:text-[13px] text-[#5C6577] mt-1">
                  {eligibleExams.length > 0 
                    ? `Based on your age (${ageData?.years}y ${ageData?.months}m) & qualification, you are actively eligible for:` 
                    : 'Standard entry brackets have passed, but Technical & Territorial Army entries may apply.'}
                </p>
              </div>

              {eligibleExams.length > 0 && (
                <span className="font-mono text-xs uppercase tracking-wider text-[#5A7048] font-semibold bg-[#5A7048]/12 border border-[#5A7048]/30 px-3 py-1 rounded-full shrink-0">
                  ✓ Eligible
                </span>
              )}
            </div>

            {/* Active / Qualified Cards */}
            <div className="space-y-3">
              {eligibleExams.map((r) => (
                <div
                  key={r.id}
                  className="p-4 sm:p-5 bg-[#FAF6EE] border-l-4 border-l-[#5A7048] border border-[#0A1428]/10 rounded-lg shadow-sm hover:border-[#0A1428]/25 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-sans font-semibold text-base sm:text-lg text-[#0A1428]">
                          {r.shortName}
                        </h4>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A7048] font-medium bg-[#5A7048]/10 px-2 py-0.5 rounded">
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C6577] font-medium mt-0.5">
                        {r.branches}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-semibold text-[#0A1428] block">
                        ~{r.yearsLeft} Yrs Window
                      </span>
                      <span className="font-mono text-[10px] text-[#5C6577] block">
                        Cutoff: {r.cutoff}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#0A1428]/80 mt-2.5 pt-2.5 border-t border-[#0A1428]/06 flex items-center gap-1.5">
                    <span className="text-[#5A7048] font-bold">✓</span>
                    <span>{r.summary}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Ineligible / Past Entries (Hidden behind a clean toggle so it doesn't clutter) */}
            {ineligibleExams.length > 0 && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowIneligible(!showIneligible)}
                  className="font-mono text-xs text-[#5C6577] hover:text-[#0A1428] flex items-center gap-1.5 transition-colors bg-transparent border-0 cursor-pointer py-1"
                >
                  <span>{showIneligible ? '▾ Hide' : '▸ View'} other entries ({ineligibleExams.map(e => e.shortName).join(', ')} — Not applicable for current stage)</span>
                </button>

                {showIneligible && (
                  <div className="mt-3 p-3.5 bg-[#F4EFE6] border border-[#0A1428]/08 rounded-lg space-y-2 text-xs text-[#5C6577] animate-in fade-in duration-200">
                    {ineligibleExams.map((r) => (
                      <div key={r.id} className="flex items-center justify-between py-1 border-b border-[#0A1428]/05 last:border-0">
                        <span className="font-medium text-[#0A1428]/70">
                          {r.shortName} ({r.fullName})
                        </span>
                        <span className="font-mono text-[10px] text-[#8B94A2]">
                          {r.reason}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Action CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenBriefingWithEligible({
                  age: ageData ? `${ageData.years} Years, ${ageData.months} Months` : 'Checked',
                  eligibleList: eligibleNames || 'Custom Evaluation',
                  education,
                  dob,
                })}
                className="btn btn-navy w-full text-xs sm:text-sm justify-center py-3.5 shadow-sm"
              >
                <span>Get Preparation Roadmap for {eligibleNames || 'Your Profile'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
