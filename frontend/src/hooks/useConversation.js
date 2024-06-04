import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

const useConversation = () => {
  const { isLoggedIn, user } = useAuth();
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const initializeConversation = async () => {
      try {
        // Create a new conversation when the user first arrives
        const response = await axios.post('/api/conversations/new');
        setConversationId(response.data.conversation_id);
      } catch (error) {
        console.error('Error creating new conversation:', error);
      }
    };

    initializeConversation();
  }, []);

  return { conversationId, setConversationId, isLoggedIn, user };
};

export default useConversation;
