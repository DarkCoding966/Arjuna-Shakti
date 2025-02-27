import { Box, Drawer, AppBar } from "@mui/material";
import Navbar from "./Components/Navbar";
import DashboardLayout from "./Components/DashboardLayout";
import { Iconify } from "./assets/iconify";
import Footer from "./Components/Footer";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import 'leaflet/dist/leaflet.css';


const App = () => {
  return (
    <Router>
    <Box sx={{ display: "flex" }}>
      {/* Top Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201}}
      >
        <Navbar />
      </AppBar>

      {/* Left Drawer (Sidebar) */}
      <Drawer
        sx={{
          width: 80, // Compact drawer width
          flexShrink: 0,
          marginTop: "18vh",
          "& .MuiDrawer-paper": {
            width: 80, // Ensure drawer paper width matches
            backgroundColor: "#CE1F60",
            color: "#fff",
            marginTop: "15vh",
            position: "fixed", // Ensures it stays in place
            height: "60%", // Full height
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          },
        }}
        variant="permanent"
        anchor="left"
        open={true} // Drawer is always open
      >
        {/* Drawer content (compact, with icons and labels) */}
        <Box
          sx={{
            height: "100%",
            width: 50,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Example of a few icons representing sections */}
          <Link to="/fake">
          <Iconify
            icon="material-symbols:eye-tracking-sharp"
            sx={{
              color:"white",
              cursor: "pointer", // Adding pointer cursor for interactivity
              "&:hover": {
                transform: "scale(1.1)", // Slight scale on hover for effect
                transition: "0.3s", // Smooth transition for hover effect
              },
              height: 35,
              width: 35,
            }}
          />
          </Link>
         
         <Link to="/safeRoute">
          <Iconify
            icon="line-md:map-marker-multiple-alt-filled"
            sx={{
              color:"white",
              cursor: "pointer", // Adding pointer cursor for interactivity
              "&:hover": {
                transform: "scale(1.1)", // Slight scale on hover for effect
                transition: "0.3s", // Smooth transition for hover effect
              }, 
              height: 35,
              width: 35,
            }}
          />
          </Link>
          
          <Link to="/legal">
          <Iconify
            icon="material-symbols:balance"
            sx={{
              color:"white",
              cursor: "pointer", // Adding pointer cursor for interactivity
              "&:hover": {
                transform: "scale(1.1)", // Slight scale on hover for effect
                transition: "0.3s", // Smooth transition for hover effect
              }, height: 35,
              width: 35,
            }}
          />
          </Link>

          <Link to="/notice">
           <Iconify
            icon="line-md:file-document-filled"
            sx={{
              color:"white",
              cursor: "pointer", // Adding pointer cursor for interactivity
              "&:hover": {
                transform: "scale(1.1)", // Slight scale on hover for effect
                transition: "0.3s", // Smooth transition for hover effect
              }, height: 35,
              width: 35,
            }}
          />
          </Link>

          <Link to="/courses">
          <Iconify
            icon="material-symbols:laptop-chromebook-outline-rounded"
            sx={{
              color:"white",
              cursor: "pointer", // Adding pointer cursor for interactivity
              "&:hover": {
                transform: "scale(1.1)", // Slight scale on hover for effect
                transition: "0.3s", // Smooth transition for hover effect
              }, height: 35,
              width: 35,
            }}
          />
          </Link>

          <Link to="/schemes">
           <Iconify
            icon="material-symbols:account-balance-rounded"
            sx={{
              color:"white",
              cursor: "pointer", // Adding pointer cursor for interactivity
              "&:hover": {
                transform: "scale(1.1)", // Slight scale on hover for effect
                transition: "0.3s", // Smooth transition for hover effect
              }, height: 35,
              width: 35,
            }}
          />
        </Link>
        </Box>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: "64px", 
        }}
      >
        <DashboardLayout />
      </Box>
    </Box>
      <Footer />
    </Router>
  );
};

export default App;
