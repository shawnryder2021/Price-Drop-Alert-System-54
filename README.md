# Car Dealership - Car Buying Widget System

A modern, responsive car dealership website with automated car buying lead collection via webhook integration. The main focus is on collecting information from people who want to sell their cars to the dealership.

## Features

- 🚗 **Car Inventory Display** - Beautiful, responsive car cards with detailed specifications
- 💰 **Car Buying Widget** - Collect leads from people wanting to sell their cars
- 📊 **Admin Dashboard** - Manage leads and view analytics
- 🌐 **Webhook Integration** - Automatic notifications sent to ActivePieces
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with React and Vite

## Car Buying Widget Features

The floating widget collects:
- **Personal Information**: Name, email, phone number
- **Vehicle Details**: Year, make, model, mileage, condition
- **VIN**: Vehicle identification number (optional but recommended)
- **Additional Details**: Features, maintenance history, issues, etc.

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

The system automatically sends car selling leads to:
```
https://cloud.activepieces.com/api/v1/webhooks/H1OjUTc7VfBnkghRO9N4P
```

### Webhook Data Format

When someone submits the car selling form, this data is sent:

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
      "vin": "1HGBH41JXMN109186",
      "mileage": 45000,
      "condition": "Good",
      "details": "Well maintained, recent oil change, new tires"
    },
    "dealership": "Premium Auto Gallery",
    "timestamp": "2023-05-25T12:34:56.789Z",
    "source": "Shawn Ryder Digital Widget"
  }
}
```

## Admin Access

Visit `/admin` to access the admin dashboard where you can:
- View all car selling leads
- Mark leads as contacted
- See lead details and contact information
- Monitor submission analytics

## Widget Positioning

The car selling widget appears as a floating button in the bottom-right corner of the page and includes:
- Eye-catching design with gradient colors
- Clear call-to-action text
- Comprehensive form for vehicle information
- VIN field for accurate valuations
- Success confirmation with next steps

## Customization

1. **Update Branding**: Edit company name and styling in `src/pages/InventoryPage.jsx`
2. **Car Inventory**: Modify `src/data/sampleData.js` with your vehicles  
3. **Webhook URL**: Update in `src/utils/storage.js` if needed
4. **Widget Styling**: Customize colors and text in `src/components/FloatingCarSellWidget.jsx`

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS  
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM
- **Storage**: localStorage (demo) / Supabase ready

## License

MIT License - feel free to use for your dealership!