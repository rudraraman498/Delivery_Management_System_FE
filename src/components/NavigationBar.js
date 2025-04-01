import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Typography, Button, Toolbar } from "@mui/material";
import LoginPage from "./LoginPage";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../redux/actions/authActions";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleLoginClick = () => {
    console.log("Login button clicked"); // Add this for debugging
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
          fanatic
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/shipping")}>
            Services
          </Button>
          <Button color="inherit">Projects</Button>
          <Button color="inherit">Blog</Button>
          <Button color="inherit">Pricing</Button>
          <Button color="inherit">Contact</Button>
        </Box>
        <Box>
          
          { !isAuthenticated && (
            <div>
            <Button color="primary" onClick={handleLoginClick}>
            Log in
          </Button>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
          </div>
        )}
          {isAuthenticated && (<Button color="primary" onClick={handleLogout}>
            Log out
          </Button>)}
          
        </Box>
      </Toolbar>
      <LoginPage isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </AppBar>
  );
};

export default NavigationBar;