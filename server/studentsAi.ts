import axios from 'axios';

interface StudentsAIRequest {
  query: string;
}

interface StudentsAIResponse {
  response: string;
}

// Function to query the StudentsAI API
export async function queryStudentsAI(query: string): Promise<string> {
  try {
    // Make the API call directly to the Students-AI API
    const response = await axios.post<StudentsAIResponse>(
      'https://api.students-ai.com/api/query',
      { query }
    );
    
    return response.data.response;
  } catch (error) {
    console.error('Error calling StudentsAI API:', error);
    throw new Error('Failed to get response from StudentsAI API');
  }
}