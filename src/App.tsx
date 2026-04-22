import { Outlet, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { IncidentDetailPage } from './pages/IncidentDetail';
import { Dashboard } from './pages/Dashboard';
import { NotFoundPage } from './pages/NotFound';
import { IncidentListPage } from './pages/IncidentList';
import { SettingsPage } from './pages/Settings';
import { IncidentEditPage } from './pages/IncidentEdit';
import { ThemeProvider } from './context/ThemeContext';

function AppShell() {
  return (
    <div className="app-shell">
      <Header />

      <main>
        <Outlet />
      </main>

      <footer className="page-footer">
        <p>Footer stub</p>
      </footer>
    </div>
  );
}

function AppShell2() {
  return (
    <>
      <div className="app-shell">
        <h1>Hallo Welt</h1>

        <main>
          <Outlet />
        </main>
      </div>

      <footer className="page-footer">
        <p>Footer stub</p>
      </footer>
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="incidents" element={<IncidentListPage />} />
          <Route path="incidents/:id" element={<IncidentDetailPage />} />
          <Route path="incidents/:id/edit" element={<IncidentEditPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/" element={<AppShell2 />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
