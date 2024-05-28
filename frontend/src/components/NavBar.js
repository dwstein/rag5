// frontend/src/components/NavBar.js

import React from 'react';
// import logo from '../../public/assets/rag5-logo.png';

function NavBar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
       
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="/">Home</a>
          <a className="navbar-item" href="/about">About</a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" href="/register">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light" href="/login">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
