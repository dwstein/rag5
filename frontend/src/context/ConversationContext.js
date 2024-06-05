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
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const initializeConversation = async () => {
      try {
        const response = await axios.post('/convo/conversations/new', {}, {
          headers: isLoggedIn ? { Authorization: `Bearer ${user.token}` } : {}
        });
        setConversationId(response.data.conversation_id);
      } catch (error) {
        console.error('Error creating new conversation:', error);
      }
    };

    if (!conversationId) {
      initializeConversation();
    }
  }, [isLoggedIn, user, conversationId]);
  
  return (
    <ConversationContext.Provider value={{ conversationId, setConversationId, isLoggedIn, user }}>
      {children}
    </ConversationContext.Provider>
  );
};
