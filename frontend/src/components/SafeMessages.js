// import React, { useState, useEffect } from "react";
// import { getSafeMessages } from "../api";

// const SafeMessages = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchSafeMessages = async () => {
//       try {
//         const data = await getSafeMessages();
//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching safe messages:", error);
//       }
//     };

//     fetchSafeMessages();
//   }, []);

//   return (
//     <div>
//       <h2>Safe Messages</h2>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SafeMessages;
