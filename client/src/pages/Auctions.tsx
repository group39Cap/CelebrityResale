import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { formatCurrency, getTimeRemaining } from '@/lib/utils';
import { auctions } from '@/data/mockData';
import { Clock, Check, Search, Heart, BookmarkPlus, Gavel } from 'lucide-react';

type Category = 'all' | 'watches' | 'clothing' | 'accessories' | 'memorabilia';
type Celebrity = 'all' | 'actors' | 'musicians' | 'athletes' | 'influencers';
type PriceRange = 'any' | 'under1k' | '1kTo5k' | '5kTo10k' | 'over10k';
type SortOption = 'endingSoon' | 'newest' | 'priceHighToLow' | 'priceLowToHigh' | 'mostBids';

const Auctions = () => {
  const [category, setCategory] = useState<Category>('all');
  const [celebrity, setCelebrity] = useState<Celebrity>('all');
  const [priceRange, setPriceRange] = useState<PriceRange>('any');
  const [sortBy, setSortBy] = useState<SortOption>('endingSoon');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuction, setSelectedAuction] = useState<(typeof auctions)[0] | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const { toast } = useToast();
  const { state, addToWatchlist, placeBid } = useAuth();
  const [, navigate] = useLocation();
  
  // Filter and sort auctions based on selected criteria
  const filteredAuctions = auctions.filter(auction => {
    if (searchQuery && !auction.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (category !== 'all' && auction.category !== category) {
      return false;
    }
    
    // Price range filter
    if (priceRange !== 'any') {
      const currentBid = auction.currentBid;
      switch (priceRange) {
        case 'under1k':
          if (currentBid >= 1000) return false;
          break;
        case '1kTo5k':
          if (currentBid < 1000 || currentBid > 5000) return false;
          break;
        case '5kTo10k':
          if (currentBid < 5000 || currentBid > 10000) return false;
          break;
        case 'over10k':
          if (currentBid <= 10000) return false;
          break;
      }
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'endingSoon':
        return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
      case 'priceHighToLow':
        return b.currentBid - a.currentBid;
      case 'priceLowToHigh':
        return a.currentBid - b.currentBid;
      case 'mostBids':
        return (b.highestBid - b.currentBid) - (a.highestBid - a.currentBid);
      case 'newest':
        return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
      default:
        return 0;
    }
  });

  const handleWatchlist = (auction: (typeof auctions)[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!state.isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to your watchlist",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    addToWatchlist(auction.id);
    toast({
      title: "Added to Watchlist",
      description: `${auction.name} has been added to your watchlist.`
    });
  };

  const openBidDialog = (auction: (typeof auctions)[0]) => {
    setSelectedAuction(auction);
    setBidAmount(Math.ceil(auction.currentBid * 1.05)); // Set initial bid 5% higher
  };
  
  const handlePlaceBid = () => {
    if (!selectedAuction) return;
    
    if (!state.isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place a bid",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (bidAmount <= selectedAuction.currentBid) {
      toast({
        title: "Bid Too Low",
        description: "Your bid must be higher than the current bid",
        variant: "destructive"
      });
      return;
    }
    
    placeBid(selectedAuction.id, bidAmount);
    toast({
      title: "Bid Placed Successfully",
      description: `Your bid of ${formatCurrency(bidAmount)} has been placed!`,
    });
    
    setSelectedAuction(null);
  };

  const handleViewDetails = (auction: (typeof auctions)[0]) => {
    navigate(`/auction/${auction.id}`);
  };

  return (
    <div>
      <div className="bg-primary text-white py-10 px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] mb-4">Live Celebrity Auctions</h1>
          <p className="text-white/70 max-w-2xl">Bid on authenticated items worn by celebrities at prestigious events, movie sets, and more.</p>
        </div>
      </div>
      
      <div className="bg-white py-10 px-6">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="mb-8 bg-neutral-100 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                <Select 
                  value={category}
                  onValueChange={(value) => setCategory(value as Category)}
                >
                  <SelectTrigger className="w-full border-2 border-neutral-200 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="watches">Watches & Jewelry</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="memorabilia">Memorabilia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Celebrity</label>
                <Select 
                  value={celebrity}
                  onValueChange={(value) => setCelebrity(value as Celebrity)}
                >
                  <SelectTrigger className="w-full border-2 border-neutral-200 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="All Celebrities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Celebrities</SelectItem>
                    <SelectItem value="actors">Actors & Actresses</SelectItem>
                    <SelectItem value="musicians">Musicians</SelectItem>
                    <SelectItem value="athletes">Athletes</SelectItem>
                    <SelectItem value="influencers">Influencers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Price Range</label>
                <Select 
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as PriceRange)}
                >
                  <SelectTrigger className="w-full border-2 border-neutral-200 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="under1k">Under $1,000</SelectItem>
                    <SelectItem value="1kTo5k">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5kTo10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="over10k">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Sort By</label>
                <Select 
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-full border-2 border-neutral-200 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="Ending Soon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="endingSoon">Ending Soon</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                    <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                    <SelectItem value="mostBids">Most Bids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Search input */}
            <div className="mt-4">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search auctions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
          
          {/* Auction Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAuctions.map((auction, index) => (
              <Card 
                key={auction.id} 
                className="rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300 animate-[slideUp_0.5s_ease_forwards] cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleViewDetails(auction)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={auction.image} alt={auction.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-[pulse_1.5s_infinite]">
                    <Clock size={14} />
                    <span>{getTimeRemaining(auction.endTime)}</span>
                  </div>
                  <button 
                    className="absolute top-3 left-3 bg-white/80 hover:bg-white p-1.5 rounded-full text-rose-500 transition-colors"
                    onClick={(e) => handleWatchlist(auction, e)}
                  >
                    <Heart size={16} />
                  </button>
                  {auction.charityPercent > 0 && (
                    <div className="absolute bottom-3 left-3 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {auction.charityPercent}% to charity
                    </div>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <img 
                      src={auction.seller.image} 
                      alt={auction.seller.name} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{auction.seller.name}</span>
                    {auction.seller.verified && (
                      <span className="ml-1 text-xs bg-blue-500 text-white rounded-full p-0.5">
                        <Check size={10} />
                      </span>
                    )}
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-medium mb-2 line-clamp-2">{auction.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Current bid</p>
                      <p className="font-['Montserrat'] text-lg font-semibold text-gray-900">{formatCurrency(auction.currentBid)}</p>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openBidDialog(auction);
                      }}
                    >
                      Place Bid
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious className="border border-neutral-200 text-gray-500 hover:bg-neutral-100 transition-colors" href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white" href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="border border-neutral-200 text-gray-500 hover:bg-neutral-100 transition-colors" href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="border border-neutral-200 text-gray-500 hover:bg-neutral-100 transition-colors" href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className="text-gray-500" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="border border-neutral-200 text-gray-500 hover:bg-neutral-100 transition-colors" href="#">12</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext className="border border-neutral-200 text-gray-500 hover:bg-neutral-100 transition-colors" href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      
      {/* Bid Dialog */}
      <Dialog open={selectedAuction !== null} onOpenChange={(open) => !open && setSelectedAuction(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Place Bid</DialogTitle>
            <DialogDescription>
              Enter your bid amount for {selectedAuction?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Current bid:</span>
              <span className="font-semibold">{selectedAuction ? formatCurrency(selectedAuction.currentBid) : ""}</span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your bid amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="pl-8 border-2 border-gray-200 rounded-md"
                  min={selectedAuction ? selectedAuction.currentBid + 1 : 0}
                  step={10}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum bid: {selectedAuction ? formatCurrency(selectedAuction.currentBid + 1) : ""}
              </p>
            </div>
            {selectedAuction?.charityPercent > 0 && (
              <div className="bg-green-50 p-3 rounded-md mb-4">
                <p className="text-sm text-green-700 flex items-center">
                  <span className="font-semibold">{selectedAuction.charityPercent}%</span> 
                  <span className="mx-1">of this auction goes to</span>
                  <span className="font-semibold">{selectedAuction.charityName}</span>
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              disabled={!selectedAuction || bidAmount <= (selectedAuction?.currentBid || 0)}
              onClick={handlePlaceBid}
            >
              <Gavel className="mr-2 h-4 w-4" />
              Place Bid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auctions;
