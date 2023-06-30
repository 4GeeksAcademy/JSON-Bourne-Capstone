import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";

export const SignUp = () => {
  const { actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useNavigate();

  const handleSignUp = async () => {
    if (password) {
      const success = await actions.signup(username, password);
      if (success) {
        history("/");
      }
    } else {
      alert("Password is required");
      console.log("Password is required");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="mb-4">Sign Up</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control orange-bg"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control orange-bg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control orange-bg"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <button className="btn btn-warning" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};