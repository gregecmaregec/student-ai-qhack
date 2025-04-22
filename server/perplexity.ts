import axios from 'axios';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const API_URL = 'https://api.perplexity.ai/chat/completions';

export interface PerplexityRequest {
  query: string;
  context?: string;
}

export interface PerplexityResponse {
  answer: string;
  citations?: { url: string; title?: string }[];
}

export async function getAIResponse(request: PerplexityRequest): Promise<PerplexityResponse> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY not configured');
  }

  try {
    // Construct messages with context if available
    const messages = [
      {
        role: 'system',
        content: `You are a helpful AI assistant for students on students-ai.com. 
          Be concise, clear, helpful, and encouraging.
          Provide information that is accurate and educational.
          ${request.context ? `The user is currently on: ${request.context}` : ''}
          Focus on providing practical guidance for student questions.`
      },
      {
        role: 'user',
        content: request.query
      }
    ];

    const response = await axios.post(
      API_URL,
      {
        model: 'llama-3.1-sonar-small-128k-online', // Using the recommended model
        messages,
        temperature: 0.2, // Lower temperature for more focused responses
        top_p: 0.9,
        max_tokens: 300, // Keeping responses concise
        return_citations: true,
        search_domain_filter: ['edu'], // Prefer educational content
        search_recency_filter: 'year', // Recent academic content is better
        frequency_penalty: 1, // Reduce repetition
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
        }
      }
    );

    // Transform the response to our simplified format
    const citations = response.data.citations 
      ? response.data.citations.map((url: string) => ({ url }))
      : [];

    return {
      answer: response.data.choices[0].message.content,
      citations
    };
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    throw error;
  }
}