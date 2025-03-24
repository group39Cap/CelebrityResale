import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/components/ShoppingCart";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PaymentForm from "@/components/PaymentForm";

const Checkout = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const shipping = 25; // Fixed shipping cost
  const total = cartTotal + shipping;
  
  const formSchema = z.object({
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email("Please enter a valid email"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().min(4, "Zip code is required"),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  
  const createOrderMutation = useMutation({
    mutationFn: async (paymentReference: string) => {
      const orderData = {
        total,
        paymentReference,
        status: "pending",
        items: cartItems.map(item => ({
          productId: item.product.id,
          price: item.product.price,
          quantity: item.quantity,
        })),
      };
      
      const res = await apiRequest("POST", "/api/orders", orderData);
      return await res.json();
    },
    onSuccess: () => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      clearCart(); // Clear the cart after successful purchase
      toast({
        title: "Order placed successfully!",
        description: "Your order has been confirmed.",
      });
      
      setTimeout(() => {
        setLocation("/profile");
      }, 3000);
    },
    onError: (error: Error) => {
      setPaymentProcessing(false);
      toast({
        title: "Order failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const handlePaymentSuccess = (paymentReference: string) => {
    setPaymentProcessing(true);
    createOrderMutation.mutate(paymentReference);
  };
  
  // Show empty cart message if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-6 px-4 text-center">
          <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F172A]">Your cart is empty</h2>
          <p className="text-neutral-500 max-w-md">Looks like you haven't added any items to your cart yet. Browse our collection to find something special.</p>
          <Button 
            onClick={() => setLocation("/")}
            className="bg-[#0F172A] hover:bg-[#1E293B]"
          >
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F172A] mb-8">Checkout</h1>
          
          {paymentSuccess ? (
            <Card className="max-w-xl mx-auto">
              <CardContent className="pt-6 pb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F172A] mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-neutral-500 mb-6">
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                  </p>
                  <Button 
                    onClick={() => setLocation("/profile")}
                    className="bg-[#0F172A] hover:bg-[#1E293B]"
                  >
                    View Order Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>Details of your purchase</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <div key={item.product.id} className="flex gap-4">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-neutral-500">{item.product.celebrityName}</p>
                            <div className="flex justify-between mt-1">
                              <p className="font-['Montserrat'] font-semibold">${item.product.price.toLocaleString()}</p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-neutral-500">x{item.quantity}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Subtotal</span>
                        <span>${cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Shipping</span>
                        <span>${shipping.toLocaleString()}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-[#0F172A]">${total.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Enter your billing and payment details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Billing Information</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="john@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input placeholder="New York" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input placeholder="NY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Zip Code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="10001" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Integrated Payment Form Component */}
                        <PaymentForm 
                          amount={total} 
                          onSuccess={handlePaymentSuccess}
                          onCancel={() => {
                            toast({
                              title: "Payment Cancelled",
                              description: "You cancelled the payment process.",
                            });
                          }}
                        />
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t pt-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Secure payment powered by Paystack</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;