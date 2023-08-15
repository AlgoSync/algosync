import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./userSlice"; // import the action to give the reducer functionality to match it
export const problemSlice = createSlice({
  name: "workingProblem",
  initialState: { question_id: 1, question_title: "Add Two Numbers" },
  reducers: {
    setProblem: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state = {};
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { setProblem } = problemSlice.actions;

export default problemSlice.reducer;