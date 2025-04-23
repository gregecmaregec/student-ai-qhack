import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Plus, Menu, MessageSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ChatMessage {
  id: number;
  chatId: number;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface Chat {
  id: number;
  userId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export function ChatInterface() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState<string>('');
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [isCreatingNewChat, setIsCreatingNewChat] = useState<boolean>(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Get all chats for the user
  const { 
    data: chats = [] as Chat[], 
    isLoading: isLoadingChats,
    error: chatsError
  } = useQuery<Chat[]>({
    queryKey: ['/api/chats'],
    enabled: !!user,
  });

  // Get messages for the active chat
  const { 
    data: messages = [] as ChatMessage[], 
    isLoading: isLoadingMessages,
    error: messagesError
  } = useQuery<ChatMessage[]>({
    queryKey: ['/api/chats', activeChat, 'messages'],
    enabled: !!activeChat,
  });

  // Create a new chat
  const createChatMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest<Chat>('post', '/api/chats', {
        title: 'New Conversation',
      });
      return response;
    },
    onSuccess: (newChat) => {
      queryClient.invalidateQueries({ queryKey: ['/api/chats'] });
      setActiveChat(newChat.id);
      setIsCreatingNewChat(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create new chat',
        variant: 'destructive',
      });
      setIsCreatingNewChat(false);
    }
  });

  // Send a message
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!activeChat) throw new Error('No active chat');
      
      const response = await apiRequest<{userMessage: ChatMessage, aiResponse: ChatMessage}>('post', `/api/chats/${activeChat}/messages`, {
        role: 'user',
        content,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chats', activeChat, 'messages'] });
      // Also update the chats list to show the latest chat first
      queryClient.invalidateQueries({ queryKey: ['/api/chats'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  });

  // Create a new chat when there are no chats
  useEffect(() => {
    if (chats && chats.length === 0 && !isCreatingNewChat && !isLoadingChats) {
      setIsCreatingNewChat(true);
      createChatMutation.mutate();
    } else if (chats && chats.length > 0 && !activeChat) {
      // Set the most recent chat as active
      setActiveChat(chats[0].id);
    }
  }, [chats, isLoadingChats, activeChat, isCreatingNewChat]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when active chat changes
  useEffect(() => {
    if (inputRef.current && activeChat) {
      inputRef.current.focus();
    }
  }, [activeChat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const trimmedInput = inputValue.trim();
    if (!trimmedInput || sendMessageMutation.isPending) return;

    setInputValue('');
    sendMessageMutation.mutate(trimmedInput);
  };

  const handleNewChat = () => {
    setIsCreatingNewChat(true);
    createChatMutation.mutate();
  };

  const handleChatSelect = (chatId: number) => {
    setActiveChat(chatId);
  };

  // Format relative time for chat history
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return date.toLocaleDateString();
  };

  // Get current chat title
  const currentChat = chats.find(chat => chat.id === activeChat);
  const chatTitle = currentChat ? currentChat.title : 'New Chat';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-150px)]">
      {/* Sidebar - Chat History */}
      <div className="md:col-span-1 h-full">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNewChat}
                disabled={isCreatingNewChat}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              <div className="px-3 py-2">
                {isLoadingChats ? (
                  <div className="flex justify-center p-4">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                    </div>
                  </div>
                ) : chatsError ? (
                  <div className="text-center text-sm text-muted-foreground p-4">
                    Failed to load chats
                  </div>
                ) : chats.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground p-4">
                    No conversations yet
                  </div>
                ) : (
                  <div className="space-y-1">
                    {chats.map((chat) => (
                      <button
                        key={chat.id}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-2",
                          chat.id === activeChat
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                        onClick={() => handleChatSelect(chat.id)}
                      >
                        <MessageSquare className="h-4 w-4 shrink-0" />
                        <div className="truncate flex-1">{chat.title}</div>
                        <div className="text-xs opacity-70">{formatRelativeTime(chat.updatedAt)}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="md:col-span-3 h-full">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                {chatTitle}
              </CardTitle>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 relative">
            {!activeChat ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  {isCreatingNewChat ? (
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                      </div>
                      <p>Creating new chat...</p>
                    </div>
                  ) : (
                    <p>Select a chat or start a new one</p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <ScrollArea ref={scrollAreaRef} className="h-[calc(100%-60px)] p-4">
                  <div className="space-y-4">
                    {isLoadingMessages ? (
                      <div className="flex justify-center p-4">
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                        </div>
                      </div>
                    ) : messagesError ? (
                      <div className="text-center text-sm text-muted-foreground p-4">
                        Failed to load messages
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center text-sm text-muted-foreground p-4">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      messages.map((message: ChatMessage) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.role === 'user' ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] rounded-lg px-4 py-2",
                              message.role === 'user'
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            {message.role === 'assistant' ? (
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown>
                                  {message.content}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <p>{message.content}</p>
                            )}
                            <div
                              className={cn(
                                "text-xs mt-1",
                                message.role === 'user'
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              )}
                            >
                              {new Date(message.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {sendMessageMutation.isPending && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 border-t flex gap-2 items-center bg-background absolute bottom-0 left-0 right-0"
                >
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={sendMessageMutation.isPending}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!inputValue.trim() || sendMessageMutation.isPending}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}