// frontend/src/App.js

import React from "react";
import { Route, Routes  } from 'react-router-dom';

import HealthCheck from "./components/test-components/HealthCheck";
import SafeMessages from "./components/test-components/SafeMessages";

import { AuthProvider, useAuth } from './auth/AuthProvider';
import { ConversationProvider } from "./context/ConversationContext";

import NavBar from "./components/nav-bar/NavBar";
import Convo from "./components/conversation/Convo";
import NotLoggedIn from "./components/NotLoggedIn";


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
  return isLoggedIn ? <Convo /> : <NotLoggedIn />;
};

const ConvoPage = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Convo /> : <NotLoggedIn />;
};





export default App;
