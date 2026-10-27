import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext({});

const LOCAL_STORAGE_USERS_KEY = 'soda_cadet_users';
const LOCAL_STORAGE_SESSION_KEY = 'soda_cadet_session';
const LOCAL_STORAGE_ATTEMPTS_KEY = 'soda_cadet_test_attempts';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Initialize Auth State on Mount
  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await fetchSupabaseProfile(session.user.id);
          }
        } catch (err) {
          console.error('Supabase session initialization error:', err);
        }

        // Listen to Auth State Changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            setUser(session.user);
            await fetchSupabaseProfile(session.user.id);
          } else {
            setUser(null);
            setProfile(null);
          }
          setLoading(false);
        });

        setLoading(false);
        return () => subscription.unsubscribe();
      } else {
        // Local Persistent Engine
        try {
          const rawSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
          if (rawSession) {
            const parsed = JSON.parse(rawSession);
            setUser(parsed.user);
            setProfile(parsed.profile);
          }
        } catch (e) {
          console.error('Local session parse error:', e);
        }
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  // Fetch Profile from Supabase
  const fetchSupabaseProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setProfile(data);
      } else if (error) {
        console.warn('Profile fetch note:', error.message);
      }
    } catch (err) {
      console.error('Error fetching student profile:', err);
    }
  };

  // Sign Up / Account Creation
  const signUp = async ({ email, password, fullName, phone, targetExam }) => {
    setLoading(true);
    setAuthError(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              fullName,
              phone,
              targetExam: targetExam || 'NDA',
            }
          }
        });

        if (error) throw error;

        setUser(data.user);
        setProfile({
          full_name: fullName,
          phone,
          target_exam: targetExam || 'NDA',
          email,
        });

        setLoading(false);
        return { success: true, user: data.user, requiresVerification: !data.session };
      } catch (err) {
        setAuthError(err.message);
        setLoading(false);
        return { success: false, error: err.message };
      }
    } else {
      // Local Database Engine
      try {
        const existingUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
        const duplicate = existingUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (duplicate) {
          throw new Error('An account with this email address is already registered.');
        }

        const newUser = {
          id: 'cadet-' + Date.now(),
          email: email.toLowerCase(),
          passwordHash: btoa(password), // Base-64 token for local mode
          user_metadata: {
            fullName,
            phone,
            targetExam: targetExam || 'NDA',
          },
          created_at: new Date().toISOString()
        };

        const newProfile = {
          id: newUser.id,
          full_name: fullName,
          email: email.toLowerCase(),
          phone,
          target_exam: targetExam || 'NDA',
          role: 'student',
          created_at: newUser.created_at
        };

        existingUsers.push(newUser);
        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(existingUsers));

        // Set Active Session
        const sessionPayload = { user: newUser, profile: newProfile };
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(sessionPayload));

        setUser(newUser);
        setProfile(newProfile);
        setLoading(false);

        return { success: true, user: newUser, localMode: true };
      } catch (err) {
        setAuthError(err.message);
        setLoading(false);
        return { success: false, error: err.message };
      }
    }
  };

  // Sign In / Login
  const signIn = async ({ email, password }) => {
    setLoading(true);
    setAuthError(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        setUser(data.user);
        await fetchSupabaseProfile(data.user.id);
        setLoading(false);
        return { success: true, user: data.user };
      } catch (err) {
        setAuthError(err.message);
        setLoading(false);
        return { success: false, error: err.message };
      }
    } else {
      // Local Database Engine
      try {
        const existingUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
        const matched = existingUsers.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === btoa(password)
        );

        if (!matched) {
          throw new Error('Invalid email or password. Please verify your credentials.');
        }

        const userProfile = {
          id: matched.id,
          full_name: matched.user_metadata?.fullName || 'Cadet',
          email: matched.email,
          phone: matched.user_metadata?.phone || '',
          target_exam: matched.user_metadata?.targetExam || 'NDA',
          role: 'student',
          created_at: matched.created_at
        };

        const sessionPayload = { user: matched, profile: userProfile };
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(sessionPayload));

        setUser(matched);
        setProfile(userProfile);
        setLoading(false);

        return { success: true, user: matched, localMode: true };
      } catch (err) {
        setAuthError(err.message);
        setLoading(false);
        return { success: false, error: err.message };
      }
    }
  };

  // Sign Out
  const signOut = async () => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Sign out error:', e);
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    setUser(null);
    setProfile(null);
    setLoading(false);
  };

  // Save Test Attempt
  const saveTestAttempt = async (attemptData) => {
    const attempt = {
      ...attemptData,
      id: 'attempt-' + Date.now(),
      student_id: user?.id || 'guest',
      student_name: profile?.full_name || 'Cadet Aspirant',
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase && user) {
      try {
        const { error } = await supabase.from('test_attempts').insert([{
          student_id: user.id,
          test_id: attemptData.testId,
          test_title: attemptData.testTitle,
          test_category: attemptData.testCategory,
          score: attemptData.score,
          total_questions: attemptData.totalQuestions,
          accuracy_pct: attemptData.accuracyPct,
          oir_rating: attemptData.oirRating,
          time_taken_seconds: attemptData.timeTakenSeconds,
          answers_json: attemptData.answers,
          status: 'completed'
        }]);
        if (error) console.error('Error saving attempt to Supabase:', error);
      } catch (err) {
        console.error('Supabase test attempt save error:', err);
      }
    }

    // Always mirror to local storage for instant offline / cache access
    try {
      const attempts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ATTEMPTS_KEY) || '[]');
      attempts.unshift(attempt);
      localStorage.setItem(LOCAL_STORAGE_ATTEMPTS_KEY, JSON.stringify(attempts.slice(0, 50)));
    } catch (e) {
      console.error('Local attempt save error:', e);
    }

    return attempt;
  };

  // Get Test Attempts
  const getTestAttempts = async () => {
    if (isSupabaseConfigured && supabase && user) {
      try {
        const { data, error } = await supabase
          .from('test_attempts')
          .select('*')
          .eq('student_id', user.id)
          .order('created_at', { ascending: false });

        if (data && !error) return data;
      } catch (err) {
        console.error('Error loading Supabase attempts:', err);
      }
    }

    // Local fallback
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_ATTEMPTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (user) {
          return parsed.filter(a => a.student_id === user.id || a.student_id === 'guest');
        }
        return parsed;
      }
    } catch {}

    return [];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: Boolean(user),
        loading,
        authError,
        isSupabaseConfigured,
        signUp,
        signIn,
        signOut,
        saveTestAttempt,
        getTestAttempts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
