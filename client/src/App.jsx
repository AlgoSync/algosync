import React from "react";
import { ProblemDisplay } from "./components/problemDisplay";
import { Login } from "./components/login";

const App = () => {
  return (
    <div>
      <Login />
      <ProblemDisplay />
    </div>
  );
};

export default App;
