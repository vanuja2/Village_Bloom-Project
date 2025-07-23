import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from "jspdf";
import './admin.css';
import { applyPlugin } from "jspdf-autotable";
applyPlugin(jsPDF);

function AdminDash() {
    const [products, setProducts] = useState([]);
    const [showAdminProducts, setShowAdminProducts] = useState(true); // State to toggle filter
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/product');
                setProducts(response.data.product);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:8081/product/${id}`);
                alert('Product deleted successfully!');
                setProducts(products.filter((product) => product._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete the product.');
            }
        }
    };

    const filteredProducts = products
        .filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((product) => (showAdminProducts ? product.sellerID === 'admin' : true));

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Product List', 14, 10);

        const tableColumn = ['Product Name', 'Price', 'Description', 'Quantity', 'Category'];
        const tableRows = filteredProducts.map((product) => [
            product.productName,
            product.price,
            product.description,
            product.quantity,
            product.category,
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('ProductList.pdf');
    };

    return (
        <div className='continer_full'>
            <div className='manage_Nav_full'>
                <div className='manage_Nav'>
                    <p className='manage_Nav_logo'>Admin dashboard</p>
                    <div className='manage_Nav_con'>
                        <p className='manage_Nav_con_item manage_Nav_con_item_active' onClick={() => (window.location.href = '/adminDash')}>Product</p>
                        <p className='manage_Nav_con_item' onClick={() => (window.location.href = '/sellerRequests')}>Seller</p>
                        <p className='manage_Nav_con_item' onClick={() => (window.location.href = '/adminLogin')}>LogOut</p>
                    </div>
                </div>
            </div>
            <div className='continer'>
                <div className='continer_sub'>

                    <div className='admin_btn_nav_con'>
                        <button
                            className='admin_btn_nav'
                            onClick={() => (window.location.href = '/adminAddProduct')}>Add Product</button>
                        <button
                            className='admin_btn_nav'
                            onClick={() => setShowAdminProducts(!showAdminProducts)}>
                            {showAdminProducts ? 'Show All Products' : 'Show Admin Products'}
                        </button>
                        <button
                            className='admin_btn_nav'
                            onClick={generatePDF}>Generate PDF</button>
                    </div>
                    <input
                        type="text"
                        className='from_input'
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {filteredProducts.length === 0 ? (
                        <p className='not_cound'>No products found</p>
                    ) : (
                        <table >
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th className='img_card'>Images</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.productName}</td>
                                        <td>${product.price}</td>
                                        <td>{product.description}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            {product.imgURLs.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={`http://localhost:8081/uploads/${img}`}
                                                    alt="Product"
                                                    className='product_img'
                                                />
                                            ))}
                                        </td>
                                        <td>
                                            <div className='btn_con_tbl'>
                                                <button
                                                    className='update_btn'
                                                    onClick={() => (window.location.href = `/adminUpdateProduct/${product._id}`)}>Update</button>
                                                <button
                                                    className='dlt_btn' onClick={() => handleDelete(product._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default AdminDash;
