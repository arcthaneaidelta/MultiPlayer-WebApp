import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DiscoverPage } from './pages/DiscoverPage';
import { GameEntryPage } from './pages/GameEntryPage';
import { LobbyPage } from './pages/LobbyPage';
import { ActiveGamePage } from './pages/ActiveGamePage';
import { ResultsPage } from './pages/ResultsPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminGamesPage } from './pages/AdminGamesPage';
import { AdminGameEditorPage } from './pages/AdminGameEditorPage';
import { AdminSessionsPage } from './pages/AdminSessionsPage';
import { AdminReportsPage } from './pages/AdminReportsPage';
import { AdminStoreIntegrationPage } from './pages/AdminStoreIntegrationPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { StoreDemoPage } from './pages/StoreDemoPage';
import { InviteLandingPage } from './pages/InviteLandingPage';
import { StorageService } from './services/storageService';

// Scroll to top on navigation change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Admin Route (Simulated auth with fallback to /admin/login)
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = StorageService.isAdminAuthenticated();
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Discover / Landing Experience */}
        <Route path="/" element={<DiscoverPage />} />

        {/* Playable Game Journey */}
        <Route path="/play" element={<GameEntryPage />} />
        <Route path="/play/lobby" element={<LobbyPage />} />
        <Route path="/play/game" element={<ActiveGamePage />} />
        <Route path="/play/results" element={<ResultsPage />} />

        {/* Shopify Purchase Simulation */}
        <Route path="/store-demo" element={<StoreDemoPage />} />
        <Route path="/invite/:code" element={<InviteLandingPage />} />

        {/* Admin Suite */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/games"
          element={
            <ProtectedAdminRoute>
              <AdminGamesPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/games/:id"
          element={
            <ProtectedAdminRoute>
              <AdminGameEditorPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/sessions"
          element={
            <ProtectedAdminRoute>
              <AdminSessionsPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedAdminRoute>
              <AdminReportsPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/store-integration"
          element={
            <ProtectedAdminRoute>
              <AdminStoreIntegrationPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminSettingsPage />
            </ProtectedAdminRoute>
          }
        />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
