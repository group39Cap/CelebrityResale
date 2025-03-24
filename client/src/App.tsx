import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./hooks/use-auth";
import { CartProvider } from "@/components/ShoppingCart";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import ProductDetails from "@/pages/product-details";
import Checkout from "@/pages/checkout";
import AdminDashboard from "@/pages/admin-dashboard";
import Profile from "@/pages/profile";
import ShopPage from "@/pages/shop-page";
import AuctionPage from "@/pages/auction-page";
import AboutPage from "@/pages/about-page";
import CelebritiesPage from "@/pages/celebrities-page";
import { ProtectedRoute } from "./lib/protected-route";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/auctions" component={AuctionPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/celebrities" component={CelebritiesPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/product/:id" component={ProductDetails} />
      <ProtectedRoute path="/checkout" component={Checkout} />
      <ProtectedRoute path="/profile" component={() => <Profile />} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
