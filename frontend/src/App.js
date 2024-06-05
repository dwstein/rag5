// frontend/src/App.js

import React, { useState, useEffect } from "react";
import { Route, Routes  } from 'react-router-dom';

import HealthCheck from "./components/test-components/HealthCheck";
import SafeMessages from "./components/test-components/SafeMessages";

import LoggedInAs from "./components/nav-bar/LoggedInAs";

import NavBar from "./components/nav-bar/NavBar";
import { AuthProvider } from './auth/AuthProvider';
import { ConversationProvider } from "./context/ConversationContext";
import Convo from "./components/conversation/Convo";

function App() {
  return (
    <AuthProvider>
      <ConversationProvider>
        <div className="container">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conversations/:conversationId" element={<Convo />} />
          </Routes>
        </div>
      </ConversationProvider>
    </AuthProvider>
  );
}

const Home = () => (
  <>
    <Convo />
    <HealthCheck />
    <SafeMessages />
  </>
);


export default App;
