import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css"; // Import the CSS file for Profile component

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Current accessToken", accessToken);
    if (!accessToken || accessToken === "undefined") {
      navigate("/error"); // Redirect to error page if no access token
    } else {
      fetchProfile(accessToken);
    }
  }, []);

  const fetchProfile = (accessToken) => {
    fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { customer, accessToken: newAccessToken } = data;
        localStorage.setItem("accessToken", newAccessToken);
        console.log("New accessToken", newAccessToken);
        setCustomer(customer);
        console.log(customer);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        // Handle error here, e.g., show an error message or redirect to an error page
      });
  };

  if (!customer) {
    return <div>Loading...</div>; // Render a loading indicator while fetching profile
  }

  const handleUpdateInfo = () => {
    // Handle updating customer information
    // This function will be called when the "bilgilerimi güncelle" button is clicked
  };

  const handleMyOrders = () => {
    // Handle displaying customer's orders
    // This function will be called when the "siparişlerim" button is clicked
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div className="profile-container">
      <div className="info-container">
        <p>
          <span className="label">Name:</span> {customer.first_name}
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
