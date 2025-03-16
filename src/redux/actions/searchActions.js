import axios from "axios";

// Action Types
export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";

// Action Creator for Fetching Search Results
export const fetchSearchResults = (from, to, packages, number) => async (dispatch) => {
  dispatch({ type: SEARCH_REQUEST });
  console.log(typeof(from))
  try {
    const response = await axios.get("http://localhost:8080/api/getPrice", {
      params: {
        from: from, // Properly encode spaces and special characters
        to: to,
        packages,
        number,
      },
    });

    dispatch({
      type: SEARCH_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_FAILURE,
      payload: error.response?.data || "Failed to fetch results",
    });
  }
};
