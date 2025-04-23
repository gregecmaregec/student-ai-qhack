import axios from 'axios';

interface StudentsAIRequest {
  query: string;
}

interface StudentsAIResponse {
  response: string;
}

// Function to query the StudentsAI API through our backend
export async function queryStudentsAI(query: string): Promise<string> {
  try {
    const response = await axios.post<StudentsAIResponse>('/api/query', {
      query
    });
    
    return response.data.response;
  } catch (error) {
    console.error('Error calling StudentsAI API:', error);
    throw new Error('Failed to get response from StudentsAI');
  }
}

// Function for authenticated users to send a message to an existing chat
export async function sendChatMessage(chatId: number, content: string): Promise<any> {
  try {
    const response = await axios.post(`/api/chats/${chatId}/messages`, {
      role: 'user',
      content
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error('Failed to send message');
  }
}

// Function to create a new chat
export async function createChat(title: string = 'New Conversation'): Promise<any> {
  try {
    const response = await axios.post('/api/chats', {
      title
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw new Error('Failed to create chat');
  }
}

// Function to get all chats for the authenticated user
export async function getChats(): Promise<any> {
  try {
    const response = await axios.get('/api/chats');
    return response.data;
  } catch (error) {
    console.error('Error getting chats:', error);
    throw new Error('Failed to get chats');
  }
}

// Function to get all messages for a specific chat
export async function getChatMessages(chatId: number): Promise<any> {
  try {
    const response = await axios.get(`/api/chats/${chatId}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error getting chat messages:', error);
    throw new Error('Failed to get chat messages');
  }
}

// Function for non-authenticated users to interact with the AI once
export async function createAnonymousChat(content: string): Promise<any> {
  try {
    const response = await axios.post('/api/anonymous-chat', {
      content
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating anonymous chat:', error);
    throw new Error('Failed to create anonymous chat');
  }
}