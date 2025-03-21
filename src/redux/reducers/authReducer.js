// src/redux/reducers/authReducer.js
const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
        isAuthenticated: true,
        loading: false
      };
    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        error: action.payload,
        isAuthenticated: false,
        loading: false
      };
    case 'AUTH_LOADING':
      return {
        ...state,
        error: null,
        loading: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        error: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;