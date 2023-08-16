import React, { useRef } from "react";
import { UseSelector, useDispatch } from "react-redux";
import { login } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const password2 = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit handler");
    if (email.current === null || password.current === null) {
      alert("you must enter a username and a password!");
      return;
    } else if (password.current !== password2.current) {
      alert("Your passwords must match!");
      return;
    }
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current,
        password: password.current,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }
    // ADD API CALL AND VALIDATION   HERE

    dispatch(login(email.current));
    navigate("/app");
  };

  return (
    <div className="flex flex-col justify-around max-w-md mx-auto px-6 bg-slate-50 drop-shadow-lg border-solid border-2 border-gray-500 rounded-xl h-1/2 w-2/5">
      <div className="flex flex-row justify-center text-3xl my-4">
        {" "}
        Sign Up{" "}
      </div>
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

        <input
          className="border-solid border-2 border-gray-500 rounded w-2/3 pl-2 h-8 my-2"
          id="login-password2"
          name="password2"
          type="password"
          placeholder="Reenter Password"
          onChange={(e) => (password2.current = e.target.value)}
        />
        <button
          type="submit"
          className="bg-teal-400 hover:bg-teal-600 text-white font-bold my-4 py-2 px-5 rounded"
        >
          {" "}
          Sign Up{" "}
        </button>
        <div className="flex flex-row justify-around w-full m-8">
          <div className="flex flex-col justify-center text-lg">
            Already signed up?
          </div>
          <button
            onClick={(e) => navigate("/")}
            className="bg-indigo-400 hover:bg-indigo-700 text-white font-bold my-4 py-1 px-5 rounded"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};
