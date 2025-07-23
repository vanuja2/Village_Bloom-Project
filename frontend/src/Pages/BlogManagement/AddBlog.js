import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../Components/NavBar/Nav";

function AddBlog() {
    const [formData, setFormData] = useState({
        userID: "",
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0], // Auto-fetch today's date
        ownerName: "",
        category: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const storedUserID = localStorage.getItem("userID");
        if (storedUserID) {
            setFormData((prevData) => ({ ...prevData, userID: storedUserID }));
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.ownerName || !formData.category || !image) {
            alert("All fields are required.");
            return;
        }

        // Validate description length
        const wordCount = formData.description.trim().split(/\s+/).length;
        if (wordCount < 100) {
            alert("Description must be at least 100 words.");
            return;
        }

        const data = new FormData();
        data.append("userID", formData.userID);
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("date", formData.date);
        data.append("ownerName", formData.ownerName);
        data.append("category", formData.category);
        data.append("image", image);

        try {
            const response = await axios.post("http://localhost:8081/blog", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response.data);
            alert("Blog added successfully!");
            window.location.href = "/allBlog";
        } catch (err) {
            console.error(err);
            alert("Failed to add blog.");
        }
    };

    return (
        <div>
            <Nav />
            
            <div className='continer_full'><br /> <br /> <br/><br/>
                <div className='continer'>
                    <div className='continer_sub'>
                        <p className='from_topic'>Add Blog</p>
                        <form onSubmit={handleSubmit} className='data_from'>
                            <div className='from_auth_input_con'>
                                <label className='from_lable' htmlFor="title">Title</label>
                                <input
                                    className='from_input'
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className='from_auth_input_con'>
                                <label className='from_lable' htmlFor="ownerName">Owner Name</label>
                                <input
                                    className='from_input'
                                    type="text"
                                    id="ownerName"
                                    name="ownerName"
                                    placeholder="Owner Name"
                                    value={formData.ownerName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='from_auth_input_con'>
                                <label className='from_lable' htmlFor="category">Category</label>
                                <select
                                    className='from_input'
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Handcrafts">Handcrafts</option>
                                    <option value="Organic foods">Organic foods</option>
                                    <option value="Eco-friendly items">Eco-friendly items</option>
                                    <option value="Ayurvedic products">Ayurvedic products</option>
                                    <option value="Endamic animal species">Endamic animal species</option>
                                    <option value="Endamic plants">Endamic plants</option>
                                </select>
                            </div>
                            <div className='from_auth_input_con'>
                                {preview && <img src={preview} alt="Preview" style={{ width: "200px", marginTop: "10px" }} />}
                                <br />
                                <label className='from_lable' htmlFor="image">Image</label>
                                <input
                                    className='from_input'
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className='from_auth_input_con'>
                                <label className='from_lable' htmlFor="description">Description</label>
                                <textarea
                                    className='from_input'
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={8}
                                />
                            </div>
                            <button type="submit" className='auth_btn_fom' >Add Blog</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBlog;
