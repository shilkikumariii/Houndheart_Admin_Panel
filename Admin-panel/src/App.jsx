import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import ContentModerationPage from './pages/ContentModerationPage';
import HealingCirclesPage from './pages/HealingCirclesPage';
import ExpertQueriesPage from './pages/ExpertQueriesPage';
import SacredGuidePage from './pages/SacredGuidePage';
import UploadSacredGuidePage from './pages/UploadSacredGuidePage';
import SettingsPage from './pages/SettingsPage';
import GenericModulePage from './pages/GenericModulePage';

import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<AdminDashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/content" element={<ContentModerationPage />} />
          <Route path="/healing-circles" element={<HealingCirclesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/queries" element={<ExpertQueriesPage />} />
          <Route path="/sacred-guide" element={<SacredGuidePage />} />
          <Route path="/sacred-guide/upload" element={<UploadSacredGuidePage />} />
          <Route path="/analytics" element={<GenericModulePage title="Analytics" description="Platform growth and engagement metrics" />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;