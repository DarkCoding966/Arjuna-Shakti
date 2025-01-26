import { MapContainer, TileLayer } from "react-leaflet";
import { Box, Typography } from "@mui/material";

const OpenStreetMapDelhi = () => {
  // Coordinates for Delhi's approximate center
  const delhiCoordinates = [28.6139, 77.2090];
  const zoomLevel = 11; // Adjust to change the zoom level

  return (
    <Box
      sx={{
        p: 4,
        pt: 2,
        backgroundColor: "#121212",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "serif",
          fontWeight: "bold",
          pt: 2,
          pb: 2,
          color: "white",
        }}
      >
        OpenStreetMap - Delhi
      </Typography>

      <Box
        sx={{
          height: "70vh",
          width: "100%",
          maxWidth: "900px",
          borderRadius: 8,
          overflow: "hidden",
          border: "6px solid gold",
        }}
      >
        <MapContainer
          center={delhiCoordinates}
          zoom={zoomLevel}
          style={{ height: "100%", width: "100%" }}
        >
          {/* TileLayer to load OpenStreetMap tiles */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </Box>
    </Box>
  );
};

export default OpenStreetMapDelhi;
