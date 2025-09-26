import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  role: "",
  phone: "",
  dateOfBirth: "",
  gender: "male",
  country: "",
  price_per_hour: "",
  specialty: "",
  degree: "",
  languages: "",
  currency:""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.phone = action.payload.phone;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.gender = action.payload.gender;
      state.urlImage = action.payload.urlImage;
      state.idUser = action.payload.idUser;
      state.country = action.payload.country
      state.price_per_hour = action.payload.price_per_hour
      state.specialty = action.payload.specialty
      state.degree = action.payload.degree
      state.languages = action.payload.languages
      state.currency=action.payload.currency
    },
    updateUserStore: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, updateUserStore } = userSlice.actions;
export default userSlice.reducer;
