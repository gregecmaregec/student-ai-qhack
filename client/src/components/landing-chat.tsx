import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
  classification?: string;
  model?: string;
}

// Map classification codes to human-readable names and colors
const classificationMap: Record<string, { name: string, color: string }> = {
  "3-Assignment Helper": { 
    name: "Assignment Helper", 
    color: "from-orange-500 to-amber-500" 
  },
  "4-Concept Explainer": { 
    name: "Concept Explainer", 
    color: "from-blue-500 to-indigo-600" 
  },
  "5-Study Tools": { 
    name: "Study Tools", 
    color: "from-green-500 to-emerald-500" 
  },
  "6-Mental Wellness": { 
    name: "Mental Wellness", 
    color: "from-purple-500 to-fuchsia-500" 
  }
};

export function LandingChat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Sample questions to showcase different features
  const sampleQuestions = [
    "Can you help me improve my essay introduction?", // Assignment Helper
    "Explain the concept of quantum entanglement simply", // Concept Explainer
    "Create flashcards for photosynthesis process", // Study Tools
    "I'm feeling stressed about my exams next week", // Mental Wellness
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSampleQuestionClick = (question: string) => {
    setInputValue(question);
    // Focus the input after setting the value
    const inputElement = document.querySelector('input');
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add the user message to the messages array
    const userMessage: Message = {
      role: "user",
      content: inputValue
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue("");
    
    try {
      // Make the API request using relative URL to prevent cross-origin issues
      const response = await axios.post("/api/search", {
        query: userMessage.content
      });
      
      // Add the assistant response to the messages array with additional metadata
      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.response || "Sorry, I couldn't process your request at the moment.",
        classification: response.data.classification,
        model: response.data.model
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error searching AI API:", error);
      
      // Add an error message
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, there was an error connecting to our AI service. Please try again later."
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden bg-white/5 shadow-sm dark:bg-gray-900/20 border border-purple-100/10 dark:border-purple-800/10 backdrop-blur-sm transition-all">
      {/* Chat messages container */}
      <div 
        ref={chatContainerRef}
        className="px-4 py-4 h-56 sm:h-64 md:h-72 overflow-y-auto flex flex-col space-y-3 scrollbar-thin scrollbar-thumb-purple-200 dark:scrollbar-thumb-purple-800 scrollbar-track-transparent"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-purple-800 dark:text-purple-200">Ask me anything</h3>
                <p className="text-sm text-purple-600/80 dark:text-purple-300/80 mt-1">about your studies!</p>
              </div>
            </div>
            
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleQuestionClick(question)}
                  className="text-left text-xs px-3 py-2 rounded-lg border border-purple-200/50 dark:border-purple-700/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-300 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mr-1.5 flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[90%] px-3 py-2 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg rounded-br-sm"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 rounded-lg rounded-bl-sm"
                  }`}
                >
                  {/* Show classification and model info for assistant messages */}
                  {message.role === "assistant" && message.classification && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Badge 
                        className={`bg-gradient-to-r ${classificationMap[message.classification]?.color || "from-gray-500 to-gray-600"} text-[10px] py-0.5 px-1.5`}
                      >
                        {classificationMap[message.classification]?.name || message.classification}
                      </Badge>
                      {message.model && (
                        <span className="text-[9px] text-gray-500 dark:text-gray-400 truncate">
                          {message.model.split('/').pop()}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                </div>
                {message.role === "user" && (
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200 flex items-center justify-center ml-1.5 flex-shrink-0 mt-1">
                    <span className="text-[10px]">You</span>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mr-1.5 flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="max-w-[90%] px-3 py-2 bg-white/80 dark:bg-gray-800/80 rounded-lg rounded-bl-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {/* Chat input */}
      <div className="border-t border-purple-100/20 dark:border-purple-800/20 px-3 py-2 bg-white/20 dark:bg-gray-800/20">
        <form onSubmit={handleSubmit} className="flex items-center relative">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Talk to Studie..."
            className="flex-1 bg-white/50 dark:bg-gray-700/50 border-none shadow-sm rounded-full py-1.5 pl-4 pr-10 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-purple-400 focus-visible:ring-offset-0"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading}
            className="absolute right-1 rounded-full h-7 w-7 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
              <path d="M22 2L11 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
}