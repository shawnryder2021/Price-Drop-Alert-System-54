import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import PriceDropWidget from './PriceDropWidget';

const { FiCalendar, FiSettings, FiNavigation, FiBell } = FiIcons;

const CarCard = ({ car }) => {
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      {/* Car Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            ${car.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Car Details */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="text-gray-600 text-sm">{car.trim}</p>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiNavigation} className="w-4 h-4 mr-2 text-blue-600" />
            {car.mileage.toLocaleString()} miles
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2 text-blue-600" />
            {car.transmission}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2 text-blue-600" />
            {car.year}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2 text-blue-600" />
            {car.fuelType}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View Details
          </button>
          <button
            onClick={() => setShowPriceAlert(true)}
            className="flex items-center justify-center px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            title="Get notified if price drops"
          >
            <SafeIcon icon={FiBell} className="w-5 h-5" />
          </button>
        </div>

        {/* Price Drop Alert Text */}
        <button
          onClick={() => setShowPriceAlert(true)}
          className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 transition-colors text-center py-2 hover:bg-blue-50 rounded-lg"
        >
          💰 Notify me if the price drops
        </button>
      </div>

      {/* Price Drop Widget Modal */}
      {showPriceAlert && (
        <PriceDropWidget
          car={car}
          onClose={() => setShowPriceAlert(false)}
        />
      )}
    </motion.div>
  );
};

export default CarCard;