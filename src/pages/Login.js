import React, { useState } from 'react';
import '../styles/Login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../images/aydinmedikal.jpg'


function Login({onLogin}) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { accessToken , message} = await response.json();
                
                localStorage.setItem('accessToken', accessToken);
                console.log(message);
                onLogin();
                navigate("/");
                
            } else {
                throw new Error(`HTTP error, status = ${response.status}`);
                
                
                
            }
        } catch (error) {
            setError(`Failed to log in: ${error.message}`);
            
        }
    };

        console.log(error);
        

    
    return (
        <div className="login-page">
            <img src={logo} alt="Logo" className="logo" />
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Log in</button>
                    <NavLink to="/forget-password">Forgot Password?</NavLink>
                    <NavLink to="/register" className='navlink-register'>
                        <div className='login-navlink-container'>
                            <p>You can register here!</p>
                        </div>
                    </NavLink>
                </form>
            </div>
        </div>
    );

}

export default Login;
