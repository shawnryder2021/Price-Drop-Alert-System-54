# Car Selling Widget - Integration Guide

This guide provides step-by-step instructions for adding the Car Selling Widget to various website platforms.

## Table of Contents

1. [Basic Integration](#basic-integration)
2. [WordPress Integration](#wordpress-integration)
3. [Shopify Integration](#shopify-integration)
4. [Wix Integration](#wix-integration)
5. [Squarespace Integration](#squarespace-integration)
6. [Dealer-Specific Platforms](#dealer-specific-platforms)
7. [Custom Integration Options](#custom-integration-options)

## Basic Integration

The simplest way to add the widget to any website:

1. Download the `sell-car-widget.js` file
2. Upload it to your web server or hosting service
3. Add this line of code to your website's HTML (typically before the closing `</body>` tag):

```html
<script src="path/to/sell-car-widget.js" async></script>
```

## WordPress Integration

### Method 1: Using a Plugin

1. Install and activate the "Header and Footer Scripts" plugin
2. Go to Settings > Header and Footer Scripts
3. Add this code to the "Scripts in Footer" section:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

### Method 2: Editing Theme Files

1. Go to Appearance > Theme Editor
2. Select your theme's `footer.php` file
3. Add this code before the closing `</body>` tag:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

### Method 3: Using Elementor

1. Edit your page with Elementor
2. Add an "HTML" element
3. Paste this code:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

## Shopify Integration

### Method 1: Theme Editor

1. Go to Online Store > Themes
2. Click "Actions" > "Edit code"
3. Open the `theme.liquid` file
4. Add this code before the closing `</body>` tag:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

### Method 2: Using the Asset Library

1. Go to Online Store > Themes
2. Click "Actions" > "Edit code"
3. Under "Assets", click "Add a new asset"
4. Upload your `sell-car-widget.js` file
5. Add this code to your `theme.liquid` file before the closing `</body>` tag:

```html
<script src="{{ 'sell-car-widget.js' | asset_url }}" async></script>
```

## Wix Integration

### Method 1: Using Custom Code

1. Go to your Wix Editor
2. Click the "+" button to add elements
3. Search for "Custom Code" and add it to your page
4. Paste this code:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

### Method 2: Using Wix Velo

1. Go to your Wix Editor
2. Click "Dev Mode" to open the Velo Editor
3. Go to "Public & Backend" > "masterPage.js"
4. Add this code:

```javascript
$w.onReady(function () {
  const script = document.createElement('script');
  script.src = 'path/to/sell-car-widget.js';
  script.async = true;
  document.body.appendChild(script);
});
```

## Squarespace Integration

1. Go to your Squarespace admin panel
2. Go to Settings > Advanced > Code Injection
3. Add this code to the "Footer" section:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

## Dealer-Specific Platforms

### DealerOn

1. Log in to your DealerOn admin panel
2. Go to Website > Content Editor
3. Click "Edit HTML/CSS"
4. Add this code to the footer section:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

### Dealer.com

1. Log in to your Dealer.com Control Panel
2. Go to Website > Experience Editor
3. Click "Custom HTML/JavaScript"
4. Add this code to the "Site Footer" section:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

### DealerFire

1. Log in to your DealerFire admin panel
2. Go to Website Settings > Custom Code
3. Add this code to the "Footer" section:

```html
<script src="path/to/sell-car-widget.js" async></script>
```

## Custom Integration Options

### Hosting on CDN

For better performance, host the widget.js file on a CDN:

1. Upload the widget.js file to your CDN
2. Use the CDN URL in your script tag:

```html
<script src="https://your-cdn.com/sell-car-widget.js" async></script>
```

### Loading Only on Specific Pages

To load the widget only on inventory pages:

```html
<script>
  if (window.location.pathname.includes('/inventory') || window.location.pathname.includes('/vehicles')) {
    const script = document.createElement('script');
    script.src = 'path/to/sell-car-widget.js';
    script.async = true;
    document.body.appendChild(script);
  }
</script>
```

### Passing Additional Parameters

To pass additional parameters to the widget:

```html
<script>
  window.sellCarWidgetConfig = {
    dealershipName: "Custom Dealership Name",
    accentColor: "#ff0000"
  };
</script>
<script src="path/to/sell-car-widget.js" async></script>
```

### Callback Functions

To execute code after the widget loads or when a form is submitted:

```html
<script>
  window.sellCarWidgetCallbacks = {
    onLoad: function() {
      console.log("Widget loaded successfully");
    },
    onSubmit: function(data) {
      console.log("Form submitted:", data);
      
      // Track conversion in Google Analytics
      gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
      });
    }
  };
</script>
<script src="path/to/sell-car-widget.js" async></script>
```