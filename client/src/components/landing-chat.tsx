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
    <div className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border border-primary/20 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-xl -mr-8 -mt-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/5 to-purple-500/5 rounded-full blur-xl -ml-8 -mb-8"></div>
        
        {/* Chat messages container */}
        <div className="p-5 h-64 md:h-80 overflow-y-auto flex flex-col space-y-4 relative scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-3 bg-primary/5 rounded-full mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 10.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 14H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-center text-muted-foreground text-sm">
                Ask me anything about your studies!
              </p>
              <p className="text-xs text-center text-muted-foreground/70 max-w-xs mt-2">
                I can help with research, writing, study plans, and more.
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
                  className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground"
                      : "bg-card border border-muted/50"
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] px-5 py-4 rounded-2xl shadow-sm bg-card border border-muted/50">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-primary/10 p-4 bg-gradient-to-r from-background to-background/95">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask about your studies..."
            className="flex-1 border-primary/20 focus-visible:ring-primary/30 rounded-full py-5 pl-4 pr-10 bg-card/80"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading}
            className="rounded-full h-10 w-10 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-md"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}