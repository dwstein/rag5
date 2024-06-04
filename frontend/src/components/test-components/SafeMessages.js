// frontend/src/components/test-components/SafeMessages.js

import React, { useEffect, useState } from "react";

const SafeMessages = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages
    const messagesUrl = '/convo/safe-messages_2/';
    // console.log('Fetch messages url:', messagesUrl);
    fetch(messagesUrl)
      .then(response => response.json())
      .then(data => {
        // console.log('Fetch messages response:', data);
        setMessages(data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  return (
    <div className="box">
      <h1 className="title">Messages</h1>
      <pre className="code">{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
};

export default SafeMessages;
