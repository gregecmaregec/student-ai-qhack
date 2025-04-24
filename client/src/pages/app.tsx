import { MainLayout } from '@/components/main-layout';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatInterface } from '@/components/auth/chat-interface';
import { MessageSquare } from 'lucide-react';

export function AppPage() {
  const { user, profile } = useAuth();
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

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
          
          <div className="grid grid-cols-1 gap-6">
            {/* Main Content */}
            <div>
              <Card className="h-full overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-purple-500/10">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 rounded-full bg-gradient-to-br from-primary to-purple-500 text-white">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        Students AI Assistant
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="flex flex-col h-[65vh]">
                    <ChatInterface />
                  </div>
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