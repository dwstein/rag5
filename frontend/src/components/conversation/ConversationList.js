// frontend/src/components/conversation/ConversationList.js

// frontend/src/components/conversation/ConversationList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useConversation } from '../../context/ConversationContext';

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const { user, createNewConversation } = useConversation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  const fetchConversations = async () => {
    try {
      if (user && isValidUUID(user.id)) {
        const response = await axios.get(`/convo/conversations/${user.id}`);
        setConversations(response.data);
      } else {
        setConversations([]);
      }
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        setError('Error fetching conversations');
      } else {
        setConversations([]);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleConversationClick = (conversationId) => {
    setCurrentConversationId(conversationId);
  };

  const handleCreateNewConversation = async () => {
    await createNewConversation();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }



  return (
    <div className="conversation-list">
    <h2 className="title is-4">Conversations</h2>
    <div className="buttons">
      <button className="button is-primary" onClick={handleCreateNewConversation}>
        New Conversation
      </button>
    </div>
    {conversations.length === 0 ? (
      <p>You don't have any conversations yet. Start a new conversation!</p>
    ) : (
      <ul className="menu-list">
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
