import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { CadetDashboardPage } from './pages/CadetDashboardPage';
import { CadetAuthGate } from './components/CadetAuthGate';
import { HomePage } from './pages/HomePage';
import { CSSSPage } from './pages/CSSSPage';
import { OPAMPage } from './pages/OPAMPage';
import { WrittenPracticePage } from './pages/WrittenPracticePage';
import { FieldBriefsPage } from './pages/FieldBriefsPage';
import { FieldGuidesPage } from './pages/FieldGuidesPage';
import { FounderPage } from './pages/FounderPage';
import { AdminPage } from './pages/AdminPage';
import { getStudentUser, StudentUser, clearStudentUser } from './lib/storage';
import { Shield, ArrowRight } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <span className="font-mono text-xs text-gold uppercase tracking-widest mb-2">
        // 404 NAVIGATION ANOMALY
      </span>
      <h1 className="font-sans text-4xl text-ink font-bold mb-3">
        Out of Operational Bounds
      </h1>
      <p className="text-sm text-ink-3 max-w-md mb-6">
        The tactical grid coordinates you requested do not exist in the academy register.
      </p>
      <a
        href="/"
        className="bg-navy-1 text-cream-1 font-mono text-xs font-bold uppercase tracking-wider py-3 px-6 rounded shadow-sm hover:bg-navy-3"
      >
        Return to Cadet Command
      </a>
    </div>
  );
}

export function App() {
  const [cadetUser, setCadetUser] = useState<StudentUser | null>(getStudentUser());
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Keep cadet session synchronized with local storage
    const current = getStudentUser();
    setCadetUser(current);
  }, [location]);

  const handleAuthSuccess = (cadet: StudentUser) => {
    setCadetUser(cadet);
    setLocation('/');
  };

  const handleSignOut = () => {
    clearStudentUser();
    setCadetUser(null);
    setLocation('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-1 text-ink font-sans">
      <Switch>
        {/* Admin Console Routes (Self-contained console header) */}
        <Route path="/admin">
          <AdminPage section="dashboard" />
        </Route>
        <Route path="/admin/dashboard">
          <AdminPage section="dashboard" />
        </Route>
        <Route path="/admin/students">
          <AdminPage section="students" />
        </Route>
        <Route path="/admin/tests">
          <AdminPage section="tests" />
        </Route>
        <Route path="/admin/questions">
          <AdminPage section="questions" />
        </Route>

        {/* Dedicated Cadet Login & Registration Route */}
        <Route path="/login">
          <CadetAuthGate onSuccess={handleAuthSuccess} />
        </Route>

        {/* Dedicated Cadet Dashboard Route */}
        <Route path="/dashboard">
          {cadetUser ? (
            <CadetDashboardPage
              onSignOut={handleSignOut}
              onOpenPublicView={() => setLocation('/public')}
            />
          ) : (
            <CadetAuthGate onSuccess={handleAuthSuccess} />
          )}
        </Route>

        {/* Root Route: If logged in -> Cadet Dashboard, otherwise -> Cadet Auth / Registration Gate */}
        <Route path="/">
          {cadetUser ? (
            <CadetDashboardPage
              onSignOut={handleSignOut}
              onOpenPublicView={() => setLocation('/public')}
            />
          ) : (
            <CadetAuthGate onSuccess={handleAuthSuccess} />
          )}
        </Route>

        {/* Public Academy Showcase Route */}
        <Route path="/public">
          <SiteHeader />
          <main className="flex-1">
            <HomePage />
          </main>
          <SiteFooter />
        </Route>

        {/* Public Assessment & Resource Routes */}
        <Route>
          <SiteHeader />
          <main className="flex-1">
            <Switch>
              <Route path="/csss" component={CSSSPage} />
              <Route path="/opam" component={OPAMPage} />
              <Route path="/tests" component={WrittenPracticePage} />
              <Route path="/briefs" component={FieldBriefsPage} />
              <Route path="/guides" component={FieldGuidesPage} />
              <Route path="/founder" component={FounderPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
          <SiteFooter />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
