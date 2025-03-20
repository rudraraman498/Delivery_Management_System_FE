import { LOCATIONS_FAILURE,LOCATIONS_REQUEST,LOCATIONS_SUCCESS } from "../actions/getLocationActions";

const initialState = {
  locations: null,
  error: null,
};

export const LocationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATIONS_REQUEST:
      return { ...state, error: null };
    case LOCATIONS_SUCCESS:
      return { ...state, locations: action.payload };
    case LOCATIONS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
