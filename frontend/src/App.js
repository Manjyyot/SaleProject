import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import AddLeadPage from './pages/AddLeadPage';
import LeadProfilePage from './pages/LeadProfilePage';
import ProcessOutcomePage from './pages/ProcessOutcomePage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add-lead" element={<AddLeadPage />} />
        <Route path="/lead-profile/:id" element={<LeadProfilePage />} />
        <Route path="/process-outcome/:id" element={<ProcessOutcomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;