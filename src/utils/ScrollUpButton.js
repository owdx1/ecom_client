import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '../styles/ScrollUpButton.css'

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`scroll-up-button ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </div>
  );
};

export default ScrollUpButton;
