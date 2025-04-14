import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subject: "",
  country: "",
  language: "",
  price: "",
  gender: "",
  type: "",
};

const searchFiltersSlice = createSlice({
  name: "searchFilters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFilter } = searchFiltersSlice.actions;
export default searchFiltersSlice.reducer;
