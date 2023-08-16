import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import { spinningCircles } from "react-loading-icons";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";
export const LogoutButton = ({ clickHandler }) => {
  return (
    <div>
      <button
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded"
        onClick={clickHandler}
      >
        Logout
      </button>
    </div>
  );
};

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("logging out ");
    dispatch(logout());
    navigate("/");
  }, []);
  return (
    <div>
      <SpinningCircles />
    </div>
  );
};
