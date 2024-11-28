const express = require('express');
const helmet = require('helmet');
const { initDb } = require('./database');
const productsRoute = require('./api/products');
require('dotenv').config();

const app = express();

// Set up the Content Security Policy (CSP) header
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'none'"], // Block everything by default
    scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts (less secure)
    styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (for CSS)
    imgSrc: ["'self'", 'https://res.cloudinary.com'], // Allow images from Cloudinary
    connectSrc: ["'self'"], // Allow connections to the same origin (API calls, etc.)
    fontSrc: ["'self'"], // Allow fonts from the same origin
    objectSrc: ["'none'"], // Block Flash or other plugins
  }
}));

// Serve the homepage
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Welcome to the Product API</title></head>
      <body>
        <h1>Welcome to the Product API!</h1>
        <p>Click below to view the products:</p>
        <a href="/api/products">View Products</a>
      </body>
    </html>
  `);
});

// Use the products route under /api/products
app.use('/api/products', productsRoute);

// Initialize the database (run only once when deployed)
initDb().catch((err) => {
  console.error("Failed to initialize the database:", err.message);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Local server is running on http://localhost:${PORT}`);
});
