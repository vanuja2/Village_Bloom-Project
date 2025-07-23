import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cart.css';
import { PayPalButtons } from "@paypal/react-paypal-js";
import Nav from '../../Components/NavBar/Nav';
function Payment() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    total: 0,
    cardNumber: '',
    cardHolderName: '',
    expDate: '',
    cvv: '',
  });
  const [cartItemIDs, setCartItemIDs] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    const total = new URLSearchParams(window.location.search).get("total");

    if (!userID) {
      alert("User not logged in!");
      window.location.href = "/";
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/buyer/${userID}`);
        const user = response.data.buyer;
        setFormData({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          total: total,
          cardNumber: '',
          cardHolderName: '',
          expDate: '',
          cvv: '',
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/cart?userID=${userID}`);
        const cartItems = response.data.cart;
        setCartItemIDs(cartItems.map(item => item._id));
      } catch (error) {
        console.error("Error fetching cart items:", error);
        alert("Failed to fetch cart items.");
      }
    };

    fetchUserData();
    fetchCartItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const response = await axios.post("http://localhost:8081/payment", {
        ...formData,
        cartItemIDs,
        userID,
      });
      if (response.status === 200) {
        alert("Payment successful!");
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <Nav />
      <div className='continer_full'>
        <div className='continer'>
          <div className='product_view_container'></div>
          <p className='topic_main'>Payment</p>
          <div className='nav_bar_paymnt'>
            <p onClick={() => setPaymentMethod('card')} className='nav_item' style={{ cursor: 'pointer', fontWeight: paymentMethod === 'card' ? 'bold' : 'normal' }}>Card</p>
            <p onClick={() => setPaymentMethod('paypal')} className='nav_item' style={{ cursor: 'pointer', fontWeight: paymentMethod === 'paypal' ? 'bold' : 'normal' }}>PayPal</p>
          </div>
        </div>



        {paymentMethod === 'card' && (
          <div className='card_pay'>
            <form className='paymnt_from'>
              <div className='paymnt_detils'>
                <p className='pricedis'>Total:</p>
                <p className='pricedis'>{`$${formData.total}`}</p>
              </div>
              <div className='continer_payfrom'>
                <div className='main_con'>
                  <div className='from_auth_input_con'>
                    <label className='from_lable' >Full Name</label>
                    <input className='from_input' type="text" value={formData.fullName} readOnly />
                  </div>
                  <div className='from_auth_input_con'>
                    <label className='from_lable'>Email</label>
                    <input className='from_input' type="email" value={formData.email} readOnly />
                  </div>
                  <div className='from_auth_input_con'>
                    <label className='from_lable'>Phone</label>
                    <input className='from_input' type="text" value={formData.phone} readOnly />
                  </div>
                  <div className='from_auth_input_con'>
                    <label className='from_lable'>Address</label>
                    <input className='from_input' type="text" value={formData.address} readOnly />
                  </div>
                </div>
                <div className='paymnt_con'>
                  <div className='from_auth_input_con'>
                    <label className='from_lable'>Card Number:</label>
                    <input className='from_input'
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const re = /^[0-9\b]{0,16}$/;
                        if (re.test(e.target.value)) {
                          handleChange(e);
                        }
                      }}
                      maxLength="16"
                      pattern="[0-9]{16}"
                      title="Please enter exactly 16 digits."
                      required
                    />
                  </div>
                  <div className='from_auth_input_con'>
                    <label className='from_lable'>Card Holder Name:</label>
                    <input className='from_input'
                      type="text"
                      name="cardHolderName"
                      placeholder="Card Holder Name"
                      value={formData.cardHolderName}
                      onChange={(e) => {
                        const re = /^[A-Za-z\s]*$/;
                        if (re.test(e.target.value)) {
                          handleChange(e);
                        }
                      }}
                      required
                    />
                  </div>
                  <div className='from_auth_input_con'>
                    <label className='from_lable'>Expiration Date:</label>
                    <input className='from_input'
                      type="month"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='from_auth_input_con'>
                    <label className='from_lable'>CVV:</label>
                    <input className='from_input'
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => {
                        const re = /^[0-9\b]{0,3}$/;
                        if (re.test(e.target.value)) {
                          handleChange(e);
                        }
                      }}
                      maxLength="3"
                      pattern="[0-9]{3}"
                      title="Please enter exactly 3 digits."
                      required
                    />
                  </div>
                </div>
              </div>
              <button className='pay_btn' type="button" onClick={handlePayment}>Pay</button>
            </form>
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div className='paymnt_from'>
            <div className='paymnt_detils'>
              <p className='pricedis'>Total:</p>
              <p className='pricedis'>{`$${formData.total}`}</p>
            </div>
            <div className='paypal_con'>
              <PayPalButtons
                className="paypalbtn"
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: formData.total,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(function (details) {
                    alert(
                      "Transaction completed by " + details.payer.name.given_name
                    );
                  });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
