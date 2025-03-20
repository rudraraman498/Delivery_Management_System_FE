import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
  Link,
  FormHelperText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LoginPage = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(pass)) {
      return "Password must include at least one uppercase letter";
    }
    if (!/[a-z]/.test(pass)) {
      return "Password must include at least one lowercase letter";
    }
    if (!/[0-9]/.test(pass)) {
      return "Password must include at least one number";
    }
    if (!/[!@#$%^&*]/.test(pass)) {
      return "Password must include at least one special character (!@#$%^&*)";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (isRegisterMode) {
      setPasswordError(validatePassword(newPassword));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isRegisterMode) {
      // Registration validation
      const passwordValidationError = validatePassword(password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        return;
      }
      
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      
      // Registration logic here
      console.log("Registration with:", { email, password });
    } else {
      // Login logic here
      console.log("Login with:", { email });
    }
    
    // Reset form and close dialog
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{isRegisterMode ? "Register" : "Log In"}</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            required
          />
          {isRegisterMode && (
            <>
              <TextField
                margin="dense"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={password !== confirmPassword && confirmPassword !== ""}
                helperText={password !== confirmPassword && confirmPassword !== "" ? "Passwords do not match" : ""}
                required
              />
              {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary">
                  Password must:
                </Typography>
                <ul style={{ paddingLeft: "20px", margin: "5px 0", fontSize: "14px", color: "rgba(0, 0, 0, 0.6)" }}>
                  <li>Be at least 8 characters long</li>
                  <li>Include at least one uppercase letter</li>
                  <li>Include at least one lowercase letter</li>
                  <li>Include at least one number</li>
                  <li>Include at least one special character (!@#$%^&*)</li>
                </ul>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, flexDirection: "column", alignItems: "stretch" }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isRegisterMode ? "Register" : "Sign In"}
          </Button>
          <Box mt={1} textAlign="center">
            <Link component="button" variant="body2" onClick={toggleMode}>
              {isRegisterMode ? "Already have an account? Sign in" : "Register New User?"}
            </Link>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginPage;