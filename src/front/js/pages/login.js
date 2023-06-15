import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/login.css";
import { Link, useNavigate } from "react-router-dom";




export const Login = () => {
  const {store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate()

 // LOG OUT !!
 const handleOut = () => {
    actions.signout();
  };

// LOGIN !!
console.log("this is your token", store.token);
  const handleClick = () => {
    actions.login(username, password).then();
  };

  useEffect (() => {
    if (store.token && store.token != "" && store.token != undefined) history("/");
  });

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      {store.token && store.token !== "" && store.token !== undefined ? (
        <div>
          "You are logged in" + {store.token}
          <button className="btn btn-primary" onClick={handleOut}>
            SIGN OUT
          </button>
        </div>
      ) : (
        <div>
          <input
            //className="d-flex alignInput"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            //className="d-flex alignInput"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleClick}>
            LOGIN
          </button>
        </div>
      )}
    </div>
  );
};









