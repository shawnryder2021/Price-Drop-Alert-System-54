# Car Dealership Website Deployment Guide

## Option 1: Static Hosting (Recommended for beginners)

### Deploy to Netlify (Free)
1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up
   - Drag and drop your `dist` folder to Netlify
   - Your site will be live at a netlify URL (e.g., `amazing-site-123.netlify.app`)

### Deploy to Vercel (Free)
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

### Deploy to GitHub Pages (Free)
1. **Push your code to GitHub**
2. **Enable GitHub Pages in repository settings**
3. **Your site will be at:** `https://yourusername.github.io/repository-name`

## Option 2: Full Web Hosting

### Upload to your web host (cPanel/FTP)
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload contents of `dist` folder to your web server:**
   - Via cPanel File Manager: Upload to `public_html` folder
   - Via FTP: Upload to your domain's root directory

### Custom Domain Setup
- Point your domain to the hosting service
- Update DNS settings if needed

## Option 3: Self-Hosted (VPS/Cloud)

### Deploy to DigitalOcean/AWS/Linode
1. **Set up a web server (nginx example):**
   ```bash
   # Install nginx
   sudo apt update
   sudo apt install nginx

   # Build and copy files
   npm run build
   sudo cp -r dist/* /var/www/html/
   ```

2. **Configure nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## Important Configuration Notes

### 1. Webhook Configuration
The webhook is already configured to send to:
```
https://cloud.activepieces.com/api/v1/webhooks/H1OjUTc7VfBnkghRO9N4P
```

### 2. Hash Router
The app uses HashRouter, so URLs will look like:
- `yoursite.com/#/` (main inventory)
- `yoursite.com/#/admin` (admin dashboard)

### 3. Data Storage
Currently uses localStorage for demo purposes. For production, consider:
- Adding a backend database
- Using Supabase (already configured)
- Implementing proper user authentication

## Testing Your Deployment

### 1. Test Price Drop Alerts
1. Visit your deployed site
2. Click the floating "Price Drop Alerts" widget
3. Fill out the form and submit
4. Check your webhook endpoint for the data

### 2. Test Admin Functions
1. Go to `yoursite.com/#/admin`
2. Update individual car prices
3. Apply inventory-wide discounts
4. Verify webhook notifications are sent

## Customization for Your Business

### 1. Update Branding
Edit `src/pages/InventoryPage.jsx`:
```jsx
<h1 className="text-3xl font-bold text-gray-900">Your Dealership Name</h1>
<p className="text-gray-600 mt-1">Your tagline here</p>
```

### 2. Update Car Inventory
Edit `src/data/sampleData.js` with your actual inventory.

### 3. Webhook Integration
The system will automatically send data to your ActivePieces webhook when:
- Someone subscribes to price alerts
- A price drop occurs

### 4. Add Your Logo
Replace the text header with your logo image:
```jsx
<img src="/path/to/your-logo.png" alt="Your Dealership" className="h-12" />
```

## Security Considerations

### 1. Admin Access
Consider adding authentication to the admin dashboard in production.

### 2. Rate Limiting
Implement rate limiting for form submissions to prevent spam.

### 3. Data Validation
Add server-side validation for all form inputs.

## Support and Maintenance

### Regular Updates
- Keep dependencies updated: `npm update`
- Monitor webhook deliveries
- Backup customer data regularly

### Analytics
Consider adding Google Analytics or similar to track:
- Page views
- Form submissions
- User engagement

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Your website will be fully functional with:
✅ Car inventory display
✅ Price drop alert subscriptions
✅ Admin dashboard for price management
✅ Webhook notifications to ActivePieces
✅ Mobile-responsive design
✅ Modern, professional UI