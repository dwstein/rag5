// frontend/src/App.js

import React, { useEffect, useState } from "react";
import HealthCheck from "./components/HealthCheck"; 
import SafeMessages from "./components/SafeMessages"; // Import the new component

function App() {


  return (
    <div>
      <HealthCheck /> {/* Use the HealthCheck component */}
      <SafeMessages /> {/* Use the SafeMessages component */}
    </div>
  );
}


export default App;
