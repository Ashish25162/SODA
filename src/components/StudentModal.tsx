import React, { useState } from 'react';
import { X, CheckCircle, ShieldAlert, Award, UserCheck, ArrowRight } from 'lucide-react';
import { StudentUser, getStudentUser, setStudentUser, getAllStudents } from '../lib/storage';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: StudentUser) => void;
  title?: string;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Cadet Authentication // SSB Stage 1 Access',
}) => {
  const [mode, setMode] = useState<'register' | 'login'>('login');
  const [error, setError] = useState<string>('');
  const [successUser, setSuccessUser] = useState<StudentUser | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    identifier: '',
    fullName: '',
    email: '',
    mobile: '',
    educationLevel: 'Undergraduate',
    defenceEntry: 'NDA',
    previousSsbExperience: 'First Time',
    city: 'Dehradun',
    state: 'Uttarakhand',
    consent: true,
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!formData.identifier.trim()) {
        setError('Please enter your email, mobile number, or Cadet ID.');
        return;
      }
      const all = getAllStudents();
      const query = formData.identifier.trim().toLowerCase();
      const found = all.find(
        (s) =>
          s.email.toLowerCase() === query ||
          s.mobile.includes(query) ||
          s.studentCode.toLowerCase() === query ||
          s.fullName.toLowerCase().includes(query)
      );

      if (found) {
        setStudentUser(found);
        setSuccessUser(found);
      } else {
        // Auto-provision or register
        const newUser: StudentUser = {
          id: `stu-${Date.now()}`,
          studentCode: `CADET-${Math.floor(1000 + Math.random() * 9000)}`,
          fullName: formData.identifier.includes('@') ? formData.identifier.split('@')[0] : 'Officer Candidate',
          email: formData.identifier.includes('@') ? formData.identifier : `${formData.identifier}@cadet.soda.in`,
          mobile: '+91 9000000000',
          educationLevel: 'Undergraduate',
          defenceEntry: 'SSB Interview',
          previousSsbExperience: 'First Time',
          city: 'National Center',
          state: 'Defense Command',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };
        setStudentUser(newUser);
        setSuccessUser(newUser);
      }
    } else {
      // Register
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.mobile.trim()) {
        setError('Please fill in all mandatory military dossier fields.');
        return;
      }
      const newUser: StudentUser = {
        id: `stu-${Date.now()}`,
        studentCode: `CADET-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        educationLevel: formData.educationLevel,
        defenceEntry: formData.defenceEntry,
        previousSsbExperience: formData.previousSsbExperience,
        city: formData.city,
        state: formData.state,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      setStudentUser(newUser);
      setSuccessUser(newUser);
    }
  };

  const handleStartNow = () => {
    if (successUser) {
      onSuccess(successUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-1/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-cream-2 border border-tactical-2 rounded-lg shadow-dossier overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-navy-1 text-cream-1 px-6 py-4 flex items-center justify-between border-b border-tactical-dark">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-olive animate-pulse"></span>
            <span className="font-mono text-xs text-gold uppercase tracking-widest">
              SABRE OFFICERS DEFENSE ACADEMY
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-cream-3 hover:text-gold transition-colors p-1 rounded"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {successUser ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-olive/15 text-olive rounded-full flex items-center justify-center mx-auto mb-4 border border-olive/30">
                <CheckCircle size={28} />
              </div>
              <span className="font-mono text-xs text-olive font-semibold tracking-wider uppercase">
                DOSSIER SYNCHRONIZED
              </span>
              <h3 className="font-sans text-2xl text-ink font-bold mt-1 mb-2">
                Welcome back, {successUser.fullName}.
              </h3>
              <p className="text-sm text-ink-3 max-w-sm mx-auto mb-6">
                Your profile <strong className="text-ink font-mono">{successUser.studentCode}</strong> is linked to this assessment. All attempt logs and latency benchmarks will be preserved.
              </p>
              <button
                onClick={handleStartNow}
                className="w-full inline-flex items-center justify-center space-x-2 bg-gold hover:bg-gold-2 text-navy-1 font-semibold py-3 px-6 rounded transition-all shadow-md hover:shadow-gold-glow"
              >
                <span>Proceed to Assessment Battery</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="font-sans text-2xl text-ink font-bold leading-tight">
                  {mode === 'login' ? 'Officer Candidate Sign-In' : 'Create Candidate Dossier'}
                </h2>
                <p className="text-xs text-ink-3 mt-1">
                  {mode === 'login'
                    ? 'Access your unified Stage 1 CSSS drills and OPAM debrief records.'
                    : 'Register your candidate credentials for officer screening analytics.'}
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex border border-tactical rounded p-1 bg-cream-3 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded transition-all ${
                    mode === 'login' ? 'bg-cream-1 text-ink shadow-sm' : 'text-ink-3 hover:text-ink'
                  }`}
                >
                  Existing Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded transition-all ${
                    mode === 'register' ? 'bg-cream-1 text-ink shadow-sm' : 'text-ink-3 hover:text-ink'
                  }`}
                >
                  New Enrollment
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red/10 border border-red/30 rounded flex items-center space-x-2 text-xs text-red">
                  <ShieldAlert size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'login' ? (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1">
                      Candidate Identifier
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Email, Mobile number, or STU-xxxx"
                      value={formData.identifier}
                      onChange={(e) => handleInputChange('identifier', e.target.value)}
                      className="w-full px-3 py-2 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Batra"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="cadet@academy.in"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9876543210"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1">
                          Target Entry
                        </label>
                        <select
                          value={formData.defenceEntry}
                          onChange={(e) => handleInputChange('defenceEntry', e.target.value)}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                        >
                          <option value="NDA">NDA (National Defence Academy)</option>
                          <option value="CDS">CDS (Combined Defence Services)</option>
                          <option value="AFCAT">AFCAT (Air Force Common Admission)</option>
                          <option value="INET">INET (Indian Navy Entrance Test)</option>
                          <option value="CAPF">CAPF (Central Armed Police Forces)</option>
                          <option value="SSB Direct">Direct Entry / TGC / SSC Tech</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1">
                          Education Level
                        </label>
                        <select
                          value={formData.educationLevel}
                          onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                        >
                          <option value="Class 11">Class 11</option>
                          <option value="Class 12">Class 12</option>
                          <option value="Undergraduate">Undergraduate (Pursuing)</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1">
                          SSB History
                        </label>
                        <select
                          value={formData.previousSsbExperience}
                          onChange={(e) => handleInputChange('previousSsbExperience', e.target.value)}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                        >
                          <option value="First Time">First Time (Fresher)</option>
                          <option value="Previously Attended SSB">Previously Screened / Repeater</option>
                          <option value="Conference Recommended">Previously Recommended</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-navy-1 hover:bg-navy-3 text-cream-1 font-semibold py-3 px-4 rounded transition-colors flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>{mode === 'login' ? 'Authenticate & Enter' : 'Register Dossier & Proceed'}</span>
                    <ArrowRight size={16} className="text-gold" />
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-4 border-t border-tactical text-center">
                <span className="text-[11px] font-mono text-ink-4">
                  OFFICIAL CADET DOSSIER // REVISION 2026 // MILITARY EDITORIAL STANDARDS
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
