// frontend/src/components/conversation/MessageInput.js

import React from 'react';

const Message = ({ message }) => {
  const { content, role } = message;

  return (
    <article className={`message ${role === 'user' ? 'is-primary' : 'is-info'}`}>
      <div className="message-body">
        <p>{content}</p>
      </div>
    </article>
  );
};

export default Message;

