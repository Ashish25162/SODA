import React, { useState } from 'react';
import {
  Shield,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Award,
  ExternalLink,
  Compass,
  Lock,
} from 'lucide-react';
import { StudentUser, setStudentUser, getAllStudents } from '../lib/storage';

interface CadetAuthGateProps {
  onSuccess: (user: StudentUser) => void;
}

export const CadetAuthGate: React.FC<CadetAuthGateProps> = ({ onSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');

  // Login form state
  const [loginId, setLoginId] = useState('');

  // Registration form state
  const [regData, setRegData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    defenceEntry: 'NDA (National Defence Academy)',
    educationLevel: 'Undergraduate',
    previousSsbExperience: 'First Time (Fresher)',
    city: 'Gwalior',
    state: 'Madhya Pradesh',
  });

  const demoCadets = [
    {
      code: 'SODA-2601',
      name: 'Arun Pratap Singh',
      entry: 'CDS (IMA Dehradun)',
      email: 'arun.pratap@sodaedu.in',
      mobile: '+91 90098 29888',
      educationLevel: 'Graduate',
      previousSsbExperience: 'Previously Attended SSB',
      city: 'Gwalior',
      state: 'Madhya Pradesh',
    },
    {
      code: 'SODA-2602',
      name: 'Abhinav Singh',
      entry: 'NDA (11th & 12th Foundation)',
      email: 'abhinav.singh@sodaedu.in',
      mobile: '+91 84332 47664',
      educationLevel: 'Class 12',
      previousSsbExperience: 'First Time (Fresher)',
      city: 'Gwalior',
      state: 'Madhya Pradesh',
    },
    {
      code: 'SODA-2603',
      name: 'Tanishq Kushwah',
      entry: 'AFCAT (Flying Branch)',
      email: 'tanishq.kushwah@sodaedu.in',
      mobile: '+91 98260 12345',
      educationLevel: 'Undergraduate',
      previousSsbExperience: 'First Time (Fresher)',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
    },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginId.trim()) {
      setError('Please provide your Cadet Code, registered Email, or Mobile number.');
      return;
    }

    const all = getAllStudents();
    const query = loginId.trim().toLowerCase();
    const match = all.find(
      (c) =>
        c.studentCode.toLowerCase() === query ||
        c.email.toLowerCase() === query ||
        c.mobile.includes(query) ||
        c.fullName.toLowerCase().includes(query)
    );

    if (match) {
      setStudentUser(match);
      onSuccess(match);
    } else {
      // Auto-provision guest cadet
      const autoCadet: StudentUser = {
        id: `cadet-${Date.now()}`,
        studentCode: `SODA-${Math.floor(2600 + Math.random() * 900)}`,
        fullName: loginId.includes('@') ? loginId.split('@')[0] : loginId,
        email: loginId.includes('@') ? loginId : `${loginId.toLowerCase()}@cadet.sodaedu.in`,
        mobile: '+91 90098 29888',
        educationLevel: 'Undergraduate',
        defenceEntry: 'NDA / CDS Officer Entry',
        previousSsbExperience: 'First Time (Fresher)',
        city: 'Gwalior',
        state: 'Madhya Pradesh',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      setStudentUser(autoCadet);
      onSuccess(autoCadet);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!regData.fullName.trim() || !regData.email.trim() || !regData.mobile.trim()) {
      setError('Please complete all mandatory cadet registration fields.');
      return;
    }

    const newCadet: StudentUser = {
      id: `cadet-${Date.now()}`,
      studentCode: `SODA-${Math.floor(2600 + Math.random() * 900)}`,
      fullName: regData.fullName.trim(),
      email: regData.email.trim(),
      mobile: regData.mobile.trim(),
      defenceEntry: regData.defenceEntry,
      educationLevel: regData.educationLevel,
      previousSsbExperience: regData.previousSsbExperience,
      city: regData.city.trim() || 'Gwalior',
      state: regData.state.trim() || 'Madhya Pradesh',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    setStudentUser(newCadet);
    onSuccess(newCadet);
  };

  const handleQuickLogin = (demo: any) => {
    const cadet: StudentUser = {
      id: `demo-${demo.code}`,
      studentCode: demo.code,
      fullName: demo.name,
      email: demo.email,
      mobile: demo.mobile,
      defenceEntry: demo.entry,
      educationLevel: demo.educationLevel,
      previousSsbExperience: demo.previousSsbExperience,
      city: demo.city,
      state: demo.state,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    setStudentUser(cadet);
    onSuccess(cadet);
  };

  return (
    <div className="min-h-screen bg-cream-1 flex flex-col justify-between parchment-pattern py-8 px-4 sm:px-6">
      <div className="max-w-2xl w-full mx-auto my-auto">
        {/* Brand Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cream-2 border border-tactical-2 rounded mb-4">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse"></span>
            <span className="font-mono text-xs text-olive font-bold tracking-widest uppercase">
              SABRE OFFICERS DEFENSE ACADEMY // SODA
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-2">
            Cadet Authentication & Dossier Portal
          </h1>
          <p className="text-sm text-ink-3 max-w-md mx-auto">
            Official testing portal integrated with <strong className="text-ink">sodaedu.in</strong>. Sign in or register your cadet profile to access diagnostic batteries and performance debriefs.
          </p>
        </div>

        {/* Main Auth Card */}
        <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 sm:p-8 shadow-dossier">
          {/* Mode Tabs */}
          <div className="flex border border-tactical rounded p-1 bg-cream-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setError('');
              }}
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                tab === 'login' ? 'bg-cream-1 text-ink shadow-sm' : 'text-ink-3 hover:text-ink'
              }`}
            >
              Sign In to Cadet Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setError('');
              }}
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                tab === 'register' ? 'bg-cream-1 text-ink shadow-sm' : 'text-ink-3 hover:text-ink'
              }`}
            >
              New Cadet Enrollment
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red/10 border border-red/30 rounded flex items-center space-x-2 text-xs text-red font-medium">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1.5 font-bold">
                  Cadet Code / Registered Email / Mobile *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SODA-2601 or your email / phone"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1.5 font-bold">
                  Security PIN / Password
                </label>
                <input
                  type="password"
                  placeholder="•••••••• (Any password for demo access)"
                  className="w-full px-4 py-3 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3.5 rounded shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Enter Cadet Training Dashboard</span>
                <ArrowRight size={16} className="text-gold" />
              </button>
            </form>
          ) : (
            /* TAB 2: REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                    Full Cadet Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Batra"
                    value={regData.fullName}
                    onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="cadet@sodaedu.in"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 90098 29888"
                    value={regData.mobile}
                    onChange={(e) => setRegData({ ...regData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                    Target Defence Entry
                  </label>
                  <select
                    value={regData.defenceEntry}
                    onChange={(e) => setRegData({ ...regData, defenceEntry: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                  >
                    <option value="NDA (National Defence Academy)">NDA (National Defence Academy)</option>
                    <option value="CDS (Combined Defence Services)">CDS (Combined Defence Services)</option>
                    <option value="AFCAT (Air Force Common Admission)">AFCAT (Air Force Common Admission)</option>
                    <option value="OTA (Officers Training Academy)">OTA (Officers Training Academy)</option>
                    <option value="INET (Indian Naval Entrance)">INET (Indian Naval Entrance)</option>
                    <option value="CAPF (Assistant Commandant)">CAPF (Assistant Commandant)</option>
                    <option value="Direct Entry / TGC / SSC Tech">Direct Entry / TGC / SSC Tech</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                    Education Level
                  </label>
                  <select
                    value={regData.educationLevel}
                    onChange={(e) => setRegData({ ...regData, educationLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                  >
                    <option value="Class 11">Class 11 (School Foundation)</option>
                    <option value="Class 12">Class 12 (Board Appearing)</option>
                    <option value="Undergraduate">Undergraduate (College Pursuing)</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                    SSB Experience
                  </label>
                  <select
                    value={regData.previousSsbExperience}
                    onChange={(e) => setRegData({ ...regData, previousSsbExperience: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                  >
                    <option value="First Time (Fresher)">First Time (Fresher)</option>
                    <option value="Screened Out Candidate">Screened Out (Repeater)</option>
                    <option value="Conference Out Candidate">Conference Out</option>
                    <option value="Previously Recommended">Previously Recommended</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                    City
                  </label>
                  <input
                    type="text"
                    value={regData.city}
                    onChange={(e) => setRegData({ ...regData, city: e.target.value })}
                    placeholder="Gwalior"
                    className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                    State
                  </label>
                  <input
                    type="text"
                    value={regData.state}
                    onChange={(e) => setRegData({ ...regData, state: e.target.value })}
                    placeholder="Madhya Pradesh"
                    className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-2 text-navy-1 font-mono text-xs font-bold uppercase tracking-wider py-3.5 rounded shadow-sm transition-all flex items-center justify-center space-x-2 mt-4"
              >
                <span>Create Cadet Dossier & Launch Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Quick 1-Click Demo Profiles */}
          <div className="mt-8 pt-6 border-t border-tactical">
            <span className="block text-[11px] font-mono text-ink-4 uppercase tracking-wider mb-2.5 text-center">
              Quick 1-Click Access // Verified SODA Cadet Profiles
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {demoCadets.map((demo) => (
                <button
                  key={demo.code}
                  type="button"
                  onClick={() => handleQuickLogin(demo)}
                  className="p-2.5 bg-cream-1 hover:bg-cream-3 border border-tactical rounded text-left transition-all group"
                >
                  <span className="font-mono text-[10px] text-gold font-bold block">
                    {demo.code}
                  </span>
                  <span className="text-xs font-bold text-ink block truncate group-hover:text-navy-1">
                    {demo.name}
                  </span>
                  <span className="text-[10px] text-ink-3 block truncate">
                    {demo.entry.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-xs text-ink-4 font-mono space-y-1">
          <p>SODA GWALIOR CAMPUS // 106, MLB COLONY, PADAV, LASHKAR, GWALIOR</p>
          <div className="flex justify-center space-x-4 pt-1">
            <a
              href="https://sodaedu.in/"
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:underline flex items-center space-x-1"
            >
              <span>sodaedu.in</span>
              <ExternalLink size={10} />
            </a>
            <span>·</span>
            <span>Helpline: +91 90098 29888</span>
          </div>
        </div>
      </div>
    </div>
  );
};
