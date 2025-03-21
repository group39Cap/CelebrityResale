import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ForgotPassword from './pages/ForgotPassword';
import Signup from "@/pages/Signup";
import Auctions from "@/pages/Auctions";
import Celebrities from "@/pages/Celebrities";
import AdminDashboard from "@/pages/AdminDashboard";
import FixedPrice from "@/pages/FixedPrice";
import Checkout from "@/pages/Checkout";
import AuctionCheckout from "@/pages/AuctionCheckout";
import Profile from "@/pages/Profile";
import About from "@/pages/About";
import { useAuth } from "./context/AuthContext";

function App() {
  const { state } = useAuth();
  const [location] = useLocation();
  
  // Check if the current page is login, signup, or forgot password
  const isAuthPage = location === '/login' || location === '/signup' || location === '/forgot-password';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/signup" component={Signup} />
          <Route path="/auctions" component={Auctions} />
          <Route path="/celebrities" component={Celebrities} />
          <Route path="/fixed-price" component={FixedPrice} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auction-checkout" component={AuctionCheckout} />
          <Route path="/about" component={About} />
          {state.user && (
            <Route path="/profile" component={Profile} />
          )}
          {state.user && state.user.role === "admin" && (
            <Route path="/admin" component={AdminDashboard} />
          )}
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isAuthPage && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;