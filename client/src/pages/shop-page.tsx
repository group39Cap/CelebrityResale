import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
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

const ShopPage = () => {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortOption, setSortOption] = useState("latest");
  const [selectedCelebrities, setSelectedCelebrities] = useState<string[]>([]);
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products/fixed-price"],
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
  
  // Filter products based on search term, price range, and selected celebrities
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.celebrityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCelebrity = selectedCelebrities.length === 0 || selectedCelebrities.includes(product.celebrityName);
    
    return matchesSearch && matchesPrice && matchesCelebrity;
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
          <div className="text-red-500 text-xl font-bold mb-4">Error loading products</div>
          <p className="text-neutral-600 mb-6">There was a problem loading the shop items.</p>
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
          <div className="text-2xl font-bold mb-4">No Products Available</div>
          <p className="text-neutral-600 mb-6">Check back soon for new items.</p>
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
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#0F172A] mb-2">Shop</h1>
            <p className="text-neutral-600 max-w-3xl">
              Discover authentic celebrity items at fixed prices. Each item is verified for authenticity and comes with a certificate of ownership.
            </p>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <Input 
                type="text" 
                placeholder="Search by product or celebrity..." 
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
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
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
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>
                      Refine your search results
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 10000]}
                          max={10000}
                          step={100}
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
                        setPriceRange([0, 10000]);
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
            Showing {sortedProducts.length} products
          </div>
          
          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-2xl font-bold mb-2">No matches found</div>
              <p className="text-neutral-600 mb-6">Try adjusting your filters or search term.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setPriceRange([0, 10000]);
                  setSelectedCelebrities([]);
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

export default ShopPage;