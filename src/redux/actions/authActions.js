// src/redux/actions/authActions.js
import axios from 'axios';

export const registerUser = ({firstName, lastName, email, password}) => async (dispatch) => {
  try {
    let firstname = firstName
    let lastname = lastName
    const response = await axios.post('http://localhost:8080/user/register', { firstname, lastname, email, password });
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
    const response = await axios.post('http://localhost:8080/user/login', { email, password }, {headers: {
      "Content-Type": "application/json"
    }});
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

export const logoutUser = () => {
  return {
    type: "LOGOUT",
  }
}