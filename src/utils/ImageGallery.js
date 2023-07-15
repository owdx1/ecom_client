import React from 'react';

const ImageGallery = ({ slides, currentIndex, setActiveIndex }) => {
  const imageContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '16px',
  };

  const imageStyles = {
    width: '150px',
    height: 'auto',
    margin: '8px 0',
    cursor: 'pointer',
    border: '2px solid #ccc',
  };

  const activeImageStyles = {
    ...imageStyles,
    border: '2px solid blue',
  };

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div style={imageContainerStyles}>
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.url}
          alt={slide.title}
          style={index === currentIndex ? activeImageStyles : imageStyles}
          onClick={() => handleImageClick(index)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
