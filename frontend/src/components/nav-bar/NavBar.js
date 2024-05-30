// frontend/src/components/nav-bar/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../auth/auth';
import LoggedInAs from './LoggedInAs';
import logo from '../../../public/assets/rag5-logo.png';

const NavBar = () => {
  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh the page to update the UI
  };

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} alt="RAG5 Logo" />
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
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
                  <Link className="button is-light" to="/login">
                    Log In
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
