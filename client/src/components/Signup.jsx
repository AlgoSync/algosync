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

    // ADD API CALL AND VALIDATION   HERE
    dispatch(login(email.current));
    navigate("/app");
  };

  return (
    <div>
      <div> Login </div>
      <form onSubmit={handleSubmit}>
        <input
          id="login-email"
          name="email"
          type="text"
          placeholder="email"
          onChange={(e) => (email.current = e.target.value)}
        />
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => (password.current = e.target.value)}
        />

        <input
          id="login-password2"
          name="password2"
          type="password"
          placeholder="Reenter Password"
          onChange={(e) => (password2.current = e.target.value)}
        />
        <button type="submit"> Sign Up </button>
        <button onClick={(e) => navigate("/")}>
          Already signed up? Log in
        </button>
      </form>
    </div>
  );
};
