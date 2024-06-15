// frontend/src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider, useAuth } from './auth/AuthProvider';
import { ConversationProvider } from "./context/ConversationContext";

import NavBar from "./components/nav-bar/NavBar";
import ConversationParent from "./components/conversation/ConversationParent";
import NotLoggedIn from "./components/NotLoggedIn";
import HealthCheck from "./components/test-components/HealthCheck";
import SafeMessages from "./components/test-components/SafeMessages";



function App() {

  return (
    <AuthProvider>
      <ConversationProvider>
        <div className="container">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/conversations/:conversationId" element={<ConvoPage />} />
          </Routes>
        </div>
      </ConversationProvider>
          <HealthCheck />
          <SafeMessages />
    </AuthProvider>
  );
}


const HomePage = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <ConversationParent /> : <NotLoggedIn />;
};

const ConvoPage = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <ConversationParent /> : <NotLoggedIn />;
};





export default App;
