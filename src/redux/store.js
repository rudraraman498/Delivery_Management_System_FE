import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { searchReducer } from "./reducers/searchReducer";
import { LocationsReducer } from "./reducers/getLocationReducer";
import { shippingReducer } from "./reducers/shippingReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    search: searchReducer,
    locations: LocationsReducer,
    shippingDetails: shippingReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
