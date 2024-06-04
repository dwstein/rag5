// frontend/src/components/nav-bar/NavBar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../auth/auth';
import LoggedInAs from './LoggedInAs';
import logo from '../../../public/assets/rag5.png';
import Login from './Login';  // occatinoally this pops up as an error for './Login'
import Signup from './Signup'; 

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false); 

  const handleLogout = () => {
    logout();
    window.location.reload(); 
  };

  const toggleBurgerMenu = () => {
    setIsActive(!isActive);
  };

  const handleLoginClick = () => {
    // console.log("Login button clicked");
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    // console.log("Signup button clicked");
    setShowSignup(true);
  };

  const handleLoginSuccess = () => {
    // console.log("Login successful");
    setShowLogin(false);
    // window.location.reload(); // Refresh the page to update the UI
  };

  const handleSignupSuccess = () => {
    // console.log("Signup successful");
    setShowSignup(false);
    // window.location.reload(); // Refresh the page to update the UI
  };


  const handleCancel = () => {
    // console.log("Login canceled");
    setShowLogin(false);
    setShowSignup(false);
  };


  // console.log("showLogin state:", showLogin);
  // console.log("showSignup state:", showSignup);

  return (
    <>
    <nav className="navbar is-light box" role="navigation" aria-label="main navigation">
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
                  <Link className="button is-primary" onClick={handleSignupClick}>
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
    {showLogin && <Login onLoginSuccess={handleLoginSuccess} onCancel={handleCancel}/>}
    {showSignup && <Signup onSignupSuccess={handleSignupSuccess} onCancel={handleCancel} />}
  </>
);
};


export default NavBar;
