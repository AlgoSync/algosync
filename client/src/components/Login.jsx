import React, { useRef, useState } from "react";
import { UseSelector, useDispatch } from "react-redux";
import { login } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
//
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const [invalid, showInvalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.current || !password.current) {
      alert("you must enter a username and a password!");
      return;
    }

    // ADD API CALL AND RESPONSE VALIDATION HERE
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current,
        password: password.current,
      }),
    });
    console.log(response);
    const data = await response.json();
    if (data.err) {
      console.log("server returned error successfully!");
      showInvalid(true);
    } else {
      dispatch(login(data.user));
      navigate("/app");
    }
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
        <button
          type="submit"
          className="bg-teal-400 hover:bg-teal-600 text-white font-bold my-4 py-2 px-5 rounded"
        >
          {" "}
          Login{" "}
        </button>
        <div className="text-red-600">
          {invalid ? "Invalid username or email!" : null}
        </div>
        <div className="flex flex-row justify-around w-full m-8">
          <div className="flex flex-col justify-center text-lg">
            Don't have an account?
          </div>
          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-400 hover:bg-indigo-700 text-white font-bold my-4 py-1 px-5 rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
      {/* <button
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-1 rounded"
        onClick={() => navigate("/app")}
      >
        JUST TAKE ME TO THE APP!
      </button> */}
    </div>
  );
};
