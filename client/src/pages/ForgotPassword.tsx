import { useState } from 'react';
import { useLocation } from 'wouter';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, Mail, Key, Check } from 'lucide-react';
import { Link } from 'wouter';

// Schema for email step
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Schema for OTP verification step
const otpSchema = z.object({
  otp: z.string().min(6, 'OTP must be at least 6 characters'),
});

// Schema for new password step
const newPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;
type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

const ForgotPassword = () => {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<'email' | 'otp' | 'newPassword'>('email');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  // Form for email step
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });
  
  // Form for OTP step
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });
  
  // Form for new password step
  const newPasswordForm = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleEmailSubmit = async (values: EmailFormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      // Here you would call your API to send OTP to the email
      // const response = await api.sendOTP(values.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUserEmail(values.email);
      setCurrentStep('otp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (values: OtpFormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      // Here you would call your API to verify OTP
      // const response = await api.verifyOTP(userEmail, values.otp);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentStep('newPassword');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (values: NewPasswordFormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      // Here you would call your API to reset password
      // const response = await api.resetPassword(userEmail, values.password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to login page on success
      setLocation('/login');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'email':
        return 'Forgot Password';
      case 'otp':
        return 'Verify OTP';
      case 'newPassword':
        return 'Set New Password';
      default:
        return 'Forgot Password';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 'email':
        return 'Enter your email address to receive a verification code';
      case 'otp':
        return `We've sent a verification code to ${userEmail}`;
      case 'newPassword':
        return 'Create a new password for your account';
      default:
        return 'Reset your password';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-neutral-200 p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/login">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5 text-neutral-500" />
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              {currentStep === 'email' && <Mail className="h-6 w-6 text-[#6A0DAD]" />}
              {currentStep === 'otp' && <Key className="h-6 w-6 text-[#6A0DAD]" />}
              {currentStep === 'newPassword' && <Check className="h-6 w-6 text-[#6A0DAD]" />}
            </div>
          </div>
          <div className="w-8"></div> {/* Empty div for balanced layout */}
        </div>
        
        <div className="text-center mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl text-primary mb-2">{getStepTitle()}</h1>
          <p className="text-neutral-300 font-['Inter']">{getStepDescription()}</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {currentStep === 'email' && (
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
              <FormField
                control={emailForm.control}
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
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-6 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? "Sending Code..." : "Send Verification Code"}
              </Button>
            </form>
          </Form>
        )}
        
        {currentStep === 'otp' && (
          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-6">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-primary">Verification Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter the 6-digit code" 
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        className="border-2 border-neutral-200 rounded-md px-4 py-2 focus:outline-none focus:border-[#D4AF37] transition-colors text-center text-lg tracking-widest"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-6 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
              
              <div className="text-center mt-4">
                <button 
                  type="button" 
                  className="text-[#6A0DAD] text-sm hover:underline"
                  onClick={() => handleEmailSubmit({email: userEmail})}
                  disabled={loading}
                >
                  Didn't receive a code? Send again
                </button>
              </div>
            </form>
          </Form>
        )}
        
        {currentStep === 'newPassword' && (
          <Form {...newPasswordForm}>
            <form onSubmit={newPasswordForm.handleSubmit(handleNewPasswordSubmit)} className="space-y-6">
              <FormField
                control={newPasswordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-primary">New Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter new password" 
                        type="password"
                        autoComplete="new-password"
                        className="border-2 border-neutral-200 rounded-md px-4 py-2 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={newPasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-primary">Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Confirm new password" 
                        type="password"
                        autoComplete="new-password"
                        className="border-2 border-neutral-200 rounded-md px-4 py-2 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-6 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? "Updating Password..." : "Update Password"}
              </Button>
            </form>
          </Form>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-neutral-300 text-sm">
            Remember your password?
            <Link href="/login">
              <span className="text-[#6A0DAD] font-medium hover:underline ml-1">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;