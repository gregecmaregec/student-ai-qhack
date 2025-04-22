import { MainLayout } from '@/components/main-layout';
import { AuthForm } from '@/components/auth/auth-form';
import { Link } from 'wouter';
import { Sparkles, GraduationCap, PencilRuler, Bot, Calendar } from 'lucide-react';

export function SignupPage() {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-stretch min-h-[85vh]">
        {/* Left side: Features and Benefits */}
        <div className="hidden md:flex w-full md:w-1/2 bg-primary/5 p-8 md:p-12 flex-col justify-center">
          <div className="max-w-md mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary tracking-tight">
                Your AI study companion
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of students simplifying their academic life with students-ai.com
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Smart AI Assistance</h3>
                  <p className="text-muted-foreground">Get personalized help with any academic challenge</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Study Optimization</h3>
                  <p className="text-muted-foreground">Learn more effectively with AI-generated study plans</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Smart Scheduling</h3>
                  <p className="text-muted-foreground">Never miss a deadline with intelligent calendar management</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full">
                  <PencilRuler className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Essay Assistance</h3>
                  <p className="text-muted-foreground">Get help brainstorming, organizing, and editing your papers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side: Sign up form */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-bold">Create your account</h1>
              <p className="text-muted-foreground">
                Start your journey with students-ai.com
              </p>
            </div>
            

            
            <AuthForm mode="signup" />
            
            <div className="text-center md:text-left mt-6 space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground py-2">
                  Already have an account?
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/login">
                  <a className="inline-block w-full py-3 px-4 rounded-md bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium text-foreground hover:text-primary text-center">
                    Log in to your account
                  </a>
                </Link>
                <div className="rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/5 p-4 mb-6 border border-primary/20">
                  <p className="text-sm text-foreground font-medium flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    Free account with all essential features
                  </p>
                </div>
                <p className="text-xs text-muted-foreground/70 mt-3">
                  By creating an account, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default SignupPage;
