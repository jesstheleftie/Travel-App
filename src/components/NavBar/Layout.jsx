import React from "react";

import NavBar from "./NavBar";

const Layout = ({ children, setShowAuthPopup, user, setUser }) => {
  const handleLoginClick = () => {
    setShowAuthPopup(true);
  };

  return (
    <div
      className="layout"
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
        height: "calc(100vh)",
      }}
    >
      <div style={{ flex: "0 1 auto" }}>
        <NavBar
          handleLoginClick={handleLoginClick}
          user={user}
          setUser={setUser}
        />
      </div>
      <div
        className="content"
        style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
