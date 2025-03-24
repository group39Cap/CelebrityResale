import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Product, Bid, insertBidSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import AuctionTimer from "@/components/AuctionTimer";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/components/ShoppingCart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, Gavel, ShoppingCart } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type BidFormValues = {
  amount: number;
};

const ProductDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const { user } = useAuth();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const [processingCart, setProcessingCart] = useState(false);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !isNaN(productId),
  });

  const {
    data: highestBid,
    isLoading: bidLoading,
    error: bidError,
  } = useQuery<Bid>({
    queryKey: [`/api/bids/highest/${productId}`],
    enabled: !isNaN(productId) && product?.isAuction === true,
  });

  const {
    data: bids,
    isLoading: bidsLoading,
  } = useQuery<Bid[]>({
    queryKey: [`/api/bids/product/${productId}`],
    enabled: !isNaN(productId) && product?.isAuction === true,
  });

  const bidSchema = z.object({
    amount: z.coerce.number().positive().min(
      product?.isAuction && highestBid ? highestBid.amount + 1 : (product?.price || 0) + 1, 
      {
        message: `Bid must be higher than ${highestBid ? highestBid.amount : product?.price}`,
      }
    ),
  });

  const form = useForm<BidFormValues>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      amount: product?.isAuction && highestBid 
        ? Math.ceil(highestBid.amount * 1.05) // 5% higher than current bid as default
        : product?.price 
        ? Math.ceil(product.price * 1.05) 
        : 0,
    },
  });

  const bidMutation = useMutation({
    mutationFn: async (bidAmount: number) => {
      const bidData = {
        productId,
        amount: bidAmount,
      };
      
      const res = await apiRequest("POST", "/api/bids", bidData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Bid placed successfully!",
        description: "Your bid has been recorded.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/bids/highest/${productId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/bids/product/${productId}`] });
      form.reset({
        amount: highestBid 
          ? Math.ceil(highestBid.amount * 1.05) 
          : product?.price 
          ? Math.ceil(product.price * 1.05) 
          : 0,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to place bid",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: BidFormValues) {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to place a bid",
        variant: "destructive",
      });
      setLocation("/auth");
      return;
    }

    await bidMutation.mutateAsync(values.amount);
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a purchase",
        variant: "destructive",
      });
      setLocation("/auth");
      return;
    }

    setProcessingCart(true);
    
    try {
      if (product) {
        addToCart(product);
      }
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setProcessingCart(false);
    }
  };

  if (productLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#DCA54C]" />
        </div>
        <Footer />
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Product Not Found</h1>
            <p className="text-neutral-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button 
              variant="outline" 
              onClick={() => setLocation("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              {product.isAuction && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0F172A] px-3 py-1 text-white text-xs uppercase font-['Montserrat'] font-semibold rounded">Auction</span>
                </div>
              )}
              {product.isAuction && product.endDate && (
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white text-sm font-medium">Current Bid:</span>
                      <span className="text-white font-['Montserrat'] text-lg font-semibold ml-1">
                        ${highestBid ? highestBid.amount.toLocaleString() : product.price.toLocaleString()}
                      </span>
                    </div>
                    <AuctionTimer endDate={new Date(product.endDate)} />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[#DCA54C] font-['Montserrat'] font-semibold">
                {product.celebrityName}
              </span>
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F172A] mb-4">
              {product.name}
            </h1>
            
            <p className="text-neutral-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            {product.isAuction ? (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-['Montserrat'] text-lg font-semibold mb-4">Place Your Bid</h3>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-neutral-500 mb-1">
                        <span>Starting Price</span>
                        <span>${product.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Current Highest Bid</span>
                        <span className="text-[#DCA54C]">
                          ${highestBid ? highestBid.amount.toLocaleString() : product.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-neutral-500">
                        <span>Minimum Bid Increment</span>
                        <span>$1</span>
                      </div>
                    </div>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                                  <Input
                                    type="number"
                                    placeholder="Enter bid amount"
                                    className="pl-8"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-[#DCA54C] hover:bg-[#C4902F] text-white"
                          disabled={bidMutation.isPending}
                        >
                          {bidMutation.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Gavel className="mr-2 h-4 w-4" />
                          )}
                          Place Bid
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                {/* Bid History */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-['Montserrat'] text-lg font-semibold mb-4">Bid History</h3>
                    
                    {bidsLoading ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-[#DCA54C]" />
                      </div>
                    ) : bids && bids.length > 0 ? (
                      <div className="space-y-3">
                        {bids
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map((bid, index) => (
                            <div key={bid.id} className="flex justify-between items-center border-b border-neutral-100 pb-2 last:border-0">
                              <div className="text-sm">
                                <span className="font-medium">Bidder #{index + 1}</span>
                                <span className="text-neutral-500 ml-2 text-xs">
                                  {new Date(bid.createdAt).toLocaleString()}
                                </span>
                              </div>
                              <span className="font-['Montserrat'] font-semibold text-[#DCA54C]">
                                ${bid.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-neutral-500 text-center py-4">No bids yet. Be the first to place a bid!</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-neutral-200 pb-6 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Montserrat'] text-2xl font-semibold text-[#0F172A]">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-neutral-500">Fixed Price</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white py-6 text-lg"
                  onClick={handleAddToCart}
                  disabled={processingCart}
                >
                  {processingCart ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <ShoppingCart className="mr-2 h-5 w-5" />
                  )}
                  Add to Cart
                </Button>
                
                <div className="bg-neutral-50 p-4 rounded-md mt-6">
                  <h3 className="font-['Montserrat'] font-semibold mb-2">Product Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-neutral-500">Celebrity</span>
                      <span>{product.celebrityName}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-neutral-500">Authenticity</span>
                      <span>Verified with Certificate</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-neutral-500">Shipping</span>
                      <span>Worldwide (Insured)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-neutral-500">Returns</span>
                      <span>30-Day Policy</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
