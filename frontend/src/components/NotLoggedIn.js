// frontend/src/components/NotLoggedIn.js

import React from 'react';


const NotLoggedIn = () => {
  return (
    <div className="notification is-primary">
      <div className="login-prompt">
        <h1>RAG5 Beta</h1>
        <p>PLease login or create a free account.</p>
      </div>
    </div>
  );
};

export default NotLoggedIn;
