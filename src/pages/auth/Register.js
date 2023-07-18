import React, { useEffect, useState } from 'react';
import { NavLink} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    
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
    const [isLoggedIn , setIsLoggedIn] =  useState(false);
    
    const [error, setError] = useState(null);

    const [backEndMessage , setBackEndMessage] = useState("");
    const navigate = useNavigate();
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
            const {message} = responseData;
            const{loggedIn} = responseData;
            setIsLoggedIn(loggedIn);
            setBackEndMessage(message);


            
            if(!response.ok){
                throw new Error(responseData.message || 'Failed to register');
            }

        } catch (error) {
            setError(`Failed to register: ${error.message}`);
        }
    };

    useEffect(() => {
        if(backEndMessage !== '')toast.warn(backEndMessage);
    } , [backEndMessage]);

    useEffect(() => {
        let intervalId;
      
        if (isLoggedIn) {
          intervalId = setInterval(() => {
            navigate('/login');
          }, 3000);
        }
      
        return () => {
          clearInterval(intervalId);
        };
      }, [isLoggedIn, navigate]);



    return (
        <div className="registerContainer">
            <form className="registerForm" onSubmit={handleRegister}>
                email
                <input
                    className="inputField"
                    type="email"
                    placeholder="aydin@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />şifre
                <input
                    className="inputField"
                    type="password"
                    placeholder="Password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                />şifre tekrarı 
                <input
                    className="inputField"
                    type="password"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                />adres
                <input
                    className="inputField"
                    type="text"
                    placeholder="Manisa şehir hastanesi"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />postal kodu
                <input
                    className="inputField"
                    type="text"
                    placeholder="45000"
                    value={postalcode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                />ülke
                <input
                    className="inputField"
                    type="text"
                    placeholder="Türkiye"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />İsim
                <input
                    className="inputField"
                    type="text"
                    placeholder="Oğulcan"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />soyisim
                <input
                    className="inputField"
                    type="text"
                    placeholder="Bozkurt"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />şehir
                <input
                    className="inputField"
                    type="text"
                    placeholder="Manisa"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />telefon numarası
                <input
                    className="inputField"
                    type="text"
                    placeholder="0507 599 36 85"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <button className="registerButton" type="submit" onClick={handleRegister}>
                    Kayıt ol
                </button>
                {error && <p className="errorMsg">{error}</p>}
                
                <div>
                    {
                        isLoggedIn && (
                    
                        <NavLink to='login'>
                            giriş yap  
                        </NavLink>
                        )}
                    
                    
                </div>
                
            </form>
                <ToastContainer/>
        </div>
    );
}
