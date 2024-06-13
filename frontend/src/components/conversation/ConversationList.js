// frontend/src/components/conversation/ConversationList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ConversationList = ({ currentUser }) => {
    const [conversations, setConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`/convo/conversations/${user.id}`);
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    if (currentUser) {
      fetchConversations();
    }
  }, [currentUser]);


  const handleConversationClick = (conversationId) => {
    setCurrentConversationId(conversationId);
  };

  return (
    <div className="conversation-list">
      <h2 className="title is-4">Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`conversation-item ${
                conversation.id === currentConversationId ? 'is-active' : ''
              }`}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <Link to={`/conversations/${conversation.id}`}>
                {conversation.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationList;
