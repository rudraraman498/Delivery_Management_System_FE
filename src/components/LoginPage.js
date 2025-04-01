import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
  FormHelperText,
  CircularProgress,
  Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { registerUser, loginUser } from '../redux/actions/authActions';

const LoginPage = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  
  const authError = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      // If user is authenticated and modal is open, close it
      resetForm();
      onClose();
    }
  }, [isAuthenticated, isOpen, onClose]);

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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    
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
      
      if (!firstName || !lastName) {
        setFormError("First Name and Last Name are required");
        return;
      }
      
      try {
        setLoading(true);
        // Dispatch registration action with await to catch the result
        const result = await dispatch(registerUser({ email, password, firstName, lastName }));
        
        if (!result.success) {
          // Handle user already exists error
          if (result.error?.includes("already exists")) {
            setFormError("User already exists. Please sign in instead.");
          } else {
            setFormError(result.error || "Registration failed");
          }
        } else {
          // Registration successful, user is automatically logged in
          resetForm();
          onClose();
        }
      } catch (error) {
        setFormError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      // Login logic
      try {
        setLoading(true);
        const result = await dispatch(loginUser(email, password));
        
        if (!result.success) {
          setFormError(result.error || "Invalid email or password");
        } else {
          // Login successful
          resetForm();
          onClose();
        }
      } catch (error) {
        setFormError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setPasswordError("");
    setFormError("");
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
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>
          )}
          
          {isRegisterMode && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={handleFirstNameChange}
                required
                disabled={loading}
              />
              <TextField
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={handleLastNameChange}
                required
                disabled={loading}
              />
            </>
          )}
          
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
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
            disabled={loading}
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
                disabled={loading}
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
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : isRegisterMode ? "Register" : "Sign In"}
          </Button>
          <Box mt={1} textAlign="center">
            <Link 
              component="button" 
              variant="body2" 
              onClick={toggleMode}
              disabled={loading}
              type="button"
            >
              {isRegisterMode ? "Already have an account? Sign in" : "Register New User?"}
            </Link>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginPage;