// frontend/src/App.js

import React, { useEffect, useState } from "react";

// const backendUrl = '/api'; // Use the /api prefix

function App() {
  const [healthCheck, setHealthCheck] = useState(null);
  const [messages, setMessages] = useState([]);
  

  // health check
  useEffect(() => {
    const healthCheckUrl = '/api/health_2';
    console.log('Health check url_2:', healthCheckUrl);
    fetch(healthCheckUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Health check response:', data);
        setHealthCheck(data);
      })
      .catch(error => console.error('Error fetching health check:', error));




  // useEffect(() => {
  //   const healthCheckUrl_2 = `${backendUrl}/health_2`;
  //   console.log('Health check url_2:', healthCheckUrl_2);
  //   fetch(`${backendUrl}/health_2`)
  //     .then(response => response.json())
  //     .then(data => console.log('Health check response:', data))
  //     .catch(error => console.error('Error:', error));
  // }, []);








   // Fetch messages
   const messagesUrl = '/api/safe-messages_2/';
   console.log('Fetch messages url:', messagesUrl);
   fetch(messagesUrl)
     .then(response => response.json())
     .then(data => {
       console.log('Fetch messages response:', data);
       setMessages(data);
     })
     .catch(error => console.error('Error fetching messages:', error));
 }, []);


  // // safe messages 2 - in conversation_endpoints.py
  // useEffect(() => {

  //   const fetchMessagesUrl = `${backendUrl}/safe-messages_2`;
  //   console.log('Fetch messages url:', fetchMessagesUrl);

  //   fetch(`${backendUrl}/safe-messages_2`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Fetched messages:', data);
  //       setMessages(data);
  //     })
  //     .catch(error => console.error('Error fetching messages:', error));
  // }, []);




  return (
    <div>
      <h1>Health Check</h1>
      <pre>{JSON.stringify(healthCheck, null, 2)}</pre>
      <h1>Messages</h1>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
}


export default App;
