import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [], 
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses = [...state.courses, action.payload]; 
    },
  },
});

export const { addCourse } = courseSlice.actions;
export default courseSlice.reducer;
