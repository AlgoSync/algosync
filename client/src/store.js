import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./state/userSlice";
import logDisplayReducer from "./state/logDisplay";
import logReducer from "./state/problemsLog";
import problemReducer from "./state/workingProblem";
const store = configureStore({
  reducer: {
    user: userReducer,
    displayProblems: logDisplayReducer,
    problemsLog: logReducer,
    workingProblem: problemReducer,
  },
});
export default store;
