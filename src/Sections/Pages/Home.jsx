import { Box, Container, Typography, Button, Grid, Paper, useTheme } from '@mui/material';
import Carousel from '../../Usables/Carosuel';  // Assuming your Carousel component is here

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ pt: 2 }}>
      {/* Add Carousel Component */}
      <Carousel />

      {/* Hero Section */}
      <Container sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3, color: theme.palette.primary.main }}>
          Your Safety, Our Priority
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: "white" }}>
          Empowering women with the tools to protect themselves. Stay safe, connected, and in control, wherever you go.
        </Typography>
        <Button variant="contained" color="secondary" size="large" href="#features" sx={{ fontSize: '1.1rem' }}>
          Explore Safety Features
        </Button>
      </Container>

      {/* Features Section */}
      <Container id="features" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6 }}>
          Key Safety Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Feature 1: Emergency Alerts */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Instant Emergency Alerts
              </Typography>
              <Typography variant="body1" paragraph>
                Send distress signals with your location to your trusted contacts instantly. Your safety is just one click away.
              </Typography>
              <Button variant="outlined" color="primary" href="#alerts">
                Learn More
              </Button>
            </Paper>
          </Grid>
          {/* Feature 2: Live Location Tracking */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Real-Time Location Sharing
              </Typography>
              <Typography variant="body1" paragraph>
                Share your live location with trusted contacts for real-time updates. Always stay connected and protected.
              </Typography>
              <Button variant="outlined" color="primary" href="#location">
                Explore Location Sharing
              </Button>
            </Paper>
          </Grid>
          {/* Feature 3: Personal Safety Tips */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Personal Safety Tips
              </Typography>
              <Typography variant="body1" paragraph>
                Access expert advice and safety tips to protect yourself in various situations. Stay prepared with essential knowledge.
              </Typography>
              <Button variant="outlined" color="primary" href="#tips">
                Learn Safety Tips
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* About Section */}
      <Container sx={{ py: 8, backgroundColor: '#f4f4f4', borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 ,color:"black"}}>
              About Us: Empowering Women Everywhere
            </Typography>
            <Typography variant="body1" sx={{color:"black"}}>
              We are committed to ensuring that women everywhere feel safe, confident, and supported. Our app connects you to real-time protection, emergency contacts, and personal safety tools, giving you the power to take control of your own safety wherever you are.
            </Typography>
            <Button variant="contained" color="secondary" href="#about-us" sx={{ mt: 4 }}>
              Learn More About Us
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="https://www.azquotes.com/picture-quotes/quote-the-best-protection-any-woman-can-have-is-courage-elizabeth-cady-stanton-28-12-58.jpg" alt="About Us" style={{ width: '100%', borderRadius: 8 }} />
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6 }}>
          How We’ve Helped Women Stay Safe
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Testimonial 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 2 }}>
                {"The instant alerts give me peace of mind. I feel safer knowing I can reach out for help."}
              </Typography>
              <Typography variant="body1" paragraph>
                “I’ve used this app on several occasions and its always been there for me when I needed it the most. The support is unmatched.”
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Sarah J.
              </Typography>
            </Paper>
          </Grid>
          {/* Testimonial 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 2 }}>
                {"Being able to share my location with friends and family has made a huge difference."}
              </Typography>
              <Typography variant="body1" paragraph>
                “The real-time tracking feature is a game changer. It’s easy to use and gives me confidence wherever I go.”
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Emily R.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Ready to Feel Safe and Empowered?
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Join thousands of women who trust us to keep them safe. Download our app today and start protecting yourself in real-time.
        </Typography>
        <Button variant="contained" color="primary" size="large" href="#signup">
          Download the App Now
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;
