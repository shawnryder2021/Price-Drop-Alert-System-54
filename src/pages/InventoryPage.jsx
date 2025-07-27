import React, { useState } from 'react';
import CarCard from '../components/CarCard';
import { sampleCars } from '../data/sampleData';

const InventoryPage = () => {
  const [cars] = useState(sampleCars);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Premium Auto Gallery</h1>
              <p className="text-gray-600 mt-1">Find your perfect vehicle</p>
            </div>
            <a 
              href="#/admin" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Inventory Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;