// frontend/src/components/conversation/ConversationView.js


import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import ConversationList from './ConversationList';
import MessageList from './MessageList';

const ConversationView = () => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user,]);

  return (
    <div className="conversation-view">
      <ConversationList currentUser={currentUser} />
      <div className="message-area">
        <MessageList />
      </div>
    </div>
  );
};

export default ConversationView;


