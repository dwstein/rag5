// frontend/src/App.js

import React, { useEffect, useState } from "react";
import HealthCheck from "./components/HealthCheck"; 


function App() {

  const [messages, setMessages] = useState([]);
  

  // health check
  useEffect(() => {


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




  return (
    <div>
      <HealthCheck /> {/* Use the HealthCheck component */}
      <h1>Messages</h1>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
}


export default App;
