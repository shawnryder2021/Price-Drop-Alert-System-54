import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import PriceUpdateModal from '../components/PriceUpdateModal';
import { getStoredNotifications, getStoredCars, updateCarPrice, applyInventoryWideDiscount, getStoredCarSellLeads, updateCarSellLeadStatus } from '../utils/storage';

const { FiDollarSign, FiBell, FiTrendingDown, FiUsers, FiEdit3, FiArrowLeft, FiPercent, FiGlobe, FiCar, FiPhone, FiMail, FiCalendar, FiEye, FiCheck, FiExternalLink } = FiIcons;

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [cars, setCars] = useState([]);
  const [carSellLeads, setCarSellLeads] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(5);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setNotifications(getStoredNotifications());
    setCars(getStoredCars());
    setCarSellLeads(getStoredCarSellLeads());
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

  const handleLeadStatusUpdate = (leadId, status) => {
    const updatedLeads = updateCarSellLeadStatus(leadId, status);
    setCarSellLeads(updatedLeads);
  };

  const totalLeads = notifications.length;
  const activeAlerts = notifications.filter(n => n.status === 'active').length;
  const sentAlerts = notifications.filter(n => n.status === 'sent').length;
  const globalAlerts = notifications.filter(n => n.carId === 'all').length;
  const carSellLeadsCount = carSellLeads.length;
  const newCarSellLeads = carSellLeads.filter(lead => lead.status === 'new').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="#/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5 mr-2" />
                Back to Inventory
              </a>
              <div className="border-l border-gray-300 pl-4">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                  <div className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Powered by Shawn Ryder Digital
                  </div>
                </div>
                <p className="text-gray-600 mt-1">Manage price alerts, leads, and car selling inquiries</p>
              </div>
            </div>
            <a 
              href="https://shawnryder.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
            >
              Visit Shawn Ryder Digital
              <SafeIcon icon={FiExternalLink} className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('car-selling')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'car-selling' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Car Selling Leads ({newCarSellLeads})
            </button>
            <button
              onClick={() => setActiveTab('price-alerts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'price-alerts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Price Alerts
            </button>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border p-6"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <SafeIcon icon={FiCar} className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Car Sell Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{carSellLeadsCount}</p>
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

              {/* Recent Car Selling Leads */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm border"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <SafeIcon icon={FiCar} className="w-5 h-5 mr-2 text-emerald-600" />
                    Recent Car Selling Leads
                  </h2>
                </div>
                <div className="p-6 max-h-96 overflow-y-auto">
                  {carSellLeads.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No car selling leads yet</p>
                  ) : (
                    <div className="space-y-4">
                      {carSellLeads.slice(0, 5).map((lead) => (
                        <div key={lead.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{lead.name}</h3>
                              <p className="text-sm text-gray-600">{lead.vehicle.year} {lead.vehicle.make} {lead.vehicle.model}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {lead.vehicle.mileage.toLocaleString()} KM • {lead.vehicle.condition}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {lead.status === 'new' ? 'New' : 'Contacted'}
                            </span>
                          </div>
                        </div>
                      ))}
                      {carSellLeads.length > 5 && (
                        <button
                          onClick={() => setActiveTab('car-selling')}
                          className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium py-2"
                        >
                          View All Car Selling Leads
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}

        {activeTab === 'car-selling' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <SafeIcon icon={FiCar} className="w-5 h-5 mr-2 text-emerald-600" />
                Car Selling Leads
              </h2>
            </div>
            <div className="p-6">
              {carSellLeads.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No car selling leads yet</p>
              ) : (
                <div className="space-y-6">
                  {carSellLeads.map((lead) => (
                    <div key={lead.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <SafeIcon icon={FiMail} className="w-4 h-4 mr-1" />
                              {lead.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <SafeIcon icon={FiPhone} className="w-4 h-4 mr-1" />
                              {lead.phone}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {lead.status === 'new' ? 'New Lead' : 'Contacted'}
                          </span>
                          {lead.status === 'new' && (
                            <button
                              onClick={() => handleLeadStatusUpdate(lead.id, 'contacted')}
                              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              <SafeIcon icon={FiCheck} className="w-4 h-4 mr-1" />
                              Mark as Contacted
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Vehicle Details</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Year</p>
                            <p className="font-medium">{lead.vehicle.year}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Make</p>
                            <p className="font-medium">{lead.vehicle.make}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Model</p>
                            <p className="font-medium">{lead.vehicle.model}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Condition</p>
                            <p className="font-medium">{lead.vehicle.condition}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-600">Mileage</p>
                          <p className="font-medium">{lead.vehicle.mileage.toLocaleString()} KM</p>
                        </div>
                        {lead.vehicle.vin && lead.vehicle.vin !== 'Not provided' && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600">VIN</p>
                            <p className="font-medium">{lead.vehicle.vin}</p>
                          </div>
                        )}
                        {lead.vehicle.details && lead.vehicle.details !== 'No additional details provided' && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600">Additional Details</p>
                            <p className="text-sm text-gray-800 mt-1">{lead.vehicle.details}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                          Submitted: {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2">
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <SafeIcon icon={FiMail} className="w-4 h-4 mr-1" />
                            Email
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            <SafeIcon icon={FiPhone} className="w-4 h-4 mr-1" />
                            Call
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'price-alerts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <SafeIcon icon={FiBell} className="w-5 h-5 mr-2 text-orange-600" />
                Price Alert Subscribers
              </h2>
            </div>
            <div className="p-6">
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
                            Interested in: {notification.carId === 'all' ? <span className="font-medium text-purple-600">All inventory</span> : notification.carDetails}
                          </p>
                          <p className="text-xs text-gray-500">
                            Registered: {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              notification.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}
                          >
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
        )}
      </main>

      {/* Footer with Branding */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-8">
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