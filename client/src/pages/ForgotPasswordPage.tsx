import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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
import { Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Link } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsSubmitting(true);
    
    try {
      // Here you would call your API to send password reset email
      console.log("Password reset requested for:", values.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Error requesting password reset:", error);
      form.setError("email", { 
        type: "manual", 
        message: "There was an error processing your request. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
            <div className="p-8">
              <div className="mb-6">
                <Link href="/auth" className="text-sm text-[#DCA54C] hover:text-[#C4902F] flex items-center">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to login
                </Link>
              </div>
              
              <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F172A] mb-4">Forgot Password</h1>
              <p className="text-neutral-600 mb-6">Enter your email address and we'll send you instructions to reset your password.</p>
              
              {isSuccess ? (
                <Alert className="bg-green-50 border-green-200 mb-4">
                  <AlertDescription className="text-green-800">
                    Password reset instructions have been sent to your email address. Please check your inbox.
                  </AlertDescription>
                </Alert>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium py-2 rounded-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Send Reset Instructions
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;