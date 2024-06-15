// frontend/scr/components/conversation/ConversationCurrent.js

// renders current conversation messgas and provides input field
// curret user from ConversationContext
// acts as the main interface for displaying and 
// interacting with the current conversation, fetching and 
// rendering messages, and handling user input for new messages.


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useConversation } from '../../context/ConversationContext';

const ConversationCurrent = () => {
  const { conversationId } = useConversation();
  const messagesEndRef = useRef(null);
  

  return (
    <div className="box" style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <h1 className="title">Conversation {conversationId}</h1>
      <div className="conversation" style={{ flex: 1, overflowY: 'auto' }}>
          <MessageList />
        <div ref={messagesEndRef} />
      </div>
      <MessageInput conversationId={conversationId} />
    </div>
  );
};

export default ConversationCurrent;
