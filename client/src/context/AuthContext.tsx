import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { celebrities, users } from '@/data/mockData';

// Define types
type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | 'celebrity';
  isCelebrity: boolean;
  profileImage?: string;
  bio?: string;
  // Additional properties for user activity
  watchlist?: number[];
  cart?: number[];
  purchases?: number[];
  bids?: { itemId: number; amount: number; timestamp: Date }[];
  notifications?: { id: number; message: string; read: boolean; timestamp: Date }[];
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'ADD_TO_WATCHLIST'; payload: number }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: number }
  | { type: 'ADD_TO_CART'; payload: number }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_PURCHASES'; payload: number[] }
  | { type: 'ADD_BID'; payload: { itemId: number; amount: number } }
  | { type: 'CLEAR_ERROR' };

type AuthContextType = {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  loginAsCelebrity: () => Promise<void>;
  loginAsAdmin: () => Promise<void>;
  signup: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addToWatchlist: (itemId: number) => void;
  removeFromWatchlist: (itemId: number) => void;
  isInWatchlist: (itemId: number) => boolean;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  isInCart: (itemId: number) => boolean;
  completePurchase: () => void;
  placeBid: (itemId: number, amount: number) => void;
  hasBidOnItem: (itemId: number) => boolean;
  clearError: () => void;
};

// Create initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Create context
const AuthContext = createContext<AuthContextType>({
  state: initialState,
  login: async () => {},
  loginAsCelebrity: async () => {},
  loginAsAdmin: async () => {},
  signup: async () => {},
  logout: () => {},
  updateUser: () => {},
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  isInWatchlist: () => false,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  isInCart: () => false,
  completePurchase: () => {},
  placeBid: () => {},
  hasBidOnItem: () => false,
  clearError: () => {},
});

