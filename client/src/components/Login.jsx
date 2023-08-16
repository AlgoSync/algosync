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
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email.current,
          password: password.current
      })
  });

  const data = await response.json();
  console.log(data)

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
        <button type="submit"> Login </button>
        <button onClick={() => navigate("/signup")}>
          Haven't created an account yet? Sign Up
        </button>
      </form>
    </div>
  );
};
