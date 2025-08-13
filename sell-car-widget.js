/**
 * Sell Your Car Widget - Standalone embeddable widget
 * Version: 1.0.0
 * 
 * This standalone widget can be embedded on any website to collect
 * information from people looking to sell their cars to dealerships.
 */
(function() {
  // Configuration - EDIT THESE VALUES
  const config = {
    dealershipName: "Premium Auto Gallery", // Your dealership name
    webhookUrl: "https://cloud.activepieces.com/api/v1/webhooks/H1OjUTc7VfBnkghRO9N4P", // Your webhook URL
    accentColor: "#3b82f6", // Primary color (default: blue)
    position: "bottom-left", // Options: bottom-left, bottom-right, top-left, top-right
    buttonText: "Sell Your Car", // Text on the floating button
    logoUrl: "" // Optional: URL to your logo image
  };

  // Create and inject CSS
  const style = document.createElement('style');
  style.textContent = `
    .sc-widget-container * {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    .sc-widget-container {
      position: fixed;
      z-index: 999999;
      ${config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
      ${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .sc-widget-button {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: ${config.accentColor};
      color: white;
      border: none;
      border-radius: 100px;
      padding: 12px 16px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, background-color 0.2s;
      outline: none;
    }
    
    .sc-widget-button:hover {
      transform: translateY(-2px);
      background-color: ${adjustColor(config.accentColor, -20)};
    }
    
    .sc-widget-modal {
      position: fixed;
      bottom: ${config.position.includes('bottom') ? '80px' : 'auto'};
      top: ${config.position.includes('top') ? '80px' : 'auto'};
      ${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      width: 380px;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      z-index: 999999;
      opacity: 0;
      transform: scale(0.95);
      transform-origin: ${config.position};
      pointer-events: none;
      transition: opacity 0.2s, transform 0.2s;
      border: 1px solid rgba(0, 0, 0, 0.1);
      max-height: 90vh;
      overflow-y: auto;
    }
    
    .sc-widget-modal.active {
      opacity: 1;
      transform: scale(1);
      pointer-events: all;
    }
    
    .sc-widget-header {
      background: linear-gradient(to right, ${config.accentColor}, ${adjustColor(config.accentColor, 20)});
      color: white;
      padding: 16px;
      position: relative;
    }
    
    .sc-widget-title {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0 0 4px 0;
      font-size: 18px;
      font-weight: 600;
    }
    
    .sc-widget-subtitle {
      font-size: 14px;
      opacity: 0.9;
      margin: 0;
    }
    
    .sc-widget-close {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }
    
    .sc-widget-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    .sc-widget-body {
      padding: 16px;
    }
    
    .sc-widget-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .sc-widget-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .sc-widget-label {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
    
    .sc-widget-input {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      width: 100%;
      transition: border-color 0.2s;
    }
    
    .sc-widget-input:focus {
      outline: none;
      border-color: ${config.accentColor};
      box-shadow: 0 0 0 2px ${config.accentColor}20;
    }
    
    .sc-widget-select {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      width: 100%;
      transition: border-color 0.2s;
      background-color: white;
    }
    
    .sc-widget-select:focus {
      outline: none;
      border-color: ${config.accentColor};
      box-shadow: 0 0 0 2px ${config.accentColor}20;
    }
    
    .sc-widget-textarea {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      width: 100%;
      min-height: 80px;
      resize: vertical;
      transition: border-color 0.2s;
      font-family: inherit;
    }
    
    .sc-widget-textarea:focus {
      outline: none;
      border-color: ${config.accentColor};
      box-shadow: 0 0 0 2px ${config.accentColor}20;
    }
    
    .sc-widget-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    
    .sc-widget-submit {
      background-color: ${config.accentColor};
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 4px;
    }
    
    .sc-widget-submit:hover {
      background-color: ${adjustColor(config.accentColor, -20)};
    }
    
    .sc-widget-footer {
      padding: 12px;
      text-align: center;
      font-size: 11px;
      color: #777;
      background-color: #f9f9f9;
      border-top: 1px solid #eee;
    }
    
    .sc-widget-success {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px;
      text-align: center;
    }
    
    .sc-widget-success-icon {
      width: 48px;
      height: 48px;
      background-color: #ecfdf5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      color: #10b981;
    }
    
    .sc-widget-success h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      color: #333;
    }
    
    .sc-widget-success p {
      margin: 0 0 16px 0;
      font-size: 14px;
      color: #666;
    }
    
    .sc-widget-tip {
      background-color: #f0f7ff;
      border-radius: 8px;
      padding: 12px;
      font-size: 12px;
      color: #1e40af;
      text-align: left;
    }
    
    .sc-error-message {
      color: #dc2626;
      font-size: 12px;
      margin-top: 4px;
    }
    
    .sc-spinner {
      animation: sc-spin 1s linear infinite;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
    }
    
    @keyframes sc-spin {
      to {
        transform: rotate(360deg);
      }
    }
    
    @media (max-width: 480px) {
      .sc-widget-modal {
        width: calc(100% - 40px);
        max-width: 380px;
      }
      
      .sc-widget-row {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);

  // Create widget HTML structure
  function createWidget() {
    const container = document.createElement('div');
    container.className = 'sc-widget-container';

    // Button
    const button = document.createElement('button');
    button.className = 'sc-widget-button';
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
        <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
      </svg>
      ${config.buttonText}
    `;

    // Modal
    const modal = document.createElement('div');
    modal.className = 'sc-widget-modal';
    modal.innerHTML = `
      <div class="sc-widget-header">
        <div class="sc-widget-title">
          <div style="width: 24px; height: 24px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
            </svg>
          </div>
          Sell Your Car
        </div>
        <p class="sc-widget-subtitle">Get a competitive offer for your vehicle!</p>
        <button class="sc-widget-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="sc-widget-body">
        <div class="sc-widget-form-container">
          <form class="sc-widget-form">
            <div class="sc-widget-field">
              <label class="sc-widget-label" for="sc-name">Full Name *</label>
              <input type="text" id="sc-name" class="sc-widget-input" placeholder="Enter your full name" required>
              <div class="sc-error-message" id="sc-name-error"></div>
            </div>
            
            <div class="sc-widget-field">
              <label class="sc-widget-label" for="sc-email">Email Address *</label>
              <input type="email" id="sc-email" class="sc-widget-input" placeholder="Enter your email" required>
              <div class="sc-error-message" id="sc-email-error"></div>
            </div>
            
            <div class="sc-widget-field">
              <label class="sc-widget-label" for="sc-phone">Phone Number *</label>
              <input type="tel" id="sc-phone" class="sc-widget-input" placeholder="Enter your phone number" required>
              <div class="sc-error-message" id="sc-phone-error"></div>
            </div>
            
            <div class="sc-widget-row">
              <div class="sc-widget-field">
                <label class="sc-widget-label" for="sc-year">Year *</label>
                <select id="sc-year" class="sc-widget-select" required>
                  <option value="">Select year</option>
                </select>
                <div class="sc-error-message" id="sc-year-error"></div>
              </div>
              
              <div class="sc-widget-field">
                <label class="sc-widget-label" for="sc-make">Make *</label>
                <select id="sc-make" class="sc-widget-select" required>
                  <option value="">Select make</option>
                  <option value="Acura">Acura</option>
                  <option value="Audi">Audi</option>
                  <option value="BMW">BMW</option>
                  <option value="Buick">Buick</option>
                  <option value="Cadillac">Cadillac</option>
                  <option value="Chevrolet">Chevrolet</option>
                  <option value="Chrysler">Chrysler</option>
                  <option value="Dodge">Dodge</option>
                  <option value="Ford">Ford</option>
                  <option value="GMC">GMC</option>
                  <option value="Honda">Honda</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Infiniti">Infiniti</option>
                  <option value="Jaguar">Jaguar</option>
                  <option value="Jeep">Jeep</option>
                  <option value="Kia">Kia</option>
                  <option value="Land Rover">Land Rover</option>
                  <option value="Lexus">Lexus</option>
                  <option value="Lincoln">Lincoln</option>
                  <option value="Mazda">Mazda</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Ram">Ram</option>
                  <option value="Subaru">Subaru</option>
                  <option value="Tesla">Tesla</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="Volvo">Volvo</option>
                  <option value="Other">Other</option>
                </select>
                <div class="sc-error-message" id="sc-make-error"></div>
              </div>
            </div>
            
            <div class="sc-widget-field">
              <label class="sc-widget-label" for="sc-model">Model *</label>
              <input type="text" id="sc-model" class="sc-widget-input" placeholder="Enter vehicle model" required>
              <div class="sc-error-message" id="sc-model-error"></div>
            </div>
            
            <div class="sc-widget-field">
              <label class="sc-widget-label" for="sc-vin">VIN (Optional)</label>
              <input type="text" id="sc-vin" class="sc-widget-input" placeholder="Enter vehicle identification number">
            </div>
            
            <div class="sc-widget-row">
              <div class="sc-widget-field">
                <label class="sc-widget-label" for="sc-mileage">Mileage (KM) *</label>
                <input type="number" id="sc-mileage" class="sc-widget-input" placeholder="Enter mileage" required>
                <div class="sc-error-message" id="sc-mileage-error"></div>
              </div>
              
              <div class="sc-widget-field">
                <label class="sc-widget-label" for="sc-condition">Condition *</label>
                <select id="sc-condition" class="sc-widget-select" required>
                  <option value="">Select condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
                <div class="sc-error-message" id="sc-condition-error"></div>
              </div>
            </div>
            
            <div class="sc-widget-field">
              <label class="sc-widget-label" for="sc-details">Additional Details</label>
              <textarea id="sc-details" class="sc-widget-textarea" placeholder="Tell us about your vehicle's features, maintenance history, any issues, etc."></textarea>
            </div>
            
            <button type="submit" class="sc-widget-submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
              </svg>
              Get My Car Valuation
            </button>
          </form>
        </div>
        
        <div class="sc-widget-success" style="display: none;">
          <div class="sc-widget-success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3>Thank You!</h3>
          <p>We've received your vehicle information and will contact you within 24 hours with a competitive offer.</p>
          <div class="sc-widget-tip">
            💡 <strong>Next steps:</strong> Our team will review your vehicle details and prepare a personalized offer!
          </div>
        </div>
      </div>
      
      <div class="sc-widget-footer">
        We respect your privacy and will never share your information.
      </div>
    `;

    container.appendChild(button);
    container.appendChild(modal);
    document.body.appendChild(container);

    // Populate year dropdown
    const yearSelect = document.getElementById('sc-year');
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1990; year--) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }

    // Add event listeners
    button.addEventListener('click', () => {
      modal.classList.add('active');
    });

    modal.querySelector('.sc-widget-close').addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.querySelector('.sc-widget-form').addEventListener('submit', handleSubmit);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Form submission handler
  async function handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('sc-name');
    const emailInput = document.getElementById('sc-email');
    const phoneInput = document.getElementById('sc-phone');
    const yearInput = document.getElementById('sc-year');
    const makeInput = document.getElementById('sc-make');
    const modelInput = document.getElementById('sc-model');
    const vinInput = document.getElementById('sc-vin');
    const mileageInput = document.getElementById('sc-mileage');
    const conditionInput = document.getElementById('sc-condition');
    const detailsInput = document.getElementById('sc-details');

    // Reset errors
    document.querySelectorAll('.sc-error-message').forEach(el => el.textContent = '');

    // Validate
    let isValid = true;

    if (!nameInput.value.trim()) {
      document.getElementById('sc-name-error').textContent = 'Name is required';
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      document.getElementById('sc-email-error').textContent = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
      document.getElementById('sc-email-error').textContent = 'Please enter a valid email';
      isValid = false;
    }

    if (!phoneInput.value.trim()) {
      document.getElementById('sc-phone-error').textContent = 'Phone number is required';
      isValid = false;
    }

    if (!yearInput.value) {
      document.getElementById('sc-year-error').textContent = 'Year is required';
      isValid = false;
    }

    if (!makeInput.value) {
      document.getElementById('sc-make-error').textContent = 'Make is required';
      isValid = false;
    }

    if (!modelInput.value.trim()) {
      document.getElementById('sc-model-error').textContent = 'Model is required';
      isValid = false;
    }

    if (!mileageInput.value) {
      document.getElementById('sc-mileage-error').textContent = 'Mileage is required';
      isValid = false;
    }

    if (!conditionInput.value) {
      document.getElementById('sc-condition-error').textContent = 'Condition is required';
      isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    const submitButton = e.target.querySelector('.sc-widget-submit');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<div class="sc-spinner"></div> Processing...';
    submitButton.disabled = true;

    try {
      // Prepare data
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        vehicle: {
          year: yearInput.value,
          make: makeInput.value,
          model: modelInput.value.trim(),
          vin: vinInput.value.trim() || 'Not provided',
          mileage: parseInt(mileageInput.value),
          condition: conditionInput.value,
          details: detailsInput.value.trim() || 'No additional details provided'
        },
        dealership: config.dealershipName,
        timestamp: new Date().toISOString(),
        source: window.location.href
      };

      // Send to webhook
      const response = await fetch(config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'car_selling_inquiry',
          data: formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      // Show success message
      const formContainer = document.querySelector('.sc-widget-form-container');
      const successMessage = document.querySelector('.sc-widget-success');
      formContainer.style.display = 'none';
      successMessage.style.display = 'flex';

      // Auto-close after success
      setTimeout(() => {
        const modal = document.querySelector('.sc-widget-modal');
        modal.classList.remove('active');

        // Reset form after a delay
        setTimeout(() => {
          formContainer.style.display = 'block';
          successMessage.style.display = 'none';
          e.target.reset();
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
        }, 500);
      }, 4000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }
  }

  // Helper function to darken/lighten color
  function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => {
      const num = Math.min(Math.max(0, parseInt(color, 16) + amount), 255);
      return ('0' + num.toString(16)).slice(-2);
    });
  }

  // Initialize widget after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();