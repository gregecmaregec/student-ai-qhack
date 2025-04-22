import { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ContextualHelp } from '@/components/help/contextual-help';

interface MainLayoutProps {
  children: ReactNode;
  withFooter?: boolean;
}

export function MainLayout({ children, withFooter = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121212] transition-colors duration-300">
      <Navbar />
      <main className="flex-1">{children}</main>
      {withFooter && <Footer />}
      <ContextualHelp />
    </div>
  );
}
