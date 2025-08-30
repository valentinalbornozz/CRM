import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { useToast } from './components/modals/Toast';
import questConfig from './config/questConfig';

// Auth Components
import LoginPage from './components/auth/LoginPage';
import OnboardingPage from './components/auth/OnboardingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Page Components
import PropAccounts from './pages/PropAccounts';
import AccountsAnalytics from './pages/AccountsAnalytics';
import Customers from './pages/Customers';
import Affiliates from './pages/Affiliates';
import TraderArea from './pages/TraderArea';
import RiskManagement from './pages/RiskManagement';
import PayoutRequests from './pages/PayoutRequests';
import Integrations from './pages/Integrations';
import Notifications from './pages/Notifications';
import BackOffice from './pages/BackOffice';

import './App.css';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const { ToastContainer } = useToast();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-ping"></div>
          </div>
          <p className="text-gray-600">Loading PropFirm CRM...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/onboarding" 
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Main Application Routes */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 ml-64 pt-16">
                    <Routes>
                      <Route path="/" element={<PropAccounts />} />
                      <Route path="/prop-accounts" element={<PropAccounts />} />
                      <Route path="/accounts-analytics" element={<AccountsAnalytics />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/affiliates" element={<Affiliates />} />
                      <Route path="/trader-area" element={<TraderArea />} />
                      <Route path="/risk-management" element={<RiskManagement />} />
                      <Route path="/payouts" element={<PayoutRequests />} />
                      <Route path="/integrations" element={<Integrations />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/back-office" element={<BackOffice />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </QuestProvider>
  );
}

export default App;