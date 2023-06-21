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
    <div className="">
      <div className="text-center mt-5">
        <h1>aiGORA</h1>
        <div>
          <form onSubmit={handleClick}>
            <div className="m-5">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="m-5">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <button className="m-3 btn btn-primary" type="submit" onClick={handleRedirect}>
                Login
              </button>
              <button className="m-3 btn btn-primary" onClick={handleOut}>
                Logout
              </button>
              <button className="m-3 btn btn-primary" type="submit" onClick={handleSignUpPage}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};