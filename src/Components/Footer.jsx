import { Box, Container, Grid, Typography, Button, Link } from '@mui/material';
import { Instagram, Twitter, Facebook, LinkedIn } from '@mui/icons-material';

const Footer = () => {

  return (
    <Box sx={{color: '#fff', py: 6,display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#333'}}>
      <Box sx={{width:100}} />
      <Container maxWidth="xl">
        <Grid container spacing={4} >
          

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box>
              <Link href="#features" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
                Features
              </Link>
              <Link href="#about-us" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
                About Us
              </Link>
              <Link href="#contact" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
                Contact Support
              </Link>
              <Link href="#faq" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
                FAQ
              </Link>
              <Link href="#privacy-policy" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
                Privacy Policy
              </Link>
              <Link href="#terms-of-service" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
                Terms of Service
              </Link>
            </Box>
          </Grid>

          {/* Logo and App Name */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                SafeHer
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Empowering women to take control of their safety. Instant protection, real-time alerts, and more.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" color="secondary" size="small">
                  <Link href="/download-ios" color="inherit" underline="none">
                    iOS App
                  </Link>
                </Button>
                <Button variant="outlined" color="secondary" size="small">
                  <Link href="/download-android" color="inherit" underline="none">
                    Android App
                  </Link>
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Stay Connected
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="https://www.facebook.com" target="_blank" color="inherit">
                <Facebook fontSize="large" />
              </Link>
              <Link href="https://www.twitter.com" target="_blank" color="inherit">
                <Twitter fontSize="large" />
              </Link>
              <Link href="https://www.instagram.com" target="_blank" color="inherit">
                <Instagram fontSize="large" />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" color="inherit">
                <LinkedIn fontSize="large" />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Section */}
        <Box sx={{ textAlign: 'center', mt: 4, borderTop: '1px solid #fff', pt: 4 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} SafeHer. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
