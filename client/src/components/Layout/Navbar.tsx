import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import ShoppingCart from "@/components/ShoppingCart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Search, Menu, User, LogOut, Settings, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/");
  };
  
  // Determine user initials for avatar
  const userInitials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
    : user?.username.substring(0, 2).toUpperCase();
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm transition-all">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#0F172A] font-['Playfair_Display'] text-2xl font-semibold">
            Celebrity<span className="text-[#DCA54C]">Resale</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-neutral-700 hover:text-[#0F172A] font-medium transition-all">Home</Link>
          <Link href="/auctions" className="text-neutral-700 hover:text-[#0F172A] transition-all">Auctions</Link>
          <Link href="/shop" className="text-neutral-700 hover:text-[#0F172A] transition-all">Shop</Link>
          <Link href="/celebrities" className="text-neutral-700 hover:text-[#0F172A] transition-all">Celebrities</Link>
          <Link href="/about" className="text-neutral-700 hover:text-[#0F172A] transition-all">About</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="hidden md:flex text-neutral-700 hover:text-[#0F172A] transition-all">
            <Search className="h-5 w-5" />
          </button>
          
          {/* Login/Register OR User Menu */}
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth">
                <Button variant="ghost" className="text-neutral-700 hover:text-[#0F172A] font-medium">Log In</Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium">Register</Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user.username} />
                    <AvatarFallback className="bg-[#0F172A] text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-neutral-700 font-medium hidden md:inline-block">
                    {user.username}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setLocation("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                
                {user.isAdmin && (
                  <DropdownMenuItem onClick={() => setLocation("/admin")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Shopping Cart */}
          <ShoppingCart />
          
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 py-4">
                <Link 
                  href="/" 
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/auctions" 
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Auctions
                </Link>
                <Link 
                  href="/shop" 
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  href="/celebrities" 
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Celebrities
                </Link>
                <Link 
                  href="/about" 
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                
                <div className="border-t border-gray-200 pt-4">
                  {!user ? (
                    <div className="flex flex-col gap-3">
                      <Link 
                        href="/auth" 
                        className="text-[#0F172A] font-medium py-2 px-4 rounded border border-[#0F172A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                      <Link 
                        href="/auth" 
                        className="text-white font-medium py-2 px-4 rounded bg-[#0F172A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link 
                        href="/profile" 
                        className="text-[#0F172A] font-medium py-2 px-4 rounded border border-[#0F172A] flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      
                      {user.isAdmin && (
                        <Link 
                          href="/admin" 
                          className="text-[#0F172A] font-medium py-2 px-4 rounded border border-[#0F172A] flex items-center gap-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <Button 
                        variant="destructive" 
                        className="flex items-center gap-2"
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
