// frontend/src/App.js

import React, { useState, useEffect } from "react";
import 'bulma/css/bulma.min.css';
import HealthCheck from "./components/test-components/HealthCheck";
import SafeMessages from "./components/test-components/SafeMessages";
import Login from "./components/nav-bar/Login";
// import Chat from "./components/chat/Chat"; // Import the Chat component
import { getCurrentUser, isAuthenticated } from './auth/auth'; // Import authentication functions

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  return (
    <div className="container">
      <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      <HealthCheck />
      <SafeMessages />
      {/* <Chat isLoggedIn={isLoggedIn} user={user} /> */}
    </div>
  );
}

export default App;
