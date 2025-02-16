import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Iconify } from "../assets/iconify/iconify";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#181818",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        padding: "0 20px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Project Name */}
        <Box sx={{ display: "flex", alignItems: "center" }} onClick={()=>navigate("/")}>
          <img
            src="https://cdn3.iconfinder.com/data/icons/feminism-flat-outline-girl-power/512/Protect_womens_right-1024.png"
            alt="Logo"
            style={{ width: "50px", height: "50px", paddingBottom: 5 }}
          />
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#FF69B4",
              cursor: "pointer",
              "&:hover": {
                color: "#FFC0CB",
              },
            }}
          >
            SHAKTI
          </Typography>
        </Box>

        {/* Navigation Options */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Button
            sx={{
              textDecoration: "none",
              color: "#FF69B4",
              fontWeight: "bold",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#FF69B420",
                color: "#FFC0CB",
                cursor: "pointer",
              },
            }}
            onClick={()=>navigate("/")}
          >
            Home
          </Button>
          <Button
            sx={{
              textDecoration: "none",
              color: "#FF69B4",
              fontWeight: "bold",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#FF69B420",
                color: "#FFC0CB",
                cursor: "pointer",
              },
            }}
            onClick={()=>navigate("/trending")}
          >
            Trending
          </Button>
          <Button
            sx={{
              color: "#FF69B4",
              fontWeight: "bold",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#FF69B420",
                color: "#FFC0CB",
              },
            }}
            onClick={()=>navigate("/jobs")}
          >
            Opportunities
          </Button>
          <Button
            sx={{
              color: "#FF69B4",
              fontWeight: "bold",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#FF69B420",
                color: "#FFC0CB",
              },
            }} 
            onClick={()=>navigate("/AboutUs")}
          >
            About Us
          </Button>
          <Button
            sx={{
              color: "#FF69B4",
              fontWeight: "bold",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#FF69B420",
                color: "#FFC0CB",
              },
            }}
          >
            <Iconify icon="line-md:account" />
          </Button>
        </Box>

        {/* Hamburger Menu for Mobile */}
        <IconButton
          edge="end"
          sx={{
            color: "#FF69B4",
            display: { xs: "flex", sm: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
