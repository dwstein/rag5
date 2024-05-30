// frontend/src/App.js

import React, { useEffect, useState } from "react";
import 'bulma/css/bulma.min.css'; // Import Bulma CSS
import HealthCheck from "./components/test-components/HealthCheck"; 
import SafeMessages from "./components/test-components/SafeMessages"; // Import the new component
import Login from "./components/nav-bar/login";

function App() {


  return (
    <div className="container">
      <Login /> {/* Use the Login component */}
      {/* Add other components here */}
      <HealthCheck />
      <SafeMessages />
  </div>
  );
}


export default App;
