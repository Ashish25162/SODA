import React, { useState, useId } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Calendar, 
  User, 
  GraduationCap, 
  Sparkles,
  Award,
  Zap,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function AgeCalculatorSection({ onOpenCounselingWithEligible }) {
  // CRITICAL DEFAULT STATE FIX:
  // Candidate born on 15 Aug 2004 with Graduate/Final Year is ~22.2 yrs old
  // Immediately eligible for CDS (19-25), AFCAT (20-24/26), and CAPF (20-25)!
  const [dob, setDob] = useState('2004-08-15');
  const [education, setEducation] = useState('Graduate / Final Year');
  const [gender, setGender] = useState('Male');

  const dobId = useId();
  const genderId = useId();
  const educationId = useId();

  // Calculate Age in Years and Months as of today
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
  const evaluateEligibility = (examId, ageObj, edu, gen) => {
    if (!ageObj) return { eligible: false, message: 'Please enter a valid Date of Birth.', maxAge: 25 };
    const age = ageObj.totalYearsDecimal;

    switch (examId) {
      case 'foundation':
        if (age >= 14 && age <= 17 && (edu === '10th Pass' || edu === '12th Appearing/Pass')) {
          const yrsLeft = (17 - age).toFixed(1);
          return { eligible: true, maxAge: 17, yearsRemaining: yrsLeft, status: 'Eligible (Optimal Window)', message: `Ideal time for 2-year integrated Board + NDA prep. ~${yrsLeft} yrs remaining.` };
        }
        if (age < 14) return { eligible: false, maxAge: 17, status: 'Too Young', message: 'Eligible once you complete 14 years.' };
        return { eligible: false, maxAge: 17, status: 'Over Age', message: 'Target direct NDA or CDS entry instead.' };

      case 'nda':
        if (age >= 16.2 && age <= 19.5 && (edu === '12th Appearing/Pass' || edu === 'Graduate / Final Year')) {
          const yrsLeft = (19.5 - age).toFixed(1);
          return { eligible: true, maxAge: 19.5, yearsRemaining: yrsLeft, status: 'Eligible for Next UPSC NDA', message: `Prime bracket for upcoming NDA I & II exams. ~${yrsLeft} yrs window.` };
        }
        if (age < 16.2) return { eligible: false, maxAge: 19.5, status: 'Upcoming Candidate', message: `Start Foundation coaching now; eligible in ~${(16.5 - age).toFixed(1)} yrs.` };
        return { eligible: false, maxAge: 19.5, status: 'Age Bar Exceeded', message: 'Target CDS, AFCAT, and CAPF graduate entries.' };

      case 'cds':
        if (age >= 18.8 && age <= 25 && edu === 'Graduate / Final Year') {
          const yrsLeft = (25 - age).toFixed(1);
          return { eligible: true, maxAge: 25, yearsRemaining: yrsLeft, status: 'Eligible for CDS (IMA / OTA / INA)', message: `High opportunity window for commissioned entries. ~${yrsLeft} yrs remaining.` };
        }
        if (age < 18.8) return { eligible: false, maxAge: 25, status: 'Under Age for CDS', message: 'Eligible after entering final year of graduation (~19 yrs).' };
        if (edu !== 'Graduate / Final Year') return { eligible: false, maxAge: 25, status: 'Degree Required', message: 'Requires final year or completed degree.' };
        return { eligible: false, maxAge: 25, status: 'Age Bar Exceeded', message: 'Explore territorial army or direct state gazetted options.' };

      case 'afcat':
        if (age >= 19.8 && age <= 26 && edu === 'Graduate / Final Year') {
          const yrsLeft = (26 - age).toFixed(1);
          const wing = age <= 24 ? 'Flying & Ground Duty Branches' : 'Ground Duty (Technical & Non-Tech)';
          return { eligible: true, maxAge: 26, yearsRemaining: yrsLeft, status: `Eligible (${wing})`, message: `Full eligibility for AFCAT computerized written test. ~${yrsLeft} yrs remaining.` };
        }
        if (age < 19.8) return { eligible: false, maxAge: 26, status: 'Under Age for AFCAT', message: 'Minimum age is 20 years at course commencement.' };
        if (edu !== 'Graduate / Final Year') return { eligible: false, maxAge: 26, status: 'Degree Required', message: 'Requires graduation with minimum 60% marks.' };
        return { eligible: false, maxAge: 26, status: 'Over Age', message: 'Upper cutoff exceeded for Indian Air Force AFCAT.' };

      case 'capf':
        if (age >= 19.8 && age <= 25 && edu === 'Graduate / Final Year') {
          const yrsLeft = (25 - age).toFixed(1);
          return { eligible: true, maxAge: 25, yearsRemaining: yrsLeft, status: 'Eligible for CAPF (Assistant Commandant)', message: `Eligible for BSF, CRPF, CISF, ITBP, and SSB. ~${yrsLeft} yrs remaining.` };
        }
        if (age < 19.8) return { eligible: false, maxAge: 25, status: 'Under Age', message: 'Minimum age is 20 years on 1st August of exam year.' };
        if (edu !== 'Graduate / Final Year') return { eligible: false, maxAge: 25, status: 'Degree Required', message: 'Requires a recognized university degree.' };
        return { eligible: false, maxAge: 25, status: 'Age Bar Exceeded', message: 'Category relaxations (OBC +3, SC/ST +5) may apply.' };

      default:
        return { eligible: false, maxAge: 25, status: 'Check Details', message: 'Consult our counselor for custom evaluation.' };
    }
  };

  const exams = [
    { id: 'cds', name: 'CDS (Combined Defence Services)', bracket: '19 – 25 Yrs', branch: 'Army / Navy / Air Force' },
    { id: 'afcat', name: 'AFCAT (Air Force Common Admission)', bracket: '20 – 24/26 Yrs', branch: 'Indian Air Force' },
    { id: 'capf', name: 'CAPF (Assistant Commandant)', bracket: '20 – 25 Yrs', branch: 'Paramilitary Forces' },
    { id: 'nda', name: 'NDA (National Defence Academy)', bracket: '16.5 – 19.5 Yrs', branch: 'Tri-Service Cadet' },
    { id: 'foundation', name: 'Foundation (11th & 12th + Defence)', bracket: '14 – 17 Yrs', branch: 'Early Starter' },
  ];

  const results = exams.map(e => ({
    ...e,
    ...evaluateEligibility(e.id, ageData, education, gender)
  }));

  const eligibleExams = results.filter(r => r.eligible);
  const eligibleNames = eligibleExams.map(r => r.name);

  return (
    <section id="age-calculator" className="py-20 bg-command-console text-white border-y border-slate-800 relative overflow-hidden">
      
      {/* Background glowing tactical grid effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-lg">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Defense Command HUD</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Defense Age & Exam Eligibility Checker
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Never miss an attempt due to age cutoff confusion. Enter your birth date and education to instantly discover every defense exam you are eligible to appear for.
          </p>
        </div>

        {/* Calculator Widget Grid — Dark Command Console Layout */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Column (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-xl border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Candidate Parameters
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  UPSC Rules
                </span>
              </div>

              {/* Date of Birth Picker */}
              <div>
                <label htmlFor={dobId} className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  1. Date of Birth (DD-MM-YYYY)
                </label>
                <div className="relative">
                  <input
                    id={dobId}
                    type="date"
                    value={dob}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              {/* Education Stage Selector */}
              <div>
                <label htmlFor={educationId} className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  2. Current Education Stage
                </label>
                <div className="relative">
                  <select
                    id={educationId}
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Graduate / Final Year">Graduate or Final Year of College</option>
                    <option value="12th Appearing/Pass">Class 12th Appearing or Pass</option>
                    <option value="10th Pass">Class 10th Pass (Entering 11th)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Gender Selector */}
              <div>
                <label htmlFor={genderId} className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  3. Gender (Female Entries Open for All Services)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Male', 'Female'].map((gen) => (
                    <button
                      key={gen}
                      type="button"
                      onClick={() => setGender(gen)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        gender === gen
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{gen}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Age Readout Pill */}
              {ageData && (
                <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-200">Your Calculated Age:</span>
                  <span className="font-heading font-extrabold text-sm text-amber-300">
                    {ageData.years} Years, {ageData.months} Months
                  </span>
                </div>
              )}

            </div>

            {/* Results Output Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Real-Time Defense Eligibility Output
                  </h3>
                </div>
                {/* MATCH COUNTER (Mandatory) */}
                <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full self-start sm:self-auto flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  {eligibleExams.length} Active Defense Entries Matched
                </span>
              </div>

              {/* Results Cards List */}
              <div className="space-y-3">
                {results.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      item.eligible
                        ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                        : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                    }`}
                  >
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.eligible ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-500 shrink-0" />
                        )}
                        <span className={`font-heading font-bold text-sm ${item.eligible ? 'text-white' : 'text-slate-400'}`}>
                          {item.name}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {item.bracket}
                        </span>
                      </div>

                      <p className={`text-xs pl-7 ${item.eligible ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.message}
                      </p>

                      {/* Animated Progress Bar for Upper Age Limit (Mandatory requirement) */}
                      {item.eligible && ageData && (
                        <div className="pl-7 pt-1 max-w-md">
                          <div className="flex justify-between text-[10px] text-emerald-300 mb-1 font-medium">
                            <span>Window Remaining: {item.yearsRemaining} Years</span>
                            <span>Cutoff: {item.maxAge} Yrs</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${Math.min(100, Math.max(10, ((item.maxAge - ageData.totalYearsDecimal) / (item.maxAge - 16)) * 100))}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pl-7 sm:pl-0 shrink-0">
                      {item.eligible ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 shadow-md">
                          ELIGIBLE NOW
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button: Get Personalized Study Plan */}
              <div className="pt-3">
                <button
                  onClick={() => onOpenCounselingWithEligible({
                    age: ageData ? `${ageData.years} Years, ${ageData.months} Months` : 'Checked via Calculator',
                    eligibleList: eligibleNames.join(', ') || 'General Ineligibility / Needs Guidance',
                    education,
                    dob
                  })}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-200 flex items-center justify-center gap-2 active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Get Personalized Study Plan for Your Eligible Exams</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Our defense experts will map your exact UPSC notifications, upcoming exam deadlines, and batch seats in Gwalior.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
