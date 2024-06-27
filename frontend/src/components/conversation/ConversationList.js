// frontend/src/components/conversation/ConversationList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';
import { useConversation } from '../../context/ConversationContext';


const ConversationList = () => {
  const { user, loading, token } = useAuth();
  const { setConversationId, setConversationTitle, createNewConversation } = useConversation();
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [error, setError] = useState(null);

  // console.log('loading (ConversationList):', loading);
  // console.log('user (ConversationList):', user);


  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user, setConversationId]);
  
  const fetchConversations = async () => {
    try {
      console.log('Fetching conversations for user:', user.id);
      const response = await axios.get(`/convo/conversationslist/${user.id}`);
      setConversations(response.data);

      if (response.data.length === 0) {
        const title = "Convo date: " + new Date().toLocaleString();
        // console.log(
        //   'title: (fetchConversations)', title, '\n',
        //   'userId: (fetchConversations)', user.id, '\n',
  
        // )
        
        const newConversation = await createNewConversation(user.id, title, token);
        console.log('newConversation if convo list = 0: (fetchConversations)', newConversation);
        if (newConversation) {
          
          setConversations([newConversation]);
          setConversationId(newConversation.data.id);
        }
        
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setError('Error fetching conversations');
    } finally {
      setLoadingConversations(false);
    }
  };




  const handleNewConversation = async () => {
    
    // console.log('create new user button clicked');
    // console.log('token from handleNewConversation:', token);
    const title = "Convo date: " + new Date().toLocaleString();
    if (title) {
      // const token = token; // Replace with the actual token if needed
     
      const response = await createNewConversation(user.id, title);
      console.log('newConversation: (fetchConversations)', response);
      console.log('newConversation.data.id: (fetchConversations)', response.data.id);
      setConversations([response]);
      setConversationId(response.data.id);
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
    return (
      <div className="notification is-info">
        <div>
          No conversations found for user: {user.email}
        </div>
        <div>
          Send your first message to create a new conversation.
        </div>
      </div>

    );
  }

  const handleConversationClick = (conversationId, conversationTitle) => {
    setConversationId(conversationId);
    setConversationTitle(conversationTitle)
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
              onClick={() => handleConversationClick(conversation.id, conversation.title)}
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
