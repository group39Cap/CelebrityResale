import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const registerSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  fullName: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
});

const AuthPage = () => {
  const { user, loginMutation, registerMutation, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  // Set the active tab based on the URL hash (if present)
  const defaultTab = location === "/auth" ? "login" : "register";
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
    },
  });

  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    await loginMutation.mutateAsync(values);
  }

  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    await registerMutation.mutateAsync(values);
  }
  
  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - Form */}
              <div className="p-8">
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F172A] mb-6">Your Account</h1>
                
                <Tabs defaultValue={defaultTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="remember" 
                              className="h-4 w-4 text-[#DCA54C] focus:ring-[#DCA54C] border-neutral-300 rounded" 
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-neutral-700">Remember me</label>
                          </div>
                          <Link href="/forgot-password" className="text-sm text-[#DCA54C] hover:text-[#C4902F]">Forgot password?</Link>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium py-2 rounded-md"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          Log In
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Choose a username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Create a password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium py-2 rounded-md"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          Register
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Right side - Hero section */}
              <div className="bg-[#0F172A] text-white p-8 flex flex-col justify-center">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Exclusive Celebrity Items</h2>
                <p className="mb-6">Join our platform to access authentic luxury items from your favorite celebrity collections.</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#1E293B] rounded-full p-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#DCA54C]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-['Montserrat'] font-semibold text-[#DCA54C]">Authentic Items</h3>
                      <p className="text-neutral-300 text-sm">Every product comes with a certificate of authenticity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-[#1E293B] rounded-full p-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#DCA54C]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-['Montserrat'] font-semibold text-[#DCA54C]">Exclusive Access</h3>
                      <p className="text-neutral-300 text-sm">Members get early access to new collections and auctions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-[#1E293B] rounded-full p-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#DCA54C]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-['Montserrat'] font-semibold text-[#DCA54C]">Secure Bidding</h3>
                      <p className="text-neutral-300 text-sm">Transparent auction process with real-time updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
