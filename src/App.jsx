import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import AdminDashboard from './pages/AdminDashboard';
import FloatingCarSellWidget from './components/FloatingCarSellWidget';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<InventoryPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        
        {/* Only the car selling widget appears on all pages */}
        <FloatingCarSellWidget />
      </div>
    </Router>
  );
}

export default App;