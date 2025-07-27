import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import AdminDashboard from './pages/AdminDashboard';
import FloatingPriceDropWidget from './components/FloatingPriceDropWidget';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<InventoryPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        
        {/* Floating widget appears on all pages */}
        <FloatingPriceDropWidget />
      </div>
    </Router>
  );
}

export default App;