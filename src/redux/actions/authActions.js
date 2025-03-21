// src/redux/actions/authActions.js
import axios from 'axios';

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/register', { email, password });
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    return { success: true };
  } catch (error) {
    dispatch({ 
      type: 'REGISTER_FAILURE', 
      payload: error.response?.data || { message: 'Registration failed' } 
    });
    return { 
      success: false, 
      error: error.response?.data?.message || 'Registration failed' 
    };
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    return { success: true };
  } catch (error) {
    dispatch({ 
      type: 'LOGIN_FAILURE', 
      payload: error.response?.data || { message: 'Login failed' } 
    });
    return { 
      success: false, 
      error: error.response?.data?.message || 'Invalid credentials' 
    };
  }
};