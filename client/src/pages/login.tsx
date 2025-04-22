import { MainLayout } from '@/components/main-layout';
import { AuthForm } from '@/components/auth/auth-form';
import { Link } from 'wouter';
import { Bot } from 'lucide-react';

export function LoginPage() {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-stretch min-h-[85vh]">
        {/* Left side: Welcome back message */}
        <div className="hidden md:flex w-full md:w-1/2 bg-primary/5 p-8 md:p-12 flex-col justify-center">
          <div className="max-w-md mx-auto space-y-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <Bot className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary tracking-tight text-center md:text-left">
                Welcome back
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-center md:text-left">
                Log in to continue your academic journey with students-ai.com
              </p>
            </div>
            
            <div className="bg-white/50 rounded-xl p-6 border border-primary/10 shadow-sm">
              <blockquote className="text-foreground/80 italic">
                "students-ai.com has transformed how I study and manage my coursework. I can't imagine going back to traditional methods."
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  JS
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Jamie Smith</p>
                  <p className="text-xs text-muted-foreground">Computer Science Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side: Login form */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-bold">Sign in</h1>
              <p className="text-muted-foreground">
                Enter your details to access your account
              </p>
            </div>
            
            <AuthForm mode="login" />
            
            <div className="text-center md:text-left mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground py-2">
                  Don't have an account yet?
                </p>
                <Link href="/signup">
                  <a className="inline-block w-full py-3 px-4 rounded-md bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium text-foreground hover:text-primary text-center">
                    Create a free account
                  </a>
                </Link>
                <p className="text-xs text-muted-foreground/70 mt-3">
                  Join students-ai.com and start improving your studies today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default LoginPage;
