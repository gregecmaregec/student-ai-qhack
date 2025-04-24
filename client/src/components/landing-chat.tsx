import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function LandingChat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
      // Make the API request
      const response = await axios.post("https://api.students-ai.com/api/search", {
        query: userMessage.content
      });
      
      // Add the assistant response to the messages array
      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.response || "Sorry, I couldn't process your request at the moment."
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
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden backdrop-blur-sm transition-all">
      {/* Chat messages container */}
      <div className="px-3 py-3 h-48 md:h-56 overflow-y-auto flex flex-col space-y-2 scrollbar-none">
        {messages.length === 0 ? null : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl rounded-br-sm shadow-sm"
                    : "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-800 dark:text-purple-100 rounded-2xl rounded-bl-sm border border-purple-100/50 dark:border-purple-800/20"
                }`}
              >
                <div className="text-sm">{message.content}</div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] px-3 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl rounded-bl-sm border border-purple-100/50 dark:border-purple-800/20">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-0">
        <form onSubmit={handleSubmit} className="flex items-center relative">
          {!inputValue ? (
            <div onClick={() => document.querySelector('input')?.focus()} className="absolute left-3 cursor-pointer flex items-center z-10 w-[85%]">
              <div className="rounded-full bg-white/5 border border-purple-300/20 px-4 py-1.5 w-full flex justify-center">
                <div className="text-sm text-purple-500 dark:text-purple-300 flex items-center">
                  <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Talk to Studie
                </div>
              </div>
            </div>
          ) : null}
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder=""
            className={`flex-1 border-none bg-transparent focus-visible:ring-0 py-2 ${!inputValue ? 'pl-28' : 'pl-3'} pr-3 text-sm transition-all duration-300 ease-in-out text-purple-800 dark:text-purple-200 placeholder:text-purple-400`}
            disabled={isLoading}
            autoFocus
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading}
            className="rounded-full h-8 w-8 -ml-8 bg-transparent hover:bg-transparent text-purple-500 dark:text-purple-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
              <path d="M22 2L11 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
}