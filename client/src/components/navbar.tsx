import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { logOut } from '@/lib/firebase';
import { useIsMobile } from '@/hooks/use-mobile';
import { LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const [location] = useLocation();
  const { user, profile } = useAuth();
  const isMobile = useIsMobile();
  
  const isAuthenticated = Boolean(user);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  // Get user initials for avatar fallback
  const getInitials = (name?: string | null) => {
    if (!name) return '?';
    
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="font-serif text-xl font-medium text-foreground">students-ai</span>
              </Link>
              {isAuthenticated && (
                <div className="flex ml-4 space-x-2 items-center">
                  <Link href="/about">
                    <Button variant="ghost" size="sm" className="px-2 py-1 text-xs rounded-full hover:bg-primary/10">
                      About
                    </Button>
                  </Link>
                  <Link href="/app">
                    <Button variant="ghost" size="sm" className="px-2 py-1 text-xs rounded-full hover:bg-primary/10">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9 border-2 border-primary/20">
                        <AvatarImage src={profile?.photoUrl || undefined} alt={profile?.displayName || 'User'} />
                        <AvatarFallback className="bg-primary/10 text-primary">{getInitials(profile?.displayName)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="px-3 py-1 text-xs">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="px-3 py-1 text-xs rounded-full bg-primary/90 hover:bg-primary text-white">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Navigation buttons below navbar - only visible when not authenticated */}
      {!isAuthenticated && (
        <div className="bg-background py-2 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 flex justify-center sm:justify-start gap-3">
            <Link href="/about">
              <Button variant="outline" size="sm" className="px-4 py-1 text-xs rounded-full bg-primary/10 hover:bg-primary/20 text-primary border-none">
                About
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="sm" className="px-4 py-1 text-xs rounded-full bg-primary/10 hover:bg-primary/20 text-primary border-none">
                Features
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="sm" className="px-4 py-1 text-xs rounded-full bg-primary/10 hover:bg-primary/20 text-primary border-none">
                Pricing
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}