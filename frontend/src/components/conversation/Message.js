// frontend/src/components/conversation/MessageInput.js

import React from 'react';

const Message = ({ message }) => {
  const { content, role } = message;

  return (
    <div className="columns is-mobile">
      <div
        className={`column ${
          role === 'user' ? 'is-three-quarters-mobile is-three-quarters' : ''
        }`}
      ></div>
      <div
        className={`column ${
          role === 'user'
            ? 'is-one-quarter-mobile is-one-quarter has-text-right'
            : 'is-full'
        }`}
      >
        <article className={`message ${role === 'user' ? 'is-primary' : 'is-info'}`}>
          <div className="message-body">
            <p>{content}</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Message;

