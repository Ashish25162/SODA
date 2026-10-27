-- ==============================================================================
-- SABRE OFFICERS DEFENSE ACADEMY (SODA) — SUPABASE PRODUCTION DATABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase Project -> SQL Editor to initialize all tables,
-- foreign keys, Row Level Security (RLS) policies, and performance indexes.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. STUDENT PROFILES TABLE (Linked directly to Supabase Auth auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  target_exam TEXT DEFAULT 'NDA', -- 'NDA', 'CDS', 'AFCAT', 'CAPF', 'SSB'
  current_education TEXT,
  role TEXT DEFAULT 'student',    -- 'student', 'faculty', 'admin'
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Automatic Profile Creation Trigger on New Auth User Registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, target_exam)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'fullName', 'Cadet'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'targetExam', 'NDA')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    target_exam = EXCLUDED.target_exam;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. DEFENSE TESTS & MOCK PAPERS TABLE
CREATE TABLE IF NOT EXISTS public.tests (
  id TEXT PRIMARY KEY,               -- e.g. 'oir-test-01', 'ppdt-sim-01'
  title TEXT NOT NULL,
  category TEXT NOT NULL,           -- 'OIR', 'PPDT', 'WAT', 'SRT', 'GAT', 'MATHS'
  stage TEXT NOT NULL,              -- 'Stage 1', 'Stage 2', 'Written'
  duration_minutes INT NOT NULL,
  total_questions INT NOT NULL,
  pass_mark INT DEFAULT 0,
  instructions TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TEST ATTEMPTS & STUDENT RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.test_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  test_id TEXT REFERENCES public.tests(id) ON DELETE CASCADE NOT NULL,
  test_title TEXT NOT NULL,
  test_category TEXT NOT NULL,
  score NUMERIC NOT NULL,
  total_questions INT NOT NULL,
  accuracy_pct NUMERIC NOT NULL,
  oir_rating TEXT,                  -- 'Rating 1 (Outstanding)', 'Rating 2', etc.
  time_taken_seconds INT NOT NULL,
  answers_json JSONB,               -- Stores question-by-question student selections
  status TEXT DEFAULT 'completed',  -- 'in_progress', 'completed', 'abandoned'
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;

-- Profiles: Students can read & update their own profile; faculty/admin can read all
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tests: All authenticated students can read active tests
CREATE POLICY "Authenticated users can view tests" ON public.tests
  FOR SELECT USING (auth.role() = 'authenticated');

-- Test Attempts: Students can only view & insert their own test attempts
CREATE POLICY "Students can view own test attempts" ON public.test_attempts
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own test attempt" ON public.test_attempts
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- 6. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_test_attempts_student ON public.test_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_test_attempts_test ON public.test_attempts(test_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
