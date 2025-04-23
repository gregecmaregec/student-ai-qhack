import axios from 'axios';

interface StudentsAIRequest {
  query: string;
}

interface StudentsAIResponse {
  response: string;
}

// API client for the Students-AI API
export async function queryStudentsAI(query: string): Promise<string> {
  try {
    const response = await axios.post<StudentsAIResponse>(
      'http://api.students-ai.com/api/query',
      { query } as StudentsAIRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data.response;
  } catch (error) {
    console.error('Error querying Students-AI API:', error);
    throw new Error('Failed to get response from Students-AI');
  }
}