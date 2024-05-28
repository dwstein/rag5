// frontend/src/App.js

import React, { useEffect } from "react";
// import SafeMessages from './components/SafeMessages';

const backendUrl = '/api'; // Use the /api prefix


function App() {

  useEffect(() => {
    fetch(`${backendUrl}/health`)
      .then(response => response.json())
      .then(data => console.log('Health check response:', data))
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <div>
      <div className="container">
        <h1 className="title">Hello World</h1>
        <p className="subtitle">Welcome to my app!</p>
        <button className="button is-primary">Click me</button>
      </div>
      
    </div>
  );
}

export default App;
