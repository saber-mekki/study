import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import courseReducer from "./courseSlice";
import searchFiltersReducer from "./TutorsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: courseReducer,
    searchFilters: searchFiltersReducer,
  },
});

export default store;
