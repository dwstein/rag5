// frontend/src/App.js

import React from "react";
import NavBar from './components/NavBar';


function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="title">Hello World</h1>
        <p className="subtitle">Welcome to my app!</p>
        <button className="button is-primary">Click me</button>
      </div>
    </div>
  );
}

export default App;
