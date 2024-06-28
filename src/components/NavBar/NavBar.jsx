import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ handleLoginClick, user, setUser }) => {
  return (
    <div className="navbar">
      <Link to="/" className="appTitle">
        <span role="img" aria-label="airplane">
          ✈️
        </span>{" "}
        Travel with Illy
      </Link>

      {user ? (
        <div className="user-greeting">
          Hello, {user.username}!{" "}
          <button
            onClick={() => {
              setUser(null);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLoginClick} className="login-button">
          Login
        </button>
      )}
    </div>
  );
};

export default NavBar;
