import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/main-layout';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from '@/components/ui/separator';
import { 
  Book, 
  Calendar, 
  FileText, 
  Send, 
  Zap, 
  Clock, 
  MessageSquare, 
  Settings, 
  PanelLeft,
  Library,
  NotebookPen
} from 'lucide-react';

export function AppPage() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; timestamp: Date }[]>([
    { sender: 'assistant', text: 'Hello! I\'m your AI study assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        sender: 'assistant',
        text: "I'll be able to help you with that once the AGNO framework is connected. For now, I'm just a placeholder for the future AI assistant functionality.",
        timestamp: new Date()
      };
      setChatMessages(prevMessages => [...prevMessages, assistantMessage]);
    }, 1000);
  };

  return (
    <MainLayout withFooter={false}>
      <div className="bg-[#F7EFE6] dark:bg-[#1E1E1E] min-h-screen">
        <div className="container mx-auto p-4">
          <header className="mb-6">
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
              {getGreeting()}, {profile?.displayName || user?.displayName || 'Student'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant={activeTab === 'chat' ? 'default' : 'ghost'} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab('chat')}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      AI Assistant
                    </Button>
                    <Button 
                      variant={activeTab === 'notes' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('notes')}
                    >
                      <NotebookPen className="mr-2 h-4 w-4" />
                      Notes
                    </Button>
                    <Button 
                      variant={activeTab === 'calendar' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('calendar')}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendar
                    </Button>
                    <Button 
                      variant={activeTab === 'pdf' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('pdf')}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      PDF Manager
                    </Button>
                    <Button 
                      variant={activeTab === 'library' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('library')}
                    >
                      <Library className="mr-2 h-4 w-4" />
                      Library
                    </Button>
                    <Separator className="my-3" />
                    <Button 
                      variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle>
                    {activeTab === 'chat' && (
                      <div className="flex items-center">
                        <Zap className="mr-2 h-5 w-5 text-primary-600" />
                        AI Study Assistant
                      </div>
                    )}
                    {activeTab === 'notes' && (
                      <div className="flex items-center">
                        <NotebookPen className="mr-2 h-5 w-5 text-primary-600" />
                        Notes
                      </div>
                    )}
                    {activeTab === 'calendar' && (
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-primary-600" />
                        Calendar
                      </div>
                    )}
                    {activeTab === 'pdf' && (
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-primary-600" />
                        PDF Manager
                      </div>
                    )}
                    {activeTab === 'library' && (
                      <div className="flex items-center">
                        <Library className="mr-2 h-5 w-5 text-primary-600" />
                        Library
                      </div>
                    )}
                    {activeTab === 'settings' && (
                      <div className="flex items-center">
                        <Settings className="mr-2 h-5 w-5 text-primary-600" />
                        Settings
                      </div>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === 'chat' && 'Ask a question or get help with your studies'}
                    {activeTab === 'notes' && 'Organize your study notes'}
                    {activeTab === 'calendar' && 'Manage your schedule and deadlines'}
                    {activeTab === 'pdf' && 'Upload and manage your PDF files'}
                    {activeTab === 'library' && 'Access study resources and materials'}
                    {activeTab === 'settings' && 'Configure your preferences'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-0">
                  {activeTab === 'chat' && (
                    <div className="flex flex-col h-[70vh]">
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {chatMessages.map((msg, i) => (
                            <div 
                              key={i} 
                              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                  msg.sender === 'user' 
                                    ? 'bg-primary-500 text-white' 
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                }`}
                              >
                                <p>{msg.text}</p>
                                <div className={`text-xs mt-1 ${
                                  msg.sender === 'user' 
                                    ? 'text-primary-100' 
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      
                      <div className="p-4 border-t dark:border-gray-700">
                        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                          <Input
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-1"
                          />
                          <Button type="submit">
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  
                  {(activeTab === 'notes' || activeTab === 'calendar' || activeTab === 'pdf' || 
                    activeTab === 'library' || activeTab === 'settings') && (
                    <div className="h-[70vh] flex items-center justify-center p-4">
                      <div className="text-center max-w-md">
                        <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full inline-block mb-4">
                          {activeTab === 'notes' && <NotebookPen className="h-8 w-8 text-primary-600" />}
                          {activeTab === 'calendar' && <Calendar className="h-8 w-8 text-primary-600" />}
                          {activeTab === 'pdf' && <FileText className="h-8 w-8 text-primary-600" />}
                          {activeTab === 'library' && <Library className="h-8 w-8 text-primary-600" />}
                          {activeTab === 'settings' && <Settings className="h-8 w-8 text-primary-600" />}
                        </div>
                        <h3 className="text-xl font-medium mb-2">
                          {activeTab === 'notes' && 'Notes Coming Soon'}
                          {activeTab === 'calendar' && 'Calendar Coming Soon'}
                          {activeTab === 'pdf' && 'PDF Manager Coming Soon'}
                          {activeTab === 'library' && 'Library Coming Soon'}
                          {activeTab === 'settings' && 'Settings Coming Soon'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          This feature will be available in an upcoming update.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AppPage;