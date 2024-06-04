// frontend/src/components/conversation/MessageInput.js
import React, { useState } from 'react';
import axios from 'axios';
import { useConversation } from '../../context/ConversationContext';

const MessageInput = ({ conversationId, onMessageSent }) => {
  const [content, setContent] = useState('');
  const { isLoggedIn, token } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const response = await axios.post(`/convo/conversations/${conversationId}/messages/`, { content }, {
        headers: isLoggedIn ? { Authorization: `Bearer ${token}` } : {}
      });
      onMessageSent(response.data.response);
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 'auto' }}>
      <input
        className="input"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="button is-primary" type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
