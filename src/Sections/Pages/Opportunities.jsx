import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Box,
} from "@mui/material";
import jobsData from "../../_mock/Jobs.json";

const OpportunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sector, setSector] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);

  useEffect(() => {
    let filtered = jobsData.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (sector ? job.sector === sector : true)
    );
    setFilteredJobs(filtered);
  }, [searchTerm, sector]);

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", margin: 3, fontWeight: "bold" }}
      >
        Explore Job Opportunities
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search Job Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 16,
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            sx={{
              bgcolor: "white",
              borderRadius: 16,
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
          >
            <InputLabel>Filter by Sector</InputLabel>
            <Select value={sector} onChange={(e) => setSector(e.target.value)}>
              <MenuItem value="">All Sectors</MenuItem>
              {[...new Set(jobsData.map((job) => job.sector))].map((sector) => (
                <MenuItem key={sector} value={sector}>
                  {sector}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 4,
                p: 2,
                bgcolor: "#FFF5F0",
                minHeight: "320px", // Ensure uniform height for all cards
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" fontWeight="bold">
                  {job.title}
                </Typography>
                <Typography color="text.secondary">{job.company}</Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {job.sector} • {job.location}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#FF5733", mt: 1 }}
                >
                  {job.salary}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1, fontSize: "14px" }}>
                  <strong>Qualification:</strong> {job.qualification}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  <strong>Experience:</strong> {job.experience}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    fontSize: "14px",
                    flexGrow: 1, // Allow content to fill available space
                  }}
                >
                  {job.description}
                </Typography>

                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {job.facilities.map((facility, index) => (
                    <Chip key={index} label={facility} variant="outlined" />
                  ))}
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: "#333",
                    color: "white",
                    borderRadius: 20,
                    px: 4,
                    "&:hover": { bgcolor: "#555" },
                  }}
                  href={job.apply_link}
                  target="_blank"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OpportunityPage;
