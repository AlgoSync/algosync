import React, { useRef } from "react";
import { UseSelector, useDispatch } from "react-redux";
import { login } from "../state/userSlice";
export const Login = () => {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit handler");
    if (email.current === null || password.current === null) {
      alert("you must enter a username and a password!");
      return;
    }
    dispatch(login(email.current));
  };
  
  return (
    <div>
      <div> Login </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={email}
          id="login-email"
          name="email"
          type="text"
          placeholder="email"
          onChange={(e) => (email.current = e.target.value)}
        />
        <input
          ref={password}
          id="login-password"
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <button type="submit"> Login </button>
      </form>
    </div>
  );
};
