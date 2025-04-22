import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import { logOut } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, profile } = useAuth();
  const [location] = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background backdrop-blur-sm border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6m0 12V11m0 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
              </svg>
              <span className="ml-2 font-serif text-xl font-medium text-foreground">students-ai</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex space-x-4">
              {!isAuthenticated && (
                <>
                  <Link href="/features" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-all">
                    Features
                  </Link>
                  <Link href="/pricing" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-all">
                    Pricing
                  </Link>
                </>
              )}
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-all">
                About
              </Link>
              {isAuthenticated && (
                <Link href="/app" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-all">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
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
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all">
                  Log in
                </Link>
                <Link href="/signup" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-all">
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button onClick={toggleMenu} className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-all">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-background border-b border-border transition-colors duration-300`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {!isAuthenticated && (
            <>
              <Link href="/features" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-all">
                Features
              </Link>
              <Link href="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-all">
                Pricing
              </Link>
            </>
          )}
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-all">
            About
          </Link>
          {isAuthenticated && (
            <Link href="/app" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition-all">
              Dashboard
            </Link>
          )}

          {!isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-border">
              <Link href="/login" className="block w-full text-center px-4 py-2 text-base font-medium text-foreground hover:text-primary transition-all">
                Log in
              </Link>
              <Link href="/signup" className="block w-full text-center mt-2 px-4 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90 transition-all">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
