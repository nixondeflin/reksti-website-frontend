import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AuthorizationPage from "./pages/AuthorizationPage";
import GuestPage from './pages/GuestPage';
import ListAccessPage from './pages/ListAccessPage';
import EmergencyPage from './pages/EmergencyPage';
import { AccessListProvider } from './contexts/AccessListContext';
import { AuthProvider } from './contexts/AuthenticationContext';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import { EmergenciesProvider } from './contexts/EmergenciesContext';
import ResidentPage from './pages/ResidentPage';

const App = () => {
  return (
    <AuthProvider>
      <AccessListProvider>
        <EmergenciesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute element={GuestPage} />} />
            <Route path="/authorization" element={<PrivateRoute element={AuthorizationPage} />} />
            <Route path="/guest" element={<PrivateRoute element={GuestPage} />} />
            <Route path="/list-access" element={<PrivateRoute element={ListAccessPage} />} />
            <Route path="/resident" element={<PrivateRoute element={ResidentPage} />} />
            <Route path="/emergency" element={<PrivateRoute element={EmergencyPage} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
        </EmergenciesProvider>
      </AccessListProvider>
    </AuthProvider>
  );
};

export default App;
