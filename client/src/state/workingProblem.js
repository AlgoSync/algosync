import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./userSlice"; // import the action to give the reducer functionality to match it
export const problemSlice = createSlice({
  name: "workingProblem",
  initialState: null,
  // initialState: {
  //   question_id: 1,
  //   question_title: "Add Two Numbers",
  //   difficulty: 2,
  // },
  reducers: {
    setProblem: (state, action) => {
      return action.payload;
    },
    flush: () => null,
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return {};
    });
  },
});

export const { setProblem, flush } = problemSlice.actions;

export default problemSlice.reducer;
