// frontend/src/App.js

import React, { useEffect, useState } from "react";

const backendUrl = '/api'; // Use the /api prefix

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const healthCheckUrl = `${backendUrl}/health`;
    console.log('Health check url:', healthCheckUrl);

    fetch(`${backendUrl}/health`)
      .then(response => response.json())
      .then(data => console.log('Health check response:', data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {

    const fetchMessagesUrl = `${backendUrl}/safe-messages`;
    console.log('Fetch messages url:', fetchMessagesUrl);

    fetch(`${backendUrl}/safe-messages`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched messages:', data);
        setMessages(data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, []);


  return (
    <div>
      <div className="container">
        <h1 className="title">Hello World</h1>
        <p className="subtitle">Welcome to my app!</p>
        <button className="button is-primary">Click me</button>
      </div>
      <div>
        <h2>Safe Messages</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
