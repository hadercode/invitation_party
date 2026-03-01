import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import AdminView from './features/admin/AdminView';
import AccessPage from './features/access/pages/AccessPage';
import InvitationDetailPage from './features/invitation/pages/InvitationDetailPage';
import InvitationManagementPage from './features/invitation/pages/InvitationManagementPage';

/**
 * Main App Component
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<AdminView />} />
          <Route path="/access" element={<AccessPage />} />
          <Route path="/invitation/:code" element={<InvitationDetailPage />} />
          <Route path="/invitation/manage" element={<InvitationManagementPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <footer style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
          &copy; 2026 Party Maker App | Diseñado con Estilo
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
