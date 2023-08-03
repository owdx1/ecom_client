import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import onluk1 from '../../images/onluk_1.jpg';
import tekUst1 from '../../images/tek-ust_1.jpg';
import tesettur1 from '../../images/tesettur_1.jpg';
import uFlex1 from '../../images/u-flex_1.jpg';
import tekUst2 from '../../images/tek-ust_2.jpg';
import tekAlt1 from '../../images/tek-alt_1.jpg';

const containerStyle = {
  textAlign: 'center',
  width: '100%',
  marginTop: '20px',
  overflowX: 'auto',
};

const cartStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  borderRadius: '4px',
  width: '180px',
  height: '350px',
  margin: '10px',
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'grab',
  transition: 'all 0.2s ease',
};

const imageStyle = {
  width: '150px',
  height: '150px',
  marginBottom: '8px',
  objectFit: 'contain',
};

const productNameStyle = {
  fontWeight: 'bold',
  fontSize: '18px',
};

const MostSaled = () => {
  const containerRef = React.useRef(null);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [isDraggingLink, setIsDraggingLink] = React.useState(false);

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseenter', handleMouseEnter);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  React.useEffect(() => {
    const handleLinkClick = (e) => {
      if (isDraggingLink) {
        e.preventDefault();
      }
    };
    const links = containerRef.current.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, [isDraggingLink]);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setIsDraggingLink(false);
    containerRef.current.style.cursor = 'grab';
  };

  const handleMouseLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      setIsDraggingLink(false);
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseEnter = () => {
    if (isMouseDown) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    setIsDraggingLink(true);
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div style={containerStyle}>
      <h2>En çok satanlar // burası düzenlenecek</h2>
      <Box
        ref={containerRef}
        sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'nowrap', maxWidth: '100%' }}
        onScroll={() => setScrollLeft(containerRef.current.scrollLeft)}
      >
        <div style={{ border: '1px solid', borderRadius: '3px', borderColor: 'lightgray' }}>
          <Link to="/search?search_parameter=u-flex Takım" style={{ ...cartStyle }}>
            <Card elevation={0} sx={{ ...cartStyle }}>
              <CardMedia component="img" image={uFlex1} alt="Product 1" style={{ ...imageStyle }} />
              <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                u-flex takımlar
              </Typography>
            </Card>
          </Link>
        </div>
        <div style={{ border: '1px solid', borderRadius: '3px', borderColor: 'lightgray' }}>
          <Link to="/search?search_parameter=onluk" style={{ ...cartStyle }}>
            <Card elevation={0} sx={{ ...cartStyle }}>
              <CardMedia component="img" image={onluk1} alt="Product 1" style={{ ...imageStyle }} />
              <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                Önlükler
              </Typography>
            </Card>
          </Link>
        </div>
        <div style={{ border: '1px solid', borderRadius: '3px', borderColor: 'lightgray' }}>
          <Link to="/search?search_parameter=tek ust" style={{ ...cartStyle }}>
            <Card elevation={0} sx={{ ...cartStyle }}>
              <CardMedia component="img" image={tekUst1} alt="Product 1" style={{ ...imageStyle }} />
              <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                core-flex tek üstler
              </Typography>
            </Card>
          </Link>
        </div>
        <div style={{ border: '1px solid', borderRadius: '3px', borderColor: 'lightgray' }}>
          <Link to="/search?search_parameter=tesettur" style={{ ...cartStyle }}>
            <Card elevation={0} sx={{ ...cartStyle }}>
              <CardMedia component="img" image={tesettur1} alt="Product 1" style={{ ...imageStyle }} />
              <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                Tesettürler
              </Typography>
            </Card>
          </Link>
        </div>
        <div style={{ border: '1px solid', borderRadius: '3px', borderColor: 'lightgray' }}>
          <Link to="/search?search_parameter=alt" style={{ ...cartStyle }}>
            <Card elevation={0} sx={{ ...cartStyle }}>
              <CardMedia component="img" image={tekAlt1} alt="Product 1" style={{ ...imageStyle }} />
              <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                Tek altlar
              </Typography>
            </Card>
          </Link>
        </div>
        <div style={{ border: '1px solid', borderRadius: '3px', borderColor: 'lightgray' }}>
          <Link to="/search?search_parameter=core-flex ust" style={{ ...cartStyle }}>
            <Card elevation={0} sx={{ ...cartStyle }}>
              <CardMedia component="img" image={tekUst2} alt="Product 1" style={{ ...imageStyle }} />
              <Typography variant="subtitle1" sx={{ ...productNameStyle }}>
                core-flex üstler
              </Typography>
            </Card>
          </Link>
        </div>
      </Box>
    </div>
  );
};

export default MostSaled;
