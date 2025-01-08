import { Grid, Typography, Card, CardContent, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <Box sx={{  backgroundColor: '#121212',color: 'white', minHeight: '100vh', padding: 4 ,mr:4,borderRadius:4}}>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#ff4081' }}>
          About Us
        </Typography>
        <Typography variant="h6" align="center" paragraph sx={{ color: '#B0BEC5' }}>
          Welcome to <strong style={{ color: '#ff4081' }}>SafeGuard</strong>, a pioneering initiative
          focused on providing women with advanced safety tools, predictive alerts, and a
          comprehensive safety ecosystem. We are committed to creating a safer world for women
          using innovative technologies.
        </Typography>
      </motion.div>

      {/* Cards Section */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Mission Card */}
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Card sx={{ backgroundColor: '#1e1e1e', height: '100%', boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: '#ff4081' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: '#B0BEC5' }}>
                  At SafeGuard, our mission is to leverage cutting-edge technology and predictive
                  analytics to enhance the safety and empowerment of women worldwide. Our goal is
                  to reduce violence and give women peace of mind wherever they are.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Approach Card */}
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Card sx={{ backgroundColor: '#1e1e1e', height: '100%', boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: '#ff4081' }}>
                  Our Approach
                </Typography>
                <Typography variant="body1" sx={{ color: '#B0BEC5' }}>
                  We combine data-driven safety alerts, predictive route suggestions, and real-time
                  safety features to create a comprehensive safety platform for women. Our approach
                  is built on collaboration, innovation, and a dedication to change.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Ideology Section */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Ideology Card */}
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Card sx={{ backgroundColor: '#1e1e1e', height: '100%', boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: '#ff4081' }}>
                  Our Ideology
                </Typography>
                <Typography variant="body1" sx={{ color: '#B0BEC5' }}>
                  SafeGuard is founded on the belief that every woman deserves to live, work, and
                  travel freely without fear. We believe in data transparency, user privacy, and the
                  power of technology to enable safer spaces for all women.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Change We Want to Bring Card */}
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Card sx={{ backgroundColor: '#1e1e1e', height: '100%', boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: '#ff4081' }}>
                  The Change We Want to Bring
                </Typography>
                <Typography variant="body1" sx={{ color: '#B0BEC5' }}>
                  Our goal is to reduce the incidents of violence against women by empowering them
                  with safety tools, real-time alerts, and predictive models. We aim to create a
                  ripple effect in society by promoting awareness and collaboration for a safer world.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Contact Button */}
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ff4081',
              color: 'white',
              '&:hover': { backgroundColor: '#d40057' },
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '25px',
            }}
            onClick={() => window.location.href = "/contact"}
          >
            Contact Us
          </Button>
        </motion.div>
      </Box>
      </Box>
  );
};

export default AboutUs;
