import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./userSlice";
// state for problems
// const logout = createAction("logout");
export const problemLogSlice = createSlice({
  name: "problemLog",
  initialState: [
    {
      question_id: 3043,
      question_title:
        "Minimum Time Takes to Reach Destination Without Drowning",
      question_title_slug:
        "minimum-time-takes-to-reach-destination-without-drowning",
      difficulty: 3,
      priority: 3,
    },
    {
      question_id: 3030,
      question_title: "Find The K-th Lucky Number",
      question_title_slug: "find-the-k-th-lucky-number",
      difficulty: 2,
      priority: 1,
    },
    {
      question_id: 3016,
      question_title: "Count Nodes That Are Great Enough",
      question_title_slug: "count-nodes-that-are-great-enough",
      difficulty: 3,
      priority: 3,
    },
    {
      question_id: 3001,
      question_title: "Apply Operations to Maximize Score",
      question_title_slug: "apply-operations-to-maximize-score",
      difficulty: 3,
      priority: 2,
    },
  ],
  reducers: {
    setProblemLog: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        return [];
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { setProblemLog } = problemLogSlice.actions;

export default problemLogSlice.reducer;
