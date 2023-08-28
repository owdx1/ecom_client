import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import PersonIcon from '@mui/icons-material/Person'; 
import { Link as RouterLink,Route } from 'react-router-dom';
import { Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

function ListItem(props) {
  return <li {...props} />;
}

function ListItemText(props) {
  return <Typography component="span" variant="inherit" color="text.primary" {...props} />;
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Aydın Forma Medikal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();



export default function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken || adminToken === 'undefined') {
      navigate('/admin/login');
    } 
  }, []);




  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme} >
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
            
          </Toolbar>
          <Divider />

          
          <List>
            <RouterLink to="/admin/products" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                
                  <ShoppingCartIcon /> Tüm ürünler
                
                <ListItemText primary="Products" />
              </ListItem>
            </RouterLink>

            
            <RouterLink to="/admin/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                
                  <ShoppingCartIcon /> Tüm siparişler
                
                <ListItemText primary="Tüm Siparişler" />
              </ListItem>
            </RouterLink>

            
            <RouterLink to="/admin/customers" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                
                  <PersonIcon /> Tüm müşterileri
                
                <ListItemText primary="Müşteriler" />
              </ListItem>
            </RouterLink>
          </List>
          
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
            
            <div style={{display:'block'}}>
              
              {/*<Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
                </Grid>*/}
              
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    width:'300px',
                    marginBottom:'30px'
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width:'780px'}}>
                  <Orders />
                </Paper>
              </Grid>
            </div>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
