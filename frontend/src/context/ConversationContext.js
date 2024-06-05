// frontend/src/context/ConversationContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

const ConversationContext = createContext();

export const useConversation = () => {
  return useContext(ConversationContext);
};

export const ConversationProvider = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const { isLoggedIn, user } = useAuth();
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const initializeConversation = async () => {
      if (!isLoggedIn){
      try {
        const response = await axios.post('/convo/conversations/new', {});
        setConversationId(response.data.conversation_id);
      } catch (error) {
        console.error('Error creating new conversation:', error);
      }
    }
  };

   
  if (!isLoggedIn && !conversationId) {
    initializeConversation();
  }
}, [isLoggedIn, conversationId]);

  
  return (
    <ConversationContext.Provider value={{ conversationId, setConversationId, isLoggedIn, user }}>
      {children}
    </ConversationContext.Provider>
  );
};
