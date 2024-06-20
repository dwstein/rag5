// frontend/src/context/ConversationContext.js

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ConversationContext = createContext();

export const useConversation = () => {
  return useContext(ConversationContext);
};

export const ConversationProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);


  const createNewConversation = async (userID, titleArg, token) => {
    try {
      const response = await axios.post(
        '/convo/conversations/', 
        { user_id: userID, title: titleArg },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setConversationId(response.data.conversation_id); // Update conversationId state
      return response;

    } catch (error) {
      console.error('Error creating new conversation:', error);
      return null;
    }
  };




  return (
    <ConversationContext.Provider value={{ conversationId, setConversationId, createNewConversation }}>
      {children}
    </ConversationContext.Provider>
  );
};
