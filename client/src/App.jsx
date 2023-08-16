import React from "react";
import { ProblemDisplay } from "./components/problemDisplay";
import { Login } from "./components/login";
import { Signup } from "./components/Signup";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import { History } from "./components/History";

const App = () => {
  return (
    <div className="h-screen bg-sky-100">
      <nav className="h-16 flex flex-col justify-around text-slate-200 bg-indigo-400 border-b-4 border-indigo-500 drop-shadow-xl">
        <h1 className="flex text-3xl justify-center"> AlgoSync</h1>
      </nav>
      <div className="h-screen flex flex-col justify-start mt-20">
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/app" element={<ProblemDisplay />} />
            {/* <Route path="/history" element={<History />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
