import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Landmark, AlertTriangle, CheckCircle } from "lucide-react";
import PaystackButton from "./PaystackButton";
import { useAuth } from "@/hooks/use-auth";

// Payment form validation schema
const paymentFormSchema = z.object({
  cardName: z.string().min(2, "Name on card is required"),
  cardNumber: z.string()
    .min(1, "Card number is required")
    .regex(/^[0-9]{16}$/, "Card number must be 16 digits"),
  expiryDate: z.string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Use MM/YY format"),
  cvv: z.string()
    .min(1, "CVV is required")
    .regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
  paymentMethod: z.enum(["credit_card", "paystack", "bank_transfer"]),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentReference: string) => void;
  onCancel: () => void;
}

const PaymentForm = ({ amount, onSuccess, onCancel }: PaymentFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paymentMethod: "paystack",
    },
  });
  
  const selectedPaymentMethod = form.watch("paymentMethod");
  
  const onSubmit = async (values: PaymentFormValues) => {
    setIsProcessing(true);
    
    try {
      if (values.paymentMethod === "credit_card") {
        // Simulate card payment processing - in a real app, you'd integrate with a payment processor
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo, generate a fake reference
        const reference = `CARD_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        setPaymentStatus("success");
        toast({
          title: "Payment Successful",
          description: "Your card payment has been processed successfully.",
        });
        onSuccess(reference);
      } else if (values.paymentMethod === "bank_transfer") {
        // Simulate bank transfer processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo, generate a fake reference
        const reference = `BANK_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        setPaymentStatus("success");
        toast({
          title: "Payment Successful",
          description: "Your bank transfer has been processed successfully.",
        });
        onSuccess(reference);
      }
      // Paystack is handled separately via the PaystackButton component
    } catch (error) {
      setPaymentStatus("error");
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handlePaystackSuccess = (reference: string) => {
    setPaymentStatus("success");
    toast({
      title: "Payment Successful",
      description: "Your Paystack payment has been processed successfully.",
    });
    onSuccess(reference);
  };
  
  const handlePaystackError = (error: string) => {
    setPaymentStatus("error");
    toast({
      title: "Payment Failed",
      description: error || "There was an error processing your Paystack payment.",
      variant: "destructive",
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Choose your preferred payment method</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Payment Method Selection */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer bg-white hover:bg-gray-50">
                      <RadioGroupItem value="paystack" id="paystack" />
                      <label htmlFor="paystack" className="flex flex-1 cursor-pointer">
                        <span className="font-medium">Paystack</span>
                        <span className="ml-auto text-green-600 font-medium">Recommended</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer bg-white hover:bg-gray-50">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <label htmlFor="credit_card" className="flex flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span className="font-medium">Credit Card</span>
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer bg-white hover:bg-gray-50">
                      <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                      <label htmlFor="bank_transfer" className="flex flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <Landmark className="h-4 w-4 mr-2" />
                          <span className="font-medium">Bank Transfer</span>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Order Summary */}
            <div className="rounded-md bg-gray-50 p-4">
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Subtotal</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Tax</span>
                <span>$0.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${amount.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Credit Card Form */}
            {selectedPaymentMethod === "credit_card" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          {...field} 
                          onChange={(e) => {
                            // Allow only numbers and format the card number
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                          }}
                          maxLength={16}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="MM/YY" 
                            {...field} 
                            onChange={(e) => {
                              // Format MM/YY
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length > 2) {
                                value = value.substring(0, 2) + '/' + value.substring(2, 4);
                              }
                              field.onChange(value);
                            }}
                            maxLength={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123" 
                            {...field} 
                            onChange={(e) => {
                              // Allow only numbers
                              const value = e.target.value.replace(/\D/g, '');
                              field.onChange(value);
                            }}
                            maxLength={4}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            
            {/* Bank Transfer Details */}
            {selectedPaymentMethod === "bank_transfer" && (
              <div className="space-y-4 p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium">Bank Transfer Instructions</h3>
                <p className="text-sm text-gray-600">
                  Please make a transfer to the following account:
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="font-medium">Bank:</span>
                  <span className="col-span-2">Celebrity Bank</span>
                  <span className="font-medium">Account Number:</span>
                  <span className="col-span-2">1234567890</span>
                  <span className="font-medium">Account Name:</span>
                  <span className="col-span-2">Celebrity Resale Ltd</span>
                  <span className="font-medium">Reference:</span>
                  <span className="col-span-2">ORDER-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex items-center p-2 bg-yellow-50 rounded-md border border-yellow-200 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>
                    Please include the reference number in your payment. Your order will be processed once the payment is confirmed.
                  </span>
                </div>
              </div>
            )}
            
            {/* Payment Status Display */}
            {paymentStatus === "success" && (
              <div className="flex items-center p-3 bg-green-50 rounded-md text-green-700 border border-green-200">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Payment successful! Processing your order...</span>
              </div>
            )}
            
            {paymentStatus === "error" && (
              <div className="flex items-center p-3 bg-red-50 rounded-md text-red-700 border border-red-200">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span>Payment failed. Please try again or use a different payment method.</span>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            {selectedPaymentMethod === "paystack" ? (
              <PaystackButton
                amount={amount * 100} // Paystack requires amount in kobo/cents
                email={user?.email || ""}
                onSuccess={handlePaystackSuccess}
                onError={handlePaystackError}
                className="w-full"
              >
                Pay with Paystack
              </PaystackButton>
            ) : (
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
              </Button>
            )}
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={onCancel}
              disabled={isProcessing || paymentStatus === "success"}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PaymentForm;