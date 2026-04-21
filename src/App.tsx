import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { IncidentDetailPage } from './pages/IncidentDetail';
import { Dashboard } from './pages/Dashboard';
import { NotFoundPage } from './pages/NotFound';
import { IncidentListPage } from './pages/IncidentList';
import { SettingsPage } from './pages/Settings';

export function App() {
  return (
    <div className="app-shell">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incidents" element={<IncidentListPage />} />
          <Route path="/incidents/:id" element={<IncidentDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Redirect old path → new: */}
          <Route path="/tickets" element={<Navigate to="/incidents" replace />} />
          {/* Catch-all must be LAST: */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="page-footer">
        <p>Footer stub</p>
      </footer>
    </div>
  );
}
