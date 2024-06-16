// frontend/src/components/conversation/ConversationParent.js

// Top conversation Parent
// holds ConversationList and ConversationCurrent
// ConversationCurrnt holds the messages for the current conversation


import React, { useState } from 'react';
import ConversationList from './ConversationList';
import ConversationCurrent from './ConversationCurrent';

const ConversationParent = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

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

