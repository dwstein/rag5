// frontend/scr/components/conversation/ConversationCurrent.js

// home of the current converstaion
// houses Message list and message input


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useConversation } from '../../context/ConversationContext';
import ConvoTitle from './ConvoTitle';


const ConversationCurrent = () => {
  const { conversationId } = useConversation();











  return (
    <div className="box" style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <ConvoTitle />
      <div className="conversation" style={{ flex: 1, overflowY: 'auto' }}>
        <MessageList />
      </div>
      <MessageInput conversationId={conversationId} />
    </div>
  );
}

export default ConversationCurrent;
