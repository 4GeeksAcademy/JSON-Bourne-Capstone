import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">HOME PVT ROUTE</span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          ) : (
            <Link to="/login">
              <button
                onClick={() => actions.signout()}
                className="btn btn-primary"
              >
                Logout
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
