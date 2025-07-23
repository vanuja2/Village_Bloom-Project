import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RiDeleteBinFill } from "react-icons/ri";
function UpdateProduct() {
  const { id } = useParams(); // Get product ID from URL
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    quantity: '',
    category: '',
    images: null,
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    // Fetch product details by ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/product/${id}`);
        const product = response.data.product;
        setFormData({
          productName: product.productName,
          price: product.price,
          description: product.description,
          quantity: product.quantity,
          category: product.category,
          images: null,
        });
        setExistingImages(product.imgURLs);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    const isValid = Array.from(files).every((file) => validExtensions.includes(file.type));

    if (!isValid) {
      alert('Only JPG, PNG, and JPEG files are allowed.');
      return;
    }

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDeleteExistingImage = async (image) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`http://localhost:8081/product/${id}/image`, { data: { image } });
        setExistingImages(existingImages.filter((img) => img !== image));
        alert('Image deleted successfully!');
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Failed to delete the image.');
      }
    }
  };

  const handleDeleteNewImage = (index) => {
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index));
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.productName ||
      !formData.price ||
      !formData.description ||
      !formData.quantity ||
      !formData.category
    ) {
      alert('Please fill all input fields.');
      return;
    }

    if (formData.price <= 0) {
      alert('Price must be greater than zero.');
      return;
    }

    if (formData.quantity <= 0) {
      alert('Quantity must be greater than zero.');
      return;
    }

    const data = new FormData();

    // Append all form fields
    data.append('productName', formData.productName);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('quantity', formData.quantity);
    data.append('category', formData.category);

    // Append new images
    newImages.forEach((file) => {
      data.append('images', file);
    });

    try {
      const response = await axios.put(`http://localhost:8081/product/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product updated successfully!');
      window.location.href = '/sellerDash';
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update the product.');
    }
  };

  return (
    <div className='continer_full'>
        <div className='manage_Nav_full'>
        <div className='manage_Nav'>
          <p className='manage_Nav_logo'>seller dashboard</p>
          <div className='manage_Nav_con'>
            <p className='manage_Nav_con_item manage_Nav_con_item_active' onClick={() => (window.location.href = '/sellerDash')}>Product</p>
            <p
              className='manage_Nav_con_item'
              onClick={() => {
                localStorage.removeItem('sellerID');
                window.location.href = '/sellerLogin';
              }}
            >
              LogOut
            </p>
          </div>
        </div>
      </div>
      <div className='continer'>
        <div className='continer_sub'>
          <p className='from_topic'>Update Product</p>
          <form className='data_from' onSubmit={handleSubmit}>
            <div className='from_auth_input_con'>
              <label className='from_lable'>Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                placeholder="Product Name"
                onChange={handleChange}
                required
                className='from_input'
              />
            </div>
            <div className='from_auth_input_con'>
              <label className='from_lable'>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="Price"
                onChange={handleChange}
                required
                className='from_input'
              />
            </div>


            <div className='from_auth_input_con'>
              <label className='from_lable'>Category</label>
              <select className='from_input'
                name="category" onChange={handleChange} required>
                <option value="" disabled selected>Select a category</option>
                <option value="Handcrafts">Handcrafts</option>
                <option value="Organic foods">Organic foods</option>
                <option value="Eco-friendly items">Eco-friendly items</option>
                <option value="Ayurvedic products">Ayurvedic products</option>
                <option value="Endamic animal species">Endamic animal species</option>
                <option value="Endamic plants">Endamic plants</option>
              </select>
            </div>

            <div className='from_auth_input_con'>
              <p className='img_topic'>Existing Images</p>
              <div className='img_con_full'>
                {existingImages.map((img, index) => (

                  <div key={index} className='img_con'>
                    <img
                      src={`http://localhost:8081/uploads/${img}`}
                      alt="Existing"
                      className="img_from"
                    />
                    <RiDeleteBinFill className='product_dlt_btn' onClick={() => handleDeleteExistingImage(img)} />
                  </div>
                ))}
              </div>
            </div>

            <div className='from_auth_input_con'>
              <p className='img_topic'>New Image Previews</p>
              <div className='img_con_full'>
                {newImagePreviews.map((src, index) => (
                  <div key={index} >
                    <img src={src} alt={`Preview ${index}`} className="img_from" />
                    <RiDeleteBinFill className='product_dlt_btn' onClick={() => handleDeleteNewImage(index)} />
                  </div>
                ))}

              </div>
            </div>
            <div className='from_auth_input_con'>
              <label className='from_lable'>Image</label>
              <input type="file"
                className='from_input' name="images" multiple onChange={handleFileChange} />
            </div>
            <div className='from_auth_input_con'>
              <label className='from_lable'>Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Description"
                onChange={handleChange}
                className='from_input'
                required
                rows={4}
              />
            </div>
            <button className='auth_btn_fom' type="submit">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
