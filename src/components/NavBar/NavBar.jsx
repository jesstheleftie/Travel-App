import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logoImage from "../../Assets/Taravel_App_Logo.jpg";

const NavBar = ({ handleLoginClick, user, setUser }) => {
  return (
    <div className="navbar">
      <Link to="/" className="logoLink">
        <img src={logoImage} alt="logo" className="logoImage" />
        {/* <span role="img" aria-label="airplane">
          ✈️
        </span>
        &nbsp;&nbsp;&nbsp;Travel&nbsp;with&nbsp;Amy */}
      </Link>

      {user ? (
        <div style={{ display: "flex", marginRight: "10px" }}>
          <div className="user-greeting" style={{ marginRight: "10px" }}>
            Hello,&nbsp;{user.username}!
          </div>
          <button
            onClick={() => {
              setUser(null);
            }}
            className="login-button"
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
