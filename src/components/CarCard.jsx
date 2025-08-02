import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiSettings, FiNavigation } = FiIcons;

const CarCard = ({ car }) => {
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
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View Details
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Want to sell your car instead?</p>
            <p className="text-sm text-green-600 font-medium">
              💰 Use our widget to get an instant cash offer!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;