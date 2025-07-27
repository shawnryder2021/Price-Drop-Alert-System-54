import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiDollarSign, FiTrendingDown } = FiIcons;

const PriceUpdateModal = ({ car, onUpdate, onClose }) => {
  const [newPrice, setNewPrice] = useState(car.price);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPrice <= 0) {
      setError('Price must be greater than 0');
      return;
    }
    
    if (newPrice === car.price) {
      setError('New price must be different from current price');
      return;
    }
    
    onUpdate(car.id, newPrice);
  };

  const priceChange = newPrice - car.price;
  const isDecrease = priceChange < 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Update Price</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Car Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-1">
              {car.year} {car.make} {car.model}
            </h3>
            <p className="text-sm text-gray-600">
              Current Price: ${car.price.toLocaleString()}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPrice" className="block text-sm font-medium text-gray-700 mb-2">
                New Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="newPrice"
                  value={newPrice}
                  onChange={(e) => {
                    setNewPrice(Number(e.target.value));
                    setError('');
                  }}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter new price"
                  min="1"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            {/* Price Change Preview */}
            {newPrice !== car.price && (
              <div className={`p-3 rounded-lg ${isDecrease ? 'bg-green-50' : 'bg-orange-50'}`}>
                <div className="flex items-center">
                  {isDecrease && (
                    <SafeIcon icon={FiTrendingDown} className="w-4 h-4 text-green-600 mr-2" />
                  )}
                  <span className={`text-sm font-medium ${isDecrease ? 'text-green-800' : 'text-orange-800'}`}>
                    {isDecrease ? 'Price Decrease: ' : 'Price Increase: '}
                    {isDecrease ? '-' : '+'}${Math.abs(priceChange).toLocaleString()}
                  </span>
                </div>
                {isDecrease && (
                  <p className="text-xs text-green-700 mt-1">
                    This will trigger price drop alerts for interested customers
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Update Price
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PriceUpdateModal;