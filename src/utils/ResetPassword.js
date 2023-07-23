import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handlePasswordChange = (event) => {
    setPassword1(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setPassword2(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (password1 !== password2) {
      toast.error('Şifreler eşleşmiyor.');
      return;
    } else if (password1.length < 6) {
      toast.error('Şifre uzunluğu 6 dan büyük olmalıdır.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password1)) {
      toast.error('Şifre en az 6 karakter uzunluğunda, en az 1 harf ve rakam içermelidir.');
      return;
    }

    // Send password reset request
    try {
      const response = await fetch('/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password1, password2 }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message); // Password successfully reset
      } else {
        toast.error(data.message); // Display error message if the request fails
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server Error'); // Display a generic error message for server-related issues
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input type="password" value={password1} onChange={handlePasswordChange} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={password2} onChange={handleConfirmPasswordChange} />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
