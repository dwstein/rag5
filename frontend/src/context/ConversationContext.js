// frontend/src/context/ConversationContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

const ConversationContext = createContext();

export const useConversation = () => {
  return useContext(ConversationContext);
};

export const ConversationProvider = ({ children }) => {
  const { isLoggedIn, user, token } = useAuth();
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const initializeConversation = async () => {
      if (!isLoggedIn && user){
        await createNewConversation(user.id);
      }
    };
   
  if (!isLoggedIn && !conversationId) {
    initializeConversation();
  }
}, [isLoggedIn, conversationId, user]);


const createNewConversation = async (userId) => {
  try {
    const response = await axios.post(
      '/convo/conversations', 
      {user_id: userId, title : ''},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
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
