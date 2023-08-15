import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import dummyImage from '../images/tomy1.jpg'
import Adversitement from './shop/Adversitement';
import '../styles/Preview.css'
import { useState } from 'react';
import { WhatsApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HorizontalSection from './shop/HorizontalSection';


const tiers = [
  {
    title: 'Likralı Fuşya Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    price: '399,99',
    fakePrice:'529,99',
    description: [
    
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/likralitakimlar/fu%C5%9Fya/fusya-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/fu%C5%9Fya3-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Antrasit Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    subheader: 'En popüler',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'contained',
    photoUrl : [
      'https://www.classuniforma.com/image/cache/catalog/antra-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/antrasit2-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Fırtına Mavisi Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/likralitakimlar/firtina/f%C4%B1rt%C4%B1nas-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/04/f%C4%B1rt%C4%B1na1-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Gül Kurusu Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    subheader: '',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/guldn-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/gulkurusu3-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Haki Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    subheader: '',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/likralitakimlar/haki/haki-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/haki2-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Lacivert Hemşire Forması (Scrubs Cerrahi Takım)',
    subheader: '',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/10801621lacivert-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/urunler/likralitakimlar/LAC%C4%B0VERT/LAC%C4%B0VERTKADIN20201-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Lila Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    subheader: '',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/likralitakimlar/lila/lil-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/lila1-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Mürdüm Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    subheader: '',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/likralitakimlar/murdum/murd-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/murdum-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Petrol Yeşili Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/likralitakimlar/a%C3%A7%C4%B1kpetrolyesili/apy-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/petrolyesili2-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Vişne Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    subheader: '',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/likralitakimlar/visne/visne-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/visne4-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Pudra Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    subheader: '',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/urunler/likralitakimlar/pudra/pudras-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/pudra2-627x941h.jpg'
    ]
  },
  {
    title: 'Likralı Saks Mavisi Hemşire ve Doktor Forması (Scrubs Cerrahi Takım)',
    subheader: '',
    price: '399,99',
    fakePrice:'529,99',
    description: [
      
    ],
    buttonText: 'İletişime geç',
    buttonVariant: 'outlined',
    photoUrl: [
      'https://www.classuniforma.com/image/cache/catalog/skss-627x941w.jpg',
      'https://www.classuniforma.com/image/cache/catalog/2023/03/saks1-627x941h.jpg'
    ]
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];


const defaultTheme = createTheme();

export default function Preview() {

  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);

  const handleImageHover = (index) => {
    setHoveredImageIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredImageIndex(null);
  };




  return (
    <ThemeProvider theme={defaultTheme}>
  
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        
      </AppBar>
      
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Aydın Formadan İndirimli Fırsatları Kaçırmayın!
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
        Değerli Sendikalı Üyelerimiz,

Aydın Forma ailesi olarak, sağlık sektöründeki kıymetli çalışmalarınızı ve özverili çabalarınızı takdir ediyoruz. Sizler, toplum sağlığını korumak ve desteklemek adına her gün büyük bir özveri ile çalışıyorsunuz. Biz de bu değerli çabanızı desteklemek ve minnettarlığımızı göstermek adına özel bir fırsat sunmak istiyoruz.

Medikal formaların öncü markası olarak, Aydın Forma olarak amacımız, siz sağlık çalışanlarının günlük zorluklarını en iyi şekilde aşmanıza yardımcı olmaktır. Bu sebeple, sendika üyelerimize özel indirimler sunmaktan büyük mutluluk duyuyoruz. Sizlere en kaliteli ürünleri en uygun fiyatlarla sunarak, çalışma ortamınızı daha rahat ve konforlu hale getirmeyi amaçlıyoruz.
        </Typography>
        <Link to={`https://wa.me/905322557015?text=Hello%20there%2C%20I%20have%20a%20pre-made%20message%20for%20you!`} target="_blank" rel="noopener noreferrer">
          <Typography variant="h5" align="center" color="text.secondary" component="p" style={{marginTop:'20px'}}>
            <WhatsApp style={{ fontSize: 100, color:'green'}} />
            WhatsApp'tan iletişime geçin!
          </Typography>
        </Link>
        
      </Container>
      
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier , index) => (
            
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <img 
                src={hoveredImageIndex === index ? tier.photoUrl[1] : tier.photoUrl[0]}
                style={{width:'300px'}}
                className='image-zoom'
                onMouseEnter={() => handleImageHover(index)} 
                onMouseLeave={handleImageLeave}
                
                />
                

                

                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      gap: '8px', // Added gap for spacing between prices
                      mb: 2,
                    }}
                  >
                    
                    <Typography variant="h6" color="text.secondary">
                      <span style={{ color: 'crimson', textDecoration: 'line-through' }}>{tier.fakePrice}</span>
                    </Typography>
                    <Typography component="h2" variant="h5" color="text.primary">
                      {tier.price}TL
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <HorizontalSection/>
      <Adversitement/>
      
      
    </ThemeProvider>
  );
}