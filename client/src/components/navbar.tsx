import React, { useState, useEffect, useCallback } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);
  
  const isAuthenticated = Boolean(user);
  
  // Function to scroll to top when navigating
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle scroll events for showing/hiding the sub-navbar with improved smoothness
  // Effect to calculate and apply logo alignment to text
  useEffect(() => {
    // Function to calculate and apply the offset
    const calculateLogoAlignment = () => {
      // Get the logo element and the center indicator
      const logoText = document.querySelector('.font-serif.text-xl');
      const centerIndicator = document.getElementById('logo-center-indicator');
      // Using a more compatible selector
      const aboutButton = document.querySelector('button span');
      
      if (logoText && centerIndicator) {
        // Get the width of the logo text and the button text
        const logoRect = logoText.getBoundingClientRect();
        const logoWidth = logoRect.width;
        
        // Calculate logo center position
        const logoCenter = logoWidth / 2;
        
        // Get the logo's left position
        const logoLeft = logoRect.left;
        const logoMiddle = logoLeft + logoCenter;
        
        // Set a CSS variable with the calculated center position
        document.documentElement.style.setProperty('--logo-center-offset', `${logoCenter}px`);
        
        // Log for debugging
        console.log('Logo alignment calculation:', { logoWidth, logoCenter });
      }
    };
    
    // Run calculation on mount
    calculateLogoAlignment();
    
    // Also recalculate on window resize
    window.addEventListener('resize', calculateLogoAlignment);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', calculateLogoAlignment);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let timeout: number | null = null;
    
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Always update scrolled state immediately for better UX
      setIsScrolled(currentScrollPos > 20);
      
      // Use a larger threshold to prevent small scroll changes from triggering the animation
      const scrollDelta = Math.abs(currentScrollPos - lastScrollY);
      
      // Only trigger animation when significant scrolling occurs (more than 10px)
      if (scrollDelta > 10) {
        if (currentScrollPos > lastScrollY && currentScrollPos > 80) {
          // Scrolling down - hide navbar with a slight delay for smoother appearance
          // Clear any existing timeout to prevent rapid flickering
          if (timeout) window.clearTimeout(timeout);
          
          timeout = window.setTimeout(() => {
            setIsSubNavVisible(false);
          }, 100);
        } else if (currentScrollPos < lastScrollY) {
          // Scrolling up - show navbar immediately
          if (timeout) window.clearTimeout(timeout);
          setIsSubNavVisible(true);
        }
      }
      
      lastScrollY = currentScrollPos;
      ticking = false;
    };
    
    // Main scroll event handler with requestAnimationFrame for smoother performance
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <nav className="sticky top-0 z-50 bg-background backdrop-blur-sm transition-all duration-300 transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex flex-col items-center relative">
                <Link href="/" className="flex items-center" onClick={scrollToTop}>
                  <span className="font-serif text-xl text-foreground">students-ai</span>
                </Link>
                {/* Position indicator used for alignment */}
                <div className="absolute w-0.5 h-0.5 bg-transparent bottom-0 left-1/2 transform -translate-x-1/2" id="logo-center-indicator"></div>
              </div>
              <div className="flex ml-4 space-x-2 items-center">
                
                {isAuthenticated && (
                  <>
                    <div className="flex flex-col items-center">
                      <Link href="/about" onClick={scrollToTop}>
                        <Button variant="ghost" size="sm" className="px-2 py-1 text-xs rounded-full hover:bg-primary/10">
                          <span className="relative">About</span>
                        </Button>
                      </Link>
                    </div>
                    <div className="flex flex-col items-center">
                      <Link href="/app" onClick={scrollToTop}>
                        <Button variant="ghost" size="sm" className="px-2 py-1 text-xs rounded-full hover:bg-primary/10">
                          <span className="relative">Dashboard</span>
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
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
                    <Link href="/profile">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
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
                  <Link href="/login" onClick={scrollToTop}>
                    <Button variant="ghost" size="sm" className="px-3 py-1 text-xs">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={scrollToTop}>
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
        <div 
          className={`bg-background py-2 shadow-sm sticky top-16 z-40 transition-all duration-500 ${
            isSubNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`} 
          id="sub-navbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-start gap-3">
              <Link href="/" onClick={scrollToTop}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`px-4 py-1 text-xs rounded-full text-primary border-none ${location === '/' ? 'bg-primary/30' : 'bg-primary/10 active:bg-primary/20'}`}
                >
                  Home
                </Button>
              </Link>
              <Link href="/about" onClick={scrollToTop}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`px-4 py-1 text-xs rounded-full text-primary border-none ${location === '/about' ? 'bg-primary/30' : 'bg-primary/10 active:bg-primary/20'}`}
                >
                  About
                </Button>
              </Link>
              <Link href="/features" onClick={scrollToTop}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`px-4 py-1 text-xs rounded-full text-primary border-none ${location === '/features' ? 'bg-primary/30' : 'bg-primary/10 active:bg-primary/20'}`}
                >
                  Features
                </Button>
              </Link>
              <Link href="/pricing" onClick={scrollToTop}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`px-4 py-1 text-xs rounded-full text-primary border-none ${location === '/pricing' ? 'bg-primary/30' : 'bg-primary/10 active:bg-primary/20'}`}
                >
                  Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}