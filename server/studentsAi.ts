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
    // The actual StudentsAI API call
    const response = await axios.post<StudentsAIResponse>(
      'https://api.students-ai.com/api/query',
      { query }
    );
    
    return response.data.response;
  } catch (error) {
    // If there's an error with the actual API, we'll simulate a response for development
    console.error('Error calling StudentsAI API:', error);
    
    // Generate a simulated response based on the query
    const simulatedResponse = generateSimulatedResponse(query);
    return simulatedResponse;
  }
}

// Function to generate a simulated response for development purposes
function generateSimulatedResponse(query: string): string {
  // Convert query to lowercase for easier matching
  const queryLower = query.toLowerCase();
  
  // Basic response templates based on common educational questions
  if (queryLower.includes('study') || queryLower.includes('learn')) {
    return "Search Agent Response: Here's information about effective study methods:\n\n" +
      "## Effective Study Techniques\n\n" +
      "- **Spaced Repetition**: Schedule review sessions over time rather than cramming\n" +
      "- **Active Recall**: Test yourself instead of passively re-reading\n" +
      "- **Pomodoro Technique**: Study in focused 25-minute intervals with 5-minute breaks\n" +
      "- **Feynman Technique**: Explain concepts in simple language to solidify understanding\n\n" +
      "Would you like more specific advice on a particular subject or learning challenge?";
  }
  
  if (queryLower.includes('math') || queryLower.includes('calculus') || queryLower.includes('algebra')) {
    return "Search Agent Response: Here are some math learning resources:\n\n" +
      "## Math Learning Resources\n\n" +
      "- **Khan Academy**: Free lessons on all math topics from basic to advanced\n" +
      "- **Paul's Online Math Notes**: Excellent for calculus and differential equations\n" +
      "- **3Blue1Brown**: Visual explanations of mathematical concepts\n" +
      "- **MIT OpenCourseWare**: University-level math courses\n\n" +
      "What specific math concept are you trying to understand?";
  }
  
  if (queryLower.includes('write') || queryLower.includes('essay') || queryLower.includes('paper')) {
    return "Search Agent Response: Here are tips for academic writing:\n\n" +
      "## Academic Writing Tips\n\n" +
      "1. **Start with an outline**: Organize your thoughts before writing\n" +
      "2. **Thesis statement**: Have a clear, arguable main point\n" +
      "3. **Evidence**: Support claims with credible sources\n" +
      "4. **Revision**: Allow time for multiple drafts\n" +
      "5. **Conciseness**: Eliminate unnecessary words and phrases\n\n" +
      "Are you working on a specific writing assignment I can help with?";
  }
  
  if (queryLower.includes('history') || queryLower.includes('historical')) {
    return "Search Agent Response: Here are history study resources:\n\n" +
      "## History Study Resources\n\n" +
      "- **Primary sources**: Original documents from the time period\n" +
      "- **Crash Course History**: Video series covering world and US history\n" +
      "- **Timeline creation**: Map events chronologically to see relationships\n" +
      "- **Historical context**: Consider social, economic, and political factors\n\n" +
      "Which historical period or event are you researching?";
  }
  
  if (queryLower.includes('science') || queryLower.includes('biology') || queryLower.includes('chemistry') || queryLower.includes('physics')) {
    return "Search Agent Response: Here are science study strategies:\n\n" +
      "## Science Study Strategies\n\n" +
      "- **Concept mapping**: Create visual representations of relationships\n" +
      "- **Laboratory notes**: Maintain detailed records of experiments\n" +
      "- **Applied problems**: Practice applying theories to real-world scenarios\n" +
      "- **Interdisciplinary connections**: Connect concepts across scientific fields\n\n" +
      "Which scientific concept would you like to explore further?";
  }
  
  if (queryLower.includes('test') || queryLower.includes('exam') || queryLower.includes('quiz')) {
    return "Search Agent Response: Here are test preparation strategies:\n\n" +
      "## Test Preparation Strategies\n\n" +
      "- **Create a study schedule**: Plan your review sessions leading up to the test\n" +
      "- **Practice tests**: Take timed practice exams under test-like conditions\n" +
      "- **Identify weak areas**: Focus more time on challenging concepts\n" +
      "- **Study groups**: Discuss and explain concepts with peers\n" +
      "- **Self-care**: Ensure adequate sleep, nutrition, and exercise\n\n" +
      "What type of test are you preparing for?";
  }
  
  // Default response for other queries
  return "Search Agent Response: I'd be happy to help with your academic question about \"" + query + "\".\n\n" +
    "To provide the most helpful information, could you share:\n\n" +
    "1. What specific subject or topic you're studying\n" +
    "2. Your current level of education\n" +
    "3. What you're trying to accomplish\n\n" +
    "This will help me tailor my response to your educational needs.";
}