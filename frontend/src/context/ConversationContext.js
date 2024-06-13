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
      if (!isLoggedIn){
        await createNewConversation();
      }
    };


   
  if (!isLoggedIn && !conversationId) {
    initializeConversation();
  }
}, [isLoggedIn, conversationId]);


const createNewConversation = async () => {
  try {
    const response = await axios.post('/convo/conversations/new', {});
    setConversationId(response.data.conversation_id);
  } catch (error) {
    console.error('Error creating new conversation:', error);
  }
};


  
  return (
    <ConversationContext.Provider value={{ conversationId, setConversationId, isLoggedIn, user }}>
      {children}
    </ConversationContext.Provider>
  );
};
