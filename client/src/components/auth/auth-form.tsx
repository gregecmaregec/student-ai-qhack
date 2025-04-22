import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { signInWithGoogle, signInWithMicrosoft, signInWithEmail, signUpWithEmail } from '@/lib/firebase';
import { Inbox } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const form = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(mode === 'login' ? loginSchema : signupSchema),
    defaultValues: mode === 'login' 
      ? { email: '', password: '' } 
      : { name: '', email: '', password: '' },
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithGoogle();
      toast({
        title: 'Success',
        description: 'Signed in with Google successfully',
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Google sign in error:', err);
      setError('Failed to sign in with Google. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithMicrosoft();
      toast({
        title: 'Success',
        description: 'Signed in with Microsoft successfully',
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Microsoft sign in error:', err);
      setError('Failed to sign in with Microsoft. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to sign in with Microsoft',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: LoginFormValues | SignupFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      if (mode === 'login') {
        const { email, password } = data as LoginFormValues;
        await signInWithEmail(email, password);
        toast({
          title: 'Success',
          description: 'Logged in successfully',
        });
      } else {
        const { name, email, password } = data as SignupFormValues;
        await signUpWithEmail(email, password, name);
        toast({
          title: 'Success',
          description: 'Account created successfully',
        });
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Auth error:', err);
      
      const errorMessage = (() => {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          return 'Invalid email or password';
        } else if (err.code === 'auth/email-already-in-use') {
          return 'Email is already in use';
        } else {
          return `Authentication failed: ${err.message}`;
        }
      })();
      
      setError(errorMessage);
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="animate-in fade-in-50 slide-in-from-bottom-5">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Social authentication */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          type="button" 
          variant="outline"
          className="w-full bg-gradient-to-br from-primary-400 to-purple-500 hover:from-primary-500 hover:to-purple-600 text-white border-none shadow-sm transition-all duration-200" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
          Google
        </Button>
        
        <Button 
          type="button" 
          variant="outline"
          className="w-full bg-gradient-to-br from-primary-400 to-purple-500 hover:from-primary-500 hover:to-purple-600 text-white border-none shadow-sm transition-all duration-200" 
          onClick={handleMicrosoftSignIn}
          disabled={isLoading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 23 23" fill="none" stroke="white" strokeWidth="1.5">
            <rect width="9" height="9" x="1.5" y="1.5" />
            <rect width="9" height="9" x="12.5" y="1.5" />
            <rect width="9" height="9" x="1.5" y="12.5" />
            <rect width="9" height="9" x="12.5" y="12.5" />
          </svg>
          Microsoft
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      {/* Email signup/login form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'signup' && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/90">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      {...field} 
                      disabled={isLoading} 
                      className="h-11" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="you@example.com" 
                    {...field} 
                    disabled={isLoading} 
                    className="h-11" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                    disabled={isLoading} 
                    className="h-11" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full h-11 text-base shadow-md bg-gradient-to-br from-primary-400 to-purple-500 hover:from-primary-500 hover:to-purple-600 text-white border-none transition-all duration-200" 
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              mode === 'login' ? 'Sign in' : 'Create account'
            )}
          </Button>
        </form>
      </Form>

      {/* Privacy policy notice */}
      <p className="text-xs text-center text-muted-foreground">
        By continuing, you agree to our {' '}
        <a href="#" className="underline hover:text-foreground">Terms of Service</a> {' '}
        and {' '}
        <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
      </p>
    </div>
  );
}
