import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";

const QuoteBox = styled(Box)({
  position: "absolute",
  bottom: "-20px",
  left: "-10px",
  backgroundColor: "#1E3A8A",
  color: "white",
  padding: "16px",
  borderRadius: "8px",
  width: "250px",
});

const LandingPage = () => {
    const navigate = useNavigate();


  return (
    <Box>
      {/* Navbar */}
      <NavigationBar/>

      {/* Hero Section */}
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" color="primary">
              We are Digital Agency.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 4 }}>
              Get Started
            </Button>
          </Grid>

          {/* Image and Quote */}
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: "10px" }}>
              <img
                src="https://cdn.vectorstock.com/i/1000v/02/62/truck-delivery-service-icon-vector-21400262.jpg"
                alt="Office"
                width="100%"
                height="450px"
              />
            </Paper>
            <QuoteBox>
              <Typography variant="body2" fontStyle="italic">
                “Friends, such as we desire, are dreams and fables. Friendship demands the ability to do without it.”
              </Typography>
              <Typography variant="subtitle2" color="yellow" sx={{ mt: 1 }}>
                - Ralph Waldo Emerson
              </Typography>
            </QuoteBox>
          </Grid>
        </Grid>
      </Container>

      {/* Partner Logos */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, py: 6, mt: 4, borderTop: "1px solid #ddd" }}>
        <img src="https://via.placeholder.com/100" alt="logo1" />
        <img src="https://via.placeholder.com/100" alt="logo2" />
        <img src="https://via.placeholder.com/100" alt="logo3" />
        <img src="https://via.placeholder.com/100" alt="logo4" />
      </Box>
    </Box>
  );
};

export default LandingPage;
