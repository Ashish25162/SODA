import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Lock,
  Users,
  Award,
  Layers,
  Database,
  Search,
  Download,
  Plus,
  Edit,
  Trash2,
  X,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import {
  isAdminAuthenticated,
  setAdminAuthenticated,
  getAllStudents,
  getStudentAttempts,
  getManagedTests,
  saveManagedTest,
  getManagedQuestions,
  saveManagedQuestion,
  exportStudentsCSV,
  exportAssessmentsCSV,
  StudentUser,
  AssessmentAttempt,
  ManagedTest,
  ManagedQuestion,
} from '../lib/storage';

export const AdminPage: React.FC<{ section?: 'dashboard' | 'students' | 'tests' | 'questions' }> = ({
  section = 'dashboard',
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'tests' | 'questions'>(section);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data states
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [attempts, setAttempts] = useState<AssessmentAttempt[]>([]);
  const [tests, setTests] = useState<ManagedTest[]>([]);
  const [questions, setQuestions] = useState<ManagedQuestion[]>([]);

  // Search & Detail state
  const [searchStudent, setSearchStudent] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentUser | null>(null);

  // Test form state
  const [editingTest, setEditingTest] = useState<ManagedTest | null>(null);
  const [testForm, setTestForm] = useState<Partial<ManagedTest>>({
    slug: '',
    title: '',
    description: '',
    duration: 600,
    difficulty: 'Mixed',
    status: 'published',
  });

  // Question form state
  const [editingQuestion, setEditingQuestion] = useState<ManagedQuestion | null>(null);
  const [questionForm, setQuestionForm] = useState<Partial<ManagedQuestion>>({
    prompt: '',
    questionType: 'multiple-choice',
    formatLabel: 'Standard OIR',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'Option A',
    explanation: '',
    category: 'Spatial Reasoning',
    difficulty: 'Moderate',
    status: 'published',
  });

  useEffect(() => {
    const auth = isAdminAuthenticated();
    setIsAuthenticated(auth);
    if (auth) {
      loadData();
    }
  }, []);

  const loadData = () => {
    setStudents(getAllStudents());
    setAttempts(getStudentAttempts());
    setTests(getManagedTests());
    setQuestions(getManagedQuestions());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Default admin credentials: admin / admin123 or owner bypass
    if (
      (username.trim() === 'admin' && password.trim() === 'admin123') ||
      (username.trim() === 'owner' && password.trim() === 'owner')
    ) {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      loadData();
    } else {
      setLoginError('Invalid Administrator credentials. Hint: admin / admin123');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  const handleOwnerBypass = () => {
    setAdminAuthenticated(true);
    setIsAuthenticated(true);
    loadData();
  };

  // Test Form Handlers
  const handleSaveTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.title || !testForm.slug) return;

    saveManagedTest({
      id: editingTest?.id || `test-${Date.now()}`,
      slug: testForm.slug!,
      title: testForm.title!,
      description: testForm.description || '',
      duration: Number(testForm.duration) || 600,
      difficulty: testForm.difficulty || 'Mixed',
      status: (testForm.status as any) || 'published',
    });

    setEditingTest(null);
    setTestForm({
      slug: '',
      title: '',
      description: '',
      duration: 600,
      difficulty: 'Mixed',
      status: 'published',
    });
    loadData();
  };

  // Question Form Handlers
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionForm.prompt) return;

    saveManagedQuestion({
      id: editingQuestion?.id || `Q-${Date.now().toString().slice(-4)}`,
      testId: questionForm.testId || 'test-1',
      prompt: questionForm.prompt!,
      questionType: questionForm.questionType || 'multiple-choice',
      formatLabel: questionForm.formatLabel || 'Standard',
      options: Array.isArray(questionForm.options)
        ? questionForm.options
        : String(questionForm.options).split(',').map((s) => s.trim()),
      correctAnswer: questionForm.correctAnswer || '',
      explanation: questionForm.explanation || '',
      category: questionForm.category || 'General Reasoning',
      difficulty: questionForm.difficulty || 'Moderate',
      status: (questionForm.status as any) || 'published',
    });

    setEditingQuestion(null);
    setQuestionForm({
      prompt: '',
      questionType: 'multiple-choice',
      formatLabel: 'Standard OIR',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: '',
      category: 'Spatial Reasoning',
      difficulty: 'Moderate',
      status: 'published',
    });
    loadData();
  };

  // 1. Sign-in Access Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-1 flex items-center justify-center p-4 naval-grid-pattern">
        <div className="w-full max-w-md bg-cream-2 border border-tactical-2 rounded-xl p-8 shadow-dossier-dark">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-navy-1 border border-tactical-gold text-gold rounded-full flex items-center justify-center mx-auto mb-3 font-mono font-bold">
              <Lock size={20} />
            </div>
            <span className="font-mono text-xs text-gold font-bold tracking-widest uppercase block">
              OWNER & MENTOR ACCESS
            </span>
            <h1 className="font-sans text-2xl font-bold text-ink mt-1">
              Administrator Sign-In
            </h1>
            <p className="text-xs text-ink-3 mt-1">
              Manage student candidate records, tests, and diagnostic question banks.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red/10 border border-red/30 rounded text-xs text-red">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3 py-2 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-3 py-2 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3 rounded shadow-sm transition-all"
            >
              Sign In to Command Console
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-tactical text-center space-y-2">
            <button
              type="button"
              onClick={handleOwnerBypass}
              className="text-xs font-mono text-gold hover:underline block w-full"
            >
              One-Click Site Owner Authorization
            </button>
            <Link href="/" className="text-xs font-mono text-ink-3 hover:text-ink block">
              ← Return to Academy Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Students
  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.email.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cream-1">
      {/* Admin Top Navigation */}
      <div className="bg-navy-1 text-cream-1 border-b border-tactical-dark">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-navy-2 border border-tactical-gold text-gold flex items-center justify-center font-mono font-bold text-sm">
              S
            </div>
            <div>
              <span className="font-sans text-lg font-bold text-cream-1">SODA Console</span>
              <span className="text-[10px] font-mono text-gold ml-2 uppercase tracking-wider">
                // Command HQ
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-xs font-mono text-cream-3 hover:text-gold flex items-center space-x-1"
            >
              <span>Public Website</span>
              <ExternalLink size={12} />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-mono text-gold hover:text-gold-2 flex items-center space-x-1 bg-navy-2 px-3 py-1.5 rounded border border-tactical-dark"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="container mx-auto px-4 sm:px-6 flex space-x-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'dashboard'
                ? 'border-gold text-gold font-bold bg-navy-2'
                : 'border-transparent text-cream-3 hover:text-cream-1'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'students'
                ? 'border-gold text-gold font-bold bg-navy-2'
                : 'border-transparent text-cream-3 hover:text-cream-1'
            }`}
          >
            Defence Aspirants ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'tests'
                ? 'border-gold text-gold font-bold bg-navy-2'
                : 'border-transparent text-cream-3 hover:text-cream-1'
            }`}
          >
            Test Management ({tests.length})
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'questions'
                ? 'border-gold text-gold font-bold bg-navy-2'
                : 'border-transparent text-cream-3 hover:text-cream-1'
            }`}
          >
            Question Bank ({questions.length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 py-10">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <span className="text-xs font-mono font-bold text-olive uppercase tracking-widest block mb-1">
                EXECUTIVE TELEMETRY
              </span>
              <h2 className="font-sans text-3xl font-bold text-ink">
                Academy Performance & Candidate Analytics
              </h2>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-cream-2 border border-tactical rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-ink-3 uppercase">Registered Aspirants</span>
                  <Users size={16} className="text-gold" />
                </div>
                <span className="font-mono text-3xl font-bold text-ink">{students.length}</span>
              </div>
              <div className="p-6 bg-cream-2 border border-tactical rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-ink-3 uppercase">Completed Attempts</span>
                  <Award size={16} className="text-olive" />
                </div>
                <span className="font-mono text-3xl font-bold text-ink">{attempts.length}</span>
              </div>
              <div className="p-6 bg-cream-2 border border-tactical rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-ink-3 uppercase">Managed Tests</span>
                  <Layers size={16} className="text-ink-2" />
                </div>
                <span className="font-mono text-3xl font-bold text-ink">{tests.length}</span>
              </div>
              <div className="p-6 bg-cream-2 border border-tactical rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-ink-3 uppercase">Question Bank</span>
                  <Database size={16} className="text-gold" />
                </div>
                <span className="font-mono text-3xl font-bold text-ink">
                  {questions.length + 190} <small className="text-xs text-ink-4">catalogued</small>
                </span>
              </div>
            </div>

            {/* Recent Assessment Attempts Table */}
            <div className="bg-cream-2 border border-tactical rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-tactical">
                <h3 className="font-sans text-xl font-bold text-ink">
                  Recent Assessment Attempts
                </h3>
                <button
                  onClick={exportAssessmentsCSV}
                  className="text-xs font-mono text-gold hover:text-gold-dim flex items-center space-x-1"
                >
                  <Download size={13} />
                  <span>Export CSV Log</span>
                </button>
              </div>

              {attempts.length === 0 ? (
                <p className="text-xs font-mono text-ink-3 py-6 text-center">
                  No scored attempts have been recorded yet. Start a test in CSSS or OPAM to populate telemetry.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-tactical text-ink-3">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Cadet ID</th>
                        <th className="py-2.5 px-3">Candidate</th>
                        <th className="py-2.5 px-3">Test Battery</th>
                        <th className="py-2.5 px-3">Raw Score</th>
                        <th className="py-2.5 px-3">Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tactical">
                      {attempts.map((a, idx) => (
                        <tr key={idx} className="hover:bg-cream-3/50 transition-colors">
                          <td className="py-2.5 px-3 text-ink-4">
                            {new Date(a.completedAt).toLocaleTimeString()}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-gold">{a.studentCode}</td>
                          <td className="py-2.5 px-3 text-ink font-semibold">{a.fullName}</td>
                          <td className="py-2.5 px-3 text-ink-2 uppercase">{a.testName}</td>
                          <td className="py-2.5 px-3 text-ink">{a.score}</td>
                          <td className="py-2.5 px-3 font-bold text-olive">{a.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Architecture Explanation Card */}
            <div className="p-6 bg-cream-2 border border-tactical rounded-lg">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block mb-1">
                SYSTEM OF RECORD
              </span>
              <p className="text-xs text-ink-2 leading-relaxed">
                Accounts and assessment attempts persist in this managed database engine. The public CSSS (70 questions) and OPAM (120 prompts) content banks remain version-controlled; additional custom institutional questions can be staged in the Question Bank module.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: DEFENCE ASPIRANTS */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-olive uppercase tracking-widest block mb-1">
                  CADET ROSTER
                </span>
                <h2 className="font-sans text-3xl font-bold text-ink">Defence Aspirants</h2>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={exportStudentsCSV}
                  className="inline-flex items-center space-x-1.5 bg-cream-2 hover:bg-cream-3 border border-tactical-2 text-ink text-xs font-mono font-bold px-3 py-2 rounded"
                >
                  <Download size={14} className="text-gold" />
                  <span>Export Cadets CSV</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-3 text-ink-4" />
              <input
                type="text"
                placeholder="Search candidate by name, email, or Cadet Code (e.g. STU-2601)..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cream-2 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              />
            </div>

            {/* Students Table */}
            <div className="bg-cream-2 border border-tactical rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-cream-3 text-ink-2 border-b border-tactical">
                      <th className="py-3 px-4">Cadet Code</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Entry</th>
                      <th className="py-3 px-4">Education</th>
                      <th className="py-3 px-4">SSB Experience</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tactical">
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-cream-1 transition-colors">
                        <td className="py-3 px-4 font-bold text-gold">{s.studentCode}</td>
                        <td className="py-3 px-4 font-bold text-ink">{s.fullName}</td>
                        <td className="py-3 px-4 text-ink-3">{s.email}</td>
                        <td className="py-3 px-4 font-semibold text-olive">{s.defenceEntry}</td>
                        <td className="py-3 px-4 text-ink-3">{s.educationLevel}</td>
                        <td className="py-3 px-4 text-ink-4">{s.previousSsbExperience}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="text-xs text-navy-1 font-bold hover:text-gold transition-colors inline-flex items-center space-x-1"
                          >
                            <span>Dossier</span>
                            <ArrowRight size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Student Detail Drawer */}
            {selectedStudent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-1/80 backdrop-blur-sm">
                <div className="bg-cream-2 border border-tactical-2 rounded-xl p-8 max-w-lg w-full shadow-dossier relative">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="absolute right-4 top-4 text-ink-3 hover:text-ink"
                  >
                    <X size={18} />
                  </button>

                  <span className="font-mono text-xs text-gold uppercase tracking-widest block mb-1">
                    CADET DOSSIER // {selectedStudent.studentCode}
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-ink mb-4">
                    {selectedStudent.fullName}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono p-4 bg-cream-1 border border-tactical rounded mb-6">
                    <div>
                      <span className="text-ink-4 block">Email:</span>
                      <span className="text-ink font-bold">{selectedStudent.email}</span>
                    </div>
                    <div>
                      <span className="text-ink-4 block">Mobile:</span>
                      <span className="text-ink font-bold">{selectedStudent.mobile}</span>
                    </div>
                    <div>
                      <span className="text-ink-4 block">Target Entry:</span>
                      <span className="text-olive font-bold">{selectedStudent.defenceEntry}</span>
                    </div>
                    <div>
                      <span className="text-ink-4 block">SSB History:</span>
                      <span className="text-ink font-bold">{selectedStudent.previousSsbExperience}</span>
                    </div>
                  </div>

                  <h4 className="font-sans text-lg font-bold text-ink mb-2">
                    Assessment History
                  </h4>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {attempts.filter((a) => a.studentCode === selectedStudent.studentCode).length === 0 ? (
                      <p className="text-xs font-mono text-ink-3">No attempts logged for this cadet.</p>
                    ) : (
                      attempts
                        .filter((a) => a.studentCode === selectedStudent.studentCode)
                        .map((att, i) => (
                          <div key={i} className="p-2 bg-cream-1 border border-tactical rounded flex justify-between text-xs font-mono">
                            <span>{att.testName}</span>
                            <span className="text-olive font-bold">{att.percentage}%</span>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TEST MANAGEMENT */}
        {activeTab === 'tests' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-mono font-bold text-olive uppercase tracking-widest block mb-1">
                  CURRICULUM ARCHITECTURE
                </span>
                <h2 className="font-sans text-3xl font-bold text-ink">Test Catalogue</h2>
              </div>
              <button
                onClick={() => {
                  setEditingTest({
                    id: '',
                    slug: '',
                    title: '',
                    description: '',
                    duration: 600,
                    difficulty: 'Mixed',
                    status: 'published',
                  });
                  setTestForm({
                    slug: '',
                    title: '',
                    description: '',
                    duration: 600,
                    difficulty: 'Mixed',
                    status: 'published',
                  });
                }}
                className="inline-flex items-center space-x-1.5 bg-gold hover:bg-gold-2 text-navy-1 text-xs font-mono font-bold px-4 py-2.5 rounded shadow-sm"
              >
                <Plus size={15} />
                <span>Add Test Module</span>
              </button>
            </div>

            {/* Tests Table */}
            <div className="bg-cream-2 border border-tactical rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-cream-3 text-ink-2 border-b border-tactical">
                    <th className="py-3 px-4">Slug</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Difficulty</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tactical">
                  {tests.map((t) => (
                    <tr key={t.id} className="hover:bg-cream-1 transition-colors">
                      <td className="py-3 px-4 font-bold text-gold">{t.slug}</td>
                      <td className="py-3 px-4 font-bold text-ink">{t.title}</td>
                      <td className="py-3 px-4 text-ink-3">{t.duration}s</td>
                      <td className="py-3 px-4 text-ink-3">{t.difficulty}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-olive/15 text-olive font-bold uppercase text-[10px]">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setEditingTest(t);
                            setTestForm(t);
                          }}
                          className="text-xs text-navy-1 font-bold hover:text-gold"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Test Edit Modal */}
            {editingTest && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-1/80 backdrop-blur-sm">
                <div className="bg-cream-2 border border-tactical-2 rounded-xl p-8 max-w-lg w-full shadow-dossier relative">
                  <button
                    onClick={() => setEditingTest(null)}
                    className="absolute right-4 top-4 text-ink-3 hover:text-ink"
                  >
                    <X size={18} />
                  </button>
                  <h3 className="font-sans text-2xl font-bold text-ink mb-4">
                    {editingTest.id ? 'Edit Test Parameters' : 'Register New Test'}
                  </h3>
                  <form onSubmit={handleSaveTest} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                        Slug (Identifier)
                      </label>
                      <input
                        type="text"
                        required
                        value={testForm.slug}
                        onChange={(e) => setTestForm({ ...testForm, slug: e.target.value })}
                        className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                        Test Title
                      </label>
                      <input
                        type="text"
                        required
                        value={testForm.title}
                        onChange={(e) => setTestForm({ ...testForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={testForm.description}
                        onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
                        className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                          Duration (seconds)
                        </label>
                        <input
                          type="number"
                          value={testForm.duration}
                          onChange={(e) => setTestForm({ ...testForm, duration: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                          Status
                        </label>
                        <select
                          value={testForm.status}
                          onChange={(e) => setTestForm({ ...testForm, status: e.target.value as any })}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3 rounded"
                    >
                      Save Test Definition
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: QUESTION BANK */}
        {activeTab === 'questions' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-mono font-bold text-olive uppercase tracking-widest block mb-1">
                  ITEM CATALOGUE
                </span>
                <h2 className="font-sans text-3xl font-bold text-ink">Question Bank</h2>
              </div>
              <button
                onClick={() => {
                  setEditingQuestion({
                    id: '',
                    prompt: '',
                    questionType: 'multiple-choice',
                    formatLabel: 'Standard OIR',
                    options: ['Option A', 'Option B', 'Option C', 'Option D'],
                    correctAnswer: 'Option A',
                    explanation: '',
                    category: 'Spatial Reasoning',
                    difficulty: 'Moderate',
                    status: 'published',
                  });
                  setQuestionForm({
                    prompt: '',
                    questionType: 'multiple-choice',
                    formatLabel: 'Standard OIR',
                    options: ['Option A', 'Option B', 'Option C', 'Option D'],
                    correctAnswer: 'Option A',
                    explanation: '',
                    category: 'Spatial Reasoning',
                    difficulty: 'Moderate',
                    status: 'published',
                  });
                }}
                className="inline-flex items-center space-x-1.5 bg-gold hover:bg-gold-2 text-navy-1 text-xs font-mono font-bold px-4 py-2.5 rounded shadow-sm"
              >
                <Plus size={15} />
                <span>Author New Question</span>
              </button>
            </div>

            {/* Questions Table */}
            <div className="bg-cream-2 border border-tactical rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-cream-3 text-ink-2 border-b border-tactical">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Prompt</th>
                    <th className="py-3 px-4">Format</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tactical">
                  {questions.map((q) => (
                    <tr key={q.id} className="hover:bg-cream-1 transition-colors">
                      <td className="py-3 px-4 font-bold text-gold">{q.id}</td>
                      <td className="py-3 px-4 font-bold text-ink max-w-md truncate">{q.prompt}</td>
                      <td className="py-3 px-4 text-ink-3">{q.formatLabel}</td>
                      <td className="py-3 px-4 font-semibold text-olive">{q.category}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-olive/15 text-olive font-bold uppercase text-[10px]">
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setEditingQuestion(q);
                            setQuestionForm(q);
                          }}
                          className="text-xs text-navy-1 font-bold hover:text-gold"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Question Edit Modal */}
            {editingQuestion && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-1/80 backdrop-blur-sm">
                <div className="bg-cream-2 border border-tactical-2 rounded-xl p-8 max-w-xl w-full shadow-dossier relative max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => setEditingQuestion(null)}
                    className="absolute right-4 top-4 text-ink-3 hover:text-ink"
                  >
                    <X size={18} />
                  </button>
                  <h3 className="font-sans text-2xl font-bold text-ink mb-4">
                    {editingQuestion.id ? 'Edit Question Definition' : 'Author Question Item'}
                  </h3>
                  <form onSubmit={handleSaveQuestion} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                        Question Prompt *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={questionForm.prompt}
                        onChange={(e) => setQuestionForm({ ...questionForm, prompt: e.target.value })}
                        className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          value={questionForm.category}
                          onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                          Format Label
                        </label>
                        <input
                          type="text"
                          value={questionForm.formatLabel}
                          onChange={(e) => setQuestionForm({ ...questionForm, formatLabel: e.target.value })}
                          className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                        Options (comma-separated or lines)
                      </label>
                      <input
                        type="text"
                        value={Array.isArray(questionForm.options) ? questionForm.options.join(', ') : questionForm.options}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            options: e.target.value.split(',').map((x) => x.trim()),
                          })
                        }
                        className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                        Correct Answer
                      </label>
                      <input
                        type="text"
                        value={questionForm.correctAnswer}
                        onChange={(e) => setQuestionForm({ ...questionForm, correctAnswer: e.target.value })}
                        className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-ink-2 mb-1">
                        Debrief Explanation
                      </label>
                      <textarea
                        rows={2}
                        value={questionForm.explanation}
                        onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                        className="w-full px-3 py-2 bg-cream-1 border border-tactical rounded text-xs font-mono text-ink"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3 rounded"
                    >
                      Save Question Item
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
