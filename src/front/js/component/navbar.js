import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.signout();
    navigate("/");
  };

  const handleExploreClick = () => {
    navigate("/explore");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container">
        <button
          className={classnames("m-3 btn btn-warning", {
            active: location.pathname === "/explore"
          })}
          onClick={handleExploreClick}
        >
          Explore
        </button>
        <Link
          to="/generate"
          className={classnames("m-3 btn btn-warning", {
            active: location.pathname === "/generate"
          })}
        >
          Generate
        </Link>
        <Link
          to="/profile"
          className={classnames("m-3 btn btn-warning", {
            active: location.pathname === "/profile"
          })}
        >
          Profile
        </Link>
        <div className="ml-auto">
          {store.token ? (
            <button className="m-3 btn btn-warning" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/" className="m-3 btn btn-warning">
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};