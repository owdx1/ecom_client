import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css"; 

const Profile = ({onLogout}) => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Current accessToken", accessToken);
    if (!accessToken || accessToken === "undefined") {
      navigate("/error"); 
    } else {
      fetchProfile(accessToken);
    }
  }, []);

  const fetchProfile = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        onLogout(); 
        navigate('/');
      }
  
      if (!response.ok) {
        throw new Error("Error fetching profile");
      }
  
      const data = await response.json();
      const { customer, accessToken: newAccessToken } = data;
  
      localStorage.setItem("accessToken", newAccessToken);
      console.log("New accessToken", newAccessToken);
      setCustomer(customer);
      console.log(customer);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  if (!customer) {
    return <div>Loading...</div>; 
  }

  const handleUpdateInfo = () => {
    
  };

  const handleMyOrders = () => {
    
  };

  const handleLogout = () => {
    onLogout();
    navigate("/"); 
  };

  return (
    <div className="profile-container">
      <div className="info-container">
        <p>
          <span className="label">Name:</span> {customer.first_name} {customer.last_name}
        </p>
        <p>
          <span className="label">Email:</span> {customer.email}
        </p>
        <p>
          <span className="label">Address:</span> {customer.address}
        </p>
        <p>
          <span className="label">City:</span> {customer.city}
        </p>
        <p>
          <span className="label">Country:</span> {customer.country}
        </p>
        <p>
          <span className="label">Customer ID:</span> {customer.customer_id}
        </p>
        <p>
          <span className="label">Last Name:</span> {customer.last_name}
        </p>
        <p>
          <span className="label">Postal Code:</span> {customer.postal_code}
        </p>
      </div>

      <div className="button-container">
        <button className="update-button" onClick={handleUpdateInfo}>
          Bilgilerimi Güncelle
        </button>
        <button className="orders-button" onClick={handleMyOrders}>
          Siparişlerim
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Profile;
