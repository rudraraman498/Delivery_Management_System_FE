// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk for fetching search results
// export const fetchesSearchResults = createAsyncThunk(
//   "search/fetchResults",
//   async ({ from, to, packages, weight }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("https://api.example.com/search", {
//         params: { from, to, packages, weight },
//       });
//       return response.data; // API response
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to fetch results");
//     }
//   }
// );

// const searchSlice = createSlice({
//   name: "search",
//   initialState: {
//     results: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSearchResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSearchResults.fulfilled, (state, action) => {
//         state.loading = false;
//         state.results = action.payload;
//       })
//       .addCase(fetchSearchResults.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default searchSlice.reducer;
