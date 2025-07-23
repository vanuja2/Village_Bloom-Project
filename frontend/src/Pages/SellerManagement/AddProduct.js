import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProduct() {
  const [formData, setFormData] = useState({
    sellerID: '',
    productName: '',
    price: '',
    description: '',
    quantity: '',
    category: '',
    images: null,
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch sellerID from local storage
    const storedSellerID = localStorage.getItem('sellerID');
    if (storedSellerID) {
      setFormData((prevFormData) => ({ ...prevFormData, sellerID: storedSellerID }));
    }
  }, []);

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
      setFormData({ ...formData, images: null });
      setImagePreviews([]);
      return;
    }

    setError('');
    setFormData({ ...formData, images: files });
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.productName ||
      !formData.price ||
      !formData.description ||
      !formData.quantity ||
      !formData.category ||
      !formData.images
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
    for (const key in formData) {
      if (key === 'images') {
        Array.from(formData.images).forEach((file) => data.append('images', file));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:8081/product', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product added successfully!');
      window.location.href = '/sellerDash';
    } catch (error) {
      console.error(error);
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
          <p className='from_topic'>Add Product</p>
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
              <label className='from_lable'>Quantity</label>
              <input
                type="number"
                name="quantity"
                className='from_input'
                value={formData.quantity}
                placeholder="Quantity"
                onChange={handleChange}
                required
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
              <p className='img_topic'>New Image Previews</p>
              <div className='img_con_full'>
                {imagePreviews.map((src, index) => (
                  <div key={index} >
                    <img src={src} alt={`Preview ${index}`} className="img_from" />
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
            <button className='auth_btn_fom' type="submit" disabled={!!error}>Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
