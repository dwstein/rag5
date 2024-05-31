// frontend/src/App.js

import React, { useState, useEffect } from "react";
import { Route, Routes  } from 'react-router-dom';

import HealthCheck from "./components/test-components/HealthCheck";
import SafeMessages from "./components/test-components/SafeMessages";

import LoggedInAs from "./components/nav-bar/LoggedInAs";
import { useAuth } from './auth/AuthProvider';
import NavBar from "./components/nav-bar/NavBar";


function App() {
  const { isLoggedIn, user } = useAuth();


  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            {/* <LoggedInAs /> */}
            <HealthCheck />
            <SafeMessages />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
