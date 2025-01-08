import { useState, useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

// Theme Colors
const darkBg = "#121212";

// Predefined Safe Locations
const safeLocations = [
  { name: "Police Station", lat: 12.9716, lng: 77.5946 },
  { name: "Hospital", lat: 12.9646, lng: 77.6101 },
  { name: "Community Hall", lat: 12.9481, lng: 77.5981 },
  { name: "Mall", lat: 12.9350, lng: 77.6185 },
];

const NearestSafePlace = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [directions, setDirections] = useState(null);

  // Use Geolocation API to get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Calculate nearest safe location
  const getNearestSafeLocation = () => {
    let nearestLocation = null;
    let minDistance = Infinity;

    safeLocations.forEach((location) => {
      const distance = calculateDistance(userLocation, location);
      if (distance < minDistance) {
        minDistance = distance;
        nearestLocation = location;
      }
    });

    return nearestLocation;
  };

  // Calculate distance between two points (in kilometers)
  const calculateDistance = (loc1, loc2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const dLon = (loc2.lng - loc1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * (Math.PI / 180)) *
        Math.cos(loc2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Show all safe locations
  const showAllSafeLocations = (map) => {
    safeLocations.forEach((location) => {
      new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        },
      });
    });
  };

  // Connect to the nearest safe location
  const connectFast = (map) => {
    const nearestLocation = getNearestSafeLocation();
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: userLocation.lat, lng: userLocation.lng },
        destination: { lat: nearestLocation.lat, lng: nearestLocation.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          map.setCenter(nearestLocation);
          map.setZoom(14);
        }
      }
    );
  };

  return (
    <Box
      sx={{
        p: 4,
        pt: 0,
        backgroundColor: darkBg,
        minHeight: "100vh",
        borderRadius: 4,
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
        Nearest Safe Places
      </Typography>

      <Paper
        sx={{
          height: "70vh",
          width: "100%",
          maxWidth: "900px",
          borderRadius: 8,
          border: "6px solid gold",
          overflow: "hidden",
        }}
      >
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{
              height: "100%",
              width: "100%",
            }}
            center={userLocation}
            zoom={14}
            onLoad={(map) => {
              if (userLocation.lat !== 0) {
                showAllSafeLocations(map);
              }
            }}
          >
            {userLocation.lat !== 0 && (
              <>
                {/* User Location Marker */}
                <Marker
                  position={userLocation}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                />
              </>
            )}

            {/* Show directions to the nearest safe location */}
            {directions && <DirectionsRenderer directions={directions} />}

            <Box
              sx={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "10px 20px",
                borderRadius: "25px",
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Current Location
            </Box>
          </GoogleMap>
        </LoadScript>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => showAllSafeLocations()}
          sx={{
            backgroundColor: "#FF5722",
            "&:hover": {
              backgroundColor: "#D32F2F",
            },
          }}
        >
          Show All Safe Locations
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => connectFast()}
          sx={{
            backgroundColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#388E3C",
            },
          }}
        >
          Connect Fast
        </Button>
      </Box>
    </Box>
  );
};

export default NearestSafePlace;
