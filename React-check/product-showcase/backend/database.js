const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database('./products.db');

db.serialize(() => {
  // Drop the existing products table if needed (optional)
  db.run(`DROP TABLE IF EXISTS products`);

  // Create the products table with two image fields
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    sliderImageUrl TEXT,
    thumbnailImageUrl TEXT
  )`);

  // Insert sample data if the table is empty
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl) VALUES (?, ?, ?, ?)", [
        "Bottle",
        "Discover a 500ml burst of refreshment that energizes you with a variety of flavors. Visit the bottle tab to explore our exciting flavor collection!",
        "/uploads/Bottlebg.png", //these are picture paths(this is background)
        "/uploads/Bottletn.png"  //(this is thumbnail)
      ]);
      db.run("INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl) VALUES (?, ?, ?, ?)", [
        "Can",
        "Enjoy a compact 250ml boost of flavor and energy, perfect for any moment. Check out the bottle tab to explore our vibrant flavor selection!",
        "/uploads/canbg.png", 
        "/uploads/cantn.png" 
      ]);
      db.run("INSERT INTO products (name, description, sliderImageUrl, thumbnailImageUrl) VALUES (?, ?, ?, ?)", [
        "Coming Soon",
        "A new surprise coming soon!",
        "/uploads/comingsoon.jpg", 
        "/uploads/comingsoon.jpg"  
      ]);
    }
  });
});

module.exports = db;
