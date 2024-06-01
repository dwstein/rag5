// frontend/src/components/nav-bar/Login.js

import React, { useState } from "react";
import { useAuth } from '../../auth/AuthProvider';

const Login = ({ onLoginSuccess, onCancel }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError(''); // Clear any previous errors
      onLoginSuccess(); // Call the success handler
    } catch (error) {
      setError('Invalid email or password');
    }
  };


  return (
    <div className="columns is-mobile is-centered">
      <div className="column is-one-quarter-desktop is-half-tablet is-full-mobile is-offset-three-quarters-desktop is-offset-half-tablet">
        <div className="box">
          <h1 className="title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <div className="notification is-danger">{error}</div>}
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary" type="submit">
                  Login
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-light"
                  type="button"
                  onClick={() => {
                    console.log("Cancel button clicked");
                    onCancel();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;
