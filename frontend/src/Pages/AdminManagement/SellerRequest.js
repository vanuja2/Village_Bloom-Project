import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function SellerRequest() {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/seller');
        setSellers(response.data.seller);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };
    fetchSellers();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8081/seller/${id}`, { status });
      alert(`Request ${status.toLowerCase()}ed successfully!`);
      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller._id === id ? { ...seller, status } : seller
        )
      );
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
      alert(`Failed to update status to ${status}.`);
    }
  };

  const deleteSeller = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this seller?");
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8081/seller/${id}`);
      alert('Seller deleted successfully!');
      setSellers((prevSellers) => prevSellers.filter((seller) => seller._id !== id));
    } catch (error) {
      console.error('Error deleting seller:', error);
      alert('Failed to delete seller.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Seller Requests Report', 20, 10);
    doc.autoTable({
      head: [['Full Name', 'Email', 'Phone', 'Address', 'Category', 'Status']],
      body: sellers.map((seller) => [
        seller.fullName,
        seller.email,
        seller.phone,
        seller.address,
        seller.category,
        seller.status,
      ]),
    });
    doc.save('SellerRequests.pdf');
  };

  const filteredSellers = sellers.filter((seller) =>
    seller.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='continer_full'>
      <div className='manage_Nav_full'>
        <div className='manage_Nav'>
          <p className='manage_Nav_logo'>Admin dashboard</p>
          <div className='manage_Nav_con'>
            <p className='manage_Nav_con_item' onClick={() => (window.location.href = '/adminDash')}>Product</p>
            <p className='manage_Nav_con_item manage_Nav_con_item_active' onClick={() => (window.location.href = '/sellerRequests')}>Seller</p>    
            <p className='manage_Nav_con_item' onClick={() => (window.location.href = '/adminLogin')}>LogOut</p>
          </div>
        </div>
      </div>
      <div className='continer'>
        <div className='continer_sub'>
          <div className='admin_btn_nav_con'>
            <input
              type="text"
              className='from_input_search'
              placeholder="Search by seller name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='admin_btn_nav' onClick={generatePDF}>Generate PDF</button>
          </div>
          {filteredSellers.length === 0 ? (
            <p className='not_cound'>No sellers found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSellers.map((seller) => (
                  <tr key={seller._id}>
                    <td>{seller.fullName}</td>
                    <td>{seller.email}</td>
                    <td>{seller.phone}</td>
                    <td>{seller.address}</td>
                    <td>{seller.category}</td>
                    <td>{seller.status}</td>
                    <td>
                      <div className='btn_con_tbl'>
                        <button className='update_btn' onClick={() => updateStatus(seller._id, 'Approved')}>Approve</button>
                        <button className='dlt_btn' onClick={() => updateStatus(seller._id, 'Rejected')}>Reject</button>
                        <button className='dlt_btn' onClick={() => deleteSeller(seller._id)}>Delete</button>
                        <button className='update_btn' onClick={() => navigate(`/updateSeller/${seller._id}`)}>Update</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerRequest;
