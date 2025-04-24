import { useState } from "react";
import { Send } from "lucide-react";
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
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-xl -mr-8 -mt-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/5 to-purple-500/5 rounded-full blur-xl -ml-8 -mb-8"></div>
        
        {/* Chat messages container */}
        <div className="px-2 py-4 h-64 md:h-80 overflow-y-auto flex flex-col space-y-3 relative scrollbar-none">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center text-muted-foreground text-sm font-medium">
                I'm Studie
              </p>
              <p className="text-xs text-center text-muted-foreground/70 max-w-xs mt-1">
                Ask me anything about your studies
              </p>
            </div>
          ) : (
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
      
      <div className="mt-2">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 border-none bg-transparent focus-visible:ring-0 py-3 px-1 text-sm"
            disabled={isLoading}
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