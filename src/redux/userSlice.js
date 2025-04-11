import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  role: "",
  phone: "",
  dateOfBirth: "",
  gender: "male",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.phone = action.payload.phone;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.gender = action.payload.gender;
      state.urlImage = action.payload.urlImage;
      state.idUser = action.payload.idUser;
    },
    updateUserStore: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
