import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, AlertCircle, Star, Crown, User } from 'lucide-react';
import { Link } from 'wouter';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { login, loginAsCelebrity, loginAsAdmin, state } = useAuth();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    await login(values.email, values.password);
    if (state.error === null) {
      setLocation('/');
    }
  };

  const handleAdminLogin = async () => {
    await loginAsAdmin();
    if (state.error === null) {
      setLocation('/admin');
    }
  };

  const handleCelebrityLogin = async () => {
    await loginAsCelebrity();
    if (state.error === null) {
      setLocation('/profile');
    }
  };

  const handleQuickLogin = async () => {
    await login('user@example.com', 'password123');
    if (state.error === null) {
      setLocation('/');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex">
      <div className="hidden md:flex w-1/2 bg-primary-light items-center justify-center relative">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80')] bg-cover bg-center"></div>
        <div className="z-10 text-white text-center p-8 max-w-md animate-[slideUp_0.5s_ease_forwards]">
          <h2 className="font-['Playfair_Display'] text-3xl mb-4">Exclusive Celebrity Collections</h2>
          <p className="font-['Inter'] text-neutral-100 opacity-80">Access authentic items worn by your favorite celebrities. Every purchase tells a story.</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md animate-[slideUp_0.5s_ease_forwards]">
          <div className="text-center mb-8">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl text-primary mb-2">Welcome Back</h1>
            <p className="text-neutral-300 font-['Inter']">Sign in to continue your exclusive experience</p>
          </div>
          
          {state.error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-primary">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        type="email"
                        autoComplete="email"
                        className="border-2 border-neutral-200 rounded-md px-4 py-2 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        {...field} 
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
                    <div className="flex items-center justify-between mb-1">
                      <FormLabel className="text-sm font-medium text-primary">Password</FormLabel>
                      <Link href="/forgot-password" className="text-xs text-[#6A0DAD] hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Enter your password" 
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          className="border-2 border-neutral-200 rounded-md px-4 py-2 focus:outline-none focus:border-[#D4AF37] transition-colors pr-10"
                          {...field} 
                        />
                        <button 
                          type="button" 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-6 rounded-md transition-colors"
                disabled={state.isLoading}
              >
                {state.isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">or login as</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-4">
              <Button
                variant="outline"
                className="flex flex-col items-center p-3 h-auto"
                onClick={handleQuickLogin}
                disabled={state.isLoading}
              >
                <User className="h-5 w-5 mb-1 text-blue-500" />
                <span className="text-xs">User</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-3 h-auto"
                onClick={handleCelebrityLogin}
                disabled={state.isLoading}
              >
                <Star className="h-5 w-5 mb-1 text-amber-500" />
                <span className="text-xs">Celebrity</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-3 h-auto"
                onClick={handleAdminLogin}
                disabled={state.isLoading}
              >
                <Crown className="h-5 w-5 mb-1 text-purple-500" />
                <span className="text-xs">Admin</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-neutral-300 text-sm">
              Don't have an account?
              <Link href="/signup">
                <span className="text-[#6A0DAD] font-medium hover:underline ml-1">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
