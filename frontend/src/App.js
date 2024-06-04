// frontend/src/App.js

import React, { useState, useEffect } from "react";
import { Route, Routes  } from 'react-router-dom';

import HealthCheck from "./components/test-components/HealthCheck";
import SafeMessages from "./components/test-components/SafeMessages";

import LoggedInAs from "./components/nav-bar/LoggedInAs";
import { useAuth } from './auth/AuthProvider';
import NavBar from "./components/nav-bar/NavBar";
import { ConversationProvider } from "./context/ConversationContext";
import Convo from "./components/conversation/Convo";

function App() {
  return (
    <ConversationProvider>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conversations/:conversationId" element={<ConvoWrapper />} />
        </Routes>
      </div>
    </ConversationProvider>
  );
}

const Home = () => (
  <>
    {/* <LoggedInAs /> */}
    <Convo />
    <HealthCheck />
    <SafeMessages />
  </>
);

const ConvoWrapper = () => {
  const { conversationId } = useParams();
  return <Convo conversationId={conversationId} />;
};

export default App;
