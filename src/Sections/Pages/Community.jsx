import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Iconify } from "../../assets/iconify";

const CommunitySection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [userRooms, setUserRooms] = useState([]);  // State to hold "Your Rooms"
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rooms/rooms");
        const result = await response.json();
        if (response.ok) {
          setRooms(result.rooms);
        } else {
          console.error(result.message || "Failed to fetch rooms.");
        }
      } catch (error) {
        console.error("An error occurred while fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchUserRoom = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rooms/rooms/user/677bce52482b05db83b21ba0");
        const result = await response.json();
        if (response.ok) {
          setUserRooms(result.rooms);  // Adding the fetched room to the user's rooms
        } else {
          console.error(result.message || "Failed to fetch user rooms.");
        }
      } catch (error) {
        console.error("An error occurred while fetching user room:", error);
      }
    };

    fetchUserRoom();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      name: roomName,
      description,
      isPrivate,
      createdBy: "677bce52482b05db83b21ba0",
    };

    try {
      const response = await fetch("http://localhost:5000/api/rooms/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Room created successfully!");
        setOpenModal(false);
        setRoomName("");
        setDescription("");
        setIsPrivate(false);
      } else {
        alert(result.message || "Failed to create room.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  // Filter rooms based on the search query
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", pr: 6 }}>
      <Box
        sx={{
          backgroundImage: "url(https://kaiz-in.com/wp-content/uploads/elementor/thumbs/LinkedIn-Cover-Banner-2-qddl7lsexdmlw4za8udhql9ncup2x0kbjabzur6t14.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
              Community Rooms
            </Typography>
            <Typography variant="h6" sx={{ color: "#ccc" }}>
              Let’s be a part of the strongest soldiers army
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1db954",
              color: "#fff",
              fontWeight: "bold",
              px: 3,
              py: 1,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#1ed760" },
            }}
            onClick={() => setOpenModal(true)}
          >
            Create New Room
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <TextField
            placeholder="Search rooms..."
            variant="outlined"
            sx={{
              flex: 1,
              mr: 2,
              backgroundColor: "#1e1e1e",
              borderRadius: 1,
            }}
            InputProps={{ style: { color: "#fff" } }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1db954",
              color: "#fff",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              minWidth: "unset",
              "&:hover": { backgroundColor: "#1ed760" },
            }}
          >
            <Iconify icon="ic:sharp-search" />
          </Button>
        </Box>

        <Divider sx={{ borderColor: "#333", mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Available Rooms
            </Typography>

            {loading ? (
              <Typography variant="h6" sx={{ color: "#ccc" }}>
                Loading rooms...
              </Typography>
            ) : (
              <List sx={{ backgroundColor: "#1e1e1e", borderRadius: 2, p: 2 }}>
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <ListItem
                      key={room._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "#2e2e2e",
                        borderRadius: 1,
                        mb: 2,
                        p: 2,
                      }}
                    >
                      <ListItemText
                        primary={room.name}
                        secondary={room.description}
                        primaryTypographyProps={{ style: { color: "#fff" } }}
                        secondaryTypographyProps={{ style: { color: "#ccc" } }}
                      />
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#1db954",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#1ed760" },
                        }}
                      >
                        Join
                      </Button>
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="h6" sx={{ color: "#ccc" }}>
                    No rooms found.
                  </Typography>
                )}
              </List>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Your Rooms
            </Typography>

            <List sx={{ backgroundColor: "#1e1e1e", borderRadius: 2, p: 2 }}>
              {userRooms.map((room) => (
                <ListItem
                  key={room._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#2e2e2e",
                    borderRadius: 1,
                    mb: 2,
                    p: 2,
                  }}
                >
                  <ListItemText
                    primary={room.name}
                    primaryTypographyProps={{ style: { color: "#fff" } }}
                    secondary={room.description}
                    secondaryTypographyProps={{ style: { color: "#ccc" } }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#1e1e1e",
            color: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            Create New Room
          </Typography>
          <TextField
            label="Room Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 3, backgroundColor: "#2e2e2e" }}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{ style: { color: "#fff" } }}
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 3, backgroundColor: "#2e2e2e" }}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{ style: { color: "#fff" } }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ color: "#ccc" }}>Is Private</InputLabel>
            <Box sx={{ mt: 2 }}>
              <Select
                value={isPrivate}
                onChange={(e) => setIsPrivate(e.target.value)}
                sx={{ backgroundColor: "#2e2e2e", color: "#fff" }}
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
            </Box>
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#1db954",
              color: "#fff",
              "&:hover": { backgroundColor: "#1ed760" },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CommunitySection;
