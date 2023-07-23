import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Profile.css";

const Profile = ({ onLogout }) => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [changePasswordMessage ,setChangePasswordMessage] = useState("");

  useEffect(() => {
    toast.done(changePasswordMessage);
  } , [changePasswordMessage])

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
        navigate("/");
      }

      if (!response.ok) {
        throw new Error("Error fetching profile");
      }

      const data = await response.json();
      const { customer, accessToken: newAccessToken } = data;

      localStorage.setItem("accessToken", newAccessToken);
      console.log("New accessToken", newAccessToken);
      setCustomer(customer);
      console.log("suanki customerim", customer);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateInfo = () => {
    
  };

  const handleMyOrders = () => {
   
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleChangePassword = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      if (!oldPassword || !newPassword || !newPasswordRepeat) {
        toast.error("Please fill in all password fields.");
        return;
      }

      

      const response = await fetch("http://localhost:5000/change-password", {
        method: "POST",
        headers: {
          Authorization:`Bearer ${accessToken}`
        },
        body: JSON.stringify({oldPassword, newPassword, newPasswordRepeat}),
      });

      const data = await response.json();
      console.log("suan aldıgım data" , data);
      setChangePasswordMessage(data.message);


      if (response.status === 200) {
        setTimeout(() => {
          handleLogout();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while changing the password.");
    }
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

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
          <span className="label">Customer ID:</span> {customer.customer_id} <span style={{color:"blue"}}> dennemme</span>
        </p>
        <p>
          <span className="label">Last Name:</span> {customer.last_name}
        </p>
        <p>
          <span className="label">Postal Code:</span> {customer.postal_code}
        </p>
      </div>

      <div className="password-container">
        <h2>Change Password</h2>
        <div>
          <label>Old Password:</label>
          <input
            type="text"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Repeat New Password:</label>
          <input
            type="text"
            value={newPasswordRepeat}
            onChange={(e) => setNewPasswordRepeat(e.target.value)}
          />
        </div>
        <button className="change-password-button" onClick={handleChangePassword}>
          Şifre Değiştir
        </button>
      </div>

      <div className="button-container">
        {/* Existing buttons */}
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

      <ToastContainer /> {/* Toast notifications container */}
    </div>
  );
};

export default Profile;
