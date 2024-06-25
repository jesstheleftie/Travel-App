import React from 'react';

import NavBar from './NavBar';

const Layout = ({ children, setShowAuthPopup }) => {
    const handleLoginClick = () => {
        setShowAuthPopup(true);
      };
  return (
    <div className="layout">
      <NavBar handleLoginClick={handleLoginClick}/>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;