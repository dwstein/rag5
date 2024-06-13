// frontend/src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider, useAuth } from './auth/AuthProvider';
import { ConversationProvider } from "./context/ConversationContext";

import NavBar from "./components/nav-bar/NavBar";
import ConversationView from "./components/conversation/ConversationView";
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
          <HealthCheck />
          <SafeMessages />
        </div>
      </ConversationProvider>
    </AuthProvider>
  );
}


const HomePage = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <ConversationView /> : <NotLoggedIn />;
};

const ConvoPage = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <ConversationView /> : <NotLoggedIn />;
};





export default App;
