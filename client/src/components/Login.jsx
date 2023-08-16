import React, { useRef } from "react";
import { UseSelector, useDispatch } from "react-redux";
import { login } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.current || !password.current) {
      alert("you must enter a username and a password!");
      return;
    }
    console.log(email.current, password.current);

    // ADD API CALL AND RESPONSE VALIDATION HERE
    dispatch(login(email.current));
    navigate("/app");
  };

  return (
    <div className="flex flex-col justify-around max-w-md mx-auto px-6 bg-slate-50 drop-shadow-lg border-solid border-2 border-gray-500 rounded-xl h-1/2 w-2/5">
      <div className="flex flex-row justify-center text-3xl my-4"> Login </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          className="border-solid border-2 border-gray-500 rounded w-2/3 pl-2 h-8 my-2"
          id="login-email"
          name="email"
          type="text"
          placeholder="email"
          onChange={(e) => (email.current = e.target.value)}
        />
        <input
          className="border-solid border-2 border-gray-500 rounded w-2/3 pl-2 h-8 my-2"
          id="login-password"
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <button type="submit" className="bg-teal-400 hover:bg-teal-600 text-white font-bold my-4 py-2 px-5 rounded"> Login </button>
        <div className="flex flex-row justify-around w-full m-8">
          <div className="flex flex-col justify-center text-lg">Don't have an account?</div>
          <button onClick={() => navigate("/signup")} className="bg-indigo-400 hover:bg-indigo-700 text-white font-bold my-4 py-1 px-5 rounded">
            Sign Up
          </button>
        </div>
      </form>
      <button onClick={() => navigate("/app")}> TAKE ME TO THE APP</button>
    </div>
  );
};
