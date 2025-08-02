import React, { useState } from 'react';
import CarCard from '../components/CarCard';
import { sampleCars } from '../data/sampleData';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiExternalLink } = FiIcons;

const InventoryPage = () => {
  const [cars] = useState(sampleCars);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">Premium Auto Gallery</h1>
                <div className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Powered by Shawn Ryder Digital
                </div>
              </div>
              <p className="text-gray-600 mt-1">Find your perfect vehicle - We also buy cars!</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://shawnryder.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
              >
                Visit Shawn Ryder Digital
                <SafeIcon icon={FiExternalLink} className="ml-1 w-4 h-4" />
              </a>
              <a
                href="#/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Admin Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Call-to-Action Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <p className="text-lg font-medium">
              💰 Looking to sell your car? Get an instant cash offer! 
              <span className="ml-2 text-green-200">Check out our floating widget ←</span>
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Current Inventory</h2>
          <p className="text-gray-600">Browse our selection of quality pre-owned vehicles</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </main>

      {/* Footer with Branding */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Premium Auto Gallery. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-gray-700 font-medium">Powered by</p>
              <a
                href="https://shawnryder.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center font-bold"
              >
                Shawn Ryder Digital
                <SafeIcon icon={FiExternalLink} className="ml-1 w-4 h-4" />
              </a>
              <p className="text-gray-500 text-xs mt-1">Automotive Digital Marketing Solutions</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InventoryPage;