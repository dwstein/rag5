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
      const response = await axios.post(`/convo/conversations/${conversationId}/messages/`, { content });
      onMessageSent(content, response.data.response);
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= 1000) {
      setContent(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            value={content}
            onChange={handleChange}
            placeholder="Type your message..."
            rows={1}
            style={{ resize: 'none' }}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-primary is-fullwidth">Send</button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
