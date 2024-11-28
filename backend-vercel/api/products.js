const { pool } = require('../database'); // Assuming the database connection is set up in database.js
const cors = require('cors'); // Import CORS

// Apply CORS middleware
const corsOptions = {
  origin: 'https://frontend-vercel-sooty.vercel.app', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

module.exports = async (req, res) => {
  cors(corsOptions)(req, res, async () => { // Use CORS middleware
    if (req.method === 'GET') {
      // Fetch all products
      try {
        console.log("Request received at /api/products");
        const { rows } = await pool.query('SELECT * FROM products');
        res.status(200).json(rows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    } else if (req.method === 'POST') {
      // Add a new product
      const { name, description, sliderImageUrl, thumbnailImageUrl } = req.body;

      try {
        const result = await pool.query(
          'INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, description, sliderImageUrl, thumbnailImageUrl]
        );
        res.status(201).json(result.rows[0]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    } else if (req.method === 'PUT') {
      // Update an existing product
      const { id } = req.query;
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
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    } else if (req.method === 'DELETE') {
      // Delete a product
      const { id } = req.query;

      try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
          res.status(404).json({ error: "Product not found" });
        } else {
          res.json({ success: true, product: result.rows[0] });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    } else {
      // If the HTTP method is not supported
      res.status(405).json({ error: "Method Not Allowed" });
    }
  });
};