// Reducer function
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    case 'ADD_TO_WATCHLIST':
      if (!state.user) return state;
      
      const watchlist = [...(state.user.watchlist || [])];
      if (!watchlist.includes(action.payload)) {
        watchlist.push(action.payload);
      }
      
      return {
        ...state,
        user: {
          ...state.user,
          watchlist
        }
      };
    case 'REMOVE_FROM_WATCHLIST':
      if (!state.user) return state;
      
      return {
        ...state,
        user: {
          ...state.user,
          watchlist: (state.user.watchlist || []).filter(id => id !== action.payload)
        }
      };
    case 'ADD_TO_CART':
      if (!state.user) return state;
      
      const cart = [...(state.user.cart || [])];
      if (!cart.includes(action.payload)) {
        cart.push(action.payload);
      }
      
      return {
        ...state,
        user: {
          ...state.user,
          cart
        }
      };
    case 'REMOVE_FROM_CART':
      if (!state.user) return state;
      
      return {
        ...state,
        user: {
          ...state.user,
          cart: (state.user.cart || []).filter(id => id !== action.payload)
        }
      };
    case 'CLEAR_CART':
      if (!state.user) return state;
      
      return {
        ...state,
        user: {
          ...state.user,
          cart: []
        }
      };
    case 'ADD_TO_PURCHASES':
      if (!state.user) return state;
      
      const purchases = [...(state.user.purchases || []), ...action.payload];
      
      return {
        ...state,
        user: {
          ...state.user,
          purchases
        }
      };
    case 'ADD_BID':
      if (!state.user) return state;
      
      const bids = [...(state.user.bids || [])];
      bids.push({
        itemId: action.payload.itemId,
        amount: action.payload.amount,
        timestamp: new Date()
      });
      
      return {
        ...state,
        user: {
          ...state.user,
          bids
        }
      };
    default:
      return state;
  }
}

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('starDrobes_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('starDrobes_user');
      }
    }
  }, []);

  // Save user data when it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('starDrobes_user', JSON.stringify(state.user));
    }
  }, [state.user]);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // For demo purposes, accept any credentials
      if (email && password) {
        const user: User = {
          id: Math.floor(Math.random() * 1000) + 10,
          username: email.split('@')[0],
          email: email,
          firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          lastName: 'User',
          role: 'user',
          isCelebrity: false,
          watchlist: [],
          cart: [],
          purchases: [],
          bids: [],
          notifications: []
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        toast({
          title: "Login Successful",
          description: "Welcome back to StarDrobes!",
        });
      } else {
        throw new Error('Please enter both email and password');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      });
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : "Login failed" });
    }
  };

  const loginAsCelebrity = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Get a celebrity from the mock data
      const celebrity = celebrities[0];
      const user: User = {
        id: celebrity.id,
        username: celebrity.name.toLowerCase().replace(/\s/g, ''),
        email: `${celebrity.name.toLowerCase().replace(/\s/g, '')}@stardrobes.com`,
        firstName: celebrity.name.split(' ')[0],
        lastName: celebrity.name.split(' ')[1] || '',
        role: 'celebrity',
        isCelebrity: true,
        profileImage: celebrity.image,
        bio: `${celebrity.name} is a ${celebrity.role}`,
        watchlist: [],
        cart: [],
        purchases: [],
        bids: [],
        notifications: []
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      toast({
        title: "Celebrity Login",
        description: `Logged in as ${celebrity.name}`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Could not log in as celebrity",
        variant: "destructive",
      });
      dispatch({ type: 'LOGIN_FAILURE', payload: "Could not log in as celebrity" });
    }
  };

  const loginAsAdmin = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Use admin from users mock data
      const admin = users.find(u => u.role === 'admin');
      
      const user: User = {
        id: admin?.id || 999,
        username: 'admin',
        email: 'admin@stardrobes.com',
        firstName: admin?.name.split(' ')[0] || 'Admin',
        lastName: admin?.name.split(' ')[1] || 'User',
        role: 'admin',
        isCelebrity: false,
        profileImage: admin?.image,
        watchlist: [],
        cart: [],
        purchases: [],
        bids: [],
        notifications: []
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      toast({
        title: "Admin Login",
        description: "Logged in as Administrator",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Could not log in as admin",
        variant: "destructive",
      });
      dispatch({ type: 'LOGIN_FAILURE', payload: "Could not log in as admin" });
    }
  };

  const signup = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        throw new Error('Please fill in all required fields');
      }
      
      const newUser: User = {
        id: Math.floor(Math.random() * 1000) + 10,
        username: userData.email.split('@')[0],
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user',
        isCelebrity: false,
        watchlist: [],
        cart: [],
        purchases: [],
        bids: [],
        notifications: []
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      
      toast({
        title: "Signup Successful",
        description: "Welcome to StarDrobes! Your account has been created.",
      });
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "An error occurred during signup",
        variant: "destructive",
      });
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : "Signup failed" });
    }
  };

  const logout = () => {
    localStorage.removeItem('starDrobes_user');
    dispatch({ type: 'LOGOUT' });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated.",
    });
  };

  const addToWatchlist = (itemId: number) => {
    if (!state.isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to add items to your watchlist.",
        variant: "destructive",
      });
      return;
    }
    
    dispatch({ type: 'ADD_TO_WATCHLIST', payload: itemId });
    toast({
      title: "Added to Watchlist",
      description: "Item added to your watchlist.",
    });
  };

  const removeFromWatchlist = (itemId: number) => {
    dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: itemId });
    toast({
      title: "Removed from Watchlist",
      description: "Item removed from your watchlist.",
    });
  };

  const isInWatchlist = (itemId: number): boolean => {
    return state.user?.watchlist?.includes(itemId) || false;
  };

  const addToCart = (itemId: number) => {
    if (!state.isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    
    dispatch({ type: 'ADD_TO_CART', payload: itemId });
    toast({
      title: "Added to Cart",
      description: "Item added to your cart.",
    });
  };

  const removeFromCart = (itemId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    toast({
      title: "Removed from Cart",
      description: "Item removed from your cart.",
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (itemId: number): boolean => {
    return state.user?.cart?.includes(itemId) || false;
  };

  const completePurchase = () => {
    if (!state.user?.cart?.length) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    dispatch({ type: 'ADD_TO_PURCHASES', payload: state.user.cart });
    dispatch({ type: 'CLEAR_CART' });
    
    toast({
      title: "Purchase Complete",
      description: "Thank you for your purchase!",
    });
  };

  const placeBid = (itemId: number, amount: number) => {
    if (!state.isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to place a bid.",
        variant: "destructive",
      });
      return;
    }
    
    dispatch({ type: 'ADD_BID', payload: { itemId, amount } });
    toast({
      title: "Bid Placed",
      description: `Your bid of $${amount.toLocaleString()} has been placed.`,
    });
  };

  const hasBidOnItem = (itemId: number): boolean => {
    return state.user?.bids?.some(bid => bid.itemId === itemId) || false;
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue = {
    state,
    login,
    loginAsCelebrity,
    loginAsAdmin,
    signup,
    logout,
    updateUser,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    completePurchase,
    placeBid,
    hasBidOnItem,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
