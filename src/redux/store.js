import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { searchReducer } from "./reducers/searchReducer";

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
