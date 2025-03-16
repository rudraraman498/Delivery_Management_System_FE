import React, {useState} from "react";
//import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import store from "../redux/store"

import NavigationBar from "./NavigationBar";

import {
  Autocomplete,
  TextField,
  MenuItem,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../redux/actions/searchActions";

const locations = [
  { label: "Indianapolis, Indiana, 46204, United States" },
  { label: "Las Vegas, Nevada, 89101, United States" },
  { label: "New York, NY, 10001, United States" },
  { label: "San Francisco, CA, 94103, United States" },
];

const Shipping = () => {
  const navigate = useNavigate();
  
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [packages, setPackages] = useState("1");
  const [weight, setWeight] = useState("");

  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);

  const handleSearch = () => {
    if (!from || !to || !weight) {
      alert("Please fill all fields before searching!");
      return;
    }
    console.log("Redux Store:", store.getState());
    dispatch(fetchSearchResults(from.label,to.label, packages, weight ));
  };

  // return (
  //   <Box>
  //   <NavigationBar/>
  //   <Container sx={{ mt: 8, textAlign: "center" }}>
  //     <Typography variant="h3" fontWeight="bold" color="primary">
  //       Welcome to the New Page!
  //     </Typography>
  //     <Typography variant="body1" sx={{ mt: 2 }}>
  //       This is a new page that you navigated to using React Router.
  //     </Typography>
  //     <Button
  //       variant="contained"
  //       color="secondary"
  //       sx={{ mt: 4 }}
  //       onClick={() => navigate("/")}
  //     >
  //       Go Back to Home
  //     </Button>
  //   </Container>
  //   </Box>
  // );
  return (
    <Box>

    <NavigationBar/>

    <Container sx={{ mt: 8 }}>
      {/* Search Fields */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {/* From Field */}
        <Autocomplete
          options={locations}
          getOptionLabel={(option) => option.label}
          value={from}
          onChange={(event, newValue) => setFrom(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="From" variant="outlined" fullWidth />
          )}
          sx={{ width: 250 }}
        />

        {/* To Field */}
        <Autocomplete
          options={locations}
          getOptionLabel={(option) => option.label}
          value={to}
          onChange={(event, newValue) => setTo(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="To" variant="outlined" fullWidth />
          )}
          sx={{ width: 250 }}
        />

        {/* No. of Packages */}
        <TextField
          select
          label="Packages"
          value={packages}
          onChange={(e) => setPackages(e.target.value)}
          variant="outlined"
          sx={{ width: 120 }}
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Package Weight */}
        <TextField
          label="Package Weight (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          variant="outlined"
          sx={{ width: 150 }}
        />

        {/* Search Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ height: "56px" }}
        >
          Search
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results Section (Only Visible After Search) */}
      {results && (
        <Paper sx={{ mt: 4, p: 3, backgroundColor: "#f4f4f4", borderRadius: "10px" }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Search Results
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1"><strong>From:</strong> {from?.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1"><strong>To:</strong> {to?.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1"><strong>Packages:</strong> {packages}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1"><strong>Package Weight:</strong> {weight} kg</Typography>
            </Grid>
          </Grid>

          {/* Display API Results */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">
              <strong>Estimated Price:</strong> ${results.price}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Estimated Delivery Time:</strong> {results.deliveryTime} days
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
    </Box>
  );
};


export default Shipping;
