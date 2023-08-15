import React from "react";
import { ProblemDisplay } from "./components/problemDisplay";
import { Login } from "./components/login";
import { Signup } from "./components/Signup";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={<ProblemDisplay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
