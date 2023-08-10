import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const theme = createTheme();

const footerStyles = {
  display: 'flex',
  flexDirection: 'row', // Align items horizontally
  minHeight: '93vh',
  justifyContent: 'space-between', // Spread items across the horizontal space
};

const footerContentStyles = {
  py: 3,
  px: 2,
  mt: 'auto',
  backgroundColor: (theme) =>
    theme.palette.mode === 'light'
      ? theme.palette.grey[200]
      : theme.palette.grey[800],
};

const footerLinkStyles = {
  display: 'block',
  margin: '8px 0',
};

const footerColumnStyles = {
  display: 'flex',
  flexDirection: 'column', // Align links vertically
  alignItems: 'flex-start', // Align links to the start of the column
};

export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={footerStyles}>
        <Box component="footer" sx={footerContentStyles} style={{ height: '600px', width:'100%' }}>
          <Container maxWidth="sm">
            <div style={footerColumnStyles}>
              <Typography variant="body1">
                DÜZELCEK
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {'Copyright © '}
                <Link color="inherit" href="http://localhost:3000/">
                  vobe
                </Link>
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </div>
            <div style={footerColumnStyles}>
              <Typography variant="h6" color="text.secondary" style={footerLinkStyles}>
                Sipariş:
              </Typography>
              <Typography variant="body2" style={footerLinkStyles}>
                <Link href="#">Sipariş</Link>
                <Link href="#">Teslimat</Link>
                <Link href="#">İadeler ve Geri Ödemeler</Link>
                <Link href="#">Sipariş Takip</Link>
              </Typography>
            </div>
            <div style={footerColumnStyles}>
              <Typography variant="h6" color="text.secondary" style={footerLinkStyles}>
                Müşteri Hizmetleri:
              </Typography>
              <Typography variant="body2" style={footerLinkStyles}>
                <Link href="#">İşlem Rehberi</Link>
                <Link href="#">Nasıl Yardımcı Olabiliriz?</Link>
                <Link href="#">Bize Ulaşın</Link>
                <Link href="#">Beden Tablosu</Link>
                <Link href="#">Taklit Ürünler</Link>
                <Link href="#">Site Haritası</Link>
                <Link href="#">S.S.S</Link>
              </Typography>
            </div>
            <div style={footerColumnStyles}>
              <Typography variant="h6" color="text.secondary" style={footerLinkStyles}>
                Hakkımızda:
              </Typography>
              <Typography variant="body2" style={footerLinkStyles}>
                <Link href="#">Hakkımızda</Link>
                <Link href="#">Şirket Hakkında</Link>
                <Link href="#">Gizlilik Politikası</Link>
                <Link href="#">Çerez Politikası</Link>
                <Link href="#">Şirket Politikası</Link>
                <Link href="#">Mağazalarımız</Link>
              </Typography>
            </div>
            <div style={footerColumnStyles}>
              <Typography variant="h6" color="text.secondary" style={footerLinkStyles}>
                Popüler Kategoriler:
              </Typography>
              <Typography variant="body2" style={footerLinkStyles}>
                <Link href="#">Uflex takımlar</Link>
                <Link href="#">Coroflex takımlar</Link>
                <Link href="#">Tek üstler</Link>
                <Link href="#">Tek altlar</Link>
                <Link href="#">Boneler</Link>
                <Link href="#">Terlikler</Link>
              </Typography>
              <Typography variant="h6" color="text.secondary" style={footerLinkStyles}>
                Bize Katıl:
              </Typography>
              <Typography variant="body2" style={footerLinkStyles}>
                <Link href="#">Kariyer</Link>
              </Typography>
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
