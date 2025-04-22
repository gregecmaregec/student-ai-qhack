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
  NotebookPen,
  Brain,
  Briefcase,
  FileBarChart,
  GraduationCap
} from 'lucide-react';
import { colors } from '@/lib/colors';
import { cn } from '@/lib/utils';

// Define the tools with their icons, titles and descriptions
const tools = [
  {
    id: 'chat',
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'AI Assistant',
    description: 'Ask questions and get help with your studies',
    bgGradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'notes',
    icon: <NotebookPen className="h-6 w-6" />,
    title: 'Notes',
    description: 'Organize your study notes and important information',
    bgGradient: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'calendar',
    icon: <Calendar className="h-6 w-6" />,
    title: 'Calendar',
    description: 'Manage your schedule and keep track of deadlines',
    bgGradient: 'from-fuchsia-500 to-pink-500'
  },
  {
    id: 'pdf',
    icon: <FileText className="h-6 w-6" />,
    title: 'PDF Manager',
    description: 'Upload and extract information from academic papers',
    bgGradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'library',
    icon: <Library className="h-6 w-6" />,
    title: 'Resource Library',
    description: 'Access study materials and recommended resources',
    bgGradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'essays',
    icon: <FileBarChart className="h-6 w-6" />,
    title: 'Essay Helper',
    description: 'Get feedback and suggestions for your writing',
    bgGradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'flashcards',
    icon: <Brain className="h-6 w-6" />,
    title: 'Flashcards',
    description: 'Create and study with AI-enhanced flashcards',
    bgGradient: 'from-violet-500 to-fuchsia-500'
  },
  {
    id: 'settings',
    icon: <Settings className="h-6 w-6" />,
    title: 'Settings',
    description: 'Configure your preferences and account details',
    bgGradient: 'from-slate-500 to-gray-600'
  }
];

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

  const activeTool = tools.find(tool => tool.id === activeTab) || tools[0];

  return (
    <MainLayout withFooter={false}>
      <div className="bg-background min-h-screen">
        <div className="container mx-auto p-4">
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-serif font-bold text-foreground">
              {getGreeting()}, {profile?.displayName?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Student'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>
          
          {/* Tools Grid */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={cn(
                    "relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden",
                    activeTab === tool.id 
                      ? "bg-gradient-to-br shadow-lg scale-105 ring-2 ring-white/20" 
                      : "bg-gradient-to-br hover:shadow-md hover:scale-[1.02] bg-opacity-80"
                  )}
                  style={{
                    background: `linear-gradient(135deg, var(--${tool.bgGradient.split(' ')[0].substring(5)}), var(--${tool.bgGradient.split(' ')[1].substring(3)}))`
                  }}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 flex flex-col items-center text-white">
                    <div className="p-3 rounded-full bg-white/20 mb-2">
                      {tool.icon}
                    </div>
                    <span className="font-medium text-sm">{tool.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Main Content */}
            <div>
              <Card className="h-full overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-purple-500/10">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 rounded-full bg-gradient-to-br from-primary to-purple-500 text-white">
                      {activeTool.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {activeTool.title}
                      </CardTitle>
                      <CardDescription>
                        {activeTool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {activeTab === 'chat' && (
                    <div className="flex flex-col h-[65vh]">
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
                                    ? 'bg-gradient-to-r from-primary to-purple-500 text-white' 
                                    : 'bg-muted text-foreground dark:bg-muted/60 dark:text-muted-foreground'
                                }`}
                              >
                                <p>{msg.text}</p>
                                <div className={`text-xs mt-1 ${
                                  msg.sender === 'user' 
                                    ? 'text-white/70' 
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
                            className="flex-1 border-primary/30 focus-visible:ring-primary/50"
                          />
                          <Button 
                            type="submit"
                            className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}
                  
                  {activeTab !== 'chat' && (
                    <div className="h-[65vh] flex items-center justify-center p-4">
                      <div className="text-center max-w-md">
                        <div className="p-6 rounded-full inline-block mb-6 bg-gradient-to-br from-primary/20 to-purple-500/20">
                          <div className="bg-gradient-to-br from-primary to-purple-500 text-white p-4 rounded-full">
                            {activeTool.icon}
                          </div>
                        </div>
                        <h3 className="text-xl font-medium mb-2 text-foreground">
                          {activeTool.title} Coming Soon
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          This feature will be available in an upcoming update.
                        </p>
                        <Button 
                          onClick={() => setActiveTab('chat')}
                          className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white"
                        >
                          Return to AI Assistant
                        </Button>
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