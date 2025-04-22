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
import { colors } from '@/lib/colors';

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
      <div className="bg-background min-h-screen">
        <div className="container mx-auto p-4">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-serif font-bold text-foreground">
              {getGreeting()}, {profile?.displayName?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Student'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>
          
          {/* Tools row at the top */}
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            <Button 
              variant={activeTab === 'chat' ? 'default' : 'outline'} 
              className="px-4 py-2 rounded-full text-sm bg-primary/90 hover:bg-primary text-white" 
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
            <Button 
              variant={activeTab === 'notes' ? 'default' : 'outline'} 
              className="px-4 py-2 rounded-full text-sm bg-primary/90 hover:bg-primary text-white"
              onClick={() => setActiveTab('notes')}
            >
              <NotebookPen className="mr-2 h-4 w-4" />
              Notes
            </Button>
            <Button 
              variant={activeTab === 'calendar' ? 'default' : 'outline'} 
              className="px-4 py-2 rounded-full text-sm bg-primary/90 hover:bg-primary text-white"
              onClick={() => setActiveTab('calendar')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
            <Button 
              variant={activeTab === 'pdf' ? 'default' : 'outline'} 
              className="px-4 py-2 rounded-full text-sm bg-primary/90 hover:bg-primary text-white"
              onClick={() => setActiveTab('pdf')}
            >
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button 
              variant={activeTab === 'library' ? 'default' : 'outline'} 
              className="px-4 py-2 rounded-full text-sm bg-primary/90 hover:bg-primary text-white"
              onClick={() => setActiveTab('library')}
            >
              <Library className="mr-2 h-4 w-4" />
              Library
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'default' : 'outline'} 
              className="px-4 py-2 rounded-full text-sm bg-primary/90 hover:bg-primary text-white"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Main Content */}
            <div>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle>
                    {activeTab === 'chat' && (
                      <div className="flex items-center">
                        <Zap className="mr-2 h-5 w-5 text-primary" />
                        AI Study Assistant
                      </div>
                    )}
                    {activeTab === 'notes' && (
                      <div className="flex items-center">
                        <NotebookPen className="mr-2 h-5 w-5 text-primary" />
                        Notes
                      </div>
                    )}
                    {activeTab === 'calendar' && (
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-primary" />
                        Calendar
                      </div>
                    )}
                    {activeTab === 'pdf' && (
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-primary" />
                        PDF Manager
                      </div>
                    )}
                    {activeTab === 'library' && (
                      <div className="flex items-center">
                        <Library className="mr-2 h-5 w-5 text-primary" />
                        Library
                      </div>
                    )}
                    {activeTab === 'settings' && (
                      <div className="flex items-center">
                        <Settings className="mr-2 h-5 w-5 text-primary" />
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
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-muted text-foreground dark:bg-muted dark:text-muted-foreground'
                                }`}
                              >
                                <p>{msg.text}</p>
                                <div className={`text-xs mt-1 ${
                                  msg.sender === 'user' 
                                    ? 'text-primary-foreground/70' 
                                    : 'text-muted-foreground'
                                }`}>
                                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      
                      <div className="p-4 border-t dark:border-border">
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
                        <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full inline-block mb-4">
                          {activeTab === 'notes' && <NotebookPen className="h-8 w-8 text-primary" />}
                          {activeTab === 'calendar' && <Calendar className="h-8 w-8 text-primary" />}
                          {activeTab === 'pdf' && <FileText className="h-8 w-8 text-primary" />}
                          {activeTab === 'library' && <Library className="h-8 w-8 text-primary" />}
                          {activeTab === 'settings' && <Settings className="h-8 w-8 text-primary" />}
                        </div>
                        <h3 className="text-xl font-medium mb-2 text-foreground">
                          {activeTab === 'notes' && 'Notes Coming Soon'}
                          {activeTab === 'calendar' && 'Calendar Coming Soon'}
                          {activeTab === 'pdf' && 'PDF Manager Coming Soon'}
                          {activeTab === 'library' && 'Library Coming Soon'}
                          {activeTab === 'settings' && 'Settings Coming Soon'}
                        </h3>
                        <p className="text-muted-foreground">
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