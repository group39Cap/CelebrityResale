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
import { auctions } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  CheckCircle, 
  CreditCard,
  Info,
  Lock,
  Shield,
  ShoppingCart,
  Wallet,
  Award,
  Clock,
  User
} from 'lucide-react';

const PaymentMethod = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  CRYPTO: 'crypto'
};

const AuctionCheckout = () => {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  
  // For demo purposes, we're using the first auction
  const auction = auctions[0];
  
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
  const itemPrice = auction.currentBid;
  const platformFee = auction.currentBid * 0.05; // 5% platform fee
  const shippingFee = 25; // Higher for auction items
  const tax = auction.currentBid * 0.08; // 8% tax rate
  const charityAmount = auction.charityPercent > 0 
    ? (auction.currentBid * (auction.charityPercent / 100))
    : 0;
  const total = itemPrice + platformFee + shippingFee + tax;

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
        description: "Your auction winning has been confirmed!",
      });
      
      // In a real application, this would redirect to an order confirmation page
      setLocation('/');
    }, 2000);
  };

  const handleCancel = () => {
    // Go back to the previous page
    window.history.back();
  };

  if (!auction) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Info size={48} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Auction Selected</h2>
        <p className="text-muted-foreground mb-6">You haven't selected any auction to complete payment for.</p>
        <Button onClick={() => setLocation('/auctions')}>Browse Auctions</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        Auction Payment
      </h1>
      <p className="text-center text-muted-foreground mb-8">Complete your payment to claim your auction win!</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary - Right Side */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <Card className="shadow-lg border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
              <h2 className="text-xl font-semibold">Auction Win Summary</h2>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start mb-6">
                <img 
                  src={auction.image} 
                  alt={auction.title} 
                  className="w-20 h-20 rounded-md object-cover mr-4 border border-gray-200" 
                />
                <div>
                  <h3 className="font-medium">{auction.title}</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-1">
                      <User size={12} className="text-purple-700" />
                    </div>
                    <span className="text-sm text-muted-foreground">{auction.celebrity}</span>
                    <Badge variant="outline" className="ml-2 px-1 py-0 text-xs">Verified</Badge>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span>Auction ended: {formatDate(auction.endTime)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-3 rounded-md mb-6">
                <div className="flex items-start">
                  <Award size={18} className="text-indigo-600 mt-1 mr-2" />
                  <div>
                    <p className="text-indigo-800 font-medium">Winning Bid Confirmed</p>
                    <p className="text-sm text-indigo-700">
                      Congratulations! You are the highest bidder for this exclusive item.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Winning Bid</span>
                  <span className="font-semibold">{formatCurrency(itemPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (5%)</span>
                  <span>{formatCurrency(platformFee)}</span>
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
                    <span>Donation to {auction.charityName}</span>
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
                      {auction.charityPercent}% of your purchase ({formatCurrency(charityAmount)}) will be donated to {auction.charityName}.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 bg-blue-50 p-3 rounded-md text-sm">
                <div className="flex items-start">
                  <Shield size={16} className="text-blue-600 mt-1 mr-2" />
                  <p className="text-blue-800">
                    Your purchase is protected by our Authenticity Guarantee. Each item comes with a certificate of authenticity and detailed provenance information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Checkout Form - Left Side */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <form onSubmit={handleSubmit}>
            <Card className="shadow-lg border-0">
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
                      className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      required
                      className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      required
                      className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      value={city} 
                      onChange={(e) => setCity(e.target.value)} 
                      required
                      className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stateRegion">State</Label>
                    <Input 
                      id="stateRegion" 
                      value={stateRegion} 
                      onChange={(e) => setStateRegion(e.target.value)} 
                      required
                      className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                      className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)} 
                      required
                      className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                  <TabsList className="grid grid-cols-4 mb-4">
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
                    <TabsTrigger value={PaymentMethod.CRYPTO} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.4 9C9.2 8.8 9 8.4 9 8C9 7.4 9.6 7 10 7H14C14.6 7 15 7.4 15 8C15 8.6 14.4 9 14 9"></path>
                        <path d="M9.4 15C9.2 15.2 9 15.6 9 16C9 16.6 9.6 17 10 17H14C14.6 17 15 16.6 15 16C15 15.4 14.4 15 14 15"></path>
                        <path d="M12 7V17"></path>
                      </svg>
                      Crypto
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={PaymentMethod.CREDIT_CARD}>
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-4 rounded-t-md border-t border-l border-r border-gray-200">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium text-slate-700">Payment Card</div>
                        <div className="flex space-x-2">
                          <svg viewBox="0 0 40 24" width="40" height="24" fill="none">
                            <path d="M38 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H38C39.1 24 40 23.1 40 22V2C40 0.9 39.1 0 38 0Z" fill="#1A1F71"/>
                          </svg>
                          <svg viewBox="0 0 40 24" width="40" height="24" fill="none">
                            <path d="M38 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H38C39.1 24 40 23.1 40 22V2C40 0.9 39.1 0 38 0Z" fill="#3C4043"/>
                            <path d="M20 18C23.3137 18 26 15.3137 26 12C26 8.68629 23.3137 6 20 6C16.6863 6 14 8.68629 14 12C14 15.3137 16.6863 18 20 18Z" fill="#FFB900"/>
                            <path d="M28 18C31.3137 18 34 15.3137 34 12C34 8.68629 31.3137 6 28 6C24.6863 6 22 8.68629 22 12C22 15.3137 24.6863 18 28 18Z" fill="#FF4343" fillOpacity="0.8"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 p-6 border border-gray-200 rounded-b-md">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input 
                          id="cardName" 
                          value={cardName} 
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Smith"
                          required={paymentMethod === PaymentMethod.CREDIT_CARD}
                          className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                          className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                            className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                            className="border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value={PaymentMethod.PAYPAL}>
                    <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-100">
                      <img 
                        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" 
                        alt="PayPal" 
                        className="mx-auto h-16 mb-4" 
                      />
                      <p className="mb-4 text-slate-700">You will be redirected to PayPal to complete your payment securely.</p>
                      <p className="text-sm text-slate-500">PayPal offers buyer protection and allows you to pay using your PayPal balance, bank account, or credit card.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value={PaymentMethod.APPLE_PAY}>
                    <div className="text-center p-8 bg-gradient-to-r from-slate-50 to-slate-100 rounded-md border border-slate-200">
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="2">
                          <path d="M12 17.5C15.5 17.5 16.5 15 16.5 12.5H7.5C7.5 15 8.5 17.5 12 17.5Z" />
                          <path d="M12 11.5V4" />
                          <path d="M14.5 6.5L9.5 6.5" />
                        </svg>
                      </div>
                      <p className="mb-4 text-slate-700">You will be prompted to complete payment with Apple Pay.</p>
                      <p className="text-sm text-slate-500">Fast, secure checkout with Face ID or Touch ID. No need to manually enter payment information.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value={PaymentMethod.CRYPTO}>
                    <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-100">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.4 9C9.2 8.8 9 8.4 9 8C9 7.4 9.6 7 10 7H14C14.6 7 15 7.4 15 8C15 8.6 14.4 9 14 9"></path>
                          <path d="M9.4 15C9.2 15.2 9 15.6 9 16C9 16.6 9.6 17 10 17H14C14.6 17 15 16.6 15 16C15 15.4 14.4 15 14 15"></path>
                          <path d="M12 7V17"></path>
                        </svg>
                      </div>
                      <p className="mb-4 text-slate-700">Pay with cryptocurrency for this exclusive auction item.</p>
                      <p className="text-sm text-slate-500">We accept Bitcoin, Ethereum, and other major cryptocurrencies. Secure and private transactions.</p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <Lock size={14} className="mr-2" />
                  Your payment information is encrypted and secure.
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-slate-50 to-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isProcessing}
                  className="border-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Complete Payment'
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

export default AuctionCheckout;