// frontend/src/Convercontext/ConversationContext.js

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ConversationContext = createContext();

export const useConversation = () => {
  return useContext(ConversationContext);
};

export const ConversationProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);
  const [conversationTitle, setConversationTitle] = useState(null);
  const [conversations, setConversations] = useState([]);

  const createNewConversation = async (userID, titleArg) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        '/convo/conversations', 
        { user_id: userID, title: titleArg },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setConversationId(response.data.conversation_id); 
      setConversationTitle(response.data.title); 
      return response;

    } catch (error) {
      console.error('Error creating new conversation:', error);
      return null;
    }
  };

  const updateConversationTitle = async (title) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `/convo/conversations/${conversationId}`,
        { title: title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setConversationTitle(response.data.title);
      return response;
    } catch (error) {
      console.error('Error updating conversation title:', error);
      return null;
    }
  };



  return (
    <ConversationContext.Provider value={{ 
      conversationId, 
      conversationTitle, 
      setConversationId, 
      setConversationTitle, 
      conversations,
      setConversations,
      createNewConversation, 
      updateConversationTitle 
      }}>
      {children}
    </ConversationContext.Provider>
  );
};
