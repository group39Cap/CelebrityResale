import { useState } from "react";
import { useLocation } from "wouter";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { fixedPriceItems, auctions } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Settings,
  CreditCard,
  User,
  Heart,
  Clock,
  ShoppingBag,
  Shield,
  Bell,
  LogOut,
  Gavel,
  CheckCircle2,
  HelpCircle,
  Copy,
} from "lucide-react";

// Filter items to show only those for demo purposes
const userPurchases = fixedPriceItems.slice(0, 2);
const userBids = auctions.slice(0, 3);
const userWatchlist = [...auctions.slice(3, 5), ...fixedPriceItems.slice(3, 5)];

const ProfilePage = () => {
  const { state, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("purchases");

  // Profile form state
  const [formData, setFormData] = useState({
    firstName: state.user?.firstName || "",
    lastName: state.user?.lastName || "",
    email: state.user?.email || "",
    phone: "555-123-4567", // Mock data
    bio: "Fashion enthusiast and collector of celebrity items. Love supporting charitable causes through my purchases.",
    notifications: {
      email: true,
      sms: false,
      app: true,
    },
    addresses: [
      {
        type: "Primary",
        street: "123 Fashion Ave",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
    ],
    paymentMethods: [
      {
        type: "Credit Card",
        last4: "4242",
        expiry: "04/25",
        network: "Visa",
        default: true,
      },
    ],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (type: "email" | "sms" | "app") => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleDeletePaymentMethod = (last4: string) => {
    toast({
      title: "Payment Method Removed",
      description: `Card ending in ${last4} has been removed.`,
    });
  };

  const handleSetDefaultPaymentMethod = (last4: string) => {
    toast({
      title: "Default Payment Method Updated",
      description: `Card ending in ${last4} is now your default payment method.`,
    });
  };

  const handleRemoveFromWatchlist = (id: number) => {
    toast({
      title: "Removed from Watchlist",
      description: "Item has been removed from your watchlist.",
    });
  };

  if (!state.user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar with Profile Summary and Navigation */}
        <div className="w-full md:w-64">
          <div className="sticky top-24">
            <Card className="overflow-hidden mb-6 shadow-md border-0">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-20 relative">
                {state.user.isCelebrity && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0">
                    Celebrity
                  </Badge>
                )}
              </div>
              <CardContent className="pt-12 pb-4 px-4 text-center">
                <div className="w-20 h-20 rounded-full bg-white p-1 mx-auto -mt-16 mb-3 shadow-md">
                  {state.user.profileImage ? (
                    <img
                      src={state.user.profileImage}
                      alt={state.user.firstName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <User size={32} />
                    </div>
                  )}
                </div>
                <h2 className="font-bold text-lg">{`${state.user.firstName} ${state.user.lastName}`}</h2>
                <p className="text-sm text-muted-foreground">{state.user.email}</p>
                <div className="mt-2">
                  {state.user.role === "admin" && (
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      Admin
                    </Badge>
                  )}
                  {state.user.role === "user" && (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      Member
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-1">
              <Button
                variant={activeTab === "purchases" ? "default" : "ghost"}
                onClick={() => setActiveTab("purchases")}
                className="w-full justify-start"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                My Purchases
              </Button>
              <Button
                variant={activeTab === "bids" ? "default" : "ghost"}
                onClick={() => setActiveTab("bids")}
                className="w-full justify-start"
              >
                <Gavel className="mr-2 h-4 w-4" />
                My Bids
              </Button>
              <Button
                variant={activeTab === "watchlist" ? "default" : "ghost"}
                onClick={() => setActiveTab("watchlist")}
                className="w-full justify-start"
              >
                <Heart className="mr-2 h-4 w-4" />
                Watchlist
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                onClick={() => setActiveTab("settings")}
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="hidden">
              <TabsList>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
                <TabsTrigger value="bids">Bids</TabsTrigger>
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>

            {/* Purchases Tab */}
            <TabsContent value="purchases" className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Purchases</h1>
                <div className="text-muted-foreground text-sm">
                  Showing {userPurchases.length} items
                </div>
              </div>

              {userPurchases.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No purchases yet</h3>
                  <p className="text-muted-foreground mb-4">
                    When you purchase items, they will appear here.
                  </p>
                  <Button onClick={() => setLocation("/fixed-price")}>
                    Browse Items
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userPurchases.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-0 shadow-md">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-40 md:h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {item.name}
                                </h3>
                                <div className="flex items-center mt-1">
                                  <img
                                    src={item.seller.image}
                                    alt={item.seller.name}
                                    className="w-6 h-6 rounded-full mr-2 object-cover"
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    {item.seller.name}
                                  </span>
                                  {item.seller.verified && (
                                    <Badge
                                      variant="outline"
                                      className="ml-2 px-1 py-0 text-xs"
                                    >
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0 text-right">
                                <span className="font-bold text-lg">
                                  {formatCurrency(item.price)}
                                </span>
                                <p className="text-sm text-muted-foreground">
                                  Purchased on {formatDate(new Date())}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                {item.category}
                              </Badge>
                              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                {item.condition}
                              </Badge>
                              {item.charityPercent > 0 && (
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  {item.charityPercent}% to Charity
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 size={16} className="mr-1" />
                                <span className="text-sm">
                                  Authentication Certificate Available
                                </span>
                              </div>
                              <div className="mt-4 md:mt-0 space-x-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button size="sm">
                                  <HelpCircle size={14} className="mr-1" />
                                  Support
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Bids Tab */}
            <TabsContent value="bids" className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Bids</h1>
                <div className="text-muted-foreground text-sm">
                  Showing {userBids.length} items
                </div>
              </div>

              {userBids.length === 0 ? (
                <div className="text-center py-12">
                  <Gavel className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active bids</h3>
                  <p className="text-muted-foreground mb-4">
                    When you bid on auction items, they will appear here.
                  </p>
                  <Button onClick={() => setLocation("/auctions")}>
                    Browse Auctions
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBids.map((auction) => {
                    const isEnded = new Date(auction.endTime) < new Date();
                    const isWinning = auction.currentBid === auction.highestBid;

                    return (
                      <Card
                        key={auction.id}
                        className={`overflow-hidden border-0 shadow-md ${
                          isEnded && isWinning
                            ? "border-l-4 border-l-green-500"
                            : ""
                        }`}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4">
                              <img
                                src={auction.image}
                                alt={auction.title}
                                className="w-full h-40 md:h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4 md:p-6">
                              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {auction.title}
                                  </h3>
                                  <div className="flex items-center mt-1">
                                    <span className="text-sm text-muted-foreground">
                                      By {auction.celebrity}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                  <div className="font-bold text-lg">
                                    {formatCurrency(auction.currentBid)}
                                    <span className="text-sm font-normal text-muted-foreground ml-1">
                                      (Your Bid)
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Highest Bid:{" "}
                                    {formatCurrency(auction.highestBid)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge
                                  className={`${
                                    isEnded
                                      ? "bg-red-100 text-red-800 border-red-200"
                                      : "bg-blue-100 text-blue-800 border-blue-200"
                                  }`}
                                >
                                  {isEnded ? "Ended" : "Active"}
                                </Badge>
                                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                  {auction.category}
                                </Badge>
                                {isEnded && isWinning && (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    You Won!
                                  </Badge>
                                )}
                                {!isEnded && isWinning && (
                                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                                    Highest Bidder
                                  </Badge>
                                )}
                                {!isEnded && !isWinning && (
                                  <Badge className="bg-red-100 text-red-800 border-red-200">
                                    Outbid
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center text-muted-foreground mb-4">
                                <Clock size={16} className="mr-1" />
                                <span className="text-sm">
                                  {isEnded
                                    ? `Ended ${formatDate(auction.endTime)}`
                                    : `Ends ${formatDate(auction.endTime)}`}
                                </span>
                              </div>

                              <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                                {isEnded && isWinning ? (
                                  <div className="flex items-center text-green-600">
                                    <CheckCircle2 size={16} className="mr-1" />
                                    <span className="text-sm">
                                      You won this auction!
                                    </span>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                                <div className="mt-4 md:mt-0 space-x-2">
                                  {isEnded && isWinning ? (
                                    <Button
                                      onClick={() =>
                                        setLocation("/auction-checkout")
                                      }
                                      size="sm"
                                    >
                                      Complete Purchase
                                    </Button>
                                  ) : !isEnded ? (
                                    <Button
                                      onClick={() => setLocation("/auctions")}
                                      size="sm"
                                    >
                                      Increase Bid
                                    </Button>
                                  ) : null}
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* Watchlist Tab */}
            <TabsContent value="watchlist" className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Watchlist</h1>
                <div className="text-muted-foreground text-sm">
                  Showing {userWatchlist.length} items
                </div>
              </div>

              {userWatchlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Watchlist is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Save items to your watchlist to keep track of them.
                  </p>
                  <div className="space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setLocation("/fixed-price")}
                    >
                      Browse Items
                    </Button>
                    <Button onClick={() => setLocation("/auctions")}>
                      Browse Auctions
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userWatchlist.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-0 shadow-md">
                      <div className="relative">
                        <img
                          src={item.image || (item as any).image}
                          alt={item.title || (item as any).name}
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white bg-opacity-80 text-red-500 hover:bg-white hover:text-red-600"
                          onClick={() => handleRemoveFromWatchlist(item.id)}
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold truncate">
                          {item.title || (item as any).name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.celebrity || (item as any).seller?.name}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge
                            className={
                              "auction" in item
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {"auction" in item ? "Auction" : "Fixed Price"}
                          </Badge>
                          <span className="font-semibold">
                            {formatCurrency(
                              item.currentBid || (item as any).price
                            )}
                          </span>
                        </div>
                        <Button className="w-full mt-4" size="sm">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h1 className="text-2xl font-bold">Account Settings</h1>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <Card className="border-0 shadow-md">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                          />
                        </div>

                        <div className="pt-2">
                          <Button onClick={handleSaveProfile}>
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Shipping Addresses</h3>
                      {formData.addresses.map((address, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-md p-4 mb-4"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge className="mb-2">{address.type}</Badge>
                              <p className="font-medium">
                                {formData.firstName} {formData.lastName}
                              </p>
                              <p>{address.street}</p>
                              <p>
                                {address.city}, {address.state} {address.zip}
                              </p>
                              <p>{address.country}</p>
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline">
                        Add New Address
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payment" className="space-y-4">
                  <Card className="border-0 shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Payment Methods
                      </h3>
                      {formData.paymentMethods.map((method, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-md p-4 mb-4"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex">
                              <div className="mr-4">
                                {method.network === "Visa" ? (
                                  <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-800 font-bold text-xs">
                                    VISA
                                  </div>
                                ) : method.network === "Mastercard" ? (
                                  <div className="w-10 h-6 bg-red-100 rounded flex items-center justify-center text-red-800 font-bold text-xs">
                                    MC
                                  </div>
                                ) : (
                                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-gray-800 font-bold text-xs">
                                    CARD
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {method.type} ending in {method.last4}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Expires {method.expiry}
                                </p>
                                {method.default && (
                                  <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">
                                    Default
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="space-x-2">
                              {!method.default && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleSetDefaultPaymentMethod(method.last4)
                                  }
                                >
                                  Set Default
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() =>
                                  handleDeletePaymentMethod(method.last4)
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline">
                        Add Payment Method
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Billing Information
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-md flex items-start">
                          <Info className="text-blue-600 mr-2 mt-0.5" size={16} />
                          <p className="text-sm text-blue-800">
                            Your billing information is the same as your shipping
                            address. To change billing info, update your shipping
                            address.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <Card className="border-0 shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Notification Preferences
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Receive order updates and alerts via email
                            </p>
                          </div>
                          <div className="flex items-center">
                            <button
                              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                                formData.notifications.email
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                              onClick={() =>
                                handleNotificationChange("email")
                              }
                            >
                              <div
                                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                                  formData.notifications.email
                                    ? "translate-x-6"
                                    : ""
                                }`}
                              ></div>
                            </button>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Receive order updates and alerts via text message
                            </p>
                          </div>
                          <div className="flex items-center">
                            <button
                              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                                formData.notifications.sms
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                              onClick={() => handleNotificationChange("sms")}
                            >
                              <div
                                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                                  formData.notifications.sms
                                    ? "translate-x-6"
                                    : ""
                                }`}
                              ></div>
                            </button>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">App Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Receive in-app notifications for important updates
                            </p>
                          </div>
                          <div className="flex items-center">
                            <button
                              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                                formData.notifications.app
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                              onClick={() => handleNotificationChange("app")}
                            >
                              <div
                                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                                  formData.notifications.app
                                    ? "translate-x-6"
                                    : ""
                                }`}
                              ></div>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button onClick={handleSaveProfile}>
                          Save Preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Auction Alerts
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md">
                          <h4 className="font-medium mb-2">
                            Set up auction alerts by category
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <Badge className="inline-flex items-center justify-center px-3 py-1 cursor-pointer bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                              <CheckCircle2 size={12} className="mr-1" />
                              Clothing
                            </Badge>
                            <Badge className="inline-flex items-center justify-center px-3 py-1 cursor-pointer bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors">
                              Accessories
                            </Badge>
                            <Badge className="inline-flex items-center justify-center px-3 py-1 cursor-pointer bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                              <CheckCircle2 size={12} className="mr-1" />
                              Footwear
                            </Badge>
                            <Badge className="inline-flex items-center justify-center px-3 py-1 cursor-pointer bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors">
                              Jewelry
                            </Badge>
                            <Badge className="inline-flex items-center justify-center px-3 py-1 cursor-pointer bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                              <CheckCircle2 size={12} className="mr-1" />
                              Memorabilia
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;