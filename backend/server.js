const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const db = require('./database');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Fetch all products with full URL for images
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Generate full URLs for images
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const products = rows.map(product => ({
      ...product,
      sliderImageUrl: product.sliderImageUrl ? `${baseUrl}${product.sliderImageUrl}` : null,
      thumbnailImageUrl: product.thumbnailImageUrl ? `${baseUrl}${product.thumbnailImageUrl}` : null,
    }));

    res.json(products);
  });
});

// Create a new product with slider and thumbnail images
app.post(
  '/api/products',
  upload.fields([{ name: 'sliderImage' }, { name: 'thumbnailImage' }]),
  (req, res) => {
    const { name, description } = req.body;
    const sliderImageUrl = req.files['sliderImage']
      ? `/uploads/${req.files['sliderImage'][0].filename}`
      : null;
    const thumbnailImageUrl = req.files['thumbnailImage']
      ? `/uploads/${req.files['thumbnailImage'][0].filename}`
      : null;

    const sql =
      'INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, description, sliderImageUrl, thumbnailImageUrl], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        name,
        description,
        sliderImageUrl,
        thumbnailImageUrl,
      });
    });
  }
);

// Update an existing product with new images if provided
app.put(
  '/api/products/:id',
  upload.fields([{ name: 'sliderImage' }, { name: 'thumbnailImage' }]),
  (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const sliderImageUrl = req.files['sliderImage']
      ? `/uploads/${req.files['sliderImage'][0].filename}`
      : req.body.sliderImageUrl;
    const thumbnailImageUrl = req.files['thumbnailImage']
      ? `/uploads/${req.files['thumbnailImage'][0].filename}`
      : req.body.thumbnailImageUrl;

    const sql =
      'UPDATE products SET name = ?, description = ?, sliderImageUrl = ?, thumbnailImageUrl = ? WHERE id = ?';
    db.run(sql, [name, description, sliderImageUrl, thumbnailImageUrl, id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    });
  }
);

// Dynamic Port Handling
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
