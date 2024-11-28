import React, { useEffect, useState } from 'react';
import '../Admin.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [sliderImage, setSliderImage] = useState(null); // For slider image file
  const [thumbnailImage, setThumbnailImage] = useState(null); // For thumbnail image file

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://backend-vercel-six.vercel.app/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderImageChange = (e) => setSliderImage(e.target.files[0]);
  const handleThumbnailImageChange = (e) => setThumbnailImage(e.target.files[0]);

  // Create a new product
  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    if (sliderImage) formData.append('sliderImage', sliderImage);
    if (thumbnailImage) formData.append('thumbnailImage', thumbnailImage);

    try {
      const response = await fetch('https://backend-vercel-six.vercel.app/api/products', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to create product');
      fetchProducts();
      setForm({ name: '', description: '' });
      setSliderImage(null);
      setThumbnailImage(null);
    } catch (error) {
      console.error('Error creating product:', error.message);
    }
  };

  // Update an existing product
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    if (sliderImage) formData.append('sliderImage', sliderImage);
    if (thumbnailImage) formData.append('thumbnailImage', thumbnailImage);

    try {
      const response = await fetch(`https://backend-vercel-six.vercel.app/api/products/${editingProductId}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update product');
      fetchProducts();
      setEditingProductId(null);
      setForm({ name: '', description: '' });
      setSliderImage(null);
      setThumbnailImage(null);
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://backend-vercel-six.vercel.app/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  // Prepare to edit a product
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setForm({
      name: product.name,
      description: product.description,
    });
  };

  return (
    <div className="admin-page">
      <h2>Admin Page</h2>

      <div>
        <h3>{editingProductId ? 'Edit Product' : 'Add New Product'}</h3>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product Description"
        />
        <input type="file" onChange={handleSliderImageChange} placeholder="Slider Image" />
        <input type="file" onChange={handleThumbnailImageChange} placeholder="Thumbnail Image" />
        {editingProductId ? (
          <button onClick={handleUpdate}>Update Product</button>
        ) : (
          <button onClick={handleCreate}>Add Product</button>
        )}
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name} - {product.description}</span>
            {product.sliderImageUrl && (
              <img
                src={product.sliderImageUrl}
                alt={product.name}
                width="50"
              />
            )}
            {product.thumbnailImageUrl && (
              <img
                src={product.thumbnailImageUrl}
                alt={`${product.name} Thumbnail`}
                width="50"
              />
            )}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
