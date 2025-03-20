import React from "react";
import { useState } from "react";
import { Box, Typography, Grid, Paper, TextField, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl, Container, CardContent, Card, Button } from "@mui/material";

const ShippingForm = ({ shipFromData, setShipFromData, shipToData, setShipToData, goToPayment,handleSearch }) => {

  //const navigate = useNavigate();

  
  // const goToPayment = () => {
  //   console.log(shipFromData,shipToData)
  // } 

  // Define objects for "Ship From" and "Ship To"
  // const [shipFromData, setShipFromData] = useState({
  //   country: "United States",
  //   fullName: "",
  //   contactName: "",
  //   email: "",
  //   phone: "",
  //   streetAddress: "",
  //   notification: false
  // });

  // const [shipToData, setShipToData] = useState({
  //   country: "United States",
  //   fullName: "",
  //   contactName: "",
  //   email: "",
  //   phone: "",
  //   streetAddress: "",
  //   notification: false
  // });

  return (
    <Box >
    <Container sx={{ mt: 8 }}>
      <Paper sx={{ mt: 4, p: 3, backgroundColor: "#f4f4f4", borderRadius: "10px" }}>
      <Typography variant="h6" color="primary" fontWeight="bold">
        Shipping Details
      </Typography>

      {/* Ship From Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, backgroundColor: "#f4f4f4" }}>
      <Card sx={{ p: 2, backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6">Ship From</Typography>
        <ShippingSection formData={shipFromData} setFormData={setShipFromData}/>
      </CardContent>
      </Card>
      </Paper>

      {/* Ship To Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, backgroundColor: "#f4f4f4" }}>
      <Card sx={{ p: 2, backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6">Ship To</Typography>
        <ShippingSection formData={shipToData} setFormData={setShipToData} />
        </CardContent>
      </Card>
      </Paper>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
  {/* Back Button (Left-Aligned) */}
  <Button
    variant="contained"
    color="primary"
    onClick={handleSearch}
    sx={{ height: "56px", alignContent: "center" }}
  >
    Back
  </Button>

  {/* Payment Button (Right-Aligned) */}
  <Button
    variant="contained"
    color="primary"
    onClick={goToPayment}
    sx={{ height: "56px", alignContent: "center" }}
  >
    Payment
  </Button>
</Box>
      </Paper>
      
      </Container>
    </Box>
  );
};

// Child component receiving props
const ShippingSection = ({ formData, setFormData }) => {
  // Handles changes in form fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <Grid container spacing={2}>
      {/* Country Selector */}
      {/* <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Country or Territory</InputLabel>
          <Select name="country" value={formData.country} onChange={handleChange}>
            <MenuItem value="United States">United States</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="Mexico">Mexico</MenuItem>
          </Select>
        </FormControl>
      </Grid> */}

      {/* Name and Contact */}
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Full Name or Company Name*" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Contact Name" name="contactName" value={formData.contactName} onChange={handleChange} />
      </Grid>

      {/* Email and Phone */}
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Email*" name="email" value={formData.email} onChange={handleChange} required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
      </Grid>

      {/* Checkbox */}
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="notification" checked={formData.notification} onChange={handleChange} />}
          label="Send me an email whenever my package status changes"
        />
      </Grid>

      {/* Street Address */}
      <Grid item xs={12}>
        <TextField fullWidth label="Street Address*" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
      </Grid>
    </Grid>
  );
};

export default ShippingForm;
