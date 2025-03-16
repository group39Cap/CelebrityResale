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
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, AlertCircle, Star, User } from 'lucide-react';
import { Link } from 'wouter';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Signup = () => {
  const { signup, loginAsCelebrity, login, state } = useAuth();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    await signup({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
    if (state.error === null) {
      setLocation('/');
    }
  };

  const handleQuickSignup = async () => {
    const randomSuffix = Math.floor(Math.random() * 1000);
    await signup({
      firstName: 'Guest',
      lastName: `User${randomSuffix}`,
      email: `guest${randomSuffix}@example.com`,
      password: 'password123',
    });
    if (state.error === null) {
      setLocation('/');
    }
  };

  const handleCelebrityDemo = async () => {
    await loginAsCelebrity();
    if (state.error === null) {
      setLocation('/profile');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 20;
    else if (password.length >= 6) strength += 10;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 20; // Uppercase
    if (/[a-z]/.test(password)) strength += 20; // Lowercase
    if (/[0-9]/.test(password)) strength += 20; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 20; // Special chars
    
    setPasswordStrength(strength);
    return strength;
  };

  const getStrengthLabel = (strength: number) => {
    if (strength <= 20) return { label: 'Weak', color: 'text-red-500' };
    if (strength <= 40) return { label: 'Fair', color: 'text-orange-500' };
    if (strength <= 60) return { label: 'Good', color: 'text-yellow-500' };
    if (strength <= 80) return { label: 'Strong', color: 'text-green-500' };
    return { label: 'Very Strong', color: 'text-green-700' };
  };

  const strengthInfo = getStrengthLabel(passwordStrength);

  return (
    <div className="min-h-[calc(100vh-72px)] flex">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 order-2 md:order-1">
        <div className="w-full max-w-md animate-[slideUp_0.5s_ease_forwards]">
          <div className="text-center mb-6">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl text-primary mb-2">Join StarDrobes</h1>
            <p className="text-neutral-300 font-['Inter']">Create an account to shop exclusive celebrity items</p>
          </div>
          
          {state.error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-primary">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter first name" 
                          className="border-2 border-neutral-200 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500 transition-colors"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-primary">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter last name" 
                          className="border-2 border-neutral-200 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500 transition-colors"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
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
                        className="border-2 border-neutral-200 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500 transition-colors"
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
                    <FormLabel className="text-sm font-medium text-primary">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Create a password" 
                          type={showPassword ? "text" : "password"}
                          className="border-2 border-neutral-200 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500 transition-colors pr-10"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            calculatePasswordStrength(e.target.value);
                          }}
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
                    
                    {field.value && (
                      <>
                        <div className="mt-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              passwordStrength <= 20 ? 'bg-red-500' : 
                              passwordStrength <= 40 ? 'bg-orange-500' : 
                              passwordStrength <= 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`} 
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-neutral-300 mt-1">
                          Password strength: <span className={strengthInfo.color}>{strengthInfo.label}</span>
                        </p>
                      </>
                    )}
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="mt-1 w-4 h-4 border-2 border-neutral-200 rounded"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-neutral-300">
                        I agree to the <Link href="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-6 rounded-md transition-colors"
                disabled={state.isLoading}
              >
                {state.isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">quick options</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                variant="outline"
                className="flex flex-col items-center p-3 h-auto"
                onClick={handleQuickSignup}
                disabled={state.isLoading}
              >
                <User className="h-5 w-5 mb-1 text-blue-500" />
                <span className="text-xs">Guest Account</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-3 h-auto"
                onClick={handleCelebrityDemo}
                disabled={state.isLoading}
              >
                <Star className="h-5 w-5 mb-1 text-amber-500" />
                <span className="text-xs">Celebrity Demo</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-neutral-300 text-sm">
              Already have an account?
              <Link href="/login">
                <span className="text-purple-600 font-medium hover:underline ml-1 cursor-pointer">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-indigo-600 to-purple-700 items-center justify-center relative order-1 md:order-2">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80')] bg-cover bg-center"></div>
        <div className="z-10 text-white text-center p-8 max-w-md animate-[slideUp_0.5s_ease_forwards] relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Star className="h-10 w-10 text-white" />
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl mb-4">Exclusive Benefits</h2>
          <ul className="text-left text-white opacity-90 space-y-3">
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
              <span>First access to celebrity auctions</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
              <span>Authenticated celebrity items</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
              <span>Support charitable causes</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
              <span>VIP event invitations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Signup;
