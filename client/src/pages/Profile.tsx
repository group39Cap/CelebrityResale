import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Order, OrderItem, Product } from "@shared/schema";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, User, ShoppingBag, Heart, Settings, Clock } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });
  
  if (!user) {
    return null; // Should be caught by ProtectedRoute
  }
  
  const userInitials = user.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.username.substring(0, 2).toUpperCase();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* User Profile Card */}
            <Card className="md:w-1/3">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" alt={user.fullName || user.username} />
                    <AvatarFallback className="bg-[#0F172A] text-white text-xl">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-2xl font-bold text-[#0F172A]">{user.fullName || user.username}</h2>
                  <p className="text-neutral-500 mb-4">{user.email}</p>
                  
                  {user.isAdmin && (
                    <Badge className="bg-[#DCA54C] hover:bg-[#C4902F] mb-4">Admin</Badge>
                  )}
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center p-3 rounded-md bg-neutral-100">
                      <span className="text-lg font-bold text-[#0F172A]">
                        {ordersLoading ? "..." : orders?.length || 0}
                      </span>
                      <span className="text-sm text-neutral-500">Orders</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-md bg-neutral-100">
                      <span className="text-lg font-bold text-[#0F172A]">0</span>
                      <span className="text-sm text-neutral-500">Favorites</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* User Activity */}
            <div className="md:w-2/3">
              <Tabs defaultValue="orders">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="orders" className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Orders Tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>View all your past purchases and their status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {ordersLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-[#DCA54C]" />
                        </div>
                      ) : ordersError ? (
                        <div className="text-center py-8 text-red-500">
                          Failed to load orders. Please try again later.
                        </div>
                      ) : orders && orders.length > 0 ? (
                        <div className="space-y-6">
                          {orders.map(order => (
                            <div key={order.id} className="border rounded-md overflow-hidden">
                              <div className="bg-neutral-100 p-4 flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">Order #{order.id}</h3>
                                  <p className="text-sm text-neutral-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-semibold text-[#0F172A]">
                                    ${order.total.toLocaleString()}
                                  </span>
                                  <Badge className={
                                    order.status === "completed" 
                                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                                      : order.status === "pending" 
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-neutral-100 text-neutral-800 hover:bg-neutral-100"
                                  }>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="h-4 w-4 text-neutral-500" />
                                  <span className="text-sm">
                                    Estimated delivery: {new Date(
                                      new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                
                                {order.paymentReference && (
                                  <p className="text-sm text-neutral-500 mb-2">
                                    Payment Reference: {order.paymentReference}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <ShoppingBag className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-[#0F172A] mb-1">No orders yet</h3>
                          <p className="text-neutral-500">
                            You haven't made any purchases yet. Start exploring our collections!
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Favorites Tab */}
                <TabsContent value="favorites">
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Items</CardTitle>
                      <CardDescription>Products you've saved for later</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-[#0F172A] mb-1">No favorites yet</h3>
                        <p className="text-neutral-500">
                          Save items you love to keep track of them and find them easily later.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your profile information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Username</label>
                          <div className="flex items-center justify-between mt-1 p-3 border rounded">
                            <span>{user.username}</span>
                            <Badge variant="outline">Cannot Change</Badge>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <div className="flex items-center justify-between mt-1 p-3 border rounded">
                            <span>{user.email}</span>
                            <Badge variant="outline">Cannot Change</Badge>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Full Name</label>
                          <div className="flex items-center justify-between mt-1 p-3 border rounded">
                            <span>{user.fullName || "Not set"}</span>
                            <Badge variant="outline">Cannot Change</Badge>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <h3 className="text-lg font-medium mb-2">Password</h3>
                          <p className="text-sm text-neutral-500 mb-4">
                            For security reasons, password changes are currently disabled.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
