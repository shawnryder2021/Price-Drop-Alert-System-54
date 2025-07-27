import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import PriceUpdateModal from '../components/PriceUpdateModal';
import { getStoredNotifications, getStoredCars, updateCarPrice, applyInventoryWideDiscount } from '../utils/storage';

const { 
  FiDollarSign, 
  FiBell, 
  FiTrendingDown, 
  FiUsers, 
  FiEdit3, 
  FiArrowLeft, 
  FiPercent,
  FiGlobe
} = FiIcons;

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(5);

  useEffect(() => {
    setNotifications(getStoredNotifications());
    setCars(getStoredCars());
  }, []);

  const handlePriceUpdate = (carId, newPrice) => {
    const updatedCars = updateCarPrice(carId, newPrice);
    setCars(updatedCars);
    setShowPriceModal(false);
    setSelectedCar(null);
    
    // Refresh notifications to see any triggered alerts
    setNotifications(getStoredNotifications());
  };

  const openPriceModal = (car) => {
    setSelectedCar(car);
    setShowPriceModal(true);
  };

  const handleBulkDiscount = () => {
    const updatedCars = applyInventoryWideDiscount(discountPercentage);
    setCars(updatedCars);
    
    // Refresh notifications to see any triggered alerts
    setNotifications(getStoredNotifications());
  };

  const totalLeads = notifications.length;
  const activeAlerts = notifications.filter(n => n.status === 'active').length;
  const sentAlerts = notifications.filter(n => n.status === 'sent').length;
  const globalAlerts = notifications.filter(n => n.carId === 'all').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a 
                href="#/" 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5 mr-2" />
                Back to Inventory
              </a>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage price alerts and leads</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <SafeIcon icon={FiBell} className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{activeAlerts}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <SafeIcon icon={FiTrendingDown} className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alerts Sent</p>
                <p className="text-2xl font-bold text-gray-900">{sentAlerts}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <SafeIcon icon={FiGlobe} className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Global Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">{globalAlerts}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bulk Price Update */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border mb-8"
        >
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiPercent} className="w-5 h-5 mr-2 text-blue-600" />
              Inventory-Wide Price Update
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label htmlFor="discount-percentage" className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="discount-percentage"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    min="1"
                    max="30"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
              <button
                onClick={handleBulkDiscount}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Discount to All Vehicles
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              This will reduce all vehicle prices by the specified percentage and notify all subscribers.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle Price Management */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <SafeIcon icon={FiDollarSign} className="w-5 h-5 mr-2 text-blue-600" />
                Vehicle Pricing
              </h2>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {cars.map((car) => (
                  <div key={car.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{car.year} {car.make} {car.model}</h3>
                      <p className="text-sm text-gray-600">Current: ${car.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => openPriceModal(car)}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <SafeIcon icon={FiEdit3} className="w-4 h-4 mr-1" />
                      Update Price
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Price Alert Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <SafeIcon icon={FiBell} className="w-5 h-5 mr-2 text-orange-600" />
                Price Alert Subscribers
              </h2>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No price alerts registered yet</p>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{notification.name}</h3>
                          <p className="text-sm text-gray-600">{notification.email}</p>
                          {notification.phone && (
                            <p className="text-sm text-gray-600">{notification.phone}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Interested in: {notification.carId === 'all' 
                              ? <span className="font-medium text-purple-600">All inventory</span> 
                              : notification.carDetails}
                          </p>
                          <p className="text-xs text-gray-500">
                            Registered: {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notification.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {notification.status === 'active' ? 'Active' : 'Alert Sent'}
                          </span>
                          
                          {notification.carId === 'all' && (
                            <span className="mt-1 px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                              Global Alert
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Price Update Modal */}
      {showPriceModal && selectedCar && (
        <PriceUpdateModal
          car={selectedCar}
          onUpdate={handlePriceUpdate}
          onClose={() => {
            setShowPriceModal(false);
            setSelectedCar(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;