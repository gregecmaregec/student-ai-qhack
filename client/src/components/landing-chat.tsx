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
      const response = await axios.post("https://api.students-ai.com/api/query", {
        query: userMessage.content
      });
      
      // Add the assistant response to the messages array
      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.response || "Sorry, I couldn't process your request at the moment."
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error querying AI API:", error);
      
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
      <div className="relative">
        {/* Chat messages container */}
        <div className="px-1 py-2 h-56 md:h-64 overflow-y-auto flex flex-col space-y-2 relative scrollbar-none">
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
                      ? "bg-gradient-to-r from-primary/90 to-primary/80 text-primary-foreground rounded-2xl rounded-br-sm"
                      : "bg-muted/40 text-foreground rounded-2xl rounded-bl-sm"
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] px-3 py-2 bg-muted/40 rounded-2xl rounded-bl-sm">
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-0">
        <form onSubmit={handleSubmit} className="flex items-center relative">
          {!inputValue && (
            <div className="absolute left-0 pointer-events-none flex items-center pl-2 text-muted-foreground/50">
              <span className="text-sm font-light">Talk to Studie</span>
            </div>
          )}
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder=""
            className="flex-1 border-none bg-transparent focus-visible:ring-0 py-2 px-2 text-sm"
            disabled={isLoading}
            autoFocus
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading}
            className="rounded-full h-8 w-8 -ml-8 bg-transparent hover:bg-transparent text-primary hover:text-primary/90 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
}