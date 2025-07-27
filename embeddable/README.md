# Embeddable Price Drop Alert Widget

This lightweight widget can be embedded on any website to collect price drop alert subscriptions from visitors.

## Features

- 🚀 **Easy Integration** - Just add a single script tag to any website
- 🎨 **Customizable** - Change colors, position, and text to match your brand
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🔔 **Price Alerts** - Collect customer information for price drop notifications
- 🌐 **Webhook Integration** - Automatically sends data to your webhook endpoint

## Quick Start

### 1. Download the Script

Download the `widget.js` file from this folder.

### 2. Configure Your Settings

Open the `widget.js` file and edit the configuration section at the top:

```javascript
const config = {
  dealershipName: "Premium Auto Gallery", // Your dealership name
  webhookUrl: "https://cloud.activepieces.com/api/v1/webhooks/H1OjUTc7VfBnkghRO9N4P", // Your webhook URL
  accentColor: "#3b82f6", // Primary color (default: blue)
  position: "bottom-left", // Options: bottom-left, bottom-right, top-left, top-right
  buttonText: "Price Drop Alerts", // Text on the floating button
  logoUrl: "" // Optional: URL to your logo image
};
```

### 3. Add to Your Website

Host the `widget.js` file on your server or a CDN, then add it to your website using a script tag:

```html
<script src="path/to/widget.js" async></script>
```

That's it! The widget will automatically appear on your website.

## Integration Examples

### WordPress

Add this to your theme's footer or use a custom HTML block:

```html
<script src="path/to/widget.js" async></script>
```

### Shopify

1. Go to Online Store > Themes > Edit Code
2. Open `theme.liquid`
3. Add this before the closing `</body>` tag:

```html
<script src="path/to/widget.js" async></script>
```

### Wix

1. Add an HTML Code element to your page
2. Paste this code:

```html
<script src="path/to/widget.js" async></script>
```

### Squarespace

1. Add a Code Block to your page
2. Paste this code:

```html
<script src="path/to/widget.js" async></script>
```

## Webhook Data

When a visitor submits the form, the following data is sent to your webhook:

```json
{
  "type": "price_drop_subscription",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "subscriptionType": "global",
    "dealership": "Premium Auto Gallery",
    "timestamp": "2023-05-25T12:34:56.789Z",
    "source": "https://yourdealership.com/inventory"
  }
}
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

## Advanced Integration

For advanced customization or to integrate with your CRM:

1. Host the script on your own server
2. Modify the webhook URL to point to your own backend
3. Process the form submissions and store data in your database
4. Send notifications to customers when prices drop

## Browser Compatibility

This widget works on all modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android