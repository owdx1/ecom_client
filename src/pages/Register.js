import React, { useState } from 'react';
import '../styles/Register.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                setRegisterSuccess(true);
                //navigate('/login')
            } else {
                throw new Error(`HTTP error, status = ${response.status}`);
            }

        } catch (error) {
            setError(`Failed to register: ${error.message}`);
        }
    };

    return (
        <div className="registerContainer">
            <form className="registerForm" onSubmit={handleRegister}>
                <input
                    className="inputField"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="registerButton" type="submit">
                    Register
                </button>
                {error && <p className="errorMsg">{error}</p>}
                {registerSuccess && 
                    <div>
                        <p className="successMsg">Registration Successful! Please navigate to the Login page.</p>
                        <NavLink className="loginLink" to="/login">Go to Login</NavLink>
                    </div>
                }
            </form>
        </div>
    );
}
