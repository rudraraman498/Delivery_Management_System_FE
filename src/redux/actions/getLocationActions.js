import axios from "axios";

export const LOCATIONS_REQUEST = "LOCATIONS_REQUEST";
export const LOCATIONS_SUCCESS = "LOCATIONS_SUCCESS";
export const LOCATIONS_FAILURE = "LOCATIONS_FAILURE";

export const fetchLocations = () => async (dispatch) => {
    dispatch({type: LOCATIONS_REQUEST});
    try {
        const response = await axios.get("http://localhost:8080/api/getLocations");
    
        dispatch({
          type: LOCATIONS_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: LOCATIONS_FAILURE,
          payload: error.response?.data || "Failed to fetch results",
        });
      }
};