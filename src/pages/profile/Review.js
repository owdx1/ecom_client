import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from 'react-router-dom';
import dummyImage from '../../images/cat.jpg';
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
  const [dataDisplay , setDataDisplay] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({});

  
  useEffect(() =>{
    setDataDisplay(location.state.dataDisplay);
    setTotalPrice(location.state.totalPrice);
    setFormData(location.state.formData);

    console.log('suanki totalPrice', totalPrice);


  } , [totalPrice])
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
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        method: 'POST',
        body: JSON.stringify({totalPrice}),
      });
      console.log('tptalprice',totalPrice);
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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom style={{color:'gray'}}>
        Sipariş Özeti
      </Typography>
      <List disablePadding>
        {dataDisplay.map((product) => {

          let url = '';
          const photoUrls = product.photoUrls;
          const singleArray = photoUrls[0];
          console.log('single array' , singleArray);
          if(singleArray === undefined){
            url = 'https://i.ibb.co/tbRJ8N9/id-15.jpg'
          } else{
            url = singleArray.url;
          }



        return (
          <ListItem key={product.product_id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap:'20px'}}>
            <img src={url} alt="Dummy Product" style={{ width: '140px',  marginRight: '20px', borderRadius:'10px' }} />
            <div>
              <ListItemText primary={product.product_name} secondary={product.description}/>
              <Typography>{product.color}</Typography>
              <ListItemText primary={`Miktar: ${product.orderquantity}`} />
              <ListItemText variant="body2" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', padding: '4px 8px', borderRadius: '4px' , color:'white'}}>Beden: {product.size}</ListItemText>
              
            </div>
          </ListItem>
        )})}
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} style={{marginTop:'20px'}}>
          <Typography variant="h4" gutterBottom>
            Teslimat
          </Typography>
          <Typography gutterBottom>{formData.name}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6} style={{marginTop:'20px'}}>
          <Typography variant="h4" gutterBottom>
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
              <Typography variant="subtitle1" style={{ fontWeight: 100, fontSize: '24px', marginTop: '10px' }}>
                {`Toplam Fiyat: ${totalPrice} TL`}
              </Typography>
            </React.Fragment>
          </Grid>
        </Grid>
        <Button
          
          color="primary"
          onClick={handleBuy}
          disabled={buttonClicked}
          style={{
            marginLeft:'30px',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: '10px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            transition: 'background 0.3s ease-in-out, transform 0.2s ease',
            border: 'none',
          }}
        >
          Siparişi Tamamla
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
            <Link href="/profile/orders" underline="none" style={{ marginRight: '10px' }}>
              Siparişler
            </Link>
            <Link href="/" underline="none" style={{ marginLeft: '10px' }}>
              Anasayfa
            </Link>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Kapat
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <ToastContainer />
    </div>
  );
}
