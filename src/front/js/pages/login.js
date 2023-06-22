import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  // LOG OUT !!
  const handleOut = () => {
    actions.signout();
  };

  // LOGIN !!
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    const loginSuccess = await actions.login(username, password);
    console.log("Login success:", loginSuccess);
  };

  const handleRedirect = () => {
    // Perform your logic to determine whether to redirect or not
    if (store.token && store.token !== "" && store.token !== undefined) {
      history("/single/:id");
    } else {

      console.log("Redirect prevented");
    }
  };

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      history("/single/:id");
    }
  }, [store.token, history]);

  const handleSignUpPage = () => {
    history("/signup");
  };

  return (
    <div className="body">
     <div className="text-center mt-5">
      <h1>AIγορα</h1>
        <div>
          <div className="m-5">
          <input
            //className="d-flex alignInput"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /></div>
          <div className="m-5">
          <input
            //className="d-flex alignInput"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
         
          <div className="d-flex justify-content-center allign-items-center">
          <button className="m-3 btn btn-warning" id="login" onClick={handleClick}>
            LOGIN
          </button>
          <button className="m-3 btn btn-warning" id="signup" onClick={handleClick}>
              Sign Up
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};