// Client-side & LocalStorage Data Engine for SODA (Sabre Officers Defense Academy — sodaedu.in)

export interface StudentUser {
  id: string;
  studentCode: string;
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth?: string;
  gender?: string;
  educationLevel: string;
  defenceEntry: string;
  previousSsbExperience: string;
  city: string;
  state: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface AssessmentAttempt {
  attemptId: string;
  studentCode: string;
  fullName: string;
  testSlug: 'csss' | 'opam' | string;
  testName: string;
  score: number;
  percentage: number;
  completedAt: string;
  answersSummary?: any;
}

export interface ManagedTest {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: number; // in seconds
  difficulty: string;
  status: 'published' | 'draft' | 'archived';
}

export interface ManagedQuestion {
  id: string;
  testId?: string | null;
  prompt: string;
  questionType: string;
  formatLabel: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  difficulty: string;
  status: 'published' | 'draft';
}

const STORAGE_KEYS = {
  USER: 'soda_student_profile',
  ATTEMPTS: 'soda_assessment_attempts',
  CSSS_RESULT: 'soda_csss_result',
  OPAM_RESULT: 'soda_opam_result',
  ADMIN_TESTS: 'soda_managed_tests',
  ADMIN_QUESTIONS: 'soda_managed_questions',
  ADMIN_SESSION: 'soda_admin_session',
  ALL_STUDENTS: 'soda_all_registered_students',
};

// Seed verified SODA candidate profiles from Gwalior academy batches
const INITIAL_STUDENTS: StudentUser[] = [
  {
    id: 'soda-cadet-01',
    studentCode: 'SODA-2601',
    fullName: 'Arun Pratap Singh',
    email: 'arun.pratap@sodaedu.in',
    mobile: '+91 90098 29888',
    educationLevel: 'Graduate',
    defenceEntry: 'CDS (IMA Dehradun)',
    previousSsbExperience: 'Previously Attended SSB',
    city: 'Gwalior',
    state: 'Madhya Pradesh',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastLoginAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'soda-cadet-02',
    studentCode: 'SODA-2602',
    fullName: 'Abhinav Singh',
    email: 'abhinav.singh@sodaedu.in',
    mobile: '+91 84332 47664',
    educationLevel: 'Class 12 (Foundation)',
    defenceEntry: 'NDA (National Defence Academy)',
    previousSsbExperience: 'First Time',
    city: 'Gwalior',
    state: 'Madhya Pradesh',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    lastLoginAt: new Date(Date.now() - 5400000).toISOString(),
  },
  {
    id: 'soda-cadet-03',
    studentCode: 'SODA-2603',
    fullName: 'Tanishq Kushwah',
    email: 'tanishq.kushwah@sodaedu.in',
    mobile: '+91 98260 12345',
    educationLevel: 'Undergraduate',
    defenceEntry: 'AFCAT (Flying Branch)',
    previousSsbExperience: 'First Time',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    lastLoginAt: new Date(Date.now() - 43200000).toISOString(),
  },
];

const INITIAL_TESTS: ManagedTest[] = [
  {
    id: 'test-1',
    slug: 'csss',
    title: 'SODA CSSS Cognitive Screening Battery',
    description: '70-question multi-section battery testing speed, working memory, spatial judgement, and audio recall.',
    duration: 600,
    difficulty: 'Time-Compressed (SSB Stage 1)',
    status: 'published',
  },
  {
    id: 'test-2',
    slug: 'opam',
    title: 'SODA OPAM Officer Personality Matrix',
    description: '120-item mixed sequence assessment evaluating 15 OLQ endorsements under a 15-second timer.',
    duration: 1800,
    difficulty: 'Standard SSB Board Rating',
    status: 'published',
  },
  {
    id: 'test-3',
    slug: 'oir-express',
    title: 'OIR Speed Sprint // Set Bravo',
    description: '40 rapid verbal and non-verbal reasoning problems under tight 12-minute operational constraints.',
    duration: 720,
    difficulty: 'Hard (High Latency Pressure)',
    status: 'published',
  },
];

const INITIAL_QUESTIONS: ManagedQuestion[] = [
  {
    id: 'Q-001',
    testId: 'test-1',
    prompt: 'Study the diagram. A horizontal mirror flips the top-left mark. Where will the mark appear?',
    questionType: 'multiple-choice',
    formatLabel: 'Spatial / Mirror Reflection',
    options: ['Top-left', 'Top-right', 'Bottom-left', 'Bottom-right'],
    correctAnswer: 'Top-right',
    explanation: 'A horizontal flip mirrors left to right across the vertical axis.',
    category: 'Spatial Reasoning',
    difficulty: 'Moderate',
    status: 'published',
  },
  {
    id: 'Q-002',
    testId: 'test-1',
    prompt: 'A sequence flashes once: 4 · 9 · 2 · 7. Which number occupied position three?',
    questionType: 'multiple-choice',
    formatLabel: 'Memory / Flash Recall',
    options: ['2', '4', '7', '9'],
    correctAnswer: '2',
    explanation: 'The third position in the sequence 4, 9, 2, 7 is 2.',
    category: 'Working Memory',
    difficulty: 'Time-Pressure',
    status: 'published',
  },
  {
    id: 'Q-003',
    testId: 'test-2',
    prompt: 'At a college sports ground in Gwalior, your group has ten minutes left and two members are speaking over each other. What do you do?',
    questionType: 'situation',
    formatLabel: 'Situation Reaction (SRT)',
    options: [
      'Summarise the shared point, suggest a next step, and invite one quieter voice.',
      'Wait silently because interrupting will create more friction.',
      'Raise your voice louder to force both members to stop.',
      'Ask the ground coordinator to step in and handle them.',
    ],
    correctAnswer: 'Summarise the shared point, suggest a next step, and invite one quieter voice.',
    explanation: 'Demonstrates active leadership, conflict resolution, and group facilitation (Factor 3: Influence).',
    category: 'Social Effectiveness',
    difficulty: 'Operational',
    status: 'published',
  },
];

// Student Profile Management
export function getStudentUser(): StudentUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStudentUser(user: StudentUser): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  // Also sync to registered students list
  const all = getAllStudents();
  const exists = all.findIndex((s) => s.id === user.id || s.email === user.email);
  if (exists >= 0) {
    all[exists] = { ...all[exists], ...user, lastLoginAt: new Date().toISOString() };
  } else {
    all.push(user);
  }
  localStorage.setItem(STORAGE_KEYS.ALL_STUDENTS, JSON.stringify(all));
}

