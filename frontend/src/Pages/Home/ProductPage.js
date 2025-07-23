import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Nav from '../../Components/NavBar/Nav';
import './product.css'
import { IoSearch } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
function ProductPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8081/product');
                setProducts(response.data.product);

                // Extract categories dynamically from the product list
                const uniqueCategories = [
                    ...new Set(response.data.product.map((product) => product.category)),
                ];
                setCategories(uniqueCategories);
                setFilteredProducts(response.data.product); // Initialize filtered products
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setFilteredProducts(
            products.filter((product) => product.category === category)
        );
    };

    const handleSearch = () => {
        const keyword = searchKeyword.toLowerCase();
        setFilteredProducts(
            products.filter(
                (product) =>
                    product.productName.toLowerCase().includes(keyword) ||
                    product.description.toLowerCase().includes(keyword)
            )
        );
        setSelectedCategory(null); // Clear category selection when searching
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            <Nav />
            <div className='continer_full'>
                <div className='continer'>
                    <div className='side_bar'>
                        <div className="search_bar">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                className="search_input"
                            />
                            <IoSearch onClick={handleSearch} className="search_btn" />

                        </div>

                        <div className="category_section">
                            <p className="category_title">filter By Categories</p>
                            <div className="category_grid">
                                {categories.map((category) => (
                                    <div
                                        key={category}
                                        className={`category_card ${selectedCategory === category ? 'category_card_active' : ''}`}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <p className="category_name">#{category}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='product_continer'>
                        {filteredProducts.length === 0 ? (
                            <p className="no_products">No products found</p>
                        ) : (
                            <div className="product_grid">
                                {filteredProducts.map((product) => (
                                    <div key={product._id} className="product_card">
                                        <div className="product_images">
                                            {product.imgURLs.length > 0 && (
                                                <img
                                                    src={`http://localhost:8081/uploads/${product.imgURLs[0]}`}
                                                    alt="Product"
                                                    className="product_image"
                                                />
                                            )}
                                        </div>
                                        <div className="product_details">
                                            <p className="product_name">{product.productName}</p>
                                            <div className='flx_card'>
                                                <p className="product_category"> {product.category}</p>
                                                <p className="product_quantity"> {product.quantity} available</p>
                                            </div>
                                            <p className="product_description">
                                                {product.description.length > 300
                                                    ? `${product.description.substring(0, 300)}...`
                                                    : product.description}
                                            </p>

                                            <div className='flx_card_under'>
                                                <p className="product_price">${product.price}</p>
                                                <div
                                                    className='cart_btn'
                                                    onClick={() => navigate('/singalProductView', { state: { product } })}
                                                >
                                                    <IoMdCart className='cartt_icon' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage
