// frontend/scr/components/conversation/Convo.js


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useConversation } from '../../context/ConversationContext';

const Convo = () => {
  const [messages, setMessages] = useState([]);
  const { conversationId, setConversationId, isLoggedIn, user } = useConversation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`convo/conversations/${conversationId}/messages/`);
        setMessages(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessages([]); // No messages found, set to empty array
        } else {
          setError('Error fetching messages');
        }
      } finally {
        setLoading(false);
      }
    };

    if (conversationId) {
      fetchMessages();
    } else {
      setLoading(false);
    }
  }, [conversationId]);

  const handleNewMessage = (newMessage, llmResponse) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), content: newMessage, role: 'user' },
      { id: Date.now() + 1, content: llmResponse, role: 'assistant' },
    ]);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }



  return (
    <div className="box" style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <h1 className="title">Conversation {conversationId}</h1>
      <div className="conversation" style={{ flex: 1, overflowY: 'auto' }}>
        {messages.length === 0 ? (
          <div className="notification is-info">What can I do for you?</div>
        ) : (
          <MessageList messages={messages} />
        )}
      </div>
      <MessageInput conversationId={conversationId} onMessageSent={handleNewMessage} />
    </div>
  );
};

export default Convo;
