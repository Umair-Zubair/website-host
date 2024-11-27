const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDb, pool } = require('./database');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Initialize the database when the server starts
initDb().catch((err) => {
  console.error("Failed to initialize the database:", err.message);
  process.exit(1); // Exit if the database cannot be initialized
});

// Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new product
app.post('/api/products', async (req, res) => {
  const { name, description, sliderImageUrl, thumbnailImageUrl } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, sliderImageUrl, thumbnailImageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, sliderImageUrl, thumbnailImageUrl } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, sliderImageUrl = $3, thumbnailImageUrl = $4 WHERE id = $5 RETURNING *',
      [name, description, sliderImageUrl, thumbnailImageUrl, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json({ success: true, product: result.rows[0] });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
