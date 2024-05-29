// frontend/src/api.js

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = '/api';

// export const createConversation = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/conversations/new`, {
//       method: 'POST',
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('Error creating conversation:', error);
//     throw error;
//   }
// };

// export const sendMessage = async (conversationId, content) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ content }),
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('Error sending message:', error);
//     throw error;
//   }
// };


// export async function login(email, password) {
//   console.log('Sending login request with email:', email);
//   const response = await fetch(`${API_BASE_URL}/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   console.log('Login response status:', response.status);

//   if (!response.ok) {
//     throw new Error('Login failed');
//   }

//   return response.json();
// }



export const getSafeMessages = async () => {
  try {
    const url = `${API_BASE_URL}/safe-messages/`;
    console.log('Fetching safe messages from URL:', url); // Log the URL

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch safe messages');
    }
    const data = await response.json();
    console.log("Safe messages:", data);
    return data;
  } catch (error) {
    console.error("Error fetching safe messages:", error);
    throw error;
  }
};