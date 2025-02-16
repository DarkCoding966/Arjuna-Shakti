import { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, CardActions, Button, Box, Divider } from "@mui/material";
import { styled } from "@mui/system";
import schemesData from "../../_mock/govt.json"; // Import the JSON file

const StyledCard = styled(Card)({
  background: "#fff3e0",
  color: "#3e2723",
  borderRadius: "16px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#d84315",
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#bf360c",
  },
});

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    setSchemes(schemesData.womenEmpowermentSchemes);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h4" align="start" gutterBottom sx={{ fontWeight: "bold", color: "#d84315",mb:2 }}>
        Women Empowerment Schemes
      </Typography>
      <Divider sx={{border:2,mb:4}}/>
      <Grid container spacing={4}>
        {schemes.map((scheme, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#5d4037" }}>
                  {scheme.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6d4c41" }}>
                  <strong>Launch Year:</strong> {scheme.year}
                </Typography>
                <Box component="ul" sx={{ mt: 1, pl: 2, color: "#5d4037" }}>
                  {scheme.objectives.map((obj, i) => (
                    <Typography key={i} component="li" variant="body2">
                      {obj}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <StyledButton size="small" href={scheme.link}>Learn More</StyledButton>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Schemes;
