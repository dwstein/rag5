// frontend/src/components/nav-bar/NavBar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../auth/auth';
import LoggedInAs from './LoggedInAs';
import logo from '../../../public/assets/rag5-logo.png';
import Login from './Login';


const NavBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh the page to update the UI
  };

  const toggleBurgerMenu = () => {
    setIsActive(!isActive);
  };

  const handleLoginClick = () => {
    console.log("Login button clicked");
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    console.log("Login successful");
    setShowLogin(false);
    window.location.reload(); // Refresh the page to update the UI
  };


  console.log("showLogin state:", showLogin);

  return (
    <>
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} alt="RAG5 Logo" />
        </Link>

        <a
          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded={isActive ? 'true' : 'false'}
          data-target="navbarBasicExample"
          onClick={toggleBurgerMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        {/* Ensure the navbar-start is empty or contains left-aligned items */}
        <div className="navbar-start">
          {/* Add any left-aligned items here if needed */}
        </div>

        <div className="navbar-end">
          {isAuthenticated() ? (
            <>
              <div className="navbar-item">
                <LoggedInAs />
              </div>
              <div className="navbar-item">
                <button className="button is-light" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="button is-primary" to="/signup">
                    <strong>Sign Up</strong>
                  </Link>
                  <button className="button is-light" onClick={handleLoginClick}>
                    Log In
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
    {showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
  </>
);
};


export default NavBar;
