import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./userSlice";
export const problemLogDisplaySlice = createSlice({
  initialState: [],
  name: "problemLogDisplay",
  reducers: {
    setProblemLogDisplay: (state, action) => {
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      return [];
    });
  },
});

export const { setProblemLogDisplay } = problemLogDisplaySlice.actions;

export default problemLogDisplaySlice.reducer;
