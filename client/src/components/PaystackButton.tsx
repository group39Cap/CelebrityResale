import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaystackButtonProps {
  amount: number;
  email: string;
  onSuccess: (reference: string) => void;
  onError: (error: string) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PaystackButton = ({
  amount,
  email,
  onSuccess,
  onError,
  disabled = false,
  className = "",
  children,
}: PaystackButtonProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Function to handle payment
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Get Paystack public key from environment variables
    const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";
    
    if (!paystackPublicKey) {
      toast({
        title: "Configuration Error",
        description: "Paystack public key is not configured.",
        variant: "destructive",
      });
      setIsProcessing(false);
      onError("Paystack public key is not configured");
      return;
    }
    
    // Check if the Paystack script is already loaded
    if (!(window as any).PaystackPop) {
      // Load the Paystack script
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => initializePayment();
      script.onerror = () => {
        toast({
          title: "Failed to load Paystack",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
        setIsProcessing(false);
        onError("Failed to load Paystack script");
      };
      document.body.appendChild(script);
    } else {
      initializePayment();
    }
  };
  
  // Initialize Paystack payment
  const initializePayment = () => {
    try {
      const handler = (window as any).PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amount, // Amount should already be in the smallest currency unit
        currency: "NGN", // Nigerian Naira
        ref: `ref-${Date.now()}`, // Generate a reference
        onClose: () => {
          setIsProcessing(false);
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment process.",
          });
        },
        callback: (response: any) => {
          setIsProcessing(false);
          onSuccess(response.reference);
        },
      });
      
      handler.openIframe();
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Payment Error",
        description: "An error occurred while initializing payment.",
        variant: "destructive",
      });
      onError("Failed to initialize payment");
    }
  };
  
  return (
    <Button
      type="button"
      className={`bg-[#DCA54C] hover:bg-[#C4902F] text-white ${className}`}
      onClick={handlePayment}
      disabled={disabled || isProcessing}
    >
      {isProcessing ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <CreditCard className="mr-2 h-4 w-4" />
      )}
      {children || `Pay with Paystack`}
    </Button>
  );
};

export default PaystackButton;
