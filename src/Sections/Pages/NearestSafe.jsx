import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import crimeData from "../../_mock/crime.json"; // Ensure this path is correct

// Process crime data to extract latitude, longitude, and crime intensity
const processCrimeData = (data) => {
  return data.map((crime) => ({
    lat: crime.Latitude,
    lng: crime.Longitude,
    weight: 
      crime.murder * 5 + 
      crime.rape * 4 + 
      crime.robbery * 3 + 
      crime.kidnapping_abduction * 2 + 
      crime.theft * 1, // Assigning weights based on severity
  }));
};

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(points, {
      radius: 20,
      blur: 15,
      maxZoom: 10,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

HeatmapLayer.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const SafeZoneHeatmap = () => {
  const heatmapPoints = processCrimeData(crimeData);
  const defaultCenter = [20.5937, 78.9629]; // Centered on India
  const zoomLevel = 5;

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
        SafeZone Heatmap - India
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
          center={defaultCenter}
          zoom={zoomLevel}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <HeatmapLayer points={heatmapPoints} />
        </MapContainer>
      </Box>
    </Box>
  );
};

export default SafeZoneHeatmap;
