// frontend/scr/components/conversation/MessageList.js

import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div>No messages yet. Start a conversation!</div>
      ) : (
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      )}
    </div>
  );
};

export default MessageList;
