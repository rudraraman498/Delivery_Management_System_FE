import React, {use, useState, useEffect} from "react";
//import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import store from "../redux/store"

import NavigationBar from "./NavigationBar";
import ShippingForm from "./ShippingForm";
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
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../redux/actions/searchActions";
import { fetchLocations } from "../redux/actions/getLocationActions";
import { selectShipment } from "../redux/actions/shippingActions";

const location = [
  { label: "Indianapolis, Indiana, 46204, United States" },
  { label: "Las Vegas, Nevada, 89101, United States" },
  { label: "New York, NY, 10001, United States" },
  { label: "San Francisco, CA, 94103, United States" },
];

let itemChosen = false;


const Shipping = () => {
  const navigate = useNavigate();
  
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [packages, setPackages] = useState("1");
  const [weight, setWeight] = useState("");
  const [shippingItem,setShippingItem] = useState({})
  //const [locations,setLocations] = useState([])
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);
  const  { locations, locationsError } = useSelector((state)=>state.locations)
  const [shipFromData, setShipFromData] = useState({
      country: "United States",
      fullName: "",
      contactName: "",
      email: "",
      phone: "",
      streetAddress: "",
      notification: false
    });
  
    const [shipToData, setShipToData] = useState({
      country: "United States",
      fullName: "",
      contactName: "",
      email: "",
      phone: "",
      streetAddress: "",
      notification: false
    });

    const goToPayment = () => {
      console.log(shipFromData,shipToData)
    } 
  

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleSearch = () => {
    itemChosen = false;
    if (!from || !to || !weight) {
      alert("Please fill all fields before searching!");
      return;
    }
    
    dispatch(fetchSearchResults(from.name,to.name, packages, weight ));
  };

  const handleShipping = (item) =>{
   
    let chosenShipping = {...item}
    chosenShipping["from"] = from.name;
    chosenShipping["to"] = to.name;
    chosenShipping["packages"] = packages;
    chosenShipping["weight"] = weight;
    console.log(chosenShipping);
    setShippingItem(chosenShipping);
    itemChosen = true;
    dispatch(selectShipment(chosenShipping));
    console.log("Redux Store:", store.getState());
  }

  return (
    <Box>

    <NavigationBar/>

    <Container sx={{ mt: 8 }}>
      {/* Search Fields */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {/* From Field */}
        <Autocomplete
          options={locations}
          getOptionLabel={(option) => option.name}
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
          getOptionLabel={(option) => option.name}
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
      {results && results.length > 0 && !itemChosen &&  (
        <Paper sx={{ mt: 4, p: 3, backgroundColor: "#f4f4f4", borderRadius: "10px" }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Available Delivery Options
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {results.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ p: 2, backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {item.delivery_type.replace("_", " ").toUpperCase()}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      <strong>Rate:</strong> ${item.delivery_rate}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      <strong>Ship Date : </strong>{new Date(item.start_date.split("T")[0]).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}, 6:00 PM EST
                      </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      <strong>Delivered By : </strong>{new Date(item.delivery_date.split("T")[0]).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}, 10:00 PM EST
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleShipping(item)}
                      sx={{ height: "56px" }}
                    >
                      Ship Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            
          </Grid>
        </Paper>
      )}

      {itemChosen &&   (
        <div>
        <ShippingForm shipFromData={shipFromData} setShipFromData={setShipFromData} shipToData={shipToData} setShipToData={setShipToData} goToPayment={goToPayment} handleSearch={handleSearch}/>
        {/* <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{ height: "56px" , alignContent:"center"}}
              >
                Back
              </Button>
              </Box>
         */}
        </div>
      )}

    </Container>
    </Box>
  );
};




export default Shipping;
