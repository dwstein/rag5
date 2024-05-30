// frontend/src/App.js

import React, { useEffect, useState } from "react";
import HealthCheck from "./components/test-components/HealthCheck"; 
import SafeMessages from "./components/test-components/SafeMessages"; // Import the new component
import Login from "./components/nav-bar/login";

function App() {


  return (
    <div>
   
      <Login /> {/* Use the Login component */}
    </div>
  );
}


export default App;
