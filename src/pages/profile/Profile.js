import React, {useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Suanki accessToken' , accessToken);
    if (!accessToken) {
      navigate('/error'); // Redirect to error page if no access token
    } else {
      fetchProfile(accessToken);
    }
  }, []);

  const fetchProfile = (accessToken) => {
    fetch('http://localhost:5000/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { customer, accessToken: newAccessToken } = data;
        localStorage.setItem('accessToken', newAccessToken);
        console.log("Yeni accessToken" , newAccessToken);
        setCustomer(customer);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        // Handle error here, e.g., show an error message or redirect to an error page
      });
  };

  if (!customer) {
    return <div>Loading...</div>; // Render a loading indicator while fetching profile
  }

  console.log(customer);

  return (
    <div>
      
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      {/* Display other customer information here */}
    </div>
  );
};

export default Profile;
