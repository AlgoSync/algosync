import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./userSlice";
// state for problems
// const logout = createAction("logout");
export const problemLogSlice = createSlice({
  name: "problemLog",
  initialState: [],
  reducers: {
    setProblemLog: (state, action) => {
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state = [];
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { setProblemLog } = problemLogSlice.actions;

export default problemLogSlice.reducer;
