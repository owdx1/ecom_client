import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';

export default function Register() {
    //const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    
    const [address, setAddress] = useState('');
    const [postalcode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password1,
                    password2,
                    address,
                    postalcode,
                    country,
                    firstname,
                    lastname,
                    city,
                    phoneNumber,
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                setRegisterSuccess(true);
                // navigate('/login');
            } else {
                throw new Error(responseData.message || 'Failed to register');
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
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="password"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="text"
                    placeholder="Postal Code"
                    value={postalcode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <input
                    className="inputField"
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <button className="registerButton" type="submit">
                    Register
                </button>
                {error && <p className="errorMsg">{error}</p>}
                {registerSuccess && (
                    <div>
                        <p className="successMsg">Registration Successful! Please navigate to the Login page.</p>
                        <NavLink className="loginLink" to="/login">
                            Go to Login
                        </NavLink>
                    </div>
                )}
            </form>
        </div>
    );
}
