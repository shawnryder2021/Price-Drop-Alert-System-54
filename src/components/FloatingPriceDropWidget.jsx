import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { saveNotification } from '../utils/storage';

const { FiX, FiBell, FiCheck, FiChevronUp, FiDollarSign } = FiIcons;

const FloatingPriceDropWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    allCars: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Show the widget button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const notification = {
          id: Date.now().toString(),
          carId: formData.allCars ? 'all' : null,
          carDetails: formData.allCars ? 'All inventory' : '',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          status: 'active',
          createdAt: new Date().toISOString(),
          isGlobalAlert: formData.allCars
        };
        
        await saveNotification(notification);
        setIsSubmitted(true);
        
        // Auto close after success
        setTimeout(() => {
          setIsExpanded(false);
          
          // After animation completes, reset form
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              allCars: true,
            });
            setIsSubmitting(false);
          }, 500);
        }, 3000);
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-50"
        >
          {/* Floating Button */}
          {!isExpanded && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <SafeIcon icon={FiBell} className="w-5 h-5" />
              <span className="font-medium">Price Drop Alerts</span>
            </motion.button>
          )}

          {/* Expanded Widget */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-xl shadow-2xl w-80 overflow-hidden border border-gray-100"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white bg-opacity-20 rounded-full">
                        <SafeIcon icon={FiBell} className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">Price Drop Alerts</h3>
                    </div>
                    <button 
                      onClick={() => setIsExpanded(false)}
                      className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                      <SafeIcon icon={FiX} className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-blue-100 text-sm mt-1">
                    Get notified when prices drop!
                  </p>
                </div>

                {/* Content */}
                <div className="p-5">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="floating-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="floating-name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="floating-email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="floating-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="floating-phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          id="floating-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="allCars"
                          name="allCars"
                          checked={formData.allCars}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="allCars" className="ml-2 block text-sm text-gray-700">
                          Alert me about any price drops across all inventory
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center text-sm"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <>
                            <SafeIcon icon={FiBell} className="w-4 h-4 mr-2" />
                            Sign Up for Price Alerts
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* Success State */
                    <div className="text-center py-4">
                      <div className="p-3 bg-green-100 rounded-full w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                        <SafeIcon icon={FiCheck} className="w-7 h-7 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">You're All Set!</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        We'll notify you immediately when prices drop on our inventory.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-2 text-left">
                        <p className="text-xs text-blue-800">
                          💡 <strong>Pro tip:</strong> Keep an eye on your inbox for exclusive deals!
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-gray-50 text-xs text-gray-500 text-center">
                  We respect your privacy and will never share your information.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingPriceDropWidget;