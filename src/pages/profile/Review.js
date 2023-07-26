import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Review({ getNumberOfProductsInCart }) {
  const addresses = [];
  const navigate = useNavigate();
  const location = useLocation();
  const [backEndMessage, setBackEndMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const { dataDisplay, totalPrice, formData } = location.state;
  addresses.push(formData.address1, formData.city, formData.country, formData.zip);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Current accessToken', accessToken);
    if (!accessToken || accessToken === 'undefined') {
      navigate('/error');
    }
  }, []);

  const handleBuy = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:5000/profile/cart/buy', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        method: 'POST'
      });

      const data = await response.json();
      const message = data.message;

      setBackEndMessage(message);

      if (response.status === 200) {
        getNumberOfProductsInCart(accessToken);
        localStorage.setItem('accessToken', data.accessToken);
        setOpenDialog(true);
        setButtonClicked(true);
      } else {
        throw new Error('Error fetching Cart');
      }

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    if (backEndMessage !== '') toast.warn(backEndMessage);
  }, [backEndMessage]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '30px' }}>
      <Typography variant="h6" gutterBottom>
        Sipariş Özeti
      </Typography>
      <List disablePadding>
        {dataDisplay.map((product) => (
          <ListItem key={product.product_id} sx={{ py: 1, px: 0 }}>
            <img src={dummyImage} alt="Dummy Product" style={{ width: '100px', height: '100px', marginRight: '20px' }} />
            <ListItemText primary={product.product_name} secondary={product.description} />
            <ListItemText primary={`Quantity: ${product.orderquantity}`} />
            {product.size && <Typography variant="body2" style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', margin: '0.5rem 0.2rem' }}>{product.size}</Typography>}
            {product.size_i !== 0 && <Typography variant="body2" style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', margin: '0.5rem 0.2rem' }}>{product.size_i}</Typography>}
            <Typography variant="body2">{`Price: $${product.price}`}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {`Total Price: $${totalPrice}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom style={{ mt: '2rem' }}>
            Teslimat
          </Typography>
          <Typography gutterBottom>{formData.name}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom style={{ mt: '2rem' }}>
            Alıcı Bilgileri
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>{`${formData.firstName} ${formData.lastName}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{formData.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{formData.phone}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{`Total Price: ${totalPrice} TL`}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleBuy} disabled={buttonClicked}>{/**make it unclickable checking the buttonClickedVariable */}
          Siparişi tamamla
        </Button>

        
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ style: { borderRadius: '16px' } }}>
          <DialogTitle style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '4rem', marginBottom: '1rem' }} role="img" aria-label="tick">✅</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ textAlign: 'center' }}>
              Siparişiniz başarıyla tamamlandı!
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Link href="/profile/orders" underline="none">
              Siparişler
            </Link>
            <Link href="/" underline="none">
              Anasayfa
            </Link>
            <Button onClick={() => setOpenDialog(false)}>Kapat</Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <ToastContainer />
    </div>
  );
}

