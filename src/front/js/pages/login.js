import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import logoImage from "../../img/logo.png";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const loginSuccess = await actions.login(username, password);
    if (loginSuccess) {
      // Save the access token in session storage
      sessionStorage.setItem("access_token", store.token);
      console.log(sessionStorage.getItem("access_token"));
      // Redirect to the explore page
      history("/explore");
    }
  };

  useEffect(() => {
    // Check if the user is already logged in and has an access token in session storage
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      // Redirect to the explore page
      history("/explore");
    }
  }, [history]);

  const handleSignUpPage = () => {
    history("/signup");
    actions.signup(username, password);
  };

  return (
    <div className="body">
      <div className="text-center mt-5">
        <div style={{ width: '200px', height: '200px', margin: '0 auto' }}>
          <img src={logoImage} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <h1>AIγορα</h1>
        <div>
          <div className="m-5">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="m-5">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="m-3 btn btn-warning" id="login" onClick={handleClick}>
              Login
            </button>
            <button className="m-3 btn btn-warning" id="login" onClick={handleSignUpPage}>
              Sign Up
            </button>
          </div>
        </div>
        <div className="Text">
          <p>μηδείς ἀγεωμέτρητος εἰσίτω μου τὴν στέγην</p>
        </div>
      </div>
    </div>
  );
};