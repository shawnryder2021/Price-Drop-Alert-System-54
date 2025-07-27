// Simple localStorage-based storage for demo purposes
// In production, this would connect to a real database

const NOTIFICATIONS_KEY = 'priceDropNotifications';
const CARS_KEY = 'carsData';
const WEBHOOK_URL = 'https://cloud.activepieces.com/api/v1/webhooks/H1OjUTc7VfBnkghRO9N4P';

// Initialize cars data if not exists
export const initializeCarsData = () => {
  const existingCars = localStorage.getItem(CARS_KEY);
  if (!existingCars) {
    const { sampleCars } = require('../data/sampleData');
    localStorage.setItem(CARS_KEY, JSON.stringify(sampleCars));
  }
};

export const getStoredNotifications = () => {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading notifications:', error);
    return [];
  }
};

export const saveNotification = (notification) => {
  try {
    const existing = getStoredNotifications();
    const updated = [...existing, notification];
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    
    // Log for demonstration purposes
    if (notification.isGlobalAlert) {
      console.log(`🔔 NEW GLOBAL PRICE ALERT SUBSCRIPTION: ${notification.email}`);
      
      // Send to webhook
      const webhookData = {
        type: 'price_drop_subscription',
        data: {
          name: notification.name,
          email: notification.email,
          phone: notification.phone || 'Not provided',
          subscriptionType: notification.isGlobalAlert ? 'global' : 'specific',
          timestamp: new Date().toISOString()
        }
      };
      
      console.log('📤 WEBHOOK PAYLOAD:', webhookData);
      
      // Send to the provided webhook URL
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      })
      .then(response => {
        if (response.ok) {
          console.log('✅ Webhook notification sent successfully');
        } else {
          console.error('❌ Failed to send webhook notification', response.status);
        }
      })
      .catch(error => {
        console.error('❌ Error sending webhook notification:', error);
      });
    }
    
    return notification;
  } catch (error) {
    console.error('Error saving notification:', error);
    throw error;
  }
};

export const getStoredCars = () => {
  try {
    initializeCarsData();
    const stored = localStorage.getItem(CARS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading cars data:', error);
    return [];
  }
};

export const updateCarPrice = (carId, newPrice) => {
  try {
    const cars = getStoredCars();
    const carIndex = cars.findIndex(car => car.id === carId);
    
    if (carIndex === -1) {
      throw new Error('Car not found');
    }
    
    const oldPrice = cars[carIndex].price;
    cars[carIndex].price = newPrice;
    
    // Save updated cars
    localStorage.setItem(CARS_KEY, JSON.stringify(cars));
    
    // If price decreased, trigger notifications
    if (newPrice < oldPrice) {
      triggerPriceDropAlerts(carId, newPrice, oldPrice);
    }
    
    return cars;
  } catch (error) {
    console.error('Error updating car price:', error);
    throw error;
  }
};

const triggerPriceDropAlerts = (carId, newPrice, oldPrice) => {
  try {
    const notifications = getStoredNotifications();
    const car = getStoredCars().find(car => car.id === carId);
    const carDetails = car ? `${car.year} ${car.make} ${car.model}` : 'Unknown vehicle';
    
    const updatedNotifications = notifications.map(notification => {
      // Check if this notification should be triggered
      // Either it's for this specific car or it's a global alert for all inventory
      if ((notification.carId === carId || notification.carId === 'all') && notification.status === 'active') {
        // In a real app, this would send an actual email/SMS
        console.log(`🚨 PRICE DROP ALERT SENT TO ${notification.email}`);
        console.log(`${carDetails} price dropped from $${oldPrice.toLocaleString()} to $${newPrice.toLocaleString()}`);
        
        // Send to webhook
        const webhookData = {
          type: 'price_drop_alert',
          data: {
            recipient: {
              name: notification.name,
              email: notification.email,
              phone: notification.phone || 'Not provided'
            },
            vehicle: carDetails,
            priceChange: {
              oldPrice: oldPrice,
              newPrice: newPrice,
              difference: oldPrice - newPrice,
              percentageReduction: ((oldPrice - newPrice) / oldPrice * 100).toFixed(1)
            },
            timestamp: new Date().toISOString()
          }
        };
        
        console.log('📤 WEBHOOK PAYLOAD:', webhookData);
        
        // Send to the provided webhook URL
        fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookData)
        })
        .then(response => {
          if (response.ok) {
            console.log('✅ Webhook alert sent successfully');
          } else {
            console.error('❌ Failed to send webhook alert', response.status);
          }
        })
        .catch(error => {
          console.error('❌ Error sending webhook alert:', error);
        });
        
        return {
          ...notification,
          status: 'sent',
          alertSentAt: new Date().toISOString(),
          priceDropAmount: oldPrice - newPrice,
          newPrice: newPrice,
          vehicle: carDetails
        };
      }
      return notification;
    });
    
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications));
  } catch (error) {
    console.error('Error triggering price drop alerts:', error);
  }
};

// Function to update all prices (for demo purposes)
export const applyInventoryWideDiscount = (discountPercentage) => {
  try {
    const cars = getStoredCars();
    const updatedCars = cars.map(car => {
      const oldPrice = car.price;
      const newPrice = Math.round(oldPrice * (1 - discountPercentage / 100));
      
      // If price decreased, trigger notifications for this car
      if (newPrice < oldPrice) {
        triggerPriceDropAlerts(car.id, newPrice, oldPrice);
      }
      
      return {
        ...car,
        price: newPrice
      };
    });
    
    localStorage.setItem(CARS_KEY, JSON.stringify(updatedCars));
    return updatedCars;
  } catch (error) {
    console.error('Error applying inventory-wide discount:', error);
    throw error;
  }
};