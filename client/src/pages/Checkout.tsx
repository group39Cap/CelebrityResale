import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { fixedPriceItems } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import {
  CheckCircle,
  CreditCard,
  Info,
  Lock,
  Shield,
  ShoppingCart,
  Wallet,
} from 'lucide-react';

const PaymentMethod = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay'
};

const Checkout = () => {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  
  // For demo purposes, we're using the first item
  const item = fixedPriceItems[0];
  
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.CREDIT_CARD);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Credit card form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  // Shipping address state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  
  // Order summary
  const itemPrice = item.price;
  const shippingFee = 15;
  const tax = item.price * 0.08; // 8% tax rate
  const charityAmount = item.charityPercent > 0 
    ? (item.price * (item.charityPercent / 100))
    : 0;
  const total = itemPrice + shippingFee + tax;

  const handleCreditCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format: XXXX XXXX XXXX XXXX
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setCardNumber(formattedValue.slice(0, 19)); // 16 digits + 3 spaces
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format: MM/YY
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setCardExpiry(value.slice(0, 5)); // MM/YY = 5 chars
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardCvc(value.slice(0, 3)); // 3 digits
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setZipCode(value.slice(0, 5)); // 5 digits for US zip code
  };

  const formComplete = Boolean(
    firstName && 
    lastName && 
    address && 
    city && 
    stateRegion && 
    zipCode && 
    country && 
    (paymentMethod !== PaymentMethod.CREDIT_CARD || 
      (cardName && cardNumber && cardExpiry && cardCvc))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formComplete) {
      toast({
        title: "Please complete the form",
        description: "All fields are required to complete your purchase.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully!",
      });
      
      // In a real application, this would redirect to an order confirmation page
      setLocation('/');
    }, 2000);
  };

  const handleCancel = () => {
    // Go back to the previous page
    window.history.back();
  };

  if (!item) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Info size={48} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Item Selected</h2>
        <p className="text-muted-foreground mb-6">You haven't selected any item to purchase.</p>
        <Button onClick={() => setLocation('/fixed-price')}>Browse Items</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary - Right Side */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex items-start mb-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 rounded-md object-cover mr-4" 
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center mt-1">
                    <img 
                      src={item.seller.image} 
                      alt={item.seller.name} 
                      className="w-5 h-5 rounded-full mr-1" 
                    />
                    <span className="text-sm text-muted-foreground">{item.seller.name}</span>
                    {item.seller.verified && (
                      <Badge variant="outline" className="ml-2 px-1 py-0 text-xs">Verified</Badge>
                    )}
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    {item.condition}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Item Price</span>
                  <span>{formatCurrency(itemPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                
                {charityAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Donation to {item.charityName}</span>
                    <span>{formatCurrency(charityAmount)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              {charityAmount > 0 && (
                <div className="mt-4 bg-green-50 p-3 rounded-md text-sm">
                  <div className="flex items-start">
                    <CheckCircle size={16} className="text-green-600 mt-1 mr-2" />
                    <p className="text-green-800">
                      {item.charityPercent}% of your purchase ({formatCurrency(charityAmount)}) will be donated to {item.charityName}.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 bg-blue-50 p-3 rounded-md text-sm">
                <div className="flex items-start">
                  <Shield size={16} className="text-blue-600 mt-1 mr-2" />
                  <p className="text-blue-800">
                    Your purchase is protected by our Authenticity Guarantee. Each item comes with a certificate of authenticity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Checkout Form - Left Side */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      value={city} 
                      onChange={(e) => setCity(e.target.value)} 
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stateRegion">State</Label>
                    <Input 
                      id="stateRegion" 
                      value={stateRegion} 
                      onChange={(e) => setStateRegion(e.target.value)} 
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input 
                      id="zipCode" 
                      value={zipCode} 
                      onChange={handleZipCodeChange} 
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)} 
                      required
                    />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value={PaymentMethod.CREDIT_CARD} className="flex items-center">
                      <CreditCard size={16} className="mr-2" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value={PaymentMethod.PAYPAL} className="flex items-center">
                      <Wallet size={16} className="mr-2" />
                      PayPal
                    </TabsTrigger>
                    <TabsTrigger value={PaymentMethod.APPLE_PAY} className="flex items-center">
                      <ShoppingCart size={16} className="mr-2" />
                      Apple Pay
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={PaymentMethod.CREDIT_CARD}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input 
                          id="cardName" 
                          value={cardName} 
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Smith"
                          required={paymentMethod === PaymentMethod.CREDIT_CARD}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          value={cardNumber} 
                          onChange={handleCreditCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required={paymentMethod === PaymentMethod.CREDIT_CARD}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            value={cardExpiry} 
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            required={paymentMethod === PaymentMethod.CREDIT_CARD}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input 
                            id="cvc" 
                            value={cardCvc} 
                            onChange={handleCvcChange}
                            placeholder="123"
                            maxLength={3}
                            required={paymentMethod === PaymentMethod.CREDIT_CARD}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value={PaymentMethod.PAYPAL}>
                    <div className="text-center p-6 bg-slate-50 rounded-md">
                      <p className="mb-4">You will be redirected to PayPal to complete your payment securely.</p>
                      <img 
                        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                        alt="PayPal" 
                        className="mx-auto h-10" 
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value={PaymentMethod.APPLE_PAY}>
                    <div className="text-center p-6 bg-slate-50 rounded-md">
                      <p className="mb-4">You will be prompted to complete payment with Apple Pay.</p>
                      <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <Lock size={14} className="mr-2" />
                  Your payment information is encrypted and secure.
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between p-6 bg-slate-50">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={!formComplete || isProcessing} 
                  className="min-w-[150px] bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay {formatCurrency(total)}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;