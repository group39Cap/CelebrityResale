import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, X, Trash2, AlertCircle } from "lucide-react";

export type CartItem = {
  product: Product;
  quantity: number;
};

interface ShoppingCartProps {
  children?: React.ReactNode;
}

export const CartContext = React.createContext<{
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
}>({
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
});

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("celebrityresale-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("celebrityresale-cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        clearCart,
        cartItems,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const ShoppingCart = ({ children }: ShoppingCartProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { cartItems, removeFromCart, cartCount, cartTotal } = useCart();
  const [, setLocation] = useLocation();
  
  const handleCheckout = () => {
    if (!user) {
      setLocation("/auth");
    } else {
      setLocation("/checkout");
    }
    setOpen(false);
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children || (
          <button className="relative text-neutral-700 hover:text-[#0F172A] transition-all">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-[#DCA54C] text-white text-xs">
                {cartCount}
              </Badge>
            )}
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl font-['Playfair_Display']">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-12 w-12 text-neutral-300 mb-4" />
            <h3 className="text-lg font-medium text-[#0F172A] mb-2">Your cart is empty</h3>
            <p className="text-neutral-500">Browse our collection and add some items to your cart.</p>
            <SheetClose asChild>
              <Button 
                className="mt-6 bg-[#0F172A] hover:bg-[#1E293B]"
                onClick={() => setLocation("/")}
              >
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto py-4 -mx-6 px-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-neutral-500">{item.product.celebrityName}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold text-[#0F172A]">
                          ${item.product.price.toLocaleString()}
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm mx-2">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="text-sm">(calculated at checkout)</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B]"
                  onClick={handleCheckout}
                >
                  {user ? "Proceed to Checkout" : "Sign in to Checkout"}
                </Button>
                
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;