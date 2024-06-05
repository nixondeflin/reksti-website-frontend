import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AuthorizationPage from "./pages/AuthorizationPage";
import GuestPage from './pages/GuestPage';
import ListAccessPage from './pages/ListAccessPage';
import EmergencyPage from './pages/EmergencyPage';
import { AccessListProvider } from './contexts/AccessListContext';

const App = () => {
  return (
    <AccessListProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GuestPage />} />
          <Route path="/authorization" element={<AuthorizationPage/>} />
          <Route path="/guest" element={<GuestPage />} />
          <Route path="/list-access" element={<ListAccessPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AccessListProvider>
  );
};

export default App;
