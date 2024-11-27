const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

// Create a connection pool for PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon.tech connections
});

// Initialize the database
const initDb = async () => {
  try {
    // Create the "products" table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        sliderImageUrl TEXT NOT NULL,
        thumbnailImageUrl TEXT NOT NULL
      );
    `);

    // Insert sample data if the table is empty
    const { rows } = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl)
        VALUES
        ('Bottle', 'Discover a 500ml burst of refreshment that energizes you with a variety of flavors. Visit the bottle tab to explore our exciting flavor collection!', 'https://res.cloudinary.com/dfuedbntn/image/upload/v1732716025/Bottlebg_umeudm.png', 'https://res.cloudinary.com/dfuedbntn/image/upload/v1732716024/Bottletn_g7aur5.png'),
        ('Can', 'Enjoy a compact 250ml boost of flavor and energy, perfect for any moment. Check out the bottle tab to explore our vibrant flavor selection!', 'https://res.cloudinary.com/dfuedbntn/image/upload/v1732716025/canbg_gwz8xz.png', 'https://res.cloudinary.com/dfuedbntn/image/upload/v1732716024/cantn_tvqxll.png'),
        ('Coming Soon', 'A new surprise coming soon!', 'https://res.cloudinary.com/dfuedbntn/image/upload/v1732716025/comingsoon_ptpkam.jpg', 'https://res.cloudinary.com/dfuedbntn/image/upload/v1732716025/comingsoon_ptpkam.jpg');
      `);
    }

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing the database:", error.message);
    throw error; // Rethrow the error for debugging
  }
};

module.exports = { pool, initDb };
