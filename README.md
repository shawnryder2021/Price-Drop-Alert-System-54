# Car Selling Widget - Integration Guide

This lightweight widget can be embedded on any website to collect information from customers looking to sell their vehicles to your dealership.

## Features

- 🚗 **Vehicle Information Collection** - Year, make, model, mileage, and condition
- 👤 **Contact Details** - Name, email, and phone number
- 📝 **Additional Details** - Optional field for features, maintenance history, and notes
- 🔔 **Webhook Integration** - Automatically sends lead data to your system
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🎨 **Customizable** - Change colors, position, and text to match your brand

## Quick Start

### 1. Download the Script

Download the `sell-car-widget.js` file from this folder.

### 2. Configure Your Settings

Open the `sell-car-widget.js` file and edit the configuration section at the top:

```javascript
const config = {
  dealershipName: "Premium Auto Gallery", // Your dealership name
  webhookUrl: "https://cloud.activepieces.com/api/v1/webhooks/H1OjUTc7VfBnkghRO9N4P", // Your webhook URL
  accentColor: "#3b82f6", // Primary color (default: blue)
  position: "bottom-left", // Options: bottom-left, bottom-right, top-left, top-right
  buttonText: "Sell Your Car", // Text on the floating button
  logoUrl: "" // Optional: URL to your logo image
};
```

### 3. Add to Your Website

Host the `sell-car-widget.js` file on your server or a CDN, then add it to your website using a script tag:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

That's it! The widget will automatically appear on your website.

## Data Collected

When a visitor submits the form, the following data is sent to your webhook:

```json
{
  "type": "car_selling_inquiry",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "vehicle": {
      "year": "2020",
      "make": "Toyota",
      "model": "Camry",
      "mileage": 45000,
      "condition": "Good",
      "details": "Well maintained, recent oil change, new tires"
    },
    "dealership": "Premium Auto Gallery",
    "timestamp": "2023-05-25T12:34:56.789Z",
    "source": "https://yourdealership.com"
  }
}
```

## Integration Examples

### WordPress

Add this to your theme's footer or use a custom HTML block:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

### Shopify

1. Go to Online Store > Themes > Edit Code
2. Open `theme.liquid`
3. Add this before the closing `</body>` tag:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

### Wix

1. Add an HTML Code element to your page
2. Paste this code:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

### Squarespace

1. Add a Code Block to your page
2. Paste this code:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

## Customization Options

### Change Position

Modify the `position` property to one of:
- `bottom-left` (default)
- `bottom-right`
- `top-left`
- `top-right`

### Change Colors

Set the `accentColor` to any hex color code (e.g., `#ff0000` for red).

### Add Your Logo

Set the `logoUrl` to the URL of your logo image.

### Custom Button Text

Change the `buttonText` to match your brand voice.

## Vehicle Makes Supported

The widget includes popular car makes:
- Acura, Audi, BMW, Buick, Cadillac
- Chevrolet, Chrysler, Dodge, Ford, GMC
- Honda, Hyundai, Infiniti, Jaguar, Jeep
- Kia, Land Rover, Lexus, Lincoln, Mazda
- Mercedes-Benz, Mitsubishi, Nissan, Porsche
- Ram, Subaru, Tesla, Toyota, Volkswagen
- Volvo, and "Other" option

## Form Validation

The widget includes comprehensive validation:
- All required fields must be filled
- Email format validation
- Phone number requirement
- Vehicle year selection (1990-current)
- Condition rating selection

## Advanced Integration

For advanced customization or to integrate with your CRM:

1. Host the script on your own server
2. Modify the webhook URL to point to your own backend
3. Process the form submissions and store data in your database
4. Set up automated follow-up emails or SMS
5. Integrate with your existing lead management system

## Browser Compatibility

This widget works on all modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android

## Privacy & Security

- All data is transmitted securely via HTTPS
- No personal information is stored locally
- Webhook data is sent only to your specified endpoint
- Privacy notice included in the widget footer

## Support

For technical support or customization requests, please refer to the integration guide or contact your development team.