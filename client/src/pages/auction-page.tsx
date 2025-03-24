import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import ProductCard from "@/components/ProductCard";
import AuctionTimer from "@/components/AuctionTimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, SlidersHorizontal, Gavel } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const AuctionPage = () => {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortOption, setSortOption] = useState("ending-soon");
  const [selectedCelebrities, setSelectedCelebrities] = useState<string[]>([]);
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products/auctions"],
  });
  
  // Extract unique celebrity names for the filter
  const celebrities = products ? [...new Set(products.map(product => product.celebrityName))] : [];
  
  const handleCelebrityToggle = (celebrityName: string) => {
    setSelectedCelebrities(prev => {
      if (prev.includes(celebrityName)) {
        return prev.filter(name => name !== celebrityName);
      } else {
        return [...prev, celebrityName];
      }
    });
  };
  
  // Determine if an auction is active based on its end date
  const isAuctionActive = (endDate: Date | null) => {
    if (!endDate) return false;
    return new Date(endDate) > new Date();
  };
  
  // Filter products based on search term, price range, selected celebrities, and active status
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.celebrityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCelebrity = selectedCelebrities.length === 0 || selectedCelebrities.includes(product.celebrityName);
    const active = isAuctionActive(product.endDate);
    const matchesActive = !showActiveOnly || active;
    
    return matchesSearch && matchesPrice && matchesCelebrity && matchesActive;
  });
  
  // Sort products based on selected option
  const sortedProducts = filteredProducts ? [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      case "ending-soon":
        // Sort by end date (soonest first)
        if (!a.endDate) return 1;
        if (!b.endDate) return -1;
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case "latest":
      default:
        return new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime();
    }
  }) : [];
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#DCA54C]" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="text-red-500 text-xl font-bold mb-4">Error loading auctions</div>
          <p className="text-neutral-600 mb-6">There was a problem loading the auction items.</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="text-2xl font-bold mb-4">No Auctions Available</div>
          <p className="text-neutral-600 mb-6">Check back soon for new auctions.</p>
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
          <div className="mb-10">
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#0F172A] mb-2">Auctions</h1>
            <p className="text-neutral-600 max-w-3xl">
              Bid on exclusive luxury items from your favorite celebrities. All items come with certificates of authenticity.
            </p>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <Input 
                type="text" 
                placeholder="Search auctions..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <Select 
                value={sortOption} 
                onValueChange={setSortOption}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low-high">Starting Bid: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Starting Bid: High to Low</SelectItem>
                  <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                  <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <SlidersHorizontal size={16} />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Auctions</SheetTitle>
                    <SheetDescription>
                      Refine your auction results
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="active-only" 
                        checked={showActiveOnly}
                        onCheckedChange={(checked) => setShowActiveOnly(!!checked)}
                      />
                      <Label htmlFor="active-only">Show active auctions only</Label>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Starting Bid Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 50000]}
                          max={50000}
                          step={500}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="my-6"
                        />
                        <div className="flex justify-between text-sm text-neutral-500">
                          <div>${priceRange[0]}</div>
                          <div>${priceRange[1]}</div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Celebrity</h3>
                      <div className="space-y-3">
                        {celebrities.map(celebrity => (
                          <div className="flex items-center space-x-2" key={celebrity}>
                            <Checkbox 
                              id={celebrity} 
                              checked={selectedCelebrities.includes(celebrity)}
                              onCheckedChange={() => handleCelebrityToggle(celebrity)}
                            />
                            <Label htmlFor={celebrity}>{celebrity}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCelebrities([]);
                        setPriceRange([0, 50000]);
                        setShowActiveOnly(true);
                      }}
                    >
                      Reset
                    </Button>
                    <SheetClose asChild>
                      <Button>Apply Filters</Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-8 text-neutral-600">
            Showing {sortedProducts.length} auctions
          </div>
          
          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  
                  {/* Auction Badge */}
                  <Badge className="absolute top-3 left-3 bg-[#DCA54C]">
                    <Gavel className="w-3 h-3 mr-1" />
                    Auction
                  </Badge>
                  
                  {/* Auction Timer */}
                  {isAuctionActive(product.endDate) ? (
                    <div className="absolute bottom-24 left-0 right-0 p-2 bg-black/50 backdrop-blur-sm">
                      <div className="text-white text-center text-xs">
                        ENDS IN: <AuctionTimer endDate={product.endDate as Date} />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute bottom-24 left-0 right-0 p-2 bg-red-500/70 backdrop-blur-sm">
                      <div className="text-white text-center text-xs font-medium">
                        AUCTION ENDED
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-2xl font-bold mb-2">No matches found</div>
              <p className="text-neutral-600 mb-6">Try adjusting your filters or search term.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setPriceRange([0, 50000]);
                  setSelectedCelebrities([]);
                  setShowActiveOnly(true);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuctionPage;