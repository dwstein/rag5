// frontend/src/components/conversation/ConversationList.js

// frontend/src/components/conversation/ConversationList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';
import { useConversation } from '../../context/ConversationContext';


const ConversationList = () => {
  const { user, loading, token } = useAuth();
  const { setConversationId } = useConversation();
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [error, setError] = useState(null);

  console.log('conversationsList rendered before user.');
  console.log('user:', user);

  const fetchConversations = async () => {
    try {
      console.log('Fetching conversations for user:', user.id);
      const response = await axios.get(`/convo/conversationslist/${user.id}`);
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setError('Error fetching conversations');
    } finally {
      setLoadingConversations(false);
    }

  };

  useEffect(() => {
    if (!loading && user) {
      fetchConversations();
    }
  }, [loading, user]);


  const createNewConversation = async (userId, title, tokenArg) => {
    console.log('createNewConversation called from createNewConversation in ConversationList.js');
    console.log('token from createNewConversation:', tokenArg);
    console.log('userId from createNewConversation:', userId);
    console.log('title from createNewConversation:', title);
    try {
      const response = await axios.post(
        '/convo/conversations',
        { title, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating new conversation:', error);
      setError('Error creating new conversation');
      return null;
    }
  };


  const handleNewConversation = async () => {
    console.log('create new user button clicked');
    console.log('token from handleNewConversation:', token);
    const title = "Convo date: " + new Date().toLocaleString();
    if (title) {
      // const token = token; // Replace with the actual token if needed
     
      const response = await createNewConversation(user.id, title, token);
      if (response) {
        await fetchConversations();
      }
    }
  };


  if (loading || loadingConversations) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!conversations.length) {
    return <div>No conversations found for user: {user.id}</div>;
  }

  const handleConversationClick = (conversationId) => {
    setConversationId(conversationId);
  };



  return (
<div className="box">
      <h2 className="title is-4">Conversations</h2>
      <button className="button is-primary" onClick={handleNewConversation}>
        New Conversation
      </button>
      <ul>
        {conversations.map((conversation) => (
          conversation && conversation.id && ( // Defensive check
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
          )
        ))}
      </ul>
    </div>
  );
};


export default ConversationList;
