// frontend/scr/components/conversation/MessageList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useConversation } from '../../context/ConversationContext';
import Message from './Message';

const MessageList = () => {
  const { conversationId, messages, setMessages } = useConversation();
  console.log('conversationId (MessageList):', conversationId);
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log('Fetching messages for conversation: (MessageList)', conversationId);
      try {
        if (conversationId) {
          const response = await axios.get(`/convo/conversations/${conversationId}/messages/`);
          setMessages(response.data);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        console.log('error: (MessageList)', error);
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
