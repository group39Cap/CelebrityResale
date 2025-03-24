import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Product, Order, insertProductSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Package, ShoppingBag, PlusCircle, Pencil, Trash2 } from "lucide-react";

type ProductFormValues = z.infer<typeof insertProductSchema>;

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      celebrityName: "",
      isAuction: false,
      endDate: undefined,
    },
  });
  
  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormValues) => {
      const res = await apiRequest("POST", "/api/products", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Product created successfully!",
        description: "The new product has been added to the platform.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create product",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProductFormValues }) => {
      const res = await apiRequest("PATCH", `/api/products/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Product updated successfully!",
        description: "The product has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      form.reset();
      setSelectedProduct(null);
      setIsEditing(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update product",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Product deleted successfully!",
        description: "The product has been removed from the platform.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete product",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/orders/${id}/status`, { status });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Order status updated!",
        description: "The order status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update order status",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: ProductFormValues) => {
    if (isEditing && selectedProduct) {
      updateProductMutation.mutate({ id: selectedProduct.id, data: values });
    } else {
      createProductMutation.mutate(values);
    }
  };
  
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    
    form.reset({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      celebrityName: product.celebrityName,
      isAuction: product.isAuction,
      endDate: product.endDate ? new Date(product.endDate) : undefined,
    });
  };
  
  const handleDeleteProduct = (id: number) => {
    deleteProductMutation.mutate(id);
  };
  
  const handleUpdateOrderStatus = (id: number, status: string) => {
    updateOrderStatusMutation.mutate({ id, status });
  };
  
  const cancelEdit = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    form.reset();
  };
  
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Access Denied</h1>
            <p className="text-neutral-500">You do not have permission to access this page.</p>
          </div>
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
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F172A] mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="products">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-8">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Products</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Orders</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Form */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>{isEditing ? "Edit Product" : "Add New Product"}</CardTitle>
                      <CardDescription>
                        {isEditing 
                          ? "Update the details for this product" 
                          : "Fill in the details to create a new product"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Rolex Submariner" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Detailed product description" 
                                    className="min-h-[120px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="1000" 
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://example.com/image.jpg" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Enter the URL of the product image
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="celebrityName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Celebrity Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Leonardo DiCaprio Collection" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="isAuction"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Auction Item</FormLabel>
                                  <FormDescription>
                                    Set this product as an auction item instead of fixed price
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          {form.watch("isAuction") && (
                            <FormField
                              control={form.control}
                              name="endDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Auction End Date</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="datetime-local" 
                                      {...field}
                                      value={field.value instanceof Date ? field.value.toISOString().slice(0, 16) : ""}
                                      onChange={(e) => {
                                        field.onChange(e.target.value ? new Date(e.target.value) : undefined);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          
                          <div className="flex gap-2 pt-2">
                            <Button 
                              type="submit" 
                              className="flex-1 bg-[#0F172A] hover:bg-[#1E293B]"
                              disabled={createProductMutation.isPending || updateProductMutation.isPending}
                            >
                              {(createProductMutation.isPending || updateProductMutation.isPending) ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : isEditing ? (
                                <>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Update Product
                                </>
                              ) : (
                                <>
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add Product
                                </>
                              )}
                            </Button>
                            
                            {isEditing && (
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={cancelEdit}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Product List */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product List</CardTitle>
                      <CardDescription>Manage all products on the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {productsLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-[#DCA54C]" />
                        </div>
                      ) : productsError ? (
                        <div className="text-center py-8 text-red-500">
                          Failed to load products. Please try again.
                        </div>
                      ) : products && products.length > 0 ? (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Celebrity</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {products.map((product) => (
                                <TableRow key={product.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded overflow-hidden">
                                        <img 
                                          src={product.imageUrl} 
                                          alt={product.name} 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <span className="truncate max-w-[200px]">{product.name}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>${product.price.toLocaleString()}</TableCell>
                                  <TableCell>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                      product.isAuction 
                                        ? "bg-blue-100 text-blue-800" 
                                        : "bg-green-100 text-green-800"
                                    }`}>
                                      {product.isAuction ? "Auction" : "Fixed Price"}
                                    </span>
                                  </TableCell>
                                  <TableCell className="truncate max-w-[150px]">
                                    {product.celebrityName}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleEditProduct(product)}
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="outline" size="sm" className="text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              This will permanently delete the product "{product.name}".
                                              This action cannot be undone.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                              className="bg-red-500 hover:bg-red-600"
                                              onClick={() => handleDeleteProduct(product.id)}
                                            >
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-neutral-500">
                          No products found. Add your first product using the form.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>View and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-[#DCA54C]" />
                    </div>
                  ) : ordersError ? (
                    <div className="text-center py-8 text-red-500">
                      Failed to load orders. Please try again.
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">#{order.id}</TableCell>
                              <TableCell>User #{order.userId}</TableCell>
                              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>${order.total.toLocaleString()}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  order.status === "completed" 
                                    ? "bg-green-100 text-green-800" 
                                    : order.status === "pending" 
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-neutral-100 text-neutral-800"
                                }`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <select
                                  value={order.status}
                                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                  className="border rounded px-2 py-1 text-sm"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-neutral-500">
                      No orders found. Orders will appear here when customers make purchases.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
