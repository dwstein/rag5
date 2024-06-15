// frontend/scr/components/conversation/MessageList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useConversation } from '../../context/ConversationContext';
import Message from './Message';

const MessageList = () => {
  const { conversationId } = useConversation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (conversationId) {
          const response = await axios.get(`/convo/conversations/${conversationId}/messages/`);
          setMessages(response.data);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [conversationId]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div>No messages yet. Start a conversation!</div>
      ) : (
        messages.map((message, index) => (
          <Message key={message.id || index} message={message} />
        ))
      )}
    </div>
  );
};

export default MessageList;
