import React from "react";
import { ProblemDisplay } from "./components/problemDisplay";
import { Login } from "./components/login";
import { Signup } from "./components/Signup";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { History } from "./components/History";

const App = () => {
  return (
    <div>
      <div>
        <h1> AlgoSync</h1>
      </div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={<ProblemDisplay />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
