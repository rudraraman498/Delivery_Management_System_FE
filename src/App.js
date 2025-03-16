import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import LandingPage from "./components/LandingPage";
import Shipping from "./components/shipping";

const theme = createTheme({
  palette: {
    primary: { main: "#1E3A8A" },
    secondary: { main: "#673AB7" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Empty container for the home page */}
          <Route path="/shipping" element={<Shipping />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
