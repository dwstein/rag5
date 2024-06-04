// frontend/scr/components/conversation/MessageList.js

import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div>No messages yet. Start a conversation!</div>
      ) : (
        messages.map((message, index) => (
          <Message key={message.id|| index} message={message} />
        ))
      )}
    </div>
  );
};

export default MessageList;
