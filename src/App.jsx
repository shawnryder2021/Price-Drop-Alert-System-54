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
        
        {/* Main car selling widget */}
        <FloatingCarSellWidget />
        
        {/* Shawn Ryder Digital Attribution */}
        <div className="fixed bottom-2 right-2 z-30">
          <a 
            href="https://shawnryder.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
          >
            Powered by Shawn Ryder Digital
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;