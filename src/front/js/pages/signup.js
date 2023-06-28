import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (password === confirmPassword) {
      const success = await actions.signup(username, password);
      if (success) {
        history("/");
      }
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      console.log("Passwords do not match");
    } else {
      alert("Username/password Incorrect");
      console.log("username/password Incorrect");
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="password"
        />
        <button className="m-3 btn btn-warning" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};