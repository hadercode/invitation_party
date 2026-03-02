import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import AdminView from './features/admin/AdminView';
import AccessPage from './features/access/pages/AccessPage';
import InvitationDetailPage from './features/invitation/pages/InvitationDetailPage';
import InvitationManagementPage from './features/invitation/pages/InvitationManagementPage';
import LoginPage from './features/auth/pages/LoginPage';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import { AuthProvider } from './features/auth/context/AuthContext';

/**
 * Main App Component
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={
              <ProtectedRoute>
                <AdminView />
              </ProtectedRoute>
            } />

            <Route path="/access" element={<AccessPage />} />

            <Route path="/invitation/:code" element={<InvitationDetailPage />} />

            <Route path="/invitation/manage" element={
              <ProtectedRoute>
                <InvitationManagementPage />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <footer style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', position: 'relative', zIndex: 1 }}>
            &copy; 2026 Party Maker App | Diseñado con Estilo
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
