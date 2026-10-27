import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight,
  Database
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'signin', onSuccess }) {
  const { signIn, signUp, authError, isSupabaseConfigured } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  
  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Sign Up Form State
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetExam, setTargetExam] = useState('NDA');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!signInEmail || !signInPassword) {
      setFormError('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    const result = await signIn({ email: signInEmail, password: signInPassword });
    setSubmitting(false);

    if (result.success) {
      setSuccessMsg('Authentication successful! Welcome back.');
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 700);
    } else {
      setFormError(result.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter candidate full name.');
      return;
    }
    if (!signUpEmail.trim()) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setFormError('Please enter valid 10-digit WhatsApp/mobile number.');
      return;
    }
    if (signUpPassword.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    if (signUpPassword !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const result = await signUp({
      email: signUpEmail,
      password: signUpPassword,
      fullName,
      phone,
      targetExam,
    });
    setSubmitting(false);

    if (result.success) {
      setSuccessMsg('Cadet Account Created Successfully!');
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 800);
    } else {
      setFormError(result.error || 'Registration failed.');
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="modal-sheet max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-[#0A192F] text-white p-6 relative border-b border-[#D97706]/30">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-white/20 grid place-items-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>

          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-widest text-[#D97706] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#D97706]" />
            <span>Cadet Portal Security</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl tracking-tight text-white">
            {mode === 'signin' ? 'Sign In to Cadet Desk' : 'Create Cadet Account'}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-snug">
            {mode === 'signin' 
              ? 'Access real SSB OIR tests, psychological practice rooms & scores.'
              : 'Register to unlock free full-length OIR practice tests & study blue prints.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-[#060F1E] p-1 rounded-lg mt-5 border border-white/10 font-sans text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setMode('signin'); setFormError(''); }}
              className={`py-2 rounded-md transition-all ${
                mode === 'signin'
                  ? 'bg-[#D97706] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setFormError(''); }}
              className={`py-2 rounded-md transition-all ${
                mode === 'signup'
                  ? 'bg-[#D97706] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              New Registration
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 bg-white">
          
          {/* Error Banner */}
          {(formError || authError) && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{formError || authError}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2 text-xs font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'signin' ? (
            /* ================= SIGN IN FORM ================= */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="cadet@gmail.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:bg-white"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-slate-700 font-semibold">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showSignInPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-10 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:bg-white"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gold w-full justify-center font-bold text-sm py-3 shadow-md mt-2"
              >
                {submitting ? 'Verifying Credentials...' : 'Sign In to Cadet Portal'}
              </button>
            </form>
          ) : (
            /* ================= SIGN UP FORM ================= */
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block font-mono text-[10.5px] uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Candidate Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Rathore"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="cadet@gmail.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-2 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    WhatsApp Phone *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-2 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10.5px] uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Target Defense Exam
                </label>
                <div className="relative">
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  >
                    <option value="NDA">NDA (National Defence Academy - 12th)</option>
                    <option value="CDS">CDS (IMA / INA / AFA / OTA - Graduates)</option>
                    <option value="AFCAT">AFCAT (Indian Air Force)</option>
                    <option value="CAPF">CAPF (Assistant Commandant)</option>
                    <option value="SSB">Direct SSB Interview (All Entries)</option>
                  </select>
                  <Award className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showSignUpPassword ? 'text' : 'password'}
                      required
                      placeholder="Min 6 chars"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-8 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showSignUpPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10.5px] uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-2 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gold w-full justify-center font-bold text-sm py-3 shadow-md mt-2"
              >
                {submitting ? 'Registering Cadet...' : 'Create Account & Access Tests'}
              </button>
            </form>
          )}

          {/* Database & Security Footnote */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#3F6212]" />
              <span>{isSupabaseConfigured ? 'Supabase Postgres Active' : 'Encrypted Storage Ready'}</span>
            </span>
            <span className="text-[#3F6212] font-semibold">100% Confidential</span>
          </div>

        </div>
      </div>
    </div>
  );
}
