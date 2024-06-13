// frontend/src/components/conversation/ConversationParent.js

// Top conversation Parent
// holds ConversationList and ConversationCurrent


import React from 'react';
import ConversationList from './ConversationList';
import ConversationCurrent from './ConversationCurrent';

const ConversationParent = () => {
  return (
    <div className="conversation-view">
      <ConversationList />
      <div className="message-area">
        <ConversationCurrent />
      </div>
    </div>
  );
};

export default ConversationParent;

