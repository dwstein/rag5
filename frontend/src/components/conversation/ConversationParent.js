// frontend/src/components/conversation/ConversationParent.js

// Top conversation Parent
// holds ConversationList and ConversationCurrent
// ConversationCurrnt holds the messages for the current conversation


import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import ConversationCurrent from './ConversationCurrent';
import { useAuth } from '../../auth/AuthProvider';

const ConversationParent = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  // useEffect(() => {
  //   // This effect will run whenever isLoggedIn changes, triggering a re-render
  //   console.log("Authentication state changed:", isLoggedIn);
  // }, [isLoggedIn]);

  return (
    <div className="columns is-gapless">
      <div className={`column is-one-quarter is-hidden-mobile ${isMenuActive ? 'is-active' : ''}`}>
        <ConversationList />
      </div>
      <div className="column is-three-quarters">
        <div className="is-hidden-tablet">
          <button className="button is-primary" onClick={toggleMenu}>
            {isMenuActive ? 'Hide Menu' : 'Show Menu'}
          </button>
          {isMenuActive && <ConversationList />}
        </div>
        <ConversationCurrent />
      </div>
    </div>
  );
};

export default ConversationParent;

