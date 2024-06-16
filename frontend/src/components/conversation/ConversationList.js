// frontend/src/components/conversation/ConversationList.js

// frontend/src/components/conversation/ConversationList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';
import { useConversation } from '../../context/ConversationContext';


const ConversationList = () => {
  const { user, isLoggedIn } = useAuth();
  const { setConversationId } = useConversation();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!isLoggedIn || !user) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/convo/conversationslist/${user.id}`);
        setConversations(response.data);
      } catch (error) {
        setError('Error fetching conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [isLoggedIn, user]);

  const handleConversationClick = (conversationId) => {
    setConversationId(conversationId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!conversations.length) {
    return <div>No conversations found.</div>;
  }

  return (
    <div className="box">
    <h2 className="title is-4">Conversations</h2>
    <ul>
      {conversations.map((conversation) => (
        <li 
          key={conversation.id} 
          onClick={() => handleConversationClick(conversation.id)}
          className="conversation-item p-2 mb-2"
          style={{ 
            cursor: 'pointer', 
            fontSize: '0.875rem' // Smaller font size
          }}
        >
          {conversation.title || 'Untitled Conversation'}
        </li>
      ))}
    </ul>
  </div>
);
};


export default ConversationList;
