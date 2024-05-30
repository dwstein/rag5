import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);
  
      const response = await axios.post("/auth/jwt/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      // Handle successful login
      console.log(response.data);
    } catch (err) {
      // Handle login error
      setError("Invalid email or password");
    }
  };

  return (
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
        <div className="control">
          <button className="button is-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
