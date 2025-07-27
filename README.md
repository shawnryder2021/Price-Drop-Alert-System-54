# Car Dealership Price Drop Alert System

A modern, responsive car dealership website with automated price drop notifications via webhook integration.

## Features

- 🚗 **Car Inventory Display** - Beautiful, responsive car cards with detailed specifications
- 🔔 **Price Drop Alerts** - Customers can subscribe to price notifications
- 📊 **Admin Dashboard** - Manage pricing and view subscriber analytics  
- 🌐 **Webhook Integration** - Automatic notifications sent to ActivePieces
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with React and Vite

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

See `deployment-guide.md` for detailed deployment instructions for various hosting platforms.

## Webhook Configuration

The system automatically sends notifications to:
```
https://cloud.activepieces.com/api/v1/webhooks/H1OjUTc7VfBnkghRO9N4P
```

## Admin Access

Visit `/admin` to access the admin dashboard where you can:
- Update individual vehicle prices
- Apply inventory-wide discounts
- View subscriber analytics
- Monitor price drop alerts

## Customization

1. **Update Branding**: Edit company name and styling in `src/pages/InventoryPage.jsx`
2. **Car Inventory**: Modify `src/data/sampleData.js` with your vehicles
3. **Webhook URL**: Update in `src/utils/storage.js` if needed

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM
- **Storage**: localStorage (demo) / Supabase ready

## License

MIT License - feel free to use for your dealership!