export function clearStudentUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function getAllStudents(): StudentUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ALL_STUDENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ALL_STUDENTS, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_STUDENTS;
  }
}

// Attempts Management
export function getStudentAttempts(): AssessmentAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAssessmentAttempt(
  testSlug: 'csss' | 'opam' | string,
  testName: string,
  score: number,
  percentage: number,
  answersSummary?: any
): AssessmentAttempt {
  const user = getStudentUser();
  const attempt: AssessmentAttempt = {
    attemptId: crypto.randomUUID(),
    studentCode: user ? user.studentCode : 'CADET-' + Math.floor(1000 + Math.random() * 9000),
    fullName: user ? user.fullName : 'Guest Aspirant',
    testSlug,
    testName,
    score,
    percentage,
    completedAt: new Date().toISOString(),
    answersSummary,
  };

  const attempts = getStudentAttempts();
  attempts.unshift(attempt);
  localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  return attempt;
}

// Managed Tests Management
export function getManagedTests(): ManagedTest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_TESTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_TESTS, JSON.stringify(INITIAL_TESTS));
      return INITIAL_TESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TESTS;
  }
}

export function saveManagedTest(test: ManagedTest): void {
  const tests = getManagedTests();
  const idx = tests.findIndex((t) => t.id === test.id);
  if (idx >= 0) {
    tests[idx] = test;
  } else {
    tests.push({ ...test, id: test.id || `test-${Date.now()}` });
  }
  localStorage.setItem(STORAGE_KEYS.ADMIN_TESTS, JSON.stringify(tests));
}

// Managed Questions Management
export function getManagedQuestions(): ManagedQuestion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_QUESTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
      return INITIAL_QUESTIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_QUESTIONS;
  }
}

export function saveManagedQuestion(q: ManagedQuestion): void {
  const questions = getManagedQuestions();
  const idx = questions.findIndex((item) => item.id === q.id);
  if (idx >= 0) {
    questions[idx] = q;
  } else {
    questions.push({ ...q, id: q.id || `Q-${Date.now().toString().slice(-4)}` });
  }
  localStorage.setItem(STORAGE_KEYS.ADMIN_QUESTIONS, JSON.stringify(questions));
}

// Admin Authentication
export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
}

export function setAdminAuthenticated(auth: boolean): void {
  if (auth) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  }
}

// CSV Export Utilities
function escapeCSV(val: any): string {
  const str = String(val ?? '');
  return `"${str.replace(/"/g, '""')}"`;
}

export function exportStudentsCSV(): void {
  const students = getAllStudents();
  const headers = ['Cadet ID', 'Full Name', 'Email', 'Mobile', 'Defence Entry', 'Education Level', 'Previous SSB', 'Registered Date'];
  const rows = students.map((s) => [
    s.studentCode,
    s.fullName,
    s.email,
    s.mobile,
    s.defenceEntry,
    s.educationLevel,
    s.previousSsbExperience,
    new Date(s.createdAt).toLocaleDateString(),
  ]);

  const csvContent =
    '\uFEFF' +
    [headers, ...rows]
      .map((r) => r.map(escapeCSV).join(','))
      .join('\r\n');

  downloadBlob(csvContent, 'soda-cadets-register.csv', 'text/csv;charset=utf-8');
}

export function exportAssessmentsCSV(): void {
  const attempts = getStudentAttempts();
  const headers = ['Attempt ID', 'Cadet ID', 'Candidate Name', 'Assessment Battery', 'Raw Score', 'Percentage', 'Timestamp'];
  const rows = attempts.map((a) => [
    a.attemptId,
    a.studentCode,
    a.fullName,
    a.testName,
    a.score,
    `${a.percentage}%`,
    new Date(a.completedAt).toLocaleString(),
  ]);

  const csvContent =
    '\uFEFF' +
    [headers, ...rows]
      .map((r) => r.map(escapeCSV).join(','))
      .join('\r\n');

  downloadBlob(csvContent, 'soda-assessment-logs.csv', 'text/csv;charset=utf-8');
}

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
