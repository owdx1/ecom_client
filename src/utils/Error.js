import React from 'react';

const Error = () => {
  return (
    <div className="error-div" style={styles.container}>
      <div className="image-div" style={styles.image}></div>
      
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: "url(https://www.creativehatti.com/wp-content/uploads/edd/2021/03/Flat-404-Error-page-template-design-13-Medium.jpg)",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    margin: '30px auto'
  },
  image: {
    width: '200px',
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.5rem',
  },
};

export default Error;
