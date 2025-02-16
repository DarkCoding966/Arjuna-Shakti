import { useState } from "react";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import mockEvents from "../../_mock/notices.json"

const NoticePage = () => {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: "12px",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold" }}>
          📢 Notice Board
        </Typography>
        <Box display="flex">
          {/* Event List */}
          <Box width="35%" sx={{ borderRight: "1px solid rgba(255, 255, 255, 0.2)", pr: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              📅 Upcoming Events
            </Typography>
            <List>
              {mockEvents.map((event) => (
                <ListItem key={event.id} disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedEvent(event)}
                    sx={{
                      borderRadius: "8px",
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                      backgroundColor: selectedEvent.id === event.id ? "rgba(255, 255, 255, 0.3)" : "transparent",
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.date} | ${event.location}`}
                      primaryTypographyProps={{ fontWeight: "bold" }}
                      secondaryTypographyProps={{ color: "rgba(255, 255, 255, 0.7)" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Event Details */}
          <Box width="65%" sx={{ pl: 2 }}>
            {selectedEvent && (
              <Card
                elevation={3}
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  backdropFilter: "blur(8px)",
                  borderRadius: "12px",
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    {selectedEvent.title}
                  </Typography>
                  <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                    📍 {selectedEvent.location} | 🕒 {selectedEvent.date} | {selectedEvent.time}
                  </Typography>
                  <Divider sx={{ my: 2, backgroundColor: "rgba(255, 255, 255, 0.3)" }} />
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>🎯 Agenda:</strong> {selectedEvent.agenda}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>👗 Dress Code:</strong> {selectedEvent.dressCode}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>🎒 Bring:</strong> {selectedEvent.bring}
                  </Typography>
                  <Typography variant="body1">
                    <strong>🎤 Chief Guest:</strong> {selectedEvent.chiefGuest}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NoticePage;
