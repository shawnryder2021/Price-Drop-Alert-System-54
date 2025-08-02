import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { saveCarSellLead } from '../utils/storage';

const { FiX, FiCar, FiCheck, FiDollarSign } = FiIcons;

const FloatingCarSellWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    year: '',
    make: '',
    model: '',
    mileage: '',
    condition: '',
    vin: '',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const carMakes = [
    'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC',
    'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Lincoln', 'Mazda',
    'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Porsche', 'Ram', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen',
    'Volvo', 'Other'
  ];

  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];

  // Generate years from current year to 1990
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

  // Show the widget button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.make) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.mileage) newErrors.mileage = 'Mileage is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const lead = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle: {
            year: formData.year,
            make: formData.make,
            model: formData.model,
            mileage: parseInt(formData.mileage),
            condition: formData.condition,
            vin: formData.vin || 'Not provided',
            details: formData.details || 'No additional details provided'
          },
          status: 'new',
          createdAt: new Date().toISOString()
        };

        await saveCarSellLead(lead);
        setIsSubmitted(true);

        // Auto close after success
        setTimeout(() => {
          setIsExpanded(false);
          // After animation completes, reset form
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              name: '', email: '', phone: '', year: '', make: '', model: '',
              mileage: '', condition: '', vin: '', details: ''
            });
            setIsSubmitting(false);
          }, 500);
        }, 4000);

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
              className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-full shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:shadow-xl"
            >
              <SafeIcon icon={FiDollarSign} className="w-6 h-6" />
              <div className="text-left">
                <div className="font-bold text-lg">Sell Your Car</div>
                <div className="text-sm opacity-90">Get instant cash offer</div>
              </div>
            </motion.button>
          )}

          {/* Expanded Widget */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, transformOrigin: "bottom left" }}
                animate={{ opacity: 1, scale: 1, transformOrigin: "bottom left" }}
                exit={{ opacity: 0, scale: 0.8, transformOrigin: "bottom left" }}
                className="bg-white rounded-xl shadow-2xl w-96 max-h-[85vh] overflow-y-auto border border-gray-100"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white bg-opacity-20 rounded-full">
                        <SafeIcon icon={FiCar} className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Sell Your Car</h3>
                        <p className="text-green-100 text-sm">Get a competitive cash offer today!</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                      <SafeIcon icon={FiX} className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Personal Information */}
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Your Information</h4>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter your full name"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter your email"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter your phone number"
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Vehicle Details</h4>
                        
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Year *
                              </label>
                              <select
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
                                  errors.year ? 'border-red-500' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Select year</option>
                                {years.map(year => (
                                  <option key={year} value={year}>{year}</option>
                                ))}
                              </select>
                              {errors.year && (
                                <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Make *
                              </label>
                              <select
                                name="make"
                                value={formData.make}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
                                  errors.make ? 'border-red-500' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Select make</option>
                                {carMakes.map(make => (
                                  <option key={make} value={make}>{make}</option>
                                ))}
                              </select>
                              {errors.make && (
                                <p className="text-red-500 text-xs mt-1">{errors.make}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Model *
                            </label>
                            <input
                              type="text"
                              name="model"
                              value={formData.model}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
                                errors.model ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter vehicle model"
                            />
                            {errors.model && (
                              <p className="text-red-500 text-xs mt-1">{errors.model}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              VIN (Vehicle Identification Number)
                            </label>
                            <input
                              type="text"
                              name="vin"
                              value={formData.vin}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm"
                              placeholder="Enter 17-digit VIN (optional but recommended)"
                              maxLength="17"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              VIN helps us provide a more accurate valuation
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mileage (KM) *
                              </label>
                              <input
                                type="number"
                                name="mileage"
                                value={formData.mileage}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
                                  errors.mileage ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter mileage"
                              />
                              {errors.mileage && (
                                <p className="text-red-500 text-xs mt-1">{errors.mileage}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Condition *
                              </label>
                              <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
                                  errors.condition ? 'border-red-500' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Select condition</option>
                                {conditions.map(condition => (
                                  <option key={condition} value={condition}>{condition}</option>
                                ))}
                              </select>
                              {errors.condition && (
                                <p className="text-red-500 text-xs mt-1">{errors.condition}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Additional Details
                            </label>
                            <textarea
                              name="details"
                              value={formData.details}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm"
                              rows="3"
                              placeholder="Tell us about features, maintenance history, any issues, etc."
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium flex items-center justify-center text-sm shadow-lg"
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
                            <SafeIcon icon={FiDollarSign} className="w-5 h-5 mr-2" />
                            Get My Cash Offer Now
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* Success State */
                    <div className="text-center py-6">
                      <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        We've received your vehicle information and will contact you within 24 hours with a competitive cash offer.
                      </p>
                      <div className="bg-green-50 rounded-lg p-3 text-left">
                        <p className="text-xs text-green-800">
                          💰 <strong>Next steps:</strong> Our team will review your vehicle details and prepare a personalized cash offer!
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 text-xs text-gray-500 text-center border-t">
                  <span>We respect your privacy and will never share your information.</span>
                  <div className="mt-1 text-blue-600">
                    <a href="https://shawnryder.com" target="_blank" rel="noopener noreferrer">
                      Powered by Shawn Ryder Digital
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCarSellWidget;