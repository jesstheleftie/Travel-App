import React from 'react';

import NavBar from './NavBar';

const Layout = ({ children, setShowAuthPopup, user, setUser }) => {
    const handleLoginClick = () => {
        setShowAuthPopup(true);
      };

  return (
    <div className="layout">
      <NavBar handleLoginClick={handleLoginClick} user={user} setUser={setUser}/>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;