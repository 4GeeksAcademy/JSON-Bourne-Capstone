import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.signout();
  };

  const handleHomeClick = () => {
    if (store.token) {
      navigate("/explore");
    }
  };

  useEffect(() => {
    if (store.token && location.pathname === "/") {
      // Redirect to "/explore" when user is logged in and home button is clicked
      navigate("/explore");
    }
  }, [store.token, location.pathname, navigate]);

  if (location.pathname === "/") {
    // Render nothing when on the login screen
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand mb-0 h1"
          onClick={handleHomeClick}
        >
          {store.token ? "Explore" : "Login"}
        </Link>
        <div className="ml-auto">
          {location.pathname !== "/signup" && !store.token ? (
            <>
              <Link to="/explore">
                <button className="m-3 btn btn-warning">Explore</button>
              </Link>
              <Link to="/single">
                <button className="m-3 btn btn-warning">Single</button>
              </Link>
            </>
          ) : (
            store.token && (
              <button className="m-3 btn btn-warning" onClick={handleLogout}>
                Logout
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};