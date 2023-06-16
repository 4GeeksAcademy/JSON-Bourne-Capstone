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
    <div className="">
     <div className="text-center mt-5">
      <h1>ai GORE</h1>
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
          <button className="m-3 btn btn-primary" onClick={handleClick}>
            LOGIN
          </button>
          <button className="m-3 btn btn-primary" onClick={handleClick}>
              REGISTER
          </button>
          </div>
        </div>
     </div>
   </div>
  )
};









