import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { Grid } from '@mui/material';
import { Copyright } from '@mui/icons-material';

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
  color: '#6b7280',
  backgroundColor: (theme) =>
    theme.palette.mode === 'light'
      ? theme.palette.grey[200]
      : theme.palette.grey[800],
};


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
      <Container
        maxWidth="900px"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
          backgroundColor: '#1F2937',

 
          
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color='#6b7280' gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color='#6b7280'>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
