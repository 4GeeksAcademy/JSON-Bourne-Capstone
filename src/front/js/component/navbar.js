import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Login</span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <>
              <Link to="/explore">
                <button className="btn btn-primary">Explore</button>
              </Link> 
                        <Link to="/single">
                <button className="btn btn-secondary">Single</button>
              </Link>
            </>
          )  :(
            <Link to="/explore">
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
