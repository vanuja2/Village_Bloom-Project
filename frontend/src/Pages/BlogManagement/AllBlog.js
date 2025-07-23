import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nav from '../../Components/NavBar/Nav'
import './blog.css'
import { TfiWrite } from "react-icons/tfi";
import { FaPen } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const commentRefs = useRef({}); // Use an object to store refs for each blog
  const currentUserID = localStorage.getItem("userID"); // Get userID from local storage

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8081/blog");
        setBlogs(response.data.blog);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch blogs.");
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/blog/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8081/blog/like/${id}`, {
        userID: currentUserID,
      });
      setBlogs(
        blogs.map((blog) =>
          blog._id === id ? { ...blog, likes: response.data.likes } : blog
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to like the blog.");
    }
  };

  const handleAddComment = async (blogID, commentText) => {
    if (!commentText.trim()) return alert("Comment cannot be empty.");
    try {
      const response = await axios.post(`http://localhost:8081/blog/comment/${blogID}`, {
        userID: currentUserID,
        comment: commentText,
      });
      setBlogs(
        blogs.map((blog) =>
          blog._id === blogID ? { ...blog, comments: response.data.comments } : blog
        )
      );
      if (commentRefs.current[blogID]) commentRefs.current[blogID].value = ""; // Clear the input field
    } catch (err) {
      console.error(err);
      alert("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (blogID, commentIndex) => {
    try {
      const response = await axios.delete(`http://localhost:8081/blog/comment/${blogID}/${commentIndex}`);
      setBlogs(
        blogs.map((blog) =>
          blog._id === blogID ? { ...blog, comments: response.data.comments } : blog
        )
      );
      alert("Comment deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment.");
    }
  };

  const toggleReadMore = (id) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <Nav />
      <div className='continer_full'>
        <div className='continer'>
          <div className="createblog_btn" onClick={() => (window.location.href = "/addBlog")}><TfiWrite /></div>
          <div className="blog_vontiner">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="blog_card">
                  {blog.userID === currentUserID && (
                    <div className="action_con">
                      <FaEdit className="btn_actionn" onClick={() => (window.location.href = `/updateBlog/${blog._id}`)} />
                      <MdDelete className="btn_actionn" onClick={() => handleDelete(blog._id)} />
                    </div>
                  )}
                  <p className="titler_blog">{blog.title}</p>
                  <div className="dt_cat_con">
                    <p className="dt_cat">{blog.date}</p>
                    <p className="dt_cat"> {blog.category}</p></div>
                  {blog.imgURL && (
                    <img
                      src={`http://localhost:8081/uploads/blog/${blog.imgURL}`}
                      alt={blog.title}
                      className="blog_img"
                    />
                  )}
                  <p className="description_in" style={{ whiteSpace: "pre-line" }}>
                    {expandedBlogs[blog._id] || blog.description.length <= 850
                      ? blog.description
                      : `${blog.description.substring(0, 850)}...`}
                    {blog.description.length > 850 && (
                      <span
                        className="read-more"
                        style={{ color: "gray", cursor: "pointer" }}
                        onClick={() => toggleReadMore(blog._id)}
                      >
                        {expandedBlogs[blog._id] ? " Show less" : " Read more"}
                      </span>
                    )}
                  </p>

                  <p className="writby"><FaPen /> {blog.ownerName}</p>
                  <div className="lik_comnt_con">
                    <div className="like_section">
                      <FaHeart
                        className={`like_icon ${blog.likes.includes(currentUserID) ? "liked" : ""
                          }`}
                        onClick={() => handleLike(blog._id)}
                      />
                      <span className="like_count">{blog.likes.length}</span>
                    </div>
                    <div className="like_section">
                      <p className="like_count">{blog.comments ? blog.comments.length : 0} </p>
                      <FaCommentAlt className="like_icon" />
                    </div>
                  </div>
                  <div className="coment_input_con">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      className="comment_input"
                      ref={(el) => (commentRefs.current[blog._id] = el)} // Assign ref dynamically
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddComment(blog._id, e.target.value);
                      }}
                    />
                    <IoSend
                      className="ad_comnt_btn"
                      onClick={() => {
                        if (commentRefs.current[blog._id]) {
                          handleAddComment(blog._id, commentRefs.current[blog._id].value);
                        }
                      }}
                    />
                  </div>
                  <div className="comment_section">
                    {blog.comments && blog.comments.length > 0 ? (
                      blog.comments.map((comment, index) => (
                        <div key={index} className="comment">
                          <p className="comment_user">{comment.userFullName}</p>
                          <p className="comment_text">{comment.text}</p>
                          {comment.userID === currentUserID && ( 
                            <button
                              className="delete_comment_btn"
                              onClick={() => handleDeleteComment(blog._id, index)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No comments yet.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBlog;
