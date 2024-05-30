// frontend/src/App.js

import React, { useState, useEffect } from "react";
import { Route, Routes  } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import HealthCheck from "./components/test-components/HealthCheck";
import SafeMessages from "./components/test-components/SafeMessages";
import Login from "./components/nav-bar/Login";
// import Chat from "./components/chat/Chat"; // Import the Chat component
import { getCurrentUser, isAuthenticated } from './auth/auth'; // Import authentication functions
import LoggedInAs from "./components/nav-bar/LoggedInAs";
import NavBar from "./components/nav-bar/NavBar";


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
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/" element={
          <>
            <LoggedInAs />
            <HealthCheck />
            <SafeMessages />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
