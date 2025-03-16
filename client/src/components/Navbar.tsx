import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut, ShoppingCart, Search, Heart, Bell, Package, Gavel, Clock, Settings, X, Wallet } from 'lucide-react';
import { fixedPriceItems } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

const Navbar = () => {
  const [location, setLocation] = useLocation();
  const { state, logout } = useAuth();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const cartRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const connectWallet = () => {
    // Mock wallet connection for frontend demo
    // In a real implementation, this would connect to MetaMask or another wallet provider
    toast({
      title: "Connecting Wallet",
      description: "Please approve the connection request in your wallet...",
    });
    
    setTimeout(() => {
      const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setWalletAddress(mockAddress);
      setIsWalletConnected(true);
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${mockAddress.substring(0, 6)}...${mockAddress.substring(38)}`,
      });
    }, 1500);
  };
  
  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };
  
  // Mock cart items for frontend only
  const cartItems = [fixedPriceItems[0], fixedPriceItems[4]];
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
  const charityTotal = cartItems.reduce((total, item) => total + (item.price * item.charityPercent / 100), 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu, cart and search when location changes
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  };
  
  const toggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCartOpen(!isCartOpen);
    setIsSearchOpen(false);
  };
  
  const toggleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSearchOpen(!isSearchOpen);
    setIsCartOpen(false);
  };
  
  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Auctions', href: '/auctions' },
    { text: 'Shop', href: '/fixed-price' },
    { text: 'Celebrities', href: '/celebrities' },
    { text: 'About', href: '/about' },
  ];

  const handleRemoveFromCart = (id: number) => {
    // In a real app this would remove the item from the cart
    // For now, just show a console message
    console.log(`Removed item ${id} from cart`);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-primary py-2 shadow-md' : 'bg-primary py-4'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl font-['Playfair_Display'] font-semibold tracking-wider text-secondary cursor-pointer">
              StarDrobes
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`text-sm font-['Montserrat'] hover:text-[#D4AF37] transition-colors cursor-pointer text-white ${
                isActive(link.href) ? 'text-[#D4AF37] font-semibold border-b-2 border-[#D4AF37] pb-1' : ''
              }`}>
                {link.text}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <button 
            className="text-white hover:text-[#D4AF37] transition-colors hidden md:block"
            onClick={toggleSearch}
          >
            <Search size={20} />
          </button>
          
          {/* Shopping Cart Icon */}
          <div className="relative cursor-pointer" onClick={toggleCart}>
            <ShoppingCart size={20} className="text-white hover:text-[#D4AF37] transition-colors" />
            <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-primary text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>

          {/* Wallet Connection */}
          {isWalletConnected ? (
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2 border-indigo-500 text-white hover:bg-indigo-700 hover:text-white"
              onClick={disconnectWallet}
            >
              <Wallet size={16} />
              <span className="text-xs">
                {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
              </span>
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2 border-indigo-500 text-white hover:bg-indigo-700 hover:text-white"
              onClick={connectWallet}
            >
              <Wallet size={16} />
              Connect Wallet
            </Button>
          )}
          
          {state.isAuthenticated ? (
            <>
              {state.user?.role === 'admin' && (
                <Link href="/admin">
                  <Button variant="link" className="text-sm font-['Montserrat'] text-white hover:text-[#D4AF37]">
                    Admin
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    {state.user?.profileImage ? (
                      <img 
                        src={state.user.profileImage} 
                        alt={state.user.username} 
                        className="h-8 w-8 rounded-full object-cover" 
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xs">
                        {state.user?.firstName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <p className="font-medium">{state.user?.firstName} {state.user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{state.user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLocation('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/profile?tab=purchases')}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Purchases</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/profile?tab=bids')}>
                    <Gavel className="mr-2 h-4 w-4" />
                    <span>My Bids</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/profile?tab=watchlist')}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>My Watchlist</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLocation('/profile?tab=settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="link" className="text-sm font-['Montserrat'] text-white hidden md:block hover:text-[#D4AF37]">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#D4AF37] text-primary px-4 py-2 rounded-md text-sm font-['Montserrat'] font-medium hover:bg-[#e6c76a] transition-colors hidden md:block">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="text-white p-1">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary-light flex flex-col md:hidden z-50 py-2 shadow-lg">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span 
                className={`block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white ${
                  isActive(link.href) ? 'text-[#D4AF37] font-semibold border-l-4 border-[#D4AF37] pl-3' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </span>
            </Link>
          ))}
          
          {/* Wallet Connect for Mobile */}
          {isWalletConnected ? (
            <div 
              className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
              onClick={() => {
                disconnectWallet();
                setIsMenuOpen(false);
              }}
            >
              <div className="flex items-center space-x-2">
                <Wallet size={16} />
                <span>
                  Disconnect Wallet ({walletAddress.substring(0, 6)}...{walletAddress.substring(38)})
                </span>
              </div>
            </div>
          ) : (
            <div 
              className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
              onClick={() => {
                connectWallet();
                setIsMenuOpen(false);
              }}
            >
              <div className="flex items-center space-x-2">
                <Wallet size={16} />
                <span>Connect Wallet</span>
              </div>
            </div>
          )}
          
          {!state.isAuthenticated ? (
            <>
              <Link href="/login">
                <span 
                  className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </span>
              </Link>
              <Link href="/signup">
                <span 
                  className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile">
                <span 
                  className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </span>
              </Link>
              <Link href="/profile?tab=purchases">
                <span 
                  className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Purchases
                </span>
              </Link>
              <Link href="/profile?tab=bids">
                <span 
                  className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bids
                </span>
              </Link>
              <Link href="/profile?tab=watchlist">
                <span 
                  className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Watchlist
                </span>
              </Link>
              {state.user?.role === 'admin' && (
                <Link href="/admin">
                  <span 
                    className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </span>
                </Link>
              )}
              <span 
                className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer text-white"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </span>
            </>
          )}
        </div>
      )}
      
      {/* Shopping Cart Dropdown */}
      {isCartOpen && (
        <div ref={cartRef} className="absolute top-full right-0 w-80 md:w-96 bg-white rounded-md shadow-xl z-50 m-2 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-gray-800">
              Your Cart ({cartItems.length})
            </h3>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link href="/fixed-price">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  Browse Items
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="p-4 border-b border-gray-100 flex">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.seller.name}</p>
                      <div className="flex justify-between mt-1">
                        <span className="font-semibold text-gray-800">{formatCurrency(item.price)}</span>
                        <button 
                          className="text-red-500 text-sm hover:text-red-700"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Charity Donation</span>
                  <span className="font-semibold text-green-600">{formatCurrency(charityTotal)}</span>
                </div>
                <Link href="/checkout">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Search Dropdown */}
      {isSearchOpen && (
        <div ref={searchRef} className="absolute top-full left-0 right-0 bg-white p-4 shadow-lg z-50">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search for items, celebrities, or categories..." 
              className="w-full border border-gray-300 rounded-full py-3 px-10 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="max-w-3xl mx-auto mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Trending Categories</h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/auctions?category=watches">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                  Celebrity Watches
                </span>
              </Link>
              <Link href="/fixed-price?category=clothing">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                  Designer Clothing
                </span>
              </Link>
              <Link href="/auctions?category=jewelry">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                  Award Show Jewelry
                </span>
              </Link>
              <Link href="/celebrities?category=actors">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                  Actor Collections
                </span>
              </Link>
              <Link href="/fixed-price?category=memorabilia">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                  Signed Memorabilia
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
