import React, { useState, useRef, useEffect } from 'react';
import { 
  HelpCircle, 
  X, 
  Send, 
  Loader2, 
  ExternalLink,
  ChevronDown,
  ChevronUp 
} from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { cn } from '@/lib/utils';

interface AIAnswer {
  answer: string;
  citations?: { url: string; title?: string }[];
}

export function ContextualHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<AIAnswer | null>(null);
  const [showCitations, setShowCitations] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [location] = useLocation();

  // Suggestions based on current page
  const pageSuggestions: {[key: string]: string[]} = {
    '/': [
      'What is students-ai?',
      'How can AI help with my studies?',
      'What features do you offer?'
    ],
    '/about': [
      'Tell me more about your AI technology',
      'How do you handle privacy?',
      'Who built students-ai?'
    ],
    '/features': [
      'Can I use this for research papers?',
      'How do I use the study planner?',
      'Is there an offline mode?'
    ],
    '/pricing': [
      'Is there a free plan?',
      'What\'s included in the premium tier?',
      'Do you offer student discounts?'
    ],
    '/app': [
      'How do I create a new task?',
      'Can I sync with my calendar?',
      'How do I track my progress?'
    ],
    '/login': [
      'I forgot my password',
      'Is my data secure?',
      'What login methods do you support?'
    ],
    '/signup': [
      'What information do you need?',
      'Do you offer a trial?',
      'How do I verify my student status?'
    ]
  };

  // Default to home page suggestions if current page has no specific suggestions
  const currentSuggestions = pageSuggestions[location] || pageSuggestions['/'];
  
  // Auto-scroll to bottom of chat when new messages appear
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [answer]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setAnswer(null);
      setQuery('');
    }, 300); // Clear after animation completes
  };

  const handleSendQuery = async () => {
    if (!query.trim() || isLoading) return;
    
    setIsLoading(true);
    setAnswer(null);
    
    try {
      const response = await fetch('/api/ai-help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          page: location
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const responseData = await response.json();
      setAnswer(responseData);
    } catch (error) {
      console.error('Error getting AI help:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI assistance. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuery();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSendQuery();
  };

  return (
    <>
      {/* Help Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 shadow-lg bg-primary/90 hover:bg-primary hover:scale-105 transition-all"
        aria-label="Get AI Help"
      >
        <HelpCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Help Panel */}
      <div
        className={cn(
          "fixed bottom-0 right-0 w-full sm:w-96 max-h-[80vh] bg-background border border-border rounded-t-lg shadow-xl transition-transform duration-300 flex flex-col",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{ zIndex: 100 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-serif text-lg font-medium">Ask Studie</h3>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[60vh]">
          {!answer && !isLoading && (
            <div className="space-y-6">
              <p className="text-muted-foreground text-sm">
                How can I help with your studies today?
              </p>
              
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Suggested Questions:</p>
                <div className="grid gap-2">
                  {currentSuggestions.map((suggestion, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto py-2 px-3 text-left text-xs"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
              <p className="mt-2 text-sm text-muted-foreground">Thinking...</p>
            </div>
          )}

          {answer && (
            <div className="space-y-4">
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-sm font-medium">{query}</p>
              </div>

              <div className="bg-primary/10 p-3 rounded-lg">
                <div 
                  className="text-sm prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ 
                    __html: answer.answer.replace(/\n/g, '<br />') 
                  }} 
                />
                
                {answer.citations && answer.citations.length > 0 && (
                  <div className="mt-3 border-t pt-2">
                    <button
                      onClick={() => setShowCitations(!showCitations)}
                      className="text-xs flex items-center text-muted-foreground hover:text-foreground"
                    >
                      {showCitations ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                      {showCitations ? 'Hide sources' : 'Show sources'}
                    </button>
                    
                    {showCitations && (
                      <div className="mt-2 space-y-1">
                        {answer.citations.map((citation, i) => (
                          <div key={i} className="flex items-start">
                            <ExternalLink className="h-3 w-3 mr-1 mt-0.5 text-primary/70" />
                            <a
                              href={citation.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-primary/70 hover:text-primary truncate"
                            >
                              {citation.url}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t bg-background">
          <div className="flex items-center">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your question here..."
              className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[40px] max-h-[120px]"
              rows={1}
              disabled={isLoading}
            />
            <Button
              size="sm"
              type="submit"
              disabled={!query.trim() || isLoading}
              onClick={handleSendQuery}
              className="ml-2 h-10 w-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            Powered by AI. Responses may not always be accurate.
          </p>
        </div>
      </div>
    </>
  );
}